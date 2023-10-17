# Troubleshooting a database connection {#t_validate_db .task}

A faulty JDBC driver or data source can prevent you from accessing an HCL Connections™ application. To troubleshoot and correct these problems, test the database connections.

If you encounter an HTTP 500 - Internal Server Error when attempting to access an HCL Connections application for the first time, ensure that you are using the correct web address. If the web address is correct and you still experience problems, continue with this task.

\(Oracle only\) Ensure that the Statement cache size for the data sources on WebSphere Application Server is no larger than 50. A higher value could lead to Out Of Memory errors on the application server instance.

To test a database connection, complete the following steps:

1.  Log in to the WebSphere® Application Server Integrated Solutions Console of the Deployment Manager.

2.  Select **Resources** \> **JDBC** \> **Data sources**.

3.  Click a data source and check the values of the database name, server name, and port number. If you discover an error, change the incorrect value. Click **OK** and **Save**, and then retest the database connection.

4.  Select the check box for the application whose data source you want to test. The data sources are named as follows:

    -   Activities: **activities**
    -   Blogs: **blogs**
    -   Communities: **communities**
    -   Bookmarks: **dogear**
    -   Files: **files**
    -   Forums: **forums**
    -   Home page: **homepage**
    -   Metrics: **metrics**
    -   Mobile: **mobile**
    -   News: **news**
    -   OAuth: **oauth provider**
    -   Profiles: **profiles**
    -   Search: **search**
    -   Wikis: **wikis**
5.  Click **Test connection**.

6.  If the connection fails, make sure the JAAS Auth alias information is correct.

    1.  Click a data source to review its settings.

    2.  Click **JAAS - J2C authentication data** and then click the JAAS entry for the application. The JAAS entries are named as follows:

        -   Activities: **activitiesJAASAuth**
        -   Blogs: **blogsJAASAuth**
        -   Communities: **communitiesJAASAuth**
        -   Bookmarks: **dogearJAASAuth**
        -   Files: **filesJAASAuth**
        -   Forums: **forumJAASAuth**
        -   Home page: **homepageJAASAuth**
        -   Metrics: **metricsJAASAuth**
        -   Mobile: **mobileJAASAuth**
        -   News: **newsJAASAuth**
        -   Profiles: **profilesJAASAuth**
        -   Search: **searchJAASAuth**
        -   Wikis: **wikisJAASAuth**
    3.  Make sure that the ID in the user ID field is the same User ID that you provided during installation when you were asked to specify a user ID for the database connector.

        The user ID should be one of the following default IDs:

        |Application|DB2® database|DB2 User ID|Oracle database|Oracle User ID|SQL Server database|SQL Server User ID|
        |-----------|-------------|-----------|---------------|--------------|-------------------|------------------|
        |Activities|OPNACT|lcuser|ORCL|ACTIVITIES|OPNACT|OAUSER|
        |Blogs|BLOGS|lcuser|ORCL|BLOGS|BLOGS|BLOGSUSER|
        |Communities|SNCOMM|lcuser|ORCL|SNCOMMUSER|SNCOMM|SNCOMMUSER|
        |Dogear|DOGEAR|lcuser|ORCL|DOGEARUSER|DOGEAR|DOGEARUSER|
        |Files|FILES|lcuser|ORCL|FILESUSER|FILES|FILESUSER|
        |Forums|FORUM|lcuser|ORCL|DFUSER|FORUM|DFUSER|
        |Home page|HOMEPAGE|lcuser|ORCL|HOMEPAGE|HOMEPAGE|HOMEPAGEUSER|
        |Metrics|METRICS|lcuser|ORCL|METRICSUSER|METRICS|METRICSUSER|
        |Mobile|MOBILE|lcuser|ORCL|MOBILEUSER|MOBILE|MOBILEUSER|
        |News|HOMEPAGE|lcuser|ORCL|HOMEPAGE|HOMEPAGE|HOMEPAGEUSER|
        |Profiles|PEOPLEDB|lcuser|ORCL|PROFUSER|PEOPLEDB|PROFUSER|
        |Search|HOMEPAGE|lcuser|ORCL|HOMEPAGE|HOMEPAGE|HOMEPAGEUSER|
        |Wikis|WIKIS|lcuser|ORCL|WIKISUSER|WIKIS|WIKISUSER|

        Consider reentering the password to make sure that the value that you specified at installation is correct.

    4.  After applying any changes, click **OK**. Return to the data source properties page, and then click **Test connection**.

7.  If the connection fails again, make sure the JDBC driver library location information is being detected by WebSphere Application Server.

    1.  From the Integrated Solution Console navigation bar, expand **Environment**, and then click **WebSphere Variables**.

    2.  Scroll down the list to find the database location variable. The variables are named as follows:

        -   Activities: **ACTIVITIES\_JDBC\_DRIVER\_HOME**
        -   Blogs: **BLOGS\_JDBC\_DRIVER\_HOME**
        -   Communities: **COMMUNITIES\_JDBC\_DRIVER\_HOME**
        -   Dogear: **DOGEAR\_JDBC\_DRIVER\_HOME**
        -   Files: **FILES\_JDBC\_DRIVER\_HOME**
        -   Forums: **FORUMS\_JDBC\_DRIVER\_HOME**
        -   Home page: **HOMEPAGE\_JDBC\_DRIVER\_HOME**
        -   Metrics: **MOBILE\_JDBC\_DRIVER\_HOME**
        -   Mobile: **NEWS\_JDBC\_DRIVER\_HOME**
        -   News: **NEWS\_JDBC\_DRIVER\_HOME**
        -   Profiles: **PROFILES\_JDBC\_DRIVER\_HOME**
        -   Search: **SEARCH\_JDBC\_DRIVER\_HOME**
        -   Wikis: **WIKIS\_JDBC\_DRIVER\_HOME**
    3.  Ensure that the corresponding file path in the **Value** column is the same file path that you specified in the **JDBC driver library** field when you ran the installation wizard. For example:

        ```
        C:\IBM\DB2\SQLLIB\java
        ```

        If the file path is incorrect, click the variable name and edit the file path in the **Value** field.

    4.  Select **JDBC** \> **Data sources** to return to the data source. Select the check box next to the data source, and then click **Test connection**.


**Parent topic:**[Troubleshooting tips](../troubleshoot/ts_c_ts_tips_overview.md)

**Related information**  


[Search error messages](../troubleshoot/r_error_codes_search.md)

