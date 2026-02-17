# Administering cache {#c_admin_profiles_cache .concept}

You can modify settings in the profiles-config.xml file to configure the full report-to and object caches for Profiles. Use Profiles administrative commands when you want to enable, disable, or reload the full report-to chain cache.You can modify settings in the profiles-config.xml file to configure object caches for Profiles.

Profiles can display organizational structure information using report-to cache settings. These settings determine how the cache that is used to store the full-report-to data is configured. For performance reasons, this cache is used to present report-chain information rather than accessing the corporate directory. If the cache is disabled, the reporting structure information is still available, but it displays more slowly.

Profiles uses the object cache to store auxiliary table information, including department, organization, work location, employee type, and country code display values. You can configure settings to specify when the cache is refreshed, and to define the refresh interval and start delay.

Refer to the following topics for more information about administering the Profiles caches:

-   **[Controlling cache operations](../admin/t_admin_profiles_cache_operation.md)**  
Use Profiles administrative commands to control the operation of the full report-to chain cache without having to stop and start the Profiles server.
-   **[Configuring the full reports-to cache](../admin/t_admin_profiles_configure_fullreportsto_cache.md)**  
The full reports-to cache is one of the two in-memory caches used by Profiles to support the organizational structure views.
-   **[Configuring the Profiles object cache](../admin/t_admin_profiles_configure_object_cache.md)**  
You can modify settings in the profiles-config.xml file to specify when the Profiles object cache is refreshed, and to define the refresh interval and start delay.

**Parent topic:** [Administering Profiles](../admin/c_admin_profiles_intro.md)

