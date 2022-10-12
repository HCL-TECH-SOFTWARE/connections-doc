# Customizing the user interface {#t_admin_common_customize_main .task}

The procedure to customize HCL Connections™ is the same for each application. You must edit a copy of the relevant source file and save it in the appropriate customization directory.

Review the user interface to determine what you want to customize.

Use these instructions as a general guide for customizing the user interface. For more information about customizing specific parts of the user interface, see the related links. For tips about customizing your deployment, see [Customization best practices](c_customize_best_practices.md).

The style of theConnections user interface is based on the Collaboration Solutions OneUI Toolkit 3.0.

1.  Find the file that serves as the source of the interface elements that you want to customize.

    For a list of the web application source directories and OSGi bundles that are packaged with Connections, see [Application WAR files and OSGi bundles](r_customize_war_osgi_file_locations.md).

2.  Enable the customization debugging capability.

    For more information, see [Enabling live user interface customization editing mode](t_customize_enable_custom_debugging.md).

3.  Copy the file that you want to customize and past it into the appropriate customization directory.

    For more information, see [Determining where to save your customizations](t_customize_find_custom_directory.md).

    **Remember:** You can find the sources for style sheets in the following JAR file:

    WAS\_HOME/profiles/profile\_name/installedApps/cell\_name/Common.ear/connections.web.resources.war/WEB-INF/eclipse/plugins/com.ibm.oneui3.styles\_version.jar

    **Notes:**

    -   com.ibm.lconn.oneui3.styles\_version.jar contains the Collaboration Solutions OneUI 3.0.x toolkit that includes image resources and sprites.
    -   com.ibm.lconn.oneui3.styles\_version.jar is only found in one application, Common.ear/connections.web.resources.war
    WAS\_HOME/profiles/profile\_name/installedApps/cell\_name/application\_name.ear/application\_name.war/WEB-INF/eclipse/plugins/com.ibm.lconn.core.styles\_version.jar

    **Note:** The com.ibm.lconn.core.styles\_version.jar file contains CSS style sheets that extend or override default styles from the OneUI 3.0.x toolkit.

    Where:

    -   WAS\_HOME is the directory where IBM® WebSphere® Application Server is installed.
    -   profile\_name is the profile where you installed Connections.
    -   cell\_name is the cell where you installed the application.
    -   application\_name.ear is the name of the application EAR file. To customize interface styles that are common to all applications, use the Common.ear file.
    -   application\_name.war is the name of the application WAR file.

        **Tip:** For a list of the web application source directories that are packaged with Connections, see [Application WAR files and OSGi bundles](r_customize_war_osgi_file_locations.md).

    -   version is the version number of the Connections release plus the date and build number of the JAR file.
    **Note:** In previous releases of Connections, the default style sheets were in the nav subdirectory of the WAS\_HOME/profiles/profile\_name/installedApps/cell\_name/application\_name.ear/application\_name.war directory. That location is deprecated in this release.

    The following table identifies the source files for each user interface area.

    |Feature|File location|
    |-------|-------------|
    |Cascading style sheets|    -   To add custom styles to the product, edit the following files:

**Note:** If your users view the product in Arabic, Hebrew, or another right-to-left language, copy the defaultTheme\_rtl.css file too.

        -   /nav/common/styles/defaultTheme/custom.css
        -   /nav/common/styles/defaultTheme/custom\_rtl.css
For more information, see [Adding styles to the Connections style sheet](t_admin_navbar_change_style.md).

    -   To make extensive changes to the colors used in the product, edit the following file: /nav/common/styles/defaultTheme/defaultTheme.css

For more information, see [Making extensive color and style changes](t_admin_common_change_font_styles.md).

|
    |Error page|/nav/templates/error.jspFor more information, see [Customizing the error page](t_customize_error_page.md).

|
    |Footer|/nav/templates/footer.jspFor more information, see [Customizing the footer](t_admin_common_add_footer_link.md).

|
    |Login page|/nav/templates/login.jspFor more information, see [Customizing the login page](t_admin_common_customize_login_screen.md).

|
    |Navigation bar|/nav/templates/header.jspFor the menus available from the navigation bar:

    ```
/nav/templates/menu/people.jsp
/nav/templates/menu/communities.jsp
/nav/templates/menu/apps.jsp
    ```

For more information, see [Customizing the navigation bar](t_admin_navbar_create_files.md).

|

    For example:

    -   To edit the footer and have the same footer be displayed in all of the applications, store the updated footer file in the following directory:

        customizationDir/common/nav/templates/footer.jsp

    -   To change the login page of a single application, store the updated login page file in the directory where customizations that are specific to that application are stored. For example, to change the login page of the Files application only, store the login.jsp file in the files subdirectory instead of the common subdirectory:

        customizationDir/files/nav/templates/login.jsp

4.  Edit the file in the customizationDir directory to make your changes.

5.  Test your changes by refreshing the web browser. You might have to clear your browser cache to see the changes.

6.  When you are ready to publish your changes, turn off the customization debugging capability.

7.  Using the WebSphere Application Server Integrated Solutions Console, stop and restart each application EAR file.

8.  Force all user web browsers to refresh all cached content and display your changes by running the command that updates the product version stamp. For more information, see [Post-customization step step](t_admin_common_customize_postreq.md).


For more information about customizing specific areas of the product, see the related topics.

-   **[Determining where to save your customizations](../customize/t_customize_find_custom_directory.md)**  
When you are customizing HCL Connections, save your customized files to the appropriate directory to ensure that your customizations override the default settings.
-   **[Enabling live user interface customization editing mode](../customize/t_customize_enable_custom_debugging.md)**  
You can force applications to reload override files every time a browser request is made. This capability shows your customization changes in the product instantly.
-   **[Customizing the navigation bar](../customize/t_admin_navbar_create_files.md)**  
You can edit the files that control the content of the HCL Connections navigation bar to add to the bar's functionality. For example, you can add extra links to the navigation bar, remove the **Log Out** link, or insert extra drop-down menus.
-   **[Adding an Important To Me bar to a Connections component](../customize/c_itm_iframe_intro.md)**  
Use an iframe to add an Important to Me \(ITM\) bar to any Connections component.
-   **[Customizing images](../customize/c_customize_images.md)**  
You can update the images used in HCL Connections to suit the needs of your organization. For example, you can replace the IBM logo with your company logo, or customize the sprited images and file type icons that are used in the product interface to fit with your company's branding.
-   **[Adding styles to the HCL Connections style sheet](../customize/t_admin_navbar_change_style.md)**  
You can customize the look of the HCL Connections pages by adding new style definitions in the cascading style sheet and applying that style to different parts of the product user interface.
-   **[Making extensive color and style changes](../customize/t_admin_common_change_font_styles.md)**  
Edit the `defaultTheme.css` file to change the look of the user interface, such as changing the font style or background color.
-   **[Customizing the login page](../customize/t_admin_common_customize_login_screen.md)**  
Customize the login page in HCL Connections to have the appropriate style and content for your organization.
-   **[Customizing the footer](../customize/t_admin_common_add_footer_link.md)**  
You can edit the files that control the content of the HCL Connections footer to improve the footer's functionality.
-   **[Customizing the error page](../customize/t_customize_error_page.md)**  
Customize the text on the error page in HCL Connections.
-   **[Customizing the Getting Started view](../customize/t_customize_getting_started_page.md)**  
Help your users get started with your implementation of HCL Connections by customizing the Getting Started view that is displayed in the Home page.
-   **[Customizing product strings](../customize/t_customize_strings_global.md)**  
You can replace a word or phrase in the product user interface with terminology that better suits your environment.
-   **[Overriding and extending JavaScript in HCL Connections](../customize/c_customize_javascript.md)**  
HCL Connections supports a mechanism that allows you to override or extend the JavaScript™ that is used in the different applications.
-   **[Extending JSP files with custom tags](../customize/t_customize_tag_files.md)**  
You can extend HCL Connections by adding your own custom JSTL tags to meet your company's needs.
-   **[Customizing the Application Access and Access Request interfaces](../admin/t_admin_oauth_cust_app_access_rquest_ui.md)**  
You can customize the header, footer, login, and error pages that prompt HCL Connections users to grant/deny and revoke access to their Connections data for third-party applications protected by OAuth. Also, you can edit the text strings that display on the Application Access and Access Requestinterfaces.
-   **[Embedding Connections in an IFrame](../customize/t_customize_connections_iframe.md)**  
You can customize HCL Connections to be embedded in an IFrame.
-   **[Customizing the Hikari theme](../customize/t_customize_communities_new_theme.md)**  
Customize the default Hikari theme in HCL Connections.

**Parent topic:**[Customizing](../customize/c_customize_overview.md)

**Related information**  


[Applying common configuration property changes](../admin/t_admin_common_save_changes.md)

[Enabling live user interface customization editing mode](../customize/t_customize_enable_custom_debugging.md)

[Post-customization step](../customize/t_admin_common_customize_postreq.md)

[Customization best practices](../customize/c_customize_best_practices.md)

