# Changing references to database administrative credentials {#t_admin_common_change_admin_db_password .task}

Update the aliases that reference the administrative user IDs and passwords used to manage HCL Connections databases.

This is an optional procedure.

1.  Change the administrative user credentials using the tools provided with the database product that you are using.

    -   DB2® Configuration Assistant
    -   Oracle Enterprise Manager Console
    -   SQL Server Management Studio
2.  To update the reference to the administrative user credentials that you just changed, change the credential information for the corresponding J2C authentication alias. In the WebSphere® Application Server administration console, select **Security** \> **Global security**.

3.  In the Authentication area, expand **Java Authentication and Authorization Service**, and click **J2C authentication data**.

4.  Click the alias name to edit it. Refer to the following tables for alias information.

    Table 1. DB2 database user IDs and aliases

    |Database user ID|Description|Alias|
    |----------------|-----------|-----|
    |LCUSER|User ID of the user with a limited set of administrative privileges to access all of the application tables in the DB2 database.|`activitiesJAASAuth` <br></br> `blogsJAASAuth` <br></br> `communitiesJAASAuth` <br></br> `dogearJAASAuth` <br></br> `filesJAASAuth` <br></br> `forumJAASAuth` <br></br> `homepageJAASAuth` <br></br> `metricsJAASAuth` <br></br> `newsJAASAuth` <br></br> `profilesJAASAuth` <br></br> `searchJAASAuth` <br></br> `wikisJAASAuth`|

    Table 2. Oracle database user IDs and aliases

    |Database user ID|Description|Alias|
    |----------------|-----------|-----|
    |BLOGSUSER|User ID of the user with a limited set of administrative privileges to access the Blogs table in the Oracle database.|`blogsJAASAuth`|
    |DFUSER|User ID of the user with a limited set of administrative privileges to access the Forums table in the Oracle database.|`forumJAASAuth`|
    |DOGEARUSER|User ID of the user with a limited set of administrative privileges to access the Bookmarks table in the SQL Server and Oracle databases.|`dogearJAASAuth`|
    |FILESUSER|User ID of the user with a limited set of administrative privileges to access the Files table in the SQL Server and Oracle databases.|`filesJAASAuth`|
    |HOMEPAGEUSER|User ID of the user with a limited set of administrative privileges to access the Home page table in the Oracle database. The same user ID administers the Home page, Search, and Updates services.|`homepageJAASAuth` <br></br> `newsJAASAuth` <br></br> `searchJAASAuth`|
    |METRICSUSER|User ID of the user with a limited set of administrative privileges to access the Metrics table in the SQL Server and Oracle databases.|`metricsJAASAuth`|
    |OAUSER|User ID of the user with a limited set of administrative privileges to access the Activities table in the SQL Server and Oracle databases.|`activitiesJAASAuth`|
    |PROFUSER|User ID of the user with a limited set of administrative privileges to access the Profiles table in the SQL Server and Oracle databases.|`profilesJAASAuth`|
    |SNCOMMUSER|User ID of the user with a limited set of administrative privileges to access the Communities table in the SQL Server and Oracle databases.|`communitiesJAASAuth`|
    |WIKISUSER|User ID of the user with a limited set of administrative privileges to access the Wikis table in the SQL Server and Oracle databases.|`wikisJAASAuth`|

    Table 3. SQL Server database user IDs and aliases

    |Database user ID|Description|Alias|
    |----------------|-----------|-----|
    |BLOGSUSER|User ID of the user with a limited set of administrative privileges to access the Blogs table in the SQL Server database.|`blogsJAASAuth`|
    |DFUSER|User ID of the user with a limited set of administrative privileges to access the Forums table in the SQL Server database.|`forumJAASAuth`|
    |DOGEARUSER|User ID of the user with a limited set of administrative privileges to access the Bookmarks table in the SQL Server and Oracle databases.|`dogearJAASAuth`|
    |FILESUSER|User ID of the user with a limited set of administrative privileges to access the Files table in the SQL Server and Oracle databases.|`filesJAASAuth`|
    |HOMEPAGEUSER|User ID of the user with a limited set of administrative privileges to access the Home page table in the SQL Server database. The same user ID administers the Home page, Search, and Updates services.|`homepageJAASAuth` <br></br> `newsJAASAuth` <br></br> `searchJAASAuth`|
    |METRICSUSER|User ID of the user with a limited set of administrative privileges to access the Metrics table in the SQL Server and Oracle databases.|`metricsJAASAuth`|
    |OAUSER|User ID of the user with a limited set of administrative privileges to access the Activities table in the SQL Server and Oracle databases.|`activitiesJAASAuth`|
    |PROFUSER|User ID of the user with a limited set of administrative privileges to access the Profiles table in the SQL Server and Oracle databases.|`profilesJAASAuth`|
    |SNCOMMUSER|User ID of the user with a limited set of administrative privileges to access the Communities table in the SQL Server and Oracle databases.|`communitiesJAASAuth`|
    |WIKISUSER|User ID of the user with a limited set of administrative privileges to access the Wikis table in the SQL Server and Oracle databases.|`wikisJAASAuth`|

5.  Change the value in the **Password** field to reflect the change you made in Step 1.

6.  Apply and save the changes.

7.  Restart the servers hosting HCL Connections.


**Parent topic:** [Managing stored credentials](../admin/c_admin_common_change_passwords.md)

