# Configuring single sign-on 

Set up single sign-on integration between HCL Connections™ and other HCL products and third-party security products.

## How single sign-on works 

HCL Connections uses single sign-on \(SSO\) to secure the transfer of user ID and password information that is used to authenticate with the system. With SSO, users can switch to different applications without needing to authenticate again.

SSO is automatically enabled using WebSphere's built-in Lightweight Third Party Authentication \(LTPA\) when Connections is installed on a single WebSphere® Application Server profile or when different profiles are federated into the same cell.

## Server-to-server authentication 

SSO solutions can inadvertently block back-end server-to-server communication. Connections uses a server-to-server authenticator to prevent internal communication being blocked by your SSO solution. The configuration settings for the authenticator are stored in the customAuthenticator element in the LotusConnections-config.xml file.

-   **[Setting the single sign-on domain name](../secure/t_set_SSO_domain-name.md)**  
Set the single sign-on \(SSO\) domain name for your IBM® WebSphere Application Server environment.
-   **[Enabling single sign-on with OIDC for Microsoft Azure AD](../secure/c_azure_oidc_container.md)**  
Single sign-on is accomplished by setting up a trust relationship between the Connections server and Microsoft Azure Active Directory using the IBM WebSphere OpenID Connect Relying Party Trust Association Interceptor \(OIDC Relying Party TAI\).
-   **[Enabling Keycloak as an OIDC provider for Connections](../secure/c_keycloak_oidc.md)**  
Single sign-on is accomplished by setting up a trust relationship between the Connections server and Keycloak using the IBM WebSphere OpenID Connect Relying Party Trust Association Interceptor (OIDC Relying Party TAI).
-   **[Enabling Keycloak as an SAML Auth provider for Connections](../secure/c_keycloak_saml.md)**  
Single sign-on is accomplished by setting up a trust relationship between the Connections server and Keycloak using the IBM
-   **[Enabling single sign-on for Security Verify Access](../secure/t_secure_with_tam.md)**  
Configure HCL Connections to use single sign-on with Security Verify Access (formerly Security Access Manager).
-   **[Enabling single sign-on for SiteMinder](../secure/t_secure_with_siteminder.md)**  
Configure HCL Connections to use Computer Associates' SiteMinder to implement user authentication and single sign-on \(SSO\).
-   **[Enabling single sign-on for Domino](../secure/t_secure_domino.md)**  
If your organization uses HCL Connections in a Domino® environment, you can enable single sign-on \(SSO\) for easier user authentication.
-   **[Enabling single sign-on for standalone LDAP](../secure/t_setup_standalone_ldap.md)**  
HCL Connections requires a federated repositories configuration, but you can enable Connections applications to perform Single sign-on for a standalone LDAP directory.
-   **[Enabling single sign-on for the Windows desktop](../secure/t_install_kerb_setup_spnego.md)**  
Configure HCL Connections to use SPNEGO for single sign-on \(SSO\). This configuration permits users to sign in to the Microsoft Windows™ desktop and automatically authenticate with Connections.
-   **[Enabling SPNEGO single sign-on for Security Verify Access](../secure/t_secure_with_tam-spnego.md)**  
Configure HCL Connections to use single sign-on with IBM Security Verify Access (formerly Security Access Manager) and SPNEGO.
-   **[Enabling SPNEGO single sign-on for SiteMinder](../secure/t_secure_with_siteminder_SPNEGO.md)**  
Configure HCL Connections to use single sign-on with Computer Associates' SiteMinder and SPNEGO.
-   **[The customAuthenticator element for back-end inter-service communication](../secure/r_custom-authenticator.md)**  
The customAuthenticator element in the LotusConnections-config.xml file defines some key parameters in your single sign-on \(SSO\) solution.

**Parent topic:** [Security](../secure/c_sec_overview.md)
