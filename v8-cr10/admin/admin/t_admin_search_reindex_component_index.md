# Reindexing a component in an existing index {#t_admin_search_reindex_component_index .task}

Reindex data in an HCL Connections component.

In some cases, you must reindex data for a specific IBM® Connections component. Reindexing might be required because only partial data was indexed for some entries in some components or the data was indexed in an unexpected manner. Alternatively, an initial index might be manually built in foreground with only a subset of components to work around a configuration or data misuse problem with one or more of the services. You can refresh data for part of components in background.

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

2.  Use the following command to back up the current search index: SearchService.backupIndexNow\(\). This command copies a new backup of the search index to the backup folder specified in the WebSphere® variable SEARCH\_INDEX\_BACKUP\_DIR.

3.  Make a copy of the index backup to work on. When you work with a background index, you should perform all operations on a copy of the background index. Make you copy on the local file system \(not a network share\). This copy is referred to the as the "working copy".

4.  Use the following command to build the components into the working copy of the index: SearchService.startBackgroundFeatureReindex \(persistenceLocation, extractedFileContentLocation, indexLocation, application\). When the operation is complete, a marker file that is called INDEX.READY is placed in the index folder. Check the logs to confirm that there were no errors during the operation. For example:

    ```
    SearchService.startBackgroundFeatureReindex("/opt/IBM/Connections/data/local/search/backgroundCrawl", 
    "/opt/IBM/Connections/data/local/search/backgroundExtracted", 
    "/opt/IBM/Connections/data/local/search/backgroundIndex", "people_finder") 
    ```

    !!! note 
        
        Valid values for application parameter are as follows: activities, blogs, calendar, communities, dogear, ecm\_files, files, forums, people\_finder, profiles, status\_updates, wikis

5.  Restore the modified index across the deployment. When the background index operation is complete, you must roll out the working copy of the index across the deployment. For more information, see *Restoring the Search index*.

6.  Enable any scheduled search indexing tasks that you disabled in step 1. Use the following command to enable the new indexing task to run on the defined schedule: SearchService.enableTask\(\). For example:

    ```
    SearchService.enableTask("15min-new-search-indexing-task")
    ```


**Parent topic:**[Creating Search indexes](../admin/c_admin_search_create_indexes.md)

**Related information**  


[Restoring the Search index](../admin/c_admin_search_restore_index.md)

[SearchService commands](../admin/r_admin_searchservice_commands.md)

