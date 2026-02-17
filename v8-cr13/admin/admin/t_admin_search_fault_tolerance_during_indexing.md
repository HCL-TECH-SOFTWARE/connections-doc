# Checking fault tolerance during the initial indexing process {#t_admin_search_fault_tolerance_during_indexing .task}

Review the serverStatus web page to determine whether any exceptions occurred while building an initial index.

New functionality has been added to the Search service to build and copy an initial index to each node in the cluster. This functionality works even if all of the HCL Connections services cannot be fully crawled. See *Adding a Service to the Search index*. This functionality makes an index available for users while you resolve any issues encountered during the initial index build. After an initial index build takes place, you can review the serverStatus web page to determine whether any exceptions occurred while building an initial index.

1.  After HCL Connections is installed, an indexing task runs and an initial index is built.

2.  If an exception is found when crawling content from one or more services, the information that is needed to debug the problem is saved in the log file in the SEARCH\_INDEX\_DIR directory. The name of this file starts with "InitialIndexBuildLog" and the file extension is .json.

    **Note:** The information from this file is displayed on the serverStatus web page, for more information, see *Analyzing results from the search serverStatus page*.

3.  When index building completes, the index is copied automatically to each node in the cluster.

4.  Review the serverStatus page to identify any issues that are encountered during the index build process. On the serverStatus webpage, the crawling exceptions that are encountered during an initial index build are displayed under the **Initial Indexing Exceptions** tab. For more information, see *Analyzing results from the search serverStatus page*

5.  When the crawling exceptions are resolved for a service, the Search service attempts to re-crawl the service.

6.  If the service is crawled and indexed successfully, an updated index is copied to each node in the cluster.


**Parent topic:**[The indexing process](../admin/c_admin_search_index_process.md)

**Related information**  


[Analyzing results from the search serverStatus page](../troubleshoot/r_analyse_search_results_frame.md)

[Adding a service to the search index](../admin/t_search_add_service_to_index.md)

