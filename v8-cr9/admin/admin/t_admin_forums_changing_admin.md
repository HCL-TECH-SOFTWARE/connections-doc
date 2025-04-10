# Running Forums administrative commands {#t_admin_forums_changing_admin .task}

Use the wsadmin client to administer the Forums application.

To run administrative commands, you must use the wsadmin client. For more information, see [Starting the wsadmin client](t_admin_wsadmin_starting.md).

Administrative commands interact with the Forums application and its resources through scripts. These scripts use the AdminControl object in the wsadmin client to interact with the Forums application. Each script uses Java™ beans \(MBeans\) for administrative tasks. For a complete list of editable administrative commands for the Forums application, see *Forums administrative commands*.

If an error occurs when you are running the MBean commands, examine the SystemOut.log file to determine what went wrong.

When you use these commands, you do not have to check the configuration file in and out, nor restart the Forums server, because the commands take effect immediately.

1.  To run Forums administrative commands, complete the following steps:
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands fail. For more information, see *Starting the wsadmin client*.

3.  Start the Forums Jython script interpreter by using the following command:

    ```
    execfile("forumsAdmin.py")
    ```

    If you are prompted to specify a service to connect to, enter 1 to select the first node in the list. Most commands can run on any node. If the command specifies a file by using a local file path, select the node where the file is stored.


-   **[Forums administrative commands](../admin/r_admin_forums_admin_props.md)**  
Use these commands run administrative tasks for Forums. No file checkout or server restart is needed when you use these commands.

**Parent topic:**[Administering Forums](../admin/c_admin_forums_overview.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

