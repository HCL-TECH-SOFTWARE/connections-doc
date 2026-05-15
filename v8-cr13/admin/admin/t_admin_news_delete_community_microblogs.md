# Deleting community microblogs from the News repository {#t_admin_news_delete_community_microblogs .task}

You can use an administrative command to remove orphaned community microblog data as part of the community widget lifecycle disaster recovery scenario.

To run administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

A microblog is a status update message that is posted to a community activity stream. Microblog updates are displayed in the aggregated list of events in the Recent Updates widget in Communities. If a community owner adds the Status Updates widget to a community, microblog messages can also be seen in that widget. In addition, microblog messages are displayed when users filter the home page activity stream to show status updates for a community.The microblogs that display in the Recent Updates and Status Updates widgets in Communities are stored in the News repository. If a database failure or some other disaster occurs or if the associated community data has been deleted, you might decide that the orphaned microblog data in the News repository should be removed. The NewsMicrobloggingService.deleteMicroblogs command allows you to remove all microblog and associated data for a community from the News repository.

**Note:** There is no support for deleting other types of events that display in the Recent Updates widget. For more information about removing orphaned data, see *Deleting orphaned data*.

1.  To delete community microblogs from the News repository, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  Start the Jython script interpreter for the News repository.

    1.  Use the following command to access the News configuration file:

        ```
        execfile("newsAdmin.py")
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

4.  Use the following command:

    NewsMicrobloggingService.deleteMicroblogs\("communityId"\)
    :   Removes all microblog and associated data for a community from the News repository.

        When you run this command, the status messages are removed from the Status Updates widget in the community. The messages are also removed from the **Updates** views in Homepage. In addition, the Status Updates widget in the community is set so that no one can add status messages; the community owner can later change this setting by editing the community, selecting the Status Updates tab, and changing the Status Updates setting.

        This command takes a single parameter, which is a string that specifies the ID of the community whose microblog data you want to delete.

        For example:

        ```
        NewsMicrobloggingService.deleteMicroblogs("e952cf0c-a86c-4e26-b1e0-f8bf40a75804")
        ```


**Parent topic:**[Administering microblogs](../admin/c_admin_news_microblogs.md)

**Related information**  


[Deleting orphaned data](../admin/t_admin_communities_delete_orphaned_data.md)

[Deleting microblog data](../admin/c_admin_news_delete_status_updates.md)

[News administrative commands](../admin/r_admin_news_admin_props.md)

[Recovering from a database failure](../admin/c_admin_communities_backup_and_restore.md)

