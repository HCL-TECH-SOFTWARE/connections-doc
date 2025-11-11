# Specifying a separate file download domain {#t_admin_act_minimize_xss_risk .task}

Files added to the Activities, Blogs, Wikis, Forums, or Files applications could potentially contain malicious code that can exploit the cross-site scripting vulnerabilities of some browsers. You can add rewrite rules to the HCL HTTP Server configuration file to force any downloaded files to be recognized by the web browser as content that is independent from the application from which it was downloaded, and treat it accordingly.

Most web browsers have security applications that prevent scripts which originate from one domain from accessing information in a browser session in another domain. This security application is loosely called the same origin policy. A domain is made up of a protocol \(such as HTTP\) and the domain \(host name\) that the page is loaded from. You can implement the following procedure to force files downloaded from Activities, Blogs, Files, or Forums to be identified as coming from a different domain than the application's web browser session.

!!! note 
    
    When Siteminder is configured, the cookie domain is determined by the Siteminder CookieDomain configuration, which defines a single, fixed domain in HCL HTTP Server. This means without additional effort, downloads must share single sign-on with the application if Siteminder is used. See[Mitigating a cross site scripting attack](t_admin_common_secure_xss.md) for more information about this risk.

1.  Register a new DNS domain alias for downloads from the Activities, Blogs, or Files sites, which points to the Activities, Blogs, Files, or Forums domain respectively. For example, if your server domain name for Activities is `activities.example.com`, you could name the alias `activities-downloads.example.com` and have it point to the same IP address as activities.example.com does.

2.  You might need a secondary certificate for the download domain. If so, get the certificate and configure it for use through the virtual host options. See the HCL HTTP Server documentation for more information.

3.  Open the httpd.conf file, which is the configuration file for HCL HTTP Server, in a text editor. By default, the file is stored in the following directory:

    -   Linux®: /opt/IBM/HTTPServer/conf
    -   Microsoft® Windows®: `C:\IBM\HTTPServer\conf`
4.  Enable the rewrite module. If the following line of text is commented out, uncomment it. If the statement is not present, add it.

    ```
    LoadModule rewrite_module modules/mod_rewrite.so
    ```

5.  Edit the configuration to indicate that the download domain allows download and login actions only and forbids all other actions. To do so, add the following block of text to the non-encrypted connection, virtual host section of the configuration file:

    -   Activities:

        ```bash
        RewriteEngine On
        
        RewriteCond %{SERVER_NAME} !activities-downloads.example.com$ [NC]
        RewriteCond $1 !.*activitiesExtendedDescription.*$ [NC]
        RewriteRule ^/activities/service/download/(.+)$ http://activities-downloads.example.com/activities/service/download/$1 [L]
        
        RewriteCond %{SERVER_NAME} ^activities-downloads.example.com$ [NC]
        RewriteCond %{REQUEST_METHOD} !^(GET|HEAD)$ [NC]
        RewriteCond %{REQUEST_URI} !^/activities/auth/j_security_check$
        RewriteRule .* - [F]
        
        RewriteCond %{SERVER_NAME} ^activities-downloads.example.com$ [NC]
        RewriteCond %{REQUEST_METHOD} ^(GET|HEAD)$ [NC]
        RewriteCond %{REQUEST_URI} !^/activities/auth/login.jsp$
        RewriteCond %{REQUEST_URI} !^/activities/auth/j_security_check$
        RewriteCond %{REQUEST_URI} !^/activities/nav/.+$
        RewriteCond %{REQUEST_URI} !^/activities/bundles/.+$
        RewriteCond %{REQUEST_URI} !^/activities/styles/.+$
        RewriteCond %{REQUEST_URI} !^/activities/javascript/.+$
        RewriteRule !^/activities/service/download/(.+)$ - [F]
        ```

    -   Blogs:

        ```bash
        RewriteEngine On
        
        RewriteCond %{SERVER_NAME} !^blogs-downloads.example.com$ [NC]
        RewriteCond %{REQUEST_METHOD} ^(GET|HEAD)$ [NC]
        RewriteRule ^/blogs/(.+)/resource(/.+)?$ http://blogs-downloads.example.com/
        blogs/$1/resource$2 [L]
        
        RewriteCond %{SERVER_NAME} ^blogs-downloads.example.com$ [NC]
        RewriteCond %{REQUEST_METHOD} !^(GET|HEAD)$ [NC]
        RewriteCond %{REQUEST_URI} !^/blogs/j_security_check$
        RewriteRule .* - [F]
        
        RewriteCond %{SERVER_NAME} ^blogs-downloads.example.com$ [NC]
        RewriteCond %{REQUEST_METHOD} ^(GET|HEAD)$ [NC]
        RewriteCond %{REQUEST_URI} !^/blogs/roller-ui/login.do$ 
        RewriteCond %{REQUEST_URI} !^/blogs/roller-ui/login-redirect.jsp$ 
        RewriteCond %{REQUEST_URI} !^/blogs/j_security_check$ 
        RewriteCond %{REQUEST_URI} !^/blogs/bundles/css/.+$ 
        RewriteCond %{REQUEST_URI} !^/blogs/nav/.+$ 
        RewriteCond %{REQUEST_URI} !^/blogs/roller-ui/images/.+$ 
        RewriteCond %{REQUEST_URI} !^/blogs/.+/resource(/.+)?$
        RewriteRule .* - [F]
        ```

    -   Files:

        ```bash
        For Files:
        
        RewriteEngine On
        
        RewriteCond %{SERVER_NAME} !^files-downloads.example.com$ [NC]
        RewriteCond %{REQUEST_METHOD} ^(GET|HEAD)$ [NC]
        RewriteRule ^/files(/.*)?/(document|draft|attachment|version)/([^/]*)/media(/[^/]*/*)?$ http://files-downloads.example.com/files$1/$2/$3/media$4 [L]
        
        # If SSL is enabled for the component, remove the commenting from the  
        # following lines to redirect the login.
        # RewriteCond %{SERVER_NAME} ^files-downloads.example.com$ [NC]
        # RewriteRule ^/files/login$ https://files-downloads.example.com/files/login [L]
        
        RewriteCond %{SERVER_NAME} ^files-downloads.example.com$ [NC]
        RewriteCond %{REQUEST_METHOD} !^(GET|HEAD)$ [NC]
        RewriteCond %{REQUEST_URI} !^/files/j_security_check$
        RewriteRule .* - [F]
        
        RewriteCond %{SERVER_NAME} ^files-downloads.example.com$ [NC]
        RewriteCond %{REQUEST_METHOD} ^(GET|HEAD)$ [NC]
        RewriteCond %{REQUEST_URI} !^/files/login$
        RewriteCond %{REQUEST_URI} !^/files/j_security_check$
        RewriteCond %{REQUEST_URI} !^/files/images/.+$
        RewriteCond %{REQUEST_URI} !^/files/nav/.+$
        RewriteCond %{REQUEST_URI} !^/files/js/.+$
        RewriteCond %{REQUEST_URI} !^/files(/.*)?/(document|draft|attachment|version)/([^/]*)/media(/[^/]*/*)?$
        # If the IHS fast file serving module (mod_ibm_local_redirect.so) is enabled, 
        # then you need to add access on the download domain for the alias you added 
        # when configuring the module by replacing <FILES_CONTENT_DIR> with this value
        # and uncommenting the following rule.  
        # See Configuring Files and Wikis downloading for production deployments
        # RewriteCond %{REQUEST_URI} !^/<FILES_CONTENT_DIR>/.+$
        RewriteRule .* - [F]
        ```

    -   Forums:

        ```bash
        RewriteEngine On
        
        RewriteCond %{SERVER_NAME} !forums-downloads.example.com$ [NC]
        RewriteCond $1 !.*forumsExtendedDescription.*$ [NC]
        RewriteRule ^/forums/service/download/(.+)$ http://forums-downloads.example.com/forums/service/download/$1 [L]
        
        RewriteCond %{SERVER_NAME} ^forums-downloads.example.com$ [NC]
        RewriteCond %{REQUEST_METHOD} !^(GET|HEAD)$ [NC]
        RewriteCond %{REQUEST_URI} !^/forums/auth/j_security_check$
        RewriteRule .* - [F]
        
        RewriteCond %{SERVER_NAME} ^forums-downloads.example.com$ [NC]
        RewriteCond %{REQUEST_METHOD} ^(GET|HEAD)$ [NC]
        RewriteCond %{REQUEST_URI} !^/forums/auth/login.jsp$
        RewriteCond %{REQUEST_URI} !^/forums/auth/j_security_check$
        RewriteCond %{REQUEST_URI} !^/forums/nav/.+$
        RewriteCond %{REQUEST_URI} !^/forums/bundles/.+$
        RewriteCond %{REQUEST_URI} !^/forums/styles/.+$
        RewriteCond %{REQUEST_URI} !^/forums/javascript/.+$
        RewriteRule !^/forums/service/download/(.+)$ - [F]
        ```

    !!! note 
        
        If you are cutting and pasting these statements into the configuration file, be advised that we have added hard returns to long statements to enable them to be displayed on the web page. Be sure to remove the hard-coded returns from long statements, such as URLs, after you paste them into the configuration file.

    Replace references to .example.com with the alias that you created for the download domain for files downloaded from the application.

6.  If you are sending encrypted connection traffic, add the same set of statements to the encrypted connection \(SSL\) virtual host section of the configuration file, but update all web address references to indicate HTTPS instead of HTTP.

    !!! note 
        
        There are a few statements in the snippets for Files that must be either included or commented out depending on whether or not a encrypted connection is enabled.

7.  Add the rule in the previous step to any virtual host sections of the configuration file.

8.  Save and close the configuration file.


**Parent topic:** [Mitigating a cross site scripting attack](../secure/t_admin_common_secure_xss.md)

**Related information**  


[Mitigating a cross site scripting attack](../secure/t_admin_common_secure_xss.md)

[Configuring file downloads through IBM HTTP Server](../install/t_install_post_files_downloads.md)

[Securing applications from malicious attack](../secure/c_admin_security_xss.md)

