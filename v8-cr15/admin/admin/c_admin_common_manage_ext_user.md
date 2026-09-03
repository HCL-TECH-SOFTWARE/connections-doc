# Managing external user access {#c_admin_common_manage_ext_user .concept}

Manage the access that people from outside your organization \(external users\) have to your HCL Connections implementation.

!!! note 
    
    If internal users and external users access IBM® Connections through the same caching proxy server, then you must disable the public cache to avoid serving public content to external users. To disable public cache, edit LotusConnections-config.xml and add: `"<genericProperty name="publicCacheEnabled">false</genericProperty>"`.

!!! note

    If you are using HCL Connections 5.0 CR2 and you want to give external users access to Connections Content Manager \(CCM\) libraries, you must run the migrateAuthUsers script during migration. This script is in the same location as the other scripts for the ccmDomainTool automation tool in the connections\_root/addons/ccm/ccmDomainTool directory. Run the correct script for your operating system:

    -   Windows systems: `migrateAuthUsers.bat`
    -   Linux and UNIX systems: `./migrateAuthUsers.sh`

Note that this script affects only access to libraries and teamspaces created using IBM Connections, not linked libraries created using IBM FileNet.

After this migration step is complete, you can add the Library widget to communities that are shared with external users.

Releases earlier than CR2 do not support external access to CCM libraries. For these releases, if you are using CCM in your deployment and external user access is enabled, you must block the URL to FileNet® Collaboration Services \(by default /dm/\*\) and the FileNet Content Engine \(/FileNet/\*\). The FileNet Content Engine does not need to be directly accessed outside of your deployment, so /FileNet can be blocked for all users, not just external users. You can block external users in the following ways:

-   Setting rules in a Security proxy such as IBM Security Verify Access (formerly Security Access Manager).
-   Giving external users access only to a separate HTTP server that lacks a mapping to the Library or FileNet Collaboration Services \(/dm/\*\) . The two HTTP servers can be registered with the same name in different networks; external users see the same host name, but this host uses a different DNS entry and therefore a different HTTP server.
-   In WebSphere®, limit the members of the Authenticated and Anonymous Java Platform, Enterprise Edition Security roles on the FNCS application, ensuring the FileNet Content Engine is not mapped to an HTTP server. Also, ensure that your WebSphere server ports are not directly accessible to users.

Using a registered external user account, test your block by browsing to your FileNet Collaboration Services URL \(for example, http://example.com/dm/\) from the network that is used by your external users. This network that is used for this test can be a VPN for your visitors or just the public internet. If the server returns a valid response when accessed from the network that is used by your external users, you did not correctly block visitors from accessing CCM. For more information on restricting access to FileNet Collaboration Services, see *Roles*.

**Restrictions**
Before you enable external users, consider whether your IBM Connections users use the IBM Connections Desktop Plug-ins for Microsoft™ Windows™. Support for external users is limited in the desktop plug-ins. Note the following restrictions when using IBM Connections Desktop Plug-ins for Microsoft Windows

-   There are no indicators or warnings to inform users that content they access from Connections and add from their desktop might be visible to external users.
-   External users are not flagged as external.
-   There is no ability to control external sharing when creating content.
-   Some operations might result in unexpected errors.

Complete these tasks to enable external user access:

-   Disabling anonymous access for all Connections users

    !!! note 
        
        If external users are not forced to authenticate through a mechanism such as Security Verify Access, then you must disable anonymous access for all Connections users. Perform the steps in *Forcing users to log in before they can access an application*. If anonymous access is enabled and external users are allowed to access your HCL Connections implementation, then external users might anonymously access all public data in HCL Connections. This access includes profiles and public files and communities that were not intended to be shared externally.

The following additional topics provide information about managing external user access:

-   **[Configuring self-registration for external users](../admin/t_install_config_self-registration_for_external_users.md)**  
Set properties that make it possible for people outside of your company to self-register for a Connections account when invited to join.
-   **[Registering external users with Profiles](../admin/t_admin_profiles_external_user_script.md)**  
Ensure that external users are recognized by populating them in the Profiles database via IBM Tivoli® Directory Integrator.
-   **[Setting user roles for external collaboration](../admin/t_admin_profiles_set_roles.md)**  
Assign the EMPLOYEE\_EXTENDED role to internal users who are allowed to create content that is visible to external users.

**Parent topic:** [Administering common areas](../admin/c_admin_act_wsadmin.md)

**Related information**  


[Forcing users to log in before they can access an application](../secure/t_admin_common_force_authentication.md)

[Roles](../admin/r_admin_common_user_roles.md)

[Groups](../admin/c_admin_common_groups.md)

