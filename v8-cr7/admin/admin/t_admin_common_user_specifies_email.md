# Enabling users to specify email notification preferences 

Edit configuration settings to enable users to specify the email address to which they would like notifications sent, the frequency with which they receive notifications, and the language the notification is written in.

Email notifications must be enabled in HCL Connections for this procedure to have any effect. If you have configured HCL Connections to hide email addresses, you might not want to enable email notifications.

When you enable notifications, a **Settings** link is available from the product header that users can click to define their email preferences. Otherwise, no user interface settings are made visible to users.

The following preferences are set by default:

|Preference|Default setting|
|----------|---------------|
|Responses and notifications|Individual emails|
|Activities|Daily newsletter|
|Blogs|Daily newsletter|
|Bookmarks|Weekly newsletter|
|Communities|Daily newsletter|
|Files|Individual emails|
|Forums|Daily newsletter|
|People|Weekly newsletter|
|Tags|Weekly newsletter|
|Wikis|Daily newsletter|
|Mentions|Individual emails|
|Libraries|Individual emails|

1.  Start the wsadmin client from the following directory of the system where you installed the deployment manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    **Note:** You must start the client from this directory or subsequent commands that you try to run will not execute properly. For more information, see the *Starting the wsadmin client* topic.

2.  Enter the following command to access the HCL Connections configuration files:

    ```
    execfile("connectionsConfig.py")
    ```

    If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

3.  Enter the following command to check out the notification-config.xml file:

    ```
    LCConfigService.checkOutNotificationConfig("temp\_dir","cell\_name")
    ```

    where

    -   temp\_dir is the temporary directory to which the configuration XML and XSD files are copied and are stored while you make changes to them. Use forward slashes to separate directories in the file path, even if you are using the Microsoft Windows operating system.
    -   cell\_name is the WebSphere® Application Server cell to which you installed the application for which you are enabling mail. This argument is case-sensitive, so type it with care.
    **Note:** If you installed HCL Connections into multiple WebSphere Application Server profiles, for example: Activities is installed on AppSrv01, Blogs is installed on AppSrv02, and so on\), then there is a notification-config.xml file for each application. If you used this type of deployment, you must perform these steps to edit the notification-config.xml file associated with each WebSphere Application Server profile.

    For example:

    -   Linux:

        ```
        LCConfigService.checkOutNotificationConfig("/opt/temp","foo01Cell01")
        ```

    -   Microsoft Windows:

        ```
        LCConfigService.checkOutNotificationConfig("c:/temp","foo01Cell01")
        ```

4.  From the temporary directory to which you checked out the notification-config.xml file, open it in a text editor.

5.  Make any of the following changes that you want to the `<defaultEmailPreferences>` element:

    -   To allow users to specify a preferred email address for notifications, change the value of the `<allowEmailAddressOverride>` element to true. For example:

        ```
        <defaultEmailPreferences>
         <allowEmailAddressOverride>true</allowEmailAddressOverride>
          ... 
        </defaultEmailPreferences>
        ```

    -   Specify whether automatic email notifications that result from one user notifying another or that are sent from the system should be sent to the person in email. If users do not receive the notification in email, they can still view the notifications from the Home page application. To prevent notifications from being sent by email, set <sendEmailsForDirectNotifications\> to false.
    -   Define the language in which notifications should be written:

        -   If you want emails to be displayed in the language that corresponds to the locale that was set in the browser the last time the user accessed the application from the web, then set <useLanguageFromCallingComponent\> to true.
        -   If you want to define a default language to use for all notification messages all of the time, set <useLanguageFromCallingComponent\> to false and specify the language code of the language in the <defaultLanguage\> element.
        Users can change these settings from the product user interface; you are just defining the default values here.

        **Note:** The list of languages present in the Settings page represents the languages that are enabled for the product, which is defined in the <languageSelector\> element in the LotusConnections-config.xml file. For more details, see *Enabling users to set a language preference*.

    -   Edit the following defaultEmailPreferences.categories and elements:

        <category name="responses" defaultFollowFrequency="WEEKLY" frequencyLocked="false"/\>
        :   Specifies the frequency with which users receive notifications about responses to their postings.

            Valid values include:

            -   DAILY: Send a notification email with a list of notifications once a day.
            -   INDIVIDUAL: Send an email each time a notification is produced.
            -   NONE: Do not send any notifications by email.
            -   WEEKLY: Send a notification email with a list of notifications once a week.
            Users can change this setting from the product user interface; you are just defining the default values here.

        <category name="tags" defaultFollowFrequency="DAILY" frequencyLocked="false"/\>
        :   Specifies the frequency with which users receive notifications about tags that they are following.

            Valid values include:

            -   DAILY: Send a notification email with a list of notifications once a day.
            -   INDIVIDUAL: Send an email each time a notification is produced.
            -   NONE: Do not send any notifications by email.
            -   WEEKLY: Send a notification email with a list of notifications once a week.
            Users can change this setting from the product user interface; you are just defining the default values here.

        <category name="mentions" defaultFollowFrequency="INDIVIDUAL" frequencyLocked="false"/\>
        :   Specifies how often email notifications updates from a third party application. are sent.

            Valid values include:

            -   DAILY: Send a notification email with a list of notifications once a day.
            -   INDIVIDUAL: Send an email each time a notification is produced.
            -   NONE: Do not send any notifications by email.
            -   WEEKLY: Send a notification email with a list of notifications once a week.
            Users can change this setting from the product user interface; you are just defining the default values here.

        <category name="external" defaultFollowFrequency="DAILY"/\>
        :   Provides an override for any third-party application that is enabled for email digests.

            Valid values include:

            -   DAILY: Send a notification email with a list of notifications once a day.
            -   INDIVIDUAL: Send an email each time a notification is produced.
            -   NONE: Do not send any notifications by email.
            -   WEEKLY: Send a notification email with a list of notifications once a week.
            Users can change this setting from the product user interface; you are just defining the default values here.

        <digestItemsPerCategory\>10</digestItemsPerCategory\>
        :   Defines the number of items that display within a category of the daily or weekly digest. The allowable range is 5-25. The default value is 10. This setting is applied globally and cannot be configured per user.

        <replyToEnabled\>true</replyToEnabled\>
        :   When set to true, users receive emails with replyTo support. This option is displayed on the Email Settings page for each user. The default value is true.

    For example:

    ```
    <defaultEmailPreferences>
      <allowEmailAddressOverride>true</allowEmailAddressOverride>
      <useLanguageFromCallingComponent>false</useLanguageFromCallingComponent>
      <defaultLanguage>es</defaultLanguage>
      <sendEmailsForDirectNotifications>true</sendEmailsForDirectNotifications>
      <digestItemsPerCategory>10</digestItemsPerCategory>
      <replyToEnabled>true</replyToEnabled>
    </defaultEmailPreferences>
    ```

6.  For each application, you can also specify the frequency with which users should receive notifications about content that they are following by editing the defaultFollowFrequency attribute for that application. For example, to define the frequency with which users should receive notifications about content they are following in the Activities application, edit the source element for Activities as follows:

    ```
    <source 
     **defaultFollowFrequency="DAILY"** 
     enabled="true" 
     name="Activities">
    ```

7.  Save and close the notification-config.xml file.

8.  Check in the configuration files using the following command:

    ```
    LCConfigService.checkInNotificationConfig("<temp_dir>","<cell-name>")
    ```

9.  Update the version stamp property to force a refresh of users' web browsers, so that they see the email preference changes the next time they access the product. See *Required post-customization step*.


**Parent topic:** [Configuring notifications](../admin/t_admin_common_config_notification.md)