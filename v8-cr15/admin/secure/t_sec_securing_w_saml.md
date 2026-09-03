# Authentication with SAML {#reference_kvl_1ng_cw .reference}

You can use the SAML \(Security Assertion Markup Language\) 2.0 web SSO redirection services support to implement user authentication and single sign-on \(SSO\). To establish your SAML environment, you must consider the following information to ensure that your system is a good candidate.

## Requirements { .section}

-   You must configure WebSphere Application Server to work with SAML using the default application \(Snoop\).
-   Your SAML Identify Provider \(IdP\) must conform to the requirements of your WebSphere Application Server, such as ADFS or Tivoli Federated Identity Manager.
-   The following components do not authenticate with SAML. They use other services.
    -   Mobile Native Apps
    -   Connections Mail
    -   WebSphere Portal
    -   HCL Forms
-   Since some components use other built-in authentication in WebSphere Application Server, such as basic authentication or LTPA, and this method for SAML support is only provided for web SSO, authentication must be possible directly through WebSphere Application Server as well. WebSphere Application Server must be configured to a directory for authentication and that directory must contain the user names and password of the user for authentication directly from WebSphere Application Server to your directory.

-   **[Configuring SAML redirection services for web SSO](../secure/t_inst_set_up_saml_2.md)**  
To gain SAML support for all HCL Connections™ components that are accessed through a browser, set up SAML redirection services to use the default authenticator. This process replaces the web login page for Connections with your SAML Identity Provider \(IdP\) by using a redirect.

**Parent topic:** [Security](../secure/c_sec_overview.md)

