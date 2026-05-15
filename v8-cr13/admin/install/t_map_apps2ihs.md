# Mapping applications to IBM HTTP Server 

Map HCL Connections applications to IBM® HTTP Server.

Complete this task only if you did not select to configure IBM HTTP Server during the installation HCL Connections.

If you plan to configure a reverse proxy, see the [Configuring a reverse caching proxy](t_install_deploy_caching_proxy.md) topic.

If you installed and configured IBM HTTP Server after you have installed HCL Connections, your HCL Connections applications are automatically mapped to the web server. However, if you installed and configured IBM HTTP Server before you installed HCL Connections, you must manually map the applications.

To map your HCL Connections applications to IBM HTTP Server and regenerate the plugin, complete the following steps:

1.  Open the WebSphere® Application Server Integrated Solutions Console on the system where you installed the Deployment Manager.

2.  Select **Applications** \> **Application Types** \> **WebSphere enterprise applications**.

3.  Map an HCL Connections application to IBM HTTP Server:

    **Note:** This step instructs you to select webserver1. Ensure that you have defined this web server before you attempt to complete these steps. For more information, see the *Defining IBM HTTP Server* topic.

    1.  Select the cluster on which the application was installed and the web server that will be servicing the application.

    2.  Select **application** \> **Manage Modules**, where application is an HCL Connections application.

    3.  In the **Clusters and Servers** box, select the cluster and server on which you installed the application. If necessary, use the Ctrl key to select both targets.

    4.  Select the check boxes for all the modules and click **Apply**.

    5.  Review the Server details and ensure that both servers are listed there. Click **OK** and then click **Save**.

    6.  Repeat this step for each HCL Connections application.

4.  From the WebSphere Application Server Integrated Solutions Console, select **Servers** \> **Server Types** \> **Web servers** and then click the web server \(webserver1\).

5.  Click **Generate Plug-in**.

6.  Click your web server again and then click **Propagate Plug-in**.

    **Note:** If you have trouble propagating the plug-in on Linux™, restart IBM HTTP Server using the following commands:

    ```
     ./adminctl start
     ./apachectl -k stop
     ./apachectl -k start
    
    ```

7.  Stop and restart the web server.

8.  Synchronize the nodes.

9.  Restart all IBM Connection clusters.

10. Restart the Deployment Manager.


To verify that the mappings are correct, complete the steps in the [Verifying application mappings](t_verify_application_mappings.md) topic.

Test the mappings: open a web browser and try to access each of the applications by specifying the web address using the following syntax:

http://hostname/application\_name

where hostname is the host name of the web server to which you mapped the application and application\_name is the name of the application. Do not specify the port number.

**Parent topic:** [Configuring IBM HTTP Server](../install/c_add_ihs_over.md)
