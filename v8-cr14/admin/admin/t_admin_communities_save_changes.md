# Applying property changes in Communities {#t_admin_communities_save_changes .task}

After you have edited the Communities configuration properties, check the changed configuration file in, and restart the servers to apply the changes.

See *Communities configuration properties* for information about the properties that you can edit.

1.  Check in the changed configuration property keys using the following wsadmin client command:

    CommunitiesConfigService.checkInConfig\(\)

    **Important:** The checkin must be done in the same wsadmin session as the checkout.

2.  Update the value of the version stamp configuration property in the LotusConnections-config.xml file to force users' browsers to pick up this change. See *Required post-customization step* for more details.

3.  To exit the wsadmin client, type exit at the prompt.

4.  Restart the Communities application.


**Parent topic:**[Changing Communities configuration property values](../admin/t_admin_communities_changing_config.md)

**Related information**  


[Applying common configuration property changes](../admin/t_admin_common_save_changes.md)

[Communities configuration properties](../admin/r_admin_communities_config_props.md)

[Post-customization step](../customize/t_admin_common_customize_postreq.md)

