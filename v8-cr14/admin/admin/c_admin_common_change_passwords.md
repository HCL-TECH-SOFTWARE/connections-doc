# Managing stored credentials {#c_admin_common_change_passwords .concept}

HCL Connections does not create nor store user names and passwords. Instead, it uses the user credentials that already exist in your LDAP directory for authentication. HCL Connections does not store administrative user IDs and passwords either. It does, however, create and store references to existing administrative user credentials. You can make changes to those references.

## User credentials { .section}

To change a user's password, you must change the password in the LDAP directory that you are using to store user data. HCL Connections does not provide a method that administrators can use to change user credentials. Use the methods in place in your organization for changing user credentials. Alternatively, you can refer to the documentation provided with the LDAP directory that you are using.

## Administrative credentials { .section}

When you install HCL Connections, it creates a set of references to the administrative user credentials it needs to access other tools and services to configure HCL Connections. Refer to the following topics for information on how to update these references.

Refer to the following topics for information on how to update these references.

-   **[Changing the WebSphere Application Server administrative user ID password](../admin/t_admin_common_change_was_password.md)**  
Update the password for the administrative user ID used to configure HCL Connections on WebSphere® Application Server.
-   **[Changing references to database administrative credentials](../admin/t_admin_common_change_admin_db_password.md)**  
Update the aliases that reference the administrative user IDs and passwords used to manage HCL Connections databases.
-   **[Changing references to administrative credentials](../admin/t_admin_common_changing_admin_passwords.md)**  
Update the aliases that reference the administrative user IDs and passwords that are used to handle server-to-server communication.
-   **[Switching to unique administrator IDs for system level communication](../admin/t_admin_common_add_j2c_auth.md)**  
Create extra J2C authentication aliases and remap the roles.
-   **[Updating the messaging bus configuration when the connectionsAdmin user ID changes](../admin/t_admin_common_change_bus_password.md)**  
If the connectionsAdmin alias is changed to use a different user ID than was previously configured, complete this procedure to ensure that applications can still communicate event information to the news service.
-   **[Changing administrative credentials for the LDAP global unique ID](../admin/t_admin_common_change_admin_ldap_password.md)**  
When you change the credentials of the administrative user ID that serves as the global unique ID for HCL Connections, you must also update the federated repository configuration for HCL Connections.
-   **[Changing the password for the mail administrative user](../admin/t_admin_common_change_admin_mail_password.md)**  
If mail is configured to be sent from a dedicated mail server that requires authentication and you must update the credentials associated with it, you can change the password associated with mail.

**Parent topic:** [Managing access](../admin/c_admin_common_managing_access.md)

