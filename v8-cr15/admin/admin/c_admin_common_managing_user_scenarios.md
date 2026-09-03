# Sample user management scenarios {#c_admin_common_managing_user_scenarios .concept}

The following scenarios address some of the common tasks involved in managing user data within an organization.

User management commands allow the administrator to push LDAP changes from Profiles to the other applications so that as data in Profiles is added and updated, these changes can be easily captured and propagated to the rest of HCL Connections. An extension hook to IBM® Tivoli® Directory Integrator is also provided, allowing administrators to add custom logic for determining if a user has left the system or has been affected by a human resources action that might prevent Tivoli Directory Integrator from being able to match their old employee record with their new employee record. Examples of such actions typically include users moving from part-time to full-time or transferring from one country to another.

-   **[Improving directory synchronization](../admin/t_admin_common_update_user_status.md)**  
Enable your IBM Tivoli Directory Integrator solution to handle actions that could otherwise lead to orphaned user data.

**Parent topic:** [Managing users](../admin/c_admin_common_user_life_cycle_over.md)

**Related information**  


[Managing user data using Profiles administrative commands](../admin/t_admin_profiles_manage_users.md)

[Customizing the logic used for the delete operation](../admin/t_admin_profiles_customize_delete_logic.md)

