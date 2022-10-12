# Verifying that Search is crawling regularly {#t_admin_search_verify_index_crawling .task}

Crawling is the process of accessing and reading content from each application to create entries for indexing. You can verify that the Search application is crawling on a regular basis by checking for specific log messages in the SystemOut.log file.

1.  To verify that Search is crawling on a regular basis, open the SystemOut.log file that corresponds to the application server instance on which Search is running and look for the following log messages:

    ```
    CLFRW0297I: Search is starting to crawl the {0} component
    ```

    ```
    CLFRW0294I: Search has finished crawling the {0} component
    ```

    where \{0\} is the name of an HCL Connections application. Crawling refers to the persistence of the seedlists to disk.

    When Search is crawling as expected, these messages are available for each of the HCL Connections applications that you installed and configured as part of the scheduled crawling task. By default, this task is scheduled to run every 15 minutes and it includes all the HCL Connections applications that you installed.

    You should also see the following log messages in the SystemOut.log file:

    ```
    CLFRW0042I: HCL Connections indexing task {0} fired event TaskNotificationInfo.FIRING
    ```

    ```
    CLFRW0042I: HCL Connections indexing task {0} fired event TaskNotificationInfo.FIRED
    ```

    ```
    CLFRW0042I: HCL Connections indexing task {0} fired event TaskNotificationInfo.SCHEDULED
    ```

    where \{0\} is the name of the scheduled task, for example, 15min-search-indexing-task.

    These informational messages refer to the current status of the scheduled task. The FIRING message is printed before the messages CLFRW0297I and CLFRW0294I. The FIRED and SCHEDULED messages are printed after the messages CLFRW0297I and CLFRW0294I.

    Indexing in the CLFRW0588I and CLFRW0576I messages refers to the iteration through the persisted seedlists:

    ```
    CLFRW0588I: Search is starting to index the {0} component.
    CLFRW0576I: Search has finished indexing the {0} component.
    ```

    For example:

    ```
    [7/11/12 15:46:00:674 IST] 0000004c IndexingNotif 
    I CLFRW0042I: HCL Connections scheduled task 
    15min-search-indexing-task fired event TaskNotificationInfo.FIRING
    [7/11/12 15:46:00:755 IST] 0000004c WorkScheduler 
    I com.ibm.connections.search.process.WorkScheduler schedule
    Crawling CLFRW0297I: Search is starting to crawl the blogs component.
    [7/11/12 15:46:00:777 IST] 0000004c WorkScheduler 
    I com.ibm.connections.search.process.WorkScheduler schedule
    Crawling CLFRW0297I: Search is starting to crawl the forums component.
    [7/11/12 15:46:00:795 IST] 0000004c WorkScheduler 
    I com.ibm.connections.search.process.WorkScheduler schedule
    Crawling CLFRW0297I: Search is starting to crawl the wikis component.
    [7/11/12 15:46:01:676 IST] 00000052 CrawlingWorkL 
    I com.ibm.connections.search.process.work.
    CrawlingWorkListener workCompleted CLFRW0294I: Search has finished crawling the blogs component.
    [7/11/12 15:46:01:686 IST] 0000004c WorkScheduler 
    I com.ibm.connections.search.process.WorkScheduler schedule
    Crawling CLFRW0297I: Search is starting to crawl the communities component.
    [7/11/12 15:46:01:728 IST] 0000004c WorkScheduler 
    I com.ibm.connections.search.process.WorkScheduler schedule
    Indexing CLFRW0588I: Search is starting to index the blogs component.
    [7/11/12 15:46:01:764 IST] 00000058 IndexingWorkL 
    I com.ibm.connections.search.process.work.IndexingWorkListener work
    Completed CLFRW0576I: Search has finished indexing the blogs component.
    [7/11/12 15:46:02:276 IST] 00000053 CrawlingWorkL 
    I com.ibm.connections.search.process.work.CrawlingWorkListener work
    Completed CLFRW0294I: Search has finished crawling the forums component.
    [7/11/12 15:46:02:299 IST] 0000004c WorkScheduler 
    I com.ibm.connections.search.process.WorkScheduler schedule
    Crawling CLFRW0297I: Search is starting to crawl the files component.
    [7/11/12 15:46:02:325 IST] 00000052 CrawlingWorkL 
    I com.ibm.connections.search.process.work.CrawlingWorkListener work
    Completed CLFRW0294I: Search has finished crawling the wikis component.
    [7/11/12 15:46:02:327 IST] 0000004c WorkScheduler 
    I com.ibm.connections.search.process.WorkScheduler schedule
    Indexing CLFRW0588I: Search is starting to index the forums component.
    [7/11/12 15:46:02:355 IST] 00000058 IndexingWorkL 
    I com.ibm.connections.search.process.work.IndexingWorkListener work
    Completed CLFRW0576I: Search has finished indexing the forums component.
    [7/11/12 15:46:02:375 IST] 0000004c WorkScheduler 
    I com.ibm.connections.search.process.WorkScheduler schedule
    Crawling CLFRW0297I: Search is starting to crawl the dogear component.
    [7/11/12 15:46:02:414 IST] 0000004c WorkScheduler 
    I com.ibm.connections.search.process.WorkScheduler schedule
    Indexing CLFRW0588I: Search is starting to index the wikis component.
    [7/11/12 15:46:02:435 IST] 00000058 IndexingWorkL 
    I com.ibm.connections.search.process.work.IndexingWorkListener work
    Completed CLFRW0576I: Search has finished indexing the wikis component.
    [7/11/12 15:46:02:811 IST] 00000053 CrawlingWorkL 
    I com.ibm.connections.search.process.work.CrawlingWorkListener work
    Completed CLFRW0294I: Search has finished crawling the communities component.
    [7/11/12 15:46:02:824 IST] 0000004c WorkScheduler 
    I com.ibm.connections.search.process.WorkScheduler schedule
    Crawling CLFRW0297I: Search is starting to crawl the profiles component.
    [7/11/12 15:46:02:835 IST] 00000052 CrawlingWorkL 
    I com.ibm.connections.search.process.work.CrawlingWorkListener work
    Completed CLFRW0294I: Search has finished crawling the files component.
    [7/11/12 15:46:02:852 IST] 0000004c WorkScheduler 
    I com.ibm.connections.search.process.WorkScheduler schedule
    Indexing CLFRW0588I: Search is starting to index the communities component.
    [7/11/12 15:46:02:876 IST] 00000058 IndexingWorkL 
    I com.ibm.connections.search.process.work.IndexingWorkListener work
    Completed CLFRW0576I: Search has finished indexing the communities component.
    [7/11/12 15:46:02:901 IST] 0000004c WorkScheduler 
    I com.ibm.connections.search.process.WorkScheduler schedule
    Crawling CLFRW0297I: Search is starting to crawl the activities component.
    [7/11/12 15:46:02:914 IST] 0000004c WorkScheduler 
    I com.ibm.connections.search.process.WorkScheduler schedule
    Indexing CLFRW0588I: Search is starting to index the files component.
    [7/11/12 15:46:02:936 IST] 00000058 IndexingWorkL 
    I com.ibm.connections.search.process.work.IndexingWorkListener work
    Completed CLFRW0576I: Search has finished indexing the files component.
    [7/11/12 15:46:03:334 IST] 00000053 CrawlingWorkL 
    I com.ibm.connections.search.process.work.CrawlingWorkListener work
    Completed CLFRW0294I: Search has finished crawling the dogear component.
    [7/11/12 15:46:03:342 IST] 0000004c WorkScheduler 
    I com.ibm.connections.search.process.WorkScheduler schedule
    Crawling CLFRW0297I: Search is starting to crawl the status_updates component.
    [7/11/12 15:46:03:363 IST] 0000004c WorkScheduler 
    I com.ibm.connections.search.process.WorkScheduler schedule
    Indexing CLFRW0588I: Search is starting to index the dogear component.
    [7/11/12 15:46:03:375 IST] 00000058 IndexingWorkL 
    I com.ibm.connections.search.process.work.IndexingWorkListener work
    Completed CLFRW0576I: Search has finished indexing the dogear component.
    [7/11/12 15:46:03:483 IST] 00000052 CrawlingWorkL 
    I com.ibm.connections.search.process.work.CrawlingWorkListener work
    Completed CLFRW0294I: Search has finished crawling the profiles component.
    [7/11/12 15:46:03:493 IST] 0000004c WorkScheduler 
    I com.ibm.connections.search.process.WorkScheduler schedule
    Crawling CLFRW0297I: Search is starting to crawl the calendar component.
    [7/11/12 15:46:03:523 IST] 0000004c WorkScheduler 
    I com.ibm.connections.search.process.WorkScheduler schedule
    Indexing CLFRW0588I: Search is starting to index the profiles component.
    [7/11/12 15:46:03:555 IST] 00000058 IndexingWorkL 
    I com.ibm.connections.search.process.work.IndexingWorkListener work
    Completed CLFRW0576I: Search has finished indexing the profiles component.
    [7/11/12 15:46:04:444 IST] 00000053 CrawlingWorkL 
    I com.ibm.connections.search.process.work.CrawlingWorkListener work
    Completed CLFRW0294I: Search has finished crawling the activities component.
    [7/11/12 15:46:04:478 IST] 0000004c WorkScheduler 
    I com.ibm.connections.search.process.WorkScheduler schedule
    Indexing CLFRW0588I: Search is starting to index the activities component.
    [7/11/12 15:46:04:490 IST] 00000058 IndexingWorkL 
    I com.ibm.connections.search.process.work.IndexingWorkListener work
    Completed CLFRW0576I: Search has finished indexing the activities component.
    [7/11/12 15:46:04:864 IST] 00000053 CrawlingWorkL 
    I com.ibm.connections.search.process.work.CrawlingWorkListener work
    Completed CLFRW0294I: Search has finished crawling the calendar component.
    [7/11/12 15:46:04:889 IST] 0000004c WorkScheduler 
    I com.ibm.connections.search.process.WorkScheduler schedule
    Indexing CLFRW0588I: Search is starting to index the calendar component.
    [7/11/12 15:46:04:901 IST] 00000058 IndexingWorkL 
    I com.ibm.connections.search.process.work.IndexingWorkListener work
    Completed CLFRW0576I: Search has finished indexing the calendar component.
    [7/11/12 15:46:04:909 IST] 00000052 CrawlingWorkL 
    I com.ibm.connections.search.process.work.CrawlingWorkListener work
    Completed CLFRW0294I: Search has finished crawling the status_updates component.
    [7/11/12 15:46:04:947 IST] 0000004c WorkScheduler 
    I com.ibm.connections.search.process.WorkScheduler schedule
    Indexing CLFRW0588I: Search is starting to index the status_updates component.
    [7/11/12 15:46:04:958 IST] 00000058 IndexingWorkL 
    I com.ibm.connections.search.process.work.IndexingWorkListener work
    Completed CLFRW0576I: Search has finished indexing the status_updates component.
    [7/11/12 15:46:05:009 IST] 0000004c IndexingNotif 
    I   CLFRW0042I: HCL Connections scheduled task 
    15min-search-indexing-task fired event TaskNotificationInfo.FIRED
    [7/11/12 15:46:05:014 IST] 0000004c IndexingNotif 
    I   CLFRW0042I: HCL Connections scheduled task 
    15min-search-indexing-task fired event TaskNotificationInfo.SCHEDULED
    ```

    **In a deployment where there is a single Search node**: No further action is required.

    **In a deployment with multiple Search nodes**: Note that only one node in the cluster does the crawling although all the nodes do the incremental index building based on the crawling that Search node does. Because the crawling is performed by a single Search node, you only see the log messages on that node in the cluster.


**Parent topic:**[Verifying Search](../admin/c_admin_search_verify_search.md)

**Related information**  


[Performing a background crawl](../admin/t_admin_search_perform_bgd_crawl.md)

[Enabling indexing resumption](../admin/t_admin_search_resume_crawls.md)

[Verifying that the index is being built incrementally](../admin/t_admin_search_verify_incremental_index.md)

[Configuring verbose logging](../admin/t_admin_search_enable_verbose_logging.md)

[Verifying Search index creation](../admin/t_admin_search_verify_index_creation.md)

