# Administering microblogs {#c_admin_news_microblogs .concept}

You can perform a number of administrative tasks to manage the microblogging feature in HCL Connections.

You can control the size and display of microblog entries in your deployment by editing settings in the `news-config.xml` file. In the event of a system crash, you can use administrative commands to synchronize microblog data with the Communities database or remove orphaned community microblog data.

Refer to the following topics for more information:

-   **[Deleting microblog data](../admin/c_admin_news_delete_status_updates.md)**  
The News administrator can delete any status update or comment from the Home page, Profiles, and Communities applications by clicking the X icon next to the status update or comment in the user interface.
-   **[Specifying the maximum size for microblogs](../admin/t_admin_news_configure_max_microblog.md)**  
Edit settings in the `news-config.xml` file to set the maximum size of microblogs in your deployment.
-   **[Synchronizing microblog data with Communities](../admin/c_admin_news_sync_data.md)**  
Use the `NewsMicrobloggingService.exportSyncedResourceInfo` command to return an XML synchronization report of the community resources held in the News repository. The report contains information about the current state of microblog data in the community activity stream.
-   **[Deleting community microblogs from the News repository](../admin/t_admin_news_delete_community_microblogs.md)**  
You can use an administrative command to remove orphaned community microblog data as part of the community widget lifecycle disaster recovery scenario.

**Parent topic:** [Administering the News repository](../admin/c_admin_news.md)

**Related information**  


[Disabling microblogging](../admin/t_admin_common_disable_microblogging.md)

