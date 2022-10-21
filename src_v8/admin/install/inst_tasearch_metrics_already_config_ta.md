# Enabling type-ahead search {#inst_tasearch_metrics_already_config_ta .task}

Enable the type-ahead search feature using OpenSearch in an HCL Connections™ deployment.

Review the topic, [Managing the OpenSearch index for Connections type-ahead search](inst_managing_os_index_cnx_typeahead_search.md) to determine if you want to change the default number of shards or replicas. These values should be changed prior to creating the index.

Verify that the server can connect to the OpenSearch server and that SSL is configured.

You can configure type-ahead search using the OpenSearch component of the Component Pack for Connections.

1.  Run the following SearchService administration command:

    ```
    SearchService.createES7QuickResultsIndex()
    ```

    For information on running SearchService commands, see [SearchService commands](../admin/r_admin_searchservice_commands.md).

    **Attention:** This step must complete successfully before you proceed to step 2.

2.  Update the LotusConnections-config.xml file in the Deployment Manager profile configuration folder:

    Add the following statement to the `<properties>` section of the file:

    ```
    <genericProperty name="quickResultsEnabled">true</genericProperty>
    ```

3.  Update the search-config.xml file in the Deployment Manager profile configuration folder:

    Add the following statements to the `<propertySettings>` section:

    ```
    
    <property name="quickResults">
         <propertyField name="quick.results.elasticsearch.indexing.enabled" value="true"/>
         <propertyField name="quick.results.solr.indexing.enabled" value="false"/>
         <propertyField name="quick.results.use.solr.for.queries'\" value="false"/>
         <propertyField name="quick.results.elasticsearch7.writing.enabled" value="true"/>
         <propertyField name="quick.results.elasticsearch7.reading.enabled" value="true"/>
    </property>
    ```

4.  Synchronize the nodes and then restart the servers or clusters that are running the Search and Common applications.


**Parent topic:**[Setting up type-ahead search](../install/inst_tasearch_intro.md)

