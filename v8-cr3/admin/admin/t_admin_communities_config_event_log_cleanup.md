# Configuring news event log clean-up {#t_admin_communities_config_event_log_cleanup .task}

Edit settings in the communities-config.xml file to define the interval at which the EventLogCleanup task runs.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

Communities has a database table called EVENTLOG. When certain predefined events occur in communities, those events are written to the table, which increases in size as more and more events are added. The EventLogCleanup task is used to clean up the EVENTLOG database table by removing events that are older than 30 days. When you install HCL Connections, by default, the EventLogCleanup task is scheduled to run every day, every 3 hours, and to delete events older than 30 days. If you want to modify the default schedule to run more or less frequently, you can do so by changing the WebSphere Application Server Cron schedule for this task. For more information about the WebSphere Application Server scheduler, see *Scheduling tasks*.

1.  To configure the EventLogCleanup task, complete the following steps.
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

4.  To view the current configuration settings, use the following command:

    CommunitiesConfigService.showConfig\(\)

    **Note:** After updating any of the configuration settings, you can use this command again to display your updates.

5.  To modify the setting for the scheduled task, use the following command:

    CommunitiesConfigService.updateConfig\("property", "value"\)

    where:

    -   property is one of the editable Communities configuration properties.
    -   value is the new value with which you want to set that property.
    The following table displays the EventLogCleanup property and provides additional information regarding the property and the type of data that you can enter for it.

    |Property|Description|
    |--------|-----------|
    |task.EventLogCleanup.enabled|Enables or disables the event log cleanup task.This property accepts the following values: true or false.

For example:

    ```
CommunitiesConfigService.updateConfig("task.EventLogCleanup.enabled", "true")
    ```

|
    |task.EventLogCleanup.interval|Specifies the interval at which the event log cleanup task runs. The parameter is specified in Cron format. For more information about using the Cron format, see *Scheduling tasks*.When you change the interval property, the new schedule is registered the next time that Communities is started on any server in the Communities cluster \(if there is one\).

When you install HCL Connections, the default setting for this task is 0 30 0-23/3 ? \* \*, which means that it will run every 3 hours at 30 minutes past the hour.

In the following example, the EventLogCleanup task is set to run once every hour at 32 minutes past the hour.

    ```
CommunitiesConfigService.updateConfig("task.EventLogCleanup.interval", "0 32 0-23/1 ? * *")
    ```

|

6.  After making changes, you must check the configuration files back in, and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying property changes in Communities* for information about how to save and apply your changes.


**Parent topic:**[Administering Communities](../admin/c_admin_communities_intro.md)

**Related information**  


[Applying property changes in Communities](../admin/t_admin_communities_save_changes.md)

[Managing Communities scheduled tasks](../admin/t_admin_communities_manage_scheduled_tasks.md)

[Scheduling tasks](../admin/c_admin_common_was_scheduler.md)

