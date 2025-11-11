# Supporting Azure SSO for mobile clients {#t_azure_sso_for_mobile .concept}

When using Azure SSO, the mobile clients will use token-based authentication to access Connections. Note that it's required that the Connections server endpoints accessed by the clients are configured with a trusted SSL certificate. Untrusted certificates such as self-signed are not supported.

Steps involving both the Connections server and the Azure portal are provided in the following two procedures.

## Procedure for the Connections server {#section_yyb_25x_bpb .section}

1.  Follow the steps in [Changing Mobile configuration property values](https://help.hcltechsw.com/connectionsmobile/admin/overview/t_mobile_change_config_properties.html) to check out the mobile-config.xml file for updates.
2.  Using a text editor, edit the mobile-config.xml file and locate the following section. Ensure that SecuritySettings enabled="true" and that the <AuthType\> element is set to OAuth as shown:

    ```bash
    <!-- SECURITY SETTINGS SECTION -->
    <SecuritySettings enabled="true">
    <!-- Authentication mechanism for the server. One of TAM, SiteMinder, Form, Basic, SPNEGO, OAuth -->
    ```

    ```
    <AuthType>OAuth</AuthType>
    ```

3.  Find the value of provider\_1.authorizeEndpointUrl, which was entered for the OIDC Relying Party provider in Table 1 of [Updating WebSphere to support Azure AD OIDC authentication for Connections](t_azure_oidc_websphere.md). Use this same value and insert it as the value of the <OAuthAuthorizationURL\> element.

    For example:

    ```
    <OAuthAuthorizationURL>https://login.microsoftonline.com/b6c7fc02-7489-8729-a3c2-1af11e623345/oauth2/v2.0/authorize</OAuthAuthorizationURL>
    ```

4.  Find the value of provider\_1.tokenEndpointUrl, which was entered for the OIDC Relying Party provider in Table 1 of [Updating WebSphere to support Azure AD OIDC authentication for Connections](t_azure_oidc_websphere.md). Use this same value and insert it as the value of the <OAuthTokenURL\> element.

    For example:

    ```
    <OAuthTokenURL>https://login.microsoftonline.com/b6c7fc02-7489-8729-a3c2-1af11e623345/oauth2/v2.0/authorize</OAuthTokenURL>
    ```

5.  Find the value of provider\_1.clientId, which was entered for the OIDC Relying Party provider in Table 1 of [Updating WebSphere to support Azure AD OIDC authentication for Connections](t_azure_oidc_websphere.md). Use this same value and insert it as the value of the <OAuthClientId\> element.

    For example:

    ```
    <OAuthClientId>b850bc0a-0893-4cd7-7e22-9738a43c585d</OAuthClientId>
    ```

6.  Find the value of provider\_1.scope, which was entered for the OIDC Relying Party provider in Table 1 of [Updating WebSphere to support Azure AD OIDC authentication for Connections](t_azure_oidc_websphere.md). Use this same value but add the string “offline\_access” to the list of scopes, with a space between the other scopes. Insert this combined string as the value of the <OAuthScopes\> element.

    For example:

    ```
    <OAuthScopes>openid profile email api://b850bc0a-0893-4cd7-7e22-9738a43c585d/default offline_access</OAuthScopes>
    ```

7.  Save mobile-config.xml and follow the steps for checking the file back into WebSphere Application Server.
8.  Perform a full synchronization of the nodes and restart the mobile application using the WebSphere administration console.

## Procedure for the Azure administrator {#section_mzh_wyx_bpb .section}

1.  Log in to the Azure portal at https://portal.azure.com to edit the Connections application that was added previously in [Adding an application in Azure AD for SSO with Connections](t_azure_add_app.md).
2.  Under **Azure Services**, click **App Registrations** and select the app used by Connections.
3.  Under **Manage**, click the **Authentication** tab and select **Add a platform**. Click **Mobile and desktop applications**.
4.  To add support for the Connections desktop plugin applications, under **Custom redirect URIs**, enter the following and then click **Configure**:

    com.ibm.ibmscp://com.ibm.mobile.connections/token

5.  Still on the **Authentication** tab, under **Advanced settings**, enable public client flows for mobile and desktop clients by setting the value to **Yes**.
6.  Save the registration.

**Parent topic:** [Enabling single sign-on with OIDC for Microsoft Azure AD](../secure/c_azure_oidc_container.md)

