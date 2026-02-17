# Removing a node from the index management table {#t_admin_search_remove_node .task}

When you are removing a node from a cluster, use the SearchService.removeIndexingNode wsadmin command to remove the node from the index management table.

You must remove the node from the cluster before using the SearchService.removeIndexingNode command to remove it from the index management table. For information about how to remove nodes, see *Removing nodes from a cluster*.

To use the SearchService.removeIndexingNode command, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

You can use the removeIndexNode command to remove an entry from the SR\_INDEX\_MANAGEMENT table that is added or updated by Search servers at start-up time.

1.  To remove a node from the index management table, complete the following steps.
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

4.  Use the following command:

    SearchService.removeIndexingNode\(String nodeName\)
    :   Removes the specified node from the index management table.

        This command takes a single argument:

        -   nodeName. The name of the node to be removed. This argument is a string value that takes the following format:

            ```
            nodeName:serverName
            ```

            To retrieve a list of the indexing nodes in your deployment, run the SearchService.listIndexingNodes\(\) command. For more information, see *Listing indexing nodes*.

        For example:

        ```
        SearchService.removeIndexingNode("Node01:cluster1_server1")
        ```

        When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.


**Parent topic:**[Managing the Search index](../admin/c_admin_search_manage_index.md)

**Related information**  


[Removing nodes from a cluster](../admin/c_admin_common_remove_nodes.md)

[Listing indexing nodes](../admin/t_admin_search_list_nodes.md)

