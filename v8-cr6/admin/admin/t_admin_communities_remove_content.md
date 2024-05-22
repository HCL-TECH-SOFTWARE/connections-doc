# Removing unwanted or inappropriate content {#t_admin_communities_remove_content .task}

Use administrative commands to update or remove inappropriate information stored in the Communities database.

To use administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

**Note:** The following commands can also be used to remove unwanted or inappropriate content from subcommunities.

You can edit basic community information using wsadmin commands. For example, you can change a community's name, update a community's description, and remove tags or bookmarks from a community.

The following commands can only be used to manage community content. To remove data from the applications that can be integrated with Communities, such as Activities, Blogs, Files, and Wikis, you need to refer to the application documentation for each specific application. See the links at the end of this topic for more information.

**Note:** When you use the commands, if the community name that you provide as input to the command is not unique, an error similar to the following displays:

```
WASX7015E: Exception running command: "CommunitiesService.updateCommunityDescription("My community", "updated by wsadmin cmd")"; exception information:
 javax.management.RuntimeMBeanException
java.lang.IllegalArgumentException: java.lang.IllegalArgumentException: CLFRM0091E: Multiple communities found with name: My community
```

When you see an error like this, instead of entering the name of the community in the command, you must enter the UUID of the community instead. For example:

```
wsadmin>CommunitiesService.updateCommunityDescription("5742c4c8-0010-4e6e-abdb-65015e8a22e1", "updated first by wsadmin cmd")
```

You can obtain the UUID for a community or subcommunity by doing one of the following:

-   Using a browser, open the community or subcommunity that you want and copy the UUID from the URL.
-   Run the CommunitiesService.fetchAllComm\(\) wsadmin command to fetch all communities and subcommunities on the server. Copy the UUID from the output.

1.  To control community content using Communities administrative commands, complete the following steps.
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

4.  Use the following commands to make changes to content in various fields of a community or subcommunity to which you do not have owner access. You can use the commands to remove unwanted or inappropriate content.

    CommunitiesService.updateCommunityName\(String communityName, String newName\)
    :   Allows you to update an existing community or subcommunity name where:

        -   communityName refers to the existing community or subcommunity name, which must be specified exactly.
        -   newName is the new name of the community or subcommunity.
        Both communityName and newName must be enclosed in double quotation marks \("\).

        For example:

        ```
        CommunitiesService.updateCommunityName("JDs Community", "JDs New Name")
        ```

        **Note:** When you use this command, if you get an error telling you that the community or subcommunity name is not unique, enter the UUID instead.

        You can obtain the UUID for a community or subcommunity by doing one of the following:

        -   Using a browser, open the community or subcommunity that you want and copy the UUID from the URL.
        -   Run the CommunitiesService.fetchAllComm\(\) wsadmin command to fetch all communities and subcommunities on the server. Copy the UUID from the output.
    CommunitiesService.updateCommunityDescription\(String communityName, String newDescription\)
    :   Allows you to update \(overwrite\) the description field in an existing community or subcommunity. Any existing description is overwritten by the new text that you enter into this command.

        Both communityName and newDescription must be enclosed in double quotation marks \("\).

        For example:

        ```
        CommunitiesService.updateCommunityDescription("Ski Community", 
        "The purpose of this community is to bring together 
        people interested in skiing.")
        ```

    CommunitiesService.removeReferencesByUri\(String communityName, List referenceURIs\)
    :   Allows you to remove all references to one or more existing bookmarks \(URIs\) from a specified community or subcommunity.

        The command requires a two-step process: First, create a comma-separated list of the bookmarks \(URIs\) that you want to remove. These URIs are saved to a variable and this variable is used as input for the removeReferencesByUri command.

        Because the URIs are specified as a list, each URI must be enclosed in double quotation marks and separated by commas. All URIs must be enclosed within brackets. The URI that is listed must match exactly the URI that is saved in the community or subcommunity, otherwise the command fails.

        The communityName parameter is a string and must be enclosed in double quotation marks \("\).

        For example:

        ```
        wsadmin>delete=["http://valid1.url.com", "http://valid2.url.com", "http://valid3.url.com"]
        wsadmin>CommunitiesService.removeReferencesByUri("Ski Club Community",delete)
        ```

    CommunitiesService.removeTagsFromCommunity\(String communityName, List tagNames\)
    :   Allows you to remove tags from an existing community or subcommunity. This command is a two-step process. First, create a comma-separated list of the tags that you want to remove. This list of tags is saved to a variable and the variable is used as input for the removeTagsFromCommunity command.

        **Note:** You can remove tags on a community or subcommunity, but you cannot remove tags associated with bookmarks or feeds within a community.

        Because the tags are specified as a list, each tag must be enclosed in double quotation marks and separated by commas. All tags must be enclosed within brackets.

        The communityName parameter is a string and must be enclosed in double quotation marks \("\).

        For example:

        ```
        wsadmin>tags=["snowboard", "mountain"]
        wsadmin>CommunitiesService.removeTagsFromCommunity("Ski Club Community", tags)
        ```

    CommunitiesService.removeWidgetsByWidgetDefIdForAllComm\(String widgetDefId\)
    :   Allows you to remove the specified widget from all communities and subcommunities. widgetDefId corresponds to the defId attribute on <widgetDef\> elements in widgets-config.xml.

        **Note:** Use this command with caution, it can delete a lot of data for many widgets. Backup your databases before running.

        widgetDefId is a string and must be enclosed in double quotation marks \("\).

        For example:

        ```
        
        wsadmin>CommunitiesService.removeWidgetsByWidgetDefIdForAllComm("Blog")
        ```

    CommunitiesService.removeAllWidgetsByWidgetDefId\(String communityUuid, String widgetDefId\)
    :   Allows you to remove all instances of the specified widget from the specified community. widgetDefId corresponds to the defId attribute on <widgetDef\> elements in widgets-config.xml.

        Both communityUuid and widgetDefId must be enclosed in double quotation marks \("\).

        For example:

        ```
        
        wsadmin>CommunitiesService.removeAllWidgetsByWidgetDefId("c9042339-0019-48da-9df4-de9885665daa","Library")
        ```


**Parent topic:**[Managing community content](../admin/c_admin_communities_control_content.md)

**Related information**  


[Deleting user files from the system](../admin/t_admin_files_delete_user_data.md)

[Deleting wikis from the system](../admin/t_admin_wikis_delete_user_data.md)

[Administering Blogs users](../admin/t_admin_blogs_users.md)

[Deleting activities](../admin/t_admin_act_soft_delete.md)

