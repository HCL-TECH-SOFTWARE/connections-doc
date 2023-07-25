# Managing Forums scheduled tasks {#t_admin_forums_manage_scheduler .task}

Use the ForumsScheduler administrative commands to manage the tasks that are scheduled for forums.

To run administrative commands, you must use the wsadmin client. For more information, see [Starting the wsadmin client](t_admin_wsadmin_starting.md).

The Forums application uses the IBM® WebSphere® Application Server scheduling service for running regular managed tasks. For more information about how the scheduler works, see *Scheduling tasks*.

The Forums application has one managed task, the TrashAutoPurgeJob task, which removes deleted data from the Forums database. For more information about the TrashAutoPurgeJob task, see *Purging forum trash*. You can use the ForumsScheduler commands to pause and resume the TrashAutoPurgeJob task, and to retrieve information about the task. The scheduling information is contained in the forum-config.xml file. The SystemOut.log file also contains information about whether the scheduler is running and whether any scheduled tasks are running.

1.  To manage scheduled tasks for Forums, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands fail. For more information, see *Starting the wsadmin client*.

3.  Start the Forums Jython script interpreter by using the following command:

    ```
    execfile("forumsAdmin.py")
    ```

    If you are prompted to specify a service to connect to, enter 1 to select the first node in the list. Most commands can run on any node. If the command specifies a file by using a local file path, select the node where the file is stored.

4.  Use the following commands to administer the Forums scheduler service.

    :

    ForumsScheduler.getTaskDetails\(String taskName\)
    :   Returns information about the scheduled task, specified by taskName. Forums currently has a single managed task – TrashAutoPurgeJob.

        The values that are returned are server time, next scheduled run time, status \(SCHEDULED, RUNNING, SUSPENDED\), and task name. When the task is paused, then the status parameter shows as SUSPENDED instead of SCHEDULED. SUSPENDED means that the task is not scheduled to run.

        For example:

        ```
        ForumsScheduler.getTaskDetails("TrashAutoPurgeJob")
        ```

        The resulting output looks similar to the following example:

        ```
        {currentServerTime=Wed Feb 03 14:21:47 EST 2010, 
        nextFireTime=Sun Feb 07 02:00:00 EST 2010, 
        status=SCHEDULED, taskName=TrashAutoPurgeJob}
        ```

    ForumsScheduler.pauseSchedulingTask\(String taskName\)
    :   Temporarily pauses the specified task and stops it from running.

        When you pause a scheduled task, the task remains in the suspended state even after you stop and restart Forums or the IBM WebSphere Application Server. To resume the task, run the ForumsScheduler.resumeSchedulingTask\(String taskName\) command.

        If the task is running, it continues to run but is not scheduled to run again. If the task is already suspended, this command has no effect.

        For example:

        ```
        ForumsScheduler.pauseSchedulingTask("TrashAutoPurgeJob")
        ```

        When a task is paused, a status message similar to the following is written to the SystemOut.log file:

        ```
        [2/3/10 14:28:10:782 EST] 0000002f ForumsNotific I   CLFWY0134I: Forums scheduled task 'TrashAutoPurgeJob' fired event 'TaskNotificationInfo.SUSPENDED'
        ```

    ForumsScheduler.resumeSchedulingTask\(String taskName\)
    :   If the task is suspended, puts the task in the scheduled state. If the task is not suspended, this command has no effect.

        When a task is resumed, it does not run immediately; it runs at the time when it is next scheduled to run.

        For example:

        ```
        ForumsScheduler.resumeSchedulingTask("TrashAutoPurgeJob")
        ```

        Resuming a paused task causes the following status message to be written to the SystemOut.log file:

        ```
        [2/3/10 14:28:25:407 EST] 00000051 ForumsNotific I   CLFWY0134I: Forums scheduled task 'TrashAutoPurgeJob' fired event 'TaskNotificationInfo.RESUMED'
        ```


**Parent topic:**[Administering Forums](../admin/c_admin_forums_overview.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Purging forum trash on a schedule](../admin/t_admin_forums_purge_trash.md)

[Scheduling tasks](../admin/c_admin_common_was_scheduler.md)

