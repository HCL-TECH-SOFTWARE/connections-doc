# Enabling Keycloak as SAML Auth provider for Connections {#c_keycloak_saml .concept}

Single sign-on is accomplished by setting up a trust relationship between the Connections server and Keycloak using the IBM WebSphere SAML Assertion Consumer Service (ACS). \(SAML ACS TAI\).

For background on SAML \(OpenID Connect\), you can see these topics in the IBM documentation for WebSphere Application Server:

-   [SAML web single sign-on](https://www.ibm.com/docs/en/was/8.5.5?topic=users-saml-web-single-sign)
-   [Configuring an SAML ACS TAI](https://www.ibm.com/docs/en/was/8.5.5?topic=swss-enabling-your-system-use-saml-web-single-sign-sso-feature)

Enabling Keycloak as an SAML auth Provider for Connections, involves completing 2 major steps:

-   Configuring Keycloak as an SAML Provider for Connections
-   Updating WebSphere to support Keycloak SAML Authentication for Connections


    !!! note
    
        You will use values from the Keycloak configuration when configuring the WebSphere TAI and other WebSphere Global Security configurations.

-   **[Configuring Keycloak as SAML auth Provider for Connections](../secure/t_keycloak_config_conn_saml.md)**  
Configuring Keycloak as the SAML Auth provider for Connections involves a set of configurations that need to be carried out.
[comment]: <> (-   **[Updating WebSphere to support Keycloak SAML Authentication for Connections](../secure/t_keycloak_saml_websphere.md)**)

-   **[Updating WebSphere to support Keycloak SAML Authentication for Connections](../secure/t_keycloak_saml_websphere.md)**
Single sign-on is accomplished by setting up a trust relationship between the Connections server and Keycloak using the WebSphere SAML Asserstion Consuler Service Trust Association Interceptor (SAML ACS TAI).

      


**Parent topic:** [Configuring single sign-on](../secure/c_sec_config_sso.md)
