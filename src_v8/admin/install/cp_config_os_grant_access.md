# Granting access to global OpenSearch Metrics {#cp_config_es_grant_access .task}

Configure the `metrics-report-run` security role to grant users the authority to view and interact with global metrics.

Only users who are assigned to the `metrics-report-run` role can access global metrics.

1.  On the Deployment Manager, log in to the Integrated Solutions Console as the WebSphere® administrator.

2.  In the navigation tree, click **Applications** \> **Application Types** \> **WebSphere enterprise applications** \> **MetricsUI** \> **Security role to user/group mapping**.

3.  In the roles table, select the check box next to the **metrics-report-run** role.

4.  Still in the table, click **Map Users** or **Map Groups**.

    Use **Map Users** to add individual users to the role; use **Map Groups** to add user groups to the role.

5.  Add one or more users or groups to the `metrics-report-run role`.

6.  Click **OK**.

7.  In the navigation tree, click **Applications** \> **WebSphere enterprise applications** \> **Common** \> **Security role to user/group mapping**.

8.  In the roles table, select the check box next to the **metrics-report-run** role.

9.  Still in the table, click **Map Users** or **Map Groups**.

10. Add the users or groups that are mapped to the metrics-report-run role of the MetricsUI app \(step 5\).

11. Click **OK**.

12. Save the change to the master configuration by clicking the **Save** link in the "Messages" box at the beginning of the page.

13. Synchronize all nodes in the cell to the Deployment Manager, and then restart the node agents:

    1.  On the navigation tree, click **System Administration** \> **Nodes**.

    2.  Select all nodes and click the **Full Resynchronize** button in the table.

    3.  Return to the navigation tree and click **System Administration** \> **Node agents**.

    4.  In the nodes table, click the box in front of each node.

    5.  Click the **Restart** button in the table.


**Parent topic:**[Configuring the OpenSearch Metrics component](../install/cp_config_os_intro.md)

