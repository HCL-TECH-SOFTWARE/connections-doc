# Customizing the Profiles data model {#r_admin_profiles_attributes .reference}

The Profiles application provides the social directory structure leveraged by all other HCL Connections™ applications. You can use a combination of standard properties and extension properties to customize the data in Profiles to meet the unique needs of your deployment.

## Customizing profiles { .section}

Each person in Profiles is described by a set of properties that are grouped into a type definition. The type definition can include standard properties that are defined by default, or you can add extension properties defined by you to meet your organization's needs.

**Note:** Mapping from the LDAP directory \(or other source\) to the Profiles database can also be customized, as can mapping from the Profiles database to the user interface. For more information on mapping LDAP data to Profiles database fields, see [Mapping fields manually](../install/t_prof_tdi_mapfields.md).

-   **[Standard properties in the data model](../customize/r_admin_profiles_attributes_std.md)**  
The Profiles component defines a set of standard properties to support common organization directory needs.
-   **[Extension properties in the data model](../customize/r_admin_profiles_attributes_ext.md)**  
You can define a set of custom extension properties to further customize Profiles for your deployment’s unique needs.
-   **[Profile-types](../customize/r_admin_profiles_ovr_types.md)**  
A profile-type defines a set of properties, also referred to as a schema, that are inherent to all profiles of that type. This set of properties is used internally to group objects and enforce overall system constraints. Examples of common profile-types are customer, employee, and contractor.
-   **[Specifying a custom field as required and declaring maximum field length](../customize/t_admin_profiles_specify_required_field.md)**  
You can make a custom field a required field by editing the validation.xml file. You must declare a maximum length definition for all custom fields.

**Parent topic:**[Customizing Profiles](../customize/c_admin_profiles_customizing.md)

**Related information**  


[Mapping fields manually](../install/t_prof_tdi_mapfields.md)

[Manually populating the Profiles database](../install/t_prof_populate_manual.md)

[Creating a simple profile data model and template customization](../customize/t_admin_profiles_custom_example.md)

