# Changing Activities configuration property values {#t_admin_act_changing_config .task}

Configuration settings control how and when various Activities operations take place. You can edit the settings to change the ways that activities behave.

Configure Activities using scripts accessed with the wsadmin client. These scripts use the AdminConfig object available in WebSphere® Application Server wsadmin client to interact with the Activities configuration file. Changes to Activities configuration settings require node synchronization and a restart of the Activities server before they take effect.

1.  [Checking out the Activities configuration files](../admin/t_admin_act_checkout_config_file.md)  
You can edit the Activities configuration files in two ways: by using the wsadmin client or by editing the configuration XML files directly. In both cases, you must first check out the configuration files and later check them back in using the wsadmin client.
2.  [Activities configuration properties](../admin/r_admin_activities_props.md)  
Edit Activities configuration properties to change the default behavior of the activities that are created by your users.
3.  [Applying property changes in Activities](../admin/t_admin_act_save_changes.md)  
After you have edited the Activities configuration properties, check the changed configuration file in, and restart the servers to apply the changes.
4.  [Managing uploaded files](../admin/t_admin_act_manage_uploads.md)  
There are many ways to include files in an activity. Files can be uploaded and stored in an activity. To avoid uploading files into an activity, add a link in the activity that points to a file stored in a Linked Library or Files. You can also limit the maximum size of files that can be uploaded, add a content store to an activity, or move a content store.
5.  [Completing activities that are not being used](../admin/t_admin_act_auto_completing.md)  
Activities are moved to the Completed view for two reasons, inactivity and the passing of a Due Date. The following help is about how to configure an inactive Activity.
6.  [Emptying the Activities trash on a schedule](../admin/t_admin_act_trash_removal.md)  
Edit configuration property settings to set up a schedule on which to permanently delete the activities and entries that have been moved to the Trash view.
7.  [Monitoring statistics and metrics](../admin/t_admin_act_collecting_statistics.md)  
Use the Activities statistics gathering application to monitor operations, product usage, and to make configuration adjustments when necessary.
8.  [Purging the Activities log](../admin/t_admin_act_purge_events.md)  
By default, the Activities events log is purged daily at 2 AM. By modifying the EventLogPurgeJob task, you can specify the time that the log is purged and set the properties that define which entries can be deleted. Deleting old events helps maintain performance and keeps the log from becoming too large. Limiting the size of the event log table limits the database storage needed.
9.  [Managing Activity filters](../admin/t_admin_act_const_filter.md)  
Edit configuration property settings to filter out Community activities from **My activities** in the main navigation panel of the Overview page.

**Parent topic:**[Administering Activities](../admin/c_admin_act_overview.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

