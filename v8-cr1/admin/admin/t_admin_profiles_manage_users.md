# Managing user data using Profiles administrative commands {#t_admin_profiles_manage_users .task}

Use administrative commands to manage Profiles users by setting their status to inactive.

**Important:** The commands in this topic are provided only as a last resort to allow the administrator to modify the data associated with a specific user in the Profiles and application databases. User data is normally automatically updated from the LDAP repository using the IBM® Tivoli® Directory Integrator scripts or the Profiles Administration API. The commands to update, activate, and inactivate users can introduce discrepancies between the application databases and the LDAP repository if not used carefully. It is very strongly advised that you check the data of the user in the LDAP repository prior to using these commands to avoid introducing discrepancies.

These commands should not be used to propagate directory ID changes. If the Profiles database contains an updated directory ID for a user, it will not be able to identify that user to other component applications that contain an earlier version. These commands can be useful for propagating other profile updates. If profiles in other applications remain out of synch after or admin API commands have been issued, see [Synchronizing user data using administrative commands](c_admin_common_sync_via_admin_commands1.md).

Install and configure the IBM HTTP Server before attempting to synchronize data between the Profiles database and other application databases. See *Configuring IBM HTTP Server* for details.

You can manage users in Profiles to allow for situations in which employees leave the organization. For example, you can set a user's status to inactive, which allows you to reuse the associated email address and login details for new employees. You can also reactivate a user's status in situations where the user leaves the organization temporarily. For example, if a profile owner goes on sabbatical or personal leave, you can set his status to inactive and then reactivate the user's status when he returns.

When you set a user's status to inactive, that user's name is displayed in italic, gray text in membership lists, and their name is not returned in searches of the company directory. The inactive user's name no longer displays when you use type-ahead, and the person no longer receives email notifications from HCL Connections.

1.  Start the wsadmin client from the following directory of the system where you installed the deployment manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    **Note:** You must start the client from this directory or subsequent commands that you try to run will not execute properly. For more information, see the *Starting the wsadmin client* topic.

2.  Start the Profiles Jython script interpreter.

    1.  Enter the following command to access the Profiles configuration files:

        execfile\("profilesAdmin.py"\) If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

3.  Use the following commands to manage the user life cycle:

    **ProfilesService.inactivateUser\(String user\_email\_addr\)**
    
    Inactivates the user with the specified email address.After you run this command, the user is no longer active in the system. The email address is removed from all member tables and the status of the user changes from active \(0\) to inactive \(1\). All the user's login values are removed from the login tables and the login values associated with the user in the PROFILE\_LOGIN table are removed. An event is created in which Profiles propagates these changes to the member and login tables of all installed applications to make sure the user's information is updated consistently across the application databases. The status of inactive users can be reactivated at a later time using the ProfilesService.activateUserByUserId command.
    
    For example:
    
    ```
    ProfilesService.inactivateUser("john.smith@example.com")
    ```

    **ProfilesService.inactivateUserByUserId\(String userID\)**
    
    Inactivates the user with the specified user ID. This command has the same behavior as the ProfilesService.inactivateUser command, except that it takes a user ID instead of an email address as an argument.After you run this command, the user is no longer active in the system. The email address is removed from all member tables and the status of the user changes from active \(0\) to inactive \(1\). All the user's login values are removed from the login tables and the login values associated with the user in the PROFILE\_LOGIN table are removed. An event is created in which Profiles propagates these changes to the member and login tables of all installed applications to make sure the user's information is updated consistently across the application databases. The status of inactive users can be reactivated at a later time using the ProfilesService.activateUserByUserId command.
    
    **Note:** The userID parameter is defined in the profiles-config.xml file by the lconnUserIdField tag. The default value is guid, which is stored in Prof\_guid in the profiles database. The values for Prof\_guid must match the values for UserID.
    
    For example:
    
    ```
    ProfilesService.inactivateUserByUserId("ec8a89c0-f41d-102c-9b60-f225bc6c4af4")
    ```

    **ProfilesService.activateUserByUserId\(String user\_external\_id, updated\_properties\_list\)**
    
    Activates the user with the specified external ID with new properties, which are passed as parameters using updated\_properties\_list. The default status of any user in IBM Connections is active.The user\_external\_id parameter is the unique ID defined in the profiles-config.xml file by the lconnUserIdField tag. The default value is guid, which is stored in Prof\_guid in the Profiles database.
    
    The valid properties for updated\_properties\_list are: 
    
    -   uid
    -   email
    -   loginId. The value stored in the PROF\_LOGIN field in the EMPLOYEE table.
    -   logins. The list of logins stored in the PROFILE\_LOGIN table.
    -   displayName
    -   directoryId \(guid\). The value stored in the PROF\_GUID field in the EMPLOYEE table.
    
    You should specify at least one of the properties that will allow the user to log in, and it must be specified using a name-value pair.
    
    The status change and all property updates are propagated to all the installed IBM Connections applications.
    
    Examples:
    
    ```
    ProfilesService.activateUserByUserId("ec8a89c0-f41d-102c-9b60-f225bc6c4af4", 
    email="jsmith@example.com", loginId="jsmith")
    ``` 
    
    ```ProfilesService.activateUserByUserId("ec8a89c0-f41d-102c-9b60-f225bc6c4af4", 
    email="ajretired1@example.com", logins=["alanjones1","ajonesRetired1"])
    ```
    
    ```
    ProfilesService.activateUserByUserId("ec8a89c0-f41d-102c-9b60-f225bc6c4af4", 
    email="speters_Retired1@example.com")
    ```
    
    **ProfilesService.updateUser\(String user\_email\_addr, updated\_properties\_list\)**
    
    Replaces the existing properties for the user with the specified email address with new properties, which are passed as parameters using updated\_properties\_list. The valid properties for updated\_properties\_list are:
    
    -   uid
    -   email
    -   displayName
    -   directoryId \(guid\). The value stored in the PROF\_GUID field in the EMPLOYEE table.
    -   loginId. The value stored in the PROF\_LOGIN field in the EMPLOYEE table.
    -   logins. The list of logins stored in the PROFILE\_LOGIN table. The list must be passed using the format: `["login1", "login2"]`
    -   uid
    
    The properties are all optional and they must be specified using name-value pairs. The updated values are pushed out to all the applications in IBM Connections using a platform command.
    
    For example, the following command updates the email address and the login for the user john.smith@example.com.
    
    ```
    ProfilesService.updateUser("john.smith@example.com", 
    email="update_email@example.com", loginId="updated_login")
    ```
    
    The following command replaces the existing list of logins with the new one, \("login1", "login2"\).
    
    ```
    ProfilesService.updateUser("john.smith@example.com", 
    logins=["login1, "login2"])
    ```
    
    **ProfilesService.updateUserByUserId\(String userID, updated\_properties\_list\)**
    
    Replaces the existing properties for the user with the specified user ID with new properties, which are passed as parameters using updated\_properties\_list. This command has the same behavior as the ProfilesService.updateUser command, but it takes a user ID instead of an email address as an argument.The valid properties for updated\_properties\_list are:

    -   uid
    -   email
    -   displayName
    -   directoryId \(guid\). The value stored in the PROF\_GUID field in the EMPLOYEE table.
    -   loginId. The value stored in the PROF\_LOGIN field in the EMPLOYEE table.
    -   logins. The list of logins stored in the PROFILE\_LOGIN table. The list must be passed using the format: `["login1", "login2"]`
    -   uid

    The properties are all optional and they must be specified using name-value pairs. The updated values are pushed out to all the applications in IBM Connections using a platform command.
    
    **Note:** The userID parameter is defined in the profiles-config.xml file by the lconnUserIdField tag. The default value is guid, which is stored in Prof\_guid in the profiles database. The values for Prof\_guid must match the values for UserID.
    
    For example: 
    
    ```
    ProfilesService.updateUserByUserId("ec8a89c0-f41d-102c-9b60-f225bc6c4af4", 
    email="update_email@example.com", loginId="updated_login")
    ```
    
    **ProfilesService.swapUserAccessByUserId\(String userToActivate, String userToInactivate\)**
    
    Associates the following properties of the external ID assigned to the person returning to the organization with the external ID used by the person before leaving the organization:    
    
    -   email
    -   uid. The value stored in the PROF\_UID field in the EMPLOYEE table.
    -   guid. The value stored in the PROF\_GUID field in the EMPLOYEE table.
    -   loginId. The value stored in the PROF\_LOGIN field in the EMPLOYEE table.
    -   logins. The list of logins stored in the PROFILE\_LOGIN table. The list must be passed using the format: `["login1", "login2"]`

    The displayName property is not changed; it is assumed to be the same. Users can have access to the data associated with one or the other ID only. When you swap IDs to give a person access to the data associated with an old ID, he loses access to any data he created using the new ID. Run this command soon after the user returns to the organization to limit the amount of new data he can create and subsequently lose access to as a result of the swap.

    The following parameters are required.

    Parameters:

    **userToActivate**
        
    Current user ID of the person before leaving the organization and had his user state set to inactivate. Data that was created by this person and that is associated with this ID exists in the HCL Connections™ databases and you want the person to be able to regain access to it.

    **userToInactivate**
    New user ID that was assigned to the person upon his return to the organization.

    Example: `ProfilesService.swapUserAccessByUserId("DRcuidk001rehired13","DRcuidk001retired25")`

    These changes are propagated across all the installed applications in IBM Connections.|
    
    **ProfilesService.publishUserData\(String user\_email\_addr\)**
    
    Publishes an update command to all the IBM Connections applications for the user with the specified email address.The command publishes the data that is currently stored for the user in the Profiles database \(email, displayName, logins, directoryId\). If one of the applications misses an update event for some reason and the incorrect email address or name is displaying for a user, for example, you can use this command to force all the applications to resynchronize their data.

    For example:

    ```
    ProfilesService.publishUserData("john.smith@example.com")
    ```

    **ProfilesService.publishUserDataByUserId\(String userID\)**
    
    Publishes an update command to all the IBM Connections applications for the user with the specified user ID. This command has the same behavior as the ProfilesService.publishUserData command, except that it takes a user ID instead of an email address as an argument.The command publishes the data that is currently stored for the user in the Profiles database \(email, displayName, logins, directoryId\). If one of the applications misses an update event for some reason and the incorrect email address or name is displaying for a user, for example, you can use this command to force all the applications to resynchronize their data.

    **Note:** The userID parameter is defined in the profiles-config.xml file by the lconnUserIdField tag. The default value is guid, which is stored in Prof\_guid in the profiles database. The values for Prof\_guid must match the values for UserID.

    For example:

    ```
    ProfilesService.publishUserDataByUserId("ec8a89c0-f41d-102c-9b60-f225bc6c4af4")
    ```


**Parent topic:** [Managing users when the Profiles application is installed](../admin/c_admin_common_user_life_cycle_with_profiles.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Deleting or inactivating users in the Profiles database](../admin/t_admin_profiles_delete_users.md)

[Configuring IBM HTTP Server](../install/c_add_ihs_over.md)

[Synchronizing user data by using administrative commands](../admin/c_admin_common_sync_via_admin_commands1.md)

[Synchronizing the Profiles database with your organization's user data](../admin/t_admin_profiles_sync_ldap.md)

[Troubleshooting user data synchronization](../troubleshoot/c_troubleshoot_sync_user_data.md)

