# Controlling cache operations {#t_admin_profiles_cache_operation .task}

Use Profiles administrative commands to control the operation of the full report-to chain cache without having to stop and start the Profiles server.

To run administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

The Profiles application uses an in-memory cache to support the organizational structure view available in every profile – the full report-to chain cache. You can use this procedure to change the behavior of the cache at run time. However, the changes that you make with this procedure are not permanently stored. To change the behavior permanently, change the configuration settings in the profiles-config.xml file. When the server is restarted, the settings that are specified in the configuration file overwrite any settings that were specified at run time. See *Configuring the full reports-to cache* for details. Use the following procedure to change the behavior of the organizational structure cache without having to stop and restart the server.

If you use the administrative commands to disable the cache, the reporting structure information is still available, but it displays more slowly.

1.  To control cache operations for Profiles, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly. For more information, see *Starting the wsadmin client*.

3.  Start the Profiles Jython script interpreter.

    1.  Use the following command to access the Profiles configuration files:

        ```
        execfile("profilesAdmin.py")
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

4.  Use the following commands to control cache operations.

    ProfilesService.enableFullReportsToCache\(startDelay, interval, schedTime\)
    :   Enables the full report-to chain cache with the specified start delay in minutes, refresh interval in minutes, and scheduled refresh time in HH:MM format.

        This cache is used to populate the full report-to chain view available in a user's profile. The cache contains the specified number of top employees in the organizational pyramid; it is not intended to store an entry for each profile. It stores the profiles of those people at the top of the chain who are included in many full report-to chain views.

        For example:

        ```
        ProfilesService.enableFullReportsToCache(5, 15, "23:00")
        ```

    ProfilesService.disableFullReportsToCache\(\)
    :   Disables the full report-to chain cache capability. This command does not take any arguments.

    ProfilesService.reloadFullReportsToCache\(\)
    :   Forces a reload of the full report-to chain cache from the Profiles database. This command does not take any arguments.

        **Note:** If the full report-to cache is disabled, it cannot be reloaded. This command fails when the cache is disabled.


**Parent topic:**[Administering cache](../admin/c_admin_profiles_cache.md)

**Related information**  


[Configuring the full reports-to cache](../admin/t_admin_profiles_configure_fullreportsto_cache.md)

