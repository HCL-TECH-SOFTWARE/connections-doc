# Configuring J2C authentication for Search {#t_search_configure_j2c .task}

When you install HCL Connections, the installation wizard automatically configures authentication and authorization for each application. Crawling content for indexing occurs over an internal REST API interface, and the credentials used are retrieved from the connectionsAdmin J2C authentication alias that is configured during installation. The user ID from the credentials is also added to the search-admin Java EE role for each application. If you want to further secure the HCL Connections environment, you can override this authentication alias on an application-by-application basis.

Search functionality depends on the ability of HCL Connections to index the data that is stored by each application. The JAAS/J2C alias that is configured at installation time allows automatic authentication for the user account that you assigned to the alias. This user account is also mapped to the Search administrator search-admin role for the application that you are configuring.

To override the connectionsAdmin J2C authentication alias for a specific HCL Connections application, you need to define a J2C authentication alias for that application using the IBM® WebSphere® Application Server Integrated Solutions Console. For information about how to define a search J2C authentication alias for an application, see *Switching to unique administrator IDs for system level communication*.

**Parent topic:**[Index settings](../admin/c_admin_search_index_settings.md)

**Related information**  


[Switching to unique administrator IDs for system level communication](../admin/t_admin_common_add_j2c_auth.md)

[Changing references to administrative credentials](../admin/t_admin_common_changing_admin_passwords.md)

[Roles](../admin/r_admin_common_user_roles.md)

