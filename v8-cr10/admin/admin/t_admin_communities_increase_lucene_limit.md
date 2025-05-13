# Specifying the maximum number of communities to display in user views {#t_admin_communities_increase_lucene_limit .task}

You can add a configuration setting to the LotusConnections-config.xml file to increase the maximum number of communities that can be displayed in the personalized user views.

The personalized user views available in the Communities application include the following options: I'm an Owner, I'm a Member, I'm Following, and I'm Invited. By default, up to 1000 communities can be displayed in these personalized views. You can increase this limit by adding a setting to the HCL Connections configuration file that specifies the maximum Lucene clause length to apply.

1.  To increase the maximum number of communities that can be displayed in the personalized user views, complete the following steps:
2.  Start the wsadmin client by completing the following steps:

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

        -    Linux: ./wsadmin.sh -lang jython -username primaryAdmin -password p@assword -port 8879
        -   Microsoft Windows: wsadmin -lang jython -username primaryAdmin -password p@assword -port 8879
3.  Use the wsadmin client to access and check out the HCL Connections configuration files:

    1.  Enter the following command to access the HCL Connections configuration file: execfile\("connectionsConfig.py"\)

        If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

    2.  Enter the following command to check out the HCL Connections configuration files:

        `LCConfigService.checkOutConfig("working\_directory","cell\_name")`

        where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied and are stored while you make changes to them. Use forward slashes to separate directories in the file path, even if you are using the Microsoft Windows operating system.

            Linux only: The directory must grant write permissions or the command does not run successfully.

        -   cell\_name is the name of the WebSphere Application Server cell hosting the HCL Connections application. This argument is case-sensitive, so type it with care. If you do not know the cell name, type the following command while in the wsadmin command processor:print AdminControl.getCell\(\)
        For example:

        -   Linux: LCConfigService.checkOutConfig\("/opt/temp","foo01Cell01"\)
        -   Microsoft Windows: LCConfigService.checkOutConfig\("c:/temp","foo01Cell01"\)
4.  Using a text editor, open the LotusConnections-config.xml from the local directory to which you checked it out.

5.  Add the following section to the end of the file, before the closing </config\> element, replacing the default 1024 with the new limit that you want to specify:

    ```
    <properties>
     <genericProperty name="luceneMaxClauseCount">1024</genericProperty>
    </properties>
    ```

6.  Save your changes and close the LotusConnections-config.xml file.

7.  To check in the changed configuration property files, use the following command:

    ```
    LCConfigService.checkInConfig()
    ```

    **Note:** You must perform the check in during the same wsadmin session in which you checked out the files for the changes that you made to take effect.

8.  After making updates, type the following command to deploy the changes:

    ```
    synchAllNodes()
    ```

9.  To exit the wsadmin client, type exit at the prompt.

10. Stop and restart all the HCL Connections application servers.


**Parent topic:**[Administering Communities](../admin/c_admin_communities_intro.md)

