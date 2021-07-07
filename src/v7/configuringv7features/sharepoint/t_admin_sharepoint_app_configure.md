# Configuring the Sharepoint app in Connections

After enabling this application, the Sharepoint Library widget will be available in Communities.

## Before you begin
Make sure you have completed all the steps in [Configuring the Sharepoint app in Microsoft Azure AD](https://opensource.hcltechsw.com/connections-doc/v7/configuringv7features/sharepoint/t_admin_sharepoint_app_enabling.html)

To enable Sharepoint Library Widget for Connections Community, add the following json as a new application definition in connections app registry *https://connections.host.name/appreg/apps*

## Procedure

1. Set the *client ID* to the string that you copied for the application (client) ID in the previous task.
2. Change the value for tenant to *your_organization_url.onmicrosoft.com*.
   
```
// {
    "name": "SharePoint Widget Library (ORG A)",
    "title": "SharePoint Widget Library (ORG A)",
    "description": "SharePoint Widget Library",
    "services": [
        "Communities"
    ],
    "state": "enabled",
    "extensions": [
        {
            "ext_id": "com.hcl.sharepoint.widget",
            "name": "SharePoint Library",
            "title": "SharePoint Library",
            "description": "SharePoint Library",
            "type": "community_widget",
            "payload": {
                "defId": "SharePoint Library",
                "itemSet": [
                    {
                        "name": "clientId",
                        "value": "dabe2132-5b82-4119-818b-ea0cdebc0d48"
                    },
                    {
                        "name": "tenant",
                        "value": "hclconnections.onmicrosoft.com"
                    }
                ],
                "themes": "wpthemeThin wpthemeNarrow wpthemeWide wpthemeBanner",
                "modes": "view fullpage edit",
                "primaryWidget": "true",
                "showInPalette": "true",
                "iconUrl": "https://sampleconnectionswidget.mybluemix.net/icon.png",
                "uniqueInstance": "true",
                "url": "{webresourcesSvcRef}/../../spo/SharepointWidget.xml"
            }
        }
    ]
}
```



 
 




    
    