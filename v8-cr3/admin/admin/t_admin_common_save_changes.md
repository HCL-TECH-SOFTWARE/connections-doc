# Applying common configuration property changes {#t_admin_common_save_changes .task}

Check in and check out configuration files.

You must check in configuration files during the same wsadmin session in which you checked out the files. Otherwise, the changes that you made might not take effect.

After you edit configuration properties for an HCL Connections application, check in the changed configuration file and restart the servers to apply the changes.

1.  Open a command window and start the wsadmin command-line tool as described in the topic, *Starting the wsadmin client*.

2.  If you want to confirm the changes that you made before checking in the configuration files, you can list the configuration settings and values by using the following command:

    ```
    LCConfigService.showConfig()
    ```

3.  Update the value of the version stamp configuration property to force users' browsers to pick up this change. Enter the following command to increment the value of the versionStamp property:

    **Note:** This command is required only when a change is made to the product user interface and the change is to a file checked out using LCConfigService.

    LCConfigService.updateConfig\("versionStamp","gmt\_timestamp"\) where gmt\_timestamp is the GMT time. You can specify an empty string for the time stamp or provide a GMT value string. When you specify an empty string, the client calculates the current GMT time and updates the version stamp with that value. If you choose to provide the time, specify it using the following format: `yyyyMMdd.HHmmss` and specify the time in GMT. It is best to provide an empty string and let the client format the time stamp. For example: LCConfigService.updateConfig\("versionStamp",""\).

    For more information, see the *Post-customization step* topic.

4.  To check in the updated configuration property files, use the following command:

    ```
    LCConfigService.checkInConfig()
    ```

5.  After you complete your updates, type the following command to deploy the changes:

    ```
    synchAllNodes()
    ```

6.  To exit the wsadmin client, type `exit` at the prompt.

7.  Stop and restart all of the HCL Connections application servers.


**Parent topic:**[Changing common configuration property values](../admin/t_admin_common_changing_config.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Post-customization step](../customize/t_admin_common_customize_postreq.md)

[Customizing the user interface](../customize/t_admin_common_customize_main.md)

[Turning off active content filtering](../secure/t_admin_common_turn_off_filter.md)

