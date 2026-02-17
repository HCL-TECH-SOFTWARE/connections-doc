# Retrieving file content {#t_admin_search_retrieve_file_content .task}

Use SearchService commands to perform file content retrieval tasks.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

Depending on the number of files to be indexed in your deployment, it can take a long time to retrieve file content. To ensure that all content is retrieved and indexed, you can run the indexNow command to retrieve all content. You can run indexNow either before or after the document indexing service finishes.

For example, to manually index files and all file content, you might run the following commands:

```
wsadmin>SearchService.indexNow("files")
wsadmin>SearchService.getFileContentNow("files")
wsadmin>SearchService.indexFileContentNow("files","1000")
```

The document indexing service can run on multiple nodes, making the download and conversion process faster. When the document indexing task is scheduled, the Search application sends a message to all the nodes to tell them to start the document indexing process locally. Each Search server starts taking files from the cache and downloading and converting them. When a node retrieves a file, it flags the file in the cache as claimed so that other nodes do not try to get content for that file.

1.  To perform file content retrieval tasks, complete the following steps.
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

4.  Use the following commands to perform file content retrieval tasks.

    SearchService.getFileContentNow\(String applicationNames\)
    :   Starts the file content retrieval task. This command iterates over the file cache, downloading and converting files that do not have any content.

        This command takes a string value, which is the name of the application whose content is to be retrieved. The following values are valid:

        -   ecm\_files - retrieves files from the Enterprise Content Management repository. Only published files are retrieved; draft files are not included.
        -   files - retrieves files from the Files app.
        -   wikis - retrieves files from the Wikis app.
        -   activities - retrieves files from the Activities app.
        -   forums - retrieves files from the Forums app.
        For example:

        ```
        SearchService.getFileContentNow("files")
        ```

    SearchService.retryContentFailuresNow\(String applicationNames\)
    :   Tries failed attempts at downloading and converting files for the specified application again.

        This command takes a string value, which is the name of the application whose content is to be downloaded and converted. The following values are valid:

        -   files - retrieves files from the Files app.
        -   wikis - retrieves files from the Wikis app.
        -   activities - retrieves files from the Activities app.
        -   forums - retrieves files from the Forums app.
        A file download or conversion task can fail for a number of reasons, for example, hardware or network issues. Failures are flagged in the cache; these tasks can be tried again.

        For example:

        ```
        SearchService.retryContentFailuresNow("wikis,files")
        ```

    SearchService.addFileContentTask\(String taskName, String schedule, String startBy, String applicationNames, String all\_configured, Boolean failuresOnly\)
    :   Creates a scheduled file content retrieval task.

        This command takes the following arguments:

        -   taskName. The name of the scheduled task. This argument is a string value, which must be unique.
        -   schedule. The time at which the scheduled task starts. This argument is a string value that must be specified in Cron format.
        -   startBy. The time that is given to a task to fire before it is automatically canceled. This argument is a string value that must be specified in Cron format.
        -   applicationNames. The name \(or names\) of the HCL Connections application to be indexed when the task is triggered. This argument is a string value. To index multiple applications, use a comma-delimited list. The following values are valid:
            -   ecm\_files - retrieves files from the Enterprise Content Management repository. Only published files are retrieved; draft files are not included.
            -   files - retrieves files from the Files app.
            -   wikis - retrieves files from the Wikis app.
            -   activities - retrieves files from the Activities app.
            -   forums - retrieves files from the Forums app.
        -   all\_configured. Indicates that the operation is performed on all applications.
        -   failuresOnly. Indicates that only the content of files for which the download and conversion tasks failed are retrieved. This argument is a Boolean.
        For example:

        ```
        SearchService.addFileContentTask("mine", "0 0 1 ? *
          MON-FRI", "0 10 1 ? * MON-FRI", "wikis,files","true")
        
        SearchService.addFileContentTask("mine", "0 0 1 ? *
          MON-FRI", "0 10 1 ? * MON-FRI", "all_configured","true"
        ```

        When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

        You can also use the SearchService.addFileContentTask command to replace the task definition for the default **20min-file-retrieval-task**. By default, this task runs every 20 minutes, except for a one-hour period between 01:00 and 02:00. To replace the default task settings, first remove the existing task with the SearchService.deleteTask\(String taskName\) command. Then, use the SearchService.addFileContentTask to create a new task with the values that you specify.

        For example:

        ```
        SearchService.deleteTask("20min-file-retrieval-task")
        SearchService.addFileContentTask("20min-file-retrieval-task",
          "0 1/20 0,2-23 * * ?", "0 10/20 0,2-23 * * ?",
          "all_configured", "false")
        ```

    SearchService.addFileContentIndexingTask\(String taskName, String schedule, String startBy, String applicationNames, String all\_configured, Integer, duration\)
    :   Creates a scheduled file content indexing task. The file content indexing task iterates through the list of files whose content has not been indexed yet. This list can contain just a few elements, in which case the task executes quickly. In some cases there could be a large backlog of unprocessed files. You can limit the execution time of the task using the duration argument; any remaining files are processed in the next execution of the task.

        This command takes the following arguments:

        -   taskName. The name of the scheduled task. This argument is a string value, which must be unique.
        -   schedule. The time at which the scheduled task starts. This argument is a string value that must be specified in Cron format.
        -   startBy. The time that is given to a task to fire before it is automatically canceled. This argument is a string value that must be specified in Cron format.
        -   applicationNames. The name \(or names\) of the IBM Connections application to be indexed when the task is triggered. This argument is a string value. To index multiple applications, use a comma-delimited list. The following values are valid:
            -   ecm\_files - retrieves files from the Enterprise Content Management repository. Only published files are retrieved; draft files are not included.
            -   files - retrieves files from the Files app.
            -   wikis - retrieves files from the Wikis app.
            -   activities - retrieves files from the Activities app.
            -   forums - retrieves files from the Forums app.
        -   all\_configured. Indicates that the operation is performed on all applications.
        -   duration. A value that is expressed in seconds that specifies the maximum time the task is allowed to run.
        For example:

        ```
        SearchService.addFileContentIndexingTask("file-indexing-task", "0 1/30 0,2-23 * * ?", "0 10/30 0,2-23 * * ?",
            "activities,files,wikis", "600")
        ```

        When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

    SearchService.indexFileContentNow\(String applicationNames, Integer duration\)
    :   Creates a file content indexing task for immediate execution.

        This command takes the following arguments:

        -   applicationNames. The name \(or names\) of the IBM Connections application to be indexed when the task is triggered. This argument is a string value. To index multiple applications, use a comma-delimited list. The following values are valid:
            -   ecm\_files - retrieves files from the Enterprise Content Management repository. Only published files are retrieved; draft files are not included.
            -   files - retrieves files from the Files app.
            -   wikis - retrieves files from the Wikis app.
            -   activities - retrieves files from the Activities app.
            -   forums - retrieves files from the Forums app.
        -   duration. A value expressed in seconds that specifies the maximum time the task is allowed to run.
        For example:

        ```
        SearchService.indexFileContentNow("activities,files,wikis", "600")
        ```

        When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

    SearchService.listFileContentTasks\(\)
    :   Lists all the scheduled file content retrieval tasks.

        This command does not take any input parameters.

    SearchService.listFileContentIndexingTasks\(\)
    :   Lists all the scheduled file content indexing retrieval tasks.

        This command does not take any input parameters.

    SearchService.enableTask\(String taskName\)
    :   Enables the specified task.

        This command takes a single argument:

        -   taskName. The name of the task to be enabled.
        For example:

        ```
        SearchService.enableTask("mine")
        ```

    SearchService.disableTask\(String taskName\)
    :   Disables the specified task.

        This command takes a single argument:

        -   taskName. The name of the task to be disabled. This argument is a string value.
        For example:

        ```
        SearchService.disableTask("mine")
        ```


**Parent topic:**[Managing the Search index](../admin/c_admin_search_manage_index.md)

**Related information**  


[Configuring scheduled tasks](../admin/c_admin_search_configure_scheduled_tasks.md)

[Search default scheduled tasks](../admin/r_admin_search_default_indexing_tasks.md)

[Verifying file content extraction](../admin/t_admin_search_verify_file_content_extraction.md)

