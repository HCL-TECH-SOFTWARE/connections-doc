# Forums configuration properties {#r_admin_forums_config_props .reference}

Configuration settings control configurable features within Forums and can also help to optimize the performance of the application server. When you change these settings, you mush restart the Forums application server.

## Modify properties { .section}

You can check out and modify the following properties in the forum-config.xml file. The properties are listed in alphabetical order.

activeContentFilter.enabled
:   When enabled, this property prevents the addition of active content \(JavaScript™\) in any text input field.

    This property takes a Boolean value: true or false.

    **Note:** Disabling this property introduces vulnerability to cross-site scripting \(XSS\) and other type of malicious attacks. For more information, see *Securing applications from malicious attack*.

    For example:

    ```
    ForumsConfigService.updateConfig("activeContentFilter.enabled","true")
    ```

discussThis.enabled
:   Users can click **Bookmark or Discuss This** on any HCL Connections page to install a **Discuss This** button in their browser toolbar. When a user clicks the button, the content of the current page is added to a forum topic that the user selects.

    Use the discussThis.enabled property to enable a similar **Discuss This** button on every forum topic page. Users can click the button to post the topic as a new topic in a forum in a different HCL Connections deployment. You can specify that deployment in the discussThis.internalHost property.

    For example, if you have two HCL Connections deployments in your enterprise, A and B, you can allow forums users in Deployment A to post topics to Deployment B forums. To enable this feature, check out theforums-config.xml file in Deployment A and specify the address of the forums application in Deployment B. When users open a forum page in deployment A and clicks the **Discuss This** link, they can select the target forum on Deployment B from a pop-up dialog. If the users are not logged in to Deployment B, they are prompted to log in before they can post the new topic. Users must be members of the group that is mapped to the discussThis-user role on Deployment A \(the default is Everyone\).

    For more information about configuring the button, see *Enabling forum topic posting in different deployments*.

    This property takes a Boolean value: true or false. It is set to true by default.

discussThis.targetBookmarklet
:   Specifies the address of the forums application in a different IBM® Connections deployment. This property is required to enable the **Discuss This** feature in the discussThis.enabled property. For more information about configuring the button, see *Enabling forum topic posting in different deployments*.

    This property takes a server address, such as: http://servername.example.com:9081.

objectStore.allowUpload
:   Enables or disables the uploading of file attachments to forums.

    This property takes a Boolean value: true or false.

    For example:

    ```
    ForumsConfigService.updateConfig("objectStore.allowUpload","false")
    ```

task.TrashAutoPurgeJob.enabled
:   Enables or disables the Purge Trash task.

    This property accepts the following values: true or false.

    For example:

    ```
    ForumsConfigService.updateConfig("task.TrashAutoPurgeJob.enabled", "true")
    ```

task.TrashAutoPurgeJob.trashRetentionInDays
:   Specifies the number of days that deleted content remains in the database. The value must be set to 1 or greater. If the value is less than 1, the trash is not purged by this job. The default value is 90.

    For example:

    ```
    ForumsConfigService.updateConfig("task.TrashAutoPurgeJob.trashRetentionInDays", "120")
    ```

task.TrashAutoPurgeJob.interval
:   Specifies the interval at which the Purge Trash task runs.

    When you change this property, the new schedule is registered the next time that Forums is started. If you use a Forums cluster, the change is propagated to all Forums application servers in the cluster.

    For example:

    ```
    ForumsConfigService.updateConfig("task.TrashAutoPurgeJob.interval", "0 0/15 * * * ?")
    ```

**Parent topic:**[Changing Forums configuration property values](../admin/t_admin_forums_changing_config.md)

**Related information**  


[Applying property changes in Forums](../admin/t_admin_forums_save_changes.md)

[Securing applications from malicious attack](../secure/c_admin_security_xss.md)

[Security](../secure/c_sec_overview.md)

