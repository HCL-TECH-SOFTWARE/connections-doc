# Filtering community lists {#t_admin_communities_manage_lists .task}

Use the CommunitiesListService commands to filter the information in community lists and to generate smaller lists containing more specific information.

To use administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

1.  To filter community lists, perform the following steps.
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

4.  Use the following commands to filter the information in community lists and generate new lists.

    **Note:** The commands can also be used on application lists.

    CommunitiesListService.filterListByName\(List list, String filter\)
    :   Returns a new list containing only the communities and subcommunities whose names match the regular expression filter.

        For example:

        ```
        wsadmin>allComm=CommunitiesService.fetchAllComm()
        wsadmin>CommunitiesListService.filterListByName(allComm,"My Community Name")
        ```

        This example returns a list of all communities and subcommunities using the fetchAllComm command \(command is set to a variable that will be used in the next command\) and then filters the results to get the information for a particular community or subcommunity.

    CommunitiesListService.filterListByType\(List list, String filter\)
    :   Returns a new list containing only the communities and subcommunities whose type \(private, public, or publicInviteOnly\) matches the regular expression filter.

        For example:

        ```
        wsadmin>commByMember=CommunitiesService.fetchCommByMember("jane_smith@company.com")
        wsadmin>CommunitiesListService.filterListByType(commByMember,"publicInviteOnly")
        ```

        This example retrieves a list of all the communities and subcommunities for a particular user \(in this case Jane Smith\) and then filters that list to display all the user's communities and subcommunities that are publicInviteOnly. The fetch command is set to a variable that will be used in the listService command.

    CommunitiesListService.filterListById\(List list, String filter\)
    :   Returns a new list containing only the communities and subcommunities whose ID matches the regular expression filter.

        For example:

        ```
        wwsadmin>all=CommunitiesService.fetchAllComm()
        wsadmin>CommunitiesListService.filterListById(all, 
           "c6a2c680-5933-4efa-9a14-be1723445d30")
        ```

        This example returns a list of all the communities and subcommunities and then filters the results by ID to list only the communities and subcommunities where the ID matches the one specified.


**Parent topic:**[Administering Communities](../admin/c_admin_communities_intro.md)

