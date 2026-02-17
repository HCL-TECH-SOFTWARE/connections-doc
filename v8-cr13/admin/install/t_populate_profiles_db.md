# Adding source data to the Profiles database {#t_populate_profiles_db .task}

Populate the Profiles database with information from the source server by using the Profiles population wizard or by populating the database manually.

The Profiles population wizard provides an interface to make it easier for you to populate the Profiles database with information from your LDAP directory. Alternatively, if you do not want to use the wizard, you can populate the database manually by manually updating the profiles\_tdi.properties file in the TDI directory.

**Note:** Although LDAP is the default source, and the only source supported by the Profiles population wizard, other sources are available if you are manually populating the Profiles database. See [Manually populating the Profiles database](t_prof_populate_manual.md) for more information.

**Note:** You can create custom TDI connectors to add, update, and synchronize your source data and Profiles database content. See topics such as [Developing custom Tivoli Security Integrator assembly lines for Profiles](../admin/c_admin_profiles_develop_custom_tdi_scripts.md) and [Using the ProfileConnector](../admin/t_admin_profiles_using_profile_connector.md) for more information.

1.  To populate the Profiles database with information from the LDAP server, do one of the following:

    -   Run the Profiles population wizard on the server where IBM® Tivoli® Directory Integrator is installed.
    -   Populate the Profiles database manually by updating the property values relevant to your configuration in the profiles\_tdi.properties file. For more information, see [Manually populating the Profiles database](t_prof_populate_manual.md).

-   **[Using the Profiles population wizard](../install/t_prof_populate.md)**  
Use the Profiles population wizard to populate the HCL Connections Profiles database with data from the LDAP directory.
-   **[Using the Profiles population wizard in silent mode](../install/t_silent_population_wizard.md)**  
You can run the Profiles population wizard in silent mode to populate the Profiles database.
-   **[Manually populating the Profiles database](../install/t_prof_populate_manual.md)**  
Instead of using the Profiles population wizard, you can manually populate the database.
-   **[Mapping fields manually](../install/t_prof_tdi_mapfields.md)**  
To populate the Profiles database with data from the enterprise LDAP directory, map the content of the fields in the database to the fields in the LDAP directory.
-   **[Attribute mapping for Profiles](../install/r_attribute_mapping_profiles.md)**  
When the Profiles directory service is enabled, IBM Connections relies on the Profiles database to provide user data such as user name, ID, and email.

**Parent topic:**[Populating the Profiles database](../install/t_prof_install_profiles_db.md)

**Related information**  


[Adding supplemental content to Profiles](../admin/c_admin_profiles_add_content.md)

