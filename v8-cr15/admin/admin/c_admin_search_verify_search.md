# Verifying Search {#c_admin_search_verify_search .concept}

You can perform a number of steps to verify that Search index creation has completed successfully and the Search application is working as expected.

When you install HCL Connections, Search indexing is automatically configured to run according to a default schedule. You can confirm that the initial index creation has completed successfully by checking for the presence of specific files in the index directory. You can also verify that Search is crawling on a regular basis and that incremental indexing is taking place as expected by checking for specific log messages in the SystemOut.log file.

-   **[Verifying Search index creation](../admin/t_admin_search_verify_index_creation.md)**  
You can confirm that the initial Search index creation has completed successfully by checking for the presence of specific files in the index directory.
-   **[Verifying that Search is crawling regularly](../admin/t_admin_search_verify_index_crawling.md)**  
Crawling is the process of accessing and reading content from each application to create entries for indexing. You can verify that the Search application is crawling on a regular basis by checking for specific log messages in the SystemOut.log file.
-   **[Verifying that the index is being built incrementally](../admin/t_admin_search_verify_incremental_index.md)**  
You can verify that incremental indexing is taking place as expected by checking for specific log messages in the SystemOut.log file.
-   **[Verifying file content extraction](../admin/t_admin_search_verify_file_content_extraction.md)**  
Verify that the Search application is extracting file content on a regular basis by checking entries in the SystemOut.log file.
-   **[Configuring verbose logging](../admin/t_admin_search_enable_verbose_logging.md)**  
Use SearchCellConfig commands to configure verbose logging for the Search application.
-   **[Verifying that index building is not taking place](../admin/t_admin_search_verify_no_index_building.md)**  
After disabling or deleting an indexing task, you might want to verify that Search indexing is not taking place.

**Parent topic:** [Managing the Search index](../admin/c_admin_search_manage_index.md)

**Related information**  


[Search error messages](../troubleshoot/r_error_codes_search.md)

[Troubleshooting Search](../troubleshoot/c_ts_search.md)

