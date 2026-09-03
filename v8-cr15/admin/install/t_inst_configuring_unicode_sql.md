# Configuring Unicode for SQL Server databases {#configuringunicodeforsqlserverdatabases .task}

Each database in your HCL Connections deployment must be configured for Unicode. This procedure must be completed before you install HCL Connections because you cannot configure the database Unicode collation after installation.

You must use the `Latin1_General_BIN` collation for Unicode handling in Connections. The collation must be set during installation because it cannot be modified after installation.

1. In MS SQL Server setup, find the option for changing the collation order. On the **Server Configuration** page, click **Collation**, and then click **Windows collation designator and sort order**.

2. Select `Latin1_General`.

3. Select the **Binary** option to make `Latin1_General_BIN` the default collation.

**Parent topic:**[Creating SQL Server databases](../install/c_inst_create_database_sql.md)
