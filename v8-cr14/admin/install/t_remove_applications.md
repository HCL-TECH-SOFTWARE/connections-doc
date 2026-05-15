# Removing applications {#remove_applications .task}

Remove selected applications from HCL Connections.

If you no longer need to keep certain applications, you can remove them from your deployment. You cannot remove core applications such as Home page, News, and Search.

To remove selected applications from HCL Connections, complete the following steps:

1.  Start the WebSphere® Application Server Deployment Manager.

2.  Stop all instances of WebSphere Application Server, including node agents, in your deployment.

3.  To uninstall a component of connections, start the IBM Installation Manager and click **Modify**.

4.  Select **HCL Connections** and click **Next**.

5.  Clear the check boxes of the applications that you want to remove and then click **Next**.

6.  Enter the details of your WebSphere Application Server environment and then click **Next**.

7.  In the Summary page, verify that the details are correct.

8.  Click **Modify** to begin removing applications.

9.  When the process is complete, restart the Deployment Manager.

10. Restart all instances of WebSphere Application Server, including node agents.

11. Synchronize the nodes.

12. To check the details of the procedure, open the log file named Uninstall.log in the [connections\_root](../plan/i_ovr_r_directory_conventions.md)/logs directory.


You removed selected HCL Connections applications.

**Parent topic:**[Uninstalling](../install/t_uninstall_over.md)

**Related information**  


[Disabling applications](../admin/t_admin_common_turning_off.md)

