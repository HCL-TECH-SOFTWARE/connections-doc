# Customizing email digests {#t_customize_email_digests .task}

You can customize the email message that is sent to users as part of the daily and weekly email digests.

**Important:**

-   Starting from Connections 6.0 CR4, a new template version is provided and you can enable it by editing configuration. Go to [Enabling the new notification templates](../admin/t_admin_common_enable_template.md) for details.
-   Before making any customizations, first back up your original notifications folder. In addition, ensure that any customized files are backed up before performing a product upgrade or applying a cumulative refresh or fix pack, as you might need to merge your changes again manually after making updates.

The content of the daily and weekly email digests is defined in templates that are processed by the FreeMarker engine. These templates are used for each recipient of the daily or weekly email digest. You can customize the content of the email digests by modifying the existing template files or by replacing the files with custom templates that you create yourself. You can also modify the notification properties files to add custom strings to the email digests and modify the images used in email digests.

The property named emailDigestBean is passed to the daily and weekly email digest templates. This property stores information about the digest that is related to email digest recipient. It is an instance of the class IEmailDigestStoriesContainer. For more information about the IEmailDigestStoriesContainer class, refer to the following web page: [http://www-10.lotus.com/ldd/lcwiki.nsf/dx/IBM\_Connections\_3.0.1\_Email\_Digest](http://www-10.lotus.com/ldd/lcwiki.nsf/dx/IBM_Connections_3.0.1_Email_Digest)

-   Customize the content of the email message used for the daily and weekly email digests by completing one or more of the following steps.
-   To customize the existing template files:

    1.  Using a text editor, open the dailyDigest.ftl and weeklyDigest.ftl template files from the following location:

        ```
        [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/config/cells/cell\_name/LotusConnections-config/notifications/news
        ```

        where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    2.  Make your customizations to the templates as needed.

        For information about editing the templates, refer to the FreeMarker documentation on the following web page: [http://freemarker.sourceforge.net/docs/index.html](http://freemarker.sourceforge.net/docs/index.html)

        **Note:** The Freemarker version currently used is 2.3.15.

        The main templates used are dailyDigest.ftl and weeklyDigest.ftl. To change the styles and structure of both weekly and daily digests, make your customizations to the style.ftl file in the aggregated folder.

        The aggregated folder is shared by the daily and weekly digest and is specific to them. The folder is located in notifications/news/aggregated.

        **Tip:** One of the modifications you can make is to update or change footer links. To modify links, edit the digestFooter section in style.ftl:

        ```
        <td class="newsletterFooterCell">
            ${urlUtil.linkifySpecial("${urlUtil.LINK_ID.NEWS.ROOT}", "${notification.digest.newsRoot}", ua.resource("FOOTER_UNSUBSCRIBE"), "newsletterFooterLink")}
            </td>
        ```

        In addition to modifying the links that are there, you can insert new links. To insert a static link, use the form:

        ```
        ${urlUtil.linkify("url", "textOfLink", "CSS style")}
        ```

        To add a link to the home page, first find the homepage root in the data model, and specify the new link as follows:

        ```
         ${urlUtil.linkifySpecial("${urlUtil.LINK_ID.HOMEPAGE.ROOT}", "${notification.digest.homepageRoot}", ua.resource("FOOTER_HOME"), "newsletterFooterLink")}
        ```

        If you add new links, remember to add the link text to the notification\_language\_code.properties file and use them in the templates. In the previous example, FOOTER\_HOME is a new resource string containing 'Homepage' text.

    3.  Save your changes and then close the files.

    4.  Synchronize all the nodes using the IBM WebSphere Application Server Integrated Solutions Console.

    5.  Stop and restart the News application.

-   To use your own custom templates instead of the default templates:

    1.  Create the templates by following the instructions provided in the FreeMarker documentation on this web page:

        [http://freemarker.sourceforge.net/docs/index.html](http://freemarker.sourceforge.net/docs/index.html)

        **Note:** The Freemarker version currently used is 2.3.15.

    2.  Save the templates in the following directory:

        ```
        [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/config/cells/cell_name/LotusConnections-config/notifications/news
        ```

    3.  Register the custom templates in the notification-config.xml file.

        1.  Open a command prompt, and then change to the following directory on the system on which you installed the Deployment Manager:

            ```
            [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/bin
            ```

            where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01. For example, on Windows:

            ```
            C:/Program Files/IBM/WebSphere/AppServer/profiles/Dmgr01/bin
            ```

            **Attention:** You must run the following command to start the wsadmin client from this specific directory because the Jython files for the product are stored here. If you try to start the client from a different directory, then the execfile\(\) command that you subsequently call to initialize the administration environment for an HCL Connections™ application does not work correctly.

        2.  Enter the following command to start the wsadmin client:

            -   Linux:

                ```
                ./wsadmin.sh -lang jython -user admin\_user\_id -password admin\_password -port SOAP\_CONNECTOR\_ADDRESS Port
                ```

            -   Microsoft Windows:

                ```
                wsadmin -lang jython -user admin\_user\_id -password admin\_password -port SOAP\_CONNECTOR\_ADDRESS Port
                ```

            where:

            -   admin\_user\_id is the user name of a person in the Administrator role on the IBM WebSphere Application Server.
            -   admin\_password is the password of the WebSphere Application Server administrator.
            -   SOAP\_CONNECTOR\_ADDRESS Port is the SOAP port for the WebSphere Application Server. The default value of the SOAP port is 8879. If you are using the default port value, you do not need to specify this parameter. If you are not using the default and you do not know the port number, you can look up its value in the WebSphere Application Server Integrated Solution Console. To look up the SOAP port number, perform the following steps:
                1.  Open the WebSphere Application Server Integrated Solution Console for the deployment manager, and then select **System Administration** \> **Deployment Manager**.
                2.  In the **Additional properties** section expand **Ports**, and then look for the SOAP\_CONNECTOR\_ADDRESS port entry to find the port number.
            For example:

            -   Linux:

                ```
                ./wsadmin.sh -lang jython -username primaryAdmin -password p@assword -port 8879
                ```

            -   Microsoft Windows:

                ```
                wsadmin -lang jython -username primaryAdmin -password p@assword -port 8879
                ```

        3.  Use the following command to access the Connections configuration files:

            ```
            execfile("connectionsConfig.py")
            ```

        4.  Check out the notification-config.xml file using the following command:

            ```
            LCConfigService.checkOutNotificationConfig("temp\_dir","cell\_name")
            ```

            where:

            -   temp\_dir is the temporary directory to which the configuration XML and XSD files are copied and are stored while you make changes to them. Use forward slashes to separate directories in the file path, even if you are using the Microsoft Windows operating system.

                **Note:** Linux, only: The temporary directory must grant write permissions or the command will not run successfully.

            -   cell\_name is the WebSphere Application Server cell to which you installed the application for which you are enabling mail. This argument is case-sensitive, so type it with care.
        5.  Using a text editor, open the notification-config.xml file from the temporary directory to which you checked it out.
        6.  Look for the following section of code and replace the value of the ftl property for each digest type with the file name of your new templates:

            ```
            <type name="dailyDigest" notificationType="FOLLOW">
              <channel name="email" enabled="true">
                <property name="sender">news_admin@emea.relay.example.com</property>
                <property name="ftl">dailyDigest.ftl</property>
              </channel>
            </type>
            <type name="weeklyDigest" notificationType="FOLLOW">
              <channel enabled="true" name="email">
                <property name="sender">news-admin@emea.relay.example.com</property>
                <property name="ftl">weeklyDigest.ftl</property>
              </channel>
            </type>
            ```

        7.  Save your changes and close the notification-config.xml file.
        8.  Check the configuration files back in using the following command:

            ```
            LCConfigService.checkInNotificationConfig("temp\_dir","cell\_name")
            ```

        9.  To exit the wsadmin client, type exit at the prompt.
        10. Synchronize all the nodes using the Integrated Solutions Console.
        11. Stop and restart all theConnections application servers.
-   To edit the text strings used in the email digest:

    1.  Using a text editor, open the notification\_language\_code.properties files from one of the following directories and make your changes:

        -   News strings:

            ```
            [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm_profile_root/config/cells/cell_name/LotusConnections-config/notifications/news/resources/nls
            ```

        -   Shared strings:

            ```
            [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm_profile_root/config/cells/cell_name/LotusConnections-config/notifications/resources/nls
            ```

        Where language\_code is the locale of the language. For example, notification\_fr.properties.

        **Tip:** To see where each string that you are editing is used, look at the .ftl template files in the same directory and check the statements with the following format:

        ```
        u.resource("key")
        ```

        where `key` is the key of a translated string in the resource bundle notification\_language\_code.properties files.

        Note that the notification framework will look in the application-specific resources folder before moving to the shared strings in the shared resources folder.

    2.  Save your changes and then close the files.

    3.  Synchronize all the nodes using the Integrated Solutions Console.

    4.  Stop and restart the News application.

-   To customize the images used in the email digest:

    **Note:** Email digests include an Connections logo image and individual application icons.

    1.  Locate the images in the following directory:

        ```
        [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/config/cells/cell\_name/LotusConnections-config/resources/images
        ```

    2.  Replace any image that you want to customize with your own version using the same file name.

        The images are sent as MIME attachments to each email digest, so ensure that the image size is small.

    3.  Synchronize all the nodes using the Integrated Solutions Console.

    4.  Stop and restart the News application.


-   **[Editing CR4 templates for email digests](../customize/r_example_edits_to_cr4_templates_for_email_digests.md)**  
HCL Connections™ CR4 offers new ways to customize the email message that is sent to users as part of the daily and weekly email digests.

**Parent topic:**[Editing notification templates](../customize/t_edit_notification_templates_container.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Configuring notifications](../admin/t_admin_common_config_notification.md)

[Verifying email digests](../troubleshoot/ts_t_trigger_email_notifications.md)

[Customizing notifications sent as single emails](../customize/t_customize_notifications.md)

[Customizing shared resources for notifications \(default templates\)](../customize/t_customize_notification_resources.md)

