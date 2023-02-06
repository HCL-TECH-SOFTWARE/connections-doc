# Creating multiple DB2 database instances on AIX {#db2_aix .task}

1.  **Attention:**

-   For each instance that you want to create, log in as the instance owner before you create the instance.
-   Use the DB2® command line processor to enter commands.
-   After you create the instance, add the instance to the user environment variable.
-   An instance that is called db2inst1 is created during DB2 installation.
    To create DB2 database instances on AIX, follow these steps:

2.  Create a group for DB2:`mkgroup db2iadm1`

3.  Create a user for DB2:`mkuser groups=db2iadm1 db2instN`, where db2instN is the name of a user. DB2 prompts you to enter a password for the user. Repeat this step to create enough users to match the number of database instances.

4.  To create DB2 instances, log in with root user and go to /opt/ibm/db2/V11.1/instance.

    ```
    ./db2icrt -u db2instN db2instN
    ```

    Where db2instN is the name of a user and also the name of an instance. Repeat this step to create enough instances to match the number of databases.

5.  To set the port number of the instance, edit the /etc/services file and add the following line:

    db2c\_instance\_name instance\_port/tcp where instance\_name is the name of the instance and instance\_port is the port number of that instance. Repeat this step for each instance.

6.  Set the communication protocols for the instance:

    ```
    db2 update database manager configuration using svcename db2c_instance\_name
    db2set DB2COMM=tcpip
    db2stop
    db2start
    ```

    Repeat this step for each instance.

7.  Edit your firewall configuration to allow the new instances to communicate through their listening ports.


**Parent topic:**[Creating multiple DB2 database instances](../install/t_create_multiple_db2_database_instances.md)

