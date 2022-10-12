# Deploying Community Surveys to WebSphere Application Server {#settingupwas .task}

The following instructions describe how to deploy Community Surveys to WebSphere Application Server.

Prior to deploying Community Surveys to WebSphere Application Server, you must create a new DB2 database.

1.  To set up the DB2 database, see [Creating a DB2 database](in_create_db2.md).

2.  To deploy Community Surveys to WebSphere Application Server, open the WebSphere Application Server Administrative console.

3.  Configure the data sources. Depending on your version of WebSphere Application Server, go to either:

    -   **Resources** or
    -   **Application server**
    1.  Expand the JDBC tree, and go to **Data sources**.

        -   Create a new data source
        -   Provide the host name, port, database name, connection ID, and password. The connection ID must have dbadmin access granted for the database.
        -   If you are connecting to a DB2 database with WebSphere Application Server 8 Connection pool data source, ensure that you select a non-XA DB2® JDBC provider, and use a Type 4 driver when configuring the data source.
        -   Click **Test connection** to ensure that the connection is made.
    2.  You must set additional properties for the created data source.

        -   Click the name link for the created data source, then click **Custom Properties**.
        -   Locate “fullyMaterializeLobData”, and change the value to **false**.
        -   Add a property called “progressiveStreaming”, and set the value to 2.
        -   Set the “webSphereDefaultIsolationLevel” to 2.

            **Note:** If you expect a high volume of users, set the default value of **Maximum connections** to 50.

4.  Go to **Mail** \> **Mail sessions**.

    -   Select the correct scope and choose **New**.
    -   Choose **Built-in Mail Provider**.
    -   Provide a name, and a JNDI Name.
    -   Depending on your version of WebSphere Application Server, you might need to click **Apply** before setting the following properties.
    -   Complete the **Outgoing Mail Properties**.
    -   Set the **Server**, and **Return email address** fields.
    -   Click **OK**
5.  Go to **Application Servers** \> **server1** \> **Java and Process Management** \> **Process definition** \> **Java Virtual Machine**, and set the default maximum heap size to at least 512 MB.

6.  Deploy the Community Surveys EAR:

    1.  Go to **Applications** \> **Application Types** \> **WebSphere Enterprise Applications**.

    2.  Select **Install**.

    3.  Select **Local file system**, provide the location of the EAR file, and click **Next**.

        For example: <Installation Directory\>/deploy/ibm-experience-builder.ear.

    4.  From the “How do you want to install the application?” options, select **Detailed**, then click **Next**.

    5.  Accept the defaults presented by clicking **Next** for all steps until **Map resource references to resource**.

    6.  On **Map resource references to resource**:

        -   In the javax.mail.Session section, go to **Target Resource JNDI Name**, and select the mail source.
        -   In the javax.sql.DataSource section, go to **Target Resource JNDI Name**, and select the data source.
    7.  Click **Next**.

    8.  Accept the defaults for the next step and click **Next**.

    9.  On **Map context roots for web modules** use the default context roots, and click **Next**.

    10. On **Map security roles to users or groups**:

        -   Select the **SuperAdminUsers** role, and click **Map Users...** or **Map Groups...**. Select the super administrative users or groups to map to the role.
        -   Select the **EditApplicationUsers** role, and click **Map Special Subjects**. Select either All authenticated in Application's Realms, or All authenticated in Trusted Realms to map the value to the role. If both options are available, select All authenticated in Trusted Realms.
        -   Select the **AdministrativeUsers** role, and click **Map Users...** or **Map Groups...**. Select the administrative users or groups to map to the role.
        -   Select the **UseApplicationUsers** role, and click **Map Special Subjects**. Select either All authenticated in Application's Realms, or All authenticated in Trusted Realms to map the value to the role. If both options are available, select All authenticated in Trusted Realms.
        Additional information about available roles:

        -   **SuperAdminUsers** - Super Administrative Users are users, or groups, with administrator privileges for all Community Surveys applications without explicit security settings.
        -   **AdministrativeUsers** - Administrative users are able to set up the Community Surveys server. You must have an Administrative User to complete the installation process as described in [Completing the installation](in_setting_up_feb_environment.md). A sample setting is: “Special subject: None, Mapped users, admin\_user\_name”.
        -   **EditApplicationUsers** - Authenticated users that can design, deploy, and use Community Surveys applications. A sample setting is: “Special subject: All authenticated in Application's Realms”.
        -   **UseApplicationsUsers** - Authenticated users that can use deployed Community Surveys applications. All users in the **AdministrativeUsers**, and **EditApplicationUsers** automatically have access to use deployed applications. Only adjust this setting if you want to allow a broader set of users than those listed in the **AdministrativeUsers**, and **EditApplicationUsers** roles. Otherwise, leave this role unmapped. A sample setting, if you must map the role, is: “Special subject: All authenticated in Trusted Realms”.
        You must map Administrative users and Edit Application users to an appropriate realm.

    11. Continue to the summary page.

    12. Click **Finish** to deploy the ear file.

7.  Set the class loading and update detection:

    1.  Go to **Enterprise Applications** \> **Forms Experience Builder** \> **Class loader**.

    2.  Go to **Class loader order** and select “Classes loaded with local class loader first \(parent last\)”.

    3.  Go to **Enterprise Applications** \> **Forms Experience Builder** \> **Manage Modules** \> **IBM Forms Experience Builder xxx.war**.

    4.  Go to **Class loader order** and select “Classes loaded with local class loader first \(parent last\)”

    5.  Click **Apply** to apply changes.

8.  Enabling security:

    1.  Expand the **Security** tree and select **Global security**.

    2.  In the **Administrative security** section, select the check box beside **Enable administrative security**.

    3.  In the **Application security** section, select the check box beside **Enable application security**.

    4.  In the **User Account Repository**, ensure **Current Realm Definition** is set to Federated repositories.

    5.  Click **Apply** to apply your changes.

9.  Configuring the user account:

    1.  Go to **Users and Groups** \> **Manage Users**.

        For more information about configuring accounts, see the [IBM WebSphere Application Server Network Deployment](https://www.ibm.com/docs/en/was-nd/8.5.5?topic=network-deployment-all-operating-systems-version-855) documentation.


**Parent topic:**[Installing Community Surveys](../install/t_inst_installing_forms_experience_builder.md)

