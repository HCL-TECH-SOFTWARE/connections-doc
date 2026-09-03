# Uninstalling databases in silent mode {#t_uninstall_silent_database_wizard .task}

Remove databases with the database wizard in silent mode.

Ensure that the wizard has created the response.properties file in the user\_settings/lcWizard/response/dbWizard directory.

**Note:** To create a response file, run the wizard in standard mode and specify that you would like to create a response file. You can modify the existing response file or create your own, using a text editor.

To remove databases in silent mode, complete the following steps:

1.  \(DB2® on Windows™ OS.\) You must perform DB2 administration tasks with full administrator privileges.

    1.  Logged in as the instance owner, open a command prompt and change to the DB2 bin directory. For example: C:\\Program Files\\IBM\\SQLLIB\\BIN.

    2.  Enter the following command: db2cwadmin.bat. This command opens the DB2 command line processor while also setting your DB2 privileges.

2.  From the command prompt, change to the directory where the wizard is located.

3.  Launch the wizard by running the following command:

    -   Linux®: ./dbWizard.sh -silent response\_file
    -   Microsoft® Windows: dbWizard.bat -silent response\_file
    where response\_file is the file path to the response file.

    **Note:** If the path to the response\_file contains a space, this parameter must be enclosed in double quotation marks \("\).


After the wizard has finished, check the log file in the Lotus\_Connections\_set-up\_directory/Wizards/DBWizard directory for messages. The log file name uses the time as a postfix. For example: dbConfig\_20101228\_202501.log.

**Parent topic:**[Uninstalling](../install/t_uninstall_over.md)

