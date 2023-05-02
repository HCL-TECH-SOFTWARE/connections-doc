# Deleting or inactivating users in the Profiles database {#t_admin_profiles_delete_users .task}

You can use an IBM® Tivoli® Directory Integrator command to delete or inactivate users in the Connections Profiles database.

Use the delete\_or\_inactivate\_employees command to either delete or inactivate users from the Profiles database. When you delete users, only their data that's in the Profiles database is removed; their data in other Connections applications is not removed. When you inactivate users, their Profile is flagged as inactive, and only their email address and login ids are removed from the Profiles database. In both cases, whether delete or inactivate, users are marked as inactivated in the other Connections applications.

**Note:** When you use the delete\_or\_inactivate\_employees command, remember that the user data is still in LDAP or other sources. You must remove that data otherwise the users will be re-populated in Profiles at the next synchronization.

## Procedure

To delete or inactivate specific users from the Profiles database:

1.  Create a text file named delete\_or\_inactivate\_employees.in that contains the distinguished names and user IDs for the users that you want to delete from the database. Use the following format to represent a user:

    ```
    $dn:user\_dn
    uid:user\_uid
    .
    ```

    where:

    -   user\_dn corresponds to the PROF\_SOURCE\_UID in the Profiles database.
    -   user\_uid corresponds to the PROF\_UID in the Profiles database.
    **Note:** When deleting multiple users, there must be a period separator \(.\) between each entry. The period must be on its own line, after the line containing the user's UID. If the separator is omitted, an error occurs when you use the delete command.

    **Note:** The $dn value is not used, but it must be formatted correctly. Do not add a space after the colon and before the value.

    Here is an example of an entry from the delete\_or\_inactivate\_employees.in file:

    ```
    $dn:cn=Amy Jones3,cn=Users,l=WestfordFVT,st=Massachusetts,c=US,ou=Lotus,o=Software Group,dc=ibm,dc=com
    uid:Amy Jones3
    .
    $dn:cn=Amy Jones8,cn=Users,l=WestfordFVT,st=Massachusetts,c=US,ou=Lotus,o=Software Group,dc=ibm,dc=com
    uid:Amy Jones8
    .
    ```

2.  Place the file in the Tivoli Directory Integrator solution directory specified for your deployment.

    For more information, see *Configuring Tivoli Directory Integrator*.

3.  Run the delete\_or\_inactivate\_employees command to delete or inactivate the users from the database.

    The following table shows the properties that are used by the command and their default values. These properties can be found in the profiles\_tdi.properties file.

    Table 1. Properties used with the delete_or_inactivate_employees command

    |Property|Description|
    |--------|-----------|
    |delete\_or\_inactivate\_employees\_simple\_file|File that you created in Step 1, which lists the people to be deleted or inactivated. The default value is delete\_or\_inactivate\_employees.in.|
    |sync\_delete\_or\_inactivate|Specifies whether to delete or inactivate the people listed in the file specified using the delete\_or\_inactivate\_employees\_simple\_file property. The options are: <br></br> **delete**:   Deletes users from the Profiles database Their data in the Profiles database is removed. <br></br> **inactivate**:   Sets the person's status to inactive in the Profiles database. In addition, the user's email address and login ids are removed from the Profiles database. When you inactivate users, you can reinstate them later. See *Managing user data using Profiles administrative commands* for more details. An inactive person is identifiable in the product user interface because the person's name is dimmed. An inactive person’s name is not included in searches and membership selection fields. <br></br> The default value is inactivate.|


**Parent topic:** [Managing user data using Tivoli Directory Integrator Solution scripts](../admin/c_admin_profiles_updating_ldap.md)

**Related information**  


[Managing user data using Profiles administrative commands](../admin/t_admin_profiles_manage_users.md)

[Batch files for processing Profiles data](../install/r_TDI_batch_files.md)

[Configuring IBM Security Directory Integrator](../install/t_prof_install_tdi.md)

[Customizing the logic used for the delete operation](../admin/t_admin_profiles_customize_delete_logic.md)

