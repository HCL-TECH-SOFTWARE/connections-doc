# Adding a service to the search index {#t_search_add_service_to_index .task}

Use administrative commands to update the Search index with data from a newly added service.

To use administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin client.

There are files in the search index for each service in HCL Connections. If a new service is added to HCL Connections, you must also add this service to the search index. To add a service to the index, create a next indexing task that contains the service to be added. If the new service has file content to be added, you must also create a File Content task.

1.  Delete the current indexing task. For more information, see *Deleting scheduled tasks for Search*.

2.  Create an indexing task for the service, use the SearchService.addIndexingTask\(\). For more information, see *Adding scheduled tasks for Search*.

    Example

    ```
    SearchService.addIndexingTask("customDogearAndBlogs", "0 0 1 ? * MON-FRI", "0 10 1 ? * MON-FRI", "dogear,blogs","true")
    ```

3.  If a File Content task needs to be updated, take the following steps:

    1.  Delete the current File Content task. For more information, see *Deleting scheduled tasks for Search*.

        Example:

        ```
        SearchService.deleteTask("20min-file-retrieval-task")
        ```

    2.  Update the file content task. For more information, see *SearchService commands*.

        Example:

        ```
        SearchService.addFileContentTask("20min-file-retrieval-task", "0 1/20 0,2-23 * * ?", "0 10/20 0,2-23 * * ?", "all_configured", "false")
        ```

4.  If a new File Content task is needed, run the SearchService.addFileContentTask\(\) command. For more information, see *SearchService commands*.

    Example:

    ```
    SearchService.addFileContentTask("my-new-task", "0 0 1 ? * MON-FRI", "0 10 1 ?
        * MON-FRI", "wikis,files","true")
    ```


When the indexing task starts, the content from the new service is crawled and indexed.

Verify that crawling is taking place for the new service. For more information, see *Verifying that Search is crawling regularly*. Verify that indexing is taking place for the new service, For more information, see *Verifying that the index is being built incrementally*.

**Parent topic:**[The indexing process](../admin/c_admin_search_index_process.md)

**Related information**  


[Deleting scheduled tasks for Search](../admin/t_admin_search_delete_task_definition.md)

[Adding scheduled tasks for Search](../admin/t_admin_search_configure_index_tasks.md)

[Verifying that Search is crawling regularly](../admin/t_admin_search_verify_index_crawling.md)

[Verifying that the index is being built incrementally](../admin/t_admin_search_verify_incremental_index.md)

[Scheduling tasks](../admin/c_admin_common_was_scheduler.md)

[SearchService commands](../admin/r_admin_searchservice_commands.md)

