# Configuring the OpenSearch Metrics component 

Configure the OpenSearch offering of the Component Pack for HCL Connections™ to provide Metrics data.

To deploy OpenSearch Metrics, perform these procedures:

-   [Removing SSL settings that were configured for type-ahead search](cp_config_os_ssl.md)
-   [Deploying OpenSearch Metrics](cp_config_os_metrics_no_cognos.md)
-   [Enabling OpenSearch Metrics to connect to a Component Pack server](cp_config_os_connect_to_cp_server.md)

Optionally, you can do the following procedures after installation:

-   [Granting access to global OpenSearch Metrics](cp_config_os_grant_access.md)
-   [Granting access to OpenSearch Metrics for communities](cp_config_os_grant_access_community.md)
-   [Changing the number of shards for the OpenSearch Metrics index](cp_config_os_number_shards.md)
-   [Deploying OpenSearch Metrics with the data migrated from the metrics relational database](cp_config_os_migrate_cognos_data.md)

-   **[Deploying OpenSearch Metrics](../install/cp_config_os_metrics_no_cognos.md)**  
Deploying OpenSearch-based metrics for HCL Connections involves testing the environment and then switching users to the OpenSearch Metrics component.
-   **[Granting access to global OpenSearch Metrics](../install/cp_config_os_grant_access.md)**  
Configure the `metrics-report-run` security role to grant users the authority to view and interact with global metrics.
-   **[Granting access to OpenSearch Metrics for communities](../install/cp_config_os_grant_access_community.md)**  
Configure the `community-metrics-run` security role to grant users the authority to view community metrics using static reports.
-   **[Changing the number of shards for the OpenSearch Metrics index](../install/cp_config_os_number_shards.md)**  
If your environment requires, you can change the default number of shards that will be assigned to the OpenSearch Metrics index when it is created.

**Parent topic:** [Configuring the Component Pack](../install/cp_config_intro.md)

