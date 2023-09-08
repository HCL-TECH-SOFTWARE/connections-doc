# Customizing edit display fields {#t_admin_profiles_tbl_fields .task}

Edit the profileEdit.ftl file to customize edit display fields.

To edit configuration files, use the wsadmin client. See [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

Use the profileEdit.ftl template to customize the profile field display on the profile edit page.

1.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../admin/../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

2.  Use the wsadmin client to access and check out the Profiles business card configuration files.

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

3.  Open the LotusConnections-config/profiles/templates/profileEdit.ftl file.

4.  Modify the file contents to include any custom HTML or fields.

    |Section|Description|
    |-------|-----------|
    |`contactInformation`

|Content in this section is rendered in the **Contact Information** tab on the Edit Profile page.

Required; do not remove.

|
    |`associatedInformation`

|Content in this section is rendered in the **About Me** tab on the Edit Profile page.

Required; do not remove.

|

    For more information about using these settings, see [Creating a simple profile data model and template customization](t_admin_profiles_custom_example.md).

5.  Save your changes.

6.  After making changes, you must check the configuration files back in, and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See [Applying property changes in Profiles](../admin/t_admin_profiles_save_changes.md) for information about how to save and apply your changes.

7.  If you have enabled template reloading, your changes are reflected immediately in the user interface. If not, restart the application to recompile the template and display your customization changes.


**Parent topic:**[Customizing display using templates](../customize/t_admin_profiles_customize_biz_card_main.md)

**Related information**  


[Creating a simple profile data model and template customization](../customize/t_admin_profiles_custom_example.md)

