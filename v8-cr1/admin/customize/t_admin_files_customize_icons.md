# Customizing file type icons {#t_admin_files_customize_icons .task}

You can add new file extensions to an existing file type icon, or add a new file extension with a new icon. Custom file type icons display in the Activities, Files, and Communities applications. They also display in the activity stream.

1.  Turn on the customization debugging capability. For more information, see [Enabling live user interface customization editing mode](t_customize_enable_custom_debugging.md).

2.  Add the new icon files to the following directory:

    customizationDir/themes/images

    where customizationDir is the base directory where your customizations should go. For more information, see [Determining where to save your customizations](t_customize_find_custom_directory.md).

3.  Make a copy of the sprite-lconn.css file. You can access the file from the following directory:

    WAS\_HOME/profiles/profile\_name/installedApps/cell\_name/application\_name.ear/application\_name.war/nav/common/styles/base

    Where:

    -   WAS\_HOME is the directory where IBM® WebSphere® Application Server is installed.
    -   profile\_name is the profile where you installed Connections.
    -   cell\_name is the cell where you installed the application.
    -   application\_name.ear is the name of the application EAR file. To customize interface styles that are common to all applications, use the Common.ear file.
    -   application\_name.war is the name of the application WAR file.

        **Tip:** For a list of the web application source directories that are packaged with Connections, see [Application WAR files and OSGi bundles](r_customize_war_osgi_file_locations.md).

    -   version is the version number of the Connections release plus the date and build number of the JAR file.
4.  Paste the sprite-lconn.css file into the appropriate subdirectory of the customizationDir directory:

    -   When you want the edited file to be used by all the applications, post it to the customizationDir/themes/images/common directory.
    -   For the file to be used by a specific application only, post it to the customizationDir/themes/images/application\_name directory.
5.  Open the new copy of the sprite-lconn.css file in a text editor and do one of the following:

    -   Add a new extension and associate it with an existing icon:
        1.  Find the line with extensions that currently use the icon. For example, this is the line for extensions that use the "document" icon:

            ```
            .lconn-ftype16-doc,.lconn-ftype16-docm,.lconn-ftype16-docx, .... {background-position: 0 -408px;}
            ```

        2.  Add the new extension in the appropriate format. Make it lowercase, and replace non-alpha numeric characters \(a through z and 0 through 9\) with a dash \("-"\). For example, add the extension .DocFormat\_2010 to the list like this:

            ```
            .lconn-ftype16-docformat-2010, .lconn-ftype16-doc,.lconn-ftype16-docm,.lconn-ftype16-docx, .... {background-position: 0 -408px;}
            ```

        3.  Repeat steps a and b in the 32 and 64 pixel list. For example:

            ```
            .lconn-ftype32-docformat-2010, .lconn-ftype32-doc,.lconn-ftype32-docm,.lconn-ftype32-docx, .... {background-position: 0 -1112px;}
            ```

            ```
            .lconn-ftype64-docformat-2010, .lconn-ftype64-doc,.lconn-ftype64-docm,.lconn-ftype64-docx, .... {background-image: url(../images/ftWordProcessing64.png);}
            ```

    -   Add a new extension and a new icon by creating new rules for 16, 32, and 64 pixel icons, for example:

        ```
        .lconn-ftype16-docformat-2010 { background-image:url(myCustomExtensionIcon16.png) !important; background-position: 0 0; }
        
        ```

        ```
        .lconn-ftype32-docformat-2010 { background-image:url(myCustomExtensionIcon32.png) !important; background-position: 0 0; }
        ```

        ```
        .lconn-ftype64-docformat-2010 { background-image:url(myCustomExtensionIcon64.png) !important; background-position: 0 0; }
        ```

6.  When you are ready to publish your changes, turn off the customization debugging capability. Test whether your changes were added successfully by restarting the applications, and then refreshing the web browser. A browser refresh only shows you your changes if you turned on debugging. See [Enabling live user interface customization editing mode](t_customize_enable_custom_debugging.md) for more details.

7.  See [Post-customization step](t_admin_common_customize_postreq.md) for information about how to update the product version stamp and ensure that your users see the changes the next time that they log in to HCL Connections.


-   **[File type icons](../customize/r_admin_MIME_icons.md)**  
These icons are provided by HCL Connections for displaying files.

**Parent topic:**[Customizing images](../customize/c_customize_images.md)

**Related information**  


[Configuring MIME types for Files](../admin/t_admin_files_config_mime.md)

[Enabling live user interface customization editing mode](../customize/t_customize_enable_custom_debugging.md)

[Determining where to save your customizations](../customize/t_customize_find_custom_directory.md)

[Post-customization step](../customize/t_admin_common_customize_postreq.md)

[Application WAR files and OSGi bundles](../customize/r_customize_war_osgi_file_locations.md)

