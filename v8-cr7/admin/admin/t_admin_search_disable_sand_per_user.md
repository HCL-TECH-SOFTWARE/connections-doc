# Excluding specific users from the social analytics service {#t_admin_search_disable_sand_per_user .task}

Use SearchService commands to control whether specific users are included or excluded from the social analytics service. All users are included in the social analytics service by default.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

You can use SearchService commands to exclude a specified user from the social analytics service. When a user is excluded from the social analytics service, the service does not build or infer relationships between that user and other users in the organization. The exempted user:

-   Is not returned as a related person in search results.
-   Is not recommended in the Do You Know widget.
-   Is not displayed as a link between two people in the Who Connects Us widget.

When the administrator excludes a user from the social analytics service, the user still receives recommendations from the Recommendations widgets in Communities and the Home page because these recommendations are based on the user's collaboration history with other people in the organization rather than on the user's social network.

The list of users who are included in the social analytics service is processed when the Search application starts up, and the list is only refreshed on completion of social analytics indexing tasks.

1.  To exclude specific users from the social analytic widget service, complete the following steps.
2.  Start the wsadmin client from one of the following directories on the system on which you installed the Deployment Manager:

    Linux: `[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin`

    Windows: `[app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/bin`

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  After the wsadmin command environment has initialized, enter the following command to initialize the Search environment and start the Search script interpreter:

    ```
    execfile("searchAdmin.py")
    ```

    If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    When the command is run successfully, the following message displays:

    ```
    Search Administration initialized
    ```

4.  To exclude a user from the social analytics service, enter one of the following commands.

    SearchService.optOutOfSandByEmail\(String email\)
    :   Excludes the user with the specified email address from the social analytics service.

        This command takes a single argument:

        -   email. The email address of the user who is to be excluded from the social analytics service. This argument is a string value.
        For example:

        ```
        SearchService.optOutOfSandByEmail("ajones10@example.com")
        ```

    SearchService.optOutOfSandByExId\(String externalId\)
    :   Excludes the user with the specified external ID from the social analytics service.

        This command takes a single argument:

        -   externalId. The external ID of the user who is to be excluded from the social analytics service. This argument is a string value.
        For example:

        ```
        SearchService.optOutOfSandByExId("11111-1111-1111-1111")
        ```

5.  To re-enable a user for the social analytics service, use one of the following commands.

    SearchService.optIntoSandByEmail\(String email\)
    :   Includes the user with the specified email address in the social analytics service.

        This command takes a single argument:

        -   email. The email address of the user who is to be included in the social analytics service. This argument is a string value.
        For example:

        ```
        SearchService.optIntoSandByEmail("ajones10@example.com")
        ```

    SearchService.optIntoSandByExId\(String externalId\)
    :   Includes the user with the specified external ID in the social analytics service.

        This command takes a single argument:

        -   externalId. The external ID of the user who is to be included in the social analytics service. This argument is a string value.
        For example:

        ```
        SearchService.optIntoSandByExId("11111-1111-1111-1111")
        ```


**Parent topic:**[Administering the social analytics service](../admin/c_admin_search_sand_indexing_tasks.md)

**Related information**  


[Disabling the social analytics service](../admin/t_admin_common_disable_sand.md)

