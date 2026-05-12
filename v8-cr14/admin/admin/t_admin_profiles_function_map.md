# Map a standard LDAP attribute using JavaScript {#task_ejq_jsq_g4 .task}

Register an external user by deriving the value of the LDAP property that is mapped to mode from a JavaScript™ function \(complex mapping\).

The two valid values for mode are the strings internal and external. If the value of mode resolves to internal, then the user is recognized as an employee. If the value of mode resolves to external, then the user is recognized as an external user.

1.  In map\_dbrepos\_from\_source.properties, set the value of mode to be the result of a JavaScript function.

2.  Add the function to the file profiles\_functions.js.

    The function must resolve to either the string external or internal.

    For example, assume that all of the external members in your LDAP have employee numbers that begin with the character "V". This means that the value of employeeNumber is not a valid value for mode. To set mode, you must write a JavaScript function that returns the string external if the first character of an employeeNumber is "V". Otherwise, the function returns the string internal.

    -   Update mode in map\_dbrepos\_from\_source.properties.

        ```
        mode={func_check_first_char_for_V}
        ```

    -   Add the function to profiles\_functions.js. In this example, fieldName is the value of mode.

        ```
        function func_check_first_char_for_V(fieldName) {
                       var retval = "internal" ;      
        
                       //get employeeNumber - must be LDAP attr
                       var empNumber = work.getString( "employeeNumber" );
        
                       if (empNumber !=null)
                       {
                             if (empNumber.startsWith( "V" ))
                                    retval = "external" ;
                       }       
                       
                       return retval;
        }
        ```

3.  Append a string to an external user's display name that differentiates them from users who are part of your organization.

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

