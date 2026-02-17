# Manually populating the Profiles database 

Instead of using the Profiles population wizard, you can manually populate the database.

You can populate the Profiles database manually, as described here, or with the help of the population wizard as described in the [Using the Profiles population wizard](t_prof_populate.md) topic. You might choose to manually populate the database to take advantage of functionality not provided by the wizard, such as anonymous LDAP access, large data sets, and property configuration other than what is provided by the wizard, for example alternate source options.

**Note:** Additional and related information about configuration and mapping properties may be available in the [Using the Profiles population wizard](t_prof_populate.md) topic.

**Important:** If your database uses a database driver that requires Java 8, or you otherwise require Java 8 when running the IBM Security Directory Integrator, see this article for instructions: [Using IBM Security Directory Integrator with Java 8 and HCL Connections](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0094191). Note that you must use the manual population method when using Java 8, not the population wizards.

Before starting this task,

1.  In order to manually populate the Profiles database, ensure you have [Set up the Security Directory Integrator Solutions directory \(tdisol\)](t_setting_up_security_dir_integ_solutions_dir.md).
2.  Complete the steps in the [Mapping fields manually](t_prof_tdi_mapfields.md) topic. You must set up the mapping file before starting this task.

After installing the Profiles database, and setting up the SDI Solutions Directory, and defining mapping and validation, complete the following steps to populate the Profiles database:

1.  Update the profiles\_tdi.properties file to specify values for the following properties. To locate this file, change to the SDI solution directory that you created in the topic [Setting up the Security Directory Integrator Solutions directory \(tdisol\)](t_setting_up_security_dir_integ_solutions_dir.md). The profiles\_tdi.properties file is located in the tdisol/TDI directory. For example: /opt/IBM/TDI/V7.2/tdisol/TDI.

    The following list contains properties that you must review. Edit any property values that require editing for your configuration.

    source\_ldap\_url
    :   Universal resource locator of the LDAP directory. Enables programs to access the LDAP directory. Use the following syntax to specify the value:

        ```
         source_ldap_url=ldap://myldap.enterprise.example.com:389 
        ```

    source\_ldap\_user\_login
    :   If you cannot use Anonymous search, a user login name is required . Use the following syntax to specify the value:

        ```
        source_ldap_user_login=uid=wpsbind,cn=users,l=Bedford Falls,
        st=New York,c=US,ou=Enterprise,o=Sales Division,dc=example,dc=com
        ```

    source\_ldap\_user\_password
    :   If you cannot use anonymous search, a user password is required, along with user login name. Use the following syntax to specify the value:

        ```
        {protect}-source_ldap_user_password=wpsbind  
        ```

        **Note:** Tivoli® Directory Integrator automatically encrypts any properties which have the \{protect\} prefix. If you do not want to encrypt these properties, remove the \{protect\} prefix.

    source\_ldap\_search\_base
    :   A portion of the LDAP DN that must be part of all entries processed. This base usually contains the expected organization \(o\) value, such as `source_ldap_search_base=o=ibm.com`. Use the following syntax to specify the value:

        ```
        source_ldap_search_base=l=Bedford Falls,st=New York,c=US,
        ou=Enterprise,o=Sales Division,dc=example,dc=com   
        ```

    source\_ldap\_search\_filter
    :   A search filter to further refine the entries used. A typical value might be `source_ldap_search_filter=cn=*`. Use the following syntax to specify the value:

        ```
        source_ldap_search_filter=(&(uid=*)(objectclass=inetOrgPerson))   
        ```

    source\_ldap\_use\_ssl
    :   Required only if you are using SSL to authenticate. Specifies whether to use Secure Sockets Layer for the connection. Options are `true` or `false`.

    dbrepos\_jdbc\_driver
    :   JDBC driver used to access the Profiles database repository. The default value of the properties file references the DB2® database provided with Profiles as follows:

        ```
        dbrepos_jdbc_driver=com.ibm.db2.jcc.DB2Driver
        
        ```

        If you are using DB2, you do not need to modify this value. If you are using an Oracle database, change the value to reference an Oracle database. The following values are examples:

        ```
        dbrepos_jdbc_driver=oracle.jdbc.driver.OracleDriver
        ```

        ```
        dbrepos_jdbc_driver=oracle.jdbc.pool.OracleConnectionPoolDataSource
        ```

        If you are using SQL Server, change the value to reference the SQL Server database. The following value is an example:

        ```
        com.microsoft.sqlserver.jdbc.SQLServerDriver
        ```

    dbrepos\_jdbc\_url
    :   Universal resource locator of the database that you created. This value specifies the peopledb database, and must include the port number. For example:

        -   DB2:

            ```
             jdbc:db2://localhost:50000/peopledb
            ```

        -   Oracle:

            ```
            jdbc:oracle:thin:@//dbHostname:dbPort/PEOPLEDB_Name
            ```

        -   SQL Server:

            ```
            jdbc:sqlserver://enterprise.example.com:1433;DatabaseName=PEOPLEDB
            ```

        .

    dbrepos\_username
    :   The user name used to authenticate to the database that you created. Use the following syntax to specify the value:

        ```
        dbrepos_username=<db\_admin\_id>   
        ```

    dbrepos\_password
    :   The password used to authenticate to the database that you created. Use the following syntax to specify the value:

        ```
        {protect}-dbrepos_password=act1vities   
        ```

    You can provide values for additional properties if necessary, see the topic *IBM® Tivoli Directory Integrator solution properties for Profiles* for details.

2.  Ensure that you have completed the steps in the [Mapping fields manually](t_prof_tdi_mapfields.md) task. You must complete the mapping task before continuing.

3.  Run the ./collect\_dns.sh or collect\_dns.bat script to create a file containing the distinguished names \(DNs\) to be processed from the source LDAP directory.

    **Note:** Before starting the script, ensure that you have completed the steps in the [Mapping fields manually](t_prof_tdi_mapfields.md) task.

    **Note:** If the script does not run, you might need to enable its Executable attribute by running the `chmod` command first. The Executable attribute of a script can become disabled after the script is copied from a read-only medium such as DVD.

    The new file is named collect.dns by default but you can rename it if necessary. If you change the file name, update the source\_ldap\_collect\_dns\_file parameter in the profiles\_tdi.propertiesfile.

    After the script runs, it creates a log file called ibmdi.log in the /tdisol/TDI directory. Examine this file to find out whether any errors occurred during the process.

4.  Populate the database repository from the source LDAP directory by running the ./populate\_from\_dn\_file.sh or populate\_from\_dn\_file.bat script.

    Depending on how many records you are processing, this step could take many hours. For example, 5,000 records might take a few minutes, but half a million records might take a few hours, depending on the speed of your system. Tivoli Directory Integrator prints a message to the screen after every 1,000 iterations to inform you of its progress.

    **Note:** If a failure occurs during processing, such as loss of the network connection to the LDAP directory server, you can run the populate\_from\_dn\_file script again with no harm. If you want to save time though, you can start processing the names from where it was interrupted. Examine the PopulateDBFromDNFile.log file in the logs subdirectory to find out which distinguished name was last successfully processed. The ibmdi.log file also tracks the tasks that you run. Edit the collect.dns file to remove all entries up to and including the last successfully processed entry. Start the task again. You can repeat this step as many times as necessary until all the distinguished names are processed.

5.  If you are setting the PROF\_IS\_MANAGER field based on PROF\_MANAGER\_UID references in other employee records, run the ./mark\_managers.sh or mark\_managers.bat script.

    For more information, see [Configuring the Manager designation in user profiles](r_report-to_chains_profiles.md) for details.

    **Note:** Manager identification is not performed as part of the previous record population step because it must run across all the records and it is possible that the initial record population step does not complete in a single pass for large organizations.

    **Note:** If the manager designation was not part of the source records for your data set, you can run this task to analyze all the records after population. This task will take each user record and see if it is referenced as the manager for any other users. If yes, the user will be marked as a manager. If not, the user will be marked as not a manager. If you need to use this process to set this profile attribute, you will also need to run it periodically to perform updates. For more information, see [Synchronizing user data between Profiles and the LDAP directory](../admin/t_admin_profiles_sync_dbs.md).

6.  Run additional and optional scripts to populate additional fields. For example, run the Country code script ./fill\_country.sh or fill\_country.bat to populate the Country table from the isocc.csv file. Other scripts include the following:

    -   Work location code script ./fill\_workloc.sh or fill\_workloc.bat
    -   Organization codes script ./fill\_organization.sh or fill\_organization.bat
    -   Employee type code script ./fill\_emp\_type.sh or fill\_emp\_type.bat
    -   Department code script ./fill\_department.sh or fill\_department.bat
    For more information, see [Supplemental user data for Profiles](../install/r_prof_fill-tables.md).


Perform the remaining tasks under [Populating the Profiles database](t_prof_install_profiles_db.md).

-   **[Setting up the Security Directory Integrator Solutions directory \(tdisol\)](../install/t_setting_up_security_dir_integ_solutions_dir.md)**  
Setting up the Security Directory Integrator Solutions directory \(tdisol\).
-   **[Security Director Integrator solution properties for Profiles](../install/r_pers_tdi_props.md)**  
HCL Connections maps LDAP, database, and other properties with IBM Security Directory Integrator configuration parameters.
-   **[Batch files for processing Profiles data](../install/r_TDI_batch_files.md)**  
HCL Connections provides several batch files that automate the collection and processing of LDAP data for the Profiles database.
-   **[Considerations when populating a large user set](../install/c_populate_large_user_set.md)**  
Populate the Profiles database with many users from an LDAP directory.

**Parent topic:** [Adding source data to the Profiles database](../install/t_populate_profiles_db.md)
