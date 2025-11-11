# Optional: Specifying a custom ID attribute for users or groups {#t_specify_dif_guid .task}

Add custom global unique ID attributes in the LDAP directory to make user record changes easier to manage and to minimize the possibility of accidentally introducing dual accounts for a user. This is an optional task.

By default, HCL Connections uses the default `guid` or a custom global unique identifier that you specified in [Specifying the global ID attribute](c_specify_guid.md) for users and group to identify users and groups in the LDAP directory. The identifiers assigned by LDAP directory servers are usually unique for any LDAP entry instance. If the user information is deleted and re-added, or exported and imported into another LDAP directory, the `guid` changes. Changes like this are usually implemented when employees change status, a directory record is deleted and added again, or when user data is ported across directories.

When the `guid` of a user changes, you must synchronize the LDAP with the Profiles database before that user logs in again. Otherwise, the user will have two accounts in HCL Connections and the user's previous content will appear to be lost as it is associated with the previous `guid`. If you assign a fixed attribute to each record, you can minimize the possibility of accidentally introducing dual accounts for a user in HCL Connections.

A custom ID must meet the following requirements:

-   The ID must be static and unique. It must not be reassigned across users and groups in the directory.
    -   The custom ID chosen must be globally unique across all time. In other words, the value of an ID must not be assigned to one user today and then a different user sometime in the future. The ID is used to reference a user for security and access control, so reuse of an ID may accidentally grant a user permissions to content previously available to a prior user with the same ID.
    -   The custom ID chosen must be stable for a particular user over the life of that user. That is, a user should not have one ID today and a different ID at some time in the future. Changing a user's ID might result in loss of access to content and references to that user reporting that the user is not found or no longer exists.
    -   These requirements generally makes a login name \(such as jsmith\) or e-mail \(jsmith@example.com\) a poor choice for a custom ID. Since these attributes are frequently recycled as different users join and leave an organization,jsmith may not reference the same user today and into the future. Since this attribute is used in access control lists, the use of login name, email or similar attributes that are recycled might result in a future user getting access to a current user's private communities and content. Connections will store that jsmith has access to content if that is used as the value of the ID. Whom jsmith refers to might change over time. If this occurs, a new user might get access to content unintentionally because a prior jsmith had access.
-   The ID must not exceed 256 characters in length. To achieve faster search results, use a fixed-length attribute for the ID.

    **Note:** If you are planning to install the Files or Wikis application, the ID cannot exceed 252 characters in length. Values of IDs are compared frequently, so you should choose reasonably compact values for performance. The lengths of default ID values range from approximately 16-to-36 bytes.

-   The ID must have a one-to-one mapping per directory object. You cannot use an attribute with multiple values as a unique ID.

As long as the value is stable over time and not reused, a good choice for a custom ID might be a global employee or customer ID that you generate and assign to individuals in your directory. An LDAP's `guid`, the default for the ID attribute, might or might not be a good choice, depending on how it is populated in your directory and how your organization uses LDAP. If you frequently delete and then recreate LDAP entries for the same user but want the old and new entry to represent the same user, you might need to specify a custom ID. Other considerations for choosing a custom ID are as follows:

-   Avoid using attributes containing family names or other information that can change due to personal events. An employee's family name might change as a result of a change in marital status or other reasons. Such a change obviously does not affect the employee's security role, but it would have the unintended effect of cause the employee's ID to change, leading to losing access.
-   Avoid using attributes containing a work group name or other information that can change due to organizational events. A work group's name or reporting structure might change, but this does not necessarily affect the work group's or its members' security role and certainly does not mean the user should be a new user in the system. So these events should not impact ID values, and such attributes are not good ID attribute choices.
-   The template or procedure to recreate or restore users and groups must ensure identical ID values, including the case of characters and the use of any filler spaces. Most LDAP servers can be configured to be case-insensitive and ignoring filler spaces, but this is not always the case.
-   ID values for distinct users and groups should differ by more than just the case of characters. Depending on the LDAP server and your configuration, your system might reject an entry if it contains the same value of an existing entry except for characters in different cases. Or it might add a system-generated prefix to make the new entry distinguishable. Either way leads to undesirable results.

The wimconfig.xml file governs a single ID attribute for all supported objects such as users, groups, and organizations in WebSphere® Application Server. You can use the LotusConnections-config.xml to override the ID attribute in the wimconfig.xml file. For example, you could use the wimconfig.xml file to specify the **ibm-entryUUID** attribute as the ID Key attribute for users and groups in all applications running on WebSphere Application Server, and then modify the LotusConnections-config.xml file to specify the `employeeID` as the ID Key attribute for HCL Connections applications.

You can change the default setting to use a custom ID to identify users and groups in the directory.

To specify a custom attribute as the unique ID for users or groups, complete the following steps:

1.  From the VMM\_HOME/model directory, open the wimxmlextension.xml file. If no file with this name exists, create one.

    VMM\_HOME is the directory where the Virtual Member Manager files are located. This location is set to either the **wim.home** system property or the user.install.root/config/cells/local.cell/wim directory.

2.  Add the definitions of the new property types and the entity types to which they apply. Ensure that the XML is well-formed and conforms to the schema defined in wimschema.xsd.

    -   To select a single ID attribute for both users and groups, use the following sample XML, which defines a new property type called **enterpriseID** and adds this property type to the `PersonAccount` and `Group` entity types:

        ```
        <?xml version="1.0" encoding="UTF-8"?>
        <sdo:datagraph xmlns:sdo="commonj.sdo" 
        xmlns:wim="http://www.example.com/websphere/wim">
        <wim:schema>
        <wim:propertySchema 
        nsURI="http://www.example.com/websphere/wim" 
        dataType="STRING" multiValued="false" 
        propertyName="enterpriseID">
        <wim:applicableEntityTypeNames>PersonAccount
        </wim:applicableEntityTypeNames>
        </wim:propertySchema>
        <wim:propertySchema 
        nsURI="http://www.example.com/websphere/wim" 
        dataType="STRING" multiValued="false" 
        propertyName="enterpriseID">
        <wim:applicableEntityTypeNames>Group
        </wim:applicableEntityTypeNames>
        </wim:propertySchema>
        </wim:schema>
        </sdo:datagraph> 
        ```

    -   To use two different ID attributes, one for users and a different one for groups, use the following sample XML, which defines a property type called **customUserID** and adds it to the `PersonAccount` entity type, and also defines a property type called **customGroupID** and adds it to the `Group` entity type:

        ```
        <?xml version="1.0" encoding="UTF-8"?>
        <sdo:datagraph xmlns:sdo="commonj.sdo" 
        xmlns:wim="http://www.example.com/websphere/wim">
        <wim:schema>
        <wim:propertySchema 
        nsURI="http://www.example.com/websphere/wim" 
        dataType="STRING" multiValued="false" 
        propertyName="customUserID">
        <wim:applicableEntityTypeNames>PersonAccount
        </wim:applicableEntityTypeNames>
        </wim:propertySchema>
        <wim:propertySchema 
        nsURI="http://www.example.com/websphere/wim" 
        dataType="STRING" multiValued="false" 
        propertyName="customGroupID">
        <wim:applicableEntityTypeNames>Group
        </wim:applicableEntityTypeNames>
        </wim:propertySchema>
        </wim:schema>
        </sdo:datagraph> 
        ```

    **Note:** The **customUserID** and **customGroupID** properties are not related to the properties of the login ID.

3.  Add the new property types to each repository adapter. Open the wimconfig.xml file in a text editor.

    |**Linux™**|/opt/IBM/WebSphere/AppServer/profiles/<profile\_name\>/config/cells/<cell\_name\>/wim/config|
    |**Microsoft™ Windows™**|C:\\IBM\\WebSphere\\AppServer\\profiles\\<profile\_name\>\\config\\cells\\<cell\_name\>\\wim\\config|

4.  Find and edit the **<config:attributeConfiguration\>** element, adding one of the following texts:

    -   To use a single ID attribute for both users and groups, using a string called enterpriseid, add the following text:

        ```
        <config:attributeConfiguration>
        	<config:externalIdAttributes 
        name="enterpriseID" syntax="String"/>
        </config:attributeConfiguration>  
        ```

    -   To use two different ID attributes, one for users and the other for groups, add the following text:

        ```
        <config:attributeConfiguration>
        	<config:attributes name="userPassword" 
        propertyName="password"/>
        	<config:attributes name="customUserID" 
        propertyName="customUserID"/>
        	<config:attributes name="customGroupID" 
        propertyName="customGroupID"/>
        	<config:propertiesNotSupported 
        name="homeAddress"/>
        	<config:propertiesNotSupported 
        name="businessAddress"/>
        </config:attributeConfiguration> 
        ```

5.  Save and close the wimconfig.xml file.


If you specified different ID attributes for users and groups, complete the steps in the *Configuring the custom ID attribute for users or groups* topic in the Post-installation tasks section of the product documentation. The steps in that task configure HCL Connections to use the custom ID attributes that you specified in this task.

When you map fields in the Profiles database, ensure that you add the custom ID attribute to the **PROF\_GUID** field in the EMPLOYEE table. See the [Mapping fields manually](t_prof_tdi_mapfields.md) topic.

**Parent topic:**[Populating the Profiles database](../install/t_prof_install_profiles_db.md)

