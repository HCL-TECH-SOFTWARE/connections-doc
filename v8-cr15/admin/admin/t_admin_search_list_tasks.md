# Listing Search tasks that are currently running {#t_admin_search_list_tasks .task}

You can use a SearchService command to get a list of the tasks that are currently running for the Search application.

To run SearchService commands, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

1.  To get a list of the Search tasks that are currently running, complete the following steps.
2.  Start the wsadmin client from one of the following directories on the system on which you installed the Deployment Manager:

    Linux: `[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin`

    Windows: `[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/bin`

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

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

4.  Enter the following command:

    ```SearchService.listRunningTasks()```
        
    Lists all the tasks that are currently running for the Search application. This command does not take any input parameters.

    The command returns a list of the tasks that are currently running, and includes the following information for each task:

    - Internal task ID
    - Task name
    - Time that the task started
        
    For example:

    ```
    wsadmin>SearchService.listRunningTasks()
    >>>51
    roi-profiles-WedDec0715:23:09GMT2011
    Wed Dec 07 15:23:09 GMT 2011
    ```


**Parent topic:**[Configuring scheduled tasks](../admin/c_admin_search_configure_scheduled_tasks.md)

**Related information**  


[Listing scheduled tasks](../admin/t_admin_search_retrieve_index_tasks.md)

