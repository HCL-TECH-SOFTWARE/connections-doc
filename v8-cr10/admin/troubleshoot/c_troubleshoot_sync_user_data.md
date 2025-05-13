# Troubleshooting user data synchronization {#c_troubleshoot_sync_user_data .concept}

If you find that user data has fallen out of synchronization in one or more applications, use the following information to help restore the data to a synchronized state.

## When Profiles is installed { .section}

When the Profiles application is installed as part of your deployment, there might be a delay in the synchronization of user data between the Profiles database and the other application databases. When troubleshooting synchronization issues, consider the following scenarios:

-   Synchronization commands are sent from Profiles to the other applications every 20 seconds, so typically there is a delay of at least 20 seconds from when the user data is updated in the Profiles database to the time when the other applications receive the command to update the user data in their database.
-   The delay in synchronization can be increased by the load. For example, synchronizing a large number of users in Profiles \(using the sync\_all\_dns or delete\_or\_inactivate\_employees tasks\) can introduce an additional delay in the processing of the commands sent to other applications. Enabling trace logging might help you to determine whether synchronization commands are being processed. For more information, see *Enabling traces in WebSphere® Application Server*.
-   An HCL Connections™ application that was not running when a synchronization command was sent from Profiles will process the command when it starts up. The user data in the application database will not be updated until the application is started.
-   Profiles only sends the synchronization commands to other applications when it is operational. Some IBM® Tivoli® Directory Integrator operations, such as the sync\_all\_dns task, can be run when Profiles is not operational. The Profiles application must be started in order to publish the synchronization commands.

If you are certain that the issues that you are experiencing are not related to these scenarios, you can synchronize user data manually in one of the following ways:

-   If the Profiles database contains up-to-date data for the user, you can force Profiles to publish synchronization commands using the ProfilesService.publishUserDataByUserId\(String userID\) command. For more information about this command, see [Managing user data using Profiles administrative commands](../admin/t_admin_profiles_manage_users.md).
-   You can also use the wsadmin commands provided for each application to synchronize the user data in the database with the user repository. For more information, see [Synchronizing user data using administrative commands](../admin/c_admin_common_sync_via_admin_commands1.md).

## When Profiles is not installed { .section}

When the Profiles application is not installed as part of your deployment, use the wsadmin commands available for each application to synchronize user data. For more information, see [Synchronizing user data using administrative commands](../admin/c_admin_common_sync_via_admin_commands1.md).

**Parent topic:**[Troubleshooting user data propagation](../troubleshoot/ts_c_troubleshoot_user_lifecycle.md)

**Related information**  


[Managing user data using Profiles administrative commands](../admin/t_admin_profiles_manage_users.md)

[Enabling traces in WebSphere Application Server](../troubleshoot/ts_t_enable_was_traces.md)

[Synchronizing user data by using administrative commands](../admin/c_admin_common_sync_via_admin_commands1.md)

