# Changing the location of the Search index {#t_admin_homepage_change_index_location .task}

By default, the Search index is stored in the search/index subdirectory of the HCL Connections data directory defined at install time, for example, on Linux®, /opt/IBM/Connections/data/local/search/index. This location can be changed by editing the IBM® WebSphere® Application Server variable, SEARCH\_INDEX\_DIR.

Each node running the Search application requires its own dedicated index on the file system. Using a Search index on a network share is not supported. Highly-available network storage, such as a storage area network \(SAN\), can be used but it must be configured to be locally mounted to each node running the Search application.

!!! note 

    Changing the value of the SEARCH\_INDEX\_DIR variable causes the next indexing task that fires to index all content from the beginning, so that the task creates a clean index. This operation might take some time to complete.

1.  To change the location of the Search index, complete the following steps.
2.  Launch the WebSphere Application Server Integrated Solutions Console.

3.  Select **Environment** \> **WebSphere variables**.

4.  Select the **SEARCH\_INDEX\_DIR** environment variable from the list of defined variables.

    Depending on your deployment choices, there might be more than one SEARCH\_INDEX\_DIR variable defined. It is recommended that you have consistent locations for the Search index directory across the nodes in your deployment.

5.  Change all the SEARCH\_INDEX\_DIR variables by selecting each variable, entering a new location for the variable in the **Value** field, and then clicking **OK**.

6.  Save your changes to the configuration.

7.  Restart the Search server or servers for your changes to take effect.


**Parent topic:**[Index settings](../admin/c_admin_search_index_settings.md)

**Related information**  


[Changing WebSphere Application Server environment variables](../admin/t_admin_common_change_was_env_variable.md)

[Managing the Search index](../admin/c_admin_search_manage_index.md)

[The indexing process](../admin/c_admin_search_index_process.md)

[Creating Search indexes](../admin/c_admin_search_create_indexes.md)

[Creating the initial Search index](../admin/t_admin_search_create_initial_index_admin.md)

