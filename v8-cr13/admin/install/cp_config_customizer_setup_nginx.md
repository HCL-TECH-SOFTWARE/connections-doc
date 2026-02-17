# Configuring the NGINX proxy server for Customizer 

A reverse proxy server is required to forward HTTP requests to mw-proxy for customizations to be applied with the HCL Connections™ Customizer component. Any reverse proxy application with the appropriate configuration rules can be used. The following sample guide provides steps on how to configure an NGINX proxy server to function as a reverse proxy server for the Connections Customizer component.

Customizer supports all URLs across Connections but it is best to optimize your NGINX config to only send traffic from the pages you want to customize, so that the NGINX server will then redirect to `mw-proxy`. At a minimum, you need the files/customizer path so that `mw-proxy` can resolve injections to the page you want to customize. The following list shows example paths for different Connections apps where you can customize pages:

- /files/customizer \(required\)  
- /files/app  
- /communities/service/html  
- /forums/html  
- /search/web  
- /homepage/web  
- /social/home  
- /mycontacts  
- /wikis/home  
- /blogs  
- /news  
- /activities/service/html  
- /profiles/html  
- /viewer

There are two general approaches for setting up NGINX as a reverse proxy server for Customizer select the approach that best suits your needs:

-   Install NGINX on a stand-alone server and point it at Connections Customizer \(mw-proxy service\), which in turn points to the IBM® HTTP Server \(Connections\).

    With this configuration, all other micro services go directly to IHS, bypassing Customizer; however, when using Customizer, the “Connections” URL would now be the address of the NGINX server.

-   Install NGINX on the same server as IBM HTTP Server.

    With this approach, you must modify IHS to run on a different port because NGINX would now listen on ports 443/80. With this configuration, all traffic to Connections will route from NGINX through Customizer to IBM HTTP Server.


1.  Install an NGINX server as described at the nginx.org site.

    At this stage, you will only install the packages. Configuring the NGINX server is explained in later steps.

2.  Update the Connections dynamic host with NGINX server.

    !!! note
        Keep in mind that you must add the `isExternal` attribute to the Sametime configuration in LotusConnections-config.xml if you configured Sametime awareness through the Sametime server as described in [Adding Sametime awareness through the Sametime server](../admin/t_admin_common_add_st_awareness_via_proxy.md).

    If you will use NGINX as a stand-alone server, then first you must update the `dynamicHosts` attribute in the LotusConnections-config.xml file to reflect the URL of the proxy server. On the Deployment Manager, update the LotusConnections-config.xml file with the following setting:

    ```
    <dynamicHosts enabled="true">
    <host href="http://proxy.example.com" ssl_href="https://proxy.example.com"/>
    </dynamicHosts>
    ```

    where `proxy.example.com` is the host name of your reverse proxy server.

    !!! note

    - The dynamic hosts settings does not affect interservice URLs. Therefore, even when the proxy server is enabled, Connections still routes internal communication between the applications through their own interservice URLs. You can force this internal traffic to be routed over the proxy server by updating the interservice URLs to use the proxy server, running a helm upgrade of the connections-env chart, and setting `ic.internal` to the FQDN of the proxy server.
    - Each `href` attribute in the LotusConnections-config.xml file is case-sensitive and must specify a fully-qualified domain name.
    - If an entry for the dynamicHosts already exists in the LotusConnections-config.xml, modify it to match the example entries.
    - Remember to sync the nodes for the change to take effect.
3.  Verify that the value of `customizer-interservice-host` in the connections-env configmap is set to the FQDN or IP address of the IBM HTTP Server that sits in front of your Connections server.

    Run the following command on any of the Component Pack servers to check the value:

    ```
    kubectl get configmap connections-env -o yaml -n connections | grep customizer-interservice-host
    ```

4.  On the NGINX server, create an SSL certificate directory.

    The directory might already exist; if it does not exist, create it now. For example, the following command creates a directory called `etc/nginx/ssl` below the `NGINX_INSTALL_DIR` directory.

    ```
    $ openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/nginx-selfsigned.key -out /etc/nginx/ssl/nginx-selfsigned.crt
    ```

5.  Edit the `NGINX_INSTALL_DIR/conf/nginx.conf` file and replace the `[MW_PROXY_SERVICE]:[MW_PROXY_PORT]` values with the host name and port that mw-proxy is listening on.

    1.  On your Master, determine the port value by running the following command:

        ```
        kubectl get services -n connections | grep mw-proxy
        ```

        The default `MW_PROXY_PORT` is `30301`.

    2.  Update the `nginx.conf` file and add the `MW_PROXY_SERVICE` and `MW_PROXY_PORT` values as shown in the following example.

    !!! note
        If you are using HA, then `MW_PROXY_SERVICE` represents the fronting Kubernetes master address \(for example, the load balancer or a virtual IP address\). Otherwise, it represents the IP address of the Master node.

    ```
    worker_processes  1;
    
    events {
        worker_connections  1024;
    }
    
    
    http {
        include       mime.types;
        default_type  application/octet-stream;
    
        sendfile        on;
    
        keepalive_timeout  65;
    
        server {
            listen       80;
            server_name  localhost;
    
            
            location / {
                root   html;
                index  index.html index.htm;
            }
    
            # redirect server error pages to the static page /50x.html
            
            error_page   500 502 503 504  /50x.html;
            location = /50x.html {
                root   html;
            }
            
        }
    		proxy_redirect          off;
    		proxy_set_header        Host            $host;
    		proxy_set_header        X-Real-IP       $remote_addr;
    		proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
    		proxy_connect_timeout   90;
    		proxy_send_timeout      90;
    		proxy_read_timeout      90;
    		proxy_buffers           32 4k;
    		server {
    			listen 		443 ssl;
    			server_name 127.0.0.1;	
    			ssl_certificate Path_to_NGINX-self-signed/nginx-selfsigned.crt;
    			ssl_certificate_key Path_to_NGINX-self-signed/nginx-selfsigned.key;
    			ssl_session_cache    shared:SSL:1m;
    			ssl_session_timeout  5m;
    
    			ssl_ciphers  HIGH:!aNULL:!MD5;
    			ssl_prefer_server_ciphers  on;	
    			
    			location / {
    				#Points to the master with mw-proxy. Port should be as below
    				proxy_pass http://**MW_PROXY_SERVICE:MW_PROXY_PORT**;
    			}
    		}
    
    }
    ```

6.  To only route required Customizer URLs to `mw-proxy` and filter out all other requests directly to IHS, create a nested location or locations in the `nginx.conf` file as follows:

    ```
    location / {
        location ~ ^/(files/app|files/customizer|communities/service/html/|forums/html|search/web/) {
            proxy_pass http://[MW_PROXY_SERVICE]:[MW_PROXY_PORT];
        }
        
        # If the list is getting too long create another location for other URLs. 
        location ~ ^/(homepage/web/|social|mycontacts) {
        proxy_pass http://[MW_PROXY_SERVICE]:[MW_PROXY_PORT];
        }
    
        # Explicitly exclude some known high traffic requests that should not be routed via mw-proxy service
        # Add others if you are aware of additional examples in your Connections environment
        location ~ /(profiles/dsx|communities/dsx|profiles/photo.*.do) {
            proxy_pass https://IHS_SERVER;
        }
        proxy_pass https://IHS_SERVER;
    }
    ```

7.  \(Linux® only\) Disable the firewall between the Kubernetes masters and the NGINX server.

    If the NGINX server runs on Linux, ensure that the firewall is not enabled between the Kubernetes masters and the NGINX server. Disable the firewall by running the following command on the NGINX server:

    ```
    sudo setsebool -P httpd_can_network_connect true
    ```

8.  Modify the service configuration to support starting the NGINX server using systemctl:

    1.  Run the following commands to create a limits file for the service:

        ```
        mkdir /etc/systemd/system/nginx.service.d
        vi /etc/systemd/system/nginx.service.d/nofile_limit.conf
        ```

    2.  Add the following statements to the new file:

        ```
        [Service]
        LimitNOFILE=16384
        ```

    3.  Save and close the file.

    4.  Run the following command to reload the system daemon:

        ```
        systemctl daemon-reload
        ```

9.  Edit the /etc/nginx/nginx.conf file and add the following statements:

    ```
    events {
        worker_connections 16384;
    }
    ```

    The value shown here is an example; you might need to use a different value for your environment.

10. Start the NGINX server with the following command:

    ```
    sudo systemctl start nginx
    ```

11. Identify the PID for the master and worker processes.

    ```
    ? ps -ef | grep nginx
    root       4443      1  0 12:04 ?        00:00:00 nginx: master process /usr/sbin/nginx -c /etc/nginx/nginx.conf
    nginx      4444   4443 47 12:04 ?        00:06:50 nginx: worker process
    ```

12. Review the process limit information to ensure it has been updated to the new values.

    ```
    $ grep 'Max open files' /proc/444{3,4}/limits
    /proc/4443/limits:Max open files            16384                16384                files
    /proc/4444/limits:Max open files            16384                16384                files
    ```

13. Test the configuration for errors by running the following command:

    ```
    nginx -t
    ```

14. If you modified the configuration file to correct any errors, reload the file with the following command:

    ```
    sudo systemctl reload nginx
    ```


Monitor the /var/log/nginx/error.log file for errors related to open files and worker connections. Error messages look like the following examples:

```
socket() failed (24: Too many open files) while connecting to upstream

worker_connections are not enough while connecting to upstream
```

**Parent topic:** [Configuring the Customizer component](../install/cp_config_customizer_intro.md)

