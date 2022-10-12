# Updating Db2 databases {#t_update_3.0.1_DB2_manual .task}

Manually update HCL Connections 6.5 CR1 databases to version 7.0 in a WebSphere® Application Server and DB2® database environment.

1.  Back up the Homepage database.

2.  Run the script located in /Wizards/connections.sql/homepage/db2/upgrade-60CR4-70.sql as follows:

    ```
    db2 -td@ -vf upgrade-60CR4-70.sql
    ```


**Parent topic:**[Updating databases](../migrate/t_update_databases-manual.md)

