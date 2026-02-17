# Running Wikis administrative commands {#runningadministrativecommands .task}

Use administrative commands to perform tasks that manipulate Wikis content.

To run administrative commands, you must use the wsadmin client. For more information, see [Starting the wsadmin client](t_admin_wsadmin_starting.md).

Administrative commands interact with the Wikis application and its resources through scripts. These scripts use the AdminControl object available in the IBM® WebSphere® Application Server wsadmin tool to interact with the Wikis server.

If an error occurs when you are executing the commands, you can examine the SystemOut.log file to determine what went wrong.

To run Wikis administrative commands, complete the following steps:

1.  Start the wsadmin client.

2.  Start the Wikis Jython script interpreter using the following command:

    ```
    execfile("wikisAdmin.py")
    ```

3.  See *Wikis administrative commands* for a complete list of administrative commands for the Wikis application.


-   **[Wikis administrative commands](../admin/r_admin_wikis_commands.md)**  
Use these commands to run administrative tasks for the Wikis application. You do not have to check out the configuration file nor restart the application or server restart.

**Parent topic:**[Administering Wikis](../admin/c_admin_wikis_overview.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

