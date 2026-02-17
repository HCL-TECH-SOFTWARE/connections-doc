# Configuring WebSphere Application Server for email notification replies {#configuringwebsphereapplicationserverforemailnotificationreplies .task}

Configure an IBM® WebSphere® Application Server mail session to connect to a mailbox dedicated to storing email notification replies.

After you have set up your HCL Domino® or Microsoft™ Exchange server to receive replies, you need to configure the IBM® WebSphere® Application Server mail session parameter to connect to the mailbox dedicated to storing email notification replies. If your environment requires authentication to connect to the mailbox containing the replies, you must use IBM WebSphere Application Server with FixPack 17 or later.

The steps in this topic are required to configure Forums so that users can reply to forum topics by email. When a reply is added to a forum topic, an email is sent to followers of that forum and that topic. Users receiving that email can respond by email. The content of that response is added as a new reply in the forum, after the original.

A mail server uses a rule or trigger to direct reply emails to a mailbox dedicated for this purpose. The HCL Connections server uses a WebSphere Application Server mail session to process this mailbox periodically, adding content to the forums. This topic documents how to create the mail session.

**Note:** The ReplyTo mailbox should be different from a Connections user's regular mailbox. It is better to have a mailbox set aside just to handle ReplyTo replies to avoid the risk of having notifications sent to that user being read back in as ReplyTo replies.

1.  Open the IBM WebSphere Administrative Console.

2.  Navigate to **Resources** \> **Mail** \> **Mail Sessions**.

3.  Select a scope, and then create a new mail session with the following properties:

    1.  In the **Name** field type: lcreplyto

    2.  In the **JNDI name** field type: mail/replyto

4.  In the **Incoming Mail Properties** section set the following properties:

    1.  In the **Server** field, type the name of the mail server where the MailIn mailbox is located.

    2.  In the **Protocol** field, type the name of the protocol the server will use. You must use either IMAP or IMAPS.

    3.  In the **User** field, type the name of a user with access to the mailbox.

    4.  In the **Password** field, type the password the user from Step c.


**Parent topic:**[Configuring Forums for email notification replies](../admin/c_admin_forums_notification_replies.md)

