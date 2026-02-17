# Adding a new component to an existing index {#t_admin_search_set_max_indexing_threads .task}

Add new HCL Connections components to the index that were not included when the index was built.

In some cases, the initial search index is created with only a subset of components that are indexed. This might be because some services were not enabled at the time the index was created. Alternatively, an initial index might be manually built with only a subset of components to work around a configuration problem with one or more of the services. This configuration problem might prevent the building of a complete index. You can add those components to the index that were not initially included.

1.  Disable any scheduled search indexing tasks. You must disable scheduled tasks because the default indexing task indexes all HCL Connections services. However, to add a component, only a subset of services are to be indexed. Also, it is useful not to have a foreground indexing process contending with the background operation for system resources. Disabling search indexing tasks also it makes it easier to distinguish messages about foreground operations from background operations in the logs.

    1.  Use the following wsadmin command to list scheduled search indexing tasks: SearchService.listIndexingTasks\(\)

        For more information, see *SearchService commands*.

    2.  Use the following wsadmin command to disable selected search indexing tasks: SearchService.disableTask\(\)

        For example:

        ```
        SearchService.disableTask("15min-search-indexing-task")
        ```

        !!! note 
            
            The currently active search index is still in place on the deployment and is still used to service search requests. Running SearchService.disableTask\(\) ensures that there is no interruption to search services while you add new Connections components.

2.  Use the following command to back up the current search index: SearchService.backupIndexNow\(\). This command copies a new backup of the search index to the backup folder specified in the WebSphere® variable SEARCH\_INDEX\_DIR.

3.  Make a copy of the index backup to work on. When you work with a background index, you should perform all operations on a copy of the background index. Make you copy on the local file system \(not a network share\). This copy is referred to the as the "working copy".

4.  Use the following command to build the missing components into the working copy of the index: SearchService.startBackgroundIndex\(\). When the operation is complete, a marker file that is called INDEX.READY is placed in the index folder. Check the logs to confirm that there were no errors during the operation. For example:

    ```
    SearchService.startBackgroundIndex(("/search/working/seedlists", 
      "/search/working/extracted", 
      "/search/working/index", "activities")) 
    ```

5.  Restore the modified index across the deployment. When the background index operation is complete, you must roll out the working copy of the index across the deployment. For more information, see *Restoring the Search index*.

6.  Modify the scheduled indexing tasks to include the previously missing components. Take the following steps:

    1.  Use the following command to define a new indexing task with the new list ofservices: SearchService.addIndexingTask\(\). For example:

        ```
        SearchService.addIndexingTask("15min-new-search-indexing-task", 
        "0 1/15 0,2-23 * * ?", "0 10/15 0,2-23 * * ?", 
        "activities,blogs,calendar,communities,dogear,files,
          forums,profiles,status_updates,wikis", "false")
        ```

        !!! note 
            
            You cannot modify existing tasks, you must define a new one.

    2.  Use the following command after you define a new task: SearchService.refreshTasks\(\)

    3.  Use the following command to enable the new indexing task to run on the definedschedule: SearchService.enableTask\(\). For example:

        ```
        SearchService.enableTask("15min-new-search-indexing-task")
        ```


**Parent topic:**[Managing the Search index](../admin/c_admin_search_manage_index.md)

**Related information**  


[Restoring the Search index](../admin/c_admin_search_restore_index.md)

[SearchService commands](../admin/r_admin_searchservice_commands.md)

