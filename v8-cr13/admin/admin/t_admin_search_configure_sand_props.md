# Configuring global properties for the social analytics service {#t_admin_search_configure_sand_props .task}

Use SearchService commands to list, add, update, or delete global properties for the social analytics service.

To use SearchService administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

You can have greater control over the social analytics service by configuring dynamic, global properties that affect the social analytics API or indexing behavior. For example, you might want to configure the property that defines the frequency threshold of tags so that you can tune out popular tags from the recommendations provided to users.

1.  To configure global properties for the social analytics service, complete the following steps.
2.  Start the wsadmin client from one of the following directories on the system on which you installed the Deployment Manager:

    Linux: `[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin`

    Windows: `[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/bin`

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  After the wsadmin command environment has initialized, enter the following command to initialize the Search environment and start the Search script interpreter:

    ```
    execfile("searchAdmin.py")
    ```

    If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    When the command is run successfully, the following message displays:

    ```
    Search Administration initialized
    ```

4.  Use the following commands to configure social analytics properties:

    SearchService.listGlobalSandProperties\(\)
    :   Lists all global properties for the social analytics service.

        The properties are returned as a mapping of keys to values. For example, the following output indicates that the value of the sand.tag.freq.threshold property is 32000.

        ```
        {sand.tag.freq.threshold=32000}
        ```

    SearchService.setGlobalSandIntegerProperty\(String propertyName, String integerProperyValue\)
    :   Adds or updates a dynamic global social analytics property that affects the social analytics API or indexing behavior. The changes take place when the next social analytics indexing job starts.

        When the property is successfully added or updated, 1 is printed to the wsadmin console. If the property is not successfully added or updated, then you will see 0 printed to the wsadmin console. If this happens, contact the Search Cluster Administration and check the SystemOut.log file for more details.

        Currently, support is provided only for the sand.tag.freq.threshold social analytics property. This property takes an integer value.

        The property is used by the Recommend API algorithm as follows:

        1.  Get the people and tags to which the user is related.
            -   If the tag has a frequency in the Search index that is greater than or equal to the value specified for the sand.tag.freq.threshold property, discard it. This action prevents users from getting recommendations based on common tags, that is, tags that have a high frequency.
        2.  Get the documents with which the people and tags gathered in the first query are associated.
        3.  Return the results to the user.
        For example:

        ```
        SearchService.setGlobalSandIntegerProperty("sand.tag.freq.threshold",100)
        ```

        **Notes:**

        -   This setting is global and will affect all HCL Connections users. The setting should only be changed by an administrator.
        -   You can consult the SystemOut.log file when social analytics indexing begins to check the frequency distribution of the most popular 100 tags in the system.

            For example, in line 1 of the following extract, you can see that the tag brown has ordinal 1718 in the index \(an ordinal is a facet identifier\) and that it has a frequency of 1, which means that there is only one instance of a document being tagged with the keyword brown in the index.

            ```
            [5/30/11 15:41:13:544 IST] 00000025 CommonTagsCac I com.ibm.lotus.connections.sand.tags.impl.CommonTagsCache buildCacheUsingTermEnum {1718:brown:1} 
            [5/30/11 15:41:13:548 IST] 00000025 CommonTagsCac I com.ibm.lotus.connections.sand.tags.impl.CommonTagsCache buildCacheUsingTermEnum {1730:summaries:1} 
            [5/30/11 15:41:13:551 IST] 00000025 CommonTagsCac I com.ibm.lotus.connections.sand.tags.impl.CommonTagsCache buildCacheUsingTermEnum {1737:public_holiday:1} 
            [5/30/11 15:41:13:554 IST] 00000025 CommonTagsCac I com.ibm.lotus.connections.sand.tags.impl.CommonTagsCache buildCacheUsingTermEnum {1721:chronicle:1} 
            [5/30/11 15:41:13:558 IST] 00000025 CommonTagsCac I com.ibm.lotus.connections.sand.tags.impl.CommonTagsCache buildCacheUsingTermEnum {1716:hollis:1} 
            [5/30/11 15:41:13:561 IST] 00000025 CommonTagsCac I com.ibm.lotus.connections.sand.tags.impl.CommonTagsCache buildCacheUsingTermEnum {1700:inquirer:1} 
            [5/30/11 15:41:13:565 IST] 00000025 CommonTagsCac I com.ibm.lotus.connections.sand.tags.impl.CommonTagsCache buildCacheUsingTermEnum {1684:gazette:5} 
            [5/30/11 15:41:13:568 IST] 00000025 CommonTagsCac I com.ibm.lotus.connections.sand.tags.impl.CommonTagsCache buildCacheUsingTermEnum {1679:ibm:7} 
            [5/30/11 15:41:13:572 IST] 00000025 CommonTagsCac I com.ibm.lotus.connections.sand.tags.impl.CommonTagsCache buildCacheUsingTermEnum Cache:{1679=7, 1684=5, 1700=1, 1716=1, 1718=1, 1721=1, 1730=1, 1737=1} 
            [5/30/11 15:41:13:633 IST] 00000025 IndexBuilderQ I com.ibm.lotus.connections.search.admin.index.impl.IndexBuilderQueue startSaNDIndexingService CLFRW0483I: SAND indexing has started.
            ```

    SearchService.deleteGlobalSandProperty\(String propertyName\)
    :   Deletes the specified global social analytics property.

        For example:

        ```
        SearchService.deleteGlobalSandProperty("sand.tag.freq.threshold")
        ```

        When the property is successfully added or updated, 1 is printed to the wsadmin console. If the property is not successfully added or updated, then you will see 0 printed to the wsadmin console. If this happens, contact the Search Cluster Administration and check the SystemOut.log file for more details.


**Parent topic:**[Administering the social analytics service](../admin/c_admin_search_sand_indexing_tasks.md)

**Related information**  


[Search error messages](../troubleshoot/r_error_codes_search.md)

