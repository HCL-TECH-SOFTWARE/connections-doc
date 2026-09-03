# Configuring Communities catalog settings {#t_admin_communities_config_cat_settings .task}

Follow these instructions to configure the catalog index folder and the catalog shared replication folder.

You need both a catalog index folder and a catalog shared replication folder when you add HCL Connections nodes to an existing catalog. The catalog index folder stores the actual index. You need one of these for each server. The catalog shared replication folder stores the changes that have been recently made to the index. You need one shared replication folder for each server cluster.

One node builds the index, stores it locally and saves a copy to the shared folder. The other nodes pick up the built index. Additional incremental indexes save the delta to the shared folder where other Communities nodes can pick up the change and merge it into their local copy.

1.  Log in to the IBM® WebSphere® Integrated Solutions Console.

2.  Expand **Environment** and select **Websphere Variables**.

3.  Change CATALOG\_INDEX\_DIR to the location of the local catalog index folder.

4.  Change CATALOG\_REPLICATION\_DIR to change the location of the shared replication folder.

    All nodes need access to this shared folder.

5.  Click **Save**.


**Parent topic:**[Managing the Communities catalog](../admin/c_admin_communities_catalog.md)

**Related information**  


[Configuring the Communities catalog administrator role](../admin/t_admin_communities_catalog_admin_role.md)

