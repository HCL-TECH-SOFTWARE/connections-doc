# WebSphere Application Server environment variables {#reference_d5d_hbg_1z .reference}

Unless you change the directory paths during the installation, the default IBM® WebSphere® environment variables are defined for HCL Connections application directories. These variables are referenced from the configuration files that are associated with the applications.

## Default environment variables { .section}

The following tables list the default environment variables that are defined for application directories and for the customization base directory.

**Note:** Production deployments often use more than one shared content store to avoid problems when applications attempt to read or write to a device at the same time. If you use multiple devices, change the environment variables to match your deployment. You must also update the properties in the HCL Connections configuration engine; otherwise, the export/import utility does not work properly.

Also, do not use network paths when you define content store locations.

For more information about IBM Connections configuration engine properties, see *ConfigEngine properties*.

|Variable name|Description / Local or shared\*|Default value|
|-------------|-------------------------------|-------------|
|ACTIVITIES\_STATS\_DIR|Statistics directory / shared|AIX® and Linux™: /opt/IBM/Connections/data/shared/activities/statistic

 AIX and Linux: /opt/IBM/Connections/data/activities/statistic

 Microsoft™ Windows™: C:\\Program Files\\IBM\\Connections\\data\\shared\\activities\\statistic

|

|Variable name|Description / Local or shared\*|Default value|
|-------------|-------------------------------|-------------|
|DOGEAR\_FAVICON\_DIR|Icons upload directory / shared|AIX and Linux: /opt/IBM/Connections/data/shared/dogear/favorite

 Microsoft Windows: C:\\Program Files\\IBM\\Connections\\data\\shared\\dogear\\favorite

|

|Variable name|Description / Local or shared\*|Default value|
|-------------|-------------------------------|-------------|
|CATALOG\_INDEX\_DIR|Directory in which the index is stored / local|AIX and Linux: /opt/IBM/Connections/data/local/catalog/index

 Microsoft Windows: C\\Program Files\\IBM\\Connections\\data\\local\\catalog\\index

|
|CATALOG\_REPLICATION\_DIR|Directory in which the delta index files are stored / shared|AIX and Linux: /opt/IBM/Connections/data/shared/catalog/indexReplication

 AIX and Linux: /opt/IBM/Connections/data/catalog/indexReplication

 Microsoft Windows: C\\Program Files\\IBM\\Connections\\data\\shared\\catalog\\indexReplication

|

|Variable name|Description / Local or shared\*|Default value|
|-------------|-------------------------------|-------------|
|CONNECTIONS\_CONFIGURATION\_PATH|Stores configuration information and policies for IBM Connections applications and users.|AIX and Linux: /opt/IBM/Connections/data/shared/configuration

 Microsoft Windows: C:\\IBM\\Connections\\data\\shared\\configuration

|
|CONNECTIONS\_ CUSTOMIZATION\_PATH

 ```
CONNECTIONS_
CUSTOMIZATION_PATH
```

|Customization directory / shared|AIX and Linux: /opt/IBM/Connections/data/shared/customization

 AIX and Linux: /opt/IBM/Connections/data/customization

 Microsoft Windows: C:\\Program files\\IBM\\Connections\\data\\shared\\customization

|

|Variable name|Description / Local or shared\*|Default value|
|-------------|-------------------------------|-------------|
|ACTIVITY\_STREAM\_SEARCH\_INDEX\_DIR

 ```
ACTIVITY_STREAM_
SEARCH_INDEX_DIR
```

|Directory in which the index for Activity Stream search is stored / local|AIX and Linux: /opt/IBM/Connections/data/local/news/search/index

 Microsoft Windows: C:\\Program Files\\IBM\\Connections\\data\\local\\news\\search\\index

|
|ACTIVITY\_STREAM\_SEARCH\_REPLICATION\_DIR

 ```
ACTIVITY_STREAM_SEARCH_
REPLICATION_DIR
```

|Replication directory for Activity Stream Search / shared|AIX and Linux: /opt/IBM/Connections/data/shared/news/search/indexReplication

 Microsoft Windows: C:\\Program Files\\IBM\\Connections\\data\\shared\\news\\search\\indexReplication

|
|AUDIT\_FILE\_ROOT\_DIR|Stores temporary attachments for audit purposes. / shared|Not set by default.|

|Variable name|Description / Local or shared\*|Default value|
|-------------|-------------------------------|-------------|
|PROFILES\_CACHE\_DIR|Cache directory / local|AIX and Linux: /opt/IBM/Connections/data/shared/profiles/cache

 AIX and Linux:/opt/IBM/Connections/data/shared/profiles/cache

 Microsoft Windows: C:\\Program Files\\IBM\\Connections\\data\\shared\\profiles\\cache

|
|PROFILES\_STATS\_DIR|Statistics directory / shared|AIX and Linux: /opt/IBM/Connections/data/shared/profiles/statistic

 AIX and Linux: /opt/IBM/Connections/data/profiles/statistic

 Microsoft Windows: C:\\Program Files\\IBM\\Connections\\data\\shared\\profiles\\statistic

|

|Variable name|Description / Local or shared\*|Default value|
|-------------|-------------------------------|-------------|
|CRAWLER\_PAGE\_PERSISTENCE\_DIR

 ```
CRAWLER_PAGE_
PERSISTENCE_DIR
```

|Directory that is used to store the seedlist pages persisted during crawling.|AIX and Linux: /opt/IBM/Connections/data/local/search/persistence

 Microsoft Windows: C:\\Program Files\\IBM\\Connections\\data\\local\\search\\persistence

|
|EXTRACTED\_FILE\_STORE|Directory that is used to store the extracted file content.|AIX and Linux: /opt/IBM/Connections/data/shared/search/extracted

 Microsoft Windows: C:\\Program Files\\IBM\\Connections\\data\\shared\\search\\extracted

|
|SEARCH\_DICTIONARY\_DIR

 ```
SEARCH_DICTIONARY_
DIR
```

|Dictionary directory / shared|AIX and Linux: /opt/IBM/Connections/data/shared/search/dictionary

 AIX and Linux: /opt/IBM/Connections/data/search/dictionary

 Microsoft Windows: C:\\Program Files\\IBM\\Connections\\data\\shared\\search\\dictionary

|
|SEARCH\_INDEX\_DIR|Index directory / local|AIX and Linux: /opt/IBM/Connections/data/local/search/index

 AIX and Linux: /opt/IBM/Connections/data/search/index

 Microsoft Windows: C:\\Program Files\\IBM\\Connections\\data\\local\\search\\index

|
|SEARCH\_INDEX\_BACKUP\_DIR|Backup index directory / local|AIX and Linux: /opt/IBM/Connections/data/local/search/index\_backup

 AIX and Linux: /opt/IBM/Connections/data/local/search/index\_backup

 Microsoft Windows: C:\\Program Files\\IBM\\Connections\\data\\local\\search\\index\_backup

|
|SEARCH\_INDEX\_SHARED\_COPY\_LOCATION

 ```
SEARCH_INDEX_SHARED_
COPY_LOCATION
```

|Directory that is used for automatic distribution of the baseline index to other nodes. An index in this folder will be deleted 30 days after it is created. If this variable is deleted, automatic index rollout is disabled. / shared|AIX and Linux: /opt/IBM/Connections/data/shared/search/staging/

 AIX and Linux: /opt/IBM/Connections/data/search/staging/

 Microsoft Windows: C:\\Program Files\\IBM\\Connections\\data\\shared\\search\\staging\\

|

|Variable name|Description / Local or shared\*|Default value|
|-------------|-------------------------------|-------------|
|MESSAGE\_STORE\_PATH|Directory that is used to store the files that are used and managed by the messaging engines of the WebSphere Service Integration Bus \(SIB\) for the HCL Connections bus \(permanent, temporary, and log file\) / shared**Note:** The same requirements for other shared content apply to this directory. In addition, if NFS is used, use version 4 of the protocol.

|AIX and Linux: /opt/IBM/Connections/data/shared

 Microsoft Windows: C:\\Program Files\\IBM\\Connections\\data\\shared

|

Shared content must be accessible \(read/write\) by all nodes in a cluster. The shared content store must be in a shared repository that grants read/write access to the Deployment Manager and all the nodes. Use one of the following methods to create a shared data directory:

-   Network-based file shares \(for example: NFS, SMB/Samba, and other share types\)
-   Storage area network drives \(SAN\)
-   If you are using a shared-file system on Microsoft Windows, specify the file location by using the Universal Naming Convention \(UNC\) format. For example: \\\\server\_name\\share\_name

**Note:** From version 3 of HCL Connections, all variables changed from being server-level variables to cell-level variables. Variables with a server level scope are more granular than variables with a node or cell level scope.

Both shared and local content stores must be accessible by using the same path from nodes and the deployment manager.

**Parent topic:**[Changing WebSphere Application Server environment variables](../admin/t_admin_common_change_was_env_variable.md)

**Related information**  


[Search index directory structure](../admin/c_admin_search_folder_structure.md)

[Recreating the Search index](../admin/t_admin_search_create_index.md)

[Creating the initial Search index](../admin/t_admin_search_create_initial_index.md)

[Determining where to save your customizations](../customize/t_customize_find_custom_directory.md)

[Enabling live user interface customization editing mode](../customize/t_customize_enable_custom_debugging.md)

