# Security 

HCL Connections™ provides a flexible security infrastructure that supports an open, easily shareable data model.

Find out what security applications are provided by default in HCL Connections and how to implement further security measures to protect sensitive information.

-   **[Federal Information Processing Standard \(FIPS\) 140-2 Compliance and HCL Connections](../secure/sec_fips.md)**  
In HCL Connections, FIPS compliance is managed through IBM® WebSphere® Application Server.
-   **[Allowing third-party applications access to data via the OAuth2 protocol](../admin/c_admin_common_oauth.md)**  
Allow third-party applications to ask your HCL Connections users for access to their data.
-   **[Configuring single sign-on](../secure/c_sec_config_sso.md)**  
Set up single sign-on integration between HCL Connections and other HCL products and third-party security products.
-   **[Authentication with SAML](../secure/t_sec_securing_w_saml.md)**  
You can use the SAML \(Security Assertion Markup Language\) 2.0 web SSO redirection services support to implement user authentication and single sign-on \(SSO\). To establish your SAML environment, you must consider the following information to ensure that your system is a good candidate.
-   **[Configuring the AJAX proxy](../secure/t_admin_config_ajax_proxy.md)**  
By default, the HCL Connections AJAX proxy is configured to allow cookies, headers or mime types, and all HTTP actions to be exchanged among the Connections applications. If you want to change the traffic that is allowed from non-HCL Connections services, you must explicitly configure it.
-   **[Enabling locked domains](../install/t_post_install_cre11_conn_security_locked.md)**  
Assuming that you have completed the server setup previously described, to enable locked domains in HCL Connections, specify an additional attribute in the LotusConnections-config.xml to ensure that only ConnectionsOpensocial application is mapped to the locked domain host.
-   **[Enabling virus scanning](../secure/t_admin_common_virus_scanning.md)**  
Edit configuration property settings to force the applications that handle uploaded files to scan all files for viruses.
-   **[Forcing traffic to be sent over an encrypted connection](../secure/t_admin_common_forcing_ssl.md)**  
You can configure HCL Connections to force all traffic that passes between a Connections server and a user's web browser to be sent over an encrypted connection.
-   **[Forcing traffic to use TLS 1.2](../secure/t_admin_common_forcing_tls.md)**  
You can configure HCL Connections to force all traffic that passes between a Connections server and a user's web browser to be sent over TLS 1.2 to avoid security vulnerabilities in TLS 1.1 and earlier versions of SSL.
-   **[Configuring HCL Connection to Use TLS v1.3 ](../secure/t_secure_tls_v13_overview.md)**
You can configure HCL Connections™ to force all traffic that passes between a Connections server and a user's web browser to be sent over TLS 1.3 to avoid security vulnerabilities in TLS 1.2 and earlier versions of SSL.
-   **[Forcing users to log in before they can access an application](../secure/t_admin_common_force_authentication.md)**  
Change the access levels of members or groups to require them to provide credentials before they can access an HCL Connections application.
-   **[Securing applications from malicious attack](../secure/c_admin_security_xss.md)**  
HCL Connections provides security measures, such as an active content filter and content upload limits, that you can use to mitigate the risk of malicious attacks. Because these security measures can also limit the flexibility of the applications, you, as the system administrator, must evaluate the security of your network and determine whether or not you need to implement them.
-   **[Restricting domains used by the login page redirect parameter](../secure/sec_restrict_login_page_redirects.md)**  
By default, the HCL Connections default login page allows redirecting to any destination. You can configure Connections to use a whitelist of domains to ensure login navigation to a secure page.

**Parent topic:** [Administering Connections 8.0](../welcome/welcome_admin.md)
