# Restoring the Communities catalog index {#t_admin_communities_catalog_nodes_clusters .task}

If the Communities catalog index becomes corrupted or is not being refreshed properly, you can delete the existing index data to rebuild the index.

The IBM® WebSphere® Application Server variables CATALOG\_INDEX\_DIR and CATALOG\_REPLICATION\_DIR define the location of the catalog index directory and the replication directory. If there are issues with the existing catalog index, you can restore it by deleting the contents of these directories. The catalog index is rebuilt when the next scheduled crawl takes place.

1.  Log in to HCL Connections as the catalog administrator.

2.  Go to Communities and select **Administration** from the navigation sidebar to open the Communities Catalog Administration page.

3.  Disable all the crawlers that are listed on the page by selecting **More actions** \> **Disable Schedule** for each crawler.

4.  Find the value of the CATALOG\_REPLICATION\_DIR and CATALOG\_INDEX\_DIR WebSphere Application Server variables.

    1.  Log in to the WebSphere Integrated Solutions Console.

    2.  Expand **Environment** and select **Websphere Variables**.

    3.  Look for the CATALOG\_REPLICATION\_DIR and CATALOG\_INDEX\_DIR variables and make a note of their respective locations.

5.  Stop the Communities application server.

6.  Navigate to the location specified by the CATALOG\_REPLICATION\_DIR variable and delete the contents of the directory.

7.  Navigate to the location specified by the CATALOG\_INDEX\_DIR variable and delete the contents of the directory.

8.  Repeat Step 7 for each node in the environment.

9.  Restart the Communities application server.

10. Return to the Communities Catalog Administration page and enable all the crawlers.


**Parent topic:**[Managing the Communities catalog](../admin/c_admin_communities_catalog.md)

**Related information**  


[Configuring the Communities catalog administrator role](../admin/t_admin_communities_catalog_admin_role.md)

