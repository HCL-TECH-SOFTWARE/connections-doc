# Using the database wizard for Oracle {#task_dt3_krv_kr .task}

Use the database wizard to create databases for the HCL Connections applications that you plan to install.

Before you use the wizard for the first time, you must complete the steps that are described in the [Preparing the database wizard for Oracle](t_inst_prepare_database_wizard_oracle.md) topic.

When you are creating a database either with the database wizard or SQL scripts, you must log in to the system where the database is hosted with the database administrator account. For Oracle, the default value on Linux™ is oracle, and system administrator on Windows™.

Oracle connects to HCL Connections databases with the user accounts that are configured during database creation. The passwords of those user accounts are defined later in this task.

\(Oracle only\) Ensure that the Statement cache size for the data sources on WebSphere Application Server is no larger than 50. A higher value could lead to Out Of Memory errors on the application server instance.

Use the HCL Connections database wizard to create, update, and remove databases.

You can review the scripts that the wizard runs by looking in the connections.sql directory in the installation media. On Oracle, the log shows the results of the commands.

**Note:** On windows, if you set ORACLE\_HOME from the command prompt, do not add quotations to the ORACLE\_HOME path. For example, do not set:

```
Set ORACLE_HOME="C:\app\oracu\product\12.1.0\dbhome_1"
```

Instead, set:

```
Set ORACLE_HOME=C:\app\oracu\product\12.1.0\dbhome_1
```

**Attention:** The HCL Connections 7.0 database wizard does not create the database for the Community Highlights / Connections Engagement Center \(CEC\) or Feature Foundation \| Export entries to PDF and provides support for Tailored Experience. The Community Highlights database scripts are located in the folder - /Wizards/connections.sql/icec. The Feature Foundation database scripts are located in the folder - /Wizards/connections.sql/ic360. Refer to the procedure in this section to create the databases. You will need to manually run the SQL scripts that are provided with HCL Connections™. See [Creating databases](c_install_db_over.md) for more information.

To create databases with the wizard, complete the following steps:

1.  From the HCL Connections Wizards directory, open the following file to start the wizard:

    -   Linux: ./dbWizard.sh
    -   Microsoft™ Windows: dbWizard.bat
2.  Click **Next** to continue.

3.  Select the option to **Create** a database and click **Next**.

    **Note:** On the option selection page, you can choose **Export SQL commands list only**. This option exports the create command list for you. It does not validate database connectivity or perform any create tasks.

4.  Enter the details of the database you want to create and then click **Next**:

    1.  Select a database type.

    2.  Select the location of the database.

    3.  Specify a database instance.

5.  Select an application and click **Next**.

    **Notes:**

    -   If you are creating databases in this task, only applications that are not already installed to a database instance are available. If you are updating databases, you can choose applications that are already installed only.
    -   The News and Search databases are contained in the Home page database.
6.  Enter the password for the databases and then click **Next**. Choose one of the following options:

    -   **Use the same password for all applications**. Enter the password in the **Password** and **Confirm password** fields.
    -   **Create different passwords for each application**. Enter a different password for each application database, and confirm the password in the confirm field.
7.  Review the Pre Configuration Task Summary to ensure that the values you entered on previous pages in the wizard are correct. If you want to make a change, click **Back** to edit the value. Click **Create** to begin creating databases.

    **Note:**

    The **Show detailed database commands** is enabled by default. It previews each SQL command before the wizard runs it. If you choose to save the commands, you must have write-access to the folder you choose to save them in.

    1.  Click **Next** to see all the database scripts that are ready to be executed.

    2.  Click **Save As** to save the commands.

    3.  To run the commands that are listed, click **Execute**.

8.  Review the Post Configuration Task Summary page and, if necessary, click **View Log** to open the log file. Click **Finish** to exit the wizard.


**Parent topic:**[Creating Oracle databases](../install/c_inst_create_database_oracle.md)

