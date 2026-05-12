# Installing HCL Connections {#c_installing_overview .concept}

Select the HCL Connections applications that you plan to use and install them in a clustered deployment.

An HCL Connections™ deployment consists of the following components:

-   WebSphere® Application Server nodes:
    -   One node with IBM® WebSphere Application Server Network Deployment Manager \(DM\) installed.
    -   One or more WebSphere Application Server nodes that can be federated into the DM cell. These nodes are hosts for cluster members.
-   A system with a database server installed.
-   An LDAP server.
-   A system with IBM HTTP Server installed.

**Important:**

-   Before beginning the installation, you must understand the prerequisites for HCL Connections. For more information, see the *Before installing* topic and ensure that you meet all the conditions that are prescribed for your deployment environment.
-   If Feature Foundation is included in your HCL Connections 7.0 installation then both Rollback and Uninstall will fail in the IBM Installation Manager. Make sure you have a full backup of the Connections server before upgrading. Refer to [Backing up HCL Connections](https://help.hcltechsw.com/connections/v7/admin/migrate/t_back-up.html) for details. You can use this backup to restore your existing deployment if the migration or update fails.

Procedures to install HCL Connections:

-   **[Installing as a non-root user](../install/t_non-root_install.md)**  
Grant permissions to a non-root user to install HCL Connections.
-   **[Installing HCL Connections 8.0](../install/t_install_cluster.md)**  
Install HCL Connections.
-   **[Installing in console mode](../install/t_install_console-mode.md)**  
Install HCL Connections in console mode. This method is convenient if you cannot or do not want to use the graphical mode.
-   **[Installing silently](../install/c_install_silent.md)**  
Silent installation is a tool to simplify the installation process in enterprises that need multiple, identical instances of HCL Connections.

**Parent topic:** [Installing Connections](../install/c_installing.md)

