# Removing SSL settings that were configured for type-ahead search {#cp_config_es_ssl .task}

Temporarily remove SSL settings that were configured for type-ahead search in an HCL Connections™ deployment, so that you can successfully enable Metrics.

If you already enabled type-ahead search with OpenSearch, remove the SSL settings before you enable Metrics. When you configure Metrics, the SSL settings will be recreated and both features will share the certificate information.

**Note:** If you did not enable type-ahead search with OpenSearch yet, skip this task.

1.  Log in to the WebSphere® Integrated Solutions Console for the type-ahead search cluster.

2.  Click **Security** \> **SSL certificate and key management** \> **Dynamic outbound endpoint SSL configurations** and, for each cluster member, delete the endpoint that begins with "SSLToES".

3.  Click **Security** \> **SSL certificate and key management** \> **SSL configurations** and delete the setting with name "ESSearchSSLSettings".

4.  Click **Security** \> **SSL certificate and key management** \> **Key stores and certificates** and delete the key store with name "ESCloudKeyStore".


