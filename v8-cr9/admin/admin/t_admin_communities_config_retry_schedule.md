# Configuring the widget life-cycle retry schedule {#t_admin_communities_config_retry_schedule .task}

Communities uses the IBM® WebSphere® Application Server scheduler to run a scheduled task that processes events in the widget life-cycle event queue. You can configure the frequency with which this task runs by editing settings in the communities-config.xml file.

To edit configuration files, you must use the WebSphere Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

To configure the widget life-cycle retry schedule, you need to edit settings in the communities-config.xml file. You can define the interval at which the task runs and specify when the scheduler starts the task. The interval property is configured with a Cron schedule. For more information about the WebSphere Application Server scheduler and the Cron schedule, see *Scheduling tasks*.

1.  To configure the LifecycleRetryQueuedEvents task, complete the following steps.
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

5.  To change display settings for Communities, use the following command:

    CommunitiesConfigService.updateConfig\("property", "value"\)

    where:

    -   property is one of the editable Communities configuration properties.
    -   value is the new value with which you want to set that property.
    The following table displays the LifecycleRetryQueuedEvents properties that can be updated, and additional information regarding each property and the type of data that you can enter.

    |Property|Description|
    |--------|-----------|
    |task.LifecycleRetryQueuedEvents.enabled|Enables or disables the life-cycle retry queued events task.This property accepts the following values: true or false.

For example:

    ```
CommunitiesConfigService.updateConfig("task.LifecycleRetryQueuedEvents.enabled", "true")
    ```

|
    |task.LifecycleRetryQueuedEvents.interval|Specifies the interval at which the life-cycle retry queued events task runs.This property is specified in Cron format. For more information about using the Cron format, see *Scheduling tasks*.

When you change the interval property, the new schedule is registered the next time that Communities is started on any server in the Communities cluster \(if there is one\).

For example:

    ```
CommunitiesConfigService.updateConfig("task.LifecycleRetryQueuedEvents.interval", "0 1 0-23/1 ? * *")
    ```

|

6.  After making changes, you must check the configuration files back in, and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying property changes in Communities* for information about how to save and apply your changes.


**Parent topic:**[Administering widgets and remote applications](../admin/c_admin_communities_administering_widgets.md)

**Related information**  


[Applying property changes in Communities](../admin/t_admin_communities_save_changes.md)

[Scheduling tasks](../admin/c_admin_common_was_scheduler.md)

