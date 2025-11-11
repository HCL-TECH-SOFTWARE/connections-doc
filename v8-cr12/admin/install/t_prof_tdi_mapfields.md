# Mapping fields manually {#t_prof_tdi_mapfields .task}

To populate the Profiles database with data from the enterprise LDAP directory, map the content of the fields in the database to the fields in the LDAP directory.

Edit the map\_dbrepos\_from\_source.properties file to map fields between the Profiles database and the LDAP directory. Open the profiles\_functions.js file to see the options for the different mapping functions. You can add your own functions if necessary.

**Note:** When you run the Profiles population wizard in interactive mode, it generates two property files in the Wizards\\TDIPopulation directory: a tdisetting.properties file and a mappings.properties file. The properties in mappings.properties are very similar to those in map\_dbrepos\_from\_source.properties.

To map fields, complete the following steps:

**Note:** In order to manually populate the Profiles database, ensure you have [Set up the Security Directory Integrator Solutions directory \(tdisol\)](t_setting_up_security_dir_integ_solutions_dir.md).

1.  Edit the properties files to define the mapping between the LDAP directory and the Profiles database. Consider using LDAP viewer software to help you map the fields. To define the mappings that are used when populating the Profiles database from the enterprise directory:

    1.  From the SDI Solutions \(tdisol/TDI\) directory, open the map\_dbrepos\_from\_source.properties file in a text editor.
    2.  Add or modify the field values. Any values that you omit or set to null are not populated in the database. You can modify the values in one of the following ways:

        1:1 mapping
        :   If one field in the Profiles database matches one field in the enterprise directory, type the name of the field in the Profiles database and set it equal to the associated source database LDAP property. For example:

            bldgId=buildingname

        Complex mapping
        :   If there is a more complex relationship between the fields in the Profiles database and enterprise directory, such as the content of the property in the enterprise LDAP directory must be split into multiple fields in the Profiles database, use a JavaScript™ function to define the relationship. Define the function in the profiles\_functions.js file and wrap the name of the JavaScript function in braces \{\}. Begin function names with func\_ so that you can more easily identify them. For example:

            bldgId=\{func\_map\_to\_db\_bldgId\}

        **Note:** See [Sample complex mappings of Profiles data](r_pers_complex_map_ex.md) for an example of complex mapping.

        **Notes:**

        -   The uid, guid, dn, surname, and displayName attributes are always required.
        -   See Table 2 for a list of the default values for the fields.
2.  Open the tdi-profile-config.xml file.

    After the Tivoli® Directory Integrator Solution files are extracted, the file is located in the following directory:

    TDI/conf/LotusConnections-config

3.  Modify the file to configure the extension attribute, specifying the property's name and mapping from the source. Use the following parameters:

    |Parameter|Description|
    |---------|-----------|
    |extensionId|The ID of the extension attribute.This parameter is required.

|
    |sourceKey|The name of the attribute from the source, which most often is LDAP.This parameter is required.

|
    |length|The maximum number of characters for the field.This parameter is required.

|

    For example, to add a simple attribute called spokenLangs, which is derived from the spokenLang source attribute, the configuration would look like the following extract from the tdi-profile-config.xml file:

    ```
    <profileExtensionAttributes>
      <simpleAttribute extensionId="spokenLangs" sourceKey="spokenLang" length="80"/>
    </profileExtensionAttributes>
    ```

    **Note:** The formatting between the tdi-profiles-config.xml and the profiles-config.xml files is compatible, so you can copy and paste configuration information between the files. For the extension to be displayed in the user interface, the modifications must be made in profiles-config.xml. For more information, see [Extension properties in the data model](../customize/r_admin_profiles_attributes_ext.md) in the [Customizing Profiles](../customize/c_admin_profiles_customizing.md) section.

    **Note:** To leverage the custom attribute in the Profiles user interface or REST API, you must configure the application per the instructions in the [Customizing Profiles](../customize/c_admin_profiles_customizing.md) section. For a detailed example that uses custom attributes, see [Creating a simple profile data model and template customization](../customize/t_admin_profiles_custom_example.md).

4.  Save your changes to the tdi-profiles-config.xml file.

5.  Add the property to the types hierarchy, which is contained in the file profiles-types.xml.

    You must add the property to both instances of profiles-types.xml. One instance is in the SDI solution conf/LotusConnections-config directory, and the other instance is in the primary LotusConnections-config directory. The property must be the same in both places. Using the spokenLangs example from previous steps, the property might look like the following example:

    ```
    <property>
       <ref>spokenLangs</ref>
       <updatability>readwrite</updatability>
       <hidden>false</hidden>
    </property>
    ```

6.  If the value of the extension attribute does not appear directly in LDAP, but instead is a function of one or more LDAP attributes, you must write a JavaScript function. The function must combine different attributes from your LDAP directory to map a customized extension attribute for the Profiles database.

    1.  Modify tdi-profiles-config.xml to make the sourceKey the same value as the extensionId.

        For example:

        ```
        <profileExtensionAttributes>
            <simpleAttribute extensionId="spokenLangs" sourceKey="spokenLangs" length="80"/>
        </profileExtensionAttributes>
        ```

    2.  Add the extension attribute function definition in the map\_dbrepos\_from\_source.properties file, using the following format:

        ```
        extattr.spokenLangs={func_map_to_langs}
        ```

        **Note:** In this example, the extension attribute is spokenLangs. The extension attribute must match the specified extensionId in the tdi-profiles-config.xml extension attribute definition.

    3.  Add a new func\_map\_to\_langs JavaScript function in the TDISolution\\TDI\\profiles\_functions.js file. Write logic for the function that specifies the new extension attribute mapping.

        In the following example, `work.getString("c")` retrieves the country code from the LDIF obtained from LDAP. All LDAP attributes are available. By default, the LDAP country code attribute is named "c", but it might be different in your environment.

        ```
        function func_map_to_langs(fieldName) {
          var country = work.getString("c");
          var retval = "Unknown";
        
          if ( country == "us" )
            retval = "English";
          elseif ( country == "fr" ) 
            retval = "French";
        
          return retval;
        }
        ```

    4.  Repeat these steps for each JavaScript function.


The properties in the map\_dbrepos\_from\_source.properties file have the default values defined in the following table. Many of them are null. You must determine which LDAP properties to map to your database fields and edit this file to specify values that apply to your configuration. Any values that you omit or set to null are not populated in the database.

**Note:** See [Attribute mapping for Profiles](r_attribute_mapping_profiles.md) for a table of additional attribute mapping field values.

|SDI property|Default LDAP attribute mapping|
|------------|------------------------------|
|alternateLastname|null|
|bldgId|null|
|blogUrl|null|
|calendarUrl|null|
|countryCode|c|
|courtesyTitle|null|
|decorateVisitorDisplayName|- External UserUsed with the visitor model. The value applies to all languages supported by the HCL Connections™ user interface. The text is not translated, and it is displayed to all users exactly as entered by you.

|
|deptNumber|null|
|description|null|
|displayName|cnRequired unless using the visitor model.

|
|displayNameLdapAttr|cnOptional unless using the visitor model.

|
|distinguishedName|$dn Required.

**Note:** By default the SDI Property distinguishedName is mapped to the $dn function which executes a DN lookup based on the directory type.

|
|email|mail|
|employeeNumber|employeenumber|
|employeeTypeCode|employeetype|
|experience|null|
|faxNumber|facsimiletelephonenumber|
|floor|null|
|freeBusyUrl|null|
|givenName|givenName|
|givenNames|gn|
|groupwareEmail|null|
|guid|See the note following this table for information about mapping the guid, uid, and loginId properties.Required

|
|ipTelephoneNumber|null|
|isManager|null|
|jobResp|null|
|loginId|See the note following this table for information about mapping the guid, uid, and loginId properties.|
|logins|null|
|managerUid|$manager\_uid This property represents a lookup of the UID of the manager using the Distinguished Name in the manager field.

|
|mobileNumber|mobile|
|mode|null|
|nativeFirstName|null|
|nativeLastName|null|
|officeName|physicaldeliveryofficename|
|orgId|ou|
|pagerId|null|
|pagerNumber|null|
|pagerServiceProvider|null|
|pagerType|null|
|preferredFirstName|null|
|preferredLanguage|preferredlanguage|
|preferredLastName|null|
|prof\_type|Common types are customer, employee, and contractor. See the *Profile-types* topic for details. See the note following this table for information about adding profile types.

|
|secretaryUid|null|
|shift|null|
|surname|sn The Search application expects to find this in the Profiles database.

Required.

|
|surnames|sn|
|telephoneNumber|telephonenumber|
|timezone|null|
|title|null|
|uid|See the note following this table for information about mapping the guid, uid, and loginId properties.

 Required.

|
|workLocationCode|postallocation|

**Mapping the guid, uid, and loginId:** The guid property identifies the global unique ID of a user. This property's value is created by the LDAP directory and is unique, complex, and never changes. It is essential in that it maps each user's HCL Connections data to their User ID when using the Profiles database as the user repository. The mapping of the guid property must be handled differently depending on the type of LDAP directory that you are using:

-   Microsoft® Active Directory

    guid=\{function\_map\_from\_objectGUID\}

    You must use a JavaScript function to define the value for Active Directory because objectGUID is stored in Active Directory as a binary value, but is mapped to guid, which is stored as a string in the Profiles database. Also, the samAccountName property used by Active Directory has a 20 character limit, as opposed to the 256 character limit of the other IDs used by HCL Connections.

-   IBM Lotus® Domino®

    guid=\{function\_map\_from\_dominoUNID\}

-   IBM Directory Server

    guid=ibm-entryUuid

-   Sun Java™ System Directory Server

    guid=nsUniqueID

-   Novell Directory

    guid=\{function\_map\_from\_GUID\}


If you edited the wimconfig.xml or LotusConnections-config.xml file to use a custom global unique ID, be sure to specify that custom ID here. If you specify an attribute here other than the default, you must edit the federated directory configuration to match the guid used here. See also [Specifying the global ID attribute for users and groups](c_specify_guid.md) and [Specifying a custom ID attribute for users or groups](t_specify_dif_guid.md). If the custom ID is different for users and groups, see [Configuring the custom ID attribute for users or groups](t_post-install_configure_dif_guid.md).

The uid property, not to be confused with the guid property, defines the unique ID of a user. This property differs from a guid in that it is the organization-specific permanent identifier for a user – often a login ID or some value based on the user's employee code. The uid is a critical field in the Profiles database. By default, this property links a given person's user record back to LDAP data. The value you map to uid must meet the following requirements:

-   It must be present in every entry that is to be added to the database.
-   It must be unique.
-   In a multi-LDAP environment, it must be unique across LDAP directories.
-   It must be 256 characters or fewer in length.

In Active Directory, although there often is a UID field available, this field is not always the best choice for mapping to uid because it is not guaranteed to be present for all entries. A better choice is sAMAccountName because it usually does exist for all entries. Other values are acceptable also, as long as they meet the requirements.

**Notes:**

-   If you are mapping the uid from an LDAP field, specify the name of the field. However, if you need to parse it from the distinguished name and it is in the DN in the form of uid=value, use the following mapping function:

    \{func\_map\_to\_db\_UID\}

-   Use the isManager and managerUid properties to set up the organizational structure of the organization. The isManager field determines whether the current person is a manager or not. You must assign a Y \(Yes\) or N \(No\) value to this property for each entry. Y identifies the person as a manager. The managerUid identifies the UID of the current person's manager. By default, managerUid is mapped to $manager\_uid, which represents a lookup of the UID of the manager \(using the Distinguished Name contained in the LDAP manager field\). If a user's manager information is not contained in the$manager\_uid field, you should adjust the mapping accordingly. These two properties work together to identify manager/employee relationships and create a report-to chain out of individual user entries.
-   If users intend to log into Profiles using a single-valued user name other than the value specified in the uid or email properties, you must map that user name value to the loginId property. To do so, complete the following step:

    -   Set the loginId property in the map\_dbrepos\_from\_source.propeties file equal to the LDAP property that you want to use as the login ID. For example, if you want to use employeeNumber as the login property, edit the property value as follows:

        loginId=employeeNumber

    If you have more than one additional login ID \(such as with a long and short form user ID\) and you want to allow users to login with either of their login IDs, you can populate multiple additional login IDs by using one of the following settings:

    logins=multiValuedLdapAttribute

    or

    logins=\{function\_to\_get\_multiple\_ldap\_values\}


For more information, see the[IBM Security Directory Integrator](https://www.ibm.com/docs/sdi/7.2.0) documentation.

**Adding profile types:**

HCL Connections supports the ability to classify a profile using a profile type. The profile type allows the application to provide the set of properties that are intended for a given profile object. For more information, see Profile-types.

-   **[Sample complex mappings of Profiles data](../install/r_pers_complex_map_ex.md)**  
These examples contains sample complex mappings using Javascript functions to define mapping between the LDAP directory and the Profiles database.

**Parent topic:**[Adding source data to the Profiles database](../install/t_populate_profiles_db.md)

**Related information**  


[Updating Profiles when changing LDAP directory](../admin/t_admin_profiles_change_ldaps.md)

[Customizing the Profiles data model](../customize/r_admin_profiles_attributes.md)

