# Creating a background index for the social analytics service {#t_admin_search_create_bgd_sand_index .task}

Use the SearchService.startBackgroundSandIndex command to perform background indexing for the social analytics service.

To use SearchService administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

The SearchService.startSandBackgroundIndex command allows you to create a background index for the social analytics service in a specified location. When you run this command, you can specify the social analytics jobs that run as part of the background indexing process.

As an alternative to running this command, you can specify an additional parameter when you are running the SearchService.startBackgroundIndex command so that the social analytic indexers run at the end of the background indexing operation. For more information, see *Creating a background index*.

1.  To create a background index for the social analytics service, complete the following steps.
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

    SearchService.startBackgroundSandIndex\(String indexLocation, String jobs\)
    :   Creates a background index for the social analytics service in the specified location. This command must only be run against an index that already has content indexed from the HCL Connections applications and the ECM service.

        This command takes the following arguments:

        indexLocation
        :   A string value that specifies the location where you want to create the background index.

        jobs
        :   A string value that specifies the names of the social analytics post-processing indexers that examine, index, and produce new output based on the data in the index. The following values are valid: evidence, graph, manageremployees, tags, taggedby, and communitymembership. Use a comma to separate multiple values.

        For example:

        ```
        SearchService.startBackgroundSandIndex("/bkg2/index/","communitymembership,graph")
        ```


**Parent topic:**[Administering the social analytics service](../admin/c_admin_search_sand_indexing_tasks.md)

**Related information**  


[Creating a background index](../admin/t_admin_search_create_standalone_index.md)

[SearchService commands](../admin/r_admin_searchservice_commands.md)

