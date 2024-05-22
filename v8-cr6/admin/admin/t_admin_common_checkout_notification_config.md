# Accessing the notification configuration file {#t_admin_common_checkout_notification_config .task}

To make configuration changes to notifications in HCL Connections, you must access and work with the notification-config.xml file.

To access configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command line tool.

After changing notification configuration settings, you must check in the configuration file and restart the server to apply the changes. You must perform the check-in during the same wsadmin session in which you checked out the files for the changes that you made to take effect.

1.  To change notification configuration settings, complete the following steps.
2.  Start the wsadmin client from the following directory of the system where you installed the deployment manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    **Note:** You must start the client from this directory or subsequent commands that you try to run will not execute properly. For more information, see the *Starting the wsadmin client* topic.

3.  Enter the following command to access the HCL Connections configuration files:

    ```
    execfile("connectionsConfig.py")
    ```

    If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

4.  Enter the following command to check out the notification-config.xml file:

    ```
    LCConfigService.checkOutNotificationConfig("temp\_dir","cell\_name")
    ```

    where

    -   temp\_dir is the temporary directory to which the configuration XML and XSD files are copied and are stored while you change them. Use forward slashes to separate directories in the file path, even if you are using the Microsoft Windows operating system.
    -   cell\_name is the WebSphere® Application Server cell to which you installed the application for which you are enabling mail. This argument is case-sensitive, so type it with care.
    **Note:** If you installed HCL Connections into multiple WebSphere Application Server profiles, \(for example: Activities is installed on AppSrv01, and Blogs is installed on AppSrv02\), then there is a notification-config.xml file for each application. If you used this type of deployment, you must perform these steps to edit the notification-config.xml file associated with each WebSphere Application Server profile.

    For example:

    -   Linux:

        ```
        LCConfigService.checkOutNotificationConfig("/opt/temp","foo01Cell01")
        ```

    -   Microsoft Windows:

        ```
        LCConfigService.checkOutNotificationConfig("c:/temp","foo01Cell01")
        ```

5.  From the temporary directory to which you checked out the notification-config.xml file, open it in a text editor and make the necessary changes.

6.  Save and close the notification-config.xml file.

7.  Check in the configuration files by using the following command:

    ```
    LCConfigService.checkInNotificationConfig("<temp_dir>","<cell-name>")
    ```

8.  Update the version stamp property to force a refresh of users' web browsers, so that they see the email preference changes the next time they access the product. See *Required post-customization step*.


**Parent topic:**[Configuring notifications](../admin/t_admin_common_config_notification.md)

**Related information**  


[Post-customization step](../customize/t_admin_common_customize_postreq.md)

