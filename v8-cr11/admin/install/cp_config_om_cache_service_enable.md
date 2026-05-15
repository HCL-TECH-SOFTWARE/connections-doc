# Manually configuring Cache Service traffic to Homepage {#cp_config_om_cache_service_enable .concept}

Configure Cache Service (Valkey) traffic between the HCL Connections™ applications and the Homepage.

## Do you need to manually configure the Cache Service? { .section}

By default, Cache Service is automatically configured as part of the [bootstrap installation](cp_install_services_tasks.md#bootstrap) task. You can verify this configuration by reviewing the bootstrap pod logs using the steps below:

1.  Determine the bootstrap pod name by running the following command:

    ```
    kubectl get pods -n connections | grep bootstrap
    ```

    The response should look like the following example:
    
    ```
    bootstrap-1abcd      0/1         Completed    0        1d
    ```

2.  Check the bootstrap pod logs by running the following command:

    ```
    kubectl logs bootstrap-1abcd -n connections
    ```

    If Cache Service is configured successfully, you will see the following message in the logs:

    ***```Cache service configuration completed```***

    If the Cache Service was not configured, or if the configuration failed with the following error, continue with the steps on this page to configure it manually:

    ***```Unable to reach Connections HTTP server on <http_server>/homepage/orgadmin/adminapi.jsp. Please make sure host is correct and Connections is running. Alternatively you can configure cache service manually using the steps in the documentation.```***


If manual adjustments are required, use the scripts described below to update the connection settings between the HCL Connections server and the Cache Service. These scripts support both Redis (legacy) and Valkey configurations.

## Running the configuration script { .section}

Ensure that the Connections server is running. Then, run the Cache Service configuration script and restart the dependent applications to apply the changes.

1. On a system with access to the Connections deployment URL, download the `configureCacheService.sh` script and grant it execute permissions.
    ```
    curl -O https://raw.githubusercontent.com/HCL-TECH-SOFTWARE/connections-automation/refs/heads/main/roles/hcl/component-pack-harbor/files/cache-service/configureCacheService.sh
    chmod +x configureCacheService.sh
    ```
2. Run the configuration script with the following command, including the parameters described in Table 1.

    ```
    sudo bash configureCacheService.sh -m <cache service host> -po 30379 -ic https://<connections url> -ic_u <admin user> -ic_p <admin password> -pw <cache service password>
    ```

    |Parameter|Description|
    |---------|-----------|
    |`-m`|The host name or IP address of the external Kubernetes load balancer (eg. HAProxy) in an HA environment or the worker node in a single node environment.|
    |`-po`|The external port that haproxy-valkey is running on. The default port is 30379.|
    |`-ic`|The host name and HTTP protocol used to access Connections in the browser. You must specify `http://` or `https://` or the script will not run.|
    |`-ic_u`|Required. The user name of the Connections Administrator account, which is also the WebSphere Application Server administrator account.|
    |`-ic_p`|Required. The password for the Connections Administrator account, which is also the WebSphere Application Server administrator account.|
    |`-pw`|The password for the Kubernetes cache-service-secret. This value must match the `env.set_cache_service_secret` setting that was used during the [bootstrap installation](cp_install_services_tasks.md#bootstrap).|

    Example:

    ```
    sudo bash cconfigureCacheService.sh -m 1.2.3.4 -po 30379 -ic https://connections.example.com -ic_u admin -ic_p admin_password -pw cache_service_password
    ```

    After the script completes, verify that there is no `configuration failed` error message.

3.  Restart the dependent applications by completing the following steps:
    1.  Browse to the WebSphere® Integrated Solutions Console and log in.

        For example: https://your\_Connections\_URL:9043/ibm/console

    2.  Click **Applications** \> **All Applications**.
    3.  Stop and restart the Common application.
    4.  Stop and restart the News application.

## Alternative configuration { .section}

If the configureCacheService.sh script does not work, you can instead configure the Cache Service directly on the HCL Connections deployment WebSphere Deployment Manager \(Linux only\)::

1.  On the Connections deployment WebSphere Deployment Manager, create a folder and download the Cache Service files from the [HCL Harbor repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/files/cache-service).  Grant execute permissions to the 'updateCacheServiceJSON.sh' script. 
    
2.  On the Deployment Manager, run the configuration script with following command, including the parameters described in Table 2:

    ```
    sudo bash $HOME/cache-service/updateCacheServiceJSON.sh \
    -m k8s_load_balancer_host_or_ip \
    -po haproxy-valkey_port \
    -pa path_to_update_folder \
    -pw cache_service_password
    ```

    |Parameter|Description|
    |---------|-----------|
    |`-m`|The host name or IP address of the external Kubernetes load balancer (for example, HAProxy) in an HA environment or the worker node in a single node environment.|
    |`-po`|The external port that haproxy-valkey is running on. The default port is 30379.|
    |`-pa`|The absolute path to the Connections configuration update folder. For example, ` \(Linux®\): /opt/HCL/Connections/shared/configuration/update`|
    |`-pw`|Password for the Kubernetes cache-service-secret. This value must match the `env.set_cache_service_secret` setting that was used during the [bootstrap installation](cp_install_services_tasks.md#bootstrap).|

    Example:

    ```
    sudo bash pdateCacheServiceJSON.sh -m 1.2.3.4 -po 30379 -pa /opt/HCL/Connections/shared/configuration/update -pw cache_service_password
    ```

    When the script finishes running, a confirmation message displays with a list of the steps for completing the configuration:

    ```
    Next Steps :
     1. Log in to the WebSphere Deployment Manager. Browse to Applications "
     2. Restart Common
     3. Restart News

    Clean exit
    ```

3.  Restart the dependent applications as instructed by completing the following steps:
    1.  Browse to the WebSphere Integrated Solutions Console and log in.

        For example: `https://your\_Connections\_URL:9043/ibm/console`

    2.  Click **Applications** \> **All Applications**.
    3.  Stop and restart the Common application.
    4.  Stop and restart the News application.

**Parent topic:**[Enabling and securing Cache Service traffic to Homepage](../install/cp_config_om_cache_service_traffic.md)

