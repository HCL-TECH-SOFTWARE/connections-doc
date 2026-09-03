---
title: Configuring IBM HTTP Server
tags:
    - CEC (WebEngine)
    - IBM HTTP Server
    - IHS
    - httpd.conf
    - ProxyPass
    - Configuration
---
# Configuring IBM HTTP server

## Updating `httpd.conf`

To enable network routing from your IBM HTTP Server (IHS) to the Ingress Controller for HCL Connections Engagement Center (WebEngine), you need to configure your `httpd.conf` file.

Add the `ProxyPass` and `ProxyPassReverse` rules below to your HTTP server's `httpd.conf` file. These should typically be placed within the `<IfModule mod_ibm_ssl.c></IfModule>` block, after the `SSLEnable` directive.

Replace `<INGRESS_CONTROLLER_HOSTNAME_OR_IP>` with the actual hostname or IP address of your Kubernetes Ingress Controller, and `<INGRESS_HTTPS_PORT>` with the secure port exposed by your Ingress (commonly `32443` or `443`).

```conf
# Proxy rules for WebEngine
ProxyPass "/wps" "https://<INGRESS_CONTROLLER_HOSTNAME_OR_IP>:<INGRESS_HTTPS_PORT>/wps"
ProxyPassReverse "/wps" "https://<INGRESS_CONTROLLER_HOSTNAME_OR_IP>:<INGRESS_HTTPS_PORT>/wps"
```

!!! note
    - These rules must be integrated into your existing `httpd.conf` configuration.    - Ensure that the target `https://<INGRESS_CONTROLLER_HOSTNAME_OR_IP>:<INGRESS_HTTPS_PORT>` matches the external endpoint exposed by your Kubernetes Ingress Controller, as configured in the [Set up Ingress](./setup-ingress.md) step.

## Enabling secure traffic to the ingress controller

HCL Connections Engagement Center (WebEngine) requires Transport Layer Security (TLS) to be enforced for traffic between IBM HTTP Server (IHS) and the Ingress Controller.

!!! note
    To ensure IHS can establish an SSL/TLS connection with the secure Ingress Controller backend, the `SSLProxyEngine On` directive must be enabled within the relevant `<VirtualHost>` configuration in `httpd.conf`.
For detailed information and instructions on enabling secure traffic to the Ingress Controller, refer to the relevant documentation.
