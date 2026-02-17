# Specifying an administrator email address for Blogs notifications {#t_admin_blogs_admin_email .task}

Edit configuration property settings to change the administrator email address for notifications. This is the address used to send system notifications, such as notifications sent to users who have posted inappropriate content.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

By default, automatic notifications are sent from a generic email address, such as blogs-admin@example.com. If Connections is configured so that email addresses are not displayed, you can set a global sender email address for all notification templates, as described in the topic *Defining a valid global sender email address*. If email addresses are displayed, the global sender is ignored. In either case, you should add a specific administrator email address that has access rights to send mail for several notification templates that are used in the workflows for managing content that is flagged as inappropriate. Some of the messages sent automatically instruct the recipient that they can respond to the administrative user email address from which the notification was sent. If you do not edit the default email address, the recipient gets a delivery failure notification when they try to respond to the automatic email.

To specify an administrator email address for managing flagged content, complete the following steps:

1.  Check out the notification-config.xml file using the following command:

    ```
    LCConfigService.checkOutNotificationConfig("<temp_dir>","<cell_name>")
    ```

    where temp\_dir is a temporary directory and cell\_name is the WebSphere® Application Server cell where you installed Blogs.

2.  From the temporary directory to which you checked out the notification-config.xml file, open it in a text editor.

3.  Search for the `name="Blogs"` string to find the section that defines the notification settings for the Blogs application.

4.  For notifications that you enable, add or change the value of the corresponding sender attribute to a legitimate email address.

5.  Save and close the notification-config.xml file.

6.  Check in the configuration files using the following command:

    ```
    LCConfigService.checkInNotificationConfig("<temp_dir>", "<cell-name>")
    ```

7.  Restart the Blogs server for the changes to take effect.


**Parent topic:**[Administering Blogs using the wsadmin client](../admin/r_admin_blogs_wsadmin.md)

**Related information**  


[Managing content moderation and flagged content](../admin/t_admin_blogs_flag_inappropriate.md)

[Defining valid administrator email addresses](../admin/t_admin_act_managing_notifications.md)

[Moderating Blog comments](../admin/t_admin_blogs_moderating_comments.md)

