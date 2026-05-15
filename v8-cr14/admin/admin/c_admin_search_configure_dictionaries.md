# Configuring dictionaries for Search 

The Search application provides globalization support by using different dictionaries for different languages. Each dictionary file must be enabled in the Search configuration file before indexing. By default, only the English language dictionary is enabled during installation.

Every language has its own specified dictionary file. Dictionaries that are marked as enabled in the Search configuration file are loaded into memory at server start time when the Search application is started.

!!! important 
    
    For non-English deployments, enabling multilingual support for Search is a mandatory post-installation step that needs to be performed before you start your HCL Connections Search server for the first time. Without multiple dictionary support, for languages other than English, Search will only return results where there is an exact match between the search term and content term. Enabling multiple dictionaries ensures better quality search results when your user base is multilingual.

Refer to the following topics for more information:

-   **[Enabling dictionaries](../admin/t_admin_search_configure_dictionary.md)**  
Use administrative commands to enable the dictionaries that you want to use with Search.
-   **[Listing enabled dictionaries](../admin/t_admin_search_list_dictionary.md)**  
Use the listDictionaries command to check which dictionaries are currently enabled for use with Search.
-   **[Setting the default dictionary](../admin/t_admin_search_set_default_dictionary.md)**  
Use administrative commands to set the default dictionary used for Search query strings.
-   **[Disabling dictionaries](../admin/t_admin_search_delete_dictionary.md)**  
If your organization no longer operates in specific geographies, you can streamline the operation of the Search application by disabling any dictionaries that are no longer needed.
-   **[Search language dictionaries](../admin/r_admin_search_dictionaries.md)**  
The Search application provides a number of language dictionaries.
-   **[Searching over Multiple Languages](../admin/c_admin_search_mult_language.md)**  
The Search application provides globalization support by using different dictionaries for different languages. Each dictionary file must be enabled in the Search configuration file before indexing. By default, only the English language dictionary is enabled during installation.

**Parent topic:** [Index settings](../admin/c_admin_search_index_settings.md)
