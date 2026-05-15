# Developing custom Tivoli Security Integrator assembly lines for Profiles {#c_admin_profiles_develop_custom_tdi_scripts .concept}

You can use Tivoli Security Integrator connectors to develop custom assembly-line scripts when you need to provide a specific type of function.

For example, if you do not want to populate Profiles with photos or pronunciation files using the standard method covered in *Adding supplemental content to Profiles*, you might want to use the Photo connector or Pronunciation connector as an alternative.

Tivoli Security Integrator connectors are components that are used to access and update information sources. Connectors allow you to build your assembly lines without having to handle the technical details of working with different data stores, systems, services, or transports. Each type of connector suppresses implementation details and specifically handles the details of data source access. For more information about programming Tivoli Security Integrator connectors, see the [SDI Reference Guide](https://www.ibm.com/support/knowledgecenter/SSCQGF_7.2.0.3/com.ibm.IBMDI.doc_7.2.0.3/welcome.html).

HCL Connections provides the following connectors:

-   Profile connector
-   Photo connector
-   Pronunciation connector
-   Codes connector

!!! note 
    
    The only supported methods for writing data or modifying data in the Profiles database are the following:

-   Using the supplied Profiles Tivoli Security Integrator assembly lines
-   Using the Profiles ATOM administrative API
-   Developing custom assembly lines using the Profiles TSI connectors

!!! important

    Writing directly to the Profiles database, including using Tivoli Security Integrator database connectors to do so, is not supported and can lead to data loss and application malfunction.

For more information about using these connectors, see the following topics:

-   **[Setting up your development environment](../admin/t_admin_profiles_config_tdi_dev_environment.md)**  
Use the IBM® Tivoli® Directory Integrator Configuration Editor to create custom Tivoli® Directory Integrator scripts. Set up the development environment so that the editor can access a separate set of the HCL Connections Profiles Tivoli® Directory Integrator connector source files than those used by the installed product.
-   **[Using a custom source repository connector](../admin/c_admin_profiles_create_custom_source_repos_connector.md)**  
By creating custom source repository connectors, you can integrate data from non-LDAP sources when you are populating Profiles with user data.
-   **[Using the ProfileConnector](../admin/t_admin_profiles_using_profile_connector.md)**  
Use the ProfileConnector to retrieve, create, update, and reset profile entries in the employee, profile extension, and other employee tables in the Profiles database. The connector flattens these tables into a single view of the profile data. The ProfileConnector can also be used to change the user state and change whether a user profile is listed as a manager. The ProfileConnector is the only supported way to perform these operations on a profile using IBM Security Directory Integrator as HCL Connections does not support the use of direct database access.
-   **[Using the PhotoConnector](../admin/t_admin_profiles_using_photo_connector.md)**  
Use the PhotoConnector to retrieve, create, update, and delete photo entries in the Photo table in the Profiles database.
-   **[Using the PronunciationConnector](../admin/t_admin_profiles_using_pronunciation_connector.md)**  
Use the PronunciationConnector to retrieve, create, update, and delete pronunciation entries in the Pronunciation table in the Profiles database.
-   **[Using the CodesConnector](../admin/t_admin_profiles_using_codes_connector.md)**  
Use the CodesConnector to retrieve, create, update, and delete code entries in various codes tables in the Profiles database.

**Parent topic:** [Administering Profiles](../admin/c_admin_profiles_intro.md)

**Related information**  


[Populating the Profiles database](../install/t_prof_install_profiles_db.md)

[Tivoli Directory Integrator Solution commands](../admin/r_admin_profiles_tdi_commands.md)

