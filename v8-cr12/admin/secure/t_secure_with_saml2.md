# Enabling single sign-on for SAML 2.0 {#t_secure_with_siteminder .task}

Configure HCL Connections™ if you want to use the SAML \(Security Assertion Markup Language\) 2.0 Web SSO redirection services support to implement user authentication and single sign-on \(SSO\).

Complete the following prerequisite conditions:

-   Verify that the Default application \(Snoop\) is protected by SAML 2.0.
-   Ensure that you can access Connections applications from a web browser.
-   Each href attribute in the LotusConnections-config.xml file is case-sensitive and must specify a fully-qualified domain name.

    !!! note 
        
        Lowercase is required for URLs. Many modern browsers will set the domain to lowercase before making a request. For URLs to match with those browsers, lowercase must be used when specifying domain names.


-   The connectionsAdmin J2C alias that you specified during installation must correspond to a valid account that can authenticate with SAML. It may map to a backend administrative user account. This account must be capable of authenticating for single sign-on against SAML. If you need to update the user ID or credentials for this alias, see the [Changing references to administrative credentials](../admin/t_admin_common_changing_admin_passwords.md) topic.

1.  Install Connections, if you have not already done so, with all necessary software components as described in [Installing](../install/c_installing.md).

2.  Using the WebSphere Application server administrative console, navigate to **Global security** \> **Web and SIP security** \> **Trust association** \> **Interceptors** \> **com.ibm.ws.security.web.saml.ACSTrustAssociationInterceptor** and make the following changes:

    1.  Modify the SAML filter for Connections by copying and pasting the following values into the **sso\_1.sp.filter Values** field:

        ```bash
        request-url^=/login|/service/authredirect.jsp;request-url!=forceLogin
        ```

    2.  Create a new property called **sso\_1.sp.enforceTaiCookie** and set its value to false.

3.  Run **Full Resynchronize** for all nodes.

4.  Stop all Connections clusters and then stop the DM.

5.  Restart the DM and then restart all Connections clusters.


**Parent topic:** [Configuring SAML redirection services for web SSO](../secure/t_inst_set_up_saml_2.md)

