# Security Director Integrator solution properties for Profiles {#r_pers_tdi_props .reference}

HCL Connections maps LDAP, database, and other properties with IBM Security Directory Integrator configuration parameters.

## Notes { .section}

These properties are in the profiles\_tdi.properties file.

The SDI parameter column in the tables contains the name of the parameter in the LDAP connector. For more information, see [Security Directory Integrator V7.2.0 documentation](https://www.ibm.com/support/knowledgecenter/SSCQGF_7.2.0.3/com.ibm.IBMDI.doc_7.2.0.3/welcome.html).

**Note:** All file paths that are specified are relative to the Security Directory Integrator solution directory.

## Property mappings { .section}

The following properties are associated in an LDAP directory that is used as the source for the data. If you want to use a source other than LDAP, see *Manually populating the Profiles database*.

|Property|SDI parameter|Definition|
|--------|-------------|----------|
|source\_ldap\_url|LDAP URL host name and LDAP URL Port|Required.

The LDAP web address that is used to access the source LDAP system. The port is required and is typically 389 for non-SSL connections.

Express this value in the form of `ldap://host:port`. For example: ldap://myservername.com:389.

If you are using the population wizard, this property is configured with the **LDAP server name** and **LDAP server port** on the LDAP server connection page.

**Note:** The LDAP query constructed from the source URL, search base, and search filter are stored in a source url property, which can be used to segment the Profiles database user set during synchronization. Using different values for this property, which may be equivalent \(for example referencing the LDAP server by IP address or DNS name\) is not advised.

The default value is ldap://localhost:389.

|
|source\_ldap\_use\_ssl|LDAP URL Use SSL connection|Required if you are using SSL to authenticate.

Set to either true or false.

Set to true if you are using SSL \(for example if you are using port 636 in the LDAP URL\).

The default value is false.

If you are using the population wizard, this property is configured with the **Use SSL communication** check box on the LDAP server connection page.

|
|source\_ldap\_user\_login|Login user name|Login user name that is used for authentication. You can leave this blank if no authentication is required.

If you are using the population wizard, this property is configured in the **Bind distinguished name** \(DN\) field on the LDAP authentication properties page.

|
|source\_ldap\_user\_password|Login password|Login password that is used for authentication. Leave this blank if no authentication is required. The value will be encrypted in the file the next time it is loaded.

If you are using the population wizard, this property is configured in the **Bind password** field on the LDAP authentication properties page.

|
|source\_ldap\_search\_base or source\_ldap\_user\_search\_base|Search Base|The search base \(the location from where the search begins\) of the iterating directory. The search begins at this point in the LDAP directory structure and searches all records underneath. This must be a distinguished name.

**Note:** Most directories require a search base, and as such it must be a valid distinguished name. Some directory services allow you to specify a blank string, which defaults to whatever the server is configured to do.

A default value is not specified.

If you are using the population wizard, this property is configured in the **LDAP user search base** field on the LDAP page.

|
|source\_ldap\_search\_filter or source\_ldap\_user\_search\_filter|Search Filter|Search filter that is used when iterating the directory.

This filter determines which objects are included or excluded in the search. If you are using the search base and the specified search filter properties do not allow you to adequately construct your search set, use the source\_ldap\_required\_dn\_regex property.

**Note:** Search filters are used by those directories to select entries from which data is retrieved from a search operation. Search filters as they can affect performance of the directory that is being searched, so choose carefully. The directory server schema that is being queried can affect performance.

A default value is not specified.

If you are using the population wizard, this field is called **LDAP user search filter** and is located in theLDAP authentication properties page.

|
|source\_ldap\_sort\_page\_size|Page size|If specified, the LDAP Connector tries to use paged mode search. Paged mode causes the directory server to return a specific number of entries \(called pages\) instead of all entries in one chunk. Not all directory servers support this option. The default value is 0, which indicates that paged mode is disabled.

The default value is 0.

This parameter is not configurable when you are using the population wizard.

|
|source\_ldap\_authentication\_method|Authentication Method|Anonymous
:   This method provides minimal security.

Simple
:   This method uses a login user name and password to authenticate. It is treated as anonymous if no user name and password are provided.

CRAM-MD5
:   Challenge/Response Authentication Mechanism using Message Digest 5. This method provides reasonable security against various attacks, including replay.

SASL
:   Simple Authentication and Security Layer. This method adds authentication support to connection-based protocols. Specify parameters for this type of authentication with the **Extra Provider Parameters** option.

This parameter is not configurable through the population wizard.

|
|source\_ldap\_collect\_dns\_file| |Name of the file that is used to collect distinguished names \(DNs\) by the collect\_dns.bat/sh process from the source. This is then used during population by the populate\_from\_dn\_file.bat/sh processes to look up entries to add to the database repository.

This file can also be constructed by hand to populate an explicit set of users.

The default value is `collect.dns`.

This parameter is not configurable through the population wizard.

|
|source\_ldap\_escape\_dns| |Indicates that special characters were not escaped properly and identifies them so the processor can find those characters and escape them. The following characters are the special characters:

-   , \(comma\)
-   = \(equals\)
-   + \(plus\)
-   < \(less than\)
-   \> \(greater than\)
-   \# \(number sign\)
-   ; \(semicolon\)
-   \\ \(backslash\)
-   " \(Quotation mark\)

The backslash is used to escape special characters. A plus sign is represented by `\+` and a backslash is represented by `\\`.

if your distinguished names contains these special characters and you receive errors when the collect\_dns/populate\_from\_dn\_file process runs, set this property to true so that the characters are escaped.

The default value is false.

This parameter is not configurable through the population wizard.

|
|source\_ldap\_required\_dn\_regex| |Allows a regular expression to be used to limit the distinguished names \(DNs\) which are processed by providing a regular expression, which must be matched. If the regular expression is not matched, that particular record is skipped. Although the search filter property gives some flexibility, you can use a more powerful regular expression when needed.

A default value is not specified.

This parameter is not configurable through the population wizard.

|
|source\_ldap\_sort\_attribute|Sort Attribute|Specifies server side sorting. This parameter instructs the LDAP server to sort entries that match the search base on the specified field name. Server side sorting is an LDAP extension. The iterating directory must be able to support this sorting extension.

A default value is not specified.

This parameter is not configurable through the population wizard.

|
|source\_ldap\_iterate\_with\_filter| |This property should be used if the size of the data to be retrieved from LDAP exceeds the search limit from the LDAP. For example, if your search parameters return 250K records but your LDAP allows only 100K to be returned at a time, use this parameter.

If the data is too large, an LDAP size limit exceeded error message is generated. To configure this mechanism, see the *Populating a large user set* topic.

When set to true, this attribute specifies that the default iteration assembly line use the collect\_ldap\_dns\_generator.js file to iterate over a set of LDAP search bases and filters. The cconfig setting replaces the sync\_all\_dns\_forLarge and collect\_dns\_iterate scripts that are used in earlier releases.

This parameter is not configurable through the population wizard.

The default value is false.

|
|source\_ldap\_binary\_attributes|Binary Attributes|By default, this property is set internally to GUID, objectGUID, objectSid, sourceObjectGUID. Any additional values that are specified in the property are appended to the list.

This parameter is not configurable through the population wizard.

The default value is GUID.

|
|source\_ldap\_time\_limit\_seconds|Time Limit|Specifies the maximum number of seconds that can be used when searching for entries; 0 = no limit.

This parameter is not configurable through the population wizard.

The default value is 0.

|
|source\_ldap\_map\_functions\_file| |Specifies the location of any referenced function mappings.

When you are using the population wizard, the functions that are shown in the mapping dialog are read from and written to this file.

The default value is `profiles_functions.js`.

|
|source\_ldap\_logfile| |In addition to the standard logs/ibmdi.log file, output from the populate\_from\_dn\_file.bat or populate\_from\_dn\_file.sh task is written to this file.

This parameter is not configurable through the population wizard.

The default value is `logs/PopulateDBFromSource.log`.

|
|source\_ldap\_compute\_function\_for\_givenName| |Connections allows JavaScript functions for setting values of common LDAP fields such as cn, sn, givenName to run before Connections performs its mapping. For example, sn and givenName can be parsed from cn \(common name\).

This parameter is not configurable through the population wizard.

A default value is not specified.

|
|source\_ldap\_compute\_function\_for\_sn| |Connections allows JavaScript functions for setting values of common LDAP fields such as cn, sn, givenName to run before Connections performs its mapping. For example, sn and givenName can be parsed from cn \(common name\).

This parameter is not configurable through the population wizard.

A default value is not specified.

|
|source\_ldap\_collect\_updates\_file| |This property is no longer used.

|
|source\_ldap\_manager\_lookup\_field| |This property is no longer used.

|
|source\_ldap\_secretary\_lookup\_field| |This property is no longer used.

|

Many properties in the IBM Security Directory Integrator LDAP connector are not mapped to Profiles' Security Directory Integrator properties. To configure properties other than the ones listed here, you can use a different source repository and create your own specialized configuration. Use the LDAP iterator and the connectors that are provided with the IBM Security Directory Integrator solution directory as a starting point. For more information, see *Using a custom source repository connector*.

The following properties are associated with the Profiles database repository.

**Note:** Set the following properties in profiles\_tdi.properties, even if you are developing your own assembly lines with the connectors provided in the Profiles IBM Security Directory Integrator solution directory. These properties are not configured in the Connector panels, but rather in the profiles\_tdi.properties file. For more information, see *Developing custom Security Directory Integrator assembly lines*.

|Property|SDI parameter|Definition|
|--------|-------------|----------|
|dbrepos\_jdbc\_driver|JDBC Driver|Required.

 The JDBC driver implementation class name that is used to access the Profiles database repository.

 For DB2, the default is `com.ibm.db2.jcc.DB2Driver`. For example:

```
dbrepos_jdbc_driver=com.ibm.db2.jcc.DB2Driver
```

 For Oracle, the default is `oracle.jdbc.driver.OracleDriver`. For example:

```
dbrepos_jdbc_driver=oracle.jdbc.driver.OracleDriver
```

 If you are using a Microsoft SQL Server database, change the value to reference a SQL Server driver, for example:

```
dbrepos_jdbc_driver=com.microsoft.sqlserver.jdbc.SQLServerDriver
```

 This corresponds to the JDBC driver path in the population wizard. If not using the wizard, this library must be present in the CLASSPATH of Security Directory Integrator. Otherwise, Security Directory Integrator cannot load the library when initializing the Connector and cannot communicate with the Relational Database \(RDBMS\).

 To install a JDBC driver library so that Security Directory Integrator can use it, copy it into the TDI\_install\_dir/jars directory, or a subdirectory such as TDI\_install\_dir/jars/local.

|
|dbrepos\_jdbc\_url|JDBC URL|Required.

 JDBC web address that is used to access the Profiles database repository.

 You must modify the host name portion and port number to reference your server information.

**Note:** You can find this information by accessing the WebSphere® Application Server Administration Console \(http://yourhost:9060\), and then selecting **Resources** \> **JDBC** \> **Data sources** \> **profiles**.

 The default syntax is for DB2, unless using the wizard, but the default uses a local host. If the DB2 is not on the same system as the SDI solution directory, update the URL with the host name.

 If you are using an Oracle database:

-   If your Oracle database is configured to use SERVICE\_NAME, use the following syntax:

    ```
jdbc:oracle:thin:@//hostname:port/database
    ```

or

    ```
jdbc:oracle:thin:@hostname:port/database
    ```

-   If your Oracle database is configured to use SID, use the following syntax:

    ```
jdbc:oracle:thin:@hostname:port:database
    ```


 If you are using a SQL Server database, use the following syntax:

```
dbrepos_jdbc_url=jdbc:sqlserver://hostname:1433;databaseName=PEOPLEDB
```

|
|dbrepos\_username|User name|Required.

 User name under which the database tables, which are part of the Profiles database repository, are accessed.

|
|dbrepos\_password|Password|Required.

 Password that is associated with the user name under which the database tables, which are part of the Profiles database repository, are accessed.

|
|dbrepos\_mark\_manger\_if\_referenced| |This property is no longer used.

|

The following properties are associated with the task that monitors the Profiles employee draft table.

|Property|SDI parameter|Definition|
|--------|-------------|----------|
|monitor\_changes\_ldap\_server\_username| | |
|monitor\_changes\_dsml\_server\_authentication| |Type of authentication that is used by the DSML server update requests.

 HTTP basic authentication
:   A method that is designed to allow a web browser, or other client program, to provide credentials when making a request. The credentials are in the form of a user name and password.

Anonymous
:   This method provides minimal security.

|
|monitor\_changes\_dsml\_server\_url| |**Required if you are transmitting user changes back to the source repository**. Web address of the DSML server to which the DSML update requests are sent.

|
|monitor\_changes\_dsml\_server\_username| |**Required if you are transmitting user changes back to the source repository**. User name that is used for authentication to the DSML server.

|
|monitor\_changes\_dsml\_server\_password| |**Required if you are transmitting user changes back to the source repository**. Password that is used for authentication to DSML server that the DSML update requests are sent to.

|
|monitor\_changes\_map\_functions\_file| |Path to the file that contains mapping functions for mapping from a changed database field to a source. for example LDAP field. This file is only needed if changes made to the source based on database repository field changes are not mapped one-to-one. You can use the same file that you use to map from source to database repository fields, assuming the functions are named appropriately.

|
|monitor\_changes\_sleep\_interval| |Polling interval, in seconds, between checks for more changes when no changes exist.

|

The following properties are associated with the Security Directory Integrator processing that reads a Security Directory Integrator change log and subsequently updates the database repository with those changes.

|Property|SDI parameter|Definition|
|--------|-------------|----------|
|ad\_changelog\_ldap\_url| |LDAP web address that is used to access the LDAP system that was updated. For example:

```
ldap://host:port
```

|
|ad\_changelog\_ldap\_user\_login| |Login user name to use to authenticate with an LDAP system that was updated. You can leave this blank if no authentication is needed.

|
|ad\_changelog\_ldap\_user\_password| |Login user name to use to authenticate with an LDAP that was updated. You can leave this blank if no authentication is needed. The value will be encrypted in the file the next time it is loaded.

|
|ad\_changelog\_ldap\_search\_base| | |
|ad\_changelog\_ldap\_use\_ssl| |Defines whether to use SSL in authenticating with an LDAP system that was updated. The options are true and false.

|
|ad\_changelog\_timeout| | |
|ad\_changelog\_sleep\_interval| |Polling interval, in seconds, between checks for more changes when no changes exist.

|
|ad\_changelog\_use\_notifications| |Indicates whether to use change log notifications rather than polling. If true, the tds\_changelog\_sleep\_interval is not applicable since polling is not used. The options are true and false.

|
|ad\_changelog\_ldap\_page\_size| | |
|ad\_changelog\_start\_at| |Change number in the Active Directory change log to start at. Typically this is an integer, while the special value EOD means start at the end of the change log.

|
|ad\_changelog\_ldap\_required\_dn\_regex.| | |
|tds\_changelog\_ldap\_authentication\_method|Authentication Method|Authentication method that is used to connect to LDAP to read records. Options include the following:

 Anonymous
:   This method provides minimal security.

Simple
:   This method uses a login user name and password to authenticate. It is treated as anonymous if no user name and password are provided.

CRAM-MD5
:   Challenge/Response Authentication Mechanism using Message Digest 5. This method provides reasonable security against various attacks, including replay.

SASL
:   Simple Authentication and Security Layer. This method adds authentication support to connection-based protocols. Specify parameters for this type of authentication using the Extra Provider Parameters option.

|
|tds\_changelog\_ldap\_changelog\_base|ChangelogBase|Change log base to use when iterating through the changes. This is typically `cn=changelog`.

|
|tds\_changelog\_ldap\_time\_limit\_seconds|Time Limit|Searching for entries must take no more than this number of seconds; 0 = no limit.

|
|tds\_changelog\_ldap\_url|LDAP URL|LDAP web address that is used to access the LDAP system that was updated. For example:

```
ldap://host:port
```

|
|tds\_changelog\_ldap\_use\_ssl|Use SSL|Defines whether to use SSL in authenticating with an LDAP system that was updated. The options are true and false.

|
|tds\_changelog\_ldap\_user\_login|Login user name|Login user name to use to authenticate with an LDAP system that was updated. You can leave this blank if no authentication is needed.

|
|tds\_changelog\_ldap\_user\_password|Login password|Login user name to use to authenticate with an LDAP that was updated. You can leave this blank if no authentication is needed. The value will be encrypted in the file the next time it is loaded.

|
|tds\_changelog\_sleep\_interval| |Polling interval, in seconds, between checks for more changes when no changes exist.

|
|tds\_changelog\_start\_at\_changenumber| |Change number in the Security Directory Integrator change log to start at. Typically the number is an integer, while the special EOD value means start at the end of the change log.

|
|tds\_changelog\_use\_notifications| |Indicates whether to use change log notifications rather than polling. If true, the tds\_changelog\_sleep\_interval is not applicable since polling is not used. The options are true and false.

|

The following properties are available in the profiles\_tdi.properties file and are associated with Security Directory Integrator debug activities.

**Note:** The debug properties enable Security Directory Integrator debugging for an entire assembly. In addition, enabling debug\_update\_profile, which enables debugging for the commands that use the Profiles Connector, also enables Java debugging for the following packages.

-   log4j.logger.com.ibm.lconn.profiles.api.tdi=ALL
-   log4j.logger.com.ibm.lconn.profiles.internal.service=ALL
-   log4j.logger.java.sql=ALL

**Note:** The following properties are not configurable when you use the population wizard.

|Property|Security Directory Integrator parameter|Definition|
|--------|---------------------------------------|----------|
|sync\_all\_dns| |For information about sync\_all\_dns, see *Understanding how the sync\_all\_dns process works.*|
|debug\_managers| |Flag that instructs Security Directory Integrator to log more debug information for the following commands.

 The options are true and false.

 To enable, set as `debug_managers=true`.

 This property maps as follows:

```
debug_managers
    mark_managers

```

 The default setting is false.

|
|debug\_photos| |Flag that instructs Security Directory Integrator to log more debug information for the following commands.

 The options are true and false.

 This property maps as follows:

```
debug_photos
    load_photos_from_files
    dump_photos_to_files
```

 The default setting is false.

|
|debug\_pronounce| |Flag that instructs Security Directory Integrator to log more debug information for the following commands.

 The options are true and false.

 This property applies to the following commands:

```
debug_pronounce
    load_pronounce_from_files, 
    dump_pronounce_to_files
```

 The default setting is false.

|
|debug\_fill\_codes| |Flag that instructs Security Directory Integrator to log more debug information for the following commands.

 The options are true and false.

 This property applies to the following commands:

```
debug_fill_codes
    fill_country
    fill_department
    fill_emp_type
    fill_organization
    fill_worklok
```

 The default setting is false.

|
|debug\_draft| |Flag that instructs Security Directory Integrator to log more debug information for the following commands.

 The options are true and false.

 This property applies to the following commands:

```
debug_draft
    process_draft_updates
    reset_draft_iiterator_state
    set_draft_iterator_count
```

 The default setting is false.

|
|debug\_update\_profile| |Flag that instructs Security Directory Integrator to log more debug information for the following commands.

 The options are true and false.

 This property applies to the following commands:

```
debug_update_profile
    populate_from_dn_file
    delete_or_inactivate_employees
    populate_from_xml_file
    process_ad_changes
    process_tds_changes
```

 The default setting is false.

|
|debug\_collect| |Flag that instructs Security Directory Integrator to log more debug information for the following commands.

 The options are true and false.

 This property applies to the following commands:

```
debug_collect
    collect_dns
```

 The default setting is false.

|
|debug\_special| |Flag that instructs Security Directory Integrator to log more debug information for the following commands.

 The options are true and false.

 This property applies to the following commands:

```
debug_special
    unused at present
```

 The default setting is false.

|
|trace\_profile\_tdi\_javascript| |Enables generation of an internal JavaScript trace file.

 Options are OFF, FATAL, ERROR, WARN, INFO, DEBUG, TRACE, ALL \(values are not case-sensitive\).

 The default setting is OFF.

|

**Parent topic:**[Manually populating the Profiles database](../install/t_prof_populate_manual.md)

**Related information**  


[Updating Profiles when changing LDAP directory](../admin/t_admin_profiles_change_ldaps.md)

