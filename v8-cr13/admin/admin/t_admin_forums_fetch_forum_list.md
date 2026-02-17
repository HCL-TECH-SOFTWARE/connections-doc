# Getting a list of forums {#t_admin_forums_fetch_forum_list .task}

Use administrative commands to retrieve lists of forums that you can subsequently manipulate programmatically.

To run administrative commands, you must use the wsadmin client. For more information, see [Starting the wsadmin client](t_admin_wsadmin_starting.md).

1.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands fail. For more information, see *Starting the wsadmin client*.

2.  Start the Forums Jython script interpreter by using the following command:

    ```
    execfile("forumsAdmin.py")
    ```

    If you are prompted to specify a service to connect to, enter 1 to select the first node in the list. Most commands can run on any node. If the command specifies a file by using a local file path, select the node where the file is stored.

3.  Use the following commands to retrieve the forums:

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


**Parent topic:**[Retrieving forum content](../admin/c_retrieving_forum_content.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Filtering lists of forums](../admin/t_admin_forums_filter_forum_list.md)

