# Creating a DB2 database for Community Surveys {#settingupwas .task}

The following instructions describe how to manually create a DB2 database for Community Surveys.

In a production environment, you must create a database before you install Community Surveys to WebSphere Application Server.

**Note:** Do not create a database if you want to continue using the same database with the existing user content.

1.  To set up a DB2 database:

    1.  Create an empty DB2 database with a maximum database name of 8 characters, and a maximum page size of 32768.

        For example:

        db2 “CREATE DB FEBDB using codeset UTF-8 territory us PAGESIZE 32768”

        db2 “CONNECT TO FEBDB”

    2.  Connect to the database and create a User Temporary table space.

        Use the following settings for the temporary table space:

        -   Large\_usertemp pagesize 32K
        -   Managed by automatic storage extentsize 16
        -   "bufferpool-name" is the name of your DB2 large buffer pool. Each DB2 server can have a different name.
        For example:

        db2 “CREATE BUFFERPOOL BUFFERFEB IMMEDIATE SIZE 250 PAGESIZE 32K”

        db2 “CREATE USER TEMPORARY TABLESPACE LARGE\_USERTEMP PAGESIZE 32k MANAGED BY AUTOMATIC STORAGE EXTENTSIZE 16 PREFETCHSIZE 16 BUFFERPOOL BUFFERFEB”

    3.  If you have created different users for each database, create a FEBUSER similar to LCUSER in the operating system.

    4.  Assign rights to the user. You can assign rights to the FEBUSER you created or use the LCUSER.

        db2 “GRANT DBADM ON DATABASE TO USER FEBUSER”

        db2 “GRANT SECADM ON DATABASE TO USER FEBUSER”

        db2 “GRANT ACCESSCTRL ON DATABASE TO USER FEBUSER”

        db2 “GRANT DATAACCESS ON DATABASE TO USER FEBUSER”


**Parent topic:**[Installing Community Surveys](../install/t_inst_installing_forms_experience_builder.md)

