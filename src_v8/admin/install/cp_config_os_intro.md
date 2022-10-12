# Configuring the OpenSearch Metrics component {#cp_config_es_intro .concept}

Configure the OpenSearch offering of the Component Pack for HCL Connections™ to provide Metrics data.

If you are upgrading from Elasticsearch 7, review [Backing up and restoring data for OpenSearch indices](../admin/cp_config_os_backup_restore_data.md).

To deploy OpenSearch Metrics, perform these procedures:

-   [Removing SSL settings that were configured for type-ahead search](cp_config_os_ssl.md)
-   [Deploying Opensearch Metrics](cp_config_os_metrics_no_cognos.md)
-   [Enabling Opensearch Metrics to connect to a Component Pack server](cp_config_os_connect_to_cp_server.md)

Optionally, you can do the following procedures after installation:

-   [Granting access to global Opensearch Metrics](cp_config_os_grant_access.md)
-   [Granting access to Opensearch Metrics for communities](cp_config_os_grant_access_community.md)
-   [Changing the number of shards for the Opensearch Metrics index](cp_config_os_number_shards.md)
-   [Deploying OpenSearch Metrics with the data migrated from the metrics relational database](cp_config_os_migrate_cognos_data.md)

-   **[Removing SSL settings that were configured for type-ahead search](../install/cp_config_os_ssl.md)**  
Temporarily remove SSL settings that were configured for type-ahead search in an HCL Connections deployment, so that you can successfully enable Metrics.
-   **[Deploying Opensearch Metrics](../install/cp_config_os_metrics_no_cognos.md)**  
Deploying Opensearch-based metrics for HCL Connections involves testing the environment and then switching users to the Opensearch Metrics component.
-   **[Enabling Opensearch Metrics to connect to a Component Pack server](../install/cp_config_os_connect_to_cp_server.md)**  
For the Opensearch Metrics component to work with HCL Connections Component Pack, you must run a script on the Component Pack system to set the Opensearch server base URL in Highway. Also, WebSphere Application Server, which hosts the Metrics component, must run Java 8 and use an SSL client certificate when sending HTTPS requests to Opensearch on the Component Pack system.
-   **[Granting access to global Opensearch Metrics](../install/cp_config_os_grant_access.md)**  
Configure the `metrics-report-run` security role to grant users the authority to view and interact with global metrics.
-   **[Granting access to Opensearch Metrics for communities](../install/cp_config_os_grant_access_community.md)**  
Configure the `community-metrics-run` security role to grant users the authority to view community metrics using static reports.
-   **[Changing the number of shards for the Opensearch Metrics index](../install/cp_config_os_number_shards.md)**  
If your environment requires, you can change the default number of shards that will be assigned to the Opensearch Metrics index when it is created.
-   **[Deploying OpenSearch Metrics with the data migrated from the metrics relational database](../install/cp_config_os_migrate_cognos_data.md)**  
You can deploy Opensearch Metrics with the existing Metrics events data in your RDBMS. The procedure involves migrating the events data, testing the environment, and then switching users to the Opensearch Metrics component.

**Parent topic:**[Configuring the Component Pack](../install/cp_config_intro.md)

