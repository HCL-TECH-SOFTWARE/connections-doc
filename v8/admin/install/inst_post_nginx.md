# Configuring an NGINX server for long polling {#inst_post_nginx .task}

If you deploy an NGINX proxy server to manage push notifications for HCL Connections™, you can configure it to use load balancing and thus provide a greater long poll interval.

You can optionally deploy an NGINX or NGINX Plus proxy server to manage push notifications instead of using IBM® HTTP Server. For information on using an NGINX proxy server for push notifications, see the IBM developerWorks® article, [NGINX and WebSphere® Application Server](https://developer.ibm.com/wasdev/docs/nginx-websphere-application-server/#source-build).

If you deploy an NGINX proxy server to direct push notifications to Connections mobile users and you intend to support a large number of concurrent client connections, you might want to configure load balancing on the server to provide a greater long poll interval. Increasing the long poll interval enables client connections to be held open until the server is ready to respond to clients, thus reducing the response time.

The load-balancing settings are optional, and they do not have to be added in a specific file; however, they should be nested within an existing scope \(http, server, location, and so on\).

In the following example, the settings are nested within the main location scope in the nginx.conf configuration file.

```
........
http{

server{
.............

location / {

location /push/ {

proxy_pass https://pns_ssl;
proxy_ssl_name $host;
proxy_ssl_server_name on;
                    
proxy_http_version 1.1;
proxy_set_header Connection "";
proxy_set_header Upgrade $http_upgrade;
proxy_buffering off;
keepalive_timeout 160s;
keepalive_requests 100000;
proxy_read_timeout  900s;
proxy_connect_timeout       75;
proxy_send_timeout          600;
send_timeout                600;
proxy_ignore_client_abort on; 
}
	 proxy_pass https://backend_secure;
........
}
}


upstream pns_ssl {
.......
least conn;
server server1:9447 max_fails=0 fail_timeout=60s;
server server2:9447 max_fails=0 fail_timeout=60s;
keepalive 512;
    
**The following statement for sticky cookie is only available for NGINX Plus**: sticky cookie srv_id expires=2h domain=.domain.com path=/;
}
upstream backend_secure {
.......
server webserver:443 max_fails=0 fail_timeout=90s;      
}

}

```

**Parent topic:**[Optional post-installation tasks](../install/c_optional_post-install_tasks.md)

