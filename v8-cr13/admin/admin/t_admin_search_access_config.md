# Accessing the Search configuration environment {#t_admin_search_access_config .task}

You need to initialize the Search configuration environment to be able to run the SearchCellConfig and SearchService MBean commands.

See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

Two types of command are provided for administering the Search application:

- **SearchCellConfig**

    An MBean used to check out, update, and check in copies of the Search configuration file, search-config.xml. This file is used to control many aspects of Search configuration, such as:

    -   The location of the Search index
    -   The location of the IBM® LanguageWare® dictionaries used by Search
    -   The configuration of the file download and conversion service used by Search when indexing file attachments

    The SearchCellConfig MBean also provides the user with a means of checking out and checking in the Search Ajax proxy configuration file, proxy-search-config.xml.

    For more information about the syntax of the SearchCellConfig commands and a description of what each command does, see *SearchCellConfig commands*.

- **SearchService**

    An MBean used to create, retrieve, update, and delete scheduled task definitions of the following Search operations. This includes a facility to trigger one of these operations.

    -   Indexing
    -   Indexing optimization

    This is implemented by scheduling a one-off task that is scheduled to run within 30 seconds of issuing the corresponding SearchService command.

    For more information about the syntax of the SearchService commands and a description of what each command does, see *SearchService commands*.


To initialize the Search configuration environment, complete the following steps.

1.  Start the wsadmin client from one of the following directories on the system on which you installed the Deployment Manager:

    Linux: `[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin`

    Windows: `[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/bin`

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

2.  After the wsadmin command environment has initialized, enter the following command to initialize the Search environment and start the Search script interpreter:

    ```
    execfile("searchAdmin.py")
    ```

    If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    When the command is run successfully, the following message displays:

    ```
    Search Administration initialized
    ```


**Parent topic:**[Administering Search](../admin/c_admin_search.md)

**Related information**  


[SearchCellConfig commands](../admin/r_admin_searchcellconfig_commands.md)

[SearchService commands](../admin/r_admin_searchservice_commands.md)

