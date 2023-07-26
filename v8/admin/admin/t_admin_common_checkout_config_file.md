# Editing configuration files {#t_admin_view_current_config_values .task}

You can edit configuration files either by using the wsadmin client or by editing the files directly.

To edit a configuration file, you must check it out first.

Each configuration file is an XML that is paired with an XSD file. The XML file contains configuration settings and the corresponding XSD files is used to validate the XML file.

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

        where `dm_profile_root` is the Deployment Manager profile directory; this directory is usually called dmgr01. For example, on Windows, the directory is C:\\Program Files\\IBM\\WebSphere\\AppServer\\profiles\\Dmgr01\\bin.

        **Attention**: You must run the command to start the wsadmin client from this specific directory because the Jython files for the product are stored there. If you start the client from a different directory, the execfile\(\) command does not work correctly.

    2.  Enter the following command to start the wsadmin client:

        -   Linux: `./wsadmin.sh -lang jython -user admin_user_id -password admin_password -port SOAP_CONNECTOR_ADDRESS_PORT`
        -   Microsoft Windows: `wsadmin -lang jython -user admin_user_id -password admin_password -port SOAP_CONNECTOR_ADDRESS_PORT`

        where:

        -   `admin_user_id` is the user name of the Administrator role on IBM WebSphere® Application Server. This administrator must be configured at the cell level, not at the cluster, node, or server level.
        -   `admin_password` is the password of the WebSphere Application Server administrator.
        -   `SOAP_CONNECTOR_ADDRESS_PORT` is the SOAP port for the WebSphere Application Server deployment manager server. The default value of the SOAP port is 8879. If you are using the default port value, you do not have to specify this parameter. If you are not using the default value and you do not know the port number, you can look up its value in the WebSphere Application Server Integrated Solution Console. To look up the SOAP port number, complete the following steps:

            1.  Open the WebSphere Application Server Integrated Solution Console for the deployment manager, and then select **System Administration** \> **Deployment Manager**.

            2.  In the Additional properties section expand **Ports**, and then look for the SOAP\_CONNECTOR\_ADDRESS port entry to find the port number.

            For example:

            -   Linux: ./wsadmin.sh -lang jython -username primaryAdmin -password p@assword -port 8879
            -   Microsoft Windows: wsadmin -lang jython -username primaryAdmin -password p@assword -port 8879

2.  Use the following command to access the configuration files:

    ```
    execfile("application_py_file")
    ```

    where `application_py_file` is one of the following values:

    -   HCL Connections-wide: `connectionsConfig.py`
    -   Activities: `activitiesAdmin.py`
    -   Blogs: `blogsAdmin.py`
    -   Bookmarks: `dogearAdmin.py`
    -   Communities: `communitiesAdmin.py`
    -   Files: `filesAdmin.py`
    -   Forums: `forumsAdmin.py`
    -   Home page: `homepageAdmin.py`
    -   News: `newsAdmin.py`
    -   Profiles: `profilesAdmin.py`
    -   Search: `searchAdmin.py`
    -   Wikis: `wikisAdmin.py`
    -   Metrics: `metricsAdmin.py`

    If you are prompted to specify a service to connect to, type `1` to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

3.  Check out the configuration file for an application by using the following command:

    ```
    service_name.checkOutConfig("working_directory", "cell_name")
    ```

    where:

    -   `service_name` is one of the following values:

        -   HCL Connections-wide: `LCConfigService`
        -   Activities: `ActivitiesConfigService`
        -   Blogs: The configuration settings for Blogs are not in a configuration file, so you do not have to edit a file. Unlike the other applications, when you edit Blogs configuration properties, the changes are written directly to the Blogs database.
        -   Bookmarks: `DogearCellConfig`
        -   Communities: `CommunitiesConfigService`
        -   Files: `FilesConfigService`
        -   Forums: `ForumsConfigService`
        -   News: `NewsCellConfig`
        -   Profiles: `ProfilesConfigService`
        -   Search: `SearchCellConfig`
        -   Wikis: `WikisConfigService`
        -   Metrics: `MetricsConfigService`

    -   `working_directory` is the temporary working directory to which configuration files are copied. The files are kept in this working directory while you edit them.

        !**Notes**:

            -   When you specify a path to the working directory on a system that is running Microsoft Windows, use a forward slash for the directory. For example: `"C:/temp"`
            -   Linux only: The directory must grant write permissions or the command fails.

    -   `cell_name` is the name of the WebSphere Application Server cell that hosts the HCL Connections application. If you do not know the cell name, display it by typing the following command in the wsadmin client: `print AdminControl.getCell()`

        **Note**: This input parameter is case-sensitive.

    For example:

    -   Common HCL Connections properties: `LCConfigService.checkOutConfig("C:/temp","foo01Cell01") LCConfigService.checkOutNotificationConfig("C:/temp","foo01Cell01") LCConfigService.checkOutOpensocialConfig("C:/temp","fooCell01")`

    -   The events-config.xml file: `LCConfigService.checkOutEventsConfig("/temp","foo01Cell01")`

        This command is part of the LCConfig service and checks out the events-config.xml file. For more information, see *Editing the events-config.xml file*.

    -   Activities: `ActivitiesConfigService.checkOutConfig("/temp","foo01Cell01")`
    -   Bookmarks: `DogearCellConfig.checkOutConfig("C:/temp","foo01Cell01")`
    -   Communities: `CommunitiesConfigService.checkOutConfig("/temp","foo01Cell01")`
    -   Files: `FilesConfigService.checkOutConfig("C:/temp","foo01Cell01")`
    -   Forums: `ForumsConfigService.checkOutConfig("C:/temp","foo01Cell01")`
    -   Metrics: `MetricsConfigService.checkOutConfig("/temp","foo01Cell01")`
    -   News repository: `NewsCellConfig.checkOutConfig("/temp","foo01Cell01")`
    -   Profiles: `ProfilesConfigService.checkOutConfig("C:/temp","foo01Cell01")`
    -   Search: `SearchCellConfig.checkOutConfig("/temp","foo01Cell01")`

        **Note**:The HomepageCellConfig.checkOutConfig command is superseded by the SearchCellConfig.checkOutConfig command.

    -   Wikis: `WikisConfigService.checkOutConfig("C:/temp","foo01Cell01")`

4.  **Optional**: To see the current values of the configuration properties, use the following command:

    ```
    service_name.showConfig()
    ```

    where `service_name` is one of the service names that are defined in step 4.

5.  Edit the configuration properties that you want to change. Some properties must be edited by using the wsadmin client; others can be edited only by editing the configuration XML file directly.

    For example:

    ```
    service_name.updateConfig("property_name","new_value")
    ```

    For more information about the configuration properties that you can edit, see the documentation for the individual application sections.

6.  To force users' browsers to pick up the changes to the configuration, update the value of the version stamp configuration property. For more information, see *Required post-customization step*.

7.  Check in the configuration files:

    ```
    service_name.checkInConfig()
    ```

    where `service_name` is one of the service names that are defined in step 4. You do not have to complete this step for the Blogs application. To check in the events-config.xml file, use the `LCConfigService.checkInEventsConfig()` command.

    **Note**: You must check in the file during the same wsadmin session in which you checked it out.

8.  Deploy the changes by synchronizing the nodes:

    ```
    synchAllNodes()
    ```

9.  To exit the wsadmin client, type `exit` at the prompt.

10. Stop and restart the servers that host the HCL Connections applications.

    **Note:** If you changed Blogs configuration settings only, you do not have to restart the servers.


-   **[HCL Connections configuration property values](../admin/t_admin_common_change_config_value_over.md)**  
Find out what configuration properties you can edit for each application.
-   **[HCL Connections configuration files](../admin/r_admin_common_config_files.md)**  
Configuration files are XML-formatted files that store configuration information for HCL Connections.
-   **[Editing the events-config.xml file](../admin/t_admin_common_editing_events_config.md)**  
Edit the events-config.xml file to change how events are collected and managed

**Parent topic:** [Administration tools](../admin/c_admin_common_tools.md)

**Related information**  


[Post-customization step](../customize/t_admin_common_customize_postreq.md)

