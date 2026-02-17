# Managing scheduled tasks for the News repository {#t_admin_news_manage_scheduler .task}

Use administrative commands to manage scheduled tasks for the News repository.

To run administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

You can use the NewsScheduler commands to pause and resume the scheduled tasks for the News repository, and to retrieve information about tasks. The scheduling information is contained in news-config.xml; for more information, see *Accessing the News configuration file*.

SystemOut.log also contains information about whether the scheduler is running and whether any scheduled tasks have started. Log messages for the news service have the prefix CLFWX in SystemOut.log. For more information, see *HCL Connections log file*.

The News repository uses the IBM® WebSphere® Application Server scheduling service for performing regular managed tasks. For more information about how the scheduler works, see *Scheduling tasks*.

1.  To manage a scheduled task, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  Start the Jython script interpreter for the News repository.

    1.  Use the following command to access the News configuration file:

        ```
        execfile("newsAdmin.py")
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

4.  Use the following commands to administer the scheduler service for the News repository.

    NewsScheduler.getTaskDetails\(java.lang.String taskName\)
    :   Returns information about the scheduled task specified by taskName.

        The values returned are server time, next scheduled run time, status \(SCHEDULED, RUNNING, SUSPENDED\), and task name. When the task has been paused, then the status parameter shows as SUSPENDED instead of SCHEDULED. SUSPENDED means that the task is not scheduled to run.

        For example:

        ```
        NewsScheduler.getTaskDetails("NewsDataCleanup")
        ```

        The resulting output looks similar to the following:

        ```
        {taskName=NewsDataCleanup, currentServerTime=Fri Mar 12 
        14:42:25 GMT 2010, nextFireTime=Fri Mar 12 23:00:00 
        GMT 2010, status=SCHEDULED}
        ```

    NewsScheduler.pauseSchedulingTask\(java.lang.String taskName\)
    :   Temporarily pauses the specified task and stops it from running.

        When you pause a scheduled task, the task remains in the suspended state even after you stop and restart News or the WebSphere Application Server. You must run the NewsScheduler.resumeSchedulingTask\(String taskName\) command to get the task running again.

        If the task is currently running, it continues to run but is not scheduled to run again. If the task is already suspended, this command has no effect. When the task is paused successfully, a 1 is returned to the wsadmin client. When the task is not paused successfully, a 0 is returned.

        For example:

        ```
        NewsScheduler.pauseSchedulingTask("NewsDataCleanup")
        ```

    NewsScheduler.resumeSchedulingTask\(java.lang.String taskName\)
    :   If the task is suspended, puts the task in the scheduled state. If the task is not suspended, this command has no effect.

        When a task is resumed, it does not run immediately; it runs at the time when it is next scheduled to run.

        For example:

        ```
        NewsScheduler.resumeSchedulingTask("NewsDataCleanup")
        ```

        When the task is resumed successfully, a 1 is returned to the wsadmin client. When the task is not resumed successfully, a 0 is returned.


**Parent topic:**[Administering the News repository](../admin/c_admin_news.md)

**Related information**  


[Configuring database clean-up for the News repository](../admin/t_admin_homepage_config_news_data_cleanup.md)

[Accessing the News configuration file](../admin/t_admin_homepage_access_news_config.md)

[Scheduling tasks](../admin/c_admin_common_was_scheduler.md)

[News administrative commands](../admin/r_admin_news_admin_props.md)

[HCL Connections log file](../troubleshoot/c_log_file.md)

