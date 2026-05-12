# Configuring the NGINX proxy server for Customizer Lite HA 

The configuration of NGINX is slightly different for load balancing multiple Customizer Lite services when using multiple Docker nodes than for the single instance.

1.  Edit the NGINX\_INSTALL\_DIR/conf/nginx.conf .

2.  Insert an upstream \{\} definition for each of the `mw-proxy`, `appregistry-service` and `appregistry-client` applications and identify the host names and ports of the multiple Docker instances for each service. Add nested locations for the http server for /appreg and /appregistry URIs referencing their corresponding upstream applications in both the http server \(port 80\) and https server \(port 443\) sections. Add a nested location for the `mw-proxy` upstream application in the https server \(port 443\) section.

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
    
        upstream appregistry-client_nodes { 
            server docker_host_1.com:7000; 
            server docker_host_2.com:7000; 
        } 
    
        upstream appregistry-service_nodes { 
            server docker_host_1.com:3002;
            server docker_host_2.com:3002;
        }
    
        upstream mw-proxy_nodes { 
            server docker_host_1.com:3001; 
            server docker_host_2.com:3001; 
        }
        
        server {
            listen       80;
            server_name  localhost; 
          
            location / {
                root   html;
                index  index.html index.htm;
            
                location ~ ^(/appregistry/) {
                    proxy_pass http://appregistry-service_nodes;
                }
    
                location ~* “^/appreg\/?(?<baseuri>.*)” {
                    rewrite "(?i)/appreg/(.*)" /$1 break;
                    rewrite "(?i)/appreg$" / break;
                    proxy_pass http://appregistry-client_nodes;
                }
    
                # redirect server error pages to the static page /50x.html
                
                error_page   500 502 503 504  /50x.html;         	
                
                location = /50x.html {             
                    root   html;   
                }
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
            listen   443 ssl;    
            server_name 127.0.0.1; 
            ssl_certificate Path_to_NGINX-self-signed/nginx-selfsigned.crt; 	ssl_certificate_key Path_to_NGINX-self-signed/nginx-selfsigned.key; 	ssl_session_cache    shared:SSL:1m;    
            ssl_session_timeout  5m; 
            ssl_ciphers  HIGH:!aNULL:!MD5;    
            ssl_prefer_server_ciphers  on; 
        
            location / {
    
                location ~ ^(/appregistry/) {
                    proxy_pass http://appregistry-service_nodes;
                }
    
                location ~* "^/appreg\/?(?<baseuri>.*)" {
                    rewrite "(?i)/appreg/(.*)" /$1 break;
                    rewrite "(?i)/appreg$" / break;
                    proxy_pass http://appregistry-client_nodes;
                }
            
                #Points to the master with mw-proxy. 
                proxy_pass http://mw-proxy_nodes;
            }
        }
    }
    ```

3.  To only route required Customizer URLs to `mw-proxy` and filter out all other requests directly to IHS, create additional nested location\(s\) in the `nginx.config` file in the https server section as follows referencing the upstream application name:

    ```
    location / {
    
    	location ~ ^(/appregistry/) {
          	proxy_pass http://appregistry-service_nodes;
        }
    
        location ~* "^/appreg\/?(?<baseuri>.*)" {
            rewrite "(?i)/appreg/(.*)" /$1 break;
            rewrite "(?i)/appreg$" / break;
            proxy_pass http://appregistry-client_nodes;
        }
        
    	location ~ ^/(files/app|files/customizer|communities/service/html/|forums/html|search/web/) {
          	proxy_passhttp://mw_proxy_nodes;     
    	}
        	
        location ~ ^/(homepage/web/|social|mycontacts) {
          	proxy_pass http://mw_proxy_nodes;
        }    
        
        proxy_pass https://IHS_SERVER; 
    }
    ```

4.  \(Linux® only\) Disable the firewall between the Kubernetes masters and the NGINX server. If the NGINX server runs on Linux®, ensure that the firewall is not enabled between the Kubernetes masters and the NGINX server. Disable the firewall by running the following command on the NGINX server:

    ```
    sudo setsebool -P httpd_can_network_connect true
    ```

5.  Modify the service configuration to support starting the NGINX server using systemctl:

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

6.  Edit the `/etc/nginx/nginx.conf` file and add the following statements:

    ```
    events {
        worker_connections 16384; }
    
    ```

    The value shown here is an example; you might need to use a different value for your environment.

7.  Start the NGINX server with the following command:

    ```
    sudo systemctl start nginx
    ```


