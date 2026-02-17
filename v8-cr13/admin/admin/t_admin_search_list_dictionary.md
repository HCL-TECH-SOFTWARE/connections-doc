# Listing enabled dictionaries {#t_admin_search_list_dictionary .task}

Use the listDictionaries command to check which dictionaries are currently enabled for use with Search.

When using administrative commands, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

1.  To list the dictionaries that are currently enabled, complete the following steps.
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

    ```SearchCellConfig.checkOutConfig("working\_dir", "cellName")```

    Where:

    - working\_dir is the temporary directory to which you want to check out the cell level configuration file. This directory must exist on the server where you are running the wsadmin client. Use forward slashes to separate directories in the file path, even if you are using the Microsoft Windows operating system.

        !!! note 
        
            Linux only: The directory must grant write permissions or the command does not run successfully.

    - cellName is the name of the cell that the Search node belongs to. The command is case-sensitive. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor:

        ```print AdminControl.getCell\(\)```

    For example:

    ```
    SearchCellConfig.checkOutConfig("c:/search_temp", "SearchServerNode01Cell")
    ```

5.  To list the dictionaries currently enabled for use with Search, use the following command:

    ```SearchCellConfig.listDictionaries( )```
    
    Lists the LanguageWare® dictionaries that are configured for Search. These dictionaries are used by common Search to support indexing multilingual content and searching in multiple languages.
    
    This command does not take any input parameters.


**Parent topic:**[Configuring dictionaries for Search](../admin/c_admin_search_configure_dictionaries.md)

**Related information**  


[Search language dictionaries](../admin/r_admin_search_dictionaries.md)

[Enabling dictionaries](../admin/t_admin_search_configure_dictionary.md)

[Setting the default dictionary](../admin/t_admin_search_set_default_dictionary.md)

[Disabling dictionaries](../admin/t_admin_search_delete_dictionary.md)

