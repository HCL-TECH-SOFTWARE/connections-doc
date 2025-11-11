# Modifying the installation in interactive mode {#modify_installation_interactive .task}

Modify your deployment of HCL Connections by adding or removing applications.

Use the Modify function of the IBM® Installation Manager to add or remove HCL Connections applications.

To modify your installation, complete the following steps:

1.  Open a command prompt and change to the [IM\_root](../plan/i_ovr_r_directory_conventions.md) directory.

2.  Run the following command:

    -   Linux: `./launcher`
    -   Windows: `launcher.exe`

3.  From the IBM Installation Manager menu, click **File** \> **Preferences**.

4.  Click **Repositories**.

5.  In the Repositories area, select the repositories that you want to modify.

6.  Click **OK** to save your selections.

7.  Click **Modify**.

8.  Select HCL Connections and click **Next**.

9.  In the Application Selection page, choose the applications you want to add or remove and then click **Next**.

    -   Add applications: Select the check boxes of any applications that are not already installed and that you want to add to your deployment.
    -   Remove applications: Clear the check boxes of any installed applications that you want to remove from your deployment.

    !!! note
        -   All installed applications are selected by default.
        -   The **Home** page, **News**, and **Search** applications are required and cannot be removed.

10. Enter the administrative ID and password of the Deployment Manager.

    !!! note 
        
        This ID is set to the connectionsAdmin J2C authentication alias, which is mapped to the following Java™ EE roles: dsx-admin, widget-admin, and search-admin. It is also used by the service integration bus. If you plan to use security management software such as Tivoli® Access Manager or SiteMinder, the ID that you specify here must exist in the LDAP directory. For more information, see the *Switching to unique administrator IDs for system level communication* topic.

11. Configure your topology:

    !!! notes
        
        -   The panel described in this step appears only if you selected new applications to install.
        -   If you select an existing cluster on which to deploy applications, the nodes in that cluster are fixed and cannot be modified.

    -   Small deployment:
        1.  Select the **Small deployment** topology.
        2.  Enter a **Cluster name** for the topology.
        3.  Select a **Node**.
        4.  Click **Next**.

    -   Medium deployment:
        1.  Select the **Medium deployment** topology.
        2.  Select the default value or enter a **Cluster name** for each application or for groups of applications. For example, use Cluster1 for Activities, Communities, and Forums.

            !!! note 
                
                IBM Installation Manager creates servers and clusters when required.

        3.  Select a **Node** for each cluster. Accept the predefined node or select a different node.

            !!! note
                
                These nodes host application server instances that serve HCL Connections applications. You can assign multiple nodes to a cluster, where each node is a server member of that cluster.

        4.  Enter a **Server member** name for the selected node. Choose the default or enter a custom name.

            !!! note
    
                If you enter a custom server member name, the name must be unique across all nodes in your deployment.

        5.  Click **Next**.

    -   Large deployment:
        1.  Select the **Large deployment** topology.
        2.  Enter a **Cluster name** for each application.

            !!! note
                
                IBM Installation Manager creates servers and clusters when required.

        3.  Select a **Node** for each cluster. Accept the predefined node or select a different node.

            !!! note
                
                These nodes host application server instances that serve HCL Connections applications. You can assign multiple nodes to a cluster, where each node is a server member of that cluster.

        4.  Enter a **Server member** name for the selected node. Choose the default or enter a custom name.

            !!! note
                
                If you enter a custom server member name, the name must be unique across all nodes in your deployment.

        5.  Click **Next**.

12. Enter the database information.

    !!! note
        
        - The panel described in this step appears only if you selected new applications to install and if the new applications require database configuration.

        - The Connections Content Manager databases will not be shown if you have chosen to use an existing FileNet® deployment.

        - Database information for Global Configuration Data and Object Store must be set correctly or installation will fail.

    1.  Use the same database server or instance: Select **Yes** or **No**.

        !!! note 
            
            If allowed by your database configuration, you can select multiple database instances as well as different database servers.

    2.  Select a **Database type** from one of the following options:

        -   IBM DB2 Universal Database™
        -   Oracle 19c Enterprise
        -   Microsoft SQL Server Enterprise Edition

    3.  Enter the **Database server host name**. For example: `appserver.enterprise.example.com`

        If your installed applications use different database servers, enter the database host name for each application.

    4.  Enter the **Port** number of the database server. The default values are: 50000 or 25000 for DB2®, 1521 for Oracle, and 1433 for SQL Server.

        !!! note
            
            For DB2, 50000 is the default port number for DB2 v11.5.5 and earlier, and 25000 is the default for DB2 v11.5.6 and later.

        If your installed applications use different database servers or instances, enter the port number for each database server or instance.

    5.  Enter the **JDBC driver location**. For example:

        -   Linux:

            `/opt/IBM/WebSphere/AppServer/lib`

        -   Windows:

            `C:\\IBM\\WebSphere\\AppServer\\lib`

    6.  Ensure that the following JDBC driver libraries are present in the JDBC directory:

        - DB2:   `db2jcc4.jar` and `db2jcc_license_cu.jar`

            !!! note 
                
                Ensure that your user account has the necessary permissions to access the DB2 JDBC files.

        - Oracle:   `ojdbc8.jar`

        - SQL Server:   Download the [SQL Server JDBC 4](https://learn.microsoft.com/en-us/sql/connect/jdbc/release-notes-for-the-jdbc-driver?view=sql-server-ver16#42) driver from the Microsoft website to a local directory and enter that directory name in the **JDBC driver library** field.

            The directory must not contain the sqljdbc.jar file, only the sqljdbc42.jar file. An exception occurs if both files are present in the same directory.

    7.  Enter the **User ID**and **Password** for each database.

        If each database uses the same user credentials, select the **Use the same password for all applications** check box and then enter the user ID and password for the first database in the list.

        !!! note
            
            If your database type is Oracle, you must connect to the database with the user ID that you used when you created the application database.

    8.  Click **Validate** to verify your database settings. If the validation fails, check your database settings. When the validation succeeds, click **Next**.

        IBM Installation Manager tests your database connection with the database values that you supplied. You can change the database configuration later in the WebSphere® Application Server Integrated Solutions Console.

        !!! note 
            
            Usually you can continue even if the validation failed because you can change the database settings from WebSphere Application Server Integrated Solutions Console afterward.

13. In the summary panel, confirm your selection and click **Modify**.

14. When the modification process is complete, restart the Deployment Manager and all the nodes.

    !!! note
        
        Wait until the DM copies all the application EAR files to the installedApps directory on each of the nodes. This process can take up to 30 minutes.

    To verify that the DM has distributed the application EAR files to the nodes, check the SystemOut.logfile of each node agent. The default path to the SystemOut.logfile on a node is [profile\_root](../plan/i_ovr_r_directory_conventions.md)/logs/nodeagent.

    Look for a message such as the following example: ADMA7021I: Distribution of application application\_name completed successfully. where application\_name is the name of an HCL Connections application.


The log file for IBM Installation Manager records the values that you entered when you ran IBM Installation Manager in interactive mode. To review the log file for IBM Installation Manager, open the date\_time.xml file, where date\_time represents the date and time of the installation. The file by default is in the following directory:

-   Linux \(root user\): `/var/ibm/InstallationManager/logs`
-   Linux \(non-root user\): `user_home/var/ibm/InstallationManager/logs` where `user\_home` is the non-root user account directory

To check the complete details of the installation, open each of the log files in the [connections\_root](../plan/i_ovr_r_directory_conventions.md)/logs directory. Each HCL Connections application that you installed has a log file, using the following naming format: applicationInstallog.txt, where application is the name of an HCL Connections application.

**Parent topic:**[Installing silently](../install/c_install_silent.md)

