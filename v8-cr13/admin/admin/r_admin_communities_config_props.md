# Communities configuration properties {#r_admin_communities_config_props .reference}

Configuration properties control various features within Communities and also help in the optimization of server performance. They require a Communities application or server restart to take effect.

## Configuration properties { .section}

You can check out and modify the following configuration properties in the communities-config.xml file. The properties are listed in alphabetical order.

activeContentFilter.enabled
:   When enabled, this property prevents the addition of active content \(JavaScript™\) in any text input field.

    This property takes a Boolean value: true or false.

    **Note:** Disabling this filter introduces vulnerability to cross-site scripting \(XSS\) and other type of malicious attacks. For more information, see *Securing applications from malicious attack*.

descriptionSummary.size
:   This property determines the maximum number of characters in a community description to display in the My Organization Communities or My Communities view. It gets this information through the seedlist.

    **Note:** You must reindex the catalog to get the old content updated. For more information, see *Restoring the Communities catalog index*.

    This property takes an integer value.

explicitMembershipEntityLimit
:   This property determines the maximum number of members that a community can contain. This limit is the total number of people and groups added to a community. It does not count the number of people who are contained in a group towards this limit. The limit applies to adding new members only. If the limit is reduced, HCL Connections does not remove people from communities to accommodate the decreased limit.

    This property takes an integer value. The default value is 100000. Values greater than 100000 are not supported.

    **Note:**

    -   A group added to community membership counts as one member.
    -   The limit applies to all community types \(open, moderated, and restricted\).

    Decrease explicitMembershipEntityLimit to improve performance.

group.enabled
:   Enables or disables the ability to add groups to communities. When owners click **Add Members**, they can choose to add Groups in the **Members** field.

    This property accepts the following values: true or false.

group.membershipCache.maximumAgeOnLoginInSeconds
:   When a user logs in, this property determines the maximum age of a group membership cache in seconds.

    The value must be 0 or greater.

group.membershipCache.maximumAgeOnRequestInSeconds
:   Determines the maximum age of a group membership cache in seconds across requests for a user.

    The value must be 0 or greater.

pagingSupport.communityListTags.pageSize
:   Used by API calls that request tags. If you do not specify the count parameter in the API call, then the value that is listed in pagingSupport.communityListTags.pageSize is used.

    This property takes an integer value.

pagingSupport.dbNameTypeAhead.pageSize
:   Determines the maximum number of matching names to display in the type-ahead suggestion field when users start typing the names of people to add to a community. These names are retrieved from the SNCOMM.MEMBERPROFILE database table.

    This property takes an integer value.

pagingSupport.defaultPageSize
:   This property determines the maximum number of community bookmarks and feed lists that are displayed on a page. The default value is 10.

    This property takes an integer value.

    Decrease the number to speed paging.

pagingSupport.ldapNameSearch.pageSize
:   Determines the maximum number of LDAP users that are returned when users click **Search Directory** to search the LDAP directory for a name when they are adding members to a community.

pagingSupport.memberNameTypeAhead.pageSize
:   Determines the maximum number of users that are displayed by the type-ahead application when users click **Search Directory** to search the LDAP directory for a name when they are adding members to a community.

pagingSupport.tagNameTypeAhead.pageSize
:   Determines the maximum number of tags that are displayed by the type-ahead application when users add new tags to a community.

show.StartCommunity.To.Unauthenticated
:   When enabled, this property displays **Start a community** to unauthenticated users.

    This property takes a Boolean value: true or false.

task.EventLogCleanup.enabled
:   Enables or disables the event log cleanup task.

    This property accepts the following values: true or false.

task.EventLogCleanup.interval
:   Specifies the interval at which the event log cleanup task runs.

    This parameter is specified by using Cron format. For more information about using the Cron format, see *Scheduling tasks*.

    When you change the interval property, the new schedule is registered the next time that Communities is started on any server in the Communities cluster \(if there is one\).

task.LifecycleRetryQueuedEvents.enabled
:   Enables or disables the lifecycle retry queued events task.

    This property accepts the following values: true or false.

task.LifecycleRetryQueuedEvents.interval
:   Specifies the interval at which the lifecycle retry queued events task runs.

    This parameter is specified by using Cron format. For more information about using the Cron format, see *Scheduling tasks*.

    When you change the interval property, the new schedule is registered the next time that Communities is started on any server in the Communities cluster \(if there is one\).

**Parent topic:**[Changing Communities configuration property values](../admin/t_admin_communities_changing_config.md)

**Related information**  


[Securing applications from malicious attack](../secure/c_admin_security_xss.md)

[Protecting against malicious active content](../admin/t_admin_communities_filter_active_content.md)

[Applying property changes in Communities](../admin/t_admin_communities_save_changes.md)

[Restoring the Communities catalog index](../admin/t_admin_communities_catalog_recover_index.md)

[Scheduling tasks](../admin/c_admin_common_was_scheduler.md)

[Communities administrative commands](../admin/r_admin_communities_admin_props.md)

