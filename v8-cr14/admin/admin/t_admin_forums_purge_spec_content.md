# Purging specific forum content from the trash {#t_admin_forums_purge_spec_content .task}

Use administrative commands to permanently delete a specific forum or forum topic by removing it from the trash.

To run administrative commands, you must use the wsadmin client. For more information, see [Starting the wsadmin client](t_admin_wsadmin_starting.md).

When you use these commands, you do not have to check the configuration file in and out, nor restart the Forums server, because the commands take effect immediately.

1.  To purge specific forum content from the trash, complete the following steps.
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

4.  To get a list of the deleted forum content currently in the trash, use the following commands:

    ForumsTrashService.fetchForumsTrash\(\)
    :   Retrieves a list of the deleted forums currently in the trash

    ForumsTrashService.fetchTopicsTrash\(\)
    :   Retrieves a list of the deleted forum topics currently in the trash.

    ForumsTrashService.fetchForumsTrashByDate\(String modifySince\)
    :   Retrieves a list of the forums that were deleted on a specific date.

        This command takes the following parameter:

        modifySince
        :   A string that specifies the date when the forum was deleted in yyyy.MM.dd format.

5.  Identify the forum or forum topic that you want to purge from the trash. For more information about how to narrow down a list of forums, see *Filtering lists of forums*.

6.  To delete a specific forum or forum topic from the trash permanently, use the following commands.

    ForumsTrashService.purgeForumsTrash\(vector hashtable\)
    :   Purges the specified forums from the trash, where you specify the forums that you want to delete by using the hashtable parameter.

        For example:

        ```
        ForumsTrashService.purgeForumsTrash(forumtrash)
        ```

    ForumsTrashService.purgeTopicsTrash\(vector hashtable\)
    :   Purges the specified forum topics from the trash, where you specify the topics that you want to delete by using the hashtable parameter.

        For example:

        ```
        ForumsTrashService.purgeTopicsTrash(topictrash)
        ```


**Parent topic:**[Managing forum trash](../admin/c_admin_forums_manage_trash.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Moving forums to the trash](../admin/t_admin_forums_soft_delete.md)

[Deleting topics from forums](../admin/t_admin_forums_delete_topic.md)

[Filtering lists of forums](../admin/t_admin_forums_filter_forum_list.md)

