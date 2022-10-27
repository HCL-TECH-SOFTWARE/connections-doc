# Reconfiguring FileNet Collaboration Services 2.0.3 and later {#t_inst_reconfig_fncs_for_203 .task}

Use the IBM® Content Navigator Configuration and Deployment tool to reconfigure FileNet® Collaboration Services 2.0.3 to support changes to Connections Content Manager. For example, reconfigure FileNet Collaboration Services when a host or port that is used to connect to Connections Content Manager is changed. This version of FNCS is a component of IBM Content Navigator 2.0.3.

Set any relevant properties and respective values in the <FNCS\_Install\_Location\>\\configure\\explodedformat\\fncs\\WEB-INF\\classes\\fncs-sitePrefs.properties as described in [Site preference parameters](http://www-01.ibm.com/support/knowledgecenter/SSEUEX_2.0.3/com.ibm.installingeuc.doc/p8qdc270.htm) of the IBM FileNet Collaboration Services IBM Knowledge Center. In particular, set `anonymousAccessEnabled=true` and `enablePropertySheetTemplateMinMax=true`.

**Important:** Set the properties **fncsServerURL** and **fncsServerURLSecure** to the base URL used to address FileNet Collaboration Services, for example, http://example.com and https://example.com. Set the **icURI** property to the base URL used to address HCL Connections, for example, http://example.com. These values might need to change if you configured a security proxy such as Tivoli® Access Manager. Security proxies change the URL or host name that users use to access your deployment.

The following procedure explains how to reconfigure FileNet Collaboration Services that are embedded with a new installation of FileNet from Connections Content Manager.

For an existing FileNet installation, refer to the FileNet Collaboration Services [Information Center](http://pic.dhe.ibm.com/infocenter/p8docs/v5r2m0/index.jsp?topic=%2Fcom.ibm.p8toc.doc%2Fic-homepage.html) for a complete list of configuration options available.

With Connections Content Manager and a new FileNet deployment, these configuration options are available in [<connections\_install\_root\>](../plan/r_install_prerqs.md)\\addons\\ccm\\FNCS\\configure\\profiles\\CCM. For example: [<connections\_install\_root\>](../plan/r_install_prerqs.md)/addons/ccm/FNCS/configure/profiles/CCM on Linux™.

**Note:** The path might be <connections\_install\_root\>\\FNCS...

1.  Run the Enterprise Content Manager Client configuration and deployment tool \(Configuration Manager UI or CMUI\):

    -   For Windows™: connections\_root\\FNCS\\configure\\configmgr.exe
    -   For Linux or AIX®: /opt/IBM/Connections/FNCS/configure/configmgr.bin

        **Note:** If you cannot run configmgr.bin because your system does not support a user interface, then you can change the XML files manually in <FNCS home\>/configure/profiles/CCM. You can then run them with the command as described in Step 3.

    -   Select **Modify an existing deployment profile** from the list of deployment options.
2.  Ensure that the Content Platform Engine is installed and running and then click **Next**.To verify that Content Platform Engine is installed and running, take the following steps:

    1.  Start the WebSphere Integrated Solutions Console in a web browser.

    2.  Browse to **Applications** \> **Application Types** \> **WebSphere enterprise applications**.

    3.  Verify that **FileNetEngine** is listed in the **Enterprise Applications** list.

3.  Load the CCM profile:

    1.  Load the default CCM profile; browse to **File** \> **Open Deployment Profile**.
    2.  Browse to <FNCS home\>\\configure\\profiles\\CCM.
    3.  Select CCM.cfgp.
4.  There are six default tasks. You can reconfigure the tasks that you want and then rerun the tasks by double-clicking each task, entering values, and then saving your updates. Reconfigure tasks as follows:

    -   Task 1 Updating the FileNet P8 Client Connectors files \(TaskName: **downloadcejarstask**\)

        This task downloads the Jace.jar file from the FileNet Content Engine server. The WebSphere® Application Server Community Edition server must be running before you run this task. Enter the FileNet Content Engine server host name and the HTTP port \(usually 9080 or 80\). These values are used only once to download the client libraries from the server. If you have a cluster, you can use the host name for a single server if wanted.

    -   Task 2: Configuring the connection to your LDAP server \(TaskName: **configureldap**\)

        This task is necessary only if you are deploying to a new WebSphere Application Server server that is not yet configured for LDAP-based security. On most CCM target systems, this task is already done.

    -   Task 3: Importing your Content Engine LTPA Keys \(TaskName: **importltpakey**\)

        This task is required only if Connections and/or Content Engine are running on separate WebSphere Application Server cells and you did not previously import keys from those servers. On a typical CCM target system, CE and FNCS run in a single cell alongside Connections so this task is not necessary.

    -   Task 4: Configuring FileNet Collaboration Services \(TaskName: **configurefncstask**\)

        Choose the new feature **Collocated with Content Engine** if FNCS runs on the same WebSphere Application Server server as CE and you want to use a local EJB connection.

        **Note:** This option is recommended for most CCM deployments.

        -   If you specify "True" for this value, you do not have to enter a CE URL. The field is hidden.
        -   If your FNCS is not collocated with CE, enter the CE EJB URL here. The typical format is `http://<hostname>:<ejb port>/FileNet/Engine`, for example:http://ccv01233.usca.example.com:2809/FileNet/Engine.
        HA-clustered URLs are supported, for example:

        ```
        corbaloc::cm-cfgsvr59vm2.usca.example.com:9810,:cm-cfgsvr59vm4.usca.example.com:9810/cell/clusters/cecluster/FileNet/Engine
        ```

        -   Enter the community library object store, community HTTP URL, and community HTTPS URL.
        -   If you want to change the additional custom properties to FNCS, use the included template properties file [connections\_root](../plan/i_ovr_r_directory_conventions.md)\\IBM\\Connections\\addons\\ccm\\FNCS\\configure\\explodedformat\\fncs\\WEB-INF\\classes\\fncs-sitePrefs.properties.
        -   The property that is needed for CCM is **anonymousAccessEnabled=true**.
        -   The property that is needed if you use IBM Docs in the library widget: **enableSharedDrafts=true**.
    -   Task 5: Building the web application \(TaskName: **rebuildear**\) is required if you perform any of the reconfiguration tasks 1 - 4.

        This task generates an .ear file based on the options you specified in the earlier tasks. The default application name is **navigator**, and the default ear name is navigatorEAR.ear. In a plain CCM profile, this .ear file contains the FNCS application only.

        **Note:** Do not change the context root.

        -   Provide the correct Build script path, such as [connections\_root](../plan/i_ovr_r_directory_conventions.md)\\addons\\ccm\\FNCS\\configure\\explodedformat\\create\_ear.bat, and the correct tmp path, such as [connections\_root](../plan/i_ovr_r_directory_conventions.md)\\addons\\ccm\\FNCS\\configure\\tmp.
        -   When this task is finished, you have a completed .ear file that is ready for deployment to WebSphere Application Server. You can deploy it manually using the WebSphere Application Server administrative console or use the Deploy the web application task in CMUI. The navigatorEAR.ear file is located it in the [connections\_root](../plan/i_ovr_r_directory_conventions.md)\\addons\\ccm\\FNCS\\configure\\deploy directory.
    -   Task 6: Deploying the web application \(TaskName: **deployapplication**\)

        If you created a new .ear file in Task 5, then you need to deploy it to WebSphere Application Server again to use it. Choose the **Deployment type**, **Application server node**, and **Application server name** and then run it.

5.  Configure WebSphere Application Server as follows:

    1.  In the Content Navigator Task view, right click **CCM**, then select **Edit Profile Properties**.

    2.  Complete the WebSphere Application Server parameters. Note the following parameter settings:

        -   **Application Server version:** Must be 8.5.
        -   **Profile:** Must be <WebSphere Application Server pathname\>/Dmgr01.
        -   DMGR Administrator user name, password, and confirmation of password.
        -   **SOAP connector port:** Must be the DMGR port.
        -   **Host name:** Must be the DMGR host.
        -   **Deployment session timeout:** Must be the default value \(180\).
    3.  Click **Finish**. You might need to reenter the WebSphere Application Server admin password whenever your restart the FNCS configuration manager session.

    When you complete the WebSphere Application Server properties and reconfigure the tasks that you need, you can run these tasks. If you do not need to configure some tasks, you can right-click the task and choose to disable the task.

6.  When the **Deployed successfully** summary is displayed, close the CMUI.

7.  Log in to the WebSphere Application Server Integrated Solutions Console for the Deployment Manager, and click **System Administration** \> **Nodes**.

8.  Select the check boxes for the nodes and click **Full Resynchronize**.

9.  Install the authentication filter code as follows. You must reinstall the authentication filter every time FNCS is reconfigured.

    1.  In WebSphere Application Server administrative console, browse to WebSphere Enterprise Applications.
    2.  Select the **FileNet Collaboration Services** option.

        **Note:** With the 2.0.3 release, the default application name is **navigator**.

    3.  Click **Update**.
    4.  For **Application update** options, select the**Replace, add, or delete multiple files** option.
    5.  If you are running the browser on the Deployment Manager node, select local file system and then locate the auth\_filter\_patch.zip file.

        **Note:** The auth\_filter\_patch.zip file is in one of two directories, depending on your system configuration:

        -   [connections\_root](../plan/i_ovr_r_directory_conventions.md)/ccm/ccm/ccm/auth\_filter\_patch/auth\_filter\_patch.zip
        -   [connections\_root](../plan/i_ovr_r_directory_conventions.md)/xkit/filenetConfig/auth\_filter\_patch.zip
        **Note:** If the browser is not running on the Deployment Manager \(DM\) node, then select **remote** file system and choose the DM file system, locating the auth\_filter\_patch.zip file in the directory previously stated.

    6.  Click **Next** and **OK** to update the application.
10. Reset the OAuthClient security role to user/group mapping:

    **Note:** You must reset the OAuthClient mapping every time FNCS is reconfigured.

    1.  In the WebSphere Application Server administrative console, browse to WebSphere Enterprise Applications.

    2.  Click the FileNet Collaboration Services \(**navigator**\).

    3.  Click **Security role to user/group mapping** under **Detail Properties,** .

    4.  Select the **OAuthClient** option.

    5.  Under **Map Special Subjects**, click **All Authenticated in Application's Realm** and click **OK** to save changes.

    6.  Click **Save** to save directly to the master configuration

11. Verify the class loader policy for FNCS. Take the following steps:

    1.  Open the Integrated Solutions Console of the WebSphere Application Server hosting the navigator application.

    2.  Click **Applications** \> **Application Types** and select **WebSphere enterprise applications**.

    3.  Click **navigator** \> **Class loading and update detection**.

    4.  In the **Class loader order** section, ensure that **Classes loaded with local class loader first \(parent last\)** is selected.

    5.  Click **OK**.

    6.  Click **navigator** \> **Manage Modules** \> **IBM FileNet Collaboration Services**.

    7.  In the **General properties** section, ensure that **Classes loaded with local class loader first \(parent last\)** is selected in **Class loader order**.

    8.  Click **OK** and save your changes.

12. Restart the navigator application.

13. You might need to update the HTTP server mappings when you complete reconfiguring FileNet Collaboration Services. For more information, see [Mapping applications to IBM HTTP server](t_map_apps2ihs.md).


A summary supplies suggestions of how to confirm that the service is up and running.

**Related information**  


[Mapping applications to IBM HTTP Server](../install/t_map_apps2ihs.md)

