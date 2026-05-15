# Using the database wizard for SQL Server {#task_mrp_xsv_kr .task}

Use the database wizard to create databases for the HCL Connections applications that you plan to install.

Before using the wizard for the first time, you must complete the steps described in the [Preparing the database wizard for SQL](t_inst_prepare_database_wizard_sql.md) topic.

When you are creating a database either with the database wizard or SQL scripts, you must log into the system where the database is hosted with the database administrator account. For SQL Server, the default value is the system administrator.

SQL Server connects to HCL Connections databases with the user accounts that are configured during database creation. The passwords of those user accounts are defined later in this task.

Use the HCL Connections database wizard to create, update, and remove databases.

You can review the scripts that the wizard executes by looking in the \\HCL\_Connections\_Install\\HCLConnections\\native\\connections.sql.zip\\connections.sql directory in the installation media. On SQL Server, the log shows the results of the commands.

**Attention:** The HCL Connections 7.0 database wizard does not create the database for the Community Highlights / Connections Engagement Center \(CEC\) or Feature Foundation \| Export entries to PDF and provides support for Tailored Experience. The Community Highlights database scripts are located in the folder - /Wizards/connections.sql/icec. The Feature Foundation database scripts are located in the folder - /Wizards/connections.sql/ic360. Refer to the procedure in this section to create the databases. You will need to manually run the SQL scripts that are provided with HCL Connections™. See [Creating databases](c_install_db_over.md) for more information.

To create databases with the wizard, complete the following steps:

1.  From the HCL Connections Wizards directory, open the following file to launch the wizard: dbWizard.bat

2.  Click **Next** to continue.

3.  Select the option to **Create** a database and click **Next**.

4.  Enter the details of the database you wish to create and then click **Next**:

    1.  Select a database type.

    2.  Select the location of the database.

    3.  Specify a database instance.

        **Note:** If attempting to use the actual name of the SQL Server as the database instance \(MSSQLSERVER or MSSQL11.MSSQLSERVER\) yields errors, use \\ as the database instance.

5.  Select an application and click **Next**.

    **Notes:**

    -   If you are creating databases in this task, only applications that have not already been installed to a database instance are available. If you are updating databases, you can only choose applications that are already installed.
    -   The News and Search databases are contained in the Home page database.
6.  Enter the password for the databases and then click **Next**. Choose one of the following options:

    -   **Use the same password for all applications**. Enter the password in the **Password** and **Confirm password** fields.
    -   **Create different passwords for each application**. Enter a different password for each application database, and confirm the password in the confirm field.
7.  Specify the location of the database file and then click **Next**.

    -   **Use the same database file location for all applications**. Enter the location of the database or click **Browse** to choose a location.
    -   **Use different database file locations for each application**. For each application, enter the location of the database file or click **Browse** to choose a location.
8.  Review the Pre Configuration Task Summary to ensure that the values you entered on previous pages in the wizard are correct. If you want to make a change, click **Back** to edit the value. Click **Create** to begin creating databases.

    **Note:**

    The **Show detailed database commands** is enabled by default. It previews each SQL command before it is executed by the wizard. If you choose to save the commands, you must have write-access to the folder you choose to save them in.

    1.  Click **Next** to see all the database scripts that are ready to be executed.

    2.  Click **Save As** to save the commands.

    3.  To run the commands listed, click **Execute**.

9.  Review the Post Configuration Task Summarypanel and, if necessary, click **View Log** to open the log file. Click **Finish** to exit the wizard.


**Parent topic:**[Creating SQL Server databases](../install/c_inst_create_database_sql.md)

