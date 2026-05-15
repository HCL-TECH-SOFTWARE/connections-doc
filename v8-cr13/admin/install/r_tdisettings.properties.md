# The tdisettings.properties file {#r_tdisettings.properties .reference}

When you run the Profiles population wizard, you can record your selections in two response files: a tdisettings.properties file and a mapping file.

## Response files in silent mode { .section}

After running the Profiles population wizard in interactive mode, you can repeat the same configuration in silent mode by starting the wizard from the command line and passing the response files in as an argument. The wizard uses the values in the response files rather than requiring you to interact with it.

## File properties { .section}

The tdisettings.properties file collects the values that are described in the following table.

|Property|Description|Value|
|--------|-----------|-----|
|db.hostname|Host name of the database server.| |
|db.jdbcdriver|Location of the JDBC driver.|Example: C\\:\\\\IBM\\\\SQLLIB\\\\java**Note:** The extra "\\" symbol is an escape character.

|
|db.name|Name of the Profiles database.|Default: PEOPLEDB|
|db.password|Password for connecting to the database. The property is required if you do not specify -dbPassword as a command parameter.|-   DB2® default: 50000
-   Oracle default: 1521
-   SQL Server default: 1433

|
|db.port|Database server port for invoking JDBC.|-   DB2 default: 50000
-   Oracle default: 1521
-   SQL Server default: 1433

|
|db.type|DB2, Oracle, or SQL Server.|db2 \| oracle \| sqlserver|
|db.user|Name of the database user, such as lcuser.|Example: lcuser|
|ldap.dn.base|LDAP distinguished name search base.|Example: dc=example, dc=com|
|ldap.enable.ssl|Boolean value that determines if SSL is enabled. If the value of this property is yes, you must also provide values for the ssl.keystore, ssl.password, and ssl.type properties.|yes \| no

|
|ldap.filter|Filter for the LDAP.|Example: \(&\(uid=\*\)\(objectclass=inetOrgPerson\)\)|
|ldap.hostname|Host name of the LDAP server.| |
|ldap.password|Password for connecting to the LDAP directory.|Default: 389 or 663 \(SSL\)|
|ldap.port|Communications port of the LDAP server.|Default: 389 or 663 \(SSL\)|
|ldap.user|Distinguished name of the LDAP administrative user.| |
|ssl.keyStore|File path to the keystore. Required only if the ldap.enable.ssl property is set to yes.| |
|ssl.password|SSL password. Required only if the ldap.enable.ssl property is set to yes.| |
|ssl.type|SSL standard. Required only if the ldap.enable.ssl property is set to yes.|JKS \| PKCS12|
|task.list|Tasks that the Profiles population wizard can perform. You can choose from the following options: LDAP\_OPTIONAL\_TASK\_MARK\_MANAGER, LDAP\_OPTIONAL\_TASK\_FILL\_COUNTRIES, LDAP\_OPTIONAL\_TASK\_FILL\_DEPARTMENT, LDAP\_OPTIONAL\_TASK\_FILL\_ORGANIZATION, LDAP\_OPTIONAL\_TASK\_FILL\_EMPLOYEE, and LDAP\_OPTIONAL\_TASK\_FILL\_WORK\_LOCATIONTo execute multiple tasks, separate the tasks with the comma symbol.

|Example: LDAP\_OPTIONAL\_TASK\_MARK \_MANAGER,LDAP\_OPTIONAL \_TASK\_FILL\_COUNTRIES|
|task.country.csv|File path to the isocc.csv file. Required if you specify LDAP\_OPTIONAL\_TASK\_FILL\_COUNTRIES in the task.list property.|Example: C\\:\\\\build\\\\isocc.csv**Note:** The extra "\\" symbol is an escape character.

|
|task.department.csv|File path to the deptinfo.csv file. Required if you specify LDAP\_OPTIONAL\_TASK\_FILL\_DEPARTMENT in the task.list property.|Example: C\\:\\\\build\\\\deptinfo.csv**Note:** The extra "\\" symbol is an escape character.

|
|task.empoyeetype.csv|File path to the emptype.csv file. Required if you specify LDAP\_OPTIONAL\_TASK\_FILL\_EMPLOYEE in the task.list property.|Example: C\\:\\\\build\\\\emptype.csv**Note:** The extra "\\" symbol is an escape character.

|
|task.organization.csv|File path to the orginfo.csv file. Required if you specify LDAP\_OPTIONAL\_TASK\_FILL\_ORGANIZATION in the task.list property.|Example: C\\:\\\\build\\\\orginfo.csv**Note:** The extra "\\" symbol is an escape character.

|
|task.worklocation.csv|File path to the workloc.csvfile. Required if you specify LDAP\_OPTIONAL\_TASK\_FILL\_ORGANIZATION in the task.list property.|Example: C\\:\\\\build\\\\workloc.csv**Note:** The extra "\\" symbol is an escape character.

|
|TDI.dir|Installation location of Tivoli® Directory Integrator.|Example: C\\:\\\\IBM\\\\TDI\\\\V7.1.1**Note:** The extra "\\" symbol is an escape character.

|

**Note:** For more information about using CSV files to provide additional data for Profiles, see the *Supplemental user data for Profiles* topic. For information about Tivoli Directory Integrator properties, see *IBM® Tivoli Directory Integrator solution properties for Profiles*.

**Parent topic:**[Using the Profiles population wizard in silent mode](../install/t_silent_population_wizard.md)

