# Adding an alternate owner to Communities {#t_admin_communities_add_alternate_owner .task}

Use scripts accessed using the wsadmin command-line tool to designate an alternate owner for the communities and subcommunities owned by a specific user.

To use administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details. The administrative command for adding an alternate community owner does not require a server restart to take effect, and no file checkout is necessary.

If a community owner needs to transfer or share ownership of their communities and subcommunities, for example if they are going on sabbatical or leaving the organization, you can add another user as an alternate owner of those communities and subcommunities. When you assign an alternate owner to the communities and subcommunities owned by a particular user, you can choose to leave the existing owner in their role as owner, or remove them from the community and subcommunity membership.

1.  To add an alternate owner to the communities and subcommunities owned by a specific user, complete the following steps.
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

4.  Use the following command:

    CommunitiesService.addAlternateOwner\(String directoryUuid, String alternateDirectoryUuid, Boolean removeOriginal\)
    CommunitiesService.addAlternateOwner\(String directoryUuid, String alternateDirectoryUuid, Boolean removeOriginal, String orgId\)
    :   Adds the user with the specified alternateDirectoryUuid as an owner to every community and subcommunity owned by the user with the specified directoryUuid \(external ID\).

        This command takes the following parameters:

        directoryUuid
        :   A string that specifies the directory UUID \(external ID\) of an existing community or subcommunity owner.

        alternateDirectoryUuid
        :   A string that specifies the directory UUID \(external ID\) of the person who you want to add as the alternate owner.

        removeOriginal
        :   A Boolean value that determines whether the person specified using the directoryUuid \(external ID\) parameter is removed from the membership of their communities and subcommunities. When set to true, the user with the specified directoryUuid is removed from their community and subcommunity membership. When set to false, the user with the specified directoryUuid remains listed as an owner of their communities and subcommunities.

        orgId
        :   A string that identifies the organization to which the Community belongs.

        For example:

        ```
        CommunitiesService.addAlternateOwner
        ("193F1CE8-E10A-4B9A-B933-C8ECD6C072E4", 
        "EC8A89C0-F41D-102C-9B60-F225BC6C4AF4", "true")
        ```

        ```
        CommunitiesService.addAlternateOwner
        ("193F1CE8-E10A-4B9A-B933-C8ECD6C072E4", 
        "EC8A89C0-F41D-102C-9B60-F225BC6C4AF4", 
        "true", "0000000043")
        ```

        To obtain the value to use for the directoryUuid and alternateDirectoryUuid parameters, you can use the following command:

        ```
        CommunitiesMemberService.getMemberExtIdByEmail("email_address")
        ```

        In the following example, for any community \(or subcommunity\) where Paul Smith is an owner, user Alice Lee is added to the membership list with owner access, and Paul Smith is removed from the membership list:

        ```
        wsadmin>CommunitiesMemberService.getMemberExtIdByEmail
        ("paul_smith@example.com") 
        510b99c0-0123-1010-8989-f78755f7e0ed
        wsadmin>
        wsadmin>CommunitiesMemberService.getMemberExtIdByEmail
        ("alice_lee@example.com")
        510b99c0-0101-102e-8934-f78755f7e0ed
        wsadmin>
        wsadmin>CommunitiesService.addAlternateOwner
        ("510b99c0-0123-1010-8989-f78755f7e0ed",
        "510b99c0-0101-102e-8934-f78755f7e0ed", "true")
        ```


**Parent topic:**[Managing membership in Communities](../admin/c_admin_communities_managing_membership.md)

**Related information**  


[Removing members from communities](../admin/t_admin_communities_remove_members.md)

[Adding owners and members to a community](../admin/t_admin_communities_add_members.md)

