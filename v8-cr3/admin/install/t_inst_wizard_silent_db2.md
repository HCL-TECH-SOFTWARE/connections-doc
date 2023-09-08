# Using the database wizard in silent mode for DB2 {#task_y31_4sw_kr .task}

Run the database wizard in silent mode when you need an identical installation on multiple servers.

Ensure that the wizard has created the response.properties file in the user\_settings/lcWizard/response/dbWizard directory.

To create a response file, run the wizard in standard mode and specify that you would like to create a response file. You can modify the existing response file or create your own, using a text editor.

**Notes:**

-   Before removing \(or dropping\) a database, stop Connections first to ensure that no database connection is in use; otherwise you will not drop the user and the database removal will not occur.
-   If you run dbWizard.bat but the database wizard does not launch, check whether you have 32-bit DB2 installed. You need to have 64-bit DB2 on a 64-bit system.

To create databases in silent mode, complete the following steps:

**Attention:** The HCL Connections 7.0 database wizard does not create the database for the Community Highlights / Connections Engagement Center \(CEC\) or Feature Foundation \| Export entries to PDF and provides support for Tailored Experience. The Community Highlights database scripts are located in the folder - /Wizards/connections.sql/icec. The Feature Foundation database scripts are located in the folder - /Wizards/connections.sql/ic360. Refer to the procedure in this section to create the databases. You will need to manually run the SQL scripts that are provided with HCL Connections™. See [Creating databases](c_install_db_over.md) for more information.

1.  \(DB2® on Windows™ OS.\) You must perform DB2 administration tasks with full administrator privileges. Logged in as the instance owner, open a command prompt and change to the DB2 bin directory. For example: C:\\Program Files\\IBM\\SQLLIB\\BIN. Enter the following command: db2cwadmin.bat. This command opens the DB2 command line processor while also setting your DB2 privileges.

    1.  Logged in as the instance owner, open a command prompt and change to the DB2 bin directory. For example: C:\\Program Files\\IBM\\SQLLIB\\BIN.

    2.  Enter the following command: db2cwadmin.bat. This command opens the DB2 command line processor while also setting your DB2 privileges.

2.  From a command prompt, change to the directory where the wizard is located.

3.  Launch the wizard by running the following command:

    -   Linux®: ./dbWizard.sh -silent response\_file
    -   Microsoft® Windows: dbWizard.bat -silent response\_file
    where response\_file is the file path to the response file.

    **Note:** If the path to the response\_file contains a space, this parameter must be enclosed in double quotation marks \("\).


After the wizard has finished, check the log file in the dbUser\_home/lcWizard/log/dbWizard directory for messages. The log file name uses the time as a postfix. For example: dbConfig\_20110308\_202501.log.

**Parent topic:**[Creating DB2 databases](../install/c_inst_create_database_db2.md)

