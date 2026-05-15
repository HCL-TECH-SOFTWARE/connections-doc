# Checking out the Activities configuration files {#t_admin_act_checkout_config_file .task}

You can edit the Activities configuration files in two ways: by using the wsadmin client or by editing the configuration XML files directly. In both cases, you must first check out the configuration files and later check them back in using the wsadmin client.

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
2.  Access and check out the Activities configuration files.

    1.  Use the following command to access the Activities configuration file:

        ```
        execfile("activitiesAdmin.py")
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    2.  Check out the Activities configuration files using the following command:

        ```
        ActivitiesConfigService.checkOutConfig("working\_directory","cell\_name")
        
        ```

        where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied and are stored while you make changes to them. Use forward slashes to separate directories in the file path, even if you are using the Microsoft Windows operating system.

            **Note:** Linux: The directory must grant write permissions or the command will not run successfully.

        -   cell\_name is the name of the WebSphere Application Server cell hosting the HCL Connections application. This argument is case-sensitive, so type it with care. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor:

            ```
            print AdminControl.getCell()
            ```

        For example:

        -   Linux:

            ```
            ActivitiesConfigService.checkOutConfig("/opt/act/temp","foo01Cell01")
            ```

        -   Microsoft Windows:

            ```
            ActivitiesConfigService.checkOutConfig("c:/act/temp","foo01Cell01")
            ```

3.  If you want to find out the current value of a property, you can list the current configuration settings and values using the following command:

    ```
    ActivitiesConfigService.showConfig()
    ```

4.  Some properties must be edited using the wsadmin client; others can only be edited by editing the configuration XML file directly. To change an Activities configuration setting, do one of the following command:

    -   To edit a property using the wsadmin client, use the following command:

        ```
        ActivitiesConfigService.updateConfig("property","value")
        ```

        where property is one of the editable Activities configuration properties and value is the new value with which you want to set that property. See *Activities configuration properties* for a complete list of editable properties. For example:

        ```
        ActivitiesConfigService.updateConfig("activeContentFilter.enabled", "true")
        ```

    -   To edit the value of a property in a configuration file directly, from the temporary directory to which you checked it out, open the file in a text editor, and then make your changes.

After making changes, you must check the configuration files back in and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying property changes* for details.

**Parent topic:**[Changing Activities configuration property values](../admin/t_admin_act_changing_config.md)

**Next topic:**[Activities configuration properties](../admin/r_admin_activities_props.md)

