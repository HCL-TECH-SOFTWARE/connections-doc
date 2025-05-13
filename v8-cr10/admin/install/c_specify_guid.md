# Specifying the global ID attribute for users and groups {#specifyingtheglobalidattributeforusersandgroups .concept}

Decide if you will accept the default identifiers used by your LDAP directory server or create a custom attribute to be used as the global unique identifier \(GUID\) for each user. This identifier is unique across the organization and is used for synchronizing names in the LDAP directory with names in the Profiles database.

By default, WebSphere® Application Server reserves the following attributes as unique identifiers for the following LDAP directory servers:

-   IBM® Security Directory Server:

    `ibm-entryUUID`

-   Microsoft™ Active Directory:

    `objectGUID`

    If you are using Active Directory, remember that the samAccountName attribute has a 20 character limit; other IDs used by HCL Connections have a 256 character limit.

-   HCL Domino® Enterprise Server:

    `dominoUNID`

    !!! note
        If the bind ID for the Domino LDAP does not have sufficient manager access to the Domino directory, the Virtual Member Manager \(VMM\) does not return the correct attribute type for the Domino schema query; DN is returned as the VMM ID. To override VMM’s default ID setting, add the following line to the `<config:attributeConfiguration>` section of the `wimconfig.xml` file:

    ```
    <config:externalIdAttributes name="dominoUNID"/>
    ```

-   Sun Java™ System Directory Server:

    `nsuniqueid`

-   eNovell Directory Server:

    `GUID`

-   Custom ID:

    If your organization already uses a unique identifier for each user and group, you can configure HCL Connections to use that identifier. For more information, see the *Optional: Specifying a custom ID attribute for users or groups* topic.


The wimconfig.xml file is stored in the following location:

Linux™
:   `/opt/IBM/WebSphere/AppServer/profiles/profile_name/config/cells/cell_name/wim/config`

Microsoft Windows™
:   `drive:\\IBM\\WebSphere\\AppServer\\profiles\\profile_name\\config\\cells\\cell_name\\wim\\config`

!!! note
    HCL recommends that you do not allow the `GUID` of a user to change. If you change the `GUID`, the user will not have access to their data unless you re-synchronize the LDAP and Profiles database with the new `GUID`. When you change the `GUID` and run the sync\_all\_dns batch file, the user’s `GUID` is initially changed in the Profiles database, and then propagated to the other components using the user life cycle commands. Be sure when you are running `sync_all_dns` that an unchanged field is used as the hash. See the *Synchronizing source changes such as LDAP with Profiles* and *Managing user data using Profiles administrative commands* topics for more information.

**Parent topic:**[Populating the Profiles database](../install/t_prof_install_profiles_db.md)

