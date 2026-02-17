# Creating multiple SQL database instances {#t_create_multiple_sql_database_instances .task}

Create SQL database instances using the SQL Server installation wizard. If you need to have only one database instance, you can skip this task.

**Windows only**: Complete these steps for each instance that you plan to create:

1.  Create a new user and add it to the Administrators group.
2.  Remove the user account from the Users group.
3.  Grant rights to the new user:
    1.  Click **Start** \> **Run** and enter secpol.msc.
    2.  Expand **Local Policies** and click **User Rights Assignment**.
    3.  Open each of the following rights, click **Add User or Group** and add the new user:
        -   Act as part of the operating system
        -   Adjust memory quotas\|Increase quotas for a process
        -   Create a token object
        -   Debug programs
        -   Lock pages in memory
        -   Log on as a service
        -   Replace a process level token

**Tip:** The new account uses the local system as the domain.

When you create multiple database instances, you must install the databases on each instance. If you use the database wizard to install the databases, prepare and run the database wizard once for each instance. If you use the scripts to install the databases, run the scripts once for each instance.

For more information, go to the [Microsoft™ SQL Server Developer Center](http://msdn.microsoft.com/library/ms143516(SQL.90).aspx) to view the SQL Server documentation.

1.  To create SQL database instances, follow these steps:
2.  Run the SQL Server installation wizard. On the Instance Name panel of the installation wizard, select **Named instance**, and then specify a new instance name in the field.

3.  Edit your firewall configuration to allow the new instances to communicate through their listening ports.

4.  Ensure that Named Pipes is enabled in the SQL Server Network Configuration for all instances. For more information, refer to your SQL Server documentation.

    **Notes:**

    -   Use the same collation that you are using for the application databases; that is: `Latin1_General_BIN`. Ensure that the ancillary databases, such as the master, model, tempdb, and msdb databases, use that collation.
    -   For Authentication mode, use Mixed Mode \(Windows™ Authentication and SQL Server Authentication\).
    -   If you receive any warnings or errors from the System Configuration Check dialog, correct them from the SQL Server 2012 instance installation.

**Parent topic:**[Creating SQL Server databases](../install/c_inst_create_database_sql.md)

