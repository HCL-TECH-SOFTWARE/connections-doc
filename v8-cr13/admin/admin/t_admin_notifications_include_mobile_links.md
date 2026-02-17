# Including mobile links in notifications {#t_admin_notifications_include_mobile_links .task}

You can enable links to the HCL Connections Mobile service from notifications by updating the value of a property in the notifications configuration file.

To run administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

A configuration option in the notification-config.xml file allows you to enable links within notifications to the HCL Connections Mobile service. When this option is enabled, if the notification being sent has a supported view in the Mobile service, an **Open in Mobile** link will be included in the notification. In standard notifications, the link is appended to the action link bar. In daily and weekly digests, the link is placed on the line after each entry.

1.  Start the wsadmin client from the following directory of the system where you installed the deployment manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    **Note:** You must start the client from this directory or subsequent commands that you try to run will not execute properly. For more information, see the *Starting the wsadmin client* topic.

2.  Enter the following command to access the HCL Connections configuration files:

    ```
    execfile("connectionsConfig.py")
    ```

    If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

3.  Enter the following command to check out the notification-config.xml file:

    ```
    LCConfigService.checkOutNotificationConfig("temp\_dir","cell\_name")
    ```

    where

    -   temp\_dir is the temporary directory to which the configuration XML and XSD files are copied and are stored while you make changes to them. Use forward slashes to separate directories in the file path, even if you are using the Microsoft Windows operating system.
    -   cell\_name is the WebSphere® Application Server cell to which you installed the application for which you are enabling mail. This argument is case-sensitive, so type it with care.
    **Note:** If you installed HCL Connections into multiple WebSphere Application Server profiles, for example: Activities is installed on AppSrv01, Blogs is installed on AppSrv02, and so on\), then there is a notification-config.xml file for each application. If you used this type of deployment, you must perform these steps to edit the notification-config.xml file associated with each WebSphere Application Server profile.

    For example:

    -   Linux:

        ```
        LCConfigService.checkOutNotificationConfig("/opt/temp","foo01Cell01")
        ```

    -   Microsoft Windows:

        ```
        LCConfigService.checkOutNotificationConfig("c:/temp","foo01Cell01")
        ```

4.  From the temporary directory to which you checked out the notification-config.xml file, open it in a text editor.

5.  Locate the following section of the file:

    ```
    <properties>
      <property name="globalSenderName">HCL Connections Administrator</property>
      <property name="globalSenderEmailAddress">global-admin@example.com</property>
      <includeMobileLinksInNotifications>false</includeMobileLinksInNotifications>
      <disableEmbeddedAppsInNotifications>false</disableEmbeddedAppsInNotifications>
    </properties>
    ```

6.  Change the value of the <includeMobileLinksInNotifications\> element to true as follows:

    ```
    <includeMobileLinksInNotifications>true</includeMobileLinksInNotifications>
    ```

    The default value is false.

7.  Save and close the notification-config.xml file.

8.  Check in the configuration files using the following command:

    ```
    LCConfigService.checkInNotificationConfig("<temp_dir>","<cell-name>")
    ```


**Parent topic:**[Configuring notifications](../admin/t_admin_common_config_notification.md)

