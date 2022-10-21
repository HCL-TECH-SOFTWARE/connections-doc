# Enabling the Connections 8.0 user experience {#enabling_cnx8_ux .concept}

If you are upgrading from previous versions of Connections to 8.0, the new user experience is initially disabled. This allows you to adopt the infrastructural benefits of Connections 8.0 – such as updated platform versions and security fixes – without any user disruption.

**Note:** You can choose between the Connections 7.0 and 8.0 experience only during the transition period. For details, see [What's new in HCL Connections](../overview/i_ovr_r_whats_new.md#8.0_transition).

## About this task {#section_w1q_pbl_2vb .section}

The `ics.ui.isCNX8UXEnabled` property in the LotusConnections-config.xml file controls the activation of the new Connections 8.0 user experience.

## Procedure {#section_hmh_nbl_2vb .section}

1.  Start the wsadmin client by following the steps in [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md).
2.  Check out the LotusConnections-config.xml file:

    ``` {#codeblock_rn2_4bl_2vb}
    LCConfigService.checkOutConfig("working_directory", "cell_name")
    ```

    For more information, see [Editing configuration files](../admin/t_admin_common_checkout_config_file.md).

3.  Edit the checked out LotusConnections-config.xml file. Locate the generic property `ics.ui.isCNX8UXEnabled`, and set its value to `true`:

    ``` {#codeblock_sn2_4bl_2vb}
    <genericProperty name="ics.ui.isCNX8UXEnabled">true</genericProperty>
    ```

    If the property does not already exist, add it.

4.  Check in the updated configuration file:

    ``` {#codeblock_tn2_4bl_2vb}
    LCConfigService.checkInConfig("working_directory", "cell_name")
    ```

5.  Deploy the changes by synchronizing the nodes:

    ``` {#codeblock_un2_4bl_2vb}
    synchAllNodes()
    ```

6.  To exit the wsadmin client, type `exit` at the prompt.
7.  Stop and restart the servers that host the HCL Connections applications.

**Parent topic:**[Upgrading and updating](../migrate/c_upgrade_migrate_overview.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Editing configuration files](../admin/t_admin_common_checkout_config_file.md)

[Changing common configuration property values](../admin/t_admin_common_changing_config.md)

