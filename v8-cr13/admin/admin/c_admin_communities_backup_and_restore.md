# Recovering from a database failure {#c_admin_communities_backup_and_restore .concept}

When Communities or another HCL Connections application experiences a database failure that involves restoring to a backup without replaying the transaction log to the point of failure, you can follow a number of steps to ensure a consistent data state for communities and their associated remote applications.

The Communities application provides the option of adding extended functionality by adding widgets. Some of the available widgets are internal to the Communities application, for example, the Bookmarks, Members, and Feeds widgets. Other widget types are applications that are external to Communities - these are the Activities, Blog, Files, Forums, Ideation Blog, Media Gallery, Status Updates and Wiki widgets.

Communities is tightly integrated with the external widget data. However, when you perform backups of your databases, you might back up Communities database data on a different schedule than the other applications' database data. If a disaster occurs, for example, if the Activities database fails and you need to restore from a backup of the Activities database that is two days old, after the Activities database restore, the Communities database is now more up-to-date than the Activities database. Any changes that were made to the Activities widgets in Communities in the past two days are lost and the two database are no longer synchronized.

You might also need to remove orphaned community microblog data as part of the community widget life-cycle disaster recovery process. A microblog is a message posted to a community activity stream. Microblogs display in the aggregated list of events, along with other type of events when users select the **Recent Updates** view. Users can display microblogs exclusively by selecting the **Status Updates** view.

Use the information in the following topics to help you to restore the Communities and external widget data to a synchronized state following a database disaster.

-   **[Recovering remote Connections applications](../admin/t_admin_communities_restore_widgets.md)**  
Use the **CommunitiesSchedulerService.resumeSchedulingTask** command and other commands to recover HCL Connections application databases or the Communities database.
-   **[Comparing remote application data with the Communities database](../admin/t_admin_communities_sync_remote_apps.md)**  
Use the exportSyncedResourceInfo commands to return a report of all the communities that an application has interacted with. The information in these reports can help you to synchronize remote application data with the Communities database after a system crash that includes data loss.
-   **[Generating a synchronization report](../admin/t_admin_communities_generate_sync_report.md)**  
Use the CommunitiesRemoteAppService.generateSyncReports command to generate HTML reports that help to identify data inconsistencies between communities and their remote applications.
-   **[Assigning orphaned remote applications to a community](../admin/t_admin_communities_assign_widgets.md)**  
Use the CommunitiesRemoteAppService.assignRemoteApp command to assign remote applications that have been orphaned following a database failure to a new community or reinsert the widget into an existing community.
-   **[Deleting orphaned data](../admin/t_admin_communities_delete_orphaned_data.md)**  
Delete orphaned data from remote applications following a system crash or database failure.
-   **[Synchronizing remote application data with the Communities database](../admin/t_admin_communities_synch_remote_app.md)**  
If you identify data inconsistencies between communities and their remote applications, run the CommunitiesRemoteAppService.resyncRemoteAppsForCommunity commands to synchronize remote applications with the current state of communities.

**Parent topic:** [Administering widgets and remote applications](../admin/c_admin_communities_administering_widgets.md)

**Related information**  


[Deleting community microblogs from the News repository](../admin/t_admin_news_delete_community_microblogs.md)

[Improving access performance and defragmenting DB2 database data](../admin/t_admin_db_maintain_compact.md)

[Restoring a Community Blog after a Communities database failure](../admin/c_admin_blogs_restoring_community_blog.md)

[Maintaining application databases](../admin/t_admin_db_maintain.md)

[Backing up and restoring data](../admin/c_admin_common_manage_backups.md)

