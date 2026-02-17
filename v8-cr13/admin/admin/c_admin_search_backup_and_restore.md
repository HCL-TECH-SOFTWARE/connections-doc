# Backup and restore {#c_admin_search_backup_and_restore .concept}

Create a backup of the Search index and save it to a secure location so that it can be used to restore the index in the event of loss or corruption.

!!! note 
    
    When backing up and restoring data, refer to the product documentation for the database and file system that you are using.

When indexing tasks are scheduled, it can be difficult to find a suitable time for backing up the Search index. Instead of creating an index backup manually, you can use the IBM® WebSphere® Application Server scheduler framework to create backup tasks that automatically block indexing tasks from starting and create suitable slots in the scheduled list of tasks for creating index backups. By leveraging the existing scheduler framework, you can implement a consistent method for scheduling and administering the Search application.

The scheduler framework guarantees that a single backup task runs in a clustered environment. In the event of a previous backup task being interrupted, the current backup task removes any leftover artifacts from the failed backup task.

!!! note 

    -   The backup task overwrites existing backups when configured to do so, but it does not perform any further index-backup management. Administrators must ensure that issues such as disk space are managed independently of the backup process. For example, you must ensure that redundant or unwanted backups are purged from storage as needed.
    -   HCL Connections applications maintain delete and access-control update information for a maximum of 30 days. Indexes that are more than 30 days old are not suitable for restoration because they might contain obsolete or orphan content. An index over 30 days old that is restored cannot be made up-to-date by update indexing.
    -   Backup locations are set using WebSphere Application Server environment variables and must be set to a network file storage location. Because backup tasks can be run on any server in a clustered environment, locally-stored backups might interfere with other backup settings, for example, by causing confusion as to which is the latest backup. The user ID that is used for running WebSphere Application Server must have write and delete permissions to the network share.
    -   Servers running search.ear that can run backup tasks should have disk storage that is twice the size of the index directory available for internal operations on the index when performing backups.
    -   When restoring a backup, you must update the management table in the database with the new resume points for the Search crawlers. A backup of the resume points is stored at all times in the Lucene index as Lucene Documents. The notifyRestore administrative task allows you to update the management table with the resume points specified in the Lucene index. All future crawls then start from the specified point. The cache is also purged by the notifyRestore task.
    -   Valid backups have an `IndexBackupInformation.txt` file created in the backup location.

The following topics provide information about backing up and restoring the Search index:

-   **[Configuring index backup settings](../admin/t_admin_search_configure_backup_settings.md)**  
Use SearchCellConfig commands to define index backup settings in the search-config.xml file.
-   **[Backing up the Search index](../admin/c_admin_search_backup_index.md)**  
You can back up the Search index using SearchService commands or you can manually copy the index files to a backup location.
-   **[Restoring the Search index](../admin/c_admin_search_restore_index.md)**  
When you create a backup copy of the Search index, you can use the copy to restore the index in the event of loss or corruption.

**Parent topic:** [Managing the Search index](../admin/c_admin_search_manage_index.md)

