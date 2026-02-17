# Customizing basic notification settings \(CR4 and later\) {#task_spz_ppt_cgb .task}

You can change many aspects of notifications in Connections 6.0 CR4 and later by making changes to a common properties file.

Make sure that you first [enable the updated templates](../admin/t_admin_common_enable_template.md).

**Note:** **You can also make changes by customizing the shared resources used by the templates, as well as the templates themselves.** For more information, see [Customizing shared resources for notifications \(CR4 templates\)](t_cr4_customize_shared_resources_for_notifications.md) and [Editing notification templates](t_edit_notification_templates_container.md).

The following procedures are provided as a way for you to easily override several properties that affect the CR4 notifications: company name, sender name and email, placement of the Connections application name, date format, maximum number of events, company logo, profile photo type, background colors in the notification, and footers.

These procedures do NOT apply to notifications from the default \(earlier than CR4\) templates, for which you can make changes only by using the methods referenced in the preceding note.

1.  Locate the properties file commonProperties.json in the following directory:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/config/cells/cell\_name/LotusConnections-config/notifications_v2/resources/
    ```

2.  Open the commonProperties.json file with a text editor.

-   **Customizing common properties**

    Find the properties in the commonProperties.json file that you want to change, and replace the values with the ones you want. All properties in the style section are optional.

    The following example shows a sample commonProperties.json with default values for the style section.

    ```
    {
        "name": "Notification mail customization",
        "type": "com.ibm.connections.notification.mail",
        "payload": {
            "platformName": "HCL Connections",
            "photoType":"url",
            "orgIcon":"data:image/png;base64,...",        
            "style": {
                "bodyBackgroundColor": "#eeeeee",
                "mastLogoBackgroundColor": "transparent",
                "mastLogoHeight": "32",
                "sidebarBackgroundColor": "#3d6cf0",
                "messageBackgroundColor": "#ffffff"
            },
            "activityDateFormat": "dd MMM",
            "activityMax" : "25",
            "subjectAppNameAppend" : "tail"
        },
        "path": "notify"
    }
    ```

    **Note:** The `orgIcon` data is truncated in the examples for brevity.

    **Important:** When you are finished editing all of the properties that you want to change, save your changes and restart the News application for the changes to take effect.

-   To customize the **company name** used in notifications email subject and body:

    -   Change the company name by finding or adding the platformName property in the commonProperties.json file and changing the value from "HCL Connections" to your company name.

        ```
        "payload": {
                    "platformName": "HCL Connections"
                }
        ```

    -   Hide the company name by setting this property to an empty string. The company name will be omitted from the email subject and body.

        ```
        "payload": {
                    "platformName": ""
                }
        ```

    **Note:** If this property is omitted entirely, the company name defaults to "HCL Connections". This value is defined in language localized property files and can be customized. For more information, see [Customizing shared resources for notifications \(CR4 templates\)](t_cr4_customize_shared_resources_for_notifications.md).

-   To customize the **sender name and email** used in notifications and email digests:

    1.  If you want notifications to always come from one source, usually the Connections administrator, you can add an alwaysUseGlobalSender property to thenotification-config.xml file and set it to true. For more information, see [Defining valid administrator email addresses](../admin/t_admin_act_managing_notifications.md).

    2.  To change the name and email of the sender to something meaningful for your organization, for example <Renovations-Newsflash@example.com\>, find the payload section in commonProperties.json, and add the lines for the orgSenderEmail and orgSenderName properties, changing the values to what you want users to see, as in the following example:

        ```
        "payload": {
                "orgSenderEmail": "Newsflash@example.com",
                "orgSenderName": "Renovations"
            }
        ```

        **Note:** The sender information that you customize here will overwrite the previously defined email addresses at: [Defining valid administrator email addresses](../admin/t_admin_act_managing_notifications.md).

-   To customize the **placement of the Connections application name** in the subject line:

    This name shows which application the notification is coming from.

    1.  Find the value for the subjectAppNameAppend: property and set it to the placement you want.

        ```
        "payload": {
                "subjectAppNameAppend" : "tail"
            }
        
        ```

        Valid values are as follows:

        -   `tail` is the default value, displaying the application name at the end of the subject line.
        -   `head` displays the application name at the beginning of the subject line.
        -   `none` causes no application name to be displayed.
-   To customize the **date format** used in notifications:

    -   Find the activityDateFormat: value and replace it with your own format.

        For the date, you can use any of the formats specified by the [International Components for Unicode \(ICU\) specification](http://icu-project.org/apiref/icu4j/com/ibm/icu/text/SimpleDateFormat.html). For example, in the United States locale, you could use "MM/d/yy" to display a date like 01/24/19, or "EEE, MMM d, yyyy" to display one like Thu, Jan 24, 2019.

        ```
        "payload": {
                "activityDateFormat": "dd MMM"
            }
        ```

-   To customize the **maximum number of events** displayed in the daily or weekly newsletter:

    -   Find the activityMax: value and replace it with your own value.

        ```
        "payload": {
                "activityMax": "25"
            }
        ```

-   To customize the **company logo**:

    **Note:** Supported image file formats:

    -   jpg/jpeg
    -   png \(under 40Kb in size due to email client restrictions\)
    -   Logo image

        Find the orgIcon: value, a base64 encoded string, and replace it with the base64 encoded string for the file that contains your company logo.

        ```
        "payload": {
                    "orgIcon":"data:image/png;base64,..."
                }
        ```

    -   Image height

        The height of the logo is scaled to 32 pixels by default. To change the height of the logo, find or add the `mastLogoHeight` property in the .json file, and change the value from "32" to the desired height.

        ```
        "payload": {
                    "style": {
                        "mastLogoHeight": "32"
                    }
                }
        ```

    -   Image width

        The width of the logo is not scaled but the default width of the notification container is 600 pixels and larger images may result in layout issues.

    -   Image background color

        Logo images with transparency can make use of a customized background color. To change the background color used under the logo, find the `mastLogoBackgroundColor` property and set to the desired color as an RGB hex triplet or "transparent". The default value of "transparent" allows the body background color to show through.

        ```
        "payload": {
                    "style": {
                        "mastLogoBackgroundColor": "#eeeeee"
                    }
                }
        ```

    -   Hide logo image

        If you don't want to display a logo in notifications, the image can be disabled by setting the image height to zero.

        ```
        "payload": {
                    "style": {
                        "mastLogoHeight": "0"
                    }
                }
        ```

-   To customize **profile photo types**:

    -   Profile photo type

        The photoType property controls the way a person's photo is rendered and the type of photo that is displayed in an email notification.

        ```
        
                "payload": {
                    "photoType": "url"
                }
                
        ```

        The possible values are as follows:

        -   `url` Default value, displays the photo by embedding the Connections profile URL in the email.
        -   `attach` Includes the profile photo as an email attachment when the email is generated. Best limited to cases where "url" fails to load the photo because of a firewall or other security consideration, as attachments increase the size of email and can affect performance.
        -   `stock` Displays the application icon instead of the profile image.
    -   Image background color

        Images with transparency, such as the stock applications icons, can make use of a customized background color. To change the background color used under the image, find the `sidebarBackgroundColor` property and set to the desired color as an RGB hex triplet or "transparent".

        ```
        "payload": {
                    "style": {
                        "sidebarBackgroundColor": "#3d6cf0"
                    }
                }
        ```

    -   Hide profile/application image

        If you don't want to display a profile photo or application icon in notifications, removing the photoType property prevents the image from being displayed.

    **Note:** The stock application icons used in notifications can be customized. See [Customizing shared resources for notifications \(CR4 templates\)](t_cr4_customize_shared_resources_for_notifications.md).

-   To customize the**background colors in the notification**:

    -   Notification body

        To change the overall background color of the notification, find the `bodyBackgroundColor` style property and set it to the desired color as an RGB hex triplet.

        ```
        
                "payload": {
                    "style": {
                        "bodyBackgroundColor": "#eeeeee"
                    }
                }
        ```

    -   Notification message content

        To change the background color of the notification message content section, find the `messageBackgroundColor` style property and set it to the desired color as an RGB hex triplet.

        ```
        
                "payload": {
                    "style": {
                        "messageBackgroundColor": "#ffffff"
                    }
                }
        ```

-   To add or customize the **footer** in notifications:

    -   If your organization wants to add a footer to notifications, add the orgFooter property and set it to what you want the footer in notifications to say. If you include a link in the footer, you must use the format \[website label\] \(website URL\) and make sure that the domain that contains the website is listed in whitelist described in [Enabling link stripping in email notifications](../install/enable_link_stripping_in_notifications.md).

        Here's an example of a footer that includes links:

        ```
        "payload": {
                    "orgFooter": "To contact support, please visit [Support] 
                    (https://renovations.com/support). For more information, 
                     please visit [Renovations] (https://renovations.com). Thank you!"
                 }
        ```

        The footer is displayed after any buttons or links in the notification, and uses centered alignment.


**Parent topic:**[Customizing notifications](../customize/c_customize_notifications.md)

