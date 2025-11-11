# Configuring the AJAX proxy to work with a pass-through proxy {#t_admin_configure_passthru_proxy .task}

If your organization has a pass-through proxy required for Internet access, you must configure the AJAX proxy to send requests to it. Otherwise, your connections to the Internet will not work. The AJAX proxy supports Basic authentication.

If the AJAX proxy needs to go through a border firewall before accessing the network, you must configure the AJAX proxy configuration file to connect to a pass-through proxy before accessing the network.

The AJAX proxy configuration file is stored in the LotusConnections-config directory. A common proxy configuration file, proxy-config.tpl, is shared by all the applications.

To configure the AJAX proxy to work with a pass-through proxy, complete the following steps:

1.  To access the common AJAX proxy configuration template file:

    1.  Open a command prompt and then change to the following directory of the system on which you installed the deployment manager:

        [app\_server\_root](../admin/../plan/i_ovr_r_directory_conventions.md)/profiles/dm\_profile\_root/bin

        app\_server\_root/profiles/dm\_profile\_root/bin. Where app\_server\_root represents the IBM WebSphere Application Server installation directory, for example:

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

        -   `admin\_user\_id` is the user name of the Administrator role on IBM WebSphere® Application Server. This administrator must be configured at the cell level, not at the cluster, node, or server level.
        -   `admin\_password` is the password of the WebSphere Application Server administrator.
        -   `SOAP\_CONNECTOR\_ADDRESS\_PORT` is the SOAP port for the WebSphere\(r\) Application Server deployment manager server. The default value of the SOAP port is 8879. If you are using the default port value, you do not have to specify this parameter. If you are not using the default value and you do not know the port number, you can look up its value in the WebSphere Application Server Integrated Solution Console. To look up the SOAP port number, complete the following steps:
            1.  Open the WebSphere Application Server Integrated Solution Console for the deployment manager, and then select **System Administration** \> **\>Deployment Manager**.
            2.  In the **Additional properties** section expand **Ports**, and then look for the **SOAP\_CONNECTOR\_ADDRESS\_PORT** entry to find the port number.
        
        For example:

        -   Linux: `./wsadmin.sh -lang jython -username primaryAdmin -password p@assword -port 8879`
        -   Microsoft Windows: `wsadmin -lang jython -username primaryAdmin -password p@assword -port 8879`
    3.  Use the following command to access the configuration file:

        ```
        execfile("connectionsConfig.py")
        ```

    4.  Use the following command to check out the configuration file:

        `LCConfigService.checkOutProxyConfig\("temp\_directory", "cell\_name"\)`

        where `temp\_directory` is a temporary directory of your choice, and `cell\_name` is the name of the cell where the HCL Connections™ application that uses the global proxy template file is located.

2.  From the temporary directory to which you checked out the configuration files, open the proxy-config.tpl file in a text editor.

3.  Add a **<proxy:meta-data\>** element containing each of the following parameters:

    **passthru\_host**
    :   The address at which the proxy is listening. In most cases, accessing the host and port from a browser causes an authentication request popup to be displayed. Required.

    **passthru\_password**
    :   Password that corresponds with the passthru\_username value. Required. If you do not provide a user name and password, all other parameters are ignored.

    **passthru\_port**
    :   The port at which the proxy is listening. If not specified, then a default value of port 80 is used. Required.

    **passthru\_realm**
    :   User credential pairs are associated with realms, not URLs. This allows the same authorization information to be used for multiple URLs or whole URL trees. When a server sends back an unauthorized error, it includes the name of the realm that the requested URL belongs to. The client can then look and see whether it has stored a username and password for the realm, and if so, it supplies that information without having to prompt the user again. If a user name and password are needed for the proxy, you can specify the realm for the proxy so that the credentials do not get sent to any proxy. If you do not specify this parameter, then the credentials are sent for all authentication attempts. In the example that follows, Subversion User Authentication is specified as the passthru\_realm. As a result, all authentication requests from this realm on the SVN server will be provided the given username and password. Optional. Specify the passthru\_realm parameter in a production environment to prevent the user name and password information from being presented for all authentication requests.

    **passthru\_username**
    :   User name for authenticating with the pass-through proxy. In the that follows, any username which has read access to the subversion server will be sufficient when a GET request is sent to get authorization. Required. If you do not provide a user name and password, all other parameters are ignored.

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

4.  Save and close the file.

5.  Use the following command to check in the proxy-config.tpl file during the same session in which you checked it out:

    `LCConfigService.checkInProxyConfig("temp_directory", "cell_name")`

    where `temp_directory` is the temporary directory to which you checked out the configuration files, and `cell_name` is the name of the cell where the application that uses the common proxy-config.tpl file is located.

6.  Restart the application server hosting Connections.


**Parent topic:** [Configuring the AJAX proxy](../secure/t_admin_config_ajax_proxy.md)

