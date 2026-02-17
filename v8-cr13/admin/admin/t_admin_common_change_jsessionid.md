# Changing the name of the session cookie ID {#t_admin_common_change_jsessionid .task}

The session cookie ID for HCL Connections is named JSESSIONID by default. Other products hosted by the WebSphere® Application Server often use the same name for their session cookie. If IBM® HTTP Server is hosting multiple web servers, you might want to change the cookie name of one of them to prevent the cookie from being lost when the user is redirected from one product to another.

1.  If multiple products are hosted on the IBM WebSphere Application Server cell, by default the other application and WebSphere Application Server servers will have conflicting use of the JSESSIONID session ID cookie. For each WebSphere Application Server that uses the same virtual host \(hostname\) as the one that hosts Lotus® Connections applications, do the following:

    1.  In the WebSphere Application Server Integrated Solutions Console, expand **Servers** in the navigation pane, and then select **Server Types** \> **WebSphere application servers**.

    2.  Click the first clustered server.

    3.  Expand **Web Container Settings** under **Container Settings**, and then select **Web container**.

    4.  Under **Additional Properties**, click **Session management**.

    5.  Select **Enable cookies**.

    6.  Enter a different cookie name in the **Cookie name** field, for example, LCSESSIONID.

    7.  Click **OK**, click **Save**, and then click **Save** again.

    8.  Repeat with each clustered server.

2.  Restart the WebSphere Application Server or servers.

3.  Regenerate the plugin-cfg.xml file for the IBM HTTP Server in the WebSphere Application Server Integrated Solutions Console. To do so, complete the following steps:

    1.  Open the WebSphere Application Server Integrated Solutions Console.
    2.  Expand **Servers**, and then select **Server Types** \> **Web servers**.
    3.  Select the check box next to the IBM HTTP Server name. For example: webserver1.
    4.  Click **Generate Plug-in** to regenerate the plugin-cfg.xml file.
    5.  If necessary, click **Propagate Plug-in** to copy the plugin-cfg.xml file from the local directory where the Application Server is installed to the remote machine.
4.  Restart the IBM HTTP Server.


**Parent topic:**[System maintenance](../admin/c_admin_common_maintaining.md)

