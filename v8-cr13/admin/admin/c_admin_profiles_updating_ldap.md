# Managing user data using Tivoli Directory Integrator Solution scripts {#c_admin_profiles_updating_ldap .concept}

There are a number of scenarios in which you might want to synchronize changes between the Profiles database and the LDAP directory, using IBM® Tivoli® Directory Integrator.

!!! note 
    
    Before running any of the SDI Solutions \(tdisol\) scripts,ensure you have [Set up the Security Directory Integrator Solutions directory \(tdisol\)](../install/t_setting_up_security_dir_integ_solutions_dir.md).

When you want to update user information in the Profiles database, the model typically used is to update the information in the LDAP directory and then synchronize the changes back to the Profiles database. For example, if your organization has taken over a new division, you can add new employees to Profiles by importing their details into the LDAP directory and then synchronizing the changes to the Profiles database. One way to keep your profiles data synchronized with changes to the LDAP directory is to use the `sync_all_dns` task. For more information, see *Synchronizing source changes such as LDAP with Profiles*.

However, there might be instances in which your organization wants to allow users to update their information directly in the Profiles database. For example, if users want to update their personal cell phone details, as administrator, you might allow them to make the changes in Profiles themselves. These changes must be synchronized back to the LDAP directory from Profiles. To start the synchronization process, you need to define values for the DSML server-related properties in the `profiles_tdi.properties` file and then run the appropriate `process_draft_updates` script. For more information, see *Synchronizing user data between Profiles and LDAP*.

Although it is not expected to be a frequent occurrence, there might also be instances in which you want to change your LDAP directory. In this scenario, you can run scripts that are provided with HCL Connections to synchronize the user information used in Profiles with the user information stored in your new LDAP directory. For more information, see *Updating Profiles when changing LDAP directory*.

Related information is available in the [IBM Security Directory Integrator solutions for HCL Connections real-world scenarios](http://www-10.lotus.com/ldd/lcwiki.nsf/dx/IBM_Tivoli_Directory_Integrator_solutions_for_IBM_Connections_real-world_scenarios) wiki article.

Refer to the following topics for more information:

-   **[Synchronizing the Profiles database with your organization's user data](../admin/t_admin_profiles_sync_ldap.md)**  
To keep your organization's user data up-to-date, regularly synchronize the IBM Connections Profiles database with your data source, such as an LDAP directory or an employee database.
-   **[Updating Profiles when changing LDAP directory](../admin/t_admin_profiles_change_ldaps.md)**  
When you change to a new LDAP directory with the same users, you must synchronize the user data in Profiles with the user data in your new LDAP directory. You can use the sync\_all\_dns command, provided that certain criteria are met.
-   **[Deleting or inactivating users in the Profiles database](../admin/t_admin_profiles_delete_users.md)**  
You can use an IBM Tivoli Directory Integrator command to delete or inactivate users in the Connections Profiles database.
-   **[Customizing the logic used for the delete operation](../admin/t_admin_profiles_customize_delete_logic.md)**  
You can customize the delete logic to use when deleting users from the Profiles database.

**Parent topic:** [Managing users when the Profiles application is installed](../admin/c_admin_common_user_life_cycle_with_profiles.md)

**Related information**  


[Tivoli Directory Integrator Solution commands](../admin/r_admin_profiles_tdi_commands.md)

[Troubleshooting Security Directory Integrator](../troubleshoot/ts_t_check_tdi.md)

