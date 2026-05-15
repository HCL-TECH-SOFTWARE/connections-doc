# Preparing the database wizard for SQL Server {#task_lsb_mkp_kr .task}

Before you can use the wizard to create databases for your HCL Connections deployment, prepare the database server.

Ensure that you have given the necessary permissions to the user IDs that need to log in to the database system and access the HCL Connections Wizards directory. If you are planning to create multiple database instances, prepare and run the database wizard once for each instance.

To prepare the database wizard, complete the following steps:

1.  Log in to your database server as system administrator.

2.  Start the database instance:

    **Note:** Run the database commands under the user account that has administrative access to the database.

    -   Microsoft™ Windows™:

        **Note:** Windows registers most database instances as a service. You can start or stop a database service manually if necessary.

        -   SQL Server
            1.  Open SQL Server Management Studio.
            2.  Connect the database instance.
            3.  Start the database instance from the studio.
3.  Copy the Wizards directory in the HCL Connections installation media to the system that hosts the database server.

    **Notes:**

    -   If you have more instances, exit from the current instance and repeat this step for each instance.

**Parent topic:**[Creating SQL Server databases](../install/c_inst_create_database_sql.md)

