# Administering Search {#c_admin_homepage_search .concept}

The Search service provides a point for performing full text and tag searches across all the deployed HCL Connections applications. Search is a required application for all HCL Connections applications, and it must be running to prevent unexpected behaviors in the other applications.

HCL Connections Search is based on multifaceted search technology and uses related people, related dates, related tags, and source application facets. This information enables users to drill down into specific facets to find the content that they want without having to page through large numbers of results.

During the indexing process, bookmarks created in the Activities, Communities, and Bookmarks applications are indexed into the same document, and the details of the link, such as its tags, are used to supplement the document in the index. For example, a blog posting that was bookmarked in the Bookmarks application has facets for both Bookmarks and Blogs.

Search results in HCL Connections are based on the following facets.

|Facet|Description|
|-----|-----------|
|Date|The set of dates associated with the search results.This facet enables users to filter search results first by year, and then by year and month.

|
|Tags|The complete set of tags used for the full text result set, including tags associated with bookmarks created in the Bookmarks, Activities, and Communities applications.|
|Related people|The complete set of users associated with the full text result set. This facet includes associations mined from bookmarked content in Activities, Bookmarks, Communities, Files, Forums, and Wikis. Related people also include shared authors on blogs and people who have commented on blogs.|
|Source component|The HCL Connections application from which the results were retrieved.Users can filter results by source using the options at the side of the Search Results page.

|

These facets are calculated at indexing time for optimum performance at search time.

