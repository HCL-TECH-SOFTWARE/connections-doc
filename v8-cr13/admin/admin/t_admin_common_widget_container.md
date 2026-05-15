# Administering the Widget container {#t_admin_widget_container .concept}

The Widget Container is the HCL Connections-specific integration of the Common Rendering Engine, also known as the CRE.

The CRE is the successor to Mashup Enabler and adds the ability to render OpenSocial gadgets as well as iWidgets. Throughout the HCL Connections documentation, the Connections instance of CRE will be referred to as the *Widget Container.* This section of the documentation is specific to the administration of the Widget Container. More details on the CRE in general can be found in the [IBM® Social Business Development wiki](http://www-10.lotus.com/ldd/appdevwiki.nsf/xpViewCategories.xsp?lookupName=Common%20rendering%20engine).

**Note:** If you wish to add gadgets deployed externally, such as iGoogle gadgets, you must configure locked domains. Locking domains isolates semi-trusted gadgets and prevents them from accessing SSO tokens or via DOM access to the parent page of the gadget iFrame that can be used to forward sensitive data to external sites. For more information on locked domains, refer to [Enabling locked domains](../install/t_post_install_cre11_conn_security_locked.md).

-   **[Administering gadgets for HCL Connections and widgets for Home page](../admin/c_admin_homepage_add_custom_widgets.md)**  
You can extend the functionality of the Home page application by adding custom widgets and extend HCL Connections by adding OpenSocial gadgets. To make the widgets and gadgets available for use, you can add them from the Administration view and then enable them for use.
-   **[Gadget registration commands](../admin/r_admin_gadget_reg_ws_commands.md)**  
Administrators can register gadgets for the Home page, and register widgets for the Communities, and Profiles applications, using the NewsWidgetCatalogService commands or the Administration view on the Home page.
-   **[Configuring OAuth for custom gadgets](../customize/r_admin_common_oauth_config_homepage_gadgets.md)**  
The HCL Connections™ supports an OAuth 2.0 consumer proxy that allows the Homepage component to surface gadgets in an OpenSocial container that can interact with an OAuth 2.0 protected service. In order for this proxy to function, there are a series of new administration commands that are exposed in the News service to define OAuth 2.0 providers, clients, and the associated gadget that will interact with the protected service.
-   **[Registering HCL Notes as a consumer of the Activity Stream and Embedded Experience gadgets](../admin/t_admin_reg_notes_as_gadget_for_aa_ee.md)**  
HCL Connections and Domino® administrators can work together to facilitate seamless integration between HCL Connections and Notes® and iNotes®. Your administrator can export the Activity Stream and Embedded Experience gadgets and hand them off to the Domino® administrator to be included in the corporate Widget Catalog where they can then be deployed to end users using Widget policies.
-   **[Configuring per-host proxy access rules for OpenSocial gadgets](../admin/t_admin_common_cre11_conn_security_proxy.md)**  
Proxy access is configured on a per-gadget level. This configuration is distinct from the proxy configuration file in that it specifies which end points may be contacted rather than what tokens or headers may be sent. In general the proxy access is configured during gadget registration by setting the **Server access** setting to external \(outside the SSO domain\) or all server access. Beyond these two settings, an administrator may expand or restrict access further by specifying custom proxy or \(in cases where they wish for extra security\) may enumerate per-gadget-per-server \(and even per user\) custom proxy rules. Custom proxy rules are defined in a separate configuration file.
-   **[Controlling the maximum file upload size for the Connections OpenSocial Container](../admin/t_admin_controllmax_file_upload_size_open_social_container.md)**  
You can use the container file upload policy to manage the file upload size for the HCL Connections OpenSocial Container.
-   **[Clearing the widget cache](../admin/t_admin_clear_widget_cache.md)**  
Two methods of clearing the widget cache are available: using the HCL Connections Home page administrative user interface or using a NewsWidgetCatalogService command.
-   **[Security token properties](../admin/r_admin_oauth_security__token_props.md)**  
You can configure security token properties in the LCC/opensocial-config.xml in the LotusConnections-config directory.

**Parent topic:**[Administering common areas](../admin/c_admin_act_wsadmin.md)

**Related information**  


[Configuring the AJAX proxy](../secure/t_admin_config_ajax_proxy.md)

