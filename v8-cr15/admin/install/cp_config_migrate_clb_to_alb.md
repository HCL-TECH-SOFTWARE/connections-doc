# Migrating from a Classic Load Balancer to an Application Load Balancer {#cp_config_migrate_clb_to_alb .task}

If your HCL Connections deployment on AWS currently uses a Classic Load Balancer (CLB), you must migrate to an Application Load Balancer (ALB) to support Collabora Online and to take advantage of path-based routing capabilities. This page explains why the migration is necessary and provides step-by-step instructions to complete it.

---

## Why Classic Load Balancer does not work {#section_why_migrate}

The Classic Load Balancer operates at **Layer 4 (TCP/SSL)** and has fundamental limitations that prevent it from supporting the full HCL Connections routing model:

- **No WebSocket support.** CLB cannot process the HTTP `101 Switching Protocols` handshake required for WebSocket connections. Collabora Online relies on WebSocket for real-time collaborative document editing. The Collabora editor communicates with the server through WebSocket paths such as `/cool/ws`, `/cool/*/ws`, `/controller/ws`, and `/controller/*/ws`. When a CLB receives a WebSocket upgrade request, it either drops the connection or returns an error, causing Collabora editing sessions to fail.

- **No path-based routing.** CLB forwards all traffic on a given port to a single backend target. It cannot inspect the URL path and route different paths to different target groups. The Connections architecture requires routing Customizer paths to mw-proxy, Grafana paths to the Grafana service, Collabora WebSocket paths to Traefik, and all other paths to IHS — all on the same HTTPS port 443. With a CLB, this level of routing is not possible without an additional reverse proxy layer.

- **No HTTP/2 support.** CLB does not support HTTP/2, which modern browsers use by default. ALB supports HTTP/2 on the frontend while communicating with backends over HTTP/1.1.

- **No fixed-response rules.** CLB cannot return a fixed response (such as the `robots.txt` rule used in the Connections ALB configuration). Any fixed-response behavior must be handled by a backend server.

- **No host-based or header-based routing.** CLB has no concept of listener rules or conditions based on host headers, HTTP headers, or query strings.

- **Limited health checks.** CLB health checks are basic TCP or HTTP checks against a single port. ALB target groups support per-group health check paths, custom response code matching, and more granular thresholds.

### Feature comparison

| Capability | Classic Load Balancer | Application Load Balancer |
|---|---|---|
| OSI layer | Layer 4 (TCP/SSL) | Layer 7 (HTTP/HTTPS) |
| WebSocket support | No | Yes (native) |
| Path-based routing | No | Yes |
| Host-based routing | No | Yes |
| HTTP/2 | No | Yes (frontend) |
| Fixed-response actions | No | Yes |
| SNI (multiple TLS certs) | No | Yes |
| Health check granularity | Single TCP/HTTP check | Per-target-group path and response codes |
| Idle timeout | 60 seconds (fixed) | Configurable (up to 4000 seconds) |

!!! important

    If you plan to deploy Collabora Online or are already experiencing Collabora connection failures, migrating from CLB to ALB is **required**. Collabora will not function behind a Classic Load Balancer.

---

## Prerequisites {#section_prerequisites}

Before starting the migration, ensure:

- You have completed all steps in [Setting up an AWS Application Load Balancer](cp_config_setup_alb.md) — the ALB, target groups, listener rules, and security groups must be fully configured and ready.
- You know the **Route 53 record name** currently pointing to your CLB (for example, `connections.cnx-example.net`).
- You have the **CLB name or ARN** for reference and eventual decommissioning.
- You have verified that the ALB target groups show **healthy** targets.
- A maintenance window or low-traffic period is scheduled for the DNS switchover.

---

## Step 1: Create and configure the ALB {#section_create_alb}

Follow the complete setup instructions in [Setting up an AWS Application Load Balancer](cp_config_setup_alb.md). This covers:

- [Creating the four target groups](cp_config_setup_alb.md#section_targetgroups) (mw-proxy, grafana, connections, collabora)
- [Creating the ALB and configuring listeners](cp_config_setup_alb.md#section_alb_listeners) (HTTP redirect, HTTPS listener with path-based rules P1–P7)
- [Configuring security groups](cp_config_setup_alb.md#section_securitygroups) (ALB, HAProxy, and IHS)

!!! note

    Do **not** update the DNS record yet. The existing CLB should continue serving traffic while you verify the ALB independently.

---

## Step 2: Test the ALB independently {#section_test_alb}

Before switching DNS, verify the ALB using its auto-assigned DNS name (found in the EC2 console under **Load Balancers** or from the `create-load-balancer` CLI output).

**Test default routing (IHS / Connections):**

```sh
curl -I https://<alb-dns-name>/
# Expected: HTTP 200, 301, or 302 from IHS
```

**Test Customizer routing:**

```sh
curl -I https://<alb-dns-name>/files/customizer
# Expected: response from mw-proxy
```

**Test Grafana routing:**

```sh
curl -I https://<alb-dns-name>/grafana
# Expected: HTTP 302 redirect to Grafana login
```

**Test Collabora WebSocket upgrade (if Collabora is deployed):**

```sh
curl -I -H "Upgrade: websocket" -H "Connection: Upgrade" \
  https://<alb-dns-name>/cool/adminws
# Expected: 101 Switching Protocols
```

**Verify all target group health:**

```sh
aws elbv2 describe-target-health \
  --target-group-arn <target-group-arn> \
  --region <your-region>
# All targets should show "healthy"
```

!!! important

    Resolve any unhealthy targets or routing issues before proceeding to the DNS switchover.

---

## Step 3: Switch the DNS record to the ALB {#section_switch_dns}

Update the existing Route 53 record that currently points to the CLB so that it points to the ALB instead.

### Using the Route 53 console

1. Open the [Route 53 console](https://console.aws.amazon.com/route53/) and navigate to your hosted zone.
2. Select the existing record that points to the CLB (for example, `connections.cnx-example.net`).
3. Choose **Edit record**.
4. Change **Route traffic to** to **Alias to Application Load Balancer**.
5. Select the region and choose your new ALB.
6. Save the record.

### Using the AWS CLI

```sh
aws route53 change-resource-record-sets \
  --hosted-zone-id <your-hosted-zone-id> \
  --change-batch '{
    "Changes": [{
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "Name": "<your-hostname>.<your-hosted-zone>",
        "Type": "A",
        "AliasTarget": {
          "HostedZoneId": "<alb-hosted-zone-id>",
          "DNSName": "<alb-dns-name>",
          "EvaluateTargetHealth": true
        }
      }
    }]
  }'
```

!!! note

    The `<alb-hosted-zone-id>` and `<alb-dns-name>` values can be found in the ALB details in the EC2 console or from the output of the `create-load-balancer` command.

!!! note

    Route 53 ALIAS records have a TTL controlled by the alias target. DNS propagation is typically fast (under 60 seconds) for ALIAS records, but allow a few minutes for all clients to resolve to the new ALB.

---

## Step 4: Verify traffic through the ALB {#section_verify}

After switching DNS, verify that traffic is flowing through the ALB using your production hostname.

**Check DNS resolution:**

```sh
dig +short <your-hostname>
# Should resolve to the ALB IP addresses, not the CLB
```

**Test Connections:**

```sh
curl -I https://<your-hostname>/
# Expected: HTTP 200, 301, or 302 from IHS
```

**Test Customizer:**

```sh
curl -I https://<your-hostname>/files/customizer
# Expected: response from mw-proxy
```

**Test Collabora (if deployed):**

```sh
# WOPI discovery
curl -s https://<your-hostname>/hosting/discovery | head -5
# Expected: XML response

# WebSocket upgrade
curl -I -H "Upgrade: websocket" -H "Connection: Upgrade" \
  https://<your-hostname>/cool/adminws
# Expected: 101 Switching Protocols
```

**Test Grafana if installed:**

```sh
curl -I https://<your-hostname>/grafana
# Expected: HTTP 302 redirect to Grafana login
```

Verify in the AWS console that the ALB is receiving traffic by checking the **Monitoring** tab for active connections and request counts.

---

## Step 5: Decommission the Classic Load Balancer {#section_decommission}

Once you have confirmed that all traffic is routing correctly through the ALB and the application is functioning as expected, decommission the CLB.

!!! important

    Keep the CLB running for a grace period (e.g. 24–48 hours) after the DNS switch before deleting it, in case a rollback is needed.

### Using the AWS console

1. In the [EC2 console](https://console.aws.amazon.com/ec2/), go to **Load Balancing > Load Balancers**.
2. Select the Classic Load Balancer.
3. Choose **Actions > Delete load balancer**.

### Using the AWS CLI

```sh
aws elb delete-load-balancer \
  --load-balancer-name <clb-name> \
  --region <your-region>
```

After deleting the CLB, clean up any security group rules that were specific to the CLB:

- Remove inbound rules on the HAProxy and IHS security groups that referenced the CLB security group as a source.
- Delete the CLB security group itself if it is no longer used.

---

## Rollback {#section_rollback}

If issues arise after switching DNS to the ALB, you can revert by pointing the Route 53 record back to the CLB.

### Using the Route 53 console

1. Edit the DNS record.
2. Change **Route traffic to** back to **Alias to Classic Load Balancer** and select your CLB.
3. Save the record.

### Using the AWS CLI

```sh
aws route53 change-resource-record-sets \
  --hosted-zone-id <your-hosted-zone-id> \
  --change-batch '{
    "Changes": [{
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "Name": "<your-hostname>.<your-hosted-zone>",
        "Type": "A",
        "AliasTarget": {
          "HostedZoneId": "<clb-hosted-zone-id>",
          "DNSName": "<clb-dns-name>",
          "EvaluateTargetHealth": true
        }
      }
    }]
  }'
```

!!! note

    A rollback to the CLB means Collabora Online will not function (WebSocket connections will fail). Use the rollback only as a temporary measure while troubleshooting ALB issues.

---

**Parent topic:** [Configuring the Component Pack](../install/cp_config_intro.md)
