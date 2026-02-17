# Enabling single sign-on for standalone LDAP 

HCL Connections™ requires a federated repositories configuration, but you can enable Connections applications to perform Single sign-on for a standalone LDAP directory.

This procedure is required if you want to enable Single sign-on \(SSO\) between Connections and an application hosted by a version of WebSphere® Application Server that is earlier than 6.1, which is the version in which federated repositories were introduced.

Before you perform this procedure, you must configure federated repositories on Connections.

By default, applications deployed on servers within the same WebSphere Application Server cell are enabled for single-sign-on. To support this, the servers share the same set of LTPA keys and the same LDAP directory configuration. Use this configuration if you want to set up SSO between applications that use different LDAP directory configurations.

To enable SSO between Connections and a WebSphere Application Server configured for standalone LDAP, complete the following steps:

1.  Log in to the WebSphere Application Server Integrated Solutions Console by going to the following web address in a browser:

    ```
    http://<web.server.host.name>:9060/ibm/console
    
    ```

2.  Log in to the Welcome page.

3.  Click **Security** \> **Global security**.

4.  Select **Federated Repositories** from the Available realm definitions field, and then click **Configure**.

5.  On the Federated repositories page, add the `<host_name>:<port>` of the standalone LDAP server to the **Realm name** field.

    For example:

    ```
    ldap.example.com:389
    ```

6.  Click **Apply** and then click **Save** to save this setting.

7.  After changing the realm name, you must update the administrative user roles because the previous realm name is still appended to the administrative users. Until you remove and re-add the administrative users, the users are unable to access the Integrated Solutions Console.

    1.  Navigate to **Users and Groups** \> **Administrative User Roles**.

    2.  Select all user roles and click **Remove**.

    3.  Click **Add**.

    4.  In the Roles field, click **Administrator**.

    5.  In the **User** field, enter the user name to which you want to grant administrative privileges.

    6.  In the **Search string** field, enter a user name that you want to set as an administrator and then click **Search**. Select the user name in the **Available** list and click to move it to the **Mapped to role** field.

    7.  To map other users, repeat the previous step.

    8.  Click **OK** and then click **Save**.

    !!! note 
        
        If there is only one user, you might not be allowed to remove the user. In that case, add the new user first and then remove the original user.

8.  Synchronize the nodes and then restart the servers:

    1.  Log into the Integrated Solutions Console for the Deployment Manager.

    2.  Expand **System administration** \> **Nodes**. Select the name of the node that you updated and click **Full Resynchronize**.

    3.  Select **Servers** \> **Clusters**. Select the check box for the cluster you want to restart and click **Stop**.

    4.  Select **System administration** \> **Node agents**. Select the check boxes for the nodes that you want to restart and click **Restart**.

    5.  Stop and restart the Deployment Manager.

    6.  Log into the Integrated Solutions Console again.

    7.  Select **Servers** \> **Clusters**. Select the check box the cluster you want to restart and click **Start**.


**Parent topic:** [Configuring single sign-on](../secure/c_sec_config_sso.md)
