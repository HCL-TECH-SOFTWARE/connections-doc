# Restoring a Search index in an environment with multiple nodes {#t_admin_search_restore_index_multi_node .task}

Complete the following procedure when you want to restore a Search index in a multi-node environment where restarting individual Search nodes is acceptable. Some Search nodes are unavailable during the procedure but other nodes in the cluster are still available to handle incoming requests.

For information about how to create a backup copy of the Search index, see *Backing up the Search index*.

**Note:** HCL Connections applications maintain delete and access-control update information for a maximum of 30 days. Indexes that are more than 30 days old are not considered suitable for restoration because they might contain obsolete or orphan content.

When you create a backup copy of the Search index, you can use this copy to restore the index in the event of loss or corruption. You must restore the backup consistently for all the nodes in your deployment.

Follow this procedure to restore a Search index if your environment has multiple Search nodes in the cluster. If your environment has multiple nodes but the Search application is only deployed on one of those nodes, refer to the topic, *Restoring a Search index in a single-node environment*.

1.  Disable any regular indexing tasks that you have configured.

    1.  To list the indexing tasks, enter the following command:

        SearchService.listIndexingTasks\(\)

    2.  To disable tasks, enter the following command:

        SearchService.disableAllTasks\(\)

        For example:

        ```
        SearchService.disableAllTasks()
        ```

        There is only one indexing task by default.

2.  To prepare the HOMEPAGE database to successfully load restored indexes on each node, enter the following command:

    SearchService.notifyRestore\(Boolean isNewIndex\)

    where the isNewIndex parameter specifies whether all entries are removed from the database table that is used by the file content extraction process to track the status of individual files. Set the parameter to false when you are restoring an index backup.

    For example:

    ```
    SearchService.notifyRestore("false")
    ```

    For more information about this command, see *Backing up the Search index using wsadmin commands*.

3.  Stop the first Search node in your deployment.

4.  Delete the contents of the index directory and all its subdirectories from the HCL Connections Search data directory.

5.  Copy the backup index and all its subdirectories into the Search directory.

6.  Restart the Search node.

7.  Stop each remaining Search node in the cluster in turn and repeat steps 4-6 for that node.

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

