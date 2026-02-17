# Managing communities when all owners are inactive {#t_admin_communities_inactive_owners .task}

Use scripts accessed using the wsadmin command-line tool to add more owners to communities when all of the existing owners are inactive. You can only add individual owners to a community; you cannot add an owner group to a community.

To use administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details. The administrative commands for adding more owners to a community do not require a server restart to take effect, and no file checkout is necessary.

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

3.  Use the following commands to add more owners to a community when all existing owners are inactive.

    CommunitiesService.addMembersToCommunityByEmail\(String communityName, Integer memberRole, List emailAddresses\)
    :   Adds owners to an existing community.

        You use this command in two steps. First, create a comma-separated list of users \(using their email addresses\) that you want to add to an existing community and assign this list to a variable. This variable is then used as input into the addMembersToCommunity command.

        Note that communityName is a string and must be enclosed in quotation marks \("\). This parameter is case-sensitive, so be sure to specify the name of the community exactly.

        memberRole. Valid settings are 0 \(member\) or 1 \(owner\). You must set this to 1 \(owner\) to add more owners. Do not enclose this setting in quotation marks.

        For example:

        ```
        wsadmin>threeowners=["alex_jones@example.com", "mary_smith@example.com", "paul_henderson@example.com"]
        wsadmin>CommunitiesService.addMembersToCommunityByEmail("Ski Club Community",1,threeowners)
        ```

        **Note:** When you use this command, if the community name that you provide as input to the command is not unique, an error similar to the following displays:

        ```
        WASX7015E: Exception running command: 
          "CommunitiesService.addMembersToCommunityByEmail
          ("My community",1,threeowners)"; exception information:
          javax.management.RuntimeMBeanException
        java.lang.IllegalArgumentException: java.lang.IllegalArgumentException: 
          CLFRM0091E: Multiple communities found with name: My community
        ```

        When you see an error like the previous one, instead of entering the name of the community in the command, you must enter the UUID instead. For example:

        ```
        wsadmin>CommunitiesService.addMembersToCommunityByEmail("5742c4c8-0010-4e6e-abdb-65015e8a22e1", 1,threeowners)
        ```

        You can obtain the UUID for a community by doing one of the following:

        -   Using a browser, open the community that you want and copy the UUID from the URL.
        -   Run the CommunitiesService.fetchAllComm\(\) wsadmin command to fetch all communities and subcommunities on the server. Copy the UUID from the output.
    CommunitiesService.addMembersToCommunityByEmail\(String communityName, Integer memberRole, List emailAddresses, String orgId\)
    :   Adds owners to an existing community.

        You use this command in two steps. First, create a comma-separated list of users \(using their email addresses\) that you want to add to an existing community and assign this list to a variable. This variable is then used as input into the addMembersToCommunity command.

        Note that communityName is a string and must be enclosed in quotation marks \("\). This parameter is case-sensitive, so be sure to specify the name of the community exactly.

        memberRole. Valid settings are 0 \(member\) or 1 \(owner\). You must set this to 1 \(owner\) to add more owners. Do not enclose this setting in quotation marks.

        For example:

        ```
        wsadmin>threeowners=["alex_jones@example.com", "mary_smith@example.com", "paul_henderson@example.com"]
        wsadmin>CommunitiesService.addMembersToCommunityByEmail("Ski Club Community",1,threeowners, "0000000043")
        ```

        **Note:** When you use this command, if the community name that you provide as input to the command is not unique, an error similar to the following displays:

        ```
        WASX7015E: Exception running command: 
           "CommunitiesService.addMembersToCommunityByEmail
           ("My community",1,threeowners)"; exception information:
           javax.management.RuntimeMBeanException
           java.lang.IllegalArgumentException: java.lang.IllegalArgumentException:
           CLFRM0091E: Multiple communities found with name: My community
        ```

        When you see an error like the previous one, instead of entering the name of the community in the command, you must enter the UUID instead. For example:

        ```
        wsadmin>CommunitiesService.addMembersToCommunityByEmail("5742c4c8-0010-4e6e-abdb-65015e8a22e1", 1,threeowners, "0000000043")
        ```

    CommunitiesService.addMembersToCommunityByMemberUuid\(String communityName, Integer memberRole, List UUID of member\)
    :   Adds members to an existing community. Use this command when you want to add owners to a community's membership list, but they don't have an email address.

        **Note:** The member's UUID is the external LDAP identifier for a specific user. Use one of the following commands to return the user's external ID for use in the previous command:

        -   CommunitiesMemberService.getMemberExtIdByEmail\("email"\)
        -   CommunitiesMemberService.getMemberExtIdByLogin\("login"\)
        You use this command in two steps. First, create a comma-separated list of users \(using their UUID, the external LDAP ID\) that you want to add to an existing community and assign this list to a variable. This variable is then used as input into the addMembersToCommunity command.

        Note that communityName is a string and must be enclosed in quotation marks \("\). This parameter is case-sensitive, so be sure to specify the name of the community or subcommunity exactly.

        memberRole: Valid settings are 0 \(member\) or 1 \(owner\). You must set this to 1 \(owner\) to add more owners. Do not enclose this setting in quotation marks.

        For example:

        ```
        wsadmin>oneowner=["84b4897d-b4f8-4d95-9621-50bcaa2fd3ca"]
        wsadmin>CommunitiesService.addMembersToCommunityByMemberUuid("Ski Club Community",1,oneowner)
        ```

        **Note:** When you use this command, if you get an error telling you that the community name is not unique, instead of entering the name of the community in the command input, enter the UUID instead.

    CommunitiesService.addMembersToCommunityByMemberUuid\(String communityName, Integer memberRole, List UUID of member, String orgId\)
    :   Adds members to an existing community. Use this command when you want to add owners to a community's membership list, but they don't have an email address.

        **Note:** The member's UUID is the external LDAP identifier for a specific user. Use one of the following commands to return the user's external ID for use in the previous command:

        -   CommunitiesMemberService.getMemberExtIdByEmail\("email"\)
        -   CommunitiesMemberService.getMemberExtIdByLogin\("login"\)
        You use this command in two steps. First, create a comma-separated list of users \(using their UUID, the external LDAP ID\) that you want to add to an existing community and assign this list to a variable. This variable is then used as input into the addMembersToCommunity command.

        Note that communityName is a string and must be enclosed in quotation marks \("\). This parameter is case-sensitive, so be sure to specify the name of the community or subcommunity exactly.

        memberRole: Valid settings are 0 \(member\) or 1 \(owner\). You must set this to 1 \(owner\) to add more owners. Do not enclose this setting in quotation marks.

        For example:

        ```
        wsadmin>oneowner=["84b4897d-b4f8-4d95-9621-50bcaa2fd3ca"]
        wsadmin>CommunitiesService.addMembersToCommunityByMemberUuid("Ski Club Community",1,oneowner)
        ```

        **Note:** When you use this command, if you get an error telling you that the community name is not unique, instead of entering the name of the community in the command input, enter the UUID instead.


**Parent topic:**[Managing membership in Communities](../admin/c_admin_communities_managing_membership.md)

