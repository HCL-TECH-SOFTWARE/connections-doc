# Making search-related configuration changes to newly added nodes {#t_admin_search_add_search_node .task}

You can add another Search node to a cluster where there is an existing Search node for load-balancing purposes or if you want to have a backup node for redundancy.

IBM® WebSphere® Application Server Network Deployment \(Application Server option\) must be installed on the new node. Follow the steps to add a node to a cluster. For more information, see *Adding a node to a cluster*.

1.  Using the WebSphere Application Server Integrated Solutions Console, stop the Search application on all nodes.

2.  Copy the search index directory from one of the existing Search nodes to the new node. The Search index directory is defined by the IBM WebSphere Application Server variable SEARCH\_INDEX\_DIR.

3.  Copy Search conversion tools to local nodes and configure the path variables to point to the Search application. For more information, see *Copying Search conversion tools to local nodes*.

4.  Create Search work managers for the newly added node. For more information, see *Creating work managers for Search*.

5.  Restart all the nodes that are running Search.


**Parent topic:**[Managing the Search application](../admin/c_admin_manage_search.md)

**Related information**  


[Backing up the Search index](../admin/c_admin_search_backup_index.md)

[Configuring IBM HTTP Server](../install/c_add_ihs_over.md)

[Defining IBM HTTP Server](../install/t_create_webserver1_node.md)

[Reviewing the JVM heap size](../install/t_increase_jvm_heap.md)

[Adding a node to a cluster](../install/t_adding_nodes_to_cluster.md)

