# Profiles widget configuration variables {#r_admin_substitution_variables .reference}

The following table lists the configuration variables that can be used for the url, navBarLink, helpLink, and item or @value attributes when configuring a third-party widget for integration with Profiles. The @value attribute refers to the value attribute in the item of the itemSet configuration elements in the widgets-config.xml file.

## Widget configuration variables { .section}

|Variable|Description|
|--------|-----------|
|resourceId|The profileUuid of the profile in use.|
|lastMod|The timestamp for the last time that the profile was updated.|
|userid|The HCL Connections user ID of the logged-in user. This variable is returned as undefined if the user is not logged in.|
|email|The email address of the logged-in user. This variable is returned as undefined if the user is not logged in.|
|version|The timestamp form, versionStamp, in the LotusConnections-config.xml file. This is updated on customizations and upgrades to ensure that static content URLs are updated.|
|lang|The language parameter.|
|webresourcesSvcRef|The service reference for the Common application as defined in the LotusConnections-config.xml file. For example, http://myserver.com/connections/resources.|
|contextRoot|The context root of the Profiles application. For example: /profiles.|
|communitiesSvcRef|The service reference for the Communities application, as defined in the LotusConnections-config.xml file. For example: http://myserver.com/communities.|
|profilesSvcRef|The service reference for the Profiles application, as defined in the LotusConnections-config.xml file. For example: http://myserver.com/profiles.|
|dogearSvcRef|The service reference for the Bookmarks application, as defined in the LotusConnections-config.xml file. For example: http://myserver.com/dogear.|
|blogsSvcRef|The service reference for the Blogs application, as defined in the LotusConnections-config.xml file. For example: http://myserver.com/blogs.|
|activitiesSvcRef|The service reference for the Activities application, as defined in the LotusConnections-config.xml file. For example: http://myserver.com/activities.|
|forumsSvcRef|The service reference for the Forums application, as defined in the LotusConnections-config.xml file. For example: http://myserver.com/forums.|
|filesSvcRef|The service reference for the Files application, as defined in the LotusConnections-config.xml file. For example: http://myserver.com/files.|
|wikisSvcRef|The service reference for the Wikis application, as defined in the LotusConnections-config.xml file. For example: http://myserver.com/wikis.|
|opensocialSvcRef|The service reference for the Status Updates application, as defined in the LotusConnections-config.xml file. For example: http://myserver.com/opensocial.|

**Parent topic:**[Adding custom widgets to Profiles](../admin/c_admin_profiles_add_custom_widgets.md)

**Related information**  


[Enabling custom widgets for Profiles](../admin/t_admin_profiles_develop_custom_widgets.md)

