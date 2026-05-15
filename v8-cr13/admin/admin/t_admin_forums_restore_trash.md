# Restoring deleted forum content {#t_admin_forums_restore_trash .task}

Restore forum content from the trash.

To run administrative commands, you must use the wsadmin client. For more information, see [Starting the wsadmin client](t_admin_wsadmin_starting.md).

If you change your mind about deleting content from the Forums application, you can restore the content from the trash. Use the ForumsTrashService commands to restore deleted content from the trash with immediate effect.

When you use these commands, you do not have to check the Forums configuration file in and out, nor restart the Forums server.

1.  To restore forum content that was deleted, complete the following steps:
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

4.  Do one of the following.

    -   To get a list of the deleted forums that are currently in the trash, enter the following command:

        ```
        ForumsTrashService.fetchForumsTrash()
        ```

    -   To get a list of the deleted forum topics that are currently in the trash, enter the following command:

        ```
        ForumsTrashService.fetchTopicsTrash()
        ```

    -   To get a list of forums that were deleted on a specific date, enter the following command:

        ```
        ForumsTrashService.fetchForumsTrashByDate(String modifySince)
        ```

        where modifySince is a string that specifies the date when the forum was deleted in yyyy.MM.dd format.

        For example:

        ```
        vari = ForumsTrashService.fetchForumsTrashByDate("2013.04.11")
        ```

        This command retrieves all the forums that were deleted on the 11th of April 2013 and uses a variable called vari to store the returned data.

5.  Identify the forums or forum topics that you want to restore from the returned list. Use the following command to filter the forums by name:

    ForumsTrashService.filterForumsByName\(VectorinputVector, java.lang.String toMatch\)
    :   Filters a source vector of forums to return a new vector that contains a map pair that matches the specified name filter criteria.

        This command takes the following parameters:

        inputVector
        :   The source vector that contains the map collection.

        toMatch
        :   Java regular expression pattern that represents matching criteria. This pattern is used to search the name of the forums. The pattern must match the full name and is case-sensitive. You can use the following keys:

            -   Period \(.\) matches any character.
            -   Plus sign \(+\) matches one or more instances of the previous character. For example, .+ matches all sequences of one or more characters.
            -   Asterisk \(\*\) matches zero or more instances of the previous character. For example, \* matches all sequences of characters.
            -   \[chars\] matches any one character within the square brackets \(\[\]\). For example, \[Gg\] matches either an uppercase or lowercase G.
            -   \[A-Z\] matches a range of characters.
6.  To restore deleted content, use the following commands:

    ForumsTrashService.undeleteForumsTrash\(vector hashtable\)
    :   Restores a deleted forum or forums, where you specify the forum or forums that you want to restore by using the hashtable parameter.

        For example:

        ```
        ForumsTrashService.undeleteForumsTrash(forumsTrash)
        ```

    ForumsTrashService.undeleteTopicsTrash\(vector hashtable\)
    :   Restores a deleted forum topic or topics, where you specify the topic or topics that you want to restore by using the hashtable parameter.

        For example:

        ```
        ForumsTrashService.undeleteTopicsTrash(topictrash)
        ```


To identify the forums that you want to restore from the trash, generate a variable that contains a list of forums and then filter that list by forum name:

1.  Create a variable that contains a list of forums in the trash. You can get a list of forums in hash table format by using one of the fetchForums commands: ForumsTrashService.fetchForumsTrash\(\) or ForumsTrashService.fetchForumsTrashByDate\(String modifySince\).

    For example:

    ```
    april4Trash = ForumsTrashService.fetchForumsTrashByDate("2011.04.11")
    ```

2.  Filter the list of forums to find the forum or forums that you want to restore:

    For example, to find a forum with the name Forum1:

    ```
    myForums = ForumsTrashService.filterForumsByName(april4Trash,"Forum1")
    ```

    Alternatively, you can filter the list of forums to find forums that have a name that begins with "Forum" and store the results in the myForums variable:

    ```
    myForums = ForumsTrashService.filterForumsByName(april4Trash,"Forum.*")
    ```

3.  Restore the forum or forums by passing the variable to the undeleteForumsTrash command.

    For example:

    ```
    ForumsTrashService.undeleteForumsTrash(myForums)
    ```


**Parent topic:**[Managing forum trash](../admin/c_admin_forums_manage_trash.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Moving forums to the trash](../admin/t_admin_forums_soft_delete.md)

[Deleting topics from forums](../admin/t_admin_forums_delete_topic.md)

[Filtering lists of forums](../admin/t_admin_forums_filter_forum_list.md)

