# Viewing and collecting Search metrics {#t_admin_search_statistics .task}

Enter a URL to view a standard set of metrics related to the Search application. You can also write internal search metrics to a file.

-   To access metrics for the Search application, you must be assigned the metrics-reader role. This role is assigned to everyone by default. For more information about the metrics-reader role, see *Roles*.
-   To use SearchService administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

You can enter a URL into your browser to display a standard set of indexing and Search metrics. All metrics are recorded from the time that the server is started. If you want to save a record of the Search metrics, use a wsadmin command to write the metrics to a text file.

-   To view Search metrics, enter the following URL in your browser:

    ```
    http://servername.com:port/search/serverStats
    ```

    where servername.com:port is the appropriate host name and port number for your server.

    The following metrics are recorded for Search:

    |Metric|Description|
    |------|-----------|
    |Index size|The size of the index on the specified node.|
    |Number of indexed items|The number of indexed items per node and per application.|
    |Average crawling time|The average time in seconds taken to index all the applications and each individual application.|
    |Average index building time|The average time in seconds taken to build the index, per node and per application.|
    |File conversions per second|The average number of files downloaded and converted per second.|
    |File content retrieval|The average time in seconds taken to run the document conversion service.|

    **Note:** The file content metrics display in the user interface only after each operation has been carried; you must index and run the document conversion service to view all the metrics.

-   To write internal metrics to a file, complete the following steps:

    1.  Open a command window and start the wsadmin command-line tool.

    2.  After the wsadmin command environment has initialized, use the following command to initialize the Search environment and start the Search script interpreter:

        ```
        execfile("searchAdmin.py")
        ```

        When asked to select a server, you can select any server.

    3.  Use the following command to write the metrics to a file:

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


**Parent topic:**[Administering Search](../admin/c_admin_search.md)

**Related information**  


[Roles](../admin/r_admin_common_user_roles.md)

