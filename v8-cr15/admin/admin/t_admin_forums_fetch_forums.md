# Getting a list of forum topics {#t_admin_forums_fetch_forums .task}

Use administrative commands to retrieve forum topics by date, by creator, or by topic UUID. When you use these commands, you do not have to check the Forums configuration file in and out, nor restart the Forums server.

To run administrative commands, you must use the wsadmin client. For more information, see [Starting the wsadmin client](t_admin_wsadmin_starting.md).

1.  To retrieve forum content, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands fail. For more information, see *Starting the wsadmin client*.

3.  Start the Forums Jython script interpreter by using the following command:

    ```
    execfile("forumsAdmin.py")
    ```

    If you are prompted to specify a service to connect to, enter 1 to select the first node in the list. Most commands can run on any node. If the command specifies a file by using a local file path, select the node where the file is stored.

4.  Use any of the following commands:

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


**Parent topic:**[Retrieving forum content](../admin/c_retrieving_forum_content.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

