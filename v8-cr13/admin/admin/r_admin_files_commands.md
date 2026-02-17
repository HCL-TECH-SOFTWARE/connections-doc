# Files administrative commands {#filesadministrativecommands .reference}

Use these commands to perform administrative tasks for Files. No file checkout or server restart is needed when using these commands.

## Administrative commands { .section}

The following sections define administrative commands you can use when working with Files. Each section describes the commands for a specific service. See *Administering Files* for related information.

-   [FilesConfigService](r_admin_files_commands.md#FilesConfigService_section)
-   [FilesMemberService](r_admin_files_commands.md#FilesMemberService_section)
-   [FilesLibraryService](r_admin_files_commands.md#FilesLibraryService_section)
-   [FilesDataIntegrityService](r_admin_files_commands.md#FilesDataIntegrityService_section)
-   [FilesPrintService](r_admin_files_commands.md#FilesPrintService_section)
-   [FilesScheduler](r_admin_files_commands.md#FilesTaskService_section)
-   [FilesPolicyService](r_admin_files_commands.md#FilesPolicyService_section)
-   [FilesMetricsService](r_admin_files_commands.md#FilesMetricsService_section)
-   [FilesUtilityService](r_admin_files_commands.md#FilesUtilityService_section)
-   [FilesObjectTypeService](r_admin_files_commands.md#FileObjectTypeService_section)

Many commands ask for IDs as input parameters, such as library IDs, user IDs, policy IDs, and file IDs. You can use commands that take parameters you do know to return data including the ID you are looking for. For example, run `FilesMemberService.getByEmail(string email)` providing a user's email address and among the data returned is the user's ID. You can also find IDs using feeds.

## FilesConfigService {#FilesConfigService_section .section}

FilesConfigService.checkOutConfig\("working\_directory", "cell\_name"\)
:   Checks Files configuration files out to a temporary directory. Run from the wsadmin command processor.

    working\_directory
    :   Temporary working directory to which the configuration files are copied. The files are kept in this working directory while you make changes to them.

    cell\_name
    :   Name of the WebSphere® Application Server cell hosting the application. If you do not know the cell name, type the following command while in the wsadmin command processor:

        ```
        print AdminControl.getCell()
        ```

    For example:

    -   Linux™:

        ```
        FilesConfigService.checkOutConfig("/opt/my_temp_dir", "CommServerNode01Cell")
        ```

    -   Microsoft™ Windows™:

        ```
        FilesConfigService.checkOutConfig("c:/temp","foo01Cell01")
        ```

    -   IBM® i:

        ```
        FilesConfigService.checkOutConfig("/temp","foo01Cell01")
        ```


FilesConfigService.showConfig\(\)
:   Displays the current configuration settings. You must check out the configuration files with FilesConfigService.checkOutConfig\(\) before running FilesConfigService.showConfig\(\).

FilesConfigService.updateConfig\("quick\_config\_property", "new\_value"\)
:   Updates configuration properties.

    quick\_config\_property
    :   Property in the `files-config.xml` configuration file expressed as a quick config command. For example the quick config value for following property:

        ```
        <security>
        <logout href="/files/ibm_security_logout" />
        </security>
        ```

        is this:

        ```
        security.logout.href
        ```

        See *Files configuration properties* for configuration properties and descriptions.

    new\_value
    :   The new value for the property. Property values can be restricted, for example to either true or false. See *Files configuration properties* for configuration properties and descriptions.

    For example, to set the `scheduledTasks.MetricsDailyCollection.enabled` property to false, use the following command:

    ```
    FilesConfigService.updateConfig("scheduledTasks.MetricsDailyCollection.enabled", "false")
    ```

FilesConfigService.checkInConfig\(\)
:   Checks in Files configuration files. Run from the wsadmin command processor.

## FilesMemberService {#FilesMemberService_section .section}

FilesMemberService.getById\(string userId\)
:   Returns information about a user specified by a user ID. The command only searches the Files database, so it only returns users who have logged in at least once.

    Parameters:

    id
    :   The user ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000. The following information is returned:

        -   id: The user ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.
        -   name: The user's name in the database as of the date in directoryLastUpdate.
        -   email: The user's email address.
        -   isOrphan: Returns true if the user is in the database, but not the directory.
        -   createDate: The date the user was added to the database.
        -   lastVisit: The date of the user's last log in.
        -   directoryLastUpdate: The last time the user's data was synchronized from the directory.
        -   directoryGroupLastUpdate: The last time this user's group membership was synchronized from the directory.
        -   communityLastUpdate: The last time this user's Community membership was synchronized.

    For example:

    ```
    FilesMemberService.getById("2d93497d-065a-4022ae25-a4b52598d11a")
    ```

FilesMemberService.getByExtId\(string externalId\)
:   Returns information about a user specified by an external directory ID. The command only searches the Files database, so it only returns users who have logged in at least once.

    Parameters:

    externalId
    :   A string value matching the user's external directory ID. This can be any parameter in the user directory that you have configured as the directory ID. The following user information is returned:

        -   id: The user ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.
        -   name: The user's name in the database as of the date in directoryLastUpdate.
        -   email: The user's email address.
        -   isOrphan: Returns true if the user is in the database, but not the directory.
        -   createDate: The date the user was added to the database.
        -   lastVisit: The date of the user's last log in.
        -   directoryLastUpdate: The last time the user's data was synchronized from the directory.
        -   directoryGroupLastUpdate: The last time this user's group membership was synchronized from the directory.
        -   communityLastUpdate: The last time this user's Community membership was synchronized.

    For example:

    ```
    FilesMemberService.getByExtId("2d93497d-065a-4022ae25-a4b52598d11a")
    ```

FilesMemberService.getByEmail\(string email\)
:   Returns information about a user specified by an email address. The command only searches the Files database, so it only returns users who have logged in at least once.

    Parameters:

    email
    :   The email address for the user. The following user information is returned:

        -   id: The user ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.
        -   name: The user's name in the database as of the date in directoryLastUpdate.
        -   email: The user's email address.
        -   isOrphan: Returns true if the user is in the database, but not the directory.
        -   createDate: The date the user was added to the database.
        -   lastVisit: The date of the user's last log in.
        -   directoryLastUpdate: The last time the user's data was synchronized from the directory.
        -   directoryGroupLastUpdate: The last time this user's group membership was synchronized from the directory.
        -   communityLastUpdate: The last time this user's Community membership was synchronized.

    For example:

    ```
    FilesMemberService.getByEmail("john_doe@company.com")
    ```

    **Note:** See *Synchronizing user data using administrative commands* for details.

FilesMemberService.syncAllMembersByExtId\( \{"updateOnEmailLoginMatch": \["true" \| "false"\] \} \)
:   FilesMemberService.syncMemberByExtId\("currentExternalId"\[, \{"newExtId" : "id-string" \[, "allowExtIdSwap" : \["true" \| "false"\] \] \} \] \)
:   FilesMemberService.inactivateMemberByEmail\("email"\)
:   FilesMemberService.inactivateMemberByExtId\("externalID"\)
:   FilesMemberService.getMemberExtIdByEmail\("email"\)
:   FilesMemberService.getMemberExtIdByLogin\("login"\)
:   FilesMemberService.syncBatchMemberExtIdsByEmail\("emailFile" \[, \{"allowInactivate" : \["true" \| "false"\] \} \] \)
:   FilesMemberService.syncBatchMemberExtIdsByLogin\("loginFile" \[, \{"allowInactivate" : \["true" \| "false"\] \} \] \)
:   FilesMemberService.syncMemberExtIdByEmail\("email" \[, \{ "allowInactivate": \["true" \| "false"\] \} \]\)
:   FilesMemberService.syncMemberExtIdByLogin\("name" \[, \{"allowInactivate": \["true" \| "false"\] \} \]\)
:   ## FilesLibraryService {#FilesLibraryService_section .section}

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

FilesLibraryService.delete\(string libraryId\)
:   Deletes the library specified by the library ID, including all associated content. A library is a set of files owned by a person or community. It includes all versions of the files, but does not include metadata such as comments.

    Parameters:

    libraryID
    :   The library ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.

    For example:

    ```
    FilesLibraryService.delete("f0d01111-9b21-4dd8-b8be-8825631cb84b")
    ```

FilesLibraryService.deleteBatch\(string filePath\)
:   Deletes libraries specified in a text file. The file must contain a list with a single library ID per line in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000. You must create the file and save it in a directory local to the server where you are running the wsadmin processor. A library is a set of files owned by a person or community. It includes all versions of the files, but does not include metadata such as comments.

    Parameters:

    filePath
    :   The full path to the text file, as a string.

    For example:

    ```
    FilesLibraryService.deleteBatch("C:/connections/delete_libraries.txt")
    ```

FilesLibraryService.assignPolicy\(string libraryId, string policyId\)
:   Assigns a policy to a library. A library is a set of files owned by a person or community. It includes all versions of the files, but does not include metadata such as comments. A policy sets a maximum size for a library.

    No message is printed if the task succeeds.

    Parameters:

    libraryId
    :   The library ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.

    policyId
    :   The policy ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.

    For example:

    ```
    FilesLibraryService.assignPolicy("f0d01111-9b21-4dd8-b8be-8825631cb84b", "2d93497d-065a-4022ae25-a4b52598d11a")
    ```

FilesLibraryService.assignPolicyBatch\(string filePath\)
:   Assigns policies to libraries as specified in a text file. The file must contain a list of library-policy ID pairs, one pair per line, values separated by a comma. For example: `libraryId, policyId`. Extra whitespace is ignored. You must create this text file and save it in a directory local to the server where you are running the wsadmin processor.

    A library is a set of files owned by a person or community. It includes all versions of the files, but does not include metadata such as comments. A policy sets a maximum size for a library.

    Parameters:

    filePath
    :   The full path to the text file, as a string.

    For example:

    ```
    FilesLibraryService.assignPolicyBatch("C:/connections/assign_policies.txt")
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
    :   The full path location where you want the report, and the report filename, as a string in quotes. The report is an XML file. Use forward slashes \("/"\) in the path regardless of operating system.

    type
    :   This is always the string value, `"community"` \(including quotes\). An error is returned if this is anything except `"community"`.

    For example:

    ```
    FilesLibraryService.exportSyncedResourceInfo("c:/connections/sync/community_output.xml", "community")
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

## FilesDataIntegrityService {#FilesDataIntegrityService_section .section}

FilesDataIntegrityService.checkFiles\(string extraFileDirectory\)
:   Checks the integrity of the binary files in the file system extra files directory against the metadata in the database; and stores extra files that were not found in the database.

    For more information see the topic *Checking Files data integrity*.

    Parameters:

    extraFileDirectory
    :   Specifies a directory in which to store binary files from the file system extra files directory that are not present in the database metadata. If the directory does not exist, the command creates it. If the directory cannot be created, or read or written to, an error is returned.

    For example:

    ```
    FilesDataIntegrityService.checkFiles("C:/files_integrity")
    ```

FilesDataIntegrityService.syncAllCommunityShares\(\)
:   Ensure that files that have been shared with communities from Files are correctly synchronized. If the name or the access level of a community has changed, the command updates the Files data store to reflect those changes. If the community no longer exists, the shared files still exist in the Files applications; the file owners still own and have full access to that content even though it is no longer shared.

FilesDataIntegrityService.syncAllExternalReferences
:   When a file is attached to a microblog, also referred to as a status update, the Files database maintains the association. The association is visible in the file’s Sharing tab as the message, This file is associated with one or more status updates. If needed, you can manually synchronize files with their associated status updates using the following procedure.

    1.  Open the wasadmin console using the `wsadmin -lang jython` command.
    2.  Run the command`execfile("filesAdmin.jy")`.
    3.  Run the command `FilesDataIntegrityService.syncAllExternalReferences('microblog')`.

## FilesPrintService {#FilesPrintService_section .section}

FilesPrintService.saveToFile\(string object, string filePath, string append\)
:   Prints information returned by other commands to a file.

    Parameters:

    object
    :   A command with parameters that returns a `Map` or `List<Map>` Java™ object. You can use any of the following commands:

        -   FilesMemberService.getById \(returns a `Map`\)
        -   FilesMemberService.getByExtId \(returns a `Map`\)
        -   FilesMemberService.getByEmail \(returns a `Map`\)
        -   FilesLibraryService.getById \(returns a `Map`\)
        -   FilesLibraryService.getPersonalByOwnerId \(returns a `Map`\)
        -   FilesLibraryService.browsePersonal \(returns a `List<Map>`\)
        -   FilesLibraryService.browseCommunity \(returns a `List<Map>`\)
        -   FilesLibraryService.browsePersonalOrphan \(returns a `List<Map>`\)
        -   FilesPolicyService.getById \(returns a `Map`\)
        -   FilesPolicyService.browse \(returns a `List<Map>`\>\)
        -   FilesMetricsService.browsePersonal \(returns a `List<Map>`\)
        -   FilesMetricsService.browseCommunity \(returns a `List<Map>`\)

    filePath
    :   A path to a file in which to save the object data. The data is saved in comma-separated value \(.csv\) format.

    append
    :   string whose default value is "true". Change to "false" to have the command overwrite the existing file instead of appending the data in the existing file.

    For example:

    ```
    FilesPrintService.saveToFile(FilesLibraryService.browsePersonal("title", "true", 1, 25), "/opt/wsadmin/LibraryMap.csv")
    ```

## FilesScheduler {#FilesTaskService_section .section}

FilesScheduler.pauseSchedulingTask\(string taskName\)
:   Suspends scheduling of a task. Has no effect on currently running tasks. Returns a 1 to indicate that the task has been paused. Paused tasks remain paused until you explicitly resume them, even if the server is stopped and restarted.

    Parameters:

    taskName
    :   Any one of these task names, as a string value:

        -   DirectoryGroupSynch
        -   FileActuallyDelete
        -   SearchClearDeletionHistory
        -   MetricsDailyCollection
        -   TagUpdateFrequency
        -   RenditionDailyGeneration

         

    For example:

    ```
    FilesScheduler.pauseSchedulingTask("DirectoryGroupSynch")
    ```

FilesScheduler.resumeSchedulingTask\(string taskName\)
:   Resumes the start of a paused task. Returns a 1 to indicate that the task has been resumed.

    Parameters:

    taskName
    :   Any one of these task names, as a string value:

        -   DirectoryGroupSynch
        -   FileActuallyDelete
        -   SearchClearDeletionHistory
        -   MetricsDailyCollection
        -   TagUpdateFrequency
        -   RenditionDailyGeneration

    For example:

    ```
    FilesScheduler.resumeSchedulingTask("DirectoryGroupSynch")
    ```

FilesScheduler.forceTaskExecution\(string taskName, string executeSynchronously\)
:   Executes a task. Returns a 1 to indicate that the task has been executed.

    Property settings in the `files-config.xml` configuration properties file specify whether tasks are enabled to run automatically, and how often. This command allows you to run tasks manually, for example if you disabled a task but want to run it occasionally.

    Parameters:

    taskName
    :   Any one of these task names, as a string value:

        -   DirectoryGroupSynch
        -   FileActuallyDelete
        -   SearchClearDeletionHistory
        -   MetricsDailyCollection
        -   TagUpdateFrequency
        -   RenditionDailyGeneration

    executeSynchronously
    :   Takes the string values `true` or `false`. Specifying this value is not required; the default is `false`. If this value is `false`, then the task executes asynchronously, meaning if the taskId is valid the command returns immediately and the execution continues in the background. If this value is `true`, it the command does not return until the task completes.

    For example:

    ```
    FilesScheduler.forceTaskExecution("DirectoryGroupSynch")
    ```

FilesScheduler.getTaskDetails\(string taskName\)
:   Displays status of a task. Returns detailed status message.

    Parameters:

    taskName
    :   Any one of these task names, as a string value:

        -   DirectoryGroupSynch
        -   FileActuallyDelete
        -   SearchClearDeletionHistory
        -   MetricsDailyCollection
        -   TagUpdateFrequency
        -   RenditionDailyGeneration

    For example:

    ```
    FilesScheduler.getTaskDetails("DirectoryGroupSynch")
    ```

## FilesPolicyService {#FilesPolicyService_section .section}

FilesPolicyService.add\(string title, long maximumSize\)
:   Creates a policy with a specified title and maximum size. Policies set a maximum size limit on libraries.

    When a policy is created, an ID is created for it and returned to you. The ID is in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000. You must provide policy IDs as parameters when running other FilesPolicyService commands. Policies can be applied to libraries using the FilesLibraryService.assignPolicy or FilesLibraryService.assignPolicyBatch commands.

    A library is a set of files owned by a person or community. It includes all versions of the files, but does not include metadata such as comments.

    Parameters:

    title
    :   The policy title. A required value.

    maximumSize
    :   The maximum size allowed, in bytes. Must be zero or greater. A value of zero means the size is unlimited.

        Numbers 2GB or greater are long literals, and you must add an "L" to the end of the number, for example a policy of 2GB must be `2147483648L`.

    For example:

    ```
    FilesPolicyService.add("My Policy", 2147483648L)
    ```

FilesPolicyService.edit\(string policyId, string title, long maximumSize\)
:   Edits the title and maximum size of a policy with a specified ID. If the ID is for a default policy, the title is not modified. Policies set a maximum size limit on libraries. A library is a set of files owned by a person or community. It includes all versions of the files, but does not include metadata such as comments.

    Parameters:

    policyID
    :   The policy ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.

    title
    :   The policy title. A required value.

    maximumSize
    :   The maximum size allowed, in bytes. Must be zero or greater. A value of zero means the size is unlimited.

        Numbers 2GB or greater are long literals, and you must add an "L" to the end of the number, for example a policy of 2GB must be `2147483648L`.

    For example:

    ```
    FilesPolicyService.edit("2d93497d-065a-4022ae25-a4b52598d11a", "My Policy", 2147483648L)
    ```

FilesPolicyService.getById\(string policyId\)
:   Returns information for a single policy specified by an ID. Policies set a maximum size limit on libraries. A library is a set of files owned by a person or community. It includes all versions of the files, but does not include metadata such as comments.

    Parameters:

    policyId
    :   The policy ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000. The following information is returned:

        -   id: the ID
        -   title: the policy title
        -   maximumSize: the maximum size \(in bytes\) the library can be, or 0 for unlimited

    For example:

    ```
    FilesPolicyService.getById("2d93497d-065a-4022ae25-a4b52598d11a")
    ```

FilesPolicyService.browse\(string sortOption, string sortAscending, int pageNumber, int itemsPerPage\)
:   Returns a list of policies with ID, title, and maximum size information, as described for the FilesPolicyService.getById\(id\) command. Policies set a maximum size limit on libraries. A library is a set of files owned by a person or community. It includes all versions of the files, but does not include metadata such as comments.

    Parameters:

    sortOption
    :   A string value that specifies how to sort the list. The default value is `title`, but you can also use `maximumSize`.

    sortAscending
    :   A string value that specifies whether the list sorts in ascending alphabetical order. This depends on sortOption. If sortOption is title, then this value is `true`; if sortOption any other value, then this value is `false`.

    pageNumber
    :   The number of the page to return. For example, if the itemsPerPage value is 40, and pageNumber value is 2, the command returns items 41 to 80 \(page 2\) instead of 1 to 40 \(page 1\).

    itemsPerPage
    :   The maximum number of policies to list per page. The default value is 20.

    For example:

    ```
    FilesPolicyService.browse("title", "true", 1, 25)
    ```

FilesPolicyService.getCount\(\)
:   Returns the total number of policies. Policies set a maximum size limit on libraries. A library is a set of files owned by a person or community. It includes all versions of the files, but does not include metadata such as comments.

FilesPolicyService.editPersonalDefault\(long maximumSize\)
:   Sets the maximum size, in bytes, for the personal library default policy. The default policy is applied to all personal libraries that do not otherwise have a policy. It allows you to control library size as a way of controlling the amount of storage space used.

    A personal library is a set of files owned by one person. It includes all versions of the files, but does not include metadata such as comments.

    Parameters:

    maximumSize
    :   A number representing the maximum size allowed, in bytes, for libraries that the default policy is assigned to.

        Numbers 2GB or greater are long literals, and you must add an "L" to the end of the number, for example a policy of 2GB must be `2147483648L`.

    For example:

    ```
    FilesPolicyService.editPersonalDefault(2147483648L)
    ```

FilesPolicyService.editCommunityDefault\(long maximumSize\)
:   Sets the maximum size, in bytes, for the community library default policy. The default policy is applied to all community libraries that do not otherwise have a policy. It allows you to control library size as a way of controlling the amount of storage space used.

    A community library is a set of files owned by a community. It includes all versions of the files, but does not include metadata such as comments.

    Parameters:

    maximumSize
    :   A number representing the maximum size allowed, in bytes, for community libraries that the default policy is assigned to.

        Numbers 2GB or greater are long literals, and you must add an "L" to the end of the number, for example a policy of 2GB must be `2147483648L`.

    For example:

    ```
    FilesPolicyService.editCommunityDefault(2147483648L)
    ```

FilesPolicyService.delete\(string policyId\)
:   Deletes the policy specified by the policy ID. You cannot delete default policies or policies in use by any libraries.

    policyId
    :   The policy ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.

    For example:

    ```
    FilesPolicyService.delete("f0d01111-9b21-4dd8-b8be-8825631cb84b")
    ```

## FilesMetricsService {#FilesMetricsService_section .section}

FilesMetricsService.browsePersonal\(string startDate, string endDate, string filePathWithFilterKeys\)
:   Returns metrics about personal libraries. The same metrics are provided for each day in a specified period. A personal library is a set of files owned by one person.

    If you do not specify dates, then the command uses the first available day with data for startDate, and the last available day with data for endDate.

    See the topic *Files metrics* for metrics and their descriptions.

    Parameters:

    startDate
    :   The start date for the period, in YYYY-MM-DD format. This date is included in the returns, for example a start date of "2012-01-15" will include metrics from January 15, 2012. The value must be in quotes.

    endDate
    :   The end date for the period, in YYYY-MM-DD format. This date is included in the returns, for example an end date of "2012-01-25" will include metrics to January 25, 2012. The value must be in quotes.

    filePathWithFilterKeys
    :   Optional: The full path to a text file in which each line contains a metric key. If you specify a file, only metrics listed in the file are returned. If you do not specify a file, all data is returned. For example, if the file lists these three keys, then only these metrics are returned:

        ```
        files.metric.personal.user.count
        files.metric.personal.user.created.today.count
        files.metric.personal.user.login.count
        ```

    For example:

    ```
    FilesMetricsService.browsePersonal("2012-01-01", "2012-01-10", "C:/connections/files/metrics.txt")
    ```

FilesMetricsService.browseCommunity\(string startDate, string endDate, string filePathWithFilterKeys\)
:   Returns metrics about community libraries. The same metrics are provided for each day in a specified period. A community library is a set of files owned by a community.

    If you do not specify dates, then the command uses the first available day with data for startDate, and the last available day with data for endDate.

    See the topic *Files metrics* for metrics and their descriptions.

    Parameters:

    startDate
    :   The start date for the period, in YYYY-MM-DD format. This date is included in the returns, for example a start date of "2012-01-15" will include metrics from January 15, 2012. The value must be in quotes.

    endDate
    :   The end date for the period, in YYYY-MM-DD format. This date is included in the returns, for example an end date of "2012-01-25" will include metrics to January 25, 2012. The value must be in quotes.

    filePathWithFilterKeys
    :   Optional: The full path to a text file in which each line contains a metric key. If you specify a file, only metrics listed in the file are returned. If you do not specify a file, all data is returned. For example, if the file lists these three keys, then only these metrics are returned:

        ```
        files.metric.community.user.count
        files.metric.community.user.created.today.count
        files.metric.community.user.login.count
        ```

    For example:

    ```
    FilesMetricsService.browseCommunity("2012-01-01", "2012-01-10", "C:/connections/files/metric_keys.txt")
    ```

FilesMetricsService.savePersonalToFile\(string filePath, string startDate, string endDate, string filePathWithFilterKeys, string append\)
:   Returns metrics about personal libraries and exports them to a local file. The same metrics are provided for each day in a specified period. A personal library is a set of files owned by one person.

    If you do not specify dates, then the command uses the first available day with data for startDate, and the last available day with data for endDate.

    See the topic *Files metrics* for metrics and their descriptions.

    Parameters:

    filePath
    :   Path to a file in which to export the metrics. Metrics are exported in comma separated value \(CSV\) format. If you specify a file name with a .csv extension, it is possible to open it as a spreadsheet. See *Importing statistics and metrics into a spreadsheet*.

    startDate
    :   The start date for the period, in YYYY-MM-DD format. This date is included in the returns, for example a start date of "2012-01-15" will include metrics from January 15, 2012. The value must be in quotes.

    endDate
    :   The end date for the period, in YYYY-MM-DD format. This date is included in the returns, for example an end date of "2012-01-25" will include metrics to January 25, 2012. The value must be in quotes.

    filePathWithFilterKeys
    :   Optional: The full path to a text file in which each line contains a metric key. If you specify a file, only metrics listed in the file are returned. If you do not specify a file, all data is returned. For example, if the file lists these three keys, then only these metrics are returned:

        ```
        files.metric.personal.user.count
        files.metric.personal.user.created.today.count
        files.metric.personal.user.login.count
        ```

    append
    :   String whose default value is "true". Change to "false" to have the command overwrite the existing file instead of appending the data in the existing file.

    For example:

    ```
    FilesMetricsService.savePersonalToFile("C:/connections/files/metrics.csv", "2012-01-01", "2012-01-10", "C:/connections/files/metric_keys.txt", "false")
    ```

    **Note:** While the filePathWithFilterKeys parameter is optional you cannot leave it out completely, you must at least have empty quotes, for example:

    ```
    FilesMetricsService.savePersonalToFile("C:/connections/files/metrics.csv", "2012-01-01", "2012-01-10", "", "false")
    ```

FilesMetricsService.saveCommunityToFile\(string filePath, string startDate, string endDate, string filePathWithFilterKeys, string append\)
:   Returns metrics about community libraries and exports them to a local file. The same metrics are provided for each day in a specified period. A community library is a set of files owned by a community.

    If you do not specify dates, then the command uses the first available day with data for startDate, and the last available day with data for endDate.

    See the topic *Files metrics* for metrics and their descriptions.

    Parameters:

    filePath
    :   Path to a file in which to export the metrics. Metrics are exported in comma separated value \(CSV\) format. If you specify a file name with a .csv extension, you can open it as a spreadsheet. See *Importing statistics and metrics into a spreadsheet*.

    startDate
    :   The start date for the period, in YYYY-MM-DD format. This date is included in the returns, for example a start date of "2012-01-15" will include metrics from January 15, 2012. The value must be in quotes.

    endDate
    :   The end date for the period, in YYYY-MM-DD format. This date is included in the returns, for example an end date of "2012-01-25" will include metrics to January 25, 2012. The value must be in quotes.

    filePathWithFilterKeys
    :   Optional: The full path to a text file in which each line contains a metric key. If you specify a file, only metrics listed in the file are returned. If you do not specify a file, all data is returned. For example:

        ```
        files.metric.community.user.count
        files.metric.community.user.created.today.count
        files.metric.community.user.login.count
        
        ```

    append
    :   String whose default value is "true". Change to "false" to have the command overwrite the existing file instead of appending the data in the existing file.

    For example:

    ```
    FilesMetricsService.saveCommunityToFile("C:/connections/files/metrics.csv", "2012-01-01", "2012-01-10", "C:/connections/files/metric_keys.txt", "false")
    ```

FilesMetricsService.getAvailablePersonalRange\(\)
:   Returns a string array where the first element is the first day data is available and the second element is the last day that data is available for personal libraries. Typically, the current day's data is not available until 12:01 A.M. the following day. A personal library is a set of files owned by one person.

    If metrics collection was disabled or did not occur because of some issue, there may be gaps in data available.

FilesMetricsService.getAvailableCommunityRange\(\)
:   Returns a string array where the first element is the first day data is available and the second element is the last day that data is available for community libraries. Typically, the current day's data is not available until 12:01 A.M. the following day. A community library is a set of files owned by a community.

    If metrics collection was disabled or did not occur because of some issue, there may be gaps in data available.

## FilesUtilityService {#FilesUtilityService_section .section}

FilesUtilService.filterListByString\(List listOfMaps, string filterKey, string regexstringCriteria\)
:   Returns maps from a specified list that have a specified key matching a specified regular expression. Use this command to filter `List<Map>` java objects that are returned by any of the browse commands, such as FilesLibraryService.browsePersonal and FilesPolicyService.browse.

    A map is a list of key/value pairs, for example the FilesLibraryService.browsePersonal command returns a list of personal libraries. Each library in the list is a map with a set of keys, and each key is paired with a value. Every library has the same set of keys, but unique values. Values contain information about the library, such as its title and creation date.

    Parameters:

    listOfMaps
    :   A list of maps, for example the result of a command, such as FilesLibraryService.browsePersonal\(parameters\).

    filterKey
    :   A key in each map in the list, whose value is compared against the filter criteria.

    regexstringCriteria
    :   A regular expression represented as a string to match against the filterKey value. For example, "\[0-9\]+" to match only \>= 1 numbers in a row.

    The command returns maps from the listOfMaps whose filterKey is the regexstringCriteria value. For example, this command shows only the returned maps whose title values match the expression "John\*":

    ```
    FilesUtilService.filterListByString(FilesLibraryService.browsePersonal("title", "true", 1, 25), "title", "John*")
    ```

FilesUtilService.filterListByDate\(list listOfMaps, string filterKey, expression\)
:   Returns maps from a specified list that have a specified key with a specified date. Use this command to filter `List<Map>` java objects that are returned by any of the browse commands, such as FilesLibraryService.browsePersonal and FilesPolicyService.browse.

    A map is a list of key/value pairs, for example the FilesLibraryService.browsePersonal command returns a list of personal libraries. Each library is a map with a set of keys, and each key is paired with a value. Every library has the same set of keys, but unique values. Values contain information about the library, such as its title and creation date.

    Parameters:

    listOfMaps
    :   A list of maps, for example the result of FilesLibraryService.browsePersonal\(parameters\).

    filterKey
    :   A key in each map in the list, whose value is compared against the filter criteria.

    expression
    :   A string of the form <operator\> <date\> where <date\> is in yyyy-MM-dd format and <operator\> is one of the following: \> \>= == <= <

    The command returns maps from the listOfMaps value whose filterKey value is the expression value. For example, this command shows only the returned maps whose creation date is on or later than January 1, 2012:

    ```
    FilesUtilService.filterListByDate(FilesLibraryService.browsePersonal("title", "true", 1, 25), "createDate", "=2010-01-01")
    ```

FilesUtilService.filterListByNumber\(List listOfMaps, string filterKey, expression\)
:   Returns maps from a specified list that have a specified key with a specified number. Use this command to filter `List<Map>` java objects that are returned by any of the browse commands, such as FilesLibraryService.browsePersonal and FilesPolicyService.browse.

    A map is a list of key/value pairs, for example the FilesLibraryService.browsePersonal command returns a list of personal libraries. Each library is a map with a set of keys, and each key is paired with a value. Every library has the same set of keys, but unique values. Values contain information about the library, such as its title and creation date.

    Parameters:

    listOfMaps
    :   A list of maps, for example the result of FilesLibraryService.browsePersonal\(parameters\).

    filterKey
    :   A key in each map in the list, whose value is compared against the filter criteria.

    expression
    :   A string of the form <operator\> <int\> where <int\> is an integer and <operator\> is one of the following: \> \>= == <= <

    The command returns maps from the listOfMaps value whose filterKey value is the expression value. For example, this command shows only the returned maps whose `percentUsed` value \(which reflects the percent of the library's available space that is currently used\) is 20:

    ```
    FilesUtilService.filterListByNumber(FilesLibraryService.browsePersonal("title", "true", 1, 25), "percentUsed", "==20")
    ```

FilesUtilService.getFileById\(string fileID\)
:   Returns the file path location of the file identified by a provided file ID. Returns a path even if the file is not in use.

    Use this command to find the location of any file stored in the shared file directory. This can be useful when restoring backup versions of data. See the topic [*Backing up Files data*](t_admin_files_backup.md) for more information.

    fileID
    :   The ID of a file in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.

    For example:

    ```
    FilesUtilService.getFileById("2d93497d-065a-4022ae25-a4b52598d11a")
    ```

## FilesObjectTypeService {#FileObjectTypeService_section .section}

Use these commands to import and export custom Content Management Interoperability Services \(CMIS\) object types, and delete or browse imported CMIS object types. See *Files CMIS API* in the [API wiki](http://www-10.lotus.com/ldd/appdevwiki.nsf/xpDocViewer.xsp?lookupName=API+Reference#action=openDocument&res_title=Files_CMIS_API_sbar&content=pdcontent) for details.

FilesObjectTypeService.importType\("filePath"\)
:   Imports an XML file defining a custom object type.

    **Note:** The Files application must be restarted after an object type has been imported before the new object type can be accessed and used by the system.

    Parameters:

    filePath
    :   The path and name of the XML file containing the object type definition.

    For example:

    ```
    FilesObjectTypeService.importType("C:/CMIS/object_types/objectType.xml")
    ```

FilesObjectTypeService.exportType\("filePath", "Id"\)
:   Exports an XML file defining a custom object type.

    Parameters:

    filePath
    :   The path and name of the XML file containing the custom object type definition.

    Id
    :   The ID of the custom object type to be exported. Object type IDs are located in the object type's XML definition file.

    For example:

    ```
    FilesObjectTypeService.exportType("C:/CMIS/object_types/objectType.xml", "f0d01111-9b21-4dd8-b8be-8825631cb84b")
    ```

FilesObjectTypeService.deleteType\("Id"\)
:   Deletes an imported custom object type.

    **Note:** The Files application must be restarted after a custom object type has been deleted.

    Parameters:

    Id
    :   The ID of the custom object type to be deleted. Object type IDs are located in the object type's XML definition file.

    For example:

    ```
    FilesObjectTypeService.deleteType("f0d01111-9b21-4dd8-b8be-8825631cb84b")
    ```

FilesObjectTypeService.browseTypes\(\)
:   Lists all imported custom object types.

FilesThumbnailService.generateForAllFiles\(\)
:   Use this command to trigger thumbnail conversion for existing documents that do not have previews. Once executed, the command sends thumbnail-generation events to the Viewer at the rate of one event for two seconds. Events are sent collectively in batches of 150 events each and are recorded in theSystemOut.log file. The duration of completion depends on the number of existing documents that require thumbnails. This command will need to be restarted if the Files application is stopped. The command resumes scanning the database where it left off. A log is generated after the command completes. Typically, a message is sent for every 150 events generated such as 150 events generated, 300 events generated, and so on, which indicates that this command is running correctly.

    "restart"
    :   Optional string. Using this parameter in the command scans the database from beginning. Without this parameter, the command resumes scanning the database from where it left off. For example:

        ```
        FilesThumbnailService.generateForAllFiles()
        FilesThumbnailService.generateForAllFiles("restart")
        ```

**Parent topic:**[Running Files administrative commands](../admin/t_admin_files_run_commands.md)

**Related information**  


[Comparing remote application data with the Communities database](../admin/t_admin_communities_sync_remote_apps.md)

[Checking Files data integrity](../admin/t_admin_files_data_integrity.md)

[Backing up Files data](../admin/t_admin_files_backup.md)

[Managing user data using Profiles administrative commands](../admin/t_admin_profiles_manage_users.md)

[Administering Files](../admin/c_admin_files_overview.md)

[Running administrative commands](../admin/t_admin_common_edit_admin_props.md)

[Files configuration properties](../admin/r_admin_files_config_properties2.md)

[Roles](../admin/r_admin_common_user_roles.md)

