# Changing common configuration property values {#t_admin_common_changing_config .task}

Configuration settings control how and when various common operations take place. You can edit the settings to change how HCL Connections behaves.

Use the connectionsConfig script in the wsadmin client to interact with the LotusConnections-config.xml file. When you change common configuration settings, you must synchronize the nodes and restart the application servers.

Some properties in the LotusConnections-config.xml file cannot be edited with this procedure. They cannot be edited by using the updateConfig command nor displayed by using the showConfig command. Instead, you must check out the configuration file by using the checkOutConfig command and then edit the property values with a text editor. After you edit the file, save it and open it in a web browser to make sure that you did not introduce any errors. XML files that are well formed display in a web browser; if there are errors, the web browser reports that an error was encountered. After you fix any errors, you must check in the file by using the checkInConfig command.

Use the showConfig command to determine which properties you can edit by using the wsadmin commands. This command returns a list of all the properties that can be edited by using the updateConfig command and their current values.

To change common configuration settings by using wsadmin commands, complete the following steps:

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
2.  Use the wsadmin client to check out HCL Connections configuration files:

    1.  Enter the following command to load the HCL Connections configuration file: execfile\("connectionsConfig.py"\)

        If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

    2.  Enter the following command to check out HCL Connections configuration files:

        `LCConfigService.checkOutConfig("working\_directory","cell\_name")`

        where:

        -   working\_directory is the temporary working directory to which configuration files are copied. The files are kept in this working directory while you edit them.

            **Notes:**

            -   When you specify a path to the working directory on a system that is running Microsoft Windows, use a forward slash for the directory. For example: "C:/temp".
            -  Linux only: The directory must grant write permissions or the command fails.
        -   cell\_name is the name of the WebSphere Application Server cell that hosts the HCL Connections application. If you do not know the cell name, display it by typing the following command in the wsadmin client: print AdminControl.getCell\(\)

            **Note:** This input parameter is case-sensitive.

    For example:

    -   Linux: LCConfigService.checkOutConfig\("/opt/temp","foo01Cell01"\)
    -   Microsoft Windows: LCConfigService.checkOutConfig\("c:/temp","foo01Cell01"\)
3.  If you want to find out the current value of a property, you can list the current configuration settings and values by using the following command:

    LCConfigService.showConfig\(\)

4.  Enter the following command to change a common configuration setting:

    LCConfigService.updateConfig\("property","value"\) where property is one of the editable HCL Connections configuration properties and value is the new value with which you want to set that property. For a complete list of editable properties, see *Common configuration properties* . For example:

    ```
    LCConfigService.updateConfig("versionStamp","")
    ```

5.  Repeat the previous step for each property setting that you want to change.


Check the configuration files back in during the same wsadmin session in which you checked them out. For more information, see the *Applying common configuration property changes* topic.

-   **[Common configuration properties](../admin/r_admin_common_props.md)**  
Common configuration properties for HCL Connections are stored in the LotusConnections-config.xml file. The properties are represented as XML elements.
-   **[Applying common configuration property changes](../admin/t_admin_common_save_changes.md)**  
Check in and check out configuration files.

**Parent topic:**[Administration tools](../admin/c_admin_common_tools.md)

