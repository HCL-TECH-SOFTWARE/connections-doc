# JavaScript resource strings 

Use the information in the tables to identify customizable strings sourced from JavaScript™ files and to determine the correct location for saving the customized files.

## Customizable strings { .section}

**Notes:**

-   In the paths listed here:
    -   **installedApps** refers to the following directory path: ``WAS\_HOME/profiles/profile\_name/installedAppswhere:``

        -   WAS\_HOME is the directory to which you installed IBM® WebSphere® Application Server.
        -   profile\_name is the profile to which you installed one of the HCL Connections™ applications.
        For example: ``/opt/IBM/WebSphere/AppServer/profiles/AppSrv01/installedApps/standaloneCell01/``

    -   **webresources** refers to the web resources provisioning directory for HCL Connections that is created during installation. By default, it is created in the following directory: ``CONNECTIONS\_HOME/data/shared/provision/webresources``

        For example: ``/opt/IBM/Connections/Data/shared/provision/webresources``

    -   **customizationDir** refers to the base customization directory where you need to save your customized files. This base directory is defined during the installation of HCL Connections, when it is saved as a WebSphere® Application Server variable named CONNECTIONS\_CUSTOMIZATION\_PATH. This variable is set to ``[shared\_data\_directory\_root](../plan/i_ovr_r_directory_conventions.md)/customization`` by default.

        For example: ``local/opt/IBM/Connections/Data/shared/provision/customization/``

    -   version refers to the file version and time stamp, for example, \_3.0.0.20120307-0100 in the following file name: ``com.ibm.lconn.activities.web.resources\_3.0.0.20120307-0100.jar``
    -   language\_code identifies the language-specific version of the strings that you want to customize. For a list of the language codes that are supported by HCL Connections, see [Language codes](r_customize_lang_codes.md).
-   The following applications do not have any associated JavaScript resource strings:
    -   Files
    -   Linked Library widget \(Communities\)
    -   Media Gallery
    -   Metrics
    -   Moderation
    -   News
    -   Profiles
-   The following applications do not support javascript customization in connection V8:
    -   Search
    -   Share Dialog
    -   Ideation Blog
    -   Common (String.js)

## Common { .section}

|Description|Source location|Place customizations in|
|-----------|---------------|-----------------------|
|Like control \(in embedded experience\)|installedApps/Common.ear/connections.web.resources.war/WEB-INF/eclipse/plugins/com.ibm.oneui.web.resources\_version.jar:resources/recommend/nls/Recommender.js|customizationDir/javascript/com/ibm/oneui/recommend/nls/Recommender.js|
|Upload file dialog-related strings|installedApps/Common.ear/connections.web.resources.war/WEB-INF/eclipse/plugins/com.ibm.lconn.core.web.resources\_version.jar:resources/upload/nls/upload.js|customizationDir/javascript/lconn/core/upload/nls/upload.js|
<!-- Commented below as this is not function in connection v8 -->
<!--|Copy strings.js to the customization directory|installedApps/Common.ear/connections.web.resources.war/WEB-INF/eclipse/plugins/com.ibm.lconn.core.web.resources\_version.jar:resources/nls/strings.js|customizationDir/javascript/lconn/core/nls/strings.js|-->

## Activities { .section}

|Description|Source location|Place customizations in|
|-----------|---------------|-----------------------|
|Activities application strings|webresources/com.ibm.lconn.activities.web.resources\_version.jar/resources/nls/strings.js|customizationDir/javascript/lconn/act/nls/strings.js|

## Blogs { .section}

|Description|Source location|Place customizations in|
|-----------|---------------|-----------------------|
|Blogs application strings|webresources/com.ibm.lconn.blogs.web.resources\_version.jar/resources/nls/strings.js|customizationDir/javascript/lconn/blogs/nls/strings.js|
|Blog widget \(Communities\)|webresources/com.ibm.lconn.communityblogs.web.resources/resources/nls/strings.js|customizationDir/javascript/lconn/communityblogs/nls/strings.js|
|Ideation Blog widget \(Communities\)|webresources/com.ibm.lconn.communityblogs.web.resources/resources/ideation/nls/strings.js| customizationDir/javascript/lconn/communityblogs/ideation/nls/strings.js|

## Bookmarks { .section}

|Description|Source location|Place customizations in|
|-----------|---------------|-----------------------|
|Bookmarks application strings|webresources/com.ibm.lconn.dogear.web.resources\_version.jar/resources/nls/strings.js|customizationDir/javascript/lconn/dogear/nls/strings.js|

## Bookmarklet { .section}

**Note:** The bookmarklet is the window that displays when you add a bookmark. It is in the Common.ear file. The bookmarklet allows users to add bookmarks to different applications, such as Communities or Activities. Users can add a button to their browser that allows them to access the bookmarklet window. Every page in Connections has a **Bookmarking Tools** link in the page footer that allows users to install this toolbar button.

|Description|Source location|Place customizations in|
|-----------|---------------|-----------------------|
|Bookmarklet application strings|installedApps/Common.ear/connections.web.resources.war/WEB-INF/eclipse/plugins/com.ibm.lconn.bookmarklet.web.resources\_version.jar/resources/nls/strings.js|customizationDir/javascript/lconn/bookmarklet/nls/strings.js|

## Communities { .section}

|Description|Source location|Place customizations in|
|-----------|---------------|-----------------------|
|Communities application strings|webresources/com.ibm.lconn.communities.web.resources\_version.jar/resources/nls/strings.js|customizationDir/javascript/lconn/comm/nls/strings.js|
|Enterprise Content Manager document picker \(used to configure the Linked Library to point to a specific library or folder\)|webresources/com.ibm.lconn.ecmpicker.web.resources\_version.jar/resources/nls/language\_code/picker.js|customizationDir/javascript/quickr/picker/nls/language\_code/picker.js|
|Calendar widget strings|webresources/com.ibm.lconn.calendar.web.resources\_version.jar/resources/CalendarData/nls/templateStrings.js|customizationDir/javascript/lconn/calendar/CalendarData/nls/templateStrings.js|
|Calendar widget strings \(grid view\)|webresources/com.ibm.dwa.web.resources\_version.jar/resources/cv/nls/calendarView.js|customizationDir/javascript/dwa/cv/nls/calendarView.js|
|Calendar widget strings \(grid view\)|webresources/com.ibm.dwa.web.resources\_version.jar/resources/date/nls/calendar.js|customizationDir/javascript/dwa/date/nls/calendar.js|
|Calendar widget strings \(grid view\)|webresources/com.ibm.dwa.web.resources\_version.jar/resources/date/nls/datepick.js|customizationDir/javascript/dwa/date/nls/datepick.js|
|Related Communities widget strings|webresources/com.ibm.lconn.recomm.web.resources\_version.jar/resources/nls/strings.js|customizationDir/javascript/lconn/recomm/nls/strings.js|
|Strings that display in the Communities user interface, including Communities overview page, Communities catalog, Communities table and community entries, menu items, and the Catalog administration user interface|webresources/com.ibm.lconn.communities.catalog.web.resources\_version.jar/resources/nls/placeCenter.js|customizationDir/javascript/lconn/communities/catalog/nls/placeCenter.js|

## Embedded experience { .section}

|Description|Source location|Place customizations in|
|-----------|---------------|-----------------------|
|Embedded experience content|installedApps/Common.ear/connections.web.resources.war/WEB-INF/eclipse/plugins/com.ibm.social.ee.web.resources\_version.jar/resources/nls/socialEEStrings.js|customizationDir/javascript/com/ibm/social/ee/nls/socialEEStrings.js|
|Embedded experience window|installedApps/Common.ear/connections.web.resources.war/WEB-INF/eclipse/plugins/com.ibm.oneui.web.resources\_version.jar/resources/controls/nls/FlyoutDialog.js|customizationDir/javascript/com/ibm/oneui/controls/nls/FlyoutDialog.js|

## Forums { .section}

|Description|Source location|Place customizations in|
|-----------|---------------|-----------------------|
|Forums application strings|webresources/com.ibm.lconn.forums.web.resources\_version.jar/resources/nls/strings.js|customizationDir/javascript/lconn/forums/nls/strings.js|
|Forums widget \(Communities\)|installedApps/cellName/Common.ear/connections.web.resources.war/WEB-INF/eclipse/plugins/com.ibm.lconn.core.web.resources\_version.jar/resources/nls/strings.jswhere cellName is the name of the cell to which the Common.ear node belongs.|customizationDir/javascript/lconn/core/nls/strings.js|

## Profiles { .section}

|Description|Source location|Place customizations in|
|-----------|---------------|-----------------------|
|Profiles business card|installedApps/Common.ear/connections.web.resources.war/WEB-INF/eclipse/plugins/com.ibm.lconn.core.web.resources\_version.jar/legacyresources/lconn/profiles/bizCard/nls/ui.js|customizationDir/javascript/lconn/profiles/bizCard/nls/ui.js|

**Note:** For locale-specific ui.js, create a folder in thecustomizationDir/javascript/lconn/profiles/bizCard/nls/<language code\> directory, name it with the corresponding language code, and save the JavaScript file in the new folder. For example, to save Dutch ui.js for Profiles, save the customized JavaScript file in the following location: customizationDir/javascript/lconn/profiles/bizCard/nls/nl/ui.js

**Note:** Profiles JavaScript defined strings come from property files; all Dojo dijits that are used in Profiles are defined in core.ui \(bizcard, invite\) and their strings are stored in core.web.resources.

<!-- Search currently not supporting JavaScript customization as its new react component in V8-->
<!--## Search { .section}

In the source location, com.ibm.lconn.search.web.resources is the name of the JAR file beginning with com.ibm.lconn.sand.web.resources.

|Description|Source location|Place customizations in|
|-----------|---------------|-----------------------|
|Sorting control on the Search Results page|installedApps/Common.ear/connections.web.resources.war/WEB-INF/eclipse/plugins/com.ibm.lconn.search.web.resources/resources/nls/Sorting.js|customizationDir/javascript/lconn/search/nls/Sorting.js|
|Strings used to render the data from the feed for the search results|installedApps/Common.ear/connections.web.resources.war/WEB-INF/eclipse/plugins/com.ibm.lconn.search.web.resources/resources/nls/searchData.js|customizationDir/javascript/lconn/search/nls/searchData.js|
|Search Results page|installedApps/Common.ear/connections.web.resources.war/WEB-INF/eclipse/plugins/com.ibm.lconn.search.web.resources/resources/nls/searchResults.js|customizationDir/javascript/lconn/search/nls/searchResults.js|
|Trending widget on the Search Results page|installedApps/Common.ear/connections.web.resources.war/WEB-INF/eclipse/plugins/com.ibm.lconn.search.web.resources/resources/nls/trendData.js|customizationDir/javascript/lconn/search/nls/trendData.js|-->
<!-- Share dialog currently not supporting JavaScript customization as its new react component in V8.-->
<!--## Share dialog { .section}

|Description|Source location|Place customizations in|
|-----------|---------------|-----------------------|
|Share dialog|installedApps/Common.ear/connections.web.resources.war/WEB-INF/eclipse/plugins/com.ibm.social.ee.sharebox.resources\_version.jar/resources/nls/socialShareboxStrings.js|customizationDir/javascript/com/ibm/social/sharebox/nls/socialShareboxStrings.js|
|Share update form|webresources/com.ibm.lconn.news.microblogging.sharebox.form\_version.jar/resources/nls/InputForm.js|customizationDir/javascript/lconn/news/microblogging/sharebox/nls/InputForm.js|

**Note:** The file upload form that is used by the Share feature uses Files strings. For information about customizing Files strings, see [Property file strings](r_customize_properties_files.md).-->

## Social analytics { .section}

In the source location, com.ibm.lconn.sand.web.resources is the name of the JAR file beginning with com.ibm.lconn.sand.web.resources.

|Description|Source location|Place customizations in|
|-----------|---------------|-----------------------|
|Recommendations widgets \(Communities and Home page\)|installedApps/Common.ear/connections.web.resources.war/WEB-INF/eclipse/plugins/com.ibm.lconn.sand.web.resources/resources/nls/RecommendWidget.js|customizationDir/javascript/lconn/sand/nls/RecommendWidget.js|

## Wikis { .section}

|Description|Source location|Place customizations in|
|-----------|---------------|-----------------------|
|Wiki widget \(Communities\)|webresources/com.ibm.lconn.communitywikis.web.resources\_version.jar/resources/nls/WikiWidget.js|customizationDir/javascript/lconn/wikis/comm/nls/WikiWidget.js|

**Parent topic:**[Customizing strings sourced in JavaScript](../../admin/customize/t_customize_strings_via_javascript.md)

**Related information**  


[Determining where to save your customizations](../../admin/customize/t_customize_find_custom_directory.md)

[Changing WebSphere Application Server environment variables](../../admin/admin/t_admin_common_change_was_env_variable.md)

[Property file strings](../../admin/customize/r_customize_properties_files.md)

[Language codes](../../admin/customize/r_customize_lang_codes.md)
