# Communities widget configuration substitution variables {#r_admin_substitution_variables .reference}

The following table lists the configuration substitution variables that can be used for the url, navBarLink, helpLink, and item or @value attributes. Use these variables to configure a third-party widget for integration with Communities. The @value attribute refers to the value attribute in the item of the itemSet configuration elements in the widgets-config.xml file.

## Widget configuration substitution variables { .section}

|Variable|Description|
|--------|-----------|
|resourceId|The communityUuid of the community in use.|
|lastMod|The time stamp for the last time that the community was updated.|
|userid|HCL Connections user ID of the logged-in user. This variable is returned as undefined if the user is not logged in.|
|email|The email address of the logged-in user. This variable is returned as undefined if the user is not logged in.|
|version|The time stamp form, versionStamp, in the LotusConnections-config.xml file. This variable is updated on customizations and upgrades to ensure that static content URLs are updated.|
|lang|The language parameter.|
|contextRoot|The context root of the application. For example: /communities|
|communitiesSvcRef|The service reference for the Communities application, as defined in the LotusConnections-config.xml file. For example: http://localhost:9080/communities|
|profilesSvcRef|The service reference for the Profiles application, as defined in the LotusConnections-config.xml file. For example: http://localhost:9080/profiles|
|dogearSvcRef|The service reference for the Bookmarks application, as defined in the LotusConnections-config.xml file. For example: http://localhost:9080/dogear|
|blogsSvcRef|The service reference for the Blogs application, as defined in the LotusConnections-config.xml file. For example: http://localhost:9080/blogs|
|activitiesSvcRef|The service reference for the Activities application, as defined in the LotusConnections-config.xml file. For example: http://localhost:9080/activities|

**Parent topic:**[Adding custom widgets to Communities](../admin/c_admin_communities_add_custom_widgets.md)

**Related information**  


[Enabling custom widgets for Communities](../admin/t_admin_communities_develop_custom_widgets.md)

