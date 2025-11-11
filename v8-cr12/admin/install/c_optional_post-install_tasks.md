# Optional post-installation tasks 

Complete the post-installation tasks that are relevant to your deployment.

-   **[Adding a node to a cluster](../install/t_adding_nodes_to_cluster.md)**  
Add a node to an existing cluster.
-   **[Configuring a reverse caching proxy](../install/t_install_deploy_caching_proxy.md)**  
Configure a reverse proxy that directs all traffic to your HCL Connections deployment to a single server.
-   **[JavaScript configuration](../install/t_javascript_config.md)**  

-   **[Enabling locked domains](../install/t_post_install_cre11_conn_security_locked.md)**  
Assuming that you have completed the server setup previously described, to enable locked domains in HCL Connections, specify an additional attribute in the LotusConnections-config.xml to ensure that only ConnectionsOpensocial application is mapped to the locked domain host.
-   **[Configuring the custom ID attribute for users or groups](../install/t_post-install_configure_dif_guid.md)**  
Configure HCL Connections to use custom ID attributes to identify users and groups in the LDAP directory.
-   **[Post-installation tasks for Connections PDF Export](../install/install-guide-preparations.md)**  

-   **[Post-installation tasks for Connections Touchpoint](../install/c_post-install_tasks_for_touchpoint.md)**  
Touchpoint is an onboarding wizard aimed at increasing adoption for first time users. It provides a wizard that runs the user through mandatory steps: accepting policies and suggests content \(people and communities\) to follow in order to prepare a more customized and enhanced experience.
-   **[Configuring external collaboration](../install/t_install_configure_external_collab.md)**  
External collaboration allows internal and external users to work together in your HCL Connections deployment. You can either configure this feature to allow self-registration by external users who received an invitation, or you can manage registration with a custom setup tailored to your particular environment.
-   **[Integrating Connections Sidebar with a website](../install/t_install_config_sidebar_for_website.md)**  
Configure a web application on a company-managed server to be able to display the Connections Sidebar, so that your users can see their important updates without leaving the website.
-   **[Configuring Files to use an object store](../admin/admin_files_conf_obj_store.md)**  
Configure HCL Connections Files to seamlessly work with an external object store, providing scalability and data recovery for your deployment, while enabling faster access to files for users.
-   **[Installing and deploying HCL Connections Docs](../install/t_inst_deploy_file_viewr.md)**  
To extend HCL Connections to offer users a way to view documents, spreadsheets, and presentations within the Files application, install and set up Viewer from HCL Connections Docs.
-   **[Deploying URL preview in an environment where anonymous access is disabled](../install/t_inst_access_internal_resources_when_authentication_forced.md)**  
To deploy URL preview optionally in an environment where anonymous access is disabled within HCL Connections, you must define a system user as a proxy for the oEmbed/image proxy services so that it can perform HTTP requests.
-   **[Enabling anonymous access for the Rich Content Widget component](../install/t_inst_enable_anonymous_access_for_rte.md)**  
Define a system user to impersonate HTTP read-only requests to the File AppData API for the Rich Content Widget component.
-   **[Customizing browser cookie cleanup on user logout](../install/t_inst_customize_cookie_cleanup_on_user_logout.md)**  
You can manage and add to the list of browser cookies to be cleaned up on user logout.
-   **[Configuring an NGINX server for long polling](../install/inst_post_nginx.md)**  
If you deploy an NGINX proxy server to manage push notifications for HCL Connections™, you can configure it to use load balancing and thus provide a greater long poll interval.
-   **[Setting up and configuring a WAS proxy server for long poll testing](../secure/t_admin_config_was_proxy.md)**  
HTTP long polling can be used to push updates to a web client. A connection is held open between the web client and the web server so that when the server has new information it can push it to the client. That connection is then closed. For Connections Social Cloud, a WebSphere® Application Server \(WAS\) proxy server must be used to test this function.
-   **[Configuring notifications](../admin/t_admin_common_config_notification.md)**  
Enable support for email notifications in HCL Connections applications.
-   **[Enable the Help icon to access HCL Connections Help Center](../install/t_install_enable_help_center.md)**  
Enable the Help icon in the left navigation bar to open the HCL Connections Help Center.

**Parent topic:**  [Administering Connections 8.0](../welcome/welcome_admin.md)


