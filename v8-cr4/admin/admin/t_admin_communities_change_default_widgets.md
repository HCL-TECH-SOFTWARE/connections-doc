# Defining mandatory and default widgets for communities {#t_admin_communities_change_widgets .task}

Modify settings in widgets-config.xml to change the default widgets for communities.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

Edit configuration settings in widgets-config.xml to change the mandatory and default widgets for new communities. This procedure affects communities that are created after you change widgets-config.xml only, existing communities retain their existing default widgets.

1.  To configure the default widgets in the widgets-config.xml file for Communities, complete the following steps.
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

    Open this file in a text editor, find the following section, and make the changes to the widgets:

    ```
    
    <templates>
        <!-- default template will be used to display the default widgets -->
        <template id="default">		 		 		 
            <widgetInstance uiLocation="col2statusposts" defIdRef="StatusUpdates" instanceId="StatusUpdates1"/>
            <widgetInstance uiLocation="col2" defIdRef="Forum" instanceId="ForumInstance1"/>
            <widgetInstance uiLocation="col2" defIdRef="Bookmarks" instanceId="BookmarksInstance1"/>
            <widgetInstance uiLocation="col2" defIdRef="Files" instanceId="FilesInstance1"/>
        </template>
    </templates>
    ```

    **Note:** Only one instance of a widget for a widget definition is is supported.

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

