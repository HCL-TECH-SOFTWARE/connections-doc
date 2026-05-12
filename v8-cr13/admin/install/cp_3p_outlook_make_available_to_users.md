# Making the Connections Add-in for Outlook available to users {#concept_jld_cfb_wnb .concept}

The HCL Connections Add-in for Outlook must be added to the users’ Outlook environments. This can be done by the Exchange administrator, or by the users directly.

Deploying as an Exchange administrator:

-   Administrators can deploy plugins using the Exchange add-ins admin panel
-   Select ‘Upload customer add-in’
-   Enter manifest URL or upload manifest file
-   Manifest URL: https://<CONNECTIONS\_URL\>/<CONTEXT\_ROOT\>/manifest.xml
-   For example, https://my.connections.server/outlook-addin/manifest.xml
-   As Admin, you can control whether the Outlook add-in automatically appears or is available to users
-   Microsoft’s detailed instructions: [Deploy add-ins in the admin center](https://docs.microsoft.com/en-us/microsoft-365/admin/manage/manage-deployment-of-add-ins?view=o365-worldwide)

User-deployed \(sideloaded\) from within Outlook

-   Select **Get add-ins** from ribbon or overflow menu
-   Enter the manifest URL or upload the manifest file
    -   Manifest URL: https://<CONNECTIONS\_URL\>/<CONTEXT\_ROOT\>/manifest.xml
    -   For example: https://myconnections.server.com/outlook-addin/manifest.xml
    -   The manifest file can be downloaded from the same URL.
-   Refer to [Microsoft’s detailed instructions on sideloading add-ins](https://docs.microsoft.com/en-us/office/dev/add-ins/outlook/sideload-outlook-add-ins-for-testing) for additional information.
-   Note: Microsoft has recently changed how sideloading applications works. Sideloading using a URL is no longer supported. For more details, refer to the Microsoft article [Updates to how to install and use Add-ins and apps in Outlook for Windows and Outlook on the web](https://devblogs.microsoft.com/microsoft365dev/updates-to-how-to-install-and-use-add-ins-and-apps-in-outlook-for-windows-and-outlook-on-the-web/)

**Parent topic:** [Integrating with Connections Outlook Add-in for Microsoft Outlook](../install/cp_3p_outlook_addin_container.md)

