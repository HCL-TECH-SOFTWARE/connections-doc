# Updating SQL Server databases {#t_update_3.0.1_SQLS_manual .task}

Manually update HCL Connections 6.5 CR1 databases to version 7.0 in a WebSphere® Application Server and Microsoft™ SQL Server database environment.

1.  Back up the Homepage database.

2.  Run the script located in /Wizards/connections.sql/homepage/sqlserver/upgrade-60CR4-70.sql as follows:

    ```
    sqlcmd -U dbUser -P dbPassword -i upgrade-60CR4-70.sql
    ```


**Parent topic:**[Updating databases](../migrate/t_update_databases-manual.md)

