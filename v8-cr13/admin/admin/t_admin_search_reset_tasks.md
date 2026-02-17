# Restoring the default scheduled tasks for Search {#t_admin_search_reset_tasks .task}

Use a SearchService administrative command to delete all scheduled tasks from the Home page database and restore the tasks that are configured by default when you first install HCL Connections. You can also use SearchService commands to restore individual default tasks.

To use SearchService administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

!!! note 
    
    If the effect of resetting the default scheduled tasks for Search is to update the indexing task by adding an application that is not already part of any indexing task and is not currently indexed in the Search index, you must initially index that application. In a production environment, first make a backup of your Search index, and then use the startBackgroundIndex command to add the new application to your Search index backup. Replace the current index with the resulting new index before you run the reset command. If you do not replace the index, indexing on nodes that do not have a search index containing resume points for all the applications contained in the task does not proceed. Also, all Search indexing stops.

1.  To restore the default scheduled tasks for Search, complete the following steps.
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

4.  To restore the full set of default tasks, use the following command:

    ```SearchService.resetAllTasks()```
    
        Deletes all scheduled task definitions from the Home page database and restores the default set of tasks. For more information about these tasks, see *Search default scheduled tasks*.

        This command does not take any parameters.

        When the command runs successfully, 1 is printed to the wsadmin console. If the command does not run successfully, 0 is printed to the wsadmin console.

5.  To reset individual default tasks, use the following commands with the parameters provided here:

    - ```20min-file-retrieval-task```
       
       For example:

       ```
        SearchService.addFileContentTask("20min-file-retrieval-task", 
        "0 1/20 0,2-23 * * ?", "0 10/20 0,2-23 * * ?", "all_configured", "false", "true")
        ```

    - ```15min-search-indexing-task```
        
        For example:

        ```
        SearchService.addIndexingTask("15min-search-indexing-task", 
        "0 1/15 0,2-23 * * ?", "0 10/15 0,2-23 * * ?", "all_configured", "false", "true")
        ```

    - ```20min-file-content-indexing-task```
    
        For example:

        ```
        SearchService.addFileContentIndexingTask("20min-file-content-indexing-task",
        "0 11,31,51 0,2-23 * * ?", "0 29,49,09 0,2-23 * * ?",
        "all_configured", "300")
        ```

    - ```nightly-optimize-task```
    
        For example:

        ```
        SearchService.addOptimizeTask("nightly-optimize-task","0 30 1 * * ?",
        "0 35 1 * * ?", "true")
        ```

    - ```nightly-sand-task```
        
        For example: 

        ```
        SearchService.addSandTask("nightly-sand-task",   "0 0 1 * * ?", 
        "0 5 1 * * ?", "evidence,graph, manageremployees,tags,taggedby,
        communitymembership," "true")
        ```

    For more information about these default scheduled tasks, see *Search default scheduled tasks*.

6.  To refresh the Home page database and purge it of information that is related to the deleted task or tasks, use the following command:

    ```SearchService.refreshTasks()```


**Parent topic:**[Configuring scheduled tasks](../admin/c_admin_search_configure_scheduled_tasks.md)

**Related information**  


[Search default scheduled tasks](../admin/r_admin_search_default_indexing_tasks.md)

[Adding scheduled tasks for Search](../admin/t_admin_search_configure_index_tasks.md)

[Deleting scheduled tasks for Search](../admin/t_admin_search_delete_task_definition.md)

