# Running Communities administrative commands {#t_admin_communities_changing_admin .task}

Jython scripts are used to administer the Communities application. These scripts allow the administrator to view Communities data and perform administrative tasks for Communities.

To use administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

Administrative commands interact with the Communities application and its resources through scripts. These scripts use the AdminControl object available in the IBM® WebSphere® Application Server wsadmin tool to interact with the Communities server. Each script uses managed Java™ beans \(MBeans\) to perform administrative tasks.

If an error occurs when you are executing the MBean commands, you can examine the SystemOut.log file to determine what went wrong.

Unlike with configuration properties, when you use administrative commands you do not have to check out any files or restart the server. The commands are executed and take effect immediately.

1.  To run Communities administrative commands, complete the following steps:
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter will not execute correctly.

3.  Start the Communities Jython script interpreter using the following command:

    ```
    execfile("communitiesAdmin.py")
    ```

    If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

4.  See *Communities administrative commands* for a complete list of administrative commands for the Communities application.


-   **[Communities administrative commands](../admin/r_admin_communities_admin_props.md)**  
Use the commands that are listed to administer Communities. No file checkout or server restart is needed when you use these commands.

**Parent topic:**[Administering Communities](../admin/c_admin_communities_intro.md)

