# System maintenance {#maintainingthedeployment .concept}

Make sure HCL Connections works properly in your particular environment.

The following sections describe common maintenance tasks for HCL Connections that are not specific to any one application.

-   **[Changing WebSphere Application Server environment variables](../admin/t_admin_common_change_was_env_variable.md)**  
The directory paths to HCL Connections application data and other resources are given associated WebSphere® Application Server environment variables. If you change default paths in your environment, you must update the variables.
-   **[Changing the name of the session cookie ID](../admin/t_admin_common_change_jsessionid.md)**  
The session cookie ID for HCL Connections is named JSESSIONID by default. Other products hosted by the WebSphere® Application Server often use the same name for their session cookie. If IBM® HTTP Server is hosting multiple web servers, you might want to change the cookie name of one of them to prevent the cookie from being lost when the user is redirected from one product to another.
-   **[Scheduling tasks](../admin/c_admin_common_was_scheduler.md)**  
The Activities, Communities, Files, Forums, News, Search, and Wikis applications use the IBM® WebSphere® Application Server scheduling service for performing regular tasks. You can use wsadmin commands to change the schedule by which a task runs or to disable a scheduled task altogether.
-   **[Maintaining application databases](../admin/t_admin_db_maintain.md)**  
Each HCL Connections application stores data in a database, and some also store data on a file system. You must back up these databases and file systems on a regular schedule using the methods documented by the vendor from whom you purchased the database and file system that you are using.
-   **[Removing nodes from a cluster](../admin/c_admin_common_remove_nodes.md)**  
You can remove IBM® WebSphere® Administration Server nodes from a cluster using the Integrated Solutions Console or using a command.
-   **[Backing up and restoring data](../admin/c_admin_common_manage_backups.md)**  
You must back up both the application databases and content stores on a regular schedule using the methods documented by the vendor from whom you purchased the database and file system you are using.

**Parent topic:** [Administering common areas](../admin/c_admin_act_wsadmin.md)

