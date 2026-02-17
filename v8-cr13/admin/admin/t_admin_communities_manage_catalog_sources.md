# Managing Communities catalog sources {#t_admin_communities_manage_catalog_sources .task}

Perform management tasks for the Communities catalog by using the options available from the administrative user interface.

To manage the Communities catalog, you must log in as the catalog administrator. For more information about this role, see *Configuring the Communities catalog administrator*.

**Note:** In clustered environments, Communities catalog administration is on the primary node. If you see a message that says that the primary node is not available, you can switch the catalog administration to a secondary node.

1.  Log in to HCL Connections as the catalog administrator.

2.  Click any option under Communities and then click the **Administration** tab.

3.  Perform one or more of the following tasks:

    -   To see the number of items \(communities or places\), see the **Number of items** column.
    -   To see the status of a source \(available or not\), see the **Status** column.
    -   To edit a source, click **Edit Details**.
    -   To manage source metadata collection, click **More actions** and then perform any of the following tasks:
        -   To have this source crawled for new data to collect now, select **Collect Data**.
        -   To delete the metadata for the source from the index, select **Clear Data**.
        -   To disable future scheduled metadata collections, select **Disable Schedule**. This action stops future collections, but does not delete existing metadata from the index.

**Parent topic:**[Managing the Communities catalog](../admin/c_admin_communities_catalog.md)

