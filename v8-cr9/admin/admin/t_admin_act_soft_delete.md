# Deleting activities {#t_admin_act_soft_delete .task}

Use administrative commands to move one or more activities to the Trash view.

To run administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

1.  Start the Activities Jython script interpreter.

    1.  Use the following command to access the Activities configuration file:

        ```
        execfile("activitiesAdmin.py")
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

2.  If you have not yet created a variable that contains the activities you want to delete, create one. You can get a list of activities in hash table format by using one of the fetchActivities commands. See *Activities administrative commands* for a full list. For example, if a person leaves the organization and you want to delete all of the activities that he owns, you can perform the following steps to narrow down the activities to delete:

    1.  Get a hash table of information related to a specific user:

        ```
        variable=ActivitiesMemberService.fetchMemberByName(java.lang.String member)
        ```

        For example:

        ```
        joe=ActivitiesMemberService.fetchMemberByName("Joe Jacobs")
        ```

    2.  Retrieve the activities that a specific person owns:

        ```
        variable=ActivityService.fetchActivitiesByOwner(java.util.Hashtable member)
        ```

        For example:

        ```
        joesactivities=ActivityService.fetchActivitiesByOwner(joe)
        ```

3.  Enter the following command to delete the activity or activities:

    ```
    ActivityService.deleteActivities(java.util.Vector activities)
    ```

    where you specify the activity or activities that you want to delete as the activities parameter. For example:

    ```
    ActivityService.deleteActivities(joesactivities)
    ```


**Parent topic:**[Managing trash](../admin/t_admin_act_deletions_over.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

