# Administering widgets and remote applications {#c_admin_communities_administering_widgets .concept}

You can extend your community to include various components or applications. These applications are contained within the community as widgets. You can administer widget lifecycle events to ensure that changes are synchronized between the Communities server and the servers hosting the widgets.

Communities has several widgets that are automatically added when the community is first created. These widgets include the Bookmarks, Files, Forums, Status Updates, Recent Updates, and Members widgets. The Bookmarks, Files, Status Updates, and Forums widgets are added by default, but can be removed or hidden. The Recent Updates and Members widgets are default widgets, and cannot be removed or hidden. In addition, community owners can optionally add the Activities, Blogs, IdeationBlog, Events, Feeds, Subcommunities, Media Gallery, Related Communities, and Wiki widgets. Of these widgets, the Activities, Blogs, IdeationBlog, Files, Forums, Status Updates, and Wiki widgets are affected by lifecycle events.

When you create a community and add a widget to it, such as the Activities widget, any activities added to the community are owned by the community. Only members of the community can access those activities and, if the community's membership changes, or if the community is deleted, then the Activities widget must be updated with those changes. Provided that the Communities server and the widget \(Activities, in this example\) server are both up and running, these changes are applied to the widget immediately.

However, if the widget server is down for some reason, the changes need to be synchronized when the server is back up and fully running again. If an event cannot be pushed out to the widget server, the event is queued in a Communities database table, LC\_EVENT\_REPLAY. The IBM® WebSphere® Application Server scheduler attempts to push queued events to the widget server's event handler on a scheduled basis until it is successful. When multiple events are queued for a single widget, the events are tried in consecutive order, with the oldest events tried first. You can use the CommunitiesQEventService commands to manually administer queued events when there is a problem with the WebSphere Application Server scheduler and you don't want to wait for the next scheduled retry task to run. For more information about these commands, see *Administering community queued events*.

Changes are only pushed from Communities to the Activities, Blogs, IdeationBlog, Files, Forums, Status Updates \(News\), and Wiki applications. Changes to these applications are not pulled into Communities. The changes that are pushed out to the widget servers include the following changes:

-   Membership changes. For example, when users are added, removed, or when membership roles are changed.
-   Community privacy setting changes. For example, when a community is changed from public to private and vice versa.
-   Widget addition or removal. For example, when the activities, blog, files, and wiki widgets are added to or removed from a community.
-   Updates to community information. For example, changes to the community name, description, or tags.
-   Community deletion.

The `widgets-config.xml` file contains a section for each of the widgets available in Communities. Each widget section contains configuration settings for the widget's life cycle and lists the events that correspond to the widget. For more information about this file, see *Using the `widgets-config.xml` file for Communities*.

The following sections provide more information about administering widgets and remote applications in Communities:

-   **[Using the widgets-config.xml file for Communities](../admin/t_admin_communities_use_widgets_config.md)**  
The `widgets-config.xml` files contains configuration settings for each of the widgets supported by Communities and Profiles. To update settings in the file, you must check the file out and, after making changes, you must check the file back during the same wsadmin session as the checkout for the changes to take effect.
-   **[Defining mandatory and default widgets for communities](../admin/t_admin_communities_change_default_widgets.md)**  
Modify settings in `widgets-config.xml` to change the default widgets for communities.
-   **[Adding custom widgets to Communities](../admin/c_admin_communities_add_custom_widgets.md)**  
Extend the functions of the Communities application by adding custom widgets. To make the widgets available for use in Communities, you need to configure the widgets in the widget definition file, `widgets-config.xml`.
-   **[Specifying different system users for widget life-cycle events](../admin/t_admin_communities_configure_j2c.md)**  
Specify a system user to manage widget life-cycle events that overrides the default authentication alias created at installation time.
-   **[Administering community queued events](../admin/t_admin_communities_event_admin.md)**  
Use the `CommunitiesQEventService` commands to administer the lifecycle events that occur within a community.
-   **[Configuring the widget life-cycle retry schedule](../admin/t_admin_communities_config_retry_schedule.md)**  
Communities uses the IBM WebSphere Application Server scheduler to run a scheduled task that processes events in the widget life-cycle event queue. You can configure the frequency with which this task runs by editing settings in the `communities-config.xml` file.
-   **[Recovering from a database failure](../admin/c_admin_communities_backup_and_restore.md)**  
When Communities or another HCL Connections application experiences a database failure that involves restoring to a backup without replaying the transaction log to the point of failure, you can follow a number of steps to ensure a consistent data state for communities and their associated remote applications.

**Parent topic:** [Administering Communities](../admin/c_admin_communities_intro.md)

**Related information**  


[Managing Communities scheduled tasks](../admin/t_admin_communities_manage_scheduled_tasks.md)

[Scheduling tasks](../admin/c_admin_common_was_scheduler.md)

