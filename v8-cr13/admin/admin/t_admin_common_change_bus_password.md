# Updating the messaging bus configuration when the connectionsAdmin user ID changes {#t_admin_common_change_bus_password .task}

If the connectionsAdmin alias is changed to use a different user ID than was previously configured, complete this procedure to ensure that applications can still communicate event information to the news service.

1.  In the WebSphere® Application Server administration console, select **Service Integration** \> **Buses** \> **ConnectionsBus**.

2.  Under **Additional Properties**, click **Security**.

3.  Under **Authorization Policy**, click **Users and groups in bus connector role**.

4.  Select the check box next to the existing entry of type **User** that contains the old user ID, and then click **Delete**.

5.  Click **New**, and then follow the wizard instructions to add the new user ID defined for the connectionsAdmin alias.

6.  Click **OK**, save the changes, and then restart the Connections environment..

7.  From **Service Integration** \> **Buses** \> **ConnectionsBus**, click **Destinations**.

8.  From the list of destinations, click **connections.events**.

9.  In the **Message Points** section, click **Publication Points**.

10. For each entry in the list, click the name of the publication point, for example: connections.events@LCCluster1.000-ConnectionsBus

11. Click the **Runtime** tab.

12. Under **Additional Properties**, click **Subscriptions**.

13. Select the check box against each subscription, so that they are all selected, and then click **Delete**.

14. Repeat steps 11-14 for each publication point for the connections.events destination. There will be one publication point for each cluster in your deployment.

15. Repeat steps 9-15 for the **connections.platformCommands** destination.

16. Restart all applications.


**Parent topic:**[Managing stored credentials](../admin/c_admin_common_change_passwords.md)

**Related information**  


[Changing references to administrative credentials](../admin/t_admin_common_changing_admin_passwords.md)

