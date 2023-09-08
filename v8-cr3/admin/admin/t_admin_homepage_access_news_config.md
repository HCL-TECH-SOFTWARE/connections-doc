# Accessing the News configuration file {#t_admin_homepage_access_news_config .task}

To make configuration changes to the News component in HCL Connections, you must first access the News configuration file.

To access configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

1.  To change News configuration settings, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  Start the News Jython script interpreter.

    1.  Use the following command to access the News configuration file:

        ```
        execfile("newsAdmin.py")
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    2.  Check out the News cell-level configuration file using the following command:

        NewsCellConfig.checkOutConfig\("working\_dir", "cellName"\)

        where:

        -   working\_dir is the temporary directory to which you want to check out the cell-level configuration file. This directory must exist on the server where you are running wsadmin.

            **Note:** Linux only: The directory must grant write permissions or the command will not run successfully.

        -   cellName is the name of the cell that the home page node belongs to. This argument is required. It is also case-sensitive, so type it with care. If you do not know the cell name, type the following command in the wsadmin command processor to determine it:

            print AdminControl.getCell\(\)

        For example:

        ```
        NewsCellConfig.checkOutConfig("d:/temp", "NewsServerNode01Cell")
        
        ```

        The command displays this message:

        ```
        News Cell Level configuration file successfully checked out.
        ```

4.  Navigate to the temporary directory in which you saved the news-config.xml file, and then open the file in a text editor and update the following parameters as required.

    |Parameter|Description|
    |---------|-----------|
    |databaseCleanup storyLifetimeInDays|Specifies the interval at which news stories are deleted from the News repository. For more information, see *Configuring database clean-up for the News repository*.|
    |dataSynchronization frequencyInHours|Specifies the interval at which networking data is synchronized between the News repository and the Profiles application. For more information, see *Synchronizing News data with other applications*.|
    |NewsDataCleanup task|Defines the interval at which the databaseCleanup task runs. There is also a configuration parameter to enable or disable this task from running. Do not disable this setting. If you disable it, you run the risk of rapidly reaching your file system storage limit as the database increases in size. Disabling this setting can also result in poor data access performance.

For more information about this task, see *Configuring database clean-up for the News repository*.|

    **Note:** The following parameters are also present in the news-config.xml file, but their default settings must not be changed.

    |Parameter|Description|
    |---------|-----------|
    |EmailDigestDelivery|A batch job that runs each hour to collect and post the news as daily and weekly emails. This setting must not be changed.Depending on their email notification settings, a daily or weekly email digest is posted to HCL Connections users with the most relevant news. The emails are sent instantly when they are posted as notifications in HCL Connections.

|
    |MetricsCollector|Used to update the statistics and metrics that are displayed for the Home page and News applications. The metrics collector is a batch process that runs every night.|
    |NewsCheckUpdatedPersons|Used internally to discover how often a person status changes in the system, for example, when a user is marked as active or inactive.|
    |PersonSpreadTranche|A scheduled task that load balances the users in the existing tranches that are used by the email digest so that users are spread in a uniform way according to their mail domain.You can run this task manually using the NewsEmailDigestService.loadBalanceEmailDigest\(\) command. For more information, see *Reallocating and load balancing users according to mail domain*.

|

5.  You must check the configuration file back in after making changes, and it must be checked in during the same wsadmin session in which it was checked out for the changes to take effect. See *Applying property changes in the News repository* for details.


-   **[Applying property changes in the News repository](../admin/t_admin_news_apply_property_changes.md)**  
After making changes to News configuration settings, you must check in the configuration settings and restart the server to apply the changes.

**Parent topic:**[Administering the News repository](../admin/c_admin_news.md)

**Related information**  


[Configuring database clean-up for the News repository](../admin/t_admin_homepage_config_news_data_cleanup.md)

[Synchronizing News data with other applications](../admin/t_admin_homepage_sync_news_data.md)

[Reallocating and load balancing users according to mail domain](../admin/t_admin_news_load_balance_users.md)

