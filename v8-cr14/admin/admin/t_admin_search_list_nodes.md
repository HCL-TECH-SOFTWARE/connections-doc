# Listing indexing nodes {#t_admin_search_list_nodes .task}

Use the SearchService.listIndexingNodes command when you need to check the names of the Search indexing nodes in your deployment. For example, if you want to remove an indexing node from the index management table, you can use this command to verify the name of the node that you want to remove.

To use SearchService administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

1.  To list the indexing nodes for Search, complete the following steps.
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

4.  Run the following command:

    SearchService.listIndexingNodes\(\)
    :   Returns a list of the Search indexing nodes in your deployment.

        This command does not take any arguments.

        When the command runs successfully, the names of the Search indexing nodes are printed to the wsadmin console along with information about each node. The output includes a version timestamp and information that indicates whether the node is an indexing node or a non-indexing node, whether the index on the server is more than 30 days old, and whether the index on the server is synchronized with the latest index in the cluster.

        For example:

        ```
        Indexing Node Id: dubxpcvm084-0Node02:server1, Last Crawl Version: 
           1,340,285,460,074, Indexer: true, Out of Date: false, Out of Sync: false
        
        ```


**Parent topic:**[Managing the Search index](../admin/c_admin_search_manage_index.md)

**Related information**  


[Removing a node from the index management table](../admin/t_admin_search_remove_node.md)

