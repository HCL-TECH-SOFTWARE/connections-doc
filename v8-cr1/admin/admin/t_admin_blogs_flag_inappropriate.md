# Managing content moderation and flagged content {#t_admin_blogs_flag_inappropriate .task}

Edit configuration property settings in the contentreview-config.xml file to enable moderation and to specify what moderators should receive email notification when content requires moderation. Restart your applications to see the changes.

To edit configuration files, you must use the wsadmin client. See *Starting the wsadmin client* for details.

Configure HCL Connections using scripts accessed with the wsadmin client. These scripts use the connectionsConfig object available in WebSphere® Application Server wsadmin client to interact with the HCL Connections configuration file, which is named `contentreview-config.xml`.

The properties in the `contentreview-config.xml` file cannot be edited using the updateConfig command nor displayed using the showConfig command. Instead, you must check out the configuration file using the checkOutContentConfig command, and then edit the property values by opening the checked out property file from the temporary directory using a text editor. After editing the property file, save the file in Unicode format and check the file back in using the checkInContentConfig command and restart the application servers to see the changes.

If moderation is enabled, moderators can review and approve blog comments and entries, forum posts, and community files from a central location. You can configure who can review and approve content with a setting in the contentreview-config.xml file as follows:

-   If `ownerModerate=true` in contentreview-config.xml, a blog, forum, or community owner can moderate content for a blog, forum, or community they own. In addition, content an owner creates is published directly, without requiring moderation.
-   If `ownerModerate=false` in contentreview-config.xml, only users assigned the J2EE moderator role in the WebSphere Application Server console can manage content on the site. For information on assigning users to the moderator role, see the topic *Roles*.

You can also configure the flag inappropriate content feature to specify categories for what type of content to flag, and to specify designated reviewers who will receive email notifications when content is flagged. There are two default categories for inappropriate content: **Legal issue** and **Human resources issue**. You can edit those categories, add new ones, or remove all categories. Configure automatic quarantine if you want flagged content automatically removed from Files, Blogs, Ideation Blogs, or Forums after an item is flagged a specified number of times. The file is also configured with placeholders for the email addresses of designated reviewers. Change those to actual email addresses for users assigned the moderator role who can review flagged content.

**Note:** When you enable moderation, users cannot upload thumbnail images in Media Gallery widgets.

To change moderation configuration settings, complete the following steps:

1.  Start the wsadmin client from the following directory of the system on which you installed the deployment manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01. For example, on Windows:

    ```
    C:\Program Files\IBM\WebSphere\AppServer\profiles\Dmgr01\bin
    ```

    **Attention:** You must run the following command to start the wsadmin client from this specific directory because the Jython files for the product are stored here. If you try to start the client from a different directory, then the execfile\(\) command that you subsequently call to initialize the administration environment for an HCL Connections component does not work correctly. See the topic *Starting the wsadmin client*.

2.  Use the wsadmin client to access and check out the HCL Connections configuration file:

    1.  Access the HCL Connections configuration file using the following command:

        ```
        execfile("connectionsConfig.py")
        ```

        If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

    2.  Check out the HCL Connections content configuration file using the following command:

        ```
        LCConfigService.checkOutContentReviewConfig("working\_directory","cell\_name")
        ```

        where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied and are stored while you make changes to them. Use forward slashes to separate directories in the file path, even if you are using the Microsoft Windows operating system.
        -   cell\_name is the name of the WebSphere Application Server cell hosting the HCL Connections application. This argument is case-sensitive, so type it with care. If you do not know the cell name, type the following command while in the wsadmin command processor:

            ```
            print AdminControl.getCell()
            ```

        For example:

        -   Linux:

            ```
            LCConfigService.checkOutContentReviewConfig("/opt/temp","foo01Cell01")
            ```

        -   Microsoft Windows:

            ```
            LCConfigService.checkOutContentReviewConfig("c:/temp","foo01Cell01")
            ```

3.  From the temporary directory to which you just checked out the HCL Connections configuration files, open the contentreview-config.xml file in a Unicode text editor using the encoding mode of UTF-8 without BOM.

    **Note:** Editing the file using a standard text editor that does not support Unicode could corrupt the file.

4.  To configure settings for managing content in the pre-moderated state, that is, before it is published or when it is updated, set the following options for each application:

    contentApproval
    :   Set to "true" to require moderation for the specified application. By default this is set to "false". When the setting is set to false, moderation is not automatically enforced for an application, but moderation API command and filters still work. Moderators can still perform moderation tasks.

    ownerModerate
    :   Set to "true" to specify that blog owners and community owners can moderate content in blogs or communities they own. By default this is set to "false" so that only users assigned the J2EE moderator role in the WAS console can moderate content. For information on assigning users to the moderator role, see the topic *Roles*.

        **Note:** The **ownerModerate** referred to in this step is the one nested under **contentApproval**.

    In the following example, moderation is enforced for blogs so that all content must be approved by a moderator before it is published or updated in a blog. Each blog owner can moderate content for the blogs they own.

    ```
    <serviceConfiguration>
    <service id="blogs">
    <contentApproval enabled="true">
      <ownerModerate enabled="true" /> 
      </contentApproval>
    ```

5.  To configure settings for managing content in the post-moderated state, that is, content that is flagged by a user after it is published. set the following options for each application:

    contentFlagging
    :   Set to "true" to require moderation for flagged content. By default this is set to "false". When the setting is set to false, this means the user can't flag content from the user interface or using an API command. Blogs Moderation API and filters will still work. Moderators can still perform moderation tasks. Files and Forums API commands will return errors.

    ownerModerate
    :   Set to "true" to specify that forum users can moderate their own flagged content. By default this is set to "false" so that only users assigned the J2EE moderator role in the WAS console can moderate. For information on assigning users to the moderator role, see the topic *Roles*.

        **Note:** The **ownerModerate** referred to in this step is the one nested under **contentFlagging**.

    IssueCategorization
    :   Set to "true" to display a list of categories so that users can choose one when flagging content. By default this is set to "false."

        **Note:** This feature is not available for Files.

    automaticQuarantine
    :   Set to "true" and specify an integer as a value for threshold. When the content in Files, Blogs, Ideation Blogs, or Forums is flagged the number of times specified for the threshold value \(by unique users\), the post is automatically quarantined and removed from the forum. By default this is set to "false."

    flagCategory
    :   To make a <flagCategory\> element available for an application, first define it with a unique id and descriptions in the required languages to the <flaggedCategories\> section of the configuration file, then add it to the <IssueCategorization\> section for the application.

    reviewer email
    :   To add designated reviewers who will receive notification email when content is flagged, replace the placeholder email names for each category with the email addresses of designated reviewers who are assigned the moderator role.

        **Note:** You can also configure a group email here, but each member of the group must be assigned the moderator role.

    In the following example, flagging is enabled for forums and each forum owner can moderate flagged content for the forums they own. Issue categorization is enabled so that users can select a category when flagging content. If ten users flag a forum post, it is automatically quarantined and removed from the forum.

    ```
    <service id="forums">
    <contentApproval enabled="true">
      <ownerModerate enabled="true" /> 
      </contentApproval>
     <contentFlagging enabled="true">
      <ownerModerate enabled="true" /> 
      <automaticQuarantine enabled="true" threshold="10" /> 
     <issueCategorization enabled="true">
     <flagCategory id="001">
      <reviewer email="reviewer1@acme.com" /> 
      <reviewer email="reviewer2@acme.com" /> 
      </flagCategory>
    <flagCategory id="002">
      <reviewer email="reviewer2@acme.com" /> 
      <reviewer email="reviewer3@acme.com" /> 
      </flagCategory>
      </issueCategorization>
      </contentFlagging>
    ```

6.  To add a category for flagged content, add a new <flagCategory\> element with a unique id and descriptions in the required languages to the <flaggedCategories\> section of the configuration file.

    **Tip:** The fastest way to add a content category is to copy an existing <flagCategory\> element, paste it into the file and edit the ID and descriptions in the required languages.

    For example, to add a content category for "Offensive Language" add the following:

    ```
    <flagCategory>
        <id>003</id>
        <description xml:lang="en">Offensive Language</description>
        <description xml:lang="fr">French equivalent</description>
        <description xml:lang="it">Italian equivalent</description>
       </flagCategory>
    ```

    Note that the new ID is "003". This must be unique. As this example shows, you can also add language statements and provide translated strings for category names.

7.  To specify who should receive email notification of content awaiting moderation or flagged content that needs review, replace the placeholder email names in the following section with the email addresses of users assigned the moderator role for that service.

    ```
    <moderator email="moderator3@acme.com" /> 
      <moderator email="moderator4@acme.com" /> 
    ```

8.  Configure moderation for communities so that owners can review and manage the blog, file, and forum content directly in the community as described in the following section.



-   **[Moderating content before it is published](../admin/t_admin_common_moderation_pre-modui.md)**  
Review before it is published to make sure it meets your standards.
-   **[Moderating published content that is flagged](../admin/t_admin_common_moderation_post-modui.md)**  
Review published content that has been flagged as inappropriate and take action on flagged entries and comments.
-   **[Managing moderation when email is disabled](../admin/c_common_admin_moderation_no_email.md)**  
If email is disabled or if users do not have email addresses, some parts of the moderation workflow must be completed manually.
-   **[Configuring moderation for communities](../admin/t_admin_moderation_comms.md)**  
Owners can control what content is added by members \(pre-moderation\) and remove anything that might be considered inappropriate in your organization \(post-moderation\).

**Parent topic:** [Administering Moderation](../install/c_config_moderation_app.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Specifying an administrator email address for Blogs notifications](../admin/t_admin_blogs_admin_email.md)

[Managing flagged content for a blog](../admin/t_blogs_admin_flagged_content.md)

[Moderating Blog comments](../admin/t_admin_blogs_moderating_comments.md)

[Optional post-installation tasks](../install/c_optional_post-install_tasks.md)

[Moderating blog content](../admin/c_blogs_admin_moderation_overview.md)

[Moderated content states for blogs](../admin/c_blogs_admin_moderation_states.md)

[Moderating forums](../admin/c_admin_forums_moderation.md)

[Moderating the content in a community](../admin/c_admin_communities_moderation.md)

