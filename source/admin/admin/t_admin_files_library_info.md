# Seeing Files library information {#seeinglibraryinformation .task}

Use FilesLibraryService commands to see information about libraries, such as its owner, type, and size. A library is a set of files owned by a person or community and stored in the database.

To use administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

1.  Start the wsadmin client.

2.  Start the Files Jython script interpreter using the following command:

    ```
    execfile("filesAdmin.py")
    ```

3.  Run the following commands to return information about libraries:

    FilesLibraryService.getById\(string libraryId\)
    :   Returns information about a single library specified by an id. A library is a set of files owned by a person or community. It includes all versions of the files, but does not include metadata such as comments.

        Parameters:

        libraryId
        :   The library id in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000. The following information is returned:

            -   id: The library id in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.
            -   ownerUserId: The user id of the library owner in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.
            -   type: The type of library, for example, `personal`, `community`, or `system`.
            -   label: A string of characters used to identify the library in a URL.
            -   title: The library's title.
            -   summary: A summary of library information.
            -   size: The total size of the library binary data.
            -   percentUsed: The percentage of the maximum allowable size used, according to the library's policy. Zero if not applicable.
            -   maximumSize: The maximum size \(in bytes\) the library's policy allows. Zero for unlimited.
            -   policyId: The id of the policy that sets a maximum limit \(in bytes\) on the library's size, in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.
            -   lastUpdate: The last time a significant user-driven update occurred to the metadata.
            -   createDate: The library's creation date.
            -   externalInstanceId: The widget id if the library is owned by a community.
            -   externalContainerId: The community id if the library is owned by a community.
            -   themeName: The theme the community owner has selected in communities. Returned for community libraries only.
            -   orphan: The value is true if the library owner is no longer active. Returned for personal libraries only.
        For example:

        ```
        FilesLibraryService.getById("2d93497d-065a-4022ae25-a4b52598d11a")
        ```

    FilesLibraryService.getByExternalContainerId\(string community\_id\)
    :   Returns information about the community libraries available in the named Community.

        Parameters:

        community\_id
        :   The community id in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.

        For example:

        ```
        FilesLibraryService.getByExternalContainerId("003456bc-078d-e990-0450-x12345678900")
        ```

    FilesLibraryService.getPersonalByOwnerId\(string ownerUserId\)
    :   Returns information about the personal library of a specified owner. A personal library is a set of files owned by one person.

        Parameters:

        ownerId
        :   The user ID of the library owner, in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000. You can use FilesMemberService commands to find owner IDs. The following information is returned:

            -   id: The library id in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.
            -   ownerUserId: The user ID of the library owner in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.
            -   type: The type of library, for example, `personal`, `community`, or `system`.
            -   label: A string of characters used to identify the library in a URL.
            -   title: The library's title.
            -   summary: A summary of library information.
            -   size: The total size of the library binary data.
            -   percentUsed: The percentage of the maximum allowable size used, according to the library's policy. Zero if not applicable.
            -   maximumSize: The maximum size \(in bytes\) the library's policy allows. Zero for unlimited.
            -   policyId: The id of the policy that sets a maximum limit \(in bytes\) on the library's size, in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.
            -   lastUpdate: The last time a significant user-driven update occurred to the metadata.
            -   createDate: The library's creation date.
            -   externalInstanceId: The widget id if the library is owned by a community.
            -   externalContainerId: The community id if the library is owned by a community.
            -   orphan: The value is true if the library owner is no longer active. Returned for personal libraries only.
        For example:

        ```
        FilesLibraryService.getPersonalByOwnerId("2d93497d-065a-4022ae25-a4b52598d11a")
        ```

    FilesLibraryService.browsePersonal\(string sortOption, string sortAscending, int pageNumber, int itemsPerPage\)
    :   Returns a list of personal libraries, with information about each library. A personal library is a set of files owned by one person. The list includes libraries whose owners were removed from the user directory. All parameters have default values.

        Parameters:

        sortOption
        :   A string value that specifies how to sort the list. The default value is `title`, but you can use `lastUpdate`, `size`, `createDate`, or `quotaPercentage`.

        sortAscending
        :   A string value that specifies whether the list sorts in ascending alphabetical order. This depends on sortOption. If sortOption is title, then this value is `true`; if sortOption any other value, then this value is `false`.

        pageNumber
        :   The number of the page to display. For example, if you specify in the itemsPerPage parameter that each page will have 50 items, page 1 will contain items 1-50.

        itemsPerPage
        :   The maximum number of libraries to list per page. The default value is 20. The following information is returned:

            -   id: The library id in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.
            -   ownerUserId: The user id of the library owner in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000..
            -   type: The type of library, for example, `personal`, `community`, or `system`.
            -   label: A string of characters used to identify the library in a URL.
            -   title: The library's title.
            -   summary: A summary of library information.
            -   size: The total size of the library binary data.
            -   percentUsed: The percentage of the maximum allowable size used, according to the library's policy. Zero if not applicable.
            -   maximumSize: The maximum size \(in bytes\) the library's policy allows. Zero for unlimited.
            -   policyId: The id of the policy that sets a maximum limit \(in bytes\) on the library's size, in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.
            -   lastUpdate: The last time a significant user-driven update occurred to the metadata.
            -   createDate: The library's creation date.
            -   externalInstanceId: The widget id if the library is owned by a community.
            -   externalContainerId: The community id if the library is owned by a community.
            -   orphan: The value is true if the library owner is no longer active. Returned for personal libraries only.
        For example:

        ```
        FilesLibraryService.browsePersonal("title", "true", 1, 25)
        ```

    FilesLibraryService.browseCommunity\(string sortOption, string sortAscending, int pageNumber, int itemsPerPage\)
    :   Returns a list of community libraries, with information about each library. A community library is a set of files owned by a community.

        Parameters:

        sortOption
        :   A string value that specifies how to sort the list. The default value is `title`, but you can use `lastUpdate`, `size`, `createDate`, or `quotaPercentage`.

        sortAscending
        :   A string value that specifies whether the list sorts in ascending alphabetical order. This depends on sortOption. If sortOption is title, then this value is `true`; if sortOption any other value, then this value is `false`.

        pageNumber
        :   The number of the page to display. For example, if you specify in the itemsPerPage parameter that each page will have 50 items, page 1 will contain items 1-50.

        itemsPerPage
        :   The maximum number of libraries to list per page. The default value is 20. The following information is returned:

            -   id: The library id in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.
            -   ownerUserId: The user id of the library owner in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000..
            -   type: The type of library, for example, `personal`, `community`, or `system`.
            -   label: A string of characters used to identify the library in a URL.
            -   title: The library's title.
            -   summary: A summary of library information.
            -   size: The total size of the library binary data.
            -   percentUsed: The percentage of the maximum allowable size used, according to the library's policy. Zero if not applicable.
            -   maximumSize: The maximum size \(in bytes\) the library's policy allows. Zero for unlimited.
            -   policyId: The id of the policy that sets a maximum limit \(in bytes\) on the library's size, in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.
            -   lastUpdate: The last time a significant user-driven update occurred to the metadata.
            -   createDate: The library's creation date.
            -   externalInstanceId: The widget id if the library is owned by a community.
            -   externalContainerId: The community id if the library is owned by a community.
            -   themeName: The theme the community owner has selected in communities. Returned for community libraries only.
        For example:

        ```
        FilesLibraryService.browseCommunity("title", "true", 1, 20)
        ```

    FilesLibraryService.browsePersonalOrphan\(string sortOption, string sortAscending, int pageNumber, int itemsPerPage\)
    :   Returns a list of personal libraries whose owners were removed from the user directory. A personal library is a set of files owned by one person.

        Parameters:

        sortOption
        :   A string value that specifies how to sort the list. The default value is `title`, but you can use `lastUpdate`, `size`, `createDate`, or `quotaPercentage`.

        sortAscending
        :   A string value that specifies whether the list sorts in ascending alphabetical order. This depends on sortOption. If sortOption is `title`, then this value is `true`; if sortOption any other value, then this value is `false`.

        pageNumber
        :   The number of the page to display. For example, if you specify in the itemsPerPage parameter that each page will have 50 items, page 1 will contain items 1-50.

        itemsPerPage
        :   The maximum number of libraries to list per page. The default value is 20. The following information is returned:

            -   id: The library id in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.
            -   ownerUserId: The user id of the library owner in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000..
            -   type: The type of library, for example, `personal`, `community`, or `system`.
            -   label: A string of characters used to identify the library in a URL.
            -   title: The library's title.
            -   summary: A summary of library information.
            -   size: The total size of the library binary data.
            -   percentUsed: The percentage of the maximum allowable size used, according to the library's policy. Zero if not applicable.
            -   maximumSize: The maximum size \(in bytes\) the library's policy allows. Zero for unlimited.
            -   policyId: The id of the policy that sets a maximum limit \(in bytes\) on the library's size, in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.
            -   lastUpdate: The last time a significant user-driven update occurred to the metadata.
            -   createDate: The library's creation date.
            -   externalInstanceId: The widget id if the library is owned by a community.
            -   externalContainerId: The community id if the library is owned by a community.
            -   orphan: The value is true if the library owner is no longer active. Returned for personal libraries only.
        For example:

        ```
        FilesLibraryService.browsePersonalOrphan("title", "true", 1, 20)
        ```

    FilesLibraryService.getPersonalCount\(\)
    :   Returns the total number of personal libraries.

    FilesLibraryService.getCommunityCount\(\)
    :   Returns the total number of Community libraries.

    FilesLibraryService.getPersonalOrphanCount\(\)
    :   Returns the total number of personal libraries whose owners were removed from the user directory.

    FilesLibraryService.exportSyncedResourceInfo\(string fullpathForOutput, string type\)
    :   Returns a report of all of the communities that the Files application has interacted with. After a system crash you can compare the report to the latest metadata in the Communities database to help synchronize and update any missing data. See the topic *Comparing remote application data with the Communities database* for more information.

        Note that in clusters, when you run the command from the deployment manager the path and file are created on the server running Files. In clusters where multiple nodes are running Files, you are asked choose a server to connect to and run the command on, and then the path and file are created on that server.

        Parameters:

        fullPathforOutput
        :   The full path location where you want the report, and the report filename, as a string in quotes. The report is an XML file. Use forward slashes \("/"\) in the path, regardless of the operating system.

        type
        :   This is always the string value, `"community"` \(including quotes\). An error is returned if this is anything except `"community"`.

        For example:

        ```
        FilesLibraryService.exportSyncedResourceInfo("c:/connections/sync/community_output.xml", "community")
        ```


**Parent topic:**[Administering Files](../admin/c_admin_files_overview.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Comparing remote application data with the Communities database](../admin/t_admin_communities_sync_remote_apps.md)

