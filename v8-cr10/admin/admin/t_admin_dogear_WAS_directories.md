# Changing the location of the favicon cache {#t_admin_dogear_WAS_directories .task}

Change the default directory for the favicon cache from the IBM® websphere Application Server \(WAS\) administrator console.

By default, the favicon cache is stored in the HCL Connections data directory under Bookmarks. The variable is stored in the WebSphere® Application Server variables. You can change the location of the favicon cache by updating the WebSphere Application Server variable. To change the locations, complete the following steps:

Follow these steps to change the default directory of the favicon cache or the full-text index.

1.  Launch the WebSphere Application Server Integrated Solutions Console.

2.  Select **Environment** \> **WebSphere variables**.

3.  Select **DOGEAR\_FAVICON\_DIR** from the list of WebSphere variables.

4.  Enter a new location for the variable in the **Value** field and click **Apply**.

5.  Click **OK**.

6.  Restart the Bookmarks server for your changes to take effect.


**Parent topic:**[Administering Bookmarks](../admin/c_admin_dogerar_intro.md)

