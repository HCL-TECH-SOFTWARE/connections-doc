# Setting the timeout for seedlist requests {#t_admin_search_set_seedlist_timeout .task}

You can set the default timeout for seedlist requests by creating an IBM® WebSphere® Application Server environment variable and specifying the required value of the timeout.

By default, seedlist requests time out after 240 seconds. This default setting overrides the timeout for server-to-server requests that is defined in the LotusConnections-config.xml file, which is 60 seconds. You can override the default seedlist request timeout by creating a WebSphere Application Server variable named SEARCH\_SEEDLIST\_TIMEOUT and setting the required value of the timeout in milliseconds.

1.  Using an administrator ID, log in to the WebSphere Application Server Integrated Console associated with the profile to which you installed HCL Connections. If you installed the applications to multiple WebSphere Application Server profiles, log in to the console associated with the appropriate profile.

2.  Expand **Environment** and click **WebSphere variables**.

3.  Select the relevant cell from the **Scope** drop-down list and click **New**.

4.  Enter SEARCH\_SEEDLIST\_TIMEOUT in the **Name** field.

5.  Enter a value in milliseconds in the **Value** field.

    **Note:** **Value** is milliseconds, not seconds.

6.  Enter a description of the variable in the **Description** field, and then click **OK**.

7.  Stop the affected servers and start those servers again to put the variable configuration change into effect.

    If the change you made affects a node, you must stop and restart all of the servers on that node. Similarly if the change you made affects a cell, you must stop and restart all of the servers in that cell.

    **Note:** For a high-availability deployment, stop and start the servers in turn to ensure that the Search application is still available to your users.


**Parent topic:**[Managing the Search application](../admin/c_admin_manage_search.md)

**Related information**  


[Changing WebSphere Application Server environment variables](../admin/t_admin_common_change_was_env_variable.md)

[WebSphere Application Server environment variables](../admin/r_admin_common_was_env_variables.md)

