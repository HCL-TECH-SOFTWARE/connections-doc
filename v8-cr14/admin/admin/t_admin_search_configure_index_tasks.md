# Adding scheduled tasks for Search {#t_admin_search_configure_index_tasks .task}

Use SearchService administrative commands to add scheduled task definitions for the Search application to the home page database.

To use SearchService administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

The SearchService commands are used to access a service that provides an administrative interface for adding scheduled indexing task definitions to the home page database. The following applications can be indexed:

- Activities
- Blogs
- Bookmarks
- Communities
- Enterprise Content Manager files
- Files
- Forums
- Profiles

    !!! note 
        
        Profiles application results in two indexes: profiles and people\_finder.

- Wikis
- Status Updates
- Community Calendar events.

When you define a scheduled task in the home page database, you need to specify when the scheduler starts the task. The schedule is defined by using a Cron schedule. For more information about the scheduler, see *Scheduling tasks*.

It is not possible to specify an end time for an indexing task. All tasks run for as long as they need to. The startby interval defines the time period by which a task can fire before it is automatically canceled. This mechanism ensures that tasks do not queue up for an overly long period before being canceled, and allows for tasks that run for longer than the default indexing schedule, such as initial index creation.

1. To define a scheduled task for the Search application, complete the following steps.
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

4. Use the following commands to add scheduled task definitions in the Home page database.

    - ```SearchService.addBackupIndexTask(String taskName, String schedule, String startbySchedule)```
        
        Defines a new scheduled index backup task.

        This command takes the following arguments:

        - taskName. The name of the task to be added.
        - schedule. The time at which the scheduled task starts. This argument is a string value that must be specified in Cron format.
        - startbySchedule. The time given for the task to run before it is automatically canceled. This argument is a string value that must be specified in Cron format.
        
        For example:

        ```
        SearchService.addBackupIndexTask("WeeklyIndexBackup",
           "0 0 2 ? * SAT","0 10 2 ? * SAT")
        ```

        When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

    - ```SearchService.addFileContentTask(String taskName, String schedule, String startBy, String applicationNames, String all_configured, Boolean failuresOnly)``
    
        Creates a scheduled file content retrieval task.

        This command takes the following arguments:
        
        - taskName. The name of the scheduled task. This argument is a string value, which must be unique.
        - schedule. The time at which the scheduled task starts. This argument is a string value that must be specified in Cron format.
        - startBy. The time that is given to a task to fire before it is automatically canceled. This argument is a string value that must be specified in Cron format.
        - applicationNames. The name \(or names\) of the HCL Connections application to be indexed when the task is triggered. This argument is a string value. To index multiple applications, use a comma-delimited list. The following values are valid:

            - ecm\_files - retrieves files from the Enterprise Content Management repository. Only published files are retrieved; draft files are not included.
            - files - retrieves files from the Files app.
            - wikis - retrieves files from the Wikis app.
            - activities - retrieves files from the Activities app.
            - forums - retrieves files from the Forums app.

        - all\_configured. Indicates that the operation is performed on all applications.
        - failuresOnly. Indicates that only the content of files for which the download and conversion tasks failed are retrieved. This argument is a Boolean.
        
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

    - ```SearchService.addIndexingTask(String taskName, String schedule, String startBy, String applicationNames, string all_configured, Boolean optimizeFlag)```
        
        Creates a new scheduled indexing task definition in the Home page database.

        This command takes the following arguments:

        - taskName. The name of the scheduled task. This argument is a string value, which must be unique.
        - schedule. The time at which the scheduled task starts. This argument is a string value that must be specified in Cron format.
        - startBy. The time given to a task to fire before it is automatically canceled. This argument is a string value that must be specified in Cron format.

            This parameter should be used to ensure that indexing tasks are not queued up and running into server busy times. Under normal conditions, the only factors that might cause a task to be delayed are that overlapping or coincident tasks are trying to fire at the same time, or an earlier task is running for a long time.

        - applicationNames. The name \(or names\) of the IBM Connections application to be indexed when the task is triggered. This argument is a string value. To index multiple applications, use a comma-delimited list. The following values are valid:
            - activities
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
        - all\_configured. Indicates that the operation is performed on all applications.
        - optimizeFlag. A flag that indicates if an optimization step should be performed after indexing. This argument is a boolean value.

            !!! note 
                The optimization operation is both CPU and I/O intensive. For this reason, the operation should be performed infrequently and, if possible, during off-peak hours. For more information, refer to the following web page: [http://lucene.apache.org/core/old\_versioned\_docs/versions/3\_0\_3/api/all/org/apache/lucene/index/IndexWriter.html\#optimize%28%29](http://lucene.apache.org/core/old_versioned_docs/versions/3_0_3/api/all/org/apache/lucene/index/IndexWriter.html#optimize%28%29)

                Note that when you install HCL Connections, a search optimization task is set up to run every night by default. See *Search default tasks* for more information.

        All arguments are required.

        For example:

        ```
        SearchService.addIndexingTask("customDogearAndBlogs",
          "0 0 1 ? * MON-FRI", "0 10 1 ? * MON-FRI", "dogear,blogs","true")
        ```

        When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

        !!! note 
            
            The refreshTasks\(\) command should be used after this command for the new task definitions to take effect immediately. Otherwise, the changes take place when the Search application is next restarted.

        You can also use the SearchService.addIndexingTask command to replace the 15min-search-indexing-task that is automatically configured when you install HCL Connections. By default, all installed HCL Connections applications are crawled and indexed every 15 minutes, except for a one-hour period between 01:00 and 02:00. To replace the default indexing task settings, first remove the existing indexing task using the SearchService.deleteTask\(String taskName\) command. Then, use the SearchService.addIndexingTask command to create a new indexing task with the values that you specify.

        For example:

        ```
        SearchService.deleteTask("15min-search-indexing-task")
        SearchService.addIndexingTask("15min-search-indexing-task",
           "0 1/15 0,2-23 * * ?", "0 10/15 0,2-23 * * ?", "all_configured", "false")
        ```

    - ```SearchService.addOptimizeTask(String taskName, String schedule, String startBy)```
        
        Creates a new index optimization scheduled task definition.

        This command takes the following arguments:

        - taskName. The name of the scheduled task. This argument is a string value, which must be unique.
        - schedule. The time at which the scheduled task starts. This argument is a string value that must be specified in Cron format.
        - startBy. The time given to a task to fire before it is automatically canceled. This argument is a string value that must be specified in Cron format.

            This parameter should be used to ensure that indexing tasks are not queued up and running into server busy times. Under normal conditions, the only factors that might cause a task to be delayed are that overlapping or coincident tasks are trying to fire at the same time, or an earlier task is running for a long time.

        All arguments are required.

        !!! note 
            
            The optimization operation is both CPU and I/O intensive. For this reason, the operation should be performed infrequently and, if possible, during off-peak hours. For more information, refer to the following web page: [http://lucene.apache.org/core/old\_versioned\_docs/versions/3\_0\_3/api/all/org/apache/lucene/index/IndexWriter.html\#optimize%28%29](http://lucene.apache.org/core/old_versioned_docs/versions/3_0_3/api/all/org/apache/lucene/index/IndexWriter.html#optimize%28%29)

        Note that when you install HCL Connections, a search optimization task is set up to run every night by default. See *Search default tasks* for more information.

        For example:

        ```
        SearchService.addOptimizeTask("customOptimize",
           "0 0 1 ? * MON-FRI", "0 10 1 ? * MON-FRI")
        ```

        When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

        !!! note 
            
            The refreshTasks\(\) command should be used after this command for the new task definitions to take effect immediately. Otherwise, the changes take place when the Search application is next restarted.

        You can also use the SearchService.addOptimizeTask command to replace the nightly-optimize-task that is automatically configured when you install HCL Connections. By default, this task runs nightly at 01:30. To replace the default optimize task settings, first remove the existing optimize task using the SearchService.deleteTask command. Then, use the SearchService.addOptimizeTask command to create a new optimize task with the values that you specify.

        For example:

        ```
        SearchService.deleteTask("nightly-optimize-task")
        SearchService.addOptimizeTask("nightly-optimize-task",
           "0 30 1 * * ?", "0 35 1 * * ?")
        ```

    - ```SearchService.addSandTask(String taskName, String schedule, String startBy, String jobs)```
    
        Creates a new scheduled task definition for the social analytics service in the Home page database.

        This command takes the following arguments:

        - taskName. The name of the scheduled task. This argument is a string value, which must be unique.
        - schedule. The time at which the scheduled task starts. This argument is a string value that must be specified in Cron format.
        - startBy. The time given to a task to fire before it is automatically canceled. This argument is a string value that must be specified in Cron format.

            This parameter should be used to ensure that scheduled tasks are not queued up and running into server busy times. Under normal conditions, the only factors that might cause a task to be delayed are that overlapping or coincident tasks are trying to fire at the same time, or an earlier task is running for a long time.

        - jobs. The name, or names, of the jobs to be run when the task is triggered. This argument is a string value. To index multiple jobs, use a comma-delimited list. The following values are valid: evidence, graph, manageremployees, tags, taggedby, and communitymembership.
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

5. To refresh the Home page database to include the newly-added tasks, use the following command:

    ```SearchService.refreshTasks()```


**Parent topic:**[Configuring scheduled tasks](../admin/c_admin_search_configure_scheduled_tasks.md)

**Related information**  


[Scheduling tasks](../admin/c_admin_common_was_scheduler.md)

[Search default scheduled tasks](../admin/r_admin_search_default_indexing_tasks.md)

[Deleting scheduled tasks for Search](../admin/t_admin_search_delete_task_definition.md)

[Adding scheduled tasks for the social analytics service](../admin/t_admin_search_configure_sand_index_tasks.md)

[Listing scheduled tasks](../admin/t_admin_search_retrieve_index_tasks.md)

[Restoring the default scheduled tasks for Search](../admin/t_admin_search_reset_tasks.md)

[Enabling and disabling scheduled tasks](../admin/t_admin_search_enable_indexing_task.md)

