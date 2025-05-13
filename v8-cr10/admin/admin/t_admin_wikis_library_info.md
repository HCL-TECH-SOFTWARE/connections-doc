# Viewing Wikis library information {#seeinglibraryinformation .task}

Use the WikisLibraryService commands to find information about Wikis libraries. A library comprises the pages, attachments, and other data that make up a wiki.

To run administrative commands, you must use the wsadmin client. For more information, see [Starting the wsadmin client](t_admin_wsadmin_starting.md).

Many commands require an ID as an input parameter, including library IDs, user IDs, policy IDs, and file IDs. You can find an ID by using special commands. For example, when you run the WikisMemberService.getByEmail\(string email\) command, where you provide a user's email address as input, the output includes the user's ID. You can also find IDs by using feeds. For more information, see the IBM® Connections API documentation.

1.  Start the wsadmin client.

2.  Start the Wikis Jython script interpreter using the following command:

    ```
    execfile("wikisAdmin.py")
    ```

3.  Run the following commands to return information about libraries:

    WikisLibraryService.getById\(string libraryId\)
    :   Returns information about a single library specified by an ID. A library is the pages, attachments, and other data that make up a wiki. It includes all wiki page versions, but does not include metadata such as comments.

        Parameters:

        libraryId
        :   The library ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000. The following information is returned:

            -   id: The library ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.
            -   ownerUserId: The user ID of the library owner in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000..
            -   type: The type of library. The only valid value is `wiki`.
            -   label: A string of characters used to identify the library in a URL.
            -   title: The library's title.
            -   summary: A summary of library information.
            -   size: The total size of the library binary data.
            -   percentUsed: The percentage of the maximum allowable size used, according to the library's policy. Zero if not applicable.
            -   maximumSize: The maximum size \(in bytes\) the library's policy allows. Zero for unlimited.
            -   policyId: The ID of the policy that sets a maximum limit \(in bytes\) on the library's size, in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.
            -   lastUpdate: The last time a significant user-driven update occurred to the metadata.
            -   createDate: The library's creation date.
            -   externalInstanceId: The widget ID if the library is owned by a community.
            -   externalContainerId: The community ID if the library is owned by a community.
            -   themeName: The theme the community owner has selected in communities. Returned for community libraries only.
            -   orphan: The value is true if the library owner is no longer active. Returned for personal libraries only.
        For example:

        ```
        WikisLibraryService.getById("2d93497d-065a-4022ae25-a4b52598d11a")
        ```

    WikisLibraryService.browseWiki\(string sortOption, string sortAscending, int pageNumber, int itemsPerPage\)
    :   Returns a list of all wikis, with information about each wiki. The list includes wikis owned by communities, and wikis whose owners were removed from the user directory.

        Parameters:

        sortOption
        :   A string value that specifies how to sort the list. The default value is `title`, but you can use `lastUpdate`, `size`, `createDate`, or `quotaPercentage`.

        sortAscending
        :   A string value that specifies whether to sort the list in ascending alphabetical order. This depends on the sortOption value. If sortOption is title, then this value is `true`; if sortOption any other value, then this value is `false`.

        pageNumber
        :   The number of the page to display. For example, if you specify in the itemsPerPage parameter that each page will have 50 items, page 1 will contain items 1-50.

        itemsPerPage
        :   The maximum number of wikis to list per page. The default value is 20. The following information is returned:

            -   id: The library ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.
            -   ownerUserId: The user ID of the library owner in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000..
            -   type: The type of library. The only valid value is `wiki`.
            -   label: A string of characters used to identify the library in a URL.
            -   title: The library's title.
            -   summary: A summary of library information.
            -   size: The total size of the library binary data.
            -   percentUsed: The percentage of the maximum allowable size used, according to the library's policy. Zero if not applicable.
            -   maximumSize: The maximum size \(in bytes\) the library's policy allows. Zero for unlimited.
            -   policyId: The ID of the policy that sets a maximum limit \(in bytes\) on the library's size, in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.
            -   lastUpdate: The last time a significant user-driven update occurred to the metadata.
            -   createDate: The library's creation date.
            -   externalInstanceId: The widget ID if the library is owned by a community.
            -   externalContainerId: The community ID if the library is owned by a community.
            -   themeName: The theme the community owner has selected in communities. Returned for community libraries only.
            -   orphan: The value is true if the library owner is no longer active. Returned for personal libraries only.
        For example:

        ```
        WikisLibraryService.browseWiki("title", "true", 1, 25)
        ```

    WikisLibraryService.getWikiCount\(\)
    :   Returns the total number of wikis.

    WikisLibraryService.exportSyncedResourceInfo \(string fullpathForOutput, string type\)
    :   Returns a report of all of the communities that the Wikis application has interacted with. After a system crash you can compare the report to the latest metadata in the Communities database to help synchronize and update any missing data. See the topic *Comparing remote application data with the Communities database* for more information.

        Note that in clusters, when you run the command from the deployment manager the path and file are created on the server running Wikis. In clusters where multiple nodes are running Wikis, you are asked choose a server to connect to and run the command on, and then the path and file are created on that server.

        Parameters:

        fullPathforOutput
        :   The full path location where you want the report, and the report filename, as a string in quotes. The report is an XML file. Use forward slashes \("/"\) in the path, regardless of the operating system.

        type
        :   This is always the string value, `"community"` \(including quotes\). An error is returned if this is anything except `"community"`.

        For example:

        ```
        WikisLibraryService.exportSyncedResourceInfo("c:/connections/sync/community_output.xml", "community")
        ```


**Parent topic:**[Administering Wikis](../admin/c_admin_wikis_overview.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Comparing remote application data with the Communities database](../admin/t_admin_communities_sync_remote_apps.md)

