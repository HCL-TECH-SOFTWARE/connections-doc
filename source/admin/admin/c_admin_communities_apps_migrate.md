# Migrating community apps {#c_admin_communities_apps_migrate .concept}

HCL Connections stores the apps that are created for a community in a database. As part of the Overview page customization, the mandatory user interface elements are being replaced with new apps that can be moved, hidden, or removed. Therefore, the Communities app is being updated to accommodate four new apps: Community Description, Tags, Important Bookmarks, and Members. The migration involves updating the database to add these new widgets for each community.

**Note:** This topic cannot be found in the help **Contents** or **Search**. To get to this topic again, you must click a link in the product.

**Parent topic:**[Administering widgets and remote applications](../admin/c_admin_communities_administering_widgets.md)

## Summary {#concept_nzh_p3s_1q}

To limit database migration time during an outage, a new background migration service is being introduced. The service keys off a new bit field column in the SNCOMM.COMMUNITY table. A background task polls for communities with any flag set.

## Background task versus community migration during access {#concept_f55_cks_1q}

A background task is required because a community might not be accessed for long periods of time. Because a background task is sufficient to perform a migration, this solution is the currently implemented migration method. Migration when a community is accessed might be implemented later.

## Reusing the HCL Connections scheduled task service {#concept_ujp_jls_1q}

The migration service reuses the existing scheduled task service. This reuse ensures that the task is run on only one server at a time. The task periodically queries for communities with nonzero migration flags. Communities-config.xml is updated.

## Schema changes {#concept_ks3_rms_1q}

In fix up scripts, the initial value for existing records has the WIDGETIZATION\_FLAG set. The createdb script uses default value of 0 - no flags set.

## API exposure {#concept_wcj_hns_1q}

Migrations are internal changes so exposure in the API is not necessary.

## Community Last Updated {#concept_zvt_jns_1q}

The migration service does not update the Community **last updated** or **last updated by** fields. Many migrations affect every community so the **last updated** or **last updated by** fields must remain unchanged.

