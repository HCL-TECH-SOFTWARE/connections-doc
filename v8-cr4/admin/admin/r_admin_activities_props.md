# Activities configuration properties {#r_admin_activities_props .reference}

Edit Activities configuration properties to change the default behavior of the activities that are created by your users.

## Filtering active content { .section}

**activeContentFilter.enabled**: When enabled prevents the addition of active content \(JavaScript™, for example\) in any text input field.

    This property accepts the following String values: true or false.

    Note: Disabling this filter introduces vulnerability to cross-site scripting \(XSS\) and other types of malicious attacks. For more information, see *Securing applications from malicious attack*.

## Scheduling Activities statistics collection { .section}

**jobs.30MinStats.enabled**:   Specifies whether to run the job that saves statistics for Activities to disk every 30 minutes. This property accepts the following String values: true or false.

**jobs.30MinStats.interval**:   Specifies the frequency with which to run the scheduled job. This property accepts a chronological expression that is specified as a String. For more information on the format for the chronological value, see *Scheduling tasks*.

**jobs.DailyStats.enabled**:   Specifies whether to run the job that saves statistics for Activities to disk daily. This property accepts the following String values: true or false.

**jobs.DailyStats.interval**:   Specifies the frequency with which to run the scheduled job. This property accepts a chronological expression that is specified as a String. For more information on the format for the chronological value, see *Scheduling tasks*.

**jobs.DatabaseRuntimeStats.enabled**:   Specifies whether to run the job that periodically collects database statistics for Activities. This property accepts the following String values: true or false.

**jobs.DatabaseRuntimeStats.interval**:   Specifies the frequency with which to run the scheduled job. This property accepts a chronological expression that is specified as a String. For more information on the format for the chronological value, see *Scheduling tasks*.

## Completing activities that are not being used { .section}

**jobs.AutoComplete.autoCompletionPeriod**:   Specifies the time period in days that an activity must be inactive before it is automatically completed. This property accepts a number value that is specified as a String.

**jobs.AutoComplete.enabled**:   Specifies whether to run the job that automatically completes inactive activities. This property accepts the following String values: true or false.

**jobs.AutoComplete.interval**:   Specifies the frequency with which to run the job that automatically completes inactive activities. This property accepts a chronological expression that is specified as a String. For more information on the format for the chronological value, see *Scheduling tasks*.

**jobs.AutoComplete.prenotification**:   Specifies whether an activity owner is notified before an inactive activity is automatically completed. This property accepts the following String values: true or false.

## Emptying the Activities trash on a schedule { .section}

**jobs.TrashAutoPurge.daysRetention**:   Specifies how many days to retain deleted data before it is purged. This property accepts a number value that is specified as a String.

**jobs.TrashAutoPurge.enabled**:   Specifies whether to run the job that permanently removes content from the Activities trash. This property accepts the following String values: true or false.

**jobs.TrashAutoPurge.interval**:   Specifies the frequency with which to run the scheduled job. This property accepts a chronological expression that is specified as a String. For more information on the format for the chronological value, see *Scheduling tasks*.

## Customizing content stores { .section}

**objectStore.id**:   This property cannot be modified by the Administrator with the ActivitiesConfigService.updateConfig command. It is configured initially during installation, and its value is displayed with the ActivitiesConfigService.showConfig command.

This property displays a String value of filesystem, which cannot be changed.

**objectStore.maxConcurrentDownloads**:   Specifies the number of threads that are simultaneously dedicated to servicing file download requests in the Activities server.

This property accepts a number value that is specified as a String.

**objectStore.formFileUploadSizeLimit**:   If you are not using a browser that supports file upload through the IBM HTTP Server, this property specifies the maximum file size in bytes. This property is necessary if you configured your system for Activities using *Configuring file downloads and uploads through IBM HTTP Server*.

## Purging the events log { .section}

The following list identifies the Activities configuration properties that you can edit directly in the checked-out file. The events log is used to generate the Recent Updates view. Apply settings to control what updates are seen and when they are purged.

**jobs.EventLogPurgeJob.enabled**:   Specifies whether this task runs.

**jobs.EventLogPurgeJob.interval**:   Specifies when this task runs. This property accepts a chronological expression that is specified as a String. For more information on the format for the chronological value, see *Scheduling tasks*.

**jobs.EventLogPurgeJob.maxNumberOfDeletionPerCall**:   Specifies the maximum number of entries that are deleted at one time.

**jobs.EventLogPurgeJob.retentionInDays**:   Specifies how old an entry must be before it can be deleted.

## Changing the save frequency of entries { .section}

As users create or edit entries, their work is automatically saved every 5 minutes, unless you change the interval. If users leave an entry in an unsaved state when they accidentally close their browser, the next time they log in, a notification appears in the My Activities view reminding them that they have an unsaved entry. Autosave is not meant for backing up activities. This feature is provided to help you recover from unexpected events.

Edit the `<Autosave interval="5"/>` element in oa-config.xml to set how frequently entries are automatically saved. The save interval is in minutes.

Deleting this element does not turn off the autosave feature. If you delete the element, entries are saved at the default interval of 5 minutes.

## Assigning tasks to multiple people { .section}

**feature.multiAssignment.enabled**:   You can assign tasks within an activity to multiple people. A task is marked as completed when all assigned users mark the item complete. An activity owner can also mark the activity complete; In this case, the owner sees the following message:

```
Are you sure you want to mark this To Do Item as complete? If you are an assignee and want to complete 
your own status, you can click the checkbox before your name under this To Do Item
```

To enable this feature, uncomment the following line in opt/IBM/WebSphere/AppServer/profiles/Dmgr01/config/cells/connectionsCell/LotusConnections-config/oa-config.xml and set the value to true:

```
<property name="feature.multiAssignment.enabled">true</property>"
```

**Parent topic:** [Changing Activities configuration property values](../admin/t_admin_act_changing_config.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Applying common configuration property changes](../admin/t_admin_common_save_changes.md)

[Securing applications from malicious attack](../secure/c_admin_security_xss.md)

[Scheduling tasks](../admin/c_admin_common_was_scheduler.md)

