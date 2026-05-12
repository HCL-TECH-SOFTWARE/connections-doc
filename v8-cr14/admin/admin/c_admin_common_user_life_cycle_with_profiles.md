# Managing users when the Profiles application is installed {#c_admin_common_user_life_cycle_with_profiles .concept}

Managing users is easier if the Profiles application is installed and you accept the default configuration in which the Profiles directory service extension is used to retrieve data from the Profiles database instead of retrieving it from the LDAP directory. Starting with version 3, when you make changes to user status and data in the Profiles database, the changes are automatically propagated to the other application databases.

You can use one of the following methods to update user data in the Profiles database:

-   IBM® Tivoli® Directory Integrator scripts
-   Profiles Administration APIs
-   Profiles administrative commands

The following topics provide more information about managing user data when the Profiles application is installed:

-   **[Managing user data using Tivoli Directory Integrator Solution scripts](../admin/c_admin_profiles_updating_ldap.md)**  
There are a number of scenarios in which you might want to synchronize changes between the Profiles database and the LDAP directory, using IBM Tivoli Directory Integrator.
-   **[Managing user data using the Profiles Administration APIs](../admin/c_admin_common_sync_via_prof_admin_api.md)**  
Use the Profiles Administration APIs to synchronize data between the Profiles database and the corporate directory. You can use the APIs as an alternative to running IBM Tivoli Directory Integrator scripts to initiate changes.
-   **[Managing user data using Profiles administrative commands](../admin/t_admin_profiles_manage_users.md)**  
Use administrative commands to manage Profiles users by setting their status to inactive.

**Parent topic:** [Managing users](../admin/c_admin_common_user_life_cycle_over.md)

**Related information**  


[Troubleshooting user data propagation](../troubleshoot/ts_c_troubleshoot_user_lifecycle.md)

