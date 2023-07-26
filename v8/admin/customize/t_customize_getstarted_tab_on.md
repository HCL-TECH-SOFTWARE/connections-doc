# Forcing the Getting Started view to be the default Home page view {#t_customize_getstarted_tab_on .task}

Using an administrative command, you can force the Getting Started view to be the default view for all users or a subset of users.

To use administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

When you first open the Home page, the Getting Started view is displayed by default. Users can select a check box in the Getting Started view to prevent it from being displayed each time they log in. However, you can use an administrative command to force it to be the default view for all users or for a subset of users. You might want to set this view as the default if, for example, you added an important enterprise-wide message to the page that you want people to read.

1.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../admin/../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not run correctly. For more information, see *Starting the wsadmin client*.

2.  Start the Home page Jython script interpreter.

    1.  Use the following command to access the Home page configuration files.

        ```
        execfile("homepageAdmin.py")
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

3.  Use one of the following commands to force the Getting Started view to be displayed for the specified users:

    HomepagePersonService.resetWelcomeFlagAllMembers\(\)
    :   Forces the Getting Started view to be the default Home page view for all users.

    HomepagePersonService.resetWelcomeFlagMemberByEmail\(String email\)
    :   Forces the Getting Started view to be the default Home page view for the user specified by email address.

        For example:

        ```
        HomepagePersonService.resetWelcomeFlagMemberByEmail("jsmith@example.com")
        ```

    HomepagePersonService.resetWelcomeFlagMemberByLoginName\(String loginName\)
    :   Forces the Getting Started view to be the default Home page view for the user specified by login name.

        For example:

        ```
        HomepagePersonService.resetWelcomeFlagMemberByLoginName("Joe Smith")
        ```

    HomepagePersonService.resetWelcomeFlagBatchMembersByEmail\(String fileName\)
    :   Forces the Getting Started view to be the default Home page view for the users listed in the specified text file. Define the people by adding one person's email per line.

        For example:

        ```
        HomepagePersonService.resetWelcomeFlagBatchMembersByEmail("/opt/Homepage/emails.txt")
        ```

    HomepagePersonService.resetWelcomeFlagBatchMembersByLoginName\(String fileName\)
    :   Forces the Getting Started view to be the default Home page view for the users listed in the specified text file. Define the people by adding one person's login name per line.

        For example:

        ```
        HomepagePersonService.resetWelcomeFlagBatchMembersByLoginName("/opt/Homepage/logins.txt")
        ```


**Parent topic:**[Administering the Home page using the wsadmin client](../admin/c_admin_homepage_wsadmin.md)

**Related information**  


[Disabling widgets](../admin/t_admin_homepage_disable_widgets.md)

[Home page administrative commands](../admin/r_admin_homepage_admin_commands.md)

