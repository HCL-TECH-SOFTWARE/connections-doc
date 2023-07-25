# Managing the scheduler {#t_admin_act_manage_scheduler .task}

Use administrative commands to manage scheduled tasks in Activities.

To run administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

Activities uses the IBM® WebSphere® Application Server scheduling service for performing regular managed tasks. For more information about how the scheduler works, see *Scheduling tasks*.

To manage a task, complete the following steps:

1.  Start the Activities Jython script interpreter.

    1.  Use the following command to access the Activities configuration file:

        ```
        execfile("activitiesAdmin.py")
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

2.  Use the following commands to administer the Activities scheduler service.

    ActivitiesScheduler.getTaskDetails\(java.lang.String taskName\)
    :   Returns information about the scheduled task specified by taskName. Specify one of the following jobs:

        -   "30MinStats"
        -   "ActivityAutoCompleteJob"
        -   "DailyStats"
        -   "DatabaseRuntimeStats"
        -   "TrashAutoPurgeJob"
        -   "EventLogPurgeJob"
        The values returned are server time, next scheduled run time, status \(SCHEDULED, RUNNING, SUSPENDED\), and task name. When the task has been paused, then the status parameter shows as SUSPENDED instead of SCHEDULED. SUSPENDED means that the task is not scheduled to run.

        For example:

        ```
        ActivitiesScheduler.getTaskDetails("TrashAutoPurgeJob")
        ```

        The resulting output looks similar to the following:

        ```
        {currentServerTime=Fri Jan 22 14:13:52 EST 2010, nextFireTime=
        Fri Jan 22 14:21:00 EST 2010, status=SCHEDULED, taskName=TrashAutoPurgeJob}
        ```

    ActivitiesScheduler.pauseSchedulingTask\(java.lang.String taskName\)
    :   Temporarily pauses the specified task and stops it from running.

        When you pause a scheduled task, the task remains in the suspended state even after you stop and restart Activities or the IBM WebSphere Application Server. You must run the ActivitiesScheduler.resumeSchedulingTask\(String taskName\) command to get the task running again.

        If the task is currently running, it continues to run but is not scheduled to run again. If the task is already suspended, this command has no effect.

        For example:

        ```
        ActivitiesScheduler.pauseSchedulingTask("TrashAutoPurgeJob")
        ```

        When a task is paused, a status message similar to the following is written to the SystemOut.log file:

        ```
        [2/10/10 15:28:26:354 EST] 00000659 ActivitiesNot I   
        CLFWY0134I: Activities scheduled task 'TrashAutoPurgeJob' fired event 
        'TaskNotificationInfo.SUSPENDED'
        ```

        When the task is paused successfully, a 1 is returned to the wsadmin client. When the task is not paused successfully, a 0 is returned.

    ActivitiesScheduler.resumeSchedulingTask\(java.lang.String taskName\)
    :   If the task is suspended, puts the task in the scheduled state. If the task is not suspended, this command has no effect.

        When a task is resumed, it does not run immediately; it runs at the time when it is next scheduled to run.

        For example:

        ```
        ActivitiesScheduler.resumeSchedulingTask("TrashAutoPurgeJob")
        ```

        Resuming a paused task causes the following status message to be written to the SystemOut.log file:

        ```
        [2/10/10 15:49:12:198 EST] 00000633 ActivitiesNot I   
        CLFWY0134I: Activities scheduled task 'TrashAutoPurgeJob' fired event 
        'TaskNotificationInfo.RESUMED'
        ```

        When the task is resumed successfully, a 1 is returned to the wsadmin client. When the task is not resumed successfully, a 0 is returned.


**Parent topic:**[Running Activities administrative commands](../admin/t_admin_act_change_admin_props.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Completing activities that are not being used](../admin/t_admin_act_auto_completing.md)

[Scheduling Activities statistics collection](../admin/t_admin_act_schedule_stat_jobs.md)

[Emptying the Activities trash on a schedule](../admin/t_admin_act_trash_removal.md)

