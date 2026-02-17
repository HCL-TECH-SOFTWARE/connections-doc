# Index settings {#c_admin_search_index_settings .concept}

Indexing is automatically configured in HCL Connections. However, when setting up indexing for your environment, you might need to perform additional configuration tasks.

!!! Important 
    
    For non-English deployments, enabling multilingual support for Search is a mandatory post-installation step that needs to be performed before you start your HCL Connections Search server for the first time. Without multiple dictionary support, for languages other than English, Search will only return results where there is an exact match between the search term and content term. Enabling multiple dictionaries ensures better quality search results when your user base is multilingual. For more information about enabling multilingual support, see *Configuring dictionaries for Search*.

By default, the HCL Connections user interface is displayed in the language identified in the locale settings of the web browser being used. You can set it up to allow users to explicitly choose the language in which the product is displayed. For more information, see *Enabling users to set a language preference*.

You can also perform optional post-installation configuration tasks relating to indexing, such as configuring J2C authentication for Search or changing the location of the Search index.

For more information, see the following topics:

-   **[Enabling indexing resumption](../admin/t_admin_search_resume_crawls.md)**  
You can add a configuration setting to the search-config.xml file to specify that interrupted or failed indexing tasks are automatically resumed.
-   **[Configuring dictionaries for Search](../admin/c_admin_search_configure_dictionaries.md)**  
The Search application provides globalization support by using different dictionaries for different languages. Each dictionary file must be enabled in the Search configuration file before indexing. By default, only the English language dictionary is enabled during installation.
-   **[Changing the location of the Search index](../admin/t_admin_homepage_change_index_location.md)**  
By default, the Search index is stored in the search/index subdirectory of the HCL Connections data directory defined at install time, for example, on Linux®, /opt/IBM/Connections/data/local/search/index. This location can be changed by editing the IBM® WebSphere® Application Server variable, SEARCH\_INDEX\_DIR.
-   **[Configuring J2C authentication for Search](../admin/t_search_configure_j2c.md)**  
When you install HCL Connections, the installation wizard automatically configures authentication and authorization for each application. Crawling content for indexing occurs over an internal REST API interface, and the credentials used are retrieved from the connectionsAdmin J2C authentication alias that is configured during installation. The user ID from the credentials is also added to the search-admin Java EE role for each application. If you want to further secure the HCL Connections environment, you can override this authentication alias on an application-by-application basis.
-   **[Search and globalization](../admin/c_admin_search_globalization.md)**  
You can configure globalization settings to enable users to perform accent-insensitive searches, ignore punctuation in search terms, and perform a one-to-two mapping in search terms. Search globalization settings are disabled by default.
-   **[Enabling Additional Performance Tuning for Lucene](../admin/c_admin_search_performance_tuning.md)**  
An additional performance tuning parameter can be enabled to allieviate any issues with Lucene when indexing components that have larger amounts of entries.

**Parent topic:** [Managing the Search index](../admin/c_admin_search_manage_index.md)

**Related information**  


[Enabling users to set a language preference](../admin/t_admin_common_enable_lang_change.md)

