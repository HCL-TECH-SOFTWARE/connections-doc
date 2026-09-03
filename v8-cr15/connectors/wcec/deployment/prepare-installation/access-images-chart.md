---
title: Accessing Container Images and Helm Chart
tags:
    - CEC (WebEngine)
    - Container images
    - Helm charts
    - Harbor
    - Access
    - Credentials
    - Repository
    - Download
---

# Accessing container images and Helm chart

CEC is available through the HCL Software portals for customers licensed for HCL Connections with the Engagement Center component.

To deploy HCL Connections Engagement Center (WebEngine), you need to access the container images and Helm chart from the HCL Harbor container registry.

Customers with entitlements to CEC can access the container images and Helm charts from the **[HCL Harbor container repository](https://hclcr.io/)**.

## Harbor container registry

**Registry URL:** `hclcr.io/cnx-cec`

#### Authentication

To pull images from Harbor, you need to authenticate:

```bash
# Login to harbor registry
docker login hclcr.io -u <your-email> -p <your-api-key>

# Or for Kubernetes, create an image pull secret
kubectl create secret docker-registry hcl-harbor-secret \
  --docker-server=hclcr.io \
  --docker-username=<your-email> \
  --docker-password=<your-api-key> \
  -n connections
```

#### Available images

| Image | Description     |
|-------|-----------------|
| `hclcr.io/cnx-cec/hcl-cnx-cec-deployment` | CEC Helm Chart  |
| `hclcr.io/cnx-cec/webengine` | CEC (WebEngine)   |
| `hclcr.io/cnx-cec/logging-sidecar` | Logging Sidecar |

### Helm chart

The Helm chart for deploying CEC is available from the HCL OCI registry:

```bash
# Add the Helm repository
helm repo add hcl-dx oci://hclcr.io/cnx-cec

# Pull the chart
helm pull oci://hclcr.io/cnx-cec/hcl-cnx-cec-deployment --version <version>
```

## Entitlement and licensing

### User session tracking

CEC deployments can be configured to track user session consumption for licensing purposes.

### Exporting usage reports

Usage reports can be manually exported for compliance and auditing purposes. Contact your HCL representative for details on licensing requirements.




