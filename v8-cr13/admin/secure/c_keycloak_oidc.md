# Enabling Keycloak as an OIDC provider for Connections {#c_keycloak_oidc .concept}

Single sign-on is accomplished by setting up a trust relationship between the Connections server and Keycloak using the IBM WebSphere OpenID Connect Relying Party Trust Association Interceptor \(OIDC Relying Party TAI\).

For background on OIDC \(OpenID Connect\), you can see these topics in the IBM documentation for WebSphere Application Server:

-   [OpenID Connect overview](https://www.ibm.com/support/knowledgecenter/SSEQTP_8.5.5/com.ibm.websphere.base.doc/ae/csec_oiddesc2.html)
-   [Configuring an OpenID Relying Party](https://www.ibm.com/support/knowledgecenter/en/SSEQTP_8.5.5/com.ibm.websphere.base.doc/ae/tsec_oidrelyconf.html)

Enabling Keycloak as an OIDC Provider for Connections in Connections involves completing three major steps:

-   Configuring Keycloak as an OIDC Provider for Connections
-   Updating WebSphere to support Keycloak OIDC Authentication for Connections
-   Configuring Connections to support Keycloak

!!! note 
    
    You will use values from the Keycloak configuration when configuring the WebSphere TAI and other WebSphere Global Security configurations.

-   **[Configuring Keycloak as an OIDC Provider for Connections](../secure/t_keycloak_config_conn_oidc.md)**  
Configuring Keycloak as the OIDC provider for Connections involves a set of configurations that need to be carried out.
-   **[Updating WebSphere to support Keycloak OIDC Authentication for Connections](../secure/t_keycloak_oidc_websphere_copy.md)**
Single sign-on is accomplished by setting up a trust relationship between the Connections server and Keycloak using the WebSphere OpenID Connect Relying Party Trust Association Interceptor (OIDC Relying Party TAI).
-   **[Configuring Connections to support Keycloak OIDC Authentication](../secure/t_keycloak_config_auth_oidc_Updated.md)** 
Update HCL Connections configuration files to add the properties needed to support Keycloak OIDC authentication.


**Parent topic:** [Configuring single sign-on](../secure/c_sec_config_sso.md)

