# Replacing images {#t_customize_replace_logo .task}

Customize the product by replacing images specific to HCL Connections™ with your own company images.

1.  Copy the image that you want to replace and paste it to a new location.

    **Tip:** To find the source file for the image that you want to change, use one of the web inspector tools listed in [Customization best practices](c_customize_best_practices.md) to inspect the image. The image name displays in the img tag. If the image is sprited, you can see the class that has the image or icon.

    **Note:** You can find the sprited images file: com.ibm.oneui3.styles\_3.X.X.<DATE-STAMP\>.jar in the following location: WAS\_HOME/profiles/<AppServer\> /installedApps/<cell\>/Common.ear/connections.web.resources.war/WEB-INF/eclipse/plugins

2.  Open the copied image file and update it as needed.

3.  Replace the original image with your new image by saving the updated file into the images subdirectory of the appropriate customization directory.

    See [Determining where to save your customizations](t_customize_find_custom_directory.md) for more details about customization directories.

4.  Create a CCS file named custom.css and store it in the following subdirectory of the customization directory: customizationDir/themes/<theme\_name\>Theme.

    **Note:** Each theme, for example: "red", "green", "onyx", "gen4", "hikari", \(the default theme\) has a theme customization folder called customizationDir/themes/<theme\_name\>Theme/. So the customization folder for the hikari theme is customizationDir/themes/hikariTheme/.

5.  To replace the HCL Connections Activities icon with your customized icon image, open the CSS file in a text editor and add the following lines:

    ```
    IconnSprite-iconActivitiesBlue16 {
     background-image: url("connections/resources/web/com.ibm.oneui3.styles/imageLibrary/Branding/Logos/activity.png");
     background-position: 0px 0px;
     height: image\_heightpx;
     width: image\_widthpx;
    }
    ```

    Where

    -   activity.png is the file name of your customized activity icon image. the background-image: url path must point to where the customized icon image is stored.
    -   image\_height is the height of the logo.
    -   image\_width is the width of the logo.
6.  To change the size of the image, do one of the following:

    -   If the dimensions of the image are specified in a CSS file, update the CSS file to customize the dimensions of the image.
    -   If the dimensions of the image are specified in a JSP or HTML file, update the relevant JSP or HTML file to customize the dimensions of the image.
7.  Stop and restart the Common.ear file in order to pick up the CSS changes.

8.  Test whether your custom image is being displayed successfully by refreshing the web browser and opening the page where the image is displayed.

9.  See [Post-customization step](t_admin_common_customize_postreq.md) for information about how to update the product version stamp and ensure that your users see the changes the next time that they log in to HCL Connections.


For an example of how to replace images in HCL Connections, see [Changing the HCL Connections logo](t_customize_change_logo.md), which details how to replace the logos that are used in the product.

**Parent topic:**[Customizing images](../customize/c_customize_images.md)

**Related information**  


[Enabling live user interface customization editing mode](../customize/t_customize_enable_custom_debugging.md)

[Determining where to save your customizations](../customize/t_customize_find_custom_directory.md)

[Post-customization step](../customize/t_admin_common_customize_postreq.md)

[Changing the HCL Connections logo](../customize/t_customize_change_logo.md)

[Customization best practices](../customize/c_customize_best_practices.md)

