# Creating background indexes {#c_admin_search_create_bgd_index .concept}

By creating a background index, you can remove inconsistencies from your Search index without the need for downtime while the index is rebuilt. Background indexing involves three phases: crawling, file content extraction, and index creation.

You can run a sequence of SearchService admin commands for each phase of background indexing. The `SearchService.startBackgroundCrawl` command performs a background crawl of the Search seedlists, while the `SearchService.startBackgroundFileContentExtraction` command acts on up-to-date seedlists and extracts file content outside of the indexing process. The `SearchService.startBackgroundIndex` command creates a stand-alone index in a location that you specify.

You are not required to run `SearchService.startBackgroundCrawl` and `SearchService.startBackgroundFileContentExtraction` before running `SearchService.startBackgroundIndex`, however, you can do this if you want more control over each phase of the indexing process. If you run `SearchService.startBackgroundIndex` without executing `SearchService.startBackgroundCrawl` or `SearchService.startBackgroundFileContentExtraction` first, the `SearchService.startBackgroundIndex` command performs the same work as if you had executed the other commands beforehand.

Similarly, if you run `SearchService.startBackgroundFileContentExtraction` without executing `SearchService.startBackgroundCrawl` first, the `SearchService.startBackgroundFileContentExtraction` command performs the same work as if you had executed the `SearchService.startBackgroundCrawl` command beforehand.

Refer to the following topics for more information:

-   **[Performing a background crawl](../admin/t_admin_search_perform_bgd_crawl.md)**  
You can use a SearchService command to perform a background crawl of the Search seedlists without creating a Search index.
-   **[Extracting file content](../admin/t_admin_search_extract_file_content.md)**  
To speed up the indexing process, you can use a SearchService command that extracts file content in a process that is separate from indexing.
-   **[Creating a background index](../admin/t_admin_search_create_standalone_index.md)**  
Use the SearchService.startBackgroundIndex command to create a background index. Using this command helps you to remove inconsistencies from your Search index without the need for downtime while the index is rebuilt.

**Parent topic:** [Creating Search indexes](../admin/c_admin_search_create_indexes.md)

