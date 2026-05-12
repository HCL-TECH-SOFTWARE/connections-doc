# Creating SQL Server databases manually {#t_install_services_dbs_sql .task}

Create Microsoft™ SQL Server databases with SQL scripts instead of using the HCL Connections database wizard.

Follow this procedure if you do not want to use the database wizard to create your databases.

The SQL scripts are located in a compressed file, located in the HCL\_Connections\_Install\\HCLConnections\\native\\connections.sql.zip\\connections.sql directory of the HCL Connections setup directory or installation media. Extract this file before proceeding. When extracted, the SQL scripts are located in the HCL\_Connections\_Install/HCLConnections/native/connections.sql/application\_subdirectory directory of the HCL Connections set-up directory or installation media, where application\_subdirectory is the directory that contains the SQL scripts for each application.

If the database server and HCL Connections are installed on different systems, copy the SQL scripts to the system that hosts the database server.

Before beginning the task, decide whether to use SQL Server with or without an instance name, and with or without an A-Record Alias.

If you installed SQL Server with a default instance, you do not need to supply details of the sql\_server\_instance\_name. For example, in a default instance

-   The name of the server is ServerA.
-   You configured the default instance when setting up SQL Server.
-   Use only the server name.

Alternatively, in an instancename example:

-   ServerB is the name of the server
-   You configured the instancename as Connections when setting up SQL Server.
-   Use the ServerB\\Connections naming format.

Finally, where the A-Record is specified as an Alias for SQL Server:

-   ServerC is the name of the server
-   You configured the default instance when setting up SQL Server.
-   You created an A-Record to use as an alias for a new SQL Server called ServerC.
-   Use the name of the new A-Record. For example, use A-Record-Name\\sqlserver\_server\_instance\_name\>

**Attention:** The HCL Connections 7.0 database wizard does not create the database for the Community Highlights / Connections Engagement Center \(CEC\) or Feature Foundation \| Export entries to PDF and provides support for Tailored Experience. The Community Highlights database scripts are located in the folder - /Wizards/connections.sql/icec. The Feature Foundation database scripts are located in the folder - /Wizards/connections.sql/ic360. Refer to the procedure in this section to create the databases. You will need to manually run the SQL scripts that are provided with HCL Connections™. See [Creating databases](c_install_db_over.md) for more information.

This task describes how to use SQL scripts to create SQL Server databases for HCL Connections applications.

Download the [Microsoft JDBC Driver 4.0 for SQL Server](https://learn.microsoft.com/en-us/sql/connect/jdbc/release-notes-for-the-jdbc-driver?view=sql-server-ver16#42) driver from the Microsoft web site and follow the instructions to extract the driver files.  HCL Connections uses the sqljdbc42.jar file..

!!! note
    
    To capture the output of each command to a log file, append the following parameter to each command:

    ```\>\> \\file\_path\\db\_application.log```

    where file\_path is the full path to the log file and application is the name of the log file.

    For example:

    ```sqlcmd \>\> \\home\\admin\_user\\lc\_logs\\db\_activities.log```

    where sqlcmd is a command with parameters and admin\_user is the logged-in user. Ensure that you have write permissions for the directories and log files.

To create the application database tables, complete the following steps:

1.  Configure SQL Server account mode and Windows™ Authentication mode:

    1.  Create a SQL Server Account such as lcuser.

    2.  Apply sysadmin permissions.

2.  Configure Local Account Mode:

    1.  Create a local account, such as lcuser, on the system that is hosting SQL Server.

    2.  Add the local account to SQL Server with sysadmin permissions.

    3.  Add the local account to the Local Administrators group.

    **Note:** You must specify these credentials later as parameters of the U and P flags for the sqlcmd command.

3.  Create a directory on the SQL Server system where you can store the application databases.

    Later on, you need to specify these directories as parameters of the file path flag for the sqlcmd command.

4.  Create a SQL Server user ID with system database administrator privileges that you can use to manage the database tables or use an existing ID that has administrative privileges, such as `sa`.

    You will specify these credentials as parameters of the `U` and `P` flags for the sqlcmd command later.

5.  Perform the following steps once per application to create each database:

    1.  Open a command prompt and change to the directory to which you copied the database creation scripts for the application.

    2.  Enter the following command to create the application database table:

        **Note:** If your database server has multiple SQL Server instances, add the following parameter as the first parameter in each command:

        -S sqlserver\_server\_name\\sqlserver\_server\_instance\_name

        sqlcmd -U admin\_user -P admin\_password -i "createDb.sql" -v filepath="path\_to\_db" password="password\_for\_application\_user"

        where

        -   admin\_user and admin\_password are the credentials for the user ID that you created in a previous step or an existing ID with administrative privileges.
        -   path\_to\_db is the directory in which the created database is stored.
        -   password\_for\_application\_user is the password for each application database.
        -   The database user IDs are named as follows:

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
            Specify the password to be associated with this user ID.

        !!! note

            -   When you run the installation wizard, you are asked to provide a user ID for the JDBC provider. Specify the user ID created by the database creation script and the password that you defined in this step.
            
            -   You can change the passwords for these database users later in SQL Server Management Studio. If you change the passwords there, you must also change them in the J2C authentication alias in the WebSphere® Application Server Integrated Solutions Console.

        Example for SQL Server Account Mode:

        sqlcmd -S sql\_server\_name\\sql\_server\_instance\_name -U sql\_server\_account -P sql\_server\_account\_password -i "createDb.sql" -v filepath="sql\_server\_data\_path" password="password\_for\_application\_user"

        Example for Local Account Mode:

        sqlcmd -S sql\_server\_name\\sql\_server\_instance\_name -U servername \\local\_account -P local\_account\_password -i "createDb.sql" -v filepath="sql\_server\_data\_path" password="password\_for\_application\_user"

        where

        -   sql\_server\_account andsql\_server\_account\_password are the credentials for SQL Server. These credentials do not apply for Windows Local Account or Windows Domain Account.
        -   servername \\local\_account are the credentials for the user ID.
        -   sql\_server\_data\_path is the directory in which the created database is stored.
6.  \(Home page only\) Perform the following steps for the Home page application:

    1.  Open a command prompt and change to the directory to which you copied the database creation scripts for this application.

    2.  Enter the following command to create the application database table:

        sqlcmd -U admin\_user -P admin\_password -i initData.sql

7.  \(Communities only\) Run the following commands:

    sqlcmd -U admin\_user -P admin\_password -i calendar-createDb.sql

    sqlcmd -U admin\_user -P admin\_password -i calendar-appGrants.sql

8.  Perform the following steps to grant access privileges for the applications:

    1.  Open a command prompt and change to the directory to which you copied the database creation scripts for each application.

    2.  Enter the following command:

        sqlcmd -U admin\_user -P admin\_password -i appGrants.sql

        For Connection Content Manager, enter the following commands:

        library.gcd/sqlserver/appGrants.sql -v password="password="password\_for\_application\_user"

        library.os/sqlserver/appGrants.sql -v password="password="password\_for\_application\_user"

        where password\_for\_application\_user is the password for application database \(FNGCDUSER and FNOSUSER\).


**Parent topic:**[Creating SQL Server databases](../install/c_inst_create_database_sql.md)

