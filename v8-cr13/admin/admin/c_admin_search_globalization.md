# Search and globalization {#c_admin_search_globalization .concept}

You can configure globalization settings to enable users to perform accent-insensitive searches, ignore punctuation in search terms, and perform a one-to-two mapping in search terms. Search globalization settings are disabled by default.

!!! note 
    
    For non-English deployments, ensure that you first enable the relevant language dictionary for your geography. This procedure is a mandatory post-installation task. Without multiple dictionary support for languages other than English, Search will only return results where there is an exact match between the search term and content term. Enabling multiple dictionaries ensures better quality search results when your user base is multilingual. By default, only the English language dictionary is enabled during installation. For more information about enabling multilingual support, see *Configuring dictionaries for Search*.

When your organization spans multiple geographies and multiple languages, you might find it useful to enable the globalization options provided by the Search application. Note that when these options are enabled, Search requires more terms to be indexed, resulting in a larger Search index that contains the extra globalized terms. As more terms need to be indexed, this means that the indexing task will take longer to complete.

Search provides the following globalization options:

- **Accent-insensitive search**

    Allows users to search for equivalent non-accented search terms when using a search term that contains an accent.

    For example, the default behavior of the Search application is to index the term ált as a single term. However, when accent sensitivity is enabled, the term ált is stored in the index as "ált" and "alt".

- **Ignore Punctuation**

    Allows users to search for equivalent search terms without using punctuation in the search term that contains the punctuation.

    For example, the default behavior of the Search application is to index I.B.M. as a single term. However, when the ignore punctuation setting is enabled, the term I.B.M. is stored in the index as I.B.M. and IBM.

- **1 to 2 matching**

    Allows users to search for equivalent search terms using the stem of characters in the Search term.

    For example, the default behavior of the Search application is to index Müller as a single term. However, when the 1 to 2 matching setting is enabled, the term Müller is stored in the index as Müller and Mueller.

Enabling the globalization options results in a larger index. When you choose to enable these options, you must delete the current index to generate the creation of a new one. For more information, see *Deleting the index*.

Enabling these settings for Search also affects the relevance of the results returned when a search is performed. The default behavior is to return search results for a term based on an exact match of the term. However, if these globalization settings are enabled, more search results are returned to the user. For example, performing an accent-insensitive search for the term curé might return results for cure and curé. This type of search can lead to less relevant search results being returned to the user. The English translation of the French term cure is treatment, while curé is a priest.

For information about how to configure the globalization properties for Search, see *Common configuration properties*.

**Parent topic:** [Index settings](../admin/c_admin_search_index_settings.md)

**Related information**  


[Common configuration properties](../admin/r_admin_common_props.md)

[Deleting the index](../admin/t_admin_search_delete_index.md)

[Setting the default dictionary](../admin/t_admin_search_set_default_dictionary.md)

[Configuring dictionaries for Search](../admin/c_admin_search_configure_dictionaries.md)

