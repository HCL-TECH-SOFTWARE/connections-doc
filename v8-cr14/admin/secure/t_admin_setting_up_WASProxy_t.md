# Setting up a WAS proxy server for long polling 

Long polling is a technique used to push updates to a web client. A connection is held open between the web client and the web server so that when the server has new information, it can push it to the client. That connection is then closed. A new connection is then established between the client and the server and the client then waits for another update from the server. A WebSphere® Application Server \(WAS\) proxy server is needed for long polling for a target of between 15,000 and 20,000 users.

-   Install HCL Connections™ 5.5.
-   Install WebSphere 8.5.5.7 \(or later, if compatible\).
-   Stop all Java™ Virtual Machines \(JVMs\), web servers, and proxy servers.
-   Verify that you have more than 8GB free space for your planned PushNotification JVM heapsize on your deployment.
-   Verify that you have a separate machine for the WAS Proxy server and use RedHat 6.7 or later for the WAS Proxy server.
-   Verify that you have a quad core CPU at greater than 2 GHZ, 16 GB RAM, and 100 GB or more hard disk space.

You are configuring a proxy server to reside in front of the HTTP Server \(IHS\) and WAS application nodes. All requests EXCEPT for push notification requests will be routed to the IHS server. Push notification requests will be routed directly to the WAS application node servers.

1.  Complete the standard WAS node installation and federation.

    1.  Install WebSphere 8.5.5.7 \(or later, if compatible\) onto the hardware that you are using for the proxy server.

        Download and unzip the installer for the Installation Manager v1.8.3 and for WebSphere Network Deployment v8.5. The installation process is documented here: [WebSphere Application Server, Network Deployment \(Distributed platforms and Windows™\), Version 8.0 documentation](https://www-01.ibm.com/support/knowledgecenter/SSAW57_8.0.0/com.ibm.websphere.nd.doc/info/ae/ae/welcome_nd.dita). The relevant sections are: HCL Installation Manager 1.5.3 and WebSphere V8.0 Application Server Installation. The steps are the same for the newer versions of these items.

    2.  Federate the node into deployment.

        1.  Navigate to /opt/IBM/WebSphere/AppServer/bin.
        2.  Make sure that the Deployment Manager \(DM\) is started, and the application server is stopped on the proxy server.
        3.  To check if your servers are running, change to the /opt/IBM/WebSphere/Appserver/bin directory, or to the location where you installed WebSphere on your server, and run the `./serverStatus.sh -all` command.
        4.  Enter your WebSphere administrator user ID and password.
        5.  Enter `./stopServer.sh server1` to stop the server in /opt/IBM/WebSphere/Appserver/bin.
        6.  From /opt/IBM/WebSphere/AppServer/bin, run the `./addNode.sh DM host name 8879 -user wasadmin -password wasadmin -localusername wasadmin -localpassword wasadmin` command. wasadmin is the administrator ID you used when installing WebSphere on the proxy server.
        7.  On the DM console, navigate to **System administration** \> **Nodes**. You should see the proxy server in the list of nodes.
2.  Create the WAS proxy server definition.

    1.  On your DM console, navigate to **Servers** \> **Server Types** \> **WebSphere proxy servers** and click **New...**.

    2.  Enter a name for your proxy server and click **Next**.

    3.  Select all supported protocols and the **Generate unique ports** check box. Click **Next**.

    4.  The server template should already be selected for you. If not, select **proxy\_server\_foundation** and click **Next**.

    5.  Review your choices and click **Finish** to create your WAS proxy server definition.

    6.  Save the configuration change.

    7.  Stop, synchronize, and restart all nodes in your environment.

3.  Create the generic server clusters.

    You need 2 generic server clusters within your deployment to manage the various types of requests to route:

    -   Standard requests to IHS
    -   Secure Standard requests to IHS
    1.  On your DM console, navigate to **Servers** \> **Clusters** \> **Generic server clusters** and click **New**.

    2.  Use the following values to set up the 2 generic clusters. Make a note of the values that you specify for Name.

        |Request type|Name|Protocol|
        |------------|----|--------|
        |Standard requests to IHS|IHS\_HTTP|HTTP Secure standard requests to IHS IHS\_HTTPS|
        |Secure standard requests to IHS|IHS\_HTTPS|HTTPS|

    3.  After each value is applied, save the configuration.

    4.  Click on one of the clusters and then click **Ports**.

    5.  Click **New...** and add the settings for your IHS hostname and port. By default, the HTTP port is port 80, and the secure port \(HTTPS\) is 443. If these values are different on your environment, adjust these values accordingly.

        **Note:** REMEMBER TO REPEAT THIS STEP FOR THE OTHER GENERIC CLUSTER PROTOCOL.

    6.  Stop, synchronize, and restart the nodes in your environment.

4.  Set the URI groups.

    1.  On the DM console, navigate to **Servers** \> **Server Types** \> **WebSphere proxy servers** \> **Proxy server name** \> **Proxy Settings** \> **\(expandable\) HTTP Proxy Server Settings** \> **Proxy Settings** \> **URI Groups**. You are setting up a URI group for all push notifications, for which you will use a "not equals to" rule for later.

    2.  Use the values in the following table to create the URI group. Make a note of the value that you specify for Name.

        |Group type for:|Name|URI pattern|
        |---------------|----|-----------|
        |push notifications|URI\_Group2|/push/\*|

    3.  Save the configuration.

    4.  Stop, synchronize, and restart the nodes in your environment.

5.  Set the environment hosts.

    1.  On your DM console, navigate to **Environment** \> **Virtual hosts** \> **default\_host** and select **Host Aliases**.

    2.  Make sure that there is a `*` value for the PushNotificationCluster ports WC\_defaulthost and WC\_defaulthost\_secure that you made a note of earlier, and the WAS proxy ports PROXY\_HTTP\_ADDRESS and PROXY\_HTTPS\_ADDRESS that you made a note of earlier.

    3.  Make sure that there are entries for the WAS application and proxy host names against the PushNotificationCluster ports. If not already set, you must add these manually to the list.

    4.  Save the configuration if prompted.

    5.  Stop, synchronize, and restart the nodes in your environment.

6.  Configure the proxy server.

    1.  Configure the proxy routing actions.

        You need 2 routing actions:

        -   Standard requests to IHS \(HTTP\)
        -   Secure Standard requests to IHS \(HTTPS\)
        1.  On the DM console, navigate to **Servers** \> **Server Types** \> **WebSphere proxy servers** \> **Proxy server name** \> **Proxy Settings** \> **\(expandable\) Proxy Virtual Host Configuration** \> **Proxy actions**.
        2.  In **routing actions**, click **New...** and select **Generic Server Cluster Route...**.
        3.  Enter the name for the generic server cluster that you created earlier for HTTP requests.
        4.  Select **Affinity type**, select **Active affinity** and enter a value of 1800 seconds \(30 minutes\). This is the default expiration time of the DM. If this value has been changed, then change this affinity value to be the same as the DM expiration time.

            !!! note
                
                To determine the current value of the deployment manager expiration time, go to `WAS_APPSERVER_DIR\profiles\DMgrProfile\config\cells\Cell name\applications\isclite.ear\deployments\isclite` and open the file deployment.xml. Locate the value of invalidationTimeout. This is the value of your DM timeout.

        5.  Click **Apply** and save the configuration file.
        6.  Repeat this step for HTTPS, but assign the generic server cluster name for the HTTPS generic cluster that you set up earlier.
    2.  Configure the proxy rule expressions.

        1.  Navigate to **Servers** \> **Server Types** \> **WebSphere proxy servers** \> **Proxy server name** \> **Proxy Settings** \> **\(expandable\) Proxy Virtual Host Configuration** \> **Proxy rule expressions**. Click **New...**.
        2.  Enter a name and click **Subexpression Builder...**.
        3.  Change the values for the following options:
            -   Change the Operand value to `URI Group`.
            -   Change the Operator value to `Not Equals (<>)`.
            -   Change the URI Group value to `the value you set up earlier`.
        4.  Click **Generate Subexpression** and then click **OK**.
        5.  Navigate to **Routing actions** \> **Available routing actions:**. Select the routing action that you set up earlier for HTTP, and then click the arrow adjacent to **Routing actions:** to move the routing action that you selected to **Routing actions:**.
        6.  Click **Apply** and save the configuration file.
        7.  Repeat this step for HTTPS, and use the same URI group that you set up earlier.
    3.  Configure proxy virtual hosts.

        You are now setting up a virtual host for each of the following types of requests:

        -   HTTP requests
        -   HTTPS requests
        !!! note 
            
            The default port values of these requests for the HTTP Server \(IHS\) are port 80 \(for HTTP\) and port 443 \(for HTTPS\). If you changed these port values on your configuration, then make note of the changed values.

        1.  Navigate to **Servers** \> **Server Types** \> **WebSphere proxy servers** \> **Proxy server name** \> **Proxy Settings** \> **\(expandable\) Proxy Virtual Host Configuration** \> **Proxy virtual hosts**. Click **New...**.
        2.  Change the value of **Virtual host name** to `*`.
        3.  Change the value of **Virtual host port** to the value of your HTTP port.
        4.  In **Proxy rule expressions**, assign the correct available proxy rule to the proxy rule expression that you want by clicking the rule, and then clicking the arrow that is adjacent to **Proxy rule expressions**.
        5.  Click **Apply** and save the configuration file if prompted.
        6.  Repeat this step for HTTPS, but set **Virtual host port** to `443`, and assign the HTTPS proxy rule that you previously set up.
7.  Update the LotusConnections-config.xml file.

    1.  On the DM console, navigate to the LotusConnections-config.xml file. The path should be something similar to: /opt2/IBM/WebSphere/AppServer/profiles/Dmgr01/config/cells/pvtdub246Cell01/LotusConnections-config/LotusConnections-config.xml.
    2.  In the LotusConnections-config.xml file, find and replace any reference to a hostname similar to `sloc:static href="http://MACHINENAME.ibm.com" ssl_href="https://MACHINENAME.ibm.com".` to the proxy server hostname.
    3.  Save the file.
    4.  Stop, synchronize, and restart all WAS nodes.
8.  Set the application mappings.

    The application mappings must be set so that all application requests are handled through the HTTP Server \(IHS\), except PushNotification application requests, which are handled directly on the WAS application servers.

    1.  On the DM console, navigate to **Applications** \> **Application Types** \> **WebSphere enterprise applications**.

    2.  For each application listed, except for **PushNotification**:

        1.  Click the application link, and then click **Modules** \> **Manage Modules**.
        2.  Click **Web Module** and then click **Web Module Proxy Configuration**. Not all modules contain this setting, so if no link is found, return to **Manage Modules** in the breadcrumb trail and check the next module. If a link is found, click the link.
        3.  Remove the check from the **Enable Proxy** check box, and click **Apply**. Save the configuration when prompted.
        4.  Check all application modules and make sure that all **Enable Proxy** check boxes have been disabled for each application.
        5.  Repeat this process for all applications in the list.
        6.  Stop, synchronize, and restart all nodes.
        7.  To disable IHS handling of the application requests, on your DM console, navigate to **Applications** \> **Application Types** \> **WebSphere enterprise applications**.
        8.  Click **PushNotification**.
        9.  Click **Manage Modules**. In the **Clusters and servers:** text box, make sure that only the value for **WebSphere:cell=cluster=PushNotificationCluster** is selected.
        10. Select all the modules in the list and then click **Apply**.

            !!! note 
          
                There should be no reference to the IHS server in the **Server** column of the table.

        11. Stop, synchronize, and restart all nodes.
9.  Change the default proxy HTTP port.

    The default proxy port for HTTP requests is port 81. By default, Connections is configured to communicate via port 80. You must change the WAS Proxy HTTP port from 81 to 80.

    1.  On your DM console, navigate to **Servers** \> **Server Types** \> **WebSphere proxy servers** \> **proxy server name** \> **Ports**.
    2.  Select **PROXY\_HTTP\_ADDRESS**.
    3.  Change the port to `80`. Click **Apply** and save the configuration if prompted.
    4.  Repeat this step for **PROXY\_HTTPS\_ADDRESS** but set the port value to `443`. Click **Apply** and save the configuration if prompted.
    5.  Synchronize the WAS Proxy node.
10. Tune the WAS proxy server.

    Once the WAS proxy server has been set up, tune the proxy server to allow for the high number of connections required by the long poll test scenario. Steps to tune the WAS proxy server can be found in [Tuning the WAS proxy server for long poll](t_admin_tuning_WASProxy_t.md).

11. Set up a separate ProxyCoreGroup.

    This ensures that the IHS does not handle any PushNotification requests. The steps to set up a separate ProxyCoreGroup can be found in [Setting up a new proxy core group](t_admin_setting_up_ProxyCoreGroup_t.md).


**Parent topic:** [Setting up and configuring a WAS proxy server for long poll testing](../secure/t_admin_config_was_proxy.md)

