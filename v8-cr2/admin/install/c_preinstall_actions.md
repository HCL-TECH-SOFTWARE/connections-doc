# Pre-installation tasks {#c_preinstall_actions .concept}

Complete the following tasks before installing HCL Connections. If you are migrating from a prior release of HCL Connections, do not complete the tasks for creating databases or populating the Profiles database. The migration process handles those tasks automatically.

-   **[Verifying disk space and open file limits before installing HCL Connections](../install/t_preinstall_sys.md)**  
On all operating systems, ensure that you have 6 GB of temporary disk space. On Linux™, set the Open File Descriptor limit to at least 40000 before installing HCL Connections.
-   **[Preparing to configure the LDAP directory](../install/t_config_ldap.md)**  
Determine which Lightweight Directory Access Protocol \(LDAP\) attributes you want to use as the identifiers for HCL Connections users.
-   **[Installing IBM WebSphere Application Server and IBM HTTP Server](../install/t_install_was_http.md)**  
HCL Connections requires an environment where the WebSphere® Application Server Deployment Manager and one node are installed and configured in advance. IBM® HTTP Server and the Web Server Plug-ins for IBM® WebSphere® Application Server are also prerequisites. This software is provided with the HCL Connections package.
-   **[Accessing Windows network shares](../install/t_access_network_shares.md)**  
Configure a user account to access network shares in an HCL Connections deployment on the Microsoft® Windows® operating system
-   **[Setting up federated repositories](../install/t_inst_federated_repositories.md)**  
Use federated repositories with IBM® WebSphere® Application Server to manage and secure user and group identities.
-   **[Creating databases](../install/c_install_db_over.md)**  
Create databases for the applications that you plan to install. You can use the database wizard or run the SQL scripts that are provided with HCL Connections.
-   **[Populating the Profiles database](../install/t_prof_install_profiles_db.md)**  
Populate the Profiles database with data from the LDAP directory.
-   **[Before installing](../install/r_before_installing.md)**  
Verify that all necessary prerequisite conditions are complete before installing HCL Connections.

**Parent topic:**[Installing Connections](../install/c_installing.md)

