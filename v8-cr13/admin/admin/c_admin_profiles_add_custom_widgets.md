# Adding custom widgets to Profiles {#c_admin_profiles_add_custom_widgets .concept}

Extend the functionality of the Profiles application by adding custom widgets.

You can use custom widgets to bring additional functionality to Profiles. Custom widgets must use the iWidget specification, which uses technology based on JavaScript™, XML, HTML, and CSS. The widget files are stored on an HTTP server. The widgets can be bundled as EAR applications and deployed on IBM® WebSphere® Application Server. They can also be hosted in LAMP, .NET, and other environments.

You need to register the widgets developed by iWidget developers to make them available for use in HCL Connections. You do this by configuring the widget attributes defined by the iWidget developer in the widgets-config.xml file.

Profiles supports the use of mandated widgets only. Mandated widgets can be placed in any of the columns on the My Profile, Directory, and My Network pages. This type of widget exists in every profile and cannot be removed or hidden. Mandated widgets can also exist outside a profile, for example, they can show up in a search results page.

Refer to the following topics for more information about adding custom widgets to Profiles:

-   **[Enabling custom widgets for Profiles](../admin/t_admin_profiles_develop_custom_widgets.md)**  
To make custom widgets available for use in Profiles, you need to configure the widgets in the widget definition file, widgets-config.xml.
-   **[Profiles widget configuration variables](../admin/r_admin_substitution_variables.md)**  
The following table lists the configuration variables that can be used for the url, navBarLink, helpLink, and item or @value attributes when configuring a third-party widget for integration with Profiles. The @value attribute refers to the value attribute in the item of the itemSet configuration elements in the widgets-config.xml file.

**Parent topic:** [Configuring widgets in Profiles](../admin/c_admin_profiles_configure_widgets.md)

**Related information**  


[Managing widgets in Profiles](../admin/t_admin_profiles_edit_widgets.md)

[Adding custom widgets to Communities](../admin/c_admin_communities_add_custom_widgets.md)

