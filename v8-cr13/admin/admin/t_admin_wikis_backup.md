# Backing up Wikis data {#backingupdata .task}

Back up the data in your wikis.

To run administrative commands, you must use the wsadmin client. For more information, see [Starting the wsadmin client](t_admin_wsadmin_starting.md).

Wikis stores data in a database and on the file system. Metadata is stored in the database and binary files are stored in a data directory on the file system. You specified this directory during the installation of HCL Connections. You can find the path to the directory in the file.storage.rootDirectory element of the `wikis-config.xml` file. The file.storage.rootDirectory element contains either the path itself or a WebSphere® Application Server variable whose value is the path.

This storage architecture means you must maintain consistency between the database and file system during backups. The simplest way to maintain consistency is to run offline backups by making the application inaccessible and then backing up both locations. During an online backup, users can continue to add and delete content.

You must back up the database before you back up the files on the file system because the database enforces transactional integrity. If you back up the file system first, files that are added after the file system backup starts but before the database backup completes will be missing from the file system on restoration. Backing up the database first ensures that you capture any new files that are added during the backup process.

File data is stored in subdirectories under the storage\_root\_directory/files/files directory. Each file is stored in a subdirectory whose name is generated from a UUID. Part of the UUID is used to create a directory with a number 0 - 127. Another part of the UUID is used to create a subdirectory with another number 0 - 127. The UUID itself is in that directory. For example:

```
storage_root_directory/files/18/113/<file_UUID>
```

Files are written one time only so that their identities are obvious if a file is missing during a restore.

You must prevent any file-deletion tasks from running during an online backup. When a user deletes a file, the file is removed from the user interface and added to a queue of files to be deleted from the file system. This deletion task runs regularly to delete the first item from the queue. You can increase the time that files can remain in the queue before they are deleted. Increase this time by adjusting the value in the scheduledTasks.FileActuallyDelete.args.softDeleteMinimumPendingTimeInMins property in the `wikis-config.xml` file. Increasing this time interval can give you enough time to run incremental backups to ensure that your archive is complete.

For information about editing the `wikis-config.xml` file, see *Changing configuration property values*. For information about the scheduledTasks.FileActuallyDelete.args.softDeleteMinimumPendingTimeInMins property, see *Wikis configuration properties*.

To back up Wikis data, complete the following steps:

1.  Start the wsadmin client.

2.  Start the Wikis Jython script interpreter using the following command:

    ```
    execfile("wikisAdmin.py")
    ```

3.  Stop the task that deletes files from the queue with the following command:

    ```
    WikisScheduler.pauseSchedulingTask("FileActuallyDelete")
    ```

4.  Back up the database according to your database documentation.

5.  Back up the file system in whatever way makes sense in your environment. For small deployments, you can archive the system. For large deployments, use a tool like IBM Tivoli® Storage Manager.

6.  Start the task that deletes files from the queue with the following command:

    ```
    WikisScheduler.resumeSchedulingTask("FileActuallyDelete")
    ```


You can run a task that checks for inconsistencies between the database and the file system. Before you restore data, use a test environment to compare database and file system images. For more information, see *Checking Wikis data integrity*.

-   **[Checking Wikis data integrity](../admin/t_admin_wikis_data_integrity.md)**  
The appropriate way to restore backed-up Wikis data is to restore versions of file system data and database data that match.
-   **[Synchronizing Wikis data with Communities data](../admin/c_admin_wikis_backup_communities.md)**  
Use the WikisLibraryService.exportSyncedResourceInfo command to return a report of all of the communities that Wikis interacts with. The information in this report can help you to synchronize Wikis data with the Communities database after a system crash that includes data loss.

**Parent topic:**[Administering Wikis](../admin/c_admin_wikis_overview.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Wikis administrative commands](../admin/r_admin_wikis_commands.md)

[Maintaining application databases](../admin/t_admin_db_maintain.md)

[Wikis configuration properties](../admin/r_admin_wikis_config_properties2.md)

[Changing Wikis configuration property values](../admin/t_admin_wikis_changing_config_properties.md)

