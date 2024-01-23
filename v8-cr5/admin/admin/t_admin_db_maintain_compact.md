# Improving access performance and defragmenting DB2 database data {#t_admin_db_maintain_compact .task}

Use the scripts that are provided with HCL Connections to improve access performance and to reclaim fragmented space in an application database.

The script that you run to improve access performance and reclaim the fragmented space of the database takes the database offline. To prepare the database to be taken offline, stop the WebSphere® Application Server instances for each application that you plan to administer.

This task is relevant for DB2® databases only. Oracle and SQL Server compact data automatically.

You do not have to run this script frequently. Schedule this task during another maintenance task that requires you to take the application offline.

1.  Copy the reorg.sql script to the root directory of the application database for which you want to improve performance. The scripts are stored in the following directory:

    -   Linux™:/Lotus\_Connections\_Install/connections.sql/ application\_subdirectory/db2
    -   Microsoft™ Windows™:\\Lotus\_Connections\_Install\\connections.sql\\ application\_subdirectory\\db2
    where application\_subdirectory is the directory of the application for which you are improving database access performance. Choose one of the following subdirectories:

    -   activities
    -   blogs
    -   communities
    -   dogear
    -   files
    -   forum
    -   homepage
    -   metrics
    -   mobile
    -   news
    -   oauth provider
    -   profiles
    -   search
    -   wikis
    **Note:** To improve access performance of the Communities forum database, copy the reorg\_forum.sql file from the communities subdirectory.

2.  From the WebSphere Application Server Integrated Solutions Console, stop the servers that host the application that you want to administer:

    1.  Log in to the WebSphere Application Server Integrated Solutions Console as an administrator.

    2.  Expand **Servers** \> **Server Types** and then select **WebSphere application servers**.

    3.  Select the servers that host the applications for which you want to improve access performance.

    4.  Click **Stop**.

3.  Log in to the database server by using an ID that has administrative privileges.

4.  Open a command prompt and change to the directory to which you copied the script.

5.  Use the following command to run the application scripts for every application:

    db2 -td@ -vf reorg.sql

6.  Restart the application servers.


**Parent topic:**[Maintaining application databases](../admin/t_admin_db_maintain.md)

**Related information**  


[Recovering from a database failure](../admin/c_admin_communities_backup_and_restore.md)

[Backing up Connections](../migrate/t_back-up.md)

