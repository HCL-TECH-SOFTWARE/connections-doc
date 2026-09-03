# Enable the Help icon to access HCL Connections Help Center {#t_install_enable_help_center .task}

You can enable opening the HCL Connections Help Center from the Help icon in the left navigation bar of the HCL Connections application.

## About this task

Setting this property to `true` in the `Lotusconnections-config.xml` file allows users to launch the HCL Connections Help Center from within the application.

!!! note 
    
    Accessing the HCL Connections Help Center requires internet connectivity.

## Procedure

1.  Check out the `Lotusconnections-config.xml` file as described in [Changing common configuration property values](../admin/t_admin_common_changing_config.md).

2.  Open `Lotusconnections-config.xml` in a text editor.

3.  Add the following property to the `<properties>` section of the `Lotusconnections-config.xml` file:
    ```
    
    <properties>
        <genericProperty name="helpCenterEnabled">true</genericProperty> 
    </properties>
    
    ```

4.  Ensure to save your updates to the `Lotusconnections-config.xml` file. see [Applying common configuration property changes](../admin/t_admin_common_save_changes.md) for more information.

5.  Deploy the changes by synchronizing the nodes.

6.  Stop and restart the servers that host the HCL Connections applications.


**Parent topic:** [Optional post-installation tasks](../install/c_optional_post-install_tasks.md)
