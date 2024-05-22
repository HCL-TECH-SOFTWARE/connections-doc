# Registering external users with Profiles {#task_pmn_mk2_14 .task}

Ensure that external users are recognized by populating them in the Profiles database via IBM® Tivoli® Directory Integrator.

The Profiles database must be enabled as the user directory and all users must be stored in the Profiles database. If the setting profiles\_directory\_service\_extension\_enabled is set to true in the LotusConnections-config.xml file, then the Profiles database is the user directory. This is enabled by default. For more information about setting the Profiles database as the user directory, see *Using the Profiles database as the user directory*.

External users must be populated into your organization's LDAP before they can be populated into Profiles.

CAUTION:

Some groups in your LDAP directory might contain external users. If a user adds this type of group to the membership of an internal community, external users will have access to the content of that community, and the community will not indicate that external users have access.

To avoid this risk, take one or more of the following steps:

-   Ensure that the LDAP directory that is used for external users does not contain groups.

-   If the LDAP directory that is used for external users already contains groups, configure the federated repositories settings in WebSphere Application Server so that it cannot find groups.

-   If the LDAP directory that is used for external users is the same one that is used for internal users, ensure that no external users are added to any groups in the directory. If external users are already present in groups in the directory, remove them.

-   If none of the preceding steps is possible, advise your users to add only those groups to communities that do not contain external users. For more information, see the *Managing external user access* topic.


Tivoli Directory Integrator synchronizes information between the Profiles database and your LDAP directory. In Tivoli Directory Integrator a member is considered either internal or external. An internal member is often referred to as an employee, and belongs to your organization. An external member is often referred to as a visitor, and is a person who is not part of your organization but can access some of your organization's content.

Once you register a user as either internal or external, you cannot change it. If you must update an external user so that they are registered as internal, then you must delete the external user and re-create that user as an internal user.

If you update Tivoli Directory Integrator to enable external users, then by default the string `- External User` is appended to the display name of an external user. This string makes it possible to identify which users are external users, and can be customized.

There are three ways to register a user. All methods set the value of mode to external to denote an external user. Choose the method that is appropriate for how your LDAP and environment are set up.

-   **[Map a standard LDAP attribute for external users](../admin/t_admin_profiles_ldap_map.md)**  
Register an external user by editing the value of the mode property using 1:1 mapping.
-   **[Map a standard LDAP attribute using JavaScript](../admin/t_admin_profiles_function_map.md)**  
Register an external user by deriving the value of the LDAP property that is mapped to mode from a JavaScript™ function \(complex mapping\).
-   **[Use an LDAP branch to store external users](../admin/t_admin_profiles_ldap_branch.md)**  
If you store your external users in a separate LDAP branch, you can use that branch to populate the Profiles database with those users.

**Parent topic:**[Managing external user access](../admin/c_admin_common_manage_ext_user.md)

**Related information**  


[Mapping fields manually](../install/t_prof_tdi_mapfields.md)

[Using the Profiles database as the user directory](../admin/t_enabling_directory_services.md)

[Sample complex mappings of Profiles data](../install/r_pers_complex_map_ex.md)

[Configuring the Manager designation in user profiles](../install/r_report-to_chains_profiles.md)

