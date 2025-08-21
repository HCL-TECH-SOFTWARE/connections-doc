# Enabling and disabling scheduled tasks {#t_admin_search_enable_indexing_task .task}

Use SearchService administrative commands to enable and disable the scheduled tasks defined in the Home page database.

To use SearchService administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

1.  To enable or disable scheduled tasks in the Home page database, complete the following steps.
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

4.  Use the following commands to disable and re-enable scheduled tasks.

    - ```SearchService.disableAllTasks()```
    
        Disables all scheduled tasks for the Search application.

        This command does not take any arguments.

        When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

    - ```SearchService.disableTask(String taskName)```
    
        Disables the scheduled task with the specified name.

        This command takes a single argument:
        
        - taskName 
            
            The name of the task to be disabled. This argument is a string value.
            
            For example:

            ```
            SearchService.disableTask("mine")
            ```

            When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

        Using this command affects the indexing process as follows:

        -   When the command is run before the scheduled task fires, the indexing operation is prevented from starting.
        -   When the command is run during the indexing operation for an application, the Search application stops indexing.
        
        Results for the current application that is being indexed are discarded but, if, as part of an scheduled task, some applications have been successfully crawled, those applications are up-to-date in the index. For example, if a task is fired that is to index Bookmarks, Blogs, and Activities \(in that order\) and the disable command is called while Blogs is being indexed, when the task is enabled again, Blogs and Activities resume indexing at the same point as the previously-called task. Disabled tasks remain disabled until they are re-enabled.

    - ```SearchService.enableAllTasks()```
    
        Re-enables all scheduled tasks for the Search application.

        This command does not take any arguments.

        When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

    - ```SearchService.enableTask(String taskName)```
    
        Re-enables the scheduled task with the specified name. This command uses the current schedule.

        This command takes a single argument:

        - taskName. The name of the task to be enabled. This argument is a string value.
            
            For example:

            ```
            SearchService.enableTask("mine")
            ```

            When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.


**Parent topic:**[Configuring scheduled tasks](../admin/c_admin_search_configure_scheduled_tasks.md)

**Related information**  


[Scheduling tasks](../admin/c_admin_common_was_scheduler.md)

[Adding scheduled tasks for Search](../admin/t_admin_search_configure_index_tasks.md)

[Backing up the Search index manually](../admin/t_admin_homepage_backup_index.md)

[Search error messages](../troubleshoot/r_error_codes_search.md)

