# Application WAR files and OSGi bundles {#r_customize_war_osgi_file_locations .reference}

The following web application directories and OSGi bundles are packaged as part of HCL Connections™.

## Application WAR files { .section}

The default location for the web application directory for each application is: WAS\_HOME/profiles/profile\_name/installedApps/cell\_name/application\_name.ear/application\_name.war

where:

-   WAS\_HOME is the directory to which you installed IBM® WebSphere® Application Server.
-   profile\_name is the profile to which you installed one of the HCL Connections applications.
-   cell\_name is the cell to which you installed the application.
-   application\_name.ear is the EAR file name for the application.
-   application\_name.war is one of the following file names:

    |File|Description|
    |----|-----------|
    |oawebui.war|WAR file for the Activities application|
    |blogs.war|WAR file for the Blogs application|
    |dogear.webui.war|WAR file for the Bookmarks application|
    |comm.web.war|WAR file for the Communities application|
    |files.web.war|WAR file for the Files application|
    |forum.web.war|WAR file for the Forums application|
    |homepage.war|WAR file for the Home page application|
    |sn.moderation.ui.war|WAR file for the Moderation application|
    |news.web.war|WAR file for the News application|
    |lc.profiles.app.war|WAR file for the Profiles application|
    |search.war|WAR file for the Search application|
    |wikis.web.war|WAR file for the Wikis application|


## OSGi bundles { .section}

The following OSGi bundles are packaged as part of HCL Connections, where version\_stamp is a version stamp that may change depending on the interim fix:

|OSGi bundle|Description|
|-----------|-----------|
|com.ibm.dwa.web.resources\_version\_stamp.jar|Contains JavaScript™ code that is specific to the Communities Events application. This bundle contains many of the "calendar view" related user interface handling code for the Communities Events widget.

|
|com.ibm.lconn.activities.web.resources\_version\_stamp.jar|Contains JavaScript and resource strings for the Activities application user interface.|
|com.ibm.lconn.activitystreams.search.admin.web.resources\_version\_stamp.jar|Contains all the HTML, JavaScript, and CSS files used by the activity stream search administration user interface.|
|com.ibm.lconn.blogs.web.resources\_version\_stamp.jar|Contains JavaScript code that is specific to the Blogs application.This bundle contains user interface handling code for the Blogs application.

|
|com.ibm.lconn.calendar.web.resources\_version\_stamp.jar|Contains JavaScript code that is specific to the Communities Events application. This bundle contains user interface handling code for most of the features for the Communities Events widget, and code for the Events widget that displays in the Home page.

|
|com.ibm.lconn.communities.catalog.web.resources\_version\_stamp.jar|Contains JavaScript and resource strings for the Communities Places catalog user interface.|
|com.ibm.lconn.communities.web.resources\_version\_stamp.jar|Contains JavaScript and resource strings for the Communities application user interface. Includes resources for the Bookmarks, Feeds, Members, and Subcommunities navigator widgets.|
|com.ibm.lconn.communityblogs.web.resources\_version\_stamp.jar|Contains JavaScript code that is specific to the community Blog widget and Ideation Blog widget.This bundle contains user interface handling code for the Blog and Ideation Blog widgets that are available in the Communities application.

|
|com.ibm.lconn.communityfiles.web.resources\_version\_stamp.jar|Contains JavaScript and resource strings for the Files widget user interface in Communities application.|
|com.ibm.lconn.core0.web.resources\_version\_stamp.jar|Contains core JavaScript widgets, which are mostly a hard copy of the com.ibm.lconn.core.web.resources\_version\_stamp.jar source.This bundle will be deprecated in a future release.

|
|com.ibm.lconn.dogear.web.resources\_version\_stamp.jar|Containing JavaScript code that is specific to the Bookmarks application.This bundle contains user interface handling code for the Bookmarks application.

|
|com.ibm.lconn.ecmpicker.web.resources\_version\_stamp.jar|Contains the JavaScript code for the document picker that is used to connect to ECM repositories.|
|com.ibm.lconn.files.web.resources\_version\_stamp.jar|Contains JavaScript and resource strings for the Files application user interface.|
|com.ibm.lconn.forums.web.resources\_version\_stamp.jar|Contains JavaScript code that is specific to the Forums application.This bundle contains the user interface handling code for Forums, and also code for the Forums widgets in Communities.

|
|com.ibm.lconn.homepage.web.resources\_version\_stamp.jar|Contains JavaScript code that is specific to the Home page application. This bundle contains the Home page specific elements of the activity stream, user interface handling code for the Home page, and also code for the Home page widgets.

|
|com.ibm.lconn.librarywidget.web.resources\_version\_stamp.jar|Contains the user interface code for the Linked Library widget.|
|com.ibm.lconn.moderation.web.resources\_version\_stamp.jar|Contains JavaScript code that is specific to the Moderation application.|
|com.ibm.lconn.news.digest.web.resources\_version\_stamp.jar|Contains JavaScript and strings for the user interface elements that are specific to the News application, including the language selector that is used on the Settings page in News.|
|com.ibm.lconn.news.microblogging.sharebox.form\_version\_stamp.jar|Contains code for the microblogging widget that displays before the activity stream. This bundle also contains code that provides the gadget used for the Share dialog, and strings that are used in the microblogging widget and dialog.

|
|com.ibm.lconn.oauth.web.resources\_version\_stamp.jar|Contains JavaScript resources for the OAuth administration application.|
|com.ibm.lconn.profiles.web.resources\_version\_stamp.jar|Contains JavaScript and resource strings for the Profiles application user interface in places like the general user interface, widgets, and business card.|
|com.ibm.lconn.recomm.web.resources\_version\_stamp.jar|Contains strings and JavaScript resources for the Related Communities widget.|
|com.ibm.lconn.share0.web.resources\_version\_stamp.jar|Contains base classes \(dialogs, widgets, and utils\) for the com.ibm.lconn.wikis.web.resources\_\_version\_stamp.jar file.|
|com.ibm.lconn.wikis.web.resources\_version\_stamp.jar|Contains JavaScript code that is specific to the Wikis application: actions \(dialogs\), beans, scenes, utility classes, custom widgets, and core application code that implements the scenes life-cycle.|

**Parent topic:**[Determining where to save your customizations](../customize/t_customize_find_custom_directory.md)

**Related information**  


[Customizing the navigation bar](../customize/t_admin_navbar_create_files.md)

[Customizing file type icons](../customize/t_admin_files_customize_icons.md)

[Making extensive color and style changes](../customize/t_admin_common_change_font_styles.md)

[Adding styles to the HCL Connections style sheet](../customize/t_admin_navbar_change_style.md)

[Customizing the login page](../customize/t_admin_common_customize_login_screen.md)

[Customizing the error page](../customize/t_customize_error_page.md)

[Customizing the footer](../customize/t_admin_common_add_footer_link.md)

[Extending JSP files with custom tags](../customize/t_customize_tag_files.md)

