# Uninstalling: Manually drop databases {#t_uninstall_drop-databases .task}

After uninstalling an HCL Connections application, you can drop any related databases by using the database wizard or by following this manual procedure.

-   Ensure that all HCL Connections database instances are running.
-   Disconnect any open applications from the database.
-   If the database server and IBM® WebSphere® Application Server are on different systems, copy the database scripts to the system that hosts the database server.

If you prefer not to use the database wizard, use this procedure to manually drop DB2®, Oracle, or Microsoft™ SQL Server databases.

The Wizards directory is located in the HCL Connections set-up directory or installation media.

Complete the following steps for your database type:

-   **DB2**:

    1.  Log in to the database server with an authorized administrator account.

        **Note:** The default administrator account is db2inst1 on Linux™, and db2admin on Windows™.

    2.  Run the following command for Communities:

        db2 -td@ -vf calendar-dropDb.sql

    3.  Run the following command for all the other applications:

        db2 -td@ -vf dropDb.sql

        **Note:**

        The SQL scripts are located in the following directory:

        -   Linux: Wizard/connections.sql/application\_subdirectory/db2

            **Notes:**

            -   If you are using Linux on IBM System z® with the DASD driver, the SQL scripts are located in the HCL\_Connections\_Install\_s390/IBMConnections/connections.s390.sql directory.
            -   If you are using Linux on IBM System z with the SCSI driver, back up the connections.s390.sql directory and rename the connections.sql directory to connections.s390.sql.
        -   Microsoft Windows: Wizards\\connections.sql\\application\_subdirectory\\db2
        where application\_subdirectory is the directory for an HCL Connections application.

-   **Oracle**:

    1.  Log in to the database server with an authorized administrator account.

        **Note:** The default administrator account is oracle.

    2.  Set the ORACLE\_SID.

    3.  Run SQL Plus by typing the following command:

        ```
        sqlplus /NOLOG
        ```

    4.  Type the following command to log in as an administrator with the sysdba role:

        ```
        connect as sysdba
        ```

    5.  Run the following command for Communities:

        -   Linux:@Wizards/connections.sql/communities/oracle/calendar-dropDb.sql
        -   Windows:@Wizards\\connections.sql\\communities\\oracle\\calendar-dropDb.sql
    6.  Run the following command for the other applications:

        -   Linux:@Wizards/connections.sql/application\_subdirectory/oracle/dropDb.sql
        -   Windows:@Wizards\\connections.sql\\application\_subdirectory\\oracle\\dropDb.sql
        where application\_subdirectory is the directory for an HCL Connections application.

-   **SQL Server**:

    1.  Open a command prompt.

    2.  Run the following command for Communities:

        -   sqlcmd -U <admin\_user\> -P admin\_password -i Wizards\\connections.sql\\communities\\sqlserver\\calendar-dropDb.sql

        -   If your SQL Server database has multiple instances, add the following line as the first parameter of the command:

            -S sqlserver\_server\_name\\sqlserver\_server\_instance\_name

            where sqlserver\_server\_name is the name of the SQL Server database, and sqlserver\_server\_instance\_name is the name of each database instance.

    3.  Run the following command for the other applications:

        sqlcmd -U <admin\_user\> -P admin\_password -i Wizards\\connections.sql\\application\_subdirectory\\sqlserver\\dropDb.sql

        where application\_subdirectory is the directory for an HCL Connections application.


**Parent topic:**[Uninstalling](../install/t_uninstall_over.md)

