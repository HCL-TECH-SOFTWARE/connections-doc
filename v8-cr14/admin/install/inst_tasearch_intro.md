# Setting up type-ahead search {#inst_tasearch_intro .task}

Enable type-ahead search in HCL Connections™ to suggest items in the search box based on content that is relevant to each user.

To configure type-ahead search, use the instructions that are most appropriate to your Connections deployment.

-   **[Managing the OpenSearch index for Connections type-ahead search](../install/inst_managing_os_index_cnx_typeahead_search.md)**  
The Connections type-ahead search feature uses an index named “quickresults” within the OpenSearch search engine. Review the following information about this index, preferably before creating the quickresults index and enabling the type-ahead search capability.
-   **[Set up Metrics for OpenSearch](../install/cp_install_services_tasks.md#metrics_os)**
Component Pack for HCL Connections 8.0 CR3 comes with OpenSearch enabled by default – this is the only backend for Metrics starting from Connections 8.0. If you are upgrading from Connections 7.0, you need to update Metrics and switch from the Elasticsearch 7 service in your Component Pack 7 deployment, to OpenSearch for Component Pack 8 CR3.

**Parent topic:**[Configuring additional HCL Connections applications](../install/t_inst_config_addons.md)

