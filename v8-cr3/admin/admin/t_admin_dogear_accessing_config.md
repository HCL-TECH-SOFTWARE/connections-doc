# Accessing the Bookmarks configuration file {#t_admin_dogear_accessing_config .task}

To make configuration changes to a Bookmarks deployment you must first access the Bookmarks configuration file.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

Configuration files are XML-formatted files that store configuration information. The file dogear-config-cell.xml stores properties that affect Bookmarks, such as determining thresholds for displaying active tag, person, and link data. Follow these steps to access one of the Bookmarks configuration files:

1.  Start the wsadmin client from the following directory of the system on which you installed the deployment manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01. For example, on Windows:

    ```
    C:\Program Files\IBM\WebSphere\AppServer\profiles\Dmgr01\bin
    ```

    **Attention:** You must run the following command to start the wsadmin client from this specific directory because the Jython files for the product are stored here. If you try to start the client from a different directory, then the execfile\(\) command that you subsequently call to initialize the administration environment for an HCL Connections component does not work correctly. See the topic *Starting the wsadmin client*.

2.  Start the Bookmarks Jython script interpreter by entering the following command:

    ```
    execfile("dogearAdmin.py")
    ```

    If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

3.  To change properties, check out the configuration file, dogear-config-cell.xml, with the following command:

    ```
    DogearCellConfig.checkOutConfig( "<working_directory>", "<cell_name>") 
    
    ```

    where:

    -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied and are stored while you make changes to them. Use forward slashes to separate directories in the file path, even if you are using the Microsoft Windows operating system.

        **Note:** Linux: The directory must grant write permissions or the command will not run successfully.

    -   cell\_name is the name of the WebSphere® Application Server cell hosting the HCL Connections application. This argument is case-sensitive, so type it with care. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor:

        ```
        print AdminControl.getCell()
        ```

    For example:

    -   Linux:

        ```
        DogearCellConfig.checkOutConfig("/opt/dogear/temp","DogearServerNode01Cell")
        ```

    -   Microsoft Windows:

        ```
        DogearCellConfig.checkOutConfig("c:/dogear/temp","DogearServerNode01Cell")
        ```

    This command should print out this message:Bookmarks Cell Level configuration file successfully checked out.

4.  To view a list of the valid Bookmarks configuration settings and their current values, use the following command:

    DogearCellConfig.showConfig\(\)

5.  To change a Dogear configuration setting, use the following command:

    DogearCellService .updateConfig\("\[property\]", "\[value\]"\) where \[property\] is one of the editable Dogear properties and \[value\] is the new value to apply to the property. For example:

    ```
    DogearCellConfig.updateConfig("favIconService.favicon.queuesize", "50")
    ```


After making changes, you must check the configuration files back in and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying property changes* for details.

-   **[Bookmarks configuration properties](../admin/r_admin_dogear_config_properties.md)**  
Configuration settings control various configurable applications within Bookmarks. They require a Bookmarks application or server restart to take effect.
-   **[Applying property changes](../admin/t_admin_dogear_apply_prop_change.md)**  
After you have edited the Bookmarks configuration properties, check the changed configuration file in, and restart the servers to apply the changes.

**Parent topic:**[Administering Bookmarks](../admin/c_admin_dogerar_intro.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

