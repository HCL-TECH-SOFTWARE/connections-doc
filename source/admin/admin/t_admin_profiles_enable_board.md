# Enabling and disabling the board {#t_admin_profiles_enable_board .task}

The board application allows users to connect with people in their network by posting messages to their profile and commenting on their status message. As administrator, you can enable or disable the board globally depending on your organization's needs. You can also control whether the board displays on certain pages in Profiles.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

The board application is enabled for all users by default. You can make it unavailable to users in your organization by disabling the board property in the Profiles configuration file, profiles-config.xml.

1.  To disable the board globally, complete the following steps.
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

3.  Use the following command to configure settings for the board application:

    ProfilesConfigService.updateConfig\(property, value\)

    where:

    -   property is one of the editable Profiles configuration properties.
    -   value is the new value with which you want to set that property.
    The following list identifies the configuration properties for the board that you can edit, and the type of data that you can enter for them.

    board.enabled
    :   Specifies whether the board application is enabled.

        This property takes a Boolean value, true or false. The value must be formatted in lowercase.

        For example, to prevent users from using any board applications:

        ```
        ProfilesConfigService.updateConfig("board.enabled","false")
        ```

    boardInProfileView.enabled
    :   Specifies whether the board displays on the My Profile page.

        This property takes a Boolean value, true or false. The value must be formatted in lowercase.

        For example, to prevent users from seeing the board on their My Profile page:

        ```
        ProfilesConfigService.updateConfig("boardInProfileView.enabled", "false")
        ```

    boardNetworkACL.enabled
    :   Controls whether access to a user's board is controlled. This property takes a Boolean value, true or false. The value must be formatted in lowercase.

        When set to true, only the users in a person's network can post messages and comments to that person's board. When set to false, access control is not enabled.

        For example, to allow anybody to post messages and comments to a user's board:

        ```
        ProfilesConfigService.updateConfig("boardNetworkACL.enabled", "false")
        ```

4.  After making changes, you must check the configuration files back in, and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying property changes* for information about how to save and apply your changes.


**Related information**  


[Applying property changes in Profiles](../admin/t_admin_profiles_save_changes.md)

