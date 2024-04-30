# Configuring display settings {#t_admin_communities_configure_display_settings .task}

Use configuration settings to control the display of data in the Communities application.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

1.  To configure display settings for Communities, complete the following steps.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

3.  Start the Communities Jython script interpreter.

    1.  Use the following command to access the Communities configuration files:

        ```
        execfile("communitiesAdmin.py")
        ```

        If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

    2.  Check out the Communities configuration files using the following command:

        CommunitiesConfigService.checkOutConfig\("working\_directory", "cell\_name"\)

        where:

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied. The files are kept in this working directory while you make changes to them.

            **Note:** Linux only: The directory must grant write permissions or the command will not run successfully.

        -   cell\_name is the name of the WebSphere Application Server cell hosting the HCL Connections application. This argument is required. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor:

            print AdminControl.getCell\(\)

        For example:

        ```
        CommunitiesConfigService.checkOutConfig("/opt/my_temp_dir", "CommServerNode01Cell")
        ```

4.  To view the current configuration settings, use this command:

    CommunitiesConfigService.showConfig\(\)

    **Note:** After you update any of the configuration settings, you can use this command again to display your updates.

5.  To change display settings for Communities, use the following command:

    CommunitiesConfigService.updateConfig\("property", "value"\)

    Where:

    -   property is one of the editable Communities configuration properties.
    -   value is the new value with which you want to set that property.
    For example:

    ```
    CommunitiesConfigService.updateConfig("pagingSupport.defaultPageSize", "15")
    ```

    The following table displays the valid properties that can be updated, and additional information for each property and the type of data that you can enter.

    |Property|Description|
    |--------|-----------|
    |pagingSupport.communityListTags.pageSize|Determines the maximum number of tags that are displayed on the **I’m an Owner**, **I’m a Member**, **I’m Following**, **I’m Invited**, and **My Organization Communities** views.This property takes an integer value.

For example:

    ```
CommunitiesConfigService.updateConfig("pagingSupport.communityListTags.pageSize", "75")
    ```

|
    |pagingSupport.dbNameTypeAhead.pageSize|Determines the maximum number of matching names to display in the type-ahead suggestion field when users start typing the names of people to add to a community. These names are retrieved from the SNCOMM.MEMBERPROFILE database table.This property takes an integer value.

For example:

    ```
CommunitiesConfigService.updateConfig("pagingSupport.dbNameTypeAhead.pageSize", "50")
    ```

|
    |pagingSupport.defaultPageSize|Determines the maximum number of entries to display on Communities bookmarks and feeds lists pages. The default value is 10. Decrease the number to speed paging.This property takes an integer value.

For example:

    ```
CommunitiesConfigService.updateConfig("pagingSupport.defaultPageSize", "25")
    ```

|
    |pagingSupport.ldapNameSearch.pageSize|Determines the maximum number of LDAP users that are returned when users click **Search Directory** to search the LDAP directory for a name when adding members to a community.For example:

    ```
CommunitiesConfigService.updateConfig("pagingSupport.ldapNameSearch.pageSize", "50")
    ```

|
    |pagingSupport.memberNameTypeAhead.pageSize|Determines the maximum number of users who are displayed by the type-ahead feature. This property is a general setting that is not in effect when Search Directory option is selected. It is always in effect for the type-ahead. For example:

    ```
CommunitiesConfigService.updateConfig("pagingSupport.memberNameTypeAhead.pageSize", "15")
    ```

|
    |pagingSupport.tagNameTypeAhead.pageSize|Determines the maximum number of tags displayed by the type-ahead feature when users add new tags to a community.For example:

    ```
CommunitiesConfigService.updateConfig("pagingSupport.tagNameTypeAhead.pageSize", "10")
    ```

|

6.  After making changes, check the configuration files back in, and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying property changes in Communities* for information about how to save and apply your changes.


**Parent topic:**[Administering Communities](../admin/c_admin_communities_intro.md)

**Related information**  


[Applying property changes in Communities](../admin/t_admin_communities_save_changes.md)

