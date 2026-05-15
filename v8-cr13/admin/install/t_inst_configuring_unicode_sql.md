# Configuring Unicode for SQL Server databases {#configuringunicodeforsqlserverdatabases .task}

Each database in your HCL Connections deployment must be configured for Unicode. This procedure must be completed before you install HCL Connections because you cannot configure the database Unicode collation after installation.

You must use the Latin1\_General\_BIN collation for Unicode handling in Connections. The collation must be set during installation because it cannot be modified after installation.

1.  Find the option for changing the collation order.

    -   SQL Server 2016

        During setup, on the **Server Configuration** page, click **Collation** and then click the **Windows collation designator and sort order** option.

2.  Select Latin1\_General.

3.  Select the **Binary** option to make Latin1\_General\_BIN the default collation.


**Parent topic:**[Creating SQL Server databases](../install/c_inst_create_database_sql.md)

