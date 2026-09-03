# Configuring the SharePoint app in Microsoft Azure AD {#task_x2l_zbt_qnb .task}

Register and configure the HCL Connections community app for Microsoft SharePoint in Azure Active Directory (Azure AD).

Linked references in the following procedure provide additional information from the Microsoft identity platform documentation.

1. From the Azure portal at <https://portal.azure.com/>, select your organization's directory.

2. In your directory, under **Manage**, click **App registrations**, and then click **New registration**.

3. Complete the registration form as described in the Microsoft documentation:
   <https://learn.microsoft.com/azure/active-directory/develop/quickstart-register-app>

    **Note these steps:**

    - Under **Supported account types**, select **Accounts in this organizational directory only (your_organizational_directory)**.
    - Under **Redirect URI (optional)**, select **Web**, and then add `https://your_connections_host.spo.index.html` as the redirect URI that your Connections users will use to receive their authentication response.
    - Click **Register**.

4. From your app's **Overview** page in Azure, click **API permissions**, and then click **Add a permission**.

5. Add the permissions required for your app to access Microsoft web APIs. For more information, see:
   <https://learn.microsoft.com/azure/active-directory/develop/quickstart-configure-app-access-web-apis>

    Complete the following steps when configuring API permissions:

    - Under **Request API permissions**, select **SharePoint** from the **Microsoft APIs** tab.
    - Under **Delegated permissions**, select the following permissions:
        - **Read and write user files**
        - **Read and write items in all site collections**
    - Click **Add permissions** to save your changes.
    - From the configured API permissions page, click **Grant admin consent for your_organizational_directory**.

6. Add a redirect URI for your organization's SharePoint mobile app.

    1. Click **Authentication**.

    2. Under **Web**, click **Add URI**, and then add `https://your_connections_host/spo/mobile.html` as the redirect URI for mobile users.

    3. Under **Implicit grant**, select both:
        - **Access tokens**
        - **ID tokens**

    4. Click **Save**.

7.  Edit the [Azure Active Directory app manifest](https://docs.microsoft.com/azure/active-directory/develop/reference-app-manifest) to allow the open authentication used by the app.

    1.  From the app's **Overview** page, Click the **Manifest** section.

    2.  Change the attribute `oauth2AllowImplicitFlow` to `true`.

    3.  Click **Save**.

8.  From your app's **Overview** page, copy the **Application (client) ID** value to the clipboard. You will need this value for the next task.


[Configure the SharePoint app in Connections](t_admin_sharepoint_app_configure.md).

**Parent topic:**[The Connections community app for Microsoft Sharepoint](../../connectors/admin/c_admin_sharepoint_app_container.md)
