# Profiles administrative commands {#r_admin_profiles_admin_props .reference}

Use the commands that are listed to execute administrative tasks for Profiles. You do not need to checkout a file or restart the server when you use these commands.

## Profiles commands { .section}

The following sections define the commands that you can use when you are working with Profiles. Each section describes the commands for a specific service.

-   [ProfilesConfigService](r_admin_profiles_admin_props.md#ProfilesConfigService)
-   [ProfilesService](r_admin_profiles_admin_props.md#ProfilesService)

## ProfilesConfigService commands {#ProfilesConfigService .section}

ProfilesConfigService.checkOutConfig\("working\_directory", "cell\_name"\)
:   Checks all Profiles configuration files out to a temporary directory.

    This command takes the following parameters:

    -   working\_directory. Temporary working directory to which the configuration files are copied. The files are kept in this working directory while you make changes to them.
    -   cell\_name. Name of the IBM® WebSphere® Application Server cell that is hosting the HCL Connections application. If you do not know the cell name, type the following command while in the wsadmin command processor:

        ```
        print AdminControl.getCell()
        ```

        For example:

        -   Linux™:

            ```
            ProfilesConfigService.checkOutConfig("/opt/my_temp_dir",
                "ServerNode01Cell")
            ```

        -   Microsoft™ Windows™:

            ```
            ProfilesConfigService.checkOutConfig("c:/temp","foo01Cell01")
            ```


ProfilesConfigService.showConfig\(\)
:   Displays the current configuration settings. You must check out the configuration files with ProfilesConfigService.checkOutConfig before you run ProfilesConfigService.showConfig.

ProfilesConfigService.updateConfig\("property", "value"\)
:   Updates configuration properties.

    This command takes the following parameters:

    -   property. One of the configuration properties that can be edited for Profiles. See *Profiles configuration properties* for a full list of Profiles configuration properties and their descriptions.
    -   value. The new value with which you want to set the specified property. Acceptable values for properties can be restricted, for example, to either true or false. See *Profiles configuration properties* for configuration properties and descriptions.

ProfilesConfigService.checkInConfig\(\)
:   Checks in Profiles configuration files. Run from the wsadmin command processor.

ProfilesConfigService.checkOutPolicyConfig\("working\_directory", "cell\_name"\)
:   Checks the profiles-policy.xml and profiles-policy.xsd files out to a temporary directory.

    This command takes the following parameters:

    -   working\_directory. Temporary working directory to which the configuration files are copied. The files are kept in this working directory while you make changes to them.
    -   cell\_name. Name of the WebSphere Application Server cell that is hosting the IBM Connections application. If you do not know the cell name, type the following command while in the wsadmin command processor:

        ```
        print AdminControl.getCell()
        ```

        For example:

        -   Linux:

            ```
            ProfilesConfigService.checkOutPolicyConfig("/opt/my_temp_dir",
                "ServerNode01Cell")
            ```

        -   Microsoft Windows:

            ```
            ProfilesConfigService.checkOutPolicyConfig("c:/temp","foo01Cell01")
            ```


ProfilesConfigService.checkInPolicyConfig\(\)
:   Checks in the Profiles policy configuration files. Run from the wsadmin command processor.

## ProfilesService commands {#ProfilesService .section}

ProfilesService.deletePhoto\(String user\_email\_addr\)
ProfilesService.deletePhoto\(String user\_email\_addr, String orgId\)
:   Deletes image files that are associated with a user's email address. This command can be used only if the user uploaded a photo to their profile. This command removes the photo.

    For example:

    ```
    ProfilesService.deletePhoto("john_doe@example.com")
    ```

    ```
    ProfilesService.deletePhoto("john_doe@example.com",orgId="0000000045")
    ```

ProfilesService.deletePhotoByUserId\(String user\_external\_id\)
:   Deletes image files that are associated with a user's external ID. This command can be used only if the user uploaded a photo to their profile. This command removes the photo.

    For example:

    ```
    ProfilesService.deletePhotoByUserId("8d579540")
    ```

ProfilesService.disableFullReportsToCache\(\)
:   Disables the full report-to chain cache capability. This command does not take any arguments.

ProfilesService.enableFullReportsToCache\(startDelay, interval, schedTime\)
:   Enables the full report-to chain cache with the specified start delay in minutes, refresh interval in minutes, and scheduled refresh time in HH:MM format.

    This cache is used to populate the full report-to chain view available in a user's profile. The cache contains the specified number of top employees in the organizational pyramid; it is not intended to store an entry for each profile. It stores the profiles of those people at the top of the chain who are included in many full report-to chain views.

    For example:

    ```
    ProfilesService.enableFullReportsToCache(5, 15, "23:00")
    ```

ProfilesService.findDistinctProfileTypeReferences\(\)
:   Lists the profile types that are present in the Profiles database.

ProfilesService.findUndefinedProfileTypeReferences\(\)
:   Lists the profile types that are present in the Profiles database but that do not appear in the profiles-types.xml configuration file.

ProfilesService.purgeEventLogsByDates\(string startDate, string endDate\)
:   Deletes event log entries created between the specified start date and end date.

    This command takes the following parameters:

    startDate
    :   A string that specifies the start date for the period in MM/DD/YYYY format.

    endDate
    :   A string that specifies the end date for the period in MM/DD/YYYY format.

    For example:

    ```
    ProfilesService.purgeEventLogsByDates("06/21/2009", "06/26/2009")
    ```

    This command deletes all the event log entries that were created on or after June 21st, 2009 and before June 26th, 2009 from the EVENTLOG table.

ProfilesService.purgeEventLogsByEventNameAndDates\(eventName, string startDate, string endDate\)
:   Deletes event log entries with the specified event name that were created between given start date and end date.

    This command takes the following parameters:

    eventName
    :   The type of event that you want to remove from the EVENTLOG table. The following names are some examples of valid event names:

        -   profiles.created
        -   profiles.removed
        -   profiles.updated
        -   profiles.person.photo.updated
        -   profiles.person.audio.updated
        -   profiles.colleague.created
        -   profiles.colleague.added
        -   profiles.connection.rejected
        -   profiles.person.tagged
        -   profiles.person.selftagged
        -   profiles.tag.removed
        -   profiles.link.added
        -   profiles.link.removed
        -   profiles.status.updated
        -   profiles.wallpost.created
        -   profiles.wallpost.removed
        -   profiles.wall.comment.added

        For a complete list of valid event names for Profiles, refer to the [Events Reference](https://ds-infolib.hcltechsw.com/ldd/lcwiki.nsf/xpDocViewer.xsp?lookupName=IBM+Connections+4.0+API+Documentation#action=openDocument&res_title=Events_Reference&content=pdcontent) article in the API Documentation wiki.

    startDate
    :   A string that specifies the start date for the period in MM/DD/YYYY format.

    endDate
    :   A string that specifies the end date for the period in MM/DD/YYYY format.

    For example:

    ```
    ProfilesService.purgeEventLogsByEventNameAndDates("profiles.colleague.created", "06/21/2009", "06/26/2009")
    ```

    This command deletes all the profiles.colleague.created event log entries that were created on or after June 21st, 2009 and before June 26th, 2009 from the EVENTLOG table.

ProfilesService.reloadFullReportsToCache\(\)
:   Forces a reload of the full report-to chain cache from the Profiles database. This command does not take any arguments.

    **Note:** If the full report-to cache is disabled, it cannot be reloaded. This command fails when the cache is disabled.

ProfilesService.updateDescription\(String user\_email\_addr, String new\_content\_for\_description\_field\)
ProfilesService.updateDescription\(String user\_email\_addr, String new\_content\_for\_description\_field, String orgId\)
:   Replaces the existing description text that is associated with a user's email address with an alternate description text enclosed by double quotation marks.

    Description text is information that is contained on the **About Me** tab of a user's profile.

    For example:

    ```
    ProfilesService.updateDescription("ann_jones@example.com",
    "Text to display in About Me tab for Ann")
    ```

    ```
    ProfilesService.updateDescription("ann_jones@example.com",
    "Text to display in About Me tab for Ann",orgId="0000000045")
    ```

    **Note:** Rich text cannot be entered with this command.

ProfilesService.updateExperience\(String user\_email\_addr, String new\_content\_for\_experience\_field\)
ProfilesService.updateExperience\(String user\_email\_addr, String new\_content\_for\_experience\_field, String orgId\)
:   Replaces the existing experience text that is associated with a user's email address with alternative text enclosed by double quotation marks.

    Experience is the information that is contained in the **Background** area of a user's profile.

    For example:

    ```
    ProfilesService.updateExperience("ann_jones@example.com",
    "Text to display in Background field for Ann")
    ```

    ```
    ProfilesService.updateExperience("ann_jones@example.com",
    "Text to display in Background field for Ann",orgId="0000000045")
    ```

    **Note:** Rich text cannot be entered with this command.

ProfilesService.getRoles\(String user\_email\_addr\)
:   Retrieves the role that is associated with a user's email address. The parameter is the email address of the user whose role you are retrieving.

    One of the following role values are returned:

    -   employee: This user has normal rights across the site, but cannot create content that is visible to external users.
    -   employee.extended: This user has the same rights as users with the employee role, but is allowed to create content that is visible to external users.
    -   visitor: This user is an external user and is not part of your organization.

    For example:

    ```
    ProfilesService.getRoles("john_doe@example.com")
    [employee]
    
    ProfilesService.getRoles("ann_jones@example.com")
    [employee.extended]
    
    ```

ProfilesService.getRolesByUserId\(String user\_external\_id\)
:   Retrieves the role that is associated with a user's directory ID. The user\_external\_id parameter is the external ID of the user whose role you are retrieving.

    One of the following role values are returned:

    -   employee: This user has normal rights across the site, but cannot create content that is visible to external users.
    -   employee.extended: This user has the same rights as users with the employee role, but is allowed to create content that is visible to external users.
    -   visitor: This user is an external user and is not part of your organization.

    For example:

    ```
    ProfilesService.getRolesByUserId("8d579540")
    [employee]
    
    ProfilesService.getRolesByUserId("79659548")
    [employee.extended]
    
    ```

ProfilesService.setRole\(String user\_email\_addr, String role\)
:   Sets the role that is associated with an individual user's email address.

    A user can have only one role. The existing role is replaced with the role set by this command. If the requested role is not valid or is not allowed for the user then the command fails silently and the role is not changed.

    You can assign one of the following roles to internal users:

    -   EMPLOYEE: Assign this role to users who are not allowed to create content that is visible to external users. EMPLOYEE is a constant that resolves to the string "employee".
    -   EMPLOYEE\_EXTENDED: Assign this role to users who are allowed to create content that is visible to external users. EMPLOYEE\_EXTENDED is a constant that resolves to the string "employee.extended".
    -   DEFAULT\_ROLE: Equivalent to EMPLOYEE.

    **Note:** You cannot assign a role to an external user. External users have the VISITOR role, which cannot be changed.

    For example:

    ```
    ProfilesService.setRole("ajones277@example.com", DEFAULT_ROLE)
    setRole Command processed user role 'employee' for user ajones277@example.com
    
    ```

ProfilesService.setRoleByUserId\(String user\_external\_id, String role\)
:   Sets the role that is associated with a user's external ID.

    A user can have only one role. The existing role is replaced with the role set by this command. If the requested role is not valid or is not allowed for the user then the command fails silently and the role is not changed.

    You can assign one of the following roles to internal users:

    -   EMPLOYEE: Assign this role to users who are not allowed to create content that is visible to external users. EMPLOYEE is a constant that resolves to the string "employee".
    -   EMPLOYEE\_EXTENDED: Assign this role to users who are allowed to create content that is visible to external users. EMPLOYEE\_EXTENDED is a constant that resolves to the string "employee.extended".
    -   DEFAULT\_ROLE: Equivalent to EMPLOYEE.

    **Note:** You cannot assign a role to an external user. External users have the VISITOR role, which cannot be changed.

    For example:

    ```
    ProfilesService.setRoleByUserId("8e88c240", EMPLOYEE_EXTENDED)
    setRole Command processed user role 'employee.extended' for user 8e88c240
    
    ```

ProfilesService.setBatchRole\(String role, String filename\)
:   Assigns the same role to a set of users using a text file that lists valid email addresses. Each user whose email address is listed in the text file is assigned the role specified in the role parameter.

    A user can have only one role. The existing role is replaced with the role set by this command. If the requested role is not valid or is not allowed for the user then the command fails silently and the role is not changed.

    The following parameters are required:

    -   role: The role to assign to each user in the list.
    -   filename: The name of the text file containing the list of users. The text file must be locally accessible from the client environment and must contain one valid email address per line. This command assigns the specified role to each user whose email addresses is listed in this file.

        **Note:** If you are processing several hundreds of users, create several files and execute them in separate commands.


    You can assign one of the following roles to internal users:

    -   EMPLOYEE: Assign this role to users who are not allowed to create content that is visible to external users. EMPLOYEE is a constant that resolves to the string "employee".
    -   EMPLOYEE\_EXTENDED: Assign this role to users who are allowed to create content that is visible to external users. EMPLOYEE\_EXTENDED is a constant that resolves to the string "employee.extended".
    -   DEFAULT\_ROLE: Equivalent to EMPLOYEE.

    **Note:** You cannot assign a role to an external user. External users have the VISITOR role, which cannot be changed.

    For example:

    ```
    ProfilesService.setBatchRole(EMPLOYEE, "profiles-roles-by-email.txt")
    
    ```

    After the values are processed, you see this confirmation:

    ```
    setBatchRole request processed
     Command processed user role 'employee' for users
    [ ajones377@example.com, ajones277@example.com, ajones177@example.com, JohnSmith4@example.com, JohnSmith3@example.com, JohnSmith2@example.com, JohnSmith1@example.com ]
    wsadmin>
    ```

ProfilesService.setBatchRoleByUserId\(String role, String filename\)
:   Assigns the same role to a set of users using a text file that lists user IDs. Each user whose ID is listed in the text file is assigned the role specified in the role parameter.

    -   role: The role to assign to each user in the list.
    -   filename: The name of the text file containing the list of user IDs. The text file must be locally accessible from the client environment and must contain one valid user ID per line. This command assigns the specified role to each user whose ID is listed in this file.

        **Note:** If you are processing several hundreds of users, create several files and execute them in separate commands.


    You can assign one of the following roles to internal users:

    -   EMPLOYEE: Assign this role to users who are not allowed to create content that is visible to external users. EMPLOYEE is a constant that resolves to the string "employee".
    -   EMPLOYEE\_EXTENDED: Assign this role to users who are allowed to create content that is visible to external users. EMPLOYEE\_EXTENDED is a constant that resolves to the string "employee.extended".
    -   DEFAULT\_ROLE: Equivalent to EMPLOYEE.

    **Note:** You cannot assign a role to an external user. External users have the VISITOR role, which cannot be changed.

    For example:

    ```
    ProfilesService.setBatchRoleByUserId(EMPLOYEE, "profiles-roles-by-userid.txt")
    
    ```

    After the values are processed, you see this confirmation:

    ```
    setBatchRole request processed
     Command processed user role 'employee' for users
    [ 8d579540, 110f82c0, 8f2158c0, 5876de62 ]
    
    ```

Commands for managing user data
:   ProfilesService.activateUserByUserId\(String user\_external\_id, updated\_properties\_list\)
:   Activates the user with the specified external ID with new properties, which are passed as parameters in theupdated\_properties\_list. The default status of any user in IBM Connections is active.

    See *Managing user data using Profiles administrative commands* for details.

ProfilesService.inactivateUser\(String user\_email\_addr\)
:   Deactivates the user with the specified email address.

    See *Managing user data using Profiles administrative commands* for details.

ProfilesService.inactivateUserByUserId\(String userID\)
:   Deactivates the user with the specified user ID. This command has the same behavior as the ProfilesService.inactivateUser command, except that it takes a user ID instead of an email address as an argument.

    See *Managing user data using Profiles administrative commands* for details.

ProfilesService.publishUserData\(String user\_email\_addr\)
:   See *Managing user data using Profiles administrative commands* for details.

ProfilesService.publishUserDataByUserId\(String userID\)
:   See *Managing user data using Profiles administrative commands* for details.

ProfilesService.swapUserAccessByUserId\(String user\_to\_activate, String user\_to\_inactivate\)
:   See *Managing user data using Profiles administrative commands* for details.

ProfilesService.updateUser\(String user\_email\_addr, updated\_properties\_list\)
:   See *Managing user data using Profiles administrative commands* for details.

ProfilesService.updateUserByUserId\(String userID, updated\_properties\_list\)
:   See *Managing user data using Profiles administrative commands* for details.

**Parent topic:**[Running Profiles administrative commands](../admin/t_admin_profiles_changing_admin.md)

**Related information**  


[Managing user data using Profiles administrative commands](../admin/t_admin_profiles_manage_users.md)

[Setting user roles for external collaboration](../admin/t_admin_profiles_set_roles.md)

[Running administrative commands](../admin/t_admin_common_edit_admin_props.md)

[Profiles configuration properties](../admin/r_admin_profiles_config_props.md)

[Administering application content](../admin/r_admin_common_superusers.md)

