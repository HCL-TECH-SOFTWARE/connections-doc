# Managing policies and preferences with a group policy {#t_ms_office_group_policies .task}

Use a group policy administrative template to manage preferences and policies across an enterprise.

If you want to set policies and preferences for a group of users, use the Group Policy Administrative Template. This console provides a single user interface through which to manage Group Policy across an enterprise. To use the template, load it into the Group Policy Management Console snap-in.

1.  To start the Group Policy Management Console, open a command line window and enter gpedit.msc.

2.  Select **Computer Configuration** \> **Administrative Templates**.

3.  Right-click on the **Administrative Templates** node and select **Add/Remove Templates**.

4.  Select **Add**.

5.  Navigate to the installation directory for the plug-ins. For example, C:\\Program Files \(x86\)\\IBM\\Connections Desktop Plugins.

6.  Select the appropriate template for your Windows version \(For example, IBMConnections.adm or IBMConnections64.adm\).


There will be two newly created nodes with the following new entries:

-   **Computer Configuration** \> **Administrative Templates** \> **Classic Administrative Templates \(ADM\)** \> **HCL Connections Desktop Plug-ins for Microsoft Windows**
    -   Temporary File Cleanup - Enable/Disable Cleanup
    -   Temporary File Cleanup - Policy
    -   Temporary File Cleanup - Minimum File Access Time
    -   Temporary File Cleanup - Cleanup Frequency
    -   Hide Shell Extension
    -   Hide Shell Extension - Policy
    -   Hide Desktop Icon - Policy
    -   Hide Desktop Icon - New Start Panel
    -   Hide Desktop Icon - Classic Start Menu
    -   SendLink MailApp
    -   SendLink MailApp - Policy
    -   Unpublished Prompt
    -   Unpublished Prompt - Policy
    -   Show Information Bubbles
    -   Show Information Bubbles - Policy
    -   Monitor Warn On Close
    -   Monitor Warn On Close - Policy
    -   Scan Ignore Extensions
    -   Scan Ignore Extensions - Policy
    -   Password Save - Policy
    -   Default Authentication Type
    -   Default Authentication Type - Policy
    -   Default Authentication Extension
    -   Basic Authentication Encoding Type
    -   Cache Directory Root
    -   Help URL
    -   Connect to Site Help URL
    -   Connect to Site Server URL
    -   Connect to Site Server Name
    -   Disable Activities Support
    -   Disable Blogs Support
    -   Disable Wikis Support
    -   Disable Bookmarks Support
    -   Disable Community Bookmarks Support
    -   Disable Profiles Support
    -   Disable Search Support
    -   Encrypt Files
    -   Encrypt Files -Policy
    -   Enable Metrics
    -   Share Intent
    -   Share Intent - Policy
    -   Share Propagation
    -   Share Propagation - Policy
    -   Disable Groups Support
    -   Disable Public Sharing Support
    -   AddDocument
    -   AddDocument Policy
    -   DoubleClick
    -   DoubleClick Policy
    -   Hide AddTo Group
-   **User Configuration** \> **Administrative Templates** \> **Classic Administrative Templates \(ADM\)** \> **HCL Connections Desktop Plug-ins for Microsoft Windows**
    -   Hide Desktop Icon - New Start Panel
    -   Hide Desktop Icon - Classic Start Menu

**Parent topic:**[HCL Connections Desktop Plug-ins for Microsoft Windows](../../connectors/enduser/c_files_window_install_ovr.md)

