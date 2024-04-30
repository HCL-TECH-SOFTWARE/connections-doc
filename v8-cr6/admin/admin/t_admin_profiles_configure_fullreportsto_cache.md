# Configuring the full reports-to cache {#t_admin_profiles_configure_fullreportsto_cache .task}

The full reports-to cache is one of the two in-memory caches used by Profiles to support the organizational structure views.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

The other in-memory cache is the object cache, which caches auxiliary table information, including department, organization, work location, employee type, and country code display values.

The full reports-to cache is used to populate the full reports-to chain view available in a profile. The cache contains the specified number of top employees in the organizational pyramid. It is not intended to store an entry for each profile; it stores the profiles of those people at the top of the chain who are included in many full report-to chain views.

When you use this procedure to change the default behavior of the cache, it changes the behavior permanently, but requires a server restart. If you want to change the cache behavior in a production environment without having to disrupt service, see *Controlling cache operations*. But, any changes you make to the runtime cache are overwritten by the setting in the configuration file when the server next restarts.

1.  To manage the display of report-chain information using the full reports-to cache, complete the following steps.
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

4.  To configure the full reports-to cache, use the following command:

    ProfilesConfigService.updateConfig\(property, value\)

    where

    -   property is one of the editable Profiles configuration properties.
    -   value is the new value with which you want to set that property.
    The following table displays information regarding the properties that you can configure for the full reports-to chain cache, and the type of data that you can enter for them.

    |Option|Description|
    |------|-----------|
    |fullReportsToChainCache.enabled|Enables or disables the full reports-to cache.This property takes a Boolean value: true or false. The value must be formatted in lowercase.

|
    |fullReportsToChainCache.ceouid|The corporate directory user ID of the person who will appear at the top of the organizational structure.This property takes a UID value.

|
    |fullReportsToChainCache.size|The number of employee entries that should be loaded into the cache.This property takes an integer value.

|
    |fullReportsToChainCache.refreshTime|Determines the time of day in 24-hour time format that Profiles performs the first scheduled reloading of the cache.The property value must be expressed in hours and minutes using this formatting: HH:MM.

|
    |fullReportsToChainCache.refreshInterval|The time in minutes between cache reload operations.This property takes an integer value.

|
    |fullReportsToChainCache.startDelay|The time in minutes that Profiles should wait after starting before loading the cache for the first time.This property takes an integer value.

|

    For example, to disable the cache, enter:

    ```
    ProfilesConfigService.updateConfig("fullReportsToChainCache.enabled","false")
    ```

5.  After making changes, you must check the configuration files back in, and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying property changes in Profiles* for information about how to save and apply your changes.


**Parent topic:**[Administering cache](../admin/c_admin_profiles_cache.md)

**Related information**  


[Applying property changes in Profiles](../admin/t_admin_profiles_save_changes.md)

[Controlling cache operations](../admin/t_admin_profiles_cache_operation.md)

