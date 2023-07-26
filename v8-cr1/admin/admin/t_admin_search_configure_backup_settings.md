# Configuring index backup settings {#t_admin_search_configure_backup_settings .task}

Use SearchCellConfig commands to define index backup settings in the search-config.xml file.

When using administrative commands, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

When backing up the search index, you can specify the type of backup that you want to create by configuring the backupType setting in the search-config.xml file. You can also specify whether to run a shell script or third-party application on completion of the backup task by editing the postBackupExecutable setting. These settings are applied to all backup tasks.

1.  To configure index backup settings, complete the following steps:
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

4.  Check out the Search cell-level configuration file, search-config.xml, with the following command:

    SearchCellConfig.checkOutConfig\("working\_dir", "cellName"\)

    Where:

    -   working\_dir is the temporary directory to which you want to check out the cell level configuration file. This directory must exist on the server where you are running the wsadmin client. Use forward slashes to separate directories in the file path, even if you are using the Microsoft Windows operating system.

        **Note:** Linux only: The directory must grant write permissions or the command does not run successfully.

    -   cellName is the name of the cell that the Search node belongs to. The command is case-sensitive. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor:

        print AdminControl.getCell\(\)

    For example:

    ```
    SearchCellConfig.checkOutConfig("c:/search_temp", "SearchServerNode01Cell")
    ```

5.  To configure index backup settings, use the following commands:

    SearchCellConfig.setBackupType\(String type\)
    :   Specifies the type of backup that you want to create.

        This command takes a single argument that specifies the backup type. This can be one of the following:

        -   new. Creates a new index backup every time.
        -   dual. Creates dual copies and overwrites the oldest existing backup.
        -   overwrite. Overwrites the existing index backup.
        For example:

        ```
        SearchCellConfig.setBackupType("new")
        ```

    SearchCellConfig.setPostBackupScript\(String script\)
    :   Specifies which shell script or third-party application runs on completion of the backup task.

        This command takes a single argument that specifies the name of the shell script or application file.

        For example:

        ```
        SearchCellConfig.setPostBackupScript("backup.sh")
        ```

        To disable the script, run the command again with an empty string as the argument. For example:

        ```
        SearchCellConfig.setPostBackupScript("")
        ```

6.  Check in the updated search-config.xml configuration file using the following wsadmin client command:

    SearchCellConfig.checkInConfig\(\)

7.  To exit the wsadmin client, type exit at the prompt.

8.  Stop the server or servers hosting the Search application, and then restart the Search servers.


**Parent topic:**[Backup and restore](../admin/c_admin_search_backup_and_restore.md)

**Related information**  


[Reloading the Search application](../admin/t_admin_search_reload_search.md)

