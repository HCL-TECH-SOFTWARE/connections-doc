# Administering the Home page from the user interface {#c_admin_homepage_ui .concept}

You can make site-wide changes to the Home page application directly from the Home page user interface.

Users with the Home page administrator role have access to an additional Administration view on their Home page. When you are assigned this role, you can see an **Administration** option in the navigation sidebar, under the **My Page** option. Select this option to access a simple, form-based user interface that allows you to perform key tasks.

From the Administration view you can:

-   Add custom widgets for use on the Home page
-   Enable and disable widgets
-   Enable and disable the My Page view

The Home page caches the XML descriptors of widgets in memory on startup. You can refresh the version of the XML descriptor cached in memory for a particular widget by selecting the widget from the **Enabled widgets** list in the Administration view and clicking **Refresh cache**. When you refresh the cache, the Home page fetches the latest version of the XML descriptor for the selected widget and updates the memory cache. This option is typically only used for third-party widgets at development time.

Changes made using the administration user interface occur in real time and are immediately reflected in the Home page user interface.

The following topics provide more information about administering the Home page:

-   **[Administering gadgets for HCL Connections and widgets for Home page](../admin/c_admin_homepage_add_custom_widgets_homepage.md)**  
You can extend the functionality of the Home page application by adding custom widgets and extend HCL Connections by adding OpenSocial gadgets. To make the widgets and gadgets available for use, you can add them from the Administration view and then enable them for use.
-   **[Enabling and disabling the My Page view](../admin/t_admin_homepage_disable_widgets_tab.md)**  
You can control whether the My Page view is available to your users by enabling or disabling it from the Administration view.

**Parent topic:** [Administering the Home page](../admin/c_admin_homepage_intro.md)

