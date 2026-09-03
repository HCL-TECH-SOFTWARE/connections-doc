# Sending mail from a dedicated mail server {#t_admin_common_config_mail_was .task}

Configure HCL Connections notifications to be sent from a specific SMTP server that is managed by WebSphere® Application Server. If the designated mail server is unavailable, then notification emails fail to be delivered.

Mail is configured as part of the installation process. Only perform this procedure if you did not enable mail during the installation or you want to change the mail configuration.

You can choose to configure notifications to be sent from a single SMTP or have HCL Connections perform a lookup of multiple SMTP server to find one that is available to send the message. If you are interested in the latter configuration, see [Sending mail from any available mail server](t_admin_common_config_mail_dnx.md).

1.  Log into the IBM® WebSphere Application Server Integrated Solutions Console.

2.  Expand **Resources** and select **Mail** \> **Mail sessions**.

3.  Select **Cell scope**, and then create a new session.

4.  Specify values for the following fields:

    **Name**
       Specify `HCL Connections Notification` or another descriptive string.

    **JNDI name**
       Specify `mail/notification` as the value of the JNDI name.

5.  Specify the following custom properties to define time outs that will prevent resources from being consumed in the event that the SMTP server is unavailable:

    ```
    mail.smtp.timeout=120000
    mail.smtp.connectiontimeout=120000
    mail.smtp.sendpartial=true
    
    ```

    The time interval is specified in milliseconds. A value of 120,000 is two minutes.

    Setting the property `mail.smtp.sendpartial=true` ensures that a message with some valid and some invalid email addresses will be sent, so that the valid email addresses will still receive the message. If set to false or not defined, an invalid email address will cause the message to not be sent to any email addresses.

6.  In the Outgoing Mail Properties section, specify the fully qualified host name or IP address of the SMTP server that you want to use in the **Server** field.

7.  If the SMTP server requires authentication, then provide values for the following fields:

    **User**
       User ID used to connect to the SMTP server.

    **Password**
       Password associated with the user ID used to connect to the SMTP server.

    **Verify Password**
       Repeat the password specified in the previous field.

8.  If the SMTP server requires traffic to be sent over SSL, then add the following customer properties, and then specify values for them by clicking the **Custom properties** link, and then clicking **New**:

    **mail.smtp.port**
       Specifies the SMTP port number, which is often 465.

    **mail.smtp.socketfactory.port**
       Specifies the SMTP port number, which is often 465.

    **mail.smtp.socketfactory.class**
       Specifies the SSL socket factory class.

    **mail.smtp.socketFactory.fallback**
       Specifies whether an unsecure connection can be made if SSL is not available. This property accepts the following values: true or false.

    For example:

    ```
    mail.smtp.port=465
    mail.smtp.socketfactory.port=465
    mail.smtp.socketfactory.class=javax.net.ssl.SSLSocketFactory
    mail.smtp.socketFactory.fallback=false
    
    ```

9.  Click **OK**, and then save your changes.

10. Start the wsadmin client from the following directory of the system where you installed the deployment manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    **Note:** You must start the client from this directory or subsequent commands that you try to run will not execute properly. For more information, see the [Starting the wsadmin client](t_admin_wsadmin_starting.md) topic.

11. Update the notification configuration file to indicate that you want to use a mail session managed by WebSphere Application Server.

    1.  [Access the notification configuration file](t_admin_common_checkout_notification_config.md).

    2.  Open the notification-config.xml file in a text editor.

    3.  Search for the <emailChannelConfig\> element, and then uncomment the following line of XML markup if it is commented out:

        ```
        <useJavaMailProvider>true</useJavaMailProvider>
        ```

    4.  Comment out the <smtpJNDILookup\> element if it is not already.

        ```
        <!--smtpJNDILookup>
        ...
        </smtpJNDILookup-->
        
        ```

    5.  Save and close the notification-config.xml file.

        **Note:** You must check out and edit the same file in the procedure described in *Enabling email notifications*. If you plan to complete that procedure next, keep the notification-config.xml file open and checked out.

    6.  Check in the configuration files using the following command:

        ```
        LCConfigService.checkInNotificationConfig("<temp_dir>","<cell-name>")
        ```

    7.  Stop and restart HCL Connections.


You must complete the steps described in [Enabling email notifications](t_admin_common_enable_template.md) before users can send and receive email notifications.

**Parent topic:** [Configuring notifications](../admin/t_admin_common_config_notification.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

