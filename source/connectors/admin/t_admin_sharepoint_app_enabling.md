# Configuring the Sharepoint app in Microsoft Azure AD {#task_x2l_zbt_qnb .task}

Register and configure the HCL Connections community app for Microsoft Sharepoint in the Azure Active Directory.

Linked references in the following procedure are to additional explanation in the [Microsoft identity platform](https://docs.microsoft.com/azure/active-directory/develop/v2-overview) documentation.

1.  From your Azure Active Directory portal at [https://portal.azure.com/\#](https://portal.azure.com/), select your organization's directory.

2.  In your directory, under **Manage**, click **App registrations** and then click **New registation**.

3.  [Fill out the registration form.](https://docs.microsoft.com/azure/active-directory/develop/quickstart-register-app)

    **Note these steps:**

    -   Under **Supported account types**, select **Accounts in this organizational directory only \(your\_organizational\_directory\)**.
    -   Under **Redirect URI \(optional\)**, select **Web** and add https://your\_connections\_host.spo.index.html as the URI for your Connections users to receive their authentication response.
    -   Click **Register**.
4.  From your app's **Overview** page in Azure, click **API permissions** and then click **Add a permission**.

5.  [Add access rights for your app to access the Microsoft web API](https://docs.microsoft.com/azure/active-directory/develop/quickstart-configure-app-access-web-apis).

    **Note these steps:**

    -   Under **Request API permissions**, select **Sharepoint** from the **Microsoft APIs** tab.
    -   Under **Delegated Permissions**, select **Read and write user files** and **Read and write items in all site collections**.
    -   Click **Add permissions** to save.
    -   From your configured API permissions screen, select **Grant admin consent for your\_organizational\_directory**.
6.  Add a redirect URI for your organization's Sharepoint mobile app.

    1.  Click **Authentication**.

    2.  Under **Web**, click **Add URI** and add https://your\_connections\_host/spo/mobile.html as the reply URL for mobile users.

    3.  Under **Implicit grant**, select both **Access tokens** and **ID tokens**.

    4.  Click **Save**.

7.  Edit the [Azure Active Directory app manifest](https://docs.microsoft.com/azure/active-directory/develop/reference-app-manifest) to allow the open authentication used by the app.

    1.  From the app's **Overview** page, Click the **Manifest** section.

    2.  Change the attribute `oauth2AllowImplicitFlow` to `true`.

    3.  Click **Save**.

8.  From your app's **Overview** page, copy the value for **Application \(client\) ID** to the clipboard for use in the next task.


[Configure the SharePoint app in Connections](t_admin_sharepoint_app_configure.md).

**Parent topic:**[The Connections community app for Microsoft Sharepoint](../../connectors/admin/c_admin_sharepoint_app_container.md)

