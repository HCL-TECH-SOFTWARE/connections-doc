# Enabling SPNEGO single sign-on for Security Verify Access {#t_secure_with_tam-spnego .task}

Configure HCL Connections to use single sign-on with Security Verify Access (or ISVA, formerly Security Access Manager or ISAM) and SPNEGO.

-   Complete the task described in the [Configuring web browsers to support SPNEGO](t_install_kerb_edit_browsers.md) topic.
-   Ensure that ISVA is installed.
-   This task describes how to enable single sign-on \(SSO\) for ISVA on the Windows™ operating system.
-   Connections supports the WebSphere® cookie-based, lightweight, third-party authentication \(LTPA\) mechanism as an SSO solution for ISVA. Connections does not support other SSO solutions that WebSEAL supports such as WebSphere Trust Association Interceptor \(TAI\), Forms SSO, Cross-domain SSO, or E-community SSO.
-   Connections supports the use of encrypted connections, Transparent Path junctions with ISVA. Connections does not support TCP type junctions or ISVA Standard junctions.
-   Verify that you can access Connections applications from a web browser.
-   Set the IBM® WebSphere Application Server single sign-on domain to the same value as the domain of the ISVA server.



Single sign-on \(SSO\) enables users to log in to an Connections application and switch to other applications within the product without having to authenticate again.

There are several different ways to configure SSO. The Connections DefaultAuthenticator protocol allows your users and Security Verify Access to prove their identities to one another in a secure manner. After users sign in to their Active Directory Windows client systems, they are automatically signed into both Security Verify Access and Connections.

To set up SSO using Security Verify Access with SPNEGO, complete the following steps:

1.  Create a user account for WebSEAL in your Active Directory domain. When creating the user account, ensure that you specify the following options:

    -   The user cannot change the password
    -   The password never expires
    For example, if you create an account for A User, where the Active Directory domain is isamspnego.example.com, the user identity is auser@isamspnego.example.com.

2.  Map a Kerberos principal to an Active Directory user. Map the service principal name to the account that you created in Step 1 by running the ktpass command on the domain controller. Use the ISVA server through which users access Connections as the instance in the service principal name.

    1.  Run the following ktpass command:

        ```
        ktpass –princ SPN -mapuser account\_name -mapOp set –pass account\_password
        ```

        where

        -   `SPN` is the Kerberos service principal name. The host name specified in the SPNshould match the host name of the WebSEAL server. For example, if users contact the WebSEAL server at `diamond.subnet2.example.com` and the WebSEAL server is part of the EXAMPLE.COM Active Directory domain, the Kerberos principal name is `HTTP/diamond.subnet2.example.com@EXAMPLE.COM`.
        -   `account_name` is the account name that you specified in Step 1.
        -   `account_password` is the password associated with the account that you specified in Step 1.
    2.  Modify the Windows service for the WebSEAL instance so that it starts using the new user account that you just created. On the WebSEAL server, complete the following steps:

        1.  Click **Start** \> **Programs** \> **Administrative Tools** \> **Services**.
        2.  Right-click on **Access Manager WebSEAL-default** and select **Properties**.
        3.  Click **Log On** and then click **This account**.
        4.  Enter the details of the user account and password that you created in Step 1.
        5.  Click **OK** to save your changes.
    3.  Grant administrator privileges for the local system to the account that you created in step 1.

3.  Enable SPNEGO for WebSEAL:

    1.  Stop the WebSEAL server.
    2.  Enable SPNEGO over encrypted connections by adding the following lines to the WebSEAL configuration file:


        ```
        [spnego]

        spnego-auth = https

        [authentication-mechanisms]

        auth-challenge-type = spnego

        kerberosv5 = fully\_qualified\_path to the authentication library

        For example: kerberosv5 = TDI\_root\\bin\\stliauthn.dll

        where TDI\_root is the installation directory of Security Verify Access.

4.  Enable TAI authentication as follows:

    1.  In the WebSphere Application Server administrative console, navigate to **Security** \> **Global Security** \> **Custom properties** \> **New**.
    2.  Enter the following name and value pair:

        **Name**
        :   `com.ibm.websphere.security.performTAIForUnprotectedURI`

        **Value**
        :   true

    3.  Click **OK** and then click **Save** to preserve your update.
5.  Restart WebSEAL from the Services Control Panel. On Windows, WebSEAL must be running as a service for SPNEGO authentication to work properly. Otherwise, it runs using the credentials of the logged in user.

6.  Configure form-based authentication with transparent junctions. Complete all the steps in the [Enabling single sign-on for Security Verify Access](t_secure_with_tam-spnego.md) topic except the steps about [updating interService URLs](t_secure_with_tam.md#CmdDoNotCompleteThisStepFor...)

    , adding a Tivoli Allow access to the Embedded Experience gadget, and [adding an authenticator property](t_secure_with_tam.md#AddATivoliAccessManagerCustomAuthe). You need to use the HTTP Server URLs and the DefaultAuthenticator property in this configuration.

    !!! note 
        
        This procedure enables a fallback authentication method for user systems that do not support SPNEGO. This alternative is important for users of Notes®, mobile devices, and other extensions for Connections.

7.  Files and wikis display the log in button in Siteminder and SPNEGO configuration even though the user is logged in. This occurs in public files and wikis pages as the server does not require user authentication for public pages. To solve this issue, you need to disable anonymous for wikis by mapping 'reader' to 'All authenticated in application's realm'. This change needs to be done for all SPNEGO-related configurations and not just Siteminder and SPNEGO configuration. To remove the log in string for both Files and Wikis on SPNEGO configurations, follow these steps:

    -   Log in to the WebSphere Application Server admin console.
    -   Go to **Applications** and click **Applications types**.
    -   Click **Websphere enterprise applications**, then click **Wikis/Files** in the list.
    -   When the page loads, click **User group mapping** in **Security role** pane.
    -   Tick box beside **Everyone**.
    -   Click **Map special subjects** in the drop-down menu, then click **All authenicated in application's realm**.
    -   Click **OK**, then click **Save**.

        !!! note 
            
            These steps need to be completed for Files and Wikis. Once the steps are done, restart the configuration to see the changes.


After users sign in to the Windows desktop, they are automatically signed into Connections.

!!! note 
    
    If you are using on-ramp plug-ins or mobile services, your data traffic is not authenticated by Kerberos tickets or SPNEGO tokens. It is instead authenticated through Java EE form-based authentication.

For more information about Kerberos and SPNEGO, refer to [SPNEGO protocol and Kerberos authentication](https://www.ibm.com/docs/sva/9.0.1?topic=concepts-spnego-protocol-kerberos-authentication) in the IBM Security Verify Access documentation.

**Parent topic:** [Configuring single sign-on](../secure/c_sec_config_sso.md)

