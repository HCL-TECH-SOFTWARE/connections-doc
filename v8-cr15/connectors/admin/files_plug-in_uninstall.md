# Uninstalling the HCL Connections Plug-ins for HCL Notes {#files_plug-in_uninstall .task}

Uninstall the HCL Connections plug-ins to remove them from your HCL Notes® client.

**Attention:** If you are planning to uninstall the Notes client, uninstall the HCL Connections plug-ins first.

You can remove the plug-ins from a single client or run a command to remove them from all plug-in users.

1.  To remove plug-ins from a single Windows® client:

    1.  From the Microsoft® Windows Control Panel, select **Add or Remove Programs** \(on Vista, it is called Programs and Features\), then select **HCL Connections Plug-ins for Notes.**.

    2.  Click **Remove** \(on Microsoft Windows 7 and Vista, it is called Uninstall\), and then click **Yes** to confirm your choice.

2.  To silently remove plug-ins from Windows clients:

    1.  Make sure your Notes client is not running.

    2.  Open a command prompt window. For example, choose **Run** from the Microsoft Windows Start menu and type cmd, then click **OK**.

    3.  Specify the path for the downloaded and unzipped installation file for the plug-ins. For example, c:\\<download folder\>.

    4.  Enter setup.exe -s -x -v"/qn" to remove the plug-ins.

3.  To remove the plug-ins from a single Mac client:.

    1.  Open the folder where you unzipped the ConnectionsAddonInstaller\_Mac.zip file.

    2.  Click unistaller.app, and then click **Yes** to confirm your choice.

4.  To silently remove the plug-ins from Mac clients:

    1.  Make sure your Notes client is not running.

    2.  Open a terminal window.

    3.  Specify the path for the downloaded and unzipped installation file for the plug-ins. For example, /ConnectionsAddonInstaller\_Mac/uninstaller.

    4.  Enter ./addonUninstall -rcphome '/Applications/<App\_Name.app\>/Contents/MacOS' -addonID IBMConnectionsPluginsforLotusNotes to remove the plug-ins. <App\_Name.app\> is Notes.app, Lotus Notes.app, IBM Notes.app or HCL Notes.app.


**Parent topic:**[HCL Connections Plug-ins for HCL Notes](../../connectors/admin/files_plugin_install_overview.md)

