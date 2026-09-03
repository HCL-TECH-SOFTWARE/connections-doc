# Applying property changes in Profiles {#t_admin_profiles_save_changes .task}

After you have edited Profiles configuration properties, check the changed configuration file in, and restart the server to apply your changes.

See *Profiles configuration properties* for information about the properties that you can edit for Profiles.

1.  Check in the changed configuration property keys using the following wsadmin client command:

    ProfilesConfigService.checkInConfig\(\)

2.  Update the value of the version stamp configuration property in the LotusConnections-config.xml file to force users' browsers to pick up this change. See *Required post-customization step* for more details.

3.  To exit the wsadmin client, type exit at the prompt.

4.  Use the IBM® WebSphere® Application Server Integrated Solutions Console to stop and restart the server hosting the Profiles application.


**Parent topic:**[Changing Profiles configuration property values](../admin/t_admin_profiles_changing_config.md)

**Related information**  


[Applying common configuration property changes](../admin/t_admin_common_save_changes.md)

[Profiles configuration properties](../admin/r_admin_profiles_config_props.md)

[Post-customization step](../customize/t_admin_common_customize_postreq.md)

