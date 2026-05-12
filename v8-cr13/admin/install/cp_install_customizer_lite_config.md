# Configuring Customizer Lite

Configuring HCL Connections for Customizer Lite.

## Configuring Connections:

Log into the Connections machine and configure the following aspects.

## Modifying HTTPServer

1.  Make a back up of the httpd.conf file before opening it. On a Linux machine it is usually located in /opt/IBM/HTTPServer/conf.
2.  In the file, verify that the following modules are listed and that the lines are not commented out \(If the lines are commented out, remove the comment markers\):

    ```
    LoadModule proxy_module modules/mod_proxy.so 
    LoadModule proxy_connect_module modules/mod_proxy_connect.so 
    LoadModule proxy_ftp_module modules/mod_proxy_ftp.so 
    LoadModule proxy_http_module modules/mod_proxy_http.so 
    
    ```

3.  Insert the following statements in two places:

    -   Before the LoadModule ibm\_ssl\_module modules/mod\_ibm\_ssl.so statement
    -   Between the <VirtualHost \*:443\> and </VirtualHost\> statements
    Statements to insert:

    ```
    LoadModule proxy_module modules/mod_proxy.so 
    LoadModule proxy_connect_module modules/mod_proxy_connect.so 
    LoadModule proxy_ftp_module modules/mod_proxy_ftp.so 
    LoadModule proxy_http_module modules/mod_proxy_http.so 
    
    ```

    After the change, the code block should look like the following snippets depending on a single vs HA deployment configuration.

    For Customizer Lite single Docker node deployment:

    ```
    ProxyPreserveHost On
    ProxyPass /appreg http://customizer_machine_name:7000
    ProxyPassReverse /appreg http://customizer_machine_name:7000   
    ProxyPass /appregistry http://customizer_machine_name:3002/appregistry
    LoadModule ibm_ssl_module modules/mod_ibm_ssl.so
    <IfModule mod_ibm_ssl.c>
         Listen 0.0.0.0:443
    <VirtualHost *:443>
         ServerName HTTPServerHostname.com
         ProxyPreserveHost On
         ProxyPass /appreg http://customizer_machine_name:7000
         ProxyPassReverse /appreg http://customizer_machine_name:7000
         ProxyPass /appregistry http://customizer_machine_name:3002/appregistry
         ProxyPassReverse /appregistry http://customizer_machine_name:3002/appregistry 
    
         #DocumentRoot /opt/IBM/HTTPServer/htdocs
         SSLEnable
         SSLProtocolDisable SSLv3 SSLv2 TLSv11
    </VirtualHost>
    </IfModule>
    ```

4.  Save the httpd.conf file.
5.  Apply the changes by restarting the HTTP server gracefully; for example:

    ```
     /opt/IBM/HTTPServer/bin/apachectl graceful 
    ```


## Modifying Lotus-Connections config

1.  Open the LotusConnections-config.xml file.
2.  Search for the Dynamic Host entry. Set the value to true and specify the path to the machine hosting Nginx.

    ```
    <dynamicHosts enabled="true">
    <host href="http://my_installation_of_nginx" ssl_href="https://my_installation_of_nginx"/>
    </dynamicHosts> 
    ```

3.  Add the `isExternal` attribute to the Sametime configuration in LotusConnections-config.xml if you configured Sametime awareness through the Sametime server as described in [../admin/t\_admin\_common\_add\_st\_awareness\_via\_proxy.md](../admin/t_admin_common_add_st_awareness_via_proxy.md).
4.  Sync the nodes and restart Connections.

## Using Customizer

Refer to [../customize/customize\_inject\_customizations.md](../customize/customize_inject_customizations.md) for additional information.

## Useful commands

The following commands are helpful when using Customizer Lite.

-   To view any container restarts run:

    ```
    docker inspect --format "ID: {{.ID}} RESTARTS: {{.RestartCount}} NAME: {{.Name}}" $(docker ps -aq)
    ```

-   To view a specific log, run the appropriate command:

    ```
    docker-compose logs -f mw-proxy
    docker-compose logs -f appregistry-service
    docker-compose logs -f appregistry-client
    ```

-   To shutdown Customizer:

    ```
    docker-compose down
    ```


## Changing log levels

Log levels for each of the services can be set in the .env file in /customizerLite/scripts.

-   APPREGISTRY\_SERVICE\_LOG\_LEVEL=info
-   APPREGISTRY\_CLIENT\_LOG\_LEVEL=info
-   Mw-Proxy can only be enabled or disabled
-   MW\_PROXY\_LOGGING\_ENABLED=true

## Changing maximum allowed HTTP header size

The Node.js server code enforces a maximum HTTP header size on requests. In Node.js v8 and v12, the maximum HTTP header size was 8 kB. For v14 and later versions, it was 16 kB. In Node.js v11.6.0 and later versions, the command line parameter `*--max-http-header-size*` was introduced so you can customize the maximum size. For details, see the [Node.js command line](https://nodejs.org/docs/latest-v12.x/api/cli.html#cli_max_http_header_size_size) documentation.

The Docker images that make up a Customizer Lite deployment, which are *appregistry-client*, *appregisry-service*, and *mw-proxy*, have been updated to make use of this mechanism.

1.  Specify a desired maximum HTTP header size for requests by adding the following line in the `scripts/.env` file:

    ``` {#codeblock_gzc_p2z_n5b}
    NODE_HEADER_SIZE_MAX=nnnnn
    ```

    Where *nnnnn* is the required size in bytes.

    For example, if you want the header maximum size to be 32 kB, enter:

    ``` {#codeblock_hzc_p2z_n5b}
    NODE_HEADER_SIZE_MAX=32768
    ```

    This NODE\_HEADER\_SIZE\_MAX variable is then used in the `scripts/docker-compose.yml` file, repeated in each of the three service sections to set an environment variable called NODE\_MAX\_HEADER\_SIZE consistently for each service:

    ``` {#codeblock_izc_p2z_n5b}
    version: '3'
    services:
      appregistry-service:
        environment:
         …
         NODE_MAX_HEADER_SIZE: '${NODE_HEADER_SIZE_MAX}'
         …
      mw-proxy:
        environment:
          …
          NODE_MAX_HEADER_SIZE: '${NODE_HEADER_SIZE_MAX}'
          …
      appregistry-client:
        environment:
         …
         NODE_MAX_HEADER_SIZE: '${NODE_HEADER_SIZE_MAX}'
         …
    ```

    The values are then passed into the Docker container environment of each service and used with `*--max-http-header-size=$\{NODE\_MAX\_HEADER\_SIZE\}*` to specify the size to be used at Node.js server startup.

2.  If necessary, you can specify different values for each service in two ways:
    -   Hard-code different values for NODE\_MAX\_HEADER\_SIZE in each section of the `docker-compose.yml` file directly.
    -   Use separate and unique environment variable names in the `scripts/.env` file and map those to the corresponding NODE\_MAX\_HEADER\_SIZE entries in each service section.

## Troubleshooting

**Customizations not loading**

-   Check that the application is enabled
-   Check that the path specified in the application matches the page expecting the injection
-   Ensure that any match criteria in the application are correct
-   Make sure that the customization file has read permissions
-   Ensure that the path being customized is allowed in the Nginx config in the case where a redirect block is being used. See setting up and optimizing Nginx.

**Links in Connections are not resolving to the proxy**

-   Re-check the steps for Lotus-Configuration change for Connections
-   Make sure that Connections was restarted

**Customizer apps are not saving**

-   Check that the settings directory in the Customization installation exists
-   Check that the settings directory has write access

**Links in Connections are not resolving to the proxy**

-   Check that the urls in the .env file of customizerLite/scripts were set correctly
-   Check that the urls were correctly set in the nginx conf

**Port conflicts**

By default, Customizer light uses ports 7000, 3001, 3002. These can be updated to suit your preference. The changes need to be made in the following locations:

-   In the customizerLite/script/.env ports can be set for each of the services.

    Modify the first line under each of the default settings as required. For example, APPREGISTRY\_SERVICE\_PORT=30012 Then restart Customizer. "docker-compose down" followed by "docker-compose up"

-   The HttpServer settings will need to be updated to match these ports. See Modifying HTTPServer.

