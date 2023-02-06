# Extending JSP files with custom tags {#t_customize_tag_files .task}

You can extend HCL Connections™ by adding your own custom JSTL tags to meet your company's needs.

1.  Turn on the customization debugging capability. For more information, see [Enabling live user interface customization editing mode](t_customize_enable_custom_debugging.md).

2.  Copy the .jsp file from the WAR file of one of the applications that you would like to customize. You can access the file from the following directory:

    ```
    WAS\_HOME/profiles/profile\_name/installedApps/cell\_name/
    application\_name.ear/application\_name.war/nav/templates
    ```

    Where:

    -   WAS\_HOME is the directory where IBM® WebSphere® Application Server is installed.
    -   profile\_name is the profile where you installed Connections.
    -   cell\_name is the cell where you installed the application.
    -   application\_name.ear is the name of the application EAR file. To customize interface styles that are common to all applications, use the Common.ear file.
    -   application\_name.war is the name of the application WAR file.

        **Tip:** For a list of the web application source directories that are packaged with Connections, see [Application WAR files and OSGi bundles](r_customize_war_osgi_file_locations.md).

    -   version is the version number of the Connections release plus the date and build number of the JAR file.
3.  Paste the .jsp file into the appropriate subdirectory in the customization directory.

    See [Determining where to save your customizations](t_customize_find_custom_directory.md) for more information about locating your base customization directory.

4.  Copy the content of the .tag file containing the custom tags that you want to add, then open the .jsp file and paste the content where it needs to be rendered.

5.  Save and close the `.jsp` file.

6.  To test your changes, refresh the web browser, and then access the page from the product.

7.  If you enabled custom debugging, turn off the debugging capability when you are ready to publish your changes. For more information, see [Enabling live user interface customization editing mode](t_customize_enable_custom_debugging.md).

8.  See [Post-customization step](t_admin_common_customize_postreq.md) for information about how to apply your changes permanently.


**Parent topic:**[Customizing the user interface](../customize/t_admin_common_customize_main.md)

**Related information**  


[Enabling live user interface customization editing mode](../customize/t_customize_enable_custom_debugging.md)

[Determining where to save your customizations](../customize/t_customize_find_custom_directory.md)

[Post-customization step](../customize/t_admin_common_customize_postreq.md)

[Application WAR files and OSGi bundles](../customize/r_customize_war_osgi_file_locations.md)

