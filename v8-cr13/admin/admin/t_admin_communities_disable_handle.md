# Enabling and disabling the community unique web address option {#t_admin_communities_disable_handle .task}

Enable or disable the community owners ability to create a unique web address for their community.

To update configuration files, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

When this option is enabled, the ability to create a unique community web address is provided in the Communities user interface when users create or edit a community or subcommunity. Community members can then use the web address to navigate directly to the community or subcommunity. This feature is enabled by default.

1.  To enable or disable the community unique web address, you need to update the communityHandle settings in the communities-config.xml file.
2.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

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

4.  Navigate to the working directory that you specified in the previous step and open the communities-config.xml file using a text editor.

5.  To configure the unique web address, set the value of the enabled property for the communityHandle to true or false as needed.

    For example, to disable the unique community web address:

    ```
    <comm:communityHandle enabled="false" />
    ```

6.  After making changes, you must check the configuration files back in, and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying property changes in Communities* for information about how to save and apply your changes.


**Parent topic:**[Administering Communities](../admin/c_admin_communities_intro.md)

**Related information**  


[Applying property changes in Communities](../admin/t_admin_communities_save_changes.md)

