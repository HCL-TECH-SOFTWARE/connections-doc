# WebSphere Application Server environment variables 

Unless you change the directory paths during the installation, the default IBM® WebSphere® environment variables are defined for HCL Connections application directories. These variables are referenced from the configuration files that are associated with the applications.

## Default environment variables { .section}

The following tables list the default environment variables that are defined for application directories and for the customization base directory.

!!! Note
    
    Production deployments often use more than one shared content store to avoid problems when applications attempt to read or write to a device at the same time. If you use multiple devices, change the environment variables to match your deployment. 

    Also, do not use network paths when you define content store locations.

Table 1. Activities default WebSphere® environment variables

|Variable name|Description / Local or shared\*|Default value|
|-------------|-------------------------------|-------------|
|ACTIVITIES\_STATS\_DIR|Statistics directory / shared|Linux™: /opt/IBM/Connections/data/shared/activities/statistic</br> </br> Microsoft™ Windows™: C:\\Program Files\\IBM\\Connections\\data\\shared\\activities\\statistic|

Table 2. Bookmarks default WebSphere® environment variables

|Variable name|Description / Local or shared\*|Default value|
|-------------|-------------------------------|-------------|
|DOGEAR\_FAVICON\_DIR|Icons upload directory / shared|Linux: /opt/IBM/Connections/data/shared/dogear/favorite</br> </br> Microsoft Windows: C:\\Program Files\\IBM\\Connections\\data\\shared\\dogear\\favorite|

Table 3. Communities default WebSphere® environment variables

|Variable name|Description / Local or shared\*|Default value|
|-------------|-------------------------------|-------------|
|CATALOG\_INDEX\_DIR|Directory in which the index is stored / local|Linux: /opt/IBM/Connections/data/local/catalog/index</br> </br> Microsoft Windows: C\\Program Files\\IBM\\Connections\\data\\local\\catalog\\index|</br>
|CATALOG\_REPLICATION\_DIR|Directory in which the delta index files are stored / shared|Linux: /opt/IBM/Connections/data/shared/catalog/indexReplication</br> </br> Microsoft Windows: C\\Program Files\\IBM\\Connections\\data\\shared\\catalog\\indexReplication|

Table 4. Customization default WebSphere® environment variable

|Variable name|Description / Local or shared\*|Default value|
|-------------|-------------------------------|-------------|
|CONNECTIONS\_CONFIGURATION\_PATH|Stores configuration information and policies for HCL Connections applications and users.|Linux: /opt/IBM/Connections/data/shared/configuration</br> </br> Microsoft Windows: C:\\IBM\\Connections\\data\\shared\\configuration|
|CONNECTIONS\_ CUSTOMIZATION\_PATH | Customization directory / shared|Linux: /opt/IBM/Connections/data/shared/customization</br> </br> Microsoft Windows: C:\\Program files\\IBM\\Connections\\data\\shared\\customization|

Table 5. News default WebSphere® environment variables

|Variable name|Description / Local or shared\*|Default value|
|-------------|-------------------------------|-------------|
|ACTIVITY\_STREAM\_SEARCH\_INDEX\_DIR| Directory in which the index for Activity Stream search is stored / local|Linux: /opt/IBM/Connections/data/local/news/search/index</br> </br> Microsoft Windows: C:\\Program Files\\IBM\\Connections\\data\\local\\news\\search\\index|
|ACTIVITY\_STREAM\_SEARCH\_REPLICATION\_DIR| Replication directory for Activity Stream Search / shared|Linux: /opt/IBM/Connections/data/shared/news/search/indexReplication</br> </br> Microsoft Windows: C:\\Program Files\\IBM\\Connections\\data\\shared\\news\\search\\indexReplication|
|AUDIT\_FILE\_ROOT\_DIR|Stores temporary attachments for audit purposes. / shared|Not set by default.|

Table 6. Profiles default WebSphere® environment variables

|Variable name|Description / Local or shared\*|Default value|
|-------------|-------------------------------|-------------|
|PROFILES\_CACHE\_DIR|Cache directory / local|Linux: /opt/IBM/Connections/data/shared/profiles/cache</br> </br> Microsoft Windows: C:\\Program Files\\IBM\\Connections\\data\\shared\\profiles\\cache|
|PROFILES\_STATS\_DIR|Statistics directory / shared|Linux: /opt/IBM/Connections/data/shared/profiles/statistic</br> </br> Microsoft Windows: C:\\Program Files\\IBM\\Connections\\data\\shared\\profiles\\statistic|

Table 7. Search default WebSphere® environment variables

|Variable name|Description / Local or shared\*|Default value|
|-------------|-------------------------------|-------------|
|CRAWLER\_PAGE\_PERSISTENCE\_DIR| Directory that is used to store the seedlist pages persisted during crawling.|Linux: /opt/IBM/Connections/data/local/search/persistence</br> </br> Microsoft Windows: C:\\Program Files\\IBM\\Connections\\data\\local\\search\\persistence|
|EXTRACTED\_FILE\_STORE|Directory that is used to store the extracted file content.|Linux: /opt/IBM/Connections/data/shared/search/extracted</br> </br> Microsoft Windows: C:\\Program Files\\IBM\\Connections\\data\\shared\\search\\extracted|
|SEARCH\_DICTIONARY\_DIR| Dictionary directory / shared|Linux: /opt/IBM/Connections/data/shared/search/dictionary</br> </br> Microsoft Windows: C:\\Program Files\\IBM\\Connections\\data\\shared\\search\\dictionary|
|SEARCH\_INDEX\_DIR|Index directory / local|Linux: /opt/IBM/Connections/data/local/search/index</br> </br> Microsoft Windows: C:\\Program Files\\IBM\\Connections\\data\\local\\search\\index|
|SEARCH\_INDEX\_BACKUP\_DIR|Backup index directory / local|Linux: /opt/IBM/Connections/data/local/search/index\_backup</br> </br> Microsoft Windows: C:\\Program Files\\IBM\\Connections\\data\\local\\search\\index\_backup|
|SEARCH\_INDEX\_SHARED\_COPY\_LOCATION| Directory that is used for automatic distribution of the baseline index to other nodes. An index in this folder will be deleted 30 days after it is created. If this variable is deleted, automatic index rollout is disabled. / shared|Linux: /opt/IBM/Connections/data/shared/search/staging/</br> </br> Microsoft Windows: C:\\Program Files\\IBM\\Connections\\data\\shared\\search\\staging\|

Table 8. WebSphere® Application Server Service Integration Bus file store environment variables

|Variable name|Description / Local or shared\*|Default value|
|-------------|-------------------------------|-------------|
|MESSAGE\_STORE\_PATH|Directory that is used to store the files that are used and managed by the messaging engines of the WebSphere Service Integration Bus \(SIB\) for the HCL Connections bus \(permanent, temporary, and log file\) / shared</br> **Note:** The same requirements for other shared content apply to this directory. In addition, if NFS is used, use version 4 of the protocol.|Linux: /opt/IBM/Connections/data/shared</br> </br>  Microsoft Windows: C:\\Program Files\\IBM\\Connections\\data\\shared|

Shared content must be accessible \(read/write\) by all nodes in a cluster. The shared content store must be in a shared repository that grants read/write access to the Deployment Manager and all the nodes. Use one of the following methods to create a shared data directory:

-   Network-based file shares \(for example: NFS, SMB/Samba, and other share types\)
-   Storage area network drives \(SAN\)
-   If you are using a shared-file system on Microsoft Windows, specify the file location by using the Universal Naming Convention \(UNC\) format. For example: \\\\server\_name\\share\_name

**Note:** From version 3 of HCL Connections, all variables changed from being server-level variables to cell-level variables. Variables with a server level scope are more granular than variables with a node or cell level scope.

Both shared and local content stores must be accessible by using the same path from nodes and the deployment manager.

**Parent topic:** [Changing WebSphere Application Server environment variables](../admin/t_admin_common_change_was_env_variable.md)
