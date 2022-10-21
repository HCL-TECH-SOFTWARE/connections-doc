# Deploying OpenSearch Metrics with the data migrated from the metrics relational database {#cp_config_es_migrate_cognos_data .task}

You can deploy Opensearch Metrics with the existing Metrics events data in your RDBMS. The procedure involves migrating the events data, testing the environment, and then switching users to the Opensearch Metrics component.

**Note:** If you are new to Connections, skip this task and instead use the following instructions to set up Elasticsearch Metrics for your first use: [Deploying Elasticsearch Metrics as your first use of metrics](cp_config_os_metrics_no_cognos.md).

Both the RDBMS-based metrics app and the Elasticsearch Metrics component are installed during the Connections 6.0 CR updates. The RDBMS-based metrics app is provided for testing purposes only, and no Cognos® server is needed. Ensure that you have applied both the latest CR and the latest Connections Component Pack ifix, changed the number of shards for the index \(if your environment warrants it\), and enabled the Metrics component to connect to your Elasticsearch server.

Migrating data from your relational database to Elasticsearch storage is an iterative process. Because data continues to be generated during the testing period, plan to migrate your data at least once more after you switch users to the Elasticsearch Metrics component.

1.  In the LotusConnections-config.xml file, you must point to the correct version of Elasticsearch by changing the value of the following parameter to 7:

    <genericProperty name="elasticsearch.eSmajorVersion"\>7</genericProperty\>

    For more information on making changes to the LotusConnections-config.xml file, see [Editing configuration files](../admin/t_admin_common_checkout_config_file.md).

2.  From the Deployment Manager system, load the Python script by entering the following commands:

    ```
    cd /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/bin
    sudo sh wsadmin.sh -lang jython -user wasadmin\_user -password wasadmin\_password
    execfile('metricsEventCapture.py')
    ```

3.  Migrate events and populate user attributes.

    Table 1 lists the possible migration commands and describes what they do; the list following Table 1 suggests which migration commands best suit different customer situations.

    |Command name|Description|
    |------------|-----------|
    |MigraterService.migrate\(\)|Migrate all of existing events data|
    |MigraterService.migrateFrom\('YYYYMMDD'\)|Migrate only data created after a certain date|
    |MigraterService.populateUserAttributes\(\)|Populate user attributes for events in Elasticsearch|
    |MigraterService.migrateAndPopulateUserAttributes\(\)|Migrate all of existing events data, and populate user attributes for events in Elasticsearch|
    |MigraterService.migrateAndPopulateUserAttributesFrom\('YYYYMMDD'\)|Migrate only data created after a certain date, and populate user attributes for events in Elasticsearch|

    When choosing the migration command, review the following considerations:

    -   If you have already migrated events data, populate user attributes for events in Elasticsearch by running the following command: `MigraterService.populateUserAttributes()`
    -   If you have not migrated events data, you can migrate events and user attributes population for events together, by running one of the following commands:
        -   `MigraterService.migrateAndPopulateUserAttributes()`
        -   `MigraterService.migrateAndPopulateUserAttributesFrom('YYYYMMDD')`
    -   If you have not migrated events data and you want to separate the tasks of migrating events data and populating user attributes, run the following commands separately:
        1.  Migrate events data to Elasticsearch: `MigraterService.migrate()` or `MigraterService.migrateFrom('YYYYMMDD')`
        2.  Populate user attributes to the events migrated in Elasticsearch: `MigraterService.migrateAndPopulateUserAttributes()`
    The command returns immediately, but the task continues to run on the server as necessary. Monitor the progress by viewing the logs at /opt/IBM/WebSphere/AppServer/profiles/AppSrv01/logs/Metrics\_Server:

    -   MetricsMigration\_YY.MM.DD\_HH:MM:SS.log
    -   PopulateUserAttributes\_YY.YY.DD\_HH:MM:SS.log
4.  Validate that the Elasticsearch user experience is functioning well by updating the browser URL to include the test context root; for example, by replacing "/metrics" with "/metricssc" in the URL for Global Metrics or Community Metrics.

    Log in to the URL as an admin user: https://Connections-server/metricssc

5.  When validation is complete, run the following Python script to switch users to new metrics app.

    This script causes the RDBMS-based app to stop capturing data, and the Elasticsearch component to start capturing it.

    ```
    execfile('metricsEventCapture.py')
    switchMetricsToElasticSearch()
    ```

6.  Migrate any content that was updated by users while this task was in progress.

    If Connections users updated content during the data migration and validation periods, that data was stored on the relational database, so repeat step 2 to migrate it. You can repeat step 2 as many times as necessary.


When you are ready to back up your new metrics data, see [Backing up and restoring data for OpenSearch indices](../admin/cp_config_os_backup_restore_data.md).

**Parent topic:**[Configuring the OpenSearch Metrics component](../install/cp_config_os_intro.md)

