# Uninstalling the HCL Connections for Mac plug-in {#t_files_windows_user_install .task}

Users can remove IBM® Connections for Mac following these steps.

There is no uninstall script for HCL Connections for Mac. to remove the software, you can run commands in Terminal to uninstall and remove all data.

**Note:** Backup any local sync files you wish to preserve before executing any of the uninstall commands.

1.  To completely uninstall the app, remove all configuration data, and remove all local sync files, run these commands in a terminal session. Replace user in the command with the logged-in Mac user name.
2.  Open Finder and navigate to **Applications** \> **Utilities**, then double-click **Terminal** to launch it.

3.  Execute these commands to remove the app.

    ```
    sudo rm -rf "/users/<user>/Library/Application Support/com.ibm.AutoSyncMonitor"
    sudo rm -f  "/users/<user>/Library/Preferences/com.ibm.AutoSyncMonitor.plist"
    sudo rm -rf "/Applications/HCL Connections sync.app"
    ```

4.  Execute this command to clean up all sync folders created by HCL Connections for Mac.

5.  On OSX 10.9, you must restart after performing these operations.


**Parent topic:**[HCL Connections for Mac](../../connectors/enduser/msdesktop_mac_over.md)

