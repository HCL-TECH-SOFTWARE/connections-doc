# Changing application URLs {#t_admin_common_change_context_root .task}

Change the context root of URLs that point to HCL Connections applications.

The web address for an IBM® Connections application contains a default context root value. You can change this context root value to conform to corporate policies that limit where server applications can be deployed and how they can be addressed.

For example, the Blogs application is available by default from host\_server/blogs. You could change that base address to, for example, host\_server/IBMConnectionsBlogs to differentiate it from any other blogging service or to conform to corporate guidelines.

To change the context root of an application, complete the following steps:

1.  Log in to the WebSphere® Application Server Integration Solutions Console.

2.  Expand **Applications** \> **Application Types** and then select **WebSphere enterprise applications**.

3.  Click the name of the deployed application and then in the page that loads, click **Context Root For Web Modules**.

    **Note:** Perform this step for each application whose URL you want to change.

4.  Edit the values in the **Context Root** column of the table. The paths must begin with a forward slash \(/\) and must not contain spaces.

    Do not specify a single forward slash \(/\) as the full context root. That specification prevents applications from retrieving Atom feeds properly. Using the default application context \("/"\) is not supported.

5.  Click **OK** and then click **OK** from the server properties page to save the change.

6.  Start the wsadmin client from the following directory of the system where you installed the deployment manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    **Note:** You must start the client from this directory or subsequent commands that you try to run will not execute properly. For more information, see the *Starting the wsadmin client* topic.

7.  Update the HCL Connections configuration file to reflect this context root change. Use the wsadmin client to access and check out the file.

    1.  Enter the following command to load the HCL Connections configuration file: execfile\("connectionsConfig.py"\)

        If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

    2.  Enter the following command to check out HCL Connections configuration files:

        `LCConfigService.checkOutConfig("working\_directory","cell\_name")`

        where:

        -   working\_directory is the temporary working directory to which configuration files are copied. The files are kept in this working directory while you edit them.

            **Notes:**

            -   When you specify a path to the working directory on a system that is running Microsoft Windows, use a forward slash for the directory. For example: "C:/temp".
            -   Linux only: The directory must grant write permissions or the command fails.
        -   cell\_name is the name of the WebSphere Application Server cell that hosts the HCL Connections application. If you do not know the cell name, display it by typing the following command in the wsadmin client: print AdminControl.getCell\(\)

            **Note:** This input parameter is case-sensitive.

8.  Update the value of the href prefix by using the following command:

    LCConfigService.updateConfig\("<web\_module\_name.href.prefix", "new\_context\_root\_value"\)

    Where:

    web\_module\_name is the name of the web module for the application. Each application has one or more web modules \(see the [Application Web Modules table](#ApplicationWebModules.)\), and

    new\_context\_root\_value is the value that you defined for the application's web UI context root in Step 4. For example, to change the context root of the Profiles application, use the following commands:

    LCConfigService.updateConfig\("profiles.href.prefix","/contacts"\) LCConfigService.updateConfig\("personTag.href.prefix","/contacts"\)

    |Application or service name|Web modules|
    |---------------------------|-----------|
    |Activities|/activities /activities/quickrpicker

|
    |Blogs|/blogs|
    |Common|/connections/bookmarklet|
    |/connections|
    |/connections/config|
    |/connections/oauth|
    |/connections/resources|
    |Communities|/communities/communities/calendar

/communities/recomm

|
    |ConnectionsProxy|/connections/proxy|
    |Dogear|/dogear|
    |Extensions|extensions|
    |Files|/files|
    |FileNetEngine\(Available only if FileNet is part of your deployment.\)

|FileNet|
    |clientDownload|
    |P8CE|
    |wsi|
    |acce|
    |pewsi|
    |peengine|
    |ibmccepo|
    |Forums|/forums|
    |Help|/help|
    |Home page|/homepage|
    |Metrics|/metrics/metrics/service

|
    |Mobile|/mobile/connections/filesync

/connections/filediff

|
    |Mobile Administration|mobileAdmin|
    |Moderation|/moderation/moderation/proxy

|
    |Navigator\(Available if FileNet is part of your deployment only.\)

|dm|
    |News|/news|
    |URLPreview|/connections/thumbnail/connections/opengraph

|
    |Profiles|/profiles/profiles/ext/admin

/profiles/seedlist

|
    |PushNotification|/push|
    |RichTextEditors|/connections/rte|
    |Search|/search|
    |WidgetContainer|/connections/opensocial|
    |Wikis|wikis|

    **Note:**

    -   This table is indicative only.

        Context roots can change between releases, so you should check each definition manually.

    -   Some applications have multiple components in the LotusConnections-config.xml file that you might need to update as well. See the examples in the table that follows.
    -   Applications for which the context root currently cannot be changed: Connections Engagement Center \(CEC\), Invite, Sidebar, and Touchpoint.
    |Application|Component|
    |-----------|---------|
    |Common|/connections/bookmarklet|
    |/connections/opengraph|
    |/connections/thumbnail|
    |/connections/opensocial|
    |/connections/resources/socmail-client|
    |/connections/resources|
    |/connections/oauth

|
    |/connections/opensocial|
    |News|/news/widgets/lw|
    |Profiles|/profiles/ibm\_semanticTagServlet|

9.  Check in the file in during the same wsadmin session in which you checked it out. For more information, see *Applying common configuration property changes*.

10. \(Files and Wikis only\) Perform the following steps:

    1.  Check out the Files and Wikis configuration files. For more information, see *Changing configuration property values* in the *Administering Files* and *Administering Wikis* sections of the product documentation.

    2.  Locate the following property:

        ```
        <security>
           <logout href="/files/ibm_security_logout" />
        </security>
        ```

    3.  Change it to the following content:

        ```
        <security>
           <logout href="new\_context\_root\_value\>/ibm_security_logout" />
        </security>
        ```

11. Regenerate the plugin-cfg.xml file:

    1.  Open the WebSphere Application Server Integrated Solutions Console.

    2.  Expand **Servers** \> **Server Types** and then select **Web servers**.

    3.  Select the check box next to the IBM HTTP Server name. For example: webserver1.

    4.  Click **Generate Plug-in**.

    5.  If necessary, click **Propagate Plug-in** to copy the plugin-cfg.xml file from the local directory to the remote system.

12. Restart IBM HTTP Server.

13. Delete the search index. By default, the indexing task runs every 15 minutes and rebuilds the index if you deleted it. For more information, see *Deleting the index*.

14. Update any non-browser clients to point to the new URL. See the client documentation for the required steps.

15. Run the `BlogsAdminService.fixBrokenUrls` command to fix the absolute URLs that are used by embedded images and attachments in Blogs. For more information, see *Replacing URLs in Blogs*.

16. Create a landing page for the old URL that redirects to the new URL.

17. \(Communities only\) For Highlights to work with the changed context root, perform the following steps:

    1.  Check out the widgets-config.xml file.
    2.  Change the widget definition `url` to `/xcc/templates/iWidgetXCCCommunityDefinition.xml`, as in the following example:

        ``` {#codeblock_zpz_ffn_ytb}
        <!-- IBM CONNECTIONS ENGAGEMENT CENTRE - ICEC4Communities -->
        <widgetDef bundleRefId="highlights" defId="Highlights"
        description="Highlights.description" modes="view fullpage" showInPalette="true"
        themes="wpthemeNarrow wpthemeWide wpthemeBanner" uniqueInstance="true"
        url="*/xcc/templates/iWidgetXCCCommunityDefinition.xml*">
        <itemSet>
        <item name="lang" value="{lang}"/>
        </itemSet>
        </widgetDef>
        ```

    3.  In the [Administrator's Home Page](c_admin_homepage_ui.md), click **Add Another App** to register the new app.
    4.  Define the new app using the following settings:
        -   **App Type:** iWidget
        -   **App Title:** XCC
        -   **URL Address** and **Secure URL Address**: Enter the app location containing the new widget definition URL `/xcc/templates/iWidgetXCCCommunityDefinition.xml`.
    5.  Select the checkboxes for **Display on My Page** and **Display on Updates pages**, then click **Save**.

**Parent topic:**[Customizing the deployment](../admin/c_admin_common_customizing.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Applying common configuration property changes](../admin/t_admin_common_save_changes.md)

[Deleting the index](../admin/t_admin_search_delete_index.md)

[Changing Files configuration property values](../admin/t_admin_files_changing_config_properties.md)

[Changing Wikis configuration property values](../admin/t_admin_wikis_changing_config_properties.md)

[Optional post-installation tasks](../install/c_optional_post-install_tasks.md)

[Replacing URLs in Blogs](../admin/t_admin_blogs_replace_urls.md)

