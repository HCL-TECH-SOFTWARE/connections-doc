# Extension properties in the data model {#r_admin_profiles_attributes_ext .reference}

You can define a set of custom extension properties to further customize Profiles for your deployment’s unique needs.

## Extension properties { .section}

Each extension property is defined using a unique identifier. Declare extension properties in the `profileExtensionAttributes` section of the `profiles-config.xml` file.

The following extension properties types are supported:

-   Simple properties – a string value in the range of 0-256 bytes
-   Rich text properties – a rich text value in the range of 0-1,000,000 bytes
-   XML properties – an XML blob; if the attribute is marked for full text search then a series of element and attribute values may be defined for inclusion in the search index

The application will resolve all simple and rich text extension fields for the Profile. XML extension fields are not currently made available to the template author.

The following XML snippets provide examples of declaring an extension attribute for each type. These examples are assumed to be in the http://www.ibm.com/profiles-config namespace:

|Samples – Property declaration|Description|
|------------------------------|-----------|
|```
<profileExtensionAttributes>
  <simpleAttribute
      extensionId="college" length="256"/>
</profilesExtensionAttributes>
```|Defines a custom string property with the college identifier whose maximum length is 256 bytes.|
|```
<profileExtensionAttributes>
  <richtextAttribute 
      extensionId="publications"
      maxBytes="1000000"/>
</profilesExtensionAttributes>
```|Defines a rich text property with the publications identifier whose maximum length is 1,000,000 bytes.|
|```
<profileExtensionAttributes>
  <xmlFileAttribute 
      extensionId="catalog"
      schemaFile="catalog.xsd"
      indexBindingExpr="/catalog/entry/@name"
      <indexFields>
       <indexField 
         fieldName="catalogName"
         fieldExpr="/catalog/entry/@name"/>
   /xmlFileAttribute>
</profilesExtensionAttributes>
```|Defines a custom XML property with the catalog identifier. Instances of this property must validate against the supplied XSD file catalog.xsd. The administrator must place the catalog.xsd file in the Connections-config/profiles-extensions directory. In this example, a specific section is requested to be included in the Profiles search index with the field name catalogName. The value of the field, is resolved by the supplied XPath expression.|

You can also add a new extension field. In the following example a new extension field \(preferredFrenchName\) is defined that can be used as an additional given name or surname during directory search from within the Profiles application. The additional searchable name would be the value of the preferredFrenchName field.

1.  Stop the server.
2.  Modify the profiles-config.xml file and the tdi-profiles-config.xml to add the new extension field as follows:

    ```
    <simpleAttribute extensionId="preferredFrenchName" length="64" sourceKey="LDAP-attribute-name"/>
    ```

3.  Modify the profiles-types.xml file to add preferredFirstName and the extension field to the default profile-type as in the following example:

    **Note:** If you are using TDI, you must make this update to the profiles-types.xml file in your TDI solution directory.

    ```
            <property>
                <ref>preferredFirstName</ref>
                <updatability>readwrite</updatability>
                <hidden>false</hidden>
                <mapToNameTable>givenName</mapToNameTable>
            </property>
            <property>
                <ref>preferredFrenchName</ref>
                <updatability>readwrite</updatability>
                <hidden>false</hidden>
                <mapToNameTable>surname</mapToNameTable>
            </property>
    ```

4.  Modify LotusConnections-config\\profiles\\templates\\resources\\nls\\template\_en.properties to add a new field label for preferredFrenchName as follows:

    ```
    label.preferredFrenchName=Preferred French name
    ```

5.  Add the two new fields to the profileEdit.ftl as follows:

    ```
        <@util.renderFormControl ref="preferredFirstName" singleColumnLayout=false nlsKey="label.preferredFirstName"/>
        <@util.renderFormControl ref="preferredFrenchName" singleColumnLayout=false nlsKey="label.preferredFrenchName"/>
    ```

6.  Restart the server.
7.  To test, edit a user profile and set values for the person’s preferredFirstName andpreferredFrenchName. In Profiles, click the Directory tab and perform a search on the person’s preferredFirstName andpreferredFrenchName name.

-   **[Populating custom extension attributes](../customize/t_admin_profiles_populate_ext_attributes.md)**  
To map custom extension attributes to fields in your source LDAP directory, configure settings in the tdi-profiles-config.xml file for each custom extension attribute.
-   **[Enabling custom extension attributes for Profiles](../customize/t_admin_profiles_enable_custom_fields.md)**  
Extend the Profiles application by adding custom extension attributes.

**Parent topic:** [Customizing the Profiles data model](../customize/r_admin_profiles_attributes.md)

**Related information**  


[Creating a simple profile data model and template customization](../customize/t_admin_profiles_custom_example.md)

[Specifying properties to expose in the search index](../customize/t_admin_profiles_expose_props_search.md)

[Populating custom extension attributes](../customize/t_admin_profiles_populate_ext_attributes.md)

[Profile-types](../customize/r_admin_profiles_ovr_types.md)

