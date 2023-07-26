# Customizing notifications {#c_customize_notifications .concept}

The content of the notifications sent by HCL Connections™ is defined in templates that are processed by the FreeMarker engine.

You can customize notifications by modifying the existing template files or by replacing the files with custom templates that you create yourself. You can also edit the text strings and images used in the notifications.

**Important:**

-   Starting from Connections 6.0 CR4, a new template version is provided and you can enable it by editing configuration. Go to [Enabling the new notification templates](../admin/t_admin_common_enable_template.md) for details.
-   Before making any customizations, first back up your original notifications folder. In addition, ensure that any customized files are backed up before performing a product upgrade or applying a cumulative refresh or fix pack, as you might need to merge your changes again manually after making updates.

-   **[Customizing basic notification settings \(CR4 and later\)](../customize/t_customize_new_template.md)**  
You can change many aspects of notifications in Connections 6.0 CR4 and later by making changes to a common properties file.
-   **[Customizing shared resources for notifications \(default templates\)](../customize/t_customize_notification_resources.md)**  
You can customize the common style and structure documents that are used by notifications in HCL Connections.
-   **[Customizing shared resources for notifications \(CR4 templates\)](../customize/t_cr4_customize_shared_resources_for_notifications.md)**  
If you've enabled the Connections 6.0 CR4 common style and structure documents \(templates\) that are used by notifications, you can customize the notifications as follows.
-   **[Editing notification templates](../customize/t_edit_notification_templates_container.md)**  
For both the default and CR4 enhanced templates for notifications, you can edit the templates directly to achieve the level of customization you want. The following procedures apply to both sets of templates, and, for the CR4 templates, specific examples are provided.

**Parent topic:**[Customizing](../customize/c_customize_overview.md)
