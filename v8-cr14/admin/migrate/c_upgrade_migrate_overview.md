# Upgrading and updating {#c_upgrade_migrate_overview .concept}

Upgrade HCL Connections and its supporting software to the latest release and then update the installation with the latest fixes or cummulative refresh (CR) . Refer to the [What's New in HCL Connections](../overview/i_ovr_r_whats_new_cr4.md) to review the features in the latest release and gather download links or links to the latest fix list and update strategy information.

**Important:** If Feature Foundation is included in your HCL Connections 8.0 installation, both Rollback and Uninstall will fail in the IBM Installation Manager. Make sure you have a full backup of the Connections server before upgrading. Refer to [Backing up HCL Connections](https://help.hcltechsw.com/connections/v8/admin/migrate/t_back-up.html) for details. You can use this backup to restore your existing deployment if the upgrade or update fails.

The following sections provide background and instructions on the different approaches to upgrading Connections, as well as instructions for applying updates to the new version over time.
CR

- **[Getting ready for upgrading or updating](../migrate/t_prepare_migrate_upgrade.md)**  
Take steps to inform users and protect data before starting an HCL Connections upgrade or update.
- **[Ways to upgrade to Connections 8.0](../migrate/c_3_ways_to_upgrade.md)**  
You can upgrade to HCL Connections 8.0 by doing either a side-by-side or an in-place upgrade, or by taking an approach that is a hybrid of the two.
- **[Side-by-side upgrades](../migrate/c_sbs_upgrade_container.md)**  
You can upgrade to to the latest Connections 8.0 CR by installing it in a new environment and then migrating data, configurations, and customizations from the existing production environment before switching over.
- **[In-place and hybrid upgrades](../migrate/c_inplace_upgrade.md)**  
 With the Update function in IBM Installation Manager, you can upgrade the existing version of Connections to the next version, either in your production environment or in a in a new environment identical to production.
- **[Updating Connections 8.0 with the latest fixes](../migrate/c_updating_interim_fixes.md)**  
Install the latest fixes for HCL Connections.
- **[Updating HCL Connections 8.0 with the latest Cumulative Refresh](../migrate/c_installing_fix-packs.md)**  
Updates for HCL Connections 8.0 are delivered through Cumulative Refreshes \(CRs\). Each refresh contains the changes included in all previous refreshes or interim fixes for a release..
- **[Synchronizing nodes](../migrate/t_synch_updates.md)**  
Synchronize all the nodes in a cluster.

**Parent topic:** [Administering Connections 8.0](../welcome/welcome_admin.md)

