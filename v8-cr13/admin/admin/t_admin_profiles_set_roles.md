# Setting user roles for external collaboration

Assign the EMPLOYEE\_EXTENDED role to internal users who are allowed to create content that is visible to external users.

You must start the wsadmin client and load profilesAdmin.py in order to run the commands that set user roles. See *Starting the wsadmin client* and *Running Profiles administrative commands* for more information.

The user whose role you set must be registered with Profiles via IBM® Tivoli® Directory Integrator.

<!--By default, internal users cannot create content that is visible to external users. To allow collaboration between internal users and external users, you must assign the EMPLOYEE\_EXTENDED role to the internal users. Only users with the EMPLOYEE\_EXTENDED role can create content that can be shared with external users. However, the content can be shared by any internal user..-->

By default, internal users cannot create content that are visible to external users. To create content that can be seen by external users (such as VISITOR role), an internal user who is: 

- Assigned with an EMPLOYEE_EXTENDED role can directly interact and setup external facing applications. They can designate Communities, Activities, and Files as visible to the specified external users at the time of creation or upload.
- Not assigned with an EMPLOYEE_EXTENDED role, can also share and collaborate with external users if they are members of the external facing application instances (such as Communities and Activities) that have been setup by a user with an EMPLOYEE_EXTENDED role.

Additionally, internal (EMPLOYEE role) users can update and comment on Files shared with external users.

!!! note
    
    To remove the EMPLOYEE\_EXTENDED role from a user, assign the EMPLOYEE role or the DEFAULT\_ROLE role to that user. See *Profiles administrative commands* for more information about roles and the commands that you use for setting roles.

- Set a role for an individual user.

    You can identify the user with an email address or with an external ID.

    |**Option**|**Description**|
    |----------|---------------|
    |**ProfilesService.setRole\(String user\_email\_addr, String role\)**|Set the role using an email address.<br>```ProfilesService.setRole("<ajones277@example.com>", EMPLOYEE_EXTENDED)setRole Command processed user role 'employee.extended' for user <ajones277@example.com>```|
    |**ProfilesService.setRoleByUserId\(String user\_external\_id, String role\)**|Set the role using an external ID.<br>```ProfilesService.setRoleByUserId("8e88c240", EMPLOYEE_EXTENDED) setRole Command processed user role 'employee.extended' for user 8e88c240```|

    !!! note

        For ```ProfilesService.setRoleByUserId```:

        1.  You can use the ```getMemberExtIdByEmail\("email"\)``` or ```getMemberExtIdByLogin\("login"\)``` commands to retrieve the external ID of a user. For more information about these commands, see **Synchronizing user data using administrative commands**
        2.  Although the ID is shown here as an 8 digit hexadecimal number, an ID can be any format, such as a GUID. For example, ```ec8a89c0-f41d-102c-9b60-f225bc6c4af4```.

- Set the same role for multiple users.

    Assign the same role to a set of users by listing either user IDs or email addresses in a text file.
    
    -   role: The role to assign to each user in the list.
    -   filename: The name of the text file that contains the list of users. The file must be locally accessible from the client environment.

    !!! note
        
        If you are processing several hundreds of users, create several files and run them in separate commands.

    |**Option**|**Description**|
    |----------|---------------|
    |**ProfilesService.setBatchRole\(String role, String filename\)**|Assign the specified role to each user whose email address is listed in the text file. The text file must contain one valid email address per line.<br>```ProfilesService.setBatchRole(EMPLOYEE_EXTENDED, "profiles-roles-by-email.txt") setBatchRole request processed Command processed user role 'employee.extended' for users [ JonesA377@example.com, JohnSmith4@example.com, JaneR@example.com ]```|
    |**ProfilesService.setBatchRoleByUserId\(String role, String filename\)**|Assign the specified role to each user whose ID is listed in the text file. The text file must contain one valid user ID per line.<br>```ProfilesService.setBatchRoleByUserId(EMPLOYEE_EXTENDED, "profiles-roles-by-userid.txt") setBatchRole request processed Command processed user role 'employee.extended' for users [ 8d579540, 110f82c0, 5876de62, 5426de62 ]```|
        
    !!! note

        For ```ProfilesService.setBatchRoleByUserId```:
            
        1.  You can use the ```getMemberExtIdByEmail\("email"\)``` or ```getMemberExtIdByLogin\("login"\)``` commands to retrieve the external ID of a user. For more information about these commands, see **Synchronizing user data using administrative commands**
        2.  Although the IDs are shown here as 8 digit hexadecimal numbers, an ID can be any format, such as a GUID. For example, ```ec8a89c0-f41d-102c-9b60-f225bc6c4af4```.

## What to do next

Run one of the following commands to find out which role is assigned to a user.

- Retrieve the role that is associated with a user's email address by running the command `ProfilesService.getRoles(String user_email_addr)`.

    ```
    ProfilesService.getRoles("aalain@example.com")
    [employee]
    ```

- Retrieve the role that is associated with a user's directory ID by running the command `ProfilesService.getRolesByUserId(String user_external_id)`.

    ```
    ProfilesService.getRolesByUserId("ec8a89c0-f41d-102c-9b60-f225bc6c4af4")
    [employee.extended]
    
    ```

**Parent topic:** [Managing external user access](../admin/c_admin_common_manage_ext_user.md)

**Related information**  

[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Profiles administrative commands](../admin/r_admin_profiles_admin_props.md)

[Synchronizing user data by using administrative commands](../admin/c_admin_common_sync_via_admin_commands1.md)
