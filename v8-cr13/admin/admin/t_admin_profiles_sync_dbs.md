# Synchronizing user data between Profiles and the LDAP directory {#t_prof_sync_dbs .task}

When you allow users to make changes to certain fields in their profiles, the changes need to be copied from the Profiles database to the LDAP directory, if the field value originates in the LDAP directory.

You can ensure that data in the LDAP directory is kept current with Profiles by setting up a daemon that monitors changes made to specific fields in the Profiles database, and updates the LDAP server with those changes. For example, users in your organization might need to update a field such as their office phone number. The change then needs to be copied from Profiles to the LDAP directory. If the change is not copied to the LDAP directory, it will be overwritten the next time that the sync\_all\_dns command runs.

You define the fields to be monitored by the daemon in the profiles-config.xml file. When a user updates one or more of the monitored fields in Profiles, the changes are stored in a draft table in the Profiles database. The draft table is called EMP\_DRAFT.

The process\_draft\_updates\_ldap command starts the daemon, which monitors changes to the draft tables. When changes to the draft tables are detected, the daemon updates LDAP using the data in the draft tables. The daemon gets the LDAP connection information from the following properties in profiles\_tdi.properties:

-   monitor\_changes\_ldap\_server\_username
-   \{protect\}-monitor\_changes\_ldap\_server\_password
-   source\_ldap\_url
-   source\_ldap\_search\_base
-   source\_ldap\_search\_filter
-   source\_ldap\_use\_ssl \(set this to true if the URL port is 636\)

**Note:** The following procedure uses the Office Number field as an example. Other fields are similar, unless the fields are tied to extension attributes. Extension attributes are not covered in this topic.

1.  To ensure that changes that users make to the Office Number field in Profiles are updated in the LDAP directory:
2.  Open profiles-config.xml for editing and add telephoneNumber in a `<draftableAttribute>` element to the `<profileDataModel>` element.

    The new entry should look like this:

    ```
    <profileDataModel>
       <draftableAttribute>telephoneNumber</draftableAttribute>
    </profileDataModel>
    ```

    **Note:** Profiles must be restarted for this change to take effect.

3.  Open the file map\_dbrepos\_from\_source.properties and locate the property name that represents the Office Number, which in this case is telephoneNumber.

    If no value is assigned to the telephoneNumber property there is usually no need to copy the value back to the LDAP.

4.  Open the file map\_dbrepos\_to\_source.properties for editing and add the telephoneNumber property.

    The value for the telephoneNumber property is the name of the column in the EMPLOYEE table that stores the Office Number value. In this case, it is PROF\_TELEPHONE\_NUMBER. Your new entry should look like this:

    ```
    telephoneNumber=PROF_TELEPHONE_NUMBER
    ```

5.  Open the profiles\_tdi.properties file for editing and make sure that the following LDAP connection properties have valid values so that the daemon can access the LDAP directory.

    -   monitor\_changes\_ldap\_server\_username
    -   \{protect\}-monitor\_changes\_ldap\_server\_password
    -   source\_ldap\_url
    -   source\_ldap\_search\_base
    -   source\_ldap\_search\_filter
    -   source\_ldap\_use\_ssl \(set this to true if the URL port is 636\)
    The monitor\_changes\_ldap\_server\_username property must identify a LDAP user with LDAP update privileges. For this reason, it's a good idea to precede monitor\_changes\_ldap\_server\_password with \{protect\}-, which causes TDI to encrypt the password.

6.  Start the daemon by running the process\_draft\_updates\_ldap command:

    -   Linux™: chmod +x process\_draft\_updates\_ldap.sh./process\_draft\_updates\_ldap.sh
    -   Microsoft™ Windows™: process\_draft\_updates\_ldap.bat
    **Note:** The process\_draft\_update command tracks the database change record number in a persistent field. Your task will not run successfully if you clear the content of the EMP\_DRAFT table manually.


**Parent topic:**[Synchronizing the Profiles database with your organization's user data](../admin/t_admin_profiles_sync_ldap.md)

**Related information**  


[Changing Profiles configuration property values](../admin/t_admin_profiles_changing_config.md)

[Using the Profiles database as the user directory](../admin/t_enabling_directory_services.md)

[Activities administrative commands](../admin/r_admin_act_administrative_props.md)

[Configuring IBM HTTP Server](../install/c_add_ihs_over.md)

