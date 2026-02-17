# Removing members from communities {#t_admin_communities_remove_members .task}

Use administrative commands to remove specified users from the membership of their communities and subcommunities.

To use administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details. The administrative commands for removing members from communities and subcommunities do not require a server restart to take effect and no file check-out is necessary.

When employees leave your organization or no longer require access to communities for some other reason, you can remove them from the membership of communities and subcommunities. You can remove specified community members based on their email address or name.

1.  To remove a specified user from the membership of a community or subcommunity, complete the following steps.
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

4.  Use one of the following commands:

    CommunitiesService.removeAllMembershipByDirectoryUuid\(String "directoryUuid"\)
    CommunitiesService.removeAllMembershipByDirectoryUuid\(String "directoryUuid", String "orgId"\)
    :   Removes the specified user from any communities and subcommunities to which they belong.

        The command takes the following parameters:

        directoryUuid
        :   A string that specifies the directory UUID \(external ID\) of the user whose membership you want to remove.

        orgId
        :   A string that specifies the organization of the user whose membership you want to remove.

        If the user is the last owner of a community or subcommunity, they are not removed, and the community or subcommunity is included in the return value for this call. The command returns a vector of hash maps of all the communities and subcommunities where the user was not removed because they are the last owner.

        To obtain the directory UUID to use as input, use one of the following commands. Both commands return the user's external ID.

        -   CommunitiesMemberService.getMemberExtIdByEmail\("email"\)
        -   CommunitiesMemberService.getMemberExtIdByLogin\("login"\)
        For example:

        ```
        wsadmin>CommunitiesService.removeAllMembershipByDirectoryUuid("91b3897d-b4f8-4d05-3621-50bcaa22d300")
        ```

        ```
        wsadmin>CommunitiesService.removeAllMembershipByDirectoryUuid("91b3897d-b4f8-4d05-3621-50bcaa22d300", "0000000042")
        ```

    CommunitiesService.removeMembersFromCommunityByEmail\(String "communityName", String "variable containing list of email addresses"\)
    CommunitiesService.removeMembersFromCommunityByEmail\(String "communityName", String "variable containing list of email addresses", String "org Id"\)
    :   Removes members from an existing community or subcommunity. Members are identified in a list by their email addresses.

        You can remove both owners and members, but you cannot remove the last active owner. You can remove members from a subcommunity, but you cannot remove owners from a subcommunity.

        If an email address in the list does not match any member email address, then the command fails and none of the members are removed from the community.

        You use this command in two steps. First, create a comma-separated list of users \(by using their email addresses\) who you want to remove from an existing community or sub community. Then, assign this list to a variable.

        For example:

        ```
        wsadmin>threemembers=["alex_jones@example.com", "mary_smith@example.com", "paul_henderson@example.com"]
        ```

        Then use this variable as input into the removeMembersFromCommunityByEmail command as the "variable containing list of email addresses" parameter.

        For example:

        ```
        wsadmin>CommunitiesService.removeMembersFromCommunityByEmail("Ski Club Community",threemembers)
        ```

        ```
        wsadmin>CommunitiesService.removeMembersFromCommunityByEmail("Ski Club Community",threemembers, "0000000042")
        ```

        The communityName parameter is case-sensitive so be sure to specify the name of the community or subcommunity exactly.

    CommunitiesService.removeMembersFromCommunityByMemberUuid\(String "communityName", String "variable containing list of UUIDs"\)
    CommunitiesService.removeMembersFromCommunityByMemberUuid\(String " communityName", String "variable containing list of UUIDs", String "orgId"\)
    :   Removes members from an existing community or subcommunity. Members are identified in a list by their external ID. Use this command when you want to remove users from a community's membership list, but they do not have an email address.

        You can remove both owners and members, but you cannot remove the last active owner. You can remove members from a subcommunity, but you cannot remove owners from a subcommunity.

        If a UUID in the list does not match any member UUID in the community, then the command fails and none of the members in the list are removed from the community.

        To obtain the directory UUID to use as input for this command, use one of the following commands. Both commands return the user's external ID.

        -   CommunitiesMemberService.getMemberExtIdByEmail\("email"\)
        -   CommunitiesMemberService.getMemberExtIdByLogin\("login"\)
        You use this command in two steps. First, create a comma-separated list of users \(by using their UUID, the external LDAP ID\) who you want to remove from an existing community or sub community.

        For example:

        ```
        wsadmin>twomembers=["84b4897d-b4f8-4d95-9621-50bcaa2fd3ca",
            "84b4897d-b4f8-4d95-9621-0bcaa2fd3ca"]
        ```

        Then use this variable as input in to the removeMembersFromCommunityByMemberUuid command as the "variable containing list of Quids" parameter.

        For example:

        ```
        wsadmin>CommunitiesService.removeMembersFromCommunityByMemberUuid("Ski Club Community", twomembers)
        ```

        ```
        wsadmin>CommunitiesService.removeMembersFromCommunityByMemberUuid("Ski Club Community", twomembers, "0000000042")
        ```

        The communityName parameter is case-sensitive so be sure to specify the name of the community or subcommunity exactly.

    CommunitiesService.removeInactiveUsers\(String "Uuid", boolean skipLastModBump\)
    :   Removes all inactive members from the specified community or subcommunity.

        The command takes the following parameters:

        Uuid
        :   A string that specifies the UUID of the community from which you want to remove inactive users.

        skipLastModBump
        :   An optional integer that determines whether the community's last modified date, time, and person who last modified it is updated. Set skipLastModBump to 1 if you do not want to update the community's last modified date, time, and person who last modified it. Otherwise, do not specify bSkipCommunityLastModBump or set it to 0 to update the community's last modified date and time. The catalog also shows: **Administrative update by <xxx\>**.

        The command removes both owners and members. If all owners are inactive, only members are removed. Also, the command does not remove an inactive owner in a subcommunity if that person is also an owner in the community's parent.

        If the UUID specified does not match any community, then the command fails and no inactive members are removed.

        For example:

        ```
        wsadmin>CommunitiesService.removeInactiveUsers("84b4897d-b4f8-4d95-9621-50bcaa2fd4ca",1)
        ```

        ```
        wsadmin>CommunitiesService.removeInactiveUsers("84b4897d-b4f8-4d95-9621-50bcaa2fd4ca")
        ```


**Parent topic:**[Managing membership in Communities](../admin/c_admin_communities_managing_membership.md)

**Related information**  


[Adding owners and members to a community](../admin/t_admin_communities_add_members.md)

[Adding an alternate owner to Communities](../admin/t_admin_communities_add_alternate_owner.md)

[Managing users](../admin/c_admin_common_user_life_cycle_over.md)

