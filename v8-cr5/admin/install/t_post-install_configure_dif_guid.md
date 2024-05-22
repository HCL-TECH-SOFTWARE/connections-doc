# Configuring the custom ID attribute for users or groups {#t_post-install_configure_dif_guid .task}

Configure HCL Connections to use custom ID attributes to identify users and groups in the LDAP directory.

-   If you specified a single ID attribute for both users and groups, you don't need to complete this task. This task is required only if you specified a custom ID attribute for users or groups in the [Configuring the custom ID attribute for users or groups](t_post-install_configure_dif_guid.md) topic.
-   Ensure that you have completed the steps to specify different ID attributes for users and groups in the [Configuring the custom ID attribute for users or groups](t_post-install_configure_dif_guid.md) topic.

You can change the default setting to use a custom ID to identify users and groups in the directory.

To configure HCL Connections to use the custom ID attribute [that you specified earlier](t_specify_dif_guid.md), complete the following steps:

1.  Add the new attribute to the LotusConnections-config.xml file. To do so, complete the following steps:

    1.  Start the wsadmin tool.

    2.  Use the following command to access the HCL Connections configuration file:

        execfile\("<$WAS\_HOME\>/profiles/<DMGR\>/config/bin\_lc\_admin/ connectionsConfig.py"\)

        If you are prompted to specify which server to connect to, enter 1. This information is not used by the wsadmin client when you are making configuration changes.

    3.  Check out the HCL Connections configuration files using the following command: LCConfigService.checkOutConfig\("/working\_directory", "cell\_name"\)

        where

        -   working\_directory is the temporary working directory to which the configuration XML and XSD files are copied. The files are kept in this working directory while you change them.
        -   cell\_name is the name of the IBM® WebSphere® Application Server cell hosting the HCL Connections application. This argument is case sensitive. If you do not know the cell name, you can determine it by entering the following command in the wsadmin command processor:

            print AdminControl.getCell\(\)

        For example:

        LCConfigService.checkOutConfig\("/temp","foo01Cell01"\)

    4.  From the temporary directory to which you checked out the HCL Connections configuration files, open the LotusConnections-config.xml file in a text editor.

    5.  Add the new custom properties to the LotusConnections-config.xml file. For example:

        ```
        <sloc:serviceReference serviceName="directory"
        ...
        custom_user_id_attribute="customUserID"
        custom_group_id_attribute="customGroupID"/> 
        ```

    6.  Save the LotusConnections-config.xml file.

    7.  Check in the changed configuration property files using the following command:LCConfigService.checkInConfig\(\)

    8.  After making updates, enter the following command to deploy the changes: synchAllNodes\(\)

2.  Stop and restart the WebSphere Application Server instance hosting HCL Connections.


**Parent topic:**[Optional post-installation tasks](../install/c_optional_post-install_tasks.md)

