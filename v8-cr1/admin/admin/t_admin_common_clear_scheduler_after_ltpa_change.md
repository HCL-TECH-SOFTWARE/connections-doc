# Clearing all scheduled tasks {#t_admin_common_clear_scheduler_after_ltpa_change .task}

Use administrative commands to clear the scheduler of all tasks.

Clear scheduled tasks only if you must re-create all scheduler tasks. If you see an exception that relates to LTPA tokens in the system log before each task runs, clear the scheduled tasks. An exception might occur, for example, after any of the following changes:

-   A new LTPA token is imported into HCL Connections.
-   A new LTPA token is imported from a server in another cell as the result of enabling single sign-on.
-   Reverting the databases from a production environment to a staging environment.
-   Generating new LTPA keys due to a corporate security policy or LTPA timeout.

Do not run the command that is documented here unless the applications are running. The administrative command that is used in this procedure interacts with scheduler MBeans commands. The WebSphere® Application Server scheduler is not application-aware, so if the cluster that hosts an application is running, the scheduler attempts to run the scheduled tasks for that application. The scheduler runs even if the application itself is stopped. Each attempt to run a scheduled task for a stopped application results in an error message to the log.

If you disable or stop an application, cancel any scheduled tasks that are associated with it.

1.  Start the wsadmin client by completing the following steps:

    1.  Open a command prompt and then change to the following directory of the system on which you installed the deployment manager:

        [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/bin

        app\_server\_root/profiles/dm\_profile\_root/bin. Where app\_server\_root represents the IBM WebSphere Application Server installation directory, for example:

        ```
        Linux:
        /opt/IBM/WebSphere/AppServer
        
        ```

        ```
        Windows:
        drive:\Program Files\IBM\WebSphere\AppServer
        
        ```

        Where drive is the system drive on which the file directory is stored. For example: C: or D:.

        where dm\_profile\_root is the Deployment Manager profile directory; this directory is usually called dmgr01. For example, on Windows, the directory is C:\\Program Files\\IBM\\WebSphere\\AppServer\\profiles\\Dmgr01\\bin.

        **Attention:** You must run the command to start the wsadmin client from this specific directory because the Jython files for the product are stored there. If you start the client from a different directory, the execfile\(\) command does not work correctly.

    2.  Enter the following command to start the wsadmin client:

        -   Linux: ./wsadmin.sh -lang jython -user admin\_user\_id -password admin\_password -port SOAP\_CONNECTOR\_ADDRESS\_PORT
        -   Microsoft Windows: wsadmin -lang jython -user admin\_user\_id -password admin\_password -port SOAP\_CONNECTOR\_ADDRESS\_PORT
        where:

        -   admin\_user\_id is the user name of the Administrator role on IBM WebSphere Application Server. This administrator must be configured at the cell level, not at the cluster, node, or server level.
        -   admin\_password is the password of the WebSphere Application Server administrator.
        -   SOAP\_CONNECTOR\_ADDRESS\_PORT is the SOAP port for the WebSphere Application Server deployment manager server. The default value of the SOAP port is 8879. If you are using the default port value, you do not have to specify this parameter. If you are not using the default value and you do not know the port number, you can look up its value in the WebSphere Application Server Integrated Solution Console. To look up the SOAP port number, complete the following steps:
            1.  Open the WebSphere Application Server Integrated Solution Console for the deployment manager, and then select **System Administration** \> **Deployment Manager**.
            2.  In the Additional properties section expand **Ports**, and then look for the SOAP\_CONNECTOR\_ADDRESS port entry to find the port number.
        For example:

        -   Linux: ./wsadmin.sh -lang jython -username primaryAdmin -password p@assword -port 8879
        -   Microsoft Windows: wsadmin -lang jython -username primaryAdmin -password p@assword -port 8879
2.  Use the wsadmin client to access the HCL Connections configuration files.

    1.  Enter the following command to load the HCL Connections configuration file: execfile\("connectionsConfig.py"\)

        If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

3.  To ensure that all clusters and applications are started and that no scheduled tasks are currently running, retrieve a list of tasks:

    ```
    Scheduler.listAllTasks()
    ```

    From the returned list, determine what to do next by using these guidelines:

    **Wsadmin client message**
    :   **Recommended action**

    Status = running
    :   Wait until the task is completed.

    Skipping app\_name application
    :   The cluster that hosts the application is not running. Restart the cluster.

    Next Fire Time is in the past
    :   If this setting shows a date or time that has already passed, run the `clearScheduler.sql` SQL script as explained in the next step.

    When you list scheduled tasks, output like the following sample is displayed:

    ```
    wsadmin>Scheduler.listAllTasks()
    
           Task Name                 Status  |    Next Fire Time |           Interval
    
    Activities tasks
        TrashAutoPurgeJob             SCHEDULED  Sun Mar 15 02:00:00 GMT 2015   0 0 2 ? * SUN
        ActivityAutoCompleteJob       SCHEDULED  Sat Mar 14 23:00:00 GMT 2015   0 0 23 ? * SAT
        SyncGroupNames                SCHEDULED  Wed Mar 11 00:00:00 GMT 2015   0 0 0 * * ?
        DatabaseMaintenance           SCHEDULED  Wed Mar 11 01:00:00 GMT 2015   0 0 1 * * ?
        EventLogPurgeJob              SCHEDULED  Wed Mar 11 02:00:00 GMT 2015   0 0 2 * * ?
        FollowerListCleanupJob        SCHEDULED  Wed Mar 11 04:00:00 GMT 2015   0 0 4 * * ?
    
    Communities tasks
        LifecycleRetryQueuedEvents    SCHEDULED  Tue Mar 10 12:01:00 GMT 2015   0 1 0-23/3 ? * *
        EventLogCleanup               SCHEDULED  Tue Mar 10 12:30:00 GMT 2015   0 30 0-23/3 ? * *
        GroupCleanup                  SCHEDULED  Wed Mar 11 01:50:00 GMT 2015   0 50 1 ? * *
        fullDelete                    SCHEDULED  Wed Mar 11 03:00:00 GMT 2015   0 0 3 ? * *
    
    Files tasks
        SearchClearDeletionHistory    SCHEDULED  Tue Mar 10 16:00:00 GMT 2015   0 0 0,8,16 * * ?
        RenditionDailyGeneration      SCHEDULED  Wed Mar 11 00:00:00 GMT 2015   0 0 0 * * ?
        FileSyncClearEventsHistory    SCHEDULED  Wed Mar 11 00:00:00 GMT 2015   0 0 0 * * ?
        MetricsDailyCollection        SCHEDULED  Wed Mar 11 00:00:00 GMT 2015   0 0 0 * * ?
        TagUpdateFrequency            SCHEDULED  Tue Mar 10 12:00:00 GMT 2015   0 0 0-22/2 * * ?
        DirectoryGroupSynch           SCHEDULED  Tue Mar 10 12:00:00 GMT 2015   0 0 * * * ?
        FileActuallyDelete            SCHEDULED  Tue Mar 10 12:00:00 GMT 2015   0 0 0-23/3 * * ?|0 30 1-23/3 * * ?
    
    Forums tasks
        TrashAutoPurgeJob             SCHEDULED  Sun Mar 15 02:00:00 GMT 2015   0 0 2 ? * SUN
    
    Metrics tasks
        DataSynchronization           SCHEDULED  Tue Mar 10 23:00:00 GMT 2015   0 0 23 * * ?
        ReportGenerator               SCHEDULED  Tue Mar 10 11:48:05 GMT 2015   5 0- 59/1 * * * ?
        MetricsDBCleanup              SCHEDULED  Tue Mar 10 12:01:00 GMT 2015   0 1 0-23/1 * * ?
        MetricsDBEventCountCalculation  SCHEDULED  Tue Mar 10 12:01:00 GMT 2015   0 1/30 * * * ?
    
    News tasks
        NewsDataCleanup               SCHEDULED  Tue Mar 10 23:00:00 GMT 2015   0 0 23 ? * *
        ReplyToIdCleanup              SCHEDULED  Sat Mar 14 04:00:00 GMT 2015   0 0 4 ? * SAT
        ReplyToAttachmentCleanup      SCHEDULED  Sun Mar 15 04:00:00 GMT 2015   0 0 4 ? * SUN
        NewsCheckUpdatedPersons       SCHEDULED  Tue Mar 10 11:50:00 GMT 2015   0 50 * * * ?
        EmailDigestDelivery           SCHEDULED  Tue Mar 10 12:00:00 GMT 2015   0 0 * ? * *
        MetricsCollector              SCHEDULED  Wed Mar 11 02:00:00 GMT 2015   0 0 2 ? * *
        PersonSpreadTranche           SCHEDULED  Wed Apr 01 22:00:00 BST 2015   0 0 22 1 * ?
        ReplyToMailRetrieval          SCHEDULED  Tue Mar 10 11:50:00 GMT 2015   0 0/ 5 * * * ?
        NewsEventSubscriptionCleanup  SCHEDULED  Tue Mar 10 12:30:00 GMT 2015   0 30 * * * ?
    
    Profiles tasks
        DbCleanupTask                 SCHEDULED  Wed Mar 11 00:00:00 GMT 2015   0 0 0 * * ?
        ProcessLifeCycleEventsTask    SCHEDULED  Tue Mar 10 11:48:00 GMT 2015   0 */ 2 * * * ?
        ProcessTDIEventsTask          SCHEDULED  Tue Mar 10 11:48:00 GMT 2015   0 */ 2 * * * ?
        StatsCollectorTask            SCHEDULED  Wed Mar 11 01:00:00 GMT 2015   0 0 1 * * ?
        RefreshSystemObjectsTask      SCHEDULED  Wed Mar 11 01:00:00 GMT 2015   0 0 1 * * ?
        PhotoSyncTask                 SCHEDULED  Tue Mar 10 11:50:00 GMT 2015   0 */ 5 * * * ?
    
    Search tasks
        15min-search-indexing-task    SCHEDULED  Tue Mar 10 12:01:00 GMT 2015   0 1/ 15 0,2-23 * * ?
        20min-file-retrieval-task     SCHEDULED  Tue Mar 10 12:01:00 GMT 2015   0 1/ 20 0,2-23 * * ?
        nightly-optimize-task         SCHEDULED  Wed Mar 11 01:30:00 GMT 2015   0 30 1 * * ?
        nightly-sand-task             SCHEDULED  Wed Mar 11 01:00:00 GMT 2015   0 0 1 * * ?
    
    Wikis tasks
        SearchClearDeletionHistory    SCHEDULED  Tue Mar 10 16:00:00 GMT 2015   0 0 0,8,16 * * ?
        MetricsDailyCollection        SCHEDULED  Wed Mar 11 00:00:00 GMT 2015   0 0 0 * * ?
        TagUpdateFrequency            SCHEDULED  Tue Mar 10 12:00:00 GMT 2015   0 0 0-22/2 * * ?
        DirectoryGroupSynch           SCHEDULED  Tue Mar 10 12:00:00 GMT 2015   0 0 * * * ?
        FileActuallyDelete            SCHEDULED  Tue Mar 10 12:00:00 GMT 2015   0 0 0-23/3 * * ?|0 30 1-23/3 * * ?
        SitemapGenerator              SCHEDULED  Sun Mar 15 00:00:00 GMT 2015   0 0 0 ? * SUN
    
    wsadmin>
    ```

4.  After you complete the suggested actions, run the following command to clear the scheduled tasks:

    ```
    Scheduler.clearAllTasks()
    ```

    If Scheduler.clearAllTasks\(\) does not clear tasks successfully, run clearScheduler.sql manually for each of the applications as follows:

    1.  Open a DB2 Command line:

        ```
        C:\IBM\SQLLIB\bin>db2cmd.exe
        ```

    2.  Navigate to C:\\IBM\\Connections\\xkit\\connections.sql.
    3.  Run the clearScheduler command for each application.

        For example:

        ```
        C:\IBM\Connections\xkit\connections.sql>db2 -v -td"@" -f homepage\db2\clearScheduler.sql
        ```

    The SQL scripts are in the following locations:

    Linux: [connections\_root](../plan/i_ovr_r_directory_conventions.md)/connections.sql .

    Microsoft Windows: C:\\IBM\\Connections\\xkit\\connections.sql.

5.  Run the `Scheduler.listAllTasks()` \(step 3\) command again to verify that all tasks were cleared.

6.  Restart the clusters to force the scheduled tasks to be re-created:

    1.  From the WebSphere Application Server Integrated Solutions Console, expand Servers, click **Server Types**, and then click **WebSphere application servers**.

    2.  Select the check box for one server per cluster, and click **Restart**.


**Parent topic:**[Scheduling tasks](../admin/c_admin_common_was_scheduler.md)

