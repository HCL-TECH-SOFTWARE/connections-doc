# Customizing shared resources for notifications \(CR4 templates\) {#t_cr4_customize_shared_resources_for_notifications .task}

If you've enabled the Connections 6.0 CR4 common style and structure documents \(templates\) that are used by notifications, you can customize the notifications as follows.

**Important:** Before making any customizations described in this topic, first back up your original notifications folder. In addition, ensure that any customized files are backed up before performing a product upgrade or applying a cumulative refresh or fix pack, as you might need to merge your changes again manually after making updates.

**Tip:** If you just want to change some basic settings for notifications, you can start with [Customizing basic notification settings \(CR4 and later\)](t_customize_new_template.md) and skip the backup precautions.

The notifications used in HCL Connections™ share common style and structure documents, and are stored in the same location, allowing you to write your customizations once for all notifications, except for email digests. For information about customizing the daily and weekly email digests that are sent to users, see [Customizing email digests](t_customize_email_digests.md).

You can customize notifications that use the CR4 templates by updating the shared resources stored at this location:

```
[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm_profile_root/config/cells/cell-name/LotusConnections-config/notifications_v2/resources
```

|Resource|Description|
|--------|-----------|
|images|Folder containing all the shared images referenced in templates.|
|nls|Folder containing all localized strings shared between templates.|
|commonEEStructure.ftl|Template used for generating the Embedded Application MIME part.|
|commonHeader.ftl|Used in templates to import common .ftl files into scope. Uses acquisition look-up.|
|commonProperties.json|Configuration and basic style options. See [Customizing basic notification settings \(CR4 and later\)](t_customize_new_template.md).|
|commonStructure.ftl|Holds the main FreeMarker macros and functions that make up the individual notification components. For example, action, metadata, header, and footer.|
|commonStyle.ftl|Common inline CSS style definitions used in all individual notification templates.|
|commonStyleUtil.ftl|Style utility functions and common definitions.|
|commonUrlUtil.ftl|Specific utility functions for URL link handling. Contains the linkify function.|
|commonUtil.ftl|Provides a common set of utility functions.|

**Note on Freemarker acquisition:** The template files that exist in the resources folder can also be stored in the notifications folders for specific applications. For example, if you want to customize Activities templates, you place commonStyle.ftl at the following location:

```
[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm_profile_root/config/cells/cell-name/LotusConnections-config/notifications_v2/activities/resources
```

Saving the style file in this location allows the Activities templates to pick up different styles that override the default shared ones. Acquisition look-up ensures that templates are imported to a directory that is local to the currently generated template. If the templates do not exist, the parent folders are scanned and the templates from the shared resources folder are loaded. Similarly, the images and nls resources can be stored in a directory that is local to an application folder. The notification framework ensures that local resources are checked and used first before checking the shared resources location.

To edit the notification template files \(\*.ftl\) or for further details, see the following topics:

-   [CR4 notification template reference](r_cr4_notification_template_reference.md)
-   [Editing CR4 templates for single emails](r_example_edits_to_cr4_templates_for_single_emails.md)
-   [Editing CR4 templates for email digests](r_example_edits_to_cr4_templates_for_email_digests.md)

-   To customize the content of a shared resource, complete one or more of the following steps.
-   To edit the text strings used in the notifications:

    1.  Using a text editor, open the notification\_language\_code.properties files in the following directory and make your changes:

        ```
        [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/config/cells/cell_name/LotusConnections-config/notifications_V2/resources/nls
        ```

        where language\_code is the locale of the language. For example, notification\_fr.properties.

        **Tip:** To see where each string that you are editing is used, look at the .ftl template files in the same directory and check the statements with the following format:

        ```
        comUtil.resource("key")
        ```

        where `key` is the key of a translated string in the resource bundle notification\_language\_code.properties files.

        **Note:** The notification framework will look in the local application resource folder before moving to the shared strings in the shared resources folder.

    2.  Save your changes and then close the files.

    3.  Synchronize all the nodes using the Integrated Solutions Console.

    4.  Stop and restart the News application.

-   To edit the localized company name used in notifications email subject and body:

    Before proceeding, ensure that the `platformName` property is not defined in`commonProperties.json`. See [Customizing basic notification settings \(CR4 and later\)](t_customize_new_template.md).

    1.  Using a text editor, open the notification\_language\_code.properties files in the following directory and make your changes:

        ```
        [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/config/cells/cell_name/LotusConnections-config/notifications_V2/resources/nls
        ```

        where language\_code is the locale of the language. For example, notification\_fr.properties.

        The company name, defaulting to "HCL Connections" is saved under the following key:

        ```
        LOTUS_CONNECTIONS=HCL Connections
        ```

        Each language file can have its own version of the company name.

    2.  Save your changes and then close the files.

    3.  Synchronize all the nodes using the Integrated Solutions Console.

    4.  Stop and restart the News application.

-   To customize the application icon images \(stock photoType\) used in notifications:

    1.  Locate the images in the following directory:

        ```
        [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/config/cells/cell\_name/LotusConnections-config/notifications_v2/resources/images
        ```

    2.  Replace any image that you want to customize with your own version using the same file name.

        **Note:**

        -   Application icons are of type png.
        -   The images are sent as MIME attachments to each email digest, so ensure that the image size is small.
        -   The images are scaled to 56 pixels square in the notification.
        -   Images can make use of transparency in conjunction with the sidebarBackgroundColor style property in `commonProperties.json`.
    3.  Synchronize all the nodes using the Integrated Solutions Console.

    4.  Stop and restart the News application.

-   To customize notifications for a specific application:

    1.  Move the resource that you want to customize from the location `[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm_profile_root/config/cells/cell-name/LotusConnections-config/notifications/resources` to the resources folder contained in the application-specific notifications folder. For example, notifications/activities/resources.

    2.  Save your changes and then close the files.

    3.  Synchronize all the nodes using the Integrated Solutions Console.

    4.  Stop and restart the News application.


**Parent topic:**[Customizing notifications](../customize/c_customize_notifications.md)

