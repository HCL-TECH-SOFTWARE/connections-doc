# Configuring the Profiles object cache {#t_admin_profiles_configure_object_cache .task}

You can modify settings in the profiles-config.xml file to specify when the Profiles object cache is refreshed, and to define the refresh interval and start delay.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

The Profiles object cache is used to cache auxiliary table information, including department, organization, work location, employee type, and country code display values. As a result, there is a delay before changes to these types of data are reflected in the user interface.

By default, the data is refreshed every 15 minutes to ensure that, whenever data is updated, there is a relatively short delay from when the data is changed and when the changes are reflected in the user interface.

1.  To configure the Profiles object cache, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly. For more information, see *Starting the wsadmin client*.

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

5.  Look for the `<profileObjectCache>` element, and then modify the following lines of code as needed:

    ```
    <profileObjectCache>
       <refreshTime>22:30</refreshTime> <!-- 24 hour time -->
       <refreshInterval>15</refreshInterval> <!-- minutes -->
       <startDelay>10</startDelay> <!-- minutes -->
    </profileObjectCache>
    ```

    where:

    -   <refreshTime\> is the scheduled refresh time in HH:MM format.
    -   <refreshInterval\> is the refresh interval in minutes.
    -   <startDelay\> is the specified start delay in minutes.
6.  Save your changes and close the configuration file.

7.  After making changes, you must check the configuration files back in, and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying property changes in Profiles* for information about how to save and apply your changes.


**Parent topic:**[Administering cache](../admin/c_admin_profiles_cache.md)

**Related information**  


[Applying property changes in Profiles](../admin/t_admin_profiles_save_changes.md)

