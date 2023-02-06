# Enabling email notifications {#task_j4p_w2g_cgb .task}

Notification templates enhanced with visual updates, first provided in HCL Connections 6.0 CR4, are updated for CR5. If your organization plans to start or continue use these visually enhanced templates, you must enable or re-enable them during CR5 configuration.

The old default and enhanced templates include the same notification types, with the enhanced templates having the added benefit that they provide a modern and cleaner look, clearer ways for users to take action, and are easier to skim. If you need to enable the default templates, see this topic instead: [Enabling email notifications \(default templates\)](t_admin_common_enable_mail.md).

1.  [Access the notification configuration file](t_admin_common_checkout_notification_config.md).

2.  Open the notification-config.xml file in a text editor.

3.  Whether you enabled the enhanced templates in CR4 or want to do so after updating to CR5, you should see the property that defines the notification template theme near the top of the file, as the CR5 update adds this property during installation:

    ```
    <properties>
      <property name="globalNotificationTemplateTheme">notifications_v2</property>
    ```

4.  IMPORTANT: The CR5 update also adds a new property, globalNotificationTemplateThemeEnable, that must now be set to true, even if you already enabled the enhanced templates during CR4. The result should look like this:

    ```
    <properties>
      <property name="globalNotificationTemplateThemeEnable"">true</property>
    ```

    **Note:** If you do not set this property to true, the old-style templates will be enabled by default.

5.  Save, close, and then check in the notification-config.xml file as described in [Accessing the notification configuration file](t_admin_common_checkout_notification_config.md).


Easily customize several notification properties \(such as company name/logo and sender name/email address\) from one central location. For more information, see [Customizing basic notification settings \(CR4 and later\)](../customize/t_customize_new_template.md).

You can also customize enhanced notifications and templates in all the ways that you can the default templates. For more information, see [Customizing notifications](../customize/c_customize_notifications.md).

**Parent topic:**[Configuring notifications](../admin/t_admin_common_config_notification.md)

