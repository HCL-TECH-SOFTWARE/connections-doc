# Creating Oracle databases manually {#t_install_services_dbs_oracle .task}

Create Oracle databases with SQL scripts instead of using the HCL Connections database wizard.

Follow this procedure if you do not want to use the database wizard to create your databases.

The SQL scripts are located in a compressed file, located in the HCL\_Connections\_Install\\HCLConnections\\native\\connections.sql.zip\\connections.sql directory of the HCL Connections setup directory or installation media. Extract this file before proceeding. When extracted, the SQL scripts are located in the HCL\_Connections\_Install/HCLConnections/native/connections.sql/application\_subdirectory directory of the HCL Connections set-up directory or installation media, where application\_subdirectory is the directory that contains the SQL scripts for each application.

If the database server and HCL Connections are installed on different systems, copy the SQL scripts to the system that hosts the database server.

**Notes:**

-   You must specify the Unicode AL32UTF8 character set when you create the Oracle database.
-   The createDb.sql script for communities works only if the blocksize is increased to 16K from the default blocksize of 8K. For more information, refer to your Oracle documentation.

**Attention:** The HCL Connections 7.0 database wizard does not create the database for the Community Highlights / Connections Engagement Center \(CEC\) or Feature Foundation \| Export entries to PDF and provides support for Tailored Experience. The Community Highlights database scripts are located in the folder - /Wizards/connections.sql/icec. The Feature Foundation database scripts are located in the folder - /Wizards/connections.sql/ic360. Refer to the procedure in this section to create the databases. You will need to manually run the SQL scripts that are provided with HCL Connections™. See [Creating databases](c_install_db_over.md) for more information.

This task describes how to use SQL scripts to create Oracle databases for HCL Connections applications. Complete this task only if you do not want to use the database wizard.

**Note:** To capture the output of each command to a log file, run the following commands before starting this task:

sql\> spool on

sql\> spool output\_file

where output\_file is the full path and name of the file where the output is captured.

When you have completed this task, run the following command: sql\> spool off

To manually create the application database tables, complete the following steps:

1.  Log in with the same user ID that you used to install the Oracle database system.

2.  Create an Oracle user ID with system database administrator privileges that you can use to manage the database tables. Alternatively, use an existing ID that has administrative privileges, such as `SYS`.

3.  Set the ORACLE\_SID.

    If you created multiple databases, specify the database on which to install the tables by providing the SID for that database.

4.  Run SQL Plus by entering the following command:

    sqlplus /NOLOG

5.  Log in as an administrator with the sysdba role by entering the following command:

    connect as sysdba

    **Note:** If not logged in as sysdba, the statistics gathering job for the Bookmarks database is not created or correctly scheduled. As a result, database performance is impacted.

6.  Enter the Oracle user ID and password.

7.  For each application, change to that application's SQL scripts directory and enter the following command to create the application's database tables:

    @application\_subdirectory/createDb.sql password

    **Notes:**

    -   Repeat this step for each HCL Connections application that you plan to install.
    -   Begin the command with the **@** symbol.
    -   The createDB script creates a dedicated user ID for the JDBC connector for an application database. Later, when you run the HCL Connections installation wizard, you must provide the user ID that you specify in this step. You can specify one of the following default user IDs:

        -   Activities: OAUSER
        -   Blogs: BLOGSUSER
        -   Bookmarks: DOGEARUSER
        -   Communities: SNCOMMUSER
        -   Community Highlights / Connections Engagement Center: ICEC
        -   Files: FILESUSER
        -   Forums: DFUSER
        -   Global Configuration Database: FNGCDUSER \(Connections Content Manager\)
        -   Home page: HOMEPAGEUSER
        -   IC360: ESSUSER
        -   Metrics: METRICSUSER
        -   Mobile: MOBILEUSER
        -   Object Store: FNOSUSER \(Connections Content Manager\)
        -   Profiles: PROFUSER
        -   Push Notifications: PNSUSER
        -   Wikis: WIKISUSER
        **Notes:**

        -   Each of these default user IDs has a narrower set of privileges than an administrative user ID.
        -   You can change the passwords for these database users later in Oracle Enterprise Manager Console. If you change the passwords there, you must also change them in the J2C authentication alias settings in the WebSphere® Application Server Integrated Solutions Console.
        -   If you plan to install the Metrics application, you can create the database now.
8.  \(Communities only.\) Run the following commands:

    @application\_subdirectory/calendar-createDb.sql

    @application\_subdirectory/calendar-appGrants.sql

9.  \(Dogear only.\) Run the following command:

    @application\_subdirectory/createHistogramStatsJob.sql

    **Note:**

    -   This script creates a job to collect histogram statistics.
    -   You must run this command while logged in with the SYS ID.
    -   For this command to run successfully, grant ANALYZE ANY DICTIONARY and ANALYZE ANY system privileges to the DOGEAR account.
10. \(Home page only.\) Run the following command:

    @application\_subdirectory/initData.sql

11. Run the following command to grant access privileges for each application:

    @application\_subdirectory/appGrants.sql

    Run the following commands:

    library.gcd/oracle/appGrants.sql password

    library.os/oracle/appGrants.sql password

12. Close the SQL Plus window.


**Parent topic:**[Creating Oracle databases](../install/c_inst_create_database_oracle.md)

