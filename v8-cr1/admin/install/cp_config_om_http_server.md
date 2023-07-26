# Configuring the HTTP server for Orient Me {#cp_config_om_http_server .task}

Configure the IBM® HTTP Server to redirect users from the HCL Connections™ home page to the Orient Me home page.

Complete this task to ensure that the HTTP server redirects users to the Orient Me home page when they log in to Connections.

Using the sample deployment described in [Steps to install or upgrade to Component Pack](cp_install_services_tasks.md#section_awd_rwp_tnb), the Kubernetes master node is used in the proxy rules in this document. In an HA environment, the load balancer DNS of the HA cluster should be used (must be FQHN).

1.  Log in to the HTTP server as the root user \(Linux™\) or the administrator \(Windows™\).

2.  Backup the current httpd.conf.

3.  Open the http.conf file in a text editor.

    The http.conf file is typically stored in the following location:

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
    ProxyPass "/social" "http://cpmaster.internal.example.com:32080/social" 
    ProxyPassReverse "/social" "http://cpmaster.internal.example.com:32080/social" 
    ProxyPass "/itm" "http://cpmaster.internal.example.com:32080/itm" 
    ProxyPassReverse "/itm" "http://cpmaster.internal.example.com:32080/itm"
    ProxyPass "/community_suggestions/api/recommend/communities" "http://cpmaster.internal.example.com:32080/community_suggestions/api/recommend/communities"
    ProxyPassReverse "/community_suggestions/api/recommend/communities" "http://cpmaster.internal.example.com:32080/community_suggestions/api/recommend/communities"
    ProxyPass "/appreg" "http://cpmaster.internal.example.com:32080/appreg/"
    ProxyPassReverse "/appreg" "http://cpmaster.internal.example.com:32080/appreg/"
    ProxyPass "/appregistry" "http://cpmaster.internal.example.com:32080/appregistry" 
    ProxyPassReverse "/appregistry" "http://cpmaster.internal.example.com:32080/appregistry"
    ```

    **Note:** 32080 is the port of the Ingress Controller, so make sure that is deployed and running before making these changes. Take note of the new appreg URL when using Ingress.

    For example, after inserting the above statements, your code block will look like the following snippet:

    ```
         ProxyPreserveHost On
         ProxyPass /social http://cpmaster.internal.example.com:32080/social
         ProxyPassReverse /social http://cpmaster.internal.example.com:32080/social
         ProxyPass /itm http://cpmaster.internal.example.com:32080/itm
         ProxyPassReverse /itm http://cpmaster.internal.example.com:32080/itm
         ProxyPass /community_suggestions/api/recommend/communities http://cpmaster.internal.example.com:32080/community_suggestions/api/recommend/communities
         ProxyPassReverse /community_suggestions/api/recommend/communities http://cpmaster.internal.example.com:32080/community_suggestions/api/recommend/communities
         ProxyPass /appreg http://cpmaster.internal.example.com:32080/appreg/
         ProxyPassReverse /appreg http://cpmaster.internal.example.com:32080/appreg/
         ProxyPass /appregistry http://cpmaster.internal.example.com:32080/appregistry
         ProxyPassReverse /appregistry http://cpmaster.internal.example.com:32080/appregistry 
    
    LoadModule ibm_ssl_module modules/mod_ibm_ssl.so
    <IfModule mod_ibm_ssl.c>
         Listen 0.0.0.0:443
    <VirtualHost *:443>
         ServerName HTTPServerHostname.com
         ProxyPreserveHost On
         ProxyPass /social http://cpmaster.internal.example.com:32080/social
         ProxyPassReverse /social http:/cpmaster.internal.example.com:32080/social
         ProxyPass /itm http://cpmaster.internal.example.com:32080/itm
         ProxyPassReverse /itm http://cpmaster.internal.example.com:32080/itm
         ProxyPass /community_suggestions/api/recommend/communities http://cpmaster.internal.example.com:32080/community_suggestions/api/recommend/communities
         ProxyPassReverse /community_suggestions/api/recommend/communities http://cpmaster.internal.example.com:32080/community_suggestions/api/recommend/communities
         ProxyPass /appreg http://cpmaster.internal.example.com:32080/appreg/
         ProxyPassReverse /appreg http://cpmaster.internal.example.com:32080/appreg/
         ProxyPass /appregistry http://cpmaster.internal.example.com:32080/appregistry
         ProxyPassReverse /appregistry http://cpmaster.internal.example.com:32080/appregistry 
    
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

8.  To verify the proxy, open a browser to https://nginx.example.com/social/views/login.html and make sure you get the Orient-Me POC login screen. Do it again to https://nginx.example.com/social/views/login.html


**Parent topic:** [Configuring the Orient Me component](../install/cp_config_om_intro.md)

