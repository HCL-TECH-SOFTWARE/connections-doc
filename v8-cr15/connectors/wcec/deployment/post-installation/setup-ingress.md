---
title: Setting up Ingress
tags:
    - CEC (WebEngine)
    - Ingress
    - NGINX
    - Kubernetes
    - Network routing
    - Configuration
---
# Setting up Ingress

NGINX Ingress Controller is built around the Kubernetes Ingress resource, using a ConfigMap to store the NGINX configuration. Ingress exposes HTTP and HTTPS routes from outside the cluster to services within the cluster. You can use as fully supported the official community NGINX ingress controller with all the extras that it gives you.

## Creating an ingress

In this section, we will define an Ingress resource that will expose the HCL Connections Engagement Center (WebEngine) component outside the Kubernetes cluster.

Use the following resource definition to create an Ingress:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/proxy-body-size: 50m
    nginx.ingress.kubernetes.io/backend-protocol: "HTTPS"
  name: cnx-ingress-web-engine
spec:
  rules:
    - host: "*.your-domain.com" # Replace with your actual domain or hostname (e.g., example.com)
      http:
        paths:
          - backend:
              service:
                name: "<release-name>-web-engine-headless" # Replace <release-name> with your Helm release name
                port:
                  number: 9443
            path: /wps/(.*)
            pathType: ImplementationSpecific
```
