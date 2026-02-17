# Enabling indexing resumption {#t_admin_search_resume_crawls .task}

You can add a configuration setting to the search-config.xml file to specify that interrupted or failed indexing tasks are automatically resumed.

When using administrative commands, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

The SearchCellConfig.setIndexingResumptionAllowed command allows you to enable the resumption of failed or interrupted indexing tasks that have not yet reached a resume point. When you enable this functionality and an indexing task fails or is interrupted, the task resumes at the start of the previous seedlist page rather than from the previous resume point.

Indexing resumption is disabled by default when you install HCL Connections. When you run the SearchCellConfig.setIndexingResumptionAllowed command, the allowResumption setting, which specifies that interrupted or failed indexing tasks are automatically resumed, is added to the search-config.xml configuration file.

```
<indexSettings allowResumption="true" 
   location="${SEARCH_INDEX_DIR}" maxIndexerThreads="1"/>
```

You might want to consider enabling indexing resumption after installation because, if there is an interruption during initial indexing, this feature allows indexing to resume from where it left off. Normally, only crawling and file content extraction resume from where they are left off after an interruption. However, the indexing resumption feature has an impact on performance, and there is little benefit to enabling it during incremental indexing as incremental indexing typically executes very quickly.

1.  To enable indexing resumption, complete the following steps.
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

    SearchCellConfig.checkOutConfig\("working\_dir", "cellName"\)

    Where:

    -   working\_dir is the temporary directory to which you want to check out the cell level configuration file. This directory must exist on the server where you are running the wsadmin client. Use forward slashes to separate directories in the file path, even if you are using the Microsoft Windows operating system.

        !!! note 
            
            Linux only: The directory must grant write permissions or the command does not run successfully.

    -   cellName is the name of the cell that the Search node belongs to. The command is case-sensitive. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor:

        print AdminControl.getCell\(\)

    For example:

    ```
    SearchCellConfig.checkOutConfig("c:/search_temp", "SearchServerNode01Cell")
    ```

5.  Use the following command:

    ```SearchCellConfig.setIndexingResumptionAllowed(boolean allowed)``

    Enables or disables the resumption of interrupted or failed indexing tasks that have not reached a resume point.

    This command takes a single argument or allowed. A boolean value.

    For example, to enable indexing resumption:

        ```
        SearchCellConfig.setIndexingResumptionAllowed("true")
        ```

6.  Check in the updated search-config.xml configuration file using the following wsadmin client command:

    ```SearchCellConfig.checkInConfig\(\)```

7.  To exit the wsadmin client, type exit at the prompt.

8.  Stop the server or servers hosting the Search application, and then restart the Search servers.

    The next time the scheduled task runs, persisted seedlists are retained after indexing finishes.


**Parent topic:**[Index settings](../admin/c_admin_search_index_settings.md)

**Related information**  


[Verifying that Search is crawling regularly](../admin/t_admin_search_verify_index_crawling.md)

[Configuring the number of crawling threads](../admin/t_admin_search_set_max_crawling_threads.md)

