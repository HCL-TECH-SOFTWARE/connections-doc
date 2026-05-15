# Creating multiple DB2 database instances on Linux {#db2_linux .task}

1.  **Attention:**

-   For each instance that you want to create, log in as the instance owner before creating the instance.
-   Use the DB2® Command Line Processor to enter commands.
-   After creating the instance, add the instance to the user environment variable. The instance is then visible in the DB2 Control Center.
-   An instance called db2inst1 is created during DB2 installation, along with three users: db2inst1, db2fenc1, and dasusr1.
    To create DB2 database instances on Linux, follow these steps:

2.  Create groups for DB2:

    ```
    groupadd -g 999 db2iadm1 
    groupadd -g 998 db2fadm1 
    groupadd -g 997 dasadm1 
    ```

3.  Create users for DB2:

    ```
    useradd -u 1100 -g db2iadm1 -m -d /home/db2instN db2instN -p db2instX
    ```

    where db2instN is the name of a user and db2instX is the password for that user. Create enough users to match the number of database instances.

4.  Create the db2fenc1 user for DB2 in the db2fadm1 group:

    useradd -u 1101 -g db2fadm1 -m -d /home/db2fenc1 db2fenc1 -p db2instX

5.  Create the db2fenc1 user for DB2 in the db2fadm1 group:

    useradd -u 1101 -g db2fadm1 -m -d /home/db2fenc1 db2fenc1 -p db2instX

6.  Create the dasusr1 user for DB2 in the dasadm1 group:

    useradd -u 1102 -g dasadm1 -m -d /home/dasadm1 dasusr1 -p db2instX

7.  To create new DB2 instances, log in with root user and go to/opt/ibm/db2/V10.5/instance.

    ./db2icrt -u db2fenc1 db2instN

    Create enough instances to match the number of databases.

8.  To set the port number of the instance, edit the /etc/services file and add the following line:

    db2c\_<instance\_name\> <instance\_port\>/tcp

    where instance\_name is the name of the instance and instance\_port is the port number of that instance. Repeat this step for each instance.

9.  Log in as the database instance and set the communication protocols for the instance:

    ```
    su - db2instN
    db2 update database manager configuration using svcename 
     db2c_instance\_name
    db2set DB2COMM=tcpip
    db2stop
    db2start
    ```

    Repeat this step for each instance.

10. Edit your firewall configuration to allow the new instances to communicate through their listening ports.


**Parent topic:**[Creating multiple DB2 database instances](../install/t_create_multiple_db2_database_instances.md)

