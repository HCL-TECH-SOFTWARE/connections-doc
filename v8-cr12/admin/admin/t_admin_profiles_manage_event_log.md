# Managing the Profiles event log {#t_admin_profiles_manage_event_log .task}

Use Profiles administrative commands to manage the Profiles event log.

To run administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

The Profiles EVENTLOG table logs records relating to Profiles user events. For example, every time a user removes a board post or adds a tag to their profile, an entry is logged in the table. From time to time, you might want to purge older records from the table to control the size of the data. Otherwise, the entries can grow rapidly and impact performance in areas such as seedlist indexing.

By default, records that are more than 30 days old are automatically purged from the event log. For information about how to modify the setting that controls this interval, see *Configuring event log clean-up for Profiles*.

1.  To manage entries in the event log table for Profiles, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly. For more information, see *Starting the wsadmin client*.

3.  Start the Profiles Jython script interpreter.

    1.  Use the following command to access the Profiles configuration files:

        ```
        execfile("profilesAdmin.py")
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

4.  Use the following commands as required.

    ProfilesService.purgeEventLogsByDates\(string startDate, string endDate\)
    :   Deletes event log entries created between the specified start date and end date.

        This command takes the following parameters:

        startDate
        :   A string that specifies the start date for the period in MM/DD/YYYY format.

        endDate
        :   A string that specifies the end date for the period in MM/DD/YYYY format.

        For example:

        ```
        ProfilesService.purgeEventLogsByDates("06/21/2009", "06/26/2009")
        ```

        This command deletes all the event log entries that were created on or after June 21st, 2009 and before June 26th, 2009 from the EVENTLOG table.

    ProfilesService.purgeEventLogsByEventNameAndDates\(eventName, string startDate, string endDate\)
    :   Deletes event log entries with the specified event name that were created between given start date and end date.

        This command takes the following parameters:

        eventName
        :   The type of event that you want to remove from the EVENTLOG table. The following names are some examples of valid event names:

            -   profiles.created
            -   profiles.removed
            -   profiles.updated
            -   profiles.person.photo.updated
            -   profiles.person.audio.updated
            -   profiles.colleague.created
            -   profiles.colleague.added
            -   profiles.connection.rejected
            -   profiles.person.tagged
            -   profiles.person.selftagged
            -   profiles.tag.removed
            -   profiles.link.added
            -   profiles.link.removed
            -   profiles.status.updated
            -   profiles.wallpost.created
            -   profiles.wallpost.removed
            -   profiles.wall.comment.added
            For a complete list of valid event names for Profiles, refer to the [Events Reference](https://ds-infolib.hcltechsw.com/ldd/lcwiki.nsf/xpDocViewer.xsp?lookupName=IBM+Connections+4.0+API+Documentation#action=openDocument&res_title=Events_Reference&content=pdcontent) article in the API Documentation wiki.

        startDate
        :   A string that specifies the start date for the period in MM/DD/YYYY format.

        endDate
        :   A string that specifies the end date for the period in MM/DD/YYYY format.

        For example:

        ```
        ProfilesService.purgeEventLogsByEventNameAndDates("profiles.colleague.created", "06/21/2009", "06/26/2009")
        ```

        This command deletes all the profiles.colleague.created event log entries that were created on or after June 21st, 2009 and before June 26th, 2009 from the EVENTLOG table.


**Parent topic:**[Administering Profiles](../admin/c_admin_profiles_intro.md)

