# Creating the initial Search index {#t_admin_search_create_index .task}

When you install HCL Connections, Search indexing is automatically configured. To create the initial Search index, all you need to do is wait for one of the default indexing tasks to run.

When you are installing a non-English language deployment, you must enable the relevant language dictionaries for your deployment before creating the initial Search index. Without multiple dictionary support, for languages other than English, Search only returns results where there is an exact match between the search term and the content term. Enabling multiple dictionaries ensures better quality search results when your user base is multilingual. For more information, see *Configuring dictionaries for Search*.

Initial index creation occurs when any scheduled indexing task fires and an index does not yet exist. As part of the initial index creation process, the index is automatically rolled out to the secondary nodes in your deployment. Each node running the Search application must have the Search index stored locally on the node's file system. Because there are multiple indexes in a clustered environment, they must all be kept in synchronization with each other.

The Search index directory is defined by the IBM® WebSphere® Application Server variable SEARCH\_INDEX\_DIR. You can change the location of the index by editing this variable. For more information, see *Changing the location of the Search index*.

After the initial index has been built and optimized, the contents of the index directory are copied to a staging folder. When the newly-built index is successfully posted, JMS messages are broadcast so that each node automatically downloads the index from the staging folder and loads it. The index management tables are populated at the same time. For Search to function properly, the initial index must have completed successfully and it must be deployed to all nodes.

!!! important 
    
    Do not stop your deployment until the index has been copied to all nodes. If the server is stopped during this process, the index will not be successfully rolled out to all nodes. In this event, you need to manually copy the index from the staging location to the other nodes.

You can change the location of the Search index staging folder by editing the WebSphere Application Server variable, SEARCH\_INDEX\_SHARED\_COPY\_LOCATION. If you do so, ensure that the staging folder is accessible to all nodes in the cluster and that the filesystem permissions on the folder are sufficient; the websphere user must have read/write permissions on this location.

**Parent topic:**[Creating Search indexes](../admin/c_admin_search_create_indexes.md)

