# Configuring notifications {#t_admin_common_config_notification .task}

Enable support for email notifications in HCL Connections applications.

If you did not create a mail session in WebSphere® Application Server during the installation of the product, you can configure it afterward to enable support for email notifications. Complete this task only if you did not configure notifications during the installation.

When you enable notifications, users are kept informed about new information and events that take place in HCL Connections applications. For more information about notification types and events, see the *Notification types and events*topic.

You can configure notifications to be sent in one the following ways:

Send mail from a server found by doing a lookup
:   This configuration performs a lookup of domain namespace \(DNS\) MX records to retrieve a list of available SMTP servers. If the DNS lookup does not find any available SMTP servers, then notification fails. If one or more SMTP servers are returned by the lookup, then HCL Connections attempts to send the notification email through one server and then the next until the email is sent successfully. This option avoids the risk of a single point of failure. If you choose this option, make sure that your DNS is configured with valid MX records to ensure that available SMTP servers can be found.

Send mail from a specific SMTP server
:   This configuration uses a single SMTP server. You must define the SMTP server and its associated settings as a mail session that is managed by WebSphere Application Server. This single SMTP server is used to send email notifications. If the server is unavailable, then notification fails.

-   **[Notification types and events](../admin/r_notification_types.md)**  
Several notification types and events are supported.
-   **[Enabling email notifications](../admin/t_admin_common_enable_template.md)**  
 Notification templates enhanced with visual updates, first provided in HCL Connections 6.0 CR4, are updated for CR5. If your organization plans to start or continue use these visually enhanced templates, you must enable or re-enable them during CR5 configuration.
-   **[Accessing the notification configuration file](../admin/t_admin_common_checkout_notification_config.md)**  
To make configuration changes to notifications in HCL Connections, you must access and work with the notification-config.xml file.
-   **[Sending mail from any available mail server](../admin/t_admin_common_config_mail_dnx.md)**  
Configure HCL Connections to perform a lookup of domain namespace \(DNS\) MX records to retrieve a list of available SMTP servers. If the DNS lookup does not find any available SMTP servers, then email notifications fail to be delivered. If one or more SMTP servers are returned by the lookup, then HCL Connections attempts to send the email through one, and then the next until the email is sent successfully.
-   **[Sending mail from a dedicated mail server](../admin/t_admin_common_config_mail_was.md)**  
Configure HCL Connections notifications to be sent from a specific SMTP server that is managed by WebSphere Application Server. If the designated mail server is unavailable, then notification emails fail to be delivered.
-   **[Enabling email notifications \(default templates\)](../admin/t_admin_common_enable_mail.md)**  
Edit configuration settings to enable email notifications in the HCL Connections applications if you did not do so during the installation.
-   **[Enabling link stripping in email notifications](../install/enable_link_stripping_in_notifications.md)**  
With link stripping in email notifications, you can help users identify unknown or misleading live links before they click them. Enabling this feature is optional.
-   **[Setting the default frequency of email digests](../admin/t_admin_common_specify_default_notification_frequency.md)**  
You can control the frequency with which email digests from HCL Connections are sent by configuring settings in the notification-config.xml file. You can also lock the default frequency for a specific application or category using settings in the configuration file.
-   **[Configuring Forums for email notification replies](../admin/c_admin_forums_notification_replies.md)**  
Configure Forums so that users can reply to forum topics by email.
-   **[Defining valid administrator email addresses](../admin/t_admin_act_managing_notifications.md)**  
Edit configuration property settings to change the default email addresses from which system notifications, such as a request to join a community, are sent. Notifications are sent from generic administrator email addresses if you do not take action. Default email addresses are initially set during installation, so use this procedure only if you want to change them.
-   **[Enabling users to specify email notification preferences](../admin/t_admin_common_user_specifies_email.md)**  
Edit configuration settings to enable users to specify the email address to which they would like notifications sent, the frequency with which they receive notifications, and the language the notification is written in.
-   **[Disabling embedded applications in notifications](../admin/t_admin_notifications_disable_embedded_apps.md)**  
Standard notifications sent from HCL Connections can include an OpenSocial embedded application that is displayed in supported email clients. You can remove embedded applications from all supporting notifications by disabling a configuration property in the notification-config.xml file.
-   **[Including mobile links in notifications](../admin/t_admin_notifications_include_mobile_links.md)**  
You can enable links to the HCL Connections Mobile service from notifications by updating the value of a property in the notifications configuration file.

**Parent topic:**[Optional post-installation tasks](../install/c_optional_post-install_tasks.md)

**Related information**  


[Customizing email digests](../customize/t_customize_email_digests.md)

[Customizing notifications sent as single emails](../customize/t_customize_notifications.md)

