# Rectifying the count of forums and forum topics {#t_admin_forums_rectify_count .task}

Recalculate the count of forums and forum topics.

To run administrative commands, you must use the wsadmin client. For more information, see [Starting the wsadmin client](t_admin_wsadmin_starting.md).

When you use these commands, you do not have to check the configuration file in and out, nor restart the Forums server, because the commands take effect immediately.

If an administration task in the Forums application fails, the total count of forums and forum topics that are displayed in the Forums user interface might be incorrect. You can use administrative commands to manually recalculate the count of forums and forum topics in your organization and ensure that the figures are up-to-date.

1.  To recalculate the number of forums and forum topics, complete the following steps.
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

4.  Run any of the following commands:

    ForumsService.reCountAllForums\(\)
    :   Recalculates the total number of forums in your organization.

        This command does not take any parameters.

    ForumsService.reCountForums\(Vector forums\)
    :   Recalculates the number of specified forums in your organization, where you specify the forums that you want to recalculate as a vector variable that represents multiple forums.

        For example:

        ```
        ForumsService.reCountForums(myforums)
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

5.  Use the following command to filter a vector result:

    ```
    Vector vii=ForumsService.filterInput(VectorinputVector,java.lang.String toMatch,java.lang.String attrName)
    ```

    This command returns a new vector that contains a map pair to match the filter criteria.

    The command takes the following parameters:

    inputVector
    :   The source vector that contains the map collection.

    toMatch
    :   The value pattern that you are using to narrow down your results.

    attrName
    :   The key that you want to be filtered in the map.

    For example, you might get a vector of forums by using the following command:

    ```
    inputVector=ForumsService.fetchForums()
    ```

    The inputVector vector contains two maps as follows:

    ```
    inputVector = {name=forum-1,name=forum-2}
    ```

    Each map has one value pair:

    ```
    (key = "name", value="")
    ```

    In this example, you want to filter the vector to retrieve the maps in which the value of the name key is forum-1 so you run the following command:

    ```
    Vector vii=ForumsService.filterInput(inputVector,"forum-1","name")
    ```

    The vii vector variable now contains a single forum with a name key of forum-1:

    ```
    vii = {name=forum-1}
    ```


**Parent topic:**[Administering Forums](../admin/c_admin_forums_overview.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

