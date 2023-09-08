# Exposing information about following {#t_admin_profiles_expose_following_info .task}

You can add a setting to the profiles-config.xml file to specify whether information relating to the following feature is made public.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

When the following feature is enabled, users can follow other users to get the latest updates about them. By default, following information is private in the sense that only the logged-in user can view information about the people that they are following and the people who are following them. You can change this behavior to make following information public by adding a setting to the profiles-config.xml file.

1.  To expose following information, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  Start the Profiles Jython script interpreter.

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

4.  Open the profiles-config.xml file in a text editor.

5.  Add the following setting to the <properties\> section of the file:

    ```
    <property name="com.ibm.lconn.profiles.config.MakeFollowingInfoPublic" 
       value="true"/>
    ```

6.  Save your changes and close the configuration file.


**Parent topic:**[Configuring advanced settings in Profiles](../admin/c_admin_profiles_config_adv_settings.md)

**Related information**  


[Applying property changes in Profiles](../admin/t_admin_profiles_save_changes.md)

[Configuring the following feature](../admin/t_admin_profiles_configure_following.md)

