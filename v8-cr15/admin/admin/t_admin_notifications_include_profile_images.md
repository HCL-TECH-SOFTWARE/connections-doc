# Including profile images in email notifications {#t_admin_notifications_include_profile_images .task}

You can include profile images in enhanced email notifications by updating a property in the `notification-config.xml` file.

Before completing this task, ensure that the enhanced email notifications are enabled. For more information, see [Enabling email notifications](t_admin_common_enable_template.md).

If profile images are disabled, enhanced email notifications use the default application image instead of a user's profile image.

To update the property in the `notification-config.xml` file, perform the following steps:

1.  [Access the notification configuration file](t_admin_common_checkout_notification_config.md).

2.  Open the `notification-config.xml` file in a text editor.

3.  In the `<properties>` section of the file, add or update the following property:

    ```xml
    <properties>
      <property name="globalIncludeProfileImageInEmail">true</property>
    ```

    The default value is `false`.

4.  Save, close, and then check in the `notification-config.xml` file as described in [Accessing the notification configuration file](t_admin_common_checkout_notification_config.md).

If you also need to control how profile images are rendered in enhanced email notifications, see [Customizing basic notification settings \(CR4 and later\)](../customize/t_customize_new_template.md).

**Parent topic:** [Configuring notifications](../admin/t_admin_common_config_notification.md)
