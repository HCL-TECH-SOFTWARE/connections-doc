# Enabling email notifications \(default templates\) {#t_admin_common_enable_mail .task}

Edit configuration settings to enable email notifications in the HCL Connections applications if you did not do so during the installation.

Only complete this procedure if you did not enable email notifications during the product installation. Also, be sure to complete the steps described in [Sending mail from any available mail server](t_admin_common_config_mail_dnx.md) or [Sending mail from a dedicated mail server](t_admin_common_config_mail_was.md).

**Note:** If your organization is implementing the new look for email notifications introduced in CR4, skip this topic and see [t\_admin\_common\_enable\_template.md](t_admin_common_enable_template.md).

You might choose not to enable email notifications if you have configured HCL Connections to hide email addresses, for example. Even when you do not enable email notifications, if you installed the Home page application, the product still supports a subset of notifications that can be displayed in the Home page application. The subset includes the notifications of type "Directed," which are listed in *Configuring notifications*.

When you set the enabled property to false globally or for a specific source, this disables all notification events for the Home page. Notification emails will not be sent and notifications will not display in the My Notifications view in the Home page. For this reason, when you are disabling email only, it is important to ensure that you only set the email channel to false for a specific notification type.

1.  [Access the notification configuration file](t_admin_common_checkout_notification_config.md).

2.  Open the notification-config.xml file in a text editor.

3.  Locate the <config\> element with the ID attribute equal to notification-config.

4.  Search for the <source name="<applicationName\>" string to find the section of XML markup that defines the notification settings for the application for which you want to enable email notifications.

5.  Change the value of the enabled attribute associated with the email channel element to **true**.

    For example:

    ```
    <source 
     name="Activities" 
     enabled="true" 
     defaultFollowFrequency="DAILY">
       <type name="notify" notificationType="DIRECTED">
    <type name="notify" notificationType="DIRECTED">
     <channel name="email" enabled="true">
      <property name="sender">blogs-admin@example.com</property>
      <property name="ftl">notify.ftl</property>
     </channel>
     <channel name="event" enabled="true">
      <property name="eventName">blogs.notification.notify</property>
      <property name="transformerClass">com.ibm.lotus.connections.
           core.notify.channels.event.BlogsNotificationEventTransformer
      </property>
     </channel>
    </type>
    ...
    </source>
    ```

    **Note:** When you disable notifications during the installation process, all the email channels are set to false. Source events are left at true because notification events are still valid to be sent and displayed in the Home page activity stream. Setting the entire source to false disables all events, which means that notification emails will not be sent and will not display in the My Notifications view in the Home page.

6.  Save, close, and then check in the notification-config.xml file as described in [Accessing the notification configuration file](t_admin_common_checkout_notification_config.md).


See *Defining valid administrator email addresses* for some additional steps that you must take to configure automatic notifications in Activities.

