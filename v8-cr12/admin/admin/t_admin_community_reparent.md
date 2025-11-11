# Reparenting communities {#reparentingcommunities .task}

Use the reparenting commands to modify a community to become a subcommunity of another community. You can also modify a subcommunity to become a top-level community.

To use administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

Some communities might need to become subcommunities of other communities. Use the reparenting commands to make communities into subcommunities, or make subcommunities into top-level communities.

1.  To reparent communities, complete the following steps.
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

4.  Use the following commands to reparent communities or subcommunities:

    CommunitiesService.moveSubcommunityToCommunity\("subCommunityUuid"\)
    :   Modifies a subcommunity to become a top-level, stand-alone community.

        The command takes the following parameters:

        subCommunityUuid
        :   The UUID of the subcommunity to be made a top-level, stand-alone community.

        Example:

        ```
        wsadmin>CommunitiesService.moveSubcommunityToCommunity ("1f524616-a53b-48fb-8e26-ffa1b2ee045f")
        ```

        When the command completes successfully, it returns the following message:

        ```
        moveSubcommunityToCommunity request processed
        ```

        **Notes:** You can get the UUID for a community or subcommunity by taking one of the following actions:

        -   Using a browser, open the community or subcommunity that you want and copy the UUID from the URL.
        -   Run the CommunitiesService.fetchAllComm\(\) wsadmin command to fetch all communities and subcommunities on the server. Copy the UUID from the output.
        When you use moveSubcommunityToCommunity, the new top-level community retains the following characteristics of the original subcommunity:

        -   Original access level \(public, moderated, or restricted\)
        -   Membership list
        -   Community logo \(picture\), tags, and description
        -   Original "internal" state \(external, or internal\)
        -   Business Owner and Organization ID
        -   Community theme
        -   Original start page setting
        -   Any existing web addresses

            **Note:** The URL to access this community changes slightly because the parent handle no longer exists.

    CommunitiesService.moveCommunityToSubcommunity\("parentCommunityUuid", "communityToMoveUuid"\)
    :   Reparents a community to be the subcommunity of another community.

        The command takes the following parameters:

        parentCommunityUuid
        :   The UUID of the parent community.

        CommunityToMoveUuid
        :   The UUID of the existing community that becomes a child of the community that is specified in the parentCommunityUuid parameter.

        Example:

        ```
        wsadmin>CommunitiesService.moveCommunityToSubcommunity("1f524616-a53b-48fb-8e26-ffa1b2ee045f", 
        "1f524616-a53b-48fb-8e26-ffa4b2ee095f")
        ```

        The reparented subcommunity is modified as follows:

        -   The new subcommunity synchronizes to the new parent's "internal" state.
        -   The parent community Business Owner replaces the new subcommunity's Business Owner.
        -   The new subcommunity with existing web address is cleared.

            Any "Invited" users on the subcommunity that have not accepted or declined the invitation are removed. Click the **Invitations** tab on a community. You can see the invited users the Members page.

        When you use moveCommunityToSubommunity, the new subcommunity retains the following characteristics of the original top-level community:

        -   Start page setting.
        -   Community logo \(picture\), tags, and description.
        -   Community theme.
        Membership relationships between parent and subcommunity are as follows:

        -   Community owners in the parent are copied to the new subcommunity as owners.
        -   Subcommunity members and owners are copied to the new parent as members.
        **Note:** Using moveCommunityToSubcommunity generates an error if you attempt the following reparenting actions:

        -   Reparent a community that has subcommunities.
        -   Reparent a community that is already a subcommunity
    **Community access levels:** A subcommunity cannot be less restrictive than its parent. Therefore, when you run moveCommunityToSubcommunity, the access level of the community that is being moved to a subcommunity can be modified as follows:

    |Community A \(parent\)|Community B \(before it is made a subcommunity of A\)|Community B \(after it is made a subcommunity of A\)|
    |----------------------|-----------------------------------------------------|----------------------------------------------------|
    |Public|Public|Unchanged|
    |Public|Moderated|Unchanged|
    |Public|Restricted \(unlisted\)|Unchanged|
    |Public|Restricted \(listed\)|Unchanged|
    |Moderated|Public|Moderated|
    |Moderated|Moderated|Unchanged|
    |Moderated|Restricted \(unlisted\)|Unchanged|
    |Moderated|Restricted \(listed\)|Unchanged|
    |Restricted \(unlisted\)|Public|Restricted \(unlisted\)|
    |Restricted \(unlisted\)|Moderated|Restricted \(unlisted\)|
    |Restricted \(unlisted\)|Restricted \(unlisted\)|Unchanged|
    |Restricted \(unlisted\)|Restricted \(listed\)|Restricted \(unlisted\)|
    |Restricted \(listed\)|Public|Restricted \(unlisted\)|
    |Restricted \(listed\)|Moderated|Restricted \(unlisted\)|
    |Restricted \(listed\)|Restricted \(unlisted\)|Unchanged|
    |Restricted \(listed\)|Restricted \(listed\)|Unchanged|

    Restricted \(unlisted\) communities are restricted communities where the community owner has left **Let anyone in my organization see the community's title, description, tags, and owners** unchecked when creating the community.

    Restricted \(listed\) communities are restricted communities where the community owner has selected **Let anyone in my organization see the community's title, description, tags, and owners** when creating the community.


**Parent topic:**[Administering Communities](../admin/c_admin_communities_intro.md)

