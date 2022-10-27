# Changing references to administrative credentials {#t_admin_common_changing_admin_passwords .task}

Update the aliases that reference the administrative user IDs and passwords that are used to handle server-to-server communication.

This task is optional.

1.  To update the aliases that manage server-to-server communication, you must edit the associated J2C authentication data for the alias. In the WebSphere® Application Server administration console, select **Security** \> **Global security**.

2.  In the Authentication area, expand **Java Authentication and Authorization Service**, and click **J2C authentication data**.

3.  Click the **connectionsAdmin** alias to edit it.

    You defined the current user ID and password to use for the connectionsAdmin alias during the installation. The user ID and password must be one of the following values:

    -   A valid user in the organization's LDAP service. Organizational security requirements might require you to change this password periodically, in which case the stored credentials must be updated to reflect the new password.
    -   A user that is defined in the WebSphere Identity Manager.
4.  Update the values that changed.

5.  Apply and save the changes.

6.  Restart the servers that host HCL Connections.

7.  If you changed the administrative user, update the mappings for the admin, dsx-admin, search-admin, trustedExternalApplication, and widget-admin Java EE roles. For more information, see *Switching to unique administrator IDs for system level communication*.

8.  Perform some additional steps to update the messaging bus configuration, which also relies on the connectionsAdmin alias. See *Updating the messaging bus configuration when the connectionsAdmin user ID changes* for more details.


**Parent topic:**[Managing stored credentials](../admin/c_admin_common_change_passwords.md)

**Related information**  


[Configuring J2C authentication for Search](../admin/t_search_configure_j2c.md)

[Updating the messaging bus configuration when the connectionsAdmin user ID changes](../admin/t_admin_common_change_bus_password.md)

[Switching to unique administrator IDs for system level communication](../admin/t_admin_common_add_j2c_auth.md)

[Enabling SPNEGO single sign-on for SiteMinder](../secure/t_secure_with_siteminder_SPNEGO.md)

