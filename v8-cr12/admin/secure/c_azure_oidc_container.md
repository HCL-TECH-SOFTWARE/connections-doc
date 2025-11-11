# Enabling single sign-on with OIDC for Microsoft Azure AD {#c_azure_oidc_container .concept}

Single sign-on is accomplished by setting up a trust relationship between the Connections server and Microsoft Azure Active Directory using the IBM WebSphere OpenID Connect Relying Party Trust Association Interceptor \(OIDC Relying Party TAI\).

For background on OIDC \(OpenID Connect\), you can see these topics in the IBM documentation for WebSphere Application Server:

-   [OpenID Connect overview](https://www.ibm.com/support/knowledgecenter/SSEQTP_8.5.5/com.ibm.websphere.base.doc/ae/csec_oiddesc2.html)
-   [Configuring an OpenID Relying Party](https://www.ibm.com/support/knowledgecenter/en/SSEQTP_8.5.5/com.ibm.websphere.base.doc/ae/tsec_oidrelyconf.html)

Enabling this single sign-on in Connections involves completing three major steps:

-   Adding an app for Connections in Azure
-   Updating WebSphere to support single sign-on with Connections
-   Configuring Connections to support Azure

!!! note 
    
    You will use values from WebSphere TAI when adding the Connections app in Azure. Then use some Azure application values to complete the WebSphere configuration.

-   **[Adding an application in Azure AD for SSO with Connections](../secure/t_azure_add_app.md)**  
Part of setting up single sign-on with OIDC involves registering an application in Microsoft Azure Active Directory.
-   **[Updating WebSphere to support Azure AD OIDC authentication for Connections](../secure/t_azure_oidc_websphere.md)**  
Single sign-on is accomplished by setting up a trust relationship between the Connections server and Microsoft Azure using the WebSphere OpenID Connect Relying Party Trust Association Interceptor \(OIDC Relying Party TAI\). This requires that the WebSphereOIDCRP application is installed on each cluster.
-   **[Configuring Connections to support Azure OIDC single sign-on](../secure/t_azure_config_conn_oidc.md)**  
Update TCL Connections configuration files to add the properties needed to support Microsoft Azure Active Directory OIDC single sign-on.
-   **[Supporting Azure SSO for mobile clients](../secure/t_azure_sso_for_mobile.md)**  
When using Azure SSO, the mobile clients will use token-based authentication to access Connections. Note that it's required that the Connections server endpoints accessed by the clients are configured with a trusted SSL certificate. Untrusted certificates such as self-signed are not supported.

**Parent topic:**[Configuring single sign-on](../secure/c_sec_config_sso.md)

