# Restoring a Search index in a single-node environment {#t_admin_search_restore_index_single_node .task}

In the event of data loss or corruption, you can use a backup copy of the Search index to restore the index. Use the following procedure to restore the Search index in a single node environment.

For information about how to create a backup copy of the Search index, see *Backing up the Search index*.

**Note:** HCL Connections applications maintain delete and access-control update information for a maximum of 30 days. Indexes that are more than 30 days old are not considered suitable for restoration because they might contain obsolete or orphan content.

You can also follow the procedure described here when you want to restore the index in an environment with multiple nodes if it is not an issue that all the nodes are unavailable while the index is being restored. For information about restoring the index in a multi-node environment, see *Restoring a Search index in an environment with multiple nodes*.

1.  To restore a Search index in a single-node environment, complete the following steps:
2.  Disable any regular indexing tasks that you have configured.

    1.  To list the indexing tasks, enter the following command:

        SearchService.listIndexingTasks\(\)

    2.  To disable tasks, enter the following command:

        SearchService.disableAllTasks\(\)

        For example:

        ```
        SearchService.disableAllTasks()
        ```

        There is only one indexing task by default.

3.  To prepare the HOMEPAGE database to successfully load the restored index, enter the following command:

    SearchService.notifyRestore\(Boolean isNewIndex\)

    where the isNewIndex parameter specifies whether all entries are removed from the database table that is used by the file content extraction process to track the status of individual files. Set the parameter to false when you are restoring an index backup.

    For example:

    ```
    SearchService.notifyRestore("false")
    ```

    For more information about this command, see *Backing up the Search index using wsadmin commands*.

4.  Stop the Search server.

5.  Delete the contents of the index directory and all its subdirectories from the HCL Connections Search data directory.

6.  Copy the backup index and all its subdirectories into the Search directory.

7.  Restart the Search server.

8.  Re-enable your indexing task or tasks using the SearchService.enableAllTasks\(\) command.

    For example:

    ```
    SearchService.enableAllTasks()
    ```

    **Note:** If you don't want to enable all tasks \(for example, if some tasks were disabled before you started these steps and you want to keep them disabled\), use the SearchService.enableTask\(String taskName\) command instead to enable one task at a time.

    The next indexing task to run resumes indexing at the point at which the restored index was last successfully indexed.

9.  Re-enable your indexing task or tasks using the SearchService.enableTask\(String taskName\) command.

    The next indexing task to run resumes indexing at the point at which the restored index was last successfully indexed.


**Parent topic:**[Restoring the Search index](../admin/c_admin_search_restore_index.md)

**Related information**  


[Backing up the Search index](../admin/c_admin_search_backup_index.md)

[Enabling and disabling scheduled tasks](../admin/t_admin_search_enable_indexing_task.md)

[Listing scheduled tasks](../admin/t_admin_search_retrieve_index_tasks.md)

[Backing up the Search index using wsadmin commands](../admin/t_admin_search_backup_index.md)

