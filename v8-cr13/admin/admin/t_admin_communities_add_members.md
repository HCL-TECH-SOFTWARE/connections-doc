# Adding owners and members to a community {#t_admin_communities_add_members .task}

Use scripts that are accessed by using the wsadmin command line to add owners and members to existing communities. You can add individuals to a community only; you cannot add a group to a community. There is no limit on the number of members that you can add to a community.

To use administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details. The administrative commands for adding owners and members to a community do not require a server restart to take effect, and no file checkout is necessary.

**Note:** You can also use the following commands to add owners and members to subcommunities.

The config-admin Jython scripts that get and set properties use the implicit AdminConfig object available in IBM® WebSphere® Application Server Admin \(wsadmin\) to interact with the Communities server. If an error occurs when you are using the following MBean commands, you can determine what went wrong by examining the SystemOut.log file.

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

3.  Use the following commands to add members or owners to an existing community or subcommunity.

    CommunitiesService.addMembersToCommunityByEmail\(String communityUuid, Integer memberRole, List emailAddresses\)
    CommunitiesService.addMembersToCommunityByEmail\(String communityUuid, Integer memberRole, List emailAddresses, String orgId\)
    :   Adds members to an existing community or subcommunity.

        **Note:** When you use this command to add owners or members to a subcommunity, the users that you are adding must belong to the parent community.

        You cannot exceed the maximum number of members limit that is specified in the explicitMembershipEntityLimit property of the communities-config.xml file. See *Communities configuration properties*.

        You use this command in two steps. First, create a comma-separated list of users \(using their email addresses\) that you want to add to an existing community or subcommunity and assign this list to a variable. This variable is then used as input into the addMembersToCommunity command.

        memberRole. Valid settings are 0 \(member\) or 1 \(owner\). Do not enclose this setting in quotation marks.

        For example:

        ```
        wsadmin>threemembers=["alex_jones@example.com", "mary_smith@example.com", "paul_henderson@example.com"]
        wsadmin>CommunitiesService.addMembersToCommunityByEmail("5742c4c8-0010-4e6e-abdb-65015e8a22e1",0,threemembers)
        ```

        ```
        wsadmin>threemembers=["alex_jones@example.com", "mary_smith@example.com", "paul_henderson@example.com"]
        wsadmin>CommunitiesService.addMembersToCommunityByEmail("5742c4c8-0010-4e6e-abdb-65015e8a22e1",0,threemembers, "0000000043")
        ```

        **Note:** You could use the communityName parameter instead of communityUuid. However, this is not recommended because the command fails if more than one community has the same community name. If the community name that you provide is not unique, an error similar to the following displays:

        ```
        WASX7015E: Exception running command: 
         "CommunitiesService.addMembersToCommunityByEmail
         ("My community",0,threemembers)"; exception information:
         javax.management.RuntimeMBeanException
         java.lang.IllegalArgumentException: java.lang.IllegalArgumentException: 
         CLFRM0091E: Multiple communities found with name: My community
        ```

        When you see an error like the previous one, instead of entering the name of the community or subcommunity in the command, use the community UUID. For example:

        ```
        wsadmin>CommunitiesService.addMembersToCommunityByEmail("5742c4c8-0010-4e6e-abdb-65015e8a22e1", 0,threemembers)
        ```

    CommunitiesService.addMembersToCommunityByMemberUuid\(String communityUuid, Integer memberRole, List UUID of member\)
    CommunitiesService.addMembersToCommunityByMemberUuid\(String communityUuid, Integer memberRole, List UUID of member, String orgId\)
    :   Adds members to an existing community or subcommunity. Use this command when you want to add users to a community's membership list, but they don't have an email address. The users that you are adding must belong to the parent community in order for them to be added to the subcommunity.

        **Note:** The member's UUID is the external LDAP identifier for a specific user. Use one of the following commands to return the user's external ID for use in the previous command:

        -   CommunitiesMemberService.getMemberExtIdByEmail\("email"\)
        -   CommunitiesMemberService.getMemberExtIdByLogin\("login"\)
        You cannot exceed the maximum number of members limit that is specified in the explicitMembershipEntityLimit property of the community-config.xml file. See *Communities configuration properties*.

        You use this command in two steps. First, create a comma-separated list of users \(using their UUID, the external LDAP ID\) that you want to add to an existing community or subcommunity and assign this list to a variable. This variable is then used as input into the addMembersToCommunity command.

        memberRole: Valid settings are 0 \(member\) or 1 \(owner\). Do not enclose this setting in quotation marks.

        For example:

        ```
        wsadmin>onemember=["84b4897d-b4f8-4d95-9621-50bcaa2fd3ca"]
        wsadmin>CommunitiesService.addMembersToCommunityByMemberUuid("5742c4c8-0010-4e6e-abdb-65015e8a22e1",0,onemember)
        ```

        ```
        wsadmin>onemember=["84b4897d-b4f8-4d95-9621-50bcaa2fd3ca"]
        wsadmin>CommunitiesService.addMembersToCommunityByMemberUuid("5742c4c8-0010-4e6e-abdb-65015e8a22e1",0,onemember, "0000000043")
        ```

        The `onemember` parameter is the `extid(user)`.

        **Note:** You could use the communityName parameter instead of communityUuid. However, this is not recommended because the command fails if more than one community has the same community name. If the community name that you provide is not unique, an error similar to the following displays:

        ```
        WASX7015E: Exception running command: 
         "CommunitiesService.addMembersToCommunityByEmail
         ("My community",0,threemembers)"; exception information:
         javax.management.RuntimeMBeanException
         java.lang.IllegalArgumentException: java.lang.IllegalArgumentException: 
         CLFRM0091E: Multiple communities found with name: My community
        ```

        When you see an error like the previous one, instead of entering the name of the community or subcommunity in the command, enter the community UUID instead. For example:

        ```
        wsadmin>CommunitiesService.addMembersToCommunityByEmail("5742c4c8-0010-4e6e-abdb-65015e8a22e1", 0,threemembers)
        ```


**Parent topic:**[Managing membership in Communities](../admin/c_admin_communities_managing_membership.md)

**Related information**  


[Creating and populating communities](../admin/t_admin_communities_create_communities.md)

[Removing members from communities](../admin/t_admin_communities_remove_members.md)

[Communities configuration properties](../admin/r_admin_communities_config_props.md)

[Adding an alternate owner to Communities](../admin/t_admin_communities_add_alternate_owner.md)

