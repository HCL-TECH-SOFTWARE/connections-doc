# Verifying Search index creation {#t_admin_search_verify_index_creation .task}

You can confirm that the initial Search index creation has completed successfully by checking for the presence of specific files in the index directory.

1.  To verify that the initial index creation is complete:
2.  Check that the INDEX.READY and CRAWLING\_VERSION files are present in the index directory.

    By default, the Search index is stored in the search/index subdirectory of the HCL Connections data directory defined at install time, for example, on Linux, /opt/IBM/Connections/data/local/search/index.

    Initial index creation is complete when both files are present in the index directory. Note that this means that the Search index is fully built; the social analytics index is not yet built.

    **If your deployment has a single Search node only**: No further action is required.

    **If your deployment has multiple Search nodes**: Verify that the Search index was successfully copied to the remaining nodes.


**Parent topic:**[Verifying Search](../admin/c_admin_search_verify_search.md)

**Related information**  


[Restoring the Search index](../admin/c_admin_search_restore_index.md)

[Configuring verbose logging](../admin/t_admin_search_enable_verbose_logging.md)

[Verifying that Search is crawling regularly](../admin/t_admin_search_verify_index_crawling.md)

[Verifying that the index is being built incrementally](../admin/t_admin_search_verify_incremental_index.md)

[Verifying file content extraction](../admin/t_admin_search_verify_file_content_extraction.md)

