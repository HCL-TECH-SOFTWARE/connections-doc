# Changing the HCL Connections logo {#t_customize_change_logo .task}

To customize HCL Connections™ to reflect the look and feel of your organization, specify a CSS override that replaces the HCL Connections logo with your company logo.

Two HCL logos display in the product by default. The first logo contains the text "Connections" and second logo is the graphical HCL logo. You can replace both logos with your company logo.

1.  Turn on the customization debugging capability. For more information, see [Enabling live user interface customization editing mode](t_customize_enable_custom_debugging.md).

2.  Create a CSS file that is named custom.css and store it in the following subdirectory of the customization directory: customizationDir/themes/<theme\_name\>Theme.

    **Note:** Each theme, for example: "red", "green", "onyx", "gen4", "hikari", \(the default theme\) has a theme customization folder called customizationDir/themes/<theme\_name\>Theme/. So the customization folder for the hikari theme is customizationDir/themes/hikariTheme/.

    For information about how to find out where your customizationDir directory is located, see [Determining where to save your customizations](t_customize_find_custom_directory.md).

3.  Save your company logo in the following directories:

    ```
    customizationDir/javascript/com/ibm/lconn/core/styles/images/logo.png
    customizationDir/javascript/com/ibm/oneui3/styles/imageLibrary/Branding/Logos/ibmLogoOpaque16.png
    
    ```

4.  Open the CSS file in a text editor and add the following lines:

    -   To replace the Connections text-based logo ![<img class="image" alt="" src="logo1.png">](logo1.png) with your company logo, add the following lines to the file:

        ```
        .lotusui30 .lotusBanner .lotusLogo {
         background-image: url("/com.ibm.lconn.core.styles/images/logo.png");
         height: image\_heightpx;
         width: image\_widthpx; 
        } 
        .lotusui30 .lotusBanner .lotusLogo .lotusAltText {
         display: none; 
        }
        ```

        Where

        -   logo.png is the file name of your company logo.
        -   image\_height is the height of the logo.
        -   image\_width is the width of the logo.
    -   To replace the HCL graphic logo ![<img class="image" alt="" src="logo2.png">](logo2.png) with your company logo, add the following lines to the file:

        ```
        .lotusui30 .lotusBanner .lotusIBMLogo {
         background-image: url("/com.ibm.oneui3.styles/imageLibrary/Branding/Logos/ibmLogoOpaque16.png");
         background-position: 0px 0px;
         height: image\_heightpx;
         width: image\_widthpx;
        }
        ```

        Where

        -   ibmLogoOpaque16.png is the file name of your company logo.
        -   image\_height is the height of the logo.
        -   image\_width is the width of the logo.
    **Note:** If you are supporting right-to-left languages, such as Arabic or Hebrew, you must make equivalent changes to the customRTL.css file and save that in the customizationDir/themes/<theme\_name\>Theme directory as well.

5.  Save and close the custom.css file.

6.  Stop and restart the Common.ear file to pick up the CSS changes.

7.  Clear the /temp and /wstemp directories, for example:c:\\IBM\\WebSphere\\AppServer\\profiles\\AppSrv01\\temp And c:\\IBM\\WebSphere\\AppServer\\profiles\\AppSrv01\\wstemp

8.  When you are ready to publish your changes, turn off the customization debugging capability. Test whether your changes were added successfully by restarting the applications and refreshing the web browser.

    A browser refresh shows your changes only if you turned on debugging. See [Enabling live user interface customization editing mode](t_customize_enable_custom_debugging.md) for more details.

9.  See [Post-customization step](t_admin_common_customize_postreq.md) for information about how to update the product version stamp and ensure that your users see the changes the next time that they log in toHCL Connections.


**Parent topic:**[Customizing images](../customize/c_customize_images.md)

**Related information**  


[Enabling live user interface customization editing mode](../customize/t_customize_enable_custom_debugging.md)

[Determining where to save your customizations](../customize/t_customize_find_custom_directory.md)

[Post-customization step](../customize/t_admin_common_customize_postreq.md)

[Replacing images](../customize/t_customize_replace_logo.md)

[Customizing the login page](../customize/t_admin_common_customize_login_screen.md)

