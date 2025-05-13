# Enabling dictionaries {#t_admin_search_configure_dictionary .task}

Use administrative commands to enable the dictionaries that you want to use with Search.

When using administrative commands, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

!!! note 
    
    Enabling additional dictionaries adds a performance cost at indexing time and will increase the size of the index. Additional dictionaries should only be enabled as needed. See *Search language dictionaries* for a list of available language dictionaries.

The Search application provides globalization support by using different dictionary files for different languages. Each dictionary file must be enabled in the Search configuration file before indexing. The dictionaries that are enabled in the Search configuration file are loaded into memory at server start time when the Search application is started.

1.  To enable dictionaries for use with Search, complete the following steps.
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

    ```SearchCellConfig.checkOutConfig("working_dir", "cellName")```

    Where:

    - working\_dir is the temporary directory to which you want to check out the cell level configuration file. This directory must exist on the server where you are running the wsadmin client. Use forward slashes to separate directories in the file path, even if you are using the Microsoft Windows operating system.

        !!! note
            
            Linux only: The directory must grant write permissions or the command does not run successfully.

    - cellName is the name of the cell that the Search node belongs to. The command is case-sensitive. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor:

        ```print AdminControl.getCell( )```

    For example:

    ```
    SearchCellConfig.checkOutConfig("c:/search_temp", "SearchServerNode01Cell")
    ```

5.  To add a specified dictionary to the list of configured dictionaries, use the following command:

    ```SearchCellConfig.enableDictionary(String languageCode, String dictionaryPath)```
    
    Enables support for the specified LanguageWare® dictionary.

    This command accepts two arguments.

    - languageCode
        
        The language code for the dictionary that you want to add. This argument is a string value.

        The language code typically comprises two letters conforming to the ISO standard 639-1:2002 that identifies the primary language of the dictionary. However, there are some codes that additionally define a country or variant, in which case these constituent parts are separated by an underscore. For example, Portuguese has two variants, one for Portugal \(pt\_PT\) and one for Brazil \(pt\_BR\).

        !!! note 
            
            When using a code that also specifies a country, ensure that you use an underscore to separate the language code and the country code rather than a hyphen; otherwise an error will be generated.

    - dictionaryPath
        
        The path to the directory containing the dictionary file. This argument is a string value.
        
        For example:

        ```
        SearchCellConfig.enableDictionary("fr","/opt/IBM/Connections/data/shared/search/dictionary")
        ```

        You can also specify the path using a WebSphere environment variable. In the following example, the "$\{SEARCH\_DICTIONARY\_DIR\}" value is used to point to the shared Search dictionary directory.

        ```
        SearchCellConfig.enableDictionary("fr","${SEARCH_DICTIONARY_DIR}")
        ```

6.  Check in the updated search-config.xml configuration file using the following wsadmin client command:

    ```SearchCellConfig.checkInConfig( )```

7.  To exit the wsadmin client, type exit at the prompt.

8.  Stop the server or servers hosting the Search application, and then restart the Search servers.

    The next time the scheduled task runs, persisted seedlists are retained after indexing finishes.


**Parent topic:**[Configuring dictionaries for Search](../admin/c_admin_search_configure_dictionaries.md)

**Related information**  


[Search language dictionaries](../admin/r_admin_search_dictionaries.md)

[Listing enabled dictionaries](../admin/t_admin_search_list_dictionary.md)

[Disabling dictionaries](../admin/t_admin_search_delete_dictionary.md)

