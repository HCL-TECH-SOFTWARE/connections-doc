# Administering Forums {#c_admin_forums_overview .concept}

Administer Forums by specifying properties in a configuration file or running administrative commands.

You can edit the `forum-config.xml` file to control how and when various Forums operations take place. Use administrative commands to run tasks that manipulate Forums content. Changes to the configuration file require node synchronization and a restart of the Forums server before they take effect. Changes that are made by using administrative commands take effect immediately.

Refer to the following topics for more information:

-   **[Running Forums administrative commands](../admin/t_admin_forums_changing_admin.md)**  
Use the wsadmin client to administer the Forums application.
-   **[Changing Forums configuration property values](../admin/t_admin_forums_changing_config.md)**  
Configuration settings control how and when various Forums operations take place.
-   **[Retrieving forum content](../admin/c_retrieving_forum_content.md)**  
Use administrative commands to retrieve lists of forums and forum topics. You can narrow down a list of forums to retrieve a specific subset of forums that you want to administer.
-   **[Rectifying the count of forums and forum topics](../admin/t_admin_forums_rectify_count.md)**  
 Recalculate the count of forums and forum topics.
-   **[Moderating forums](../admin/c_admin_forums_moderation.md)**  
Enable a moderator to review and manage forum posts.
-   **[Managing forum trash](../admin/c_admin_forums_manage_trash.md)**  
Move forum content to the trash, empty the trash, restore forums and forum topics from the trash, and perform other trash management tasks for Forums.
-   **[Managing Forums scheduled tasks](../admin/t_admin_forums_manage_scheduler.md)**  
Use the ForumsScheduler administrative commands to manage the tasks that are scheduled for forums.
-   **[Managing file attachments in Forums](../admin/c_admin_forums_manage_attachments.md)**  
You can manage space on the Forums application server by limiting the number of attachments that users can upload to a forum post. To prevent users from uploading file attachments, you can edit configuration settings in the forum-config.xml file.
-   **[Enabling topic posting in different deployments](../admin/t_admin_forums_social_bridge.md)**  
Enable users to take forum topics in one HCL Connections deployment and post them to a different HCL Connections deployment.
-   **[Adding a feed for topics and replies](../admin/t_admin_forums_Filter_by_tag.md)**  
Add a property to the LotusConnections-config.xml file to add a feed that includes topics and the replies to the topics.
-   **[Restricting topic editing](../admin/t_admin_forums_restrict_editing.md)**  
You can restrict the editing of forum topics or replies to their creators. Only a user who created a topic or a reply can edit it.
-   **[Allowing non-community members to comment in forums](../admin/t_admin_forums_config_comment_N.md)**  
Allow users who are not community members to comment in forums in public or moderated communities.

**Parent topic:**[Administering](../admin/c_lc_admin_overview.md)

**Related information**  


[Managing users](../admin/c_admin_common_user_life_cycle_over.md)

