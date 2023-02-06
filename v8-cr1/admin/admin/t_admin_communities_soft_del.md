# Managing Community trash {#t_admin_communities_soft_del .task}

Use the community trash commands to get a list of communities deleted by users and moved to trash. You can also restore a community from trash.

To use administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

If a community no longer has a purpose or is inactive, the community owner might want to delete it. Use the Community trash commands to view and restore communities from trash.

1.  To administer the community trash, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter will not execute correctly.

3.  Start the Communities Jython script interpreter using the following command:

    ```
    execfile("communitiesAdmin.py")
    ```

    If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

4.  Use the following commands to manage community trash:

    CommunitiesService.getSoftDeletedCommunityUuidList\("date"\)
    :   Returns a list of community UUIDs in the trash that are older than the date specified.

        The command takes the following parameters:

        Date
        :   Date in YYYY-MM-DD format.

        Example:

        ```
        wsadmin>CommunitiesService.getSoftDeletedCommunityUuidList("2013-11-20")
        [{lastModBy=[Amy Jones, 55d04dc0-0101-102e-8ac8-f78755f7e0ed], 
        created=11/19/13 8:33:09 AM EST, tags=[], type=public, name=delete test, 
        uuid=ea546678-94d7-4d 24-9f23-a8ae0fd8b824, memberSize=1, lastMod=11/19/13 
        8:33:33 AM EST, description=defect verification , 
        createdBy=[Amy Jones, 55d04dc0-0101-102e-8ac8-f78755f7e0ed]}]
        
        ```

        You can also get a list of all the communities and subcommunities in trash as follows:

        ```
        wsadmin>CommunitiesService.getSoftDeletedCommunityUuidList()
        ```

    CommunitiesService.unDeleteCommunity\("communityUuid"\)
    :   Restores the community from trash.

        The command takes the following parameters:

        communityUuid
        :   UUID of the community or subcommunity to be restored.

        Example:

        ```
        wsadmin>CommunitiesService.unDeleteCommunity("ea546678-94d7-4d 24-9f23-a8ae0fd8b824")
        unDeleteCommunity request processed
        
        ```

        **Note:** If the community you are restoring has subcommunities that are also in trash, only the parent community is restored. You must restore the subcommunities separately. If the community you are restoring is a subcommunity and its parent community is also in trash, the subcommunity is not restored. You must restore the parent community before any of its child subcommunities.


**Parent topic:**[Working with Community trash](../admin/c_admin_communities_trash.md)

