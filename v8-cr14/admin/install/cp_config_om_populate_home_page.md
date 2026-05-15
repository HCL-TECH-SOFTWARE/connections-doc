# Populating the Top Updates home page {#cp_config_om_populate_home_page .concept}

Use the data migration tool to transfer data from Connections Profiles and Communities to populate the Top Updates tab on the user's home page.

## The data migration tool { .section}

This tool will migrate Connections Profiles data \(including report chain, networks and following data\) and Communities data \(including community membership and following data\) for all Orient Me users.

The data migration consists of two phases.

-   Phase one populates a migration tool database with all of the data for the specified Connections users.

-   Phase two performs the actual data migration by iterating over all users from the migration tool database and migrating their data for use with Orient Me.


1.  [Preparing to migrate data](../install/cp_config_om_prepare_migrate_profiles.md)  
To use the Top Updates tab on the user's home pagee, HCL Connections™ Profiles will need to be migrated from Connections to Orient Me. To do this, there is a migration tool. To prepare the migration tool, first you must complete the steps listed in the Populating the Orient Me page of this document.
2.  [Migrating the data for the Orient Me home page](../install/cp_config_om_migrate_profiles.md)  
Migrate data from Profiles and Communities to populate the Orient Me home page with content.

**Parent topic:** [Configuring the Orient Me component](../install/cp_config_om_intro.md)

