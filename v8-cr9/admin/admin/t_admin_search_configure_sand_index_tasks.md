# Adding scheduled tasks for the social analytics service {#t_admin_search_configure_sand_index_tasks .task}

Use SearchService administrative commands to schedule social analytics tasks in the Home page database. A nightly task is scheduled to run after the optimize task by default. Every time the social analytics scheduled task runs, the index for the social analytics service is recreated.

To use SearchService administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

The social analytics indexing process includes the following five jobs. You can schedule these jobs individually or in a batch.

evidence
:   Builds the evidence index, which links people to results and maps user connections.

graph
:   Builds the graph of connections between users.

manageremployees
:   Provides details of manager relationships so that people's relationships through their management can be identified. For example, when two people share a second line manager.

tags
:   Generates index documents for each used tag and stores the list of users that have used that tag.

taggedby
:   Creates relationships between the users who have tagged each other's profiles.

communitymembership
:   Creates relationships between the users who are members of the same community.

    **Note:** Communities that have more than 100 members are skipped. These communities will not be recommended to users.

When defining a social analytics scheduled task in the Home page database, you need to specify when the scheduler starts the task. The schedule is defined using a Cron schedule. For more information about the scheduler, see *Scheduling tasks*.

It is not possible to specify an end time for a scheduled task. All tasks run as long as they need to. The startby interval defines the time period by which a task can fire before it is automatically canceled. This mechanism ensures that tasks do not queue up for an overly long period before being canceled, and allows for tasks than run for longer than the default indexing schedule, such as initial index creation.

1.  To define a social analytics scheduled task, complete the following steps.
2.  Start the wsadmin client from one of the following directories on the system on which you installed the Deployment Manager:

    Linux: `[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin`

    Windows: `[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/bin`

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  After the wsadmin command environment has initialized, enter the following command to initialize the Search environment and start the Search script interpreter:

    ```
    execfile("searchAdmin.py")
    ```

    If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    When the command is run successfully, the following message displays:

    ```
    Search Administration initialized
    ```

4.  Use the following command:

    SearchService.addSandTask\(String taskName, String schedule, String startBy, String jobs\)
    :   Creates a new scheduled task definition for the social analytics service in the Home page database.

        This command takes the following arguments:

        -   taskName. The name of the scheduled task. This argument is a string value, which must be unique.
        -   schedule. The time at which the scheduled task starts. This argument is a string value that must be specified in Cron format.
        -   startBy. The time given to a task to fire before it is automatically canceled. This argument is a string value that must be specified in Cron format.

            This parameter should be used to ensure that scheduled tasks are not queued up and running into server busy times. Under normal conditions, the only factors that might cause a task to be delayed are that overlapping or coincident tasks are trying to fire at the same time, or an earlier task is running for a long time.

        -   jobs. The name, or names, of the jobs to be run when the task is triggered. This argument is a string value. To index multiple jobs, use a comma-delimited list. The following values are valid: evidence, graph, manageremployees, tags, taggedby, and communitymembership.
        All the arguments are required.

        For example:

        ```
        SearchService.addSandTask("customSaNDIndexTask",
           "0 0 1 ? * MON-FRI", "0 10 1 ? * MON-FRI",
           "evidence,graph,manageremployees,tags,taggedby,communitymembership")
        ```

        When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

        You can also use the SearchService.addSandTask command to replace the nightly-sand-task that is automatically configured when you install HCL Connections. By default, the task runs nightly at 01:00. To replace the default SAND task settings, first remove the existing task using the SearchService.deleteTask\(String taskName\) command. Then use the SearchService.addSandTask command to create a new SAND task with the values that you specify.

        For example:

        ```
        SearchService.deleteTask("nightly-sand-task")
        SearchService.addSandTask("nightly-sand-task",
           "0 0 1 * * ?", "0 5 1 * * ?", 
           "evidence,graph,manageremployees,tags,taggedby,communitymembership")
        ```

5.  To refresh the Home page database to include the newly-added tasks, use the following command:

    SearchService.refreshTasks\(\)


**Parent topic:**[Administering the social analytics service](../admin/c_admin_search_sand_indexing_tasks.md)

**Related information**  


[Scheduling tasks](../admin/c_admin_common_was_scheduler.md)

[Configuring scheduled tasks](../admin/c_admin_search_configure_scheduled_tasks.md)

[Search default scheduled tasks](../admin/r_admin_search_default_indexing_tasks.md)

[Adding scheduled tasks for Search](../admin/t_admin_search_configure_index_tasks.md)

[Listing social analytics scheduled tasks](../admin/t_admin_search_list_sand_tasks.md)

