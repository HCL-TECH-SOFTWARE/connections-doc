# Configuring verbose logging {#t_admin_search_enable_verbose_logging .task}

Use SearchCellConfig commands to configure verbose logging for the Search application.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

Verbose logging enables you to record detailed status information related to crawling and indexing in the SystemOut.log file. This information can help you to monitor the progress of the Search crawling and indexing operations. Verbose logging is enabled by default.

1.  To configure verbose logging, complete the following steps.
2.  Start the wsadmin client from one of the following directories on the system on which you installed the Deployment Manager:

    Linux: `[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin`

    Windows: `[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/bin`

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

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

4.  Check out the Search cell-level configuration file, search-config.xml, with the following command:

    ```SearchCellConfig.checkOutConfig("working_dir", "cellName")```

    Where:

    - working\_dir is the temporary directory to which you want to check out the cell level configuration file. This directory must exist on the server where you are running the wsadmin client. Use forward slashes to separate directories in the file path, even if you are using the Microsoft Windows operating system.

        !!! note
            
            Linux only: The directory must grant write permissions or the command does not run successfully.

    - cellName is the name of the cell that the Search node belongs to. The command is case-sensitive. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor:

        ```print AdminControl.getCell()```

    For example:

    ```
    SearchCellConfig.checkOutConfig("c:/search_temp", "SearchServerNode01Cell")
    ```

5.  Use the following commands:

    - ```SearchCellConfig.enableVerboseLogging()```

        Enables more detailed status reporting during crawling and indexing in the form of more verbose logging to the SystemOut.log file. Verbose logging is automatically enabled when HCL Connections is installed.

        This command does not take any parameters.

        You can use the following commands to tune the frequency with which status information is logged to the SystemOut.log file during different stages of the crawling and indexing process:

        - SearchCellConfig.setVerboseInitialLoggingInterval\(int interval\)
        - SearchCellConfig.setVerboseSeedlistRequestLoggingInterval\(int interval\)
        - SearchCellConfig.setVerboseIncrementalCrawlingLoggingInterval\(int interval\)
        - SearchCellConfig.setVerboseIncrementalBuildingLoggingInterval\(int interval\)
        
        For more information about each of these commands, refer to the command descriptions that follow.

    - ```SearchCellConfig.disableVerboseLogging()```
    
        Disables verbose logging.

        This command does not take any parameters.

        Verbose logging fills the SystemOut.log file with detailed output that can occupy an increasing amount of disk space, unless you have configured your deployment to retain only a limited number of the most recent log files. A high turnover of logs might be a problem when you are trying to track down the cause of an issue if the log file that you are interested in has been deleted. For this reason, you might want to disable verbose logging. The performance impact of having verbose logging enabled is negligible.

    - ```SearchCellConfig.setVerboseInitialLoggingInterval(int initialInterval)```
    
        Controls the frequency with which initial index creation progress is logged to the SystemOut.log file.

        This command takes a single parameter:
        
        - initialInterval
    
            A positive integer that corresponds to a number of seedlist entries. A seedlist entry is an indexing instruction that specifies an action, such as the creation, deletion, or update of a specified document in the Search index. For example, if an interval of 500 is specified, then for every 500 entries processed, the number of seedlist entries indexed so far for an application by the current indexing job is logged. The initialInterval parameter is set to 250 by default.

            You can find additional logging information about initial index creation in the SystemOut.log file by searching for occurrences of the CLFRW0581I logging message. For example:
        
            ```
            CLFRW0581I: Search is continuing to build the index 
            for activities: 3500 seedlist entries indexed.
            ```

            For example:

            ```
            SearchCellConfig.setVerboseInitialLoggingInterval(500)
            ```

    - ```SearchCellConfig.setVerboseSeedlistRequestLoggingInterval(int seedlistRequestInterval)```

        Controls the frequency with which seedlist crawling progress is logged to the SystemOut.log file.

        This command takes a single parameter:

        - seedlistRequestInterval

            A positive integer that corresponds to a number of seedlist page requests. A seedlist crawl is a sequence of seedlist page requests, which are HTTP GET operations that fetch seedlist pages. A seedlist page can contain zero or more seedlist entries up to a specified maximum. For example, if an interval of 1 is specified, then after every seedlist request, the crawling progress of the application being currently crawled is logged. The seedlistRequestInterval parameter is set to 1 by default.

            You can find additional logging information about seedlist crawling in the SystemOut.log file by searching for occurrences of the CLFRW0604 logging message. For example:

            ```
            CLFRW0604 : Current seedlist state: Finish Date: Thu May 12 10:14:58 
            IST 2011; Start Date: Thu Jan 01 01:00:00 GMT 1970; Type: 1; 
            Last Modified: Thu Jan 01 01:00:00 GMT 1970; Finished: false; 
            Started: true; ACL Start: 0; Offset: 0;  
            ```

            For example:

            ```
            SearchCellConfig.setVerboseSeedlistRequestLoggingInterval(1)
            ```

    - ```SearchCellConfig.setVerboseIncrementalCrawlingLoggingInterval(int incrementalCrawlingInterval)```

        Controls the frequency with which seedlist update crawling progress is logged to the SystemOut.log file. An update crawl of an application fetches data that was created, updated, or deleted since the previous crawl of that application began.

        This command takes a single parameter:

        - incrementalCrawlingInterval
    
            A positive integer that corresponds to a number of seedlist entries. For example, if an interval of 100 is specified, then, for every 100 entries that have been crawled, the number of entries that have been crawled for a particular application during the current indexing job is logged. The incrementalCrawlingInterval parameter is set to 100 by default.

            You can find additional logging information about initial index creation in the SystemOut.log file by searching for occurrences of the CLFRW0589I logging message. For example:

            ```
            CLFRW0589I: Search is continuing to build the index for 
            profiles: 1,600 seedlist entries indexed.
            ```

            For example:

            ```
            SearchCellConfig.setVerboseIncrementalCrawlingLoggingInterval(100)
            ```

    - ```SearchCellConfig.setVerboseIncrementalBuildingLoggingInterval(int incrementalBuildingInterval)```

        Controls the frequency with which update indexing progress is logged to the SystemOut.log file. Update indexing of an HCL Connections application or set of applications, is an indexing job that updates an index that already has content from all applications that are to be indexed as part of the current indexing job.

        This command takes a single parameter:

        - incrementalBuildingInterval
    
            A positive integer that corresponds to a number of documents. For example, if an interval of 20 is specified, then for every 20 documents that have been indexed, the number of documents indexed when indexing a particular application during the current indexing job is logged. The incrementalBuildingInterval parameter is set to 100 by default.

            You can find additional logging information about update indexing progress in the SystemOut.log file by searching for occurrences of the CLFRW0600I logging message. For example:

            ```
            CLFRW0600I: Search is continuing to build the index for blogs: 40 documents indexed.
            ```

            For example:

            ```
            SearchCellConfig.setVerboseIncrementalBuildingLoggingInterval(100)
            ```

    - ```SearchCellConfig.setVerboseLogging(int initialInterval, int seedlistRequestInterval, int incrementalCrawlingInterval, int incrementalBuildingInterval)```
        
        Enables verbose logging with the specified initial interval, seedlist request interval, crawling interval, and incremental building interval.

        Running this command has the same net effect as calling the following commands in sequence:

        - SearchCellConfig.enableVerboseLogging\(\)
        - SearchCellConfig.setVerboseInitialLoggingInterval \(initialInterval\)
        - SearchCellConfig.setVerboseSeedlistRequestLoggingInterval \(seedlistRequestInterval\)
        - SearchCellConfig.setVerboseIncrementalCrawlingLoggingInterval \(incrementalCrawlingInterval\)
        - SearchCellConfig.setVerboseIncrementalBuildingLoggingInterval \(incrementalBuildingInterval\)

6.  Check in the updated search-config.xml configuration file using the following wsadmin client command:

    ```SearchCellConfig.checkInConfig()``

7.  To exit the wsadmin client, type exit at the prompt.

8.  Stop the server or servers hosting the Search application, and then restart the Search servers.

    The next time the scheduled task runs, persisted seedlists are retained after indexing finishes.


**Parent topic:**[Verifying Search](../admin/c_admin_search_verify_search.md)

**Related information**  


[Verifying Search index creation](../admin/t_admin_search_verify_index_creation.md)

[Verifying that Search is crawling regularly](../admin/t_admin_search_verify_index_crawling.md)

[Verifying that the index is being built incrementally](../admin/t_admin_search_verify_incremental_index.md)

