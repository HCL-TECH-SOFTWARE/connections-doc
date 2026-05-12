# Changing Communities configuration property values {#t_admin_communities_changing_config .task}

Configuration settings control how and when various Communities operations take place. You can edit the settings to change the ways that communities behave.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

Configure Communities using scripts accessed with the wsadmin client. These scripts use the AdminConfig object available in the WebSphere Application Server wsadmin client to interact with the Communities configuration file. Changes to Communities configuration settings require node synchronization and a restart of the Communities server before they take effect.

1.  To change Communities configuration settings, complete the following steps:
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  Start the Communities Jython script interpreter.

    1.  Use the following command to access the Communities configuration files:

        ```
        execfile("communitiesAdmin.py")
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    2.  Check out the Communities configuration files using the following command:

        CommunitiesConfigService.checkOutConfig\("working\_directory", "cell\_name"\)

        where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied. The files are kept in this working directory while you make changes to them.

            **Note:** Linux only: The directory must grant write permissions or the command will not run successfully.

        -   cell\_name is the name of the WebSphere Application Server cell hosting the HCL Connections application. This argument is required. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor:

            print AdminControl.getCell\(\)

        For example:

        ```
        CommunitiesConfigService.checkOutConfig("/opt/my_temp_dir", "CommServerNode01Cell")
        ```

4.  To view a list of the valid Communities configuration settings and their current values, use the following command:

    CommunitiesConfigService.showConfig\(\)

    Here is some sample output from the CommunitiesConfigService.showConfig\(\) command:

    ```
    activeContentFilter.enabled = true
         descriptionSummary.size = 300
         explicitMembershipEntityLimit = 100000
         group.enabled = true
         group.membershipCache.maximumAgeOnLoginInSeconds = 120
         group.membershipCache.maximumAgeOnRequestInSeconds = 120
         handle.enabled = true
         pagingSupport.communityListTags.pageSize = 75
         pagingSupport.dbNameTypeAhead.pageSize = 50
         pagingSupport.defaultPageSize = 10
         pagingSupport.ldapNameSearch.pageSize = 50
         pagingSupport.memberNameTypeAhead.pageSize = 15
         pagingSupport.tagNameTypeAhead.pageSize = 10
         show.startCommunity.To.Unauthenticated = true
         task.EventLogCleanup.enabled = true
         task.EventLogCleanup.interval = 0 30 0-23/3 ? * *
         task.LifecycleRetryQueuedEvents.enabled = true
         task.LifecycleRetryQueuedEvents.interval = 0 1 0-23/3 ? * *
    ```

5.  To change a Communities configuration setting, use the following command:

    CommunitiesConfigService.updateConfig\("property", "value"\)

    where property is one of the editable Communities configuration properties and value is the new value with which you want to set that property. See *Communities configuration properties* for a complete list of editable properties.

    For example:

    ```
    CommunitiesConfigService.updateConfig("descriptionSummary.size", "500")
    ```

6.  After updating the Communities properties with new values, use the CommunitiesConfigService.showConfig\(\) command to display the list of properties and their updated values. These are the values that will be checked in with the CommunitiesConfigService.checkInConfig\(\) command.

7.  Repeat step 3 for each property setting that you want to change.


You must check the configuration files back in after making changes, and they must be checked in during the same wsadmin session in which they were checked out for the changes to take effect. See *Applying property changes* for details.

-   **[Communities configuration properties](../admin/r_admin_communities_config_props.md)**  
Configuration properties control various features within Communities and also help in the optimization of server performance. They require a Communities application or server restart to take effect.
-   **[Applying property changes in Communities](../admin/t_admin_communities_save_changes.md)**  
After you have edited the Communities configuration properties, check the changed configuration file in, and restart the servers to apply the changes.

**Parent topic:**[Administering Communities](../admin/c_admin_communities_intro.md)

**Related information**  


[Applying property changes in Communities](../admin/t_admin_communities_save_changes.md)

