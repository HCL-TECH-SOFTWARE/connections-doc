# Using the CodesConnector {#t_admin_profiles_using_codes_connector .task}

Use the CodesConnector to retrieve, create, update, and delete code entries in various codes tables in the Profiles database.

For information about how to configure your development environment for working with the IBM Security Director Integrator connectors, and where to place the connectors, see *Setting up your development environment*. For additional information, see *Supplemental user data for Profiles*.

Database properties are read from the profiles\_tdi.properties file, which must be configured prior to using the connector. The Profiles property store must be part of the configuration \(.xml\) file where your assembly lines are located. For related information, see [General Concepts](https://www.ibm.com/docs/sdi/7.2.0?topic=configuring-general-concepts) in the Security Directory Integrator documentation.

The **Codes Table Name** menu option in the CodesConnector contains the choices **Country**, **Department**, **EmployeeType**, **Organization**, and **WorkLocation**. The CodesConnector requires that one of these table choices be assigned to the **Codes Table Name** field option. The table choice specified is used during CodesConnector operations. Each table has a different, but similar, schema. You can determine the schema of a particular table by making connections in the input or output map panels of the connector and then clicking **Next** to advance to the applicable record.

The CodesConnector works with records in the COUNTRY, DEPARTMENT, EMP\_TYPE, ORGANIZATION, and WORKLOC tables in the Profiles database. The mode setting of the connector determines what role the connector carries out in the assembly line. You can use the CodesConnector in the following modes.

|Mode|Description|
|----|-----------|
|Iterator|Connects to the codes table in the Profiles database, retrieves all the records, and handles them one by one.

|
|Lookup|Fetches records from the codes table in the Profiles database according to specified search criteria.

The search \(link\) criteria attribute is determined by the code table name specified in the connector panel.

The following table names and their associated attributes are supported for use as the search criteria:

-   COUNTRY – countryCode
-   DEPARTMENT – departmentCode
-   EMP\_TYPE – employeeType
-   ORGANIZATION – orgCode
-   WORKLOC – workLocationCode

|
|Update|Updates records in the codes table in the Profiles database.

The search \(link\) criteria is the same as the Lookup mode.

|
|Add|Adds records in the codes table in the Profiles database.

The search \(link\) criteria is the same as the Lookup mode.

|
|Delete|Deletes records in the codes table in the Profiles database according to specified search criteria.

The search \(link\) criteria is the same as the Lookup mode.

|
|updateToDB|This mode has been deprecated; use the Update mode instead.

|

1.  To add the connector to an assembly line, create a new or open an existing assembly line and click **Add Component** in the Configuration Editor.

2.  Select **Connectors**, and then select **CodesConnector** from the **Components** list.

3.  Enter a name for the connector in the **Name** field.

4.  Click **Next**.

5.  Select the desired table name from the list and click **Finish**.

6.  Continue with any additional development of your assembly line.


**Parent topic:**[Developing custom Tivoli Security Integrator assembly lines for Profiles](../admin/c_admin_profiles_develop_custom_tdi_scripts.md)

**Related information**  


[Supplemental user data for Profiles](../install/r_prof_fill-tables.md)

[Setting up your development environment](../admin/t_admin_profiles_config_tdi_dev_environment.md)

