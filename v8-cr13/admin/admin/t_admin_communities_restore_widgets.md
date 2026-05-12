# Recovering remote Connections applications {#t_admin_communities_restore_widgets .task}

Use the **CommunitiesSchedulerService.resumeSchedulingTask** command and other commands to recover HCL Connections application databases or the Communities database.

To enter administrative commands, you must use the IBM® WebSphere® Application Server wsadmin client, for more information see [Starting the wsadmin client](t_admin_wsadmin_starting.md).

After you restart a failed Communities database or another HCL Connections application database from a backup. You must ensure that data is correctly synchronized between the Communities database and the remote application databases.

**Note:** You need to recover data only if the remote databases that you recovered from backup are older or newer than the Communities database.

1.  To recover an HCL Connections application database that integrates with Communities after a database failure, complete the following steps.
2.  After the remote database is recovered from a backup, but before general access is recovered, temporarily disable access to the Communities application. You must also temporarily disable access to any other integrating applications that are impacted by the failure. This step must be done only at the IBM HTTP Server because the IBM WebSphere Application Server must be running to keep wsadmin commands available for the remaining recovery steps. Here is a suggested approach to disabling access:

    1.  Create an HTML document to notify users of the server maintenance.

        The maintenance page informs users that the product is temporarily unavailable because of scheduled maintenance work. Use the following ErrorDocument statements to point to the maintenance page:

        -   ErrorDocument 401 /upgrading.htm
        -   ErrorDocument 403 /upgrading.htm
    2.  Add the following element to the IBM HTTP Server configuration file, httpd.conf, to block all unauthorized IP addresses from the server and send the user to the upgrading.htm page. The httpd.conf file is stored in the following directory by default:
    
        -   Linux™: /opt/IBM/HTTPServer/conf
        -   Microsoft™ Windows™: C:\\IBM\\HTTPServer\\conf
        You must have an Allow element for every WebSphere Application Server in your deployment.

        ```
        <Location / >
        Order Deny,Allow
        Deny from all
        Allow from <your.ip.address>
        Allow from <ip.of.each.machine.in.deployment>
        </Location>
        ```

    3.  Restart the IBM HTTP Server.

3.  Temporarily stop the processing of past failed replay events by running the CommunitiesScheduler.pauseSchedulingTask\("LifecycleRetryQueuedEvents"\) command. For more information about this command, see *Managing Communities scheduled tasks*.

4.  Clear out the replay event queue \(because these events might no longer be applicable to the current application state\), take the following steps:

    1.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

        ```
        [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
        ```

        where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

        You must start the client from this directory or subsequent commands that you enter runs incorrectly.

    2.  Enter the following command to start the Communities Jython script interpreter:

        ```
        execfile("communitiesAdmin.py")
        ```

    3.  Do one of the following actions:

        1.  If the Communities application did not fail and any of the remote applications had a data loss failure, clear only the affected queue or queues. Enter the following command:

            CommunitiesQEventService.clearQueuedEventsByRemoteAppDefId\("remoteAppDefId"\)

            Where remoteAppDefId is one of the following IDs:

            |Application|remoteAppDefId|
            |-----------|--------------|
            |Activities|Activities|
            |Blogs|Blog|
            |Files|Files|
            |Forums|Forum|
            |Ideation Blog|IdeationBlog|
            |NewsData is stored in the Homepage database

|StatusUpdates

 RecentUpdates

|
            |Wikis|Wiki|

        2.  If the Communities application has a data loss, clear the replay event queue for all remote applications. Enter the following command on the Communities admin console:

            CommunitiesQEventService.clearQueuedEventsByResourceType\("community"\)

        For more information about the CommunitiesQEventService commands, see *Administering community queued events*.

5.  Before you enter the exportSyncedResourceInfo command, initialize the application's wsadmin environment by running the appropriate execfile\("<application\_name\>Admin.py"\) command.

6.  Enter the exportSyncedResourceInfo command that is listed in the following table for each affected application.

    If Communities failed, then all the applications are affected. Each service generates an XML file that shows the current state of associated remote applications. Use this report in the next step to validate against the current state of the Communities database.

    **Note:** This step does not apply when you are restoring Libraries remote applications.

    |Application|Command|
    |-----------|-------|
    |Activities|ActivityService.exportSyncedResourceInfo\(String filePath, String eventType\)For example:

    ```
execfile("activitiesAdmin.py")
ActivityService.exportSyncedResourceInfo("/temp-dir/activitiesOutput.xml", "community")
    ```

|
    |Blogs|BlogsAdminService.exportSyncedResourceInfo\(String FullFilePath, String ContainerType, String BlogType\)**Note:** The BlogType parameter is optional when you are exporting content for a blog. When you are exporting content for a blog, you can specify Blog as the value for this parameter. For an Ideation Blog, you must specify a value of IdeationBlog.

For example, to export content for a blog:

    ```
execfile("blogsAdmin.py")
BlogsAdminService.exportSyncedResourceInfo("/temp-dir/blogsOutput.xml", "community")
    ```

or

    ```
execfile("blogsAdmin.py")
BlogsAdminService.exportSyncedResourceInfo("/temp-dir/blogsOutput.xml", "community", "Blog")
    ```

To export content for an Ideation Blog:

    ```
execfile("blogsAdmin.py")
BlogsAdminService.exportSyncedResourceInfo("/temp-dir/IdeationblogsOutput.xml", "community", "IdeationBlog")
    ```

|
    |Files|FilesLibraryService.exportSyncedResourceInfo\(String filePath, String eventType\)For example:

    ```
execfile("filesAdmin.py")
FilesLibraryService.exportSyncedResourceInfo("/temp-dir/filesOutput.xml", "community")
    ```

|
    |Forums|ForumsService.exportSyncedResourceInfo\(String filePath, String eventType\)For example:

    ```
execfile("forumsAdmin.py")
ForumsService.exportSyncedResourceInfo("/temp-dir/forumsOutput.xml", "community")
    ```

|
    |News|NewsMicroBloggingService.exportSyncedResourceInfo \(String filePath, String eventType\)For example:

    ```
execfile("newsAdmin.py")
NewsMicrobloggingService.exportSyncedResourceInfo("/temp-dir/newsOutput.xml", "community")
    ```

|
    |Wikis|WikisLibraryService.exportSyncedResourceInfo \(String filePath, String eventType\)For example:

    ```
execfile("wikisAdmin.py")
WikisLibraryService.exportSyncedResourceInfo("/temp-dir/wikisOutput.xml", "community")
    ```

|

    For more information about the exportSyncedResourceInfo commands, see *Comparing remote application data with the Communities database*.

7.  Generate an HTML report for each remote application export by running the following wsadmin command against each XML file:

    CommunitiesRemoteAppService.generateSyncReports\("syncedResourceInfoFilepath", "outputDirPath"\)

    The output file that is created by the application-specific exportSyncedResourceInfo commands from the previous step is used as input for the generateSyncReports command. This command generates two files, communityDifferences and orphanedRemoteApplications, in a localized HTML format. For more information about this command, see *Generating a synchronization report*.

    **Note:** This step does not apply when you recover Libraries remote applications.

8.  Resume the processing of past failed events, enter the following command:

    CommunitiesScheduler.resumeSchedulingTask\("LifecycleRetryQueuedEvents"\)

    For more information about this command, see *Managing scheduled tasks*.

9.  Validate setting up and re-enabling the HTTP server for user access.

    Do this validation by removing the Location and ErrorDocument statements that you added in step 1.

10. Contact the community owners of all the communities that are listed in the communityDifferences file. To ensure that the applications are synchronized, community owners can toggle the community privacy settings after any required data scrubbing is complete. Community owners can temporarily modify the community settings.

    For example, they can set a community's access to restricted, save it, and then change the access back to public. They can then save it again to alert all remote applications that the community's content is publicly visible.

    If you want to synchronize the current state of communities with the remote application, run the CommunitiesRemoteAppService.resyncRemoteAppsForCommunity commands. For more information about these commands, see *Synchronizing remote application data with the Communities database*.

    **Note:** If you are restoring Libraries remote applications, you can decide to attempt to synchronize individual communities only if users report problems. Alternatively, you can synchronize the current state of Communities to FileNet. If the only data loss occurred on FileNet and not in the Communities database, then you must synchronize the current state of Communities to FileNet. Enter the CommunitiesRemoteAppService.resyncRemoteAppsForCommunity commands to synchronize Communities.

11. To ensure that data is correctly synchronized when files or folders are shared with communities from the Files application, and those communities do not contain the Files widget, enter the following command:

    ```
    FilesDataIntegrityService.syncAllCommunityShares()
    ```

    If the name or the access level of a community changes, the command updates the Files data store to reflect those changes.

    For example, if the community is now public but the access level of a file or folder is private, these files or folders are no longer shared with the community. If the community no longer exists, the shared files or folders still exist in the Files application. The file owners or folder owners still own and have full access to that content even though it is no longer shared.

12. To ensure that data is correctly synchronized when communities are added to activities as activity members, enter the following command:

    AccessControlService.syncAllCommunityShares\(\). If the name or the access level of the community changes, the command updates the Activities data store to reflect those changes. If the community no longer exists, the membership of the activity is changed, removing the community.

13. For each remote application listed in the orphanedRemoteApplications file, perform one of the following steps:

    -   To retain the data, enter the CommunitiesRemoteAppService.assignRemoteApp command to assign the application to a relevant community. This community might be the same community as before if only the widget is missing from the community. If the entire community and its membership are lost on data recovery, it might be a new community. For more information about the CommunitiesRemoteAppService.assignRemoteApp command, see *Assigning orphaned remote applications to a community*.
    -   To delete orphaned data from the remote application, enter the commands that are described in *Deleting orphaned data*.

**Parent topic:**[Recovering from a database failure](../admin/c_admin_communities_backup_and_restore.md)

**Related information**  


[Synchronizing microblog data with Communities](../admin/c_admin_news_sync_data.md)

[Generating a synchronization report](../admin/t_admin_communities_generate_sync_report.md)

[Managing Communities scheduled tasks](../admin/t_admin_communities_manage_scheduled_tasks.md)

[Assigning orphaned remote applications to a community](../admin/t_admin_communities_assign_widgets.md)

[Deleting orphaned data](../admin/t_admin_communities_delete_orphaned_data.md)

[Synchronizing remote application data with the Communities database](../admin/t_admin_communities_synch_remote_app.md)

