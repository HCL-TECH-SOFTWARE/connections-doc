# Filtering active content in Profiles {#t_admin_profiles_filter_active_content .task}

Profiles provides a filter that prevents users from creating rich text descriptions with malicious scripts that are executed when other users visit Profiles. You can enable or disable this component.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

The active content filter prevents a user from embedding malicious content such as JavaScript™ in the **About me** and **Background** text input fields. You can disable the filter to provide richer options for content in these fields.

**Note:** Disabling this filter introduces a vulnerability to malicious cross-site scripting \(XSS\) attacks.

1.  To configure active content filter settings, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  Start the Profiles Jython script interpreter.

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

4.  To configure the active content filter for Profiles, use the following command:

    ProfilesConfigService.updateConfig\(property, value\)

    where

    -   property is one of the editable Profiles configuration properties.
    -   value is the new value with which you want to set that property.
    The following table displays information regarding the active filter property and the type of data you can enter for it.

    |Option|Description|
    |------|-----------|
    |activeContentFilter.enabled|Enables and disables filtering for active content of text entered into the **About me** and **Background** text input fields.

This property takes a Boolean value: true or false. The value must be formatted in lowercase.

|

    For example, to disable filtering:

    ```
    ProfilesConfigService.updateConfig("activeContentFilter.enabled","false")
    ```

5.  After making changes, you must check the configuration files back in, and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying property changes in Profiles* for information about how to save and apply your changes.


**Parent topic:**[Managing profile content](../admin/c_admin_profiles_control_content.md)

**Related information**  


[Applying property changes in Profiles](../admin/t_admin_profiles_save_changes.md)

