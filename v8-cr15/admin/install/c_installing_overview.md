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

!!! Note: There are additional security enhancements for Microsoft SQL Server 2025 and the JDBC 13.4 driver, which are outlined in the *Before installing*

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

