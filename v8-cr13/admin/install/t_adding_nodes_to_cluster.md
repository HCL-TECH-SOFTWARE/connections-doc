# Adding a node to a cluster {#addingnodestoacluster .task}

Add a node to an existing cluster.

You must already have a cluster with at least one member.

Ensure that you installed IBM® WebSphere® Application Server Network Deployment \(Application Server option\) on the new node.

To add a node to a cluster, complete the following steps:

1.  Add a node to the DM cell:

    1.  Log on to the new node.

    2.  Open a command prompt and change to the bin directory of the local WebSphere Application Server profile:

        [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/profile\_name/bin

        where profile\_name is the name of the applicable WebSphere Application Server profile on this node.

    3.  Run the addNode command to add this node to the DM cell: .

        addnode \[dmgr\_host\] \[dmgr\_port\] \[-username uid\] \[-password pwd\] \[-localusername localuid\] \[-localpassword localpwd\]

        where

        -   dmgr\_host is the host name of the Deployment Manager
        -   dmgr\_port is the SOAP port of the deployment manager \(the default is 8879\)
        -   uid and pwd are the DM administrator user name and password
        -   localuid and localpwd are the user name and password for the WebSphere Application Server administrator of the node
    4.  Open the addNode.log file and confirm that the node was successfully added to the DM cell. The file is stored in the following location:

        [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/profile\_name/log/addNode.log

2.  Copy the relevant JDBC files from the DM node to this node, placing them in the same location as the JDBC files on the DM. If, for example, you copied the db2jcc.jar file from the C:\\IBM\\SQLLIB directory on the DM, you must copy the same file to the C:\\IBM\\SQLLIBdirectory on this node. See the following table to determine which files to copy. See the following table to determine which files to copy:

    |Database type|JDBC files|
    |-------------|----------|
    |DB2®|db2jcc.jar

db2jcc\_license\_cu.jar sql

|
    |Oracle|ojdbc6.jar

|
    |SQL Server|sqljdbc42.jar

|

3.  Ensure that the shared folders that are used for the application content stores in the cluster are accessible from the new node: from the new node, try to access the shared directories.

4.  Add additional members to an existing HCL Connections cluster:

    1.  Log on to the Deployment Manager Integration Solutions Console.

    2.  Click **Servers** \> **Clusters** \> **cluster\_name** \> **Cluster members** \> **New**. Specify the following information about the new cluster member:

        Member name
        :   The name of the server instance that is created for the cluster. The DM creates a server instance with this name.

            **Note:** Each member name in the same cluster must be unique. The Integration Solutions Console prevents you from reusing the same member name in a cluster.

        Select node
        :   The node where the server instance is located.

        Click **Add Member** to add this member to the cluster member list.

    3.  Click **Next** to go to the summary page where you can examine detailed information about this cluster member. Click **Finish** to complete this step or click **Previous** to modify the settings.

    4.  Click **Save** to save the configuration.

    5.  Click **Server** \> **Servers** \> **Clusters** \> **cluster\_name** \> **Cluster members**. In the member list, click the new member that you added in the previous step.

    6.  On the detailed configuration page, click **Ports** to expand the port information of the member. Make a note of the WC\_defaulthost and WC\_defaulthost\_secure port numbers. For example, the WC\_defaulthost port number is typically 9084, while the WC\_defaulthost\_secure port number is typically 9447.

    7.  Click **Environment** \> **Virtual Hosts** \> **default\_host** \> **Host Aliases** \> **New**. Enter the following information for the host alias for the WC\_defaulthost port:

        Host name
        :   The IP address or DNS host name of the node where the new member is located.

        Port:
        :   The port number for **WC\_defaulthost**. For example, 9084.

        Click **OK** to complete the virtual host configuration.

    8.  Click **Save** to save the configuration.

    9.  Repeat the previous two sub-steps to add the host alias for the **WC\_defaulthost\_secure** port.

    10. Click **System administration** \> **Nodes**.

    11. In the node list page, select all the nodes where the target cluster members are located and then click **Synchronize**.

5.  Review the configuration of the application server added to the cluster.

    JVM settings need to be adapted to equal the other existing application servers in the cluster. Refer to [Reviewing the JVM heap size](t_increase_jvm_heap.md). Other configuration settings to consider reviewing include **webcontainer** threads and **session timeouts** settings.

    **Note:** Custom properties set on the existing application servers need to be reapplied to any new node and server post-installation. Find these properties in **WAS** \> **Application server** \> **\[server name\]** \> **Session management** \> **Custom properties**.

6.  Enable the Startup beans service at server startup. Open the WebSphere Integrated Solutions Console.

    1.  Click **Servers** \> **Server types** \> **WebSphere Application Servers** \> **server\_name**.

    2.  In Container Settings, expand **Container Services**. Then click **Startup beans service**.

    3.  In General Properties, check the box next to **Enable Service at server startup**.

    4.  Click **OK**.

    5.  Restart the server.

    For more information, see [Startup beans service settings](https://www.ibm.com/support/knowledgecenter/SSEQTJ_8.5.5/com.ibm.websphere.base.doc/webui_pme/ui/ueac_startupbeans.html).

7.  Configure IBM HTTP Server to connect to this node. For more information, see the *Configuring IBM HTTP Server* and *Defining IBM HTTP Server* topics.

8.  Repeat this procedure for each new node that you want to add to a cluster.

9.  Perform the additional steps in [Making search-related configuration changes to newly added nodes](../admin/t_admin_search_add_search_node.md) to add the Search application to a new node.


If you experience interoperability failure, you might be running two servers on the same host with the same name. This problem can cause the Search and News applications to fail. For more information, see [Application access problems](https://www.ibm.com/support/knowledgecenter/en/SSAW57_8.5.5/com.ibm.websphere.nd.doc/ae/rtrb_namingprobs.html) in the WebSphere Application Server Network Deployment product documentation, and select *NameNotFoundException from JNDI lookup operation*.

**Parent topic:**[Optional post-installation tasks](../install/c_optional_post-install_tasks.md)

**Related information**  


[Making search-related configuration changes to newly added nodes](../admin/t_admin_search_add_search_node.md)

