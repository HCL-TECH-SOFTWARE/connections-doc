# Populating the Profiles database 

Populate the Profiles database with data from the LDAP directory.

-   Spend time planning your Profiles population, integration, and customization.
-   Involve all the relevant stakeholders at an early stage of the planning process.
-   If possible, release the Profiles rollout in phases and get feedback from pilot users.
-   Pre-populate Profiles photos.
-   Plan for business card use and for Sametime® presence awareness.
-   Ensure that IBM Security Directory Integrator is correctly configured.
-   Consider using Security Directory Integrator to populate the LDAP and then to populate the Profiles database.
-   If your database uses a database driver that requires Java 8, or you otherwise require Java 8 when running Security Directory Integrator, see this article for instructions: [Using IBM Security Directory Integrator with Java 8 and HCL Connections 6.5 or 7.0](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0094191). Then see the instructions that follow in this section. Note that you must use the manual population method when using Java 8, not the population wizards.

You have to create the Profiles database before installing HCL Connections so that the installer can link to it during the installation of Connections. Nothing gets written to the database during installation but all the databases have to exist. Performing user population is a recommended pre-installation task; however, you can perform the user population after the installation or in parallel with installation, depending on the size of your LDAP directory.

-   **[Configuring IBM Security Directory Integrator](../install/t_prof_install_tdi.md)**  
Configure IBM Security Directory Integrator to synchronize and exchange information between the Profiles database and your LDAP directory.
-   **[Adding source data to the Profiles database](../install/t_populate_profiles_db.md)**  
Populate the Profiles database with information from the source server by using the Profiles population wizard or by populating the database manually.
-   **[Populating Profiles with photos from LDAP](../install/t_install_profiles_import_photos_ldap.md)**  
You can use the IBM® Tivoli® Directory Integrator assembly-line command load\_photos\_from\_ldap to load the Profiles database with photos of your users.
-   **[Configuring the Manager designation in user profiles](../install/r_report-to_chains_profiles.md)**  
When you map manager data in the Profiles database, you can mark manager profiles and also create report-to chains.
-   **[Supplemental user data for Profiles](../install/r_prof_fill-tables.md)**  
You can supplement user profiles data using a mapping table, the profiles\_tdi.properties file, and CSV files.
-   **[Specifying the global ID attribute for users and groups](../install/c_specify_guid.md)**  
Decide if you will accept the default identifiers used by your LDAP directory server or create a custom attribute to be used as the global unique identifier \(GUID\) for each user. This identifier is unique across the organization and is used for synchronizing names in the LDAP directory with names in the Profiles database.
-   **[Optional: Specifying a custom ID attribute for users or groups](../install/t_specify_dif_guid.md)**  
Add custom global unique ID attributes in the LDAP directory to make user record changes easier to manage and to minimize the possibility of accidentally introducing dual accounts for a user. This is an optional task.

**Parent topic:** [Pre-installation tasks](../install/c_preinstall_actions.md)