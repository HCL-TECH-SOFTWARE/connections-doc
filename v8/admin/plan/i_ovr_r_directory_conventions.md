# Directory path conventions {#i_ovr_r_directory_conventions .concept}

Directory variables are abbreviations for the default installation paths for IBM® AIX®, Linux™, and Microsoft™ Windows™. This topic defines the directory variable and its matching default installation directory for each supported operating system.

**Notes:**

-   The term Linux in this documentation includes the Linux for System z® platform, unless otherwise specified.
-   Many examples of directory and file paths in this documentation use the UNIX™ '/' separator to denote AIX, Linux, and Windows path separators, even though the Windows convention is to use the '\\' separator. Where applicable, substitute the '\\' separator for the '/' separator.

|Directory variable|Default installation root|
|------------------|-------------------------|
|app\_server\_rootIBM WebSphere® Application Server installation directory

|AIX:/usr/IBM/WebSphere/AppServer

Linux:/opt/IBM/WebSphere/AppServer

Windows: drive:\\Program Files\\IBM\\WebSphere\\AppServer

where drive is the system drive on which the file directory is stored. For example: C or D.|
|profile\_rootWebSphere Application Server profile/ Deployment Manager profile directory

|AIX:/usr/IBM/WebSphere/AppServer/profiles/profile\_name

Linux:/opt/IBM/WebSphere/AppServer/profiles/profile\_name

Windows: drive:\\Program Files\\IBM\\WebSphere\\AppServer\\profiles\\profile\_name

where profile\_name is the name of the profile on which the application is installed or the profile name of the deployment manager.drive is the system drive on which the file directory is stored. For example: C or D.|
|ibm\_http\_server\_rootHTTP Server installation directory

|AIX:/usr/IBM/HTTPServer

Linux:/opt/IBM/HTTPServer

Windows: drive:\\Program Files\\IBM\\HTTPServer

where drive is the system drive on which the file directory is stored. For example: C or D.|
|connections\_rootConnections installation directory

|AIX or Linux:/opt/IBM/Connections

Windows: drive:\\Program Files\\IBM\\Connections

where drive is the system drive on which the file directory is stored. For example: C or D.|
|IM\_rootInstallation Manager installation directory

|AIX:/opt/IBM/InstallationManager

 Linux:/opt/IBM/InstallationManager

Windows:drive:\\Program Files\\IBM\\Installation Manager

where drive is the system drive on which the file directory is stored. For example: C or D.|
|shared\_resources\_rootShared resources directory

|AIX or Linux:/opt/IBM/IMShared

Windows:drive:\\Program Files\(x86\)\\IBM\\IMShared

where drive is the system drive on which the file directory is stored. For example: C or D.|
|db2\_rootDB2® database installation directory

|AIX:/usr/IBM/db2/version

Linux:/opt/ibm/db2/version

Windows: drive:\\Program Files\\IBM\\SQLLIB\\version

where drive is the system drive on which the file directory is stored, for example: C or D, and version is the version of DB2 installed, for example: V9.5 or V9.7.|
|oracle\_rootOracle database installation directory

|AIX or Linux:/home/oracle/oracle/product/version/db\_1

Windows: drive:\\oracle\\product\\version\\db\_1

where version is the supported Oracle number and drive is the system drive on which the file directory is stored. For example: C or D.|
|sql\_server\_rootMicrosoft SQL Server database installation directory

|Windows: drive:\\Program Files\\Microsoft SQL Server

where drive is the system drive on which the file directory is stored, for example: C or D.|

**Parent topic:**[Planning](../plan/c_installation_overview.md)

