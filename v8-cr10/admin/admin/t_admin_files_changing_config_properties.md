# Changing Files configuration property values {#changingconfigurationpropertyvalues .task}

Configuration properties control how and when various Files operations take place. You can edit the properties to change the ways that Files operates.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

Configure Files using scripts accessed with the wsadmin client. These scripts use the AdminConfig object available in IBM WebSphere Application Server wsadmin client to interact with the Files configuration file. Changes to Files configuration settings require node synchronization and a restart of the Files server before they take effect.

To edit Files configuration properties, complete the following steps:

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

            **Note:**  Linux™ only: The directory must grant write permissions or the command will not run successfully.

        -   cell\_name is the name of the WebSphere Application Server cell hosting the HCL Connections application. This argument is required. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor:

            print AdminControl.getCell\(\)

        For example:

        ```
        FilesConfigService.checkOutConfig("/opt/my_temp_dir", "CommServerNode01Cell")
        ```

3.  To view a list of the valid Files configuration settings and their current values, use the following command:

    FilesConfigService.showConfig\(\)

    Here is some sample output from the FilesConfigService.showConfig\(\) command:

    ```
    Files configuration properties:
    	security.logout.href = /files/ibm_security_logout
    	activeContentFilter.enabled = true
    	cache.user.timeout = 43200000
    	cache.http.publicContentMaxAgeInSecs = 604800
    	db.dialect = DB2
    
    ```

4.  Some properties must be edited using the wsadmin client; others can only be edited by editing the configuration XML file directly. To change a Files configuration setting, do one of the following:

    -   To edit a property using the wsadmin client, use the following command:

        ```
        FilesConfigService.updateConfig("property", "value")
        ```

        where property is one of the editable Files configuration properties and value is the new value with which you want to set that property. See *Files configuration properties* for a complete list of editable properties. For example:

        ```
        FilesConfigService.updateConfig("file.versioning.enabled", "false")
        ```

    -   To edit the value of a property in a configuration file directly, from the temporary directory to which you checked it out, open the file in a text editor, and then make your changes.
5.  Repeat step 4 for each single-value property setting that you want to change.

6.  After updating the Files properties with new values, use the `FilesConfigService.showConfig()` command to display the list of properties and their updated values. These are the values that will be checked in with the `FilesConfigService.checkInConfig()` command.


You must check the configuration files back in after making changes, and they must be checked in during the same wsadmin session in which they were checked out for the changes to take effect. See the topic *Applying Files property changes* for details.

-   **[Files configuration properties](../admin/r_admin_files_config_properties2.md)**  
Configuration properties control how and when various Files operations occur and help optimize performance.
-   **[Configuring MIME types for Files](../admin/t_admin_files_config_mime.md)**  
You can assign Multipurpose Internet Mail Extensions \(MIME\) types to file extensions.
-   **[Applying Files property changes](../admin/t_admin_files_config_apply.md)**  
After you have edited the Files configuration properties, check the changed configuration file in, update the version stamp property, and restart the servers to apply the changes.

**Parent topic:**[Administering Files](../admin/c_admin_files_overview.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Changing application URLs](../admin/t_admin_common_change_context_root.md)

