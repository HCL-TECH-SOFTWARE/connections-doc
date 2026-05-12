# Maintaining application databases {#t_admin_db_maintain .task}

Each HCL Connections application stores data in a database, and some also store data on a file system. You must back up these databases and file systems on a regular schedule using the methods documented by the vendor from whom you purchased the database and file system that you are using.

If you use IBM® DB2® databases, HCL Connections provides a few SQL scripts to help you perform maintenance tasks on them, such as collecting statistics and compacting. You can collect statistics while HCL Connections is running; there is no need to stop the applications nor bring the databases offline. However, you must stop all applications that access the databases before compacting and defragment them.

**Note:** When you restore data for an application that is also available from the Communities application, you must also restore the data in the Communities application to keep the two in sync. See Recovering from a database failure for more details.

-   **[Gathering DB2 database statistics daily](../admin/t_admin_db_maintain_stats.md)**  
Use the scripts that are provided with HCL Connections to gather statistics about DB2 database usage.
-   **[Improving access performance and defragmenting DB2 database data](../admin/t_admin_db_maintain_compact.md)**  
Use the scripts that are provided with HCL Connections to improve access performance and to reclaim fragmented space in an application database.

**Parent topic:**[System maintenance](../admin/c_admin_common_maintaining.md)

**Related information**  


[Backing up Files data](../admin/t_admin_files_backup.md)

[Backing up Wikis data](../admin/t_admin_wikis_backup.md)

[Backing up Connections](../migrate/t_back-up.md)

[Restoring Activities data](../admin/t_admin_act_restore_data.md)

[Recovering from a database failure](../admin/c_admin_communities_backup_and_restore.md)

[Restoring a Community Blog after a Communities database failure](../admin/c_admin_blogs_restoring_community_blog.md)

