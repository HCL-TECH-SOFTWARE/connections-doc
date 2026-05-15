# Use an LDAP branch to store external users {#task_r13_w5q_g4 .task}

If you store your external users in a separate LDAP branch, you can use that branch to populate the Profiles database with those users.

In this procedure you create a separate TDI solution directory for the LDAP branch that contains the external users. When you have a separate TDI solution directory, the process of synchronizing the Profiles database with your LDAPs is easier.

**Important:** Be sure to complete Step 1 in the procedure. If you do not complete Step 1, you will delete all users when you run the sync\_all\_dns command.

**Notes:**

1.  If you use a scheduled task or script to run synchronize commands, use a separate scheduled task or script for each directory.
2.  Any changes or fixes that you make to one TDI solution directory must be made to the other directory.

1.  Open profiles\_tdi.properties and verify that sync\_store\_source\_url is set to true. If sync\_store\_source\_url is set to false, you must change the value in accordance with the following instructions:

    1.  Set sync\_store\_source\_url to true.

    2.  Run sync\_all\_dns.

    3.  **Critical:** Locate sync\_source\_url\_enforce in the file profiles\_tdi.properties and set it to true.

        If you do not set sync\_source\_url\_enforce to true, you will most likely delete all users.

2.  Create a copy of the existing TDI solution directory parallel to the existing directory and name it TDI\_external.

3.  Rename the existing TDI solution directory from TDI to TDI\_internal.

4.  In the directory TDI\_external, edit the file profiles\_tdi.properties. Specify the LDAP branch by updating the following properties:

    -   source\_ldap\_url \(required\)
    -   source\_ldap\_search\_base \(required\)
    -   source\_ldap\_search\_filter \(optional\)
5.  In the directory TDI\_external, edit the file profiles\_tdi.properties to set the visitor properties.

    The following visitor properties must have values that are identical to the LDAP branch values that you set in the previous step.

    -   source\_ldap\_url\_visitor\_confirm
    -   source\_ldap\_search\_base\_visitor\_confirm
    -   source\_ldap\_search\_filter\_visitor\_confirm
    The visitor properties are referenced by the func\_mode\_visitor\_branch function in profiles\_functions.js to determine if the current LDAP branch is a visitor branch. If the value of the visitor properties is empty or if the properties are commented out, then users are added as employees instead of as external users.

6.  In the directory TDI\_external, edit the file map\_dbrepos\_from\_source.properties.

    1.  Comment out the line `mode=` if it exists.
    2.  Add or uncomment the line `mode={func_mode_visitor_branch}`. The func\_mode\_visitor\_branch function is in the file profiles\_functions.js.
7.  Append a string to an external user's display name that differentiates them from users who are part of your organization.

    For users that rely solely on a screen reader, adding this string helps them to identify which users are external users. The only other indication of external users is how their picture displays on the site. The default string that is appended to a name is `- External User`.

    1.  In the map\_dbrepos\_from\_source.properties file, comment out this line: `displayName=cn`
    2.  Add or uncomment these three lines:

        ```
        displayName={func_decorate_displayName_if_visitor}
        displayNameLdapAttr=cn
        decorateVisitorDisplayName= - External User
        ```

    3.  Customize the string that gets added to the display name. Modify the value of `decorateVisitorDisplayName` by replacing the string `- External User` with your custom string.

        **Note:** The string is not translated into other languages. If your installation of Connections supports more than one language, use a string that works in all languages.

8.  Populate the Profiles database with external users. In the directory TDI\_external, run the following commands, in order:

    1.  collect\_dns.bat or collect\_dns.sh
    2.  populate\_from\_dn\_file.bat or populate\_from\_dn\_file.sh
    For more information about the collect\_dns and populate\_from\_dn\_file commands, see *Manually populating the Profiles database*.


To keep your Profiles database synchronized with changes to the LDAP directory, run the sync\_all\_dns command in each TDS solution directory on a regular basis. For more information about synching, see *Synchronizing source changes such as LDAP with Profiles*. Also, make sure that sync\_source\_url\_enforce remains set to true in both places.

**Parent topic:**[Registering external users with Profiles](../admin/t_admin_profiles_external_user_script.md)

**Related information**  


[Synchronizing the Profiles database with your organization's user data](../admin/t_admin_profiles_sync_ldap.md)

[Manually populating the Profiles database](../install/t_prof_populate_manual.md)

