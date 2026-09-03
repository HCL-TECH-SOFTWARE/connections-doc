# Deleting orphaned data {#t_admin_communities_delete_orphaned_data .task}

Delete orphaned data from remote applications following a system crash or database failure.

To use wsadmin commands, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

When you run the CommunitiesRemoteAppService.generateSyncReports command following a system crash or database failure, the command generates two reports, one of which is the orphanedRemoteApplications report. This report lists all the remote applications that have been orphaned as a result of the failure.

As part of your backup and restore operation, you can run the CommunitiesRemoteAppService.assignRemoteApp command for each remote application listed in the orphanedRemoteApplications report to reassociate each instance with a community. For some of the orphaned resources, you might choose to delete the data from the remote applications. The following instructions explain how to delete any orphaned resources that you don't want associated with a community.

1.  To delete orphaned data from a remote application, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app_server_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm_profile_root\bin
    ```

    ```
    app_server_root\profiles\dm_profile_root\bin
    ```

    where `app_server_root` is the WebSphere Application Server installation directory and `dm_profile_root` is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter will not execute correctly.

3.  Use the wsadmin client to access the configuration files for the remote application from which you want to delete the orphaned data.

    -   To access the Activities configuration file, use the following command:

        ```sh
        execfile("activitiesAdmin.py")
        ```

    -   To access the Blogs or Ideation Blog configuration file, use the following command:

        ```sh
        execfile("blogsAdmin.py")
        ```

    -   To access the Files configuration file, use the following command:

        ```sh
        execfile("filesAdmin.py")
        ```

    -   To access the Forums configuration file, use the following command:

        ```sh
        execfile("forumsAdmin.py")
        ```

    -   To access the News configuration file, use the following command:

        ```sh
        execfile("newsAdmin.py")
        ```

    -   To access the Wikis configuration file, use the following command:

        ```sh
        execfile("wikisAdmin.py")
        ```

4.  To delete the orphaned data, use one of the following commands:

    -   Activities:

        ```sh
        ActivityService.deleteActivities(vector activities)
        ```

        !!! note 
            
            The Activities widget can contain multiple activities associated with a single community. You can use the oldCommunityId as an identifier to query for a vector of all orphaned activities and delete them.

        Use the following commands to generate the vector, and then delete the orphaned activities.

        ```sh
        commact=ActivityService.fetchActivitiesByCommunityExId("oldCommunityUuid")

        wsadmin>ActivityService.deleteActivities(commact)
        ```

        where oldCommunityUuid comes from the orphanReport.

    -   Blogs and Ideation Blogs:

        ```sh
        BlogsAdminService.deleteWeblog("weblogId")
        ```

        Each orphaned blog and Ideation Blog has its blog ID in the report labeled as an Object Identifying Id.

    -   Files:

        ```sh
        FilesLibraryService.delete("libraryId")
        ```

        Each orphaned files library has its library ID in the report labeled as an Object Identifying Id.

    -   Forums:

        ```sh
        ForumsService.deleteForums(Vector Hashtable)
        ```

        !!! note
            
            The Forums widget can contain multiple forums associated with a single community. You can use the forum name to query for a vector of forums and delete them.

        Use the following commands to generate the vector, and then delete the orphaned forums.

        ```sh
        commforums=ForumsService.fetchForumsByName("forumName")

        wsadmin>ForumsService.deleteForums(commforums)
        ```

    -   News:

        ```sh
        NewsMicrobloggingService.deleteMicroblogs("communityId")
        ```

        This command removes all orphaned microblog and associated data for a community from the News repository.

    -   Wikis:

        ```sh
        WikisLibraryService.delete("libraryId")
        ```

        Each orphaned files library has its library ID in the report labeled as an Object Identifying Id.


**Parent topic:** [Recovering from a database failure](../admin/c_admin_communities_backup_and_restore.md)

**Related information**  


[Deleting community microblogs from the News repository](../admin/t_admin_news_delete_community_microblogs.md)

