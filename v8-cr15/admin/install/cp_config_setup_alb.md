# Setting up an AWS Application Load Balancer for HCL Connections {#cp_config_setup_alb .task}

If your HCL Connections deployment runs on AWS, you can optionally provision an Application Load Balancer (ALB) as an alternative to NGINX for routing external HTTPS traffic to Customizer (mw-proxy), Grafana, Collabora Online, and Connections (IHS).

!!! note

    The existing NGINX-based reverse proxy configuration remains fully supported. The ALB is an optional alternative for AWS environments. For NGINX setup, see [Configuring the NGINX proxy server for Customizer](cp_config_customizer_setup_nginx.md).

!!! important

    If you are currently using a Classic Load Balancer (CLB), you must migrate to an ALB to support Collabora Online. CLB does not support WebSocket upgrades or path-based routing. See [Migrating from Classic Load Balancer to ALB](cp_config_migrate_clb_to_alb.md).

---

## Architecture overview

The ALB sits at the internet edge inside your AWS VPC and routes HTTPS traffic to backend servers based on URL path patterns. The high-level flow is:

1. **Client** sends HTTPS requests to the ALB hostname (resolved via a Route 53 record).
2. **HTTP :80** requests are redirected to HTTPS with a 301 response.
3. **HTTPS :443** requests are evaluated against path-based listener rules (P1–P7) in priority order.
4. Depending on the matched rule, the ALB forwards traffic to one of four target groups:
    - **mw-proxy target group** (port 30301 or 30443) — Customizer paths are forwarded to the HAProxy node, which routes to the mw-proxy pod.
    - **Grafana target group** (port 31111) — `/grafana*` is forwarded to the HAProxy node, which routes to the Grafana pod.
    - **Collabora target group** (port 32443 or 32080) — Collabora WebSocket upgrade paths are forwarded to the HAProxy node, which routes to the Traefik ingress controller and then to Collabora pods.
    - **Connections target group** (port 443) — all other paths (including `/browser/*`, `/hosting/*`, and non-WebSocket `/cool/*`) are forwarded to IHS, which routes to WebSphere Connections.
5. The HAProxy node acts as an intermediary for mw-proxy, Grafana, and Collabora traffic; IHS handles the default Connections traffic.

---

## Prerequisites

Before creating the ALB, ensure the following are in place:

- An **AWS account** with permissions to manage EC2 security groups, Elastic Load Balancing (ALB, listeners, target groups), Route 53 records, and ACM certificates.
- A **Route 53 public hosted zone** (for example, `cnx-example.net`) already exists in your AWS account.
- An **ACM certificate** covering your external Connections hostname (for example, `*.cnx-example.net`) already exists and is in `ISSUED` state in the same AWS region where the ALB will be created.
- At least **two public subnets in different Availability Zones** within the VPC where the ALB will be deployed.
- Backend EC2 instances (**HAProxy** and **IHS**) are running and reachable within the VPC.
- The **security group IDs** for both backend instances are known.

---

## Step 1: Create the target groups {#section_targetgroups}

Create the following four target groups in the [Amazon EC2 console](https://console.aws.amazon.com/ec2/) under **Load Balancing > Target Groups**, or by using the AWS CLI. Choose a naming prefix of your choice (shown as `<prefix>` below).

For each target group, select **Instances** as the target type, specify the VPC that contains your backend EC2 instances, and register the appropriate backend instance as described in the **Backend Instance** column.

| Target Group Name | Protocol | Port | Backend Instance | Health Check Path | Health Check Protocol | Healthy Response Codes |
|---|---|---|---|---|---|---|
| `<prefix>-mw-proxy` | HTTP or HTTPS | 30301 or 30443 | HAProxy node | `/` | HTTP or HTTPS | 200, 301 |
| `<prefix>-grafana` | HTTP | 31111 | HAProxy node | `/grafana/` | HTTP | 200, 302 |
| `<prefix>-connections` | HTTPS | 443 | IHS node | `/` | HTTP or HTTPS | 200, 301, 302 |
| `<prefix>-collabora` | HTTP or HTTPS | 32080 or 32443 | HAProxy node | `/cool/hosting/discovery` | HTTP or HTTPS | 200, 301, 302, 404 |

Configure the following health check settings for **all** target groups:

| Setting | Value |
|---|---|
| Interval | 15 seconds |
| Timeout | 3 seconds |
| Healthy threshold | 3 |
| Unhealthy threshold | 2 |

!!! note "Secure (TLS) variants"

    If TLS is enabled for the Component Pack ingress:

    - Change the **mw-proxy** target group protocol to **HTTPS** and port to **30443**.
    - Change the **collabora** target group protocol to **HTTPS** and port to **32443**.

!!! note

    The Collabora target group routes to HAProxy, which forwards to the Traefik ingress controller NodePort on the Kubernetes node. Traefik then forwards to the `collabora-online` Kubernetes service on port 9980.

**Using the AWS CLI:**

The following example creates the mw-proxy target group. Repeat for the remaining three target groups with the appropriate values from the table above.

```sh
aws elbv2 create-target-group \
  --name <prefix>-mw-proxy \
  --protocol <protocol> \
  --port <port> \
  --vpc-id <your-vpc-id> \
  --target-type instance \
  --health-check-protocol <health-check-protocol> \
  --health-check-path / \
  --health-check-interval-seconds 15 \
  --health-check-timeout-seconds 3 \
  --healthy-threshold-count 3 \
  --unhealthy-threshold-count 2 \
  --matcher '{"HttpCode":"200,301"}' \
  --region <your-region>
```

After creating each target group, register the appropriate backend instance:

```sh
aws elbv2 register-targets \
  --target-group-arn <target-group-arn> \
  --targets Id=<instance-id> \
  --region <your-region>
```

---

## Step 2: Create the ALB and configure listeners {#section_alb_listeners}

### Create the ALB

1. In the [Amazon EC2 console](https://console.aws.amazon.com/ec2/), go to **Load Balancing > Load Balancers** and choose **Create Load Balancer**.
2. Select **Application Load Balancer**.
3. Configure the following settings:

    | Setting | Recommended Value |
    |---|---|
    | **Scheme** | Internet-facing |
    | **IP address type** | IPv4 |
    | **VPC** | The VPC containing your backend instances |
    | **Subnets** | Select at least two public subnets in different Availability Zones |
    | **Security group** | Create or select a security group (see [Step 3](#section_securitygroups)) |
    | **Idle timeout** | 300 seconds |

**Using the AWS CLI:**

```sh
aws elbv2 create-load-balancer \
  --name <prefix>-app-alb \
  --subnets <subnet-id-1> <subnet-id-2> \
  --security-groups <alb-security-group-id> \
  --scheme internet-facing \
  --type application \
  --ip-address-type ipv4 \
  --region <your-region>
```

Set the idle timeout:

```sh
aws elbv2 modify-load-balancer-attributes \
  --load-balancer-arn <alb-arn> \
  --attributes Key=idle_timeout.timeout_seconds,Value=300 \
  --region <your-region>
```

### Create the HTTP :80 listener

Create a listener on port 80 that redirects all traffic to HTTPS:

1. On the ALB details page, choose **Add listener**.
2. Set the protocol to **HTTP**, port to **80**.
3. For the default action, choose **Redirect** to HTTPS port 443 with status code `301`.

**Using the AWS CLI:**

```sh
aws elbv2 create-listener \
  --load-balancer-arn <alb-arn> \
  --protocol HTTP \
  --port 80 \
  --default-actions Type=redirect,RedirectConfig="{Protocol=HTTPS,Port=443,StatusCode=HTTP_301}" \
  --region <your-region>
```

### Create the HTTPS :443 listener

Create a listener on port 443 with your ACM certificate. The default action forwards to the **connections** target group (IHS). You will then add path-based rules for the other target groups.

1. Add a listener with protocol **HTTPS**, port **443**.
2. Select your ACM certificate.
3. Set the SSL policy to `ELBSecurityPolicy-TLS13-1-2-2021-06`.
4. Set the default action to forward to the `<prefix>-connections` target group.

**Using the AWS CLI:**

```sh
aws elbv2 create-listener \
  --load-balancer-arn <alb-arn> \
  --protocol HTTPS \
  --port 443 \
  --ssl-policy ELBSecurityPolicy-TLS13-1-2-2021-06 \
  --certificates CertificateArn=<your-acm-certificate-arn> \
  --default-actions Type=forward,TargetGroupArn=<connections-target-group-arn> \
  --region <your-region>
```

### Add path-based listener rules

Add the following rules to the HTTPS listener. Rules are evaluated in priority order; the first match wins. Use the listener ARN from the previous step.

| Priority | Path Pattern(s) | Action | Target Group |
|---|---|---|---|
| 1 | `/robots.txt` | Fixed response `200 text/plain` with body: `User-agent: *`<br>`Disallow: /` | *(none — fixed response)* |
| 2 | `/files/customizer*`, `/files/app*`, `/communities/service/html*`, `/forums/html*`, `/search/web*` | Forward | `<prefix>-mw-proxy` |
| 3 | `/homepage/web*`, `/social/home*`, `/mycontacts*`, `/wikis/home*`, `/blogs*` | Forward | `<prefix>-mw-proxy` |
| 4 | `/news*`, `/activities/service/html*`, `/profiles/html*`, `/viewer*` | Forward | `<prefix>-mw-proxy` |
| 5 | `/grafana*` | Forward | `<prefix>-grafana` |
| 6 | `/cool/adminws`, `/cool/ws`, `/cool/*/ws`, `/controller/adminws`, `/controller/ws` | Forward | `<prefix>-collabora` |
| 7 | `/controller/*/ws` | Forward | `<prefix>-collabora` |

!!! note

    Priorities 2–4 all forward to the **mw-proxy** target group (Customizer). They are split across three rules because ALB limits the number of path patterns per rule to five.

!!! note

    Priorities 6–7 route **only Collabora WebSocket upgrade paths** to the Traefik ingress controller. All other Collabora HTTP paths (`/browser/*`, `/hosting/*`, `/cool/hosting/discovery`) fall through to the default rule (IHS) and are proxied via IHS to HAProxy to Traefik. The ALB natively handles WebSocket upgrades — no separate configuration is needed. If Collabora is not deployed, these paths return 502 but do not affect any other Connections functionality.

**Using the AWS CLI:**

The following example creates priority 1 (fixed response for `/robots.txt`):

```sh
aws elbv2 create-rule \
  --listener-arn <https-listener-arn> \
  --priority 1 \
  --conditions Field=path-pattern,Values='/robots.txt' \
  --actions Type=fixed-response,FixedResponseConfig="{ContentType=text/plain,StatusCode=200,MessageBody='User-agent: *\nDisallow: /\n'}" \
  --region <your-region>
```

The following example creates priority 2 (Customizer paths forwarded to mw-proxy):

```sh
aws elbv2 create-rule \
  --listener-arn <https-listener-arn> \
  --priority 2 \
  --conditions Field=path-pattern,PathPatternConfig="{Values=['/files/customizer*','/files/app*','/communities/service/html*','/forums/html*','/search/web*']}" \
  --actions Type=forward,TargetGroupArn=<mw-proxy-target-group-arn> \
  --region <your-region>
```

Repeat the `create-rule` command for priorities 3–7 with the corresponding path patterns and target group ARNs from the table above.

---

## Step 3: Configure security groups {#section_securitygroups}

You need to configure three security groups to allow traffic between the ALB and the backend instances.

### ALB security group

Create a new security group for the ALB (for example, `<prefix>-app-alb-sg`) and add the following inbound rules:

| Protocol | Port | Source | Description |
|---|---|---|---|
| TCP | 80 | `0.0.0.0/0` | HTTP (redirected to HTTPS) |
| TCP | 443 | `0.0.0.0/0` | HTTPS |

### Frontend LB (HAProxy) security group

Add the following inbound rules to the existing security group of the HAProxy node, using the ALB security group as the source:

| Protocol | Port | Source | Description |
|---|---|---|---|
| TCP | 30301 | ALB security group | mw-proxy (Customizer) |
| TCP | 31111 | ALB security group | Grafana |
| TCP | 32080 | ALB security group | Traefik for Collabora |

!!! note

    If TLS is enabled for the Component Pack ingress, use port **30443** instead of 30301 for mw-proxy, and port **32443** instead of 32080 for Collabora.

### IHS security group

Add the following inbound rule to the existing security group of the IHS node:

| Protocol | Port | Source | Description |
|---|---|---|---|
| TCP | 443 | ALB security group | HTTPS to IHS |

---

## Step 4: Create a DNS record {#section_dns}

Create a Route 53 record to point your Connections hostname to the ALB.

1. In the [Route 53 console](https://console.aws.amazon.com/route53/), open your hosted zone.
2. Create a new record:

    | Setting | Value |
    |---|---|
    | **Record name** | Your desired hostname (for example, `connections`) |
    | **Record type** | A |
    | **Alias** | Yes |
    | **Route traffic to** | Alias to Application Load Balancer, select your region, then select your ALB |

An ALIAS A record is recommended (rather than a CNAME) because it resolves within AWS without an extra DNS query and incurs no Route 53 query charges.

**Using the AWS CLI:**

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

---

## Step 5: Verify the deployment {#section_verification}

After completing the setup, run the following checks to verify that traffic is routing correctly.

**Check the DNS record resolves:**

```sh
dig +short <your-alb-hostname>
```

**Test default routing (IHS / Connections):**

```sh
curl -I https://<your-alb-hostname>/
# Expected: HTTP 200, 301, or 302 from IHS
```

**Verify target group health in the AWS console or CLI:**

```sh
aws elbv2 describe-target-health \
  --target-group-arn <target-group-arn> \
  --region <your-region>
# All targets should show "healthy"
```

**Test Customizer routing (mw-proxy):**

```sh
curl -I https://<your-alb-hostname>/files/customizer
# Expected: response from mw-proxy
```

**Test Grafana routing:**

```sh
curl -I https://<your-alb-hostname>/grafana
# Expected: HTTP 302 redirect to Grafana login
```

---

## Collabora Online support {#section_collabora}

The ALB configuration includes routing for **Collabora WebSocket upgrade paths only** to the Traefik ingress controller running on the HAProxy/frontend LB node. All other Collabora HTTP paths are routed via IHS (default rule), matching the NGINX configuration pattern.

### How it works

The ALB setup for Collabora consists of:

1. A target group (`<prefix>-collabora`) pointing to the HAProxy node on the Traefik NodePort (32080 for HTTP, or 32443 for HTTPS if TLS is enabled).
2. **Priority 6 and 7 listener rules** forwarding WebSocket paths to the Collabora target group:
    - P6: `/cool/adminws`, `/cool/ws`, `/cool/*/ws`, `/controller/adminws`, `/controller/ws`
    - P7: `/controller/*/ws`
3. A security group rule allowing the ALB to reach the HAProxy node on the Traefik port.
4. All other Collabora paths (`/browser/*`, `/hosting/*`, non-WS `/cool/*`) fall through to the **default rule** and are routed via IHS to HAProxy to Traefik to Collabora pods.

### Prerequisites for Collabora to function

- Collabora Online deployed in Kubernetes.
- A Kubernetes Ingress resource for Collabora exists (paths: `/cool/`, `/browser/`, `/hosting/`) with `ingressClassName: cnx-ingress-traefik`.
- Traefik ingress controller running with its NodePort exposed through HAProxy.
- IHS configured with `ProxyPass` rules for Collabora HTTP paths.

### Collabora verification

```sh
# WOPI discovery endpoint (routes via IHS, should return XML)
curl -s https://<your-alb-hostname>/hosting/discovery | head -5

# Collabora admin console (routes via IHS)
curl -I https://<your-alb-hostname>/browser/dist/admin/admin.html
# Expected: 200 (or 401 if auth configured)

# WebSocket upgrade test (routes via ALB P6 rule directly to Traefik)
curl -I -H "Upgrade: websocket" -H "Connection: Upgrade" \
  https://<your-alb-hostname>/cool/adminws
# Expected: 101 Switching Protocols

# Verify non-WS /cool/* routes through IHS
curl -I https://<your-alb-hostname>/cool/hosting/discovery
# Should route via default rule → IHS → HAProxy → Traefik
```

---

**Parent topic:** [Configuring the Component Pack](../install/cp_config_intro.md)
