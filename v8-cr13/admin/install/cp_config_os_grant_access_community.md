# Granting access to OpenSearch Metrics for communities {#cp_config_es_grant_access_community .task}

Configure the `community-metrics-run` security role to grant users the authority to view community metrics using static reports.

Only users assigned to the `community-metrics-run` role can access community metrics of the communities they own. You can map this role to everyone, or to subset of the user population. For example, you can gradually provide the community metrics feature to the user population by mapping this role to small group first, and then adding more users to the role over time.

**Note:** By default, the `community-metrics-run` role is already assigned to `All Authenticated in Application's Realm` for both the MetricsUI and Communities applications, which means that all the community owners have the authority to run the community metrics of his or her community. Therefore, if you want to assign the access only to the specific users or groups, remove the `All Authenticated in Application's Realm` from the MetricsUI and Communities applications first.

1.  On the Deployment Manager, log in to the Integrated Solutions Console as the WebSphere® administrator.

2.  In the navigation tree, click **Applications** \> **Appication Types** \> **WebSphere enterprise applications** \> **MetricsUI** \> **Security role to user/group mapping**.

3.  In the roles table, click the check box next to the **community-metrics-run** role.

4.  Still in the table, click the **Map Users** button or the **Map Groups** button.

    Use **Map Users** to add individual users to the role; user **Map Groups** to add user groups to the role.

5.  Add one or more users or groups to the **community-metrics-run** role.

6.  Click **OK**.

7.  Save the change to the master configuration by clicking the **Save** link in the "Messages" box at the beginning of the page.

8.  Add the same users or groups to the `community-metrics-run` role of Communities applications.

9.  Synchronize all nodes in the cell to the Deployment Manager, and then restart the node agents:

    1.  On the navigation tree, click **System Administration** \> **Nodes**.

    2.  Select all nodes and click the **Full Resynchronize** button in the table.

    3.  Return to the navigation tree and click **System Administration** \> **Node agents**.

    4.  In the nodes table, click the box in front of each node.

    5.  Click the **Restart** button in the table.


**Parent topic:**[Configuring the OpenSearch Metrics component](../install/cp_config_os_intro.md)

