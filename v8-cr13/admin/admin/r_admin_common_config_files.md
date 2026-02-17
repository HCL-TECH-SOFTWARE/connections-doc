# HCL Connections configuration files {#r_admin_common_config_files .reference}

Configuration files are XML-formatted files that store configuration information for HCL Connections.

## Configuration files { .section}

The following table lists the configuration files that are provided with HCL Connections and describes what they do.

|Configuration file|Description|Jython command|
|------------------|-----------|--------------|
|calendar-config.xml|Stores properties that control the behavior of the Events widgets.|execfile\("connectionsConfig.py"\)|
|communities-config.xml|Stores properties that control the behavior of the Communities application.|execfile\("communitiesAdmin.py"\)|
|communities-policy.xml|Defines the permission levels of different roles in the Communities application. For example, it might specify that owners in a public community can modify the community description or members in a private community can add bookmarks.|execfile\("communitiesAdmin.py"\)|
|contentreview-config.xml|Defines settings for content moderation in the Blogs, Files, and Forums applications.|execfile\("connectionsConfig.py"\)|
|directory.services.xml|Stores properties that control the behavior of common directory services.| |
|dogear-config-cell.xml|Stores properties that affect Bookmarks at the cell level, such as differentiating between intranet and internet sites.|execfile\("dogearAdmin.py"\)|
|events-config.xml|Stores properties that control how events are collected and managed.|execfile\("connectionsConfig.py"\)|
|file-preview-config.xml|Stores the photo and video file types supported by the files previewer.| |
|files-config.xml|Stores properties that control the behavior of the Files application.|execfile\("filesAdmin.py"\)|
|files-url-config.xml|Stores custom URL properties, for example, URL, host name, and server port number for the Files application.| |
|forum-config.xml|Stores properties that control the behavior of the Forums application.|execfile\("forumsAdmin.py"\)|
|forum-policy.xml|Defines the permission levels of different roles in the Forums application.|execfile\("connectionsConfig.py"\)|
|gallery-config.xml|Stores properties that control the behavior of the Gallery application.| |
|gettingstarted-config.xml|Stores properties that define the content of the Getting Started tab in the home page.|execfile\("homepageAdmin.py"\)|
|library-config.xml|Stores properties that control the behavior of library widgets in the Communities application.|execfile\("connectionsConfig.py"\)|
|LotusConnections-config.xml|Stores properties that control common IBM® Connections applications, such as the navigation bar links.|execfile\("connectionsConfig.py"\)|
|media-gallery-config.xml|Stores properties that control the behavior of the Media Gallery widget in the Communities application.|execfile\("connectionsConfig.py"\)|
|metrics-config.xml|Stores properties that control the behavior of the Metrics application.|execfile\("metricsAdmin.py"\)|
|mime-files-config.xml|Stores Multipurpose Internet Mail Extensions \(MIME\) type assignments for file extensions and icons in the Files application.|execfile\("filesAdmin.py"\)|
|mime-wikis-config.xml|Stores Multipurpose Internet Mail Extensions \(MIME\) type assignments for file extensions and icons in the Wikis application.|execfile\("wikisAdmin.py"\)|
|mobile-config.xml|Stores properties that control the behavior of the HCL Connections Mobile service.|execfile\("mobileAdmin.py"\)|
|news-config.xml|Stores properties that control how information is cleaned up and synchronized in the news repository.|execfile\("newsAdmin.py"\)|
|notification-config.xml|Stores properties that control email notifications across all of the applications.|execfile\("connectionsConfig.py"\)|
|oa-config.xml|Stores properties that affect Activities, such as managing uploaded files, defining which statistics to collect, and purging the trash.|execfile\("activitiesAdmin.py"\)|
|og-config.xml|Stores properties that manage the URL preview function.|execfile\("activitiesAdmin.py"\)|
|opensocial-config.xml|Defines properties that affect the behavior of the OpenSocial service, and is used for the integration of OpenSocial gadgets.| |
|profiles-config.xml|Stores properties that control the behavior of the Profiles application.|execfile\("profilesAdmin.py"\)|
|profiles-policy.xml|Stores properties that can enable or disable profiles based on profile type and properties that control the behavior of status updates in Profiles.|execfile\("profilesAdmin.py"\)|
|profiles-types.xml|Stores the user profile types that are used in the Profiles application.| |
|proxy-config.tpl|Defines proxy server redirects for specific URL patterns. Using redirects, you can allow access to websites that you deem to be safe or block access to websites that you deem to be dangerous. This configuration file also defines rewrite rules that specify aliases for web addresses.|execfile\("connectionsConfig.py"\)|
|pushnotification-config.xml|Stores properties, such as maximum queue length that control push notifications.| |
|search-config.xml|Stores properties that control the behavior of the Search application.|execfile\("searchAdmin.py"\)|
|uiextensions-config.xml|Stores properties that manage customization in the business card, Communities, Home Page, and Profiles.| |
|url-blacklist-config.xml|Stores the URLs that are blacklisted for IBM Connections.| |
|widgets-config.xml|Stores properties that control the behavior of the widgets that can be added to the Communities and Profiles applications.|execfile\("profilesAdmin.py"\)|
|wikis-config.xml|Stores properties that control the behavior of the Wikis application.|execfile\("wikisAdmin.py"\)|
|XRDS.xml|Standard definition document in XML format for the discovery of metadata about a resource.| |

**Parent topic:**[Editing configuration files](../admin/t_admin_common_checkout_config_file.md)

