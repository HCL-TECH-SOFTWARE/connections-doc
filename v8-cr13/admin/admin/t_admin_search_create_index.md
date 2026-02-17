# Recreating the Search index {#t_admin_search_create_index .task}

If your Search index is corrupt and cannot be used, you can recreate it by first deleting any existing indexes, and then either waiting for the next scheduled indexing task to run or running a one-off indexing task.

!!! important 
    
    When you follow the steps described in the following procedure, Search functionality is not available to your users. If you want to recreate the index without the need for Search downtime, follow the steps described in the *Creating a background index* topic instead.

During the indexing update process, documents are first written to a cache table in the HOMEPAGE database and then written to each index across the nodes. When a new index needs to be built, the database cache is skipped, and the crawling and indexing process writes directly to the index directory on the node that is performing the indexing task.

1.  Stop all the nodes that are running the Search application. If there are existing search indexes on these nodes, delete them by performing the steps described in *Deleting the index*.

2.  Start all the Search nodes in the cluster.

3.  Recreate the index by completing one of the following steps:

    -   Create a one-off task that indexes all the installed HCL Connections applications in your deployment. For more information, see *Running one-off tasks*.
    -   Wait for the next scheduled indexing task to run.
    You can tell that the index is built on the indexing node when the INDEX.READY and CRAWLING\_VERSION files are present in the index directory. The Search index directory is defined by the IBM® WebSphere® Application Server variable SEARCH\_INDEX\_DIR.

    After the index is built, the next phase is index roll-out. During this phase, the files in the index directory are automatically copied to the Search staging folder, which is defined by the WebSphere Application Server variable SEARCH\_INDEX\_SHARED\_COPY\_LOCATION. The files in the Search staging folder are then copied to each index folder on the remaining nodes.

    !!! important 
        
        Do not stop your deployment until the index has been copied to all nodes. If the server is stopped during this process, the index will not be successfully rolled out to all nodes. In this event, you need to manually copy the index from the staging location to the other nodes.


**Parent topic:**[Creating Search indexes](../admin/c_admin_search_create_indexes.md)

**Related information**  


[Running one-off tasks](../admin/t_admin_search_one_off_tasks.md)

[The indexing process](../admin/c_admin_search_index_process.md)

[WebSphere Application Server environment variables](../admin/r_admin_common_was_env_variables.md)

[Deleting the index](../admin/t_admin_search_delete_index.md)

