# Tuning social analytics indexing {#t_admin_search_tune_sand_indexing .task}

Use a SearchCellConfig command to configure the number of iterations used by the different jobs involved in the social analytics indexing process.

When using administrative commands, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

The social analytics indexing process includes a number of jobs. The work for these jobs is divided up based on iterations. To improve performance, you can configure the number of iterations specified for a particular job based on the needs of your deployment. For example, reducing the number of iterations results in faster performance but is more memory-intensive.

For more information about the social analytics indexing jobs, see *Adding scheduled tasks for the social analytics service*.

1.  To tune the social analytics indexing process, complete the following steps.
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

4.  Check out the Search cell-level configuration file, search-config.xml, with the following command:

    SearchCellConfig.checkOutConfig\("working\_dir", "cellName"\)

    Where:

    -   working\_dir is the temporary directory to which you want to check out the cell level configuration file. This directory must exist on the server where you are running the wsadmin client. Use forward slashes to separate directories in the file path, even if you are using the Microsoft Windows operating system.

        **Note:** Linux only: The directory must grant write permissions or the command does not run successfully.

    -   cellName is the name of the cell that the Search node belongs to. The command is case-sensitive. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor:

        print AdminControl.getCell\(\)

    For example:

    ```
    SearchCellConfig.checkOutConfig("c:/search_temp", "SearchServerNode01Cell")
    ```

5.  Use the following command:

    SearchCellConfig.setSandIndexerTuning\(String indexer, Int iterations\)
    :   Sets the number of iterations used by a specified social analytics job.

        This command takes the following arguments:

        -   indexer. A string that specifies the name of the social analytics indexing job. The following values are valid: evidence, graph, manageremployees, and tags.
        -   iterations. An integer that specifies the number of iterations for the specified social analytics indexing job.
        For example:

        ```
        SearchCellConfig.setSandIndexerTuning("manageremployees",200)
        SearchCellConfig.setSandIndexerTuning("graph",400)
        ```

6.  Check in the updated search-config.xml configuration file using the following wsadmin client command:

    SearchCellConfig.checkInConfig\(\)

7.  To exit the wsadmin client, type exit at the prompt.

8.  Stop the server or servers hosting the Search application, and then restart the Search servers.

    The next time the scheduled task runs, persisted seedlists are retained after indexing finishes.


**Parent topic:**[Administering the social analytics service](../admin/c_admin_search_sand_indexing_tasks.md)

**Related information**  


[Adding scheduled tasks for the social analytics service](../admin/t_admin_search_configure_sand_index_tasks.md)

