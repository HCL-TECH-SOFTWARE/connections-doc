# Changing the password for the mail administrative user {#t_admin_common_change_admin_mail_password .task}

If mail is configured to be sent from a dedicated mail server that requires authentication and you must update the credentials associated with it, you can change the password associated with mail.

This is an optional procedure.

1.  Log into the IBM® websphere Application Server Integrated Solutions Console, and then click **Resources** \> **Mail** \> **Mail Sessions**.

2.  Select **Cell scope**, and then click the session with the mail/notification JNDI name.

3.  In the Outgoing Mail Properties section, change the value in the **Password** field, verify the changed password, and then apply and save your changes.

4.  Restart the servers hosting HCL Connections.


**Parent topic:**[Managing stored credentials](../admin/c_admin_common_change_passwords.md)

