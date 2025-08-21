# Disabling file versioning {#disablefileversioning .task}

By default, when a user uploads a new version of a file it becomes the latest version, and all previous versions are kept. Users can see all versions of a file in the user interface. You can disable file versioning in the files-config.xml properties file.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin tool.

Disabling versioning can help control the size of data storage. When you disable versioning before users start using Files, only one version of a file is ever stored, and all updates are reflected in that version.

However, you can disable versioning at any time. If there are already multiple versions of a file when you disable versioning, the latest version becomes the active version, and all future updates are reflected in that version. The older versions are hidden from the user interface, but still exist and take up space in the database. If a user reaches their space quota, you can delete these older versions by enabling versioning again and having the user open the file page, click the **Versions** tab, and delete versions.

You can also perform a manual database update to remove all versions of files prior to the current ones. You would execute a delete statement on your database for the MEDIA\_REVISION table, but you must specify a constraint that the column IS\_CURRENT\_REVISION = 0, as a record still exists for the current version.

1.  Start the wsadmin client.

2.  Start the Files Jython script interpreter.

    1.  Use the following command to access the Files configuration files:

        ```
        execfile("filesAdmin.py")
        ```

        If you are asked to select a server, you can select any server.

    2.  Check out the Files configuration files using the following command:

        FilesConfigService.checkOutConfig\("working\_directory", "cell\_name"\)

        where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied. The files are kept in this working directory while you make changes to them.

            **Note:** Linux™ only: The directory must grant write permissions or the command will not run successfully.

        -   cell\_name is the name of the WebSphere Application Server cell hosting the HCL Connections application. This argument is required. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor:

            print AdminControl.getCell\(\)

        For example:

        ```
        FilesConfigService.checkOutConfig("/opt/my_temp_dir", "CommServerNode01Cell")
        ```

3.  To view the current configuration settings use the following command:

    ```
    FilesConfigService.showConfig()
    ```

4.  To set the `file.versioning.enabled` property to false, use the following command:

    ```
    FilesConfigService.updateConfig("file.versioning.enabled", "false")
    ```

5.  You must check the configuration files back in after making changes, and they must be checked in during the same wsadmin session in which they were checked out for the changes to take effect. See the topic *Applying Files property changes* for details.


**Parent topic:**[Administering Files](../admin/c_admin_files_overview.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Applying Files property changes](../admin/t_admin_files_config_apply.md)

