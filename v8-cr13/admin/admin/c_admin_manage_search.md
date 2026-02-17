# Managing the Search application {#c_admin_manage_search .concept}

You can perform the following tasks when managing the Search application.

-   **[Administering the social analytics service](../admin/c_admin_search_sand_indexing_tasks.md)**  
The social analytics widgets that are available from Communities, Profiles, and the Home page use the Search application as a data provider.
-   **[Making search-related configuration changes to newly added nodes](../admin/t_admin_search_add_search_node.md)**  
You can add another Search node to a cluster where there is an existing Search node for load-balancing purposes or if you want to have a backup node for redundancy.
-   **[Updating Search work manager settings](../admin/t_admin_search_update_work_managers.md)**  
Update the settings for the work managers used by the Search application.
-   **[Reloading the Search application](../admin/t_admin_search_reload_search.md)**  
After making configuration changes to Search, you can use SearchService commands to reload the Search index and configuration, and avoid the need for restarting the Search application.
-   **[Configuring page persistence settings](../admin/t_admin_search_configure_persisted_data.md)**  
Edit settings to specify whether the persisted pages in a seedlist persistence directory are deleted after a successful incremental index. You can also update the maximum age for persisted pages.
-   **[Avoiding unnecessary full search crawls](../admin/t_admin_search_crawling.md)**  
Use an administrative command to avoid performance hits by avoiding unnecessary full search crawls.
-   **[Specifying the maximum seedlist page size for a service](../admin/t_admin_search_max_results.md)**  
You can update a property in the HCL Connections configuration file to specify the maximum seedlist page size for a service.
-   **[Setting the timeout for seedlist requests](../admin/t_admin_search_set_seedlist_timeout.md)**  
You can set the default timeout for seedlist requests by creating an IBM® WebSphere® Application Server environment variable and specifying the required value of the timeout.
-   **[Excluding inactive users from search results](../admin/t_admin_search_exclude_inactive_users.md)**  
By default, when users search for people in HCL Connections, inactive user profiles are excluded from the search results. You can run a command to change your deployment settings so that search results related to inactive users are automatically included in search results.

**Parent topic:** [Administering Search](../admin/c_admin_search.md)

**Related information**  


[SearchService commands](../admin/r_admin_searchservice_commands.md)

[SearchCellConfig commands](../admin/r_admin_searchcellconfig_commands.md)

