# Purging content from the index {#t_admin_search_purge_feature_content .task}

Use the SearchService.deleteFeatureIndex command to purge content for a specific application from the Search index in a single-node environment.

To run administrative commands, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

**Note:** In an environment with multiple nodes, use the SearchService.deleteFeatureIndex command only when you want to delete the index for an application that has been uninstalled. After running this command, the content from the component that has been deleted cannot be reindexed. If you want to delete content for a specific application from the index, use the SearchService.startBackgroundIndex command to rebuild a new index for all applications instead. For more information about this command, see *Creating a background index*.

If there is a problem with indexed content from any of the HCL Connections applications, instead of deleting and recreating the entire index, you can use the SearchService.deleteFeatureIndex command to remove and purge all documents for a given application from the index. The command deletes the content from the database that is shared by all the servers in the cluster as well as from the indexes.

When you run the SearchService.deleteFeatureIndex command, the command removes indexed content for the specified application from the node in your deployment. Indexing tasks are automatically disabled at the start of this process and re-enabled when the process is complete, regardless of whether the tasks were disabled initially.

**Note:** When you remove an application from the Search index, you need to rebuild the indexes for the social analytics service. The social analytics indexes are completely rebuilt every night by default, however, to fully remove an application's index immediately, you must use the SearchService.sandIndexNow command on each of the social analytics indexes. For more information about this command, see *Running one-off social analytics scheduled tasks*.

1.  To purge content for a specific application from the index, complete the following steps.
2.  Start the wsadmin client from one of the following directories on the system on which you installed the Deployment Manager:

    Linux: `[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin`

    Windows: `[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/bin`

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

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

4.  Use the following command to remove and purge content from a specified application from the Search index.

    SearchService.deleteFeatureIndex\(String applicationName\)
    :   Removes and purges the content for the specified application from the Search index.

        **Important:** Only use this command if you are uninstalling an application from HCL Connections. After you run the command, the content from the application that has been deleted cannot be reindexed.

        This command takes a string value, which is the name of the application whose content is to be deleted. The following values are valid:

        -   activities
        -   blogs
        -   calendar
        -   communities
        -   dogear
        -   ecm\_files
        -   files
        -   forums
        -   people\_finder
        -   profiles
        -   status\_updates
        -   wikis
        For example:

        ```
        SearchService.deleteFeatureIndex("activities")
        ```

        When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.


**Parent topic:**[Managing the Search index](../admin/c_admin_search_manage_index.md)

**Related information**  


[Running one-off social analytics scheduled tasks](../admin/t_admin_search_one_off_sand_tasks.md)

[SearchService commands](../admin/r_admin_searchservice_commands.md)

[Administering the social analytics service](../admin/c_admin_search_sand_indexing_tasks.md)

[Creating a background index](../admin/t_admin_search_create_standalone_index.md)

