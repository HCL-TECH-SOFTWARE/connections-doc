# Configuring external collaboration 

External collaboration allows internal and external users to work together in your HCL Connections deployment. You can either configure this feature to allow self-registration by external users who received an invitation, or you can manage registration with a custom setup tailored to your particular environment.

The external collaboration feature is enabled by default, defined in the LotusConnections-config.xml file with the visitorModelEnabled property set to `true`. To complete the configuration, you must register external users manually and then add them to the Profiles database. External users must have a special LDAP attribute and Profiles role to identify them as external. For an overview of external collaboration, see [Managing external user access](../admin/c_admin_common_manage_ext_user.md).

To configure external collaboration, complete the following steps:

1.  Determine where external users are registered in your directory. If necessary, add a new branch to your existing LDAP directory. For more information, see [Use an LDAP branch to store external users](../admin/t_admin_profiles_ldap_branch.md).

2.  Take one of the following approaches:

    -   Configure the self-registration feature to have external users added to your LDAP directory as they register. 

        **Note:** Self-registration requires that users have anonymous access to be able to register and reset their guest password. If an access manager solution such as IBM Security Verify Access (formerly Security Access Manager) is in place, a junction for the following context route has to be created/whitelisted: **/selfservice/**

    -   Add external users to your LDAP directory. The managed registration process differs for each organization and cannot be described here. For more information, see your organization's registration guidelines.
3.  If you did NOT configure self-registration in step 2, synchronize your LDAP with the Profiles database. For more information, see [Registering external users with Profiles](../admin/t_admin_profiles_external_user_script.md).

4.  \(Optional\) Allow internal users to collaborate with external users by changing their Profiles roles. For more information, see [Setting user roles for external collaboration](../admin/t_admin_profiles_set_roles.md). To also allow internal users to invite external users to Connections through a menu option, see [Configuring self-registration for external users](../admin/t_install_config_self-registration_for_external_users.md).

    Internal users cannot, by default, create communities that can have external users as members. All external users must be populated to Connections Profiles via IBM Security Verify Access Directory Integrator first. After an external user is created, then internal users can invite the external user to collaborate on Communities, Files and Activities, as long as those communities/files/activities are external.

5.  If your approach is managed registration and your deployment does not use an authentication mechanism such as IBM Security Verify Access (SVA) or SiteMinder, disable anonymous access to HCL Connections. For more information, see [Forcing users to log in before they can access an application](../secure/t_admin_common_force_authentication.md).

6.  If you have enabled single sign-on for IBM SVA with SPNEGO, the authentication on the SVA server must be set to forms-based authentication when SPNEGO is not present and the external visitor users in the database must match the IBM SVA imported users. For more information, see [Enabling SPNEGO single sign-on for  Security Verify Access](../secure/t_secure_with_tam-spnego.md).


**Parent topic:** [Optional post-installation tasks](../install/c_optional_post-install_tasks.md)

