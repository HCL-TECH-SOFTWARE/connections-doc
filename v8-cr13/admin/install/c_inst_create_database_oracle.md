# Creating Oracle databases {#concept_dkl_kwn_kr .concept}

Create databases using Oracle. You can use the database wizard or run the SQL scripts that are provided with HCL Connections™.

**Attention:** The HCL Connections 8.0 database wizard does not create the database for the Community Highlights / Connections Engagement Center \(CEC\) or Feature Foundation \| Export entries to PDF and provides support for Tailored Experience. The Community Highlights database scripts are located in the folder - /Wizards/connections.sql/icec. The Feature Foundation database scripts are located in the folder - /Wizards/connections.sql/ic360. Refer to the procedure in this section to create the databases. You will need to manually run the SQL scripts that are provided with HCL Connections. See [Creating databases](c_install_db_over.md) for more information.

There are two methods available to create your databases: SQL scripts and the database wizard. The database wizard automates the process of creating databases for the applications that you plan to install. If the administrator does not have permission to access the databases for modification, use the SQL commands to manually create a database. Each database you create should be made for the exclusive use of an application. One database per application.

-   **[Configuring Unicode for Oracle databases](../install/t_inst_configuring_unicode_oracle.md)**  
You must configure each database used in the HCL Connections deployment for Unicode. Configuration for Unicode must be set before Connections installation because it cannot be set after installation.
-   **[Preparing the database wizard for Oracle](../install/t_inst_prepare_database_wizard_oracle.md)**  
Before you can use the wizard to create databases for your HCL Connections deployment, prepare the database server.
-   **[Using the database wizard for Oracle](../install/t_inst_use_database_wizard_oracle.md)**  
Use the database wizard to create databases for the HCL Connections applications that you plan to install.
-   **[Using the database wizard in silent mode for Oracle](../install/t_inst_wizard_silent_oracle.md)**  
Run the database wizard in silent mode when you need an identical installation on multiple servers.
-   **[Creating Oracle databases manually](../install/t_install_dbs_oracle.md)**  
Create Oracle databases with SQL scripts instead of using the HCL Connections database wizard.
-   **[Creating multiple Oracle databases](../install/t_create_multiple_oracle_databases.md)**  
Create Oracle databases using the Oracle Database Configuration Assistant \(DBCA\). If you need to have only one database instance, you can skip this task.

**Parent topic:**[Creating databases](../install/c_install_db_over.md)

