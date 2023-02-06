# Synchronizing remote application data with the Communities database {#t_admin_communities_synch_remote_app .task}

If you identify data inconsistencies between communities and their remote applications, run the CommunitiesRemoteAppService.resyncRemoteAppsForCommunity commands to synchronize remote applications with the current state of communities.

Be sure that all remote applications are running and the widget lifecycle retry queue is empty.

To synchronize application data, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

You can synchronize the following types of information from the community to the remote applications:

-   Visibility changes, for example if a community's visibility is changed from Restricted to Public.
-   Theme changes, for example if a community's theme is changed from blue to silver.
-   Moderation changes. If Connections Moderation is enabled in your environment \(applies only to Files, Forums, and Blogs\), these commands synchronize changes that are made to the Moderation check boxes. These check boxes display in the Edit Community page and are as follows:
    -   **Owners must approve all content**
    -   **Viewers can flag inappropriate content**

There are four commands for synchronizing remote application data with the Communities database:

-   CommunitiesRemoteAppService.resyncRemoteAppsForCommunity\("communityUuid"\) synchronizes all remote applications that are associated with the single community specified by the UUID in the command.
-   CommunitiesRemoteAppService.resyncRemoteAppsForCommunityAndWidget\("communityUuid", "widgetDefId"\) synchronizes the specified remote application that is associated with the single community specified in the command.
-   CommunitiesRemoteAppService.resyncRemoteAppsForAllCommunities\("widgetDefId"\) synchronizes the specified remote application for all communities.
-   CommunitiesRemoteAppService.restartResyncRemoteAppsForAllCommunities\("lastCommunityUuid", "widgetDefId"\) restarts the synchronization if a network or server outage causes resyncRemoteAppsForAllCommunities\(\) to fail.

**Note:** These commands can result in a loss of data if misused. Therefore, use these commands under the following circumstances only:

-   A remote application database is restored from backup and some Communities data is lost.
-   A remote application is not synchronized with Communities data because of a software defect.

1.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter will not execute correctly.

2.  Start the Communities Jython script interpreter using the following command:

    ```
    execfile("communitiesAdmin.py")
    ```

    If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

3.  Enter the following command to synchronize remote applications with a single community:

    CommunitiesRemoteAppService.resyncRemoteAppsForCommunity\("communityUuid"\)

    You can obtain the UUID for a community or subcommunity by doing one of the following actions:

    -   Using a browser, open the community or subcommunity that you want and copy the UUID from the URL.
    -   Run the CommunitiesService.fetchAllComm\(\) wsadmin command to fetch all communities and subcommunities on the server. Copy the UUID from the output.
    For example:

    CommunitiesRemoteAppService.resyncRemoteAppsForCommunity\("59d8e5a7-ba0e-488f-8bcd-1f79a994e419"\)

    If the community with UUID: 59d8e5a7-ba0e-488f-8bcd-1f79a994e419, contains the Activities, Status Updates and Files widgets, the command resynchronizes communities data to these three remote applications.

4.  Enter the following command to synchronize remote applications with a single community and widget: CommunitiesRemoteAppService.resyncRemoteAppsForCommunityAndWidget\("communityUuid","widgetDefId"\)

    Valid input values for widgetDefId are as follows:

    -   Activities
    -   Blog
    -   IdeationBlog
    -   Files
    -   Forum
    -   Library
    -   StatusUpdates
    -   Wiki
    **Note:** widgetDefId values are case-sensitive, you must enter these values as shown.

    For example:

    CommunitiesRemoteAppService.resyncRemoteAppsForCommunityAndWidget\("c0281270-44a9-4be0-a9d6-db64f63d", "Forum"\)

    One widget \(Forum\) in one community is resynchronized.

5.  Enter the following command to synchronize remote applications with all communities:

    CommunitiesRemoteAppService.resyncRemoteAppsForAllCommunities\("widgetDefId"\)

    The command outputs the UUID of the last community it synchronized, and updates every 10 communities. It ends with "Done"when all communities are resynchronized on the server.

    Here is a sample of the type of response you receive when you synchronize a remote wiki with all communities:

    ```
    wsadmin>CommunitiesRemoteAppService.resyncRemoteAppsForAllCommunities("Wiki")
    Total Processed: 10   Last processed communityUuid: 048d011f-e2c1-4d11-975e-b3afb474c8db
    Total Processed: 20   Last processed communityUuid: 0af8a947-7de9-424f-9f88-c984ebe169f7
    .
    .
    .
    Total Processed: 270   Last processed communityUuid: 554d79ae-0e81-4f54-a4b8-6a2c4497ba5c
    Done.
    ```

6.  If a network or server outage causes resyncRemoteAppsForAllCommunities\(\) to fail, enter the following command to restart the synchronization beginning where the last synchronization step failed. CommunitiesRemoteAppService.restartResyncRemoteAppsForAllCommunities\("lastCommunityUuid", "widgetDefId"\)

    For example:

    CommunitiesRemoteAppService.restartResyncRemoteAppsForAllCommunities\("44f52a77-bccd-433c-bdf9-2d19f42d944b", "Wiki"\)


**Parent topic:**[Recovering from a database failure](../admin/c_admin_communities_backup_and_restore.md)

**Related information**  


[Synchronizing user data by using administrative commands](../admin/c_admin_common_sync_via_admin_commands1.md)

[Communities administrative commands](../admin/r_admin_communities_admin_props.md)

[Recovering remote Connections applications](../admin/t_admin_communities_restore_widgets.md)

