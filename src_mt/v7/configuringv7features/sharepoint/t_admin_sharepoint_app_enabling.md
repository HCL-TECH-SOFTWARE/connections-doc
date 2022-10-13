# Configuring the Sharepoint app in Microsoft Azure AD

Register and configure the HCL Connections community app for Microsoft Sharepoint in the Azure Active Directory.

## About this task
Linked references in the following procedure are to provide additional explanation in the [Microsoft Identity Platform](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-overview) documentation.

## Procedure

1. From your Azure Active Directory portal at [https://portal.azure.com/](https://portal.azure.com/), select your organization's directory.
2. In your directory, under **Manage**, click **App registrations** and then click **New registration**.
3. [Fill out the registration form](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app).
    
    **Note these steps:**
    - Under **Supported account types**, select **Accounts in this organizational directory only (your_organizational_directory)**.
    - Under **Redirect URI (optional)**, select **Web** and add *https://your_connections_host/spo/index.html* as the URI for your Connections users to receive their authentication response.
    - Click **Register**.

4. From your **app's** Overview page in Azure, click **API permissions** and then click **Add a permission**.
5. [Add access rights for your app to access the Microsoft web API](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-configure-app-access-web-apis).
    
    **Note these steps:**
    - Under **Request API permissions**, select **Sharepoint** from the **Microsoft APIs** tab.
    - Under **Delegated Permissions**, select **Read and write user files** and **Read and write items in all site collections**.
    - Click **Add permissions** to save.
    - From your configured API permissions screen, select **Grant admin consent for *your_organizational_directory***.
6. Add a redirect URI for your organization's Sharepoint mobile app.
    
    a. Click **Authentication**.
    
    b. Under Web, click **Add URI** and **add** *https://your_connections_host/spo/mobile.html* as the reply URL for mobile users.
    
    c. Under **Implicit grant**, select both **Access tokens** and **ID tokens**.
    
    d. Click **Save**.
    
7. Edit the [Azure Active Directory app manifest](https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-app-manifest) to allow the open authentication used by the app.
    
    a. From the app's **Overview** page, Click the **Manifest** section.
    
    b. Change the attribute *oauth2AllowImplicitFlow* to *true*.
    
    c. Click **Save**.
8. From your app's **Overview** page, copy the value for **Application (client) ID** to the clipboard for use in the next task, Configure the SharePoint app in Connections. 
