# Search default scheduled tasks {#r_admin_search_default_indexing_tasks .reference}

When you install HCL Connections, a number of tasks are automatically configured for the Search application.

## Scheduled search tasks { .section}

The following tasks are scheduled for Search by default:

|Task name|Description|
|---------|-----------|
|15min-search-indexing-task|This task specifies that all installed IBM® Connections applications are to be crawled and indexed every 15 minutes, except for a one-hour period between 01:00 and 02:00.You can update the settings for this default task using the SearchService.addIndexingTask command. For more information, see *Adding scheduled tasks for Search*.|
|20min-file-retrieval-task|This task sends a JMS message that triggers the downloading of files and the indexing of file content on all Search nodes. The task retrieves ECM files in addition to files from HCL Connections.The task runs every 20 minutes, except for a one-hour period between 01:00 and 02:00.<br>You can update the settings for this default task using the SearchService.addFileContentTask command. For more information, see *Adding scheduled tasks for Search*.|
|20min-file-content-indexing-task|This task updates the index with the extracted text data.|
|nightly-sand-task|This task sends a JMS message that triggers social analytics indexing on all Search nodes. The social analytic indexing task is resource-intensive and consequently should be run at off-peak times. By default, the task runs nightly at 01:00.The social analytic indexers query the index and create utility documents that are used by the social analytics feature to provide recommendations for the Recommendations widgets and to build the graph of connected users that is used by the Do You Know widget and the Who Connects Us widget.<br>You can update the settings for this default task using the SearchService.addSandTask command. For more information, see *Adding scheduled tasks for Search*.|
|nightly-optimize-task|This task sends a JMS message that triggers a Lucene optimize operation of the local indexes on all Search nodes. The task runs nightly at 01:30.You can update the settings for this default task using the SearchService.addOptimizeTask command. For more information, see *Adding scheduled tasks for Search*.|

**Parent topic:**[Configuring scheduled tasks](../admin/c_admin_search_configure_scheduled_tasks.md)

**Related information**  


[Adding scheduled tasks for the social analytics service](../admin/t_admin_search_configure_sand_index_tasks.md)

[Adding scheduled tasks for Search](../admin/t_admin_search_configure_index_tasks.md)

[Configuring scheduled tasks](../admin/c_admin_search_configure_scheduled_tasks.md)

[Restoring the default scheduled tasks for Search](../admin/t_admin_search_reset_tasks.md)

