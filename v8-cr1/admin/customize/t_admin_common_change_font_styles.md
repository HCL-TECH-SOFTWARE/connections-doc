# Making extensive color and style changes {#t_admin_common_change_font_styles .task}

Edit the `defaultTheme.css` file to change the look of the user interface, such as changing the font style or background color.

The default styles and colors for Connections applications are specified in the defaultTheme.css file. Extra application-specific styles are defined in files that are named after the applications such as the activities.css file. These extra styles override the styles in the defaultTheme.css file.

To customize a UI control in an application, you might have to edit the application-specific CSS file instead of `defaultTheme.css`. You can overwrite the application-specific CSS file by storing your edited version in the customization directory for that application.

1.  Turn on the customization debugging capability. For more information, see [Enabling live user interface customization editing mode](t_customize_enable_custom_debugging.md).

2.  Create a <theme\_name\>Theme directory in the customizationDir directory.

    **Note:** Each theme, for example: "red", "green", "onyx", "gen4", "hikari", \(the default theme\) has a theme customization folder called customizationDir/themes/<theme\_name\>Theme/. So the customization folder for the hikari theme is customizationDir/themes/hikariTheme/.

    For information about the location of the customizationDir directory, see [Determining where to save your customizations](t_customize_find_custom_directory.md).

3.  Navigate to the themes directory:

    WAS\_HOME/profiles/profile\_name/installedApps/cell\_name/Common.ear/connections.web.resources.war/WEB-INF/eclipse/plugins/com.ibm.lconn.core.styles\_version.jar!/resources/base/applications

    **Note:** The com.ibm.lconn.core.styles\_version.jar file contains CSS style sheets that extend or override default styles from the OneUI 3.0.x toolkit.

    **Note:** Hikari theme is in the same directory in the following jar: com.ibm.social.hikari.theme\_1.0.0.20151204-1501.jar

    **Note:** The gen4 theme is also in the same directory in the following jar: com.ibm.social.gen4.theme\_4.0.0.20151204-1501.jar

    Where:

    -   WAS\_HOME is the directory where IBM® WebSphere® Application Server is installed.
    -   profile\_name is the profile where you installed Connections.
    -   cell\_name is the cell where you installed the application.
    -   application\_name.ear is the name of the application EAR file. To customize interface styles that are common to all applications, use the Common.ear file.
    -   application\_name.war is the name of the application WAR file.

        **Tip:** For a list of the web application source directories that are packaged with Connections, see [Application WAR files and OSGi bundles](r_customize_war_osgi_file_locations.md).

    -   version is the version number of the Connections release plus the date and build number of the JAR file.
4.  Copy the defaultTheme.css file and any other files that you want to change and paste them into the common customization <theme\_name\>Theme directory.

    For example:

    customizationDir/themes/hikariTheme/defaultTheme.css

    **Notes:**

    -   Pasting the defaultTheme.css file into the common customizationDir directory makes it available to all the applications.
    -   To customize the theme for a specific application, you must override the application-specific CSS file in the following directory:

        customizationDir/themes/<themedir\>/applications/application\_name.css

        For a list of the customization locations for application-specific themes and styles, see [Determining where to save your customizations](t_customize_find_custom_directory.md).

    -   Copy and paste files only, do not copy and paste the directory.
5.  Open the copy of the defaultTheme.css file in a text editor.

6.  Edit the style for the class definition that you want to change.

    For example, suppose that you want to update the following lines:

    ```
    body.lotusui30 {color:#222;background:none;background-color:#cee1fc}
    .lotusContent{background-color:#fff;}
    ```

    -   To change the color of body text, change the default value from \#222, which is the code for black, to a color of your choosing.

        **Note:** The font color that you define for body text is applied only to text that is contained within basic body tags, such as <p\> tags. User interface items such as page headings, subheadings, and links are formatted differently.

    -   To change the background color, change the default value from \#fff, which is the code for white, to a color of your choosing.
7.  Save and close the .css file.

8.  To test your style changes, refresh the application in your web browser.

9.  If you enabled custom debugging, turn off the debugging capability when you are ready to publish your changes. For more information, see [Enabling live user interface customization editing mode](t_customize_enable_custom_debugging.md).


For information about how to apply your changes permanently, see [Post-customization step](t_admin_common_customize_postreq.md).

**Parent topic:**[Customizing the user interface](../customize/t_admin_common_customize_main.md)

**Related information**  


[Enabling live user interface customization editing mode](../customize/t_customize_enable_custom_debugging.md)

[Determining where to save your customizations](../customize/t_customize_find_custom_directory.md)

[Post-customization step](../customize/t_admin_common_customize_postreq.md)

[Application WAR files and OSGi bundles](../customize/r_customize_war_osgi_file_locations.md)

