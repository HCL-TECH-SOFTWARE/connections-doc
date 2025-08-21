# Listing scheduled tasks {#t_admin_search_retrieve_index_tasks .task}

Use SearchService administrative commands to list the scheduled tasks defined in the Home page database.

To use SearchService administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

1.  To list the scheduled tasks defined in the Home page database, complete the following steps.
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

4.  Use the following commands to list tasks defined in the Home page database.

    - ```SearchService.listTasks()```
    
        Lists all Search scheduled task definitions \(indexing and optimize\) defined in the Home page database.

        This command does not take any input parameters.

    - ```SearchService.listIndexingTasks()```

        Lists all scheduled indexing task definitions defined in the Home page database.

        This command does not take any input parameters.

    - ```SearchService.listOptimizeTasks()```

        Lists all scheduled optimize task definitions defined in the Home page database.

        This command does not take any input parameters.


**Parent topic:**[Configuring scheduled tasks](../admin/c_admin_search_configure_scheduled_tasks.md)

**Related information**  


[SearchService commands](../admin/r_admin_searchservice_commands.md)

[Scheduling tasks](../admin/c_admin_common_was_scheduler.md)

[Deleting scheduled tasks for Search](../admin/t_admin_search_delete_task_definition.md)

[Adding scheduled tasks for Search](../admin/t_admin_search_configure_index_tasks.md)

[Listing Search tasks that are currently running](../admin/t_admin_search_list_tasks.md)

