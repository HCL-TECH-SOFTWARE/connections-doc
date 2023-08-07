# Changing WebSphere Application Server environment variables {#t_admin_common_change_was_env_variable .task}

The directory paths to HCL Connections application data and other resources are given associated WebSphere® Application Server environment variables. If you change default paths in your environment, you must update the variables.

The environment variables are given default values unless you change them during the product installation. See *WebSphere Application Server environment variables* for a list of the default values.

If, for example, you decide to move the directory associated with an application, such as the index directory for Bookmarks, to a different system driver, you can do so, but you must also update the environment variable defined for the Bookmarks index directory in WebSphere Application Server. It is important to update the environment variables because the application configuration files that define the behavior of the applications reference the directory paths using these environment variables.

1.  Using an administrator ID, log into the WebSphere Application Server Integrated Console associated with the profile to which you installed HCL Connections. If you installed the applications to multiple WebSphere Application Server profiles, log into the console associated with the appropriate profile.

2.  Expand **Environment**, and then click **WebSphere Variables**.

3.  Find the environment variable that you want to change and edit it from the list.

4.  Save and apply your changes, and then restart the server.


-   **[WebSphere Application Server environment variables](../admin/r_admin_common_was_env_variables.md)**  
Unless you change the directory paths during the installation, the default IBM® WebSphere environment variables are defined for HCL Connections application directories. These variables are referenced from the configuration files that are associated with the applications.

**Parent topic:**[System maintenance](../admin/c_admin_common_maintaining.md)

**Related information**  


[Setting the timeout for seedlist requests](../admin/t_admin_search_set_seedlist_timeout.md)

[Changing the location of the Search index](../admin/t_admin_homepage_change_index_location.md)

[Synchronizing user data by using administrative commands](../admin/c_admin_common_sync_via_admin_commands1.md)

[News repository error messages](../troubleshoot/r_error_codes_news.md)

