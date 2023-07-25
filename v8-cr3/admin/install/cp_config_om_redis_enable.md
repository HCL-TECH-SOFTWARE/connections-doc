# Manually configuring Redis traffic to Orient Me {#cp_config_om_redis_enable .concept}

Configure Redis traffic between the HCL Connections™ applications and the Orient Me home page.

## Do you need to configure Redis? { .section}

By default, Redis is configured automatically as part of the [bootstrap installation](cp_install_bootstrap.md) task. You can confirm this by checking the bootstrap pod logs with the following steps:

1.  Determine the bootstrap pod name by running the following command:

    ```
    kubectl get pods -n connections | grep bootstrap
    ```

    The response should look like the following example:

    \[root@master ~\]\# kubectl get pods -n connections \| grep bootstrap bootstrap-1abcd 0/1 Completed 0 1d

2.  Check the bootstrap pod logs by running the following command:

    ```
    kubectl logs bootstrap-1abcd -n connections
    ```

    If redis is configured successfully, you will see the following message in the logs:

    Successfully configured redis

    If redis was not configured, or if redis failed to configure with the following error, continue with the steps on this page to configure redis manually:

    Unable to reach Connections HTTP server on <http\_server\>/homepage/orgadmin/adminapi.jsp. Please make sure host is correct and Connections is running.Alternatively you can configure redis manually using the steps in the documentation.


## Running the configuration script { .section}

Run the redis configuration script and then restart dependent applications to ensure that changes take effect.

1.  On the Kubernetes master node, run the configuration script with the following command, including the parameters described in Table 1.

    ```
    sudo bash https://github.com/HCL-TECH-SOFTWARE/connections-automation/roles/hcl/component-pack-harbor/files/redis/configureRedis.sh parameters
    ```

    |Parameter|Description|
    |---------|-----------|
    |`-m`|The host name or IP address of the Kubernetes master server. This should be the master virtual IP in an HA environment.|
    |`-po`|The external port that haproxy-redis is running on. The default port is 30379.|
    |`-ic`|The host name and HTTP protocol used to access Connections in the browser. You must specify `http://` or `https://` or the script will not run.|
    |`-ic_u`|Required. The user name of the Connections Administrator account, which is also the WebSphere Application Server administrator account.|
    |`-ic_p`|Required. The password for the Connections Administrator account, which is also the WebSphere Application Server administrator account.|
    |`-pw`|The password for the Redis secret. This value must match the `env.set_redis_secret` setting that was used during the [bootstrap installation](cp_install_bootstrap.md).|

    Example:

    ```
    sudo bash configureRedis.sh -m 1.2.3.4 -po 30379 -ic https://ic-http-server.domain.com -pw Your\_Redis\_Password -ic_u wasadmin -ic_p password
    ```

    When the script finishes running, a confirmation message displays: Clean exit.

2.  Restart the dependent applications by completing the following steps:
    1.  Browse to the WebSphere® Integrated Solutions Console and log in.

        For example: https://your\_Connections\_URL:9043/ibm/console

    2.  Click **Applications** \> **All Applications**.
    3.  Stop and restart the Common application.
    4.  Stop and restart the News application.

## Alternative configuration { .section}

If the configureRedis.sh script does not work, there is an alternative method to configure redis directly on the HCL Connections deployment's WebSphere Deployment Manager \(Linux only\):

1.  On the Connections deployment's WebSphere Deployment Manager, copy the redis folder from the extracted Component Pack installation package on the Kubernetes master node by running the following commands:

    ```
    sudo mkdir -p $HOME/redis
    cd $HOME/redis
    ```

    Download the redis files from the [Harbor repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/roles/hcl/component-pack-harbor/files/redis).

2.  On the Deployment Manager, run the configuration script with following command, including the parameters described in Table 2:

    ```
    sudo bash $HOME/redis/updateRedisJSON.sh
    -m Kubernetes\_master\_host\_or\_ip \
    -po haproxy-redis\_port \
    -pa path\_to\_update\_folder \
    -pw redis\_password
    ```

    |Parameter|Description|
    |---------|-----------|
    |`m`|The hostname or IP address of the Kubernetes master server. This should be the master virtual IP in an HA environment.|
    |`po`|The external port that haproxy-redis is running on. The default port is 30379.|
    |`pa`|The absolute path to the Update folder. Default value \(Linux®\): /opt/IC\_Share/configuration/update|
    |`pw`|Password for the Redis secret. This value must match the `env.set_redis_secret` setting that was used during the [bootstrap installation](cp_install_bootstrap.md).|

    Example:

    ```
    sudo bash updateRedisJSON.sh -m 1.2.3.4 -po 30379 -pa /opt/IC_Share/configuration/update -pw yourredispassword
    ```

    When the script finishes running, a confirmation message displays with a list of the steps for completing the configuration:

    Clean exit

    ```
    Next Steps :
     - 1. Log in to WAS. Browse to Applications
     - 2. Restart Common
     - 3. Restart News
    ```

3.  Restart the dependent applications as instructed by completing the following steps:
    1.  Browse to the WebSphere Integrated Solutions Console and log in.

        For example: https://your\_Connections\_URL:9043/ibm/console

    2.  Click **Applications** \> **All Applications**.
    3.  Stop and restart the Common application.
    4.  Stop and restart the News application.

**Parent topic:**[Enabling and securing Redis traffic to Orient Me](../install/cp_config_om_redis_traffic.md)

