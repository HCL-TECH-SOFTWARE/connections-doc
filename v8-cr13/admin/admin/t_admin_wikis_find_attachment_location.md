# Finding the location of a stored attachment {#findingthelocationofanattachment .task}

Use the FilesUtilService.getFileById command to locate a file attachment in a directory.

To run administrative commands, you must use the wsadmin client. For more information, see [Starting the wsadmin client](t_admin_wsadmin_starting.md).

Many commands require an ID as an input parameter, including library IDs, user IDs, policy IDs, and file IDs. You can find an ID by using special commands. For example, when you run the WikisMemberService.getByEmail\(string email\) command, where you provide a user's email address as input, the output includes the user's ID. You can also find IDs by using feeds. For more information, see the IBM® Connections API documentation.

In network deployments, files attached to wiki pages are stored on a shared file system, as described in the topic [*Installing the first node of a cluster*](../install/t_install_cluster.md).

This command can be useful when restoring backup versions of data. See the topic [*Backing up Files data*](t_admin_files_backup.md) for more information.

1.  Start the wsadmin client.

2.  Start the Wikis Jython script interpreter using the following command:

    ```
    execfile("wikisAdmin.py")
    ```

3.  Run the following command to locate a file attachment stored in the file directory:

    ```
    WikisUtilService.getFileById(fileId)
    ```

    where fileID is the ID of a file stored in the database. The ID must be a string in the following standard Universally Unique Identifier \(UUID\) format: 00000000-0000-0000-0000-000000000000.

    The command returns the file path as a string, even if the file is not in use.


**Parent topic:**[Administering Wikis](../admin/c_admin_wikis_overview.md)

