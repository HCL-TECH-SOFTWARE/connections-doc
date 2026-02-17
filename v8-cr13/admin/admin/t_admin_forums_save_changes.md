# Applying property changes in Forums {#t_admin_forums_save_changes .task}

After you edit configuration properties, check the modified configuration file in and restart the servers to apply the changes.

For information about the properties that you can edit, see *Forums configuration properties*.

1.  Check in the changed configuration property keys by using the following wsadmin client command:

    ForumsConfigService.checkInConfig\(\)

    **Important:** The checkin must be done in the same wsadmin session as the checkout.

2.  Update the value of the version stamp configuration property in the LotusConnections-config.xml file to force users' browsers to pick up this change. For more details, see *Required post-customization step*.

3.  To exit the wsadmin client, type exit at the prompt.

4.  Restart the Forums application server.


**Parent topic:**[Changing Forums configuration property values](../admin/t_admin_forums_changing_config.md)

**Related information**  


[Applying common configuration property changes](../admin/t_admin_common_save_changes.md)

[Forums configuration properties](../admin/r_admin_forums_config_props.md)

[Post-customization step](../customize/t_admin_common_customize_postreq.md)

