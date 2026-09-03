# Using the PhotoConnector {#t_admin_profiles_using_photo_connector .task}

Use the PhotoConnector to retrieve, create, update, and delete photo entries in the Photo table in the Profiles database.

For information about how to configure your development environment for working with the IBM Security Director Integrator connectors, and where to place the connectors, see *Setting up your development environment*.

Database properties are read from the profiles\_tdi.properties file, which must be configured prior to using the connector. The Profiles property store must be part of the configuration \(.xml\) file where your assembly lines are located. For related information, see [General Concepts](https://www.ibm.com/docs/sdi/7.2.0?topic=configuring-general-concepts) in the Security Directory Integrator documentation.

The PhotoConnector works with photos in the Profiles database. The mode setting of the connector determines what role the connector carries out in the assembly line. You can use the PhotoConnector in the following modes.

|Mode|Description|
|----|-----------|
|Iterator|Iteratively scans data source entries, reads their attribute values, and delivers each entry to the appropriate AssemblyLine Flow section components.

The available attributes that are returned in the work entry are in the iterator and lookup modes:

-   fileType - specifies the file type, for example image or jpeg
-   image - specifies the byte array containing the photo contents
-   key - specifies the user’s key value
-   updated - specifies when the photo was last modified

**Note:** The dump\_photos\_to\_files assembly line uses the Iterator mode.

|
|Lookup|Fetches records from the Photo table in the Profiles database according to specified search criteria, which is the key attribute.

The following attributes can be used for the search criteria:

-   fileType - specifies the file type, for example image or jpeg
-   image - specifies the byte array containing the photo contents
-   key - specifies the user’s key value
-   updated - specifies when the photo was last modified

The search \(link\) criteria can be either uid or key.

|
|Update|Updates the photo for the user specified in the search criteria, that being the key attribute.

The image attribute must include the byte array containing the photo.

**Note:** The load\_photos\_from\_files assembly line uses the Update mode.

The search \(link\) criteria can be either uid or key.

|
|Delete|Deletes records in the Photo table in the Profiles database according to specified search criteria.

The search \(link\) criteria can be either uid or key.

|
|updateToDB|This mode has been deprecated, use the Update mode instead.

|

1.  To add the connector to an assembly line, create a new or open an existing assembly line and click **Add Component** in the Configuration Editor.

2.  Select **Connectors**, and then select **PhotoConnector** from the **Components** list.

3.  Enter a name for the connector in the **Name** field.

4.  Select a mode from the **Mode** list, and then click **Finish**.

5.  Continue with any additional development of your assembly line.


**Parent topic:**[Developing custom Tivoli Security Integrator assembly lines for Profiles](../admin/c_admin_profiles_develop_custom_tdi_scripts.md)

**Related information**  


[Setting up your development environment](../admin/t_admin_profiles_config_tdi_dev_environment.md)


