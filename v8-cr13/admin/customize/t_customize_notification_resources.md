# Customizing shared resources for notifications \(default templates\) {#t_customize_notification_resources .task}

You can customize the common style and structure documents that are used by notifications in HCL Connections™.

**Important:**

-   Starting from Connections 6.0 CR4, a new template version is provided and you can enable it by editing configuration. Go to [Enabling the new notification templates](../admin/t_admin_common_enable_template.md) for details.
-   Before making any customizations, first back up your original notifications folder. In addition, ensure that any customized files are backed up before performing a product upgrade or applying a cumulative refresh or fix pack, as you might need to merge your changes again manually after making updates.

The notifications used in HCL Connections share common style and structure documents, and are stored in the same location, allowing you to write your customizations once for all notifications, except for email digests. For information about customizing the daily and weekly email digests that are sent to users, see [Customizing email digests](t_customize_email_digests.md).

You can customize notifications that use the default templates by updating the shared resources stored at this location:

```
[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm_profile_root/config/cells/cell-name/LotusConnections-config/notifications/resources
```

|Resource|Description|
|--------|-----------|
|images|Folder containing all the shared images referenced in templates.|
|nls|Folder containing all localized strings shared between templates.|
|commonEEStructure.ftl|Template used for generating the Embedded Application MIME part.|
|commonHeader.ftl|Used in templates to import common .ftl files into scope. Uses acquisition look-up.|
|commonStructure.ftl|Holds the main FreeMarker macros and functions that make up the individual notification components. For example, action, metadata, header, and footer.|
|commonStyle.ftl|One CSS style file used in all individual notification templates.|
|commonUrlUtil.ftl|Specific utility functions for URL link handling. Contains the linkify function.|
|commonUtil.ftl|Provides a common set of utility functions.|

**Note on Freemarker acquisition:** The template files that exist in the resources folder can also be stored in the notifications folders for specific applications. For example, if you want to customize Activities templates, you place commonStyle.ftl at the following location:

```
[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm_profile_root/config/cells/cell-name/LotusConnections-config/notifications/activities/resources
```

Saving the style file in this location allows the Activities templates to pick up different styles that override the default shared ones. Acquisition look-up ensures that templates are imported to a directory that is local to the currently generated template. If the templates do not exist, the parent folders are scanned and the templates from the shared resources folder are loaded. Similarly, the images and nls resources can be stored in a directory that is local to an application folder. The notification framework ensures that local resources are checked and used first before checking the shared resources location.

-   To customize the content of a shared resource, complete one or more of the following steps.
-   To customize the existing template files:

    1.  Make your customizations to the templates as needed. For information about editing the templates, refer to the FreeMarker documentation on the following web page:

        [http://freemarker.sourceforge.net/docs/index.html](http://freemarker.sourceforge.net/docs/index.html)

        **Note:** The FreeMarker version currently used is 2.3.15.

    2.  Save your changes and then close the files.

    3.  Synchronize all the nodes using the IBM WebSphere® Application Server Integrated Solutions Console.

    4.  Synchronize all the nodes using the Integrated Solutions Console.

-   To edit the text strings used in the notifications:

    1.  Using a text editor, open the notification\_language\_code.properties files in the following directory and make your changes:

        ```
        [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/config/cells/cell_name/LotusConnections-config/notifications/resources/nls
        ```

        where language\_code is the locale of the language. For example, notification\_fr.properties.

        **Tip:** To see where each string that you are editing is used, look at the .ftl template files in the same directory and check the statements with the following format:

        ```
        u.resource("key")
        ```

        where `key` is the key of a translated string in the resource bundle notification\_language\_code.properties files.

        Note that the notification framework will look in the local application resource folder before moving to the shared strings in the shared resources folder.

    2.  Save your changes and then close the files.

    3.  Synchronize all the nodes using the Integrated Solutions Console.

    4.  Stop and restart the News application.

-   To customize the images used in notifications:

    1.  Locate the images in the following directory:

        ```
        [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/config/cells/cell\_name/LotusConnections-config/resources/images
        ```

    2.  Replace any image that you want to customize with your own version using the same file name.

        The images are sent as MIME attachments to each email digest, so ensure that the image size is small.

    3.  Synchronize all the nodes using the Integrated Solutions Console.

    4.  Stop and restart the News application.

-   To customize notifications for a specific application:

    1.  Move the resource that you want to customize from the location `[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm_profile_root/config/cells/cell-name/LotusConnections-config/notifications/resources` to the resources folder contained in the application-specific notifications folder. For example, notifications/activities/resources.

    2.  Save your changes and then close the files.

    3.  Synchronize all the nodes using the Integrated Solutions Console.

    4.  Stop and restart the News application.


**Parent topic:**[Customizing notifications](../customize/c_customize_notifications.md)

**Related information**  


[Customizing notifications sent as single emails](../customize/t_customize_notifications.md)

[Customizing email digests](../customize/t_customize_email_digests.md)

