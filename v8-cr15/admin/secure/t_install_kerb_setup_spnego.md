# Enabling single sign-on for the Windows desktop {#t_install_kerb_setup_spnego .task}

Configure HCL Connections™ to use SPNEGO for single sign-on \(SSO\). This configuration permits users to sign in to the Microsoft Windows™ desktop and automatically authenticate with Connections.

Verify that HCL Connections works correctly without the SPNEGO authentication protocol.

Create a user account in the LDAP directory and add it to the WebSphere® Application Server administrators group.

Complete the steps in the [Creating a service principal name and keytab file](t_install_kerb_create_service_account.md) topic.

!!! note 
    
    If you are using on-ramp plug-ins or mobile services, your data traffic is not authenticated by Kerberos tickets or SPNEGO tokens. It is instead authenticated through Java EE form-based authentication.

To configure Connections to use SPNEGO, complete the following tasks:

1.  [Mapping an Active Directory account to administrative roles](../secure/t_kerb_configure_AD_account.md)  
Map an account from Active Directory to administrative roles in IBM® WebSphere Application Server.
2.  [Creating a service principal name and keytab file](../secure/t_install_kerb_create_service_account.md)  
A service account in Microsoft Active Directory needs to be created to support a service principal name \(SPN\) for HCL Connections. A keytab file that the Kerberos authentication service can use to establish trust with the web browser also can be created if Kerberos authentication is desired.
3.  [Creating a redirect page for users without SPNEGO support](../secure/t_install_kerb_create_redirect-page.md)  
Create an HTML page to redirect users whose web browsers do not support SPNEGO.
4.  [Configuring SPNEGO \(and Kerberos optionally\) on WebSphere Application Server](../secure/t_install_kerb_add_spnego_tai_to_was.md)  
Configure SPNEGO and, optionally Kerberos, on IBM® WebSphere Application Server.
5.  [Configuring web browsers to support SPNEGO](../secure/t_install_kerb_edit_browsers.md)  
Configure your web browser to support SPNEGO authentication.

**Parent topic:** [Configuring single sign-on](../secure/c_sec_config_sso.md)

**Related information**  


[HCL Connections system requirements](../plan/r_install_prerqs.md)

