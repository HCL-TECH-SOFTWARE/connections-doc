# Understanding how the sync\_all\_dns process works {#c_admin_profiles_sync_ldap_understanding .concept}

Use the `sync_all_dns` process to keep your Connections Profiles database synchronized with changes to the LDAP directory.

The `sync_all_dns` command is a long running command that is comprised of five phases, each of which requires substantial processing. If the `sync_all_dns` command takes more than several hours to complete, you should consider enabling one or both of the two performance options: multi-processing, and timestamp tracking. For more information about the performance options, see *Improving the performance of the `sync_all_dns` command*.

As each phase of the `sync_all_dns` command runs, console output indicates progress every 10,000 records, including a time stamp, so that you call tell how far along the process is. The number of records in the LDAP source and in the Profiles database enable you to estimate the running time of the process.

!!! note 
    All properties mentioned in this topic reside in the `profiles_tdi.properties` file.

A hash value is defined as a unique integer that is generated from a string. The term hash used here means that each user is assigned to one of n-1 partitions based on the hash of an attribute value. The attribute is determined by the property named `sync_updates_hash_field`, and the number of partitions by `sync_updates_hash_partitions`. The default value for `sync_updates_hash_field` is uid, and the default value for `sync_updates_hash_partitions` is 10. The main purpose of partitions is to control the maximum amount of memory that is required at any one time in Phase 3 where all the data in each partition is held in memory. A key concept is that both the database and the LDAP are being hashed on the same attribute, for example uid, and thus the Profiles database and the LDAP representations of a user end up in the same partition.

Temporary files are created during phases 1 and 2 to store database and source values, and are placed in the directory that is specified by the `sync_updates_working_directory` property. By default, the value is sync_updates. The temporary files are deleted at the end of synchronization, but if you want to keep the files for troubleshooting problems, set `sync_updates_clean_temp_files` to false.

## Phase 1 - hash Profiles database { .section}

The first phase iterates over the Profiles EMPLOYEE database table, adding key data for each employee to a partition file that is determined by the hash. The partition files are named sequentially from `0.dbids` up to `9.dbids`, assuming the default value of 10 for `sync_updates_hash_partitions`. A progress message is output every 10,000 records.
Example console output for Phase 1:

```
CLFRN1275I: Begin to hash records in database.
CLFRN0028I: 20150806100604 Iterations: 10000.
CLFRN0028I: 20150806110937 Iterations: 20000.
CLFRN0028I: 20150806121137 Iterations: 30000
CLFRN1269I: Finish hash records in database.
```

## Phase 2 - hash source \(LDAP\) { .section}

The second phase iterates thru the source, typically the LDAP, with the same progress indicators as Phase 1. Each employee is added to a partition file. The partition files are named sequentially from `0.ldiff` up to `9.ldiff`, assuming the default value of 10 for `sync_updates_hash_partitions`. Each .ldiff file is essentially a collection of ldiffs, each of which contains all the LDAP data per employee.

Example console output for Phase 2:

```
CLFRN1271I: Begin to hash records in source repository.
CLFRN0028I: 20150806120738 Iterations: 10000.
CLFRN0028I: 20150806130854 Iterations: 20000.
CLFRN0028I: 20150806141256 Iterations: 30000.
CLFRN1273I: Finish hash records in source repository.
```

## Phase 3 - compare values { .section}

The third phase performs a comparison between the LDAP data and the database data for each user. This is done by partition, one user at a time, starting with partition files `0.dbids` and `0.ldiff`. This assumes that one of the multi-processing performance options is not being used. That is, iterate thru the source \(LDAP\) partitions, and then iterate thru the users in that partition, looking up the Profiles database data corresponding to the hash value.

The time required to complete Phase 3 depends on the number of users and on the number of extension attributes that each user has.

Example console output for Phase 3:

```
**********
CLFRN1268I: After processing partition 0, 3,772 records added to creates.ldiff; 1,947 records added to deletes.dbids.
**********
CLFRN1268I: After processing partition 1, 3,823 records added to creates.ldiff; 1,951 records added to deletes.dbids.
**********
...
**********
```

The comparison process is as follows, assuming that the partition files are `0.dbids` and `0.ldiff`, the value of `sync_updates_hash_field` is uid, and the value of `sync_updates_working_directory` is `sync_updates`:

1.  The contents of `0.dbids` are read into memory into a single hashmap where the key is the uid. The objects in the hashmap are a secondary level of hashmap that contains the user data.
2.  If the hash is in both `0.dbids` and `0.ldiff`, all attributes are compared, and if not equal, the Profiles database is updated. In addition, the users data in the in-memory copy of `0.dbids` is deleted.
3.  If the user appears in only `0.ldiff`, that is, only the LDAP, then the user is added to a file named `sync_updates/creates.ldiff` and added to the Profiles database in phase 5.
4.  At the end of iterating thru the users in a partition, any users that remain in the in-memory copy of `0.dbids` are added to a file named `synch_updates/deletes.dbids` and deleted from the Profiles database in phase 4.
5.  The next partition file is read into memory, and the process continues until all partitions have been analyzed.

## Phase 4 - delete { .section}

The fourth phase performs the configured delete or inactivate operation using the deletes.dbids file from Phase 3 for input.

Example console output for Phase 4:

```
CLFRN1270I: Begin processing the data to be deleted or inactivated.
CLFRN0028I: 20150806162644 Iterations: 10000.
CLFRN1272I: Finish processing the data to be deleted or inactivated.
```

The exact course of this phase is determined by the following properties:

-   `perform_deletion_or_inactivate_for_sync` - If the value of this property is true, then the system looks at the `sync_delete_or_inactivate` property to determine which action to perform. If the value of this property is false, then the system performs no action.
-   `sync_delete_or_inactivate` - Determines the action to be performed if a record is no longer found in the source LDAP but is present in the Profiles database. The value must be either delete or inactivate.

    !!! note 
        
        If you want to perform additional processing during this phase, you can create and configure a custom delete option. See *Customizing the logic used for the delete operation* for details.

-   `sync_updates_double_check` - If set to true, the assembly named by `sync_check_if_remove` is run if a delete is to be performed. When users are inactivated, their email and login attributes are set to null. If you want to set other attributes to null at the same time, this is the best place to do it.
-   `sync_check_if_remove`={name-of-your-adapter.xml}:/AssemblyLines/{name-of-your-custom-delete-all}. The default value is sync_all_dns_check_if_remove.
-   `sync_updates_show_summary_only` - If set to true, no change to the Profiles database is made. This can result in errors that would not occur if the value is false.

## Phase 5 { .section}

The fifth phase performs the add or update operations, iterating over the `creates.ldiff` file from Phase 3 for input.

Example console output for Phase 5:

```
CLFRN1276I: Begin processing the data to be added.
CLFRN0028I: 20150806164006 Iterations: 10000.
CLFRN0028I: 20150806164513 Iterations: 20000.
CLFRN0028I: 20150806165021 Iterations: 30000.
CLFRN1274I: Finish processing the data to be added.
```

## Summary phase { .section}

A summary is displayed at the end of the `sync_all_dns` process.

Example console output of the summary:

```
CLFRN0037I: After synchronization, added or modified records is 37971, deleted or inactivated record
s is 19551, unchanged records 0, and failure records is 0. 
```

Lists of the users for each of the operations are stored in the following files in the solution directory. You can examine these files when the synchronization process has completed. These files are not considered temporary and are not removed at the end of the synchronization process.

-   `employee.adds` – These records were added to the database
-   `employee.delete` – These records were deleted or inactivated in the database
-   `employee.error` – There was an error processing these records
-   `employee.skip` – These records were not changed in the database
-   `employee.updates` – These records were updated in the database

**Parent topic:** [Synchronizing the Profiles database with your organization's user data](../admin/t_admin_profiles_sync_ldap.md)

**Related information**  


[Improving the performance of the sync\_all\_dns command](../admin/c_admin_profiles_improving_sync_performance.md)

[Customizing the logic used for the delete operation](../admin/t_admin_profiles_customize_delete_logic.md)

[Synchronizing the Profiles database with your organization's user data](../admin/t_admin_profiles_sync_ldap.md)

