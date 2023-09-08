# Communities administrative commands {#r_admin_communities_admin_props .reference}

Use the commands that are listed to administer Communities. No file checkout or server restart is needed when you use these commands.

## Overview { .section}

The following sections define the commands that you can use when you work with Communities. Each section describes the commands for a specific service. The commands are listed in alphabetical order. See also [Synchronizing user data using administrative commands](c_admin_common_sync_via_admin_commands1.md) for information about how to synchronize user data between the HCL Connections application membership tables and the configured directory for the deployment.

-   [CommunitiesListService](r_admin_communities_admin_props.md#CommunitiesListService)
-   [CommunitiesMemberService](r_admin_communities_admin_props.md#CommunitiesMemberService)
-   [CommunitiesQEventService](r_admin_communities_admin_props.md#CommunitiesQEventService)
-   [CommunitiesRemoteAppService](r_admin_communities_admin_props.md#CommunitiesRemote)
-   [CommunitiesScheduler](r_admin_communities_admin_props.md#CommunitiesScheduler)
-   [CommunitiesService](r_admin_communities_admin_props.md#CommunitiesService)

## CommunitiesListService commands {#CommunitiesListService .section}

**CommunitiesListService.filterListById\(List list, String filter\)**

Returns a new list containing only the communities and subcommunities whose ID matches the regular expression filter.

For example:

```
wwsadmin>all=CommunitiesService.fetchAllComm()
wsadmin>CommunitiesListService.filterListById(all, 
    "c6a2c680-5933-4efa-9a14-be1723445d30")
```

This example returns a list of all the communities and subcommunities and then filters the results by ID to list only the communities and subcommunities where the ID matches the one specified.

**CommunitiesListService.filterListByName\(List list, String filter\)**
    
Returns a new list containing only the communities and subcommunities whose names match the regular expression filter.

For example:

```
wsadmin>allComm=CommunitiesService.fetchAllComm()
wsadmin>CommunitiesListService.filterListByName(allComm,"My Community Name")
```

This example returns a list of all communities and subcommunities using the `fetchAllComm` command \(command is set to a variable that will be used in the next command\) and then filters the results to get the information for a particular community or subcommunity.

**CommunitiesListService.filterListByType\(List list, String filter\)**
  
Returns a new list containing only the communities and subcommunities whose type \(private, public, or publicInviteOnly\) matches the regular expression filter.

For example:

```
wsadmin>commByMember=CommunitiesService.fetchCommByMember("jane_smith@company.com")
wsadmin>CommunitiesListService.filterListByType(commByMember,"publicInviteOnly")
```

This example retrieves a list of all the communities and subcommunities for a particular user \(in this case Jane Smith\) and then filters that list to display all the user's communities and subcommunities that are publicInviteOnly. The fetch command is set to a variable that will be used in the listService command.

## CommunitiesMemberService commands {#CommunitiesMemberService .section}

For details on the following, see [Synchronizing user data by using administrative commands](c_admin_common_sync_via_admin_commands1.md).

-   CommunitiesMemberService.getMemberExtIdByEmail\("email"\)
-   CommunitiesMemberService.getMemberExtIdByLogin\("login"\)   
-   CommunitiesMemberService.inactivateMemberByEmail\("email"\)
-   CommunitiesMemberService.inactivateMemberByExtId\("externalID"\)
-   CommunitiesMemberService.syncAllMembersByExtId\( \{"updateOnEmailLoginMatch": \["true" \| "false"\] \} \)
-   CommunitiesMemberService.syncBatchMemberExtIdsByEmail\("emailFile" \[, \{"allowInactivate" : \["true" \| "false"\] \} \]\)
-   CommunitiesMemberService.syncBatchMemberExtIdsByLogin\("loginFile" \[, \{"allowInactivate" : \["true" \| "false"\] \} \]\)
-   CommunitiesMemberService.syncMemberByExtId\("currentExternalId"\[, \{"newExtId" : "id-string" \[, "allowExtIdSwap" : \["true" \| "false"\] \] \} \] \)
-   CommunitiesMemberService.syncMemberExtIdByEmail\("email" \[, \{ "allowInactivate" : \["true" \| "false"\] \} \]\)
-   CommunitiesMemberService.syncMemberExtIdByLogin\("name" \[, \{ "allowInactivate" : \["true" \| "false"\] \} \]\)

## CommunitiesQEventService commands {#CommunitiesQEventService .section}

**CommunitiesQEventService.clearQueuedEventByEventId\(String eventId\)**
    
Clears queued lifecycle replay events with the specified event ID, where eventId is a string. The events are removed from the queue and are not processed.

The return value is the number of events that were cleared.

For example:

```
CommunitiesQEventService.clearQueuedEventsByEventId
    ("2d93497d-065a-4022ae25-a4b52598d11a")
```

**CommunitiesQEventService.clearQueuedEventsByRemoteAppDefId\(String remoteAppDefId\)**
    
Clears queued lifecycle replay events with the specified associated application ID, where remoteAppDefId is one of the following: Activities, Blog, IdeationBlog, Files, Forum, Wiki, and StatusUpdates. The application IDs are case-sensitive and must be entered as indicated in this documentation.

The return value is the number of events that were cleared.

For example:

```
CommunitiesQEventService.clearQueuedEventsByRemoteAppDefId("Wiki")
```

**CommunitiesQEventService.clearQueuedEventsByResourceId\(String resourceType, String resourceId\)**
    
Clears queued lifecycle replay events with the specified resource ID, where resourceType and resourceId are both strings. The events are removed from the queue and are not processed.

The resourceType parameter is always set to "community". The resourceId parameter is a value that can be obtained by using one of the CommunitiesQEventService.viewQueuedEvents commands.

The return value is the number of events that were cleared.

For example:

```
CommunitiesQEventService.clearQueuedEventsByResourceId("community", 
    "e952cf0c-a86c-4e26-b1e0-f8bf40a75804")
```

**CommunitiesQEventService.clearQueuedEventsByResourceType\(String resourceType\)**
    
Clears queued lifecycle replay events with the specified resource type, where resourceType is a string. The events are removed from the queue and are not processed.

The resourceType parameter is always "community".

The return value is the number of events that were cleared.

For example:

```
CommunitiesQEventService.clearQueuedEventsByResourceType("community")
```

**CommunitiesQEventService.retryQueuedEventsByRemoteAppDefId\(String remoteAppDefId\)**
    
Retries queued lifecycle replay events with the specified associated application ID, where remoteAppDefId is one of the following: Activities, Blog, IdeationBlog, Files, Forum, Wiki, and StatusUpdates. The application IDs are case-sensitive and must be entered as indicated in this documentation.

The return value is either 1 or 0. 1 indicates success; 0 indicates failure.

For example:

```
CommunitiesQEventService.retryQueuedEventsByRemoteAppDefId("Wiki")
```

**CommunitiesQEventService.retryQueuedEventsByResourceId\(String resourceType, String resourceId\)**
Retries queued lifecycle replay events with the specified resource type and resource ID, where resourceType and resourceId are both strings.

The resourceType parameter is always set to "community". The resourceId parameter is a value that can be obtained by using one of the CommunitiesQEventService.viewQueuedEvents commands.

The return value is either 1 or 0. 1 indicates success; 0 indicates failure.

For example:

```
CommunitiesQEventService.retryQueuedEventsByResourceId("community", 
    "e952cf0c-a86c-4e26-b1e0-f8bf40a75804")
```

**CommunitiesQEventService.retryQueuedEventsByResourceType\(String resourceType\)**
    
Retries queued lifecycle replay events with the specified resource type, where resourceType is a string. The value of resourceType is always "community".

The return value is either "retry succeed" or 0. 0 indicates failure.

For example:

```
CommunitiesQEventService.retryQueuedEventsByResourceType("community")
```

**CommunitiesQEventService.viewQueuedEventsByRemoteAppDefId\(String remoteAppDefId, HashMap lastEvent, int maxRows\)**

Lists the queued lifecycle replay events that are associated with the specified remote application ID, where:

    -   remoteAppDefId is one of the following: Activities, Blog, IdeationBlog, Files, Forum, Wiki, and StatusUpdates. The application IDs are case-sensitive and must be entered as indicated in this documentation.
    -   lastEvent specifies the last row of the previous batch. This parameter is a HashMap object. To obtain the first batch, specify None.
    -   maxRows is the number of rows to be retrieved and viewed with a single command. Use maxRows when there are many rows, 200, for example, to break up both the database reads and the display into batches.

This command returns a HashMap that is the last viewed row. When there are no more rows, the value None is returned. This parameter makes it straightforward to loop over all rows a few at a time.

For example:

```
CommunitiesQEventService.viewQueuedEventsByRemoteAppDefId("Blog", None, 100)
```

To display all queued events of remoteAppDefId type Activities in batches of 10, when there are 200 entries, you might code in Jython:

```
lastRow = CommunitiesQEventService.viewQueuedEventsByRemoteAppDefId
    ("Activities", None, 10) while (lastRow != None)
lastRow = CommunitiesQEventService. viewQueuedEventsByRemoteAppDefId
    ("Activities", lastRow, 10)
```

**CommunitiesQEventService.viewQueuedEventsByRemoteAppDefIdAndEventType\(String remoteAppDefId, String eventType, HashMap lastEvent, int maxRows\)**

Lists the queued lifecycle replay events that are associated with the specified remote application ID, where:

    -   remoteAppDefId is one of the following: Activities, Blog, IdeationBlog, Files, Forum, Wiki, and StatusUpdates. The application IDs are case-sensitive and must be entered as indicated in this documentation.
    -   eventType specifies the event type to limit the query to.
    -   lastEvent specifies the last row of the previous batch. This parameter is a HashMap object. To obtain the first batch, specify None.
    -   maxRows is the number of rows to be retrieved and viewed with a single command. Use maxRows when there are many rows, 200, for example, to break up both the database reads and the display into batches.

This command returns a HashMap that is the last viewed row for the specified event type. When there are no more rows, the value None is returned. This parameter makes it straightforward to loop over all rows a few at a time.

For example:

```
CommunitiesQEventService.viewQueuedEventsByRemoteAppDefIdAndEventType("Blog", "community.updated", None, 100)
```

To display all queued events of remoteAppDefId type Activities in batches of 10, when there are 200 entries, you might code in Jython:

```
lastRow = CommunitiesQEventService.viewQueuedEventsByRemoteAppDefIdAndEventType
    ("Activities", "community.updated", None, 10) 
while (lastRow != None)
lastRow = CommunitiesQEventService.viewQueuedEventsByRemoteAppDefIdAndEventType
    ("Activities", "community.updated", lastRow, 10)
```

**CommunitiesQEventService.viewQueuedEventsByResourceId\(String resourceType, String resourceId, HashMap lastEvent, int maxRows\)**

Lists the queued lifecycle replay events with the specified resource type and resource ID, where:

    -   resourceType is the string "community".
    -   resourceId is the communityUuid. This parameter is a string.
    -   lastEvent is a HashMap object.
    -   maxRows is the number of rows to be retrieved and viewed with a single command. Use maxRows when there are many rows, 200, for example, to break up both the database reads and the display into batches.

This command returns a HashMap, which is the last viewed row. When there are no more rows, the value None is returned. This parameter makes it straightforward to loop over all rows a few at a time.

For example:

```
CommunitiesQEventService.viewQueuedEventsByResourceId
    ("community", "e952cf0c-a86c-4e26-b1e0-f8bf40a75804", None, 100)
```

For example, you might use the following Jython code to display all queued events of resourceType "community" and resourceId b46300c7-7837-4ba3-b26b-3fcf67a75bba, in batches of 10 when there are 200 entries:

```
lastRow = CommunitiesQEventService.viewQueuedEventsByResourceId
    ("community", "b46300c7-7837-4ba3-b26b-3fcf67a75bba", None, 10)
while (lastRow != None)
lastRow = CommunitiesQEventService.viewQueuedEventsByResourceId
    ("community", "b46300c7-7837-4ba3-b26b-3fcf67a75bba", None, 10)
```

**CommunitiesQEventService.viewQueuedEventsByResourceType\(String resourceType, HashMap lastEvent, int maxRows\)**

Lists the queued lifecycle replay events with the specified resource type, where:

    -   resourceType is the string "community". 
    -   lastEvent specifies the last row of the previous batch. This parameter is a HashMap object. To obtain the first batch, specify None.
    -   maxRows is the number of rows to be retrieved and viewed with a single command. Use maxRows when there are many rows, 200, for example, to break up both the database reads and the display into batches.

For example:

```
CommunitiesQEventService.viewQueuedEventsByResourceType("community", None, 100)
```

This command returns a HashMap that is the last viewed row. When there are no more rows, the value None is returned. This parameter makes it straightforward to loop over all rows a few rows at a time.

For example, you might use the following Jython code to display all queued events of resourceType community in batches of 10 when there are 200 events:

```
lastRow = CommunitiesQEventService.viewQueuedEventsByResourceType
    ("community", None, 10)
    while (lastRow != None)
    lastRow = CommunitiesQEventService.viewQueuedEventsByResourceType
    ("community", lastRow, 10)
```

**CommunitiesQEventService.viewQueuedEventsSummary\(\)**

Lists a summary of all of the lifecycle replay events that are currently queued for processing.

## CommunitiesRemoteAppService commands {#CommunitiesRemote .section}

-   **CommunitiesRemoteAppService.resyncRemoteAppsForCommunity\("communityUuid"\)**
-   **CommunitiesRemoteAppService.resyncRemoteAppsForCommunityAndWidget\("communityUuid", "widgetDefId"\)**
-   **CommunitiesRemoteAppService.resyncRemoteAppsForAllCommunities\("widgetDefId"\)**
-   **CommunitiesRemoteAppService.restartResyncRemoteAppsForAllCommunities\("lastCommunityUuid", "widgetDefId"\)**

For details on these four commands, see [Synchronizing remote application data with the communities database](t_admin_communities_synch_remote_app.md).

**CommunitiesRemoteAppService.generateSyncReports\(String syncedResourceInfoFilepath, String outputDirPath\)**
   
```
CommunitiesRemoteAppService.generateSyncReports\(String syncedResourceInfoFilepath, String outputDirPath\)
```
Where:

-   *syncedResourceInfoFilepath* is the full path and file name of the output XML file that was generated by using the **exportSyncedResource** command. \(For more information about this command, see [Comparing remote application data with the Communities database](t_admin_communities_sync_remote_apps.md).\) Use forward slashes as the path separator. For example, `c:/temp-dir/activitiesOutput.xml` on Microsoft™ Windows™ or /opt/temp-dir/blogsOutput.xml on Linux™.

-   *outputDirPath* is the full path to the subdirectory where you want to create the two output files that are generated from this command. You must use forward slashes; not backslashes as the path separator. For example, c:/temp-dir on Microsoft Windows or /opt/temp-dir on Linux.

For example:

```
CommunitiesRemoteAppService.generateSyncReports("c:/temp-dir/activitiesOutput.xml", "c:/temp-dir")
```

Using the sample command previously shown, the two output files, `Activities\_communityDifferences.html` and `Activities\_orphanedRemoteApplications.html`, are created in the `c:/temp-dir` subdirectory.

## CommunitiesScheduler commands {#CommunitiesScheduler .section}

**CommunitiesScheduler.getTaskDetails\(String taskName\)**

Returns information about the scheduled task specified by taskName. The task names are LifecycleRetryQueuedEvents and EventLogCleanup.

The values returned in the HashMap are the next scheduled fire time, server time, status \(SCHEDULED, RUNNING, SUSPENDED\), and task name. SUSPENDED means that the task is not scheduled to run.

For example:
```
CommunitiesScheduler.getTaskDetails("LifecycleRetryQueuedEvents")
```

**CommunitiesScheduler.pauseSchedulingTask\(String taskName\)**
    
Puts the task in the suspended state. When you pause a scheduled task, that task remains in the suspended state even after you stop and restart Communities or the WebSphere® Application Server. The task names are LifecycleRetryQueuedEvents and EventLogCleanup. Run the CommunitiesScheduler.resumeSchedulingTask command to get the scheduled task running again.

If the task is currently running when you use this command, the task continues to run but is not scheduled to run again. If the task is already suspended, this command has no effect.

The return value is either 1 or 0. 1 indicates success; 0 indicates failure.

For example:
```
CommunitiesScheduler.pauseSchedulingTask("LifecycleRetryQueuedEvents")
```

**CommunitiesScheduler.resumeSchedulingTask\(String taskName\)**
    
If the task is suspended, puts the task in the scheduled stated. If the task is not suspended, this command has no effect. The task names are LifecycleRetryQueuedEvents and EventLogCleanup.

The return value is either 1 or 0. 1 indicates success; 0 indicates failure.

For example:

```
CommunitiesScheduler.resumeSchedulingTask("LifecycleRetryQueuedEvents")
```

## CommunitiesService commands {#CommunitiesService .section}

**CommunitiesService.addAlternateOwner\(String directoryUuid, String alternateDirectoryUuid, Boolean removeOriginal\)**
    
Adds the user with the specified alternateDirectoryUuid as an owner to every community and subcommunity owned by the user with the specified directoryUuid \(external ID\). This command takes the following parameters:

-   **directoryUuid**: A string that specifies the directory UUID \(external ID\) of an existing community or subcommunity owner.

-   **alternateDirectoryUuid**: A string that specifies the directory UUID \(external ID\) of the person who you want to add as the alternate owner.

-   **removeOriginal**: A Boolean value that determines whether the person specified using the directoryUuid \(external ID\) parameter is removed from the membership of their communities and subcommunities. When set to true, the user with the specified directoryUuid is removed from their community and subcommunity membership. When set to false, the user with the specified directoryUuid remains listed as an owner of their communities and subcommunities.

-   **orgId**: A string that identifies the organization to which the Community belongs.

For example:

```
CommunitiesService.addAlternateOwner
("193F1CE8-E10A-4B9A-B933-C8ECD6C072E4", 
"EC8A89C0-F41D-102C-9B60-F225BC6C4AF4", "true")
```
```
CommunitiesService.addAlternateOwner
("193F1CE8-E10A-4B9A-B933-C8ECD6C072E4", 
"EC8A89C0-F41D-102C-9B60-F225BC6C4AF4", 
"true", "0000000043")
```

To obtain the value to use for the directoryUuid and alternateDirectoryUuid parameters, you can use the following command:

```
CommunitiesMemberService.getMemberExtIdByEmail("email_address")
```

In the following example, for any community \(or subcommunity\) where Paul Smith is an owner, user Alice Lee is added to the membership list with owner access, and Paul Smith is removed from the membership list:

```
wsadmin>CommunitiesMemberService.getMemberExtIdByEmail
("paul_smith@example.com") 
510b99c0-0123-1010-8989-f78755f7e0ed
wsadmin>
wsadmin>CommunitiesMemberService.getMemberExtIdByEmail
("alice_lee@example.com")
510b99c0-0101-102e-8934-f78755f7e0ed
wsadmin>
wsadmin>CommunitiesService.addAlternateOwner
("510b99c0-0123-1010-8989-f78755f7e0ed",
"510b99c0-0101-102e-8934-f78755f7e0ed", "true")
```

**CommunitiesService.addMembersToCommunityByEmail\(String communityUuid, Integer memberRole, List emailAddresses\)**

Adds members to an existing community or subcommunity.

**Note**: When you use this command to add owners or members to a subcommunity, the users that you are adding must belong to the parent community.

You cannot exceed the maximum number of members limit that is specified in the explicitMembershipEntityLimit property of the communities-config.xml file. See [Communities configuration properties](r_admin_communities_config_props.md).

You use this command in two steps. First, create a comma-separated list of users \(using their email addresses\) that you want to add to an existing community or subcommunity and assign this list to a variable. This variable is then used as input into the **addMembersToCommunity** command.

**memberRole**: Valid settings are 0 \(member\) or 1 \(owner\). Do not enclose this setting in quotation marks.

For example:

```
wsadmin>threemembers=["alex_jones@example.com", "mary_smith@example.com", "paul_henderson@example.com"]
wsadmin>CommunitiesService.addMembersToCommunityByEmail("5742c4c8-0010-4e6e-abdb-65015e8a22e1",0,threemembers)
```

```
wsadmin>threemembers=["alex_jones@example.com", "mary_smith@example.com", "paul_henderson@example.com"]
wsadmin>CommunitiesService.addMembersToCommunityByEmail("5742c4c8-0010-4e6e-abdb-65015e8a22e1",0,threemembers, "0000000043")
```

**Note:** You could use the *communityName* parameter instead of *communityUuid*. However, this is not recommended because the command fails if more than one community has the same community name. If the community name that you provide is not unique, an error similar to the following displays:

```
WASX7015E: Exception running command: 
"CommunitiesService.addMembersToCommunityByEmail
("My community",0,threemembers)"; exception information:
javax.management.RuntimeMBeanException
java.lang.IllegalArgumentException: java.lang.IllegalArgumentException: 
CLFRM0091E: Multiple communities found with name: My community
```

When you see an error like the previous one, instead of entering the name of the community or subcommunity in the command, use the community UUID. For example:

```
wsadmin>CommunitiesService.addMembersToCommunityByEmail("5742c4c8-0010-4e6e-abdb-65015e8a22e1", 0,threemembers)
```

**CommunitiesService.addMembersToCommunityByMemberUuid\(String communityUuid, Integer memberRole, List UUID of member\)**
    
Adds members to an existing community or subcommunity. Use this command when you want to add users to a community's membership list, but they don't have an email address. The users that you are adding must belong to the parent community in order for them to be added to the subcommunity.

**Note:** The member's UUID is the external LDAP identifier for a specific user. Use one of the following commands to return the user's external ID for use in the previous command:

-   **CommunitiesMemberService.getMemberExtIdByEmail\("email"\)**
-   **CommunitiesMemberService.getMemberExtIdByLogin\("login"\)**

You cannot exceed the maximum number of members limit that is specified in the explicitMembershipEntityLimit property of the `community-config.xml file. See [Communities configuration properties](r_admin_communities_config_props.md).

You use this command in two steps. First, create a comma-separated list of users \(using their UUID, the external LDAP ID\) that you want to add to an existing community or subcommunity and assign this list to a variable. This variable is then used as input into the **addMembersToCommunity** command.

**memberRole**: Valid settings are 0 \(member\) or 1 \(owner\). Do not enclose this setting in quotation marks.

For example:

```
wsadmin>onemember=["84b4897d-b4f8-4d95-9621-50bcaa2fd3ca"]
wsadmin>CommunitiesService.addMembersToCommunityByMemberUuid("5742c4c8-0010-4e6e-abdb-65015e8a22e1",0,onemember)
```

```
wsadmin>onemember=["84b4897d-b4f8-4d95-9621-50bcaa2fd3ca"]
wsadmin>CommunitiesService.addMembersToCommunityByMemberUuid("5742c4c8-0010-4e6e-abdb-65015e8a22e1",0,onemember, "0000000043")
```

The `onemember` parameter is the `extid(user)`.

**Note:** You could use the communityName parameter instead of communityUuid. However, this is not recommended because the command fails if more than one community has the same community name. If the community name that you provide is not unique, an error similar to the following displays:

```
WASX7015E: Exception running command: 
"CommunitiesService.addMembersToCommunityByEmail
("My community",0,threemembers)"; exception information:
javax.management.RuntimeMBeanException
java.lang.IllegalArgumentException: java.lang.IllegalArgumentException: 
CLFRM0091E: Multiple communities found with name: My community
```

When you see an error like the previous one, instead of entering the name of the community or subcommunity in the command, enter the community UUID instead. For example:

```
wsadmin>CommunitiesService.addMembersToCommunityByEmail("5742c4c8-0010-4e6e-abdb-65015e8a22e1", 0,threemembers)
```

**CommunitiesService.createCommunityWithEmail\(String community name, String ownerName, int memberRole, String dsmlFile\)**
    
Creates a public community whose membership list is initialized from a Directory Services Markup Language \(DSML\) file exported from the LDAP directory. The DSML file must be local to the system running the script. The script parses the DSML file and extracts the mail values. These values are used to populate the membership list of the community. For more information about how to create DSML files from your LDAP directory, see [http://www.dsmltools.org/](http://www.dsmltools.org/).

A typical mail attribute in a DSML file looks like the following:

```
<attr 
name="mail">
<value>john_doe@example.com</value>
</attr>
```

The command takes the following parameters:

-   **communityName**: A string value that specifies the name of the community that you are creating.

-   **ownerName**: A string value that specifies the name of the new community's owner. Enter the email address of the user who will be the owner of the community.

-   **memberRole**: An integer that specifies the role of the users added to the new community. This property can be set to 0 to specify the member role or 1 to specify the owner role. Do not enclose this setting in quotation marks.

-   **dsmlFile**: A string value that specifies that name of the DSML file containing the mail values used to populate the community membership.

In the following example, a community named AJ's Community is created with Ann Jones as the community owner/creator. The command parses the file /opt/myDSML.xml, looks for each of the mail attributes, and then adds those email addresses to the new community with member access.

```
CommunitiesService.createCommunityWithEmail("AJ's Community", "ann_jones@example.com", 0, "/opt/myDSML.xml")
```

**Notes:**

-   This command only creates parent communities; it cannot be used to create subcommunities.

-   This command creates a public community by default. To change the visibility of the community, the community owner must edit the community from the user interface and change the access level to moderated or restricted as needed.

**CommunitiesService.createCommunityWithLoginName\(String communityName, String ownerName, int memberRole, String dsmlFile\)**
    
Creates a public community whose membership list is initialized from a DSML file exported from the LDAP directory. The DSML file must be local to the system running the script. The script parses the DSML XML file and extracts the login name values. These values are used to populate the membership list of the community. For more information about how to create DSML files from your LDAP directory, see [http://www.dsmltools.org/](http://www.dsmltools.org/).

The command takes the following parameters:

-   **communityName**: A string value that specifies the name of the community that you are creating.

-   **ownerName**: A string value that specifies the name of the new community's owner. Enter the loginName of the user who will be the owner of the community.

-   **memberRole**: An integer that specifies the role of the users added to the new community. This property can be set to 0 to specify the member role or 1 to specify the owner role. Do not enclose this setting in quotation marks.

-   **dsmlFile**: A string value that specifies the name of the DSML file containing the loginName values used to populate the community membership.

In the following example, a community named AJ's Community is created with Ann Jones as the community owner/creator. The command parses the file `/opt/myDSML.xml` and looks for each of the login attributes and adds those login names to the new community with member access.

```
CommunitiesService.createCommunityWithLoginName("AJ's Community", "ann_jones", 0, "/opt/myDSML.xml")
```

**Notes:**

-   This command only creates parent communities; it cannot be used to create subcommunities.

-   This command creates a public community by default. To change the visibility of the community, the community owner must edit the community from the user interface and change the access level to moderated or restricted as needed.

**CommunitiesService.fetchAllComm\(\)**  
    
Returns a vector of hash maps of all communities and subcommunities. There is no way to distinguish from the information returned whether the object is a community or subcommunity. Do not run CommunitiesService.fetchAllComm\(\) on large deployments because it loads all communities into memory at once. Instead, run **CommunitiesService.fetchBatchComm\(\)**.

**CommunitiesService.fetchBatchComm\(batchSize, priorLastCommunityId\)**
    
Returns a portion of an ordered list of UUIDs for all communities. The command does not return any details about the communities. It returns only the UUIDs.

The command takes the following parameters:

-   **batchSize** :Uses an integer to indicate how many communities you want returned.

-   **priorLastCommunityId**: Enter the UUID of the last community enclosed by double quotation marks. If you don't have a community id to enter, use either None or "". If you enter `CommunitiesService.fetchBatchComm(5, None)`, the command returns the GUID for the first five communities.

The following example fetches a batch of two communities.  None indicates that it starts with the first community.

```
wsadmin>CommunitiesService.fetchBatchComm(2, None)
fetchBatchComm request processed
[3302c2fa-e16f-4a52-8685-b56c1435d742, 
3e457e81-c9d9-4a20-a71a-6cc336673fab]
```

**CommunitiesService.fetchCommById\(string communityUUID\)**
    
Returns the community or subcommunity with the specified UUID.

You can obtain the UUID for a community or subcommunity by doing one of the following:

-   Using a browser, open the community or subcommunity that you want and copy the UUID from the URL.
-   Run the CommunitiesService.fetchAllComm\(\) wsadmin command to fetch all communities and subcommunities on the server. Copy the UUID from the output.

For example:

```
wsadmin>CommunitiesService.fetchCommById("59d8e5a7-ba0e-488f-8bcd-1f79a994e419")
[{createdBy=[Andy Jones, 2BC32FEF-E736-4C81-986C-30780C5EF8C3], lastMod=6/18/09
3:09:02 PM EDT, description= Community of developers working on JAVA projects 
in our company.  This is a community to share ideas., name=JAVA Developers
community, uuid=59d8e5a7-ba0e-488f-8bcd-1f79a994e419, memberSize=6,
type=publicInviteOnly,tags=[developers, java], created=6/18/09 3:08:48 PM EDT,
lastModBy=[Andy Jones, 2BC32FEF-E736-4C81-986C-30780C5EF8C3]}]
wsadmin>
```

**CommunitiesService.fetchCommByMemberEmail\(String email\)**
    
Returns all the communities and subcommunities that the user of the specified email address or organization is a member of. There is no way to distinguish from the information returned whether the object is a community or subcommunity.

For example:

```
CommunitiesService.fetchCommByMember("john_doe@company.com")
```

```
CommunitiesService.fetchCommByMember("john_doe@company.com", "0000000042")
```

**CommunitiesService.fetchCommByMemberUuid\(String uuid\)**
    
Returns all the communities and subcommunities that the user with the specified UUID or the specified organization is a member of. There is no way to distinguish from the information returned whether the object is a community or subcommunity.

For example:

```
CommunitiesService.fetchCommByMemberUuid("193F1CE8-E10A-4B9A-B933-C8ECD6C072E4")
```

```
CommunitiesService.fetchCommByMemberUuid("193F1CE8-E10A-4B9A-B933-C8ECD6C072E4", "0000000042")
```

**Note:** The Member's UUID is the External LDAP identifier for a specific user. Use one of the following commands to return the user's external ID for use in this command.

-   CommunitiesMemberService.getMemberExtIdByEmail\("email"\)
-   CommunitiesMemberService.getMemberExtIdByLogin\("login"\)

**CommunitiesService.fetchCommByName\(String name\)**

Returns the community or subcommunity with the specified name in the specified organization.

**Note:** There is a maximum of one community in the list, but that list can be used in the other methods that use a list input. If no match is found, the list will be empty.

For example:

```
wsadmin>CommunitiesService.fetchCommByName("Test Community")
```

```
wsadmin>CommunitiesService.fetchCommByName("Test Community" "0000000042")
```

If the name of the community or subcommunity that you enter in this command is not unique, the command fails with an error. If the command fails, use the following command instead:

```
CommunitiesService.fetchCommById(string communityUUID)
```

**CommunitiesService.fetchMember\(List list\)**
    
Returns the input list of communities or subcommunities with an additional property for each community that is the member list for that community.

This command is run in two steps. First, generate a list of data to input into the fetchMember command and assign the list to a variable. The variable is then used as input into the fetchMember command.

For example:

```
wsadmin>allComm=CommunitiesService.fetchCommByName("Test Community")
wsadmin>CommunitiesService.fetchMember(allComm)
```

**CommunitiesService.fetchReference\(List list\)**
    
Adds references \(feeds and bookmarks\) to communities or subcommunities in the list passed into this command and returns a new list with references.

This command is run in two steps. First, use the fetchCommByName command to gather the list of communities and assign the list to a variable. The variable is then used as input into the **fetchReference** command.

For example:

```
wsadmin>allComm=CommunitiesService.fetchCommByName("Test Community")
wsadmin>CommunitiesService.fetchReference(allComm)
```

The results that are returned include any feeds or bookmarks for a community or subcommunity. The name that the user enters when creating the feed or bookmark is also displayed as part of the reference information. For example: `reference=[[Cooking, http://www.cuisineathome.com]]`

Here are sample results from running the command:

```
{createdBy=alex_jones@MyCompany.com, lastMod=2/22/08 
8:43:48 AM EST, description=Community with one bookmark one feed, 
name=Jones Community, uuid=3395f15e-bde7-4151-80ed-ed538d12d00e, 
memberSize=2, reference=[[CNN, http://www.cnn.com], [Ghirardelli 
Chocolate, http://www.ghirardelli.com]], type=publicInviteOnly, 
tags=[chocolate], created=2/22/08 8:42:53 AM EST, lastModBy=
bsmith@MyCompany.com}
```

**CommunitiesService.listComm\(List list\)**
    
Prints the information associated with the communities or subcommunities in the list input to the wsadmin command window in an easy-to-read format. The data printed includes community name, UUID, type, who created it, creation date, last person who modified it, date of last modification, membership list size, and description. If the list includes members, then this command also prints the membership list. If the list includes references, the command also prints the reference information.

This command is run in two steps. First, generate the data to input into the listComm command and assign the list to a variable. The variable is then used as input into the listComm command.

For example:

```
wsadmin>byMember=CommunitiesService.fetchCommByMember("jane_doe@company.com")
wsadmin>CommunitiesService.listComm(byMember)
```

**CommunitiesService.listCommToFile\(List list, String filename\)**
    
Prints the information associated with the communities or subcommunities in the list input to the specified file using an easy-to-read format. The directory to which the file is to be output must already exist. The data printed includes community name, UUID, type, who created it, creation date, last person who modified it, date of last modification, membership list size, and description. If the list includes members, then this command also prints the membership list. If the list includes references, the command also prints the reference information.

This command is run in two steps. First, generate the data to input into the listCommToFile command and assign the list to a variable. The variable is then used as input into the listCommToFile command.

For example:

```
wsadmin>byMember=CommunitiesService.fetchCommByMember("jane_doe@company.com")
wsadmin>CommunitiesService.listCommToFile(bymember,"/temp/CommMembers.txt")

```

**CommunitiesService.removeAllMembershipByDirectoryUuid\(String "directoryUuid"\)**
    
Removes the specified user from any communities and subcommunities to which they belong.

The command takes the following parameters:

-   **directoryUuid**: A string that specifies the directory UUID \(external ID\) of the user whose membership you want to remove.

-   **orgId**: A string that specifies the organization of the user whose membership you want to remove.

If the user is the last owner of a community or subcommunity, they are not removed, and the community or subcommunity is included in the return value for this call. The command returns a vector of hash maps of all the communities and subcommunities where the user was not removed because they are the last owner.

To obtain the directory UUID to use as input, use one of the following commands. Both commands return the user's external ID.

-   CommunitiesMemberService.getMemberExtIdByEmail\("email"\)
-   CommunitiesMemberService.getMemberExtIdByLogin\("login"\)

For example:

```
wsadmin>CommunitiesService.removeAllMembershipByDirectoryUuid("91b3897d-b4f8-4d05-3621-50bcaa22d300")
```

```
wsadmin>CommunitiesService.removeAllMembershipByDirectoryUuid("91b3897d-b4f8-4d05-3621-50bcaa22d300", "0000000042")
```

**CommunitiesService.removeMembersFromCommunityByEmail\(String "communityName", String "variable containing list of email addresses"\)**
    
Removes members from an existing community or subcommunity. Members are identified in a list by their email addresses.

You can remove both owners and members, but you cannot remove the last active owner. You can remove members from a subcommunity, but you cannot remove owners from a subcommunity.

If an email address in the list does not match any member email address, then the command fails and none of the members are removed from the community.

You use this command in two steps. First, create a comma-separated list of users \(by using their email addresses\) who you want to remove from an existing community or sub community. Then, assign this list to a variable.

For example:

```
wsadmin>threemembers=["alex_jones@example.com", "mary_smith@example.com", "paul_henderson@example.com"]
```

Then use this variable as input into the removeMembersFromCommunityByEmail command as the "variable containing list of email addresses" parameter.

For example:

```
wsadmin>CommunitiesService.removeMembersFromCommunityByEmail("Ski Club Community",threemembers)
```

```
wsadmin>CommunitiesService.removeMembersFromCommunityByEmail("Ski Club Community",threemembers, "0000000042")
```

The communityName parameter is case-sensitive so be sure to specify the name of the community or subcommunity exactly.

**CommunitiesService.removeMembersFromCommunityByMemberUuid\(String "communityName", String "variable containing list of UUIDs"\)**
    
Removes members from an existing community or subcommunity. Members are identified in a list by their external ID. Use this command when you want to remove users from a community's membership list, but they do not have an email address.

You can remove both owners and members, but you cannot remove the last active owner. You can remove members from a subcommunity, but you cannot remove owners from a subcommunity.

If a UUID in the list does not match any member UUID in the community, then the command fails and none of the members in the list are removed from the community.

To obtain the directory UUID to use as input for this command, use one of the following commands. Both commands return the user's external ID.

-   CommunitiesMemberService.getMemberExtIdByEmail\("email"\)
-   CommunitiesMemberService.getMemberExtIdByLogin\("login"\)

You use this command in two steps. First, create a comma-separated list of users \(by using their UUID, the external LDAP ID\) who you want to remove from an existing community or sub community.

For example:

```
wsadmin>twomembers=["84b4897d-b4f8-4d95-9621-50bcaa2fd3ca",
    "84b4897d-b4f8-4d95-9621-0bcaa2fd3ca"]
```

Then use this variable as input in to the removeMembersFromCommunityByMemberUuid command as the "variable containing list of Quids" parameter.

For example:

```
wsadmin>CommunitiesService.removeMembersFromCommunityByMemberUuid("Ski Club Community", twomembers)
```

```
wsadmin>CommunitiesService.removeMembersFromCommunityByMemberUuid("Ski Club Community", twomembers, "0000000042")
```

The communityName parameter is case-sensitive so be sure to specify the name of the community or subcommunity exactly.

**CommunitiesService.removeInactiveUsers\(String "Uuid", boolean skipLastModBump\)**
    
Removes all inactive members from the specified community or subcommunity.

The command takes the following parameters:

-   **Uuid**: A string that specifies the UUID of the community from which you want to remove inactive users.

-   **skipLastModBump**: An optional integer that determines whether the community's last modified date, time, and person who last modified it is updated. Set skipLastModBump to 1 if you do not want to update the community's last modified date, time, and person who last modified it. Otherwise, do not specify bSkipCommunityLastModBump or set it to 0 to update the community's last modified date and time. The catalog also shows: **Administrative update by <xxx\>**.

The command removes both owners and members. If all owners are inactive, only members are removed. Also, the command does not remove an inactive owner in a subcommunity if that person is also an owner in the community's parent.

If the UUID specified does not match any community, then the command fails and no inactive members are removed.

For example:

```
wsadmin>CommunitiesService.removeInactiveUsers("84b4897d-b4f8-4d95-9621-50bcaa2fd4ca",1)
```

```
wsadmin>CommunitiesService.removeInactiveUsers("84b4897d-b4f8-4d95-9621-50bcaa2fd4ca")
```

**CommunitiesService.updateCommunityName\(String communityName, String newName\)**
    
Allows you to update an existing community or subcommunity name where:

-   communityName refers to the existing community or subcommunity name, which must be specified exactly.
-   newName is the new name of the community or subcommunity.

Both communityName and newName must be enclosed in double quotation marks \("\).

For example:

```
CommunitiesService.updateCommunityName("JDs Community", "JDs New Name")
```

**Note:** When you use this command, if you get an error telling you that the community or subcommunity name is not unique, enter the UUID instead.

You can obtain the UUID for a community or subcommunity by doing one of the following:

-   Using a browser, open the community or subcommunity that you want and copy the UUID from the URL.
-   Run the CommunitiesService.fetchAllComm\(\) wsadmin command to fetch all communities and subcommunities on the server. Copy the UUID from the output.

**CommunitiesService.updateCommunityDescription\(String communityName, String newDescription\)**
    
Allows you to update \(overwrite\) the description field in an existing community or subcommunity. Any existing description is overwritten by the new text that you enter into this command.

Both communityName and newDescription must be enclosed in double quotation marks \("\).

For example:

```
CommunitiesService.updateCommunityDescription("Ski Community", 
"The purpose of this community is to bring together 
people interested in skiing.")
```

**CommunitiesService.removeWidgetsByWidgetDefIdForAllComm\(String widgetDefId\)**
    
Allows you to remove the specified widget from all communities and subcommunities. widgetDefId corresponds to the defId attribute on <widgetDef\> elements in widgets-config.xml.

**Note:** Use this command with caution, it can delete a lot of data for many widgets. Backup your databases before running.

widgetDefId is a string and must be enclosed in double quotation marks \("\).

For example:

```

wsadmin>CommunitiesService.removeWidgetsByWidgetDefIdForAllComm("Blog")
```

**CommunitiesService.removeAllWidgetsByWidgetDefId\(String communityUuid, String widgetDefId\)**
    
Allows you to remove all instances of the specified widget from the specified community. widgetDefId corresponds to the defId attribute on <widgetDef\> elements in widgets-config.xml.

Both communityUuid and widgetDefId must be enclosed in double quotation marks \("\).

For example:

```

wsadmin>CommunitiesService.removeAllWidgetsByWidgetDefId("c9042339-0019-48da-9df4-de9885665daa","Library")
```

**CommunitiesService.removeReferencesByUri\(String communityName, List referenceURIs\)**
    
Allows you to remove all references to one or more existing bookmarks \(URIs\) from a specified community or subcommunity.

The command requires a two-step process: First, create a comma-separated list of the bookmarks \(URIs\) that you want to remove. These URIs are saved to a variable and this variable is used as input for the removeReferencesByUri command.

Because the URIs are specified as a list, each URI must be enclosed in double quotation marks and separated by commas. All URIs must be enclosed within brackets. The URI that is listed must match exactly the URI that is saved in the community or subcommunity, otherwise the command fails.

The communityName parameter is a string and must be enclosed in double quotation marks \("\).

For example:

```
wsadmin>delete=["http://valid1.url.com", "http://valid2.url.com", "http://valid3.url.com"]
wsadmin>CommunitiesService.removeReferencesByUri("Ski Club Community",delete)
```

**CommunitiesService.removeTagsFromCommunity\(String communityName, List tagNames\)**
    
Allows you to remove tags from an existing community or subcommunity. This command is a two-step process. First, create a comma-separated list of the tags that you want to remove. This list of tags is saved to a variable and the variable is used as input for the removeTagsFromCommunity command.

**Note:** You can remove tags on a community or subcommunity, but you cannot remove tags associated with bookmarks or feeds within a community.

Because the tags are specified as a list, each tag must be enclosed in double quotation marks and separated by commas. All tags must be enclosed within brackets.

The communityName parameter is a string and must be enclosed in double quotation marks \("\).

For example:

```
wsadmin>tags=["snowboard", "mountain"]
wsadmin>CommunitiesService.removeTagsFromCommunity("Ski Club Community", tags)
```

**CommunitiesService.moveSubcommunityToCommunity\("subCommunityUuid"\)**
    
Modifies a subcommunity to become a top-level, stand-alone community.

The command takes the following parameter:

-   **subCommunityUuid**: The UUID of the subcommunity to be made a top-level, stand-alone community.

For example:

```
wsadmin>CommunitiesService.moveSubcommunityToCommunity ("1f524616-a53b-48fb-8e26-ffa1b2ee045f")
```

When the command completes successfully, it returns the following message:

```
moveSubcommunityToCommunity request processed
```

**Notes:** You can get the UUID for a community or subcommunity by taking one of the following actions:

-   Using a browser, open the community or subcommunity that you want and copy the UUID from the URL.
-   Run the CommunitiesService.fetchAllComm\(\) wsadmin command to fetch all communities and subcommunities on the server. Copy the UUID from the output.

When you use moveSubcommunityToCommunity, the new top-level community retains the following characteristics of the original subcommunity:

-   Original access level \(public, moderated, or restricted\)
-   Membership list
-   Community logo \(picture\), tags, and description
-   Original "internal" state \(external, or internal\)
-   Business Owner and Organization ID
-   Community theme
-   Original start page setting
-   Any existing web addresses

    **Note:** The URL to access this community changes slightly because the parent handle no longer exists.

**CommunitiesService.moveCommunityToSubcommunity\("parentCommunityUuid", "communityToMoveUuid"\)**
    
Reparents a community to be the subcommunity of another community.

The command takes the following parameters:

-   **parentCommunityUuid**: The UUID of the parent community.

-   **CommunityToMoveUuid**: The UUID of the existing community that becomes a child of the community that is specified in the parentCommunityUuid parameter.

For example:

```
wsadmin>CommunitiesService.moveCommunityToSubcommunity("1f524616-a53b-48fb-8e26-ffa1b2ee045f", 
"1f524616-a53b-48fb-8e26-ffa4b2ee095f")
```

The reparented subcommunity is modified as follows:

-   The new subcommunity synchronizes to the new parent's "internal" state.
-   The parent community Business Owner replaces the new subcommunity's Business Owner.
-   The new subcommunity with existing web address is cleared.

    Any "Invited" users on the subcommunity that have not accepted or declined the invitation are removed. Click the **Invitations** tab on a community. You can see the invited users the Members page.

When you use moveCommunityToSubommunity, the new subcommunity retains the following characteristics of the original top-level community:

-   Start page setting.
-   Community logo \(picture\), tags, and description.
-   Community theme.

Membership relationships between parent and subcommunity are as follows:

-   Community owners in the parent are copied to the new subcommunity as owners.
-   Subcommunity members and owners are copied to the new parent as members.

**Note:** Using moveCommunityToSubcommunity generates an error if you attempt the following reparenting actions:

-   Reparent a community that has subcommunities.
-   Reparent a community that is already a subcommunity

**CommunitiesService.getSoftDeletedCommunityUuidList\("date"\)**
    
Returns a list of community UUIDs in the trash that are older than the date specified.

The command takes the following parameter:

-   **Date**: Date in YYYY-MM-DD format.

For example:

```
wsadmin>CommunitiesService.getSoftDeletedCommunityUuidList("2013-11-20")
[{lastModBy=[Amy Jones, 55d04dc0-0101-102e-8ac8-f78755f7e0ed], 
created=11/19/13 8:33:09 AM EST, tags=[], type=public, name=delete test, 
uuid=ea546678-94d7-4d 24-9f23-a8ae0fd8b824, memberSize=1, lastMod=11/19/13 
8:33:33 AM EST, description=defect verification , 
createdBy=[Amy Jones, 55d04dc0-0101-102e-8ac8-f78755f7e0ed]}]

```

You can also get a list of all the communities and subcommunities in trash as follows:

```
wsadmin>CommunitiesService.getSoftDeletedCommunityUuidList()
```

**CommunitiesService.unDeleteCommunity\("communityUuid"\)**
    
Restores the community from trash.

The command takes the following parameter:

-   **communityUuid**: UUID of the community or subcommunity to be restored.

For example:

```
wsadmin>CommunitiesService.unDeleteCommunity("ea546678-94d7-4d 24-9f23-a8ae0fd8b824")
unDeleteCommunity request processed
```

**Note:** If the community you are restoring has subcommunities that are also in trash, only the parent community is restored. You must restore the subcommunities separately. If the community you are restoring is a subcommunity and its parent community is also in trash, the subcommunity is not restored. You must restore the parent community before any of its child subcommunities.

**Parent topic:** [Running Communities administrative commands](../admin/t_admin_communities_changing_admin.md)

**Related information**  


[Synchronizing user data by using administrative commands](../admin/c_admin_common_sync_via_admin_commands1.md)

[Synchronizing remote application data with the Communities database](../admin/t_admin_communities_synch_remote_app.md)

[Comparing remote application data with the Communities database](../admin/t_admin_communities_sync_remote_apps.md)

[Running administrative commands](../admin/t_admin_common_edit_admin_props.md)

[Communities configuration properties](../admin/r_admin_communities_config_props.md)

