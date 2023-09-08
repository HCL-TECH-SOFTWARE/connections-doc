# Disabling embedded applications in notifications {#t_admin_notifications_disable_embedded_apps .task}

Standard notifications sent from HCL Connections can include an OpenSocial embedded application that is displayed in supported email clients. You can remove embedded applications from all supporting notifications by disabling a configuration property in the notification-config.xml file.

To run administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

The notification types listed in the following table include the application/embed+json MIME part that is required for embedded application support. All other notifications support HTML and plain text versions only.

|Application/Embedded application|Operation|
|--------------------------------|---------|
|Files \(specific to a file\)|-   Create a file
-   Update a file
-   Comment on a file
-   Like a file
-   Share a file

|
|Blog entries|-   Create a blog entry
-   Update a blog entry
-   Comment on a blog entry
-   Like a blog entry

|
|Ideation Blog entries|-   Create an ideation blog idea
-   Update an ideation blog idea
-   Comment on an ideation blog idea

|
|Forum topics|-   Create a forum topic
-   Update a forum topic
-   Reply to a forum topic

|
|Status updates|-   Post a status update
-   Comment on a status update
-   Like a status update
-   Repost a status update

|
|Network invites|-   Send a network invitation

|

**Note:** Embedded applications are only included in standard notifications; users must select the individual email option available from the Email Preferences page to receive them.

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

6.  Change the value of the <disableEmbeddedAppsInNotifications\> element to true as follows:

    ```
    <disableEmbeddedAppsInNotifications>true</disableEmbeddedAppsInNotifications>
    ```

    The default value is false.

7.  Save and close the notification-config.xml file.

8.  Check in the configuration files using the following command:

    ```
    LCConfigService.checkInNotificationConfig("<temp_dir>","<cell-name>")
    ```


**Parent topic:**[Configuring notifications](../admin/t_admin_common_config_notification.md)

