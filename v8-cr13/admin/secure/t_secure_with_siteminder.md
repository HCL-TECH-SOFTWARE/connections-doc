# Enabling single sign-on for SiteMinder {#t_secure_with_siteminder .task}

Configure HCL Connections™ to use Computer Associates' SiteMinder to implement user authentication and single sign-on \(SSO\).

Complete the following prerequisite conditions:

-   Ensure that you can access Connections applications from a web browser.
-   Complete the installation and configuration of TAI/ASA. The instructions are included with SiteMinder.
-   Verify that TAI/ASA is registered with WebSphere® Application Server.
-   Each href attribute in the LotusConnections-config.xml file is case-sensitive and must specify a fully-qualified domain name.

-   The connectionsAdmin J2C alias that you specified during installation must correspond to a valid account that can authenticate with SiteMinder. It may map to a back-end administrative user account. This account must be capable of authenticating for single sign-on against SiteMinder. If you need to update the user ID or credentials for this alias, see the [Changing references to administrative credentials](../admin/t_admin_common_changing_admin_passwords.md) topic.
-   For more information about the SiteMinder Policy Server and Web Agent configuration, go to the [CA SiteMinder BookShelf](https://support.ca.com/cadocs/0/CA%20SiteMinder%2012%2051-ENU/Bookshelf.html).
-   For more information about the SiteMinder Agent for WebSphere, see the [CA SiteMinder Agent for WebSphere](https://support.ca.com/cadocs/0/CA%20SiteMinder%20Agent%20for%20WebSphere%20r12%20SP2-ENU/Bookshelf_Files/PDF/SMWebSphereAgent_conf_enu.pdf) guide \(PDF\) and the [CA eTrust SiteMinder Agent for IBM WebSphere Release Notes](https://support.ca.com/cadocs/0/CA%20SiteMinder%20Agent%20for%20WebSphere%20r12%20SP2-ENU/Bookshelf_Files/PDF/SMWebSphereAgent_rel_enu.pdf) \(PDF\). The latest Application Server Agent \(ASA\) at the moment is version 12. CA support confirms that it can be used with SM 12.51.

You need to create SiteMinder Agent and Domain objects with realms, rules, and a policy that is related to HTTP Server and WebSphere Application Server.

When a user requests a page that is protected by SiteMinder, the Web Agent on the HTTP server intercepts the request and prompts the user for authentication. If the user provides valid credentials, the user is authenticated and an SMSESSION cookie is added to the request which is then passed on to the WebSphere Application Server. The SiteMinder Trust Association Interceptor \(TAI\) on the server verifies the information in the cookie and sets the User Principal that Connections requires to identify the user.

This task describes a configuration that uses SiteMinder Policy Server 6.0 SP5, SiteMinder ASA 6.0 Agent for WebSphere Application Server \(with CR00010 hotfix\), and SiteMinder Web Agent v6qmr5-cr035.

To set up SSO using SiteMinder, complete the following steps:

1.  Download and apply the Unrestricted JCE policy files:

    1.  Go to the [J2SE 5 SDK Security information](https://www14.software.ibm.com/webapp/iwm/web/preLogin.do?source=jcesdk) web page.

    2.  Authenticate with your universal HCL user ID and password.

    3.  Download the **Unrestricted JCE Policy files for SDK for all newer versions** package.

    4.  Extract the files from the downloaded package.

    5.  Back up your existing copies \(if any\) of the US\_export\_policy.jar and local\_policy.jar files, located in the [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/java/jre/lib/security directory.

    6.  Copy the new jar files from the extracted package to the same directory, overwriting any existing files.

2.  Create agents on the SiteMinder Policy Server, including a Web Agent for HTTP Server and an Application Server Agent for WebSphere Application Server.

    1.  Open the SiteMinder Administration console.

    2.  Right-click **Agents** and select **Create Agent**.

    3.  Enter details of the **Name** and **Description** of the Web Agent for HTTP Server.

    4.  Repeat these steps for the Application Server Agent.

3.  Create Agent Configuration Objects on the SiteMinder Policy Server. In the SiteMinder Administration Console, open the Agent Conf Objects pane and complete the following steps:

    1.  Configure the Web Agent for HTTP Server:

        1.  Right-click **Apache Default Settings Agent**and select **Duplicate Configuration Object**.
        2.  Enter the **Name** and **description** of the Agent Configuration Object.
        3.  Update the following parameters to match your environment:

            **DefaultAgentName**
            :   Name of the Apache Agent created earlier

            **CookieDomain**
            :   your\_domain

                where your\_domain is your Connections domain. If, for example, the URL is `http://activities.example.com/activities`, your host name is activities.example.com and your domain is example.com. In this example, you would set CookieDomain=example.com. .

            **RequireCookies**
            :   NO

                This parameter configures the Web Agent to support basic authentication but without requiring all API client programs to support cookies.

            **BadCSSChars**
            :   <,\>

                This parameter enables the *Invite colleagues* functionality in Profiles.

            **LogOffUri**
            :   URI

                Configure SiteMinder to recognize only one web address as the logout web address. Uncomment one of the following URIs by removing the number sign \(\#\) character:

                ```
                \#LogOffUri="/activities/service/html/ibm\_security\_logout"

                \#LogOffUri="/blogs/ibm\_security\_logout"

                \#LogOffUri="/communities/communities/ibm\_security\_logout"

                \#LogOffUri="/dogear/ibm\_security\_logout"

                \#LogOffUri="/files/ibm\_security\_logout"

                \#LogOffUri="/forums/ibm\_security\_logout"

                \#LogOffUri="/homepage/web/ibm\_security\_logout"

                \#LogOffUri="/moderation/ibm\_security\_logout"

                \#LogOffUri="/news/ibm\_security\_logout"

                \#LogOffUri="/profiles/ibm\_security\_logout"

                \#LogOffUri="/search/ibm\_security\_logout"

                \#LogOffUri="/wikis/ibm\_security\_logout"
                ```

    2.  Under the System tab, update the **Agent Configuration Object** with the following value: FCCCompatMode - NO

    3.  Configure the Application Server Agent:

        1.  Right-click **Apache Default Settings Agent**and select **Duplicate Configuration Object**.
        2.  Enter the **Name** and **description** of the Agent Configuration Object.
        3.  Update the following parameters to match your environment:

            **DefaultAgentName**
            :   Name of the Apache Agent created earlier

            **CookieDomain**
            :   your\_domain

                where your\_domain is your Connections domain. If, for example, the URL is `http://activities.example.com/activities`, your host name is activities.example.com and your domain is example.com. In this example, you would set CookieDomain=example.com.

            **AssertionAuthResource**
            :   /siteminderassertion

            **AssertbyUserID**
            :   True

        4.  Check whether the **PrevalidateCookie** property exists in the Configuration Values as follows:
            -   If **PrevalidateCookie** does exist, click **Edit** and set it to YES.
            -   If **PrevalidateCookie** does not exist, click **Add**, add a parameter named **PrevalidateCookie**, and set it to YES.
            -   Click **OK** and then click **OK** again to save the parameters.
    
    !!! note

        -   When activated, the LogOffUri parameter clears the SMSESSION cookie and ensures that the user is logged out of all Connections browser sessions.
        -   To add parameters, edit the Agent Configuration Object on the SiteMinder Policy Server. Alternatively, you can edit the LocalConfig.conf file on the HTTP server if the Web Agent is configured to use it.
        -   If you are editing the SiteMinder configuration file directly, you must surround the values of SiteMinder configuration parameters with quotation marks \("\); for example: BadCSSChars="<,\>". If you are changing these parameters within the SiteMinder Policy Server, do not use quotation marks.

4.  Specify your SiteMinder Authentication Scheme configuration:

    1.  Open the SiteMinder Administration Console and navigate to the **Authentication Scheme Properties** dialog box.

    2.  From the **Authentication Scheme type** list, select **HTML Form template**.

    3.  Clear the **Use Relative Target** check box.

    4.  Enter the URL of your Connections HTTP server in the **web Server Name** field.

5.  On the SiteMinder Policy Server, create a domain for the HTTP Server web agent.

6.  Create protected realms under the HTTP Server Web Agent domain:

    1.  Using the Agent Object and Forms Authentication Scheme that you created in Step 3a and Step 4, create SiteMinder realms that are protected by forms authentication.

        See the *Realms that require forms authentication* table for a list of URLs that are protected by forms authentication.

        |Application|Protected URL resource|
        |-----------|----------------------|
        |ConnectionsDefaultRealm|/|
        |Activities|/activities/follow/atomfba|
        |/activities/service/atom2/forms|
        |/activities/service/atom2/communityEvent|
        |/activities/service/download/forms|
        |/activities/service/getnonce/forms|
        |Blogs|/blogs/api\_form|
        |/blogs/atom\_form|
        |/blogs/follow/atomfba|
        |/blogs/roller-ui/blog|
        |/blogs/roller-ui/feed\_form|
        |/blogs/roller-ui/rendering/api\_form|
        |/blogs/roller-ui/rendering/feed\_form|
        |/blogs/roller-ui/BlogsWidgetEventHandler.do|
        |/blogs/services/atom\_form|
        |Bookmarks|/dogear/atom\_fba|
        |Common resources|/connections/opensocial/rest|
        | |/connections/config|
        |Communities|/communities/calendar/atom\_form|
        |/communities/follow/atomfba|
        |/communities/forum/service/atom/forms|
        |/communities/recomm/ajax|
        |/communities/recomm/atom\_form|
        |/communities/service/atom/forms|
        |Files|/files/follow/atomfba|
        |/files/form/cmis/repository|
        |Forums|/forums/atom/forms|
        |/forums/follow/atomfba|
        |Profiles|/profiles/atom/forms|
        |/profiles/atom2/forms|
        |/profiles/follow/atomfba|
        |URL Preview|/connections/opengraph/form/api/oembed|
        |/connections/thumbnail/form/api/imageProxy|
        |Wikis|/wikis/follow/atomfba|

    2.  Using the Agent Object and Forms Authentication Scheme that you created in Step 3a and Step 4, create SiteMinder realms that are protected by basic authentication.

        See the *Realms that require basic authentication* table for a list of URLs that are protected by basic authentication.

        |Application|Protected URL resource|
        |-----------|----------------------|
        |Activities|/activities/follow/atom|
        |/activities/service/download|
        |/activities/service/html/autocompleteactivityname|
        |/activities/service/html/autocompleteentryname|
        |/activities/service/html/autocompletemembers|
        |/activities/service/atom|
        |/activities/service/getnonce|
        |Blogs|/blogs/api|
        |/blogs/atom|
        |/blogs/follow/atom|
        |/blogs/issuecategories|
        |/blogs/roller-ui/feed|
        |/blogs/roller-ui/rendering/api|
        |/blogs/roller-ui/rendering/feed|
        |/blogs/services/atom|
        |Bookmarks|/dogear/api/app|
        |/dogear/api/deleted|
        |/dogear/api/notify|
        |/dogear/atom|
        |Common resources|/connections/opensocial/basic/rest|
        |Communities|/communities/calendar/atom|
        |/communities/calendar/handleEvent|
        |/communities/calendar/ical|
        |/communities/follow/atom|
        |/communities/forum/service/atom|
        |/communities/recomm/atom|
        |/communities/recomm/handleEvent|
        |/communities/service/atom|
        |/communities/service/json|
        |Content Manager|/dm/atom/seedlist|
        |Files|/files/basic/api|
        |/files/basic/cmis|
        |/files/basic/opensocial|
        |/files/follow/atom|
        |Forums|/forums/atom|
        |/forums/follow/atom|
        |Home page|/homepage/atom/search|
        |/homepage/atom/mysearch|
        |Metrics|/metricssc/configsetter|
        |News|/news/atom/service|
        |/news/atom/stories/newsfeed|
        |/news/atom/stories/public|
        |/news/atom/stories/saved|
        |/news/atom/stories/statusupdates|
        |/news/atom/stories/top|
        |/news/atom/watchlist|
        |/news/atomfba/stories/public|
        |Profiles|/profiles/admin/atom|
        |/profiles/atom|
        |/profiles/atom2|
        |/profiles/audio.do|
        |/profiles/follow/atom|
        |/profiles/json|
        |/profiles/photo.do|
        |/profiles/vcard|
        |URL Preview|/connections/opengraph/basic/api/oembed|
        |/connections/thumbnail/basic/api/imageProxy|
        |Wikis|/wikis/basic/api|
        |/wikis/follow/atom|

    3.  Protect login credentials with encryption: Using the **Basic over SSL Template** scheme, create a SiteMinder Authentication Scheme and apply the new Authentication Scheme to all the SiteMinder realms that require basic authentication.

7.  Create Delete and Head actions for the Web Agent. By default, the Web Agent has only the Get, Post, and Put actions available. To add the Delete and Head actions, complete the following steps:

    1.  In the SiteMinder Administration Console, click **View** and select **Agent Types**.

    2.  Select **Agent Types** in the Systems pane.

    3.  Double-click **Web Agent** in the Agent Type list.

    4.  In the Agent Type Properties dialog box, click **Create**.

    5.  Enter Delete in the New Agent Action dialog box and click **OK**.

    6.  Enter Head in the New Agent Action dialog box and click **OK**.

    7.  Click **OK** again to save the new action.

8.  Create the following rules for each realm:

    |GetPostPutDelHead rule|OnAuthAccept rule|
    |----------------------|-----------------|
    |Realm: CurrentRealm|Realm: CurrentRealm|
    |Resource: \* \(not /\*\)|Resource: \* \(not /\*\)|
    |Action: Web Agent actions -\> Get,Post,Put,Delete,Head|Action: Authentication events -\> OnAuthAccept|
    |When this Rule fires: Allow Access|When this Rule fires: Allow Access|
    |Enable or Disable this Rule: Enabled|Enable or Disable this Rule: Enabled|

9.  Create a policy and add the users who will be able to access the server to the policy. You can allow all users in the LDAP directory or a subset of users; for example: an LDAP branch, individual users, or groups of users.

10. Add the new rules to the new policy.

11. Specify realms that are not protected by SiteMinder.

    !!! note 
        
        You must configure notification templates and some Atom feeds as unprotected URLs. The Blogs footer page must also be unprotected because Blogs uses the Velocity template to extract footer pages.

    |Application|Unprotected URL resource|
    |-----------|------------------------|
    |Activities|/activities\_content|
    |/activities/auth|
    |/activities/images|
    |/activities/oauth|
    |/activities/service/html/images|
    |/activities/service/html/mainpage|
    |/activities/service/html/styles|
    |/activities/service/html/themes|
    |/activities/service/html/servermetrics|
    |/activities/service/html/serverstats|
    |/activities/serviceconfigs|
    |/activities/static/|
    |App Registry|/appreg|
    |/appregistry|
    |Blogs|/blogs/oauth|
    |/blogs/serviceconfigs|
    |/blogs/static/|
    |Bookmarks|/dogear/oauth|
    |/dogear/peoplelike|
    |/dogear/serviceconfigs|
    |/dogear/static/|
    |Common resources|/connections/bookmarklet/tools/blet.js|
    |/connections/bookmarklet/tools/discussThis.js|
    |/connections/bookmarklet/tools/rlet.js|
    |/connections/core/oauth|
    |/connections/oauth|
    |/connections/resources/ic|
    |/connections/resources/socmail-client|
    |/connections/resources/socpim|
    |/connections/resources/web|
    |/connections/rte|
    |/nav/common|
    |Communities|/communities/calendar/Calendar.xml|
    |/communities/calendar/oauth|
    |/communities/comm.widget|
    |/communities/images|
    |/communities/nav|
    |/communities/recomm/oauth|
    |/communities/recomm/Recomm.xml|
    |/communities/resourceStrings.do|
    |/communities/service/atom/oauth|
    |/communities/service/html/communityview|
    |/communities/service/html/community/autoCompleteMembers.do|
    |/communities/service/html/singleas|
    |/communities/service/json/oauth/|
    |/communities/service/opensocial/oauth|
    |/communities/serviceconfigs|
    |/communities/static/|
    |/communities/stylesheet|
    |/communities/tools/embedAS.html|
    |/communities/widgets|
    |Content Manager|/wsi|
    |/acce|
    |/dm|
    |Files|/files/app|
    |/files/basic/anonymous/api|
    |/files/basic/anonymous/cmis|
    |/files/basic/anonymous/opensocial|
    |/downloadfiles|
    |/files\_content|
    |/files/form/anonymous/api|
    |/files/form/anonymous/cmis|
    |/files/form/anonymous/opensocial|
    |/files/oauth|
    |/files/serviceconfigs|
    |/files/static|
    |Forums|/forums/oauth|
    |/forums/serviceconfigs|
    |/forums/static/|
    |Home page|/homepage/oauth|
    |/homepage/search|
    |/homepage/serviceconfigs|
    |/homepage/static/|
    |/homepage/web/updates/|
    |Libraries|/library\_content\_cache|
    |Mobile|/mobile\_content|
    |Moderation|/moderation/app|
    |/moderation/oauth|
    |/moderation/static|
    |News|/help|
    |/news/common/sand/static/|
    |/news/follow/oauth|
    |/news/microblogging/isPermitted.action|
    |/news/oauth|
    |/news/serviceconfigs|
    |/news/sharebox/config.action|
    |/news/static/|
    |OAuth Provider|/oauth2|
    |Orient Me|/community-suggestions|
    |Profiles|/profiles/atom/forms/connections.do|
    |/profiles/images|
    |/profiles/oauth|
    |/profiles/serviceconfigs|
    |/profiles/static/|
    |/profiles/widget-catalog|
    |Search|/search/atom/search|
    |/search/oauth|
    |/search/static/|
    |URL Preview|/connections/opengraph/form/anonymous/api/oembed|
    |/connections/opengraph/basic/anonymous/api/oembed|
    |/connections/opengraph/oauth/anonymous/api/oembed|
    |/connections/thumbnail/api/imageProxy|
    |Widget container|/connections/opensocial/anonymous/rest|
    |/connections/opensocial/common|
    |/connections/opensocial/gadgets|
    |/connections/opensocial/ic|
    |/connections/opensocial/oauth|
    |/connections/opensocial/rpc|
    |/connections/opensocial/social|
    |/connections/opensocial/xrds|
    |/connections/opensocial/xpc|
    |Wikis|/wikis/basic/anonymous/api|
    |/wikis\_content|
    |/wikis/form/anonymous/api|
    |/wikis/home|
    |/wikis/js|
    |/wikis/oauth|
    |/wikis/static/|

12. Map the **Reader** role in the Activities and Wikis applications **All Authenticated in Application's Realm**.

    See [Roles](../admin/r_admin_common_user_roles.md).

13. On the SiteMinder Policy Server, create a domain for the Application Server Agent.

14. Add the following realm to the new WebSphere Application Server domain:

    |Realm name|Protected resource|
    |----------|------------------|
    |SM TAI Validation|/siteminderassertion|

    !!! note 
        
        You must configure the Protected Resource of this realm to match the AssertionAuthResource parameter that you configured earlier for the Application Server Agent.

        Make sure that SM TAI honors SM session-based cookies and the triggered LTPA cookies to be generated by WAS.

15. Set the timeout value of the session for each realm.

    1.  In the SiteMinder Policy Server, open the **Realm Dialog** and click **Session**.

    2.  In the Session Timeouts Group Box, enter timeouts for each realm. Enter the following values, if they are not already present:

        **Maximum Timeout Enabled**
        :   2 Hours 0 Minutes

        **Idle Timeout Enabled**
        :   1 Hours 0 Minutes

    !!! note
        
        The maximum timeout and the idle timeout must be longer than the LTPA token timeout, which is defined in WebSphere Application Server. The LTPA token timeout is set to 120 minutes by default.

16. Install the Web Agent on HTTP Server:

    1.  Download the latest version of the Web Agent from the [CA website](http://www.ca.com).

    2.  Install the Web Agent. For instructions, go to the [SiteMinder BookShelf](https://support.ca.com/cadocs/0/CA%20SiteMinder%2012%2051-ENU/Bookshelf.html).

    3.  When you are prompted for the Agent Configuration details, specify the Agent Configuration Object that you created earlier.

17. Install the Application Server Agent on your WebSphere nodes:

    1.  Download the latest version of the Application Server Agent from the [CA website](http://www.ca.com).

    2.  Install the Application Server Agent on each node in your Connections deployment. For instructions, see the [SiteMinder Agent for WebSphere Agent Guide](https://support.ca.com/cadocs/0/CA%20SiteMinder%20Agent%20for%20WebSphere%20r12%20SP2-ENU/Bookshelf_Files/PDF/SMWebSphereAgent_conf_enu.pdf).

    3.  When you are prompted for the Agent Configuration details, specify the Agent Configuration Object that you created earlier.

18. Copy the smagent.properties file from the ASA installation conf folder to the WebSphere Application Server profile properties folder; for example: C:\\program files\\IBM\\websphere\\appserver\\profiles\\appsvr01\\properties.

19. Configure Trust Association Interceptor on WebSphere Application Server.

    1.  From the administrative console for WebSphere Application Server, click **Security** \> **Global security**.

    2.  Under Web and SIP security, click **Trust association**.

    3.  Click **Enable Trust Association** and then click **Save**.

    4.  Click **Interceptors**.

    5.  Delete any unused interceptors.

        !!! note 
            
            Do not delete the OAuth interceptor.

    6.  Click **New** and enter the following name for the new interceptor:

        com.netegrity.siteminder.websphere.auth.SmTrustAssociationInterceptor

    7.  Add the following custom property under **Global Security** \> **Custom properties**: `com.ibm.websphere.security.performTAIForUnprotectedURI=true`.

    8.  Click **OK** and then click **Save**.

        !!! note 
            
            Connections servers should be protected by both SM TAI and OAuth TAI. This is important for supporting the EE and Activities Stream features.

    9.  Restart WebSphere Application Server.

20. Create rewrite rules that redirect URLs when users log out of Connections. Add the following rules to the httpd.conf file:

    ```
    RewriteEngine On

    RewriteCond %\{REQUEST\_URI\} /\(.\*\)/ibm\_security\_logout\(.\*\)

    RewriteCond %\{QUERY\_STRING\} !=logoutExitPage=your\_logout\_url

    RewriteRule /\(.\*\)/ibm\_security\_logout\(.\*\)

    LogOffUri?logoutExitPage=your\_logout\_url \[noescape,L,R\]
    ```

    where LogOffUri is the URL that you uncommented earlier. After logging out of Connections, the user's browser is directed to your\_logout\_url. This URL could be your corporate home page or the SiteMinder login page.

    !!! note 
        
        You must add these rules to both the HTTP and HTTPS entries.

    The following example illustrates a typical portion of the httpd.conf file after you have implemented this step:

    ```bash
    RewriteEngine on
    RewriteCond %{REQUEST_URI} /(.*)/ibm_security_logout(.*)
    RewriteCond %{QUERY_STRING} !=logoutExitPage=http://corphome.example.com
    RewriteRule /(.*)/ibm_security_logout(.*)  /homepage/web/ibm_security_logout?logoutExitPage=http://corphome.example.com [noescape,L,R]
    
    
    RewriteCond %{REQUEST_URI} !^/blogs/roller-ui/rendering/(.*)
    RewriteRule ^/blogs/(.*)/feed/blogs/atom(.*) /blogs/roller-ui/rendering/feed/$1/blogs/atom/ [R,L]
    
    #Connections Config for SSL
    LoadModule ibm_ssl_module modules/mod_ibm_ssl.so
    <IfModule mod_ibm_ssl.c>
    Listen 0.0.0.0:443
    <VirtualHost *:443>
    ServerName connections.example.com
    SSLEnable
    RewriteEngine on
    RewriteCond %{REQUEST_URI} /(.*)/ibm_security_logout(.*)
    RewriteCond %{QUERY_STRING} !=logoutExitPage=http://corphome.example.com
    RewriteRule /(.*)/ibm_security_logout(.*) /homepage/web/ibm_security_logout?logoutExitPage=http://corphome.example.com [noescape,L,R]
    
    
    RewriteCond %{REQUEST_URI} !^/blogs/roller-ui/rendering/(.*)
    RewriteRule ^/blogs/(.*)/feed/blogs/atom(.*) /blogs/roller-ui/rendering/feed/$1/blogs/atom/ [R,L]
    
    </VirtualHost>
    </IfModule>
    SSLDisable
    ```

    !!! note 
        
        Uncomment the `LoadModule rewrite_module modules/mod_rewrite.so` line in the httpd.conf file. This line is commented out by default. When the line is commented out, the web server will not start.

21. Save and close the httpd.conf file, restart the HTTP server, and then make sure the SiteMinder page displays when users access the http server.

22. Add a SiteMinder authenticator property to the Connections configuration by editing the LotusConnections-config.xml file.

    1.  Use the following command to check out the configuration file:

        -   execfile\("app\_server\_root/profiles/DMGR/bin/connectionsConfig.py"\)

            !!! note 
                
                If you are prompted to specify which server to connect to, enter 1.

            `LCConfigService.checkOutConfig\("working\_directory","cell\_name"\)`

        where:

        -   [app\_server\_root](../plan/i_ovr_r_directory_conventions.md) is the WebSphere Application Server installation directory
        -   DMGR is the name of the Deployment Manager profile. For example: Dmgr01
        -   `working_directory` is the temporary working directory to which the configuration XML and XSD files are copied while you edit them. Use forward slashes to separate directories in the file path, even if you are using the Microsoft Windows operating system.
        -   `cell_name` is the name of the WebSphere Application Server cell hosting the Connections application. This argument is case sensitive. If you do not know the cell name, execute the following command in the wsadmin client to determine it:
            
            `print AdminControl.getCell\(\)`

        For example:

        `LCConfigService.checkOutConfig\("c:/temp","foo01Cell01"\)`

    2.  Update the custom authenticator values by running the following commands:

        1.  Configure the custom authenticator to support server-to-server authentication for SiteMinder:
            ```
            LCConfigService.updateConfig\("customAuthenticator.name",

            "SiteMinderAuthenticator"\)
            ```

        2.  Set the value of the custom.authenticator.cookieTimeout parameter to be equal to or less than the maximum timeout and idle timeout values that you configured earlier. Specify the timeout value in minutes.

            `LCConfigService.updateConfig\("customAuthenticator.CookieTimeout","timeout"\)`

            where timeout is a value in minutes that is less than or equal to the SiteMinder timeout values.

        !!! note 
            
            When your production environment is ready, set the `AllowSelfSignedCerts` parameter to false.


    3.  Check the LotusConnections-config.xml file back in by running the following command:

        `LCConfigService.checkInConfig\(\)`

23. Restart your Connections deployment.

    1.  Stop Connections servers, node agents, and deployment manager.

    2.  Start the deployment manager and nodes.

    3.  Allow time for the nodes to synchronize, and for the updated LotusConnections-config.xml file to be copied to each node.

    4.  Start Connections.


Advise your users to close all browser windows when they log out of Activities. This precaution avoids potential security problems that could arise because the SiteMinder session cookie in a browser window might still be updating while a user is logging out from a different browser window.

**Parent topic:** [Configuring single sign-on](../secure/c_sec_config_sso.md)

**Related information**  


[Changing references to administrative credentials](../admin/t_admin_common_changing_admin_passwords.md)

[Enabling single sign-on for standalone LDAP](../secure/t_setup_standalone_ldap.md)

[Configuring the AJAX proxy](../secure/t_admin_config_ajax_proxy.md)

