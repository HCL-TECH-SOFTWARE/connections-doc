# Adding styles to the HCL Connections style sheet {#t_admin_navbar_change_style .task}

You can customize the look of the HCL Connections™ pages by adding new style definitions in the cascading style sheet and applying that style to different parts of the product user interface.

To add a custom style to the HCL Connections style sheet, you need to create a CSS file that contains your customized styles and store it in the customizationDir/themes/<theme\_name\>Theme folder.

**Note:** Each theme, for example: "red", "green", "onyx", "gen4", "hikari", \(the default theme\) has a theme customization folder called customizationDir/themes/<theme\_name\>Theme/. So the customization folder for the hikari theme is customizationDir/themes/hikariTheme/.

1.  Turn on the customization debugging capability. For more information, see [Enabling live user interface customization editing mode](t_customize_enable_custom_debugging.md).

2.  Create a CSS file that is named `custom.css` and store it in the appropriate subdirectory of the customization directory.

    For example, to change the style of a class in all the applications, you copy the file into the following directory: customizationDir/themes/<theme\_name\>Theme

    For information about how to find out where your customizationDir directory is located, see [Determining where to save your customizations](t_customize_find_custom_directory.md).

    A custom.css file is present in the WAR file for each application, but the file does not contain any useful content by default, so it is easier to create a new custom.css.

3.  Open the .css file in a text editor, and define any new styles that you want to apply to the product user interface.

    You might want to use the default hikariTheme.css file as a resource for styles that are already defined for the application. You can find this file in the following location:

    http://server\_name/connections/resources/web/com.ibm.oneui3.styles/css/hikariTheme/

4.  Add new style definitions or edit the style that is specified for the class definition that you copied from the hikariTheme.css file.

5.  Save and close custom.css file.

6.  Stop and restart the Common.ear file to pick up the CSS changes.

7.  To test your style changes, reference your new style from a user interface element, and then refresh your web browser.

8.  If you enabled customization debugging in step 1, turn it off when you are ready to publish your changes. For more information, see [Enabling live user interface customization editing mode](t_customize_enable_custom_debugging.md).

9.  See [Post-customization step](t_admin_common_customize_postreq.md) for information about how to apply your changes permanently.


**Parent topic:**[Customizing the user interface](../customize/t_admin_common_customize_main.md)

**Related information**  


[Determining where to save your customizations](../customize/t_customize_find_custom_directory.md)

[Post-customization step](../customize/t_admin_common_customize_postreq.md)

[Application WAR files and OSGi bundles](../customize/r_customize_war_osgi_file_locations.md)

