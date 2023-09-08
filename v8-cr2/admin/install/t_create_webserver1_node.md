# Defining IBM HTTP Server {#t_create_webserver1_node .task}

Define IBM® HTTP Server to manage web connections. If you select to configure HTTP Server at the beginning of the Connections installation, you would perform this task at that point; otherwise you would perform this after installation completes.

HCL Connections uses a web server as the entry point for all the applications.

This procedure describes how to create a web server using the Integrated Solutions Console.

To define IBM HTTP Server, complete the following steps:

1.  Start the IBM HTTP Administration Server:

    -   Linux®:
        1.  Open a command prompt and navigate to the following directory:
            -   Linux: /opt/IBM/HTTPServer/bin
        2.  Enter the following command: ./adminctl start
    -   Windows®:
        1.  Open the Services window in the Windows Control Panel.
        2.  Verify that the IBM HTTP Administration Server service is started. If this service is not running, start it
2.  Log in to the WebSphere® Application Server Integrated Solutions Console on the Deployment Manager and select **System administration** \> **Nodes** \> **Add Node**.

3.  Select **Unmanaged node**and click **Next**.

4.  Specify the properties of the node by providing values in the following fields:

    Name
    :   Enter the name of the node.

    Host Name
    :   Enter the fully qualified DNS host name for IBM HTTP Server. For example: webserver.example.com.

    Platform
    :   Select the operating system type that hosts your IBM HTTP Server.

    Click **OK** and then click **Save**.

5.  Select **Servers** \> **Server Types** \> **Web servers** and click **New**.

6.  Provide values for the following fields:

    Select node
    :   Select the node that you specified in Step 4.

    Server name
    :   Enter the name of the your web server. The default value is webserver1.

    Type
    :   Select **IBM HTTP Server**.

7.  Click **Next**.

8.  Select the default web server template and click **Next**.

9.  On the **Enter the properties for the new web server** page, check the paths and make adjustments if necessary, and then enter the user name and password that you specified when you installed IBM HTTP Server. Confirm the password and click **Next**.

10. Confirm that you want to create the new web server.

11. Click **Finish** and then click **Save**.

12. Disable Edge Side Include \(ESI\) cache by selecting **Plug-in properties** for your web server, and then selecting **Caching** and deselecting **Enable Edge Side Include \(ESI\) processing to cache the responses**.

13. Synchronize all the nodes.

14. Select **Servers** \> **Server Types** \> **Web servers** and click the link to your web server.

15. Select the check box for your web server.

16. Click **Generate Plug-in**.

17. Select the check box for your web server.

18. Click **Propagate Plug-in**.

19. Select **Servers** \> **Server Types** \> **Web servers** and click the link to your web server.

20. Click **Plug-in properties** and then click **Copy to Web Server key store directory**.

    **Note:** If the plugin-key.kdb file is on a different system from the IBM HTTP Server system, copy it manually from the WebSphere Application Server system to the IBM HTTP Server system.

21. Restart IBM HTTP Server.


Complete the steps in the [Configuring IBM HTTP Server for an encrypted connection](t_configure_ihs.md#) topic.

Configure IBM HTTP Server to handle file downloads from the Activities, Files, Libraries, Mobile, and Wikis applications. For information on this configuration, refer to *Configuring file downloads through IBM HTTP Server*.

If IBM HTTP Server does not load the plug-in, check whether the httpd.conf points to the file in ../IBM/WebSphere/Plugins/config/webserver1, which is an incorrect path. If so, comment out this configuration and replace it with the following IBM HTTP Server directory. For example:

```
# WebSpherePluginConfig "C:\IBM\**WebSphere**\Plugins\config\webserver1\plugin-cfg.xml" 
WebSpherePluginConfig "C:\IBM\**HTTPServer**\Plugins\config\webserver1\plugin-cfg.xml" 
```

**Parent topic:**[Configuring IBM HTTP Server](../install/c_add_ihs_over.md)

**Next topic:**[Mapping applications to IBM HTTP Server](../install/t_map_apps2ihs.md)

