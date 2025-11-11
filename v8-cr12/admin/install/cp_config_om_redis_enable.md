# Manually configuring Redis traffic to Homepage {#cp_config_om_redis_enable .concept}

Configure Redis traffic between the HCL Connections™ applications and the Homepage.

## Do you need to manually configure Redis? { .section}

By default, Redis is configured automatically as part of the [bootstrap installation](cp_install_services_tasks.md#bootstrap) task. You can confirm this by checking the bootstrap pod logs with the following steps:

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

    If redis is configured successfully, you will see the following message in the logs:

    ***```Successfully configured redis```***

    If redis was not configured, or if redis failed to configure with the following error, continue with the steps on this page to configure redis manually:

    ***```Unable to reach Connections HTTP server on <http_server>/homepage/orgadmin/adminapi.jsp. Please make sure host is correct and Connections is running.Alternatively you can configure redis manually using the steps in the documentation.```***


## Running the configuration script { .section}

Ensure that the Connections server is running. Then, run the Redis configuration script and restart the dependent applications to apply the changes.

1. On a system with access to the Connections deployment URL, download the `configureRedis.sh` script and grant it execute permissions.
    ```
    curl -O https://raw.githubusercontent.com/HCL-TECH-SOFTWARE/connections-automation/refs/heads/main/roles/hcl/component-pack-harbor/files/redis/configureRedis.sh
    chmod +x configureRedis.sh
    ```
2. Run the configuration script with the following command, including the parameters described in Table 1.

    ```
    sudo bash configureRedis.sh -m <redis host> -po 30379 -ic https://<connections url> -ic_u <admin user> -ic_p <admin password> -pw <redis password>
    ```

    |Parameter|Description|
    |---------|-----------|
    |`-m`|The host name or IP address of the external Kubernetes load balancer (eg. HAProxy) in an HA environment or the worker node in a single node environment.|
    |`-po`|The external port that haproxy-redis is running on. The default port is 30379.|
    |`-ic`|The host name and HTTP protocol used to access Connections in the browser. You must specify `http://` or `https://` or the script will not run.|
    |`-ic_u`|Required. The user name of the Connections Administrator account, which is also the WebSphere Application Server administrator account.|
    |`-ic_p`|Required. The password for the Connections Administrator account, which is also the WebSphere Application Server administrator account.|
    |`-pw`|The password for the Redis secret. This value must match the `env.set_redis_secret` setting that was used during the [bootstrap installation](cp_install_services_tasks.md#bootstrap).|

    Example:

    ```
    sudo bash configureRedis.sh -m 1.2.3.4 -po 30379 -ic https://connections.example.com -ic_u admin -ic_p admin_password -pw redis_password
    ```

    After the script completes, verify that there is no `redis config failed` error message.

3.  Restart the dependent applications by completing the following steps:
    1.  Browse to the WebSphere® Integrated Solutions Console and log in.

        For example: https://your\_Connections\_URL:9043/ibm/console

    2.  Click **Applications** \> **All Applications**.
    3.  Stop and restart the Common application.
    4.  Stop and restart the News application.

## Alternative configuration { .section}

If the configureRedis.sh script does not work, there is an alternative method to configure redis directly on the HCL Connections deployment's WebSphere Deployment Manager \(Linux only\):

1.  On the Connections deployment's WebSphere Deployment Manager, create a folder and download the Redis files from the [HCL Harbor repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/files/redis).  Grant execute permissions to the 'updateRedisJSON.sh' script. 
    
2.  On the Deployment Manager, run the configuration script with following command, including the parameters described in Table 2:

    ```
    sudo bash $HOME/redis/updateRedisJSON.sh \
    -m k8s_load_balancer_host_or_ip \
    -po haproxy-redis_port \
    -pa path_to_update_folder \
    -pw redis_password
    ```

    |Parameter|Description|
    |---------|-----------|
    |`-m`|The host name or IP address of the external Kubernetes load balancer (for example, HAProxy) in an HA environment or the worker node in a single node environment.|
    |`-po`|The external port that haproxy-redis is running on. The default port is 30379.|
    |`-pa`|The absolute path to the Connections configuration update folder. For example, ` \(Linux®\): /opt/HCL/Connections/shared/configuration/update`|
    |`-pw`|Password for the Redis secret. This value must match the `env.set_redis_secret` setting that was used during the [bootstrap installation](cp_install_services_tasks.md#bootstrap).|

    Example:

    ```
    sudo bash updateRedisJSON.sh -m 1.2.3.4 -po 30379 -pa /opt/HCL/Connections/shared/configuration/update -pw yourredispassword
    ```

    When the script finishes running, a confirmation message displays with a list of the steps for completing the configuration:

    ```
    Next Steps :
     1. Log in to WAS. Browse to Applications
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

**Parent topic:**[Enabling and securing Redis traffic to Homepage](../install/cp_config_om_redis_traffic.md)

