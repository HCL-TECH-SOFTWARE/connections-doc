# Post-installation tasks {#c .reference}

After installation, you need to perform further tasks to ensure an efficient deployment.

## Tasks to be completed { .section}

After running the wizards to install applications and create databases, check which of the following additional tasks you need to complete.

Some post-installation tasks are mandatory while others are optional and depend on your deployment choices. Unless *optional* is indicated, any listed post-installation task should be considered mandatory.

!!! important 
    
    Once you complete the mandatory tasks, update the deployment with the latest fixes. For more information, see the [Updating Connections 8.0 with the latest fixes](../migrate/c_updating_interim_fixes.md) topic in the *Migrating and updating* section of this guide.

Each post-installation task is described in a separate topic.

-   **[Registering custom widgets](../install/inst_post_reg_custom_widgets.md)**  
Register all custom and third-party widgets starting with HCL Connections™ 6 CR1 \\IFR1 to ensure they meet security requirements and can display in communities.
-   **[Regenerate the webserver plugin](../install/tiny_editors/t_regenerate-webserver-plugin.md)**
Regenerate and propagate the web server plugin after performing an update or installation that affects the web server configuration.
-   **[Reviewing the JVM heap size](../install/t_increase_jvm_heap.md)**  
Review the size of the Java™ Virtual Machine heap and adjust it, if necessary, to avoid out-of-memory errors or to suit your hardware capabilities.
-   **[Configuring the community creation wizard](../install/t_configure_community_wizard.md)**  
Starting with Connections 7.0, a community wizard is available to help users create communities. Replacement of the old Community creation process is managed by configuration, which provides you the flexibility to first deploy and test that capability and then switch the user experience.
-   **[Configuring IBM HTTP Server](../install/c_add_ihs_over.md)**  
When you have successfully installed HCL Connections™ to run on WebSphere® Application Server, you can configure IBM® HTTP Server to handle web traffic.
-   **[Configuring the Home page administrator](../install/t_create_admin.md)**  
Create an administrator for Home page so that you can make changes to the application such as adding and removing widgets.
-   **[Configuring additional HCL Connections applications](../install/t_inst_config_addons.md)**  
You must perform additional tasks to enable type-ahead search, and configurin Sharing with MS Teams in HCL Connections.

**Parent topic:** [Administering Connections 8.0](../welcome/welcome_admin.md)

