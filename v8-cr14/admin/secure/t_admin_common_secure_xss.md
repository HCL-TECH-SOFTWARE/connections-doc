# Mitigating a cross site scripting attack {#t_admin_common_secure_xss .task}

If you deem that your network is secure enough to turn off the active content filter, consider using one of the configuration options described in this topic to mitigate an attack should one occur.

If you decide to disable active content filtering in favor of providing maximum flexibility, you must take steps to contain a cross site scripting \(XSS\) attack. For example, your organization might believe that as long as the XSS exposure is limited only to your blog site, the risk is acceptable. If that is the case, consider adopting the following best practices to contain an attack:

**Use isolated domains**
:   Ensure that the component at risk of attack is installed in a completely separate domain. For example, if the Blogs application will allow posting of active content, install it in a separate domain such as: blogs.acme.org. If the Activities application will allow active content, install it in a separate domain such as: activities.acme.org. Also consider using multiple domains for a single application, using a separate domain for the file downloads of the application.

**Disable Access data sources across domains for Internet Explorer**
:   This option disables components from connecting to more than one server to request data without authenticating.

**Do not use single sign-on**
:   To contain any attack, ensure that single-sign-on \(SSO\) authentication is not used to authenticate a user in an application that allows active content. When single sign-on is enabled, a user's cookie can be stored and used to access data in another domain. While it is not recommended that single sign-on be used when a component has turned off active content filtering, it is possible to use single sign-on with HTTP Only Cookies. WebSphere® Application Server version 6.1.0.11 introduced the ability to produce "HTTP Only" cookies for the single sign-on cookies. If this application is used in conjunction with an HTTP-only browser, then the XSS vulnerability can be contained.

**Configure files to be downloaded from a separate domain**
:   Add rewrite rules to the HTTP Server configuration file to force any downloaded files to be recognized by the web browser as content that is independent from the application it was downloaded from, and treat it accordingly. Without downloading in a subdomain with non-shared authentication, there is a vulnerability because other content types can allow execution of content with the hosting domain's credentials. An example of another content type that can get executed in the hosted domain is Adobe® Flash. If Flash Player 9 is used, all hosted Flash will be allowed to call the hosting domain's services and execute XSS attacks. With Flash Player 10, if Content-Disposition: inline is used this vulnerability still exists. Blogs uses this Content-Disposition mode, so for maximum security on Blogs, a separate download domain must be used or Flash must be disabled.

    If you choose to set up a subdomain for file downloads, determine whether or not to enable single sign-on between the subdomain and the domain of the core application:

    -   If you choose to enable single sign-on, configure HTTP-only cookies. To do so, complete the following steps:
        1.  Open the WebSphere Application Server Integrated Solution Console.
        2.  Expand **Security**, and then select **Global security**.
        3.  Click **Custom properties**.
        4.  Click **New** to add a property, and then add the following values to the fields:

            Name
            :   com.ibm.ws.security.addHttpOnlyAttributeToCookies

            Value
            :   true

        5.  Click **Apply**, and then **OK**.
    -   If you choose not to enable single sign-on, users will be asked to re-authenticate when they download a file.

    See [Specifying a separate file download domain](t_admin_act_minimize_xss_risk.md) for information about how to create the subdomain.

!!! note

    **[Specifying a separate file download domain](../secure/t_admin_act_minimize_xss_risk.md)**  
    Files added to the Activities, Blogs, Wikis, Forums, or Files applications could potentially contain malicious code that can exploit the cross-site scripting vulnerabilities of some browsers. You can add rewrite rules to the HCL HTTP Server configuration file to force any downloaded files to be recognized by the web browser as content that is independent from the application from which it was downloaded, and treat it accordingly.

**Parent topic:** [Securing applications from malicious attack](../secure/c_admin_security_xss.md)

**Related information**  


[Displaying files inline](../admin/t_admin_files_enable_inline.md)

[Specifying a separate file download domain](../secure/t_admin_act_minimize_xss_risk.md)

