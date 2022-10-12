# Updating Oracle databases {#t_update_3.0.1_ORA_manual .task}

Manually update HCL Connections 6.5 CR1 databases to version 7.0 in a WebSphere® Application Server and Oracle database environment.

1.  Back up the Homepage database.

2.  From SQLPlus CLI, run the script located in /Wizards/connections.sql/homepage/oracle/upgrade-60CR4-70.sql as follows:

    ```
    @upgrade-60CR4-70.sql
    ```


**Parent topic:**[Updating databases](../migrate/t_update_databases-manual.md)

