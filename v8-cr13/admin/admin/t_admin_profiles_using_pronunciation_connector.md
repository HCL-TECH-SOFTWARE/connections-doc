# Using the PronunciationConnector {#t_admin_profiles_using_pronunciation_connector .task}

Use the PronunciationConnector to retrieve, create, update, and delete pronunciation entries in the Pronunciation table in the Profiles database.

For information about how to configure your development environment for working with the IBM Security Director Integrator connectors, and where to place the connectors, see *Setting up your development environment*.

Database properties are read from the profiles\_tdi.properties file, which must be configured prior to using the connector. The Profiles property store must be part of the configuration \(.xml\) file where your assembly lines are located. For related information, see [General Concepts](https://www.ibm.com/docs/sdi/7.2.0?topic=configuring-general-concepts) in the Security Directory Integrator documentation.

The PronunciationConnector writes changes to the Pronunciation table in the Profiles database. The mode setting of the connector determines what role the connector carries out in the assembly line. You can use the PronunciationConnector in the following modes.

|Mode|Description|
|----|-----------|
|Iterator|Iteratively scans data source entries, reads their attribute values, and delivers each entry to the appropriate AssemblyLine Flow section components. The available attributes that are returned in the work entry are in the iterator and lookup modes:

In this mode, the PronunciationConnector connects to the Pronunciation table in the Profiles database, retrieves all the records, and handles them one by one.

|
|Lookup|Fetches records from the Pronunciation table in the Profiles database according to specified search criteria.

**Note:** The PronunciationConnector only supports searches by uid and key.

**Note:** The search \(link\) criteria must be the key attribute.

|
|Update|Updates the pronunciation records in the Pronunciation table in the Profiles database. The connector can update the database using the pronunciation file link, inputting it as an InputStream data type, or using the pronunciation content, inputting it as a byte data type.

The search \(link\) criteria is the same as the Lookup mode.

|
|Delete|Deletes records in the Pronunciation table in the Profiles database according to specified search criteria.

**Note:** The PronunciationConnector can only delete pronunciation records that are specified by key.

The search \(link\) criteria is the same as the Lookup mode.

|
|updateToDB|This mode has been deprecated, use the Update mode instead.

|

1.  To add the connector to an assembly line, open the assembly line, and then click **Add Component** in the Configuration Editor.

2.  Select **Connectors**, and then select **PronunciationConnector** from the **Components** list.

3.  Enter a name for the connector in the **Name** field.

4.  Select a mode from the **Mode** list, and then click **Finish**.

5.  If you want to add the connector to your project's connector library, right-click the Connectors folder in the Configuration Browser, and then select **PronunciationConnector** from the **Components** list.


**Parent topic:**[Developing custom Tivoli Security Integrator assembly lines for Profiles](../admin/c_admin_profiles_develop_custom_tdi_scripts.md)

**Related information**  


[Setting up your development environment](../admin/t_admin_profiles_config_tdi_dev_environment.md)

[Uploading pronunciation files](../admin/t_admin_profiles_import_pronunciation.md)

