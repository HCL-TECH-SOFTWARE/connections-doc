# Creating a background index {#t_admin_search_create_standalone_index .task}

Use the SearchService.startBackgroundIndex command to create a background index. Using this command helps you to remove inconsistencies from your Search index without the need for downtime while the index is rebuilt.

To use SearchService administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command line tool.

Use the SearchService.startBackgroundIndex command to create a background index in a specified location. When you use this command, the Search application performs a full crawl of the specified applications and then builds the index at the chosen location. If an index exists at the location, the crawl resumes from the resume point that is stored in the Search index at that location.

A file that is called INDEX.READY is created in the specified location when the background index is complete.

1. To create a background index, complete the following steps.
2. Start the wsadmin client from one of the following directories on the system on which you installed the Deployment Manager:

    Linux: `[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin`

    Windows: `[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/bin`

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3. After the wsadmin command environment has initialized, enter the following command to initialize the Search environment and start the Search script interpreter:

    ```
    execfile("searchAdmin.py")
    ```

    If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    When the command is run successfully, the following message displays:

    ```
    Search Administration initialized
    ```

4. Use the following command:

    ```SearchService.startBackgroundIndex(String persistenceLocation, String extractedFileContentLocation, String indexLocation, String applications, String jobs, Boolean isIndexingMultiThreaded)```

    Creates a background index in the specified location.

    This command crawls the seedlists for the specified applications, saves the seedlists to the specified persistence location, and extracts the file content. The command then builds a Search index for the applications at the specified index location.

    You can run social analytics indexing jobs at the end of the background indexing operation. Alternatively, you can run the SearchService.startSandBackgroundIndex if you want to create a background index for the social analytics service. For more information, see *Creating a background index for the social analytics service*.

    !!! note 
        
        This command is case-sensitive, even on Windows. For example, if you specify c:\\temp as the location to create the seedlist, but the directory is C:\\Temp, an error message is returned.

    This command takes the following arguments:

    - persistenceLocation
        
        A string value that specifies the location where you want to save the application seedlists.

    - extractedFileContentLocation
    
        The file content extraction location. Use the same location that you specified when you previously extracted the file content by using the SearchService.startBackgroundFileContentExtraction command or the SearchService.startBackgroundIndex command. Otherwise, specify an empty directory as the location for storing the extracted file content.

    - indexLocation
    
        A string value that specifies the location where you want to create the background index.

    - applications
    
        A string value that specifies the names of the applications that you want to include in the index crawl. The following values are valid:

        - activities
        - all\_configured
        - blogs
        - calendar
        - communities
        - dogear
        - ecm\_files
        - files
        - forums
        - people\_finder
        - profiles
        - status\_updates
        - wikis
            
        Use all\_configured rather than listing all the indexable applications when you want to index all the applications.

        To queue up multiple applications for indexing, run a single instance of the SearchService.startBackgroundIndex command with the names of the applications that you want to index listed with a comma separator between them. If you run multiple instances of the command with a single application specified as a parameter, a lock is established when you run the first command so that only the first application that is specified is indexed successfully.

    - jobs
    
        A string value that specifies the names of the social analytics post-processing indexers that examine, index, and produce new output based on the data in the index. The following values are valid: evidence, graph, manageremployees, tags, taggedby, and communitymembership. Use a comma to separate multiple values. This parameter is optional.

    - isIndexingMultiThreaded
    
        A Boolean value that specifies whether the index build is multithreaded. This parameter is optional.

        Examples:

        ```
        SearchService.startBackgroundIndex("/opt/IBM/Connections/data/local/search/backgroundCrawl", 
        "/opt/IBM/Connections/data/local/search/backgroundExtracted", 
        "/opt/IBM/Connectios/data/local/search/background/backgroundIndex",
        "activities, blogs, calendar, communities, dogear, files, forums,
        profiles, wikis, status_updates", "communitymembership, graph")
        ```

        ```
        SearchService.startBackgroundIndex("/opt/IBM/Connections/data/local/search/backgroundCrawl",
        "/opt/IBM/Connections/data/local/search/backgroundExtracted",
        "/opt/IBM/Connections/data/local/search/background/backgroundIndex",
        "all_configured")
        ```


5. To start using the new index, complete the steps for restoring an index as described in *Restoring the Search index*. The steps that you need to perform vary depending on your deployment type.

6. Copy the extracted file content to the directory specified by the WebSphere Application Server environmental variable EXTRACTED\_FILE\_STORE so that the files do not have to be converted again unnecessarily during indexing. For more information about the EXTRACTED\_FILE\_STORE variable, see *WebSphere Application Server environment variables*.

**Parent topic:**[Creating background indexes](../admin/c_admin_search_create_bgd_index.md)

**Related information**  


[Creating a background index for the social analytics service](../admin/t_admin_search_create_bgd_sand_index.md)

[Restoring the Search index](../admin/c_admin_search_restore_index.md)

[WebSphere Application Server environment variables](../admin/r_admin_common_was_env_variables.md)

