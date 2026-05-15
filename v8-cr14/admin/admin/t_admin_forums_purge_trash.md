# Purging forum trash on a schedule {#t_admin_forums_purge_trash .task}

Configure the schedule for purging Forums trash.

To run administrative commands, you must use the wsadmin client. For more information, see [Starting the wsadmin client](t_admin_wsadmin_starting.md).

Edit settings in the forum-config.xml file to configure the Forums trash purge schedule. You can define the interval at which the task runs by configuring the interval property, which uses a Cron schedule.

The trash purge job is scheduled to run periodically to permanently remove content that is deleted from a forum from the trash. The Forums application uses the WebSphere® Application Server scheduling service for purging trash from Forums. For more information about the scheduler, see *Scheduling tasks*.

1.  To configure the TrashAutoPurgeJob task, complete the following steps.
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

        -   cell\_name is the name of the WebSphere Application Server cell that hosts the HCL Connections applications. This argument is required. It is also case-sensitive, so type it with care. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor:

            print AdminControl.getCell\(\)

        For example:

        ForumsConfigService.checkOutConfig\("/opt/my\_temp\_dir", "ForumServerNode01Cell"\)

4.  To view the current configuration settings, use the following command:

    ForumsConfigService.showConfig\(\)

    **Note:** After you update configuration settings, you can use this command again to display your updates.

5.  To change configuration settings for Forums, use the following command:

    ForumsConfigService.updateConfig\("property", "value"\)

    where:

    -   property is one of the editable Forums configuration properties.
    -   value is the new value that you want to specify for the property.
    The following table displays information about the TrashAutoPurgeJob property and the type of data that you can specify.

    |Property|Description|
    |--------|-----------|
    |task.TrashAutoPurgeJob.enabled|Enables or disables the forum purge trash task.This property accepts the following values: true or false.

For example:

    ```
ForumsConfigService.updateConfig("task.TrashAutoPurgeJob.enabled", "true")
    ```

|
    |task.TrashAutoPurgeJob.trashRetentionInDays|Specifies the number of days that deleted content remains in the database. The value must be set to 1 or greater. If the value is less than 1, the trash is not purged by this job. The default value is 90.For example:

    ```
ForumsConfigService.updateConfig("task.TrashAutoPurgeJob.trashRetentionInDays", "120")
    ```

|
    |task.TrashAutoPurgeJob.interval|Specifies the interval at which the purge trash task runs.When you change the interval property, the new schedule is registered the next time that Forums is started.

For example:

    ```
ForumsConfigService.updateConfig("task.TrashAutoPurgeJob.interval", "0 0/15 * * * ?")
    ```

|

6.  Check the configuration files back in during the same wsadmin session in which you checked them out. For information about how to save and apply your changes, see *Applying property changes in Forums*.


**Parent topic:**[Managing forum trash](../admin/c_admin_forums_manage_trash.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Managing Forums scheduled tasks](../admin/t_admin_forums_manage_scheduler.md)

[Applying property changes in Forums](../admin/t_admin_forums_save_changes.md)

[Scheduling tasks](../admin/c_admin_common_was_scheduler.md)

[Moving forums to the trash](../admin/t_admin_forums_soft_delete.md)

[Deleting topics from forums](../admin/t_admin_forums_delete_topic.md)

