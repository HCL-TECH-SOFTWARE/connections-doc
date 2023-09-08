# Running administrative commands {#t_admin_common_edit_admin_props .task}

Use administrative commands to run tasks on the server.

Administrative commands interact with HCL Connections applications through scripts. These scripts use the AdminControl object in the wsadmin client to interact with the applications. Each script uses managed beans \(MBeans\) to set administration properties.

When you use administrative commands to change administration properties, you do not have to check out any files nor restart the server for the changes to take effect.

When an administrative command is started, a SOAP request is made to the target HCL Connections application. The number of seconds that the wsadmin client waits for a response to a SOAP request is specified in the com.ibm.SOAP.requestTimeout property in the soap.client.props file. The file is stored in the following directory: WAS\_HOME\\profiles\\PROFILE\_NAME\\properties.

If a command takes longer to complete than the value of the com.ibm.SOAP.requestTimeout property, an error is displayed in the wsadmin client and any value that is returned from the command is lost. The command continues to be processed by the application but the connection to the client is lost. This fact is important to note because some commands take a long time to run. For example, in a system with many Activities, the ActivityService.fetchActivities\(\) command can take a long time to complete. You can monitor the status of these operations by scanning the SystemOut.log file for success and failure messages.

To increase the time interval that passes before a request fails, edit the com.ibm.SOAP.requestTimeout property in the soap.client.props file. This property is a configuration property so you must restart the server for your changes to take effect.

To use administrative commands, complete the following steps:

1.  Start the wsadmin client by completing the following steps:

    1.  Open a command prompt and then change to the following directory of the system on which you installed the deployment manager:

        [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/bin

        app\_server\_root/profiles/dm\_profile\_root/bin. Where app\_server\_root represents the IBM WebSphere Application Server installation directory, for example:

        ```
        Linux:
        /opt/IBM/WebSphere/AppServer
        
        ```

        ```
        Windows:
        drive:\Program Files\IBM\WebSphere\AppServer
        
        ```

        Where drive is the system drive on which the file directory is stored. For example: C: or D:.

        where dm\_profile\_root is the Deployment Manager profile directory; this directory is usually called dmgr01. For example, on Windows, the directory is C:\\Program Files\\IBM\\WebSphere\\AppServer\\profiles\\Dmgr01\\bin.

        **Attention:** You must run the command to start the wsadmin client from this specific directory because the Jython files for the product are stored there. If you start the client from a different directory, the execfile\(\) command does not work correctly.

    2.  Enter the following command to start the wsadmin client:

        -   Linux: ./wsadmin.sh -lang jython -user admin\_user\_id -password admin\_password -port SOAP\_CONNECTOR\_ADDRESS\_PORT
        -   Microsoft Windows: wsadmin -lang jython -user admin\_user\_id -password admin\_password -port SOAP\_CONNECTOR\_ADDRESS\_PORT
        where:

        -   admin\_user\_id is the user name of the Administrator role on IBM WebSphere® Application Server. This administrator must be configured at the cell level, not at the cluster, node, or server level.
        -   admin\_password is the password of the WebSphere Application Server administrator.
        -   SOAP\_CONNECTOR\_ADDRESS\_PORT is the SOAP port for the WebSphere Application Server deployment manager server. The default value of the SOAP port is 8879. If you are using the default port value, you do not have to specify this parameter. If you are not using the default value and you do not know the port number, you can look up its value in the WebSphere Application Server Integrated Solution Console. To look up the SOAP port number, complete the following steps:
            1.  Open the WebSphere Application Server Integrated Solution Console for the deployment manager, and then select **System Administration** \> **Deployment Manager**.
            2.  In the Additional properties section expand **Ports**, and then look for the SOAP\_CONNECTOR\_ADDRESS port entry to find the port number.
        For example:

        -   Linux: ./wsadmin.sh -lang jython -username primaryAdmin -password p@assword -port 8879
        -   Microsoft Windows: wsadmin -lang jython -username primaryAdmin -password p@assword -port 8879
2.  Use the following command to access the configuration files:

    execfile\("application\_py\_file"\)

    where application\_py\_file is one of the following values:

    -   HCL Connections-wide: connectionsConfig.py
    -   Activities: activitiesAdmin.py
    -   Blogs: blogsAdmin.py
    -   Bookmarks: dogearAdmin.py
    -   Communities: communitiesAdmin.py
    -   Files: filesAdmin.py
    -   Forums: forumsAdmin.py
    -   Home page: homepageAdmin.py
    -   News: newsAdmin.py
    -   Profiles: profilesAdmin.py
    -   Search: searchAdmin.py
    -   Wikis: wikisAdmin.py
    -   Metrics: metricsAdmin.py
    If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

3.  Edit administrative properties and run administrative tasks by using administrative commands. These commands are documented in the individual application sections of the product documentation.


**Parent topic:**[Administration tools](../admin/c_admin_common_tools.md)

