# Configuring activity stream search index settings {#t_admin_news_config_as_index_settings .task}

You can update the default settings for the index folder and the shared replication folder for the activity stream search service.

The IBM® WebSphere® Application Server variables ACTIVITY\_STREAM\_SEARCH\_INDEX\_DIR and ACTIVITY\_STREAM\_SEARCH\_REPLICATION\_DIR define the location of the activity stream search index folder and the activity stream search replication folder respectively. The search index folder stores the actual index. You need one of these for each server. The shared replication folder stores the changes that have been recently made to the index. You need one shared replication folder for each server cluster.

The default directory path for the ACTIVITY\_STREAM\_SEARCH\_INDEX\_DIR and ACTIVITY\_STREAM\_SEARCH\_REPLICATION\_DIR variables on the cell scope is set when you install HCL Connections, and this definition is automatically used for every additional node. However, you can update the paths on the cell scope if you want to customize the default settings.

1.  From the IBM WebSphere Integrated Solutions Console, expand **Environment** and select **Websphere Variables**.

2.  Select **ACTIVITY\_STREAM\_SEARCH\_INDEX\_DIR**, enter the location of the local activity stream search index folder in the **Value** field, click **Apply**, and then click **OK**.

3.  Select **ACTIVITY\_STREAM\_SEARCH\_REPLICATION\_DIR**, enter the location of the shared replication folder in the **Value** field, click **Apply**, and then click **OK**.

    All nodes need access to this shared folder.


**Parent topic:**[Activity stream search](../admin/c_admin_news_as_search.md)

**Related information**  


[Copying the activity stream search index to new nodes](../admin/t_admin_news_copy_as_index.md)

[WebSphere Application Server environment variables](../admin/r_admin_common_was_env_variables.md)

