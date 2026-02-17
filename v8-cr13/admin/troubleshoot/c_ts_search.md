# Troubleshooting Search {#c_ts_search .concept}

If you experience indexing issues, consider validating Search seedlists to help you identify the source of the problem. You can also configure settings to avoid out-of-memory issues or other problems caused by long response times from the Search application.

-   **[Troubleshooting Search FAQs](../troubleshoot/r_ts_search_faqs.md)**  
A list of the common troubleshooting issues and answers.
-   **[Validating Search seedlists](../troubleshoot/c_admin_search_validating_seedlists.md)**  
If you experience problems when indexing, you can validate Search seedlists to help you identify the source of the problem. You can validate Search seedlists using the browser or the wsadmin client.
-   **[Troubleshooting Search-related memory issues](../troubleshoot/t_troubleshooting_search_memory_issues.md)**  
You can configure settings in the LotusConnections-config.xml file to avoid out-of-memory issues or other problems caused by long response times from the Search application.
-   **[Analyzing results from the search serverStatus page](../troubleshoot/r_analyse_search_results_frame.md)**  
TheHCL Connections™ Search Engine provides the search serverStatus web page that you can use to troubleshoot search issues.
-   **[Troubleshooting when files content is not found after searching](../troubleshoot/t_ts_missing_files_content_after_search.md)**  
Connections uses the Apache Tika file conversion libraries for converting business documents from various types to plain text. The plain text is required before the content can be indexed. If search cannot find the content from a file, it could be due to an issue with this conversion from the business document format to plain text. This article describes some steps that can be used to troubleshoot this process.
-   **[Troubleshooting the "too many open files" error when updating the Search index](../troubleshoot/r_update_search_index_linux.md)**  
Attempts to update the HCL Connections™ Search index on Linux™ can result in the following error: `CLFRW0034E: Error reading or writing to the index directory. Please check permissions and capacity. java.io.FileNotFoundException: /opt/IBM/Connections/data/local/search/index/index_forums/_iu.fdt (Too many open files)`. This error means that users cannot search for content that is added to Connections.
-   **[Troubleshooting searches in multiple restricted communities](../troubleshoot/r_troubleshooting_restricted_comms.md)**  
Users who are members of many restricted communities may get incorrect search results.

**Parent topic:** [Troubleshooting tips](../troubleshoot/ts_c_ts_tips_overview.md)

**Related information**  


[Managing the Search index](../admin/c_admin_search_manage_index.md)

[Administering Search](../admin/c_admin_search.md)

[Verifying Search](../admin/c_admin_search_verify_search.md)

