# Setting up certificates for type-ahead search {#inst_tasearch_no_metrics .task}

If you deployed OpenSearch in your HCL Connections™ deployment, use these instructions to set up certificates before you configure type-ahead search.

Verify that the server where type-ahead search is hosted can connect to the OpenSearch server.

You can configure type-ahead search using either the stand-alone OpenSearch server or the OpenSearch component of the Component Pack for Connections. Both metrics and type-ahead search use OpenSearch, they share the destination server URL and some certificate information. Check the following steps to determine if they are required to be run type-ahead search servers, if OpenSearch has already been enabled.

1.  If metrics is not already enabled, then enable the type-ahead search service by completing the following steps to provide the OpenSearch URL and port:

    If you enabled metrics, then this information was configured at that time.

    1.  Open wsadmin and start the Search service by running the following commands.

        Linux example:

        ```
        cd /opt/IBM/WebSphere/DeploymentManager/profiles/Dmgr01/bin
        ./wsadmin.sh -lang jython -user User\_name -password Password
        execfile('searchAdmin.py')
        ```

    2.  On the server where type-ahead search is hosted, run the following SearchService administration command, which sets the URL that type-ahead search should use to connect to the OpenSearch instance:

        ```
        SearchService.setES7QuickResultsBaseUrl(url)
        ```

        For example:

        ```
        SearchService.setES7QuickResultsBaseUrl("https://example.org:30098")
        ```

        For information on running SearchService commands, see [SearchService commands](../admin/r_admin_searchservice_commands.md).

2.  If metrics is not already enabled, or metrics and type-ahead search will be hosted in different WebSphere clusters, complete the following steps to ensure that both features can access the certificate information.

    If metrics is enabled and is hosted in the same WebSphere cluster as search, skip this step and proceed to the next topic.

    1.  To ensure a secure connection to OpenSearch, retrieve the PKCS12 and CA Signer certificates from the OpenSearch server.

        If you are using the Component Pack OpenSearch, run the following commands on the primary Kubernetes master to retrieve the files:

        ```
        kubectl get secret elasticsearch-7-secret -n connections -o=jsonpath="{.data['chain-ca\.pem']}" | base64 -d > chain-ca.pem
        kubectl get secret elasticsearch-7-secret -n connections -o=jsonpath="{.data['elasticsearch-metrics\.p12']}" | base64 -d > elasticsearch-metrics.p12
        ```

    2.  Copy the certificate files to the Deployment Manager in a common location readable and writable by all WebSphere® Application Server users.

    3.  Open wsadmin by running the following commands.

        Linux example:

        ```
        cd /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/bin
        ./wsadmin.sh -lang jython -user User\_name -password Password
         
        ```

    4.  Run the following command to merge the signer certificate into the `elasticsearch_metrics.p12` keystore:

        ```
        execfile('esSearchAdmin.py')
        enableSslForESSearch('Keystore\_full\_path', 'Store\_password', 'Signer\_CA\_full\_path', 'Elasticsearch\_HTTPS\_port')
        quit
        ```

    5.  Copy the updated elasticsearch\_metrics.p12 file from the Deployment Manager to the same location on the WebSphere Application Server nodes.


**Parent topic:**[Setting up type-ahead search](../install/inst_tasearch_intro.md)

