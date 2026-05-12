# Populating custom extension attributes {#t_admin_profiles_populate_ext_attributes .task}

To map custom extension attributes to fields in your source LDAP directory, configure settings in the tdi-profiles-config.xml file for each custom extension attribute.

1.  To populate custom extension attributes into the Profiles database, complete the following steps:
2.  Open the tdi-profiles-config.xml file.

    After the Tivoli® Directory Integrator solution files are extracted, the file is located in the following directory:

    TDI/conf/LotusConnections-config

3.  Modify the file to indicate the property to extend, the property's name, data type, and key. Use the following parameters:

    |Parameter|Description|
    |---------|-----------|
    |extensionId|The ID of the extension attribute.This parameter is required.

|
    |sourceKey|The name of the LDAP attribute that maps to the extension attribute.This parameter is required.

|
    |userLabel|An administrator-defined label for the extension attribute that is populated into the database. This string does not display in the user interface or API.This parameter is optional.

|
    |userTypeString|An administrator-defined string defining the data type of the extension attribute. This string does not display in the user interface or API.This parameter is optional.

|

    For example, to add an attribute called spokenLangs, the configuration would look similar to the following configuration in the profiles-config.xml file:

    ```
    <simpleAttribute extensionId="spokenLangs"
      length="64" 
      userLabel="Spoken Languages"
      userTypeString="String"
      sourceKey="spokenLang"/>
    ```

    **Note:** The formatting is compatible between the tdi-profiles-config.xml file and the profiles-config.xml file, allowing you to copy and paste configuration information between the files.

4.  Save your changes to tdi-profiles-config.xml and then close the file.

5.  In the directory TDI/conf/LotusConnections-config, open the file profiles-types.xml.

6.  Modify the file to add the new custom extension attribute.

    For example, to define the attribute called spokenLangs, the configuration would look similar to the following configuration:

    ```
    <property>
      <ref>spokenLangs</ref>
      <updatability>read</updatability>
      <hidden>false</hidden>
    </property>
    ```

    For more information about the format of profiles-types.xml, see [Profile-types](r_admin_profiles_ovr_types.md).

7.  Save your changes to profiles-types.xml and close the file.

8.  To populate the custom extension attributes, run one of the following scripts:

    -   -   Linux™:

    ```
    ./sync_all_dns.sh
    ```

-   Microsoft™ Windows™:

    ```
    sync_all_dns.bat
    ```

    -   -   Linux:

    ```
    ./populate_from_dn_file.sh
    ```

-   Microsoft Windows:

    ```
    populate_from_dn_file.bat
    ```


**Parent topic:**[Extension properties in the data model](../customize/r_admin_profiles_attributes_ext.md)

**Related information**  


[Extension properties in the data model](../customize/r_admin_profiles_attributes_ext.md)

[Profile-types](../customize/r_admin_profiles_ovr_types.md)

