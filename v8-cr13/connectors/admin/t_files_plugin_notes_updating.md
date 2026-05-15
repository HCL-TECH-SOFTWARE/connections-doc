# Upgrading the HCL Notes client after installing Connection plug-ins for HCL Notes {#t_files_plugin_notes_updating .task}

If you installed the HCL Connections plug-ins for HCL Notes and you are updating your Notes client to 9.0, make sure that HCL Connections is selected on the Notes installation panel when you upgrade.

While you upgrading the existing Notes client to HCL Notes 9.0, make sure that **HCL Connections** is checked on the Notes installation panel. Otherwise, you do not get the sidebar applications for Activities, Files, and Status Updates. The sidebar applications depend on the HCL Connections Business Card plug-in. For example, if you have HCL Connections plug-ins for Notes installed with Notes 8.5.3, then you upgrade the Notes 8.5.3 client to Notes 9.0, select **HCL Connections** as an installation option. If you do not select **HCL Connections**, the Activities and Status Updates sidebar applications will not display after you upgrade the client.

1.  Make sure that your Notes client is closed before you begin the upgrade.

2.  Start the Notes 9.0 installer.

3.  Select **HCL Connections** on the Custom Setup panel.

4.  Click **Finish**.


**Parent topic:**[HCL Connections Plug-ins for HCL Notes](../../connectors/admin/files_plugin_install_overview.md)

