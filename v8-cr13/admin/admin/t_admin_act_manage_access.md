# Managing member access to activities {#t_admin_act_manage_access .task}

Use administrative commands to change the level of access that members have to one or more activities.

To run administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

**Note:** You cannot use the AccessControlService commands to fetch, set, or delete access to community activities. See Communities administrative commands for information about the commands you can use to add a person to a community.

1.  Use the following command to access the Activities configuration file:

    ```
    execfile("activitiesAdmin.py")
    ```

    If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

2.  Find the hash table identifier for the activity or activities for which you want to edit the access levels. Fetch the ActivityID from the output by running the following command.

    ```
    ActivityService.fetchActivities() 
    ```

3.  Identify the activity or activities that you want to edit from the returned list. For more information, see *Getting a list of activities*.

    For example:

    ```
    ActivityService.fetchActivities()
    		 ActivityService.fetchDeletedActivities()
    		 ActivityService.fetchCompletedActivities()
    		 ActivityService.fetchActivitiesByDate(dateType, beginTime, endTime, lastUUID)
    		 ActivityService.fetchActivityById(uuid)
    		 ActivityService.fetchActivitiesCreatedByMember(java.util.Hashtable member)
    		 ActivityService.fetchActivitiesByMember(java.util.Hashtable member)
    		 ActivityService.fetchActivitiesByOwner(java.util.Hashtable member)
    ```

4.  Enter the following commands to see the current access levels of the members of a single activity:

    ```
    ActivityService.fetchActivityById(uuid)
    AccessControlService.fetchAccess(java.util.Hashtable activity)
    ```

    For example:

    ```
    myactivities=ActivityService.fetchActivityById(bc92738c-492c-4b52-8eee-c8ab6e2bd84d)
    AccessControlService.fetchAccess(myactivities) 
    ```

5.  Create a variable that contains information about one or more people to whom you would like to grant access to the activities.

    -   If you are defining the owner of an activity, save the member information as a hash table variable. The setOwnerAccess command expects the member parameter to be provided in hash table format. To do so, use the following command:

        ```
        ActivitiesMemberService.fetchMemberByName(name)
        ```

        For example:

        ```
        jane=ActivitiesMemberService.fetchMemberByName("Jane Fairfax")
        ```

    -   If you are granting author or reader access, save the member information as a vector variable. The setMemberAccess and setReaderAccess commands expect the member parameter to be provided in vector format. A vector can represent one person or multiple people. A vector contains one or more hash tables. Each hash table contains information for a single person. To save member information as a vector variable, use the following command:

        ```
        ActivitiesMemberService.fetchMembers(filter)
        ```

        For example:

        ```
        allFairfaxes=ActivitiesMemberService.fetchMembers("*Fairfax")
        ```

        or

        ```
        frank=ActivitiesMemberService.fetchMembers("Frank Fairfax")
        ```

6.  Use the following commands to make the access level changes that you want to make:

    -   To grant many people owner-level access to one or more activities:

        ```
        AccessControlService.setOwnersAccess(java.util.Vector activities, 
         java.util.Hashtable owner)
        ```

        For example:

        ```
        AccessControlService.setOwnersAccess(myactivities,ownerlist) 
        
        ```

    -   To grant one person owner-level access to one or more activities:

        ```
        AccessControlService.setOwnerAccess(java.util.Vector activities, 
         java.util.Hashtable owner)
        ```

        For example:

        ```
        AccessControlService.setOwnerAccess(myactivities,jane)
        ```

    -   To grant one person or many people author-level access to one or more activities:

        ```
        AccessControlService.setMembersAccess(java.util.Vector activities, 
         java.util.Vector members)
        ```

        For example:

        ```
        AccessControlService.setMembersAccess(activities,allFairfaxes)
        ```

    -   To grant one person or many people reader-level access to one or more activities:

        ```
        AccessControlService.setReadersAccess(java.util.Vector activities, 
         java.util.Vector members)
        ```

        For example:

        ```
        AccessControlService.setReadersAccess(activities,frank)
        ```

    -   To deny access to a set of members:

        ```
        AccessControlService.deleteAccess(java.util.Vector activities, 
         java.util.Vector members)
        ```

        For example:

        ```
        AccessControlService.deleteAccess(activities,allFairfaxes)
        ```


```

wsadmin>execfile("activitiesAdmin.py") 
wsadmin>newmember=ActivitiesMemberService.fetchMemberByEmail("newguy@cat.com") 
wsadmin>act=ActivityService.fetchActivityById("bc92738c-492c-4b52-8eee-c8ab6e2bd84d") 
wsadmin>from java.util import Vector 
wsadmin>newmembervec=Vector() 
wsadmin>newmembervec.add(newmember)   Note: This returns a '1'
wsadmin>actvec = Vector()
wsadmin>actvec.add(act)   Note: This returns a '1'
wsadmin>AccessControlService.setOwnersAccess(actvec,newmembervec)

```

**Parent topic:**[Managing activity membership](../admin/c_admin_act_manage_membership.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Getting a list of activities](../admin/t_admin_act_fetch_activities.md)

