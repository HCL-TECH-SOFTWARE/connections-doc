# Customizing the welcome tour

The welcome tour provides an overview of the new user interface and features for Connections 8.0. It is enabled by default, and pops up for users visiting Connections for the first time in general, or since the update to the new version.

Users can skip the tour then and there, although they would see it again at a later point based on configuration. If users do not want the tour to reappear, they can check the "Don't show this anymore" option.

![Welcome Tour](images/welcome-tour.png)

The welcome tour doesn’t leverage specific custom styles and inherits styles from the [modal component](customizing-look-and-feel.md#modals).

## Configuring the welcome tour

Extensions for the welcome tour use the type `com.hcl.connections.tours`. You can enable or disable the tour, as well as specify when it should appear for users, by defining the following properties:

|Property|Definition|
|---------|-----------|
|**disabled**|Controls whether users should see the tour when they visit Connections.|
|**cacheExpiration**|Defines how long the configuration should be stored on the client side, in milliseconds.|
|**skipCacheExpiration**|Indicates how long it takes before the tour reappears for a user that skipped it using the "Skip tour" button.|

For an example of a modified configuration, refer to the following:

```
{
    "name": "Connections Tours Config",
    "title": "Connections Tours Config",
    "description": "Connections Tours Config - Description",
    "services": [
        "Connections"
    ],
    "state": "enabled",
    "extensions": [
        {
            "name": "connections-tours-config",
            "type": "com.hcl.connections.tours",
            "payload": {
                "disabled": false,
                "cacheExpiration": 86400000,
                "skipCacheExpiration": 86400000
            },
            "path": "global",
            "state": "enabled"
        }
    ]
}
```


**Parent topic**: [Customizing the user interface](t_admin_common_customize_main.md)