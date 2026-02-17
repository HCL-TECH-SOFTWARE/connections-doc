# Configuring Forums for email notification replies {#configuringforumsforemailnotificationreplies .concept}

Configure Forums so that users can reply to forum topics by email.

When a reply is added to a forum topic, an email is sent to followers of that forum and that topic. After you enable and configure notification replies, users receiving that email can respond by email. The content of that response is added as a new reply in the forum, after the original.

When users reply to notifications, a mail server uses a rule or trigger to direct the reply emails to a mailbox dedicated for this purpose. The HCL Connections server uses a WebSphere® Application Server mail session to process this mailbox periodically, adding content to the forums.

For this to work, an administrator must configure the mail server and mail session, and then enable the feature. Users must specify their email settings in HCL Connections. For a user to receive notifications that they can reply to, the Notifications feature must be enabled on the server. The email notification reply feature must also be enabled on the server in the news-config.xml file. Each user who wants to receive email reply notifications must then have the feature enabled on their Settings screen.

Configuring the mail session requires performing some simple steps in the WebSphere Application Server administrative console. Configuring the mail server requires creating the dedicated mailbox, and creating a rule or trigger to direct replies to it. Steps for creating the rule or trigger will vary depending on the mail server. For example, in Microsoft™ Exchange 2007 or later you create a transport rule; in Domino® you create a mail rule.

HCL Connections supports the Simple Mail Transfer Protocol \(SMTP\) for sending notifications, and the Internet message access protocol \(IMAP\) and secure Internet message access protocol \(IMAPS\) for notification replies. Any mail server using these protocols can direct notifications and notification replies. This documentation provides information on configuring HCL Domino servers to direct notification replies to a dedicated mailbox. See the [HCL Connections system requirements](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073654) for supported email applications.

!!! note 
    
    In deployments with multiple HCL Connections servers, the different servers cannot use the same mailbox. However, they can use different mailboxes on the same mail server, in which case each would require its own direction rules.

The following sections provide more information about configuring email notification replies for Forums:

-   **[Configuring HCL Domino for email notification replies](../admin/t_admin_forums_notification_replies_domino.md)**  
Configure HCL Domino to direct email notification replies to a dedicated mailbox.
-   **[Configuring Exchange for notification replies](../admin/c_admin_forums_notification_replies_exchange.md)**  
Configure Microsoft Exchange 2007 or later to direct email notification replies to a dedicated mailbox.
-   **[Configuring WebSphere Application Server for email notification replies](../admin/t_admin_forums_notification_replies_was_session.md)**  
Configure an IBM® WebSphere Application Server mail session to connect to a mailbox dedicated to storing email notification replies.
-   **[Enabling notification replies](../admin/t_admin_forums_notification_replies_enable.md)**  
An administrator must edit settings in the `news-config.xml` file to allow users to reply to email notifications. Users must specify two preferences.

**Parent topic:**[Configuring notifications](../admin/t_admin_common_config_notification.md)

**Related information**  


[Enabling email notifications \(default templates\)](../admin/t_admin_common_enable_mail.md)

