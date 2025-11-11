# Customizing display using templates {#t_admin_profiles_customize_biz_card_main}

Customize various sections of the Profiles application using the supplied template files. You can choose to modify the set of standard and extension attributes that are rendered in the user interface for a profile record. Extension attributes of type XML are not provided for use by template authors. You can also modify the structure of the layout of content using the flexibility provided by the FreeMarker Template Language.

To edit configuration files, use the wsadmin client. See [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

The customization templates are as follows:

-   businessCardInfo.ftl – controls layout of main section of the business card
-   profileDetails.ftl – controls display of profile properties
-   profileEdit.ftl – controls display of the edit form for a profile
-   searchResults.ftl – controls display of profile fields in select views that render lists of users

1.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../admin/../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

2.  Use the wsadmin client to access and check out the Profiles configuration files.

    1.  Enter the following command to access the Profiles configuration files:

        execfile\("profilesAdmin.py"\) If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    2.  Enter the following command to check out the Profiles configuration files:

        ProfilesConfigService.checkOutConfig\("working\_directory", "cell\_name" where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied and are stored while you make changes to them. Use forward slashes \(/\) to separate directories in the file path, regardless of your operating system.

            **Note:** In order for the command to complete successfully, the directory must grant write permissions if you are using one of the following operating systems:

            -   Linux
            **Note:** The directory must grant write permissions or the command does not complete successfully.

        -   cell\_name is the name of the WebSphere Application Server cell hosting the Profiles application. This argument is required. It is also case-sensitive. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor: print AdminControl.getCell\(\)
        For example:

        -   Linux:

            ```
            ProfilesConfigService.checkOutConfig("/opt/prof/temp","foo01Cell01")
            ```

        -   Microsoft Windows:

            ```
            ProfilesConfigService.checkOutConfig("c:/prof/temp","foo01Cell01")
            ```

3.  Open the needed configuration file, for example to edit the main section of the business card display, open the Connections-config/profiles/templates/businessCardInfo.ftl file.

4.  Modify the file contents to include any custom HTML or fields.

5.  Save your changes.

6.  After making changes, you must check the configuration files back in, and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See [Applying property changes in Profiles](../admin/t_admin_profiles_save_changes.md) for information about how to save and apply your changes.

7.  If you have enabled template reloading, your changes are reflected immediately in the user interface. If not, restart the application to recompile the template and display your customization changes.


-   **[Customizing profile page display](../customize/t_admin_profiles_tbl_layout.md)**  
Edit the profileDetails.ftl file to customize the display of profile properties on the main profile page.
-   **[Customizing business card information](../customize/t_admin_profiles_tbl_bizcard.md)**  
Edit the businessCardInfo.ftl file to customize business card display.
-   **[Customizing search results information](../customize/t_admin_profiles_tbl_search.md)**  
Edit the searchResults.ftl file to customize the display of profile fields in views that render lists of users.
-   **[Customizing edit display fields](../customize/t_admin_profiles_tbl_fields.md)**  
Edit the profileEdit.ftl file to customize edit display fields.

**Parent topic:**[Customizing the Profiles user interface](../customize/t_profiles_customizing_attributes.md)

**Related information**  


[Applying property changes in Profiles](../admin/t_admin_profiles_save_changes.md)

