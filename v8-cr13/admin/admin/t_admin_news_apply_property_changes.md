# Applying property changes in the News repository {#t_admin_news_apply_property_changes .task}

After making changes to News configuration settings, you must check in the configuration settings and restart the server to apply the changes.

You must perform the check-in during the same wsadmin session in which you checked out the files for the changes that you made to take effect.

1.  Complete your configuration changes.

2.  Check in the changed configuration property keys using the following wsadmin client command:

    NewsCellConfig.checkInConfig\(\)

3.  Update the value of the version stamp configuration property in the LotusConnections-config.xml file to force users' browsers to pick up this change. See *Required post-customization step* for more details.

4.  To exit the wsadmin client, type exit at the prompt.

5.  Use the IBM® WebSphere® Application Server Integrated Solutions Console to stop and restart the server hosting the News application.


**Parent topic:**[Accessing the News configuration file](../admin/t_admin_homepage_access_news_config.md)

**Related information**  


[Configuring database clean-up for the News repository](../admin/t_admin_homepage_config_news_data_cleanup.md)

[Synchronizing News data with other applications](../admin/t_admin_homepage_sync_news_data.md)

[Applying common configuration property changes](../admin/t_admin_common_save_changes.md)

[Post-customization step](../customize/t_admin_common_customize_postreq.md)

