# Migrating data and updating databases {#concept_gpg_y1v_4qb .concept}

After you've [created your databases](../install/c_install_db_over.md) in the new environment and installed Connections 8.0 and updated to the latest CR, move the existing Connections data to the new environment. Then update the databases to the Connections 8.0 structure and schema (**if needed**).

## Migrating existing Connections databases {#section_ztd_2bv_4qb .section}

In general, an \(offline\) process for moving your Connections 8.0 databases to your Connections 8.0 server is as follows:

-   Back up your Connections 7.0 databases and export them to the same server.
-   Move the exported databases to your Connections 8.0 database server, and restore them.
-   Back up the restored databases \(then remove they databases that you moved.\)

.

**Note:** Depending on your environment, you can also use an online process involving RDBMS backup/restore and then upgrade the database format. For Db2 however, offline full database backups as well as offline incremental database backups can be restored to a later database version, whereas online backups cannot.

<!--## Updating the migrated databases {#section_h5l_l2v_4qb .section}

Once the 7.0 databases are in the Connections 8.0  environment, you can follow the instructions for [Updating databases](t_update_databases-manual.md) to the Connections 8.0 structure and schema. These instructions are the same whether you are doing a side-by-side, in-place, or hybrid upgrade.-->

**Parent topic:**[Side-by-side upgrades](../migrate/c_sbs_upgrade_container.md)

