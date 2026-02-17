# Configuring IBM HTTP Server {#c_add_ihs_over .concept}

When you have successfully installed HCL Connections™ to run on WebSphere® Application Server, you can configure IBM® HTTP Server to handle web traffic.

## Prerequisites { .section}

You have installed and configured the prerequisite software.

1.  IBM WebSphere Application Server with the latest version and fixes
2.  IBM HTTP Server with the latest version and fixes
3.  IBM Web server plug-ins with the latest version and fixes
4.  HCL Connections and databases

## Configuring the IBM HTTP server { .section}

Depending on whether the IBM HTTP server was installed and configured during Connections installation, some of the these tasks might already have been performed. Configure IBM HTTP Server to manage web requests to HCL Connections by following these steps.

## Disabling edge-side-include caching { .section}

Edge-side-include \(ESI\) caching is enabled by default in WebSphere Application Server. You must disable it for HCL Connections. If it is not disabled, it will cause problems with HCL Connections applications. For example, the Surveys application as well as others.

To disable ESI caching, in the WebSphere Administration Console, go to **Servers** \> **Server Types** \> **Web servers** \> **web\_server\_name** \> **Plug-in properties** \> **Caching** and deselect **Enable Edge Side Include \(ESI\) processing to cache the responses**. Save the configuration and synchronize nodes. Then generate the plugin configuration, propagate it, and restart the HTTP server or servers.

1.  [Defining IBM HTTP Server](../install/t_create_webserver1_node.md)  
Define IBM HTTP Server to manage web connections. If you select to configure HTTP Server at the beginning of the Connections installation, you would perform this task at that point; otherwise you would perform this after installation completes.
2.  [Mapping applications to IBM HTTP Server](../install/t_map_apps2ihs.md)  
Map HCL Connections applications to IBM HTTP Server.
3.  [Verifying application mappings](../install/t_verify_application_mappings.md)  
Complete this task only if you did not select to configure IBM HTTP Server during the installation HCL Connections.
4.  [Editing the XML configuration file](../install/t_editing_xml_config_file.md)  

5.  [Configuring IBM HTTP Server for an encrypted connection](../install/t_configure_ihs.md)  
Configure IBM HTTP Server to use an encrypted connection.
6.  [Adding certificates to the WebSphere trust store](../install/t_exchange_keys_network.md)  
Import a self-signed IBM HTTP Server certificate into the default trust store of IBM WebSphere Application Server.
7.  [Determining which files to compress](../install/t_ihs_config_not_compressing_files.md)  
If you are not compressing content with the IBM WebSphere Application Server Edge components or a similar device, configure the IBM HTTP Server to compress certain types of content to improve browser performance. 
8.  [Updating HCL Connections to use the HTTP server](../install/t_update_web_addresses_in_IHS.md)  
Update the web addresses that IBM HTTP Server uses to access HCL Connections applications.
9.  [Allow Upload To Files Application](../install/t_allow_uploads_to_files.md)  

10. [Configuring file downloads through IBM HTTP Server](../install/t_install_post_files_downloads.md)  
Configure IBM HTTP Server to manage file downloads from Activities, Files, Mobile, and Wikis. This approach is more efficient than using IBM WebSphere Application Server to serve file downloads.
11. [Configuring file uploads through IBM HTTP Server](../install/t_install_post_files_uploads.md)  
Configure the IBM HTTP Server to manage file uploads from Activities and Files. This approach is more efficient than using the IBM WebSphere® Application Server to receive files larger than 500 MB.

**Parent topic:**[Post-installation tasks](../install/r_post-installation_tasks.md)

**Related information**  


[Managing user data using Profiles administrative commands](../admin/t_admin_profiles_manage_users.md)

