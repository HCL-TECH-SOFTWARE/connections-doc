# Retrieving and listing community data {#t_admin_communities_generate_hashmaps .task}

The community fetch commands return a Java™ vector of Java hash maps. No file checkout or server restart is required when using these commands.

To use administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

Java hash maps provide a useful mechanism for storing community data so that it can be quickly retrieved. You can use the community fetch commands to return a vector of hash maps that contain all the data for communities. The fetch commands return a list of communities. You then pass the lists to print commands to print data for specific communities.

**Note:** The following commands listed can also be used to retrieve information about subcommunities.

1.  To retrieve and list community data, complete the following steps.
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

4.  Use the following commands to return a list of communities and subcommunities.

    The commands display the following information about each community:

    -   Display name and directory UUID of the user who last modified the community
    -   Date and time when the community was created
    -   List of tags associated with the community
    -   Community visibility type \(public, publicinviteonly, or private\)
    -   Community name
    -   Total number of members in the community \(including owners and members\)
    -   Date and time that the community was last modified
    -   Community description
    -   Display name and directory UUID of the user who created the community
    -   Organization to which the Community belongs
    The following sample output shows the type of information that is returned from these commands. This information is for one community:

    ```
    {lastModBy=[John Smith, 76982F24-BCC0-4D11-0083-242F9876C0BC], created=10/5/10 
    9:59:41 PM EDT, tags=[tag1, tag2, tag3], type=public, name=Marketing Community 
    uuid=3e5ecf96-1cf8-4da4-b8bb-87d61e80299b, memberSize=12, lastMod=10/5/10 
    9:59:41 PM EDT, description=Community used by Marketing folks for brain storming 
    strategies for new products., createdBy=[John Smith, 
    76982F24-BCC0-4D11-0083-242F9876C0BC]}
    ```

    CommunitiesService.fetchAllComm\(\)
    :   Returns a vector of hash maps of all communities and subcommunities. There is no way to distinguish from the information returned whether the object is a community or subcommunity. Do not run CommunitiesService.fetchAllComm\(\) on large deployments because it loads all communities into memory at once. Instead, run CommunitiesService.fetchBatchComm\(\).

    CommunitiesService.fetchCommById\(string communityUUID\)
    :   Returns the community or subcommunity with the specified UUID.

        You can obtain the UUID for a community or subcommunity by doing one of the following:

        -   Using a browser, open the community or subcommunity that you want and copy the UUID from the URL.
        -   Run the CommunitiesService.fetchAllComm\(\) wsadmin command to fetch all communities and subcommunities on the server. Copy the UUID from the output.
        For example:

        ```
        wsadmin>CommunitiesService.fetchCommById("59d8e5a7-ba0e-488f-8bcd-1f79a994e419")
        [{createdBy=[Andy Jones, 2BC32FEF-E736-4C81-986C-30780C5EF8C3], lastMod=6/18/09
        3:09:02 PM EDT, description= Community of developers working on JAVA projects 
        in our company.  This is a community to share ideas., name=JAVA Developers
        community, uuid=59d8e5a7-ba0e-488f-8bcd-1f79a994e419, memberSize=6,
        type=publicInviteOnly,tags=[developers, java], created=6/18/09 3:08:48 PM EDT,
        lastModBy=[Andy Jones, 2BC32FEF-E736-4C81-986C-30780C5EF8C3]}]
        wsadmin>
        ```

    CommunitiesService.fetchCommByMemberEmail\(String email\)
    CommunitiesService.fetchCommByMemberEmail\(String email, String orgId\)
    :   Returns all the communities and subcommunities that the user of the specified email address or organization is a member of. There is no way to distinguish from the information returned whether the object is a community or subcommunity.

        For example:

        ```
        CommunitiesService.fetchCommByMember("john_doe@company.com")
        ```

        ```
        CommunitiesService.fetchCommByMember("john_doe@company.com", "0000000042")
        ```

    CommunitiesService.fetchCommByMemberUuid\(String uuid\)
    CommunitiesService.fetchCommByMemberUuid\(String uuid, String orgId\)
    :   Returns all the communities and subcommunities that the user with the specified UUID or the specified organization is a member of. There is no way to distinguish from the information returned whether the object is a community or subcommunity.

        For example:

        ```
        CommunitiesService.fetchCommByMemberUuid("193F1CE8-E10A-4B9A-B933-C8ECD6C072E4")
        ```

        ```
        CommunitiesService.fetchCommByMemberUuid("193F1CE8-E10A-4B9A-B933-C8ECD6C072E4", "0000000042")
        ```

        **Note:** The Member's UUID is the External LDAP identifier for a specific user. Use one of the following commands to return the user's external ID for use in this command.

        -   CommunitiesMemberService.getMemberExtIdByEmail\("email"\)
        -   CommunitiesMemberService.getMemberExtIdByLogin\("login"\)
    CommunitiesService.fetchCommByName\(String name\)
    CommunitiesService.fetchCommByName\(String name, String orgId\)
    :   Returns the community or subcommunity with the specified name in the specified organization.

        **Note:** There is a maximum of one community in the list, but that list can be used in the other methods that use a list input. If no match is found, the list will be empty.

        For example:

        ```
        wsadmin>CommunitiesService.fetchCommByName("Test Community")
        ```

        ```
        wsadmin>CommunitiesService.fetchCommByName("Test Community" "0000000042")
        ```

        If the name of the community or subcommunity that you enter in this command is not unique, the command fails with an error. If the command fails, use the following command instead:

        ```
        CommunitiesService.fetchCommById(string communityUUID)
        ```

    CommunitiesService.fetchMember\(List list\)
    :   Returns the input list of communities or subcommunities with an additional property for each community that is the member list for that community.

        This command is run in two steps. First, generate a list of data to input into the fetchMember command and assign the list to a variable. The variable is then used as input into the fetchMember command.

        For example:

        ```
        wsadmin>allComm=CommunitiesService.fetchCommByName("Test Community")
        wsadmin>CommunitiesService.fetchMember(allComm)
        ```

    CommunitiesService.fetchReference\(List list\)
    :   Adds references \(feeds and bookmarks\) to communities or subcommunities in the list passed into this command and returns a new list with references.

        This command is run in two steps. First, use the fetchCommByName command to gather the list of communities and assign the list to a variable. The variable is then used as input into the fetchReference command.

        For example:

        ```
        wsadmin>allComm=CommunitiesService.fetchCommByName("Test Community")
        wsadmin>CommunitiesService.fetchReference(allComm)
        ```

        The results that are returned include any feeds or bookmarks for a community or subcommunity. The name that the user enters when creating the feed or bookmark is also displayed as part of the reference information. For example: `reference=[[Cooking, http://www.cuisineathome.com]]`

        Here are sample results from running the command:

        ```
        {createdBy=alex_jones@MyCompany.com, lastMod=2/22/08 
        8:43:48 AM EST, description=Community with one bookmark one feed, 
        name=Jones Community, uuid=3395f15e-bde7-4151-80ed-ed538d12d00e, 
        memberSize=2, reference=[[CNN, http://www.cnn.com], [Ghirardelli 
        Chocolate, http://www.ghirardelli.com]], type=publicInviteOnly, 
        tags=[chocolate], created=2/22/08 8:42:53 AM EST, lastModBy=
        bsmith@MyCompany.com}
        ```

5.  Use these commands to print the information that is generated by using the fetch commands.

    CommunitiesService.listComm\(List list\)
    :   Prints the information associated with the communities or subcommunities in the list input to the wsadmin command window in an easy-to-read format. The data printed includes community name, UUID, type, who created it, creation date, last person who modified it, date of last modification, membership list size, and description. If the list includes members, then this command also prints the membership list. If the list includes references, the command also prints the reference information.

        This command is run in two steps. First, generate the data to input into the listComm command and assign the list to a variable. The variable is then used as input into the listComm command.

        For example:

        ```
        wsadmin>byMember=CommunitiesService.fetchCommByMember("jane_doe@company.com")
        wsadmin>CommunitiesService.listComm(byMember)
        
        ```

    CommunitiesService.listCommToFile\(List list, String filename\)
    :   Prints the information associated with the communities or subcommunities in the list input to the specified file using an easy-to-read format. The directory to which the file is to be output must already exist. The data printed includes community name, UUID, type, who created it, creation date, last person who modified it, date of last modification, membership list size, and description. If the list includes members, then this command also prints the membership list. If the list includes references, the command also prints the reference information.

        This command is run in two steps. First, generate the data to input into the listCommToFile command and assign the list to a variable. The variable is then used as input into the listCommToFile command.

        For example:

        ```
        wsadmin>byMember=CommunitiesService.fetchCommByMember("jane_doe@company.com")
        wsadmin>CommunitiesService.listCommToFile(bymember,"/temp/CommMembers.txt")
        
        ```

6.  Use this command to iterate through a list of UUIDs for all communities.

    CommunitiesService.fetchBatchComm\(batchSize, priorLastCommunityId\)
    :   Returns a portion of an ordered list of UUIDs for all communities. The command does not return any details about the communities. It returns only the UUIDs.

        The command takes the following parameters:

        batchSize
        :   Uses an integer to indicate how many communities you want returned.

        priorLastCommunityId
        :   Enter the UUID of the last community enclosed by double quotation marks. If you don't have a community id to enter, use either None or "". If you enter `CommunitiesService.fetchBatchComm(5, None)`, the command returns the GUID for the first five communities.

        The following example fetches a batch of two communities.  None indicates that it starts with the first community.

        ```
        wsadmin>CommunitiesService.fetchBatchComm(2, None)
        fetchBatchComm request processed
        [3302c2fa-e16f-4a52-8685-b56c1435d742, 
        3e457e81-c9d9-4a20-a71a-6cc336673fab]
        ```


**Parent topic:**[Administering Communities](../admin/c_admin_communities_intro.md)

