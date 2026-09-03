# Mapping an Active Directory account to administrative roles {#t_install_kerb_create_service_account .task}

Map an account from Active Directory to administrative roles in IBM® WebSphere® Application Server.

This task is not required if you do not use Microsoft™ Active Directory.

Ensure that you have configured HCL Connections™ to use Active Directory as the user directory. For more information, refer to [Setting up federated repositories](../install/t_inst_federated_repositories.md).

Ensure that you have configured WebSphere Application Server to use the Kerberos and LTPA authentication option. For more information, refer to [Configuring SPNEGO and Kerberos \(optionally\) on WebSphere Application Server](t_install_kerb_add_spnego_tai_to_was.md).

Select an Active Directory account to map to administrative roles in IBM WebSphere Application Server.

!!! note 
    Do not use the same Active Directory account for the following roles:

        -   The bind account configured under LDAP configuration in WAS.
        -   The application account
        -   The SPN account for SPNEGO setup
        -   The Window service account to start WAS

For example, if the bind user is locked out, then no users can log into the application. If the SPN account is locked or the password has been changed, then it will affect the entire sso configuration \(SPNEGO\).

After enabling Kerberos and LTPA authentication in WebSphere Application Server, the default file-based repository no longer works and you can no longer log in to the WebSphere Application Server Integrated Solution Console using the wasadmin account. Any services that require authentication and that use the wasadmin ID no longer work. Consequently, some functions in Connections fail, including search indexing, notifications, and adding widgets.

To prevent such problems, you must map an account in Active Directory to the Connections administrative roles in IBM WebSphere Application Server.

To map the Active Directory account, complete the following steps:

1.  Map an Active Directory account to administrative roles:

    1.  Log in to the WebSphere Application Server Integrated Solution Console on the Deployment Manager.
    2.  Click **Users and groups** \> **Administrative user roles** \> **Add** and select **Admin Security Manager**.
    3.  Enter the Active Directory account name in the **Search string** field and click **Search**.
    4.  Select the account name in the **Available** column and click to add the account name to the **Mapped to role** column.
    5.  Click **OK**.
    6.  Click **Add** and select **Administrator**.
    7.  Enter the Active Directory account name in the **Search string** field and click **Search**.
    8.  Select the account name in the **Available** column and click to add the account name to the **Mapped to role** column.
    9.  Click **OK**.
    10. Click **Save**.
2.  Change J2C authentication:

    1.  Click **Security** \> **Bus security** \> **ConnectionsBus**.
    2.  Under Additional Properties, click **Security** \> **Users and groups in the bus connector role** \> **New**.
    3.  In the SIB Security Resource Wizard window, click **Users**, enter the Active Directory account in the **Search pattern** field, and click **Next**.
    4.  Select the check box for the account name and click **Next**.
    5.  If you are satisfied with the summary information, click **Finish**.

        !!! note 
            
            If you subsequently change the password for the Active Directory account that you map in this step, you must also change the password for the ConnectionsAdmin J2C alias.

3.  Update the messaging bus configuration. Complete the steps in the [Updating the messaging bus configuration when the connectionsAdmin user ID changes](../admin/t_admin_common_change_bus_password.md) topic.

4.  For each application, update the mapping for the dsx-admin, search-admin, and widget-admin Java EE roles, replacing the currently mapped user with the Activity Directory account. Go to the [Switching to unique administrator IDs for system level communication](../admin/t_admin_common_add_j2c_auth.md) topic and complete Step 3.

5.  Modify the runtime user for the Search application:

    1.  Click **Applications** \> **Application Types** \> **WebSphere enterprise applications** \> **Search**.
    2.  Under **Details Properties**, click **User RunAs Roles**.
    3.  Select the **Admin** option.
    4.  Enter the new user name and password.
    5.  Click **Apply**.

        !!! note 
            
            If you subsequently change the password for the Active Directory account that you map in this step, you must also change the password for the ConnectionsAdmin J2C alias.

6.  \(Only required if you use Windows™ services for starting or stopping Connections\) Edit your Windows services to use your Active Directory account instead of wasadmin to start and stop Connections.


**Parent topic:** [Enabling single sign-on for the Windows desktop](../secure/t_install_kerb_setup_spnego.md)

**Next topic:** [Creating a service principal name and keytab file](../secure/t_install_kerb_create_service_account.md)

