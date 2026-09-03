# Managing the Communities catalog {#c_admin_communities_catalog .concept}

The Communities catalog displays content from IBM® Connections communities in the Communities application.

Sources are connections to servers or clusters that contain IBM Connections communities. The servers publish metadata about their communities and places, and sources collect that metadata in an index. Community metadata then displays in lists of communities in the **I'm an Owner**, **I’m a Member**, **I’m Following**, **I’m Invited**, **Trash**, and **My Organization Communities** views. By default, metadata is collected automatically on a schedule, but you can control collections for each source.

!!! note 

    Only places metadata is collected, not the actual community or place content.

The following topics provide information about managing the Communities catalog:

-   **[Configuring the Communities catalog administrator role](../admin/t_admin_communities_catalog_admin_role.md)**  
To add sources and manage the Communities catalog, you must be a catalog administrator.
-   **[Adding sources to the Communities catalog](../admin/t_admin_communities_add_catalog_sources.md)**  
Add sources to make HCL Connections communities available to users in the Communities catalog.
-   **[Managing Communities catalog sources](../admin/t_admin_communities_manage_catalog_sources.md)**  
Perform management tasks for the Communities catalog by using the options available from the administrative user interface.
-   **[Adding HCL Connections nodes to the Communities catalog](../admin/t_admin_communities_catalog_add.md)**  
You can add HCL Connections nodes to an existing catalog in Communities. Whenever the main node stops operating, another node can automatically start collecting data.
-   **[Configuring Communities catalog settings](../admin/t_admin_communities_config_cat_settings.md)**  
Follow these instructions to configure the catalog index folder and the catalog shared replication folder.
-   **[Restoring the Communities catalog index](../admin/t_admin_communities_catalog_recover_index.md)**  
If the Communities catalog index becomes corrupted or is not being refreshed properly, you can delete the existing index data to rebuild the index.

**Parent topic:**[Administering Communities](../admin/c_admin_communities_intro.md)

