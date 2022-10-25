# Upgrading and updating {#c_upgrade_migrate_overview .concept}

Upgrade HCL Connections and its supporting software to the latest release and then update the installation with the latest interim fixes or cumulative fixes. Refer to the [What's New in HCL Connections](../overview/i_ovr_r_whats_new.md) to review the features in the latest release and gather download links or links to the latest fix list and update strategy information.

**Important:** If Feature Foundation is included in your HCL Connections 7.0 installation, both Rollback and Uninstall will fail in the IBM Installation Manager. Make sure you have a full backup of the Connections server before upgrading. Refer to [Backing up HCL Connections](https://help.hcltechsw.com/connections/v7/admin/migrate/t_back-up.html) for details. You can use this backup to restore your existing deployment if the upgrade or update fails.

The following sections provide background and instructions on the different approaches to upgrading Connections, as well as instructions for applying updates to the new version over time.

-   **[Getting ready for upgrading or updating](../migrate/t_prepare_migrate_upgrade.md)**  
Take steps to inform users and protect data before starting an HCL Connections upgrade or update.
-   **[Ways to upgrade to Connections 8](../migrate/c_3_ways_to_upgrade.md)**  
You can upgrade to HCL Connections 8.0 by by doing either a side-by-side or an in-place upgrade, or by taking an approach that is a hybrid of the two.
-   **[Side-by-side upgrades](../migrate/c_sbs_upgrade_container.md)**  
You can upgrade to Connections 7.0 by installing it in a new environment and then migrating data, configurations, and customizations from the existing production environment before switching over.
-   **[In-place and hybrid upgrades](../migrate/c_inplace_upgrade.md)**  
 With the Update function in IBM Installation Manager, you can upgrade the existing version of Connections to the next version, either in your production environment or in a in a new environment identical to production.
-   **[Enabling the Connections 8.0 user experience](../migrate/enabling_cnx8_ux.md)**  
If you are upgrading from previous versions of Connections to 8.0, the new user experience is initially disabled. This allows you to adopt the infrastructural benefits of Connections 8.0 – such as updated platform versions and security fixes – without any user disruption.
-   **[Updating Connections 8.0 with the latest fixes](../migrate/c_updating_interim_fixes.md)**  
There are two types of fixes for HCL Connections 8.0 - interim fixes \(iFixes\) and cumulative fixes \(CFixes\). iFixes address single issues, while cumulative fixes address groups of issues. Both iFixes and CFixes are installed in the same manner and will be referred to as "fixes" in the installation instructions.
-   **[Synchronizing nodes](../migrate/t_synch_updates.md)**  
Synchronize all the nodes in a cluster.

**Parent topic:**[Administering Connections 8.0](../welcome/welcome_admin.md)

