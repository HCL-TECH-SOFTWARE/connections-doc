# Deleting scheduled tasks for Search {#t_admin_search_delete_task_definition .task}

Use SearchService administrative commands to delete scheduled task definitions from the Home page database.

To use SearchService administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

1.  To delete scheduled tasks for Search, complete the following steps.
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

4.  Use the following commands:

    - ```SearchService.deleteAllTasks()```
        
        Deletes all task definitions from the Home page database.

        This command does not take any parameters.

        When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

    - ```SearchService.deleteTask(String taskName)``
    
        Deletes the task definition with the specified name from the Home page database.

        This command takes a string value, which is the name of the task to be deleted. For information about how to retrieve the names of the tasks in the Home page database, see *Listing scheduled tasks*.

        For example:

        ```
        SearchService.deleteTask("profilesIndexingTask")
        ```

        When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

5.  To refresh the Home page database and purge it of information related to the deleted task or tasks, use the following command:

    ```SearchService.refreshTasks()```


**Parent topic:**[Configuring scheduled tasks](../admin/c_admin_search_configure_scheduled_tasks.md)

**Related information**  


[Adding scheduled tasks for Search](../admin/t_admin_search_configure_index_tasks.md)

[Listing scheduled tasks](../admin/t_admin_search_retrieve_index_tasks.md)

[Restoring the default scheduled tasks for Search](../admin/t_admin_search_reset_tasks.md)

