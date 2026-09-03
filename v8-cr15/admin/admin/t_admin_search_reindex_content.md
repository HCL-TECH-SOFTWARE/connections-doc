# Reindexing content {#t_admin_search_reindex_content .task}

Use the retryIndexing command when you want to reindex content that was not indexed successfully during initial or incremental indexing.

To run administrative commands, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

If a failure occurs when you are trying to index content from the HCL Connections applications, you can use the retryIndexing command to try to index that content again. You can tell if a failure has occurred during content indexing when you do not see the expected search results being returned, or when you see incorrect search results being returned. For example, you might have updated a document but an older version of that document is returned by a search.

1.  To reindex content that failed to be indexed previously, complete the following steps.
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

4.  Use the following command.

    SearchService.retryIndexing\(String service, String id\)
    :   Attempts to index an item of content that was not indexed successfully during initial or incremental indexing.

        **Note:** retryIndexing does not work for ecm\_files.

        This command takes two parameters:

        service
        :   The application from which the content originated.

        id
        :   The Atom ID of the content. For information about how to retrieve the Atom ID for the content, refer to the HCL Connections API documentation on the [IBM Social Business Development Wiki](http://www-10.lotus.com/ldd/appdevwiki.nsf).

        For example:

        ```
        SearchService.retryIndexing('activities', 'b63cabf8-0533-45cf-9636-d63cd6a6f3ca')
        ```

        If the command is successful, 1 is printed to the console. If the command fails, 0 is printed to the console.


**Parent topic:**[Managing the Search index](../admin/c_admin_search_manage_index.md)

**Related information**  


[Creating Search indexes](../admin/c_admin_search_create_indexes.md)

