# Enabling secure traffic for Customizer {#enabling_secure_traffic_customizer}

This guide describes the configuration changes and step-by-step procedures to enable TLS (HTTPS) traffic for Customizer (`mw-proxy`) in HCL Connections Component Pack environments. It complements the official documentation by providing a consolidated reference for enabling secure traffic.

## Prerequisites {#prerequisites}

Before you begin, check the following prerequisites:

- Component Pack deployed. (see [Set up Customizer](https://help.hcl-software.com/connections/latest/admin/install/cp_install_services_tasks.html#section_n3c_xhj_dvb))
- Existing TLS secret created for ingress controller (for example, `ingress-nginx-tls-secret`).
- Administrative access to Kubernetes cluster and NGINX/HAProxy configuration files.

## How to enable TLS for Customizer {#enable_tls_customizer}

Perform the following steps to enable TLS (HTTPS) traffic for Customizer in HCL Connections Component Pack environments.

1. TLS certificate setup

    **Using existing ingress TLS secret:** The `mw-proxy` TLS implementation uses an existing ingress TLS secret. Follow these steps:

    1. Enter the following command to verify existing TLS secret:

        ```
        kubectl get secret ingress-nginx-tls-secret -n <<namespace>>
        ```

    2. Enable TLS for ingress controller:
    
        1. Follow the official guide: [Enabling secure traffic to the ingress controller](https://help.hcl-software.com/connections/latest/admin/install/enable_ingress_tls.html?h=enable+ingress+tls)

        2. Generate or obtain TLS certificates, if they are not already available. Refer to the previous step for the required steps to enable secure traffic to the ingress controller.

2. TLS enforcement configuration for Customizer (mw-proxy)

    Reference: [Configuring the Customizer component](https://help.hcl-software.com/connections/latest/admin/install/cp_config_customizer_intro.html). 

    Follow these steps:  

    1. Update NGINX for secure proxying:
    
        1. Configure NGINX to route Customizer traffic to `mw-proxy` using HTTPS (`30443`). Modify the file at `<<NGINX_DIR>>/nginx.conf`:

            Before TLS enablement (HTTP):

             ```sh
             nginx
             location ~ ^/(files/customizer|files/app|communities/service/html|forums/html|search/web|homepage/web|social/home|mycontacts|wikis/home|blogs|news|activities/service/html|profiles/html|viewer) {
                 proxy_pass http://proxy-server.com:30301;
             }
             ```

            After TLS enablement (HTTPS):

             ```sh
             nginx
             location ~ ^/(files/customizer|files/app|communities/service/html|forums/html|search/web|homepage/web|social/home|mycontacts|wikis/home|blogs|news|activities/service/html|profiles/html|viewer) {
                 proxy_pass https://proxy-server.com:30443;
             }
             ```
            
        2. Reload or restart the NGINX to apply the change.

            ```bash
            sudo systemctl restart nginx
            ```

            Verification:
                
            ```bash
            cat /etc/nginx/nginx.conf | grep -A 2 "location.*files/customizer"
            ```

3. **(Optional)** Update HAProxy for secure routing:

    1. If applicable, configure the load balancer (for example, HAProxy) to route traffic to `mw-proxy` on port `30443`. Modify the file at `<<HAPROXY_DIR>>/haproxy.cfg`:

        ```sh
        frontend haproxy_mwproxy_https
            bind *:30443
            mode tcp
            option tcplog
            maxconn 100000
            timeout client  10800s
            default_backend masters_mwproxy_https

        backend masters_mwproxy_https
            mode tcp
            option tcplog
            option tcp-check
            balance roundrobin
            default-server inter 10s downinter 5s rise 2 fall 2 slowstart 60s maxconn 1000 maxqueue 1024 weight 100
            server <k8s-worker-1> <k8s-worker-1-hostname>:30443 check
            server <k8s-worker-2> <k8s-worker-2-hostname>:30443 check
        ```

    2. Reload or restart the HAProxy to apply the change.

        ```
         sudo systemctl restart haproxy
        ```

        Verification:
            
        ```bash
        cat /etc/haproxy/haproxy.cfg | grep -A 15 "frontend haproxy_mwproxy_https"
        ```

**Parent topic:** [Configuring HTTPS Communication for the Component Pack](../install/cp_tls_intro.md)