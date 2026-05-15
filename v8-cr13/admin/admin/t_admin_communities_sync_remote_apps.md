# Comparing remote application data with the Communities database {#t_admin_communities_sync_remote_apps .task}

Use the exportSyncedResourceInfo commands to return a report of all the communities that an application has interacted with. The information in these reports can help you to synchronize remote application data with the Communities database after a system crash that includes data loss.

To use wsadmin commands, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

Communities can integrate with the Activities, Blogs, Files, Forums, News, and Wikis applications as remote applications. As part of recovering from an incomplete database restore operation, you can run the CommunitiesRemoteAppService commands for each remote application that is listed in the orphanedRemoteApplications report because it is missing its containing community or only its widget in a containing community. Alternatively, you can delete any orphaned data from the remote applications. For more information about deleted orphaned data, see *Deleting orphaned data*.

1.  To resolve inconsistencies between remote applications and communities, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter will not execute correctly.

3.  Use the wsadmin client to access the configuration files for the remote application that you want to synchronize with Communities.

    -   To access the Activities configuration file, use the following command:

        ```
        execfile("activitiesAdmin.py")
        ```

    -   To access the Blogs configuration file, use the following command:

        ```
        execfile("blogsAdmin.py")
        ```

    -   To access the Files configuration file, use the following command:

        ```
        execfile("filesAdmin.py")
        ```

    -   To access the Forums configuration file, use the following command:

        ```
        execfile("forumsAdmin.py")
        ```

    -   To access the News configuration file, use the following command:

        ```
        execfile("newsAdmin.py")
        ```

    -   To access the Wikis configuration file, use the following command:

        ```
        execfile("wikisAdmin.py")
        ```

4.  To generate a report of all communities that a remote application has interacted with, use the application-specific version of the following command:

    application\_nameService.exportSyncedResourceInfo\(file\_path, event\_type\)

    where

    -   application\_name is the application that is affected by the system crash.
    -   file\_path is a string that specifies the absolute path to the file name. The path can only contain forward slashes. For example, "c:/temp/community\_output.xml".
    -   event\_type is a string value that specifies the event type "community". An error is returned if this is set to anything other than "community".
    **Note:** In clusters, when you run the command from the deployment manager, the path and file are created on the server running the specified application. In clusters where multiple nodes are running the specified application, you are asked to choose a server to connect to and run the command on, and then the path and file are created on that server.

    Depending on which application or applications you are correcting, choose from the following commands:

    -   Activities:

        ActivityService.exportSyncedResourceInfo\(filePath,eventType\)

        For example:

        ```
        execfile("activitiesAdmin.py")
        ActivityService.exportSyncedResourceInfo("/temp-dir/activitiesOutput.xml", "community")
        ```

    -   Blogs:

        BlogsAdminService.exportSyncedResourceInfo\(filePath, containerType, blogType\)

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

    -   Files:

        FilesLibraryService.exportSyncedResourceInfo\(filePath, eventType\)

        For example:

        ```
        execfile("filesAdmin.py")
        FilesLibraryService.exportSyncedResourceInfo("/temp-dir/filesOutput.xml", "community")
        ```

    -   Forums:

        ForumsService.exportSyncedResourceInfo\(filePath, eventType\)

        For example:

        ```
        execfile("forumsAdmin.py")
        ForumsService.exportSyncedResourceInfo("/temp-dir/forumsOutput.xml", "community")
        ```

    -   News:

        NewsMicrobloggingService.exportSyncedResourceInfo\(filePath, eventType\)

        For example:

        ```
        execfile("newsAdmin.py")
        NewsMicrobloggingService.exportSyncedResourceInfo("/temp-dir/newsOutput.xml", "community")
        ```

    -   Wikis:

        WikisLibraryService.exportSyncedResourceInfo\(filePath, eventType\)

        For example:

        ```
        execfile("wikisAdmin.py")
        WikisLibraryService.exportSyncedResourceInfo("/temp-dir/wikisOutput.xml", "community")
        ```

    **Note:** If the Communities database fails, all remote applications are affected and you need to run each of the application-specific commands.


The export XML files are used in the steps covered in the next topic to generate a report of how the information differs from the current state of the Communities application. For more information, see *Generating a synchronization report*.

**Parent topic:**[Recovering from a database failure](../admin/c_admin_communities_backup_and_restore.md)

**Related information**  


[Deleting orphaned data](../admin/t_admin_communities_delete_orphaned_data.md)

[Synchronizing microblog data with Communities](../admin/c_admin_news_sync_data.md)

