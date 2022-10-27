# Changing connectionsAdmin to be an LDAP user {#t_inst_changing_connections_adminto_be_ldap_user .task}

For an existing installation of HCL Connections with IBM® FileNet®, the `connectionsAdmin` user defined in your FileNet system must be available in the directory configuration of both FileNet and Connections. The easiest way to accomplish this is to change to the connections Admin user to be an LDAP user in a common directory. This procedure assumes that the connectionsAdmin user in Search and Communities \(and all other applications\) is already an LDAP user.

Change an existing LDAP user to be connectionsAdmin so that both Connections and FileNet can use that LDAP User. This method avoids having to change all the credentials and SIB Bus information. Perform the following steps:

1.  Update the aliases that reference the administrative user IDs and passwords that are used to handle server-to-server communication. Carry out the steps in [Changing references to administrative credentials](../admin/t_admin_common_changing_admin_passwords.md).

2.  Create extra J2C authentication aliases and remap roles. Carry out the steps in [Switching to unique administrator IDs for system level communication](../admin/t_admin_common_add_j2c_auth.md).

3.  Prove the SSO connection still works.

    1.  Open a browser session to FileNet, authenticate, and then in same browser window change the url to Communities. You should be logged in as the same user.

    2.  Open a browser session to: <fileNetHostName\>:<fileNetPort\>/dm.

        **Note:** The default HTTP port in FileNet is commonly set to 80 or 9080.

    3.  Log in with the `connectionsAdmin` user you previously added.

    4.  Change the url to: http://<connectionsHostName\>/communities

        When the page loads you should be logged in as the same user you just logged in on FileNet. You should not be prompted for credentials.


**Related information**  


[Changing references to administrative credentials](../admin/t_admin_common_changing_admin_passwords.md)

[Switching to unique administrator IDs for system level communication](../admin/t_admin_common_add_j2c_auth.md)

