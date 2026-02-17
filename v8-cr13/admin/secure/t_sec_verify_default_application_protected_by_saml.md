# Verifying the WebSphere Default Application is protected by SAML {#t_sec_verify_default_application_protected_by_saml .task}

Verify that the WebSphere® Default Application is protected by SAML and SAML authentication is functioning in your environment

1.  Protect Snoop with SAML as follows:

    1.  From the WebSphere Application Server Integrated Solutions Console, navigate to **Security** \> **Global security** \> **Trust association** \> **Interceptors** \> **com.ibm.ws.security.web.saml.ACSTrustAssociationInterceptor**.
    2.  Under **Custom properties**, create the property **sso\_1.sp.filter** and give it the value request-url^=/snoop
    For more information about configuring the SAML TAI, refer to [Enabling your system to use the SAML web single sign-on \(SSO\) feature](http://www-01.ibm.com/support/knowledgecenter/SSEQTP_8.0.0/com.ibm.websphere.base.doc/info/aes/ae/twbs_enablesamlsso.html?cp=SSEQTP_8.0.0%2F1-8-32-2-16-1).

2.  Run **Full Resynchronize** for all nodes, and then stop all servers and the Dmgr.

3.  Restart the Dmgr, the Node agent, and the server associated with the Default Application.

4.  Ensure the system clocks on all systems are synchronized, especially that of the IdP server and the SP server.

5.  Verify that Snoop is now protected by SAML. From the browser, enter https://websphere.example.com\[:port\]/snoop.

    You are requested to accept the web-server signed certificate.

6.  Accept the web-server signed certificate, and when prompted to enter a valid username/password, enter the Connections administrator username/password.

    The Snoop **Servlet - Request/Client Information** form displays.

7.  Continue to enable SAML protection for HCL Connections™ by completing [Enabling single sign-on for SAML 2.0](t_secure_with_saml2.md).


**Parent topic:** [Configuring SAML redirection services for web SSO](../secure/t_inst_set_up_saml_2.md)

