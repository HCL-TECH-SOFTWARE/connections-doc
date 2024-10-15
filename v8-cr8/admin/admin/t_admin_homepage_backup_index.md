# Backing up the Search index manually {#t_admin_homepage_backup_index .task}

The Search index can be backed up and restored at a later date in the event of loss or corruption of data.

1.  To back up the Search index manually, complete the following steps.
2.  Disable any regular indexing tasks that you have configured.

    To disable all tasks, enter the following command:

    ```
    SearchService.disableAllTasks()
    ```

3.  Verify that indexing is not ongoing.

    For more information, see *Verifying that index building is not taking place*.

4.  Copy the entire index directory and its subdirectories to a secure backup location.

5.  When backing up the Search index, consider performing a full backup of the HOMEPAGE database.

    Note that the Search index has a dependency on data in the HOMEPAGE database.

6.  Re-enable your indexing task or tasks by performing one of the following steps:

    -   If you had no tasks that were disabled before you completed step 1, then run the SearchService.enableAllTasks\(\) command.
    -   If you had specific tasks that were disabled before you completed step 1, then use the SearchService.enableTask\(String taskname\) command to enable those tasks.

        For example:

        ```
        SearchService.enableTask("mine")
        ```

    The next indexing task to run resumes indexing at the point at which the restored index was last successfully indexed.

7.  Re-enable your indexing task or tasks, run the following command: SearchService.enableTask\(String taskname\)

    For example:

    ```
    SearchService.enableTask("mine")
    ```

    The next indexing task to run resumes indexing at the point at which the restored index was last successfully indexed.


**Parent topic:**[Backing up the Search index](../admin/c_admin_search_backup_index.md)

**Related information**  


[Backing up the Search index using wsadmin commands](../admin/t_admin_search_backup_index.md)

[Enabling and disabling scheduled tasks](../admin/t_admin_search_enable_indexing_task.md)

[Verifying that index building is not taking place](../admin/t_admin_search_verify_no_index_building.md)

