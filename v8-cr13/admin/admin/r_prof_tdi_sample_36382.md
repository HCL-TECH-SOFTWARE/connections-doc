# Creating a connector to synchronize Profiles data using LDIF {#r_prof_tdi_sample_36382 .reference}

You can use a source other than LDAP to synchronize Profiles user data. This sample shows how to use an LDIF text file as the user data source.

## Profiles sample connector { .section}

In this sample, data exported from an LDAP or constructed from another means contains data for the Profiles users in your HCL Connections deployment. If you have user data in a text file such as in LDIF format, you can use this sample connector in conjunction with sync\_all\_dns to synchronize the source data with connections.

Using this process, you’ll do the following:

-   Configure TDI to use the iterator connector during operations to synchronize the Profiles database from the source.
-   Use TDI mapping and extension attribute processing functions to upload data from the LDIF file to the Profiles database. Based on the source content, you will specify the mapping functions as needed.

A sample connector for use with an LDIF file is supplied as samples/ldifSourceConnectorIterator.xml.

The following is a sample LDIF file content for a single user:

```
dn: uid=asingh, cn=users, dc=ibm,dc=com
cn: Allie Singh
givenName: Allie
sn: Singh
employeeNumber: 24251
ou: Office of the CEO
departmentNumber: 10
title: Administrative Assistant to George Bandini
telephoneNumber: 1-301-555-1001
mobile: 1-312-555-0302
pager: 1-773-555-8840
facsimileTelephoneNumber: 1-301-555-1002
uid: asingh
roomNumber: 1-400A
workloc: ID
countryName: USA
mail: asingh@rennovations.com
manager: uid=gbandini, cn=users, dc=ibm,dc=com

```

In this example, using source data from am LDIF text file, the iterator connector is available but the lookup connector is not. TDI assembly lines that work in an iterative manner will read from the LDIF file, however assembly lines that must look up a particular user will not. For example, the collect\_dns utility and the sync\_all\_dns utility will work but the populate\_from\_dn file utility will not because it also requires a lookup connector.

Use the following procedure:

1.  Create or otherwise obtain the LDIF file from your source data repository, for example an LDAP database.
2.  Move the supplied ldifSourceConnectorIterator.xml connector file from the samples directory to the packages subdirectory.
3.  Add the following statement to the profiles\_tdi.properties file:

    ```
    source_employees_file=your\_file\_name.ldif
    ```

4.  Open the map\_dbrepos\_from\_source.properties file and configure mappings as needed based on the attributes in your source LDIF file. Note the following sample mapping for a single user:

    **Note:** In this example, a `guid` field was not present in the LDIF file so the `guid` entry in the following sample is mapped to `employeeNumber`, which will enable processing. See [Mapping fields manually](../install/t_prof_tdi_mapfields.md) and [Creating an iterator connector](t_admin_profiles_create_iterator_connector.md) for details.

    ```
    deptNumber=departmentNumber
    displayName=cn
    distinguishedName=$dn
    email=mail
    faxNumber=facsimileTelephoneNumber
    givenName=given_name
    givenNames=given_name
    guid=employeeNumber
    #managerUid={func_map_to_db_MANAGER_UID}
    mobileNumber=mobile
    officeName=roomNumber
    #secretaryUid={func_map_to_db_SECRETARY_UID}
    surname=sn
    surnames=sn
    telephoneNumber=telephoneNumber
    title=title
    uid=uid
    
    ```

5.  Uncomment and change the following statement in the profiles\_tdi.properties file to enable access to the connector:

    ```
    source_repository_iterator_assemblyline=ldifSourceConnectorIterator:/AssemblyLines/ldifSourceConnectorIterator
    ```

6.  Run a command to process the connector, such as sync\_all\_dns, to update the corresponding Profiles user data.

    Summary output will appear in the console and any errors generated will appear in the log file.


**Parent topic:**[Using the ProfileConnector](../admin/t_admin_profiles_using_profile_connector.md)

**Related information**  


[Using the ProfileConnector](../admin/t_admin_profiles_using_profile_connector.md)

