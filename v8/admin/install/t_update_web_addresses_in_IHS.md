# Updating HCL Connections to use the HTTP server 

Update the web addresses that IBM® HTTP Server uses to access HCL Connections applications.

If you installed and configured IBM HTTP Server after you have installed HCL Connections, your HCL Connections applications are automatically mapped to the web server. However, if you installed and configured IBM HTTP Server before you installed HCL Connections, you must manually map the applications.

Before you continue with this task, map the application modules to IBM HTTP Server. For more information, see [Mapping applications to IBM HTTP Server](t_map_apps2ihs.md).

If you are using the Files, Wikis, or Libraries applications, configure IBM HTTP Server to handle file downloads from those applications as described in [Configuring file downloads through the HTTP server](t_install_post_files_downloads.md).

If you do not install a web server such as IBM HTTP Server, users must include the correct port number in the web address that they use to access the application. When you use a web server, users can access the applications without using port numbers.

By default, the web address that you enter to access HCL Connections applications includes the port number for each application. To avoid using port numbers, update the web addresses by editing the LotusConnections-config.xml file. IBM HTTP Server can then redirect requests to the appropriate port for each application.

For more information about editing configuration files, see [Editing configuration files](../admin/t_admin_common_checkout_config_file.md).

To update the web addresses to your HCL Connections applications, complete the following steps:

1.  Stop WebSphere Application Server.

2.  Check out the LotusConnections-config.xml file. The file is stored by default in the following directory:

    -   Linux™: /opt/IBM/WebSphere/AppServer/profiles/profile\_name/config/cells/cell\_name/LotusConnections-config
    -   Windows™: C:\\IBM\\WebSphere\\AppServer\\profiles\\profile\_name\\config\\cells\\cell\_name\\LotusConnections-config
3.  For each application, edit the LotusConnections-config.xml directly to update the web addresses specified in the href and ssl\_href properties:

    ```
    <sloc:href>
    <sloc:hrefPathPrefix>/application</sloc:hrefPathPrefix>
    <sloc:static
    href="http://webserver:port"
    ssl_href="https://webserver:port">
    <sloc:interService 
    href="https://webserver:port">
    </sloc:href>
    ```

    where

    -   webserver is the domain name of IBM HTTP Server, such as webserver.example.com.
    -   port is the default port number of the application. Remove the port number when you specify a web server.
    -   application is the name of an HCL Connections application.
    
       **Note:** Each href attribute in the LotusConnections-config.xml file is case-sensitive and must specify a fully-qualified domain name.

    For example, to update the web address for Communities, add the following specifications to the file:

    <sloc:href\>

    <sloc:hrefPathPrefix\>/communities</sloc:hrefPathPrefix\>

    <sloc:static href="http://webserver.example.com"

    ssl\_href="https://webserver.example.com"\>

    <sloc:interService href="https://webserver.example.com"\>

    </sloc:href\>

    **Note:** If you plan to use a reverse proxy, the web addresses defined in this file must be updated to match the appropriate proxy server URLs. For more information about [how to configure a reverse proxy](../install/t_install_deploy_caching_proxy.md).

4.  Save and check in the LotusConnections-config.xml file.

5.  Synchronize the nodes.

6.  Start the servers that were stopped in Step 1.

7.  Log on to each application to ensure that the web addresses in the navigation bar are correct.

You can access each application without needing to specify a port number.

**Parent topic:** [Configuring IBM HTTP Server](../install/c_add_ihs_over.md)
