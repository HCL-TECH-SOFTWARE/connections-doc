# Enabling OpenSearch Metrics to connect to a Component Pack server {#cp_config_es_connect_to_cp_server .task}

For the OpenSearch Metrics component to work with HCL Connections Component Pack, you must run a script on the Component Pack system to set the OpenSearch server base URL in Highway. Also, WebSphere Application Server, which hosts the Metrics component, must run Java 8 and use an SSL client certificate when sending HTTPS requests to OpenSearch on the Component Pack system.

Make sure that secure connections are established in your deployment, as explained in [../secure/t\_admin\_common\_forcing\_tls.md](../secure/t_admin_common_forcing_tls.md).

**Important:** OpenSearch Metrics requires that the WebSphere Application Server is running Java 8. If you have a new FileNet deployment and you temporarily switched to Java 6 to update FileNet components after applying Connections 6.0 CR1, make sure that you switch back to Java 8 before you start the following procedure.

1.  If your single sign-on solution includes IBM Security Access Manager, SiteMinder, or SPNEGO with SiteMinder, update the URLs that require basic authentication to include /metricssc/configsetter by referring to the appropriate topic:

    -   For IBM Security Access Manager, see [../secure/t\_secure\_with\_tam.md](../secure/t_secure_with_tam.md).
    -   For SiteMinder, see [../secure/t\_secure\_with\_siteminder.md](../secure/t_secure_with_siteminder.md).
    -   For SPNEGO with SiteMinder, see [../secure/t\_secure\_with\_siteminder\_SPNEGO.md](../secure/t_secure_with_siteminder_SPNEGO.md).
2.  In the LotusConnections-config.xml file, you must point to the correct version of OpenSearch by changing the value of the following parameter to 7:

    <genericProperty name="elasticsearch.eSmajorVersion"\>7</genericProperty\>

    For more information on making changes to the LotusConnections-config.xml file, see [../admin/t\_admin\_common\_checkout\_config\_file.md](../admin/t_admin_common_checkout_config_file.md).

3.  Run the config\_blue\_metrics.py script as follows:

    On the Connections Component Pack system, from the extractedFolder/microservices\_connections/hybridcloud/support directory, call the script by running the following Linux command:

    ```
    python config_blue_metrics.py --skipSslCertCheck true --pinkhost hostname.ibm.com
    ```

    -   You must use --skipSslCertCheck \(set to true\) on systems that use self-signed SSL certificates.
    -   Set --pinkhost to the FQDN of the Kubernetes master \(this would be the fronting Kubernetes master load balancer or virtual IP in a HA environment\).
    -   Use --namespace on an Connections Component Pack deployment where connections is not the Kubernetes namespace to use.
    Here is a sample of the output from the script:

    \[Adminuser@Server127 ~\]$ python config\_blue\_metrics.py --skipSslCertCheck true --pinkhost Server127.yourDomain.com Updating Metrics settings on: https://Server127.yourDomain.com/metricssc/configsetter \{"c2.export.elasticsearch.baseurl7" : "https://Server127.swg.usma.ibm.com:30098"\}

4.  Restart MetricsEventCapture and MetricsUI through the WebSphere Integrated Solutions Console.

5.  To ensure a secure connection, retrieve the PKCS12 and CA Signer certificates by running the following commands on the Component Pack master node:

    ```
    kubectl get secret elasticsearch-7-secret
    
     -n connections -o=jsonpath="{.data['chain-ca\.pem']}" | base64 -d > chain-ca.pem
    kubectl get secret elasticsearch-7-secret
    
     -n connections -o=jsonpath="{.data['elasticsearch-metrics\.p12']}" | base64 -d > elasticsearch-metrics.p12
    
    ```

6.  Copy the certificate files to the Deployment Manager in a common location readable and writable by all WebSphere Application Server nodes.

    For example, copy the 2 files chain-ca.pem and elasticsearch-metrics.p12 from the Component Pack master node to the following directory: /opt/IBM on the Deployment Manager.

7.  Now configure OpenSearch metrics within Connections by completing the following steps:

    1.  Open wsadmin, making sure that you use the -lang jython option.

        For example, on Linux, run the following commands to open wsadmin:

        ```
                cd /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/bin
                sudo sh wsadmin.sh -lang jython -user wasadmin\_user -password wasadmin\_password
        
        ```

    2.  Run the following commands to merge the signer certificate into the elasticsearch-metrics.p12 keystore:

        ```
                execfile('esSecurityAdmin.py')    
                enableSslForMetrics('KEYSTORE\_FULL\_PATH', 'STORE\_PASSWORD', 'SIGNER\_CA\_FULL\_PATH', 'ELASTICSEARCH\_HTTPS\_PORT')
                quit
        
        ```

        For example:

        ```
                execfile('esSecurityAdmin.py')
                enableSslForMetrics('/opt/IBM/elasticsearch-metrics.p12', 'Elasticsearch\_CA\_password', '/opt/IBM/chain-ca.pem', '30098')
        
        ```

        where `Elasticsearch\_CA\_password` is the password that was set while [cp\_install\_bootstrap.md](cp_install_bootstrap.md).

    3.  Copy the updated elasticsearch-metrics.p12 file from the Deployment Manager to the same location on the WebSphere Application Server nodes.

    4.  Synchronize the nodes and then restart the servers or clusters that are running the Search and Common applications \(including the Deployment Manager and nodes\).

    5.  If you are using type-ahead search on a separate cluster, add the SSL configuration as explained in [Steps to install or upgrade to Component Pack 8 CR3](../install/cp_install_services_tasks.md).


Deploy OpenSearch-based metrics for Connections as explained in [cp\_config\_os\_metrics\_no\_cognos.md](cp_config_os_metrics_no_cognos.md).

