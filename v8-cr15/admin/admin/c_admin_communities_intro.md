# Administering Communities {#c_admin_communities_intro .concept}

Configure and administer Communities using scripts accessed using the IBM® WebSphere® Application Server wsadmin client.

You can update the Communities environment in two ways:

-   **Configuration settings**. Modify these settings to control various configurable applications within Communities. When you make configuration changes, you use scripts to check out the Communities configuration file, make changes, and then check the file back in. A server restart is required for your changes to take effect.
-   **Administrative commands**: Use these commands to control various aspects of the Communities environment and community users. Administrative commands do not require a server restart to take effect.

The following topics provide information about administering Communities:

-   **[Running Communities administrative commands](../admin/t_admin_communities_changing_admin.md)**  
Jython scripts are used to administer the Communities application. These scripts allow the administrator to view Communities data and perform administrative tasks for Communities.
-   **[Changing Communities configuration property values](../admin/t_admin_communities_changing_config.md)**  
Configuration settings control how and when various Communities operations take place. You can edit the settings to change the ways that communities behave.
-   **[Administering community templates](../admin/t_admin_comm_templates_container.md)**  
If your organization deployed Component Pack for Connections 7.0, you can take advantage of the community templates feature that is part of the tailored experience for Connections oganizations.
-   **[Creating and populating communities](../admin/t_admin_communities_create_communities.md)**  
Create and populate a community using scripts accessed using the wsadmin command-line tool. The administrative commands for creating communities do not require a server restart to take effect, and no file checkout is necessary.
-   **[Managing membership in Communities](../admin/c_admin_communities_managing_membership.md)**  
Use administrative commands to add and remove community members. You can also disable the **Add Members** button if you do not want community owners to add people to communities without their consent, or disable the invitations feature if you do not want to allow people to invite others to join their community.
-   **[Managing community content](../admin/c_admin_communities_control_content.md)**  
You can enable the active content filter to prevent users from embedding malicious content in text input fields. You can also use administrative commands to update or remove inappropriate information in fields to which you do not have owner access.
-   **[Moderating the content in a community](../admin/c_admin_communities_moderation.md)**  
When moderation is enabled for the Blogs, Forums, and Files applications, global moderators or community moderators can review community blog, forum, and file content before it is posted to a community, and manage content after it is added to a community.
-   **[Allowing non-community members to comment in forums](../admin/t_admin_forums_config_comment.md)**  
Allow users who are not community members to comment in forums in public or moderated communities.
-   **[Configuring the size of the community description summary](../admin/t_admin_communities_set_desc_size.md)**  
Use configuration settings to set the maximum size of a community description summary.
-   **[Configuring display settings](../admin/t_admin_communities_configure_display_settings.md)**  
Use configuration settings to control the display of data in the Communities application.
-   **[Specifying the maximum number of communities to display in user views](../admin/t_admin_communities_increase_lucene_limit.md)**  
You can add a configuration setting to the LotusConnections-config.xml file to increase the maximum number of communities that can be displayed in the personalized user views.
-   **[Hiding the Start a community button from unauthenticated users](../admin/t_admin_communities_show_start_comm_button.md)**  
You can prevent unauthenticated users from creating communities by hiding the **Start a Community** button.
-   **[Disabling the My Organization Communities view in Communities](../admin/t_admin_communities_disable_public_view.md)**  
You can control whether the My Organization Communities view is available in your organization's deployment of Communities by editing settings in the communities-config.xml file.
-   **[Enabling and disabling the community unique web address option](../admin/t_admin_communities_disable_handle.md)**  
Enable or disable the community owners ability to create a unique web address for their community.
-   **[Reparenting communities](../admin/t_admin_community_reparent.md)**  
Use the reparenting commands to modify a community to become a subcommunity of another community. You can also modify a subcommunity to become a top-level community.
-   **[Operations that update the communities time stamp](../admin/r_admin_lastmod_communities.md)**  
The following tables list the community and remote app actions and events that update the community lastmod time stamp.
-   **[Working with Community trash](../admin/c_admin_communities_trash.md)**  
Users may want to delete a community if it no longer has a purpose or is inactive. When a user deletes a community, it is not deleted permanently, rather it is moved to a trash area. After a set amount of time in the Trash, the community is permanently deleted. Provided it is not permanently deleted, the community can be restored.
-   **[Enabling community feeds](../admin/c_admin_communities_enabling_feeds.md)**  
The HCL Connections AJAX proxy is configured to allow cookies, headers or mime types, and all HTTP actions to be exchanged among the HCL Connections applications. However, access to arbitrary URLs is prevented by default.
-   **[Renaming the My Organization communities view](../admin/t_admin_communities_change_org.md)**  
You can update a property in the HCL Connections configuration file to change the organization name that displays for your communities.
-   **[Managing the Communities catalog](../admin/c_admin_communities_catalog.md)**  
The Communities catalog displays content from IBM Connections communities in the Communities application.
-   **[Administering widgets and remote applications](../admin/c_admin_communities_administering_widgets.md)**  
You can extend your community to include various components or applications. These applications are contained within the community as widgets. You can administer widget lifecycle events to ensure that changes are synchronized between the Communities server and the servers hosting the widgets.
-   **[Configuring Galleries](../admin/t_admin_communities_config_gallery.md)**  
Configure the behavior of Gallery widgets by checking out and editing gallery-config.xml. Galleries are community widgets that display thumbnails of files such as photos, videos, and office documents.
-   **[Managing Communities scheduled tasks](../admin/t_admin_communities_manage_scheduled_tasks.md)**  
Use the CommunitiesScheduler commands to administer the community event tasks performed by the IBM WebSphere Application Server scheduler. These administrative commands do not require a server restart to take effect, and no file checkout is necessary.
-   **[Configuring news event log clean-up](../admin/t_admin_communities_config_event_log_cleanup.md)**  
Edit settings in the communities-config.xml file to define the interval at which the EventLogCleanup task runs.
-   **[Configuring the Events widget](../admin/t_admin_communities_events_config.md)**  
Configure the behavior of the community Events widgets by checking out the calendar-config.xml file and editing it directly.
-   **[Retrieving and listing community data](../admin/t_admin_communities_generate_hashmaps.md)**  
The community fetch commands return a Java™ vector of Java™ hash maps. No file checkout or server restart is required when using these commands.
-   **[Filtering community lists](../admin/t_admin_communities_manage_lists.md)**  
Use the CommunitiesListService commands to filter the information in community lists and to generate smaller lists containing more specific information.

**Parent topic:** [Administering](../admin/c_lc_admin_overview.md)

**Related information**  



[Integrating the Communities business card](../admin/t_admin_communities_include_biz_card.md)

[Managing users](../admin/c_admin_common_user_life_cycle_over.md)

