# Activities administrative commands {#r_admin_act_administrative_props .reference}

Use administrative commands to run administrative tasks on the server.

## Administrative commands { .section}

The following sections define the administrative commands that you can use when working with Activities. Each section describes the commands for a specific service. The MemberService and ActivityService commands are described in the first two sections because they are the most commonly used services. The remaining sections describe the remaining services in alphabetic order.

-   [ActivitiesMemberService](r_admin_act_administrative_props.md#actMemberService)
-   [ActivityService](r_admin_act_administrative_props.md#actService)
-   [AccessControlService](r_admin_act_administrative_props.md#aclService)
-   [ActivitiesConfigService](r_admin_act_administrative_props.md#actConfigService)
-   [ActivitiesScheduler](r_admin_act_administrative_props.md#actScheduler)
-   [ArchiveService](r_admin_act_administrative_props.md#actArchiveService)
-   [ListService](r_admin_act_administrative_props.md#actListService)
-   [StatisticsService](r_admin_act_administrative_props.md#actStatsService)
-   [TrashCollectionService](r_admin_act_administrative_props.md#actTrash)

## ActivitiesMemberService {#actMemberService .section}

**Note:**

-   The `ActivitiesMemberService` is the same as the MemberService. MemberService was deprecated in version 2.5.
-   The `ActivitiesMemberService.updateMemberExtId\(java.lang.String oldId, java.lang.String newId\)` command was deprecated in version 2.5.
-   The `ActivitiesMemberService.syncAllMemberExtIds\(\)` and `ActivitiesMemberService.updateMember\(java.util.Hashtable pb\)` commands were deprecated in version 3.

**ActivitiesMemberService.fetchCommunitiesByName \(java.lang.String name\)**

Returns a list of communities with names that begin with the specified string. This command returns a java.util.Vector object; each object in the vector is a `java.util.Hashtable` object that describes one community.

Parameters:

-   **name**

    The name of a community. You can provide the first word or words and any communities with names that begin with that word or words is returned. For example, "Sales community".

!!! note 
    
    This command was added in version 2.5.

**ActivitiesMemberService.fetchMemberByEmail\(java.lang.String mail\)**

Returns a member identified by the supplied email address. This command returns a java.util.Hashtable object that describes the member.

Parameters:

-   **mail**

    A member's email address specified as a String value. For example, "paul\_smith@example.com".

**ActivitiesMemberService.fetchMemberById\(java.lang.String id\)**

Returns a member identified by the supplied Activities ID. The member can be either an individual user or a group. The returned value is a java.util.Hashtable object that describes the member.

Parameters:

-   **id**

    The member's unique ID as issued by the Activities application. Specify the ID as a String value. For example, "ACF1093191092345B4DB336C9B5BF9".

**ActivitiesMemberService.fetchMemberByLogin\(java.lang.String name\)**

Returns a member whose login name is an exact match of the supplied login name. The returned value is a java.util.Hashtable object that describes the member. This command does not return groups.

Parameters:

-   **name**

    The login name specified as a String value. For example, "Paul Smith".

**ActivitiesMemberService.fetchMemberByName\(java.lang.String name\)**

Returns a member whose name is an exact match of the supplied name. This command returns both users and groups. The returned value is a java.util.Hashtable object that describes the member.

Parameters:

-   **name**

    The member or group name specified as a String value. For example, "Paul Smith".

**ActivitiesMemberService.fetchMembers\(java.lang.String filter\)**

Returns a set of members whose names match the string you specify. Each member can be either an individual user or a group. The set is returned as a java.util.Vector object; each object in the vector is a java.util.Hashtable object that describes one member.

Parameters:

-   **filter**

    Search query string; indicate a wildcard using an asterisk \(\*\). The string is case insensitive.

For example, the following command returns any user or group whose name ends with "Smith":

```bash
ActivitiesMemberService.fetchMembers("*Smith")
```

**ActivitiesMemberService.getMemberExtIdByEmail\("email"\)**

See *Synchronizing user data using administrative commands* for information about this command.

**ActivitiesMemberService.getMemberExtIdByLogin\("login"\)**

See *Synchronizing user data using administrative commands* for information about this command.

**ActivitiesMemberService.inactivateMemberByEmail\("email"\)**

See *Synchronizing user data using administrative commands* for information about this command.

**ActivitiesMemberService.inactivateMemberByExtId\("externalID"\)**

See *Synchronizing user data using administrative commands* for information about this command.

**ActivitiesMemberService.syncAllMembersByExtId\(\{"updateOnEmailLoginMatch": \["true" \| "false"\] \} \)**

See *Synchronizing user data using administrative commands* for information about this command.

**ActivitiesMemberService.syncAllMemberExtIds\(\)**

This command was deprecated in version 3. See *Synchronizing user data using administrative commands* for information about the new and updated synchronization commands you can use instead.

**ActivitiesMemberService.syncBatchMemberExtIdsByEmail\("emailFile" \[, \{"allowInactivate" : \["true" \| "false"\] \} \]\)**

See *Synchronizing user data using administrative commands* for information about this command.

**ActivitiesMemberService.syncBatchMemberExtIdsByLogin\("loginFile" \[, \{"allowInactivate" : \["true" \| "false"\] \} \]\)**

See *Synchronizing user data using administrative commands* for information about this command.

**ActivitiesMemberService.syncMemberByExtId\("currentExternalId" \[, \{ "newExtId" : "id-string", \[ \{ "allowExtIdSwap" : \["true" \| "false"\] \] \} \]\)**

See *Synchronizing user data using administrative commands* for information about this command.

**ActivitiesMemberService.syncMemberExtIdByEmail\("email" \[, \{"allowInactivate" : \["true" \| "false"\] \} \]\)**

See *Synchronizing user data using administrative commands* for information about this command.

**ActivitiesMemberService.syncMemberExtIdByLogin\("name" \[, \{"allowInactivate" : \["true" \| "false"\] \} \]\)**

See *Synchronizing user data using administrative commands* for information about this command.

## ActivityService {#actService .section}

**ActivityService.deleteActivities \(java.util.Vector activities\)**

Moves the specified activities to the Trash view. Activities in the Trash view can be restored as long as they are restored before the trash is emptied. Returns a java.util.Vector; each object in the vector is a java.util.Hashtable that describes one activity that could not be deleted. A returned empty vector indicates complete success.

Parameters:

-   **activities**

    Vector of hash tables describing the activities to be deleted. For example, joesactivities.

**ActivityService.exportSyncedResourceInfo \(filePath,eventType\)**

Writes a report that lists all of the community activities and identifies their associated communities. The file is saved to the directory path that you specify.

Parameters:

-   **filePath**

    String that specifies the full directory path in which to store the file that is returned by the command. Include the file name in the file path and use forward slashes. For example: "C:/temp/activity\_output.xml"

-   **eventType**

    Identifies the type of synchronization events to report about. The only supported value for this parameter is community. Specify this value as a singular community and in lowercase.

For example: `ActivityService.exportSyncedResourceInfo("C:/temp/activity_output.xml","community")`

You can use this command to restore backed up data. See *Comparing remote application data with the Communities database* for more details.

**ActivityService.fetchActivities\(\)**

Gets a list of all the activities, except those that are in the Trash view.

Returns a java.util.Vector object. Each object in the vector is a java.util.Hashtable object that describes one activity.

**ActivityService.fetchActivitiesByCommunityExId \(java.lang.String communityUUID\)**

Gets a list of the community activities associated with a specific community. Returns a java.util.Vector; each object in the vector is a java.util.Hashtable that describes a community activity.

Parameters:

-   **communityUUID**

    The unique ID of the community. For example, "f29b4e8e-6fad-44f4-9fca-58c46f29c38d". To find out the unique ID of a community, use ActivitiesMemberService.fetchCommunitiesByName to retrieve the community of interest, and then get the value of the externalId key of that community from the hashtable.

!!! note 
    
    This command was added in version 2.5.

**ActivityService.fetchActivitiesByDate\(java.lang.String dateType, java.lang.String beginTime, java.lang.String endTime, java.lang.String lastUUID\)**

Gets a list of activities that were created or modified between a date range. The maximum number of activities in the returned list is 50. To obtain all of the activities that match the criteria if the number is greater than 50, call this method in a loop providing the UUID of the 50th activity from the previous list as the lastUUID parameter. Returns a java.util.Vector object. Each object in the vector is a java.util.Hashtable object that describes one activity.

Parameters:

-   **dateType**

    Date field of interest. Options are created and modified.

-   **beginTime**

    Start timestamp of the range, using a yyyy.mm.dd format.

-   **endTime**

    Finish timestamp of the range, using a yyyy.mm.dd format.

-   **lastUUID**

    Unique ID of the last activity retrieved from a previous call of this command. Specify empty double quotes if you expect less than 50 activities in the response, or if you are running this command for the first time.

For example, the following command gets the first set of 50 activities that were created from 1 Mach 2008 through 31 March 2008:

```bash
ActivityService.fetchActivitiesByDate("created","2008.03.01","2008.03.31","")
```

!!! note 
    
    This command does not return activity templates that were created during the specified date range. This command does include in the activities that it returns any activities present in the Trash view that were created during the specified date range.

**ActivityService.fetchActivityById\(java.lang.String activityId\)**

Gets the activity identified by the given universal identifier. Returns a java.util.Hashtable object that describes the activity.

Parameters:

-   **activityId**

    Unique identifier of the activity. For example, "bc92738c-492c-4b52-8eee-c8ab6e2bd84d".

**ActivityService.fetchActivitiesByMember\(java.util.Hashtable member\)**

Gets a list of activities to which the specified member has access, except those that are in the Trash view. This command does not return community activities. Returns a java.util.Vector object; each object in the vector is a java.util.Hashtable object that describes one activity. It does not provide any results if the specified member is a group or a community.

Parameters:

-   **member**

    java.util.Hashtable object representing the member returned from the MemberService object. For example, jane.

**ActivityService.fetchActivitiesByOwner\(java.util.Hashtable member\)**

Gets a list of activities that are owned by the specified member, except those that are in the Trash view. This command does not return community activities either. Returns a java.util.Vector object; each object in the vector is a java.util.Hashtable object that describes one activity.

Parameters:

-   **member**

    java.util.Hashtable object representing the owner returned from the MemberService object. For example, paul\_smith.

**ActivityService.fetchActivitiesCreatedByMember\(java.util.Hashtable member\)**

Gets a list of activities that were created by the specified member, except those that are in the Trash view. This command does not return community activities. Returns a java.util.Vector object; each object in the vector is a java.util.Hashtable object that describes one activity.

Parameters:

-   **member**

    java.util.Hashtable object representing the member returned from the MemberService object. For example, paul\_smith.

**ActivityService.fetchCompletedActivities\(\)**

Gets a list of all completed activities in the service, which are activities that have been marked complete and are displayed in the Completed view. Completed activities are not included in the Trash view; it is not until a completed activity is deleted that it is moved to the Trash view.

Returns a java.util.Vector object. Each object in the vector is a java.util.Hashtable object that describes one activity.

**ActivityService.fetchDeletedActivities\(\)**

Gets a list of all deleted activities in the service. These are activities that are currently in the Trash view.

Returns a java.util.Vector object. Each object in the vector is a java.util.Hashtable object that describes one activity.

## AccessControlService {#aclService .section}

!!! note 

    You cannot use the AccessControlService commands to fetch, set, or delete access to community activities. See *Communities administrative commands* for information about the command you can use to add a person to a community.

**AccessControlService.deleteAccess\(java.util.Vector activities, java.util.Vector members\)**

Removes access privileges to the specified activities for the specified members. Returns a java.util.Vector object; each object in the vector is a java.util.Hashtable object that describes one activity whose access could not be deleted. A returned empty vector indicates success.

Parameters:

-   **activities**

    Vector of hash tables representing the activities whose access will be modified. For example, joesactivities.

-   **members**

    Vector of hash tables representing the members returned from the MemberService object.

**AccessControlService.fetchAccess\(java.util.Hashtable activity\)**

Gets a list of all of the members that have access to the specified activity. Returns a java.util.Vector object; each object in the vector is a java.util.Hashtable object that describes one entry, either a user or group, in the access list. The elements returned in the Hashable are:

-   displayName
-   email: Returns for members only, not groups.
-   externalId
-   loginNames: Returns for members only, not groups.
-   memberId
-   memberType
-   role
-   staticProfile

Parameters:

-   **activity**

    Hash table representing the activity.

The following code is an example of what is returned by this command:

```bash
[{memberId=675G09219107D9BB025252223E2BC9000001, displayName=Amy Jones, loginNames=[Amy Jones, ajones@acme.com], staticProfile=false, externalId=3AB586F4-A4D2-43C8-92DB-2DC3B2291803, email=ajones@acme.com, memberType=person, role=owner}, {memberId=D76G0921910768409A3F871F14596C000088, displayName=Amy Jacobs, loginNames=[Amy Jacobs, ajacobs@acme.com], staticProfile=false, externalId=DE1D832B-1024-43B1-A12C-F1B643C2B6A2, email=ajacobs@acme.com, memberType=person, role=reader}, {memberId=812G09219107D9BB025252223E2BC900000A, displayName=ajonesgroup, staticProfile=false, externalId=41565591-1A33-4F9B-88D9-335D96BFB3B2, memberType=group, role=reader}]
```

**AccessControlService.setMembersAccess\(java.util.Vector activities, java.util.Vector members\)**

Sets the specified members as members with author access to the specified activities. Returns a java.util.Vector object; each object in the vector is a java.util.Hashtable object that describes one activity whose access could not be modified. A returned empty vector indicates success.

Parameters:

-   **activities**

    Vector of hash tables representing the activities whose access will be modified.

-   **members**
    
    Vector of hash tables representing the members returned from the MemberService object.

!!! note 
    
    In 2.5, this command named changed from setMemberAccess to setMembersAccess.

**AccessControlService.setOwnerAccess\(java.util.Vector activities, java.util.Hashtable owner\)**

Sets the specified member as an owner of the specified activities. Returns a java.util.Vector object; each object in the vector is a java.util.Hashtable object that describes one activity whose access could not be modified. A returned empty vector indicates success.

Parameters:

-   **activities**

    Vector of hash tables representing the activities whose access will be modified.

-   **owner**
    
    Hash table representing the member returned from the MemberService object.

**AccessControlService.setOwnersAccess\(java.util.Vector activities, java.util.Vector owners\)**

Sets the specified members as owners of the specified activities. Returns a java.util.Vector object; each object in the vector is a java.util.Hashtable object that describes one activity whose access could not be modified. A returned empty vector indicates success.

Parameters:

-   **activities**

    Vector of hash tables representing the activities whose access will be modified.

-   **owners**

    Vector of hash tables representing the members to whom you want to give owner access.

!!! note 
    
    This command was added in version 2.5.

**AccessControlService.setReadersAccess\(java.util.Vector activities, java.util.Vector members\)**

Sets the specified members as readers of the specified activities. Returns a java.util.Vector object; each object in the vector is a java.util.Hashtable object that describes one activity whose access could not be modified. A returned empty vector indicates success.

Parameters:

-   **activities**

    Vector of hash tables representing the activities whose access will be modified.

-   **members**

    Vector of hash tables representing the members returned from the MemberService object.

!!! note 
    
    In 2.5, this command named changed from setReaderAccess to setReadersAccess.

**AccessControlService.syncAllCommunityShares\(\)**

Updates the Activities data store to reflect changes made to the name or access level of a community. If the community no longer exists, the membership of the activity is updated to remove the community.

!!! note 
   
    This command was added in version 3.

## ActivitiesConfigService {#actConfigService .section}

**ActivitiesConfigService.checkOutConfig\("working\_directory", "cell\_name"\)**

Checks Activities configuration files out to a temporary directory.

**working\_directory**

Temporary working directory to which the configuration files are copied. The files are kept in this working directory while you make changes to them. When you specify a path to the working directory on a system running Microsoft™ Windows™, use a forward slash for the directory. For example: "C:/temp".

!!! note 
    
    Linux™: The working directory must grant write permissions or the command will not run successfully.

**cell\_name**

Name of the WebSphere® Application Server cell hosting the Lotus® Connections application. If you do not know the cell name, type the following command while in the wsadmin command processor:

```bash
print AdminControl.getCell()
```

For example:

-   Linux:

    ```bash
    ActivitiesConfigService.checkOutConfig("/opt/my_temp_dir", "CommServerNode01Cell")
    ```

-   Microsoft Windows:

    ```bash
    ActivitiesConfigService.checkOutConfig("c:/temp","foo01Cell01")
    ```


**ActivitiesConfigService.showConfig\(\)**

Displays the current configuration settings. You must check out the configuration files with ActivitiesConfigService.checkOutConfig before running ActivitiesConfigService.showConfig.

**ActivitiesConfigService.updateConfig\("property\_name", "new\_value"\)**

Updates configuration properties.

**property\_name**

See *Activities configuration properties* for configuration properties and descriptions.

**new\_value**

The new value for the property. Acceptable values for properties can be restricted, for example to either true or false. See *Activities configuration properties* for configuration properties and descriptions.

**ActivitiesConfigService.checkInConfig\(\)**

Checks in Activities configuration files. Run from the wsadmin command processor.

## ActivitiesScheduler {#actScheduler .section}

**ActivitiesScheduler.getTaskDetails\(java.lang.String taskName\)**

Gets the list attributes of the named task. Returns a java.util.Hashtable object that contains the attributes.

Parameters:

-   **taskName**

    Name of the task specified as a String value. For example:

    -   "30MinStats"
    -   "ActivityAutoCompleteJob"
    -   "DailyStats"
    -   "DatabaseRuntimeStats"
    -   "TrashAutoPurgeJob"
    -   "EventLogPurgeJob"

**ActivitiesScheduler.pauseSchedulingTask\(java.lang.String taskName\)**

Suspends scheduling of a task. Has no effect on currently running tasks. Returns a 1 to indicate that the task has been paused. Paused tasks remain paused until you explicitly resume them, even if the server is stopped and restarted.

Parameters:

-   **taskName**

    Name of the task specified as a String value. For example:

    -   "30MinStats"
    -   "ActivityAutoCompleteJob"
    -   "DailyStats"
    -   "DatabaseRuntimeStats"
    -   "TrashAutoPurgeJob"
    -   "EventLogPurgeJob"

**ActivitiesScheduler.resumeSchedulingTask\(java.lang.String taskName\)**

Resumes the start of a paused task. Returns a 1 to indicate that the task has been resumed.

Parameters:

-   **taskName**

    Name of the task specified as a String value. For example:

    -   "30MinStats"
    -   "ActivityAutoCompleteJob"
    -   "DailyStats"
    -   "DatabaseRuntimeStats"
    -   "TrashAutoPurgeJob"
    -   "EventLogPurgeJob"

## ArchiveService {#actArchiveService .section}

**ArchiveService.createActivities\(java.lang.String directory, java.util.Vector activities\)**

Creates new activities from the previously exported activities specified by the vector. If an activity being imported with this command already exists, a second activity is created. Returns a java.util.Vector object; each object in the vector is a java.util.Hashtable object that describes one activity that could not be created. A returned empty Vector indicates success.

Parameters:

-   **directory**

    Directory on the file system from which to import the activities. For example, "C:/AllExports".

-   **activities**

    Vector of hash tables; each hash table describes an Activity to be created. For example, allexports.

**ArchiveService.deleteActivities\(java.lang.String directory, java.util.Vector activities\)**

Deletes the previously exported activities specified by the vector from the specified directory. Use this command to delete activities from the archive repository, not from the Activities server or database. Returns a java.util.Vector object; each object in the vector is a java.util.Hashtable object that describes one activity that could not be deleted. A returned empty vector indicates success.

Parameters:

-   **directory**

    Archive directory on the file system from which to delete the activities. For example, "C:/AllExports".

-   **activities**

    Vector of hash tables; each hash table describes an activity to be deleted. For example, janesactivities.

**ArchiveService.exportActivities\(java.lang.String directory, java.util.Vector activities\)**

Exports the activities specified by the Vector into the specified directory; this method will overwrite an activity if it already exists in the specified directory. Returns a java.util.Vector object; each object in the vector is a java.util.Hashtable object that describes one activity that could not be exported. A returned empty Vector indicates success.

Parameters:

-   **directory**

    Directory on the file system to which to export the activities. For example, "C:/temp/zips".

-   **activities**

    Vector of hash tables; each hash table describes an activity to be exported. For example, activities.

**ArchiveService.fetchActivities\(java.lang.String directory\)**

Gets a list of all archived activities in the specified directory. Returns a java.util.Vector object; each object in the vector is a java.util.Hashtable object describing an archived activity in the directory.

Parameters:

-   **directory**

    Directory on the file system that contains the archived activities. For example, "C:/AllExports".

**ArchiveService.fetchActivitiesByMember\(java.lang.String directory , java.util.Hashtable member\)**

Gets a list of all archived activities in the specified directory to which the specified member has access. Returns a java.util.Vector object; each object in the vector is a java.util.Hashtable object describing an archived activity in the directory. This command does not return community activities.

Parameters:

-   **directory**

    Directory on the file system that contains the archived activities. For example, "C:/AllExports".

-   **member**

    Hash table representing the members returned from the MemberService object. For example, paul\_smith.

!!! note 

    Do not use this command to fetch activities that were exported from a different deployment of HCL Connections. This commands uses the member ID to find the activities, and member IDs are not persisted across different deployments. Only use this command to collect activities when you are importing the activities to the same server from which they were exported. If you are importing the activities to a different server, use the `ArchiveService.fetchActivities\(directory\)` command instead.

**ArchiveService.fetchActivitiesByOwner\(java.lang.String directory , java.util.Hashtable member\)**

    Gets a list of all archived activities in the specified directory that are owned by the specified member. Returns a java.util.Vector object; each object in the vector is a java.util.Hashtable objects describing an archived activity in the directory. This command does not return community activities.

Parameters:

-   **directory**

    Directory on the file system that contains the archived activities. For example, "C:/AllExports".

-   **member**

    Hash table representing the owners of archived activities returned from the MemberService object. For example, paul\_smith.

!!! note 
    
    Do not use this command to fetch activities that were exported from a different deployment of HCL Connections. This commands uses the member ID to find the activities, and member IDs are not persisted across different deployments. Only use this command to collect activities when you are importing the activities to the same server from which they were exported. If you are importing the activities to a different server, use the `ArchiveService.fetchActivities\(directory\)` command instead.

**ArchiveService.fetchActivitiesCreatedByMember\(java.lang.String directory, java.util.Hashtable member\)**

Gets list of all archived activities in the specified directory that were created by the specified member. Returns a java.util.Vector object; each object in the vector is a java.util.Hashtable object describing an archived activity in the directory. This command does not return community activities.

Parameters:

-   **directory**

    Directory on the file system that contains the archived activities. For example, "C:/AllExports".

-   **member**

    Hash table representing the member who created the archived activities returned from the MemberService object. For example, jane.

**Note:** Do not use this command to fetch activities that were exported from a different deployment of HCL Connections. This commands uses the member ID to find the activities, and member IDs are not persisted across different deployments. Only use this command to collect activities when you are importing the activities to the same server from which they were exported. If you are importing the activities to a different server, use the ArchiveService.fetchActivities\(directory\) command instead.

**ArchiveService.importActivities\(java.lang.String directory,java.util.Vector activities\)**

Imports the activities specified by the Vector whose archives are located in the specified directory into the Activities application. This method overwrites an activity if it already exists. Returns a java.util.Vector object; each object in the vector is a java.util.Hashtable object that describes one activity that could not be imported. A returned empty Vector indicates success.

Parameters:

-   **directory**

    Directory on the file system from which to import the activities. For example, "c:/temp/zips".

-   **activities**

    Vector of hash tables; each hash table describes an activity to be imported. For example, activitiesToImport.

## ListService {#actListService .section}

**ListService.filterActivitiesByName\(inList, toMatch\)**

Represents a script that can be used to filter or narrow down a list of activities matching certain criteria. This script is useful for locating a subset of activities that can then be used as input for a subsequent command. A typical example is creating a list of activities for export. Returns a list of activities whose Title field matches the pattern criteria.

Parameters:

-   **inList**

    Previously fetched list of activities.

-   **toMatch**

    Java™ regular expression pattern representing match criteria. This pattern is used to search the title of the activity. The pattern must match the full name and is case sensitive. You can use the following keys:

    -   Period \(.\) matches any character.
    -   Plus sign \(+\) matches one or more instances of the previous character. For example, .+ matches all sequences of one or more characters.
    -   Asterisk \(\*\) matches zero or more instances of the previous character. For example, \* matches all sequences of characters.
    -   \[chars\] matches any one character within the brackets \(\[\]\). For example, \[Gg\] matches either an uppercase or lowercase G.
    -   \[A-Z\] matches a range of characters.

Example:

```bash
execfile("activitiesAdmin.py")


# Fetch all activities and save
# to variable named "all"

all=ActivityService.fetchActivities()

# From the list of all activities,
# Extract activities whose name 
# begins with "Sales"

sales=ListService.filterActivitiesByName(all,"Sales.*")

# Activities in "all" that begin 
# with "Sales" are saved in the 
# variable named "sales". The 
# variable "sales" can be used as 
# input for other commands, such 
# as the command to export 
# activities. The following command
# will export all the activities 
# whose name begins with "Sales" to
# the /opt/foo folder.

ArchiveService.exportActivities(
"/opt/foo", "Sales.*")
```

## StatisticsService {#actStatsService .section}

**StatisticsService.fetchStatistic\(java.lang.String key\)**

Gets a server statistic.

Returns a java.lang.Integer or java.util.Hashtable object containing statistic data defined using the following keys:

-   **invocations**

    Number of times the function has been invoked.

-   **total**

    Total amount of time that is consumed by this operation.

-   **minimum**

    Minimum amount of time that a single invocation lasted.

-   **maximum**

    Maximum amount of time that a single invocation lasted.

-   **average**

    Average amount of time that a single invocation lasted.

The list of available statistics for your server can be found at: http://yourservername.company.com/activities/service/html/serverstats

Use any of the statistics listed in this table as input to this command. The statistics listed as Stop Watch Statistics are similar to parent statistics and, when you use one of them as the key, it returns a hash table containing statistics for invocations, total, minimum, maximum, and average.

Parameters:

-   **key**

    Name of the statistic to be returned specified as a String value.

**StatisticsService.fetchStatistics\(\)**

Gets all system statistics. Returns a java.util.Hashtable object with server statistics data.

## TrashCollectionService {#actTrash .section}

**TrashCollectionService.fetchTrash\(\)**

Gets all of the objects that are currently in the Trash view. Returns a java.util.Vector object that contains a set of hash tables; each hash table describes an object in the trash.

**TrashCollectionService.purgeTrash\(java.util.Vector trashVector\)**

Permanently removes the objects in the trashVector parameter from the Activities application. Returns a java.util.Vector of java.util.Hashtables object; each hash table describes an object in the trash that could not be purged.

Parameters:

-   **trashVector**

    A vector of hash tables; each hash table describes an object in the trash to be purged \(obtained using the TrashCollectionService.fetchTrash command\).

**TrashCollectionService.undeleteTrash\(java.util.Vector trashVector\)**

Restores previously deleted objects from the Trash view. Returns a java.util.Vector object that contains java.util.Hashtable objectss; each Hashtable describes an object in the trash that could not be restored from the trash.

Parameters:

-   **trashVector**

    A vector of hash tables; each hash table describes an object in the trash to be restored \(obtained using the TrashCollectionService.fetchTrash command\).

**Parent topic:** [Running Activities administrative commands](../admin/t_admin_act_change_admin_props.md)

**Related information**  


[Comparing remote application data with the Communities database](../admin/t_admin_communities_sync_remote_apps.md)

[Getting a list of activities](../admin/t_admin_act_fetch_activities.md)

[Synchronizing user data by using administrative commands](../admin/c_admin_common_sync_via_admin_commands1.md)

