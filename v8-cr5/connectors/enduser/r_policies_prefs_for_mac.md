# Policies and preferences for HCL Connections for Mac {#r_policies_prefs_for_Mac .reference}

Set preferences and policies to control how users interact with HCL Connections for Mac.

## Preference and policy settings { .section}

The following table shows preference and policy settings that control the behavior of IBM® Connections for Mac. You can specify these custom setting by adding or editing keys in property list \(plist\) for the application. Setting values to anything other than the values listed in the table produces unpredictable results.

There are three ways to set a property in a plist.

-   A user can edit the plist in /Users/\{USER\_NAME\}/Library/Preferences/com.ibm.AutoSyncMonitor.plist" using an editor such as xcode or plistBuddy. Create a dictionary with the name of "Policies" and add policies to the dictionary XML file to enable them.

    **Note:** the debugMode and LogEnabled keys must be added to /Root not /Policies.

-   If you are a local administrator, you can create a new plist namedcom.ibm.AutoSyncMonitor.plist and add it to /Library/Preferences. Add policies to this plist that will apply for users of this computer.

    **Note:** Once the plist is in this directory the only way to edit it is with plist Buddy and you must authenticate using your administrator password.

-   If you are a server administrator, you can use a program such as OS X Server to distribute custom plists with policies that you set. Add a plist to /Library/Managed Preferences/\{USER\_NAME\}/. The policies apply for each user that you specify. These settings can not be changed locally.

**Note:** If there is a conflict between the plists, the Managed Preference list on the server override the library and user preferences, and library preferences override user preferences.

| Key/SubKey | Name | Values | Description |
| --- | --- | --- | --- |
| Root/Policies | Default Auth Type | <ul><li>0 - Basic Authentication (Default)</li><li>1 - Custom</li></ul> | Controls the default authentication type in the **Add Account** dialog. |
| Root/Policies | Default Auth Type Policy | <ul><li>0 - Enable Authentication dropdown (default)</li><li>1 - Disable Authentication dropdown</li></ul> | Setting the policy to disable will prevent users from selecting and changing the authentication type in the **Add Account** dialog. |
| Root/Policies | Default Auth Ext | Bundle ID | When Default Auth Type is set to Custom this setting controls which custom authentication module will display by default. Supported bundle IDs include: Basic - basic.authexct, Smart Cloud - smartcloud.authext, TAM - tam.authext, SiteMinder - siteminder.authext, IBM Connect Cloud - ibmsc.authext, Federated - federatedcloud.authext, Web Forms Authentication - html.authtext |
| Root/Policies | Sharing Intent | String, Default 0 (v24.04 or later), 1 (v23.03 or earlier)<ul><li>0 - Do not normally allow outside access for new content, but ask me about new content added to a folder permitting outside access (Default)</li><li>1 - Allow all new content to be shared with people outside this organization, except for folders added to a folder that denies outside access</li><li>2 - Only allow outside access to new content if created in a folder permitting outside access.</li></ul> | This setting sets the default value for the sharing intent setting on new file and new folder dialogs and **Add New Account Panel for Cloud Account** dialog. |
| Root/Policies | Sharing Intent Policy | String<ul><li>0 = user can change the sharing intent setting (Default)</li><li>1 = user cannot change the sharing intent setting</li></ul> | This setting controls whether the user can change the default value for the sharing intent setting on new file and new folder dialogs and **Add New Account Panel for Cloud Account** dialog. If the policy is set, the user cannot change the setting. |
| Root/Policies | Encryption | String<ul><li>0 = Encrypt option is not checked (Default)</li><li>1 = Encrypt option is checked</li></ul> | This setting sets the default value for the Encryption setting on new file dialogs and **Add New Account Panel for Cloud Account** dialog |
| Root/Policies | Encryption Policy | String<ul><li>0 = user can change the Encryption setting (Default)</li><li>1 = user cannot change the Encryption setting</li></ul> | This setting controls whether the user can change the default value for the Encryption setting on new file dialogs and **Add New Account Panel for Cloud Account** dialog. If the policy is set, the user cannot change the setting. |
| Root/Policies | Help URL | http://www-01.ibm.com/support/knowledgecenter/SSYGQH_5.0.0/connectors/admin/msdesktop_mac_over.dita (Default) **Note:** "http://" or "https://" is required as part of the url | The URL for help for the product. |
| Root/Policies | DefaultConnectURL | String Default - null (not in registry) | The URL that shows by default in the dd New Account dialog for a new server. |
| Root/Policies | DefaultConnectName | String Default - null | The name that will show by default in the dd New Account dialog for a new server |
| Root/Policies | Disable Public Sharing | String<ul><li>0 = public sharing enabled, will allow sharing with Everyone (public) or Everyone in Organization (for smartcloud) where appropriate in sharing dialogs</li><li>1 = groups disabled, will disable sharing with Everyone (public) or Everyone in Organization (for smartcloud) where appropriate in sharing dialogs (default)</li></ul> | This setting disables the ability for users to share with Everyone (the Public) for Connections, or with Everyone in Organization for Connections Cloud. There is no 'Disable Public Sharing Policy.' |
| Root/Policies | ScanIgnoreExtensions | <Dictionary of extensions> | List of extensions to ignore changes on; for example: gif, jpeg, mpg. This list will be merged with any user preferences unless the policy is set to Disable. **Note:** Setting this option requires a reboot. |
| Root/Policies | ScanIgnoreExtensions Policy | <ul><li>0 - Enable Preference (default)</li><li>1 - Disable Preference</li></ul> | Setting the policy to disable will prevent users from adding file extensions to the ignore list. |
| Root/Policies | DarkDeployment | <ul><li>0 - Disable Features (default)</li><li>1 - Enable Features</li></ul> | Dark Deployment are features that are beta ready. |
| Root/Policies | DarkDeployment Policy | String, Default = null (not in registry)<ul><li>0 - user can change the DarkDeployment setting (default)</li><li>1 - user cannot change the DarkDeployment setting</li></ul> | Controls whether users can change the DarkDeployment setting in the General Preferences panel. |
| Root/Policies | DisableConnectCloud | <ul><li>0 - Show (Default)</li><li>1 - Hide</li></ul> | Controls whether users see the **Connect to Cloud** option in the Connections menu. |
| Root | DebugMode | <ul><li>1 - Report any Error Message (default)</li><li>2 - Report any Warning or Error message</li><li>3 - Report any Debug, Warning, or Error message</li></ul> | Setting this policy will enable the application to log different levels of messages |
| Root | LogEnabled | <ul><li>0- Logs are not saved (default)</li><li>1 - Write logs to log file</li></ul> | Setting this policy will enable the application to create a physical log that is located in: /Users/{USERNAME}/Library/Application Support/com.ibm.AutoSyncMonitor/Logs **Note:** Log files are kept for one week, then the oldest is automatically removed each day as a new log file is created. |
| Root/Policies | FailInvalidCerts | String<ul><li>0 – allow untrusted certificates (default)</li><li>1 – block untrusted certificates</li></ul> | When FailInvalidCert is set to 0, the user is warned that the certificate is invalid or incorrect but user can choose to accept the certificate. When FailInvalidCert is set to 1, it will block untrusted certificates. An error message informs users that the certificate is invalid or incorrect. |
| Root/Policies | EndpointFiles | String, Default – null (not in registry) Endpoint override. For example, /files | Allows override of Connections endpoint. Plug-ins have hardcoded values for 3 endpoints, which can be overridden using these settings. Overrides must take this form: `EndpointFile=/files` where the destination is indicated with a leading slash (/) but no trailing slash. |
| Root/Policies | EndpointProfiles | String, Default – null (not in registry) Endpoint override. For example, /profiles | Allows override of Connections endpoint. Plug-ins have hardcoded values for 3 endpoints, which can be overridden using these settings. Overrides must take this form: `EndpointProfiles=/profiles` where the destination is indicated with a leading slash (/) but no trailing slash. |
| Root/Policies | EndpointPush | String, Default – null (not in registry) Endpoint override. For example, /push | Allows override of Connections endpoint. Plug-ins have hardcoded values for 3 endpoints, which can be overridden using these settings. Overrides must take this form: `EndpointPush=/push` where the destination is indicated with a leading slash (/) but no trailing slash. |
| Root/Policies | DownloadUnscannedFiles | String, Default – null (not in registry)<ul><li>0 = unscanned files are not downloaded by default. User is prompted via message or sync issue.</li><li>1 = unscanned files are downloaded by default. **Warning:** This behavior is not recommended as the files may not be safe</li></ul> | Allows override of the download behavior for files that have not yet been scanned for viruses on the server. **Warning:** Downloading unscanned files can allow unsafe files to be downloaded. |

**Parent topic:**  [HCL Connections for Mac](../../connectors/enduser/msdesktop_mac_over.md)

