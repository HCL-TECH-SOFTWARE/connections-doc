# Adding HCL Connections nodes to the Communities catalog {#t_admin_communities_catalog_add .task}

You can add HCL Connections nodes to an existing catalog in Communities. Whenever the main node stops operating, another node can automatically start collecting data.

When you add HCL Connections nodes to an existing Communities catalog, you must be sure that you disable scheduled metadata collections.

1.  Log in to HCL Connections as catalog administrator. See *Configuring the Communities catalog administrator* for information about how to configure this role.

2.  Go to Communities and select **Administration** from the navigation sidebar.

3.  Disable source metadata collection by selecting **More actions** \> **Disable Schedule**. This action stops future collections but does not delete existing metadata from the index.

4.  Copy the catalog index folder from an existing node to the new node by following these steps:

    1.  Log in to the Integrated Solutions Console and click **Servers** \> **Clusters** \> **WebSphere application server clusters**.

    2.  Click **cluster\_name**, where cluster\_name is the name of the catalog cluster.

    3.  In the Additional Properties area, expand **Cluster members** and then click **Details**.

    4.  In the table of cluster members, make a note of the nodes that host the cluster members.

    5.  Copy the catalog index folder from an existing node to the new node. The catalog index folder to copy is pointed to by the CATALOG\_INDEX\_DIR variable. For more information, see *Configuring Communities catalog settings*.

        The following path is an example only and might be different on your operating system:

        -   Linux™: /opt/IBM/Connections/DataLocal/catalog/index/Places
        -   Windows™: C:\\IBM\\Connections\\data\\local\\catalog\\index\\places
5.  To enable source metadata collection, select **More actions** \> **Enable Schedule**.


**Parent topic:**[Managing the Communities catalog](../admin/c_admin_communities_catalog.md)

**Related information**  


[Configuring Communities catalog settings](../admin/t_admin_communities_config_cat_settings.md)

[Configuring the Communities catalog administrator role](../admin/t_admin_communities_catalog_admin_role.md)

