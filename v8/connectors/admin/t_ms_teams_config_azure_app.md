# Configuring an Azure app to support the Microsoft Teams app {#concept_jw1_tgf_vnb .concept}

This task accomplished by using the App Studio app within Microsoft Teams.

## Before you begin: {#section_nrf_51g_vnb .section}

Make sure you've completed the steps in [Updating WebSphere to support single sign-on with Connections for Microsoft Teams](t_ms_teams_update_websphere_for_sso.md).

## Create the Azure bot and app registration {#section_pd1_rrf_vnb .section}

1.  Log in as the Microsoft Teams administrator.
2.  Navigate to Microsoft Teams and in the navigation select the **Apps catalog** and find the App Studio app from Microsoft. Add this app if needed and open it.
3.  In the top navigation of the app, select **Manifest Editor**.
4.  Choose the **Bot Management** button.
5.  In the bot name field, pick a name for your HCL Connections app, such as "HCL Connections" and then click **Create**.
6.  After the bot is successfully created, copy the bot ID and password to a text file to use later.
7.  Select this bot from the **Existing bot registrations** list.
8.  In the bot endpoint address field, enter the following URL, replacing connections.example.com with the host name for your environment:

    ```
    https://connections.example.com/teams-share-service/api/msteams/command
    ```


## Add single sign-on permissions to your Azure app {#section_t3f_trf_vnb .section}

1.  Login to the Azure portal to complete the single sign on permissions, at https://portal.azure.com.
2.  Select or find **App Registrations** and then click on the Azure app that was just created.
3.  Navigate to **Manage** \> **Authentication**. Under **Supported account types**, make sure that **Accounts in any organizational directory \(Any Azure AD Directory - Multitenant\)** is selected.
4.  Navigate to **Manage** \> **API Permissions**.
5.  Click **Add a permission** and select **Microsoft Graph APIs** \> **Delegated permissions**.
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
12. Next, add two client applications that are allowed to access this API. These are for the Microsoft Teams desktop client and the Microsoft Teams mobile client:
    -   5e3ce6c0-2b1f-4285-8d4b-75ee78787346
    -   1fec8e78-bce4-4aaf-ab1b-5451cc387264
13. In the navigation, select **Manage** \> **Token configuration**.
14. Select the option to add an optional claim, and choose the **Access** token. From the list of claims, select email and then click **Add**.

## What to do next: {#section_w2g_3bg_vnb .section}

Deploy the microservices and configure IBM HTTP Server for Teams. See the *Set up Microsoft Teams integration* section in [Sample steps to install or upgrade to Component Pack 7](../../admin/install/cp_install_services_tasks.md).

