# Setting the default frequency of email digests {#t_admin_common_specify_default_notification_frequency .task}

You can control the frequency with which email digests from HCL Connections are sent by configuring settings in the notification-config.xml file. You can also lock the default frequency for a specific application or category using settings in the configuration file.

To check out configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

By updating settings in the notification-config.xml file, you can specify the default frequency with which email digests are sent to your users. You can also lock the default frequency for specific applications or categories so that users cannot update the frequency settings for those applications or categories from the Email Preferences page. When you lock the default frequency for email digests, the setting is applied to all users. The frequency options that display on the Email Preferences page are grayed out, and a lock symbol indicates to users that the settings cannot be updated. Users can continue to select preferences for any applications for which the default frequency is not locked. User preferences are restored if you set the value of the frequencyLocked property to false at a later time.

The following sections of the notification-config.xml file contain the default frequency settings for HCL Connections applications:

-   defaultEmailPreferences.categories. This section contains email setting frequencies for the following categories:
    -   Responses. Controls the default email digest frequency for responses to content that users have created.
    -   Tags. Controls the default email digest frequency for tags that users are following.
    -   Mentions. Controls the default email digest frequency for @ mentions.
    -   External. Provides an override for any third-party application that is enabled for email digests. It does not have a default frequency configured.
-   HCL Connections application sources. The source for individual HCL Connections applications contains the defaultFollowFrequency setting for those applications.

You can also specify the email digest frequency for updates from any third-party applications that are enabled for email digests. To set the default email digest frequency for a third-party application, use the NewsActivityStreamService.updateApplicationRegistrationForEmailDigest command. For more information about this command, see *Registering third-party applications*.

1.  To set the default frequency for email digests, complete the following steps.
2.  [Access the notification configuration file](t_admin_common_checkout_notification_config.md).

3.  Using a text editor, open the notification-config.xml file from the temporary directory to which you checked it out.

4.  To set the default frequency of email digests for specific HCL Connections applications:

    1.  Look for the source of the application for which you want to configure frequency settings and update the value of the defaultFollowFrequency property to the required frequency: INDIVIDUAL, DAILY, or WEEKLY.

        For example, to configure settings for the Activities application so that your users receive a daily digest containing the latest updates from Activities, set the value of the defaultFollowFrequency property to DAILY.

        ```
        <source name="Activities" enabled="true" **defaultFollowFrequency="DAILY"** frequencyLocked="false"/>
        
        ```

        ```
        <source name="Activities" enabled="true" **defaultFollowFrequency="DAILY"** 
                  frequencyLocked="false"/>
        
        ```

    2.  To lock the default frequency so that your users cannot change it, set the value of the frequencyLocked property to true.

        ```
        <source name="Activities" enabled="true" defaultFollowFrequency="DAILY" **frequencyLocked="true"**/>
        
        ```

        ```
        <source name="Activities" enabled="true" defaultFollowFrequency="DAILY" 
                  **frequencyLocked="true"**/>
        
        ```

5.  To configure the default frequency settings for email digests related to tags, responses to content, or to override the settings for third-party applications that are enabled for email digests:

    1.  Look for the `<categories>` section of the file.

        ```
        <categories>
          <!--
            Specifies how email notifications updates about tags a user is 
            following are sent. 
            Options are INDIVIDUAL (single, immediate emails) DAILY, WEEKLY
            or NONE. 
          -->
          <category name="tags" defaultFollowFrequency="DAILY"
          frequencyLocked="false"/>
          <!-- 
            Specifies how email notifications for responses to authored content
            are sent. 
            Options are INDIVIDUAL (single, immediate emails) DAILY, WEEKLY or NONE.
          -->
          <category name="responses" defaultFollowFrequency="WEEKLY"
           frequencyLocked="false"/>
          <!-- 
            Specifies how email notifications for updates a user is @mentioned in.
            Options are INDIVIDUAL (single, immediate emails) DAILY, WEEKLY or NONE.
          -->
          <category name="mentions" defaultFollowFrequency="INDIVIDUAL"
          frequencyLocked="false"/>
          <!-- 
            Specifies how email notifications updates from third party application
            are sent 
            Options are INDIVIDUAL (single, immediate emails) DAILY, WEEKLY or NONE.
            Note that this is only applicable when a specific frequency is not
            set for the 3rd party Application through the NewsActivityStreamService
            wsadmin command
          -->
          <category name="external" defaultFollowFrequency="DAILY"/>
        </categories>
        ```

        **Note:** The Library application has its own source. To configure the default frequency settings for email digests related to libraries, look for the following section:

        ```
        <source name="ecm_files" enabled="true" defaultFollowFrequency="INDIVIDUAL" frequencyLocked="false"/>
        ```

        ```
        <source name="ecm_files" enabled="true" defaultFollowFrequency="INDIVIDUAL" 
        frequencyLocked="false"/>
        ```

    2.  Update the value of the defaultFollowFrequency property to the required frequency: INDIVIDUAL, DAILY, or WEEKLY.

        For example, to configure settings so that your users receive a weekly digest containing the latest responses from HCL Connections applications to content that they authored, set the value of the defaultFollowFrequency property for the responses category to WEEKLY.

        ```
        <category name="responses" **defaultFollowFrequency="WEEKLY"** 
        frequencyLocked="false"/>
        
        ```

    3.  To lock the default frequency, set the value of the frequencyLocked property to true.

        ```
        <category name="responses" defaultFollowFrequency="WEEKLY"
        **frequencyLocked="true"**/>
        
        ```

6.  Save, close, and then check in the notification-config.xml file as described in [Accessing the notification configuration file](t_admin_common_checkout_notification_config.md).


**Parent topic:**[Configuring notifications](../admin/t_admin_common_config_notification.md)

**Related information**  


[Registering third-party applications](../admin/t_admin_news_enable_third-party_apps.md)

