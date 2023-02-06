# Configuring the HTTP server for the App Registry {#cp_config_customizer_HTTP_server .task}

Configure the IBM® HTTP Server to redirect users to the App Registry, where they can add customizations.

If you already configured Orient Me, then this task is not needed for Customizer.

If you have not configured Orient Me, then complete this task to ensure that the HTTP server redirects users to the App Registry when they log in to Connections.

1.  Log in to the HTTP server as the root user \(AIX®, Linux®\) or the administrator \(Windows™\).

2.  Backup the current httpd.conf.

3.  Open the http.conf file in a text editor.

    The http.conf file is typically stored in the following location:

    -   AIX: /opt2/IBM/HTTPServer/
    -   Linux: /opt/IBM/HTTPServer/conf/
    -   Windows: D:\\IBM\\HTTPServer\\conf\\
4.  In the file, verify that the following modules are listed and that the lines are not commented out:

    ```
    LoadModule proxy_module modules/mod_proxy.so 
    LoadModule proxy_connect_module modules/mod_proxy_connect.so 
    LoadModule proxy_ftp_module modules/mod_proxy_ftp.so 
    LoadModule proxy_http_module modules/mod_proxy_http.so 
    ```

    If the lines are commented out, remove the comment markers.

5.  Insert the following statements in two places:

    -   Before the `LoadModule ibm_ssl_module modules/mod_ibm_ssl.so` statement
    -   Between the `<VirtualHost *:443>` and `</VirtualHost>` statements
    Statements to insert:

    ```
    ProxyPreserveHost On
    ProxyPass "/social" "http://master\_node\_host\_name:32080/social" 
    ProxyPassReverse "/social" "http://master\_node\_host\_name:32080/social" 
    ProxyPass "/itm" "http://master\_node\_host\_name:32080/itm" 
    ProxyPassReverse "/itm" "http://master\_node\_host\_name:32080/itm"
    ProxyPass "/community_suggestions/api/recommend/communities" "http://master\_node\_host\_name:32080/community_suggestions/api/recommend/communities"
    ProxyPassReverse "/community_suggestions/api/recommend/communities" "http://master\_node\_host\_name:32080/community_suggestions/api/recommend/communities"
    ProxyPass "/appreg" "http://master\_node\_host\_name:32080/appreg/"
    ProxyPassReverse "/appreg" "http://master\_node\_host\_name:32080/appreg/"
    ProxyPass "/appregistry" "http://master\_node\_host\_name:32080/appregistry" 
    ProxyPassReverse "/appregistry" "http://master\_node\_host\_name:32080/appregistry"
    ```

    For high availability deployments, replace `master\_node\_host\_name` with the load balancer DNS of the HA cluster \(Must be FQHN\).

    **Note:** 32080 is the port of the Ingress Controller, so make sure that is deployed and running before making these changes. Take note of the new appreg URL when using Ingress.

    For example, after inserting the above statements, your code block will look like the following snippet:

    ```
         ProxyPreserveHost On
         ProxyPass /appreg http://master_node_host_name:32080/appreg/
         ProxyPassReverse /appreg http://master_node_host_name:32080/appreg/
         ProxyPass /appregistry http://master_node_host_name:32080/appregistry
         ProxyPassReverse /appregistry http://master_node_host_name:32080/appregistry 
    
    LoadModule ibm_ssl_module modules/mod_ibm_ssl.so
    <IfModule mod_ibm_ssl.c>
         Listen 0.0.0.0:443
    <VirtualHost *:443>
         ServerName HTTPServerHostname.com
         ProxyPreserveHost On
         ProxyPass /appreg http://master_node_host_name:32080/appreg/
         ProxyPassReverse /appreg http://master_node_host_name:32080/appreg/
         ProxyPass /appregistry http://master_node_host_name:32080/appregistry
         ProxyPassReverse /appregistry http://master_node_host_name:32080/appregistry 
    
         #DocumentRoot /opt/IBM/HTTPServer/htdocs
         SSLEnable
         SSLProtocolDisable SSLv3 SSLv2 TLSv11
    </VirtualHost>
    </IfModule>
    ```

6.  Save the httpd.conf file.

7.  Apply the changes by restarting the HTTP server gracefully; for example:

    ```
    /opt/IBM/HTTPServer/bin/apachectl graceful
    ```

8.  To verify the proxy, complete the following steps.

    -   Open a browser to http://httpserver.domain.com/appreg.
    -   Log into Connections. The appreg homepage displays, where you can add new apps.

**Parent topic:**[Configuring the Customizer component](../install/cp_config_customizer_intro.md)

