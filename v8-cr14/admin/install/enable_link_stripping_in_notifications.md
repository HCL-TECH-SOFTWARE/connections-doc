# Enabling link stripping in email notifications {#enable_link_stripping_in_notifications .task}

With link stripping in email notifications, you can help users identify unknown or misleading live links before they click them. Enabling this feature is optional.

By adding the domains that you want users to access to the whitelist, you can make sure that the locations indicated by the clickable URLs in notifications are the actual destination. For example, if a link is to a destination outside of your whitelisted domains, it will be "stripped" of misleading text in the URL. For example, if such a link is displayed as www.safe.com but is really www.unknown.com, with this feature enabled users will see the real destination of the link.

1.  [Access the notification configuration file](../admin/t_admin_common_checkout_notification_config.md).

2.  Open the notification-config.xml file in a text editor.

3.  In the `<properties>` section at the top of the file, add the `stripLiveLinks` property and set it to `true`:

    ```
    <property name="stripLiveLinks">true</property>
    ```

4.  Now, add the `liveLinksWhitelist` property, setting the value to one or more domain names for the domains whose URLs you consider safe to display as-is in notifications. Separate the domain names with commas as in the following example:

    ```
    <property name="liveLinksWhitelist">{domain1.com, domain2.edu, domain3.net}</property>
    ```


The label and destination of any link that is not from an approved domain will be rendered as shown in the following example, allowing the user to see that the label does not match the destination:

```
www.safe.com [<a href="http://www.unknown.com>www.unknown.com</a>;]
```

**Parent topic:**[Configuring notifications](../admin/t_admin_common_config_notification.md)

