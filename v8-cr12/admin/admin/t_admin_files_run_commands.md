# Running Files administrative commands {#runningadministrativecommands .task}

Use administrative commands to perform tasks that manipulate Files content.

To use administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

Administrative commands interact with the Files application and its resources through scripts. These scripts use the AdminControl object available in the IBM® WebSphere® Application Server wsadmin tool to interact with the Files server. Each script uses managed Java™ beans \(MBeans\) to get and set server administration properties.

If an error occurs when you are executing the commands, you can examine the SystemOut.log file to determine what went wrong.

To run Files administrative commands, complete the following steps:

1.  Start the wsadmin client.

2.  Start the Files Jython script interpreter using the following command:

    ```
    execfile("filesAdmin.py")
    ```

3.  See *Files administrative commands* for a complete list of administrative commands for the Files application.


-   **[Files administrative commands](../admin/r_admin_files_commands.md)**  
Use these commands to perform administrative tasks for Files. No file checkout or server restart is needed when using these commands.

**Parent topic:**[Administering Files](../admin/c_admin_files_overview.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

