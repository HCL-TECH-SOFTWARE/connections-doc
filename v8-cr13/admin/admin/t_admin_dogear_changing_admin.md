# Running Bookmarks administrative commands {#t_admin_dogear_changing_admin .task}

Run administrative commands from the wsadmin command line to directly interact with Bookmarks. You do not have to check out files or restart the server for changes to take effect.

To run administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

Administrative commands require you to start the wsadmin command line processor. From there, you run Jython scripts to administer the Bookmarks application. These config-admin scripts get and set properties using the AdminConfig object \(wsadmin\) available in WebSphere® Application Server to interact with the Bookmarks server. Unlike with configuration properties, when you use administrative commands to change server administration properties, you do not have to check out any files nor restart the server. Your changes take effect immediately.

When executing the MBean commands, if the command encounters an input that is not valid, such as a missing quote or incorrect file path, the following exception can be returned in the wsadmin console:

```
com.ibm.ws.scripting.ScriptingException com.ibm.ws.scripting.ScriptingException: 
javax.management.RuntimeMBeanException:
resetTasks 
```

To determine what went wrong, you can examine the SystemOut.log file. It should show an exception entered as a result of the Mbean command responsible for the exception.

To change Bookmarks administrative settings, complete the following steps:

1.  Start the wsadmin client from the following directory of the system on which you installed the deployment manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01. For example, on Windows:

    ```
    C:\Program Files\IBM\WebSphere\AppServer\profiles\Dmgr01\bin
    ```

    **Attention:** You must run the following command to start the wsadmin client from this specific directory because the Jython files for the product are stored here. If you try to start the client from a different directory, then the execfile\(\) command that you subsequently call to initialize the administration environment for an HCL Connections component does not work correctly. See the topic *Starting the wsadmin client*.

2.  Start the Bookmarks Jython script interpreter by entering the following command:

    ```
    execfile("dogearAdmin.py")
    ```


-   **[Using administrative commands](../admin/t_admin_dogear_administrative.md)**  
The commands described here manipulate managed Java™ beans \(MBeans\) to make changes to various operational data on a Bookmarks server.

**Parent topic:**[Administering Bookmarks](../admin/c_admin_dogerar_intro.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)


