# Configuring the AJAX proxy for a specific application {#t_admin_config_ajax_proxy_application .task}

The AJAX proxy configuration for all of the HCL Connections™ applications is defined in the proxy-config.tpl file. If you want to specify different AJAX proxy settings for a specific application only, you can do so by creating a new, application-specific version of the proxy-config.tpl template file.

This task is not typically required. Only perform it if you want to display information from an external service within Connections. You can define a custom proxy configuration for the Activities, Communities, Home page, Profiles, and Search applications, but not the other Connections applications. The most common action that needs to be performed is step 5 if you wish to enable feeds from external sites.

By default, the Connections AJAX proxy is configured to allow cookies, headers or mime types, and all HTTP actions to be exchanged among the Connections applications. If you want to change the traffic that is allowed from non-HCL Connections services, you must explicitly configure it

To configure the AJAX proxy for a specific application, complete the following steps:

1.  Go to the directory on the WebSphere® Application Server in which the configuration files are stored.

    For example: `C:\IBM\WebSphere\AppServer\profiles\Dmgr01\config\cells\<cell_name>\LotusConnections-config`

    Find the `proxy-config.tpl` file, and then make a copy of the file, naming it using the following syntax:

    ```
    proxy-application\_name-config.tpl
    ```

    where `application_name` is the name of the application for which you want to create a custom proxy configuration. Valid entries for `application_name` are: activities, communities, homepage, profiles, or search.

    Save the copy in the same directory: `C:\IBM\WebSphere\AppServer\profiles\Dmgr01\config\cells\<cell_name>\LotusConnections-config`

2.  Check out the copied configuration file by completing the following steps.

    1.  Open a command prompt and then change to the following directory of the system on which you installed the deployment manager:

        [app\_server\_root](../admin/../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/bin

        `app\_server\_root/profiles/dm\_profile\_root/bin`
        
        Where `app\_server\_root` represents the IBM WebSphere Application Server installation directory, for example:

        ```
        Linux:
        /opt/IBM/WebSphere/AppServer
        
        ```

        ```
        Windows:
        drive:\Program Files\IBM\WebSphere\AppServer
        
        ```

        Where drive is the system drive on which the file directory is stored. For example: C: or D:.

        where `dm\_profile\_root` is the Deployment Manager profile directory; this directory is usually called dmgr01. For example, on Windows, the directory is `C:\\Program Files\\IBM\\WebSphere\\AppServer\\profiles\\Dmgr01\\bin`.

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
            2.  In the Additional properties section expand **Ports**, and then look for the SOAP\_CONNECTOR\_ADDRESS port entry to find the port number.
        
        For example:

        -   Linux: `./wsadmin.sh -lang jython -username primaryAdmin -password p@assword -port 8879`
        -   Microsoft Windows: `wsadmin -lang jython -username primaryAdmin -password p@assword -port 8879`
    3.  Access the configuration service files for the application to which you want to apply special proxy configuration rules using the following command:

        ```
        execfile("py\_file\_name")
        ```

        where py\_file\_name is one of the following, depending on the application to which you are applying the proxy configuration settings:

        -   Activities: `activitiesAdmin.py`
        -   Communities: `communitiesAdmin.py`
        -   Home page: `homepageAdmin.py`
        -   Profiles: `profilesAdmin.py`
        -   Search: `searchAdmin.py`
    4.  Check out the configuration service for the application using one of the following commands:

        -   Activities:

            ```
            ActivitiesConfigService.checkOutProxyConfig("temp\_directory", "cell\_name")
            ```

        -   Communities:

            ```
            CommunitiesConfigService.checkOutProxyConfig("temp\_directory", "cell\_name")
            ```

        -   Home page:

            ```
            HomepageCellConfig.checkOutProxyConfig("temp\_directory", "cell\_name")
            ```

        -   Profiles:

            ```
            ProfilesConfigService.checkOutProxyConfig("<temp_directory>", "<cell_name>")
            ```

        -   Search:

            ```
            SearchCellConfig.checkOutProxyConfig("temp\_directory", "cell\_name")
            ```

        where

        -   `temp_directory` is the temporary working directory to which the configuration TPL and XSD files are copied and are stored while you make changes to them. Use forward slashes to separate directories in the file path, even if you are not using the Microsoft Windows operating system.
        -   `cell_name` is the name of the WebSphere Application Server cell hosting the Connections application. This argument is required. If you do not know the cell name, you can determine it by typing the following command in the wsadmin command processor:

            ```
            print AdminControl.getCell()
            ```

3.  Navigate to the temporary directory that you specified in the previous step, and then open the custom template file in a text editor.

4.  Make your edits. For example, you can do the following things:

    -   To explicitly refuse all traffic from a specific site, add a policy as follows:

        ```
        <proxy:policy url="malicious.site.com" acf="none">
            <proxy:actions/>
            <proxy:headers/>
            <proxy:cookies/>
            </proxy:policy>
        ```

    -   To allow a particular service on your network to display a custom widget, you can add the following policy entry to the file:

        ```
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

        ```
        <proxy:policy 
         url="http://my.network.com/service/*" 
         acf="none" 
         **basic-auth-support="true"**>
           ...
        </proxy:policy>
        ```

        If this attribute is not added, when an unauthenticated request is sent to a service that requires authentication, the service does not display the basic authentication dialog, but returns an HTTP 403 status code instead.

    -   To allow a particular service to run on your network and to pass cookies for LTPA tokens to the applications:

        ```
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

5.  The following policy allows GET requests to be passed to any web address. If you want to allow your users to have access to all web sites, remove the comments from around this policy. For example, users who add a feed to a community will see a 403 error where the feed results should be displayed unless you perform this step. Be sure that the policy is listed as the last policy in the configuration file.

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

6.  You can optionally specify values for the following proxy:meta-data properties. Add any custom configurations before these proxy:meta-data elements.

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

7.  Save and close the file.

8.  Check in the file that you updated to the appropriate configuration service using one of the following commands:

    -   Activities:

        ```
        ActivitiesConfigService.checkInProxyConfig("temp\_directory", "cell\_name")
        ```

    -   Blogs or Communities:

        ```
        CommunitiesConfigService.checkInProxyConfig("temp\_directory", "cell\_name")
        ```

    -   Home page:

        ```
        HomepageCellConfig.checkInProxyConfig("temp\_directory", "cell\_name")
        ```

    -   Profiles:

        ```
        ProfilesConfigService.checkInProxyConfig("temp\_directory", "cell\_name")
        ```

    -   Search:

        ```
        SearchCellConfig.checkInProxyConfig("temp\_directory", "cell\_name")
        ```

    where temp\_directory is the temporary directory to which you checked out and updated the proxy-application\_name-config.tpl file, and cell\_name is the name of the cell where the application that uses the proxy template file is located.

9.  Restart the WebSphere Application Server hosting Connections.


To make subsequent changes to the application-specific proxy template file, repeat steps 2 through 9 to check out the file, make your updates, and check the file back in again.

**Parent topic:** [Configuring the AJAX proxy](../secure/t_admin_config_ajax_proxy.md)

