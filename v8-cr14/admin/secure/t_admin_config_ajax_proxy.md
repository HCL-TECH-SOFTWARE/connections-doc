# Configuring the AJAX proxy {#t_admin_config_ajax_proxy .task}

By default, the HCL Connections™ AJAX proxy is configured to allow cookies, headers or mime types, and all HTTP actions to be exchanged among the Connections applications. If you want to change the traffic that is allowed from non-HCL Connections services, you must explicitly configure it.

This task is typically not required. Only perform it if you want to display information from an external service within Connections. The most common action that needs to be performed is step 4 if you wish to enable feeds from external sites.

!!! important 

    When configuring the AJAX proxy to allow your users access to trusted third-party web sites, ensure that those sites implement appropriate security controls. Configuring the proxy to mirror content from third-party servers may cause the proxy to mirror malicious content from those servers, so be sure to allow access to trusted sites only.

The proxy-config.tpl template file defines rules about which HTTP requests, headers, and cookies are allowed to be redirected to the Connections applications. When an Connections server is started, it reads information about the applications from the LotusConnections-config.xml file, and, based on the rules defined in the proxy-config.tpl template file, configures the proxy to be used by any web browsers or other servers that send requests to Connections.

For example, if you want to allow one application, such as Home page, to proxy a widget, but not allow any of the other applications to proxy it, you must create an application-specific version of the proxy-config.tpl file and edit that. See [Configuring the AJAX proxy for a specific application](t_admin_config_ajax_proxy_feature.md) for more details.

To configure the AJAX proxy, complete the following steps:

1.  Access the common AJAX proxy configuration template file:

    1.  Open a command prompt and then change to the following directory of the system on which you installed the deployment manager:

        [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/bin

        `app\_server\_root/profiles/dm\_profile\_root/bin` 
        
        Where `app\_server\_root` represents the IBM WebSphere® Application Server installation directory, for example:

        ```
        Linux:
        /opt/IBM/WebSphere/AppServer
        
        ```

        ```
        Windows:
        drive:\Program Files\IBM\WebSphere\AppServer
        
        ```

        Where drive is the system drive on which the file directory is stored. For example: C: or D:.

        where dm\_profile\_root is the Deployment Manager profile directory; this directory is usually called dmgr01. For example, on Windows, the directory is C:\\Program Files\\IBM\\WebSphere\\AppServer\\profiles\\Dmgr01\\bin.

        !!! attention 
            
            You must run the command to start the wsadmin client from this specific directory because the Jython files for the product are stored there. If you start the client from a different directory, the execfile\(\) command does not work correctly.

    2.  Enter the following command to start the wsadmin client:

        -   Linux: `./wsadmin.sh -lang jython -user admin\_user\_id -password admin\_password -port SOAP\_CONNECTOR\_ADDRESS\_PORT`
        -   Microsoft Windows: `wsadmin -lang jython -user admin\_user\_id -password admin\_password -port SOAP\_CONNECTOR\_ADDRESS\_PORT`

        where:

        -   `admin\_user\_id` is the user name of the Administrator role on IBM WebSphere Application Server. This administrator must be configured at the cell level, not at the cluster, node, or server level.
        -   `admin\_password` is the password of the WebSphere Application Server administrator.
        -   `SOAP\_CONNECTOR\_ADDRESS\_PORT` is the SOAP port for the WebSphere Application Server deployment manager server. The default value of the SOAP port is 8879. If you are using the default port value, you do not have to specify this parameter. If you are not using the default value and you do not know the port number, you can look up its value in the WebSphere Application Server Integrated Solution Console. To look up the SOAP port number, complete the following steps:
            1.  Open the WebSphere Application Server Integrated Solution Console for the deployment manager, and then select **System Administration** \> **Deployment Manager**.
            2.  In the Additional properties section expand **Ports**, and then look for the `SOAP\_CONNECTOR\_ADDRESS` port entry to find the port number.

        For example:

        -   Linux: `./wsadmin.sh -lang jython -username primaryAdmin -password p@assword -port 8879`
        -   Microsoft Windows: `wsadmin -lang jython -username primaryAdmin -password p@assword -port 8879`
    3.  Use the following command to access the configuration file:

        ```
        execfile("connectionsConfig.py")
        ```

    4.  Use the following command to check out the configuration file:

        ```
        LCConfigService.checkOutProxyConfig("temp\_directory",
         "cell\_name")
        ```

        where temp\_directory is a temporary directory of your choice, and cell\_name is the name of the cell where the Connections application that uses the global proxy template file is located.

2.  From the temporary directory to which you checked out the configuration files, open the proxy-config.tpl file in a text editor.

3.  Make your edits. For example, you can do the following things:

    -   To explicitly refuse all traffic from a specific site, add a policy as follows:

        ```bash
        <proxy:policy url="malicious.site.com" acf="none">
            <proxy:actions/>
            <proxy:headers/>
            <proxy:cookies/>
            </proxy:policy>
        ```

    -   To allow a particular service on your network to display a custom widget, you can add the following policy entry to the file:

        ```bash
        <proxy:policy url="http://my.network.com/widget/*" acf="none">
            <proxy:actions>
                <proxy:method>GET</proxy:method>
            </proxy:actions>
            <proxy:headers>
              <proxy:header>User-Agent</proxy:header>
              <proxy:header>Accept.*</proxy:header>
              <proxy:header>Content.*</proxy:header>
              <proxy:header>Authorization.*</proxy:header>
              <proxy:header>If-.*</proxy:header>
              <proxy:header>Pragma</proxy:header>
              <proxy:header>Cache-Control</proxy:header>
            </proxy:headers>
            <proxy:cookies>
                <proxy:cookie>JSESSIONID</proxy:cookie>
            </proxy:cookies>
        </proxy:policy>
        ```

    -   If a service requires authentication, you can configure it to also allow basic authentication requests by adding a `basic-auth-support="true"` attribute to the <proxy:policy\> element. For example:

        ```bash
        <proxy:policy 
         url="http://my.network.com/service/*" 
         acf="none" 
         **basic-auth-support="true"**>
           ...
        </proxy:policy>
        ```

        If this attribute is not added, when an unauthenticated request is sent to a service that requires authentication, the service does not display the basic authentication dialog, but returns an HTTP 403 status code instead.

    -   To allow a particular service to run on your network and to pass cookies for LTPA tokens to the applications:

        ```bash
        <proxy:policy url="http://my.network.com/service/*" acf="none">
            <proxy:actions>
                <proxy:method>GET</proxy:method>
            </proxy:actions>
            <proxy:headers>
              <proxy:header>User-Agent</proxy:header>
              <proxy:header>Accept.*</proxy:header>
              <proxy:header>Content.*</proxy:header>
              <proxy:header>Authorization.*</proxy:header>
              <proxy:header>If-.*</proxy:header>
              <proxy:header>Pragma</proxy:header>
              <proxy:header>Cache-Control</proxy:header>
            </proxy:headers>
            <proxy:cookies>
              <proxy:cookie>JSESSIONID</proxy:cookie>
              **<proxy:cookie\>LtpaToken</proxy:cookie\>**
              **<proxy:cookie\>LtpaToken2</proxy:cookie\>**
            </proxy:cookies>
        </proxy:policy>
        ```

    !!! note 
        
        Specify the headers using regular expressions. If no cookies are specified, the proxy will pass all of them. To prevent it from passing any cookies, specify <proxy:cookies/\>.

    -   To allow a particular service to run on your network configured with SSO, and to pass cookies for LTPA tokens and ISVA (formerly ISAM) or Siteminder to the service, use the following <proxy:cookies\> pattern:

        ```bash
        <proxy:policy url=" http://my.network.com/service/*"
        	    acf="none" basic-auth-support="true" auth-support="true">
        	    <proxy:actions>
        	        <proxy:method>GET</proxy:method>
        	        <proxy:method>POST</proxy:method>
        	        <proxy:method>PUT</proxy:method>
        	        <proxy:method>DELETE</proxy:method>
        	    </proxy:actions>
        	    <proxy:headers>
        	        <proxy:header>content-type</proxy:header>
        	        <proxy:header>accept-encoding</proxy:header>
        	        <proxy:header>uit</proxy:header>
        	        <proxy:header>pst</proxy:header>
        	        <proxy:header>User-Agent</proxy:header>
        	        <proxy:header>Accept.*</proxy:header>
        	        <proxy:header>Content.*</proxy:header>
        	        <proxy:header>Authorization.*</proxy:header>
        	        <proxy:header>X-Method-Override</proxy:header>
        	        <proxy:header>If-.*</proxy:header>
        	        <proxy:header>Pragma</proxy:header>
        	        <proxy:header>Cache-Control</proxy:header>
        	        <proxy:header>X-Update-Nonce</proxy:header>
        	    </proxy:headers>
        	    <proxy:cookies>
        	        <proxy:cookie>DomAuthSessId</proxy:cookie>
        	        <proxy:cookie>LtpaToken</proxy:cookie>
        	        <proxy:cookie>LtpaToken2</proxy:cookie>
        	        <proxy:cookie>Shimmer</proxy:cookie>
        	        <proxy:cookie>ShimmerS</proxy:cookie>
        	        <proxy:cookie>iwaSSL</proxy:cookie>
        	        <proxy:cookie>iwaSSL2</proxy:cookie>
        	        <proxy:cookie>JSESSIONID</proxy:cookie>
        	        <proxy:cookie>has</proxy:cookie>
        	        <proxy:cookie>PD-H-SESSION-ID</proxy:cookie><!-- TAM -->
        	        <proxy:cookie>PD-S-SESSION-ID</proxy:cookie><!-- TAM -->
        	        <proxy:cookie>SMIDENTITY</proxy:cookie><!-- SiteMinder -->
        	        <proxy:cookie>SMSESSION</proxy:cookie><!-- SiteMinder -->
        	    </proxy:cookies>
        	</proxy:policy>
        ```

4.  The following policy allows GET requests to be passed to any web address. If you want to allow your users to have access to all web sites, remove the comments from around this policy. For example, users who add a feed to a community will see a 403 error where the feed results should be displayed unless you perform this step. Be sure that the policy is listed as the last policy in the configuration file.

    ```bash
    <**!--**proxy:policy url="*" acf="none"> 
        <proxy:actions>
          <proxy:method>GET</proxy:method>
        </proxy:actions>
        <proxy:headers/>
        <proxy:cookies/>
    </proxy:policy**--**>
    ```

    !!! note 
        
        Do not enable this policy on internet-facing deployments because it can allow unauthorized access to internal servers.

5.  You can optionally specify values for the following proxy:meta-data properties. Add any custom configurations before these proxy:meta-data elements.

    **circular\_redirects**
    :   Specifies that circular redirects are allowed. This property accepts a Boolean value of true or false specified in lowercase letters. If set to true, it supports using a proxy for a site that redirects to the same URL but with different parameters. Such a change is not recognized as a new URL. The default value of this property is true.

    **connection-timeout**
    :   Amount of time before an attempt to connect to a host times out. Specified in milliseconds, the default value of this property is 60,000, which is 1 minute.

    **max\_circular\_redirects**
    :   Maximum number of times a circular redirect is allowed before the proxy rejects it. Specified as an integer, the default value of this property is 100.

    **maxconnectionsperhost**
    :   Maximum number of simultaneous connections between the proxy and a given host. Specified as an integer, the default value of this property is 5.

    **maxtotalconnections**
    :   Maximum number of simultaneous connections between the proxy and all of the hosts together. Specified as an integer, the default value of this property is 10.

    **socket-timeout**
    :   Amount of time before an attempt to use a socket times out. Specified in milliseconds, the default value of this property is 60,000, which is 1 minute.

    **unsigned\_ssl\_certificate\_support**
    :   Specifies that self-signed SSL certificates are supported. This property accepts a Boolean value of true or false specified in lower-case letters. The default value of this property is true. Change it to false when the system is ready for production.

    The purpose of the following three settings is to prevent the proxy from consuming all available container threads while it waits for a response from a target host that is slow or is not responding.

    **maxconcurrentconnections**
    :   Limits the number of threads that can be active in the proxy at any one time. When the limit is reached, all subsequent threads immediately return with a HTTP 504 Gateway Timeout error. If the value is 0, no limit is set. The default setting is 10, which is used if the value is missing or not valid.

    **suspend-url-timeout-interval**
    :   Specifies the minimum amount of time, in milliseconds, that a host is on the suspend list. A host is placed on the suspend list when the host times out. When a host is on the suspend list, the proxy rejects all requests to that host and returns a HTTP 504 Gateway Timeout error for that host. After the timeout interval expires, the host remains on the suspend list, but the next request is accepted. If the request succeeds, the host is removed from the suspend list. If the request does not succeed, the host remains on the suspend list and the timeout interval is renewed. The maximum value is 120000 \(2 minutes\). A value of 0 disables the timeout interval feature. The default value is 2000, which is used if the value is missing or not valid.

    **clean-url-timeout-interval**
    :   Specifies the maximum amount of time, in milliseconds, that a host is on the suspend list. The minimum value is 180000 \(30 minutes\). The default value is 14400000, which is used if the value is missing or not valid.

    For example:

    ```bash
    <proxy:meta-data>
      <proxy:name>maxconcurrentconnections</proxy:name>
      <proxy:value>20</proxy:value>
    </proxy:meta-data>  
    ```

6.  Save and close the file.

7.  Check the proxy-config.tpl file in during the same session in which you checked it out. Use the following command to check the file in:

    ```
    LCConfigService.checkInProxyConfig("temp\_directory",
     "cell\_name")
    ```

    where `temp_directory` is the temporary directory to which you checked out the configuration files, and `cell_name` is the name of the cell where the application that uses the common proxy-config.tpl file is located.

8.  Restart the application server hosting Connections.

## What to do next?

You can perform any of the following tasks:

-   **[Configuring the AJAX proxy for a specific application](../secure/t_admin_config_ajax_proxy_feature.md)**  
The AJAX proxy configuration for all of the HCL Connections applications is defined in the proxy-config.tpl file. If you want to specify different AJAX proxy settings for a specific application only, you can do so by creating a new, application-specific version of the proxy-config.tpl template file.
-   **[Enabling the AJAX proxy to forward user credentials](../secure/t_admin_proxy_ltpa_token.md)**  
Edit the proxy configuration template file to instruct the HCL Connections server to accept LTPA tokens or the TAM or SiteMinder cookies in an SSO environment. This task is necessary if you want to configure single sign-on between Connections and the servers defined in the proxy configuration file to forward a specific list of cookies.
-   **[Configuring the AJAX proxy to work with a pass-through proxy](../secure/t_admin_configure_passthru_proxy.md)**  
If your organization has a pass-through proxy required for Internet access, you must configure the AJAX proxy to send requests to it. Otherwise, your connections to the Internet will not work. The AJAX proxy supports Basic authentication.
-   **[Configuring the library widget proxy](../secure/t_admin_communities_library_proxy.md)**  
Add a proxy policy to the proxy-ecm-config.tpl file to enable communication between HCL Connections and ECM servers.

**Parent topic:** [Security](../secure/c_sec_overview.md)

**Related information**  


[Administering the Widget container](../admin/t_admin_common_widget_container.md)

[Enabling community feeds](../admin/c_admin_communities_enabling_feeds.md)

[Enabling single sign-on for SiteMinder](../secure/t_secure_with_siteminder.md)

[Configuration error messages](../troubleshoot/r_error_codes_lc_config.md)

