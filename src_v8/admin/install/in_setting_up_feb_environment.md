# Completing the post installation tasks {#settingupthefebenvironment .task}

After you run the Community Surveys installer for either WebSphere Application Server, you must complete the installation by setting up the Community Surveys environment.

-   Ensure that you have the Administrative user ID and password for your installation, which is the Administrative user ID and password of your IBM WebSphere Application Server.
-   Edge-side-include \(ESI\) caching is enabled by default in WebSphere Application Server. You must disable it for HCL Connections. If it is not disabled, it will cause problems for the HCL Connections Surveys application.

    **Note:** To disable ESI caching, in the WebSphere Administration Console, go to **Servers** \> **Server Types** \> **Web servers** \> **web\_server\_name** \> **Plug-in properties** \> **Caching** and deselect **Enable Edge Side Include \(ESI\) processing to cache the responses**. Save the configuration and synchronize nodes. Then generate the plugin configuration, propagate it, and restart the HTTP server or servers.


When you attempt to log in to Community Surveys for the first time, you are shown a setup screen. Following the steps on the setup screen completes the Community Surveys installation.

There are two phases to set up the Community Surveys environment:

-   Phase 1 - Basic Environment Setup
-   Phase 2 - Secured Environment Setup

1.  Go to the location of your Community Surveys installation.

    1.  Open a web browser and enter http://hostname:port/surveys/.

    The web browser shows the following message: “Community Surveys is not set up. Until that occurs, all normal requests are disabled. Click **Setup** to start the setup process.”

2.  Click **Setup**.

    The Community Surveys setup window opens and automatically runs Phase 1: Basic Environment Setup.

3.  To begin Phase 2- Secured Environment Setup, click **Continue to Secured Setup**.

    You are shown the Community Surveys log in screen.

4.  Log in using the Administrative user ID and password WebSphere Application Server.

    After you log in, you are returned to the Community Surveys setup page, and the Secured Setup continues automatically.

5.  When the Secured Setup is complete, click **Continue to Manager**.

    Community Surveys is now ready to use.

    1.  If there are any upgrades that must be done, a **Fix** button is shown. Click**Fix** to run the required upgrades.

        Once the upgrades have started, read the on-screen instructions and click **Continue to Manager** to begin working with Community Surveys.

6.  After you have verified that Community Surveys is working, create the these extra table spaces to minimize the database size as applications are created. Connect to the Community Surveys DB2® as a DB2 administrator. Enter the following commands:

    db2 “CREATE BUFFERPOOL FEB4KBP IMMEDIATE SIZE 250 AUTOMATIC PAGESIZE 4 K”

    db2 “CREATE LARGE TABLESPACE USERSPACE4K PAGESIZE 4 K MANAGED BY AUTOMATIC STORAGE BUFFERPOOL FEB4KBP”

    db2 “CREATE BUFFERPOOL FEB8KBP IMMEDIATE SIZE 250 AUTOMATIC PAGESIZE 8 K”

    db2 “CREATE LARGE TABLESPACE USERSPACE8K PAGESIZE 8 K MANAGED BY AUTOMATIC STORAGE BUFFERPOOL FEB8KBP”

    db2 “CREATE BUFFERPOOL FEB16KBP IMMEDIATE SIZE 250 AUTOMATIC PAGESIZE 16 K”

    db2 “CREATE LARGE TABLESPACE USERSPACE16K PAGESIZE 16 K MANAGED BY AUTOMATIC STORAGE BUFFERPOOL FEB16KBP”


**Parent topic:**[Installing Community Surveys](../install/t_inst_installing_forms_experience_builder.md)

