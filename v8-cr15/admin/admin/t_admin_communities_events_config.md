# Configuring the Events widget {#configuringevents .task}

Configure the behavior of the community Events widgets by checking out the calendar-config.xml file and editing it directly.

To access configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

1.  Check out the calendar-config.xml file, edit configuration properties, and then check the file back in.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  Use the wsadmin client to access and check out the configuration file:

    1.  Enter the following command to access the HCL Connections configuration files: execfile\("connectionsConfig.py"\)

        If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

    2.  Enter the following command to check out the calendar-config.xml configuration file:

        `LCConfigService.checkOutCalendarConfig("working\_directory","cell\_name")`

        where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied and are stored while you make changes to them. Use forward slashes to separate directories in the file path, even if you are using the Microsoft Windows operating system.

            Linux only: The directory must grant write permissions or the command does not run successfully.

        -   cell\_name is the name of the WebSphere Application Server cell hosting the HCL Connections application. This argument is case-sensitive, so type it with care. If you do not know the cell name, type the following command while in the wsadmin command processor:print AdminControl.getCell\(\)
        For example:

        -   Linux:LCConfigService.checkOutCalendarConfig\("/opt/temp","foo01Cell01"\)
        -   Microsoft Windows:LCConfigService.checkOutCalendarConfig\("c:/temp","foo01Cell01"\)
4.  Open calendar-config.xml in a text editor.

5.  Edit any of the following configuration properties:

        |**maxRepeatingCount**|Specifies the maximum number of instances of a repeating event. The default is 700.|
    |**allowCommentsFromNonCommunityMember**|Specifies whether to allow all logged in users with access to the community to comment on the event. The default value is true. When the property is set to false, only community members can comment on the community events.|
    |**icalFeed**|Specify the range of time for displaying events in a personal calendar. You can specify two values:     -   startFrom specifies how old in months an event can be.
    -   endTo specifies how far in the future in months an event can be.
The default value for startFrom is -6. The default value for endTo is 12.|

6.  To check in the changed calendar-config.xml file, use the following command:

    ```
    LCConfigService.checkInCalendarConfig("working\_directory", "cell\_name")
    ```

7.  After making updates, type the following command to deploy the changes:

    ```
    synchAllNodes()
    ```

8.  To exit the wsadmin client, type `exit` at the prompt.

9.  Stop and restart all the HCL Connections application servers.


**Parent topic:**[Administering Communities](../admin/c_admin_communities_intro.md)

