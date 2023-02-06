# SearchService commands {#r_admin_searchservice_commands .reference}

The SearchService commands are used to create, retrieve, update, and delete scheduled task definitions for the indexing and optimization Search operations.

## SearchService commands { .section}

Use the following MBean commands to perform Search administrative tasks. The commands are listed in alphabetical order.

To use the commands, you must first initialize the Search configuration environment. For more information, see *Accessing the Search configuration environment*.

SearchService.addBackupIndexTask\(String taskName, String schedule, String startbySchedule\)
:   Defines a new scheduled index backup task.

    This command takes the following arguments:

    -   taskName. The name of the task to be added.
    -   schedule. The time at which the scheduled task starts. This argument is a string value that must be specified in Cron format.
    -   startbySchedule. The time given for the task to run before it is automatically canceled. This argument is a string value that must be specified in Cron format.

    For example:

    ```
    SearchService.addBackupIndexTask("WeeklyIndexBackup",
       "0 0 2 ? * SAT","0 10 2 ? * SAT")
    ```

    When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

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
    -   applicationNames. The name \(or names\) of the IBM® Connections application to be indexed when the task is triggered. This argument is a string value. To index multiple applications, use a comma-delimited list. The following values are valid:
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

SearchService.addIndexingTask\(String taskName, String schedule, String startBy, String applicationNames, string all\_configured, Boolean optimizeFlag\)
:   Creates a new scheduled indexing task definition in the Home page database.

    This command takes the following arguments:

    -   taskName. The name of the scheduled task. This argument is a string value, which must be unique.
    -   schedule. The time at which the scheduled task starts. This argument is a string value that must be specified in Cron format.
    -   startBy. The time given to a task to fire before it is automatically canceled. This argument is a string value that must be specified in Cron format.

        This parameter should be used to ensure that indexing tasks are not queued up and running into server busy times. Under normal conditions, the only factors that might cause a task to be delayed are that overlapping or coincident tasks are trying to fire at the same time, or an earlier task is running for a long time.

    -   applicationNames. The name \(or names\) of the IBM Connections application to be indexed when the task is triggered. This argument is a string value. To index multiple applications, use a comma-delimited list. The following values are valid:
        -   activities
        -   blogs
        -   calendar
        -   communities
        -   dogear
        -   ecm\_files
        -   files
        -   forums
        -   people\_finder
        -   profiles
        -   status\_updates
        -   wikis
    -   all\_configured. Indicates that the operation is performed on all applications.
    -   optimizeFlag. A flag that indicates if an optimization step should be performed after indexing. This argument is a boolean value.

        **Note:** The optimization operation is both CPU and I/O intensive. For this reason, the operation should be performed infrequently and, if possible, during off-peak hours. For more information, refer to the following web page: [http://lucene.apache.org/core/old\_versioned\_docs/versions/3\_0\_3/api/all/org/apache/lucene/index/IndexWriter.html\#optimize%28%29](http://lucene.apache.org/core/old_versioned_docs/versions/3_0_3/api/all/org/apache/lucene/index/IndexWriter.html#optimize%28%29)

        Note that when you install HCL Connections, a search optimization task is set up to run every night by default. See *Search default tasks* for more information.


    All arguments are required.

    For example:

    ```
    SearchService.addIndexingTask("customDogearAndBlogs",
      "0 0 1 ? * MON-FRI", "0 10 1 ? * MON-FRI", "dogear,blogs","true")
    ```

    When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

    **Note:** The refreshTasks\(\) command should be used after this command for the new task definitions to take effect immediately. Otherwise, the changes take place when the Search application is next restarted.

    You can also use the SearchService.addIndexingTask command to replace the 15min-search-indexing-task that is automatically configured when you install HCL Connections. By default, all installed HCL Connections applications are crawled and indexed every 15 minutes, except for a one-hour period between 01:00 and 02:00. To replace the default indexing task settings, first remove the existing indexing task using the SearchService.deleteTask\(String taskName\) command. Then, use the SearchService.addIndexingTask command to create a new indexing task with the values that you specify.

    For example:

    ```
    SearchService.deleteTask("15min-search-indexing-task")
    SearchService.addIndexingTask("15min-search-indexing-task",
       "0 1/15 0,2-23 * * ?", "0 10/15 0,2-23 * * ?", "all_configured", "false")
    ```

SearchService.addOptimizeTask\(String taskName, String schedule, String startBy\)
:   Creates a new index optimization scheduled task definition.

    This command takes the following arguments:

    -   taskName. The name of the scheduled task. This argument is a string value, which must be unique.
    -   schedule. The time at which the scheduled task starts. This argument is a string value that must be specified in Cron format.
    -   startBy. The time given to a task to fire before it is automatically canceled. This argument is a string value that must be specified in Cron format.

        This parameter should be used to ensure that indexing tasks are not queued up and running into server busy times. Under normal conditions, the only factors that might cause a task to be delayed are that overlapping or coincident tasks are trying to fire at the same time, or an earlier task is running for a long time.


    All arguments are required.

    **Note:** The optimization operation is both CPU and I/O intensive. For this reason, the operation should be performed infrequently and, if possible, during off-peak hours. For more information, refer to the following web page: [http://lucene.apache.org/core/old\_versioned\_docs/versions/3\_0\_3/api/all/org/apache/lucene/index/IndexWriter.html\#optimize%28%29](http://lucene.apache.org/core/old_versioned_docs/versions/3_0_3/api/all/org/apache/lucene/index/IndexWriter.html#optimize%28%29)

    Note that when you install HCL Connections, a search optimization task is set up to run every night by default. See *Search default tasks* for more information.

    For example:

    ```
    SearchService.addOptimizeTask("customOptimize",
       "0 0 1 ? * MON-FRI", "0 10 1 ? * MON-FRI")
    ```

    When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

    **Note:** The refreshTasks\(\) command should be used after this command for the new task definitions to take effect immediately. Otherwise, the changes take place when the Search application is next restarted.

    You can also use the SearchService.addOptimizeTask command to replace the nightly-optimize-task that is automatically configured when you install HCL Connections. By default, this task runs nightly at 01:30. To replace the default optimize task settings, first remove the existing optimize task using the SearchService.deleteTask command. Then, use the SearchService.addOptimizeTask command to create a new optimize task with the values that you specify.

    For example:

    ```
    SearchService.deleteTask("nightly-optimize-task")
    SearchService.addOptimizeTask("nightly-optimize-task",
       "0 30 1 * * ?", "0 35 1 * * ?")
    ```

SearchService.addSandTask\(String taskName, String schedule, String startBy, String jobs\)
:   Creates a new scheduled task definition for the social analytics service in the Home page database.

    This command takes the following arguments:

    -   taskName. The name of the scheduled task. This argument is a string value, which must be unique.
    -   schedule. The time at which the scheduled task starts. This argument is a string value that must be specified in Cron format.
    -   startBy. The time given to a task to fire before it is automatically canceled. This argument is a string value that must be specified in Cron format.

        This parameter should be used to ensure that scheduled tasks are not queued up and running into server busy times. Under normal conditions, the only factors that might cause a task to be delayed are that overlapping or coincident tasks are trying to fire at the same time, or an earlier task is running for a long time.

    -   jobs. The name, or names, of the jobs to be run when the task is triggered. This argument is a string value. To index multiple jobs, use a comma-delimited list. The following values are valid: evidence, graph, manageremployees, tags, taggedby, and communitymembership.

    All the arguments are required.

    For example:

    ```
    SearchService.addSandTask("customSaNDIndexTask",
       "0 0 1 ? * MON-FRI", "0 10 1 ? * MON-FRI",
       "evidence,graph,manageremployees,tags,taggedby,communitymembership")
    ```

    When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

    You can also use the SearchService.addSandTask command to replace the nightly-sand-task that is automatically configured when you install HCL Connections. By default, the task runs nightly at 01:00. To replace the default SAND task settings, first remove the existing task using the SearchService.deleteTask\(String taskName\) command. Then use the SearchService.addSandTask command to create a new SAND task with the values that you specify.

    For example:

    ```
    SearchService.deleteTask("nightly-sand-task")
    SearchService.addSandTask("nightly-sand-task",
       "0 0 1 * * ?", "0 5 1 * * ?", 
       "evidence,graph,manageremployees,tags,taggedby,communitymembership")
    ```

SearchService.backupIndexNow\(\)
:   Backs up the index to the location specified by the IBM WebSphere® Application Server variable, SEARCH\_INDEX\_BACKUP\_DIR. There might be a delay before the backup occurs if there are indexing tasks in progress.

    This command does not take any arguments.

    After backing up the Search index using wsadmin commands, consider performing a full backup of the HOMEPAGE database. Note that the Search index has a dependency on data in the HOMEPAGE database.

SearchService.deleteFeatureIndex\(String featureName\)
:   Removes and purges the content for the specified application from the Search index.

    **Note:** Only use this command if you are uninstalling an application from IBM Connections. After running the command, you cannot reindex the content from the application that has been deleted. For more information, see *Purging content from the index*.

    This command takes a string value, which is the name of the application whose content is to be deleted. The following values are valid:

    -   activities
    -   blogs
    -   calendar
    -   communities
    -   dogear
    -   ecm\_files
    -   files
    -   forums
    -   people\_finder
    -   profiles
    -   status\_updates
    -   wikis.

    For example:

    ```
    SearchService.deleteFeatureIndex("activities")
    ```

    When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

SearchService.deleteAllTasks\(\)
:   Deletes all task definitions from the Home page database.

    This command does not take any parameters.

    When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

SearchService.deleteGlobalSandProperty\(String propertyName\)
:   Deletes the specified global social analytics property.

    For example:

    ```
    SearchService.deleteGlobalSandProperty("sand.tag.freq.threshold")
    ```

    When the property is successfully added or updated, 1 is printed to the wsadmin console. If the property is not successfully added or updated, then you will see 0 printed to the wsadmin console. If this happens, contact the Search Cluster Administration and check the SystemOut.log file for more details.

SearchService.deleteTask\(String taskName\)
:   Deletes the task definition with the specified name from the Home page database.

    This command takes a string value, which is the name of the task to be deleted. For information about how to retrieve the names of the tasks in the Home page database, see *Listing scheduled tasks*.

    For example:

    ```
    SearchService.deleteTask("profilesIndexingTask")
    ```

    When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

SearchService.disableAllTasks\(\)
:   Disables all scheduled tasks for the Search application.

    This command does not take any arguments.

    When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

SearchService.disableIndexingOnServer\("nodename","servername"\)
:   Disables indexing on the specified server. Use the SearchService.enableIndexingOnServer\("nodename","servername"\) command to re-enable indexing later.

    CAUTION:

    Do not use this command unless you are instructed to do so by IBM Support. When you want to disable indexing temporarily, use the commands for disabling scheduled tasks instead.

    This command takes the following parameters:

    -   nodename. A string value that specifies the name of the node where you want to disable indexing.
    -   servername. A string value that specifies the name of the server on which you want to disable indexing.

    For example:

    ```
    SearchService.disableIndexingOnServer("Node01","cluster1_server1")
    ```

SearchService.disableTask\(String taskName\)
:   Disables the scheduled task with the specified name.

    This command takes a single argument:

    -   taskName. The name of the task to be disabled. This argument is a string value.

    For example:

    ```
    SearchService.disableTask("mine")
    ```

    When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

    Using this command affects the indexing process as follows:

    -   When the command is run before the scheduled task fires, the indexing operation is prevented from starting.
    -   When the command is run during the indexing operation for an application, the Search application stops indexing.

    Results for the current application that is being indexed are discarded but, if, as part of an scheduled task, some applications have been successfully crawled, those applications are up-to-date in the index. For example, if a task is fired that is to index Bookmarks, Blogs, and Activities \(in that order\) and the disable command is called while Blogs is being indexed, when the task is enabled again, Blogs and Activities resume indexing at the same point as the previously-called task. Disabled tasks remain disabled until they are re-enabled.

SearchService.enableAllTasks\(\)
:   Re-enables all scheduled tasks for the Search application.

    This command does not take any arguments.

    When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

SearchService.enableIndexingOnServer\("nodename","servername"\)
:   Re-enables indexing on the specified server. This command is used in conjunction with the SearchService.disableIndexingOnServer\("nodename","servername"\) command.

    This command takes the following parameters:

    -   nodename. A string value that specifies the name of the node where you want to re-enable indexing.
    -   servername. A string value that specifies the name of the server on which you want to re-enable indexing.

    For example:

    ```
    SearchService.enableIndexingOnServer("node1","server1")
    ```

SearchService.enableTask\(String taskName\)
:   Re-enables the scheduled task with the specified name. This command uses the current schedule.

    This command takes a single argument:

    -   taskName. The name of the task to be enabled. This argument is a string value.

    For example:

    ```
    SearchService.enableTask("mine")
    ```

    When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

SearchService.flushPersistedCrawlContent\(\)
:   Deletes current persisted seedlists.

    **Note:** This command only clears persisted seedlists in the default persistence location. Seedlists crawled using the startBackgroundCrawl, startBackgroundFileContentExtraction, or startBackgroundIndex commands must be deleted manually.

    This command does not take any input parameters.

    **Note:** Do not run this command while a crawl is in progress.

    When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

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

SearchService.getIndexStatus\(String createdTaskName\)
:   Provides a status of a specific index task that created by SearchService.indexNow or scheduled index task.

    This command takes a single argument:

    -   createdTaskName. The name of a task created by SearchService.indexNow or scheduled index task.

    For example:

    ```
    SearchService.getIndexStatus("roi-dogear-blogs-SunMay1109:45:02EDT2014")
    ```

    The command returns an output similar to the following:

    ```
    {
    "success": true, 
    "result": [
    "INDEX_COMPLETED" 
    ]
    }
    ```

    When the command runs successfully, `"success": true`, is printed to the wsadmin console. If the command does not run successfully, `"success": false` is printed to the wsadmin console. The task status within the "result" can has one of the following values:

    -   UNKNOWN,
    -   CRAWL\_STARTED,
    -   WAITING\_FOR\_CRAWL,
    -   DB\_EMPTY,
    -   INDEX\_COMPLETED,

SearchService.indexNow\(String applicationNames\)
:   Creates a one-off task that indexes the specified applications 30 seconds after being called.

    This command takes a single argument:

    -   applicationNames. The name \(or names\) of the HCL Connections application to be indexed when the task is triggered. This argument is a string value. To index multiple applications, use a comma-delimited list. The following values are valid:
        -   activities
        -   all\_configured
        -   blogs
        -   calendar
        -   communities
        -   dogear
        -   ecm\_files
        -   files
        -   forums
        -   people\_finder
        -   profiles
        -   status\_updates
        -   wikis.

    Use all\_configured instead of listing all indexable services when you want to index all the applications.

    **Note:** An optimize operation is not run at the end of the indexing operation.

    For example:

    ```
    SearchService.indexNow("dogear, blogs")
    ```

    The command returns an output in JSON format similar to the following:

    ```
    { 
    "success": true, 
    "result": [ 
    "roi-dogear-blogs-SunMay1109:45:02EDT2014" 
    ]
    }
    ```

    When the command runs successfully, `"success": true`, is printed to the wsadmin console. If the command does not run successfully, `"success": false` is printed to the wsadmin console. The created task name within "result" is always returned.

SearchService.indexNowWithOptimization\(String applicationNames\)
:   Creates a one-off task that indexes the specified applications 30 seconds after being called, and performs an optimization operation at the end of the indexing operation.

    This command takes a single argument:

    -   applicationNames. The name \(or names\) of the HCL Connections application to be indexed when the task is triggered. This argument is a string value. To index multiple applications, use a comma-delimited list. The following values are valid:
        -   activities
        -   all\_configured
        -   blogs
        -   calendar
        -   communities
        -   dogear
        -   ecm\_files
        -   files
        -   forums
        -   people\_finder
        -   profiles
        -   status\_updates
        -   wikis.

    **Note:** The optimization operation is both CPU and I/O intensive. For this reason, the operation should be performed infrequently and, if possible, during off-peak hours. For more information, refer to the following web page: [http://lucene.apache.org/core/old\_versioned\_docs/versions/3\_0\_3/api/all/org/apache/lucene/index/IndexWriter.html\#optimize%28%29](http://lucene.apache.org/core/old_versioned_docs/versions/3_0_3/api/all/org/apache/lucene/index/IndexWriter.html#optimize%28%29)

    Note that when you install HCL Connections, a search optimization task is set up to run every night by default. See *Search default tasks* for more information.

    For example:

    ```
    SearchService.indexNowWithOptimization("dogear, blogs")
    ```

SearchService.listFileContentTasks\(\)
:   Lists all the scheduled file content retrieval tasks.

    This command does not take any input parameters.

SearchService.listFileContentIndexingTasks\(\)
:   Lists all the scheduled file content indexing retrieval tasks.

    This command does not take any input parameters.

SearchService.listGlobalSandProperties\(\)
:   Lists all global properties for the social analytics service.

    The properties are returned as a mapping of keys to values. For example, the following output indicates that the value of the sand.tag.freq.threshold property is 32000.

    ```
    {sand.tag.freq.threshold=32000}
    ```

SearchService.listIndexingNodes\(\)
:   Returns a list of the Search indexing nodes in your deployment.

    This command does not take any arguments.

    When the command runs successfully, the names of the Search indexing nodes are printed to the wsadmin console along with information about each node. The output includes a version timestamp and information that indicates whether the node is an indexing node or a non-indexing node, whether the index on the server is more than 30 days old, and whether the index on the server is synchronized with the latest index in the cluster.

    For example:

    ```
    Indexing Node Id: dubxpcvm084-0Node02:server1, Last Crawl Version: 
       1,340,285,460,074, Indexer: true, Out of Date: false, Out of Sync: false
    
    ```

SearchService.listIndexingTasks\(\)
:   Lists all scheduled indexing task definitions defined in the Home page database.

    This command does not take any input parameters.

SearchService.listOptimizeTasks\(\)
:   Lists all scheduled optimize task definitions defined in the Home page database.

    This command does not take any input parameters.

SearchService.listRunningTasks\(\)
:   Lists all the tasks that are currently running for the Search application. This command does not take any input parameters.

    The command returns a list of the tasks that are currently running, and includes the following information for each task:

    -   Internal task ID
    -   Task name
    -   Time that the task started

    For example:

    ```
    wsadmin>SearchService.listRunningTasks()
    >>>51
    roi-profiles-WedDec0715:23:09GMT2011
    Wed Dec 07 15:23:09 GMT 2011
    ```

SearchService.listSandTasks\(\)
:   Lists all the tasks scheduled for the social analytics service that are defined in the Home page database.

    This command does not take any input parameters.

SearchService.listTasks\(\)
:   Lists all Search scheduled task definitions \(indexing and optimize\) defined in the Home page database.

    This command does not take any input parameters.

SearchService.notifyRestore\(Boolean isNewIndex\)
:   Brings the database to a consistent state so that crawlers start from the point at which the backup was made.

    The notifyRestore command updates index management tables in the HOMEPAGE database so that crawling resume points are reloaded from a restored index, thereby ensuring that all future crawls start from the correct point. The command also purges cached content in the HOMEPAGE database.

    The notifyRestore command optionally removes all entries from the HOMEPAGE database table that tracks the status of individual files as part of the content extraction process. This table is used by the Search application when indexing the content of file attachments.

    This command takes a single parameter:

    -   isNewIndex: If set to true, all entries are removed from the database table that is used by the file content extraction process to track the status of individual files.

        Set this parameter to true when you are restoring a newly-built index. Set the parameter to false when you are restoring an index backup.


    For example:

    ```
    SearchService.notifyRestore("true")
    ```

SearchService.optimizeNow\(\)
:   Creates a one-off task that performs an optimize operation on the search index, 30 seconds after being called.

    **Note:** The optimization operation is both CPU and I/O intensive. For this reason, the operation should be performed infrequently and, if possible, during off-peak hours. For more information, refer to the following web page: [http://lucene.apache.org/core/old\_versioned\_docs/versions/3\_0\_3/api/all/org/apache/lucene/index/IndexWriter.html\#optimize%28%29](http://lucene.apache.org/core/old_versioned_docs/versions/3_0_3/api/all/org/apache/lucene/index/IndexWriter.html#optimize%28%29)

    Note that when you install HCL Connections, a search optimization task is set up to run every night by default. See *Search default tasks* for more information.

    This command does not accept any input parameters.

    This operation should not be called during an indexing operation; if it needs to be run, do it at an off-peak time when the application is not expected to be performing intensive I/O operations on the index.

SearchService.optIntoSandByEmail\(String email\)
:   Includes the user with the specified email address in the social analytics service.

    This command takes a single argument:

    -   email. The email address of the user who is to be included in the social analytics service. This argument is a string value.

    For example:

    ```
    SearchService.optIntoSandByEmail("ajones10@example.com")
    ```

SearchService.optIntoSandByExId\(String externalId\)
:   Includes the user with the specified external ID in the social analytics service.

    This command takes a single argument:

    -   externalId. The external ID of the user who is to be included in the social analytics service. This argument is a string value.

    For example:

    ```
    SearchService.optIntoSandByExId("11111-1111-1111-1111")
    ```

SearchService.optOutOfSandByEmail\(String email\)
:   Excludes the user with the specified email address from the social analytics service.

    This command takes a single argument:

    -   email. The email address of the user who is to be excluded from the social analytics service. This argument is a string value.

    For example:

    ```
    SearchService.optOutOfSandByEmail("ajones10@example.com")
    ```

SearchService.optOutOfSandByExId\(String externalId\)
:   Excludes the user with the specified external ID from the social analytics service.

    This command takes a single argument:

    -   externalId. The external ID of the user who is to be excluded from the social analytics service. This argument is a string value.

    For example:

    ```
    SearchService.optOutOfSandByExId("11111-1111-1111-1111")
    ```

SearchService.refreshTasks\(\)
:   Calls the server to read task settings from the Search task definition tables and synchronizes the configured tasks with those persisted in the IBM WebSphere Application Server scheduler tables.

    This command should be used after the following commands for the changes to task definitions to take effect immediately. Otherwise, the changes take place when the Search application is next restarted.

    -   SearchService.addIndexingTask\(String taskName, String schedule, String startBy, String applicationNames, Boolean optimizeFlag\)
    -   SearchService.addOptimizeTask\(String taskName, String schedule, String startBy\)
    -   SearchService.deleteTask\(String taskName\)

    This command does not accept any input parameters.

SearchService.reloadIndex\(\)
:   Reloads the Search index on the current node only without a restart of the Search application.

    **Note:** If you are making changes to the configuration of the social analytics service, you still need to restart Search to apply the changes.

    When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

SearchService.reloadIndexAllNodes\(\)
:   Reloads the Search index on all the nodes in the cluster without a restart of the Search application.

    **Note:** If you are making changes to the configuration of the social analytics service, you still need to restart Search to apply the changes.

    When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

SearchService.reloadSearchConfiguration\(\)
:   Reloads the search-config.xml file for Search on the current node only without a restart of the Search application.

    **Note:** If you are making changes to the configuration of the social analytics service, you still need to restart Search to apply the changes.

    When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

SearchService.reloadSearchConfigurationAllNodes\(\)
:   Reloads the search-config.xml file for Search on all nodes in the cluster without a restart of the Search application.

    **Note:** If you are making changes to the configuration of the social analytics service, you still need to restart Search to apply the changes.

    When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

SearchService.removeIndexingNode\(String nodeName\)
:   Removes the specified node from the index management table.

    This command takes a single argument:

    -   nodeName. The name of the node to be removed. This argument is a string value that takes the following format:

        ```
        nodeName:serverName
        ```

        To retrieve a list of the indexing nodes in your deployment, run the SearchService.listIndexingNodes\(\) command. For more information, see *Listing indexing nodes*.


    For example:

    ```
    SearchService.removeIndexingNode("Node01:cluster1_server1")
    ```

    When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

SearchService.resetAllTasks\(\)
:   Deletes all scheduled task definitions from the Home page database and restores the default set of tasks. For more information about these tasks, see *Search default scheduled tasks*.

    This command does not take any parameters.

    When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

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

SearchService.retryIndexing\(String service, String id\)
:   Attempts to index an item of content that was not indexed successfully during initial or incremental indexing.

    **Note:** retryIndexing does not work for ecm\_files.

    This command takes two parameters:

    service
    :   The application from which the content originated.

    id
    :   The Atom ID of the content. For information about how to retrieve the Atom ID for the content, refer to the HCL Connections API documentation on the [IBM Social Business Development Wiki](http://www-10.lotus.com/ldd/appdevwiki.nsf).

    For example:

    ```
    SearchService.retryIndexing('activities', 'b63cabf8-0533-45cf-9636-d63cd6a6f3ca')
    ```

    If the command is successful, 1 is printed to the console. If the command fails, 0 is printed to the console.

SearchService.sandIndexNow\(String jobs\)
:   Creates a one-off social analytics task that indexes the specified services 30 seconds after being called.

    This command takes a single argument:

    -   jobs. The name, or names, of the jobs to be run when the task is triggered. This argument is a string value. To run multiple jobs, use a comma-delimited list. The following values are valid: evidence, graph, manageremployees, tags, taggedby, and communitymembership.

    For example:

    ```
    SearchService.sandIndexNow("evidence,graph,manageremployees,tags,taggedby,communitymembership")
    ```

SearchService.saveMetricsToFile\(String filePath\)
:   Collects internal metrics and writes them to the specified file.

    This command takes a single argument:

    filePath
    :   The full path to a text file in which to store the metric information. This argument is a string value.

    A file is created in the specified directory. The file name is prefixed with the string "searchMetrics-" and contains a timestamp indicating when the metrics were collected. The file output is printed in the following format:

    ```
    ================================================================
    ACTIVITIES
    
    Average entry indexing time: 0.03 seconds
    Max entry indexing time: 0.17
    Min entry indexing time: 0.01
    Entry count: 54
    
    Average seedlist request time: 1.83 seconds
    Max seedlist request time: 4.16
    Min seedlist request time: 0.1
    Seedlist request count: 3
    
    ================================================================
    PROFILES
    
    Average entry indexing time: 0.07 seconds
    Max entry indexing time: 1.48
    Min entry indexing time: 0.04
    Entry count: 1763
    
    Average seedlist request time: 8.6 seconds
    Max seedlist request time: 13.06
    Min seedlist request time: 0.14
    Seedlist request count: 5
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


SearchService.startBackgroundCrawl\(String persistenceLocation, String components\)
:   Crawls the seedlists for the specified applications and then saves the seedlists to the specified location. This command does not build an index.

    The command takes the following parameters:

    persistenceLocation
    :   A string that specifies the path to which the seedlists are to be saved.

    components
    :   A string that specifies the applications whose seedlists are to be crawled. The following values are valid:

        -   activities
        -   all\_configured
        -   blogs
        -   calendar
        -   communities
        -   dogear
        -   ecm\_files
        -   files
        -   forums
        -   people\_finder
        -   profiles
        -   status\_updates
        -   wikis

        Use all\_configured instead of listing all indexable services when you want to crawl all the applications.

    For example:

    ```
    SearchService.startBackgroundCrawl("/opt/IBM/Connections/backgroundCrawl", 
       "activities, forums, communities, wikis")
    ```

SearchService.startBackgroundFileContentExtraction\(persistence dir, components, extracted text dir, thread limit\)
:   Extracts file content for all files that are referenced in the persisted seedlists in a process that is independent of the indexing task.

    This command takes the following parameters:

    persistence dir
    :   A string that specifies the location of the persisted files seedlists.

    components
    :   A string that specifies the application or applications for which you want to extract file content. The following values are valid:

        -   files - extracts file content from the Files app.
        -   wikis - extracts file content from the Wikis app.
        -   activities - extracts file content from the Activities app.
        -   forums - extracts file content from the Forums app.
        -   ecm\_files - extracts file content from community library files that are stored in Enterprise Content Management systems.

    extracted text dir
    :   A string that specifies the target location for the extracted text. The same directory structure and naming scheme is used for this directory as for the extracted text directory on the deployment: connections shared data/ExtractedText. For example, ExtractedText/121/31/36cdb7a0-92b2-4cf9-91f3-c4e7e527a5e1.

    thread limit
    :   The maximum number of seedlist threads.

    For example:

    ```
    SearchService.startBackgroundFileContentExtraction("/bg_index/seedlists", "files", "/bg_index/extractedText", 10)
    ```

    You typically run this command after you run a startBackgroundCrawl command to act on up-to-date seedlists. If there are no persisted seedlists available, the behavior is the same as when you run the startBackgroundCrawl command, that is, the seedlists are crawled and persisted first.

SearchService.startBackgroundIndex\(String persistenceLocation, String extractedFileContentLocation, String indexLocation, String applications, String jobs, Boolean isIndexingMultiThreaded\)
:   Creates a background index in the specified location.

    This command crawls the seedlists for the specified applications, saves the seedlists to the specified persistence location, and extracts the file content. The command then builds a Search index for the applications at the specified index location.

    You can run social analytics indexing jobs at the end of the background indexing operation. Alternatively, you can run the SearchService.startSandBackgroundIndex if you want to create a background index for the social analytics service. For more information, see *Creating a background index for the social analytics service*.

    **Note:** This command is case-sensitive, even on Windows. For example, if you specify c:\\temp as the location to create the seedlist, but the directory is C:\\Temp, an error message is returned.

    This command takes the following arguments:

    persistenceLocation
    :   A string value that specifies the location where you want to save the application seedlists.

    extractedFileContentLocation
    :   The file content extraction location. Use the same location that you specified when you previously extracted the file content by using the SearchService.startBackgroundFileContentExtraction command or the SearchService.startBackgroundIndex command. Otherwise, specify an empty directory as the location for storing the extracted file content.

    indexLocation
    :   A string value that specifies the location where you want to create the background index.

    applications
    :   A string value that specifies the names of the applications that you want to include in the index crawl. The following values are valid:

        -   activities
        -   all\_configured
        -   blogs
        -   calendar
        -   communities
        -   dogear
        -   ecm\_files
        -   files
        -   forums
        -   people\_finder
        -   profiles
        -   status\_updates
        -   wikis

        Use all\_configured rather than listing all the indexable applications when you want to index all the applications.

        To queue up multiple applications for indexing, run a single instance of the SearchService.startBackgroundIndex command with the names of the applications that you want to index listed with a comma separator between them. If you run multiple instances of the command with a single application specified as a parameter, a lock is established when you run the first command so that only the first application that is specified is indexed successfully.

    jobs
    :   A string value that specifies the names of the social analytics post-processing indexers that examine, index, and produce new output based on the data in the index. The following values are valid: evidence, graph, manageremployees, tags, taggedby, and communitymembership. Use a comma to separate multiple values. This parameter is optional.

    isIndexingMultiThreaded
    :   A Boolean value that specifies whether the index build is multithreaded. This parameter is optional.

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

SearchService.startBackgroundSandIndex\(String indexLocation, String jobs\)
:   Creates a background index for the social analytics service in the specified location. This command must only be run against an index that already has content indexed from the HCL Connections applications and the ECM service.

    This command takes the following arguments:

    indexLocation
    :   A string value that specifies the location where you want to create the background index.

    jobs
    :   A string value that specifies the names of the social analytics post-processing indexers that examine, index, and produce new output based on the data in the index. The following values are valid: evidence, graph, manageremployees, tags, taggedby, and communitymembership. Use a comma to separate multiple values.

    For example:

    ```
    SearchService.startBackgroundSandIndex("/bkg2/index/","communitymembership,graph")
    ```

SearchService.updateResumeTokens\(String components, String date, String indexLocation\)
:   Updates the resume tokens in the index.

    **Note:** You can run this command on background indexes only.

    This command takes the following arguments:

    components
    :   The applications whose resume tokens are to be manipulated. The following values are valid:

        -   activities
        -   all\_configured
        -   blogs
        -   calendar
        -   communities
        -   dogear
        -   ecm\_files
        -   files
        -   forums
        -   people\_finder
        -   profiles
        -   status\_updates
        -   wikis

        Use all\_configured instead of listing all indexable services when you want to manipulate the resume tokens.

    date
    :   The date the resume tokens are changed to; date is in the format `MM-dd-yyyy HH:mm:ss:SSSZ`.

        For example: `08-01-2013 14:00:00:000-0000`

    indexLocation
    :   The location that contains the index that has its resume tokens updated.

        For example: `/opt/IBM/Connections/data/search/index_backup`

        .

    If the command works correctly and the resume tokens are updated, the value "1" is returned on the command line. If the resume tokens are not updated the value "0" is returned on the command line.

    **Note:**

    Examples:

    ```
    SearchService.updateResumeTokens("all_configured","08-01-2013 14:00:00:000-0000", 
    "/opt/IBM/Connections/data/search/index_backup") 
    SearchService.updateResumeTokens("profiles, 
    activities,blogs,communities,forums,files,dogear","08-01-2013 14:00:00:000-0000", 
    "/opt/IBM/Connections/data/search/index_backup")
    ```

SearchService.startBackgroundFeatureReindex\(String persistenceLocation, String extractedFileContentLocation, String indexLocation, String application, Boolean isIndexingMultiThreaded\)
:   Re-indexes an application in the background index at the specified location.

    This command re-indexes the specified application by doing the following:

    -   Removes all indexed content for that feature from the index
    -   Recrawls the seedlists for the specified application
    -   Saves the seedlists to the specified persistence location
    -   Extracts the file content \(if applicable\)
    -   Rebuilds the index for that applicanttion in the specified index location.

    Other indexes in the specified background index are not affected.

    This command takes the following arguments:

    persistenceLocation
    :   A string value that specifies the location where you want to save the application seedlists.

    extractedFileContentLocation
    :   The file content extraction location. Use the same location that you specified when you extracted the file content using the SearchService.startBackgroundFileContentExtraction command or the SearchService.startBackgroundIndex command. Otherwise, specify an empty directory as the location for storing the extracted file content.

    indexLocation
    :   A string value that specifies the location of the existing background index.

    application
    :   A string value that specifies the name of the application that you want to re-index. The following values are valid:

        -   activities
        -   blogs
        -   calendar
        -   communities
        -   dogear
        -   ecm\_files
        -   files
        -   forums
        -   people\_finder
        -   profiles
        -   status\_updates
        -   wikis

    isIndexingMultiThreaded
    :   A boolean value that specifies whether the index build should be multithreaded. This parameter is optional.

    Example:

    ```
    SearchService.startBackgroundFeatureReindex("/opt/IBM/Connections/data/local/search/backgroundCrawl",
    "/opt/IBM/Connections/data/local/search/backgroundExtracted", "/opt/IBM/Connections/data/local/search/backgroundIndex", 
    "activities")
    ```

SearchService.deleteBackgroundFeatureIndex\(String indexLocation, String application\)
:   Removes all indexed content from a specified application in a background index.

    This command takes the following arguments:

    indexLocation
    :   A string value that specifies the location of the existing background index.

    application
    :   A string value that specifies the name of the application whose index is to be removed. The following values are valid:

        -   activities
        -   blogs
        -   calendar
        -   communities
        -   dogear
        -   ecm\_files
        -   files
        -   forums
        -   people\_finder
        -   profiles
        -   status\_updates
        -   wikis

        Example:

        ```
        SearchService.deleteBackgroundFeatureIndex("/opt/IBM/Connections/data/local/search/backgroundIndex","activities")
        ```

**Parent topic:**[Administering Search](../admin/c_admin_search.md)

**Related information**  


[Accessing the Search configuration environment](../admin/t_admin_search_access_config.md)

[Purging content from the index](../admin/t_admin_search_purge_feature_content.md)

[Listing scheduled tasks](../admin/t_admin_search_retrieve_index_tasks.md)

[Creating a background index for the social analytics service](../admin/t_admin_search_create_bgd_sand_index.md)

[Search default scheduled tasks](../admin/r_admin_search_default_indexing_tasks.md)

