# Enabling status updates {#t_admin_profiles_enable_status_updates .task}

Configure the profiles-config.xml file to enable users to update their status from their profile.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

Users can keep people in their network and the wider organization informed about their latest activities by posting status messages. You can control whether users can update their status message on their My Profile page by configuring the statusUpdatesInProfileView property in the Profiles configuration file, profiles-config.xml. By default, status messages expire after 7 days and are cleared from the system when they expire.

1.  To enable status updates on the My Profile page, complete the following steps.
2.  Use the wsadmin client to access and check out the Profiles configuration files.

    1.  Enter the following command to access the Profiles configuration files:

        execfile\("profilesAdmin.py"\) If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    2.  Enter the following command to check out the Profiles configuration files:

        ProfilesConfigService.checkOutConfig\("working\_directory", "cell\_name" where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied and are stored while you make changes to them. Use forward slashes \(/\) to separate directories in the file path, regardless of your operating system.

            **Note:** In order for the command to complete successfully, the directory must grant write permissions if you are using one of the following operating systems:

            -   AIX®
            -   Linux™
            **Note:** The directory must grant write permissions or the command does not complete successfully.

        -   cell\_name is the name of the WebSphere Application Server cell hosting the Profiles application. This argument is required. It is also case-sensitive. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor: print AdminControl.getCell\(\)
        For example:

        -   AIX or Linux:

            ```
            ProfilesConfigService.checkOutConfig("/opt/prof/temp","foo01Cell01")
            ```

        -   Microsoft™ Windows™:

            ```
            ProfilesConfigService.checkOutConfig("c:/prof/temp","foo01Cell01")
            ```

3.  Use the following command to configure settings for the status update feature:

    ProfilesConfigService.updateConfig\(property, value\)

    where:

    -   property is one of the editable Profiles configuration properties.
    -   value is the new value with which you want to set that property.
    The following table displays information regarding the statusUpdatesInProfileView property and the type of data that you can enter for it.

    |Property|Description|
    |--------|-----------|
    |statusUpdatesInProfileView.enabled|Specifies whether users can update their status from the My Profile page.This property takes a Boolean value, true or false. The value must be formatted in lowercase.

For example, to prevent users from entering their status on the My Profile page:

    ```
ProfilesConfigService.updateConfig("statusUpdatesInProfileView.enabled", "false")
    ```

|

4.  After making changes, you must check the configuration files back in, and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying property changes* for information about how to save and apply your changes.


**Related information**  


[Applying property changes in Profiles](../admin/t_admin_profiles_save_changes.md)

