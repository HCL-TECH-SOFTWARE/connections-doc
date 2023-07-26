# Customizing login attributes {#t_admin_profiles_customize_login_attbs .task}

By default, Profiles looks at the login table and various login attributes in the Profiles database. To improve performance, comment out login attributes that are not used in your environment.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

Default mappings for uid and mail are provided. To use a mapping for loginId, replace ADMIN\_REPLACE in the loginField element with the appropriate login attribute specified in WebSphere® Application Server. This section should only contain those login attributes that will be used in a deployment. For example, if users only log in with email, then the mappings for uid and loginId should be commented out or removed.

For more information on enabling and disabling access, see [Forcing users to log in before they can access an application](../secure/t_admin_common_force_authentication.md).

**Note:** The login attributes described here refer to the Profiles database table, not the LDAP; the values you enter in the Admin Console refer to the LDAP. Thus if an LDAP field has been added using the Admin Console, you would not need to add it to the Profiles database using the procedure described here.

**Note:** When editing the login table in the Profiles database, you can comment out login attributes that you do not need, but you should not use the login table to add new login attributes.

1.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../admin/../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

2.  Start the Profiles Jython script interpreter.

    1.  Enter the following command to access the Profiles configuration files:

        execfile\("profilesAdmin.py"\) If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    2.  Enter the following command to check out the Profiles configuration files:

        ProfilesConfigService.checkOutConfig\("working\_directory", "cell\_name" where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied and are stored while you make changes to them. Use forward slashes \(/\) to separate directories in the file path, regardless of your operating system.

            **Note:** In order for the command to complete successfully, the directory must grant write permissions if you are using one of the following operating systems:

            -   Linux
            **Note:** The directory must grant write permissions or the command does not complete successfully.

        -   cell\_name is the name of the WebSphere Application Server cell hosting the Profiles application. This argument is required. It is also case-sensitive. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor: print AdminControl.getCell\(\)
        For example:

        -   Linux:

            ```
            ProfilesConfigService.checkOutConfig("/opt/prof/temp","foo01Cell01")
            ```

        -   Microsoft Windows:

            ```
            ProfilesConfigService.checkOutConfig("c:/prof/temp","foo01Cell01")
            ```

3.  Locate the Profiles configuration file, profiles-config.xml, in the local working directory specified in the checkOutConfig command. The Profiles configuration file contains the various configuration settings for the Profiles application. The following section of the file can be used for customizing login attributes:

    ```
    <loginAttributes>
    <loginAttribute>uid</loginAttribute>
    <loginAttribute>email</loginAttribute>
    <loginAttribute>loginId</loginAttribute>
    </loginAttributes>
    ```

    **Note:** The uid, mail, and loginId options are on the first side of the + in the map\_dbrepos\_from\_source.properties file and refer to data in the Profiles database table. The value on the other side of the = is the LDAP \(or function\) name.

    -   The uid value pertains to the EMPLOYEE PROF\_UID column.
    -   The email value pertains to the PROF\_MAIL column.
    -   The loginId value pertains to the EMPLOYEE PROF\_LOGIN column and the PROF\_LOGIN table and refers to the mappings loginId= and logins=. For example, you could set logins= to employee number.
4.  Comment out any attributes that are not used in your environment, as in the following example:

    ```
    <loginAttributes>
    <loginAttribute>uid</loginAttribute>
    
    <! -- The following login attribute is not used
    
    <loginAttribute>email</loginAttribute>
    
    -->
    
    <loginAttribute>loginId</loginAttribute>
    </loginAttributes>
    ```


**Parent topic:**[Customizing Profiles](../customize/c_admin_profiles_customizing.md)

**Related information**  


[Applying property changes in Profiles](../admin/t_admin_profiles_save_changes.md)

[Forcing users to log in before they can access an application](../secure/t_admin_common_force_authentication.md)

