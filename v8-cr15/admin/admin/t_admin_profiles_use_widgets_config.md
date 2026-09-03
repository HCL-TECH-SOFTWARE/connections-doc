# Checking out the widgets-config.xml file for Profiles {#t_admin_profiles_use_widgets_config .task}

The widgets-config.xml files contains configuration settings for each of the widgets supported by Profiles. To update settings in the file, you must check the file out and, after making changes, you must check the file back during the same wsadmin session as the checkout for the changes to take effect.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

The widgets-config.xml file defines the widgets available for use in Profiles and Communities. You can edit configuration settings in this file to perform various tasks. For example, if you want to make custom widgets available, you define the widgets in this file. You also edit settings in this file if you want to configure the Recent Posts widget to only display tabs for the applications included in your deployment. For more information, see *Configuring the Recent Posts widget*.

1.  To configure settings in the widgets-config.xml file for Profiles, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly. For more information, see *Starting the wsadmin client*.

3.  Start the Profiles Jython script interpreter.

    1.  Use the following command to access the Profiles configuration files:

        ```
        execfile("profilesAdmin.py")
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

4.  Use the following command to check out the widget configuration file:

    ProfilesConfigService.checkOutWidgetConfig\("<working\_directory\>", "<cell\_name\>"\)

    where:

    -   working\_directory is the temporary working directory to which the configuration XML and XSD files will be copied. The files are kept in this working directory while you make changes to them.
    -   cell\_name is the name of the WebSphere Application Server cell hosting the Profiles application. This argument is required.
    For example:

    ```
    ProfilesConfigService.checkOutWidgetConfig("/wsadminoutput", "jdoe30Node02Cell")
    ```

5.  Navigate to the temporary directory in which you saved the widgets-config.xml file, and then open the file in a text editor and make the required changes.

6.  Save your changes and check the widgets-config.xml file back in using the following command:

    ProfilesConfigService.checkInWidgetConfig\(\)

7.  To exit the wsadmin client, type exit at the prompt.

8.  Stop and restart the Profiles server.


**Parent topic:**[Configuring widgets in Profiles](../admin/c_admin_profiles_configure_widgets.md)

**Related information**  


[Using the widgets-config.xml file for Communities](../admin/t_admin_communities_use_widgets_config.md)

[Configuring the Status Updates widget](../admin/t_admin_profiles_configure_recent_post_widget.md)

[Managing widgets in Profiles](../admin/t_admin_profiles_edit_widgets.md)

