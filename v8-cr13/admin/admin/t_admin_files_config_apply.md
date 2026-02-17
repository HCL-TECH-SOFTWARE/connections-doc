# Applying Files property changes {#applyingpropertychanges .task}

After you have edited the Files configuration properties, check the changed configuration file in, update the version stamp property, and restart the servers to apply the changes.

For information about the properties that you can edit, see *Files configuration properties*. To apply Files property changes, complete the following steps:

1.  Check in the changed configuration property keys using the following wsadmin client command:

    ```
    FilesConfigService.checkInConfig()
    ```

2.  Update the value of the version stamp configuration property in the LotusConnections-config.xml file to force users' browsers to pick up this change. See *Required post-customization step* for more details.

3.  To exit the wsadmin client, type `exit` at the prompt.

4.  Stop and restart the server hosting the Files application.


**Parent topic:**[Changing Files configuration property values](../admin/t_admin_files_changing_config_properties.md)

**Related information**  


[Applying common configuration property changes](../admin/t_admin_common_save_changes.md)

[Files configuration properties](../admin/r_admin_files_config_properties2.md)

[Post-customization step](../customize/t_admin_common_customize_postreq.md)

[Displaying files inline](../admin/t_admin_files_enable_inline.md)

[Restricting file types in Files](../admin/t_admin_files_restrict_types.md)

[Disabling automatic email notification of file updates](../admin/t_admin_files_disable_notification.md)

[Disabling file versioning](../admin/t_admin_files_disable_versioning.md)

[Configuring MIME types for Files](../admin/t_admin_files_config_mime.md)

