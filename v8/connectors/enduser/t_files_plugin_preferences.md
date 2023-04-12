# Setting HCL Connections server preferences for Files {#r_oa_t_setting_activities_preferences .task}

You can provide your HCL Connections password or specify the address of the server in the **Connections** preferences page.

If you are already using the Connections Activities sidebar application, the preferences should already be set for you to access Connections Files. If you need to modify the settings, the **Connections Server Settings** section of the preference page contains the information required to log in to the Files panel of the sidebar. To set the server preferences, complete the following actions:

1.  From the panel menu, select **Preferences**.

2.  Fill in the following fields in the Connections Server Settings section:

    |Field|Description|
    |-----|-----------|
    |**Server URL**|Type the Web address of the Connections activities server, beginning with either https:// or http://For example: https://enterprise.example.com

If you know that the server requires a secure, encrypted connection, begin the address with https://

<!--Some administrators change the context roots that are used to access Connections features.--> If the Web address that you normally use to access the Activities feature has a value other than <server\_name\>/activities, specify the server URL using a syntax similar to this: http://enterprise.example.com/activities

**Note:** Your administrator might have already provided a value for this field using an administrative policy. If so, do not change the value.

|
    |**User name**|Type your user name for logging into the Connections server.|
    |**User password**|Type the associated password.|

3.  Click **Apply** to save your changes, and then click **OK** to close the Preferences window.


The next time that you use Notes®, the new settings are used to log you in to Connections automatically.

**Parent topic:**[Using the HCL Connections Files plug-in for Notes](../../connectors/enduser/c_files_plugin_overview.md)

