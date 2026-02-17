# Deleting topics from forums {#t_admin_forums_delete_topic .task}

Remove unwanted or inappropriate topics from the Forums application.

To run administrative commands, you must use the wsadmin client. For more information, see [Starting the wsadmin client](t_admin_wsadmin_starting.md).

When you remove topics from a forum, the topics are soft-deleted. To remove forum topics from the database completely, you must purge the forum trash. For more information about purging the trash, see *Purging forum trash on a schedule*.

1.  To delete forum topics, complete the following steps.
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

4.  If you have not yet created a variable that contains the forum topics that you want to delete, create one now. You can get a list of forum topics in hash table format by using one of the ForumsTopicsService fetch commands. For more information about these commands and how to use them, see *Getting a list of forum topics*.

    When a user leaves the organization and you want to delete the forum topics that they created, use the following command to identify the forum topics to delete:

    ```
    ForumsTopicsService.fetchTopicsCreatedByMember(String extId, String type)
    ```

    For example:

    ```
    janetstopics=ForumsTopicsService.fetchTopicsCreatedByMember("ajones10@example.com","email")
    ```

    You can also fetch the topics by using the employee's member uuid. For example:

    ```
    janetstopics=ForumsTopicsService.fetchTopicsCreatedByMember("778CE573-78A5-2ECF-8525-7346003DB078","uuid")
    ```

5.  Use the following command to delete forum topics:

    ForumsTopicsService.deleteTopics\(Vector forumtopics\)
    :   Moves the specified forum topics to the trash. Forum topics in the Trash view can be restored if they are restored before the trash is emptied.

        Returns a java.util.Vector. Each object in the vector is a java.util.Hashtable that describes a forum topic that cannot be deleted. A returned empty vector indicates complete success.

        This command takes the following parameter:

        forumtopics
        :   Vector of hash tables that describes the forum topics to be deleted.

        For example:

        ```
        ForumsTopicsService.deleteTopics(janetstopics)
        ```


**Parent topic:**[Managing forum trash](../admin/c_admin_forums_manage_trash.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Purging forum trash on a schedule](../admin/t_admin_forums_purge_trash.md)

[Purging specific forum content from the trash](../admin/t_admin_forums_purge_spec_content.md)

[Restoring deleted forum content](../admin/t_admin_forums_restore_trash.md)

