# Clearing the widget cache {#t_admin_clear_widget_cache .task}

Two methods of clearing the widget cache are available: using the HCL Connections Home page administrative user interface or using a NewsWidgetCatalogService command.

On theHome page \> Administration page click**Refresh cache** to clear the Widget Container-related caches. This action forces a cached copy of a gadget or iWidget from the Widget Container cache. Refreshing the cache typically is used during development to allow a user to see changes to the gadget or iWidget immediately.

Running the NewsWidgetCatalogService.clearWidgetCaches\(\) clears cached widget.xml files from your server without needing to restart your system. If a gadget or iWidget.xml has been updated and you want to force it to be reread by the system, simply call this command as follows:

1.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager: app\_server\_root\\profiles\\dm\_profile\_root\\binwhere app\_server\_root is the WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01. You must start the client from this directory or subsequent commands that you enter do not execute correctly.
2.  Start the News Jython script interpreter using the following command:

    ```
    execfile("newsAdmin.py")
    ```

    If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

3.  To clear the cache, enter the following command:

    ```
    wsadmin>NewsWidgetCatalogService.clearWidgetCaches() 
    ```


**Parent topic:**[Administering the Widget container](../admin/t_admin_common_widget_container.md)

