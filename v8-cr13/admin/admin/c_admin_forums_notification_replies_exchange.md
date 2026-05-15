# Configuring Exchange for notification replies {#configuringexhangefornotificationreplies .concept}

Configure Microsoft™ Exchange 2007 or later to direct email notification replies to a dedicated mailbox.

In environments with Microsoft Exchange, you must create a Transport Rule, on either the Edge Transport server or Hub Transport server, that identifies notification reply emails based on a pattern, and then directs that mail to the dedicated mailbox. For example, you can create a rule that identifies emails in which the To header contains the unique domain name you've appended as a suffix to notification reply email addresses.

Example:

-   Rule type: Transport Rule, on Hub Transport
-   Condition: "when the message header contains text patterns"
-   Sub-condition: message header = "To"
-   Sub-condition: pattern = "lconn.acme.com$" \(address ends with lconn.acme.com\). Substitute lconn.acme.com with the domain you are using for notification reply emails. See *Enabling notification replies* for more information.
-   Action: "redirect the message to addresses"
-   Target address: `lconn@acme.com`. Substitue `lconn@acme.com` with the address of the mailbox dedicated to storing notification reply emails.

!!! note 
    
    The domain configured in the news-config.xml file for ReplyTo needs to be an Accepted Domain, which can be configured in the Hub Transport tab of the Exchange console.

For details on creating rules for identifying and directing email, see the Microsoft Exchange documentation.

**Parent topic:** [Configuring Forums for email notification replies](../admin/c_admin_forums_notification_replies.md)

**Related information**  


[Enabling notification replies](../admin/t_admin_forums_notification_replies_enable.md)

