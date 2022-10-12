# Installing the Component Pack's connections-env {#cp_install_connections-env .concept}

Install the connections-env Helm chart, which is required for all three offerings \(Customizer, Elasticsearch and Orient Me\) of the Component Pack for HCL Connections™.

This topic explains how to deploy connections-env using different security configurations, and provides information about:

-   [Installing the connections-env Helm chart](#cp_install_connections-env_install)
-   [Enabling interservice communications through the HTTP server](#cp_install_connections-env_interservice)
-   [Updating the connections-env deployment to enforce the use of SSL](#cp_install_connections-env_update_ssl)

**Attention:** Before attempting to install the connections-env Helm chart, review of the sections in this topic to ensure that you use the appropriate settings for your deployment.

## Installing the connections-env Helm chart {#cp_install_connections-env_install .section}

The command for installing connections-env depends on whether SSL is enforced for the Connections deployment and whether you are installing in a SPNEGO environment.

With Connections, you can enforce SSL directly by updating the LotusConnections-config.xml file to set the `forceConfidentialCommunications` flag to `true`. If you enable this setting, then you must also enforce SSL for communications between the Orient Me component and Connections; otherwise users will not be able to Like, comment on, or post updates to tiles in Orient Me.

Install the connections-env Helm chart using the appropriate command for your SSL setting.

Install when SSL is enforced
:   If `forceConfidentialCommunications` flag is set to `true`, run the following command to install connections-env, replacing the `ic.host` value with the FQDN of your Connections front door address \(for example, the load balancer\), and replacing `ic.internal` with the FQDN of your Connections HTTP server.

    **Note:** By default, deployment is done to the `connections` namespace. If you created a namespace with a different name and would like to deploy there, the following extra value must be included in the helm install command: `namespace=namespace`

    ```
    helm install \
    --name=connections-env extractedFolder/microservices_connections/hybridcloud/helmbuilds/connections-env-0.1.40-20200320-143558.tgz \
    --set\
    onPrem=true,\
    createSecret=false,\
    ic.host=ic\_front\_door,\
    ic.internal=ic\_http\_server,\
    ic.interserviceOpengraphPort=443,\
    ic.interserviceConnectionsPort=443,\
    ic.interserviceScheme=https
    ```

    You can verify the installation by running the `helm list` command. A successful installation shows the chart with a status of DEPLOYED.

Install when SSL is not enforced
:   If `forceConfidentialCommunications` flag is set to `false`, run the following command to install connections-env, replacing the `ic.host` value with the FQDN of your Connections front door address \(for example, the load balancer\), and `ic.internal` with the FQDN of your Connections HTTP server.

    **Note:** By default, deployment is done to the `connections` namespace. If you created a namespace with a different name and would like to deploy there, the following extra value must be included in the helm install command: `namespace=namespace`

    ```
    helm install \
    --name=connections-env <extracted_folder>/microservices_connections/hybridcloud/helmbuilds/connections-env-0.1.40-20191121-232052.tgz
     \
    --set \
    onPrem=true,\
    createSecret=false,\
    ic.host=ic\_front\_door,\
    ic.internal=ic\_http\_server
    ```

    You can verify the installation by running the `helm list` command. A successful installation shows the chart with a status of DEPLOYED.

## Enabling interservice communications {#cp_install_connections-env_interservice .section}

When you install the connections-env Helm chart, you provide both the `ic.host` \(front door\) and `ic.internal` \(HTTP server\) values. All interservice communications use the `ic.internal` value to avoid sending traffic out through the front door -- this approach makes your environment more efficient.

However, if you deploy connections-env in an environment where the `forceConfidentialCommunications` flag is set to `false` and your HCL Connections server is not configured to answer in HTTPS, then some interservice header requests will use the `ic.host` \(front door\) value. If using the `ic.host` presents a problem in your environment \(for example, if a firewall rule blocks traffic from the Component Pack servers to the front door address\), then you can use one of the following methods to enable the interservice communications:

-   Enforce the use of SSL \(set `forceConfidentialCommunications` to `true`\) and then update the connections-env deployment.
-   Configure the Connections server to answer in HTTPS by creating an `httpsIndicatorHeader` custom property in IBM® WebSphere® Application Server. For information, see [Web container custom properties](https://www.ibm.com/support/knowledgecenter/SSEQTP_8.5.5/com.ibm.websphere.base.iseries.doc/ae/rweb_custom_props.html#field8_rweb_custom_props) in the WebSphere Application Server documentation.

## Updating the connections-env deployment to enforce SSL {#cp_install_connections-env_update_ssl .section}

If you installed connections-env without enforcing SSL communication and now want to enforce SSL communication, you can do so by running a helm upgrade with the following command.

**Note:** By default, deployment is done to the `connections` namespace. If you created a namespace with a different name and would like to deploy there, the following extra value must be included in the helm install command: `namespace=namespace`

```
helm upgrade \
connections-env <extracted_folder>/microservices_connections/hybridcloud/helmbuilds/connections-env-0.1.40-20191121-232052.tgz \
--set \
onPrem=true,\
createSecret=false,\
ic.host=ic\_front\_door,\
ic.internal=ic\_http\_server,\
ic.interserviceOpengraphPort=443,\
ic.interserviceConnectionsPort=443,\
ic.interserviceScheme=https
```

You can verify the installation by running the `helm list` command. A successful update shows the chart with a status of DEPLOYED.

