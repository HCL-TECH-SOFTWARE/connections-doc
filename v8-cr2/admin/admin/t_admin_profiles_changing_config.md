# Changing Profiles configuration property values {#t_admin_profiles_changing_config .task}

Configuration settings control how and when various Profiles operations take place. You can edit the settings to change the ways that profiles behave.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

Configure Profiles using scripts accessed with the wsadmin client. These scripts use the AdminConfig object available in the IBM® WebSphere® Application Server wsadmin client to interact with the Profiles configuration file. Changes to configuration settings require node synchronization and a restart of the Profiles server before they take effect.

**Note:** There are no Profiles application administrative tools for adding or removing a user's profile. If you want to add or remove a profile for a person, you must add or remove that person's entry from the corporate LDAP directory system. Use that directory's native tools to create and delete user entries. When you perform standard synchronization tasks on the Profiles database, the profiles are updated. If you add a new user to the LDAP directory, a profile is created for that user. If you remove a user entry from the LDAP directory, that user's profile is removed. See *Synchronizing user data between Profiles and the LDAP directory* for more details.

To change Profiles configuration settings, complete the following steps:

1.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
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

3.  To change a Profiles configuration setting, use the following command:

    ProfilesConfigService.updateConfig\("property", "value"\)

    where:

    -   property is one of the editable Profiles configuration properties.
    -   value is the new value with which you want to set that property.
    For example, the following code disables the display of organizational information.

    ```
    ProfilesConfigService.updateConfig("organizationalStructure.enabled","false")
    ```

    See *Profiles configuration properties* for a complete list of editable properties.

4.  Repeat the previous step once for each property setting you want to change.


You must check the configuration files back in after making changes, and they must be checked in during the same wsadmin session in which they were checked out for the changes to take effect. See *Applying property changes* for details.

-   **[Profiles configuration properties](../admin/r_admin_profiles_config_props.md)**  
Configuration settings control various configurable applications within Profiles. They require a Profiles application or server restart to take effect.
-   **[Applying property changes in Profiles](../admin/t_admin_profiles_save_changes.md)**  
After you have edited Profiles configuration properties, check the changed configuration file in, and restart the server to apply your changes.

**Parent topic:**[Administering Profiles](../admin/c_admin_profiles_intro.md)

**Related information**  


[Synchronizing user data between Profiles and the LDAP directory](../admin/t_admin_profiles_sync_dbs.md)

[Applying property changes in Profiles](../admin/t_admin_profiles_save_changes.md)

[Configuring Profiles events](../admin/t_admin_profiles_configure_events.md)

