# Creating databases {#c_install_db_over .concept}

Create databases for the applications that you plan to install. You can use the database wizard or run the SQL scripts that are provided with HCL Connections.

!!! warning
    -   The HCL Connections 8.0 CR1 database wizard does not create the XCC databases automatically. XCC is the database for Community Highlights / Connections Engagement Center \(CEC\). The database scripts that you must run are located in the folder - /Wizards/connections.sql/icec.
    -   The database wizard does not create the ESSAPPS \(ic360\) database automatically. This database is for Feature Foundation, which provides the basis for Export to PDF and Tailored Experience. The database scripts are located in the folder - /Wizards/connections.sql/ic360.
    -   Refer to the procedures in this section to create the Connections databases. For those not created by the wizard, you must manually run the SQL scripts that are provided with Connections \(see the “creating manually” topic for your database environment\).
    -   After upgrading Connections from 7.0, all deployments will be required to manually run the Profile database schema script. See [Updating databases](../migrate/t_update_databases-manual.md).

There are two methods available to create your databases: SQL scripts and the database wizard. Using SQL Scripts allows you to have more control as you manually create and place databases. The database wizard automates the process of creating databases for the applications that you plan to install. It is a more reliable method for creating databases because it validates the databases as you create them.

!!! note
    -   The user who runs the database wizard must have write access to the folder the database wizard uses for the installation. Consult your database documentation for detailed information about preparing your databases.
    -   You must have already created and started a database instance before you can create databases.

If you install the database for Connections Content Manager, it creates two databases: Global Configuration Database and Object Store. Complete the procedures that are appropriate for your deployment:

-   **[Creating DB2 databases](../install/c_inst_create_database_db2.md)**  
Create databases using DB2®. You can use the database wizard or run the SQL scripts that are provided with HCL Connections™.
-   **[Creating Oracle databases](../install/c_inst_create_database_oracle.md)**  
Create databases using Oracle. You can use the database wizard or run the SQL scripts that are provided with HCL Connections™.
-   **[Creating SQL Server databases](../install/c_inst_create_database_sql.md)**  
Create databases with SQL Server. You can use the database wizard or run the SQL scripts that are provided with HCL Connections™.

**Parent topic:** [Pre-installation tasks](../install/c_preinstall_actions.md)

