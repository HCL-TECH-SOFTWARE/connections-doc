# Administering the banner using Feature Foundation {#admin-banner .concept}

Use APIs on Feature Foundation to show, manage, and update the banner in Connections.

You can apply this method with or without Component Pack installed in your Connections deployment. Note that you need administrator privileges to use the following API.

## Creating or updating the admin banner { .section}

On Feature Foundation, send an HTTP `PUT` request to `<connections_hostname>/ic360/ui/api/admin-banner/config.json` with the following header and request payload:

```sh
Header: 
Content-Type: application/json

Request body:
{
    "open": true,
    "message": ["my ", "<b>new</b>", " banner message"],
    "severity": "success"
}
```

Alternatively, you can configure the `.json` file directly in your local system, then restart the Feature Foundation app afterwards to apply your changes.

## Customizing the admin banner { .section}

If you want to change the content of the banner, for example the displayed message, simply update the following properties in the configuration file. If not previously added, all property values are set to the default that is mentioned in the preceding example.

|Property|Definition|
|--------|----------|
|**open**|Defines whether the component is displayed or not. If an administrator defines a message, set this property to **true**. Otherwise, set to **false**.|
|**message**|Defines a comma-separated array of React text components, which is shown to the user concatenated. Enter simple messages such as the following: <br> `['This is my message.']` <br> Or complex messages that contain text formatting, for example: <br> `message={['A message with ', '<strong>bold</strong>', ' and ', '<i>italic</i>', ' text']}` <br> This component internally evaluates the given HTML and turns it into the corresponding elements. <br> <br> **Note:** <br> -   Although this method is implemented to be XSS-safe and to prevent script execution, it is intended only for simple HTML. Complex HTML should work, but use it at your own discretion. <br> -   You can only enter one message, and cannot configure different messages for different user groups.|
|**severity**|Defines how your message looks on the banner based on your selection from the following types: <br> -   **Info**: Shows an info icon, with a violet background <br> -   **Success**: Shows a check icon, with a green background <br> -   **Warning**: Shows an attention or warning icon, with a yellow background <br> -   **Error**: Shows an exclamation icon, with a red background|

For style customizations, refer to [Customizing the look and feel of HCL Connections](../customize/customizing-look-and-feel.md#administrative-banner) in the "Customizing" section of the documentation.

## Managing the admin banner { .section}

After creating the banner, you can enable, disable, or check it using other APIs:

-   To enable:

    Send an HTTP `PUT` request to `<connections_hostname>/ic360/ui/api/admin-banner/enable`
    
-   To disable:

    Send an HTTP `PUT` request to `<connections_hostname>/ic360/ui/api/admin-banner/disable`

-   To check the current status and configuration of the banner:

    Send an HTTP `GET` request to `<connections_hostname>/ic360/ui/api/admin-banner/config.json`
    
    This shows the `.json` file that you configured when you created or customized the banner.


**Parent topic:** [Administering the display of a site-wide banner](../admin/admin_banner_onprem.md)

