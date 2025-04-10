# Changing Forums configuration property values {#t_admin_forums_changing_config .task}

Configuration settings control how and when various Forums operations take place.

To run administrative commands, you must use the wsadmin client. For more information, see [Starting the wsadmin client](t_admin_wsadmin_starting.md).

Configure Forums by using Jython scripts that are accessed by the wsadmin client. These scripts use the AdminConfig object in the wsadmin client to interact with the Forums configuration file. After you change Forums configuration settings, you must synchronize the nodes and restart the Forums application server.

1.  To change Forums configuration settings, complete the following steps.
2.  Start the wsadmin client from the following directory on the system where you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/bin
    ```

    where dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or else subsequent commands that you enter might fail.

3.  Start the Forums Jython script interpreter.

    1.  Use the following command to access the Forums configuration file:

        ```
        execfile("forumsAdmin.py")
        ```

        If you are prompted to specify a service to connect to, enter 1 to select the first node in the list. Most commands can run on any node. If the command specifies a file by using a local file path, select the node where the file is stored.

    2.  Check out the Forums configuration files by using the following command:

        ForumsConfigService.checkOutConfig\("working\_directory", "cell\_name"\)

        where:

        -   working\_directory is the temporary working directory to which the XML and XSD configuration files are copied. The files are kept in this working directory while you modify them.

            **Note:** Linux only: The directory must grant write permissions or the command fails.

        -   cell\_name is the name of the WebSphere® Application Server cell that hosts the HCL Connections applications. This argument is required. It is also case-sensitive, so type it with care. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor:

            print AdminControl.getCell\(\)

        For example:

        ForumsConfigService.checkOutConfig\("/opt/my\_temp\_dir", "ForumServerNode01Cell"\)

4.  To view a list of the valid Forums configuration settings and their current values, use the following command:

    ForumsConfigService.showConfig\(\)

5.  To change a Forums configuration setting, use the following command:

    ForumsConfigService.updateConfig\("property", "value"\)

    where property is one of the editable Forums configuration properties and value is the new value of the property. For a complete list of editable properties, see *Forums configuration properties*.

    For example:

    ForumsConfigService.updateConfig\("task.TrashAutoPurgeJob.trashRetentionInDays", "120"\)

6.  After you update the Forums properties with new values, use the ForumsConfigService.showConfig\(\) command to display the list of properties and their updated values.

7.  Repeat step 3 for each property that you want to change.


Check in the configuration files during the same wsadmin session in which they were checked out. For more information, see *Applying property changes*.

-   **[Forums configuration properties](../admin/r_admin_forums_config_props.md)**  
Configuration settings control configurable features within Forums and can also help to optimize the performance of the application server. When you change these settings, you mush restart the Forums application server.
-   **[Applying property changes in Forums](../admin/t_admin_forums_save_changes.md)**  
After you edit configuration properties, check the modified configuration file in and restart the servers to apply the changes.

**Parent topic:**[Administering Forums](../admin/c_admin_forums_overview.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Enabling topic posting in different deployments](../admin/t_admin_forums_social_bridge.md)

