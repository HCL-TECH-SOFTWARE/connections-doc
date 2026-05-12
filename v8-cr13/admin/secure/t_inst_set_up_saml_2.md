# Configuring SAML redirection services for web SSO {#t_inst_set_up_saml_2 .task}

To gain SAML support for all HCL Connections™ components that are accessed through a browser, set up SAML redirection services to use the default authenticator. This process replaces the web login page for Connections with your SAML Identity Provider \(IdP\) by using a redirect.

Connections provides SAML v2 support in a way to integrate with third parties that might handle authentication through the LTPA mechanism outside of the Connections cell. If you need to integrate SSO traffic that originates from outside of the Connections cell, then the SAML TAI must be configured to allow LTPA also to be used as an authentication mechanism.

This SAML support was tested with the following two SAML Identity Providers \(IdP\):

-   Tivoli Federated Identity Manager - IBM Tivoli Federated Identity Manager 6.2.2, SAML 2.0 IdP only
-   MS-ADFS - Microsoft™ ADFS 2.0, SAML 2.0 IdP only

Review the following table to understand the current level of SAML support in Connections and verify that your requirements can be met. If your requirements are not clearly met, then do not proceed with configuring SAML.

Other features and clients can still use WebSphere LTPA or built-in forms-based authentication. The following applications might not redirect to the SAML IdP and can use built-in login forms that are supplied by the Connections application, WebSphere, or the clients.

-   Mobile web-based
-   Mobile Native Apps
-   Connections Mail
-   WebSphere® Portal integration Desktop, Notes®, and other client application integration and other add-ons
-   HCL Connections Surveys \(added in Connections 6\)
-   Direct access to the FileNet Administration Console outside of the integration to the Connections user interface - common for administrators and developers, but not most users.
-   Direct access to Connections APIs

These additional applications still function, but do not redirect to, or use, your SAML IdP for authentication. When you use any of these noted applications, WebSphere's built-in authentication mechanisms must still be correctly configured and functioning when you use SAML for Connections.

Refer to the following topics in the WebSphere Application Server knowledge center to understand how to enable single sign-on with SAML:

-   [SAML web single sign-on](https://www.ibm.com/docs/was/8.5.5?topic=users-saml-web-single-sign)
-   [Enable your system to use the SAML web single sign-on \(SSO\) feature](https://www.ibm.com/docs/was/8.5.5?topic=swss-enabling-your-system-use-saml-web-single-sign-sso-feature)
-   [Configure single sign-on \(SSO\) partners](https://www.ibm.com/docs/was/8.5.5?topic=sign-configuring-single-sso-partners)

-   **[Configuring SAML for TFIM in WebSphere Application Server](../secure/t_sec_config_saml_for_tfim.md)**  
Configure SAML for IBM Tivoli Federated Identity Manager in IBM WebSphere Application Server by following the simplified steps in this topic.
-   **[Configuring SAML for ADFS in WebSphere Application Server](../secure/t_sec_config_saml_for_adfs.md)**  
Configure SAML for Microsoft Active Directory Federation Services in IBM WebSphere Application Server by following the simplified steps in this topic.
-   **[Installing the WebSphere Default Application](../secure/t_inst_install_was_default_application.md)**  
Install the WebSphere Default Application \(also known as Snoop\) to validate the SAML environment prior to the deployment of HCL Connections on WebSphere.
-   **[Verifying the WebSphere Default Application is protected by SAML](../secure/t_sec_verify_default_application_protected_by_saml.md)**  
Verify that the WebSphere Default Application is protected by SAML and SAML authentication is functioning in your environment
-   **[Enabling single sign-on for SAML 2.0](../secure/t_secure_with_saml2.md)**  
Configure HCL Connections if you want to use the SAML \(Security Assertion Markup Language\) 2.0 Web SSO redirection services support to implement user authentication and single sign-on \(SSO\).
-   **[Disabling SAML to validate fully functioning integration for third party servers](../secure/t_disable_saml.md)**  
HCL Connections can incorporate many services into Social Business Platform. It is necessary to isolate system-wide security features to validate whether third party servers, such as FileNet® servers, can be deployed properly as a fully functional integrated server with Connections prior to enabling the SAML protection.

**Parent topic:** [Authentication with SAML](../secure/t_sec_securing_w_saml.md)

