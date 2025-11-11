# Analyzing results from the search serverStatus page {#analyzingresultsfromthesearchserverstatuspage .reference}

The HCL Connections™ Search Engine provides the search serverStatus web page that you can use to troubleshoot search issues.

## Accessing the search serverStatus page { .section}

To access the search serverStatus page, your user ID must be added to the `search-admin` role for the Search service. To add this role, take the following steps:

-   Log in to the WebSphere administration console.
-   Click **Applications** \> **Application Types** \> **WebSphere enterprise applications**.
-   Click **Search** \> **Security role to user/group mapping**.
-   Click **search-admin** \> **Map Users**.
-   Search for the user you want to add to the role and click **OK**.

To access the search serverStatus page, browse to the following URL:

```
https://servername/search/serverStatus
```

!!! note
    The Search application uses the `search-admin` role to read public and private data for creating search indexes. Create a new user account solely for the `search-admin` role for the Search application.

The search serverStatus page highlights any configuration issues along with an analysis of the latest search logs for the node.

!!! note
    The primary function of search serverStatus page is to help debug issues on a system. The page is not a system monitoring tool.

!!! warning
    Do not add the `search-admin` role to a normal user account. The advanced search does not return any results for users having this role!

There are four status colors on the search serverStatus page

-   Fields that are highlighted in blue indicate the message that is returned is informational and no action is required.
-   Fields that are highlighted in green indicate that the value returned is configured correctly.
-   Fields that are highlighted in yellow indicate a warning. You should review these fields.
-   Fields that are highlighted in red indicates an issue. You should rectify these issues.

There are five tabs on the search serverStatus page you can use to help you troubleshoot issues:

-   **[Reviewing the Server Status tab](../troubleshoot/r_analyse_search_results.md)**
The Server Status tab checks the Search log file, the crawling version file, and the index ready file from the node that the request is sent to.
-   **[Reviewing the Initial Indexing Exceptions tab](../troubleshoot/r_review_initial_indexing_exceptions_tab.md)**
The Initial Indexing Exceptions tab returns any exceptions encountered when crawling the services during an initial index building task.
-   **[Reviewing the SystemOut Log Exceptions tab](../troubleshoot/r_review_systemout_tab.md)**
Any exceptions in the current SystemOut.log on this node are highlighted in a red text box.
-   **[Reviewing the Seedlists Validation tab](../troubleshoot/r_review_seedlist_validation_tab.md)**
The Seedlists Validation tab validates that the application seedlists can be accessed for search engine crawling.
-   **[Reviewing the SAND Validation tab](../troubleshoot/r_review_SAND_validation_tab.md)**
The SAND validation tabs checks the files needed for the SAND index are in place..

**Parent topic:**[Troubleshooting Search](../troubleshoot/c_ts_search.md)

