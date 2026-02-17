# Preparing the database wizard for DB2 {#task_erf_ncp_kr .task}

Before you can use the wizard to create databases for your HCL Connections deployment, prepare the database server.

Ensure that you have given the necessary permissions to the user IDs that need to log in to the database system and access the HCL Connections Wizards directory.

**Notes:**

-   If you are planning to create multiple database instances, prepare and run the database wizard once for each instance.
-   Create a dedicated IBM® DB2® database user named lcuser. For more information, see the [Creating a dedicated DB2 user](t_db_create_lcuser.md) topic.


To prepare the database wizard, complete the following steps:

1.  Log in to your database server as the root user or system administrator.

2.  \(Linux only\) Grant display authority to all users by running the following commands under the root user or system administrator:

    `xhost + // Grant display authority to other users`

    !!! note
        If granting display authority to all users is a security concern for you, change the command to grant display authority to a specific user or users. For more information about this command, consult your Linux administrator guide.

    `echo $DISPLAY // Echo the value of DISPLAY under the root user
`
3.  \(Linux only\) Ensure that the current user is qualified or else switch to a qualified user by running the following commands:

    -   DB2

        ```
        su - db2inst1 // db2inst1 is the default DB2 administrator

        export DISPLAY=hostname:displaynumber.screennumber
        ```
        where `hostname:displaynumber.screennumber` represents the client system, monitor number, and window number. For example: `localhost:0.0`
        
        ```
        xclock // Display the clock, confirming that the current user has display authority and can run the wizard

        // Press Ctrl + C to close the clock and return to the command prompt
        ```

    !!! note
         If you can see the `xclock` application running after issuing the `xclock` command, then you have permission to run the database wizard. If you cannot see the `xclock` application, run the `xhost +` command as `root` user and then run the `su` command.

4.  Start the database instance:

    !!! note
        Run the database commands under the user account that has administrative access to the database.

    -   Linux:
        -   DB2

            `db2start // Start the current DB2 instance`

            !!! note
                For more information about starting a DB2 instance, see [db2start - Start DB2 command](https://www.ibm.com/docs/db2/11.1?topic=commands-db2start-start-db2) in the DB2 documentation.

    -   Microsoft™ Windows™:

        !!! note
            Windows registers most database instances as a service. You can start or stop a database service manually if necessary.

        -   DB2
            -   DB2

                `db2start // Start the current DB2 instance`

                !!! note
                    For more information about starting a DB2 instance, see [db2start - Start DB2 command](https://www.ibm.com/docs/db2/11.1?topic=commands-db2start-start-db2) in the DB2documentation.

5.  Copy the Wizards directory in the HCL Connections installation media to the system that hosts the database server.

    !!! note “Notes” 

        - If you have more instances, exit from the current instance and repeat this step for each instance.
        - \(Linux only\) Ensure that users other than `root` have permission to access the HCL Connections Wizards directory.
        - For more information about working with multiple instances, see the [Setting variables at the instance level in a partitioned database environment](https://www.ibm.com/docs/en/db2/11.1?topic=srev-setting-instance-level-variables-in-partitioned-database-environment) topic in the DB2 documentation.


**Parent topic:** [Creating DB2 databases](../install/c_inst_create_database_db2.md)

