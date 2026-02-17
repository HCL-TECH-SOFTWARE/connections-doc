# Administering Bookmarks {#c_admin_dogerar_intro .concept}

You configure and administer Bookmarks using scripts accessed using the wsadmin client. Changes to Bookmarks configuration settings require a restart of the Bookmarks server before they take effect. Changes made using administrative commands take effect immediately.

There are two ways you can update your Bookmarks environment:

-   **Configuration settings:** These settings control various configurable applications within Bookmarks. They require a server restart to take effect, and they all have the following form: `DogearCellConfig.<command_name>(<arguments>)`.
-   **Administrative commands:**These commands control various aspects of the Bookmarks environment and community users. They do not require a server restart to take effect, and they take the following form: `<service_name>Service.<command_name, arguments>`.

When you make configuration changes, you use scripts to check out the Bookmarks configuration file, make changes, and then check the file back in.

When you use administrative commands to control the operation of a Bookmarks server, no file checkout is necessary and your changes take effect immediately.

Refer to the following sections for topics on administering bookmarks:

-   **[Running Bookmarks administrative commands](../admin/t_admin_dogear_changing_admin.md)**  
Run administrative commands from the wsadmin command line to directly interact with Bookmarks. You do not have to check out files or restart the server for changes to take effect.
-   **[Accessing the Bookmarks configuration file](../admin/t_admin_dogear_accessing_config.md)**  
To make configuration changes to a Bookmarks deployment you must first access the Bookmarks configuration file.
-   **[Changing the default favicon](../admin/t_admin_dogear_favicons.md)**  
You can change the default favicon for a Bookmarks deployment.
-   **[Changing the location of the favicon cache](../admin/t_admin_dogear_WAS_directories.md)**  
Change the default directory for the favicon cache from the IBM® websphere Application Server \(WAS\) administrator console.
-   **[Denoting sites as intranets](../admin/t_admin_dogear_intranet_site.md)**  
You can make changes to configuration settings to denote a Bookmarks site as an intranet. Changes to Bookmarks configuration settings require node synchronization and a restart of the Bookmarks server before they take effect.
-   **[Managing links](../admin/c_admin_dogear_manage_links.md)**  
As the Bookmarks administrator, you can remove broken or unwanted links, and configure what behavior is available to users for managing broken links.
-   **[Restrict link redirects](../admin/t_admin_dogear_restrict_redirect.md)**  
You can restrict link redirects to allow users to directly access URLs. This is an optional configuration change.
-   **[Managing multiple Bookmark buttons](../admin/t_admin_dogear_manage_bookmark_buttons.md)**  
If you are creating bookmarks on more than one server, you may have to rename your Bookmarks browser buttons to avoid conflicts.

**Parent topic:** [Administering](../admin/c_lc_admin_overview.md)

