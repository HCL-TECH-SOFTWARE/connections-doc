# Verifying that index building is not taking place {#t_admin_search_verify_no_index_building .task}

After disabling or deleting an indexing task, you might want to verify that Search indexing is not taking place.

1.  To verify that index building is not taking place, complete the following steps.
2.  Open the SystemOut.log file that corresponds to the application server instance on which Search is running and look for the following log messages:

    ```
    CLFRW0234I: All tasks disabled successfully
    ```

    ```
    CLFRW0714I: The following task {0} has been either disabled or deleted.
    We are skipping the business logic.
    ```

    where \{0\} is the name of the task that has been deleted or disabled.

3.  Verify that the following messages do not display after the indexing tasks have been deleted or disabled:

    ```
    CLFRW0588I: Search is starting to index the {0} component.
    ```

    ```
    CLFRW0040I: Starting index optimization
    ```

    ```
    CLFRW0483I: SAND indexing has started.
    ```


**Parent topic:**[Verifying Search](../admin/c_admin_search_verify_search.md)

**Related information**  


[Verifying that the index is being built incrementally](../admin/t_admin_search_verify_incremental_index.md)

[Backing up the Search index manually](../admin/t_admin_homepage_backup_index.md)

[Deleting scheduled tasks for Search](../admin/t_admin_search_delete_task_definition.md)

[Enabling and disabling scheduled tasks](../admin/t_admin_search_enable_indexing_task.md)

