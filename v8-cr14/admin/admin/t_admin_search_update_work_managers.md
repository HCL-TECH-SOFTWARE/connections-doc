# Updating Search work manager settings {#t_admin_search_update_work_managers .task}

Update the settings for the work managers used by the Search application.

When you install HCL Connections, the following work managers are automatically created for Search on each node in your deployment:

SearchCrawlingWorkManager
:   Handles the work involved in crawling the seedlists to persist them to disk.

SearchDCSWorkManager
:   Handles the work for the file content retrieval and conversion task.

SearchIndexingWorkManager
:   Handles the work involved in processing the entries in persisted seedlists into Lucene documents.

The Search application also uses the DefaultWorkManager at certain times, for example, for background indexing.

You can update the settings for the SearchCrawlingWorkManager, SearchDCSWorkManager, and SearchIndexingWorkManager from the IBM® WebSphere® Integrated Solutions Console. For example, when you change the maximum number of crawling threads in the search-config.xml file, you might also need to adjust the thread settings for the SearchCrawlingWorkManager on each node.

1.  To update settings for the Search work managers, complete the following steps.
2.  Open the WebSphere Integrated Solutions Console on the node where you want to update the work manager settings.

3.  Expand **Resources** and select **Asynchronous beans** \> **Work managers**.

4.  Select the work manager that you want to update.

5.  Update the settings as needed.

6.  Click **Apply** and then click **OK** to save the new settings.


**Parent topic:**[Managing the Search application](../admin/c_admin_manage_search.md)

**Related information**  


[Configuring the number of crawling threads](../admin/t_admin_search_set_max_crawling_threads.md)

[Configuring the number of indexing threads](../admin/t_admin_search_set_max_indexing_threads.md)

