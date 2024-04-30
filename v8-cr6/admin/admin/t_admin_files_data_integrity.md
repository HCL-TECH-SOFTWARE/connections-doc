# Checking Files data integrity {#checkingfilesdataintegrity .task}

The appropriate way to restore backed-up Files data is to restore versions of file system data and database data that match. You can check integrity between database data \(metadata\) and file system data \(binary\) by running the FilesDataIntegrityService.checkFiles command.

To use administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

The FilesDataIntegrityService.checkFiles command moves files found on the file system, but not in the database, to a file path location you specify in the command. You might want to delete these extra files, or back them up if you think you might need them for a future Files backup.

Users cannot download files if they are missing from the database.

Before running the FilesDataIntegrityService.checkFiles command, create the target path\_to\_extra\_filesDirectory folder. This folder will be used to save unused files during the integrity check. Create the folder on the device from which you will run the command.

If you are running the command on Linux™ ensure that you have correct write permissions enabled for the folder.

1.  Start the wsadmin client.

2.  Start the Files Jython script interpreter using the following command:

    ```
    execfile("filesAdmin.py")
    ```

3.  Check the integrity of data in the database and file system directory with the following command:

    On Microsoft™ Windows™ -- `FilesDataIntegrityService.checkFiles("C:\path\_to\_extra\_filesDirectory")`

    On Linux -- `FilesDataIntegrityService.checkFiles("/opt/path\_to\_extra\_filesDirectory")`


**Parent topic:**[Backing up Files data](../admin/t_admin_files_backup.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Files administrative commands](../admin/r_admin_files_commands.md)

