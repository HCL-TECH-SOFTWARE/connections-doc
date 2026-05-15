# Activity stream search {#c_admin_news_as_search .concept}

The activity stream search service provides an indexing and search infrastructure that is bundled with the News application. This service provides search capabilities over the activity stream.

The activity stream search service is automatically configured to crawl the activity stream seedlist at regular intervals. By default, the interval is set to 30 seconds. After an initial crawl of the activity stream, subsequent crawls are incremental, and only new events that were generated since the previous crawl are collected. When you install HCL Connections, the crawler is disabled by default.

Crawling and indexing is carried out on one of the servers in the cluster where the News application is deployed. This server is chosen automatically by the WebSphere High Availability \(HA\) Manager. If News becomes unavailable on this server, a different server that is running News is chosen by WebSphere HA to replace it. For each crawling session, the indexing server creates a delta index in a shared file system and sends a notification to other nodes in the cluster. This delta index is read from shared file system by the other nodes and merged into the main index on the local disk. All the cluster nodes serve search requests by reading from the local index. Configuration and status information for the crawlers is stored in database tables that are available to all the nodes. Delta indexes are stored for 24 hours. If a node is down for more than 24 hours, you need to copy the index manually to that node from another node. In the event that a node is unavailable, the other nodes can still perform search requests with no interruption.

Administrative users can manage the activity stream search service from a user interface that is accessed using a URL. From the Activity Stream Search Administration page, you can enable or disable the crawler, and edit the crawl schedule. You can also clear the current indexed content and perform a full crawl if required. To access the page, you must be assigned the search-admin role. For more information about this role, see the *Roles* topic.

Refer to the following topics for more information:

-   **[Administering activity stream search](../admin/t_admin_news_manage_as_search.md)**  
Update information related to the activity stream search service and manage the collection of activity stream data.
-   **[Copying the activity stream search index to new nodes](../admin/t_admin_news_copy_as_index.md)**  
When you add a node to the News cluster to ensure high availability for activity stream search requests, you must copy the activity stream search index to the new node. Before copying the index, ensure that you disable scheduled metadata collections.
-   **[Configuring activity stream search index settings](../admin/t_admin_news_config_as_index_settings.md)**  
You can update the default settings for the index folder and the shared replication folder for the activity stream search service.
-   **[Restoring the activity stream search index](../admin/t_admin_activity_stream_recover_index.md)**  
If the activity stream search index becomes corrupt or is not being refreshed properly, you can delete the existing index data to rebuild the index.

**Parent topic:** [Administering the News repository](../admin/c_admin_news.md)

**Related information**  


[Roles](../admin/r_admin_common_user_roles.md)

[Administering Search](../admin/c_admin_search.md)

