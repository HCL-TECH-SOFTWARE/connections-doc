# Copying the activity stream search index to new nodes {#t_admin_news_copy_as_index .task}

When you add a node to the News cluster to ensure high availability for activity stream search requests, you must copy the activity stream search index to the new node. Before copying the index, ensure that you disable scheduled metadata collections.

1.  To copy the activity stream search index to a new node, complete the following steps.
2.  Access the Activity Stream Search Administration page by entering the following URL in your browser and logging in using your admin user credentials:

    http://server\_name/news/web/activityStreamSearchAdmin/activityStreamSearchAdmin.action

3.  Disable source metadata collection by selecting **More actions** \> **Disable Schedule**. This action stops future collections, but it does not delete existing metadata from the index.

4.  Copy the activity stream search index folder from an existing node to the new node by following these steps:

    1.  Log in to the Integrated Solutions Console and click **Servers** \> **Clusters** \> **WebSphere application server clusters**.

    2.  Click **cluster\_name**, where cluster\_name is the name of the News cluster.

    3.  In the Additional Properties area, expand **Cluster members** and then click **Details**.

    4.  In the table of cluster members, make a note of the nodes that host the cluster members.

    5.  Copy the activity stream search index folder from an existing node to the new node.

        The activity stream search index is located in the ActivityStream folder that is defined by the ACTIVITY\_STREAM\_SEARCH\_INDEX\_DIR WebSphere® Application Server variable.

        The default location of the variable is \\opt\\IBM\\Connections\\DataLocal\\news\\search\\index. The activity stream search index is located in the ActivityStream subfolder that is created under the path.

        See *Configuring activity stream search index settings* for information about how to configure the ACTIVITY\_STREAM\_SEARCH\_INDEX\_DIR variable.

5.  To reenable source metadata collection, return to the Activity Stream Search Administration page using the URL in step 1, and select **More actions** \> **Enable Schedule**.


**Parent topic:**[Activity stream search](../admin/c_admin_news_as_search.md)

**Related information**  


[Configuring activity stream search index settings](../admin/t_admin_news_config_as_index_settings.md)

[WebSphere Application Server environment variables](../admin/r_admin_common_was_env_variables.md)

