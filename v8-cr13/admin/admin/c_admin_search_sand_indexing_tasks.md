# Administering the social analytics service {#c_admin_search_sand_indexing_tasks .concept}

The social analytics widgets that are available from Communities, Profiles, and the Home page use the Search application as a data provider.

The social analytics framework used by the widgets analyzes the social elements of the Search application to generate an index and map complex relationships between users and content. This mapping information is stored with the Search index, and is leveraged to provide users with recommendations of content that might interest them.

Refer to the following topics for more information:

-   **[Social analytic relationships](../admin/c_admin_search_sand_relationships.md)**  
The social analytics service analyzes complex relationships between people, documents, and tags in HCL Connections applications, and uses the results of the analysis to make recommendations to users in the social analytic widgets. These relationships and associations control the type of recommendations that are displayed to users in the widgets.
-   **[Listing social analytics scheduled tasks](../admin/t_admin_search_list_sand_tasks.md)**  
You can use a SearchService administrative command to list the tasks that are scheduled for the social analytics service.
-   **[Adding scheduled tasks for the social analytics service](../admin/t_admin_search_configure_sand_index_tasks.md)**  
Use SearchService administrative commands to schedule social analytics tasks in the Home page database. A nightly task is scheduled to run after the optimize task by default. Every time the social analytics scheduled task runs, the index for the social analytics service is recreated.
-   **[Running one-off social analytics scheduled tasks](../admin/t_admin_search_one_off_sand_tasks.md)**  
Use the SearchService.sandIndexNow command to create a one-off scheduled task for the social analytics service. The task is scheduled to run once and only once, 30 seconds after being called.
-   **[Tuning social analytics indexing](../admin/t_admin_search_tune_sand_indexing.md)**  
Use a SearchCellConfig command to configure the number of iterations used by the different jobs involved in the social analytics indexing process.
-   **[Creating a background index for the social analytics service](../admin/t_admin_search_create_bgd_sand_index.md)**  
Use the SearchService.startBackgroundSandIndex command to perform background indexing for the social analytics service.
-   **[Configuring global properties for the social analytics service](../admin/t_admin_search_configure_sand_props.md)**  
Use SearchService commands to list, add, update, or delete global properties for the social analytics service.
-   **[Excluding specific users from the social analytics service](../admin/t_admin_search_disable_sand_per_user.md)**  
Use SearchService commands to control whether specific users are included or excluded from the social analytics service. All users are included in the social analytics service by default.

**Parent topic:** [Managing the Search application](../admin/c_admin_manage_search.md)

