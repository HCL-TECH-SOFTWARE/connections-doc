# Configuring database clean-up for the News repository {#t_admin_homepage_config_news_data_cleanup .task}

Edit settings in the news-config.xml file to define the interval at which the different database clean-up tasks run and specify when the IBM® WebSphere® Application Server scheduler starts the tasks.

To edit configuration files, you must use the WebSphere Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

The database clean-up tasks defined in the news-config.xml file ensure that content that is out-of-date is periodically removed from the News repository. You can update the following properties for these tasks:

enabled
:   Enables or disables the task. This property takes a Boolean value, true or false. The value must be formatted in lowercase.

interval
:   Specifies the interval at which the task runs. This property is a string value that must be specified in Cron format. For more information about the Cron schedule, see *Scheduling tasks*.

**Note:** If you disable the database clean-up tasks, you run the risk of rapidly reaching your file system storage limit as the database increases in size. Disabling these tasks can also result in poor data access performance.

1.  To configure database clean-up tasks, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  Start the News Jython script interpreter.

    1.  Use the following command to access the News configuration file:

        ```
        execfile("newsAdmin.py")
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    2.  Check out the News cell-level configuration file using the following command:

        NewsCellConfig.checkOutConfig\("working\_dir", "cellName"\)

        where:

        -   working\_dir is the temporary directory to which you want to check out the cell-level configuration file. This directory must exist on the server where you are running wsadmin.

            **Note:** Linux only: The directory must grant write permissions or the command will not run successfully.

        -   cellName is the name of the cell that the home page node belongs to. This argument is required. It is also case-sensitive, so type it with care. If you do not know the cell name, type the following command in the wsadmin command processor to determine it:

            print AdminControl.getCell\(\)

        For example:

        ```
        NewsCellConfig.checkOutConfig("d:/temp", "NewsServerNode01Cell")
        
        ```

        The command displays this message:

        ```
        News Cell Level configuration file successfully checked out.
        ```

4.  Open news-config.xml in a text editor.

5.  Locate the section of the file containing the database clean-up tasks and make the necessary changes.

    -   To update the News data clean-up task:
        1.  Enable or disable the task by locating the following section of code and updating the value of the enabled parameter. By default, the task is enabled and runs every day exactly at 23 hours.

            ```
            <task name="NewsDataCleanup" description="Job to clean up the news"
            interval="0 0 23 ? * *" startby="" enabled="true" scope="cluster" type="internal"
            targetName="ScheduledTaskService" mbeanMethodName="" serverName="unsupported" >
            </task>
            ```

        2.  Specify the interval at which news stories are deleted from the News repository:

            For example, the following code specifies that news stories are deleted from the database when they are more than 30 days old.

            ```
            <databaseCleanup>
            ...
              <storyLifetimeInDays>30</storyLifetimeInDays>
            </databaseCleanup>
            ```

    -   To update the ReplyToId clean-up task:
        1.  Enable or disable the task by locating the following section of code and updating the value of the enabled parameter. By default, the task is enabled and runs weekly.

            ```
            <!-- This task run periodically to purge the system of expired ReplyTo Id records>
              <task  serverName="unsupported"
                startby=""
                mbeanMethodName=""
                targetName="ScheduledTaskService"
                type="internal"
                scope="cluster"
                enabled="true"
                interval="0 0 4 ? * SAT"
                description="Job to cleanup Expired ReplyTo Id records"
                name="ReplyToIdCleanup" >
              </task>
            ```

        2.  Set the expiry date for the ReplyTo IDs that enable users to reply to notifications about forum posts directly in the forum:

            For example, the following code specifies that ReplyTo IDs are deleted from the database when they are 365 days old.

            ```
            <databaseCleanup>
            ...
              <replyToIdLifetimeInDays>365</replyToIdLifetimeInDays>
            </databaseCleanup>
            ```

    -   To update the ReplyToAttachment clean-up task:
        1.  Enable or disable the task by locating the following section of code and updating the value of the enabled parameter. By default, the task is enabled and runs weekly.

            ```
            <!-- This task runs periodically to remove any replyTo attachments that were not properly removed from the shared data store>
              <task  serverName="unsupported"
                startby=""
                mbeanMethodName=""
                targetName="ScheduledTaskService"
                type="internal"
                scope="cluster"
                enabled="true"
                interval="0 0 4 ? * SUN"</p><p>
                description="Job to cleanup Expired ReplyTo Attachment Files"
                name="ReplyToAttachmentCleanup" >
              </task>
            ```

        2.  Specify the number of days to keep mailed-in reply attachments and folders on the file system before deleting them:

            For example, the following code specifies that any resource stored by the system is to be deleted after 7 days.

            ```
            <databaseCleanup>
            ...
              <!-- The number of days before the system will remove any replyTo attachments that were not properly removed from the shared data store. -->
              <replyToAttachmentLifetimeInDays>7</replyToAttachmentLifetimeInDays>
            </databaseCleanup>
            ```

6.  After making changes, you must check the configuration files back in, and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying property changes in the News repository* for information about how to save and apply your changes.


**Parent topic:**[Administering the News repository](../admin/c_admin_news.md)

**Related information**  


[Applying property changes in the News repository](../admin/t_admin_news_apply_property_changes.md)

[Accessing the News configuration file](../admin/t_admin_homepage_access_news_config.md)

[Managing scheduled tasks for the News repository](../admin/t_admin_news_manage_scheduler.md)

[Purging compromised reply-to IDs](../admin/t_admin_news_purge_replyto_ids.md)

