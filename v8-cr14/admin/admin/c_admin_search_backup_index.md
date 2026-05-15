# Backing up the Search index {#c_admin_search_backup_index .concept}

You can back up the Search index using SearchService commands or you can manually copy the index files to a backup location.

Note that the Search index has a dependency on the HOMEPAGE database. The Search index can be backed up and restored independently of the HOMEPAGE database as long as the HOMEPAGE database remains current. However, if the database is restored, a corresponding Search index backup must be restored with it.

Refer to the following topics for information about backing up the Search index:

-   **[Backing up the Search index using wsadmin commands](../admin/t_admin_search_backup_index.md)**  
Use SearchService administrative commands to define scheduled backup tasks for the Search index.
-   **[Backing up the Search index manually](../admin/t_admin_homepage_backup_index.md)**  
The Search index can be backed up and restored at a later date in the event of loss or corruption of data.

**Parent topic:** [Backup and restore](../admin/c_admin_search_backup_and_restore.md)

**Related information**  


[Restoring a Search index in a single-node environment](../admin/t_admin_search_restore_index_single_node.md)

[Restoring a Search index in an environment with multiple nodes](../admin/t_admin_search_restore_index_multi_node.md)

[Restoring a Search index without restarting individual nodes](../admin/t_admin_search_restore_index_wo_restarting.md)

[Restoring the Search index](../admin/c_admin_search_restore_index.md)

