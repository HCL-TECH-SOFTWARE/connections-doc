# Applying property changes for Search {#t_admin_search_apply_property_changes .task}

After making changes to Search configuration settings, you must check in the configuration settings and restart the servers to apply the changes.

To perform the following steps, you must first initialize the Search configuration environment. For more information about how to do this, see *Accessing the Search configuration file*.

1.  Complete your configuration changes.

2.  Check in the updated search-config.xml configuration file using the following wsadmin client command:

    SearchCellConfig.checkInConfig\(\)

3.  To exit the wsadmin client, type exit at the prompt.

4.  Stop the server or servers hosting the Search application, and then restart the Search servers.

    The next time the scheduled task runs, persisted seedlists are retained after indexing finishes.


