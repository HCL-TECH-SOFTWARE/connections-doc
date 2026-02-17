# Running Profiles administrative commands {#t_admin_profiles_changing_admin .task}

Scripts are used to administer the Profiles application. These scripts use the AdminConfig object available in IBM® WebSphere® Application Server wsadmin client to interact with the Profiles server.

To run administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

**Note:** You cannot use administrative tools to add or remove a profile from your LDAP directory system. You must use that directory's native tools to create and delete profiles.

The scripts used to administer Profiles give an administrator \(who otherwise would not have access to edit a user's profile data\), the ability to edit various fields in a user's profile. For example, one use of the capability is to remove unwanted or inappropriate content.

Unlike with configuration properties, when you use administrative commands to change server administration properties, you do not have to check out any files nor restart the server. Your changes take effect immediately.

1.  To run administrative commands, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly. For more information, see *Starting the wsadmin client*.

3.  Start the Profiles Jython script interpreter.

    1.  Use the following command to access the Profiles configuration files:

        ```
        execfile("profilesAdmin.py")
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

4.  See *Profiles administrative commands* for a complete list of administrative commands for the Profiles application.


-   **[Profiles administrative commands](../admin/r_admin_profiles_admin_props.md)**  
Use the commands that are listed to execute administrative tasks for Profiles. You do not need to checkout a file or restart the server when you use these commands.

**Parent topic:**[Administering Profiles](../admin/c_admin_profiles_intro.md)

