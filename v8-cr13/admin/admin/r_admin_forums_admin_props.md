# Forums administrative commands {#r_admin_forums_admin_props .reference}

Use these commands run administrative tasks for Forums. No file checkout or server restart is needed when you use these commands.

## Administering commands { .section}

The following sections define the commands that you can use when you are administering the Forums application. Each section describes the commands for a specific service. The commands are listed in alphabetical order.

-   [ForumsConfigService](r_admin_forums_admin_props.md#ForumsConfigService)
-   [ForumsMemberService](r_admin_forums_admin_props.md#ForumsMemberService)
-   [ForumsScheduler](r_admin_forums_admin_props.md#ForumsScheduler)
-   [ForumsService](r_admin_forums_admin_props.md#ForumsService)
-   [ForumsTopicsService](r_admin_forums_admin_props.md#ForumsTopicsService)
-   [ForumsTrashService](r_admin_forums_admin_props.md#ForumsTrashService)

## ForumsConfigService commands {#ForumsConfigService .section}

ForumsConfigService.checkOutConfig\("working\_directory", "cell\_name"\)
:   Checks out the Forums configuration files.

    This command takes the following parameters:

    <working\_directory\>
    :   Temporary working directory to which the configuration files are copied. The files are kept in this working directory while you modify them.

    <cell\_name\>
    :   Name of the IBM® WebSphere® Application Server cell that hosts the HCL Connections applications. If you do not know the cell name, type the following command in the wsadmin client:

        ```
        print AdminControl.getCell()
        ```

    For example:

    -   Linux™:ForumsConfigService.checkOutConfig\("/opt/my\_temp\_dir", "CommServerNode01Cell"\)
    -   Microsoft™ Windows™:ForumsConfigService.checkOutConfig\("c:/temp","foo01Cell01"\)

ForumsConfigService.checkInConfig\(\)
:   Checks in the Forums configuration files. Run from the wsadmin command processor.

ForumsConfigService.showConfig\(\)
:   Determine which property must be updated manually from the checkout command. The default Forums configuration properties are as follows:

    -   activeContentFilter.enabled = true
    -   discussThis = false
    -   discussThis.targetBookmarklet = http://\{server\}/connections/bookmarklet
    -   objectStore.allowUpload = true
    -   task.TrashAutoPurgeJob.enabled = true
    -   task.TrashAutoPurgeJob.interval = 0 0 2 ? \* SUN
    -   task.TrashAutoPurgeJob.trashRetentionInDays = 90

## ForumsMemberService commands {#ForumsMemberService .section}

ForumsMemberService.previewSyncAllMembersByExtId\( \{"updateOnEmailLoginMatch": \["true" \| "false"\[, "multiLine" : \["true" \| "false"\] \] \[, "verbose" : \["false" \| "true"\] \}\] \)
:   For more information, see *Synchronizing user data using administrative commands*.

ForumsMemberService.previewSyncMemberExtIdByEmail\("emailAddr" \[, \{ "allowInactivate" : \["true" \| "false"\] \[, "multiLine" : \["true" \| "false"\] \] \[, "verbose" : \["true" \| " false"\] \] \} \] \)
:   For more information, see *Synchronizing user data using administrative commands*.


ForumsMemberService.previewSyncMemberExtIdByEmail\("emailAddr" \[, \{ "allowInactivate" : \["true" \| "false"\] \[, "multiLine" : \["true" \| "false"\] \] \[, "verbose" : \["true" \| " false"\] \] \} \] \)
:   For more information, see *Synchronizing user data using administrative commands*.

ForumsMemberService.getMemberExtIdByEmail\("email"\)
:   For more information, see *Synchronizing user data using administrative commands*.

ForumsMemberService.getMemberExtIdByLogin\("login"\)
:   For more information, see *Synchronizing user data using administrative commands*.

ForumsMemberService.inactivateMemberByEmail\("email"\)
:   For more information, see *Synchronizing user data using administrative commands*.

ForumsMemberService.inactivateMemberByExtId\("externalID"\)
:   For more information, see *Synchronizing user data using administrative commands*.

ForumsMemberService.syncAllMembersByExtId\( \{"updateOnEmailLoginMatch": \["true" \| "false"\] \} \)
:   For more information, see *Synchronizing user data using administrative commands*.

ForumsMemberService.syncMemberByExtId\("currentExternalId"\[, \{"newExtId" : "id-string" \[, "allowExtIdSwap" : \["true" \| "false"\] \] \} \] \)
:   For more information, see *Synchronizing user data using administrative commands*.

ForumsMemberService.syncMemberExtIdByEmail\("email" \[, \{ "allowInactivate" : \["true" \| "false"\] \} \]\)
:   For more information, see *Synchronizing user data using administrative commands*.

ForumsMemberService.syncMemberExtIdByLogin\("name" \[, \{"allowInactivate": \["true" \| "false"\] \} \]\)
:   For more information, see *Synchronizing user data using administrative commands*.

## ForumsScheduler commands {#ForumsScheduler .section}

ForumsScheduler.getTaskDetails\(String taskName\)
:   Returns information about the scheduled task, specified by taskName. Forums currently has a single managed task – TrashAutoPurgeJob.

    The values that are returned are server time, next scheduled run time, status \(SCHEDULED, RUNNING, SUSPENDED\), and task name. When the task is paused, then the status parameter shows as SUSPENDED instead of SCHEDULED. SUSPENDED means that the task is not scheduled to run.

    For example:

    ```
    ForumsScheduler.getTaskDetails("TrashAutoPurgeJob")
    ```

    The resulting output looks similar to the following example:

    ```
    {currentServerTime=Wed Feb 03 14:21:47 EST 2010, 
    nextFireTime=Sun Feb 07 02:00:00 EST 2010, 
    status=SCHEDULED, taskName=TrashAutoPurgeJob}
    ```

ForumsScheduler.pauseSchedulingTask\(String taskName\)
:   Temporarily pauses the specified task and stops it from running.

    When you pause a scheduled task, the task remains in the suspended state even after you stop and restart Forums or the IBM WebSphere Application Server. To resume the task, run the ForumsScheduler.resumeSchedulingTask\(String taskName\) command.

    If the task is running, it continues to run but is not scheduled to run again. If the task is already suspended, this command has no effect.

    For example:

    ```
    ForumsScheduler.pauseSchedulingTask("TrashAutoPurgeJob")
    ```

    When a task is paused, a status message similar to the following is written to the SystemOut.log file:

    ```
    [2/3/10 14:28:10:782 EST] 0000002f ForumsNotific I   CLFWY0134I: Forums scheduled task 'TrashAutoPurgeJob' fired event 'TaskNotificationInfo.SUSPENDED'
    ```

ForumsScheduler.resumeSchedulingTask\(String taskName\)
:   If the task is suspended, puts the task in the scheduled state. If the task is not suspended, this command has no effect.

    When a task is resumed, it does not run immediately; it runs at the time when it is next scheduled to run.

    For example:

    ```
    ForumsScheduler.resumeSchedulingTask("TrashAutoPurgeJob")
    ```

    Resuming a paused task causes the following status message to be written to the SystemOut.log file:

    ```
    [2/3/10 14:28:25:407 EST] 00000051 ForumsNotific I   CLFWY0134I: Forums scheduled task 'TrashAutoPurgeJob' fired event 'TaskNotificationInfo.RESUMED'
    ```

## ForumsService commands {#ForumsService .section}

ForumsService.deleteForums\(java.util.Vector forums\)
:   Moves the specified forums to the Trash view. Forums in the Trash view can be restored if they are restored before the trash is emptied. The command returns a java.util.Vector, where each object in the vector is a java.util.Hashtable that describes a forum that cannot be deleted. A returned empty vector indicates complete success.

ForumsService.exportSyncedResourceInfo\(java.lang.String filePath, java.lang.String eventType\)
:   Writes a report that lists all the community forums and identifies their associated communities. The file is saved to the directory path that you specify.

    You can use this command to restore backed-up data. For more information, see *Comparing remote application data with the Communities database*.

    Parameters:

    filePath
    :   A string that specifies the full directory path in which to store the file that is returned by the command. Include the file name in the file path and use forward slashes. For example, C:/temp/forum\_output.xml.

    eventType
    :   Identifies the type of synchronization events to report about. The only supported value for this parameter is community. Specify this value as a singular community and in lowercase.

    For example:

    ```
    ForumsService.exportSyncedResourceInfo("C:/temp/forum_output.xml","community")
    ```

ForumsService.fetchForums\(\)
:   Lists forums by forumID, for example:

    ```
    {forumID=7d53c588-4b34-4497-8556-6f253519891f}
    ```

ForumsService.fetchForumsByName\(java.lang.String forumName\)
:   Retrieves the forum with the specified name, for example:

    ```
    ForumsService.fetchForumsByName("My Forum")
    ```

ForumsService.filterInput\(VectorinputVector, java.lang.String toMatch, java.lang.String attrName\)
:   Filters a source vector of forums to return a new vector that contains a map pair that matches the specified filter criteria.

    This command takes the following parameters:

    inputVector
    :   The source vector that contains the map collection.

    toMatch
    :   A Java regular expression pattern that represents matching criteria. This pattern is used to search the attrName of the forums or entries. The pattern must match the full name and is case-sensitive. You can use the following keys:

        -   Period \(.\) matches any character.
        -   Plus sign \(+\) matches one or more instances of the previous character. For example, .+ matches all sequences of one or more characters.
        -   Asterisk \(\*\) matches zero or more instances of the previous character. For example, \* matches all sequences of characters.
        -   \[chars\] matches any one character within the square brackets \(\[\]\). For example, \[Gg\] matches either an uppercase or lowercase G.
        -   \[A-Z\] matches a range of characters.

    attrName
    :   The key that you want to filter in the map. Possible values include name and forumID. The default value is name.

ForumsService.reCountAllForums\(\)
:   Recalculates the total number of forums in your organization.

    This command does not take any parameters.

ForumsService.reCountForums\(Vector forums\)
:   Recalculates the number of specified forums in your organization, where you specify the forums that you want to recalculate as a vector variable that represents multiple forums.

    For example:

    ```
    ForumsService.reCountForums(myforums)
    ```

## ForumsTopicsService commands {#ForumsTopicsService .section}

ForumsTopicsService.fetchTopics\(\)
:   A list of all forum topics, except those topics that were moved to the trash.

    Returns a java.util.Vector object. Each object in the vector is a java.util.Hashtable object that describes one forum topic.

ForumsTopicsService.fetchTopicsByDate\(String type, String begindate, String enddate\)
:   A list of forum topics that were created or modified in a specified date range. The maximum number of topics in the returned list is 50. If the number is greater than 50, call this method in a loop where the last UUID parameter is the UUID of the 50th topic from the previous list.

    Returns a java.util.Vector object. Each object in the vector is a java.util.Hashtable object that describes one forum topic.

    This command takes the following parameters:

    type
    :   Specifies the date type. The following values are valid:

        -   created
        -   modified

    begindate
    :   Start timestamp of the date range, which is specified in a yyyy.mm.dd format.

    enddate
    :   Finish timestamp of the date range, which is specified in a yyyy.mm.dd format.

    For example:

    ```
    ForumsTopicsService.fetchTopicsByDate("created","2010.05.21","2010.05.22")
    ```

    ```
    ForumsTopicsService.fetchTopicsByDate("modified","2010.05.21","2010.05.22")
    ```

ForumsTopicsService.fetchTopicsCreatedByMember\(String extId, String type\)
:   A list of forum topics that were created by the specified member, except those topics that are in the trash.

    Returns a java.util.Vector object. Each object in the vector is a java.util.Hashtable object that describes one forum topic.

    This command takes the following parameters:

    extId
    :   The external ID of the specified member whose topics you want to retrieve.

    type
    :   The type of external ID specified. The following values are valid:

        -   uuid
        -   email

    For example:

    ```
    ForumsTopicsService.fetchTopicsCreatedByMember("778CE573-78A5-2ECF-8525-7346003DB078","uuid")
    ```

    ```
    ForumsTopicsService.fetchTopicsCreatedByMember("ajones10@example.com","email")
    ```

ForumsTopicsService.fetchTopicById\(String topicuuid\)
:   A forum topic that is identified by the specified universal identifier.

    Returns a java.util.Hashtable object that describes the forum topic.

    This command takes the following parameter:

    topicuuid
    :   The unique identifier of the forum topic.

    For example:

    ```
    ForumsTopicsService.fetchTopicById("15279c53-7bb2-43dd-96ad-2eee2c7f10f8")
    ```

ForumsTopicsService.deleteTopics\(Vector forumtopics\)
:   Moves the specified forum topics to the trash. Forum topics in the Trash view can be restored if they are restored before the trash is emptied.

    Returns a java.util.Vector. Each object in the vector is a java.util.Hashtable that describes a forum topic that cannot be deleted. A returned empty vector indicates complete success.

    This command takes the following parameter:

    forumtopics
    :   Vector of hash tables that describes the forum topics to be deleted.

    For example:

    ```
    ForumsTopicsService.deleteTopics(janetstopics)
    ```

ForumsService.reCountForumById\(java.lang.String uuid\)
:   Recalculates the number of topics in a specific forum, where you specify the forum by its UUID.

    For example:

    ```
    ForumsService.reCountForumById("778CE573-78A5-2ECF-8525-7346003DB078")
    ```

ForumsTopicsService.reCountTopics\(Vector topics\)
:   Recalculates the number of specified topics in your organization, where you specify the topics that you want to recalculate as a vector variable that represents multiple topics.

    For example:

    ```
    ForumsTopicsService.reCountTopics(mytopics)
    ```

## ForumsTrashService commands {#ForumsTrashService .section}

ForumsTrashService.fetchForumsTrash\(\)
:   Retrieves a list of the deleted forums currently in the trash

ForumsTrashService.fetchTopicsTrash\(\)
:   Retrieves a list of the deleted forum topics currently in the trash.

ForumsTrashService.fetchForumsTrashByDate\(String modifySince\)
:   Retrieves a list of the forums that were deleted on a specific date.

    This command takes the following parameter:

    modifySince
    :   A string that specifies the date when the forum was deleted in yyyy.MM.dd format.

ForumsTrashService.filterForumsByName\(VectorinputVector, java.lang.String toMatch\)
:   Filters a source vector of forums to return a new vector that contains a map pair that matches the specified name filter criteria.

    This command takes the following parameters:

    inputVector
    :   The source vector that contains the map collection.

    toMatch
    :   Java regular expression pattern that represents matching criteria. This pattern is used to search the name of the forums. The pattern must match the full name and is case-sensitive. You can use the following keys:

        -   Period \(.\) matches any character.
        -   Plus sign \(+\) matches one or more instances of the previous character. For example, .+ matches all sequences of one or more characters.
        -   Asterisk \(\*\) matches zero or more instances of the previous character. For example, \* matches all sequences of characters.
        -   \[chars\] matches any one character within the square brackets \(\[\]\). For example, \[Gg\] matches either an uppercase or lowercase G.
        -   \[A-Z\] matches a range of characters.

ForumsTrashService.purgeForumsTrash\(vector hashtable\)
:   Purges the specified forums from the trash, where you specify the forums that you want to delete by using the hashtable parameter.

    For example:

    ```
    ForumsTrashService.purgeForumsTrash(forumtrash)
    ```

ForumsTrashService.purgeTopicsTrash\(vector hashtable\)
:   Purges the specified forum topics from the trash, where you specify the topics that you want to delete by using the hashtable parameter.

    For example:

    ```
    ForumsTrashService.purgeTopicsTrash(topictrash)
    ```

ForumsTrashService.undeleteForumsTrash\(vector hashtable\)
:   Restores a deleted forum or forums, where you specify the forum or forums that you want to restore by using the hashtable parameter.

    For example:

    ```
    ForumsTrashService.undeleteForumsTrash(forumsTrash)
    ```

ForumsTrashService.undeleteTopicsTrash\(vector hashtable\)
:   Restores a deleted forum topic or topics, where you specify the topic or topics that you want to restore by using the hashtable parameter.

    For example:

    ```
    ForumsTrashService.undeleteTopicsTrash(topictrash)
    ```

**Parent topic:**[Running Forums administrative commands](../admin/t_admin_forums_changing_admin.md)

**Related information**  


[Comparing remote application data with the Communities database](../admin/t_admin_communities_sync_remote_apps.md)

[Running administrative commands](../admin/t_admin_common_edit_admin_props.md)

