# Purging compromised reply-to IDs {#t_admin_news_purge_replyto_ids .task}

Use the NewsMailinService commands to delete compromised reply-to IDs from the system and ensure that replies are received from secure IDs only. If a particular reply to ID is being misused, you can delete that ID from the system while keeping the user’s other valid IDs active.

To run administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

In HCL Connections, users can reply to a forum post directly from an email notification about the post. For example, when a forum topic is updated, a notification is sent out to all the people who are following that topic and those people can reply to the topic by clicking a link in the notification. The notification has a ReplyToNotification ID and each recipient is issued a ReplyToID. This reply-to ID is included in the reply email address and is used to verify the content coming back in to the system when the user replies to the notification. If you suspect that a reply-to ID has been compromised, you can remove the ID from the system using the NewsMaillinService commands. For example, when users leave the organization, you might want to remove all their reply-to IDs so that they cannot update a feature by saving an ID and responding to a forum post.

The ReplyToIdCleanup task also runs weekly to purge the system of any reply-to ID records that are out of date. This task removes any IDs that are older than the interval specified by the replyToIdLifetimeInDays property. The expiry period is set to 365 days by default. The ReplyToIdCleanup task removes any ReplyToNotification IDs that have expired so that it is no longer possible for users to reply to the forum topic from the email notification. All related reply-to IDs are also removed as part of the clean-up task. Note that the task does not perform any security checking for comprised or corrupted IDs. For information about how to configure the ReplyToIdCleanup task, see *Configuring database clean-up for the News repository*.

Reply-to IDs can vary in format but in general they look similar to the following:

```
id@connections.example.com
id_mailin@connections.example.com
```

For example:

```
c0c7e9bf-32d9-48a7-933c-74794479ebf3_replyto@connections.example.com
```

You can customize reply-to IDs if you want. For instance, instead of using the ID as a prefix as in the example, you can include it as a suffix. For example:

```
replyto_c0c7e9bf-32d9-48a7-933c-74794479ebf3@connections.example.com
```

1.  To remove reply-to IDs from the system, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  Start the Jython script interpreter for the News repository.

    1.  Use the following command to access the News configuration file:

        ```
        execfile("newsAdmin.py")
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

4.  Use the following commands:

    NewsMailinService.removeReplyToId\("replyto address ID"\)
    :   Removes a single reply-to ID.

        This command takes a single parameter, which is a string that specifies the reply-to ID that you want to delete.

        For example:

        ```
        NewsMailinService.removeReplyToId("c0c7e9bf-32d9-48a7-933c-74794479ebf3")
        ```

    NewsMailinService.removeReplyToIdsForUserExtId\("user extId"\)
    :   Removes all the reply-to IDs for the user with the specified external ID.

        This command takes a single parameter, which is a string that specifies the external ID for the user whose reply-to IDs you want to delete.

        For example:

        ```
        NewsMailinService.removeReplyToIdsForUserExtId("91b3897d-b4f8-4d05-3621-50bcaa22d300")
        ```

    NewsMailinService.removeReplyToIdsForUserEmail\("user email"\)
    :   Removes all the reply-to IDs for the user with the specified email address.

        This command takes a single parameter, which is a string that specifies the email address for the user whose reply-to IDs you want to delete.

        For example:

        ```
        NewsMailinService.removeReplyToIdsForUserEmail("mary_smith@example.com")
        ```


**Parent topic:**[Administering the News repository](../admin/c_admin_news.md)

**Related information**  


[News administrative commands](../admin/r_admin_news_admin_props.md)

[Configuring database clean-up for the News repository](../admin/t_admin_homepage_config_news_data_cleanup.md)

