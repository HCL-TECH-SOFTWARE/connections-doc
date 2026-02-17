# Home page administrative commands {#r_admin_homepage_admin_commands .reference}

Use the commands listed to administer the Home page application.

## Home page commands { .section}

The following sections define the commands that you can use when you are working with the Home page application. Each section describes the commands for a specific service. The commands are listed in alphabetical order.

-   [HomepageCellConfig commands](r_admin_homepage_admin_commands.md#HomepageCellConfig)
-   [HomepagePersonService commands](r_admin_homepage_admin_commands.md#HomepagePersonService)

## HomepageCellConfig commands {#HomepageCellConfig .section}

**HomepageCellConfig.checkInGettingstartedConfig\("working\_directory", "cell\_name"\)**

Checks in the configuration files for the Getting Started wizard where the working\_directory and cell\_name parameters contain the same values you specified for the checked out location. See the description for the HomepageCellConfig.checkOutGettingstartedConfig command for more information.

**HomepageCellConfig.checkOutGettingstartedConfig\("working\_directory","cell\_name"\)**

Checks out the configuration files for the Getting Started wizard where:

    -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied and are stored while you change them. Use forward slashes to separate directories in the file path, even if you are using the Microsoft™ Windows™ operating system.

        **Note:** Linux™ only: The directory must grant write permissions or the command does not run successfully.

    -   cell\_name is the name of the WebSphere® Application Server cell that hosts the IBM® Connections application. This argument is case-sensitive, so type it with care. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor:

        ```
        print AdminControl.getCell()
        ```


    For example:

    -   Linux:

        ```
        HomepageCellConfig.checkOutGettingstartedConfig("/opt/act/temp","foo01Cell01")
        ```

    -   Microsoft Windows:

        ```
        HomepageCellConfig.checkOutGettingstartedConfig("c:/act/temp","foo01Cell01")
        ```


## HomepagePersonService commands {#HomepagePersonService .section}

**HomepagePersonService.resetWelcomeFlagAllMembers\(\)**

Forces the Getting Started view to be the default Home page view for all users.

**HomepagePersonService.resetWelcomeFlagMemberByEmail\(String email\)**

Forces the Getting Started view to be the default Home page view for the user specified by email address.

    For example:

    ```
    HomepagePersonService.resetWelcomeFlagMemberByEmail("jsmith@example.com")
    ```

**HomepagePersonService.resetWelcomeFlagMemberByLoginName\(String loginName\)**

Forces the Getting Started view to be the default Home page view for the user specified by login name.

    For example:

    ```
    HomepagePersonService.resetWelcomeFlagMemberByLoginName("Joe Smith")
    ```

**HomepagePersonService.resetWelcomeFlagBatchMembersByEmail\(String fileName\)**

Forces the Getting Started view to be the default Home page view for the users listed in the specified text file. Define the people by adding one person's email per line.

    For example:

    ```
    HomepagePersonService.resetWelcomeFlagBatchMembersByEmail("/opt/Homepage/emails.txt")
    ```

**HomepagePersonService.resetWelcomeFlagBatchMembersByLoginName\(String fileName\)**

Forces the Getting Started view to be the default Home page view for the users listed in the specified text file. Define the people by adding one person's login name per line.

    For example:

    ```
    HomepagePersonService.resetWelcomeFlagBatchMembersByLoginName("/opt/Homepage/logins.txt")
    ```

**Parent topic:** [Administering the Home page using the wsadmin client](../admin/c_admin_homepage_wsadmin.md)

**Related information**  


[Forcing the Getting Started view to be the default Home page view](../customize/t_customize_getstarted_tab_on.md)

[Synchronizing user data by using administrative commands](../admin/c_admin_common_sync_via_admin_commands1.md)

