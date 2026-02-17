# Applying Wikis property changes {#applyingpropertychanges .task}

After you edit the Wikis configuration file, check the file in, update the version stamp property, and restart the servers.

For information about the properties that you can edit, see *Wikis configuration properties*. To apply Wikis property changes, complete the following steps:

1.  Check in the changed configuration property keys by entering the following command in the wsadmin client:

    ```
    WikisConfigService.checkInConfig()
    ```

2.  Update the value of the version stamp configuration property in the LotusConnections-config.xml file. This value force users' browsers to pick up this change. For more information, see *Post-customization step*.

3.  To exit the wsadmin client, type `exit` at the prompt.

4.  Restart the application servers that host the Wikis application.


**Parent topic:**[Changing Wikis configuration property values](../admin/t_admin_wikis_changing_config_properties.md)

**Related information**  


[Applying common configuration property changes](../admin/t_admin_common_save_changes.md)

[Wikis configuration properties](../admin/r_admin_wikis_config_properties2.md)

[Post-customization step](../customize/t_admin_common_customize_postreq.md)

[Restricting attachment file types in Wikis](../admin/t_admin_wikis_restrict_types.md)

[Setting maximum sizes on media, pages, and attachments](../admin/t_admin_wikis_setting_maxsize.md)

[Disabling wiki page versioning](../admin/t_admin_wikis_disable_versioning.md)

[Configuring MIME types for Wikis](../admin/t_admin_wikis_config_mime.md)

