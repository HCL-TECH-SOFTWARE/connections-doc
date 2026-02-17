# Reloading the Search application {#t_admin_search_reload_search .task}

After making configuration changes to Search, you can use SearchService commands to reload the Search index and configuration, and avoid the need for restarting the Search application.

To use SearchService administrative commands, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

You can use the SearchService commands for reloading Search after running SearchCellConfig commands if it is not feasible to restart the Search application. You might want to use the commands for reloading the index as part of restoring a Search index backup if it is not feasible to stop the Search application.

1.  To reload the Search application, complete the following steps.
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

4.  Use the following commands to reload the Search configuration and index:

    SearchService.reloadSearchConfiguration\(\)
    :   Reloads the search-config.xml file for Search on the current node only without a restart of the Search application.

        **Note:** If you are making changes to the configuration of the social analytics service, you still need to restart Search to apply the changes.

        When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

    SearchService.reloadSearchConfigurationAllNodes\(\)
    :   Reloads the search-config.xml file for Search on all nodes in the cluster without a restart of the Search application.

        **Note:** If you are making changes to the configuration of the social analytics service, you still need to restart Search to apply the changes.

        When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

    SearchService.reloadIndex\(\)
    :   Reloads the Search index on the current node only without a restart of the Search application.

        **Note:** If you are making changes to the configuration of the social analytics service, you still need to restart Search to apply the changes.

        When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

    SearchService.reloadIndexAllNodes\(\)
    :   Reloads the Search index on all the nodes in the cluster without a restart of the Search application.

        **Note:** If you are making changes to the configuration of the social analytics service, you still need to restart Search to apply the changes.

        When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.


**Parent topic:**[Managing the Search application](../admin/c_admin_manage_search.md)

**Related information**  


[Configuring index backup settings](../admin/t_admin_search_configure_backup_settings.md)

[Configuring file attachment indexing settings](../admin/t_admin_search_config_search_attachments.md)

[Configuring the number of crawling threads](../admin/t_admin_search_set_max_crawling_threads.md)

[Restoring a Search index without restarting individual nodes](../admin/t_admin_search_restore_index_wo_restarting.md)

[Configuring dictionaries for Search](../admin/c_admin_search_configure_dictionaries.md)

