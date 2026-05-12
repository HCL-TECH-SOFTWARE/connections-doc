# Considerations for an in-place or hybrid upgrade {#c_inplace_upgrade_considerations .concept}

Both the in-place and hybrid approach use the Update function in IBM Installation Manager to apply 8.0 updates to a 7.0 server, preserving some of the existing configuration settings.

Alternatively, your deployment and needs might best align with a side-by-side upgrade. See [Considerations for a side-by-side upgrade](c_sbs_upgrade_considerations.md) to learn more.

**Note:** If you are on a release prior to 7.0, use the side-by-side method to upgrade to Connections 8.0 and to the latest CR. In such cases, additional database schema updates would be required. Refer to [Side-by-side upgrades](c_sbs_upgrade_container.md) for more information.

## Planning an in-place upgrade {#section_gtv_3cm_qqb .section}

While preserving known, working backups/snapshots is necessary in all types of Connections upgrades, it is particularly important when you are upgrading in-place on your production server. See [Backing up Connections](t_back-up.md) for more information.

## Planning a hybrid upgrade {#section_mxg_kcm_qqb .section}

This approach is a multi-stage process that requires setting up a new environment that mirrors production, upgrading and validating that environment, and migrating production data before routing client traffic to the new environment. To implement this, you will need to do the following:

-   Set up a new environment that mirrors the existing production environment. Ensure that the environment is sized appropriately as this will be the new production deployment, and adjust resources as needed. Specifically, all product versions need to initially be the same as in the existing environment.
-   Perform an in-place upgrade of Connections in the new environment.
-   Implement any configuration changes and customizations.
-   Validate product functionality.
-   Take the live production deployment offline to migrate data during a scheduled maintenance window.
-   Migrate data to the new environment and perform any necessary database updates.
-   Evaluate data integrity in the new environment now that production data is migrated.
-   Complete any remaining post-migration tasks.

!!! note
    
    If Component Pack is part of your deployment, the Connections 8.0 upgrade brings some additional configurations into play, like the OpenSearch configuration in LCC.xml. For a hybrid upgrade, it makes sense to implement some configuration changes in the new environment before performing the upgrade.

## Connections customizations {#section_qwk_qvr_qqb .section}

In both of the preceding approaches, some configuration changes from 7.0 are preserved, but there are still additional tasks to be aware of.

Your created widgets and customizations from 7.0 will most likely run without modification in Connections 8.0. Regarding customizations, this statement is true for the 7.0 feature set, both for features modified by “legacy” customizations on JSPs and theme elements like CSS, and for those modified “on the fly” by Connections Customizer. Nevertheless, it is strongly recommended that you run your upgrade without any customizations and apply these changes after validating that default upgrade.

The upgrade replaces deployed applications on your WebSphere Application Server. If you manually modified parts of an application \(like JSPs or language-related properties\) within the installedApps path on your server, make sure you back up these modifications before you run the upgrade. Afterwards, modify the default product again based on your requirements. While this kind of customization isn't recommended, this guideline might be relevant if you installed and modified Touchpoint on your existing deployment.

!!! tip
    
    For a list of customizations that you must manually migrate to the new environment in a side-by-side upgrade, see [Saving your customizations](c_configuration_changes_after_update.md).

Connections 8.0 has an updated user interface with new elements and styles. These modules need to be aligned with your customizations. It is highly recommended testing and enhancing the customizations according to the deployed Connections 8.0.

**Parent topic:** [In-place and hybrid upgrades](../migrate/c_inplace_upgrade.md)

