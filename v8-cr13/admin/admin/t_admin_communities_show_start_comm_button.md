# Hiding the Start a community button from unauthenticated users {#t_admin_communities_show_start_comm_button .task}

You can prevent unauthenticated users from creating communities by hiding the **Start a Community** button.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

When users are logged in to Communities, the **Start a Community** button displays only when users have permissions to create a community. When users are not logged in, it is not possible to determine their level of access. However, as administrator, you can enable or disable the display of the button globally for all anonymous users by configuring the show.startCommunity.To.Unauthenticated property in the Communities configuration file.

**Note:** Users must have the community-creator role in order to create communities. For more information about this role, see *Roles*.

1.  To configure the show.startCommunity.To.Unauthenticated property, complete the following steps.
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

4.  To check the current setting of the property, use the following command:

    CommunitiesConfigService.showConfig\(\)

    Look for the following property in the output that displays:

    ```
    show.startCommunity.To.Unauthenticated.enabled = true
    ```

5.  If you want to change the value of the show.startCommunity.To.Unauthenticated property, use the following command:

    CommunitiesConfigService.updateConfig\("property", "value"\)

    where

    -   property is one of the editable Communities configuration properties.
    -   value is the new value with which you want to set that property.
    The following table displays information regarding the show.startCommunity.To.Unauthenticated property and the type of data that you can enter for it.

    |Property|Description|
    |--------|-----------|
    |show.startCommunity.To.Unauthenticated|When enabled, this property displays the **Start a Community** button to unauthenticated users.This property takes a Boolean value: true or false.

|

    For example:

    ```
    CommunitiesConfigService.updateConfig("show.startCommunity.To.Unauthenticated", "false")
    ```

6.  After making changes, you must check the configuration files back in, and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying property changes in Communities* for information about how to save and apply your changes.


**Parent topic:**[Administering Communities](../admin/c_admin_communities_intro.md)

**Related information**  


[Applying property changes in Communities](../admin/t_admin_communities_save_changes.md)

[Roles](../admin/r_admin_common_user_roles.md)

