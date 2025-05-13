# Administering gadgets for HCL Connections and widgets for Home page {#c_admin_homepage_add_custom_widgets .concept}

You can extend the functionality of the Home page application by adding custom widgets and extend HCL Connections by adding OpenSocial gadgets. To make the widgets and gadgets available for use, you can add them from the Administration view and then enable them for use.

The widgets that you add to the Home page can be based on the iWidget specification, which uses technology based on JavaScript™, XML, HTML, and CSS, or the OpenSocial gadget specification. The widget files are stored on an HTTP server.

The gadgets that you add to HCL Connections need to be based on the OpenSocial gadget specification, which enables you to surface gadgets in an OpenSocial container that can interact with an OAuth 2.0 protected service

The widget files can be bundled as EAR applications and deployed on IBM® WebSphere® Application Server. They can also be hosted in LAMP, .NET, and other environments.

You can add two types of third-party widget to the Home page:

Opened by default
:   This type of widget displays by default, but can be removed or hidden. It can also be moved to a different location. For example, the To Do List widget that displays in the Updates view is opened by default.

Optional
:   This type of widget is available for users to add to their Home page if they select it from the widget catalog. Optional widgets can be added, removed, hidden, or moved by Home page users.

Any widget can be used as a default or optional widget.

Third-party widgets can be added to the side column in the Updates view and to any column in the My Page view.

-   **[Configuring widgets](../admin/t_admin_homepage_add_widgets.md)**  
Add and configure widgets on the Home, Communities, and Profiles pages.
-   **[Enabling widgets](../admin/t_admin_homepage_enable_widgets.md)**  
You need to enable widgets before they can display on the Home page or elsewhere in HCL Connections.
-   **[Disabling widgets](../admin/t_admin_homepage_disable_widgets.md)**  
You can disable widgets from displaying on the Home page or elsewhere in HCL Connections when you no longer want them to be available to your users.
-   **[Editing widgets](../admin/t_admin_homepage_edit_widgets.md)**  
Edit a widget to change its name, description, or deployment descriptor.
-   **[Removing widgets](../admin/t_admin_homepage_remove_widget.md)**  
If a third-party widget is no longer used or needed, you can remove it from the widget catalog. You cannot remove HCL Connections widgets from the catalog, you can only disable them.

**Parent topic:**[Administering the Widget container](../admin/t_admin_common_widget_container.md)

