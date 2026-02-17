# Connecting to an HCL Connections or Connections Multi-tenant site {#connectingtoanibmconnectionsserver .task}

You must provide information about a Connections server before you can share files and information between Microsoft™ Windows™ and Connections.

After you connect to a Connections site, you can interact with that site from Microsoft Office and Windows Explorer. You will need to know the URL of the site and you may need login credentials.

**Procedure:**

1.  Start creating a connection by doing one of the following:
    -   Open Microsoft Windows Explorer.
        -   Right-click **HCL Connections** in the navigation pane.

            **Note:** Windows 11 users can find the HCL Connections context menu under the **Show More Options** menu.

        -   Select **Connect to a site**
    -   Find the HCL Connections icon in the task bar.
        -   Right-click on the **HCL Connections** in the task bar.
        -   Select **Connect to a site**
    -   Open a document in a Microsoft Office application.
        -   Click on **HCL Connections** tab.
        -   Click **Connect to a site**
2.  In the **Site URL** field, type the URL you use to connect to Connections. For example, https://connections.server.com or https://connections.server.com:port.
3.  In the **Display name** field, type the name that you want to display for this site in Microsoft Windows applications or use the suggested name.
4.  Click **Next** to proceed. The Connect to Site details panel is displayed.
5.  If you are connecting to a Connections Multi-tenant site, your connection details are pre-filled. You can review the settings and click **Connect** to complete the connection.
6.  If you are connecting to an on-premises Connection site, you will need to setup the following connection details:
    1.  Select the appropriate authentication type from the dropdown list.
    2.  Enter your credentials if required.
    3.  Click **Connect**.
7.  Depending on your authentication type, you may be prompted to enter your credentials in the displayed browser window to finish creating the connection.
8.  After authenticating, you may be prompted to create a local sync folder. This allows you to keep local copies of selected files in sync with the copy on the Connections server.

Anytime after you connect to a site, you can check for feature updates to refresh your configuration. For example, if your server administrator turns on file sync for a server that you connect to, checking for feature updates will make the file sync feature available for you to use. To check for updates:

-   Right-click the server name in the HCL Connections section of the Windows Explorer navigator.
-   Choose **Update site to enable new features**. A notification message lets you know that the update is complete and that you might need to restart to see changes.

