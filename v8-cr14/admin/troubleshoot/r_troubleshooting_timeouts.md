# Troubleshooting connection timeouts when running a wsadmin script {#troubleshootingconnectiontimeoutswhenrunningawsadminscript .reference}

Running a wsadmin administrative script that calls an MBean in a network deployment environment results in several connections between sever processes, such as the deployment manager, the node agent, and the cluster member using Java™ Management Extensions \(JMX\) connectors. Some HCL Connections™ administrative scripts can run for longer than the default connection timeout that is specified for the connector that is used.

## Troubleshooting timeouts { .section}

This results in messages like the following: `WASX7017E: Exception received while running file "/install_root/ProcessChoreographer/admin/script_name"; exception information: javax.management.JMRuntimeException: ADMN0034E: The service is unable to obtain a valid administrative client to connect process "nodeagent" from process "dmgr", because of exception: com.ibm.websphere.management.exception.ConnectorException: ADMC0009E: The system failed to make the SOAP RPC call: invoke.`

## Reasoning { .section}

Some HCL Connections administrative scripts can perform database operations on large numbers of database objects. This means that they can run for longer than the default connection timeout. When a wsadmin script is run with a connection to the server, the following connection timeouts can happen:

-   For the call from the wsadmin environment to the deployment manager. The default for is 180 seconds.
-   For the connection from the deployment manager to the node agent. The default is 600 seconds.
-   For the connection from the node agent to the runtime deployment target. The default is 600 seconds.

## Resolution { .section}

You have the following options:

-   Modify the invocation parameters so that less work is performed, so that the operation completes before the timeout. For example, many scripts have parameters that can be used to select fewer objects.
-   Modify the properties for the connector that is used.

    Remote JMX connector

    -   This connector is used between server processes that reside on different physical machines, for example, between the deployment manager and the node agent. The default is the SOAP connector.
    Local JMX connector

    -   This connector is used between server processes that reside on the same physical machine, for example, between the node agent and its application servers. The default is the IPC connector.
    You must modify the properties in the soap.client.props file, ipc.client.props, or sas.client.prop files, and the custom properties for the deployment manager and the node agents where members of your runtime deployment target are running.

    The following example shows how to change the SOAP connector properties.

    1.  Modify the com.ibm.SOAP.requestTimeout property by editing the soap.client.props file that is located in the properties subdirectory of the profile\_root directory.
    2.  Change the requestTimeout custom property using the administrative console:
        1.  For servers or cluster members, click ******Servers** \> **Application servers** \> **server\_name** \> **Server Infrastructure** \> **Administration** \> **Administration Services** \> **Additional properties** \> **JMX Connectors** \> **SOAPConnector** \> **Additional Properties** \> **Custom properties**. Then locate the requestTimeout custom property, and modify its value.
        2.  For the deployment manager, click **System administration** \> **Deployment manager** \> **Additional Properties** \> **Administration Services** \> **Additional properties** \> **JMX Connectors** \> **SOAPConnector** \> **Additional Properties** \> **Custom properties**. Then locate the requestTimeout custom property, and modify its value.
        3.  For the node agents, click **System administration****Node agents****node\_agent\_name****Additional Properties****Administration Services****Additional properties****JMX Connectors****SOAPConnector****Additional Properties****Custom properties**. Then locate the requestTimeout custom property, and modify its value.

**Parent topic:**[Troubleshooting tips](../troubleshoot/ts_c_ts_tips_overview.md)

