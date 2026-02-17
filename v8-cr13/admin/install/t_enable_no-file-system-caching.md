# Enabling NO FILE SYSTEM CACHING for DB2 on System z {#t_enable_no-file-system-caching .task}

When your operating system is Linux™ on System z®, enable the NO FILE SYSTEM CACHING option for IBM® DB2® databases to improve performance.

-   **Important:** Enabling the NO FILE SYSTEM CACHING option on an unsupported device could cause your database to become inaccessible. Ensure that your file system supports the NO FILE SYSTEM CACHING option and that it meets the [requirements for creating table spaces without file system caching](https://www.ibm.com/docs/db2/11.1?topic=data-table-spaces-without-file-system-caching).

-   Create a backup copy of the DB2 database using native database tools.
-   If the database server and HCL Connections are installed on different systems, copy the SQL scripts to the system that hosts the database server.
-   The SQL scripts for DB2 for Linux on System z are located in the connections.s390.sqlapplication\_subdirectory directory of the HCL Connections set-up directory or installation media, where application\_subdirectory is the directory that contains the SQL scripts for each application.
-   You can enable the NO FILE SYSTEM CACHING option for the Activities, Communities, and Profiles databases only.

When you create DB2 databases for HCL Connections under Linux on System z, the HCL Connections database wizard and the createDb.sql script create table spaces with the FILE SYSTEM CACHING option enabled. If you are storing DB2 table spaces on devices where Direct I/O \(DIO\) is enabled, such as Small Computer System Interface \(SCSI\) disks that use Fibre Channel Protocol \(FCP\), you can improve database performance by enabling the NO FILE SYSTEM CACHING option.

To enable the NO FILE SYSTEM CACHING option, complete the following steps:

1.  Log in to the DB2 database system with the user ID of the owner of the database instance. The user ID must have privileges to create a database, a table space, tables, and indexes.

    **Note:** If you created multiple database instances, specify the user ID for the first instance.

2.  Enable the NO FILE SYSTEM CACHING option for the Activities table space by entering the following commands:

    CONNECT TO OPNACT

    ALTER TABLESPACE OAREGTABSPACE NO FILE SYSTEM CACHING

    CONNECT RESET

3.  Enable the NO FILE SYSTEM CACHING option for the Communities table space by entering the following commands:

    CONNECT TO SNCOMM

    ALTER TABLESPACE SNCOMMREGTABSPACE NO FILE SYSTEM CACHING

    ALTER TABLESPACE DFREGTABSPACE NO FILE SYSTEM CACHING

    CONNECT RESET

4.  Enable the NO FILE SYSTEM CACHING option for the Forums table space by entering the following commands:

    CONNECT TO FORUM

    ALTER TABLESPACE DFREGTABSPACE NO FILE SYSTEM CACHING

    CONNECT RESET

5.  Enable the NO FILE SYSTEM CACHING option for the Profiles table space by entering the following commands:

    CONNECT TO PEOPLEDB

    ALTER TABLESPACE USERSPACE4K NO FILE SYSTEM CACHING

    ALTER TABLESPACE TEMPSPACE4K NO FILE SYSTEM CACHING

    ALTER TABLESPACE USERSPACE32K NO FILE SYSTEM CACHING

    ALTER TABLESPACE TEMPSPACE32K NO FILE SYSTEM CACHING

    CONNECT RESET

6.  Close the DB2 command line processor.


**Parent topic:**[Creating DB2 databases](../install/c_inst_create_database_db2.md)

