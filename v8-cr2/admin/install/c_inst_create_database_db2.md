# Creating DB2 databases {#concept_mml_45n_kr .concept}

Create databases using DB2®. You can use the database wizard or run the SQL scripts that are provided with HCL Connections™.

**Attention:** The HCL Connections 8.0 database wizard does not create the XCC or ESSAPPS databases. XCC is the database for Community Highlights / Connections Engagement Center \(CEC\), and ESSAPPS is the database for Feature Foundation, which provides the basis for Export to PDF and Tailored Experience. The Community Highlights database scripts are located in the folder - /Wizards/connections.sql/icec. The Feature Foundation database scripts are located in the folder - /Wizards/connections.sql/ic360. Refer to the procedure in this section to create the databases. You will need to manually run the SQL scripts that are provided with HCL Connections. See [Creating databases](c_install_db_over.md) for more information.

Before creating your database, you must first register the DB2 product license key and create a dedicated DB2 user. The registered user can then use the database wizard to automate the installation process. If the administrator does not have permission to access the databases for modification, use the SQL commands to manually create a database. Each database you create should be made for the exclusive use of an application. One database per application.

-   **[Registering the IBM DB2 product license key](../install/t_register_db2.md)**  
Register the IBM DB2 product license key for DB2 11.5.6, provided by HCL in the DB2 Universal Fix Pack.
-   **[Creating a dedicated DB2 user](../install/t_db_create_lcuser.md)**  
Create a dedicated IBM® DB2 database user named lcuser with restricted privileges.
-   **[Configuring Unicode for DB2 databases](../install/t_inst_configuring_unicode_db2.md)**  
 You must configure each database used in the HCL Connections deployment for Unicode. Configuration for Unicode must be set before Connections installation because it cannot be set after installation.
-   **[Preparing the database wizard for DB2](../install/t_inst_prepare_database_wizard_db2.md)**  
Before you can use the wizard to create databases for your HCL Connections deployment, prepare the database server.
-   **[Using the database wizard for DB2](../install/t_inst_use_database_wizard_db2.md)**  
Use the database wizard to create databases for the HCL Connections applications that you plan to install.
-   **[Using the database wizard in silent mode for DB2](../install/t_inst_wizard_silent_db2.md)**  
Run the database wizard in silent mode when you need an identical installation on multiple servers.
-   **[Creating IBM DB2 databases manually](../install/t_install_dbs_db2.md)**  
Create IBM® DB2 databases with SQL scripts instead of using the HCL Connections database wizard.
-   **[Creating multiple DB2 database instances](../install/t_create_multiple_db2_database_instances.md)**  
Create multiple DB2 database instances using the DB2 Command Line Processor. If you need to have only one database instance, you can skip this task.
-   **[Enabling NO FILE SYSTEM CACHING for DB2 on System z](../install/t_enable_no-file-system-caching.md)**  
When your operating system is Linux™ on System z®, enable the NO FILE SYSTEM CACHING option for IBM® DB2 databases to improve performance.

**Parent topic:**[Creating databases](../install/c_install_db_over.md)

