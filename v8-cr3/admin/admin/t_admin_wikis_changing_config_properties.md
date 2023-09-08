# Changing Wikis configuration property values {#changingconfigurationpropertyvalues .task}

Configuration properties control how and when various Wikis operations take place. You can edit the properties to change the ways that Wikis operates.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. For more information, see [Starting the wsadmin client](t_admin_wsadmin_starting.md).

In the client, you access scripts that use the AdminConfig object to interact with the configuration file. After changing the configuration properties, you must synchronize nodes and restart the Wikis server before the changes take effect.

To edit Wikis configuration properties, complete the following steps:

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

3.  To view a list of the valid Wikis configuration settings and their current values, use the following command:

    WikisConfigService.showConfig\(\)

    Here is some sample output from the WikisConfigService.showConfig\(\) command:

    ```
    Wikis configuration properties:
    	security.logout.href = /wikis/ibm_security_logout
    	activeContentFilter.enabled = true
    	cache.user.timeout = 43200000
    	cache.http.publicContentMaxAgeInSecs = 604800
    	db.dialect = DB2
    
    ```

4.  Some properties must be edited using the wsadmin client; others can only be edited by editing the configuration XML file directly. To change a Wikis configuration setting, do one of the following:

    -   To edit a property using the wsadmin client, use the following command:

        ```
        WikisConfigService.updateConfig("property", "value")
        ```

        where property is one of the editable Wikis configuration properties and value is the new value with which you want to set that property. See *Wikis configuration properties* for a complete list of editable properties. For example:

        ```
        WikisConfigService.updateConfig("file.page.maximumSizeInKb", "512")
        ```

    -   To edit the value of a property in a configuration file directly, from the temporary directory to which you checked it out, open the file in a text editor, and then make your changes.
5.  Repeat step 4 for each single-value property setting that you want to change.

6.  After updating the Wikis properties with new values, use the `WikisConfigService.showConfig()` command to display the list of properties and their updated values. These are the values that will be checked in with the `WikisConfigService.checkInConfig()` command.

7.  Check in the configuration file.

    **Note:** You must check in the file during the same wsadmin session in which you checked it out. For more information, see *Applying Wikis property changes*.


-   **[Wikis configuration properties](../admin/r_admin_wikis_config_properties2.md)**  
Configuration properties in the wikis-config.xml file control how and when various Wikis operations occur.
-   **[Configuring MIME types for Wikis](../admin/t_admin_wikis_config_mime.md)**  
Configure Multipurpose Internet Mail Extensions \(MIME\) types to file extensions.
-   **[Applying Wikis property changes](../admin/t_admin_wikis_config_apply.md)**  
After you edit the Wikis configuration file, check the file in, update the version stamp property, and restart the servers.

**Parent topic:**[Administering Wikis](../admin/c_admin_wikis_overview.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Changing application URLs](../admin/t_admin_common_change_context_root.md)

