# Running Activities administrative commands {#t_admin_act_change_admin_props .task}

Use administrative commands to perform tasks that manipulate Activities content.

Administrative commands interact with the Activities application and its resources through scripts. These scripts use the AdminControl object available in WebSphere® Application Server wsadmin tool to interact with the Activities server. Each script uses managed Java™ beans \(MBeans\) to get and set server administration properties.

Unlike with configuration properties, when you use these commands to change server administration properties, you do not have to check out any files nor restart the server for the changes to take effect. You do, however, need to understand a bit about how to manipulate Java objects. When you perform server operations using the commands, the activities, member information, and access level information are represented as hash tables. Many of the commands, in fact, return a vector of hash tables that represent Activities resources. Commands you can use to perform tasks, such as deleting, archiving, and restoring activities, all take parameters formatted as vectors of hash tables. See *Narrowing down results* for some tips on how to retrieve a distinct set of activities or other resources that you can then pass to commands that perform server tasks.

When an administrative command is invoked, a SOAP request is made to the Activities application. The number of seconds that the wsadmin client waits for a response to a SOAP request is specified in the com.ibm.SOAP.requestTimeout property specified in the soap.client.props file in the following directory: \{WAS\_HOME\}\\profiles\\\{PROFILE\_NAME\}\\properties. If an Activities command takes longer to complete than the value of the com.ibm.SOAP.requestTimeout property, an error is displayed on the wsadmin console, and any value returned from the invoked method is lost. The Activities command continues to be processed by the Activities application, but the connection that the Activities application had to the client that invoked it is gone. This detail is important to note because some Activities commands take a long time to run. For example, in a system with a large number of Activities, the ActivityService.fetchActivities\(\) command can take a long time to complete. You can monitor the status of these operations by scanning the SystemOut.log file for success and failure messages.

To increase the time interval that passes before a request fails, edit the com.ibm.SOAP.requestTimeout property in the soap.client.props file. This property is a configuration property, so after editing the property, you must restart the server for the change to take effect.

-   **[Activities administrative commands](../admin/r_admin_act_administrative_props.md)**  
Use administrative commands to run administrative tasks on the server.
-   **[Example: Activities administrative session](../admin/r_admin_act_administrative_example.md)**  
The following sample is a typical Activities administrative session. Reference this example to see how various administrative commands are used.
-   **[Getting a list of activities](../admin/t_admin_act_fetch_activities.md)**  
List the activities that you can manipulate programmatically. You can retrieve a list of all activities or filter the list by viewing activities that are associated with a specific member.
-   **[Narrowing down results](../admin/t_admin_act_narrow_results.md)**  
Use standard Java code or the filtering command provided by the ListService object to retrieve a subset of activities or entries on which you would like to perform an operation.
-   **[Managing activity membership](../admin/c_admin_act_manage_membership.md)**  
Use administrative commands to change member access levels and synchronize member IDs.
-   **[Managing trash](../admin/t_admin_act_deletions_over.md)**  
Use administrative commands and edit configuration property settings to move activities and entries to the Trash view, empty the trash, restore activities and entries from the Trash view, mark inactive activities complete, and perform other trash management tasks.
-   **[Managing the scheduler](../admin/t_admin_act_manage_scheduler.md)**  
Use administrative commands to manage scheduled tasks in Activities.
-   **[Exporting activities](../admin/t_admin_act_export_activities.md)**  
Use administrative commands to export activities.
-   **[Importing activities](../admin/t_admin_act_import_activities.md)**  
Use administrative commands to import activities that you exported.

**Parent topic:**[Administering Activities](../admin/c_admin_act_overview.md)

