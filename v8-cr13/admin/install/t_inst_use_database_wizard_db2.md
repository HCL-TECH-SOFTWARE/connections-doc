# Using the database wizard for DB2 {#task_gwk_qlv_kr .task}

Use the database wizard to create databases for the HCL Connections applications that you plan to install.

Before using the wizard for the first time, you must complete the steps described in the [Preparing the database wizard for DB2®](t_inst_prepare_database_wizard_db2.md) topic.

When you are creating a database either with the database wizard or SQL scripts, you must log into the system where the database is hosted with the database administrator account. The default values for DB2 are db2admin on Microsoft™ Windows™, and db2inst1 on Linux™.

If you use only one database instance and if that instance includes other databases besides HCL Connections, configure the numdb parameter to match the total number of databases on the instance. For more information, go to the [numdb](https://www.ibm.com/docs/db2/11.1?topic=dmcp-numdb-maximum-number-concurrently-active-databases-including-host-system-i-databases) topic in the IBM DB2 documentation.

**Note:** Before removing \(or dropping\) a database, stop Connections first to ensure that no database connection is in use; otherwise you will not drop the user and the database removal will not occur.

DB2 uses a user account called `lcuser`. If you are creating a DB2 database with SQL scripts, you must manually create the `lcuser` account on your operating system and then run the appGrants.sql script to grant the appropriate privileges to the `lcuser` account. When you use the database wizard, this script runs automatically. For more information, see the *Creating a dedicated DB2 user* topic.

**Notes:**

-   If you are using DASD driver, the SQL scripts are located in the connections.s390.sql/application\_subdirectory directory of the HCL Connections setup directory or installation media.
-   If you are using SCSI driver, back up the connections.s390.sql directory and rename the connections.sql directory to connections.s390.sql.

Use the HCL Connections database wizard to create, update, and remove databases.

You can review the scripts that the wizard executes by looking in the connections.sql directory in the installation media. On DB2, the commands are shown in the log that the wizard creates.

**Attention:** HCL Connections™7.0 install wizard does not create the database for the Community Highlights / Connections Engagement Center \(ICEC\) application. You will need to manually run the SQL scripts that are provided with HCL Connections. See [Creating IBM DB2 databases manually](t_install_dbs_db2.md) to create the ICEC database.

To create databases with the wizard, complete the following steps:

1.  On Windows, you must perform DB2 administration tasks with full administrator privileges.

    1.  Logged in as the instance owner, open a command prompt and change to the DB2 bin directory. For example: C:\\Program Files\\IBM\\SQLLIB\\BIN.

    2.  Enter the following command: db2cwadmin.bat. This command opens the DB2 command line processor while also setting your DB2 privileges.

2.  From the HCL Connections Wizards directory in a command line, enter the following command to launch the wizard:

    -   Linux: ./dbWizard.sh
    -   Microsoft Windows: dbWizard.bat
3.  Click **Next** to continue.

4.  Select the option to **Create** a database and click **Next**.

    **Note:** On the option selection panel, you can choose **Export SQL commands list only**. This option exports the create command list for you. It does not validate database connectivity or perform any create tasks.

5.  Enter the details of the database you wish to create and then click **Next**:

    1.  Select a database type.

    2.  Select the location of the database.

    3.  Specify a database instance.

6.  Select an application and click **Next**.

    **Notes:**

    -   If you are creating databases in this task, only applications that have not already been installed to a database instance are available. If you are updating databases, you can only choose applications that are already installed.
    -   The News and Search databases are contained in the Home page database.
7.  Review the Pre Configuration Task Summary to ensure that the values you entered on previous pages in the wizard are correct. If you want to make a change, click **Back** to edit the value. Click **Create** to begin creating databases.

    **Note:**

    The **Show detailed database commands** is enabled by default. It previews each SQL command before it is executed by the wizard. If you choose to save the commands, you must have write-access to the folder you choose to save them in.

    1.  Click **Next** to see all the database scripts that are ready to be executed.

    2.  Click **Save As** to save the commands.

    3.  To run the commands listed, click **Execute**.

8.  Review the Post Configuration Task Summary panel and, if necessary, click **View Log** to open the log file. Click **Finish** to exit the wizard.


**Parent topic:**[Creating DB2 databases](../install/c_inst_create_database_db2.md)

