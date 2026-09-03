# Managing Communities scheduled tasks {#t_admin_communities_manage_scheduled_tasks .task}

Use the CommunitiesScheduler commands to administer the community event tasks performed by the IBM® WebSphere® Application Server scheduler. These administrative commands do not require a server restart to take effect, and no file checkout is necessary.

To use administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

Communities uses the WebSphere Application Server scheduler to run the following scheduled tasks relating to community eventsand cleaning up data. For more information about the scheduler, see *Scheduling tasks*.

LifecycleRetryQueuedEvents
:   Automatically retries sending life-cycle events to other applications when event processing fails, for example, when another application server is down. For more information about life-cycle events, see *Administering widgets and remote applications*.

EventLogCleanup
:   Removes old entries from the event log. For more information on the EventLogCleanup task, see *Configuring news event log clean-up*.

GroupCleanup
:   Removes cached LDAP group information from the Communities database for groups that are no longer used in community membership.

fullDelete
:   Removes deleted communities from the trash. The number of days that a community stays in the trash before being removed is configurable. For more information, see *Working with Communities trash.*

You can use the CommunitiesScheduler commands to retrieve details about these tasks, and manually pause and resume the tasks as needed.

1.  To administer the tasks performed by the WebSphere Application Server scheduler, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter will not execute correctly.

3.  Start the Communities Jython script interpreter using the following command:

    ```
    execfile("communitiesAdmin.py")
    ```

    If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

4.  Use the following commands to administer the Communities scheduler service:

    CommunitiesScheduler.getTaskDetails\(String taskName\)
    :   Returns information about the scheduled task specified by taskName. The task names are LifecycleRetryQueuedEvents and EventLogCleanup.

        The values returned in the HashMap are the next scheduled fire time, server time, status \(SCHEDULED, RUNNING, SUSPENDED\), and task name. SUSPENDED means that the task is not scheduled to run.

        For example:

        ```
        CommunitiesScheduler.getTaskDetails("LifecycleRetryQueuedEvents")
        ```

    CommunitiesScheduler.pauseSchedulingTask\(String taskName\)
    :   Puts the task in the suspended state. When you pause a scheduled task, that task remains in the suspended state even after you stop and restart Communities or the WebSphere Application Server. The task names are LifecycleRetryQueuedEvents and EventLogCleanup. Run the CommunitiesScheduler.resumeSchedulingTask command to get the scheduled task running again.

        If the task is currently running when you use this command, the task continues to run but is not scheduled to run again. If the task is already suspended, this command has no effect.

        The return value is either 1 or 0. 1 indicates success; 0 indicates failure.

        For example:

        ```
        CommunitiesScheduler.pauseSchedulingTask("LifecycleRetryQueuedEvents")
        ```

    CommunitiesScheduler.resumeSchedulingTask\(String taskName\)
    :   If the task is suspended, puts the task in the scheduled stated. If the task is not suspended, this command has no effect. The task names are LifecycleRetryQueuedEvents and EventLogCleanup.

        The return value is either 1 or 0. 1 indicates success; 0 indicates failure.

        For example:

        ```
        CommunitiesScheduler.resumeSchedulingTask("LifecycleRetryQueuedEvents")
        ```


**Parent topic:**[Administering Communities](../admin/c_admin_communities_intro.md)

**Related information**  


[Administering community queued events](../admin/t_admin_communities_event_admin.md)

[Configuring news event log clean-up](../admin/t_admin_communities_config_event_log_cleanup.md)

[Administering widgets and remote applications](../admin/c_admin_communities_administering_widgets.md)

[Scheduling tasks](../admin/c_admin_common_was_scheduler.md)

[Working with Community trash](../admin/c_admin_communities_trash.md)

