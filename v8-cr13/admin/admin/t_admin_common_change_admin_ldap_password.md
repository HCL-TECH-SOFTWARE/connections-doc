# Changing administrative credentials for the LDAP global unique ID {#t_admin_common_change_admin_ldap_password .task}

When you change the credentials of the administrative user ID that serves as the global unique ID for HCL Connections, you must also update the federated repository configuration for HCL Connections.

This is an optional procedure.

1.  In the WebSphere® Application Server administration console, expand **Security**, and then select **Global security**.

2.  Under User account repository, make sure Federated repositories is selected from the list, and then click **Configure**.

3.  Click the repository identifier value of the LDAP directory you are using with HCL Connections.

4.  Update the **Bind ID** and **Bind password** fields to specify a temporary LDAP ID, and then apply your changes.

5.  Synchronize the change to all application server nodes, and then stop all application servers and restart them. Verify that you can still log in to the Integrated Solutions Console after the Deployment Manager restarts.

6.  Reset the actual production bind password in LDAP.

7.  Repeat Steps 2 through 5 to replace the temporary values that you specified for the Bind ID and password with the new ones.

8.  Restart the servers hosting HCL Connections.


**Parent topic:**[Managing stored credentials](../admin/c_admin_common_change_passwords.md)

