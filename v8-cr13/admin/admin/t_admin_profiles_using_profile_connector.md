# Using the ProfileConnector {#t_admin_profiles_using_pronunciation_connector .task}

Use the ProfileConnector to retrieve, create, update, and reset profile entries in the employee, profile extension, and other employee tables in the Profiles database. The connector flattens these tables into a single view of the profile data. The ProfileConnector can also be used to change the user state and change whether a user profile is listed as a manager. The ProfileConnector is the only supported way to perform these operations on a profile using IBM Security Directory Integrator as HCL Connections does not support the use of direct database access.

For information about how to configure your development environment for working with the Security Directory Integrator connectors, and where to place the connectors, see *Setting up your development environment*.

Database properties are read from the profiles\_tdi.properties file, which must be configured prior to using the connector. The Profiles property store must be part of the configuration \(.xml\) file where your assembly lines are located. For related information, see [Connector modes](https://www.ibm.com/docs/en/sdi/7.2.0?topic=SSCQGF_7.2.0/com.ibm.IBMDI.doc_7.2/referenceguide121.htm#wq313) in the Security Directory Integrator documentation.

The mode setting of the ProfileConnector determines what role the connector carries out in the assembly line. You can use the ProfileConnector in the following modes.

|Mode|Description|
|----|-----------|
|Iterator|Iteratively scans database entries, reads their attribute values, and delivers each entry to the work entry to be operated on by subsequent components.

 All attributes that contain data can be mapped to be returned by the iterator mode. In addition to the list of profile attributes in the map\_dbrepos\_from\_source.properties file, the following attributes can be retrieved in the iterator and lookup modes:

-   key - an internal key used to uniquely identify this profile. This key is used to link data between tables in the profiles database. It is not exported from profiles out to other connections components.
-   sys\_usrState - the value active or inactive based on the user's state
-   lastUpdate - the time when this record was last updated

 In Iterator mode the following option is available on the connector panel:

-   iterator return key data only – this causes only the data in the EMPLOYEE table to be returned, thus not reading data in the extension, given name, surname, and login names tables. This typically results in a substantial performance improvement, and should normally be selected.

|
|Lookup|Fetches records from the Employee table in the Profiles database according to specified search criteria.

 The following attributes can be used as search criteria:

-   key
-   uid
-   email
-   guid
-   distinguishedName
-   managerUid

**Note:** You can use sourceUrl in combination with one of these attributes.

 For example, this mode is used by the dump photos assembly.

 All search criteria return the entries or attributes of a single employee, or no entries if there is no match. However, in the case of managerUid, multiple entries are typically returned, so if two or more employees report to a manger the "On Multiple Entries" hook \(internal name 'lookup\_multiple'\) must be coded. Note that this hook is not invoked if a manager has a single report. Search profiles\_tdi.xml for 'lookup\_multiple' for a sample of how to obtain the multiple entries. Note that the lookup\_multiple hook is a sample of how to code the hook, is in a place it would never be called, and is also disabled.

|
|Update|Updates the profile records in the following tables in the Profiles database: EMPLOYEE, GIVEN\_NAME, SURNAME, PROFILE\_LOGIN, and PROFILE\_EXTENSIONS.

 The following attributes can be used for the search criteria:

**Note:** You can use sourceUrl in combination with one of the following attributes.

-   key
-   uid
-   email
-   guid
-   distinguishedName

 In Update mode the following options are available on the connector panel:

-   Update user state – The available options are as follows:

    -   Do not change \(default\)
    -   Activate
    -   Inactivate
If Activate or Inactivate is selected this state will be explicitly set during the update processing of the record. This option is used during the sync\_dns\_process\_add phase of sync\_all\_dns.

-   Update mark manager – The available options are as follows:
    -   Checked – Sets the "is manager" status to Y or N
    -   Unchecked \(default\) – No manager status is specified
-   When this option is enabled, the update mode will perform only the Mark manager processing. It will recognize if the profile being updated is referenced as the manager by any other profile in the database. If it is referenced, it will be marked with a Y as being a manager. If it is not referenced, it will be marked with a N as not being a manager. To ensure accurate results, synchronize the data source with the Profiles database before using this option. The mark manager option is used by the mark\_manager assembly line.

 The Update mode of the ProfileConnector is used by the update mode of the SyncDBFromSource internal assembly line, which is called by populate\_from\_dn\_file.

 The ProfileConnector also supports the **Compute Changes** and **Skip Lookup** checkboxes in the Advanced area. Consider unchecking the **Compute Changes** option if you want a state change or mark manager operation to be executed whether or not other changes are necessary. For more information about **Compute Changes** and **Skip Lookup** options, see [Connector modes](https://www.ibm.com/docs/en/sdi/7.2.0?topic=SSCQGF_7.2.0/com.ibm.IBMDI.doc_7.2/referenceguide121.htm#wq313) in the Securiy Directory Integrator documentation.

|
|Delete|Deletes records in the Employee table in the Profiles database according to specified search criteria.

 The Delete mode of the ProfileConnector is used by the delete mode of the SyncDBFromSource internal assembly line, which is called by sync\_all\_dns.

 The search \(link\) criteria is the same as the Lookup mode.

|
|addOnly|Adds new records to the Employee table in the Profiles database.

|

1.  To add the connector to an assembly line, open the assembly line, and then click **Add Component** in the Configuration Editor.

2.  Select **Connectors**, and then select **ProfileConnector** from the **Components** list.

3.  Enter a name for the connector in the **Name** field.

4.  Select a mode from the **Mode** list, and then click **Finish**.


Consider referencing the supplied assembly lines for examples in using the ProfileConnector. In addition to these ProfilesConnector supplied assembly lines, the following topics describe additional example programs that are included as part of the TDI solution and that use the ProfileConnector. Do not modify the existing assembly lines, but use the extension points available through the hooks or create your own assembly line.

-   *Creating a connector to synchronize Profiles data using LDIF* – This describes how to use a source other than LDAP to synchronize Profiles user data. This sample shows how to use an LDIF text file as the user data source.
-   *Creating a connector to synchronize a subset of Profiles data* – This describes how to synchronize an explicit set of Profiles users out of cycle from your scheduled synchronization plan supplying a list of users to synchronize to an alternate synchronization utility.
-   *Using supplied scripts to delete inactive users based on inactivity length* – This describes how to use supplied TDI scripts to surface and delete users who have been inactive for specified length of time.

-   **[Creating a connector to synchronize Profiles data using LDIF](../admin/r_prof_tdi_sample_36382.md)**  
You can use a source other than LDAP to synchronize Profiles user data. This sample shows how to use an LDIF text file as the user data source.
-   **[Synchronizing a subset of Profiles data](../admin/r_prof_tdi_sample_52029.md)**  
Use the sync\_dns\_from\_file command to synchronize a subset of Profiles user data.
-   **[Deleting inactive users based on inactive period](../admin/r_prof_tdi_sample_64435.md)**  
You can use the revoke\_users command to delete users in Profiles who have been in the inactive state for a specified length of time. You can also get a list of users who are in the inactive state.

**Parent topic:**[Developing custom Tivoli Security Integrator assembly lines for Profiles](../admin/c_admin_profiles_develop_custom_tdi_scripts.md)

**Related information**  


[Creating a connector to synchronize Profiles data using LDIF](../admin/r_prof_tdi_sample_36382.md)

[Synchronizing a subset of Profiles data](../admin/r_prof_tdi_sample_52029.md)

[Deleting inactive users based on inactive period](../admin/r_prof_tdi_sample_64435.md)

[Setting up your development environment](../admin/t_admin_profiles_config_tdi_dev_environment.md)

