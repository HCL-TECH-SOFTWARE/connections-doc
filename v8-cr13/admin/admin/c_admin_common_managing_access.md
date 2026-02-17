# Managing access {#managingaccess .concept}

Manage roles, credentials, users, and directories, and allow third-party access to HCL Connections data.

Manage access by setting roles, creating superusers, allowing third-party applications to access data, making sure the administrator credentials are accurate, keeping users synchronized with the directory, managing inappropriate content, and enabling moderation.

The following sections describe common tasks for managing access in HCL Connections.

-   **[Roles](../admin/r_admin_common_user_roles.md)**  
Roles that you can define for users and groups on IBM® WebSphere® Application Server.
-   **[Managing stored credentials](../admin/c_admin_common_change_passwords.md)**  
HCL Connections does not create nor store user names and passwords. Instead, it uses the user credentials that already exist in your LDAP directory for authentication. HCL Connections does not store administrative user IDs and passwords either. It does, however, create and store references to existing administrative user credentials. You can make changes to those references.
-   **[Managing users](../admin/c_admin_common_user_life_cycle_over.md)**  
As employees come and go from your organization, the corporate directory changes, and there are some steps that you, as the administrator, must take to make sure that those changes are reflected in the product by keeping the HCL Connections membership tables up-to-date with the changes that occur in your corporate directory.
-   **[Managing personal information in accordance with PI laws](../admin/c_common_manage_personal_data_for_gdpr.md)**  
As an administrator, you might experience users asking that their personal information \(PI\) be erased or corrected in accordance with local and international PI laws, for example the EU General Data Protection Regulation \(GDPR\). This section describes the most common scenarios that you might encounter and the actions that you need to take to satisfy the user requests.
-   **[Using the LDAP directory as the user directory](../admin/t_admin_common_disabling_directory_services.md)**  
Edit configuration property settings to disable HCL Connections directory service extensions.
-   **[Groups](../admin/c_admin_common_groups.md)**  
Content owners can use LDAP groups to control access to resources in the Communities, Activities, Files, and Wikis applications. For this reason, it is important to consider the effect that updating LDAP groups has on the existing membership of these resources.

**Parent topic:** [Administering common areas](../admin/c_admin_act_wsadmin.md)

