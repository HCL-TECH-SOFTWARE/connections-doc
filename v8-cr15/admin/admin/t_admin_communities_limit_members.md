# Limiting the membership size of communities {#t_admin_communities_changing_config .task}

You can limit the maximum number of members that a community can contain.

To limit community membership size, you must edit the explicitMembershipEntityLimit property in the Communities configuration file using the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

The maximum number of members that a community can contain includes the total number of both people and groups added to a community. It does not count the number of people contained in a group towards this limit. The limit only applies to adding new members. If the limit is reduced, HCL Connections does not remove people from communities to accommodate the reduced limit. The member limit property takes an integer value. The default value and the maximum supported value is 100000. You can decrease the number to improve performance.

You configure the size limit using scripts accessed with the wsadmin client. These scripts use the AdminConfig object available in the WebSphere Application Server wsadmin client to interact with the Communities configuration file. Changes to these Communities configuration settings require node synchronization and a restart of the Communities server before they take effect.

1.  To limit the maximum number of members that a community can contain, complete the following steps:
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

4.  To change the member limit property, use the following command:

    CommunitiesConfigService.updateConfig\("explicitMembershipEntityLimit", "value"\)

    where value is the new membership limit.

    For example:

    ```
    CommunitiesConfigService.updateConfig("explicitMembershipEntityLimit", "500")
    ```


You must check the configuration files back in after making changes, and they must be checked in during the same wsadmin session in which they were checked out for the changes to take effect. See *Applying property changes in Communities* for details.

**Parent topic:**[Managing membership in Communities](../admin/c_admin_communities_managing_membership.md)

**Related information**  


[Applying property changes in Communities](../admin/t_admin_communities_save_changes.md)

