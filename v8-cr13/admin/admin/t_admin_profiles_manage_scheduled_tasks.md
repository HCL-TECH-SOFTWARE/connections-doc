# Managing Profiles scheduled tasks {#t_admin_profiles_manage_scheduled_tasks .task}

Use the ProfilesScheduledTaskService administrative commands to manage the tasks scheduled for Profiles.

To use administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

Profiles uses the IBM® WebSphere® Application Server scheduling service for performing regular managed tasks. For more information about how the scheduler works, see *Scheduling tasks*.

Profiles has four managed tasks that are specified in the profiles-config.xml property file. You can use the ProfilesScheduledTaskService commands to pause and resume a Profiles task, and to retrieve information about a task. The SystemOut.log file also contains information about whether the scheduler is running and whether any scheduled tasks have started.

1.  To administer the tasks performed by the WebSphere Application Server scheduler, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    app_server_root\profiles\dm_profile_root\bin
    ```

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly. For more information, see *Starting the wsadmin client*.

3.  Start the Profiles Jython script interpreter using the following command:

    ```
    execfile("profilesAdmin.py")
    ```

    If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

4.  Use the following commands to administer the Profiles scheduler service.

    ProfilesScheduledTaskService.pauseSchedulingTask\(string taskName\)
    :   Suspends scheduling of a task. Has no effect on currently running tasks. Returns a 1 to indicate that the task has been paused. Paused tasks remain paused until you explicitly resume them, even if the server is stopped and restarted.

        Parameters: taskName

        Task names have the following string values:

        -   DbCleanupTask
        -   ProcessLifeCycleEventsTask
        -   ProcessTDIEventsTask
        -   StatsCollectorTask
        For example:

        ```
        ProfilesScheduledTaskService.pauseSchedulingTask("StatsCollectorTask")
        ```

    ProfilesScheduledTaskService.resumeSchedulingTask\(string taskName\)
    :   Resumes the start of a paused task. Returns a 1 to indicate that the task has been resumed.

        Parameters: taskName

        Task names have the following string values:

        -   DbCleanupTask
        -   ProcessLifeCycleEventsTask
        -   ProcessTDIEventsTask
        -   StatsCollectorTask
        For example:

        ```
        ProfilesScheduledTaskService.resumeSchedulingTask("StatsCollectorTask")
        ```

    ProfilesScheduledTaskService.forceTaskExecution\(string taskName, string executeSynchronously\)
    :   Property settings in the profiles-config.xml file specify whether tasks are enabled to run automatically, and how often. This command allows you to run tasks manually, for example if you disabled a task but want to run it occasionally.

        Executes a task. Returns a 1 to indicate that the task has been executed.

        Parameters: taskName

        Task names have the following string values:

        -   DbCleanupTask
        -   ProcessLifeCycleEventsTask
        -   ProcessTDIEventsTask
        -   StatsCollectorTask
        Parameters: executeSynchronously

        This takes the string values true or false. Specifying this value is not required; the default is false. If this value is false, then the task executes asynchronously, meaning if the taskId is valid the command returns immediately and the execution continues in the background. If this value is true, it the command does not return until the task completes. The StatsCollectorTask is a local task \(run on each node\) and is always run asynchronously when triggered from the admin console.

        For example:

        ```
        ProfilesScheduledTaskService.forceTaskExecution("StatsCollectorTask")
        ```

    ProfilesScheduledTaskService.getTaskDetails\(string taskName\)
    :   Displays status of a task and details about configuration parameters.

        Parameters: taskName

        Task names have the following string values:

        -   DbCleanupTask
        -   ProcessLifeCycleEventsTask
        -   ProcessTDIEventsTask
        -   StatsCollectorTask
        For example:

        ```
        ProfilesScheduledTaskService.getTaskDetails("StatsCollectorTask")
        ```


**Parent topic:**[Administering Profiles](../admin/c_admin_profiles_intro.md)

