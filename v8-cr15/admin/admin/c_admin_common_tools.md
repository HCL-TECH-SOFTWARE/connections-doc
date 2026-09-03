# Administration tools {#administrationtools .concept}

Use the wsadmin utility to edit configuration properties or run administrative commands.

The wsadmin utility is a tool provided with WebSphere® Application Server that you can use to manage applications hosted by the WebSphere Application Server, including HCL Connections.

The wsadmin tool runs HCL Connections script-based commands that you enter into a wsadmin command session. Behind the scenes, these scripts are based on the Jython scripting language, and they invoke WebSphere Application Server and HCL Connections commands that do the actual work. These scripts can both change XML-based file values that control an application's configuration and run HCL Connections-supplied MBean commands, which are grouped into services that perform related tasks, such as managing application membership.

You can change the behavior of HCL Connections by using the wsadmin client to perform one of the following actions:

**Edit configuration properties**

These properties control configurable aspects of the applications and are stored in XML-formatted configuration files. When you change these types of properties, you must use scripts that check out the configuration file, make the change, and then check the configuration file back in. After checking in your changes, you must restart the servers for the changes to take effect. In a network deployment, you must also synchronize the nodes to propagate the changes across a cluster.

**Run administrative commands**

Run administrative commands to invoke MBean commands associated with the product applications. MBeans control the applications that run on the server. When you run an administrative command, you must start the Jython script interpreter, but you do not have to check out any configuration files nor restart the server. Your changes take effect immediately.

For more information about using wsadmin tool scripting, see [Using wsadmin scripting](https://www.ibm.com/docs/was/8.5.5?topic=wsadmin-using-scripting) in the IBM® WebSphere Application Server documentation.

The following topics provide more information about using the wsadmin client:

-   **[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)**  
Use the wsadmin client to make configuration changes to applications.
-   **[Editing configuration files](../admin/t_admin_common_checkout_config_file.md)**  
You can edit configuration files either by using the wsadmin client or by editing the files directly.
-   **[Changing common configuration property values](../admin/t_admin_common_changing_config.md)**  
Configuration settings control how and when various common operations take place. You can edit the settings to change how HCL Connections behaves.
-   **[Running administrative commands](../admin/t_admin_common_edit_admin_props.md)**  
Use administrative commands to run tasks on the server.
-   **[Starting or stopping Connections applications](../admin/t_admin_common_startstop_apps.md)**  
HCL Connections applications, such as Files, are WebSphere Enterprise Applications. Start or stop them in the WebSphere Integrated Solutions console as you would any other WebSphere application.

**Parent topic:** [Administering common areas](../admin/c_admin_act_wsadmin.md)

