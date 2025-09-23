# Modifying the installation in console mode {#modify_installation_console .task}

Using console mode, modify your deployment of HCL Connections by adding or removing applications.

Use IBM® Installation Manager in console mode to add or remove HCL Connections applications. This method is convenient if you cannot or do not want to use the interactive mode.

To modify your installation, complete the following steps:

1.  On each node, stop any running instances of WebSphere® Application Server and WebSphere node agents.

2.  Start WebSphere Application Server Network Deployment Manager.

3.  Open a command prompt and change to the [IM\_root](../plan/i_ovr_r_directory_conventions.md)/eclipse/tools directory.

4.  Run the following command to start IBM Installation Manager in console mode:

    -   Linux: `./imcl -c`
    -   Windows: `imcl.exe -c`

5.  Type 3 to begin modifying the deployment.

6.  In the **Select packages to modify** step, select **HCL Connections** and then type **N** to proceed.

7.  Select the applications that you want to add or remove and then type **N**.

    -   Add applications: Type the numbers corresponding to applications that are not already installed and that you want to add to your deployment.
    -   Remove applications: Type the numbers corresponding to installed applications that you want to remove from your deployment. The Home page, News, and Search applications are required and can't be removed.
    
    !!! note
        
        All installed applications are selected by default.

8.  Enter the administrative ID and password of the Deployment Manager.

    !!! note
        
        This ID is set to the connectionsAdmin J2C authentication alias, which is mapped to the following Java™ EE roles: dsx-admin, widget-admin, and search-admin. It is also used by the service integration bus. If you plan to use security management software such as Tivoli® Access Manager or SiteMinder, the ID that you specify here must exist in the LDAP directory. For more information, see the *Switching to unique administrator IDs for system level communication* topic.

9.  Configure your topology. For more information about each option, see [Deployment options](../plan/c_planning_the_installation.md).

    -   Small deployment:
        1.  Type **1** to select the **Small deployment** topology.
        2.  Enter a **Cluster name** for the topology.
        3.  Select a **Node**.
        4.  Enter a **Server member** name for the node.
        5.  Type **N** to proceed.

    -   Medium deployment:
        1.  Type **2** to select the **Medium deployment** topology.
        2.  Select the default value or enter a **Cluster name** for each application or for groups of applications. For example, use Cluster1 for Activities, Communities, and Forums.

            !!! note 
                
                IBM Installation Manager creates servers and clusters when required.

        3.  Select a **Node** for each cluster. Accept the predefined node or select a different node.

            !!! note
                
                These nodes host application server instances that serve HCL Connections applications. You can assign multiple nodes to a cluster, where each node is a server member of that cluster.

        4.  Enter a **Server member** name for the selected node. Choose the default or enter a custom name.

            !!! note
                
                If you enter a custom server member name, the name must be unique across all nodes in your deployment.

        5.  The topology that you specified is displayed. To re-specify any details, type the number that corresponds to the application; for example, type **1** for Activities.
        6.  Type **N** to proceed.

    -   Large deployment:
        1.  Type **3** to select the **Large deployment** topology.
        2.  Enter a **Cluster name** for each application.

            !!! note
                
                IBM Installation Manager creates servers and clusters when required.

        3.  Select a **Node** for each cluster. Accept the predefined node or select a different node.

            !!! note
                
                These nodes host application server instances that serve HCL Connections applications. You can assign multiple nodes to a cluster, where each node is a server member of that cluster.

        4.  Enter a **Server member** name for the selected node. Choose the default or enter a custom name.

            !!! note
                
                If you enter a custom server member name, the name must be unique across all nodes in your deployment.

        5.  The topology that you specified is displayed. To re-specify any details, type the number that corresponds to the application; for example, type **1** for Activities.
        6.  Type **N** to proceed.

10. Enter the database information:

    1.  Specify whether the installed applications use the same database server or instance: Type **1** to specify that the applications use same database server or instance; type **2** to specify that they use different database servers or instances.

        !!! note 
            
            If allowed by your database configuration, you can select multiple database instances as well as different database servers.

    2.  Select a **Database type** from one of the following options:

        If installing on Windows or Linux:

        -   IBM DB2 Universal Database™
        -   Oracle Enterprise Edition
        -   Microsoft SQL Server Enterprise Edition

    3.  Enter the **Database server host name**. For example: `appserver.enterprise.example.com`

        If your installed applications use different database servers, enter the database host name for each application.

    4.  Enter the **Port** number of the database server. The default values are: 50000 for DB2®, 1521 for Oracle, and 1433 for SQL Server.

        If your installed applications use different database servers or instances, enter the port number for each database server or instance.

    5.  Enter the **JDBC driver location**. For example:

        -   Linux:

            `/opt/IBM/WebSphere/AppServer/lib`

        -   Windows:

            `C:\\IBM\\WebSphere\\Appserver\\lib`

    6.  Ensure that the following JDBC driver libraries are present in the JDBC directory:

        - DB2:   `db2jcc4.jar` and `db2jcc_license_cu.jar`

            !!! note 
                
                Ensure that your user account has the necessary permissions to access the DB2 JDBC files.

        - Oracle:   `ojdbc8.jar`

        - SQL Server:   Download the [SQL Server JDBC 2](https://learn.microsoft.com/en-us/sql/connect/jdbc/release-notes-for-the-jdbc-driver?view=sql-server-ver16#42) driver from the Microsoft website to a local directory and enter that directory name in the **JDBC driver library** field.

            The directory must not contain the sqljdbc.jar file, only the sqljdbc42.jar file. An exception occurs if both files are present in the same directory.

    7.  Enter the **User ID**and **Password** for each database.

        If each database uses the same user credentials, confirm the**Use the same password for all applications** question and then enter the user ID and password for the first database in the list.

        !!! note

            If your database type is Oracle, you must connect to the database with the user ID that you used when you created the application database.

    8.  If you need to make changes, type the number that corresponds to the application that you want to change. Alternatively, type R to reset all the database specifications to their default values.

    9.  Press Enter to verify your database settings. If the validation fails, check your database settings. When the validation succeeds, click **Next**.

        IBM Installation Manager tests your database connection with the database values that you supplied. You can change the database configuration later in the WebSphere Application Server Integrated Solutions Console.

        !!! note
            
            Usually you can continue even if the validation failed because you can change the database settings from WebSphere Application Server Integrated Solutions Console afterward.

11. Review the information that you have entered. To revise your selections, press B. To finish modifying, press M.

12. In the role mapping panel, take one of the following actions:

    -   To map user names to roles now, enter the LDAP user names for the administrative user role, and then enter the LDAP user names for the Global Moderation user. Press **N** to continue to step 12.
    -   To map the user names later, leave the fields for the administrative user role blank, and press **B** to go back to the previous panel.

13. Review the result of the installation. Press F to exit the installation wizard.

14. Restart the Deployment Manager:

    -   Linux: Open a command prompt and change to the [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/Dmgr01/bin directory. Enter the `./stopManager.sh` command and then enter the `./startManager.sh` command.
    -   Windows: Stop and restart the Deployment Manager service.

15. Start all the federated nodes and enter the startNode command. Repeat these steps for each node:

    1.  Log in to a node.

    2.  From a command line, change to the [profile\_root](../plan/i_ovr_r_directory_conventions.md)/bin directory.

    3.  Enter the startNode command for your operating system:

        -   Linux: `./startNode.sh`
        -   Windows: `startNode.bat`

16. Configure the HTTP Server plugin with Connections

    If you chose to configure the WebServer during the install, the settings and configuration for Connections will use the IBM HTTP Server URL for communication. Ensure the HTTP Server plugin is configured to access the different Connections components.

    1.  If not already open, open a browser to the [Integrated Solutions Console](http://cprice6l.swg.usma.ibm.com:9060/ibm/console) and login.

    2.  Click **Servers**, **Server Types**, and **Web servers**.

    3.  Select the **webserver** and click **Generate Plug-in**.

    4.  Select the **webserver** and click **Propagate Plug-in**.

    5.  Open `/opt/IBM/HTTPServer/conf/httpd.conf` in notepad.

    6.  At the bottom of the file find the following line: `LoadModule was_ap22_module /opt/IBM/WebSphere/Plugins/bin/64bits/mod_was_ap22_http.so WebSpherePluginConfig /opt/IBM/WebSphere/Plugins/config/webserver1/plugin-cfg.xml`.

        !!! note 
            
            Make sure the value for `WebSpherePluginConfig` matches where the `plugin-cfg.xml` was propagated. If they don't match, either manually copy the `plugin-cfg.xml` to the location specified in `httpd.conf`, or update`httpd.conf` to look in the correct location.

    7.  Close the `httpd.conf`.

    8.  Restart the IBM HTTP Server 8.5 service by running: `/opt/IBM/HTTPServer/bin/apachectl -k start` `/opt/IBM/HTTPServer/bin/apachectl -k stop`.

17. Log in to the Integrated Solutions Console on the DM to perform a full synchronization of all nodes.

    1.  Go to **System administration** \> **Nodes**.

    2.  Select the nodes and click **Full Resynchronize**.

    !!! note 
        
        Wait until the DM copies all the application EAR files to the installedApps directory on each of the nodes. This process can take up to 30 minutes.

    To verify that the DM has distributed the application EAR files to the nodes, check the SystemOut.logfile of each node agent. The default path to the SystemOut.logfile on a node is [profile\_root](../plan/i_ovr_r_directory_conventions.md)/logs/nodeagent.

    Look for a message such as the following example: ADMA7021I: Distribution of application application\_name completed successfully. where application\_name is the name of an HCL Connections application.

18. Start all your HCL Connections clusters:

    1.  Log in to the Integrated Solutions Console on the DM.

    2.  Navigate to **Servers** \> **Clusters** \> **WebSphere Application server clusters**.

    3.  Select the HCL Connections clusters and click **Start**.

    !!! note
        
        If some applications do not start, the file-copying process might not have completed. Wait a few minutes and start the applications. In case the Connections applications are installed on different clusters, the cluster start order should start with the core features, then move to the other features:

    -   Hompage cluster
    -   News cluster
    -   Search cluster
    -   Common cluster
    -   Files cluster
    -   Push Notification cluster
    -   Rich Text Editor cluster
    -   Widget Container cluster

    After the core features are started, start the other features. The other features include:

    -   Activities cluster
    -   Blogs cluster
    -   Bookmarks cluster
    -   Communities cluster
    -   Forums cluster
    -   Metrics cluster
    -   Moderation cluster
    -   Profiles cluster
    -   Wikis cluster

**Parent topic:**[Installing silently](../install/c_install_silent.md)

