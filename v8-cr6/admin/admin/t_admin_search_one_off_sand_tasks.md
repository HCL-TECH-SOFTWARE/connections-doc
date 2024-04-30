# Running one-off social analytics scheduled tasks {#t_admin_search_one_off_sand_tasks .task}

Use the SearchService.sandIndexNow command to create a one-off scheduled task for the social analytics service. The task is scheduled to run once and only once, 30 seconds after being called.

To use SearchService administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

The social analytics indexing process includes the following five jobs. You can schedule these jobs individually or in a batch.

evidence
:   Builds the evidence index, which links people to results and maps user connections.

graph
:   Builds the graph of connections between users.

manageremployees
:   Provides details of manager relationships so that people's relationships through their management can be identified. For example, when two people share a second line manager.

tags
:   Generates index documents for each used tag and stores the list of users that have used that tag.

taggedby
:   Creates relationships between the users who have tagged each other's profiles.

communitymembership
:   Creates relationships between the users who are members of the same community.

    **Note:** Communities that have more than 100 members are skipped. These communities will not be recommended to users.

1.  To run a one-off social analytics scheduled task, complete the following steps:
2.  Start the wsadmin client from one of the following directories on the system on which you installed the Deployment Manager:

    Linux: `[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin`

    Windows: `[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/bin`

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  After the wsadmin command environment has initialized, enter the following command to initialize the Search environment and start the Search script interpreter:

    ```
    execfile("searchAdmin.py")
    ```

    If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    When the command is run successfully, the following message displays:

    ```
    Search Administration initialized
    ```

4.  Use the following command:

    SearchService.sandIndexNow\(String jobs\)
    :   Creates a one-off social analytics task that indexes the specified services 30 seconds after being called.

        This command takes a single argument:

        -   jobs. The name, or names, of the jobs to be run when the task is triggered. This argument is a string value. To run multiple jobs, use a comma-delimited list. The following values are valid: evidence, graph, manageremployees, tags, taggedby, and communitymembership.
        For example:

        ```
        SearchService.sandIndexNow("evidence,graph,manageremployees,tags,taggedby,communitymembership")
        ```


**Parent topic:**[Administering the social analytics service](../admin/c_admin_search_sand_indexing_tasks.md)

**Related information**  


[Running one-off tasks](../admin/t_admin_search_one_off_tasks.md)

[Listing social analytics scheduled tasks](../admin/t_admin_search_list_sand_tasks.md)

