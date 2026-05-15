# Restoring the Search index {#c_admin_search_restore_index .concept}

When you create a backup copy of the Search index, you can use the copy to restore the index in the event of loss or corruption.

The process for restoring the Search index differs depending on the number of nodes in your deployment. In an environment with multiple nodes, you must restore the backup consistently for all the nodes.

Refer to the following topics for more information:

-   **[Restoring a Search index in a single-node environment](../admin/t_admin_search_restore_index_single_node.md)**  
In the event of data loss or corruption, you can use a backup copy of the Search index to restore the index. Use the following procedure to restore the Search index in a single node environment.
-   **[Restoring a Search index in an environment with multiple nodes](../admin/t_admin_search_restore_index_multi_node.md)**  
Complete the following procedure when you want to restore a Search index in a multi-node environment where restarting individual Search nodes is acceptable. Some Search nodes are unavailable during the procedure but other nodes in the cluster are still available to handle incoming requests.
-   **[Restoring a Search index without restarting individual nodes](../admin/t_admin_search_restore_index_wo_restarting.md)**  
Complete the following procedure when you want to restore a Search index in a multi-node environment where restarting individual Search nodes must be avoided.

**Parent topic:** [Backup and restore](../admin/c_admin_search_backup_and_restore.md)

**Related information**  


[Verifying Search index creation](../admin/t_admin_search_verify_index_creation.md)

[Creating a background index](../admin/t_admin_search_create_standalone_index.md)

[Backing up the Search index](../admin/c_admin_search_backup_index.md)

[Managing the Search index](../admin/c_admin_search_manage_index.md)

