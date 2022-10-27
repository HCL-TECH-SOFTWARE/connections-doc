# Determining where to save your customizations {#t_customize_find_custom_directory .task}

When you are customizing HCL Connections™, save your customized files to the appropriate directory to ensure that your customizations override the default settings.

The base directory where you must store your customizations is defined during installation, when it is saved as an IBM® WebSphere® Application Server variable named CONNECTIONS\_CUSTOMIZATION\_PATH. By default, this variable is set to installDir/data/customization. This customization base directory is referenced as customizationDir throughout the documentation

To determine the location of your customization directory, check the value of the CONNECTIONS\_CUSTOMIZATION\_PATH variable for your deployment. After you determine the base directory location, you can then identify the subdirectory where you must save your customizations.

1.  Log in to the IBM WebSphere Application Server Integrated Solutions Console.

2.  Expand **Environment** and select **WebSphere variables**.

3.  Look for **CONNECTIONS\_CUSTOMIZATION\_PATH** in the list of variable names and make a note of the value.

    For example:

    /local/IBM/Connections/data/shared/customization

4.  Save your customized files in the appropriate subdirectory of the customization directory:

    -   To save customizations that apply to all the applications, copy the file into the common subdirectory:

        customizationDir/common

    -   To save customizations that apply to a single application only, copy the file into the subdirectory for that application:

        |Directory path|Description|
        |--------------|-----------|
        |customizationDir/common|Stores files to be applied to all of the applications. You most often copy edited files to this directory.|
        |customizationDir/activities|Stores files to be applied to the Activities user interface only.|
        |customizationDir/blogs|Stores files to be applied to the Blogs user interface only.|
        |customizationDir/bookmarks|Stores files to be applied to the Bookmarks user interface only.|
        |customizationDir/communities|Stores files to be applied to the Communities user interface only.|
        |customizationDir/files|Stores files to be applied to the Files user interface only.|
        |customizationDir/forums|Stores files to be applied to the Forums user interface only.|
        |customizationDir/homepage|Stores files to be applied to the Home page user interface only.|
        |customizationDir/metrics|Stores files to be applied to the Metrics page user interface only.|
        |customizationDir/moderation|Stores files to be applied to the Moderation page user interface only.|
        |customizationDir/news|Stores files to be applied to the News user interface only.|
        |customizationDir/profiles|Stores files to be applied to the Profiles user interface only.|
        |customizationDir/search|Stores files to be applied to the Advanced Search user interface only.|
        |customizationDir/wikis|Stores files to be applied to the Wikis user interface only.|

        **Note:** Footers for Community widgets are controlled within the Communities subdirectory. With the exception of Blogs and Wikis which are controlled from their respective application subdirectories.

        The following table identifies where to store customized versions of files when the customizations apply to all the applications.

        |Directory path|Description|
        |--------------|-----------|
        |customizationDir/themes/<theme\_name\>Theme/custom.css**Note:** Each theme, for example: "red", "green", "onyx", "gen4", "hikari", \(the default theme\) has a theme customization folder called customizationDir/themes/<theme\_name\>Theme/. So the customization folder for the hikari theme is customizationDir/themes/hikariTheme/.

|Customized styles|
        |customizationDir/themes/<theme\_name\>Theme/defaultTheme.css|Customized themes|
        |customizationDir/common/nav/templates/login.jsp|Customized login page|
        |customizationDir/common/nav/templates/footer.jsp|Customized footer file|
        |customizationDir/common/nav/templates/error.jsp|Customized error page|
        |customizationDir/themes/images|Customized images|

        The following table identifies where to store application-specific versions of customized CSS files:

        |File name and file path|Description|
        |-----------------------|-----------|
        |customizationDir/themes/theme/applications/activities.css|Customized styles for Activities.|
        |customizationDir/themes/theme/applications/blogs.css|Customized styles for Blogs.|
        |customizationDir/themes/theme/applications/dogear.css|Customized styles for Bookmarks.|
        |customizationDir/themes/theme/applications/bookmarklet.css|Customized styles for the Bookmarklet.|
        |customizationDir/themes/theme/applications/communities.css|Customized styles for Communities.|
        |customizationDir/themes/theme/applications/files.css|Customized styles for Files.|
        |customizationDir/themes/theme/applications/forums.css|Customized styles for Forums.|
        |customizationDir/themes/theme/applications/homepage.css|Customized styles for the Home page.|
        |customizationDir/themes/theme/applications/metrics.css|Customized styles for Metrics.|
        |customizationDir/themes/theme/applications/moderation.css|Customized styles for Moderation.|
        |customizationDir/themes/theme/applications/news.css|Customized styles for News.|
        |customizationDir/themes/theme/applications/profiles.css|Customized styles for Profiles.|
        |customizationDir/themes/theme/applications/wikis.css|Customized styles for Wikis.|

    **Notes:**

    -   Where theme is the name of the themes that are available for each application. For example: redTheme, goldTheme, and so on.
    -   When you select the Coffee theme in the UI, the goldTheme is invoked. There is no coffeeTheme in the CSS files.
    -   Right-to-left themes are specified in the applicationRTL.css files, where application represents one of the HCL Connections applications. For example: activitiesRTL.css.
    -   For information about where to save customized application properties files, see the [Property file strings](r_customize_properties_files.md) topic.
    -   For information about where to save customized JavaScript™ files, see the [JavaScript resource strings](r_customize_js_files.md) topic.

-   **[Application WAR files and OSGi bundles](../customize/r_customize_war_osgi_file_locations.md)**  
The following web application directories and OSGi bundles are packaged as part of HCL Connections.
-   **[Language codes](../customize/r_customize_lang_codes.md)**  
Use the language codes that are listed in the table to identify the language-specific version of the JavaScript or properties files that you want to customize.

**Parent topic:**[Customizing the user interface](../customize/t_admin_common_customize_main.md)

**Related information**  


[Changing WebSphere Application Server environment variables](../admin/t_admin_common_change_was_env_variable.md)

[Property file strings](../customize/r_customize_properties_files.md)

[JavaScript resource strings](../customize/r_customize_js_files.md)

[WebSphere Application Server environment variables](../admin/r_admin_common_was_env_variables.md)

