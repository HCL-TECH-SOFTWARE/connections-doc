# Creating Search indexes {#c_admin_search_create_indexes .concept}

Search indexing is automatically configured for HCL Connections during installation.

To create the initial Search index after installing the product, wait for one of the default indexing tasks to run and this will automatically create the index. The next step is for the Search application to copy the index to all the nodes. The index is first saved to a staging folder, and then it is copied from the staging folder to all the secondary nodes in the deployment. You must not stop your deployment until the index has been copied to all the nodes. If the server is stopped during this process, the index will not be successfully rolled out to all the nodes.

To create subsequent indexes, for example, if the index has become corrupt or unusable, delete any existing indexes, and then either wait for the next scheduled indexing task to run or run a one-off indexing task. Alternatively, if the index is still functional, to avoid disrupting your users’ access to Search functionality, you can recreate the Search index by running a wsadmin command to create a background index.

Refer to the following topics for more information:

-   **[Creating the initial Search index](../admin/t_admin_search_create_initial_index_admin.md)**  
When you install HCL Connections, Search indexing is automatically configured. To create the initial Search index, all you need to do is wait for one of the default indexing tasks to run.
-   **[Recreating the Search index](../admin/t_admin_search_create_index.md)**  
If your Search index is corrupt and cannot be used, you can recreate it by first deleting any existing indexes, and then either waiting for the next scheduled indexing task to run or running a one-off indexing task.
-   **[Reindexing a component in an existing index](../admin/t_admin_search_reindex_component_index.md)**  
Reindex data in an HCL Connections component.
-   **[Creating background indexes](../admin/c_admin_search_create_bgd_index.md)**  
By creating a background index, you can remove inconsistencies from your Search index without the need for downtime while the index is rebuilt. Background indexing involves three phases: crawling, file content extraction, and index creation.

**Parent topic:**[Managing the Search index](../admin/c_admin_search_manage_index.md)

**Related information**  


[Reindexing content](../admin/t_admin_search_reindex_content.md)

[Deleting the index](../admin/t_admin_search_delete_index.md)

[Search default scheduled tasks](../admin/r_admin_search_default_indexing_tasks.md)

[Changing the location of the Search index](../admin/t_admin_homepage_change_index_location.md)

