# Backing up Files data {#backingupdata .task}

Files stores data in both the database and a file system. This adds some complication in keeping the application available to users while backing up data.

To use administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

Files stores a large amount of data. If it were only stored in the database, maintenance and backups would be complex and costly. To prevent this, Files stores file metadata in the database, and stores the bulk of file data in binary files in a directory on a file system. You specify the directory during HCL Connections installation, and you can find it at any time in the `files-config.xml` properties file, in the file.storage.rootDirectory element.

The file.storage.rootDirectory element will contain either the path itself, or a WebSphere® Application Server variable whose value is the path. If it contains a variable, you can find the path by opening the WebSphere Application Server console, clicking **Environment** \> **WebSphere Variables**, and finding the variable. For example, if the element's value is $\{FILES\_CONTENT\_DIR\}, find FILES\_CONTENT\_DIR in the console to find the path. See the topic *Changing configuration property values* for information on opening the `files-config.xml` file.

File data is actually stored in unique directories below a storage\_root\_directory/files directory. Each file's data is stored in a sub-directory below /files, generated from the file's randomly generated UUID. Part of the UUID is used to create a directory with a number between 0 and 127. Another part is used to create another directory below that, with another number between 0 and 127, and the UUID itself is located in that directory. For example:

```
storage\_root\_directory/files/18/113/file\_UUID
```

Files are only written once, so their identities are clear if one is missing during a restore.

This storage architecture means you must maintain consistency between the database and file system during backups. The simplest way to maintain consistency is to perform "off-line" backups, making the application inaccessible and then backing up both locations. But often you will want to perform "on-line" backups, keeping the application accessible. During an on-line backup, users can continue to add and delete content from the application.

During on-line backups of Files, *you must back up the database before the file system*. The database enforces transactional integrity between the two locations. If you start the file system backup first, files added between the time the file system backup starts and the database backup later completes will be missing from the file system on restoration. Backing up the database first ensures that you capture all new files during backup.

You must also stop a file deletion task from running during on-line backup. When a user deletes a file it is removed from the user interface, but the application actually adds it to a queue of files that must be deleted from the file system. This task runs regularly to delete the first item from the queue. Alternatively, you can increase the time files can sit in the queue before they are deleted, by adjusting the value in the scheduledTasks.FileActuallyDelete.args.softDeleteMinimumPendingTimeInMins property in `files-config.xml`. This could give you enough time to run incremental backups and make sure your archive is never missing data. For information on editing `files-config.xml`, see the topic *Changing configuration property values*. For information on the scheduledTasks.FileActuallyDelete.args.softDeleteMinimumPendingTimeInMins property see the topic *Files configuration properties*.

1.  To perform an on-line backup of Files complete the following steps:
2.  Start the wsadmin client.

3.  Start the Files Jython script interpreter using the following command:

    ```
    execfile("filesAdmin.py")
    ```

4.  Stop the task that deletes files from the queue with the following command:

    ```
    FilesScheduler.pauseSchedulingTask("FileActuallyDelete")
    ```

5.  Back up the database according to the database documentation.

6.  Back up the file system in whatever way makes sense in your environment. For example, for small deployments you can just zip the system, or for large deployments you can use a tool like Tivoli® Storage Manager.

7.  Start the task that deletes files from the queue with the following command:

    ```
    FilesScheduler.resumeSchedulingTask("FileActuallyDelete")
    ```


You can run a task that checks for inconsistencies between the database and the file system. It might be useful to compare database and file system images in a test environment before restoring them. See the topic *Checking Files data integrity* for more information.

-   **[Checking Files data integrity](../admin/t_admin_files_data_integrity.md)**  
The appropriate way to restore backed-up Files data is to restore versions of file system data and database data that match. You can check integrity between database data \(metadata\) and file system data \(binary\) by running the FilesDataIntegrityService.checkFiles command.
-   **[Synchronizing Files data with Communities data](../admin/c_admin_files_backup_communities.md)**  
As part of recovering from a database failure you must synchronize Files data with the data of communities Files has interacted with.

**Parent topic:**[Administering Files](../admin/c_admin_files_overview.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Finding the location of a stored file](../admin/t_admin_files_find_file_location.md)

[Files administrative commands](../admin/r_admin_files_commands.md)

[Maintaining application databases](../admin/t_admin_db_maintain.md)

[Changing Files configuration property values](../admin/t_admin_files_changing_config_properties.md)

