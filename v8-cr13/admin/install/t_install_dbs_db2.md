# Creating IBM DB2 databases manually {#t_install_services_dbs .task}

Create IBM® DB2® databases with SQL scripts instead of using the HCL Connections database wizard.

Use this procedure if you do not want to use the database wizard to create your databases.

The SQL scripts are located in a compressed file, located in the HCL\_Connections\_Install\\HCLConnections\\native\\connections.sql.zip\\connections.sql directory of the HCL Connections setup directory or installation media. Extract this file before proceeding. When extracted, the SQL scripts are located in the HCL\_Connections\_Install/HCLConnections/native/connections.sql/application\_subdirectory directory of the HCL Connections set-up directory or installation media, where application\_subdirectory is the directory that contains the SQL scripts for each application.

**Notes:**

-   If you are using Linux™ on IBM System z® with the DASD driver, the SQL scripts are located in the HCL\_Connections\_Install\_s390/IBMConnections/connections.s390.sql directory.
-   If you are using Linux on IBM System z with the SCSI driver, back up the connections.s390.sql directory and rename the connections.sql directory to connections.s390.sql.

If the database server and HCL Connections are installed on different systems, copy the SQL scripts to the system that hosts the database server.

**Attention:** The HCL Connections 7.0 database wizard does not create the XCC or ESSAPPS databases. XCC is the database for Community Highlights / Connections Engagement Center \(CEC\), and ESSAPPS is the database for Feature Foundation, which provides the basis for Export to PDF and Tailored Experience. The Community Highlights database scripts are located in the folder - /Wizards/connections.sql/icec. The Feature Foundation database scripts are located in the folder - /Wizards/connections.sql/ic360. Refer to the procedure in this section to create the databases. You will need to manually run the SQL scripts that are provided with HCL Connections™. See [Creating databases](c_install_db_over.md) for more information.

**Notes:**

-   When you are creating a database either with the database wizard or SQL scripts, you must log into the system where the database is hosted with the database administrator account. The default values for DB2 are db2admin on Microsoft Windows, and db2inst1 on Linux. For Oracle, the default value on Linux is oracle, and system administrator on Windows. For SQL Server, the default value is the system administrator.
-   Before removing \(or dropping\) a database, stop Connections first to ensure that no database connection is in use; otherwise you will not drop the user and the database removal will not occur.
-   If you run dbWizard.bat but the database wizard does not launch, check whether you have 32-bit DB2 installed. You need to have 64-bit DB2 on a 64-bit system.

You must perform this task for each HCL Connections application that you are installing.

**Note:** To capture the output of each command to a log file, append the following parameter to each command: \>\> /file\_path/db\_application.log

where file\_path is the full path to the log file and application is the name of the log file. For example:

db2 -td@ createDb.sql \>\> /home/db2inst1/db\_activities.log

Ensure that you have write permissions for the directories and log files.

To create the application databases, complete the following steps:

1.  \(Only required if the database server and HCL Connections are installed on different systems.\) Copy the HCL Connections SQL scripts to the DB2 database system. Authorize a user ID that can create the databases.

2.  Log in to the DB2 database system with the user ID of the owner of the database instance. The user ID must have privileges to create a database, a tablespace, tables, and indexes.

    **Notes:**

    -   If you created multiple database instances, specify the user ID for the first instance.
    -   The default administrative ID for Microsoft™ Windows™ is db2admin.
3.  Start the DB2 command line processor in command mode and enter the following command:

    db2start

4.  For Home page and Profiles, change to the directory where the SQL scripts for each application are stored, and then enter the following command to run the script:

    db2 -td@ -vf connections.sql/homepage/db2/createDb.sql

5.  For Home page, run the following script:

    db2 -td@ -vf connections.sql/homepage/db2/initData.sql

6.  For Activities, Blogs, Bookmarks, Communities, Community Highlights / Connections Engagement Center \(ICEC\), Feature Foundation, Files, Forums, Mobile, Push Notifications, and Wikis, change to the directory where the SQL scripts for each application are stored, and then enter the following command to run the script:

    ```
    db2 -td@ -vf connections.sql/activities/db2/createDb.sql
    db2 -td@ -vf connections.sql/communities/db2/createDb.sql
    db2 -tvf  connections.sql/icec/db2/createDb.sql
    db2 -td@ -vf connections.sql/blogs/db2/createDb.sql
    db2 -td@ -vf connections.sql/dogear/db2/createDb.sql
    db2 -td@ -vf connections.sql/files/db2/createDb.sql
    db2 -td@ -vf connections.sql/forum/db2/createDb.sql
    db2 -td@ -vf connections.sql/ic360/db2/createDb.sql
    db2 -td@ -vf connections.sql/metrics/db2/createDb.sql
    db2 -td@ -vf connections.sql/mobile/db2/createDb.sql
    db2 -td@ -vf connections.sql/profiles/db2/createDb.sql
    db2 -td@ -vf connections.sql/pushnotification/db2/createDb.sql
    db2 -td@ -vf connections.sql/wikis/db2/createDb.sql
    ```

    **Note:** The SQL scripts for Bookmarks are stored in the dogear directory.

7.  Run the following command to grant access privileges to the lcuser account for the Activities, Blogs, Bookmarks, Communities, Community Highlights / Connections Engagement Center \(ICEC\), Dogear, Feature Foundation, Files, Forums, Home page, Mobile, Profiles, Push Notifications, and Wikis databases:

    ```
    db2 -td@ -vf connections.sql/homepage/db2/appGrants.sql
    db2 -td@ -vf connections.sql/profiles/db2/appGrants.sql
    db2 -td@ -vf connections.sql/pushnotification/db2/appGrants.sql
    db2 -td@ -vf connections.sql/activities/db2/appGrants.sql
    db2 -td@ -vf connections.sql/communities/db2/appGrants.sql
    db2 -tvf  connections.sql/icec/db2/appGrants.sql
    db2 -td@ -vf connections.sql/blogs/db2/appGrants.sql
    db2 -td@ -vf connections.sql/dogear/db2/appGrants.sql
    db2 -td@ -vf connections.sql/files/db2/appGrants.sql
    db2 -td@ -vf connections.sql/forum/db2/appGrants.sql
    db2 -td@ -vf connections.sql/ic360/db2/appGrants.sql
    db2 -td@ -vf connections.sql/metrics/db2/appGrants.sql
    db2 -td@ -vf connections.sql/mobile/db2/appGrants.sql
    db2 -td@ -vf connections.sql/wikis/db2/appGrants.sql
    
    ```

8.  Run the following commands to generate statistics for the Home page database:

    ```
    db2 -td@ -vf connections.sql/homepage/db2/reorg.sql
    db2 -td@ -vf connections.sql/homepage/db2/updateStats.sql
    ```

9.  Run the following commands to create Calendar tables in the Communities database:

    ```
    db2 -td@ -vf connections.sql/communities/db2/calendar-createDb.sql
    db2 -td@ -vf connections.sql/communities/db2/calendar-appGrants.sql
    ```

10. Close the DB2 command line processor.

11. When you install HCL Connections, the JDBC configuration page of the installation wizard asks you to provide a user ID and password for the Application User. The user ID that you specify on that page must have read and write access to the database. You can provide the user ID of an administrative user or you can create a dedicated user ID with fewer privileges. See the *Creating a dedicated DB2 user* topic for more information.


\(DB2 for Linux on System z only.\) To improve database performance, enable the NO FILE SYSTEM CACHING option. For more information, see the [Enabling NO FILE SYSTEM CACHING for DB2 on System z](t_enable_no-file-system-caching.md#) topic.

**Parent topic:**[Creating DB2 databases](../install/c_inst_create_database_db2.md)

