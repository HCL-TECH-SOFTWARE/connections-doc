# Preparing the database wizard for Oracle {#task_jvm_kjp_kr .task}

Before you can use the wizard to create databases for your HCL Connections deployment, prepare the database server.

Ensure that you have given the necessary permissions to the user IDs that need to log in to the database system and access the HCL Connections Wizards directory.

**Notes:**

-   If you are planning to create multiple database instances, prepare and run the database wizard once for each instance.
-   Ensure that the Statement cache size for the data sources on WebSphere Application Server is no larger than 50. A higher value could lead to Out Of Memory errors on the application server instance.

-   HCL Connections does not support Pluggable Databases \(PDB\).

To prepare the database wizard, complete the following steps:

1.  Log in to your database server as the root user or system administrator.

2.  \(Linux only\) Grant display authority to all users by running the following commands under the root user or system administrator:

    xhost + // Grant display authority to other users

    **Note:** If granting display authority to all users is a security concern for you, change the command to grant display authority to a specific user or users. For more information about this command, consult your Linux administrator guide.

    echo $DISPLAY // Echo the value of DISPLAY under the root user

3.  \(Linux only\) Ensure that the current user is qualified or else switch to a qualified user by running the following commands:

    -   Oracle

        **Note:** Before running the database wizard, you must create an Oracle database instance.

        su - oracle // oracle is the Oracle database administrator

        export DISPLAY=hostname:displaynumber.screennumber

        xclock //Display the clock, confirming that the current user has display authority and can run the wizard

        // Press Ctrl + C to close the clock and return to the command prompt

        where hostname:displaynumber.screennumber represents the client system, monitor number, and window number. For example: localhost:0.0

    **Note:** If you can see the xclock application running after issuing the xclock command, then you have permission to run the database wizard. If you cannot see the xclock application, run the xhost + command as root user and then run the su command.

4.  Start the database instance:

    **Note:** Run the database commands under the user account that has administrative access to the database.

    -   Linux:
        -   Oracle \(login as oracle or use the su oracle command to change to oracle\)

            export ORACLE\_SID=orcl // Specify the current Oracle database

            export ORACLE\_HOME=/home/oracle/oracle/product/12.1.0//db\_1 for Oracle12c // Specify the Oracle home directory

            cd $ORACLE\_HOME/bin

            ./sqlplus "/ as sysdba"

            startup // Start the current Oracle database

    -   Microsoft™ Windows™:

        **Note:** Windows registers most database instances as a service. You can start or stop a database service manually if necessary.

        -   Oracle
            1.  Open the Windows Services panel: Click **Start** \> **All Programs** \> **Administrative Tools** \> **Services.**
            2.  Right-click the Oracle service.
            3.  From the menu, click **Start** to start the database service.
5.  Copy the Wizards directory in the HCL Connections installation media to the system that hosts the database server.

    **Notes:**

    -   If you have more instances, exit from the current instance and repeat this step for each instance.
    -   \(Linux only\) Ensure that users other than `root` have permission to access the HCL Connections Wizards directory.
6.  \(Linux only\): Restore default display authority by logging out or running the following command.

    ```
    xhost -
    ```


**Parent topic:** [Creating Oracle databases](../install/c_inst_create_database_oracle.md)

