# Backing up the Search index using wsadmin commands {#t_admin_search_backup_index .task}

Use SearchService administrative commands to define scheduled backup tasks for the Search index.

To use SearchService administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

**Note:** Backups are written to the location specified in the IBM® WebSphere® Application Server environment variable, SEARCH\_INDEX\_BACKUP\_DIR. When backing up the index, ensure that multiple nodes are not sharing the same backup location.

1.  To back up the Search index, complete the following tasks.
2.  Start the wsadmin client from one of the following directories on the system on which you installed the Deployment Manager:

    Linux: `[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin`

    Windows: `[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/bin`

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  After the wsadmin command environment has initialized, enter the following command to initialize the Search environment and start the Search script interpreter:

    ```
    execfile("searchAdmin.py")
    ```

    If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    When the command is run successfully, the following message displays:

    ```
    Search Administration initialized
    ```

4.  Use the following commands.

    SearchService.addBackupIndexTask\(String taskName, String schedule, String startbySchedule\)
    :   Defines a new scheduled index backup task.

        This command takes the following arguments:

        -   taskName. The name of the task to be added.
        -   schedule. The time at which the scheduled task starts. This argument is a string value that must be specified in Cron format.
        -   startbySchedule. The time given for the task to run before it is automatically canceled. This argument is a string value that must be specified in Cron format.
        For example:

        ```
        SearchService.addBackupIndexTask("WeeklyIndexBackup",
           "0 0 2 ? * SAT","0 10 2 ? * SAT")
        ```

        When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

    SearchService.backupIndexNow\(\)
    :   Backs up the index to the location specified by the IBM WebSphere Application Server variable, SEARCH\_INDEX\_BACKUP\_DIR. There might be a delay before the backup occurs if there are indexing tasks in progress.

        This command does not take any arguments.

        After backing up the Search index using wsadmin commands, consider performing a full backup of the HOMEPAGE database. Note that the Search index has a dependency on data in the HOMEPAGE database.

    SearchService.deleteTask\(String taskName\)
    :   Deletes the specified backup task.

        This command takes a single argument:

        -   taskName. The name of the task to be deleted.
        For example:

        ```
        SearchService.deleteTask("NightlyBackupTask")
        ```

    SearchService.notifyRestore\(Boolean isNewIndex\)
    :   Brings the database to a consistent state so that crawlers start from the point at which the backup was made.

        The notifyRestore command updates index management tables in the HOMEPAGE database so that crawling resume points are reloaded from a restored index, thereby ensuring that all future crawls start from the correct point. The command also purges cached content in the HOMEPAGE database.

        The notifyRestore command optionally removes all entries from the HOMEPAGE database table that tracks the status of individual files as part of the content extraction process. This table is used by the Search application when indexing the content of file attachments.

        This command takes a single parameter:

        -   isNewIndex: If set to true, all entries are removed from the database table that is used by the file content extraction process to track the status of individual files.

            Set this parameter to true when you are restoring a newly-built index. Set the parameter to false when you are restoring an index backup.

        For example:

        ```
        SearchService.notifyRestore("true")
        ```


**Parent topic:**[Backing up the Search index](../admin/c_admin_search_backup_index.md)

**Related information**  


[Backing up the Search index manually](../admin/t_admin_homepage_backup_index.md)

[Changing WebSphere Application Server environment variables](../admin/t_admin_common_change_was_env_variable.md)

