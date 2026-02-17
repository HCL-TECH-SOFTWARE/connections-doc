# Deleting wikis from the system {#deletinguserfilesfromthesystem .task}

Use the WikisLibraryService delete commands to delete wikis.

To run administrative commands, you must use the wsadmin client. For more information, see [Starting the wsadmin client](t_admin_wsadmin_starting.md).

Many commands require an ID as an input parameter, including library IDs, user IDs, policy IDs, and file IDs. You can find an ID by using special commands. For example, when you run the WikisMemberService.getByEmail\(string email\) command, where you provide a user's email address as input, the output includes the user's ID. You can also find IDs by using feeds. For more information, see the IBM® Connections API documentation.

Use wikis administrative commands to see wiki library information that can help you decide what wikis to delete. For example, the WikisLibraryService.browseWiki command returns a list of wikisi. Use the information in the report to see which wikis have not been updated in a long time. For more information, see *Wikis administrative commands*.

In the Wikis database context, a library contains the pages, attachments, and other data that make up a wiki. Wikis can be owned by a person or a community. However, you should delete community libraries following steps in the topic *Deleting orphaned data*.

1.  Start the wsadmin client.

2.  Start the Wikis Jython script interpreter using the following command:

    ```
    execfile("wikisAdmin.py")
    ```

3.  Run one of these commands to delete libraries:

    -   Run this command to delete a single library:

        ```
        WikisLibraryService.delete(libraryId)
        ```

        where libraryId is the library id in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.

    -   Run this command to delete multiple libraries:

        ```
        WikisLibraryService.deleteBatch(filePath)
        ```

        where filePath is the full path to a text file containing a list with a single library id per line in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000. You must create the file and save it in a directory local to the server where you are running the wsadmin processor.


**Parent topic:**[Administering Wikis](../admin/c_admin_wikis_overview.md)

**Related information**  


[Printing library information](../admin/t_admin_wikis_printing.md)

[Deleting orphaned data](../admin/t_admin_communities_delete_orphaned_data.md)

[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

