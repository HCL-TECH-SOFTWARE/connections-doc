# Using the widgets-config.xml file for Communities {#t_admin_communities_use_widgets_config .task}

The widgets-config.xml files contains configuration settings for each of the widgets supported by Communities and Profiles. To update settings in the file, you must check the file out and, after making changes, you must check the file back during the same wsadmin session as the checkout for the changes to take effect.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

The widgets-config.xml file defines the widgets available for use in Communities and specifies the life-cycle events associated with each widget. You can edit configuration settings in this file to perform various tasks. For example, if you want to make custom widgets available, you define the widgets in this file. You also need to edit settings in this file if you want to specify a different system user for managing widget life-cycle events. For more information, see *Specifying different system users for widget life-cycle events*.

1.  To configure settings in the widgets-config.xml file for Communities, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter will not execute correctly.

3.  Start the Communities Jython script interpreter using the following command:

    ```
    execfile("communitiesAdmin.py")
    ```

    If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

4.  Check out the widgets-config.xml file using the following command:

    CommunitiesConfigService.checkOutWidgetsConfig\("working\_directory", "cell\_name"\)

    where:

    -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied. The files are kept in this working directory while you make changes to them. When specifying the path to a working directory or temporary directory where the checked out files are to be placed, use a forward slash as the path separator, even for Microsoft Windows systems.
    -   cell\_name is the name of the WebSphere Application Server cell hosting the Communities application. This argument is required. It is also case-sensitive, so type it with care.
    For example:

    ```
    CommunitiesConfigService.checkOutWidgetsConfig("C:/tmp2","MyServerNode01Cell")
    ```

5.  Navigate to the temporary directory where you saved the widgets-config.xml file.

    Open this file in a text editor and find the section that pertains to Communities. The configuration settings for Communities appear following the section that begins with `<resource type="community"` . Make the required changes.

6.  Apply your changes by doing the following:

    1.  Check in the updated widgets-config.xml file using the following command:

        CommunitiesConfigService.checkInWidgetsConfig\("working\_directory", "cell\_name"\)

        For example:

        ```
        CommunitiesConfigService.checkInWidgetsConfig("C:/tmp2","MyServerNode01Cell")
        ```

    2.  To exit the wsadmin client, type exit at the prompt.
    3.  Restart the Communities application using the WebSphere Application Server Integrated Solutions Console.

**Parent topic:**[Administering widgets and remote applications](../admin/c_admin_communities_administering_widgets.md)

**Related information**  


[Specifying different system users for widget life-cycle events](../admin/t_admin_communities_configure_j2c.md)

[Enabling custom widgets for Communities](../admin/t_admin_communities_develop_custom_widgets.md)

[Checking out the widgets-config.xml file for Profiles](../admin/t_admin_profiles_use_widgets_config.md)

