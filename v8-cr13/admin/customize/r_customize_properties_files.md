# Customizing property file strings {#r_customize_properties_files .reference}

Use the information in the tables to locate the customizable strings that are contained in property files and to determine where to save the customized files.

The following tables list the application properties files that contain strings you can customize.

**Notes:**

-   To customize the source properties files, you must first extract the contents of the JAR file files by using a compression program.
-   In the paths that are listed as follows:
    -   installedApps refers to the following directory path: WAS\_HOME/profiles/profile\_name/installedAppswhere:

        -   WAS\_HOME is the directory to which you installed IBM® WebSphere®® Application Server.
        -   profile\_name is the profile to which you installed one of the applications.
        For example: /opt/IBM/WebSphere/AppServer/profiles/AppSrv01/installedApps/standaloneCell01/

    -   webresources refers to the web resources provisioning directory for created during installation. By default, it is created in: CONNECTIONS\_HOME/data/shared/provision/webresources

        For example: /opt/IBM/Connections/Data/shared/provision/webresources/

    -   customizationDir refers to the base customization directory where you need to save your customized files. This base directory is defined during the installation of , when it is saved as a WebSphere Application Server variable named CONNECTIONS\_CUSTOMIZATION\_PATH. This variable is set to `[shared\_data\_directory\_root](../plan/i_ovr_r_directory_conventions.md)/customization` by default.

        For example: local/opt/IBM/Connections/Data/shared/provision/customization/

    -   \_version refers to the file version and time stamp, for example, \_3.0.0.20120307-0100 in the following file name: com.ibm.lconn.activities.web.resources\_3.0.0.20120307-0100.jar
-   The customized files are saved in the customizationDir/strings/customized\_properties\_file\_name directory, where any slashes in the source file name location are replaced by dots.

    For example, when you customize the ui.properties source file for Blogs from the Blogs.ear/blogs.war/WEB-INF/classes/com/ibm/lconn/blogs/strings/ui.properties source location, you must save the customized properties file in the following location: customizationDir/strings/com.ibm.lconn.blogs.strings.ui.properties.

-   To customize a locale-specific version of a source file, look in the same source directory for a file of the same name but with the relevant language code appended before the .properties file extension. When you save the customized version of the file, ensure that you append the language code to the file name before the file extension.

    For example, to customize German strings for Blogs, look for the ui\_de.properties file in the Blogs.ear/blogs.war/WEB-INF/classes/com/ibm/lconn/blogs/strings/ui.properties source location and save the customized strings in the following location: customizationDir/strings/com.ibm.lconn.blogs.strings.ui\_de.properties

    **Important:** For non-European languages that use Unicode instead of the actual characters, you must update them by using the Unicode for the custom characters, not the actual characters.

-   The following features do not have any properties files that are associated with them:

    -   Blog widget \(Communities\)
    -   Enterprise Content Manager document picker \(Communities\)
    -   Ideation Blog widget \(Communities\)
    For a list of the JavaScript™ files that are associated with these features, see [JavaScript resource strings](r_customize_js_files.md).


## Common areas { .section}

|Description|Source location|Save customizations in|
|-----------|---------------|----------------------|
|Common widget strings|Typically, in installedApps/<cell\_name\>/application\_name.ear/lc.util.web-3.0.jar: com.ibm.lconn.core.strings.templates.propertiesFor example for the home page: ./Homepage.ear/lc.util.web-3.0.jar|customizationDir/strings/com.ibm.lconn.core.strings.templates.properties|
|Core activity stream strings that are used in the home page, Profiles, Communities, HCL Notes®, and other consumers of the activity stream gadget|In installedApps/<cell\_name\>/Common.ear/connections.web.resources.war/WEB-NF/eclipse/plugins/com.ibm.social.as.web.resources\_version.jar: properties/activitystream\_resources.properties|customizationDir/strings/activitystream\_resources.properties|
|Core activity stream strings that are used in the Home page, Profiles, Communities, HCL Notes, and other consumers of the activity stream gadget|In installedApps/<cell\_name\>/Common.ear/connections.web.resources.war/WEB-INF/eclipse/plugins/com.ibm.social.as.lconn.web.resources\_version.jar: properties/activitystream\_lconn.properties|customizationDir/strings/activitystream\_lconn.properties|
|Strings that are used by the Application Access and Access Request interfaces that prompt users to grant, deny, and revoke access to their data for third-party applications that are protected by OAuth.|In webresources/com.ibm.lconn.oauth.web.resources\_version.jar:\_properties/com/ibm/lconn/oauth/strings/ui.properties. webresources refers to the web resources provisioning directory for IBM Connections created during installation. By default, it is created in the following directory: CONNECTIONS\_HOME/data/shared/provision/webresources.|com.ibm.lconn.oauth.strings.ui.properties. 
Fore more information on where to save the customized copy of these strings, see [Customizing strings sourced in JavaScript](t_customize_strings_via_javascript.md) for more information.

## Activities { .section}

|Description|Source location|Save customizations in|
|-----------|---------------|----------------------|
|Activities user interface strings|Most user interface strings are in strings.js. This file is in the Activities resource jar file in the PROVISION folder sample: <CONNECTIONS\_PROVISION\_PATH\>/webresources/com.ibm.lconn.activities.web.resources\_version.jar

If you cannot find a string, check the Activities resource bundle in installedApps/<cell\_name\>/Activities.ear/oawebui.war/WEB-INF/lib/oawebui.jar: com/ibm/openactivities/web/coreui/resources/resources.properties

**Note:** For more information, see [Customizing strings sourced in JavaScript](t_customize_strings_via_javascript.md).

|customizationDir/strings/com.ibm.openactivities.web.coreui.resources.resources.properties|
|Activities notification strings|Notification strings and some user interface strings are in  LotusConnections-config/notifications/activities/resources/nls/notification.properties where locale is the language code, for example notification \_en.properties. If no locale is specified, use notification.properties.|Edit and save the customized file in the source location.|

## Blogs { .section}

|Description|Source location|Save customizations in|
|-----------|---------------|----------------------|
|User interface strings|Blogs.ear/blogs.war/WEB-INF/classes/com/ibm/lconn/blogs/strings/ui.properties|customizationDir/strings/com.ibm.lconn.blogs.strings.ui.properties|
|Log strings|Blogs.ear/blogs.war/WEB-INF/classes/com/ibm/lconn/blogs/strings/log.properties|customizationDir/strings/com.ibm.lconn.blogs.strings.log.properties|

## Bookmarklet { .section}

**Note:** The bookmarklet is the window that displays when you add a bookmark. It is in the Common.ear file. The bookmarklet allows users to add bookmarks to different applications, such as Communities or Activities. Users can add a button to their browser that allows them to access the bookmarklet window. Every page in has a **Bookmarking Tools** link in the page footer that allows users to install this toolbar button.

|Description|Source location|Save customizations in|
|-----------|---------------|----------------------|
|Bookmarklet user interface strings \(JSP files\)|In installedApps/<cell\_name\>/Common.ear/lc-bookmarklet.war/WEB-INF/lib/lc-bookmarklet.jar: com/ibm/lconn/bookmarklet/strings/ui.properties|customizationDir/strings/com.ibm.lconn.bookmarklet.strings.ui.properties|
|Bookmarklet user interface strings \(Java™ files\)|In installedApps/<cell\_name\>/common.ear/lc-bookmarklet.war/WEB-INF/lib/lc-bookmarklet.jar: com/ibm/lconn/bookmarklet/resources/jspresources.properties|customizationDir/strings/com.ibm.lconn.bookmarklet.resources.jspresources.properties|

## Bookmarks { .section}

|Description|Source location|Save customizations in|
|-----------|---------------|----------------------|
|Bookmarks user interface strings \(JSP files\)|In installedApps/<cell\_name\>/Dogear.ear/dogear.webui.war/WEB-INF/lib/dogear.svc.jar: com/ibm/lconn/dogear/strings/uilabels.properties|customizationDir/strings/com.ibm.lconn.dogear.strings.uilabels.properties|
|Bookmarks user interface strings \(Java files\)|In installedApps/<cell\_name\>/Dogear.ear/dogear.webui.war/WEB-INF/lib/dogear.svc.jar: com/ibm/lconn/dogear/strings/ui.properties|customizationDir/strings/com.ibm.lconn.dogear.strings.ui.properties|

## Communities { .section}

|Description|Source location|Save customizations in|
|-----------|---------------|----------------------|
|Main Communities application user interface|In installedApps/<cell\_name\>/Communities.ear/comm.web.war/WEB-INF/lib/comm.web.jar: com/ibm/lconn/communities/strings/ui.properties|customizationDir/strings/com.ibm.lconn.communities.strings.ui.properties|
|Communities email text|In installedApps/<cell\_name\>/Communities.ear/comm.web.war/WEB-INF/lib/comm.web.jar: com/ibm/lconn/communities/strings/uiemail.properties|customizationDir/strings/com.ibm.lconn.communities.strings.uiemail.properties|
|Communities business card \(used by the applications\)|In installedApps/<cell\_name\>/Common.ear/connections.web.resources.war/WEB-INF/eclipse/plugins/com.ibm.lconn.core.web.resources\_version.jar: \_properties/com/ibm/lconn/core/web/resources/commbizcard.properties|customizationDir/strings/com.ibm.lconn.core.web.resources.commbizcard.properties|
|Communities widget titles|installedApps/<cell\_name\>/Common.ear/connections.web.resources.war/WEB-INF/eclipse/plugins/com.ibm.lconn.core.web.resources\_version.jar: \_properties/com/ibm/lconn/widgets/resources/ui\_widgets.properties|customizationDir/strings/com.ibm.lconn.widgets.resources.ui\_widgets.properties|
|Linked Library widget|In webresources/com.ibm.lconn.librarywidget.config\_version.jar: \_properties/com/ibm/quickr/lw/nls/LibraryWidgetMessages.properties|customizationDir/strings/com.ibm.quickr.lw.nls.LibraryWidgetMessages.properties|
|Related Communities widget|In installedApps/<cell\_name\>/Communities.ear/recomm.web.war/WEB-INF/classes/com/ibm/lconn/recomm/strings/ui.properties|customizationDir/strings/com.ibm.lconn.recomm.strings.ui.properties|

## Files { .section}

|Description|Source location|Save customizations in|
|-----------|---------------|----------------------|
|Main Files application user interface and the Files widget in Communities|In webresources/com.ibm.lconn.files.web.resources\_version.jar: \_properties/com/ibm/lconn/files/strings/ui.properties|customizationDir/strings/com.ibm.lconn.files.strings.ui.properties|
|Help pop-up windows|In webresources/com.ibm.lconn.files.web.resources\_version.jar: \_properties/com/ibm/lconn/files/strings/uihelp.properties|customizationDir/strings/com.ibm.lconn.files.strings.uihelp.properties|
|About and Metrics pages|In webresources/com.ibm.lconn.files.web.resources\_version.jar: \_properties/com/ibm/lconn/files/strings/uitemplates.properties|customizationDir/strings/com.ibm.lconn.files.strings.uitemplates.properties|

## Forums { .section}

|Description|Source location|Save customizations in|
|-----------|---------------|----------------------|
|User interface strings|installedApps/<cell\_name\>Forums.ear/forum.web.war/WEB-INF/lib/forum.web.jar:com/ibm/forum/web/resources/resources.properties|customizationDir/strings/com.ibm.forum.web.resources.resources.properties|
|Log strings|installedApps/<cell\_name\>/Forums.ear/forum.web.war/WEB-INF/lib/forum.svc.jar:com/ibm/lconn/forum/internal/resources/resources.properties|customizationDir/strings/com.ibm.lconn.forum.internal.resources.resources.properties|
|Log strings|installedApps/<cell\_name\>/Forums.ear/forum.web.war/WEB-INF/lib/forum.svc.jar:com/ibm/lconn/forum/internal/service/core/core.properties|customizationDir/strings/com.ibm.lconn.forum.internal.service.core.core.properties|

## Home page { .section}

|Description|Source location|Save customizations in|
|-----------|---------------|----------------------|
|Most strings that appear in the user interface, except for the stories in the river of news|In installedApps/<cell\_name\>/Homepage.ear/homepage.war/WEB-INF/lib/homepage.utils.jar: com/ibm/lconn/homepage/resources/nls/jsp/jsp\_resources.properties|customizationDir/strings/com.ibm.lconn.homepage.resources.nls.jsp.jsp\_resources.properties|
|Activity Stream strings|In installedApps/<cell\_name\>/Homepage.ear/homepage.war/WEB-INF/lib/homepage.utils.jar: com/ibm/lconn/homepage/resources/nls/activitystream/activitystream\_resources.properties|customizationDir/strings/com.ibm.lconn.homepage.resources.nls.activitystream.activitystream\_resources.properties|
|Activity Stream filters|In installedApps/<cell\_name\>/Homepage.ear/homepage.war/WEB-INF/lib/homepage.utils.jar: com/ibm/lconn/homepage/resources/nls/activitystream/config/activitystreamconfig\_resources.properties|customizationDir/strings/com.ibm.lconn.homepage.resources.nls.activitystream.config.activitystreamconfig\_resources.properties|
|Notification strings|In installedApps/<cell\_name\>/Homepage.ear/homepage.war/WEB-INF/lib/homepage.utils.jar: com/ibm/lconn/homepage/resources/nls/ui/ui\_resources.properties|customizationDir/strings/com.ibm.lconn.homepage.resources.nls.ui.ui\_resources.properties|
|Widget resources|In installedApps/<cell\_name\>/Homepage.ear/homepage.war/WEB-INF/lib/homepage.utils.jar: /com/ibm/lconn/homepage/resources/nls/widgets/widgets\_resources.properties|customizationDir/strings/com.ibm.lconn.homepage.resources.nls.widgets.widgets\_resources.properties|
|Core activity stream filter resources|In installedApps/<cell\_name\>/Homepage.ear/homepage.war/WEB-INF/lib/lc.services.gadgets.osapiclient.jar: com/ibm/lconn/services/gadgets/osapiclient/activitystream/config/activitystreamconfig.properties|customizationDir/strings/com.ibm.lconn.services.gadgets.osapiclient.activitystream.config.activitystreamconfig.properties|

## Moderation { .section}

|Description|Source location|Save customizations in|
|-----------|---------------|----------------------|
|Main Moderation application|In installedApps/<cell\_name\>/Moderation.ear/sn.moderation.ui.jar: com/ibm/lconn/moderation/ui/strings/ui.properties|customizationDir/strings/com.ibm.lconn.moderation.ui.strings.ui.properties|
|Online help|In installedApps/<cell\_name\>/Moderation.ear/sn.moderation.ui.jar: com/ibm/lconn/moderation/ui/strings/uihelp.properties|customizationDir/strings/com.ibm.lconn.moderation.ui.strings.uihelp.properties|
|About page|In installedApps/<cell\_name\>/Moderation.ear/sn.moderation.ui.jar: com/ibm/lconn/moderation/ui/strings/uitemplates.properties|customizationDir/strings/com.ibm.lconn.moderation.ui.strings.uitemplates.properties|

## News { .section}

|Description|Source location|Save customizations in|
|-----------|---------------|----------------------|
|Template resource strings for use in activity stream event titles **Important:** Customized strings must have the same placeholders \(string of characters that are delimited by curly braces\) as the placeholders in the source string.

|In installedApps/<cell\_name\>/News.ear/news.common.jar: com/ibm/lconn/news/nls/templatePlaceholders.properties|customizationDir/strings/com.ibm.lconn.news.nls.templatePlaceholders.properties|
|JSP resources for email digest settings page|In installedApps/<cell\_name\>/News.ear/news.common.jar: com/ibm/lconn/news/nls/jsp\_resources.properties|customizationDir/strings/com.ibm.lconn.news.nls.jsp\_resources.properties|
|Notification strings that are displayed in the Homepage|In installedApps/<cell\_name\>/News.ear/news.common.jar: com/ibm/lconn/news/nls/ui\_resources.properties|customizationDir/strings/com.ibm.lconn.news.nls.ui\_resources.properties|
|Strings that are related to Homepage widgets, such as widget titles and the strings that are displayed in the customization palette|In installedApps/<cell\_name\>/News.ear/news.common.jar:com/ibm/lconn/news/nls/catalog/service/ui/CatalogServiceUIMessages.propertiess|customizationDir/strings/com.ibm.lconn.news.nls.catalog.service.ui.CatalogServiceUIMessages.properties|

## Profiles { .section}

|Description|Source location|Save customizations in|
|-----------|---------------|----------------------|
|Used in the Atom APIs for informational use only, not for the user|In installedApps/<cell\_name\>/Profiles.ear/lc.profiles.app.war/WEB-INF/lib/lc.profiles.web.app.jar: com/ibm/lconn/profiles/api/actions/resources.properties|customizationDir/strings/com.ibm.lconn.profiles.api.actions.resources.properties|
|Main resource string file for user interface display in Profiles|In installedApps/<cell\_name\>/Profiles.ear/lc.profiles.app.war/WEB-INF/lib/lc.profiles.web.app.jar: com/ibm/lconn/profiles/strings/ui.properties**Note:** To update the Profiles user interface, you must change the appropriate template file. For example, profileDetails.ftl defines the custom section that is rendered when you view someone's profile. The business card template renders the same profile when you start someone's business card.

The key to define a custom section to view a profile in profileDetails.ftl is as follows:

`<nlsKey="label.displayName"/>`. Template files are in: <dmgr profilehome\>/config/cells/<cellname\>/LotusConnections-config/profiles/templates.

**Note:** The Profiles advanced search page does not have a customization template. Update the advanced search page by using the strings folder customization directory. Create the following file: com.ibm.lconn.profiles.strings.uilabels.properties. Add, for example, the following property/string: `label.advanced.searchForm.attribute.telephoneNumber=Telephone:`.

|customizationDir/strings/com.ibm.lconn.profiles.strings.ui.properties|
|Strings for profile field labels|In <dmgr profilehome\>: /config/cells/<cellname\>/LotusConnections-config/profiles/templates/template.properties|customizationDir/strings/com.ibm.lconn.profiles.strings.uilabels.properties|

**Note:** To customize the Profile field labels take, the following steps:

-   Stop Connections and shut down the Dmgr.
-   Browse to C:\\IBM\\WebSphere\\AppServer\\profiles\\Dmgr01\\config\\cells\\Your\_Cell01\\LotusConnections-config\\profiles\\templates\\resources\\nls.
-   Edit the language file that you want to change. In French for example, change the key/value pairs in template\_fr.properties.
-   Restart Dmgr, and the Connections clusters as normal.
-   If necessary, synchronize the nodes.

## Search { .section}

|Description|Source location|Save customizations in|
|-----------|---------------|----------------------|
|Search application user interface strings|In installedApps/<cell\_name\>/Search.ear/search.common.jar: com/ibm/lconn/search/strings/ui.properties|customizationDir/strings/com.ibm.lconn.search.strings.ui.properties|

## Social analytics { .section}

|Description|Source location|Save customizations in|
|-----------|---------------|----------------------|
|Strings for the Who Connects Us, Things in Common, and Do You Know widgets|In installedApps/<cell\_name\>/Common.ear/connections.web.resources.war/WEB-INF/eclipse/plugins/com.ibm.lconn.sand.web.resources\_version.jar: \_properties/com/ibm/lconn/sand/resources/sand.properties|customizationDir/strings/com.ibm.lconn.sand.resources.sand.properties|

## Wikis { .section}

|Description|Source location|Save customizations in|
|-----------|---------------|----------------------|
|Main Wikis application user interface|In installedApps/<cell\_name\>/Wikis.ear/wikis.web.jar: com/ibm/lconn/wikis/strings/ui.properties|customizationDir/strings/com.ibm.lconn.wikis.strings.ui.properties|
|Welcome page content|In installedApps/<cell\_name\>/Wikis.ear/share.services.jar:com/ibm/lconn/share/services/handlers/wiki/nls/WikiWelcomeMessages.properties|customizationDir/strings/com.ibm.lconn.share.services.handlers.wiki.nls.WikiWelcomeMessages.properties|
|Help tooltips|In installedApps/<cell\_name\>/Wikis.ear/wikis.web.jar: com/ibm/lconn/wikis/strings/uihelp.properties|customizationDir/strings/com.ibm.lconn.wikis.strings.uihelp.properties|
|About page and Server Metrics page|In installedApps/<cell\_name\>/Wikis.ear/wikis.web.jar: com/ibm/lconn/wikis/strings/uitemplates.properties|customizationDir/strings/com.ibm.lconn.wikis.strings.uitemplates.properties|

**Note:** These resource bundles contain most of the Wikis user interface strings, but the strings for the Communities widget are provided in JavaScript. See [Customizing strings sourced in JavaScript](t_customize_strings_via_javascript.md) for more information.

