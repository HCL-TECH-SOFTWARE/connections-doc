# Profile-types {#r_admin_profiles_ovr_types .reference}

A profile-type defines a set of properties, also referred to as a schema, that are inherent to all profiles of that type. This set of properties is used internally to group objects and enforce overall system constraints. Examples of common profile-types are customer, employee, and contractor.

## Profile types { .section}

The set of properties reference your supplied standard properties or custom extension properties.

All profile records are classified by their profile-type property. If a property is not specified in a profile record's profile-type property definition, it is not exposed to the Profiles user, either in the user interface or API. The deployer uniquely identifies each profile type using a 64 byte profile-type identifier string.

Profile-type definitions are declared and managed in the profiles-types.xml file.

Profile-types are managed in an object hierarchy with the following rules:

-   Profiles defines a single base type of snx:personsnx:mtperson that enumerates the set of fields required on all profile records.
-   You can define subtypes of snx:personsnx:mtperson \(such as customer, employee, or contractor\) to add your own unique properties.
-   A profile-type inherits all the property references from its parent type.
-   A profile-type hierarchy cannot contain circular loops. The application will fail to start if any loops are detected in the configured hierarchy.
-   A profile-type declaration that omits a parentId implicitly inherits from snx:personsnx:mtperson.

    **Note:** There are important consideration when assigning profile type id values. These values will appear as URL parameters in the Profiles API, and should accordingly facilitate a valid URL encoding. The following rules will help avoid encoding issues in the API.

    -   Use ASCII characters and avoid special URL characters.
    -   Do not use spaces or plus symbols \(+\); there are known URL encoding problems specific to these characters.

The following XML code sample provides an example of declaring a profile-type that contains hierarchy and inheritance. The sample is assumed to reside in the http://www.ibm.com/profiles-types namespace.

|Sample – Profile-type declaration with hierarchy and inheritance|Description|
|----------------------------------------------------------------|-----------|
|```
<config>
  <type>
    <parentId>snx:person</parentId>
    <id>customer</id>
    ...
  </type>
</config>
```

```
<config>
  <type>
    <parentId>snx:mtperson</parentId>
    <id>customer</id>
    ...
  </type>
</config>
```

|Defines the profile-type identifier customer; this profile-type inherits from the system type snx:personsnx:mtperson. The customer type can add additional <property/\> declarations that reference your standard properties or extension properties or extension properties that were declared in the profiles-config.xml file.

|

## Profile-type property definitions { .section}

A profile-type property definition contains inherited property definitions and may contain additional property definitions. A valid profile-type property definition contains the following elements:

|Name|Type|Description|
|----|----|-----------|
|`ref`

|Enum

|References a standard profile data attribute or a globally defined extension attribute.

|
|`updatability`

|Enum

|Indicates if the value of this property can be updated. Options are:

-   read – specifies that the property value cannot be modified using either a user interface or API element. This is applicable for a system property that is either maintained or computed by the application, Tivoli® Directory Integrator, or the administrator API.
-   readwrite – specifies that the property value can be modified using either a user interface or API element.

|
|`hidden`

|Boolean

|If set to TRUE, the property is not serialized when rendering profile results in the application public REST API. The default setting is FALSE.

|
|`richText`

|Boolean

|If set to TRUE, the property is treated as rich text in the application. If the property references an extension attribute that was declared as richText, the value is always TRUE. Otherwise, the default setting is FALSE.

|
|`fullTextIndexed`

|Boolean

|If set to TRUE, and the property supports inclusion in the search index \(see [Standard properties in the data model](r_admin_profiles_attributes_std.md)\), the property is included in the search index for Profiles full text search. The default setting is TRUE for extension properties.

If set to FALSE, the standard or extension property value is omitted from the search index for profile records with a matching profile-type.

This property is only enforced if support for variable indexing of profile attributes is enabled. For more information, see [Specifying properties to expose in the search index](t_admin_profiles_expose_props_search.md).

|
|`mapToNameTable`

|Enum

|Indicates if this property value is intended as an additional given name or surname for use in a directory search from within the Profiles application.

-   surname – Specifies that the value of this property is added as a surname to the Profiles database for use in a simple directory search.
-   givenName – Specifies that the value of this property is added as a given name to the Profiles database for use in a simple directory search.
-   none – Specifies that this value is not mapped to a name field in the Profiles database and not used in a simple directory search.

The default value for this property is none for all fields except the following:

-   preferredFirstName - givenName
-   preferredLastName - surname

|

The following XML code sample provides an example of declaring a profile-type property definition. The sample is assumed to reside in the http://www.ibm.com/profiles-types namespace.

|Sample – Profile-type property definition|Description|
|-----------------------------------------|-----------|
|```
<property>
  <ref>telephoneNumber</ref>
  <updatability>readwrite</updatability>
  <hidden>false</hidden>
  <fullTextIndexed>true</fullTextIndexed>
</property>
```

|Adds the property identifier telephoneNumber to the associated profile-type.

The updatability=readwrite setting means that the property value can be modified using either a user interface or API element.

Thehidden=false setting means that the property is serialized when rendering profile results in the application public REST API; the property can be modified using the API.

The fullTextIndexed=true setting means that the property is included in the search index for Profiles full text search; it is added to the full text search index for profiles that are of this type.

|

-   **[Configuring profile types for widget layout](../customize/t_admin_profiles_add_profile_type.md)**  
To configure widget layout, you can add a profile type containing the widget layout configuration to Profiles in the widgets-config.xml file.
-   **[Person profile-type](../customize/r_admin_profiles_ovr_types_per.md)**  
Profiles defines a single snx:person base profile-type that all profile-types inherit from.
-   **[Default profile-type](../customize/r_admin_profiles_ovr_types_def.md)**  
To maintain compatability with earlier versions, Profiles maintains the concept of a default profile-type.

**Parent topic:**[Customizing the Profiles data model](../customize/r_admin_profiles_attributes.md)

**Related information**  


[Managing the Search index](../admin/c_admin_search_manage_index.md)

[Using the Profiles population wizard](../install/t_prof_populate.md)

[Manually populating the Profiles database](../install/t_prof_populate_manual.md)

[Extension properties in the data model](../customize/r_admin_profiles_attributes_ext.md)

