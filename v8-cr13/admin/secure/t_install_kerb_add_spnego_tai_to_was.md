# Configuring SPNEGO \(and Kerberos optionally\) on WebSphere Application Server {#t_install_kerb_add_spnego_tai_to_was .task}

Configure SPNEGO and, optionally Kerberos, on IBM® WebSphere® Application Server.

The connectionsAdmin J2C alias that you specified during installation must correspond to a valid account that can authenticate with Active Directory. The alias must map to an administrative user account that can authenticate for single sign-on with Active Directory. If you update the user ID or credentials for this alias, complete the steps in the [Changing references to administrative credentials](../admin/t_admin_common_changing_admin_passwords.md) topic.

Your WebSphere Application Server administrative account must be a valid account that can authenticate with Active Directory. User accounts that are specified only in the WebSphere Internal File Repository cannot check out configuration documents. Nor can such accounts connect to any of the LC MBeans to run commands.

!!! tip

    The Kerberos authentication protocol \(optional\) uses strong cryptography that enables a client to prove its identity to a server across an insecure network connection. After the client and server have proven their identity, the authentication protocol encrypts all data that the client and server exchange. The SPNEGO tokens, which wrap valid Kerberos tickets, can be used to negotiate the security for SSO. For information about best practices for Service Principal Names and SPNEGO configuration, go to [Tips on using Kerberos service principal names](http://www.ibm.com/developerworks/websphere/library/techarticles/0809_lansche/0809_lansche.html). The topic also provides tips for multitier environments. For more information about setting up SPNEGO web authentication for WebSphere Application Server, refer to [WebSphere with a side of SPNEGO](http://www-03.ibm.com/support/techdocs/atsmastr.nsf/WebIndex/WP101065).

!!! note 
    
    Enabling Kerberos using the **Kerberos and LTPA** option is required only if you are using Connections Mail with a Microsoft™ Exchange backend.

To configure SPNEGO and Kerberos on WebSphere Application Server, complete the following steps:

1.  Log on to the WebSphere Application Server Integrated Solutions Console on the Deployment Manager and select **Security** \> **Global Security**.

2.  Perform the following steps only if you want to enable Kerberos.

    1.  Click **Kerberos configuration** in the **Authentication** area, and then specify the following details:

        **Kerberos service name**
        :   HTTP

        **Kerberos configuration file**
        :   Full path to your Kerberos configuration file

        **Kerberos keytab file name**
        :   Full path to your keytab file

        **Kerberos realm name**
        :   Name of your Kerberos realm

        **Trim Kerberos realm from principal name**
        :   Select this option if it is not selected.

        **Enable delegation of Kerberos credentials**
        :   Select this option if it is not selected.

            !!! note 
                
                Enable this option only if you are using Connections Mail with an Exchange backend; otherwise this setting should not be selected.

    2.  Click **OK** and then click **Save**.
    3.  Click **Kerberos configuration** and then in the **Related Configuration** area, click **SPNEGO Web authentication**.

        !!! note 
            
            SPNEGO Web authentication and Kerberos authentication use the same Kerberos client configuration and keytab files.

3.  Click **SPNEGO Web authentication** and then specify the SPNEGO filter as follows:

    1.  In the SPNEGO Filters area, click **New** and enter the following details:

        !!! note 
            
            Connections Mobile for iOS devices supports Kerberos for authentication. If your deployment only includes mobile iOS devices, and does not include mobile Android devices, remove the first instance of **request-url!=/mobile** from the filter criteria.

        **Host name**
        :   Enter the URI for how the HCL Connections™ environment is accessed. Typically, it is the hostname/alias of the HTTP server.

        **Kerberos realm name**
        :   Enter your Kerberos realm name. Only required if Kerberos is enabled.

        **Filter criteria**
        :   `request-url!=noSPNEGO;request-url!=/mobile;request-url!=/nav;request-url!=/bundles/js;request-url!=/static;request-url!=/activities/oauth;request-url!=/blogs/oauth;request-url!=/dogear/oauth;request-url!=/communities/calendar/oauth;request-url!=/communities/service/atom/oauth;request-url!=/communities/service/opensocial/oauth/;request-url!=/communities/recomm/oauth;request-url!=/connections/opensocial/oauth;request-url!=/connections/opensocial/anonymous/rest;request-url!=/connections/opensocial/common;request-url!=/connections/opensocial/gadgets;request-url!=/connections/opensocial/ic;request-url!=/connections/opensocial/rpc;request-url!=/connections/opensocial/social;request-url!=/connections/opensocial/xrds;request-url!=/connections/opensocial/xpc;request-url!=/connections/resources/web;request-url!=/connections/resources/ic;request-url!=/files/oauth;request-url!=/forums/oauth;request-url!=/homepage/oauth;request-url!=/metrics/service/oauth;request-url!=/moderation/oauth;request-url!=/news/oauth;request-url!=/news/follow/oauth;request-url!=/profiles/oauth;request-url!=/wikis/oauth;request-url!=/search/oauth;request-url!=/connections/core/oauth/;request-url!=/connections/oauth/authorize;request-url!=/resources;request-url!=/oauth2/endpoint/;request-url!=/activities\_content;request-url!=/files\_content;request-url!=/library\_content\_cache;request-url!=/mobile\_content;request-url!=/wikis\_content`

            !!! note 
                
                Ensure that you separate each filter with a semicolon \(;\). No other character is allowed as a separator.

        **Filter class**
        :   Leave this field blank to allow the system to use the default filter class \(**com.ibm.ws.security.spnego.HTTPHeaderFilter**\).

        **SPNEGO not supported error page URL**
        :   Enter the URL to the redirect page that you created. For example: http://webserver/NoSpnegoRedirect.html.

            where webserver is the name of your HTTP Server instance and NoSpnegoRedirect.html is the name of the redirect page.

        **NTLM token received error page URL**
        :   Enter the URL to the redirect page that you created. For example: http://webserver/NoSpnegoRedirect.html.

    2.  Select **Trim Kerberos realm from principal name**.

    3.  Select **Enable delegation of Kerberos credentials**.

    4.  Click **OK** and then click **Save**.

4.  On the SPNEGO Web authentication page, complete the following steps:

    1.  Select **Dynamically update SPNEGO**.

    2.  Select **Enable SPNEGO**.

    3.  Select **Allow fall back to application authentication mechanism**.

    4.  Enter the path to the Kerberos configuration file in the **Kerberos configuration file with full path** field. You created this file in the [Creating a service principal name and keytab file](t_install_kerb_create_service_account.md) topic.

    5.  Enter the path to the Kerberos keytab file in the **Kerberos keytab file name with full path** field. You created this file in the [Creating a service principal name and keytab file](t_install_kerb_create_service_account.md) topic.

    6.  Click **Apply**.

5.  Specify the level of authentication that users must go through to access your Connections deployment. In the following choices, you can force users to always authenticate or allow users to access Blogs, Bookmarks, Communities, Files, Profiles, and Wikis anonymously. These anonymous users must log in only if they try to access a private area. For more information about forcing authentication, see the [Forcing users to log in before they can access an application](t_admin_common_force_authentication.md) topic.

    -   \(default\) Allow anonymous access to Connections:
        1.  Select **Applications** \> **Application Types** \> **WebSphere enterprise applications**.
        2.  Click the link to the first Connections application in the Enterprise Applications table.
        3.  In the Detail Properties area, click **Security role to user/group mapping**.
        4.  Select the **reader** Role, click **Map Special Subjects**, and select **Everyone**.
        5.  Click **OK** and then click **Save**.
        6.  Repeat steps b through e for the remaining Connections applications in the Enterprise Applications table.
    -   Force users to log in to access HCL Connections:
        1.  Select **Applications** \> **Application Types** \> **WebSphere enterprise applications**.
        2.  Click the link to the first Connections application in the Enterprise Applications table.
        3.  In the Detail Properties area, click **Security role to user/group mapping**.
        4.  Select the **reader** Role, then click **Map Special Subjects** and select **All Authenticated in Application's Realm**.
        5.  Click **OK** and then click **Save**.
        6.  Repeat steps b through e for the remaining Connections applications in the Enterprise Applications table.
6.  Disable TAI authentication unless you are configuring Tivoli® Access Manager or Siteminder with SPNEGO, in which case TAI authentication should be enabled

    -   To disable TAI authentication if you are not configuring Tivoli Access Manager or Siteminder with SPNEGO, select **Security** \> **Global Security** \> **Custom properties** \> **New**, and then enter the following name and value pair:

        **Name**
        :   `com.ibm.websphere.security.performTAIForUnprotectedURI`

        **Value**
        :   false

    -   To enable TAI authentication if configuring Tivoli Access Manager or Siteminder with SPNEGO, select **Security** \> **Global Security** \> **Custom properties** \> **New**, and then enter the following name and value pair:

        **Name**
        :   `com.ibm.websphere.security.performTAIForUnprotectedURI`

        **Value**
        :   true

    -   Click **OK** and then click **Save** to preserve your update.
7.  Click **Global Security**. In the **Authentication** area, click **LTPA** if you have not configured Kerberos, and then click **Save**.

    !!! note 
        
        The **Kerberos and LTPA** option is required only if you are using Connections Mail with an Exchange backend.

8.  Synchronize all the nodes in your deployment.

9.  Stop and restart WebSphere Application Server:

    1.  Stop all instances of WebSphere Application Server that host your Connections applications.

    2.  Stop all node agents.

    3.  Restart the Deployment Manager.

    4.  Restart all the node agents.

    5.  Restart all instances of WebSphere Application Server.


**Parent topic:** [Enabling single sign-on for the Windows desktop](../secure/t_install_kerb_setup_spnego.md)

**Previous topic:** [Creating a redirect page for users without SPNEGO support](../secure/t_install_kerb_create_redirect-page.md)

**Next topic:** [Configuring web browsers to support SPNEGO](../secure/t_install_kerb_edit_browsers.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Changing common configuration property values](../admin/t_admin_common_changing_config.md)

[Enabling the AJAX proxy to forward user credentials](../secure/t_admin_proxy_ltpa_token.md)

[Forcing users to log in before they can access an application](../secure/t_admin_common_force_authentication.md)

[Installing and enabling OAuth TAI](../admin/t_inst_installingandenablingoauthtai.md)

[Creating a Kerberos configuration file](http://www.ibm.com/support/knowledgecenter/SSAW57_7.0.0/com.ibm.websphere.nd.doc/info/ae/ae/tsec_kerb_create_conf.html)

