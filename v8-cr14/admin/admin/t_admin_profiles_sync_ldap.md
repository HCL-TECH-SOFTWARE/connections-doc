# Synchronizing the Profiles database with your organization's user data {#t_admin_profiles_sync_ldap .task}

To keep your organization's user data up-to-date, regularly synchronize the IBM® Connections Profiles database with your data source, such as an LDAP directory or an employee database.

The Profiles database is the core repository within Connections for information about the Connections users in your organization. Typically, the primary source of this user data is your organization's LDAP directory, but you can also synchronize from non-LDAP sources, either exclusively or in combination with an LDAP directory. For more information about synchronizing non-LDAP sources, see *Using a custom source repository connector*.

The synchronization process is controlled by properties in the profiles\_tdi.properties file.

It is recommended that you use the sync\_all\_dns command to transfer changes in your organization's user data repository to the Profiles database. If you want to keep the Profiles database in a close synchronized state with your LDAP directory, run this task nightly or at another frequency that suits you.

**Note:** An alternative approach is to synchronize by using a change log that is maintained by the LDAP. However, there are significant challenges to getting this approach to work, and it is not recommended. For more information about using this approach, see *Synchronizing IBM Tivoli Directory Server and Microsoft Active Directory LDAP changes*.

During synchronization, the values of attributes that are mapped from the LDAP directory to the Profiles database in the file map\_dbrepos\_from\_source.properties are evaluated to determine which users need updating. In the Profiles database, existing users are updated, deleted, or deactivated, and new users are created. If you configure extension attributes, that data is also compared and synchronized. The comparison includes all user data within the search scope, including extension data.

The sync\_all\_dns command processes one user at a time, and as the number of users and extension attributes increases, daily synchronization can take too long. There are two performance-related options for sync\_all\_dns that you can use: multi-processing, and time stamp tracking. The multi-processing option divides up the work into independent processes that proceed simultaneously so that multiple users are processed concurrently. The time stamp tracking option tracks the LDAP time of last update, which all LDAPs support, and eliminates the need for most comparing. For details about these options, see *Improving the performance of the sync\_all\_dns command*. There are certain circumstances where the time stamp cannot be observed, for example, when you are switching LDAP directories.

The sync\_all\_dns command creates temporary files that are used during the synchronization process. Use the sync\_updates\_working\_directory property to specify the location of the temporary files. Use the sync\_updates\_clean\_temp\_files property to specify whether to delete or retain the temporary files after synchronization. Retaining the files is useful when you are troubleshooting a problem.

In addition to the temporary files, the following files in the TDI solution directory record the changes that were made during synchronization:

-   employee.adds
-   employee.delete
-   employee.error
-   employee.skip
-   employee.update

When the sync\_updates\_show\_summary\_only property is set to true, no changes are made.

Like the other TDI tasks, the sync\_all\_dns command writes log information to the log file ibmdi.log in the TDI\\logs directory. You can check the log to see whether the command finishes successfully, and look for error information if necessary.

For more information about how the sync\_all\_dns command works, see *Understanding how the sync\_all\_dns process works*.

## Procedure

To synchronize LDAP directory changes with Profiles:

1.  Use the properties in the following table to control the synchronization process.

    |Option|Description|
    |------|-----------|
    |**sync\_updates\_hash\_field**|sync\_updates\_hash\_field is a key property. This property specifies the field that is used to match a user record in the Profiles database with the corresponding user information in the source. The supported fields are uid, guid, and email. The default is uid. <br></br> It is critical that you choose a field that does not ordinarily change over time, so that the match will remain intact. If the value in the field in the source does change, the match is broken, and the existing database information for this person could be deleted. <br></br> If the value of the hash field in the source does change, you must set this property to a different field that has not changed, for at least one run of sync\_all\_dns. For example, if the value for uid changes in the source, you must set the property to either guid or email. After one run of sync\_all\_dns, you can change the property back to uid. <br></br> **Note:** If the value is guid and you change LDAP providers, you must change the value to uid or email temporarily because guid is LDAP-specific.|
    |**perform\_deletion\_or\_inactivate\_for\_sync**|The default value is true. Set this property to false when you don't want to delete or mark as inactive those users who are no longer in the LDAP directory. <br></br> The sync\_all\_dns command checks the value of the property and acts by using the following logic: <br></br> -   If the value is true, look at the sync\_delete\_or\_inactivate property to determine which action to take. The action is either delete or inactivate. <br></br> -   If the value is false, perform neither the delete action nor the inactivate action.|
    |**sync\_delete\_or\_inactivate**|Controls what happens to a user record when it is not found in the LDAP directory. The value must be either delete or inactivate, and is case-sensitive. Inactivate is basically a soft delete. By default, the property is set to inactivate. The inactive state is propagated to all the other Connections applications independent of whether the user is deleted or inactivated. <br></br> For information about hard deleting users who have been inactive for some time, see *Using supplied scripts to delete inactive users based on inactivity length*.|
    |**source\_ldap\_iterate\_with\_filter**|The default value is false. When set to true, the source\_ldap\_iterate\_with\_filter\_functions\_file property is used to locate the file that contains the JavaScript code that affects chunking. This is needed when there is a limit to the number of users that can be obtained with an LDAP query. <br></br> For more information about how to use this property, see *Populating a large user set*. <br></br> This property is not configurable when you are using the population wizard.|
    |**source\_ldap\_iterate\_with\_filter\_functions\_file**|Used only when source\_ldap\_iterate\_with\_filter is set to true. <br></br> Set this property to the name of a JavaScript file that contains the filter code that affects chunking. <br></br> Use when the size of the data to be retrieved from LDAP exceeds the search limit of the LDAP or exceeds the memory capacity of the TDI LDAP connector. For example, if your search parameters would return 250 K records but your LDAP only allows 10K to be returned at a time, you can use this property. <br></br> For more information about how to use this property, see *Populating a large user set*. <br></br> This property is not configurable when using the population wizard.|
    |**sync\_updates\_double\_check**|The default value is false. When set to true, the assembly line that is defined by the sync\_check\_if\_remove property runs. <br></br> **Note:** This property applies to delete/inactivate only.|
    |**sync\_check\_if\_remove**|Used only when sync\_updates\_double\_check is set to true. <br></br> Specifies the name of an assembly line in profiles\_tdi.xml that verifies the delete operation or the inactivate operation. <br></br> By default, the name of the assembly line is set to sync\_all\_dns\_check\_if\_remove. The sync\_all\_dns\_check\_if\_remove assembly line looks up the distinguished name of the about-to-be-deleted user in the LDAP directory. If the user is found, sync\_all\_dns\_check\_if\_remove returns a status that causes the main assembly to bypass the delete or inactivate action. <br></br> For more information about this property, see *Customizing the logic used for the delete operation*.|
    |**sync\_updates\_clean\_temp\_files**|The default value is true. When set to false, temporary files are not deleted until the next time that sync\_all\_dns is run.|
    |**sync\_updates\_hash\_partitions**|Number of partitions to divide the temporary files into. The default of 10 is sufficient in most cases. If problems develop, you can increase the value. The typical problem is running out of memory during the update phase because all the data related to all users in a partition is held in memory during the update, delete, and add phases. For more information about partitions, see *Understanding how the sync\_all\_dns process works*.|
    |**sync\_updates\_show\_summary\_only**|The default value is false. When set to true, the employee.\* files in the TDI solution directory contain the records that are changed, but no changes are made.|
    |**sync\_updates\_working\_directory**|The directory where the working files are stored. The path can be relative to the TDI solution directory or an absolute path. The default value is sync\_updates, which is a relative path.|
    |**sync\_updates\_size\_model**|The default value is single. This property is used for enhancing the performance of the sync\_all\_dns command. Possible values are single, multi4, multi6, or multi8. For more information about this property, see *Improving the performance of the sync\_all\_dns command*|
    |**sync\_updates\_use\_ldap\_timestamp**|The default value is false. This property is used for enhancing the performance of the sync\_all\_dns command. For more information about this property, see *Improving the performance of the sync\_all\_dns command*.|

2.  If you are storing data from multiple LDAP branches or multiple LDAP directories in the same Profiles database, you must synchronize each LDAP branch or LDAP directory separately. To accomplish this task, you can set the following properties in the profiles\_tdi.properties file.

    **Note:** These properties can only be used with the sync\_all\_dns command. They cannot be used with the process\_tds\_changes and process\_ad\_changes commands.

    |**sync\_source\_url\_enforce**|The default value is false. When set to true, synchronizes only those users where the stored source URL matches the current source URL. The current source URL is the concatenation of the source\_ldap\_url, source\_ldap\_search\_base, and source\_ldap\_search\_filter properties. That is, it limits the scope of the set of data in the database, and skips the records that do not match the current source URL.|
    |**sync\_source\_url\_override**|The default value is false. This property is effective only when sync\_source\_url\_enforce is true. When sync\_source\_url\_enforce is true and sync\_source\_url\_override is false, records where the current source URL and the stored source URL do not match are skipped. <br></br> When sync\_source\_url\_override is true, the records that would have been skipped are checked for a match of the hash field in the current LDAP branch or LDAP directory. If there is a match and at least one field needs to be updated, the record is updated, and the source URL is set to the current value. If no fields are updated, which would be very unusual in the cases where you would use this override, no change is made. For example, the major use case is switching LDAP directories, and in this case the guid is sure to change. <br></br> This property should be clearly understood before setting it to true. See the last example later in this document to see it in action.|
    |**sync\_store\_source\_url**|The default value is true. Stores the source LDAP URL in the prof\_source\_url field in the database. The source LDAP URL is needed to determine the source of the data to correctly synchronize it when there is more than one LDAP branch or LDAP directory. Even if there is only one LDAP, it is best to leave this property set to true.|

3.  Run the sync\_all\_dns command. The command name is either sync\_all\_dns.sh or sync\_all\_dns.bat, depending on your operating system.

    **Note:** When the sync\_all\_dns command runs, a lock file is created in the TDI solution directory. The lock file prevents others from starting a sync\_all\_dns process in the same TDI solution directory. The name of the lock file is sync\_all\_dns.lck. The lock file is deleted after the sync\_all\_dns command completes. If the command does not complete, the lock file is not deleted. You can delete it yourself, or you can run the clearLock.sh or the clearLock.bat script, located in the TDI solution directory.


## Example employee tables { .example}

The sample EMPLOYEE table illustrates results from a scenario for the fictional Zeta Bank company, in which you have pulled users A, B, and C from the Littleton LDAP branch and users X, Y, and Z from the Westford LDAP branch.

Following the best practice, you have used two TDI solution directories with slightly different profiles\_tdi.properties files. In the following discussion, one of the solution directories is called ABC, and the other is called XYZ.

Each of the profiles\_tdi.properties files include the following entries:

```
source_ldap_url=ldap://ldap.zetabank.com:389
source_ldap_search_filter=((objectClass=inetOrgPerson)(uid=*))
sync_store_source_url=true
sync_source_url_enforce=true
sync_source_url_override=false
```

The ABC/profiles\_tdi.properties file, for the Littleton branch, includes the following entry:

```
source_ldap_search_base=cn=users,location=littleton,dc=zetabank,dc=com
```

The XYZ/profiles\_tdi.properties file, for the Westford branch, includes the following entry:

```
source_ldap_search_base=cn=users,location=westford,dc=zetabank,dc=com
```

After running collect\_dns and populate\_from\_dn\_file in each of the two TDI solution directories, the EMPLOYEE table contains the following data:

Table 1. Example employee table after running collect_dns and populate_from_dn_file in each TDI solution directory.

|uid|PROF\_SOURCE\_URL|
|---|-----------------|
|A|ldap://ldap.zetabank.com:389/cn=users,location=littleton,dc=acme,dc=com?\(\(objectClass=inetOrgPerson\)\(uid=\*\)\)|
|B|ldap://ldap.zetabank.com:389/cn=users,location=littleton,dc=acme,dc=com?\(\(objectClass=inetOrgPerson\)\(uid=\*\)\)|
|C|ldap://ldap.zetabank.com:389/cn=users,location=littleton,dc=acme,dc=com?\(\(objectClass=inetOrgPerson\)\(uid=\*\)\)|
|X|ldap://ldap.zetabank.com:389/cn=users,location=westford,dc=acme,dc=com?\(\(objectClass=inetOrgPerson\)\(uid=\*\)\)|
|Y|ldap://ldap.zetabank.com:389/cn=users,location=westford,dc=acme,dc=com?\(\(objectClass=inetOrgPerson\)\(uid=\*\)\)|
|Z|ldap://ldap.zetabank.com:389/cn=users,location=westford,dc=acme,dc=com?\(\(objectClass=inetOrgPerson\)\(uid=\*\)\)|

Notice that the only difference between the values for PROF\_SOURCE\_URL is the location parameter.

If you run sync\_all\_dns in the ABC TDI solution directory, you get updates for people A, B, and C, but not for people X, Y, and Z because sync\_source\_url\_enforce is set to true and the PROF\_SOURCE\_URL for those people does not match the concatenation of the source\_ldap\_url, source\_ldap\_search\_base, and source\_ldap\_search\_filter properties. Setting sync\_source\_url\_enforce to false causes the people X, Y, and Z to be deleted from the database because they don’t exist in the Littleton branch.

If the people A, B, and C move from Littleton to Waltham, the ABC/profiles\_tdi.properties would then have the following entry for source\_ldap\_search\_base:

```
source_ldap_search_base=cn=users,location=waltham,dc=zetabank,dc=com
```

An update is required because the location value in the PROF\_SOURCE\_URL column is different than the location value in ABC/profiles\_tdi.properties. To correctly update the value in PROF\_SOURCE\_URL, in ABC/profiles\_tdi.properties set sync\_source\_url\_override to true and then run sync\_all\_dns in the ABC TDI solution directory.

As a safety precaution, the PROF\_SOURCE\_URL is not updated if it is the only attribute that changes. Also, you should set sync\_source\_url\_override to false after running sync\_all\_dns.

After the command completes, the EMPLOYEE table contains the following data:

Table 2. Example employee table after running collect_dns in the ABC TDI solution directory.

|uid|PROF\_SOURCE\_URL|
|---|-----------------|
|A|ldap://ldap.zetabank.com:389/cn=users,location=waltham,dc=acme,dc=com?\(\(objectClass=inetOrgPerson\)\(uid=\*\)\)|
|B|ldap://ldap.zetabank.com:389/cn=users,location=waltham,dc=acme,dc=com?\(\(objectClass=inetOrgPerson\)\(uid=\*\)\)|
|C|ldap://ldap.zetabank.com:389/cn=users,location=waltham,dc=acme,dc=com?\(\(objectClass=inetOrgPerson\)\(uid=\*\)\)|
|X|ldap://ldap.zetabank.com:389/cn=users,location=westford,dc=acme,dc=com?\(\(objectClass=inetOrgPerson\)\(uid=\*\)\)|
|Y|ldap://ldap.zetabank.com:389/cn=users,location=westford,dc=acme,dc=com?\(\(objectClass=inetOrgPerson\)\(uid=\*\)\)|
|Z|ldap://ldap.zetabank.com:389/cn=users,location=westford,dc=acme,dc=com?\(\(objectClass=inetOrgPerson\)\(uid=\*\)\)|

-   **[Synchronizing IBM Tivoli Security Directory Server and Microsoft Active Directory LDAP changes](../admin/t_admin_profiles_sync_ldap_tdi_ad.md)**  
To keep your profiles synchronized with your LDAP directory, use the generic sync\_all\_dns command. However, if your LDAP directory is Tivoli Security Directory Server or Microsoft® Active Directory, you can use the process\_tds\_changes or process\_ad\_changes commands. You must configure your LDAP server to save all updates to a change log, which places a considerable burden on the LDAP, and you must run the change log server.
-   **[Synchronizing user data between Profiles and the LDAP directory](../admin/t_admin_profiles_sync_dbs.md)**  
When you allow users to make changes to certain fields in their profiles, the changes need to be copied from the Profiles database to the LDAP directory, if the field value originates in the LDAP directory.
-   **[Understanding how the sync\_all\_dns process works](../admin/c_admin_profiles_sync_ldap_understanding.md)**  
Use the sync\_all\_dns process to keep your Connections Profiles database synchronized with changes to the LDAP directory.
-   **[Improving the performance of the sync\_all\_dns command](../admin/c_admin_profiles_improving_sync_performance.md)**  
Significantly improve the performance of the Connections Profiles sync\_all\_dns command by enabling two properties in the profiles\_tdi.properties file.

**Parent topic:** [Managing user data using Tivoli Directory Integrator Solution scripts](../admin/c_admin_profiles_updating_ldap.md)

**Related information**  


[Switching to unique administrator IDs for system level communication](../admin/t_admin_common_add_j2c_auth.md)

[Use an LDAP branch to store external users](../admin/t_admin_profiles_ldap_branch.md)

[Security Director Integrator solution properties for Profiles](../install/r_pers_tdi_props.md)

[Managing users](../admin/c_admin_common_user_life_cycle_over.md)

[Batch files for processing Profiles data](../install/r_TDI_batch_files.md)

[Understanding how the sync\_all\_dns process works](../admin/c_admin_profiles_sync_ldap_understanding.md)

[Deleting inactive users based on inactive period](../admin/r_prof_tdi_sample_64435.md)

[Synchronizing IBM Tivoli Security Directory Server and Microsoft Active Directory LDAP changes](../admin/t_admin_profiles_sync_ldap_tdi_ad.md)

[Synchronizing the Profiles database with your organization's user data](../admin/t_admin_profiles_sync_ldap.md)

[Customizing the logic used for the delete operation](../admin/t_admin_profiles_customize_delete_logic.md)

[Managing user data using Profiles administrative commands](../admin/t_admin_profiles_manage_users.md)

[Updating Profiles when changing LDAP directory](../admin/t_admin_profiles_change_ldaps.md)

