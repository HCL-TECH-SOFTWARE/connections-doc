# Managing users {#c_admin_common_user_life_cycle_over .concept}

As employees come and go from your organization, the corporate directory changes, and there are some steps that you, as the administrator, must take to make sure that those changes are reflected in the product by keeping the HCL Connections membership tables up-to-date with the changes that occur in your corporate directory.

If the Profiles application is installed, when you inactivate a user or make changes to user data, such as change a person's last name or email address in the Profiles database, that change is automatically pushed out to the membership and login tables of the other HCL Connections applications.

If Profiles is not installed in your deployment, you must apply the changes to the membership tables for each application separately. The only way to update user data in the membership tables for the other applications is through a set of administrative synchronization commands.

The following topics provide more information about managing users:

-   **[User life cycle details](../admin/c_admin_common_user_life_cycle_goal.md)**  
HCL Connections can identify whether people in the directory are active, meaning current employees or inactive, meaning were once listed in the directory, but have since left the company. Users who are inactive can be kept in the product membership and login tables, rather than being removed from the product databases entirely.
-   **[Managing users when the Profiles application is installed](../admin/c_admin_common_user_life_cycle_with_profiles.md)**  
Managing users is easier if the Profiles application is installed and you accept the default configuration in which the Profiles directory service extension is used to retrieve data from the Profiles database instead of retrieving it from the LDAP directory. Starting with version 3, when you make changes to user status and data in the Profiles database, the changes are automatically propagated to the other application databases.
-   **[Managing users when the Profiles application is not installed](../admin/c_admin_common_user_life_cycle_without_profiles.md)**  
If the Profiles application is not installed, you must manage changes to user status and data in each application database independently. The only way to update user data in the databases for the other applications is through a set of administrative synchronization commands.
-   **[Sample user management scenarios](../admin/c_admin_common_managing_user_scenarios.md)**  
The following scenarios address some of the common tasks involved in managing user data within an organization.

**Parent topic:** [Managing access](../admin/c_admin_common_managing_access.md)

**Related information**  


[Synchronizing the Profiles database with your organization's user data](../admin/t_admin_profiles_sync_ldap.md)

[Retrieving member information](../admin/t_admin_act_manage_membership.md)

[Deleting user files from the system](../admin/t_admin_files_delete_user_data.md)

[Excluding inactive users from search results](../admin/t_admin_search_exclude_inactive_users.md)

