# Checking Wikis data integrity {#checkingfilesdataintegrity .task}

The appropriate way to restore backed-up Wikis data is to restore versions of file system data and database data that match.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. For more information, see [Starting the wsadmin client](t_admin_wsadmin_starting.md).

You can check integrity between database data and file system data by running the WikisDataIntegrityService.checkFiles command. The WikiDataIntegrityService.checkFiles command moves files that are found on the file system, but not in the database, to a file path location that you specify. You can delete any extra files or back them up. Users cannot download files if they are missing from the database.

Before you run the WikisDataIntegrityService.checkFiles command, create the path\_to\_extra\_filesDirectory target folder. This folder is used to save unused files during the integrity check. Create the folder on the device where you run the command.

If you are running the command on Linux™, ensure that you have the appropriate write permissions for the folder.Ensure that you have the appropriate write permissions for the folder.

1.  Start the wsadmin client.

2.  Start the Wikis Jython script interpreter using the following command:

    ```
    execfile("wikisAdmin.py")
    ```

3.  Check the integrity of data in the database and file system directory with the following command:

    -   Linux: WikisDataIntegrityService.checkFiles\("/opt/path\_to\_extra\_wikisDirectory"\)
    -   Windows™: WikisDataIntegrityService.checkFiles\("C:\\path\_to\_extra\_wikisDirectory"\)

**Parent topic:**[Backing up Wikis data](../admin/t_admin_wikis_backup.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Wikis administrative commands](../admin/r_admin_wikis_commands.md)

