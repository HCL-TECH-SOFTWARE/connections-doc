# Considerations for an in-place or hybrid upgrade {#c_inplace_upgrade_considerations .concept}

Both the in-place and hybrid approach use the Update function in IBM Installation Manager to apply 7.0 updates to a 6.5 CR1 server, preserving some of the existing configuration settings.

Alternatively, your deployment and needs might best align with a side-by-side upgrade. See [Considerations for a side-by-side upgrade](c_sbs_upgrade_considerations.md) to learn more.

**Note:** If you are on a release prior to 6.5 and planning an in-place or hybrid upgrade, refer to the Knowledge Article [**Road map for Upgrading Connections**](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0076286) for guidance on first upgrading to 6.5. You will then need to apply [apply the 6.5 CR1 update](https://help.hcltechsw.com/connections/v65/admin/migrate/c_installing_fix-packs.html) and then can proceed with upgrading to 7.0.

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

**Note:** If Component Pack is part of your deployment, the Connections 7 upgrade brings some additional configurations into play, like the ElasticSearch7 configuration in LCC.xml. For a hybrid upgrade, it makes sense to implement some configuration changes in the new environment before performing the upgrade. See the whitepaper [Upgrading from Connections 6.5 to 7](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0090051) for more information.

## Connections customizations {#section_qwk_qvr_qqb .section}

In both of the preceding approaches, some configuration changes from 6.5 CR1 are preserved, but there are still additional tasks to be aware of.

Your created widgets and customizations from 6.5 CR1 will most likely run without modification in Connections 7. Regarding customizations, this statement is true for the 6.5 feature set, both for features modified by “legacy” customizations on JSPs and theme elements like CSS, and for those modified “on the fly” by Connections Customizer. Nevertheless, it is strongly recommended that you run your upgrade without any customizations and apply these changes after validating that default upgrade.

The upgrade replaces deployed applications on your WebSphere Application Server. If you manually modified parts of an application \(like JSPs or language-related properties\) within the installedApps path on your server, make sure you back up these modifications before you run the upgrade. Afterwards, modify the default product again based on your requirements. While this kind of customization isn't recommended, this guideline might be relevant if you installed and modified Touchpoint on your existing deployment.

**Tip:** For a list of customizations that you must manually migrate to the new environment in a side-by-side upgrade, see [Saving your customizations](c_configuration_changes_after_update.md).

Connections 7 comes with additional capabilities and UI elements, like Community Templates. These modules need to be aligned with your customizations, so testing and enhancing the customizations according to the deployed Connections 7 feature set is highly recommended. New features can be enabled step by step, so there is usually no need for a full and time-critical redesign all at once.

**Parent topic:**[In-place and hybrid upgrades](../migrate/c_inplace_upgrade.md)
