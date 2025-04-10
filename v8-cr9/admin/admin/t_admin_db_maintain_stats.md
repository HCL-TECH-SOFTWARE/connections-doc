# Gathering DB2 database statistics daily {#t_admin_db_maintain_stats .task}

Use the scripts that are provided with HCL Connections to gather statistics about DB2® database usage.

Up-to-date statistics are necessary for optimal performance. You can collect statistics while HCL Connections is running. However, it is better to schedule collection during off-peak hours by using a tool such as DB2 Task Scheduler.

This procedure is relevant for DB2 databases only. Oracle and SQL Server databases gather statistics automatically.

To gather DB2 database statistics, complete the following steps:

1.  Copy the statistics script named runstats.sql to the root directory of the application database for which you want to gather statistics. The script is stored in the following directory:

    -   Linux®:/Lotus\_Connections\_Install/connections.sql/ application\_subdirectory/db2
    -   Microsoft® Windows®:\\Lotus\_Connections\_Install\\connections.sql\\ application\_subdirectory\\db2
    where application\_subdirectory is the script file storage directory of the application for which you are compacting the database. Choose one of the following subdirectories:

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
2.  Log into the database server with an ID that has administrative privileges.

3.  Open a command prompt and then change to the directory to which you copied the script.

4.  Use the following command to run the application scripts:

    -   For Activities, Blogs, Bookmarks,Communities, Forums, Mobile, and Profiles: db2 -td@ -vf runstats.sql
    -   For Calendar: db2 -td@ -vf calendar-runstats.sql
    -   For Files, Home page, Metrics, Wikis, and Push Notification: db2 -td@ -vf updateStats.sql

**Parent topic:**[Maintaining application databases](../admin/t_admin_db_maintain.md)

