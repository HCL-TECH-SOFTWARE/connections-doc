# Map a standard LDAP attribute for external users {#task_y2r_hrq_g4 .task}

Register an external user by editing the value of the mode property using 1:1 mapping.

The two valid values for mode are the strings internal and external. If the value of mode resolves to internal, then the user is recognized as an employee. If the value of mode resolves to external, then the user is recognized as an external user.

1.  Edit the value of mode in map\_dbrepos\_from\_source.properties so that it resolves to external.

    For example, memberType is the name of an LDAP attribute whose string value is "external".

    ```
    mode=memberType
    ```

2.  Append a string to an external user's display name that differentiates them from users who are part of your organization.

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


**Parent topic:**[Registering external users with Profiles](../admin/t_admin_profiles_external_user_script.md)

