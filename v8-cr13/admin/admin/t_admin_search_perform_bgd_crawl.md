# Performing a background crawl {#t_admin_search_perform_bgd_crawl .task}

You can use a SearchService command to perform a background crawl of the Search seedlists without creating a Search index.

See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

The SearchService.startBackgroundCrawl command allows you to crawl the application seedlists and save those seedlists to a specified location. You might want to use this command if you are experiencing issues with crawling and you want to verify that the crawling process is completing successfully.

1. To perform a background crawl of the Search seedlists, complete the following steps.
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

4. Enter the following command:

    ```SearchService.startBackgroundCrawl(String persistenceLocation, String components)``
    
    Crawls the seedlists for the specified applications and then saves the seedlists to the specified location. This command does not build an index.

    The command takes the following parameters:

    - persistenceLocation
        
        A string that specifies the path to which the seedlists are to be saved.

    - components
        
        A string that specifies the applications whose seedlists are to be crawled. The following values are valid:

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
            
        Use all\_configured instead of listing all indexable services when you want to crawl all the applications.

        For example:

        ```
        SearchService.startBackgroundCrawl("/opt/IBM/Connections/backgroundCrawl", 
           "activities, forums, communities, wikis")
        ```


After completing a background crawl, perform one of the following options:

- Extract file content. For more information, see *Extracting file content*.
- Create a background index. For more information, see *Creating a background index*.
- Create a foreground index. For more information, see *Recreating the Search index*.

    If you want to create a foreground index, copy the persisted seedlists from the persistence location that you specified when you used the startBackgroundIndex command to the CRAWLER\_PAGE\_PERSISTENCE\_DIR directory on the node that is doing the indexing.

    In a multi-node system, you might want to copy the seedlists to the CRAWLER\_PAGE\_PERSISTENCE\_DIR directory on all nodes. Alternatively, you can set the CRAWLER\_PAGE\_PERSISTENCE\_DIR variable to a network location and copy the persisted seedlists from the persistence location you specified to that location.


**Parent topic:**[Creating background indexes](../admin/c_admin_search_create_bgd_index.md)

**Related information**  


[Configuring the number of crawling threads](../admin/t_admin_search_set_max_crawling_threads.md)

[Verifying that Search is crawling regularly](../admin/t_admin_search_verify_index_crawling.md)

[Extracting file content](../admin/t_admin_search_extract_file_content.md)

