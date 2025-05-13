# Importing activities {#t_admin_act_import_activities .task}

Use administrative commands to import activities that you exported.

You can import only activities that you exported from the Activities application. See *Exporting activities*.

To run administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

1.  Start the Activities Jython script interpreter.

    1.  Use the following command to access the Activities configuration file:

        ```
        execfile("activitiesAdmin.py")
        ```

        The command in this procedure reads information from a file. If prompted to specify a service to connect to, specify the node where the file that you want to read from is stored.

2.  Do one of the following actions:

    -   If you want to import all of the activities that you exported, use the following command to retrieve the activities that you exported and save them as a java.util.Vector variable:

        ```
        variable=ArchiveService.fetchActivities(java.lang.String export_directory)
        ```

        where export\_directory is the file path, including the drive and subdirectory, on the local server where the previously exported ZIP files are located. When specifying a path separator, use the forward slash rather than backslash even on Microsoft® Windows® systems. For example:

        ```
        allexports=ArchiveService.fetchActivities("C:/AllExports")
        ```

    -   If you want to filter the activities that you exported into a subset based on a member, complete the following steps:
    1.  To identify a subset of activities that were created by a specific member, use the following command:

        ```
        variable=MemberService.fetchMemberByName(java.util.Hashtable member)
        ```

        For example:

        ```
        jane=MemberService.fetchMemberByName("Jane Doe")
        ```

    2.  To retrieve a subset of activities that were created by the member from the repository of exported activities and save it to variable, use the following command:

        **Note:** Do not use these member-based commands to fetch activities that were exported from a different deployment of HCL Connections. These commands use the member ID to find the activities, and member IDs are not persisted across different deployments. Use these commands only to collect activities when you are importing the activities to the same server from which they were exported. If you are importing the activities to a different server, use the ArchiveService.fetchActivities\(directory\) command instead.

        ```
        variable=ArchiveService.fetchActivitiesCreatedByMember(java.lang.string export_directory,java.util.Hashtable member)
        ```

        For example:

        ```
        janesactivities=ArchiveService.fetchActivitiesCreatedByMember("C:/AllExports",jane)
        ```

        Alternatively, you can create the following subsets of activities. Note that these commands only return standard activities; they do not return community activities.

        -   To retrieve a subset of standard activities to which a specific member has access from the repository of exported activities and save it to a variable, use the following command:

            ```
            variable=ArchiveService.fetchActivitiesByMember(java.lang.string export_directory,java.util.Hashtable member)
            ```

        -   To retrieve a subset of standard activities that a specific member owns from the repository of exported activities and save them to a variable, use the following command:

            ```
            variable=ArchiveService.fetchActivitiesByOwner(java.lang.string export_directory,java.util.Hashtable member)
            ```

3.  **Only perform this step if you want to delete a subset of the activities**. You might want to perform this step if an employee has exited the company and you want to remove the activities that she owns from the collection before you import them.

    To delete a set of activities from the collection of exported activities, use the following command:

    ```
    ArchiveService.deleteActivities(java.lang.String export_directory, java.util.Vector subset_of_activities)
    ```

    where subset\_of\_activities is the java.util.Vector variable you created to define a subset of activities that you retrieved from the export directory and that you want to permanently delete. For example, to remove Jane's activities from the collection of exported activities, you could use the following command:

    ```
    ArchiveService.deleteActivities("C:/AllExports",janesactivities)
    ```

4.  Use one of the following commands to import the activities:

    **Note:** For community activities, the community from which the activity was created must exist on the server to which you are importing the activities. If it does not, an error is returned when you attempt to import the activities. The associated community is identified by its communityUUID which is not persisted across different deployments, so you can only include community activities in the activities to be imported when you are importing them to the same server from which they were exported.

    -   If you do not want to overwrite any of the activities currently on the server and would rather create an additional copy of an activity if you are importing one that already exists, use this command:

        ```
        ArchiveService.createActivities(java.lang.String export_directory, java.util.Vector activities)
        ```

        where activities is the java.util.Vector variable you created to define the activities that you retrieved from the export directory and that you want to import into the Activities application. For example:

        ```
        ArchiveService.createActivities("C:/AllExports",allexports)
        ```

        or to import only Jane's activities:

        ```
        ArchiveService.createActivities("C:/AllExports",janesactivities)
        ```

    -   Use the following command to import the activities from the export repository. If the activities being imported already exist on the Activities server, the ones on the server will be overwritten during the import.

        ```
        ArchiveService.importActivities(java.lang.String export_directory, java.util.Vector activities)
        ```

        where activities is the java.util.Vector variable you created to define the activities that you retrieved from the export directory and that you want to import into the Activities application. For example:

        ```
        ArchiveService.importActivities("C:/AllExports",allexports)
        ```

        or to import only Jane's activities:

        ```
        ArchiveService.importActivities("C:/AllExports",janesactivities)
        ```


If the import is successful, one activity is created from each ZIP file in the export repository and the wsadmin client returns an empty set of brackets. If one of the activities cannot be imported, information about it is returned to the wsadmin client's command line. Refer to the SystemOut.log file to find log messages that are written to it from the import process.

**Parent topic:**[Running Activities administrative commands](../admin/t_admin_act_change_admin_props.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

