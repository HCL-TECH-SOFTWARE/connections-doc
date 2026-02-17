# Moving forums to the trash {#t_admin_forums_soft_delete .task}

Use administrative commands to move one or more forums to the Trash view.

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

3.  To move forums to the trash, generate a variable that contains the forums that you want to delete:

    1.  Create a variable that contains the forum or forums that you want to delete.

        You can get a list of forums in hash table format by using one of the fetchForums\(\) commands. For more information about the commands, see *Getting a list of forums*.

        For example:

        ```
        variable=ForumsService.fetchForumsByName(java.lang.String forumName)
        ```

    2.  Enter the following command to delete the forum or forums:

        ```
        ForumsService.deleteForums(java.util.Vector forums)
        ```

        where the forums parameter specifies the forum or forums that you want to delete. This parameter maps to the variable that you created in the previous step.

        For example, if a user leaves the organization and you want to delete a forum that was owned by them, use the following commands:

        ```
        obsoleteForum=ForumsService.fetchForumsByName("Joes Forum")
        wsadmin>ForumsService.deleteForums(obsoleteForum)
        ```


**Parent topic:**[Managing forum trash](../admin/c_admin_forums_manage_trash.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Getting a list of forums](../admin/t_admin_forums_fetch_forum_list.md)

[Purging forum trash on a schedule](../admin/t_admin_forums_purge_trash.md)

[Purging specific forum content from the trash](../admin/t_admin_forums_purge_spec_content.md)

[Restoring deleted forum content](../admin/t_admin_forums_restore_trash.md)

