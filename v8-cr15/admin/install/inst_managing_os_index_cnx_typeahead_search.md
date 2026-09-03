# Managing the OpenSearch index for Connections type-ahead search {#inst_managing_es_index_cnx_typeahead_search .reference}

The Connections type-ahead search feature uses an index named “quickresults” within the OpenSearch search engine. Review the following information about this index, preferably before creating the quickresults index and enabling the type-ahead search capability.

## Shard number { .section}

The default number of shards for this index is eight. If you want to change this default, do so before the index is created, because the new value applies only to future indexes and does not affect existing indexes. Changing the number of shards after the type-ahead Search component is enabled and deployed requires you to create a new index, or to follow a series of manual steps. Additional shards in an OpenSearch index consume resources and can affect performance depending on how the shards are used. Change the default setting only when you have carefully weighed the advantages and disadvantages of doing so in your environment. You can refer to following guide for details on changing the default shard number for future indexes: Changing the number of shards for the OpenSearch Quickresults index.

## Changing the number of shards for the OpenSearch quickresults index {#section_ipf_z32_1lb .section}

By default, the quickresults index shard count is set to 8. To modify this value, follow these steps:

-   No index created
-   Existing index
-   Setup

## No index created {#section_x1w_cj2_1lb .section}

If you have not yet created the quickresults index, or if you are going to delete the old index and start over with a new clean index, follow these steps:

1.  Update the search-config.xml file in the Deployment Manager profile configuration folder:

    Add the following statements to `<property name=”quickResults”>` section, replacing the value with the desired number of replicas.

    ```
    <propertyField name=quick.results.elasticsearch.shards.count' value='8'/>
    ```

2.  Synchronize the nodes and then restart the servers or clusters that are running the Search and Common applications.
3.  Create \(or recreate\) the index, refer to [Set up Metrics for OpenSearch](cp_install_services_tasks.md#metrics_os).

## Existing index { .section}

If you already have a quickresults index with data from your Connections users, it requires planning and additional steps to modify the number of shards in use. Use the following guide to reduce the number of shards in the quickresults index.

The strategy for reducing the shards will be to use the OpenSearch Shrink Index API, which will create a new index with a reduced shard count. Once this is completed, an OpenSearch alias will be added to the index so that Connections can still access it using the name “quickresults”.

## Setup {#section_z1w_cj2_1lb .section}

These steps are based on the [OpenSearch Shrink Index](https://opensearch.org/docs/latest/api-reference/index-apis/shrink-index/) documentation. The CURL tool is used to submit API requests to the OpenSearch engine and it will typically require access to the certificates that were used when setting up OpenSearch for the Metrics component. For information on how to retrieve the p12 certificate, refer to [Steps to install or upgrade to Component Pack 8 CR3](../install/cp_install_services_tasks.md). The exact curl syntax may vary based on which OS is used, however the following example could be used to connect to an OpenSearch server which is using a self-signed certificate.

```
curl -k --cert-type P12 --cert opensearch-metrics.p12:password -X GET "https://esserver.example.com:30099/quickresults?pretty"
```

1.  Shut down the Connections Search enterprise application using the WebSphere administration console. This will prevent the Connections apps from attempting to update the index while Connections is running.
2.  Mark the current index as read-only and force a copy of every shard in the index to the same node and have green health.

    Next, execute into opensearch-client pod:

    ```
    kubectl exec -ti -n connections $(kubectl get pods -n connections -o wide | grep opensearch-cluster-client | awk '{print $1}' | head -n 1) -- bash
    ```

    Run the following command for shrink operation:

    ```
    /usr/share/opensearch/probe/sendRequest.sh PUT "/quickresults/_settings?pretty" -H 'Content-Type: application/json' -d'
    {
      "settings": {
        "index.routing.allocation.require._name": "shrink_node_name", 
        "index.blocks.write": true 
      }
    }
    '
    ```

3.  Monitor this operation using the cluster health API for the quickresults index.

    ```
    /usr/share/opensearch/probe/sendRequest.sh GET "/_cluster/health/quickresults?wait_for_no_relocating_shards=true&pretty"
    ```

    Wait until this returns a value for `relocating_shards= 0`.

4.  Set the desired number of shards and replicas and shrink the index. The number\_of\_shards must be a factor of the number of shards in the source index. For example, if the original shards is 8, the number can be 4, 2 or 1.

    ```
    /usr/share/opensearch/probe/sendRequest.sh POST "/quickresults/_shrink/quickresults_shrink?pretty" -H 'Content-Type:application/json' -d'.
    ```

    ```
    {
      "settings": {
        "index.number_of_replicas": 1,
        "index.number_of_shards": 2 
      }
    }
    '
    ```

5.  Monitor this operation using the cluster health API for the quickresults\_shrink index.

    ```
    /usr/share/opensearch/probe/sendRequest.sh GET "/_cluster/health/quickresults_shrink?wait_for_active_shards=1&pretty"
    ```

    Wait until this returns a value for `active_shards=1`.

6.  Delete the old quickresults index using this command:

    ```
    /usr/share/opensearch/probe/sendRequest.sh DELETE "/quickresults"
    ```

7.  Assign an alias called “quickresults” to the new index quickresults\_shrink using this command:

    ```
    /usr/share/opensearch/probe/sendRequest.sh POST "/_aliases?pretty" -H 'Content-Type:application/json' -d'
    {
        "actions" : [
            { "add" : { "index" : "quickresults_shrink", "alias" : "quickresults" } }
        ]
    }
    '
    ```

8.  Verify the new indexes exist with the expected shard and replica counts.

    ```
    /usr/share/opensearch/probe/sendRequest.sh GET "/quickresults?pretty"
    ```

9.  Restart the application.

**Parent topic:**[Setting up type-ahead search](../install/inst_tasearch_intro.md)

