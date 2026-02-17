# Exporting activities {#t_admin_act_export_activities .task}

Use administrative commands to export activities.

If you want to transfer standard activity content from one system to another, you can export the activities to an external directory and then import them to the new system. This does not apply to community activities. You can only import community activities to the same deployment from which they were exported. See *Importing activities* for information on importing.

To run administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

The data associated with the Activities application is stored in more than one place. For standard activities the activities and the member information associated with them are stored in the Activities database tables. For community activities, the activities themselves are stored in the Activities database tables and the member information is stored in the Communities database tables. For both activity types, any file attachments that are added to activities are stored in the content store on the file system. When you run the export process to export activities, it collects the data from all of these locations and stores it in one ZIP file per activity.

To export activities, complete the following steps:

1.  Start the Activities Jython script interpreter.

    1.  Use the following command to access the Activities configuration file:

        ```
        execfile("activitiesAdmin.py")
        ```

        The command in this procedure writes information to a file. If prompted to specify a service to connect to, specify the node where the file that you want to write to is stored.

2.  Use one of the following commands to get a list of activities that you want to export:

    -   To get a list of all the activities from the Activities server and save them as a java.util.Vector variable that you can pass to the export command, use the following command:

        ```
        variable=ActivityService.fetchActivities()
        ```

        For example:

        ```
        allexports=ActivityService.fetchActivities()
        ```

    -   To filter the activities to export to a subset of activities created within a specific time period, use the following command:

        ```
        variable=ActivityService.fetchActivitiesByDate(java.lang.String dateType, 
         java.lang.String beginTime, java.lang.String endTime, java.lang.String 
         lastUUID)
        ```

        For example, to get all of the activities created in September, use the following command:

        ```
        sept=ActivityService.fetchActivitiesByDate("created", "2008.09.01", "2008.09.30", "")
        ```

        **Note:** This command does not return activity templates that were created during the specified date range, but does include in the activities that it returns any activities present in the Trash view that were created during the specified date range.

    -   To filter the activities that you want to export to a subset based on their members, complete the following steps:
        1.  Identify the member of interest and save the member information to a variable using the following command:

            ```
            variable=MemberService.fetchMemberByName(java.util.Hashtable member)
            ```

            For example:

            ```
            john=MemberService.fetchMemberByName("John Smith")
            ```

        2.  To retrieve a subset of activities that were created by the member and save it to variable, use the following command:

            ```
            variable=ActivityService.fetchActivitiesCreatedByMember(java.util.Hashtable member)
            ```

            For example:

            ```
            johnsactivities=ActivityService.fetchActivitiesCreatedByMember(john)
            ```

            Alternatively, you can create the following subsets of activities. Note that these commands only return standard activities; they do not return community activities:

            -   To get a list of all the standard activities to which the member has access:

                ```
                variable=ActivityService.fetchActivitiesByMember(java.util.Hashtable member)
                ```

            -   To get a list of all the standard activities that the member owns:

                ```
                variable=ActivityService.fetchActivitiesByOwner(java.util.Hashtable member)
                ```

    -   To get a list of community activities to export, complete the following steps:
        1.  Search by name for the community that owns the activities that you want to export using the following command:

            ```
            ActivitiesMemberService.fetchCommunitiesByName(java.lang.String name)
            ```

            For example:

            ```
            communities=ActivitiesMemberService.fetchCommunitiesByName("sales")
            ```

        2.  From the list of communities returned, find the community of interest and make a note of its unique ID.
        3.  Pass that unique ID into the following command to write the activities associated with the community to a java.util.Vector variable that you can later pass to the export command:

            ```
            ActivityService.fetchActivitiesByCommunityExId(java.lang.String communityUuid)
            ```

            For example:

            ```
            communityActivitiesToExport=ActivityService.fetchActivitiesBy communityExId(
            "f29b4e8e-6fad-44f4-9fca-58c46f29c38d")
            ```

3.  Use the following command to export the activities:

    ```
    ArchiveService.exportActivities(java.lang.String export\_directory, java.util.Vector activities)
    ```

    where:

    -   export\_directory is the directory path in which you want the activities which are exported as ZIP files to be stored. This directory must exist on the server that you were prompted to provide after running the execfile command to access the activitiesAdmin.py file.
    -   activities is the java.util.Vector variable you created to define the activities that you want to export.
    For example:

    ```
    ArchiveService.exportActivities("c:/ActivitiesExports",allexports)
    ```

    or to export only John's activities:

    ```
    ArchiveService.exportActivities("c:/ActivitiesExports",johnsactivities)
    ```

    or to export only the activities created in September:

    ```
    ArchiveService.exportActivities("c:/ActivitiesExports",sept)
    ```

    or to export the community activities:

    ```
    ArchiveService.exportActivities("c:/ActivitiesExports",communityActivitiesTo export)
    ```


If the export is successful, one ZIP file is created in the export repository for each activity being exported, and the wsadmin client returns an empty set of brackets. If one of the activities cannot be exported, information about it is returned to the wsadmin client's command line. Refer to the SystemOut.log file to find log messages that are written to it from the export process.

**Parent topic:**[Running Activities administrative commands](../admin/t_admin_act_change_admin_props.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Getting a list of activities](../admin/t_admin_act_fetch_activities.md)

