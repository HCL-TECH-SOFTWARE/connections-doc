# Protecting against malicious active content {#t_admin_communities_filter_active_content .task}

The active content filter prevents users from embedding malicious content in Communities input fields.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

Communities provides a filter that prevents users from using rich text descriptions with malicious scripts that are started when other users visit Communities. You can disable this filter to provide richer options for content in any Communities text input field.

**Note:** Disabling this filter introduces vulnerability to cross-site scripting \(XSS\) and other types of malicious attack. See *Securing applications from malicious attack* for additional information.

1.  To configure the active content filter, complete the following steps.
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

4.  To check the current setting of the active content filter property, use the following command:

    CommunitiesConfigService.showConfig\(\)

    Look for the following property in the output that displays:

    ```
    activeContentFilter.enabled = true
    ```

5.  If you want to change the value of the active content filter property, use the following command:

    CommunitiesConfigService.updateConfig\("property", "value"\)

    where

    -   property is one of the editable Communities configuration properties.
    -   value is the new value with which you want to set that property.
    The following table displays information regarding the active content filter property and the type of data that you can enter for it.

    |Property|Description|
    |--------|-----------|
    |activeContentFilter.enabled|When enabled, this property prevents the addition of active content \(JavaScript™, for example\) to any Community text input field.This property takes a Boolean value: true or false.

|

    For example:

    ```
    CommunitiesConfigService.updateConfig("activeContentFilter.enabled", "false")
    ```

6.  After making changes, you must check the configuration files back in, and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying property changes in Communities* for information about how to save and apply your changes.


**Parent topic:**[Managing community content](../admin/c_admin_communities_control_content.md)

**Related information**  


[Applying property changes in Communities](../admin/t_admin_communities_save_changes.md)

[Securing applications from malicious attack](../secure/c_admin_security_xss.md)

[Communities configuration properties](../admin/r_admin_communities_config_props.md)

