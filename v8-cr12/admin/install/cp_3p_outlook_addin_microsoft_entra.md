# Registering the Connections Add-in in Microsoft Entra {#cp_3p_outlook_addin_microsoft_entra .concept}

The HCL Connections Outlook Add-in requires an application registration in Microsoft Entra ID (formerly Azure Active Directory) to securely authenticate users and access required Outlook resources. This registration provides the Application (client) ID and Directory (tenant) ID for the Connections configuration and defines the API permissions needed for the add-in to function.

Use the following steps to register the HCL Connections Outlook Add-in in Microsoft Entra ID. This process establishes the necessary trust relationship and configures the permissions required for single sign-on (SSO).

## Register the Microsoft Entra App

Ensure that there is an existing application registration for the Outlook Add-in in your Microsoft Entra ID tenant.

1. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com/).
2. Navigate to your application's **Overview** page by going to **Entra ID** > **App registrations** > **[Name of the App]**.

If there are no existing app registration, you can follow the steps below to create a new app registration:

1. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com/).
2. Navigate to **Entra ID**  >  **App registrations**.
3. Click **+ New registration**.
4. Provide a meaningful **Name** for your application (for example, "HCL Connections Outlook Add-in").
5. Under **Supported account types**, select **Accounts in this organizational directory only**. This ensures that only users within your tenant can use the application.
6. Click **Register**.

Once the registration is complete, the application's Overview page will be displayed. You will need to copy and save the Application (client) ID (`ENTRA_CLIENT_ID`) and the Directory (tenant) ID (`ENTRA_TENANT_ID`) for later use in your HCL Connections configuration.

## Update the redirect URI

The redirect URI is the URL to which Microsoft Entra ID sends authentication responses. You must configure this correctly for the Outlook Add-in to work. To configure the redirect URI:

1. Navigate to your application's **Overview** page by going **to Entra ID** > **App registrations** > **[Name of the App]**.
2. On your application's **Overview** page, navigate to **Authentication** (under the "Manage" menu on the left).
3. Under **Platform configurations**, click **+ Add a platform**. A **Configure platforms** side panel will appear.
    1. On the side panel, select **Single-page application** as the application type.
    2. Complete the form with the following details:
        -   **Redirect URIs**: `https://<CONNECTIONS_URL>/<CONTEXT_ROOT>`

            -   Replace `<CONNECTIONS_URL>` with the full URL of your HCL Connections server.
            -   Replace `<CONTEXT_ROOT>` with the context root configured for the add-in (default is `outlook-addin`).
            
                Example:  `https://example-connections.com/outlook-addin`.

        -   **Front-channel logout URL**: _leave blank_.
        -   **Grant types**: _leave untouched_.
        -   **Implicit grant and hybrid flows**: _leave options unchecked_.

    3.  Click **"Configure"** to save changes.

4. After adding an SPA platform, under **Platform configurations**, go to  **to Single-page application** > **Redirect URIs**, and click **Add URI**.
5. In the newly added input field, enter `brk-multihub://<CONNECTIONS_URL>`.

    Replace `<CONNECTIONS_URL>` with the full URL of your HCL Connections server.
    
    Example: `brk-multihub://example-connections.com`.

6. Enter the following details for the other options under the **Platform Configurations**:

    -   **Front-channel logout URL**: _leave blank_.
    -   **Implicit grant and hybrid flows**: _leave options unchecked_.
    -   **Supported account types**: _leave as default — Accounts in this organizational directory only_.
    -   **Advance Settings**: _leave as default — No_

7. At the bottom of the page, click **Save** to apply changes.

## Configure API permissions

The Outlook add-in needs specific permissions to access Outlook data and features. You must grant these permissions to the application.

1. On your application's **Overview** page, navigate to **API permissions** (under the **Manage** menu on the left).
2. Click **+ Add a permission**.
3. A side panel will be shown to add permissions:

    1. For **Microsoft APIs**, select **Microsoft Graph**.
    2. For the type of permission the application requires, select **Delegated permissions** and set the following permissions:

        -   **Openid permissions**: `openid`
        -   **Openid permissions**: `offline_access`
        -   **Mail**: `Mail.Read`

    3. Click **Add permissions**.

4. After adding the permissions, click on the **Grant admin consent for [your tenant name]** button and confirm. This grants the permissions to all users in your organization, so they do not need to consent individually.

Your app registration is now complete. You can use the `ENTRA_CLIENT_ID` (Application ID) and `ENTRA_TENANT_ID` (Directory ID) to configure your HCL Connections environment.

**Parent topic:** [Integrating with Connections Outlook Add-in for Microsoft Outlook](../install/cp_3p_outlook_addin_container.md)

