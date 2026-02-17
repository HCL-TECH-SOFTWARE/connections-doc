# Getting a list of activities {#t_admin_act_fetch_activities .task}

List the activities that you can manipulate programmatically. You can retrieve a list of all activities or filter the list by viewing activities that are associated with a specific member.

To run administrative commands, you must use the wsadmin client and check out the Activities configuration file.

To check out the configuration file, use `execfile("activitiesAdmin.py")`. If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file with a local file path, pick the node where the file is stored.

For more information about using the wsadmin client, see [Starting the wsadmin client](t_admin_wsadmin_starting.md) .

-   Use the following commands to get a list of activities and entries.

    ActivityService.fetchActivities\(\)
    :   List all of the activities that are created by your users except those activities in the trash.

    ActivityService.fetchDeletedActivities\(\)
    :   List deleted activities. Deleted activities were moved to the Trash view, but are not permanently deleted yet. After the Trash view is purged, these activities are permanently deleted.

    ActivityService.fetchCompletedActivities\(\)
    :   List activities that are marked **Completed**.

    ActivityService.fetchActivitiesByDate\(java.lang.String dateType, java.lang.String beginTime,
    java.lang.String endTime, java.lang.String lastUUID\)
    :   List activities that were created or modified within a specified date range, including those activities in the Trash. This command does not return activity templates that were created during the specified date range.

        -   dateType: Date field of interest. Options are created and modified.
        -   beginTime: Start of date range.
        -   endTime: End of date range.
        -   lastUUID: Unique ID of the last activity that is retrieved from a previous call of this command. Specify empty double quotation marks if you expect less than 50 activities in the response, or if you are running this command for the first time.
        Dates are specified in the yyyy.mm.dd format.

        For example, the following command gets the first set of 50 activities that were created from 1 March 2008 through 31 March 2008:

        ```
        ActivityService.fetchActivitiesByDate("created","2008.03.01","2008.03.31","")
        ```

    ActivityService.fetchActivityById\(java.lang.String uuid\)
    :   List an activity with a specified universal identifier.

        You can find the universal identifier of an activity by using other fetch commands. The hash table of an activity includes an activityID, such as activityId=3F9G09219392F4733F40F82A4E8D5F000083. For example:

        ```
        ActivityService.fetchActivityById("bc92738c-492c-4b52-8eee-c8ab6e2bd84d")
        ```

-   Use the following commands to return a list of activities that are filtered by member.

    1.  Retrieve member information for the user whose activities you are interested in using MemberService.fetchMemberByName.

        ```
        variable=MemberService.fetchMemberByName(java.lang.String member)
        ```

        For example:

        ```
        jane=MemberService.fetchMemberByName("Jane Fairfax")
        ```

    2.  Filter the activity list.

        ActivityService.fetchActivitiesCreatedByMember\(java.util.Hashtable member\)
        :   List activities that are created by the member.

            For example:

            ```
            ActivityService.fetchActivitiesCreatedByMember(jane)
            ```

        ActivityService.fetchActivitiesByMember\(java.util.Hashtable member\)
        :   List activities to which the member has access.

        ActivityService.fetchActivitiesByOwner\(java.util.Hashtable member\)
        :   List activities which the member owns.

    **Note:** Results from fetchActivitiesByMember\(\) and fetchActivitiesByOwner\(\) do not include community activities.


For information about how filter the list of results into a smaller subset, see *Narrowing down results*.

**Parent topic:**[Running Activities administrative commands](../admin/t_admin_act_change_admin_props.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Narrowing down results](../admin/t_admin_act_narrow_results.md)

[Managing member access to activities](../admin/t_admin_act_manage_access.md)

[Exporting activities](../admin/t_admin_act_export_activities.md)

