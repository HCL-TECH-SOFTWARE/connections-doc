# Wikis administrative commands {#wikisadministrativecommands .reference}

Use these commands to run administrative tasks for the Wikis application. You do not have to check out the configuration file nor restart the application or server restart.

## Services commands { .section}

The following sections define administrative commands that you can use when you work with Wikis. Each section describes the commands for a specific service.

-   [WikisConfigService](r_admin_wikis_commands.md#WikisConfigService_section)
-   [WikisMemberService](r_admin_wikis_commands.md#WikisMemberService_section)
-   [WikisLibraryService](r_admin_wikis_commands.md#WikisLibraryService_section)
-   [WikisDataIntegrityService](r_admin_wikis_commands.md#WikisDataIntegrityService_section)
-   [WikisPrintService](r_admin_wikis_commands.md#WikisPrintService_section)
-   [WikisScheduler](r_admin_wikis_commands.md#WikisScheduler_section)
-   [WikisPolicyService](r_admin_wikis_commands.md#WikisPolicyService_section)
-   [WikisMetricsService](r_admin_wikis_commands.md#WikisMetricsService_section)
-   [WikisUtilService](r_admin_wikis_commands.md#WikisUtilService_section)

Many commands require an ID as an input parameter, including library IDs, user IDs, policy IDs, and file IDs. You can find an ID by using special commands. For example, when you run the WikisMemberService.getByEmail\(string email\) command, where you provide a user's email address as input, the output includes the user's ID. You can also find IDs by using feeds. For more information, see the IBM® Connections API documentation.

## WikisConfigService {#WikisConfigService_section .section}

WikisConfigService.checkOutConfig\("working\_directory", "cell\_name"\)
:   Checks the Wikis configuration file out to a temporary directory. Run from the wsadmin client.

    <working\_directory\>
    :   Temporary working directory to which the configuration files are copied. The files are kept in this working directory while you modify them.

    <cell\_name\>
    :   Name of the WebSphere® Application Server cell that hosts the IBM® Connections application. If you do not know the cell name, type the following command in the wsadmin client:

        ```
        print AdminControl.getCell()
        ```

    For example:

    -   Linux:

        ```
        WikisConfigService.checkOutConfig("/opt/my_temp_dir", 
          "CommServerNode01Cell")
        ```

    -   IMB i:

        ```
        WikisConfigService.checkOutConfig("/temp","foo01Cell01")
        ```

    -   Microsoft® Windows®:

        ```
        WikisConfigService.checkOutConfig("c:/temp","foo01Cell01")
        ```


WikisConfigService.showConfig\(\)
:   Displays the current configuration settings. You must check out the configuration file with WikisConfigService.checkOutConfig\(\) before you can run WikisConfigService.showConfig\(\).

WikisConfigService.updateConfig\("quick\_config\_property", "new\_value"\)
:   Updates configuration properties.

    quick\_config\_property
    :   Property in the `wikis-config.xml` configuration file that is expressed as a quick config command. For example, the quick config value for following property:

        ```
        <security>
        <logout href="/wikis/ibm_security_logout" />
        </security>
        ```

        is:

        ```
        security.logout.href
        ```

        For information about configuration properties and descriptions, see *Wikis configuration properties*.

    new\_value
    :   The new value for the property. Property values can be restricted, for example, to either true or false.

    For example, to set the `scheduledTasks.MetricsDailyCollection.enabled` property to false, use the following command:

    ```
    WikisConfigService.updateConfig("scheduledTasks.MetricsDailyCollection.enabled", "false")
    ```

WikisConfigService.checkInConfig\(\)
:   Checks in Wikis configuration files. Run from the wsadmin client.

## WikisMemberService {#WikisMemberService_section .section}

WikisMemberService.getById\(string id\)
:   Returns information about a user that is specified by a user ID. The command searches the Wikis database only, so it returns only those users who logged in at least once.

    Parameters:

    id
    :   The user ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000. The following information is returned:

        -   id: The user ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.
        -   name: The user's name in the database as of the date in directoryLastUpdate.
        -   email: The user's email address.
        -   isOrphan: Returns true if the user is in the database, but not the directory.
        -   createDate: The date that the user was added to the database.
        -   lastVisit: The date of the user's last login.
        -   directoryLastUpdate: The last time the user's data was synchronized from the directory.
        -   directoryGroupLastUpdate: The last time this user's group membership was synchronized from the directory.
        -   communityLastUpdate: The last time this user's Community membership was synchronized.

    For example:

    ```
    WikisMemberService.getById("2d93497d-065a-4022ae25-a4b52598d11a")
    ```

WikisMemberService.getByExtId\(string externalId\)
:   Returns information about a user that is specified by a user ID. The command searches the Wikis database only, so it returns only those users who logged in at least once.

    Parameters:

    externalId
    :   A string value that matches the user's external directory ID. This value can be any parameter in the user directory that you configured as the directory ID. The following user information is returned:

        -   id: The user ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.
        -   name: The user's name in the database as of the date in directoryLastUpdate.
        -   email: The user's email address.
        -   isOrphan: Returns true if the user is in the database, but not the directory.
        -   createDate: The date that the user was added to the database.
        -   lastVisit: The date of the user's last login.
        -   directoryLastUpdate: The last time the user's data was synchronized from the directory.
        -   directoryGroupLastUpdate: The last time this user's group membership was synchronized from the directory.
        -   communityLastUpdate: The last time this user's Community membership was synchronized.

    For example:

    ```
    WikisMemberService.getByExtId("2d93497d-065a-4022ae25-a4b52598d11a")
    ```

WikisMemberService.getByEmail\(string email\)
:   Returns information about a user that is specified by a user ID. The command searches the Wikis database only, so it returns only those users who logged in at least once.

    Parameters:

    email
    :   The email address for the user. The following user information is returned:

        -   id: The user ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.
        -   name: The user's name in the database as of the date in directoryLastUpdate.
        -   email: The user's email address.
        -   isOrphan: Returns true if the user is in the database, but not the directory.
        -   createDate: The date that the user was added to the database.
        -   lastVisit: The date of the user's last login.
        -   directoryLastUpdate: The last time the user's data was synchronized from the directory.
        -   directoryGroupLastUpdate: The last time this user's group membership was synchronized from the directory.
        -   communityLastUpdate: The last time this user's Community membership was synchronized.

    For example:

    ```
    WikisMemberService.getByEmail("john_doe@company.com")
    ```

WikisMemberService.syncAllMembersByExtId\( \{"updateOnEmailLoginMatch": \["true" \| "false"\] \} \)
:   For more information, see *Synchronizing user data using administrative commands*.

WikisMemberService.syncMemberByExtId\("currentExternalId"\[, \{"newExtId" : "id-string" \[, "allowExtIdSwap" : \["true" \| "false"\] \] \} \] \)
:   For more information, see *Synchronizing user data using administrative commands*.

WikisMemberService.inactivateMemberByEmail\("email"\)
:   For more information, see *Synchronizing user data using administrative commands*.

WikisMemberService.inactivateMemberByExtId\("externalID"\)
:   For more information, see *Synchronizing user data using administrative commands*.

WikisMemberService.getMemberExtIdByEmail\("email"\)
:   For more information, see *Synchronizing user data using administrative commands*.

WikisMemberService.getMemberExtIdByLogin\("login"\)
:   For more information, see *Synchronizing user data using administrative commands*.

WikisMemberService.syncBatchMemberExtIdsByEmail\("emailFile" \[, \{"allowInactivate" : \["true" \| "false"\] \} \] \)
:   For more information, see *Synchronizing user data using administrative commands*.

WikisMemberService.syncBatchMemberExtIdsByLogin\("loginFile" \[, \{"allowInactivate" : \["true" \| "false"\] \} \] \)
:   For more information, see *Synchronizing user data using administrative commands*.

WikisMemberService.syncMemberExtIdByEmail\("email" \[, \{ "allowInactivate": \["true" \| "false"\] \} \]\)
:   For more information, see *Synchronizing user data using administrative commands*.

WikisMemberService.syncMemberExtIdByLogin\("name" \[, \{"allowInactivate": \["true" \| "false"\] \} \]\)
:   For more information, see *Synchronizing user data using administrative commands*.

## WikisLibraryService {#WikisLibraryService_section .section}

WikisLibraryService.getById\(string libraryId\)
:   Returns information about a single library that is specified by an ID. A library comprises the pages, attachments, and other data that make up a wiki. It includes all wiki page versions but does not include metadata such as comments.

    Parameters:

    libraryId
    :   The library ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000. The following information is returned:

        -   id: The library ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.
        -   ownerUserId: The user ID of the library owner in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.
        -   type: The type of library. The only valid value is `wiki`.
        -   label: A string of characters that are used to identify the library in a URL.
        -   title: The library's title.
        -   summary: A summary of library information.
        -   size: The total size of the library binary data.
        -   percentUsed: The percentage of the maximum allowable size that is used, according to the library's policy. Zero if not applicable.
        -   maximumSize: The maximum size \(in bytes\) the library's policy allows. Zero for unlimited.
        -   policyId: The ID of the policy that sets a maximum limit \(in bytes\) on the library's size, in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.
        -   lastUpdate: The last time a significant user-driven update occurred to the metadata.
        -   createDate: The library's creation date.
        -   externalInstanceId: The widget ID if the library is owned by a community.
        -   externalContainerId: The community ID if the library is owned by a community.
        -   themeName: The theme that the community owner selected in communities. Returned for community libraries only.
        -   orphan: The value is true if the library owner is no longer active. Returned for personal libraries only.

    For example:

    ```
    WikisLibraryService.getById("2d93497d-065a-4022ae25-a4b52598d11a")
    ```

WikisLibraryService.delete\(string libraryId\)
:   Deletes the library that is specified by the library ID, including all associated content.

    A library is the pages, attachments, and other data that make up a wiki. It includes all wiki page versions, but does not include metadata such as comments. It includes all wiki page versions, but does not include metadata such as comments.

    Parameters:

    libraryID
    :   The library ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.

    For example:

    ```
    WikisLibraryService.delete("f0d01111-9b21-4dd8-b8be-8825631cb84b")
    ```

WikisLibraryService.deleteBatch\(string filePath\)
:   Deletes libraries that are specified in a text file. The file must contain a list with a single library ID per line in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000. You must create the file and save it in a directory local to the server where you are running the wsadmin processor.

    A library is the pages, attachments, and other data that make up a wiki. It includes all wiki page versions, but does not include metadata such as comments. It includes all wiki page versions, but does not include metadata such as comments.

    Parameters:

    filePath
    :   The full path to the text file, as a string.

    For example:

    ```
    WikisLibraryService.deleteBatch("C:/connections/delete_libraries.txt")
    ```

WikisLibraryService.assignPolicy\(string libraryId, string policyId\)
:   Assigns a policy to a library. A library is the pages, attachments, and other data that make up a wiki. It includes all wiki page versions, but does not include metadata such as comments. It includes all wiki page versions, but does not include metadata such as comments. A policy sets a maximum size for a wiki.

    No message is printed if the task succeeds.

    Parameters:

    libraryId
    :   The library ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.

    policyId
    :   The policy ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.

    For example:

    ```
    WikisLibraryService.assignPolicy("f0d01111-9b21-4dd8-b8be-8825631cb84b",
        "2d93497d-065a-4022ae25-a4b52598d11a")
    ```

WikisLibraryService.assignPolicyBatch\(string filePath\)
:   Assigns policies to libraries as specified in a text file. The file must contain a list of library-policy ID pairs, one pair per line, values separated by a comma. For example: `libraryId, policyId`. Extra white space is ignored. You must create this text file and save it in a directory local to the server where you are running the wsadmin processor.

    A library is the pages, attachments, and other data that make up a wiki. It includes all wiki page versions, but does not include metadata such as comments. It includes all wiki page versions, but does not include metadata such as comments.

    Parameters:

    filePath
    :   The full path to the text file, as a string.

    For example:

    ```
    WikisLibraryService.assignPolicyBatch("C:/connections/assign_policies.txt")
    ```

WikisLibraryService.browseWiki\(string sortOption, string sortAscending, int pageNumber, int itemsPerPage\)
:   Returns a list of all wikis, with information about each wiki. The list includes wikis that are owned by communities, and wikis whose owners were removed from the user directory.

    Parameters:

    sortOption
    :   A string value that specifies how to sort the list. The default value is `title`, but you can use `lastUpdate`, `size`, `createDate`, or `quotaPercentage`.

    sortAscending
    :   A string value that specifies whether to sort the list in ascending alphabetical order. This value depends on the sortOption value. If sortOption is title, then this value is `true`; if sortOption any other value, then this value is `false`.

    pageNumber
    :   The number of the page to display. For example, if you specify in the itemsPerPage parameter that each page has 50 items, page 1 contains items 1-50.

    itemsPerPage
    :   The maximum number of wikis to list per page. The default value is 20. The following information is returned:

        -   id: The library ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.
        -   ownerUserId: The user ID of the library owner in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.
        -   type: The type of library. The only valid value is `wiki`.
        -   label: A string of characters that are used to identify the library in a URL.
        -   title: The library's title.
        -   summary: A summary of library information.
        -   size: The total size of the library binary data.
        -   percentUsed: The percentage of the maximum allowable size that is used, according to the library's policy. Zero if not applicable.
        -   maximumSize: The maximum size \(in bytes\) the library's policy allows. Zero for unlimited.
        -   policyId: The ID of the policy that sets a maximum limit \(in bytes\) on the library's size, in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.
        -   lastUpdate: The last time a significant user-driven update occurred to the metadata.
        -   createDate: The library's creation date.
        -   externalInstanceId: The widget ID if the library is owned by a community.
        -   externalContainerId: The community ID if the library is owned by a community.
        -   themeName: The theme the community owner selected in communities. Returned for community libraries only.
        -   orphan: The value is true if the library owner is no longer active. Returned for personal libraries only.

    For example:

    ```
    WikisLibraryService.browseWiki("title", "true", 1, 25)
    ```

WikisLibraryService.getWikiCount\(\)
:   Returns the total number of wikis.

WikisLibraryService.exportSyncedResourceInfo \(string fullpathForOutput, string type\)
:   Returns a report of all of the communities that the Wikis application interacted with. After a system crash you can compare the report to the latest metadata in the Communities database to help synchronize and update any missing data. For more information, see *Comparing remote application data with the Communities database*.

    When you run the command from the deployment manager, the path and file are created on the server that hosts the Wikis application. In clusters where multiple nodes host Wikis, you must select a server to connect to and run the command on; the path and file are created on that server.

    Parameters:

    fullPathforOutput
    :   The report file name and full path of the report, as a string in quotation marks. The report is an XML file. Use forward slashes \("/"\) in the path, regardless of the operating system.

    type
    :   This value is always community, including quotation marks. An error is returned if this value is anything other than community.

    For example:

    ```
    WikisLibraryService.exportSyncedResourceInfo("c:/connections/sync/community_output.xml", "community")
    ```

WikisLibraryService.getByExternalContainerId\(string community\_id\)
:   Returns information about the community libraries available in the named Wiki.

    Parameters:

    community\_id
    :   The community id in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.

    For example:

    ```
    WikisLibraryService.getByExternalContainerId("003456bc-078d-e990-0450-x12345678900")
    ```

## WikisDataIntegrityService {#WikisDataIntegrityService_section .section}

WikisDataIntegrityService.checkFiles\(string extraFileDirectory\)
:   Checks the integrity of the binary files in the file system extra filesdirectory against the metadata in the database. The results are output to log files in a specified directory. The database is used as the primary source. During a backup, the file system is assumed to have extra data, if there is any.

    The task logs a message for every extra file that is found or for every missing file. Missing files are errors that must be resolved by finding the files or restoring a backup. The application cannot start in a consistent state until you resolve these errors.

    This information might be useful before you restore database and file system images to see how closely they match in a test environment. For more information, see *Checking Wikis data integrity*.

    Parameters:

    extraFileDirectory
    :   A directory path as a string. This path is the location where you want to store files that are not found in the database. If the directory does not exist, the command creates it. If the directory cannot be created, or read or written to, an error is returned.

    For example:

    ```
    WikisDataIntegrityService.checkFiles("C:/wikis_integrity")
    ```

## WikisPrintService {#WikisPrintService_section .section}

WikisPrintService.saveToFile\(string object, string filePath, string append\)
:   Prints information that is returned by other commands to a file.

    Parameters:

    object
    :   A command with parameters that returns a `Map` or `List<Map>` Java object. You can use any of the following commands:

        -   WikisMemberService.getById \(returns a `Map`\)
        -   WikisMemberService.getByExtId \(returns a `Map`\)
        -   WikisMemberService.getByEmail \(returns a `Map`\)
        -   WikisLibraryService.getById \(returns a `Map`\)
        -   WikisLibraryService.browseWiki \(returns a `List<Map>`\)
        -   WikisPolicyService.getById \(returns a `Map`\)
        -   WikisPolicyService.browse \(returns a `List<Map>`\>\)
        -   WikisMetricsService.browse \(returns a `List<Map>`\)

    filePath
    :   A path to a file in which to save the object data. The data is saved in comma-separated value \(.csv\) format.

    append
    :   String whose default value is "true". Change to "false" to have the command overwrite the existing file instead of appending the data in the existing file.

    Example:

    ```
    WikisPrintService.saveToFile(WikisLibraryService.browseWiki("title","true", 1, 20), "/opt/wsadmin/LibraryMap.txt")
    ```

## WikisScheduler {#WikisScheduler_section .section}

WikisScheduler.pauseSchedulingTask\(string taskName\)
:   Suspends scheduling of a task. Has no effect on currently running tasks. Returns a 1 to indicate that the task is paused. Paused tasks remain paused until you explicitly resume them, even if the server is stopped and restarted.

    Parameters:

    taskName
    :   Any one of these task names, as a string value:

        -   DirectoryGroupSynch
        -   FileActuallyDelete
        -   SearchClearDeletionHistory
        -   MetricsDailyCollection
        -   TagUpdateFrequency

    For example:

    ```
    WikisScheduler.pauseSchedulingTask("DirectoryGroupSynch")
    ```

WikisScheduler.resumeSchedulingTask\(string taskName\)
:   Resumes the start of a paused task. Returns a 1 to indicate that the task is resumed.

    Parameters:

    taskName
    :   Any one of these task names, as a string value:

        -   DirectoryGroupSynch
        -   FileActuallyDelete
        -   SearchClearDeletionHistory
        -   MetricsDailyCollection
        -   TagUpdateFrequency

    For example:

    ```
    WikisScheduler.resumeSchedulingTask("DirectoryGroupSynch")
    ```

WikisScheduler.forceTaskExecution\(string taskName, string executeSynchronously\)
:   Runs a task. Returns a 1 to indicate that the task has run.

    Property settings in the `wikis-config.xml` configuration properties file specify whether tasks are enabled to run automatically, and how often. Use this command to run tasks manually, for example if you disabled a task but want to run it occasionally.

    Parameters:

    taskName
    :   Any one of these task names, as a string value:

        -   DirectoryGroupSynch
        -   FileActuallyDelete
        -   SearchClearDeletionHistory
        -   MetricsDailyCollection
        -   TagUpdateFrequency

    executeSynchronously
    :   Takes the string values `true` or `false`. Specifying this value is not required; the default is `false`. If this value is `false`, then the task runs asynchronously, meaning if the taskId is valid the command returns immediately and the execution continues in the background. If this value is `true`, it the command does not return until the task completes.

    For example:

    ```
    WikisScheduler.forceTaskExecution("DirectoryGroupSynch")
    ```

WikisScheduler.getTaskDetails\(string taskName\)
:   Displays status of a task. Returns detailed status message.

    Parameters:

    taskName
    :   Any one of these task names, as a string value:

        -   DirectoryGroupSynch
        -   FileActuallyDelete
        -   SearchClearDeletionHistory
        -   MetricsDailyCollection
        -   TagUpdateFrequency

    For example:

    ```
    WikisScheduler.getTaskDetails("DirectoryGroupSynch")
    ```

## WikisPolicyService {#WikisPolicyService_section .section}

WikisPolicyService.add\(string title, long maximumSize\)
:   Creates a policy with a specified title and maximum size. Policies set a maximum size limit on libraries. A library is the pages, attachments, and other data that make up a wiki. It includes all wiki page versions, but does not include metadata such as comments. It includes all wiki page versions, but does not include metadata such as comments.

    When a policy is created, an ID is created for it and returned to you. The ID is in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000. You must provide policy IDs as parameters when you run other WikisPolicyService commands.

    Policies can be applied to libraries by using the WikisLibraryService.assignPolicy or WikisLibraryService.assignPolicyBatch commands.

    Parameters:

    title
    :   The policy title. A required value.

    maximumSize
    :   The maximum size that is allowed, in bytes. Must be zero or greater. A value of zero means the size is unlimited.

        Numbers 2 GB or greater are long literals, and you must add an "L" to the end of the number, for example a policy of 2 GB must be `2147483648L`.

    For example:

    ```
    WikisPolicyService.add("My Policy", 2147483648L)
    ```

WikisPolicyService.edit\(string policyId, string title, long maximumSize\)
:   Edits the title and maximum size of a policy with a specified ID. If the ID is for a default policy, the title is not modified. Policies set a maximum size limit on libraries. A library is the pages, attachments, and other data that make up a wiki. It includes all wiki page versions, but does not include metadata such as comments. It includes all wiki page versions, but does not include metadata such as comments.

    Parameters:

    policyID
    :   The policy ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.

    title
    :   The policy title. A required value.

    maximumSize
    :   The maximum size that is allowed, in bytes. Must be zero or greater. A value of zero means the size is unlimited.

        Numbers 2 GB or greater are long literals, and you must add an "L" to the end of the number, for example a policy of 2 GB must be `2147483648L`.

    For example:

    ```
    WikisPolicyService.edit("2d93497d-065a-4022ae25-a4b52598d11a", 
       "My Policy", 2147483648L)
    ```

WikisPolicyService.getById\(string id\)
:   Returns information for a single policy that is specified by an ID. Policies set a maximum size limit on libraries.

    A library is the pages, attachments, and other data that make up a wiki. It includes all wiki page versions, but does not include metadata such as comments. It includes all wiki page versions, but does not include metadata such as comments.

    Parameters:

    id
    :   The policy ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000. The following information is returned:

        -   id: the ID
        -   title: the policy title
        -   maximumSize: the maximum size \(in bytes\) the library can be, or 0 for unlimited

    For example:

    ```
    WikisPolicyService.getById("2d93497d-065a-4022ae25-a4b52598d11a")
    ```

WikisPolicyService.browse\(string sortOption, string sortAscending, int pageNumber, int itemsPerPage\)
:   Returns a list of policies with ID, title, and maximum size information, as described for the WikisPolicyService.getById\(id\) command. Policies set a maximum size limit on libraries.

    A library is the pages, attachments, and other data that make up a wiki. It includes all wiki page versions, but does not include metadata such as comments.

    Parameters:

    sortOption
    :   A string value that specifies how to sort the list. The default value is `title`, but you can also use `maximumSize`.

    sortAscending
    :   A string value that specifies whether the list sorts in ascending alphabetical order. This value depends on sortOption. If sortOption is title, then this value is `true`; if sortOption any other value, then this value is `false`.

    pageNumber
    :   The number of the page to return. For example, if the itemsPerPage value is 40, and pageNumber value is 2, the command returns items 41 - 80 \(page 2\) instead of 1 to 40 \(page 1\).

    itemsPerPage
    :   The maximum number of policies to list per page. The default value is 20.

    For example:

    ```
    WikisPolicyService.browse("title", "true", 1, 25)
    ```

WikisPolicyService.getCount\(\)
:   Returns the number of policies. Policies set a maximum size limit on libraries. A library is the pages, attachments, and other data that make up a wiki. It includes all wiki page versions, but does not include metadata such as comments.

WikisPolicyService.editDefault\(long maximumSize\)
:   Sets the maximum size, in bytes, for the personal wiki library default policy. Personal wikis are owned by a person.

    Parameters:

    maximumSize
    :   A number that represents the maximum size that is allowed, in bytes, for wikis that the default policy is assigned to.

        Numbers 2 GB or greater are long literals, and you must add an "L" to the end of the number, for example a policy of 2 GB must be `2147483648L`.

    For example:

    ```
    WikisPolicyService.editDefault(2147483648L)
    ```

WikisPolicyService.editCommunityDefault\(long maximumSize\)
:   Sets the maximum size, in bytes, for the community wiki library default policy. Community wikis are owned by a community.

    Parameters:

    maximumSize
    :   A number that represents the maximum size that is allowed, in bytes, for wikis that the default policy is assigned to.

        Numbers 2 GB or greater are long literals, and you must add an "L" to the end of the number, for example a policy of 2 GB must be `2147483648L`.

    For example:

    ```
    WikisPolicyService.editCommunityDefault(2147483648L)
    ```

WikisPolicyService.delete\(string id\)
:   Deletes the policy that is specified by the ID. You cannot delete default policies or policies in use by any libraries.

    id
    :   The policy ID in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.

    For example:

    ```
    WikisPolicyService.delete("f0d01111-9b21-4dd8-b8be-8825631cb84b")
    ```

## WikisMetricsService {#WikisMetricsService_section .section}

WikisMetricsService.browse\(string startDate, string endDate, string filePathWithFilterKeys\)
:   Returns metrics about wikis that are stored in the database. The same metrics are provided for each day in a specified period.

    If you do not specify dates, then the command uses the first available day with data for startDate, and the last available day with data for endDate.

    See the topic *Wikis metrics* for metrics and their descriptions.

    Parameters:

    startDate
    :   The start date for the period, in YYYY-MM-DD format. This date is included in the returns, for example a start date of "2009-01-01" will include metrics from January 1, 2009. It must be in quotation marks, for example "2009-01-01".

    endDate
    :   The end date for the period, in YYYY-MM-DD format. This date is included in the returns, for example an end date of "2009-01-10" will include metrics from January 10, 2009. It must be in quotation marks, for example "2009-01-10".

    filePathWithFilterKeys
    :   Optional: The full path to a text file in which each line contains a statistical key. If you specify a file, only metrics that are listed in the file are returned. If you do not specify a file, all data is returned.

    For example:

    ```
    WikisMetricsService.browse("2009-01-01", 
       "2009-01-10", "C:/connections/wikis/metrics.txt")
    ```

WikisMetricsService.saveToFile\(string filePath, string startDate, string endDate, string filePathWithFilterKeys, string append\)
:   Returns metrics about wikis and exports them to a local file. The same metrics are provided for each day in a specified period.

    If you do not specify dates, then the command uses the first available day with data for startDate, and the last available day with data for endDate.

    See the topic *Wikis metrics* for metrics and their descriptions.

    Parameters:

    filePath
    :   Path to a file in which to export the metrics. Metrics are exported in comma-separated value \(CSV\) format. If you specify a file name with a .csv extension, it is possible to open it as a spreadsheet. See *Importing statistics and metrics into a spreadsheet*.

    startDate
    :   The start date for the period, in YYYY-MM-DD format. This date is included in the returns, for example a start date of "2009-01-01" will include metrics from January 1, 2009. It must be in quotation marks, for example "2009-01-01".

    endDate
    :   The end date for the period, in YYYY-MM-DD format. This date is included in the returns, for example an end date of "2009-01-10" will include metrics from January 10, 2009. It must be in quotation marks, for example "2009-01-10".

    filePathWithFilterKeys
    :   Optional: The full path to a text file in which each line contains a metric key. If you specify a file, only metrics that are listed in the file are returned. If you do not specify a file, all data is returned. For example, if the file lists these three keys, then only these metrics are returned:

        ```
        wikis.metric.user.count
        wikis.metric.user.created.today.count
        wikis.metric.user.login.count
        ```

    append
    :   String whose default value is "true". Change to "false" to have the command overwrite the existing file instead of appending the data in the existing file.

    For example:

    ```
    WikisMetricsService.saveToFile("C:/connections/wikis/metrics.csv", 
       "2009-01-01", "2009-01-10", 
       "C:/connections/wikis/metric_keys.txt", "false")
    ```

WikisMetricsService.getAvailableRange\(\)
:   Returns a string array where the first element is the first day data is available and the second element is the last day that data is available for wiki libraries. Typically, the current day's data is not available until 12:01 A.M. the following day.

    If metrics collection was disabled or did not occur because of some issue, there might be gaps in data available.

## WikisUtilService {#WikisUtilService_section .section}

WikisUtilService.filterListByString\(List listOfMaps, string filterKey, string regexstringCriteria\)
:   Returns maps from a specified list that have a specified key that matches a specified regular expression. Use this command to filter `List<Map>` Java objects that are returned by any of the browse commands, such as WikisLibraryService.browseWiki.

    A map is a list of key/value pairs, for example the WikisLibraryService.browseWiki command returns a list of libraries. Each library in the list is a map with a set of keys, and each key is paired with a value. Every library has the same set of keys, but unique values. Values contain information about the library, such as its title and creation date.

    Parameters:

    listOfMaps
    :   A list of maps, for example the result of WikisLibraryService.browseWiki\(parameters\).

    filterKey
    :   A key in each map in the list, whose value is compared against the filter criteria.

    regexstringCriteria
    :   A regular expression that is represented as a string to match against the filterKey value. For example, "\[0-9\]+" to match only \>= 1 numbers in a row.

    The command returns maps from the listOfMaps whose filterKey is the regexstringCriteria value. For example, this command shows only the returned maps whose title values match the expression "Development\*":

    ```
    WikisUtilService.filterListByString(WikisLibraryService.browseWiki("title",
    "true", 1, 25), "title", "Development*")
    ```

WikisUtilService.filterListByDate\(List listOfMaps, string filterKey, expression\)
:   Returns maps from a specified list that have a specified key with a specified date. Use this command to filter `List<Map>` Java objects that are returned by any of the browse commands, such as WikisLibraryService.browseWiki.

    A map is a list of key/value pairs, for example the WikisLibraryService.browseWiki command returns a list of libraries. Each library is a map with a set of keys, and each key is paired with a value. Every library has the same set of keys, but unique values. Values contain information about the library, such as its title and creation date.

    Parameters:

    listOfMaps
    :   A list of maps, for example the result of WikisLibraryService.browseWiki\(parameters\).

    filterKey
    :   A key in each map in the list, whose value is compared against the filter criteria.

    expression
    :   A string of the form <operator\> <date\> where <date\> is in yyyy-MM-dd format and <operator\> is one of the following characters: \> \>= == <= <

    The command returns maps from the listOfMaps value whose filterKey value is the expression value. For example, this command shows only the returned maps whose creation date is on or later than January 1, 2010:

    ```
    WikisUtilService.filterListByDate(WikisLibraryService.browseWiki("title",
       "true", 1, 25), "createDate", ">=2010-01-01")
    ```

WikisUtilService.filterListByNumber\(List listOfMaps, string filterKey, expression\)
:   Returns maps from a specified list that have a specified key with a specified number. Use this command to filter `List<Map>` Java objects that are returned by any of the browse commands, such as WikisLibraryService.browseWiki.

    A map is a list of key/value pairs, for example the WikisLibraryService.browseWiki command returns a list of libraries. Each library is a map with a set of keys, and each key is paired with a value. Every library has the same set of keys, but unique values. Values contain information about the library, such as its title and creation date.

    Parameters:

    listOfMaps
    :   A list of maps, for example the result of WikisLibraryService.browseWiki\(parameters\).

    filterKey
    :   A key in each map in the list, whose value is compared against the filter criteria.

    expression
    :   A string of the form <operator\> <int\> where <int\> is an integer and <operator\> is one of the following characters: \> \>= == <= <

    The command returns maps from the listOfMaps value whose filterKey value is the expression value. For example, this command shows only the returned maps whose `percentUsed` value \(which reflects the percent of the library's available space that is used\) is 20:

    ```
    WikisUtilService.filterListByNumber(WikisLibraryService.browseWiki("title",
       "true", 1, 25), "percentUsed", "==20")
    ```

WikisUtilService.getFileById\(string fileID\)
:   Returns the file path location of the wiki page file attachment that is identified by a provided file ID. Returns a path even if the file is not in use.

    Use this command to find the location of any file attachment that is stored in the shared file directory. This command can be useful when you want to restore backup versions of data. For more information, see [*Backing up Files data*](t_admin_files_backup.md).

    fileID
    :   The ID of a file in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.

    For example:

    ```
    WikisUtilService.getFileById("2d93497d-065a-4022ae25-a4b52598d11a")
    ```

**Parent topic:**[Running Wikis administrative commands](../admin/t_admin_wikis_run_commands.md)

**Related information**  


[Comparing remote application data with the Communities database](../admin/t_admin_communities_sync_remote_apps.md)

[Checking Wikis data integrity](../admin/t_admin_wikis_data_integrity.md)

[Backing up Wikis data](../admin/t_admin_wikis_backup.md)

[Running administrative commands](../admin/t_admin_common_edit_admin_props.md)

[Wikis configuration properties](../admin/r_admin_wikis_config_properties2.md)

