# Restoring the activity stream search index {#t_admin_activity_stream_recover_index .task}

If the activity stream search index becomes corrupt or is not being refreshed properly, you can delete the existing index data to rebuild the index.

The IBM® WebSphere® Application Server variables ACTIVITY\_STREAM\_SEARCH\_INDEX\_DIR and ACTIVITY\_STREAM\_SEARCH\_REPLICATION\_DIR define the location of the activity stream search index directory and replication directory respectively. If there are issues with the existing activity stream index, you can restore it by deleting the contents of these directories. The index is rebuilt when the next scheduled crawl takes place.

**Note:** In a clustered environment, ACTIVITY\_STREAM\_SEARCH\_REPLICATION\_DIR is a shared folder whereas ACTIVITY\_STREAM\_SEARCH\_INDEX\_DIR exists on each one of the servers.

1.  To access the Activity Stream Search Administration page, enter the following URL in your browser and log in using your admin user credentials:

    ```
    http://server_name/news/web/activityStreamSearchAdmin/
       activityStreamSearchAdmin.action
    ```

    There is no link provided from the HCL Connections user interface, you must access the page using the direct URL.

2.  Disable all the crawlers listed on the page by selecting **More actions** \> **Disable Schedule** for each crawler.

3.  Find the value of the ACTIVITY\_STREAM\_SEARCH\_REPLICATION\_DIR and ACTIVITY\_STREAM\_SEARCH\_INDEX\_DIR WebSphere Application Server variables.

    1.  Log in to the WebSphere Integrated Solutions Console.

    2.  Expand **Environment** and select **Websphere Variables**.

    3.  Look for the ACTIVITY\_STREAM\_SEARCH\_REPLICATION\_DIR and ACTIVITY\_STREAM\_SEARCH\_INDEX\_DIR variables and make a note of their respective locations.

4.  Navigate to the location specified by the ACTIVITY\_STREAM\_SEARCH\_REPLICATION\_DIR variable and delete the contents of the directory.

5.  Navigate to the location specified by the ACTIVITY\_STREAM\_SEARCH\_INDEX\_DIR variable and delete the contents of the directory.

6.  Return to the Activity Stream Search Administration page and enable all the crawlers.


**Parent topic:**[Activity stream search](../admin/c_admin_news_as_search.md)

