# Profiles configuration properties {#r_admin_profiles_config_props .reference}

Configuration settings control various configurable applications within Profiles. They require a Profiles application or server restart to take effect.

## Profiles configuration settings { .section}

You can check out and modify the following configuration settings in the profiles-config.xml file.

**Note:** Some configuration settings, such as the settings for the board and tagging features, were moved from the profiles-config.xml file to the profiles-policy.xml file. For more information about the settings that you can configure in the profiles-policy.xml file, see *Profile-types*.

activeContentFilter.enabled
:   Enables/disables filtering for active content of text entered into the **About me** and **Background** text input fields.

    This property takes a Boolean value: true or false. The value must be formatted in lowercase.

fullReportsToChainCache.ceouid
:   The corporate directory user ID of the person who displays at the top of the organizational structure.

fullReportsToChainCache.enabled
:   Enables or disables the full reports-to chain cache.

    This property takes a Boolean value: true or false. The value must be formatted in lowercase.

fullReportsToChainCache.refreshInterval
:   Time in minutes between cache reload operations.

    This property takes an integer value.

fullReportsToChainCache.refreshTime
:   HH:MM. Determines the time of day in 24-hour time format that Profiles performs the first scheduled reloading of the cache.

fullReportsToChainCache.size
:   The number of employee entries that should be loaded into the cache.

    This property takes an integer value.

fullReportsToChainCache.startDelay
:   Time in minutes that Profiles should wait after starting loading the cache for the first time.

    This property takes an integer value.

organizationalStructure.enabled
:   Indicates if the organizational structure information \(report-to chain, people managed, same manager\) should display.

    This property takes a Boolean value: true or false. The value must be formatted in lowercase.

nameOrdering.enabled
:   When this property is set to true, names must be entered as \(FirstName LastName\) or \(LastName, FirstName\). By default, it is set to false.

    When only a single word is entered, that word is treated as the LastName value during search.

    This property takes a Boolean value.

scheduledTasks.DbCleanupTasks
:   Specifies the frequency at which the database cleanup tasks runs. This task removes event log entries, or draft profiles updates older than the specified number of days.

    eventLogTrashRetentionInDays: Specifies the number of days to keep system events in the EMPINST.EVENTLOG table.

    draftTrashRetentionInDays: Specifies the number of days to keep draft profile updates.

    eventLogMaxBulkPurge: Specifies the maximum number of events to purge in a query.

scheduledTasks.ProcessLifeCycleEventsTasks
:   Specifies the frequency at which lifecycle events are published. This event ensures that lifecycle events are propagated.

    platformCommandBatrchSize: Specifies the maximum number of events attempted to process in each event run.

scheduledTasks.ProcessTDIEventsTasks
:   Specifies the frequency at which audit events triggered by a TDI synch are processed.

    platformCommandBatrchSize: Specifies the maximum number of events attempted to process in each event run.

scheduledTasks.StatsCollectorTask
:   Specifies the frequency at which Profiles statistics are calculated and written to disk.

    filePath: Specifies the directory in which to place the file.

    fileName: Specifies the file name.

scheduledTasks.RefreshSystemObjectsTask
:   This task is obsolete.

search.maxRowsToReturn
:   Determines the maximum number of rows returned by a search operation.

    This property takes an integer value.

search.pageSize
:   Determines the number of returned rows to place on a results page.

    This property takes an integer value.

**Parent topic:**[Changing Profiles configuration property values](../admin/t_admin_profiles_changing_config.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Applying common configuration property changes](../admin/t_admin_common_save_changes.md)

[Applying property changes in Profiles](../admin/t_admin_profiles_save_changes.md)

[Configuring advanced settings in Profiles](../admin/c_admin_profiles_config_adv_settings.md)

[Configuring profile features](../admin/c_admin_profiles_configurable_features.md)

[Profiles administrative commands](../admin/r_admin_profiles_admin_props.md)

[Profile-types](../customize/r_admin_profiles_ovr_types.md)

