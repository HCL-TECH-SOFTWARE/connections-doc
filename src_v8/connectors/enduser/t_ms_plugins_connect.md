# Connecting to an HCL Connections or Connections Cloud site {#connectingtoanibmconnectionsserver .task}

You must provide information about a Connections server or a Connections Cloud server before you can share files and information between Microsoft™ Windows™ and Connections or Connections Cloud.

After you connect to a Connections or Connections Cloud site, you can interact with that site from Microsoft Office and Windows Explorer. For more information, see [Connecting to an HCL Connections site](t_ms_plugins_connect.md).

Determine which solution you are connecting to and then follow that procedure.

-   Connections Cloud
-   Connections multitenant
-   On-premise Connections

**Procedure: Connecting to a Cloud solution**

1.  Start creating a connection by doing one of the following:
    -   Open Microsoft Windows Explorer.
        -   Right-click **HCL Connections** in the navigation pane.
        -   Select **Connect to Cloud**
    -   Locate the HCL Connections icon in the task bar.
        -   Right-click on the **HCL Connections** in the task bar.
        -   Select **Connect to Cloud**
2.  Enter your userid for the HCL Connections Cloud and select **OK**. If you have a userid in more than one geographical data center, you will be prompted to select a data center.
3.  Depending on how your organization has configured your authentication, you will either be prompted to enter your password or you will be directed to a web site where you will need to enter your credentials.
4.  After authenticating, you may be prompted to create a local sync folder. This allows you to keep local copies of selected files in sync with the copy on the Connections server.

**Procedure: Connecting to a multitenant Connections solution**

1.  Start creating a connection by doing one of the following:
    -   Open Microsoft Windows Explorer.
        -   Right-click **HCL Connections** in the navigation pane.
        -   Select **Connect to a site**
    -   Find the HCL Connections icon in the task bar.
        -   Right-click on the **HCL Connections** in the task bar.
        -   Select **Connect to a site**
    -   Open a document in a Microsoft Office application.
        -   Click the **HCL Connections** tab.
        -   Click **Connect to a site**.
2.  In the **Site URL** field, type the URL you use to connect to Connections. For example, https://connections.server.com or https://connections.server.com:port.
3.  In the **Display name** field, type the name that you want to display for this site in Microsoft Windows applications or use the suggested name.
4.  You do not need to enter a user id or password on this panel.
5.  Select the Open Standard for Authorization \(OAuth\) authentication type in the dropdown and select Connect.
6.  Enter your credentials in the displayed browser window to finish creating the connections.
7.  After authenticating, you may be prompted to create a local sync folder. This allows you to keep local copies of selected files in sync with the copy on the Connections server.

**Procedure: Connecting to an on-premise solution**

1.  Start creating a connection by doing one of the following:
    -   Open Microsoft Windows Explorer.
        -   Right-click **HCL Connections** in the navigation pane.
        -   Select **Connect to a site**
    -   Find the HCL Connections icon in the task bar.
        -   Right-click on the **HCL Connections** in the task bar.
        -   Select **Connect to a site**
    -   Open a document in a Microsoft Office application.
        -   Click the **HCL Connections** tab.
        -   Click **Connect to a site**.
2.  In the **Site URL** field, type the URL you use to connect to Connections. For example, https://connections.server.com or https://connections.server.com:port.
3.  In the **Display name** field, type the name that you want to display for this site in Microsoft Windows applications or use the suggested name.
4.  You do not need to enter a user id or password on this panel.
5.  Select the Open Standard for Authorization \(OAuth\) authentication type in the dropdown and select Connect.
6.  Enter your credentials in the displayed browser window to finish creating the connections.
7.  After authenticating, you may be prompted to create a local sync folder. This allows you to keep local copies of selected files in sync with the copy on the Connections server.

Anytime after you connect to a site, you can check for feature updates to refresh your configuration. For example, if your server administrator turns on file sync for a server that you connect to, checking for feature updates will make the file sync feature available for you to use. To check for updates:

-   Right-click the server name in the HCL Connections section of the Windows Explorer navigator.
-   Choose **Update site to enable new features**. A notification message lets you know that the update is complete and that you might need to restart to see changes.

**Parent topic:**[HCL Connections Desktop Plug-ins for Microsoft Windows](../../connectors/enduser/c_files_window_install_ovr.md)

