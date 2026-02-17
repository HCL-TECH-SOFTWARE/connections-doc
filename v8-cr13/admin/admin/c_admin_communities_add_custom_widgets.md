# Adding custom widgets to Communities {#c_admin_pc_add_custom_extensions .concept}

Extend the functions of the Communities application by adding custom widgets. To make the widgets available for use in Communities, you need to configure the widgets in the widget definition file, widgets-config.xml.

You can use custom widgets to bring more functions to the Communities application. Making custom widgets available gives community owners greater control and flexibility over the content of a community. The widgets must use the iWidget specification, which uses technology based on JavaScript™, XML, HTML, and CSS. The widget files are stored on an HTTP server. Widget files can be hosted anywhere once they are accessible to browsers using HTTP. This can include the following environments:

-   As files placed on an HTTP server.
-   Bundled as an EAR application and deployed on IBM WebSphere Application Server.
-   Deployed in LAMP, .NET, or other application environments.

You need to register the widgets that are developed by iWidget developers to make them available for use in HCL Connections. Register widgets by configuring the widget attributes defined by the iWidget developer in the widgets-config.xml file.

You can add three types of custom widget to HCL Connections:

**Mandated**
:   This type of widget exists in every community and cannot be removed or hidden. Mandated widgets can exist outside a community. For example, widgets can show up in a search results page. This type of widget can be placed in any of the three columns on the overview page. Mandated widgets can also be placed in the first column under the tag cloud in Communities. In Communities, the Recent Updates and Members widgets are mandated widgets.

**Added by default**
:   This type of widget displays by default, but can be removed or hidden. It can also be moved to a different location. In Communities the Forums, Bookmarks, Files, and Status Updates widgets are all added by default.

**Optional**
:   This type of widget is not included by default. Optional widgets can be added, removed, hidden, and moved by community owners.

Any widget can be used as a mandated, default, or optional widget.

Refer to the following sections for topics on adding custom widgets to Communities:

-   **[Enabling custom widgets for Communities](../admin/t_admin_communities_develop_custom_widgets.md)**  
To make custom widgets available for use in Communities, configure the widgets in the Communities section of the widget definition file, widgets-config.xml.
-   **[Communities widget configuration substitution variables](../admin/r_admin_substitution_variables_communities.md)**  
The following table lists the configuration substitution variables that can be used for the url, navBarLink, helpLink, and item or @value attributes. Use these variables to configure a third-party widget for integration with Communities. The @value attribute refers to the value attribute in the item of the itemSet configuration elements in the widgets-config.xml file.

**Parent topic:** [Administering widgets and remote applications](../admin/c_admin_communities_administering_widgets.md)

**Related information**  


[Adding custom widgets to Profiles](../admin/c_admin_profiles_add_custom_widgets.md)

