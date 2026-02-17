# Directory path conventions {#i_ovr_r_directory_conventions .concept}

Directory variables are abbreviations for the default installation paths for Linux™ and Microsoft™ Windows™. This topic defines the directory variable and its matching default installation directory for each supported operating system.

!!! note
    
    - The term Linux in this documentation includes the Linux for System z® platform, unless otherwise specified.
    
    - Many examples of directory and file paths in this documentation use the UNIX™ `/` separator to denote Linux and Windows path separators, even though the Windows convention is to use the `\` separator. Where applicable, substitute the `\` separator for the `/` separator.

| Directory variable | Default installation root |
| ------------------ | ------------------------- |
| `app_server_root`<br>IBM WebSphere® Application Server installation directory | Linux: `/opt/IBM/WebSphere/AppServer` <br> Windows: `drive:\Program Files\IBM\WebSphere\AppServer`<br><br>_where drive is the system drive on which the file directory is stored. For example: C or D._ |
|`profile_root`<br>WebSphere Application Server profile / Deployment Manager profile directory |Linux: `/opt/IBM/WebSphere/AppServer/profiles/profile_name`<br>Windows: `drive:\Program Files\IBM\WebSphere\AppServer\profiles\profile_name`<br><br>_where `profile_name` is the name of the profile on which the application is installed or the profile name of the deployment manager.<br>drive is the system drive on which the file directory is stored. For example: C or D._|
|`ibm_http_server_root`<br>HTTP Server installation directory |Windows: `drive:\Program Files\IBM\HTTPServer`<br><br>_where drive is the system drive on which the file directory is stored. For example: C or D._|
|`connections_root`<br>Connections installation directory |Linux: `/opt/IBM/Connections`<br>Windows: `drive:\Program Files\IBM\Connections`<br><br>_where drive is the system drive on which the file directory is stored. For example: C or D._|
|`IM_root`<br>Installation Manager installation directory |Linux: `/opt/IBM/InstallationManager`<br>Windows: `drive:\Program Files\IBM\Installation Manager`<br><br> _where drive is the system drive on which the file directory is stored. For example: C or D._|
|`shared_resources_root`<br>Shared resources directory |Linux: `/opt/IBM/IMShared`<br>Windows: `drive:\Program Files(x86)\IBM\IMShared`<br><br>_where drive is the system drive on which the file directory is stored. For example: C or D._|
|`db2_root`<br>DB2® database installation directory |Linux: `/opt/ibm/db2/version`<br>Windows: `drive:\Program Files\IBM\SQLLIB\version`<br><br>_where drive is the system drive on which the file directory is stored, for example: C or D, and version is the version of DB2 installed, for example: V9.5 or V9.7._|
|`oracle_root`<br>Oracle database installation directory |Linux: `/home/oracle/oracle/product/version/db_1`<br>Windows: `drive:\oracle\product\version\db_1`<br><br>i_where version is the supported Oracle number and drive is the system drive on which the file directory is stored. For example: C or D._|
|`sql_server_root`<br>Microsoft SQL Server database installation directory |Windows: `drive:\Program Files\Microsoft SQL Server`<br><br>_where drive is the system drive on which the file directory is stored, for example: C or D._|

**Parent topic:**[Planning](../plan/c_installation_overview.md)

