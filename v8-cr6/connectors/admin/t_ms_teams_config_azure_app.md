# Configuring an Azure app to support the Microsoft Teams app {#concept_jw1_tgf_vnb .concept}

This task is accomplished using the Developer Portal app within Microsoft Teams.

## Before you begin {#section_nrf_51g_vnb .section}

Make sure you've completed the steps in [Updating WebSphere to support single sign-on with Connections for Microsoft Teams](t_ms_teams_update_websphere_for_sso.md).

## Create the Azure bot and app registration {#section_pd1_rrf_vnb .section}

1.  Log in as the AD administrator with sufficient rights to create applications, for example Application Developer or Application Administrator.

    !!! note

        For details on the permissions required by the administrator, refer to [Azure AD built-in roles](https://learn.microsoft.com/en-us/azure/active-directory/roles/permissions-reference) in the Microsoft documentation.

2.  Navigate to Microsoft Teams and in the navigation, select the **Apps catalog** and find the Developer Portal app from Microsoft. Add this app if needed and open it.
3.  In the top navigation of the app, select **Tools**.
4.  Choose **Bot Management**, and click the **+ New Bot** button.
5.  In the bot name field, pick a name for your HCL Connections app, such as "HCL Connections" and then click **Add**.
6.  After the bot is successfully created, click the **< Bots** button and copy the bot ID to a text file to use later.
7.  Select this bot from the **Existing bot registrations** list.
8.	Click the **Client secrets** tab. Then, click **Add a client secret for your bot**, copy the newly generated bot client secret to a text file for use later, and click **Okay**.
19.	Next, click the **Configure** tab.
10.	In the configure endpoint address field, enter the following URL, replacing *connections.example.com* with the host name for your environment:

    ```
    https://connections.example.com/teams-share-service/api/msteams/command
    ```


## Add single sign-on permissions to your Azure app {#section_t3f_trf_vnb .section}

1.  Log into the [Azure portal](https://portal.azure.com) to complete the single sign-on permissions. You must use an AD administrator account with sufficient rights to manage applications.

    !!! note

        For details on the permissions required by the administrator, refer to [Azure AD built-in roles](https://learn.microsoft.com/en-us/azure/active-directory/roles/permissions-reference) in the Microsoft documentation.
    
2.  Select or find **App Registrations** and then click on the Azure app that was just created.
3.  Navigate to **Manage** \> **Authentication**. Under **Supported account types**, make sure that **Accounts in any organizational directory \(Any Azure AD Directory - Multitenant\)** is selected.
4.  Navigate to **Manage** \> **API Permissions**.
5.  Click **Add a permission** and select **Microsoft Graph** \> **Delegated permissions**.
6.  Select the check box for these Openid permissions:
    -   email
    -   offline\_access
    -   openid
    -   profile
7.  Click **Add permissions**.
8.  Click **Grant admin consent** for your tenant name. This will remove your users having to grant consent each time they use this app in Microsoft Teams.
9.  In the navigation, select **Manage** \> **Expose an API**.
10. If your Application ID URI is not set, click **Set** and update the URI. Add your Connections server hostname between api:// and the \{appID\}. For example: api://connections.example.com/\{​​​​​​appID\}​​​​​​.
11. Add a scope and give it a scope name of access\_as\_user. Your API URL should look like this: api://connections.example.com/\{​​​​​​appID\}​​​​​​/access\_as\_user. In the "who can consent" step, enable it for **Admins and users**. Make sure it is set to **enabled**.
12. Next, add two client applications that are allowed to access this API. Make sure the api scope is checked. These are for the Microsoft Teams desktop client and the Microsoft Teams mobile client:
    -   5e3ce6c0-2b1f-4285-8d4b-75ee78787346
    -   1fec8e78-bce4-4aaf-ab1b-5451cc387264
13. In the navigation, select **Manage** \> **Token configuration**.
14. Select the option to add an optional claim, and choose the **Access** token. From the list of claims, select email and then click **Add**.

## What to do next {#section_w2g_3bg_vnb .section}

[Setting up the Connections app for the Microsoft Teams client](#t_ms_teams_set_up_conn_app_for_ms.task)

