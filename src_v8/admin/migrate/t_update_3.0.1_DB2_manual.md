# Updating Db2 databases {#t_update_3.0.1_DB2_manual .task}

Manually update HCL Connections 7.0 databases to version 8.0 in a WebSphere® Application Server and DB2® database environment.

1.  Back up the Homepage database.

2.  Run the script located in /Wizards/connections.sql/profiles/db2/upgrade-60-80.sql as follows:

    ```
    db2 -td@ -vf upgrade-60-80.sql
    ```


**Parent topic:**[Updating databases](../migrate/t_update_databases-manual.md)

