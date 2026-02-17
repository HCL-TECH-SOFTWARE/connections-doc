# Administering the banner using app registry {#adminbannerappreg .concept}

Create an app registry extension and specify select properties in the configuration, such as the message you want displayed, to make the most out of the banner in Connections.

You need Component Pack installed to perform the following procedures. If Component Pack is not available, you can set up the banner using Feature Foundation. For more information, see [Administering the banner using Feature Foundation](admin_banner_icxt.md).

## Creating an app registry extension { .section}

To set up the banner, you first need to create a new app registry extension. Afterward, you can control the content and functionality of the banner through the app registry.

1.  Log into Connections as an admin user.
2.  Navigate to `<connections_hostname>/appreg/apps`.
3.  Click **New App** to create a new extension.
4.  Click **Code Editor**, and then replace the data with the following `ADMIN_BANNER_APP_DATA` configuration:

    ```bash
    {
    "name": "Connections Banner",
    "title": "Connections Banner",
    "description": "Configuration for the banner that will be displayed at the top of Connections pages.",
    "services": [
        "Connections"
    ],
    "state": "enabled",
    "extensions": [
        {
            "name": "connections-banner",
            "type": "com.hcl.connections.banner",
            "payload": {
                "open": true,
                "message": [
                    "This is the ",
                    "<strong>HCL Connections Banner</strong>"
                ],
                "severity": "success"
            },
            "path": "global",
            "state": "enabled"
        }
    ]
    }
    ```

5.  Click **Save**.


## Customizing the admin banner { .section}

If you want to change when and with what message the banner is displayed, you can do so by defining the following properties. If not previously added, all property values are set to the default that is mentioned in the preceding example.

|Property|Definition|
|--------|----------|
|**open**|Defines whether the component is displayed or not. If an administrator defines a message, set this property to **true**. Otherwise, set to **false**.|
|**message**|Defines a comma-separated array of React text components, which is shown to the user concatenated. Enter simple messages such as the following: <br> `['This is my message.']` <br> Or complex messages that contain text formatting, for example: <br> `message={['A message with ', '<strong>bold</strong>', ' and ', '<i>italic</i>', ' text']}` <br> This component internally evaluates the given HTML and turns it into the corresponding elements. <br> <br> **Note:** Although this method is implemented to be XSS-safe and to prevent script execution, it is intended only for simple HTML. Complex HTML should work, but use it at your own discretion.|
|**severity**|Defines how your message looks on the banner based on your selection from the following types: <br> -    **Info**: Shows an info icon, with a violet background <br> -   **Success**: Shows a check icon, with a green background <br> -   **Warning**: Shows an attention or warning icon, with a yellow background <br> -   **Error**: Shows an exclamation icon, with a red background|
|**cacheExpiration**|Defines whether the payload of the request should be cached by the frontend. By default, the payload is not cached and fetched each time the page loads. This allows changes to the configuration to reflect immediately, but adds more load while the page renders. <br> To cache the configuration for a given time interval, enter a time in milliseconds. For example, if you want it to cache every 5 minutes, enter 300000 milliseconds.|

For style customizations, refer to [Customizing the look and feel of HCL Connections](../customize/customizing-look-and-feel.md#administrative-banner) in the "Customizing" section of the documentation.

**Parent topic:** [Administering the display of a site-wide banner](../admin/admin_banner_onprem.md)

