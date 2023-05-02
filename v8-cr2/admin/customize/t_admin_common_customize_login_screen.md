# Customizing the login page {#t_admin_common_customize_login_screen .task}

Customize the login page in HCL Connections™ to have the appropriate style and content for your organization.

You can change the appearance of the Connections login page to meet your organization's needs. For example, you might want to replace the HCL logo that is displayed on the login page with your own company logo. Or you might want to include a link that enables users to have their user IDs or passwords sent to them through email.

1.  Turn on the customization debugging capability. For more information, see [Enabling live user interface customization editing mode](t_customize_enable_custom_debugging.md).

2.  Copy the login.jsp file from the WAR file of one of the applications. You can access the file from the following directory:

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
    The login.jsp file is the same for each application. You only need to make a copy of one instance of the file.

3.  Paste the login.jsp file into the appropriate subdirectory of the customizationDir directory.

    -   To use the same login page for all of the applications, copy it into the common directory:

        ```
        customizationDir/common/nav/templates/login.jsp
        ```

    -   To create a different login page per application, copy the file into the appropriate subdirectory for each application:

        ```
        customizationDir/application\_name/nav/templates/login.jsp
        ```

    See [Determining where to save your customizations](t_customize_find_custom_directory.md) for more information about locating your base customization directory.

4.  Edit the login.jsp file or files to contain the information you want.

    **Note:** For information on how to replace the logo on the login page, refer to the steps covered in [Changing the HCL Connections logo](t_customize_change_logo.md).

5.  Save and close the login page.

6.  To test your changes, log out of the product. Refresh the web browser, and then go to a login page.

7.  Connections allows you to restrict the allowed domains that the login page redirect `url` parameter will permit as destinations \(by allowing you to whitelist those domains\). See [Customizing the login page redirect parameter](admin_customize_login_page_redirect.md) for details.

8.  If you enabled custom debugging, turn off the debugging capability when you are ready to publish your changes. For more information, see [Enabling live user interface customization editing mode](t_customize_enable_custom_debugging.md).

9.  See [Post-customization step](t_admin_common_customize_postreq.md) for details about how to apply your changes permanently.


-   **[Customizing the login page redirect parameter](../customize/admin_customize_login_page_redirect.md)**  
Optionally restrict the URLs that the HCL Connections login page can redirect to by whitelisting allowed domains.

**Parent topic:**[Customizing the user interface](../customize/t_admin_common_customize_main.md)

**Related information**  


[Enabling live user interface customization editing mode](../customize/t_customize_enable_custom_debugging.md)

[Determining where to save your customizations](../customize/t_customize_find_custom_directory.md)

[Post-customization step](../customize/t_admin_common_customize_postreq.md)

[Changing the HCL Connections logo](../customize/t_customize_change_logo.md)

[Application WAR files and OSGi bundles](../customize/r_customize_war_osgi_file_locations.md)

