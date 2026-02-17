# Installing HCL Connections 8.0 {#t_install_cluster .task}

Install HCL Connections.

## Before you begin
Ensure that you complete all the prerequisite tasks that are relevant for your environment. For more information, see the [Before installing](r_before_installing.md) topic.

!!! attention

    The HCL Connections 8.0 database wizard does not create the database for the Community Highlights / Connections Engagement Center \(CEC\) or Feature Foundation \| Export entries to PDF and provides support for Tailored Experience. The Community Highlights database scripts are located in the folder - `/Wizards/connections.sql/icec`. The Feature Foundation database scripts are located in the folder - `/Wizards/connections.sql/ic360`. Refer to the procedure in this section to create the databases. You will need to manually run the SQL scripts that are provided with HCL Connections™. See [Creating databases](c_install_db_over.md) for more information.

## About this task
To install HCL Connections, run the IBM® Installation Manager wizard on the system where the Deployment Manager is installed.

Consider the following guidelines for a successful installation:

-   Depending on your database vendor, have a look at your database limitations. In case of Db2, the NUMDB setting might limit the number of databases for your installation, so consider increasing this parameter if needed, especially if you plan to deploy HCL Docs, which work with it's own databases.
-   It is best that you change the SOAP Request Timeout in the soap.client.props file to `com.ibm.SOAP.requestTimeout=0`, to ensure that no requests time out during the installation.
-   Make sure that the JVM heap size of your Deployment Manager is high enough to prevent your system from crashing with OutOfMemory errors during the upgrade. At least temporarily, modify the JVM heap size to an initial and maximum value of 2048.
-   After making any of the modifications above, restart the Deployment Manager and start the HTTP services afterwards.
-   HCL Connections 8.0 requires IBM Installation Manager 1.9 or above. If you are using an earlier version of IBM Installation Manager than 1.9 than you need to upgrade before installing Connections. The IBM Installation Manager 1.9.2 which can be found at `HCL_Connections_Install\IM\<operatingSystem>`

Assuming you made any of the modifications suggested, restart the Deployment Manager and then start the HTTP services before you proceed to install Connections.

## Procedure
1.  Start WebSphere® Application Server Network Deployment Manager.

2.  Start all the federated nodes using the startNode command. Repeat these steps for each node:

    1.  Log in to a node.

    2.  From a command line, change to the [profile\_root](../plan/i_ovr_r_directory_conventions.md)/bin directory.

    3.  Enter the startNode command for your operating system:

        -   Linux: `./startNode.sh`
        -   Windows: `startNode.bat`

3.  Copy the installation files to the system that hosts the Deployment Manager.

    !!! note 
        
        Ensure that the directory path that you enter contains no spaces.

4.  From the Installation Manager directory, run the file to start the Installation Manager and add the repository to it as follows:

    -   Linux: `IBMIM`
    -   Windows: `IBMIM.exe`

    Repository:

    -   Linux: `Connections set-up\\HCL_Connections_Install\\HCLConnections\\repository.config`
    -   Windows: `Connections set-up\\HCL_Connections_Install\\HCLConnections\\repository.config`

5.  When IBM Installation Manager is launched, in the Select packages to install window, select the packages that you want to install, and then click **Next** to continue.

    !!! note

        - Accept the default setting for **Show all versions**.
        - Click **Check for Other Versions and Extensions** to search for updates to IBM Installation Manager.

6.  Review and accept the license agreement by clicking **I accept the terms in the license agreements**. Click **Next**.

7.  Specify the location of the installation directory for HCL Connections. You can accept the default directory location, enter a new directory name, or click **Browse** to select an existing directory. Click **Next.**

    !!! note 
        
        The path must consist of letters \(a-z, A-Z\), numbers \(0-9\), and an underscore \(\_\).

8.  Confirm the applications that you want to install and click **Next**. You can select from the following options:

    **Important:**

    -   The wizard always installs the Home page, News, and Search, Common, Files, Push Notification, Rich Text Editors, and Widget Container applications, which are core features.

        !!! note 
            
            If you install Communities and want users to be able to add the Rich Content app in a community, you must also install Wikis now.

    -   Install Metrics now so that your application data is captured from the moment that HCL Connections is deployed. If you install Metrics at a later stage, you will not have any data reports for the period before you installed Metrics.

    |Section|Description|
    |-------|-----------|
    |**HCL Connections 8.0**|Install all HCL Connections applications.|
    |**Activities**|Collaborate with colleagues.|
    |**Blogs**|Write personal perspectives about projects.|
    |**Communities**|Interact with people on shared projects.|
    |**Bookmarks**|Bookmark important websites.|
    |**Feature Foundation**|Install software that provides capabilities required for Community Templates\* and Export to PDF|
    |**Forums**|Discuss projects and exchange information.|
    |**Metrics**|Identify and analyze usage and trends.|
    |**Mobile**|Access HCL Connections from mobile devices.|
    |**Moderation**|Forum and community owners can moderate the content of forums.|
    |**Profiles**|Find people in the organization.|
    |**Wikis**|Create content for your website.|

    \*Community Templates also requires Component Pack for HCL Connections.

9.  Enter the details of your WebSphere Application Server environment:

    1.  Select the **WebSphere Application Server installation location** that contains the Deployment Manager.

        Note the default path to the WebSphere Application Server installation:

        -   Linux: `/opt/IBM/WebSphere/AppServer`
        -   Windows: `C:\\Program Files \(x86\)\\IBM\\WebSphere\\AppServer`

    2.  Enter the properties of the WebSphere Application Server Deployment Manager \(DM\):

        - Deployment Manager profile
            :   Name of the DM to use for HCL Connections. The wizard automatically detects any available DMs.

        - Host name
            :   Name of the host DM server.

        - Administrator ID
            :   The administrative ID of the DM.

            !!! note
                
                This ID is set to the connectionsAdmin J2C authentication alias, which is mapped to the following Java™ EE roles: dsx-admin, widget-admin, and search-admin. It is also used by the service integration bus. If you plan to use security management software such as Tivoli® Access Manager or SiteMinder, the ID that you specify here must exist in the LDAP directory. For more information, see the *Switching to unique administrator IDs for system level communication* topic.
                
                This user account can be an LDAP or local repository user.

        - Administrator Password
            :   The password for the administrative ID of the DM.

    3.  Click **Validate** to verify the DM information that you entered and that application security is enabled on WebSphere Application Server. If the verification fails, IBM Installation Manager displays an error message.

        !!! note 
            
            \(Linux\) The validation process checks the number of open files that are supported by your system. If the value for this parameter, which is known as the **Open File Descriptor limit**, is too low, a file open error, memory allocation failure, or connection establishment error could occur. If one of these errors occurs, exit the installation wizard and increase the open file limit before restarting the wizard. To set the file limit, refer to the [Installation error messages](../troubleshoot/r_error_codes_install.md) topic and search for error code CLFRP0042E. The recommended value for HCL Connections is 8192. For more information about the Open File Descriptor limit, see the documentation for your operating system.

    4.  When the verification test is successful, click **Next**.

    The wizard creates a dmInfo.properties file under WebSphere Application Server to record details of the cell, node, and server.

10. Configure your topology. For more information about each option, see the *Deployment options* topic.

    !!! note
        
        If you return to this page from a later page in the installation wizard, your settings are still present but not visible. If you want to change any settings, you must enter all of the information again. If you do not want to change your initial settings, click **Next**.

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

11. Enter the database information:

    1.  Use the same database server or instance: Select **Yes** or **No**.

        !!! note
            
            If allowed by your database configuration, you can select multiple database instances as well as different database servers.

    2.  Select a **Database type** from one of the following options:

        -   IBM DB2 Universal Database™
        -   Oracle 19c Enterprise
        -   Microsoft SQL Server Enterprise Edition

    3.  Enter the **Database server host name**. For example: appserver.enterprise.example.com

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

        IBM Installation Manager tests your database connection with the database values that you supplied. You can change the database configuration later in the WebSphere Application Server Integrated Solutions Console.

        !!! note
            
            Usually you can continue even if the validation failed because you can change the database settings from WebSphere Application Server Integrated Solutions Console afterward.

12. Configure the IBM HTTP Server.

    -   If you choose Do Now, you must complete *Defining IBM HTTP Server* before you continue. You must select the name of the web server you plan to map Connections applications to.
    - If you select the Do Later option, you must manually complete *Mapping applications to the IBM HTTP Server* and *Updating IBM Connections to use the HTTP Server* after you install.
 
13. Specify the locations of the content stores. All nodes in a cluster must have read/write access to shared content. Both shared and local content stores must be accessible using the same path from all nodes and from the DM. Each content store is represented by a corresponding WebSphere® variable that is further defined as shared or local. Local content is node-specific.

    !!! note
        
        If you are migrating from an older release of HCL Connections, you must reuse your existing content stores to maintain data integrity. For more information, see the *Content store migration* topic.

    1. Enter the location of the Shared content store.
    
        The shared content store usually resides in a shared repository that grants read/write access to the DM and all the nodes. Use one of the following methods to create a shared data directory:

        - Network-based file shares (for example: NFS, SMB/Samba)
        - Storage area network drives (SAN)
        - If you are using a shared-file system on Microsoft™ Windows™, specify the file location as `Z:\IC_Share`.

            !!! note
                
                (Windows™ only) If you use Remote Desktop Connection to map shared folder drives, ensure that you use the same session to start the node agents. Otherwise, the shared drives might be invisible to the nodes.

        - If you are installing Connections as non-administrator user, you need to create the EnableLinkedConnections registry entry in DWORD (32-bit) value **1** under the registry subkey `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System\` and restart your computer before mapping a network location to local drive. If you do not you may not select the network drive as Shared Content Store.

    2. Enter the location of the Local content store.
    3. Click **Validate** to verify that the account that you are using to install HCL Connections has write access to the content store.
    4. Click **Next**.

14. Select a Notification solution. Notifications are email messages to users about new information and events in your HCL Connections deployment.

    -   Enable Notification only.

        Use notifications but without the ReplyTo capability.

    -   Enable Notification and ReplyTo.

        Use notifications and the ReplyTo capability. To use ReplyTo, your mail server must be able to receive all the replies and funnel these replies into a single inbox. IBM Connection connects to the mail server using the IMAP protocol.

    -   None.

        Do not use a notification solution in your HCL Connections deployment. You can configure notifications after installation. Refer to [Configuring notifications](../admin/t_admin_common_config_notification.md) for more information.

13. Select and specify a mail server solution and then click **Next**.

    -   WebSphere Java Mail Session: Use a single mail server for all notifications. Select this option if you can access an SMTP server directly using the host name.

        Complete the following fields to identify the mail server to use for sending email:

        - Host name of SMTP messaging server
            :   Enter the host name or IP address of the preferred SMTP mail server.

        - This SMTP server requires authentication
            :   Select the check box to force authentication when mail is sent from this server.

        - User ID
            :   If the SMTP server requires authentication, enter the user ID.

        - Password
            :   If the SMTP server requires authentication, enter the user password.

        - Encrypt outgoing mail traffic to the SMTP messaging server using SSL
            :   Select this check box if you want to encrypt outgoing mail to the SMTP server.

        - Port
            :   Accept the default port of 25, or enter port 465 if you are using SSL.

    -   DNS MX Records: Use information from DNS to determine which mail servers to use. Select this option if you use a Domain Name System \(DNS\) server to access the SMTP messaging server.

        - Messaging domain name
            :   Enter the name or IP address of the messaging domain.

        - Choose a specific DNS server
            :   Select this check box if you want to specify a unique SMTP server.

        - DNS server for the messaging servers query
            :   Enter the host name or IP address of the DNS server.

        - DNS port used for the messaging servers query
            :   Enter the port number that is used for sending queries using the messaging server.

        - This SMTP server requires authentication
            :   Select the check box to force authentication when notification mail is sent from this server.

        - User ID
            :   If SMTP authentication is required, enter the administrator user ID for the SMTP server.

        - Password
            :   If SMTP authentication is required, enter the password for the administrator user of the SMTP server.

        - Encrypt outgoing mail traffic to the SMTP messaging server using SSL
            :   Select the check box if you want to use the Secure Sockets Layer \(SSL\) when connecting to the SMTP server.

        - Port
            :   Specify the port number to use for the SMTP server connection. The default port number for the SMTP protocol is 25. The default port number for SMTP over SSL is 465.

    -   If you click **Do not enable Notification**, IBM Installation Manager skips the rest of this step. You can configure notification later.

14. If you selected the **Notification** and **ReplyTo** option, configure the **ReplyTo** email settings. HCL Connections uses a unique ReplyTo address to identify both the person who replied to a notification and the event or item that triggered the notification.

    1.  Enter a **domain name**. For example: mail.example.com.

        !!! note 
            
            This domain name is used to build the ReplyTo address. The address consists of the suffix or prefix, a unique key, and the domain name.

    2.  The reply email address is given a unique ID by the system. You can customize the address by adding a prefix or suffix, using a maximum of 28 characters. This extra information is useful if the domain name is already in use for other purposes. Select one of the following options:

        - None
            :   Use the ID generated by the system.

        - Prefix
            :   Enter a prefix in the **Example** field.

        - Suffix
            :   Enter a suffix in the **Example** field.

        As you select an option, the wizard creates an example of the address, combining your selection with the ID generated by the system.

        For example:

        -   `unique_id@domain`
        -   `prefix_unique_id@domain`
        -   `unique_id_suffix@domain`

    3.  Specify the details of the mail file to which ReplyTo emails are sent:

        - Server
            :   The domain where your mail server is located. For example: `replyTo.mail.example.com`.

        - User ID
            :   The user account for the mail server. The user ID and password are credentials that HCL Connections will use to poll the inbox on the mail server to retrieve the replies and process the content. HCL Connections connects to the mail server using IMAP.

        - Password
            :   Password for the user account. The user ID and password are credentials that HCL Connections will use to poll the inbox on the mail server to retrieve the replies and process the content. HCL Connections connects to the mail server using IMAP.

    4.  Click **Next**.

    !!! note 
        
        You can modify the ReplyTo settings after installation. To edit the domain name and prefix or suffix, edit the news-config.xml file. To edit the server and authentication details, log in to the WebSphere Application Server Integrated Solutions Console and navigate to the Mail Sessions page, where you can edit the configuration.

15. In the Role Mapping window, you can add administrative users. Enter the LDAP user names to map them to the admin role. If that role is empty, the Application server administrative user is mapped to the role by default.

16. In the Role Mapping window, you can add Global Moderator Users. Enter the LDAP user name to the global-moderator role. If that role is empty, the Application server administrative user is mapped to the role by default.

17. Review the information that you have entered. To revise your selections, click **Back**. To finalize the installation, click **Next**.

18. Review the result of the installation. Click **Finish** to exit the installation wizard.

19. Clear the server cache. This needs to be done when the Node is not running. Delete the contents of the cache under the App Server. For example, `C:\\IBM\\WebSphere\\AppServer\\profiles\\AppSrv01\\temp`.

20. Restart the **Deployment Manager**:

    -   Linux: Open a command prompt and change to the [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/Dmgr01/bin directory. Enter the `./stopManager.sh` command and then enter the `./startManager.sh`command.
    -   Windows: Stop and restart the Deployment Manager service.

        Run `C:\\IBM\\WebSphere\\AppServer\\profiles\\Dmgr01\\bin\\startManager.bat` and change directory to

        `C:\\IBM\\WebSphere\\AppServer\\profiles\\Dmgr01\\bin` using `stopManager.bat -username WASadmin -password WAS\_password`.

21. Log in to the Integrated Solutions Console on the DM to perform a full synchronization of all nodes.

    1.  Go to **System administration** \> **Nodes**.

    2.  Select the nodes and click **Full Resynchronize**.

    !!! note 
        
        Wait until the DM copies all the application EAR files to the installedApps directory on each of the nodes. This process can take up to 30 minutes.

    To verify that the DM has distributed the application EAR files to the nodes, check the SystemOut.logfile of each node agent. The default path to the SystemOut.logfile on a node is [profile\_root](../plan/i_ovr_r_directory_conventions.md)/logs/nodeagent.

    Look for a message such as the following example: ADMA7021I: Distribution of application application\_name completed successfully. where application\_name is the name of an HCL Connections application.

22. Configure the HTTP Server plugin with Connections

    If you chose to configure the WebServer during the install, the settings and configuration for Connections will use the IBM HTTP Server URL for communication. Ensure the HTTP Server plugin is configured to access the different Connections components.

    !!! note 
        
        The following examples are only for Unix. If **WebSphere Application server** is enabled then trust the HTTP Server certificate

    1.  If not already open, open a browser to the [Integrated Solutions Console](http://cprice6l.swg.usma.ibm.com:9060/ibm/console) and login.

    2.  Click **Servers**, **Server Types**, and **Web servers**.

    3.  Select the **webserver** and click **Generate Plug-in**.

    4.  Select the **webserver** and click **Propagate Plug-in**.

    5.  Open /opt/IBM/HTTPServer/conf/httpd.conf in a text editor.

    6.  At the bottom of the file find the following line: `LoadModule was_ap22_module /opt/IBM/WebSphere/Plugins/bin/64bits/mod_was_ap22_http.so WebSpherePluginConfig /opt/IBM/WebSphere/Plugins/config/webserver1/plugin-cfg.xml`.

        !!! note 
            
            Make sure the value for `WebSpherePluginConfig` matches where the `plugin-cfg.xml` was propagated. If they don't match, either manually copy the `plugin-cfg.xml` to the location specified in `httpd.conf`, or update`httpd.conf` to look in the correct location.

    7.  Close the `httpd.conf`.

    8.  Restart the IBM HTTP Server 8.5 service by running `./apachectl stop from /opt/IBM/HTTPServer/bin ./apachectl start from /opt/IBM/HTTPServer/bin`.

23. Restart the **Deployment Manager**.

24. Start all your HCL Connections clusters:

    1.  Log in to the **Integrated Solutions Console** on the DM.

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

## Results
The installation wizard has installed HCL Connections in a network deployment.

To confirm a successful installation, open the log files in the connections_root/ directory. The installation logs will contain detailed information. Additionally, check the version.txt file to verify the installed version of Connections.

To view the log file for system events that occurred during the installation, open the `date_time.xml` file, where date_time represents the date and time of the installation. The file is located by default in the following directory:
- Linux (root user): `/var/ibm/InstallationManager/logs`
- Linux (non-root user): `/home/user/var/ibm/InstallationManager/logs` where user is the non-root user name
- Windows Server: `C:\ProgramData\IBM\InstallationManager\logs`


If an error occurs during installation, IBM Installation Manager cancels the installation and rolls back the installation files. Installation errors are usually caused by environment problems such as insufficient disk space, privilege issues, or corruption of a WebSphere profile. If your installation is canceled, complete the following steps:

1.  Identify and resolve the error that caused the cancellation. After canceling the installation, IBM Installation Manager displays an error message with an error code. You can look up the error code in the *Installation error messages* topic or check the log files.
2.  Restore the Deployment Manager profile from your backup.
3.  Delete the [connections\_root](../plan/i_ovr_r_directory_conventions.md) directory.
4.  Start this task again.

## What to do next
-   Complete the [Post-installation Tasks](r_post-installation_tasks.md).
-   Accessing network shares: 
If you installed WebSphere Application Server on Microsoft Windows and configured it to run as a service, ensure that you can access network shares. For more information, see the *Accessing Windows network shares* topic.

**Parent topic:**[Installing HCL Connections](../install/c_installing_overview.md)

