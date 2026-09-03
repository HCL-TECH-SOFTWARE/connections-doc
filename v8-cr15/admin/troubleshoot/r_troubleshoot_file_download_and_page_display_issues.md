# Troubleshooting file download and page display issues {#r_troubleshoot_file_download_and_page_display_issues .reference}

Enabling ESI cache in IHS will have an adverse affect on HCL Connections™ 6.0 causing some features to fail. Therefore, Edge Side Include \(ESI\) cache in IHS should be disabled for Connections 6.0.

Activities Files failing to download through HIS is a known issue in Connections when ESI cache in IHS is enabled.

Disable the ESI cache by completing the following steps:

1.  In the WebSphere Integrated Solutions Console, select **Servers** \> **Server Types** \> **Web servers**.
2.  Click **<web server name\>** \> **Plug-in properties**.
3.  Under **Additional Properties**, click **Caching**.
4.  Deselect **Enable Edge Side Include \(ESI\) processing to cache the responses**.
5.  Save the changes.
6.  Restart the web server.

**Parent topic:**[Troubleshooting tips](../troubleshoot/ts_c_ts_tips_overview.md)

