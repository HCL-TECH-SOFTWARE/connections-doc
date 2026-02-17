# Improving the performance of the `sync_all_dns` command {#concept_f5l_tc5_jt .concept}

Significantly improve the performance of the Connections Profiles `sync_all_dns` command by enabling two properties in the `profiles_tdi.properties` file.

## Introduction { .section}

Synchronizing the Profiles database with your source repository is a computationally intensive process. This is true whether the source is an LDAP directory, a database, or some combination of sources.

By default, the `sync_all_dns` command executes a brute-force comparison of the Profiles database with the source database. Each data point is compared to determine what has changed since the previous synchronization. If your organization has a large number of users, a large number of extension attributes for each user, or both, the synchronization process can take most of a day. Two techniques are available to reduce the synchronization time: multi-processing, and timestamp tracking.

Multi-processing causes the synchronization to proceed in parallel for many users at a time, and is governed by the `sync_updates_size_model` in `profiles_tdi.properties`.

Timestamp tracking takes advantage of the fact that all LDAP directory servers maintain the time of the last update. You enable timestamp tracking with the `sync_updates_use_ldap_timestamp` property, which is also in `profiles_tdi.properties`.
!!! note

    1.  Before using either one of these techniques, you should read and understand the topic [Understanding how the sync_all_dns process works](c_admin_profiles_sync_ldap_understanding.md#). It describes the five phases of the synchronization process and the meaning of partitions, both of which are essential to understanding how multi-processing and timestamp tracking work.
    2.  Take a careful approach the use of these techniques because they add some complexity to the process.
    3.  An extra benefit of multi-processing is that it provides superior troubleshooting features.

## Multi-processing { .section}

To enable multi-processing, set `sync_updates_size_model` to one of the following values: multi4, multi6, or multi8. The default value is single, which means that multi-processing is not used.

Setting `sync_updates_size_model` to a value other than single causes the current TDI solution directory to be copied n times. For example, if the TDI solution directory is called TDI and you use the multi4 option, four copies are created. The copies are named TDI_1, TDI_2, TDI_3, and TDI_4. If any of the directories already exist, they are assumed to be legitimate copies of the TDI solution directory.

Each time that the `sync_all_dns` command runs, files that are likely to change between runs of `sync_all_dns` are copied from the base TDI directory. The files that are copied are as follows:

-   `profiles_tdi.properties`
-   `map_dbrepos_from_source.properties`
-   `profiles_functions.js`
-   `collect_ldap_dns_by_chunks.js`

If you change other files in the base TDI directory, you must delete existing TDI_n directories before running `sync_all_dns`. You can delete and recopy the TDI_n directories with the refreshsols option to the `sync_all_dns` command. For example:
`
```
./sync_all_dns.sh refreshsols
```

!!! note 

    You must use a sufficiently powerful system with multiple processors and at least 16GB of memory. The multi8 option requires more memory and disk space than the multi4 option. Do not use this technique on a virtual machine.

The following description assumes that `sync_updates_size_model` is set to multi4. The process is similar when multi6 and multi8 are chosen.

When processing starts, the number of partitions that are specified by the `sync_updates_hash_partitions` property is increased to an even multiple of the number of copied directories that are specified by the `sync_updates_size_model` property. For example, if the value of `sync_updates_size_model` is multi4 and the value of `sync_updates_hash_partitions` is 10, the number of partitions is increased to 12, which is the next multiple of 4 that is higher than 10.

Phases 1 and 2 start at the same time and run in parallel. Phase 1 is run in TDI_1. The output of Phase 1 is a number of `*.dbids` files, one for each partition. Phase 2 is run in TDI_2. The output of Phase 2 is a number of `*.ldiff` files, also one for each partition. After both phases are complete, the output files are copied to the other TDI_n directories. In this manner, each of the four TDI_n directories has a complete set of `*.dbids` and `*.ldiff` files for use in the remaining phases.

Phase 3 runs in parallel in each of the four TDI\_n directories. Partitions 0, 1, and 2 are processed in TDI\_1, partitions 3, 4, and 5 are processed in TDI\_2, and so on. In this way there is no overlap between the users that the four processes synchronize.

After Phase 3 completes, Phase 4 runs concurrently in the four TDI\_n directories, followed by Phase 5.

Logs are placed in each of the respective TDI\_n directories. The ibmdi.log file is renamed by appending the current time to prevent the log from being overwritten when subsequent partitions are processed. Because of this renaming, the log files will accumulate over time, so you should delete older logs occasionally.

If you are synchronizing with more than one LDAP directory or LDAP branch, and are following the best practice of having one TDI solution directory for each LDAP directory or LDAP branch, make sure that the names of your TDI solution directories do not clash with the names of the directories created by the multi-processing process.

## Timestamp tracking { .section}

All LDAP directory servers maintain an operational attribute per leaf that stores the last time the leaf was modified. The attribute is named 'modifyTimestamp', and the value is a string of the form "YYYYMMDDHHMMSS..." The precision in the SS part is an implementation detail; it could be the a thousandth of a second or a millionths of a second.

!!! note 
    Because timestamp tracking relies on the time of the last LDAP update, timestamp tracking is useful only if you use data that originates from the LDAP. If you use data from other sources, timestamp tracking has no effect unless LDAP is also updated.

In Phase 3 of the `sync_all_dns` process, the standard way that the algorithm decides whether a record needs to be updated is to compare all Profiles database values from Phase 1 with the corresponding LDAP values from Phase 2. This process can become very time consuming as the number of users and the number of extension attributes increases.

Enabling the timestamp tracking option means that `sync_all_dns` obtains the LDAP timestamp and stores it per user upon create or update. Subsequently the stored and latest LDAP modifyTimestamp are compared to decide if a full compare operation is needed. Note that a full compare operation is still needed because the LDAP change might be to an attribute that is not stored in Profiles.

**Parent topic:** [Synchronizing the Profiles database with your organization's user data](../admin/t_admin_profiles_sync_ldap.md)

**Related information**  


[Understanding how the sync\_all\_dns process works](../admin/c_admin_profiles_sync_ldap_understanding.md)

