# Running one-off tasks {#t_admin_search_one_off_tasks .task}

The SearchService MBean provides commands that allow you to create an indexing optimize task that is scheduled to run once and only once, 30 seconds after being called.

To use SearchService administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

**Notes:**

1.  If the time between issuing these commands is less than the polling interval for the Search scheduler, then tasks might not execute in the same order as the order in which the commands were issued.
2.  You should wait at least the duration of the poll interval after issuing the following commands before issuing another one of the commands:
    -   indexNow\(\)
    -   indexNowWithOptimization\(\)
    -   optimizeNow\(\)

1.  To run one-off Search tasks, complete the following steps.
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

4.  Use the following commands to run one-off indexing tasks.

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

    SearchService.optimizeNow\(\)
    :   Creates a one-off task that performs an optimize operation on the search index, 30 seconds after being called.

        **Note:** The optimization operation is both CPU and I/O intensive. For this reason, the operation should be performed infrequently and, if possible, during off-peak hours. For more information, refer to the following web page: [http://lucene.apache.org/core/old\_versioned\_docs/versions/3\_0\_3/api/all/org/apache/lucene/index/IndexWriter.html\#optimize%28%29](http://lucene.apache.org/core/old_versioned_docs/versions/3_0_3/api/all/org/apache/lucene/index/IndexWriter.html#optimize%28%29)

        Note that when you install HCL Connections, a search optimization task is set up to run every night by default. See *Search default tasks* for more information.

        This command does not accept any input parameters.

        This operation should not be called during an indexing operation; if it needs to be run, do it at an off-peak time when the application is not expected to be performing intensive I/O operations on the index.


**Parent topic:**[Managing the Search index](../admin/c_admin_search_manage_index.md)

**Related information**  


[Scheduling tasks](../admin/c_admin_common_was_scheduler.md)

[Search default scheduled tasks](../admin/r_admin_search_default_indexing_tasks.md)

[Running one-off social analytics scheduled tasks](../admin/t_admin_search_one_off_sand_tasks.md)

