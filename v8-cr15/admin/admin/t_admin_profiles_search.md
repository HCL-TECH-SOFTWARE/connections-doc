# Managing the Profiles search operation {#t_admin_profiles_search .task}

Use Profiles configuration settings to control how the search operation displays search results.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

1.  To configure Profiles search, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  Start the Profiles Jython script interpreter.

    1.  Enter the following command to access the Profiles configuration files:

        execfile\("profilesAdmin.py"\) If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    2.  Enter the following command to check out the Profiles configuration files:

        ProfilesConfigService.checkOutConfig\("working\_directory", "cell\_name" where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied and are stored while you make changes to them. Use forward slashes \(/\) to separate directories in the file path, regardless of your operating system.

            **Note:** In order for the command to complete successfully, the directory must grant write permissions if you are using one of the following operating systems:

            -   Linux
            **Note:** The directory must grant write permissions or the command does not complete successfully.

        -   cell\_name is the name of the WebSphere Application Server cell hosting the Profiles application. This argument is required. It is also case-sensitive. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor: print AdminControl.getCell\(\)
        For example:

        -   Linux:

            ```
            ProfilesConfigService.checkOutConfig("/opt/prof/temp","foo01Cell01")
            ```

        -   Microsoft Windows:

            ```
            ProfilesConfigService.checkOutConfig("c:/prof/temp","foo01Cell01")
            ```

4.  To configure the Profiles search operation, use the following command:

    ProfilesConfigService.updateConfig\(property, value\)

    where

    -   property is one of the editable Profiles configuration properties.
    -   value is the new value with which you want to set that property.
    The following table displays information regarding the search property and the type of data that you can enter for it.

    |Property|Description|
    |--------|-----------|
    |search.maxRowsToReturn|Determines the maximum number of Profiles database rows returned by a name search operation.

This property takes an integer value. The default value is 250. You can increase the number, but do not specify a number larger than 500. Doing so causes search operations to fail entirely. Do not specify 0 unless you want no results to be returned.

The keyword and directory search operations do not have this limit.

|
    |search.pageSize|Determines the number of returned rows to place on a results page.This property takes an integer value. The default value is 10.

|
    |search.firstNameSearchEnabled|Determines if search by first name only is enabled. By default, this setting is set to false.

This property takes a Boolean value.

**Note:** Enabling this setting negatively impacts the performance of the Search by \> Name function available in the Profiles user interface.

|
    |nameOrdering.enabled|When this property is set to true, names must be entered as \(FirstName LastName\) or \(LastName, FirstName\). By default, it is set to false.

**Note:** When only a single word is entered, that word is treated as the LastName value during search.

This property takes a Boolean value.

|

    For example:

    `ProfilesConfigService.updateConfig("search.pageSize","20")`

5.  To specify the default sorting key to use for displaying search results, you must edit properties in the profiles-config.xml file manually as follows.

    1.  Open the profiles-config.xml file in a text editor.

    2.  Update the following properties as needed.

        sortNameSearchResultsBy
        :   Determines what sorting key to use for Profiles name search results. This property is also applied to the search results that display when a tag is clicked in a profile overview page. It does not affect the results generated by clicking a tag in a directory search.

            The valid values for the default attribute are:

            -   displayName. Lists name search results in order of user display name.
            -   last\_name. Lists name search results in order of user last name.
            For example:

            ```
            <sortNameSearchResultsBy default="displayName" />
            
            ```

        sortIndexSearchResultsBy
        :   Determines what sorting key to use for Profiles keyword and advanced search results.

            The valid values for the default attribute are:

            -   relevance. Lists keyword and advanced search results in order of relevance.
            -   displayName. Lists keyword and advanced search results in order of user display name.
            -   last\_name. Lists keyword and advanced search results in order of user last name.
            For example:

            ```
            <sortIndexSearchResultsBy default="relevance" />
            ```

    3.  Save your changes and then close the profiles-config.xml file.

6.  After making changes, you must check the configuration files back in, and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying property changes in Profiles* for information about how to save and apply your changes.


**Parent topic:**[Administering Profiles](../admin/c_admin_profiles_intro.md)

**Related information**  


[Applying property changes in Profiles](../admin/t_admin_profiles_save_changes.md)


