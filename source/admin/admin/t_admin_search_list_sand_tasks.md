# Listing social analytics scheduled tasks {#t_admin_search_list_sand_tasks .task}

You can use a SearchService administrative command to list the tasks that are scheduled for the social analytics service.

To use SearchService administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

1.  To list the scheduled tasks defined for the social analytics service, complete the following steps.
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

    SearchService.listSandTasks\(\)
    :   Lists all the tasks scheduled for the social analytics service that are defined in the Home page database.

        This command does not take any input parameters.


**Parent topic:**[Administering the social analytics service](../admin/c_admin_search_sand_indexing_tasks.md)

**Related information**  


[Adding scheduled tasks for the social analytics service](../admin/t_admin_search_configure_sand_index_tasks.md)

[Running one-off social analytics scheduled tasks](../admin/t_admin_search_one_off_sand_tasks.md)

