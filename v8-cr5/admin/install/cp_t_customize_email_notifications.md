# Customizing email notifications using the app registry {#t_customize_email_notifications .task}

If Component Pack for HCL Connections™ is installed in your deployment, you can use the app registry to change the look and content email notifications and newsletters, making them particular to your organization.

You can add or override the defaults for several characteristics of the email notifications sent by Connections to users: company name, sender name and email, application icon, company logo, background colors, date format, maximum number of events, placement of the name of the specific Connections application that the notification was sent from, footer, and whitelisted domain names that allow links within those domains to be live.

The following procedure explains how to use the cloud administration console to create and edit an app/organization extension that you can use to make these customizations.

**Note:** An organization can have multiple apps for notification customizations. If multiple apps are enabled, the earliest one will take precedence. It is best is to have only one app enabled at a time.

1.  Log in as a user with Organization Administration privileges, click **Admin** on the navigation bar and then click **Manage Organization**.

2.  In the navigation, click **Organization Extensions**.

3.  Click **new Apps Manager**.

4.  Create the application:

    1.  Click **New App**.

    2.  Click **App Name** and enter a name for the app, for example, Notifications <org name\>.

    3.  Click **Short Description** and enter a brief description, for example, Notification customizations <org name\>.

    4.  Click **Next**.

5.  Create the extension:

    1.  Click **New Extension**.

    2.  Click **Service** and select **Connections** from the list.

    3.  Click **Extension Point** and enter com.ibm.connections.notification.mail.

    4.  Click **Extension Name** and enter a name for the extension.

    5.  Click **Path** and enter notify.

        **Note:** Do not try test a new customization by changing the path to the existing notification extension \(in other words, don't use any value other than "notify" in this step\). If you no longer want the current customization, you should disable or delete the existing extension.

    6.  Click **Next**.

6.  In the Extension JSON Editor, inside the brackets after payload, enter the property name and value for only the attributes that you want to add or change. Use the following information to help ensure that you enter the additions or changes in the proper format:

    -   To customize the **company name** used in the email subject and body:
        -   Change "Connections Cloud" to your company name by adding the platformName property in the payload, making the value your company name, as in the following example:

            ```
            "platformName": "Renovations"
            ```

        -   Hide "Connections Cloud" or your company name by setting this property to an empty string.

            ```
            "platformName": ""
            ```

    -   To customize the **sender name and email** used in notifications and email digests:
        -   To make the name and email of the sender something meaningful for your organization, for example <Renovations-Newsflash@example.com\>, in the payload section add the lines for the orgSenderEmail and orgSenderName properties, making the values what you want users to see, as in the following example:

            ```
            "orgSenderEmail": "Newsflash@example.com",
            "orgSenderName": "Renovations"
            ```

    -   To customize the **application icon image**:
        -   Displaying the icon

            The photoType property displays an image of the icon for the particular Connections application sending an email notification. The default is to display these icons, using the following property setting:

            ```
            "photoType": "stock"
            ```

        -   Icon background color

            The stock application icon images have transparency, and you can therefore make use of a customized background color. To change the background color behind the image, add lines for the `sidebarBackgroundColor` property in the payload section, setting it to the desired color as an RGB hex triplet or as "transparent".

            ```
            "style": {
                            "sidebarBackgroundColor": "#3d6cf0"
                        }
            ```

        -   Hiding the icon

            If you don't want to display an application icon in notifications, set the photoType property to empty \(''\).

            ```
            "photoType": ""
            ```

    -   To customize the **company logo**:

        **Note:** Supported image file formats are jpg/jpeg and png \(under 40Kb in size due to email client restrictions\).

        -   Logo image

            Add the orgIcon property, making the value the base64 encoded string for the file that contains your company logo. The orgIcon data is truncated in this example for brevity.

            ```
            "orgIcon":"data:image/png;base64,..."
            ```

        -   Image width

            The width of the logo is not scaled, but the default width of the notification container is 600 pixels and larger images could result in layout issues.

        -   Image background color

            Logo images with transparency can make use of a customized background color. To change the background color used behind the logo, add the `mastLogoBackgroundColor` style property and set it to the desired color as an RGB hex triplet or as "transparent". The default value of "transparent" allows the body background color to show through.

            ```
            "style": {
                            "mastLogoBackgroundColor": "#eeeeee"
                        }
            ```

        -   Hide logo image

            If you don't want to display a logo in notifications, the image can be disabled by setting the image height to zero.

            ```
            "style": {
                            "mastLogoHeight": "0"
                        }
            ```

    -   To customize the**background colors in the notification**:
        -   Notification body

            To change the overall background color of the notification, add the `bodyBackgroundColor` style property to the payload and set it to the desired color as an RGB hex triplet.

            ```
            
                    "style": {
                            "bodyBackgroundColor": "#eeeeee"
                        }
            ```

        -   Notification message content

            To change the background color of the notification message content section, add the `messageBackgroundColor` style property and set it to the desired color as an RGB hex triplet.

            ```
            "style": {
                            "messageBackgroundColor": "#ffffff"
                        }
            ```

    -   To customize the **date format** used in notifications:
        -   Add the activityDateFormat property, making the value the date format that you want. You can use any of the formats specified by the [International Components for Unicode \(ICU\) specification](http://icu-project.org/apiref/icu4j/com/ibm/icu/text/SimpleDateFormat.html). For example, in the United States locale, you could use "MM/d/yy" to display a date like 01/24/19, or "EEE, MMM d, yyyy" to display one like Thu, Jan 24, 2019.

            ```
            "activityDateFormat": "dd MMM"
            ```

    -   To customize the **maximum number of events** displayed in the daily or weekly newsletter:
        -   Add the activityMax property to the payload, making the value the number that you want.

            ```
            "activityMax": "25"
            ```

    -   To customize the **placement of the Connections application name** in the subject line:

        This name shows which application the notification is coming from.

        -   Add the subjectAppNameAppend property and set it to the placement you want.

            ```
            "subjectAppNameAppend" : "tail"
            ```

            Valid values are as follows:

            -   `tail` is the default value, displaying the application name at the end of the subject line.
            -   `head` displays the application name at the beginning of the subject line.
            -   `none` causes no application name to be displayed.
    -   To add or customize the **footer** in notifications:
        -   Add the orgFooter property and set it to what you want the footer in notifications to say. If you include a link in the footer, you must use the format \[website label\] \(website URL\) and make sure that the domain that contains the website is listed in whitelist described in the following section.

            Here's an example of a footer that includes links:

            ```
            "orgFooter": "To contact support, please visit [Support] 
            (https://renovations.com/support). For more information, 
            please visit [Renovations] (https://renovations.com). Thank you!"
            ```

    -   To add or customize the **whitelisted domain names** that exempt live links from those domains from being "stripped" of their HTML anchor tags in notifications:

        -   Add the liveLinksWhitelist property and set it to one or more domain names for the domains whose URL's you consider safe to display as-is in notifications. Separate the domain names with commas.

            ```
            "liveLinksWhitelist": "example1.com, example2.com, example.com"
            ```

        By adding the domains to the whitelist, you can help users confirm that the locations indicated by the clickable URLs in notifications are the actual destination. For example, if a link is to a destination outside of your whitelisted domains, it will be "stripped" of misleading text in the URL. The label and destination of any link that is not from an approved domain will be rendered as shown in the following example, allowing the user to see that the label does not match the destination:

        ```
        www.safe.com [<a href="http://www.unknown.com>www.unknown.com</a>;]
        ```

        **Tip:** Because link stripping tends to add clutter to email notifications by displaying the full URL and title of the anchor tag side by side, it is best to add trusted domains to the whitelist so that only the intended link text gets displayed.

    -   Review all additions/changes to the payload. If you chose to add multiple properties, your payload field might look something like this:

        ```
        "platformName": "Renovations",
                     "orgSenderEmail": "Newsflash@example.com",
                     "orgSenderName": "Renovations,
                    "photoType": "",
                    "orgIcon": "data:image/png;base64,...",
                    "style": {
                      "bodyBackgroundColor": "#eeeeee",
                      "sidebarBackgroundColor": "#3d6cf0",
                      "messageBackgroundColor": "#ffffff"
                    },
                    "activityDateFormat": "MM/d/yy",
                    "activityMax": "10",
                    "subjectAppNameAppend": "none",
                    "orgFooter": "To contact support, please visit 
                     [Support] (https://test.com/support). For more information, 
                     please visit [Test site] (https://test.com). Thank you!",
                    "liveLinksWhitelist": "example1.com, example2.com, example3.com"
        ```

7.  Click **Add** to enter your customizations into the payload and then click **Save** to save the extension. You can return to the extension later if you want to add or change other properties.

    **Note:** If you later decide that you don't want to show an element, you must delete only the value \(""\), not the entire property.

8.  If you no longer want to use the currently enabled notification customizations, perform the following steps to disable the organization extension:

    1.  Repeat steps 1 through 3 from the preceding procedure.

    2.  Locate the notification app that you want to disable \(apps are displayed as cards\). Make sure the app says "Enabled."

    3.  Click the ellipsis icon and select **Disable** from the list of options.

        The application is now disabled, which means that all of its extensions are also treated as disabled.


**Parent topic:**[Installing or upgrading Component Pack for Connections](../install/cp_install_config_intro.md)

