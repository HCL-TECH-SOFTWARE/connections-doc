# Narrowing down results {#t_admin_act_narrow_results .task}

Use standard Java™ code or the filtering command provided by the ListService object to retrieve a subset of activities or entries on which you would like to perform an operation.

1.  When you use a command to retrieve a set of resources, use a variable to store the returned data. For example, the following code stores the objects returned from the fetchTrash\(\) command, which are formatted as a java.util.Vector of hash tables that represent activities and entries in the Trash view, in the alltrash variable:

    ```
    alltrash=TrashCollectionService.fetchTrash()
    ```

2.  Do one of the following:

    -   Use the ListService.filterActivitiesByName\(\) command to narrow down the results that you stored in the alltrash variable. For example, the following command finds only those activities in the alltrash variable that have an activity name that begins with "AJ78" and stores them in the myactivity variable:

        ```
        myactivities=ListService.filterActivitiesByName(alltrash, "AJ78.*")
        ```

    -   Use standard Java to parse the returned vector of hash tables and collect a subset of them in the myactivities variable.
3.  Pass the variable containing the subset of resources that you want to operate on into the command. For example, to restore the collected subset of activities that are currently in the Trash view, you could use the following command:

    ```
    TrashCollectionService.undeleteTrash(myactivities)
    ```


**Parent topic:**[Running Activities administrative commands](../admin/t_admin_act_change_admin_props.md)

**Related information**  


[Getting a list of activities](../admin/t_admin_act_fetch_activities.md)

