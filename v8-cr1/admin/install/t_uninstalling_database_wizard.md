# Uninstalling: delete databases with the database wizard 

Use the database wizard to delete databases.

To delete databases with the database wizard, complete the following steps:

1.  Log in as the database administrator, using the account that you created when you installed the database.

2.  From the HCL Connections wizards directory, run the following script file to launch the wizard:

    -   Linux®:

        ```
        ./dbWizard.sh
        
        ```

    -   Microsoft® Windows®:

        ```
        dbWizard.bat 
        ```

3.  On the Welcome panel, click **Launch Information Center** to open the HCL Connections product documentation in a browser window. Click **Next** to continue.

4.  Select the option to **delete** a database, and click **Next**.

5.  Specify the relevant database information, and then click **Next**:

    1.  Select a database type.

    2.  Select the location of the database.

    3.  Specify a database instance.

        **Note:** The database instance that you specify must already exist on your system.

6.  Select the application databases that you want to delete and click **Next**.

    **Note:** Application databases that are not installed are greyed out.

7.  Review the Pre-Configuration Task Summary to ensure that the values you entered on previous panels are correct. If you want to make a change, click **Back** to edit the value. Click **Delete** to begin deleting databases.

8.  Review the Post Configuration Task Summary panel and, if necessary, click **View Log** to open the log file. Click **Finish** to exit the wizard.


**Parent topic:** [Uninstalling](../install/t_uninstall_over.md)

