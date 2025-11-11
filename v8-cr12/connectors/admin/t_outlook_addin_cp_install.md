# Installing HCL Connections Add-in for Microsoft Outlook with Component Pack {#t_outlook_addin_cp_install .task}

Installing HCL Connections Add-in for Microsoft Outlook with Component Pack. The Outlook Add-in is available as part of HCL Connections Component Pack in version 7.0 or later.

Installing and setting up the HCL Connections Add-in for Microsoft Outlook with Component Pack. The Outlook Add-in is available as part of HCL Connections Component Pack in version 7.0 or later.

Review the [Prerequisites for Component Pack](https://help.hcltechsw.com/connections/v7/admin/install/cp_prereqs.html) before continuing with this procedure.

**Installing Outlook Add-in with Component Pack**

1.  Registering the OAuth Provider - If you are installing the Outlook Add-in as part of the HCL Connections Component Pack and are using the provided ansible automation scripts, you do not need to manually register the OAuth provider. This is required for non-ansible Component Pack installations and standalone installations. Refer to [Registering the Connections Add-in for Outlook OAuth application provider](https://help.hcltechsw.com/connections/v7/admin/install/cp_3p_outlook_addin_oauth.html) for additional information.
2.  Microsoft Entra Registration - This step is required to register the Outlook Add-in as an application in your organization's Microsoft Entra tenant. This process creates the application identity and provides the Client ID and permissions needed for the add-in to function. Refer to [Registering the Connections Add-in in Microsoft Entra](install/cp_3p_outlook_addin_microsoft_entra.html)
3.  Using ansible scripts - Refer to [Ansible automation option provided by HCL](https://help.hcltechsw.com/connections/v7/admin/install/cp_install_upgrade_container.html#cp_install_upgrade_container__section_lly_2sn_tnb) for additional information.
4.  [Component Pack Installing and Upgrading](https://help.hcltechsw.com/connections/v7/admin/install/cp_install_upgrade_container.html)
5.  [Setting up Connections Add-in for Microsoft Outlook](https://help.hcltechsw.com/connections/v7/admin/install/cp_install_services_tasks.html#cp_install_services_tasks__section_tvw_cpw_tnb)

**What's Next:**

The Connections Add-in for Outlook must be added to the users’ Outlook environments. This can be done by the Exchange administrator, or by the users directly

-   [Making the Connections Add-in for Outlook available to users](https://help.hcltechsw.com/connections/v7/admin/install/cp_3p_outlook_make_available_to_users.html) - The HCL Connections Add-in for Outlook must be added to the users’ Outlook environments. This can be done by the Exchange administrator, or by the users directly.
-   [Using the Outlook Add-in](https://help.hcltechsw.com/connections/v7/connectors/enduser/c_ms_plugins_add_in_outlook.html) - The power of Connections from your Outlook inbox. Use the Connections Add-in for Microsoft™ Outlook to work with Connections content from within your Outlook inbox.

**Parent topic:**[Installing via Component pack or Standard Install](../../connectors/admin/c_outlook_addin_installing.md)

