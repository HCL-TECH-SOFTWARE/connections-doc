# Sending mail from any available mail server {#t_admin_common_config_mail_dnx .task}

Configure HCL Connections to perform a lookup of domain namespace \(DNS\) MX records to retrieve a list of available SMTP servers. If the DNS lookup does not find any available SMTP servers, then email notifications fail to be delivered. If one or more SMTP servers are returned by the lookup, then HCL Connections attempts to send the email through one, and then the next until the email is sent successfully.

Mail is configured as part of the installation process. Only perform this procedure if you did not enable mail during the installation or you want to change the mail configuration.

You can choose to have HCL Connections perform a DNS lookup of multiple SMTP server to find one that is available to send the message or you can configure notifications to be sent from a single, dedicated SMTP server. If you are interested in the latter configuration, see *Sending mail from a dedicated mail server*. If you choose to enable mail from any available server, make sure your DNS is configured with valid MX records to ensure that available SMTP servers can be found.

1.  [Access the notification configuration file](t_admin_common_checkout_notification_config.md).

2.  Open the notification-config.xml file in a text editor.

3.  Search for the <emailChannelConfig\> element, and then change the value of the `<useJavaMailProvider>` element from true to false:

    ```
    <useJavaMailProvider>false</useJavaMailProvider>
    ```

4.  Remove the punctuation commenting out the <smtpJNDILookup\> element by removing the `!--` from the opening element and `--` from the closing element. For example, change the following XML markup:

    ```
    <!--smtpJNDILookup>
    ...
    </smtpJNDILookup-->
    
    ```

    to the following markup:

    ```
    <smtpJNDILookup>
    ...
    </smtpJNDILookup>
    
    ```

5.  Set the value of the `<smtpJNDILookupURL>` element within the `<smtpJNDILookup>` XML block to a valid DNS lookup web address for your environment.

    For example, the following web address performs a lookup of MX records for the acme.com domain using the default DNS server on the system on which HCL Connections is running:

    ```
    dns:///acme.com
    ```

    This value performs the same lookup on a specific DNS server that has an IP address of 192.168.0.2.

    ```
    dns://192.168.0.2/acme.com
    ```

6.  Configure or comment out any of the remaining properties in the `<smtpJNDILookup>` element block as needed for your environment. Some of the elements for which you can specify values are defined as follows:

    <authEntry\>
    :   Specifies a WebSphere® managed Java™ 2 Connector alias that specifies the username and password to use when connecting to an SMTP server requiring authentication.

    <javamail\>
    :   Specifies valid JavaMail™ properties. For example:

        ```
        <javamail>
          <property name="mail.debug">false</property>
          <property name="mail.smtp.connectiontimeout">120000</property>
          <property name="mail.smtp.timeout">120000</property>
          <property name="mail.smtp.port">465</property>
          <property name="mail.smtp.socketFactory.port">465</property>
          <property 
           name="mail.smtp.socketFactory.class">javax.net.ssl.SSLSocketFactory
          </property>
          <property name="mail.smtp.socketFactory.fallback">false</property>
        </javamail>
        ```

        The smtp properties configure a secure connection to the SMTP server using SSL. The time out properties define the amount of time for the notification to wait for the server to complete the request. If the time limit is reached, an exception is written to the server log, and an error is displayed to the Activities user that requested the notification. These properties prevent resources from being consumed in the event that the SMTP server is unavailable. The time interval is specified in milliseconds. A value of 120,000 is two minutes.

        See the JavaMail [documentation](https://javamail.java.net/nonav/docs/api/com/sun/mail/smtp/package-summary.html) for more information about these properties.

    Within the **<javamail\>** section of notification-config.xml, add the following property: **<property name="mail.smtp.sendpartial"\>true</property\>** This ensures that a message with some valid and some invalid email addresses will be sent, so that the valid email addresses will still receive the message. If set to false or not defined, an invalid email address will cause the message not to be sent to any email addresses.

7.  The <maxRecipients\> element defines the maximum number of people to whom you can send a notification at one time. The default value for this element is 50, but you can change it.

    ```
    <maxRecipients>50</maxRecipients>
    ```

8.  Save, close, and then check in the notification-config.xml file as described in [Accessing the notification configuration file](t_admin_common_checkout_notification_config.md).

9.  Stop and restart HCL Connections.


You must complete the steps described in *Enabling email notifications* before users can send and receive email notifications.

**Parent topic:**[Configuring notifications](../admin/t_admin_common_config_notification.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

