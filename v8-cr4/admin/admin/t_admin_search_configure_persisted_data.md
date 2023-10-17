# Configuring page persistence settings {#t_admin_search_configure_persisted_data .task}

Edit settings to specify whether the persisted pages in a seedlist persistence directory are deleted after a successful incremental index. You can also update the maximum age for persisted pages.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

By default, the pages saved in a seedlist persistence directory are deleted after a successful incremental index. To speed up the indexing process when you have a large data set, you can also configure seedlist persistence settings so that pages over a specified age are not included when building an index or resuming a crawl.

1.  To configure page persistence settings, complete the following steps.
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

5.  Use the following commands:

    SearchCellConfig.setDeletePersistedPages\(String enabled\)
    :   Specifies whether to delete the persisted pages after a successful incremental index. By default, the value is set to true.

        This command takes a single argument:

        enabled
        :   A string that determines whether persisted pages are to be deleted after a successful incremental index. This string represents a boolean, that is, it should be set to true or false.

        When this functionality is enabled, persisted pages from the initial index creation are also deleted after a successful incremental index.

        For example:

        ```
        SearchCellConfig.setDeletePersistedPages("false")
        ```

    SearchCellConfig.setMaxPagePersistenceAge\(String maxAgeInHours\)
    :   Specifies the maximum age for persisted pages in a seedlist persistence directory. By default, the value is set to 720 hours \(30 days\).

        If the pages are older than the maximum age, they are ignored when building an index or resuming a crawl.

        This command takes a single argument:

        maxAgeInHours
        :   A string representing an integer that specifies the maximum age in hours of the persisted pages.

        For example:

        ```
        SearchCellConfig.setMaxPagePersistenceAge("42")
        ```

6.  Check in the updated search-config.xml configuration file using the following wsadmin client command:

    SearchCellConfig.checkInConfig\(\)

7.  To exit the wsadmin client, type exit at the prompt.

8.  Stop the server or servers hosting the Search application, and then restart the Search servers.

    The next time the scheduled task runs, persisted seedlists are retained after indexing finishes.


**Parent topic:**[Managing the Search application](../admin/c_admin_manage_search.md)

**Related information**  


[Deleting persisted seedlist data](../admin/t_admin_search_delete_persisted_data.md)

[The indexing process](../admin/c_admin_search_index_process.md)

[Search error messages](../troubleshoot/r_error_codes_search.md)

