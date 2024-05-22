# Disabling wiki page versioning {#disablefileversioning .task}

By default, users can see all versions of a wiki page but you can disable versioning by editing the `wikis-config.xml` configuration file.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. For more information, see [Starting the wsadmin client](t_admin_wsadmin_starting.md).

Disabling versioning can help control the size of data storage. When you disable versioning before users start using Wikis, only one version of a page is stored and all updates are reflected in that version.

Only pages are versioned. File attachments are not versioned.

You can disable versioning at any time. If there are already multiple versions of a page when you disable versioning, the latest version becomes the active version and all future updates are reflected in that version. The older versions are hidden from the user interface but still exist and take up space in the database. If a user reaches a space quota, you can delete older versions by enabling versioning again. Then ask the user to open the page, click the **Versions** tab, and delete versions.

You can also run a manual database update to remove all older versions of files. Run a delete statement on the MEDIA\_REVISION table and specify a constraint that the IS\_CURRENT\_REVISION column is set to zero. Specifying that value ensures that a record still exists for the current version.

1.  Start the wsadmin client.

2.  Start the Wikis Jython script interpreter.

    1.  Use the following command to access the Wikis configuration files:

        ```
        execfile("wikisAdmin.py")
        ```

        If you are asked to select a server, you can select any server.

    2.  Check out the Wikis configuration files using the following command:

        WikisConfigService.checkOutConfig\("working\_directory", "cell\_name"\)

        where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied. The files are kept in this working directory while you make changes to them.

            **Note:** Linux™ only: The directory must grant write permissions or the command will not run successfully.

        -   cell\_name is the name of the WebSphere Application Server cell hosting the HCL Connections application. This argument is required. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor:

            print AdminControl.getCell\(\)

        For example:

        ```
        WikisConfigService.checkOutConfig("/opt/my_temp_dir", "CommServerNode01Cell")
        ```

3.  To view the current configuration settings use the following command:

    ```
    WikisConfigService.showConfig()
    ```

4.  To set the `file.versioning.enabled` property to false, use the following command:

    ```
    WikisConfigService.updateConfig("file.versioning.enabled", "false")
    ```

5.  Check in the configuration file.

    **Note:** You must check in the file during the same wsadmin session in which you checked it out. For more information, see *Applying Wikis property changes*.


**Parent topic:**[Administering Wikis](../admin/c_admin_wikis_overview.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Applying Wikis property changes](../admin/t_admin_wikis_config_apply.md)

