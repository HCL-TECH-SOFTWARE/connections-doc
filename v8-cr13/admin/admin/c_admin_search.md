# Administering Search {#c_admin_search .concept}

The Search service provides a point for performing full text and tag searches across all the deployed HCL Connections applications. Search is a required application for all HCL Connections applications, and it must be running to prevent unexpected behaviors in the other applications.

HCL Connections Search is based on multifaceted search technology and uses related people, related dates, related tags, and source application facets. This information enables users to drill down into specific facets to find the content that they want without having to page through large numbers of results.

You can index up to 200 items. During the indexing process, bookmarks created in the Activities, Communities, and Bookmarks applications are indexed into the same document, and the details of the link, such as its tags, are used to supplement the document in the index. For example, a blog posting that was bookmarked in the Bookmarks application has facets for both Bookmarks and Blogs.

If you attempt to index more than 200 items, a message similar to the following example displays:

CLFRW1096I: Blog entry with id 187626bf-c10f-4357-8ef7-51a94ee0e1b7 has exceeded the indexable comment limit of 200 items; subsequent comments will be omitted from the index

Search results in HCL Connections are based on the facets described in Table 1.

|Facet|Description|
|-----|-----------|
|Date|The set of dates associated with the search results.This facet enables users to filter search results first by year, and then by year and month.|
|Tags|The complete set of tags used for the full text result set, including tags associated with bookmarks created in the Bookmarks, Activities, and Communities applications.|
|Related people|The complete set of users associated with the full text result set. This facet includes associations mined from bookmarked content in Activities, Bookmarks, Communities, Files, Forums, and Wikis. Related people also include shared authors on blogs and people who have commented on blogs.|
|Source component|The HCL Connections application from which the results were retrieved.Users can filter results by source using the options at the side of the Search Results page.|

These facets are calculated at search time for optimum performance. For more information, see the following topics:

-   **[Accessing the Search configuration environment](../admin/t_admin_search_access_config.md)**  
You need to initialize the Search configuration environment to be able to run the SearchCellConfig and SearchService MBean commands.
-   **[Managing the Search index](../admin/c_admin_search_manage_index.md)**  
The Search application uses a Lucene 3.0.3 index, supplemented by social facet information. The location of the Search index is mapped to an IBM® WebSphere® Application Server variable, SEARCH\_INDEX\_DIR. The value of this variable is set to CONNECTIONS\_DATA\_DIRECTORY/search/index by default.
-   **[Managing the Search application](../admin/c_admin_manage_search.md)**  
You can perform the following tasks when managing the Search application.
-   **[Viewing and collecting Search metrics](../admin/t_admin_search_statistics.md)**  
Enter a URL to view a standard set of metrics related to the Search application. You can also write internal search metrics to a file.
-   **[SearchCellConfig commands](../admin/r_admin_searchcellconfig_commands.md)**  
The SearchCellConfig commands are used to configure the location of the Search index and the IBM® LanguageWare® dictionaries used by Search, and to configure the file download and conversion service used when indexing file attachments.
-   **[SearchService commands](../admin/r_admin_searchservice_commands.md)**  
The SearchService commands are used to create, retrieve, update, and delete scheduled task definitions for the indexing and optimization Search operations.

**Parent topic:** [Administering](../admin/c_lc_admin_overview.md)

**Related information**  


[Troubleshooting Search](../troubleshoot/c_ts_search.md)

[Activity stream search](../admin/c_admin_news_as_search.md)

