# Administering community queued events {#t_admin_communities_event_admin .task}

Use the CommunitiesQEventService commands to administer the lifecycle events that occur within a community.

To use administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

When a community member changes community, for example, adding an application to the community, remote applications can choose to be notified of this change by an event. If the remote application is unavailable or is otherwise unable to process the event, the event is stored in a queue. When the IBM® WebSphere® Application Server scheduler runs the LifeCycleRetryQueuedEvents task, the event is processed. However, if, for some reason, you don't want to wait for the scheduled task, you can manage these queued events manually by running the CommunitiesQEventService commands.

1.  To administer the queued events that are associated with a community, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter will not execute correctly.

3.  Start the Communities Jython script interpreter using the following command:

    ```
    execfile("communitiesAdmin.py")
    ```

    If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

4.  Use the following commands to administer queued events.

    -   To retrieve a list of the events currently queued for processing, use the following commands:

        CommunitiesQEventService.viewQueuedEventsSummary\(\)
        :   Lists a summary of all of the lifecycle replay events that are currently queued for processing.

        CommunitiesQEventService.viewQueuedEventsByResourceType\(String resourceType, HashMap lastEvent, int maxRows\)
        :   Lists the queued lifecycle replay events with the specified resource type, where:

            -   resourceType is the string "community".
            -   lastEvent specifies the last row of the previous batch. This parameter is a HashMap object. To obtain the first batch, specify None.
            -   maxRows is the number of rows to be retrieved and viewed with a single command. Use maxRows when there are many rows, 200, for example, to break up both the database reads and the display into batches.
            For example:

            ```
            CommunitiesQEventService.viewQueuedEventsByResourceType("community", None, 100)
            ```

            This command returns a HashMap that is the last viewed row. When there are no more rows, the value None is returned. This parameter makes it straightforward to loop over all rows a few rows at a time.

            For example, you might use the following Jython code to display all queued events of resourceType community in batches of 10 when there are 200 events:

            ```
            lastRow = CommunitiesQEventService.viewQueuedEventsByResourceType
               ("community", None, 10)
               while (lastRow != None)
               lastRow = CommunitiesQEventService.viewQueuedEventsByResourceType
               ("community", lastRow, 10)
            ```

        CommunitiesQEventService.viewQueuedEventsByResourceId\(String resourceType, String resourceId, HashMap lastEvent, int maxRows\)
        :   Lists the queued lifecycle replay events with the specified resource type and resource ID, where:

            -   resourceType is the string "community".
            -   resourceId is the communityUuid. This parameter is a string.
            -   lastEvent is a HashMap object.
            -   maxRows is the number of rows to be retrieved and viewed with a single command. Use maxRows when there are many rows, 200, for example, to break up both the database reads and the display into batches.
            This command returns a HashMap, which is the last viewed row. When there are no more rows, the value None is returned. This parameter makes it straightforward to loop over all rows a few at a time.

            For example:

            ```
            CommunitiesQEventService.viewQueuedEventsByResourceId
                ("community", "e952cf0c-a86c-4e26-b1e0-f8bf40a75804", None, 100)
            ```

            For example, you might use the following Jython code to display all queued events of resourceType "community" and resourceId b46300c7-7837-4ba3-b26b-3fcf67a75bba, in batches of 10 when there are 200 entries:

            ```
            lastRow = CommunitiesQEventService.viewQueuedEventsByResourceId
               ("community", "b46300c7-7837-4ba3-b26b-3fcf67a75bba", None, 10)
            while (lastRow != None)
            lastRow = CommunitiesQEventService.viewQueuedEventsByResourceId
               ("community", "b46300c7-7837-4ba3-b26b-3fcf67a75bba", None, 10)
            ```

        CommunitiesQEventService.viewQueuedEventsByRemoteAppDefId\(String remoteAppDefId, HashMap lastEvent, int maxRows\)
        :   Lists the queued lifecycle replay events that are associated with the specified remote application ID, where:

            -   remoteAppDefId is one of the following: Activities, Blog, IdeationBlog, Files, Forum, Wiki, and StatusUpdates. The application IDs are case-sensitive and must be entered as indicated in this documentation.
            -   lastEvent specifies the last row of the previous batch. This parameter is a HashMap object. To obtain the first batch, specify None.
            -   maxRows is the number of rows to be retrieved and viewed with a single command. Use maxRows when there are many rows, 200, for example, to break up both the database reads and the display into batches.
            This command returns a HashMap that is the last viewed row. When there are no more rows, the value None is returned. This parameter makes it straightforward to loop over all rows a few at a time.

            For example:

            ```
            CommunitiesQEventService.viewQueuedEventsByRemoteAppDefId("Blog", None, 100)
            ```

            To display all queued events of remoteAppDefId type Activities in batches of 10, when there are 200 entries, you might code in Jython:

            ```
            lastRow = CommunitiesQEventService.viewQueuedEventsByRemoteAppDefId
              ("Activities", None, 10) while (lastRow != None)
            lastRow = CommunitiesQEventService. viewQueuedEventsByRemoteAppDefId
              ("Activities", lastRow, 10)
            ```

        CommunitiesQEventService.viewQueuedEventsByRemoteAppDefIdAndEventType\(String remoteAppDefId, String eventType, HashMap lastEvent, int maxRows\)
        :   Lists the queued lifecycle replay events that are associated with the specified remote application ID, where:

            -   remoteAppDefId is one of the following: Activities, Blog, IdeationBlog, Files, Forum, Wiki, and StatusUpdates. The application IDs are case-sensitive and must be entered as indicated in this documentation.
            -   eventType specifies the event type to limit the query to.
            -   lastEvent specifies the last row of the previous batch. This parameter is a HashMap object. To obtain the first batch, specify None.
            -   maxRows is the number of rows to be retrieved and viewed with a single command. Use maxRows when there are many rows, 200, for example, to break up both the database reads and the display into batches.
            This command returns a HashMap that is the last viewed row for the specified event type. When there are no more rows, the value None is returned. This parameter makes it straightforward to loop over all rows a few at a time.

            For example:

            ```
            CommunitiesQEventService.viewQueuedEventsByRemoteAppDefIdAndEventType("Blog", "community.updated", None, 100)
            ```

            To display all queued events of remoteAppDefId type Activities in batches of 10, when there are 200 entries, you might code in Jython:

            ```
            lastRow = CommunitiesQEventService.viewQueuedEventsByRemoteAppDefIdAndEventType
              ("Activities", "community.updated", None, 10) 
            while (lastRow != None)
            lastRow = CommunitiesQEventService.viewQueuedEventsByRemoteAppDefIdAndEventType
              ("Activities", "community.updated", lastRow, 10)
            ```

    -   Use the following commands to retry events that failed to process. After you run one of these commands, run the CommunitiesQEventService.viewQueuedEventsByResourceType command to make sure that the queue is empty. In some rare cases it might be necessary to run a retryQueuedEvents command multiple times to process and remove all events:

        CommunitiesQEventService.retryQueuedEventsByResourceType\(String resourceType\)
        :   Retries queued lifecycle replay events with the specified resource type, where resourceType is a string. The value of resourceType is always "community".

            The return value is either "retry succeed" or 0. 0 indicates failure.

            For example:

            ```
            CommunitiesQEventService.retryQueuedEventsByResourceType("community")
            ```

        CommunitiesQEventService.retryQueuedEventsByResourceId\(String resourceType, String resourceId\)
        :   Retries queued lifecycle replay events with the specified resource type and resource ID, where resourceType and resourceId are both strings.

            The resourceType parameter is always set to "community". The resourceId parameter is a value that can be obtained by using one of the CommunitiesQEventService.viewQueuedEvents commands.

            The return value is either 1 or 0. 1 indicates success; 0 indicates failure.

            For example:

            ```
            CommunitiesQEventService.retryQueuedEventsByResourceId("community", 
                 "e952cf0c-a86c-4e26-b1e0-f8bf40a75804")
            ```

        CommunitiesQEventService.retryQueuedEventsByRemoteAppDefId\(String remoteAppDefId\)
        :   Retries queued lifecycle replay events with the specified associated application ID, where remoteAppDefId is one of the following: Activities, Blog, IdeationBlog, Files, Forum, Wiki, and StatusUpdates. The application IDs are case-sensitive and must be entered as indicated in this documentation.

            The return value is either 1 or 0. 1 indicates success; 0 indicates failure.

            For example:

            ```
            CommunitiesQEventService.retryQueuedEventsByRemoteAppDefId("Wiki")
            ```

    -   Use the following commands to clear the queue of events that waiting to be processed. For example, if your organization has communities that have activities that are associated with them and you uninstall the Activities application from your deployment, you need to purge Activities events so that they aren't perpetually retried. Use these commands with care.

        CommunitiesQEventService.clearQueuedEventsByResourceType\(String resourceType\)
        :   Clears queued lifecycle replay events with the specified resource type, where resourceType is a string. The events are removed from the queue and are not processed.

            The resourceType parameter is always "community".

            The return value is the number of events that were cleared.

            For example:

            ```
            CommunitiesQEventService.clearQueuedEventsByResourceType("community")
            ```

        CommunitiesQEventService.clearQueuedEventsByResourceId\(String resourceType, String resourceId\)
        :   Clears queued lifecycle replay events with the specified resource ID, where resourceType and resourceId are both strings. The events are removed from the queue and are not processed.

            The resourceType parameter is always set to "community". The resourceId parameter is a value that can be obtained by using one of the CommunitiesQEventService.viewQueuedEvents commands.

            The return value is the number of events that were cleared.

            For example:

            ```
            CommunitiesQEventService.clearQueuedEventsByResourceId("community", 
                 "e952cf0c-a86c-4e26-b1e0-f8bf40a75804")
            ```

        CommunitiesQEventService.clearQueuedEventsByRemoteAppDefId\(String remoteAppDefId\)
        :   Clears queued lifecycle replay events with the specified associated application ID, where remoteAppDefId is one of the following: Activities, Blog, IdeationBlog, Files, Forum, Wiki, and StatusUpdates. The application IDs are case-sensitive and must be entered as indicated in this documentation.

            The return value is the number of events that were cleared.

            For example:

            ```
            CommunitiesQEventService.clearQueuedEventsByRemoteAppDefId("Wiki")
            ```

        CommunitiesQEventService.clearQueuedEventByEventId\(String eventId\)
        :   Clears queued lifecycle replay events with the specified event ID, where eventId is a string. The events are removed from the queue and are not processed.

            The return value is the number of events that were cleared.

            For example:

            ```
            CommunitiesQEventService.clearQueuedEventsByEventId
                ("2d93497d-065a-4022ae25-a4b52598d11a")
            ```


Here are some examples of queued event commands and their output.

viewQueuedEventsSummary\(\)

```
wsadmin>CommunitiesQEventService.viewQueuedEventsSummary()
App Def Id        Number        Events            Earliest Created
Activities        1             2009-03-28        11:56:44.453
Blog              1             2009-03-28        11:56:44.453
Files             2             2009-03-28        11:56:44.453
Forum             1             2009-03-28        11:56:44:453
Wiki              2             09-03-28          11:56:44.453

{NumEvents=2, RemoteAppDefId=Wiki, EarliestCreated=2009-03-28 11:56:44.453}
wsadmin>
```

viewQueuedEventsByResourceType

```
wsadmin>CommunitiesQEventService.viewQueuedEventsByResourceType("community", None, 100)
Remote App   Resource Id                           Event Type                     Event Id
Blog         e952cf0c-a86c-4e26-b1e0-f8bf40a75804  community.visibility.changed   47362aa9-dfd7-43d4-bf42-3b069b0cbbbf
Files        e952cf0c-a86c-4e26-b1e0-f8bf40a75804  community.updated              7685892-d8a8-4563-a433-1392b8b58e01
Forum        e952cf0c-a86c-4e26-b1e0-f8bf40a75804  community.updated              1ab5492-d1a5-4114-0334-98882b8b58e01
Wiki         e952cf0c-a86c-4e26-b1e0-f8bf40a75804  community.updated              dccb0a7d-d6d4-4daa-9c03-6658a57631d0
Activities   e952cf0c-a86c-4e26-b1e0-f8bf40a75804  community.visibility.changed   3a4f2d84-8d7f-4a40-bc3c-36e02e9bb97b
Files        e952cf0c-a86c-4e26-b1e0-f8bf40a75804  community.visibility.changed   92c9f965-a8a3-481e-a0d4-0fdb856bb875
Forum        e952cf0c-a86c-4e26-b1e0-f8bf40a75804  community.visibility.changed   0325f966-f843-4065-6044-bddb856bb876
Wiki         e952cf0c-a86c-4e26-b1e0-f8bf40a75804  community.visibility.changed   ff635551-c59e-4ee7-b10f-0ca6e210c318

{ResourceId=e952cf0c-a86c-4e26-b1e0-f8bf40a75804, ManAppDefId=Wiki, ResourceType=1, Inserted=2009-03-28 15:57:26.000, EventId=ff635551-c59e-4ee7-b10f-0ca6e210c318, EventType=community.visibility.changed, InsertedLong=1238270246000}
wsadmin>
```

viewQueuedEventsByRemoteDefAppId

```
wsadmin>CommunitiesQEventService.viewQueuedEventsByRemoteAppDefId("Activities", None, 100)
Resource Type Id  Resource Id                           Event Type                    Event Id
1                 e952cf0c-a86c-4e26-b1e0-f8bf40a75804  community.visibility.changed  3a4f2d84-8d7f-4a40-bc3c-36e02e9bb97b

{ResourceId=e952cf0c-a86c-4e26-b1e0-f8bf40a75804, RemAppDefId=Activities, ResourceType=1, Inserted=2009-03-28 15:57:25.873, EventId=3a4f2d84-8d7f-4a40-bc3c-36e02e9bb97b, EventType=community.visibility.changed, InsertedLong=1238270245873}
```

viewQueuedEventsByRemoteAppDefId

```
wsadmin>CommunitiesQEventService.viewQueuedEventsByRemoteAppDefId("Wiki", None, 100)
Resource Type Id   Resource Id                           Event Type                    Event Id
1                  e952cf0c-a86c-4e26-b1e0-f8bf40a75804  community.updated             dccb0a7d-d6d4-4daa-9c03-6658a57631d0
1                  e952cf0c-a86c-4e26-b1e0-f8bf40a75804  community.visibility.changed  ff635551-c59e-4ee7-b10f-0ca6e210c318

{ResourceId=e952cf0c-a86c-4e26-b1e0-f8bf40a75804, RemAppDefId=Wiki, ResourceType=1, Inserted=2009-03-28 15:57:26.000, EventId=ff635551-c59e-4ee7-b10f-0ca6e210c318, EventType=community.visibility.changed, InsertedLong=1238270246000}
wsadmin>
```

viewQueuedEventsByRemoteAppDefId

```
wsadmin>CommunitiesQEventService.viewQueuedEventsByRemoteAppDefId("Blog", None, 100)
Resource Type Id      Resource Id                               Event Type
1                     e952cf0c-a86c-4e26-b1e0-f8bf40a75804      community.visibility.changed
        Event Id
        47362aa9-dfd7-43d4-bf42-3b069b0cbbbf

{ResourceId=e952cf0c-a86c-4e26-b1e0-f8bf40a75804, RemAppDefId=Blog, ResourceType=1, Inserted=2009-03-28 15:57:21.450, EventId=47362aa9-dfd7-43d4-bf42-3b069b0cbbbf, EventType=community.visibility.changed, InsertedLong=1238270241450}
wsadmin>
```

viewQueuedEventsByResourceId

```
wsadmin>CommunitiesQEventService.viewQueuedEventsByResourceId("community", "e952cf0c-a86c-4e26-b1e0-f8bf40a75804", None, 100)
Remote App  Resource Id                           Event Type                    Event Id
Blog        e952cf0c-a86c-4e26-b1e0-f8bf40a75804  community.visibility.changed  47362aa9-dfd7-43d4-bf42-3b069b0cbbbf
Files       e952cf0c-a86c-4e26-b1e0-f8bf40a75804  community.updated             f7685892-d8a8-4563-a433-1392b8b58e01
Forum       e952cf0c-a86c-4e26-b1e0-f8bf40a75804  community.updated             1ab5492-d1a5-4114-0334-98882b8b58e01
Wiki        e952cf0c-a86c-4e26-b1e0-f8bf40a75804  community.updated             dccb0a7d-d6d4-4daa-9c03-6658a57631d0
Activities  e952cf0c-a86c-4e26-b1e0-f8bf40a75804  community.visibility.changed  3a4f2d84-8d7f-4a40-bc3c-36e02e9bb97b
Files       e952cf0c-a86c-4e26-b1e0-f8bf40a75804  community.visibility.changed  92c9f965-a8a3-481e-a0d4-0fdb856bb875
Forum       e952cf0c-a86c-4e26-b1e0-f8bf40a75804  community.visibility.changed  0325f966-f843-4065-6044-bddb856bb876
Wiki        e952cf0c-a86c-4e26-b1e0-f8bf40a75804  community.visibility.changed  ff635551-c59e-4ee7-b10f-0ca6e210c318

{ResourceId=e952cf0c-a86c-4e26-b1e0-f8bf40a75804, ManAppDefId=Wiki, ResourceType=1, Inserted=2009-03-28 15:57:26.000, EventId=ff635551-c59e-4ee7-b10f-0ca6e210c318, EventType=community.visibility.changed, InsertedLong=1238270246000}
wsadmin>
```

**Parent topic:**[Administering widgets and remote applications](../admin/c_admin_communities_administering_widgets.md)

**Related information**  


[Managing Communities scheduled tasks](../admin/t_admin_communities_manage_scheduled_tasks.md)

