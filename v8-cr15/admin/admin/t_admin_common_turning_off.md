# Disabling applications {#t_admin_common_turning_off .task}

You might decide to disable an application temporarily for maintenance or if, for example, you are deploying the product and the application is not yet ready for use.

Only perform this task when you want to disable an application temporarily. To remove an application from your deployment permanently, perform the steps described in the topic, *Removing applications*.

**Notes:**

-   Do not disable applications that are used by all of the other applications, such as the News or Search applications.
-   When you disable or remove an application, all references to that application are removed from the user interface.

1.  Open the Integrated Solutions Console of the IBM® WebSphere® Application Server that is hosting the application.

2.  Expand **Applications** \> **Application Types**, and then select **WebSphere enterprise applications**.

3.  Click the name of the application that you want to disable.

4.  Click **Target specific application status**.

5.  Select the check box next to the cluster name, and then click **Disable Auto Start**.

6.  Click **Save** to save your changes.

7.  Click **Apply**, and then click **OK**.

8.  Start the wsadmin client from the following directory of the system where you installed the deployment manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    **Note:** You must start the client from this directory or subsequent commands that you try to run will not execute properly. For more information, see the *Starting the wsadmin client* topic.

9.  Remove the link to the application from the navigation bar by editing the HCL Connections configuration file.

    1.  Enter the following command to load the HCL Connections configuration file: execfile\("connectionsConfig.py"\)

        If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

    2.  Enter the following command to check out HCL Connections configuration files:

        `LCConfigService.checkOutConfig("working\_directory","cell\_name")`

        where:

        -   working\_directory is the temporary working directory to which configuration files are copied. The files are kept in this working directory while you edit them.

            **Notes:**

            -   When you specify a path to the working directory on a system that is running Microsoft Windows, use a forward slash for the directory. For example: "C:/temp".
            -   Linux only: The directory must grant write permissions or the command fails.
            
        -   cell\_name is the name of the WebSphere Application Server cell that hosts the HCL Connections application. If you do not know the cell name, display it by typing the following command in the wsadmin client: print AdminControl.getCell\(\)

            **Note:** This input parameter is case-sensitive.

10. To see a list of the properties and their current settings, use the following command:

    ```
    LCConfigService.showConfig()
    ```

11. Enter the following commands:

    ```
    LCConfigService.updateConfig("application\_name.enabled", "false")
    LCConfigService.updateConfig("application\_name.ssl.enabled", 
     "false")
    ```

    where application\_name is the name of the application that you are disabling.

12. After making changes, you must check the configuration files back in and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying common configuration property changes* for information about how to save and apply your changes.

13. Stop and then restart the WebSphere Application Server clusters.


**Parent topic:**[Customizing the deployment](../admin/c_admin_common_customizing.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Applying common configuration property changes](../admin/t_admin_common_save_changes.md)

[Removing applications](../install/t_remove_applications.md)

