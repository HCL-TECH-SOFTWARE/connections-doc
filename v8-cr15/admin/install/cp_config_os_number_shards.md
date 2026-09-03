# Changing the number of shards for the OpenSearch Metrics index 

If your environment requires, you can change the default number of shards that will be assigned to the OpenSearch Metrics index when it is created.

If you migrate data from an old metrics database or when you deploy the OpenSearch Metrics component to users, events in Connections will trigger the creation of an OpenSearch index for Metrics. The default number of shards for this index is five. If you want to change this default, you should do so before the index is created, as the new value applies only to future indices. Changing the number of shards after the Metrics component is already deployed requires that the index be recreated.

**Important:** Because additional shards in an OpenSearch index consume resources and can affect performance depending on how the shards are used, change this default only when you have carefully weighed the advantages and disadvantages of doing so in your environment.

1.  Modify LotusConnections-config.xml \(in the DMGR folder\) by adding the following generic property, changing 5 to the number of shards that you need:

    ```
    <genericProperty name="com.ibm.lconn.metrics.numShardsPerIndex">number of shards</genericProperty>
    ```

2.  Synchronize the nodes.


To use the new shard number when the index is created, the MetricsEventCapture app \(already running on WebSphere Application Server\) will need to be restarted. You can restart MetricsEventsCapture as part of your next task for configuring OpenSearch metrics: [Enabling OpenSearch Metrics to connect to a Component Pack server](../install/cp_config_os_connect_to_cp_server.md).

**Parent topic:** [Configuring the OpenSearch Metrics component](../install/cp_config_os_intro.md)

