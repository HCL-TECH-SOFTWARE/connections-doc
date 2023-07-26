# Excluding inactive users from search results {#t_admin_search_exclude_inactive_users .task}

By default, when users search for people in HCL Connections, inactive user profiles are excluded from the search results. You can run a command to change your deployment settings so that search results related to inactive users are automatically included in search results.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

When you set the user profiles of employees who have left your organization to inactive, by default, those profiles are not listed in search results. Additionally, inactive users do not display in the person type-ahead on the Advanced Search page. End users can still filter search results to display inactive profiles by selecting **All People** from the **Show** menu on the Search Results page when the **Profiles** filter is selected.

If you want inactive profiles to display in search results by default, you can run a SearchCellConfig command to update the value of the includeInactiveUsers property in the search-config.xml file to true. When this property is set to true, the person type ahead on the Advanced Search page includes inactive users.

For more information about the user life cycle in HCL Connections, see *Managing users*.

1.  To include or exclude inactive users from search results, complete the following steps.
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

5.  Use the following commands:

    SearchCellConfig.includeInactiveProfilesSearchResults\(\)
    :   Specifies that the documents corresponding to inactive user profiles are included in search results. In a default installation of HCL Connections, inactive user profiles are automatically excluded from search results.

        This command updates the checked out search-config.xml file by setting: <profilesSearch includeInactiveUsers="true"/\> as a child element of <config\>.

    SearchCellConfig.excludeInactiveProfilesSearchResults\(\)
    :   Specifies that the documents corresponding to inactive user profiles are excluded from search results. In a default installation of HCL Connections, inactive user profiles are automatically excluded from search results.

        This command updates the checked out search-config.xml file by setting: <profilesSearch includeInactiveUsers="false"/\> as a child element of <config\>.

6.  Check in the updated search-config.xml configuration file using the following wsadmin client command:

    SearchCellConfig.checkInConfig\(\)

7.  To exit the wsadmin client, type exit at the prompt.


**Parent topic:**[Managing the Search application](../admin/c_admin_manage_search.md)

**Related information**  


[Managing users](../admin/c_admin_common_user_life_cycle_over.md)

