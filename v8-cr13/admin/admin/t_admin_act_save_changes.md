# Applying property changes in Activities {#t_admin_act_save_changes .task}

After you have edited the Activities configuration properties, check the changed configuration file in, and restart the servers to apply the changes.

You must perform the check in during the same wsadmin session in which you checked out the files for the changes that you made to take effect.

1.  Check in the changed configuration property keys using the following wsadmin client command:

    ```
    ActivitiesConfigService.checkInConfig()
    ```

2.  Update the value of the version stamp configuration property in the LotusConnections-config.xml file to force users' browsers to pick up this change. See *Required post-customization step* for more details.

3.  To exit the wsadmin client, type `exit` at the prompt.

4.  Stop and restart the server hosting the Activities application.


**Parent topic:**[Changing Activities configuration property values](../admin/t_admin_act_changing_config.md)

**Previous topic:**[Activities configuration properties](../admin/r_admin_activities_props.md)

**Next topic:**[Managing uploaded files](../admin/t_admin_act_manage_uploads.md)

**Related information**  


[Applying common configuration property changes](../admin/t_admin_common_save_changes.md)

[Post-customization step](../customize/t_admin_common_customize_postreq.md)

