# HCL Connections Add-in for Microsoft Outlook System Requirements {#c_outlook_connector_addin_sys_req .concept}

System Requirements for HCL Connections Add-in for Microsoft Outlook.

The HCL Connections Add-in for Microsoft Outlook standalone docker image supports the following Outlook rich clients:

**Note:** Alternatively, the Outlook Add-in is available in Component Pack for HCL Connections 8.0.

|**Client**|**Supported versions**|
|----|----|
|Microsoft Outlook for Windows|Component pack: Outlook 2016 or later <br> Standalone docker: Outlook 2013 or later|
|Microsoft Outlook for Mac|Outlook 2016 or later|

The HCL Connections Add-in for Microsoft Outlook supports the Outlook browser client on the following web browsers. Current versions are preferred.

|**Web Browser**|**Minimum version**|
|----|----|
|Apple Safari|13|
|Google Chrome|76|
|Microsoft Edge|44.18362|
|Microsoft Internet Explorer|11\(3\)|
|Mozilla Firefox|69|

The HCL Connections Add-in for Microsoft Outlook supports the following Connections server versions:

-   HCL Connections 6.0
-   HCL Connections 6.5
-   HCL Connections 7.0
-   HCL Connections 8.0

The HCL Connections Add-in for Microsoft Outlook requires the following version of Microsoft Exchange or later:

-   Microsoft Exchange 2007

Deployment Notes

-   You must have a valid signed certificate deployed on your server. The Connections Add-in for Outlook will not load in some environments with an invalid or self-signed certificates.
-   OAuth is the only supported authentication type.
-   End user problem determination logs may be collected from within the Connections Add-in for Outlook UI on the Support panel.

**Parent topic:** [HCL Connections Add-in for Microsoft® Outlook](../../connectors/admin/c_outlook_connector.md)

