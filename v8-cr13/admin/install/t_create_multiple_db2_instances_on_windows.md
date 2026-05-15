# Creating multiple DB2 database instances on Windows {#db2_windows .task}

Complete these steps for each instance that you plan to create:

1.  Create a new user and add it to the Administrators group.

    **Note:** If you are using DB2®, also add the new user to the DB2ADMNS group.

2.  Remove the user account from the Users group.
3.  Grant rights to the new user:
    1.  Click **Start** \> **Run** and enter secpol.msc.
    2.  Expand **Local Policies** and click **User Rights Assignment**.
    3.  Open each of the following rights, click **Add User or Group**and add the new user:
        -   Act as part of the operating system
        -   Adjust memory quotas\|Increase quotas for a process
        -   Create a token object
        -   Debug programs
        -   Lock pages in memory
        -   Log on as a service
        -   Replace a process level token

**Tip:** The new account uses the local system as the domain.

1.  **Attention:**

-   For each instance that you want to create, log in as the instance owner before creating the instance.
-   Use the DB2 Command Line Processor to enter commands.
-   After creating the instance, add the instance to the user environment variable. The instance is then visible in the DB2 Control Center.
    To create DB2 database instances on Windows, follow these steps:

2.  Create an instance: db2icrt instance\_name -s ese -u db2\_admin\_user where instance\_name is the name of the instance and db2\_admin\_user is the user account for that instance.

3.  To set the port number of the instance, edit the C:\\WINDOWS\\system32\\drivers\\etc\\services file and add the following line: `db2c_instance\_name instance\_port/tcp`

4.  Set the current instance parameter:`set DB2INSTANCE=instance\_name`

5.  Set the communication protocols for the instance:

    ```
    db2 update database manager configuration using svcename   db2c_instance_name
    db2set DB2COMM=npipe,tcpip
    db2stop
    db2start
    ```

6.  Edit your firewall configuration to allow the new instances to communicate through their listening ports.


**Parent topic:**[Creating multiple DB2 database instances](../install/t_create_multiple_db2_database_instances.md)

