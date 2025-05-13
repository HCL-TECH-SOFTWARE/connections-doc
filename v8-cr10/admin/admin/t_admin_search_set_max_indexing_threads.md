# Configuring the number of indexing threads {#t_admin_search_set_max_indexing_threads .task}

Edit settings in the search-config.xml file to specify the maximum number of threads used when indexing.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

By default, the maximum number of threads allowed when indexing is 1, however you can change this value by modifying the search-config.xml file. When you change the maximum number of indexing threads, you might also need to adjust the thread settings for the SearchIndexingWorkManager on each node. The Search application will use whichever setting is lower. For more information about updating Search work managers, see *Updating Search work manager settings*.

1.  To update the maximum number of threads that can be used when indexing, complete the following steps.
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

5.  Enter the following command:

    SearchCellConfig.setMaxIndexerThreads\(String maxThreadNumber\)
    :   Specifies the maximum number of indexer threads that can be used when indexing. By default, the value is set to 1.

        This command takes a single argument that specifies the number of threads allowed.

        For example:

        ```
        SearchCellConfig.setMaxIndexerThreads("3")
        ```

6.  Check in the updated search-config.xml configuration file using the following wsadmin client command:

    SearchCellConfig.checkInConfig\(\)

7.  To exit the wsadmin client, type exit at the prompt.

8.  Stop the server or servers hosting the Search application, and then restart the Search servers.

    The next time the scheduled task runs, persisted seedlists are retained after indexing finishes.


**Parent topic:**[Managing the Search index](../admin/c_admin_search_manage_index.md)

**Related information**  


[Configuring the number of crawling threads](../admin/t_admin_search_set_max_crawling_threads.md)

[Updating Search work manager settings](../admin/t_admin_search_update_work_managers.md)

[The indexing process](../admin/c_admin_search_index_process.md)

