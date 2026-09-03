# Purging specific activities or entries from the trash {#t_admin_act_delete_oneoff .task}

Use an administrative command to permanently delete a specific activity or entry by removing it from the Trash view.

You do not need to check the configuration file in and out nor restart the server when using administrative commands.

To run administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

1.  Start the Activities Jython script interpreter.

    1.  Use the following command to access the Activities configuration file:

        ```
        execfile("activitiesAdmin.py")
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

2.  Get a list of the activities and entries currently in the Trash view by entering the following command:

    ```
    TrashCollectionService.fetchTrash()
    ```

3.  Identify the activity or entry that you want to delete from the returned list. See [Narrowing down results](t_admin_act_narrow_results.md) for more information.

4.  Enter the following command to delete the activity or entry:

    ```
    TrashCollectionService.purgeTrash( java.util.Vector trashVector)
    ```

    where you specify the activity or entry that you want to delete as the trashVector parameter.


**Parent topic:**[Managing trash](../admin/t_admin_act_deletions_over.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

