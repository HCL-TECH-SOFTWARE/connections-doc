# Restoring deleted activities {#t_admin_act_restoring_deleted_activities .task}

Use an administrative command to restore activities that were moved to the Trash view. After an activity is moved to the Trash view, and before the Trash is purged from the system, the activity can be preserved if it is restored.

You do not need to check the configuration file in and out nor restart the server when using administrative commands.

To run administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

1.  Open a command window and start the wsadmin command line tool. See *Starting the wsadmin client* for more details.

2.  Start the Activities Jython script interpreter.

    1.  Use the following command to access the Activities configuration file:

        ```
        execfile("activitiesAdmin.py")
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

3.  Get a list of the activities and entries currently in the Trash view by entering the following command:

    ```
    TrashCollectionService.fetchTrash()
    ```

4.  Identify the activity or entry that you want to restore from the returned list. See *Narrowing down results* for more information.

5.  Enter the following command to restore the activity or entry:

    ```
    TrashCollectionService.undeleteTrash( java.util.Vector trashVector)
    ```

    where you specify the activity or entry that you want to restore as the trashVector parameter.


Here is an example where all activities are deleted that start with a\_activities, a\_activities1, a\_activities2, ....

```
Trash=TrashCollectionService.fetchTrash()
   myactivities=ListService.filterActivitiesByName(Trash, "a_act.*")
  TrashCollectionService.undeleteTrash(myactivities)
```

**Parent topic:**[Managing trash](../admin/t_admin_act_deletions_over.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

