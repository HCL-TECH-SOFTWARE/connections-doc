# Administering Wikis {#administeringwikis .concept}

Configure and administer Wikis by using the wsadmin client to run administrative commands or by editing the configuration file directly.

Use the wsadmin client to run administrative commands to perform tasks that manipulate Wikis content. Changes that you make by using the wsadmin client take effect immediately. Edit the configuration file directly to control how and when various Wikis operations take place. Before changes to the configuration file can take effect, you must synchronize the nodes and restart the application server.

The following topics provide information about administering Wikis:

-   **[Changing Wikis configuration property values](../admin/t_admin_wikis_changing_config_properties.md)**  
Configuration properties control how and when various Wikis operations take place. You can edit the properties to change the ways that Wikis operates.
-   **[Running Wikis administrative commands](../admin/t_admin_wikis_run_commands.md)**  
Use administrative commands to perform tasks that manipulate Wikis content.
-   **[Backing up Wikis data](../admin/t_admin_wikis_backup.md)**  
Back up the data in your wikis.
-   **[Restricting attachment file types in Wikis](../admin/t_admin_wikis_restrict_types.md)**  
Restrict the types of files that users can upload as attachments in wiki pages.
-   **[Setting maximum sizes on media, pages, and attachments](../admin/t_admin_wikis_setting_maxsize.md)**  
You can set maximum sizes for media, pages, and attachments in the `wikis-config.xml` properties file.
-   **[Setting maximum sizes on libraries](../admin/t_admin_wikis_library_maxsize.md)**  
Use WikisLibraryService commands to set maximum sizes on libraries by assigning them a policy. A library is the pages, attachments, and other data that make up a wiki. A policy sets a maximum size for a library.
-   **[Working with Wikis policies](../admin/t_admin_wikis_policies.md)**  
Use the WikisPolicyService commands to add, edit, count, and return information about policies. You apply policies to libraries to set a maximum size on those libraries. A library is a set of files that are owned by a person or community.
-   **[Viewing Wikis library information](../admin/t_admin_wikis_library_info.md)**  
Use the WikisLibraryService commands to find information about Wikis libraries. A library comprises the pages, attachments, and other data that make up a wiki.
-   **[Filtering library lists](../admin/t_admin_wikis_filter_maps.md)**  
Use the WikisUtilService commands to filter lists of library maps that are returned by the WikisLibraryService.browseWiki command. You can filter a list of library maps by string value, date value, or number value.
-   **[Printing library information](../admin/t_admin_wikis_printing.md)**  
Use the WikisPrintService.saveToFile command to print information that is returned by other commands.
-   **[Disabling wiki page versioning](../admin/t_admin_wikis_disable_versioning.md)**  
By default, users can see all versions of a wiki page but you can disable versioning by editing the `wikis-config.xml` configuration file.
-   **[Deleting wikis from the system](../admin/t_admin_wikis_delete_user_data.md)**  
Use the WikisLibraryService delete commands to delete wikis.
-   **[Deleting draft wiki pages](../admin/t_admin_wikis_delete_user_drafts.md)**  
Delete unsaved changes to a user's wiki pages.
-   **[Finding the location of a stored attachment](../admin/t_admin_wikis_find_attachment_location.md)**  
Use the FilesUtilService.getFileById command to locate a file attachment in a directory.
-   **[Displaying file attachments inline](../admin/t_admin_wikis_enable_inline.md)**  
Configure Wikis to display file attachments inline instead of as attachments. This is useful when you download and display active content, such as Adobe® Flash \(.swf\) files, in your own HTML pages. Enable inline display by changing a configuration property in the `wikis-config.xml` file. Then change the attachment URLs to use inline parameter.
-   **[Search Engine Optimization \(SEO\) for Wikis](../admin/c_admin_wikis_SEO.md)**  
Manage Search Engine Optimization \(SEO\) so that your public wiki content is available from internet search engines and achieves a higher ranking in searches.

**Parent topic:** [Administering](../admin/c_lc_admin_overview.md)

**Related information**  


[Groups](../admin/c_admin_common_groups.md)

