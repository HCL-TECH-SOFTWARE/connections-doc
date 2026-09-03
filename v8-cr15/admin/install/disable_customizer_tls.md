# Disabling secure traffic for Customizer {#disabling_secure_traffic_customizer}

If required, use the procedures described in this guide to apply the configuration changes and the step-by-step instructions to disable TLS (HTTPS) traffic and revert to the HTTP protocol for the Customizer (mw-proxy) in HCL Connections Component Pack environments.

## Prerequisites {#prerequisites}

Before you begin, check the following prerequisites:

- Component Pack deployed. (see [Set up Customizer](https://help.hcl-software.com/connections/latest/admin/install/cp_install_services_tasks.html#section_n3c_xhj_dvb))
- Administrative access to Kubernetes cluster and NGINX/HAProxy configuration files.

## How to disable TLS for Customizer {#disable_tls_customizer}

Perform the following steps to disable TLS (HTTPS) traffic and revert to using HTTP protocol for Customizer in HCL Connections Component Pack environments.

Update NGINX for secure proxying by:

1. Configure NGINX to route Customizer traffic to mw-proxy using HTTP (`30301`). Modify the file at `<<NGINX_DIR>>/nginx.conf`:

    With TLS enablement (HTTPS):

    ```sh
    nginx
    location ~ ^/(files/customizer|files/app|communities/service/html|forums/html|search/web|homepage/web|social/home|mycontacts|wikis/home|blogs|news|activities/service/html|profiles/html|viewer) {
        proxy_pass https://proxy-server.com:30443;
    }
    ```

    After disabling TLS (HTTPS):

    ```sh
    nginx
    location ~ ^/(files/customizer|files/app|communities/service/html|forums/html|search/web|homepage/web|social/home|mycontacts|wikis/home|blogs|news|activities/service/html|profiles/html|viewer) {
        proxy_pass http://proxy-server.com:30301;
    }
    ```
        
2. Reload or restart the NGINX to apply the change.

    Verification:

    ```bash
    cat /etc/nginx/nginx.conf | grep -A 2 "location.*files/customizer"
    ```

    By updating the NGINX configuration, TLS can be disabled by routing traffic to the Customizer (`mw-proxy`) using the HTTP port.

**Parent topic:** [Configuring HTTPS Communication for the Component Pack](../install/cp_tls_intro.md)