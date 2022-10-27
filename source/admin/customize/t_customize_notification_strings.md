# Customizing notification strings {#t_customize_notification_strings .task}

Customize the strings that are used in the notifications that are sent HCL Connections™ users by the system.

You can customize the text used in the notification messages sent to your users to include information specific to your organization. All of the strings used in notification templates are contained in the following directory: [profile\_root](../plan/i_ovr_r_directory_conventions.md)/config/cells/cell\_name/LotusConnections-config/notifications

1.  Find the file that serves as the source of the notification string that you want to edit.

    You can locate the strings used in notifications in one of the following directories:

    -   Strings that are shared across templates are contained in the following directory: LotusConnections-config/notifications/resources/nls/notification\_\*.properties
    -   Strings that are specific to templates from a particular application, such as Activities or Files, are contained in the following directory: LotusConnections-config/notifications/application\_name/resources/nls/notification\_\*.properties
2.  Open the file and edit the string directly to make the required changes.

3.  Save your changes and close the file.

4.  To test out your customizations, restart the News application before sending new notifications.


**Parent topic:**[Customizing product strings](../customize/t_customize_strings_global.md)

**Related information**  


[Configuring notifications](../admin/t_admin_common_config_notification.md)

[Customizing notifications sent as single emails](../customize/t_customize_notifications.md)

[Customizing notifications](../customize/c_customize_notifications.md)

