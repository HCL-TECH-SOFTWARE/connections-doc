# Installing in console mode {#t_install_cluster .task}

Install HCL Connections in console mode. This method is convenient if you cannot or do not want to use the graphical mode.

Ensure that you complete all the prerequisite tasks that are relevant for your environment. For more information, see the [Before installing](r_before_installing.md) topic.

Use console mode to complete the installation process in a non-graphical environment. This mode is useful when you must install HCL Connections on a system that does not have a video card.

In steps where you enter custom information, such as server details, you can type P at any time to return to the previous input choice in that step. However, you cannot type P to return to a previous step.

To install HCL Connections, you need to use IBM® Installation Manager, which manages the installation process.

To install HCL Connections in console mode, complete the following steps:

1.  On each node, stop any running instances of WebSphere® Application Server and WebSphere node agents.

2.  Start WebSphere Application Server Network Deployment Manager.

3.  Copy the installation files to the system that hosts the Deployment Manager.

    !!! note
        
        Ensure that the directory path that you enter contains no spaces.

4.  Start IBM Installation Manager in console mode:

    !!! note 
        
        Run IBM Installation Manager on the system where the Deployment Manager is installed.

    -   If Installation Manager is already installed, open a command prompt and change to the IBM Installation Manager installation directory. Then run the following command:
        -   Linux™: `/opt/IBM/InstallationManager/eclipse/tools/imcl -c`
        -   Windows™: `\\Program Files\\IBM\\Installation Manager\\eclipse\\tools\\imcl.exe -c`

    -   To install both IBM Installation Manager and HCL Connections, open a command prompt and change to the IBM Installation Manager installation directory. Then run the following command:

        -   Linux: `HCL\_Connections\_Install/IM/linux/install.console.sh`
        -   Windows: `HCL\_Connections\_Install\\IM\\windows\\install.console.bat`

        The batch script calls a response file, which contains information about the repositories for both IBM Installation Manager and HCL Connections.

    -   To use another language for the installation process, open a command prompt, change to the IBM Installation Manager installation directory, and run the following command:

        -   Linux: `HCL\_Connections\_Install/IM/linux/tools/imcl -c -nl language\_code`
        -   Windows: `HCL\_Connections\_Install\\IM\\windows\\tools\\imcl.exe -c -nl language\_code`

        where `language\_code` is the two-letter code for a language, such as fr for French.

5.  In the console window, specify the HCL Connections repository:

    !!! note

        If you chose the option to run the install.console.bat\|sh file in Step 4, you can skip this step.

    1.  Type P to edit preferences.

    2.  Type 1 to specify repositories.

    3.  Type D to add a repository.

    4.  Type the repository path for HCL Connections 6.5, for example: `HCL\_Connections\_Install\\HCLConnections/repository.xml`.

    5.  Type A to save the repository information.

    6.  Type C to return to the console window.

6.  In the **Select packages to install** step, type the appropriate number to select the package, and then type N to proceed.

7.  Review the license agreement by typing the appropriate number to view license information. To accept the license agreement, type A. Type N to proceed.

8.  Specify the location of the shared resources directory for IBM Installation Manager.

    1.  Enter the location of the **Shared Resources Directory**.

    2.  Type N to proceed.

    !!! note

        -   The Shared Resources directory stores resources that can be shared by multiple packages. If you used IBM Installation Manager before, the wizard automatically enters this value.
        -   Ensure that the directory path that you enter contains no spaces.

9.  Specify the location of the IBM Installation Manager installation directory.

    1.  Enter the location of the **Installation Manager Directory**.

    2.  Type N to proceed.

    !!! note

        -   This option is available only if you have not previously installed IBM Installation Manager.
        -   The Installation Manager directory stores resources that are unique to the packages that you are installing.
        -   Ensure that the directory path that you enter contains no spaces.

10. Specify the locations of the package group for IBM Installation Manager and the installation directory for HCL Connections:

    1.  The wizard automatically detects the HCL Connections package group. Type **M** to change the default location where the package group is installed.

    2.  Type **N** to proceed.

    3.  To accept the default location for the HCL Connections installation directory, type **N**.

        To specify a new directory name, type **M** and enter the new directory name and path.

    4.  Type **N** to proceed.

11. Select the applications that you want to install and then type N to proceed. You can select from the following options:

    **Important:**

    -   The wizard always installs the **Home page**, **News**, and **Search**, **Common**, **Files**, **Push Notification**, **Rich Text Editors**, and **Widget Container** applications, which are core features.

        !!! note 
            
            If you install Communities and want users to be able to add the Rich Content app in a community, you must also install Wikis now.

    -   Install Metrics now so that your application data is captured from the moment that HCL Connections is deployed. If you install Metrics at a later stage, you will not have any data reports for the period before you installed Metrics.

    |Section|Description|
    |---|---|
    |**HCL Connections 8.0**|Install all HCL Connections applications.|
    |**Activities**|Collaborate with colleagues.|
    |**Blogs**|Write personal perspectives about projects.|
    |**Communities**|Interact with people on shared projects.|
    |**Bookmarks**|Bookmark important web sites.|
    |**Files**|Share files among users.|
    |**Forums**|Discuss projects and exchange information.|
    |**Metrics**|Identify and analyze usage and trends.|
    |**Mobile**|Access HCL Connections from mobile devices.|
    |**Moderation**|Forum and community owners can moderate the content of forums.|
    |**Profiles**|Find people in the organization.|
    |**Wikis**|Create content for your website.|

12. Enter the details of your WebSphere Application Server environment:

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
                
                This ID is set to the connectionsAdmin J2C authentication alias, which is mapped to the following Java EE roles: dsx-admin, widget-admin, and search-admin. It is also used by the service integration bus. If you plan to use security management software such as Security Verify Access (formerly Security Access Manager) or SiteMinder, the ID that you specify here must exist in the LDAP directory. For more information, see the *Switching to unique administrator IDs for system level communication* topic.

                This user account needs to be both a WebSphere Application Server administrative user and an LDAP user.

        - Administrator Password
            :   The password for the administrative ID of the DM.

        - SOAP port number
            :   The SOAP port number of the DM. The wizard automatically detects this value.

    3.  Press Enter to verify the DM information that you entered. The verification process also checks that application security is enabled on WebSphere Application Server. If the verification fails, IBM Installation Manager displays an error message.

        !!! note 
            
            \(Linux\) The validation process checks the number of open files that are supported by your system. If the value for this parameter, which is known as the **Open File Descriptor limit**, is too low, a file open error, memory allocation failure, or connection establishment error could occur. If one of these errors occurs, exit the installation wizard and increase the open file limit before restarting the wizard. To set the file limit, refer to the [Installation error messages](../troubleshoot/r_error_codes_install.md) topic and search for error code CLFRP0042E. The recommended value for HCL Connections is 8192. For more information about the Open File Descriptor limit, see the documentation for your operating system.

    4.  If the verification check is successful, type N to proceed. If verification fails, press B to reenter the required information.

    The wizard creates a dmInfo.properties file under WebSphere Application Server to record details of the cell, node, and server.

13. Configure your topology. For more information about each option, see [Deployment options](../plan/c_planning_the_installation.md).

    -   Small deployment:
        1.  Type 1 to select the **Small deployment** topology.
        2.  Enter a **Cluster name** for the topology.
        3.  Select a **Node**.
        4.  Enter a **Server member** name for the node.
        5.  Type N to proceed.
    -   Medium deployment:
        1.  Type 2 to select the **Medium deployment** topology.
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
14. Specify whether the installed applications use the same database server or instance: You can select from the following options:

    1.  Type **1** to specify that the applications use same database server or instance; type **2** to specify that they use different database servers or instances.

        !!! note
            
            If allowed by your database configuration, you can select multiple database instances as well as different database servers.

    2.  Select a **Database type** from one of the following options:

        If installing on Windows or Linux:

        -   IBM DB2 Universal Database™
        -   Oracle Enterprise Edition
        -   Microsoft™ SQL Server Enterprise Edition
    3.  Enter the **Database server host name**. For example: appserver.enterprise.example.com

        If your installed applications use different database servers, enter the database host name for each application.

    4.  Enter the **Port** number of the database server. The default values are: 50000 for DB2, 1521 for Oracle, and 1433 for SQL Server.

    5.  Enter the **JDBC driver location**. For example:

        -   Linux:

            `/opt/IBM/WebSphere/AppServer/lib`

        -   Windows:

            `C:\\IBM\\WebSphere\\Appserver\\lib`

    6.  Ensure that the following JDBC driver libraries are present in the JDBC directory:

        - DB2®:   `db2jcc4.jar` and `db2jcc_license_cu.jar`

            !!! note 
                
                Ensure that your user account has the necessary permissions to access the DB2 JDBC files.

        - Oracle
            :   Upgrade the JDBC Database Driver to version 8 ojdbc8.jar. Refer to [Oracle site to download the ojdbc8.jar driver](https://www.oracle.com/database/technologies/jdbc-drivers-12c-downloads.html).

        - SQL Server
            :   Download the [SQL Server JDBC 4.2 driver](https://learn.microsoft.com/en-us/sql/connect/jdbc/release-notes-for-the-jdbc-driver?view=sql-server-ver16#42) from the Microsoft web site and follow the instructions to extract the driver files. HCL Connections uses the `sqljdbc42.jar` file.

    7.  Enter the **Database name**, **User ID**, and **Password** for each database.

        If each database uses the same user credentials, confirm the **Use the same password for all applications** question for all applications and then enter the user ID and password for the first database in the list.

        !!! note

            If your database type is Oracle, you must connect to the database with the user ID that you used when you created the application database.

    8.  If you need to make changes, type the number that corresponds to the application that you want to change. Alternatively, type R to reset all the database specifications to their default values.

    9.  Press Enter to verify your database settings. If the validation fails, check your database settings. When the validation succeeds, click **Next**.

        IBM Installation Manager tests your database connection with the database values that you supplied. You can change the database configuration later in the WebSphere Application Server Integrated Solutions Console.

        !!! note
    
            Usually you can continue even if the validation failed because you can change the database settings from WebSphere Application Server Integrated Solutions Console afterward.

    10. If the verification check is successful, type N to proceed. If verification fails, press B to reenter the required information.

15. Specify the locations of the content stores. Shared content must be read/write accessible by all nodes in a cluster. Both shared and local content stores must be accessible using the same path from all nodes and the DM. Local content is node-specific. Each content store is represented by a corresponding WebSphere variable that is further defined as shared or local.

    1.  Press Enter to verify that the account that you are using to install HCL Connections has write access to the content store.

    2.  Click **Next**.

16. Select a **Notification** solution. Notifications are email messages to users about new information and events in your HCL Connections deployment.

    -   Enable **Notification** only.

        Use notifications but without the ReplyTo capability.

    -   Enable **Notification** and **ReplyTo**.

        Use notifications and the ReplyTo capability. To use ReplyTo, your mail server must be able to receive all the replies and funnel these replies into a single inbox. IBM Connection connects to the mail server using the IMAP protocol.

    -   None.

        Do not use a notification solution in your HCL Connections deployment. You can configure notifications after installation. Refer to [Configuring notifications](../admin/t_admin_common_config_notification.md) for more information.

17. If you chose a mail notification option, select and specify a mail server solution.

    -   Identify the mail server to use for sending email:

        - Host name of SMTP messaging server
            :   Enter the host name of the preferred SMTP mail server.

        - This SMTP server requires authentication
            :   Enter Y to force authentication when mail is sent from this server.

        - User ID
            :   If the SMTP server requires authentication, enter the user ID.

        - Password
            :   If the SMTP server requires authentication, enter the user password.

        - Encrypt outgoing mail traffic to the SMTP messaging server using SSL
            :   If you want to encrypt outgoing mail to the SMTP server, press Y.

        - Port
            :   Press Enter to accept the default port of 25, or enter 465 if you are using SSL.

    -   DNS MX Records: Use information from DNS to determine which mail servers to use. Select this option if you use a Domain Name System \(DNS\) server to access the SMTP messaging server.

        - Messaging domain name
            :   Enter the name or IP address of the messaging domain.

        - Choose a specific DNS server
            :   To specify a unique SMTP server, press Y.

        - DNS server for the messaging servers query
            :   Enter the host name or IP address of the DNS server.

        - DNS port used for the messaging servers query
            :   Enter the port number that is used for sending queries using the messaging server.

        - This SMTP server requires authentication
        :   Enter Y to force authentication when mail is sent from this server.

        - User ID
            :   If SMTP authentication is required, enter the administrator user ID for the SMTP server.

        - Password
            :   If SMTP authentication is required, enter the password for the administrator user of the SMTP server.

        - Encrypt outgoing mail traffic to the SMTP messaging server using SSL
            :   If you want to encrypt outgoing mail to the SMTP server, press Y.

        - Port
            :   Press Enter to accept the default port of 25, or enter 465 if you are using SSL.

    -   If you specify **Do not enable Notification**, IBM Installation Manager skips the rest of this step. You can configure notification later.
18. If you selected the Notification and ReplyTo option, configure the ReplyTo email settings. HCL Connections uses a unique ReplyTo address to identify both the person who replied to a notification and the event or item that triggered the notification.

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

        -   `unique\_id@domain`
        -   `prefix\_unique\_id@domain`
        -   `unique\_id\_suffix@domain`

    3.  Specify the details of the mail file to which ReplyTo emails are sent:

        - Server
            :   The domain where your mail server is located. For example: replyTo.mail.example.com.

        - User ID
            :   The user account for the mail server. The user ID and password are credentials that HCL Connections will use to poll the inbox on the mail server to retrieve the replies and process the content. HCL Connections connects to the mail server using IMAP.

        - Password
            :   Password for the user account. The user ID and password are credentials that HCL Connections will use to poll the inbox on the mail server to retrieve the replies and process the content. HCL Connections connects to the mail server using IMAP.

    4.  Type N to proceed.

    !!! note

        You can modify the ReplyTo settings after installation. To edit the domain name and prefix or suffix, edit the news-config.xml file. To edit the server and authentication details, log in to the WebSphere Application Server Integrated Solutions Console and navigate to the Mail Sessions page, where you can edit the configuration.

19. Review the information that you entered. To revise your selections, press **B**. To continue installing, press **N**.

20. To install the product, press **I**. To generate a response file, press **G**.

21. Review the result of the installation. Press **F** to exit the installation wizard.

22. Clear the server cache. This needs to be done when the Node is not running. Delete the contents of the cache under the App Server. For example, `C:\\IBM\\WebSphere\\AppServer\\profiles\\AppSrv01\\temp`.

23. Restart the Deployment Manager.

    -   Linux: Open a command prompt and change to the [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/Dmgr01/bin directory. Enter the `./stopManager.sh` command and then enter the `./startManager.sh` command.
    -   Windows: Stop and restart the Deployment Manager service.
24. Start all the federated nodes and enter the startNode command. Repeat these steps for each node:

    1.  Log in to a node.

    2.  From a command line, change to the [profile\_root](../plan/i_ovr_r_directory_conventions.md)/bin directory.

    3.  Enter the startNode command for your operating system:

        -   Linux: `./startNode.sh`
        -   Windows: `startNode.bat`
25. Log in to the Integrated Solutions Console on the DM to perform a full synchronization of all nodes.

    1.  Go to **System administration** \> **Nodes**.

    2.  Select the nodes and click **Full Resynchronize**.

    !!! note 
    
        Wait until the DM copies all the application EAR files to the installedApps directory on each of the nodes. This process can take up to 30 minutes.

    To verify that the DM has distributed the application EAR files to the nodes, check the SystemOut.logfile of each node agent. The default path to the SystemOut.logfile on a node is [profile\_root](../plan/i_ovr_r_directory_conventions.md)/logs/nodeagent.

    Look for a message such as the following example: ADMA7021I: Distribution of application application\_name completed successfully. where application\_name is the name of an HCL Connections application.

26. Start all your HCL Connections clusters:

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

**Parent topic:**[Installing HCL Connections](../install/c_installing_overview.md)

