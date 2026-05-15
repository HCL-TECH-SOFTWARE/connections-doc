# Configuring the library widget proxy 

Add a proxy policy to the proxy-ecm-config.tpl file to enable communication between HCL Connections™ and ECM servers.

To edit configuration files, you must use the IBM® WebSphere® Application Server wsadmin client. See [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md) for details.

!!! important 
    
    When configuring the proxy to allow your users access to trusted third-party web sites, ensure that those sites implement appropriate security controls. Configuring the proxy to mirror content from third-party servers may cause the proxy to mirror malicious content from those servers, so be sure to allow access to trusted sites only.

To configure the proxy-ecm-config.tpl file for library widgets, complete the following steps.

1.  Start the wsadmin client.

2.  Access and check out the proxy-ecm-config.tpl file:

    1.  Enter the following command to access theproxy-ecm-config.tpl file: execfile\("connectionsConfig.py"\)

    2.  Enter the following command to check out the proxy-ecm-config.tpl file:

        `LCConfigService.checkOutProxyEcmConfig("working\_directory","cell\_name")`

        where:

        -   `working_directory` is the temporary working directory to which the file is copied and are stored while you make changes. Use forward slashes to separate directories in the file path, even if you are using the Microsoft® Windows® operating system.

            Linux® only: The directory must grant write permissions or the command does not run successfully.

        -   `cell_name` is the name of the WebSphere Application Server cell hosting the Connections application. This argument is case-sensitive, so type it with care. If you do not know the cell name, type the following command while in the wsadmin command processor:print AdminControl.getCell\(\)
        
        For example:

        -   Linux: `LCConfigService.checkOutProxyEcmConfig\("/opt/temp","foo01Cell01"\)`
        
        -   Microsoft Windows: `LCConfigService.checkOutProxyEcmConfig\("c:/temp","foo01Cell01"\)`

3.  Navigate to the working directory and open the proxy-ecm-config.tpl file in a text editor. In the policy element, replace the URL attribute with the server address of the ECM server:

    ```bash
    <proxy:policy url="http://www.example.com:8080/*" acf="none" basic-auth-support="true">
            <proxy:actions>
                <proxy:method>GET</proxy:method>
                <proxy:method>HEAD</proxy:method>
                <proxy:method>POST</proxy:method>
                <proxy:method>PUT</proxy:method>
                <proxy:method>DELETE</proxy:method>
            </proxy:actions>
            <proxy:headers>
                <proxy:header>User-Agent</proxy:header>
                <proxy:header>Accept*</proxy:header>
                <proxy:header>Content*</proxy:header>
                <proxy:header>Authorization*</proxy:header>
                <proxy:header>X-Method-Override</proxy:header>
                <proxy:header>Set-Cookie</proxy:header>
                <proxy:header>If-*</proxy:header>
                <proxy:header>Pragma</proxy:header>
                <proxy:header>Cache-Control</proxy:header>
                <proxy:header>X-Server</proxy:header>
                <proxy:header>X-Update-Nonce</proxy:header>
                <proxy:header>X-Passthrough-Basic</proxy:header>
                <proxy:header>X-Requested-With</proxy:header>
                <proxy:header>If-Modified-Since</proxy:header>
                <proxy:header>If-None-Match</proxy:header>
                <proxy:header>com.ibm.lotus.openajax.virtualhost</proxy:header>
                <proxy:header>com.ibm.lotus.openajax.virtualport</proxy:header>
            </proxy:headers>
            <proxy:cookies>
                	<proxy:cookie>LtpaToken</proxy:cookie>
                	<proxy:cookie>LtpaToken2</proxy:cookie>
                	<proxy:cookie>JSESSIONID</proxy:cookie>
    							<proxy:cookie>LTPA</proxy:cookie>
    							<proxy:cookie>LTPA2</proxy:cookie>
    							<proxy:cookie>PD-H-SESSION-ID</proxy:cookie>
    							<proxy:cookie>PD-S-SESSION-ID</proxy:cookie>
    							<proxy:cookie>SMSESSION</proxy:cookie>
    	        </proxy:cookies>
        </proxy:policy>
    ```

4.  You can optionally specify values for the following proxy:meta-data properties. Add any custom configurations before these proxy:meta-data elements.

    **circular\_redirects**
    : Specifies that circular redirects are allowed. This property accepts a Boolean value of true or false specified in lowercase letters. If set to true, it supports using a proxy for a site that redirects to the same URL but with different parameters. Such a change is not recognized as a new URL. The default value of this property is true.

    **connection-timeout**
    : Amount of time before an attempt to connect to a host times out. Specified in milliseconds, the default value of this property is 60,000, which is 1 minute.

    **max\_circular\_redirects**
    : Maximum number of times a circular redirect is allowed before the proxy rejects it. Specified as an integer, the default value of this property is 100.

    **maxconnectionsperhost**
    : Maximum number of simultaneous connections between the proxy and a given host. Specified as an integer, the default value of this property is 5.

    **maxtotalconnections**
    : Maximum number of simultaneous connections between the proxy and all of the hosts together. Specified as an integer, the default value of this property is 10.

    **socket-timeout**
    : Amount of time before an attempt to use a socket times out. Specified in milliseconds, the default value of this property is 60,000, which is 1 minute.

    **unsigned\_ssl\_certificate\_support**
    : Specifies that self-signed SSL certificates are supported. This property accepts a Boolean value of true or false specified in lower-case letters. The default value of this property is true. Change it to false when the system is ready for production.

    The purpose of the following three settings is to prevent the proxy from consuming all available container threads while it waits for a response from a target host that is slow or is not responding.

    **maxconcurrentconnections**
    : Limits the number of threads that can be active in the proxy at any one time. When the limit is reached, all subsequent threads immediately return with a HTTP 504 Gateway Timeout error. If the value is 0, no limit is set. The default setting is 10, which is used if the value is missing or not valid.

    **suspend-url-timeout-interval**
    : Specifies the minimum amount of time, in milliseconds, that a host is on the suspend list. A host is placed on the suspend list when the host times out. When a host is on the suspend list, the proxy rejects all requests to that host and returns a HTTP 504 Gateway Timeout error for that host. After the timeout interval expires, the host remains on the suspend list, but the next request is accepted. If the request succeeds, the host is removed from the suspend list. If the request does not succeed, the host remains on the suspend list and the timeout interval is renewed. The maximum value is 120000 \(2 minutes\). A value of 0 disables the timeout interval feature. The default value is 2000, which is used if the value is missing or not valid.

    **clean-url-timeout-interval**
    : Specifies the maximum amount of time, in milliseconds, that a host is on the suspend list. The minimum value is 180000 \(30 minutes\). The default value is 14400000, which is used if the value is missing or not valid.

    For example:

    ```bash
    <proxy:meta-data>
      <proxy:name>maxconcurrentconnections</proxy:name>
      <proxy:value>20</proxy:value>
    </proxy:meta-data>  
    ```

5.  If your environment uses a pass-through proxy, add a `<proxy:meta-data>` element containing each of the following parameters:

    **passthru\_host**
    : The address at which the proxy is listening. In most cases, accessing the host and port from a browser causes an authentication request popup to be displayed.  Required.

    **passthru\_password**
    : Password that corresponds with the passthru\_username value. Required. If you do not provide a user name and password, all other parameters are ignored.

    **passthru\_port**
    : The port at which the proxy is listening. If not specified, then a default value of port 80 is used. Required.

    **passthru\_realm**
    : User credential pairs are associated with realms, not URLs. This allows the same authorization information to be used for multiple URLs or whole URL trees. When a server sends back an unauthorized error, it includes the name of the realm that the requested URL belongs to. The client can then look and see whether it has stored a username and password for the realm, and if so, it supplies that information without having to prompt the user again. If a user name and password are needed for the proxy, you can specify the realm for the proxy so that the credentials do not get sent to any proxy. If you do not specify this parameter, then the credentials are sent for all authentication attempts. In the example that follows, Subversion User Authentication is specified as the passthru\_realm. As a result, all authentication requests from this realm on the SVN server will be provided the given username and password. Optional. Specify the passthru\_realm parameter in a production environment to prevent the user name and password information from being presented for all authentication requests.

    **passthru\_username**
    : User name for authenticating with the pass-through proxy. In the example that follows, any username which has read access to the subversion server will be sufficient when a GET request is sent to get authorization. Required. If you do not provide a user name and password, all other parameters are ignored.

    The following example shows the configuration for a fictitious proxy firewall.

    ```bash
    <proxy:meta-data>      
    	<proxy:name>passthru_host</proxy:name>
    	<proxy:value>9.17.237.132</proxy:value>
    </proxy:meta-data>
    <proxy:meta-data>
    	<proxy:name>passthru_port</proxy:name>
    	<proxy:value>3128</proxy:value>
    </proxy:meta-data>
    <proxy:meta-data>
    	<proxy:name>passthru_realm</proxy:name>
    	<proxy:value>Subversion User Authentication</proxy:value>
    </proxy:meta-data>   
    <proxy:meta-data>
    	<proxy:name>passthru_username</proxy:name>
    	<proxy:value>adamsmith</proxy:value>
    </proxy:meta-data>   
    <proxy:meta-data>
    	<proxy:name>passthru_password</proxy:name>
    	<proxy:value>password123</proxy:value>
    </proxy:meta-data>
    ```

6.  Enter the following command to check in your changes: `LCConfigService.checkInProxyEcmConfig("working\_directory","cell\_name")`

7.  Restart the Connections server.


To enable communication with more ECM servers, add a new copy of the current policy for each ECM server. In each new policy change the server name in the URL attribute.

**Parent topic:** [Configuring the AJAX proxy](../secure/t_admin_config_ajax_proxy.md)
