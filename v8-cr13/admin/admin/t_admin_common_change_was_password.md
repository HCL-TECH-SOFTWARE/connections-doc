# Changing the WebSphere Application Server administrative user ID password {#t_admin_common_change_was_password .task}

Update the password for the administrative user ID used to configure HCL Connections on WebSphere® Application Server.

This procedure is optional .

1.  For information about Administrative user password settings, see the [IBM WebSphere Application Server documentation](https://www.ibm.com/docs/was/8.5.5).

2.  WebSphere Application Server Deployment Manager user ID only: Synchronize the nodes of the cluster to propagate the change.

3.  If the administrative user ID is used in any of the J2C authentication aliases, you must update the password that is associated with the alias. In the WebSphere Application Server administration console, select **Security** \> **Global security**.

4.  In the Authentication area, expand **Java Authentication and Authorization Service**, and click **J2C authentication data**.

5.  Click the alias name to edit it, and then change the value in the **Password** field.

6.  Apply and save the changes.

7.  Restart the servers that host HCL Connections.


**Parent topic:**[Managing stored credentials](../admin/c_admin_common_change_passwords.md)

