# Configuring widgets {#t_admin_homepage_add_widgets .task}

Add and configure widgets on the Home, Communities, and Profiles pages.

Before you can add gadgets that are deployed externally, you must configure locked domains. Locking domains isolates semi-trusted gadgets and prevents them from accessing SSO tokens. Similarly, you must prevent DOM access to the parent page of the gadget iFrame because it might be used to forward sensitive data to external sites. For more information about locked domains, see the *Enabling locked domains* topic.

You can add widgets to the widget catalog to meet the needs of your users. Use the widget catalog to administer OpenSocial gadgets for HCL Connections, including Embedded Experience and Share Dialog gadgets, and gadgets and iWidgets that are specific to the Home page. Ensure that the widgets that you add to the catalog are from trusted sources. To configure widgets for communities, see the *Administering widgets and remote applications* topic.

1.  To add a widget to the widget catalog, complete the following steps:
2.  Log in to HCL Connections as an administrator.

    **Note:** To add widgets to the Home page, you must be logged in as an administrator. If you do not see an **Administration** option display under the **My Page** option in the navigation sidebar on the Home page, this means that you are not configured as an administrator of the Home page app. For more information, see the *Configuring the Home page administrator* topic.

3.  Open the Administration view.

4.  Click **Add another widget** to display the **Add new widget** form.

5.  Specify whether you are adding a widget that is based on the iWidget specification or the OpenSocial gadget specification.

    To enable users to integrate applications such as Facebook, Twitter, and LinkedIn into their HCL Connections client experience, select **OpenSocial gadget**. Selecting **OpenSocial gadget** opens the **Gadget settings with Activity stream or Share dialog** subform, where you can specify the following options:

    1.  For **Security**, select either a **Trusted** or a **Restricted** security type.

        Make your selection based on the following considerations:

        -   Trusted gadgets can access a wider selection of container APIs and they can interact with HCL Connections data. Even though a gadget is marked as trusted, its data access is still isolated from SSO data when used in combination with locked domains.
        -   Select **Use SSO token** for trusted enterprise gadgets. Selecting this feature disables all the security that is provided by locked domains for this particular gadget.
        -   In general, gadgets must be written to use OAuth unless they are connecting to a legacy system that is not OAuth enabled. Since HCL Connections v4.0, all of the Connections APIs are OAuth-enabled. Currently, SSO is not a standard OpenSocial feature, but specific to the Common Rendering Engine \(CRE\). Some IBM® Containers, such as Notes® Social Edition, do not support the SSO feature.
        -   Restricted gadgets are limited in terms of the OpenSocial features. For example, they are not able to open model dialogs. In general, scope gadget feature access as narrowly as possible. Use this setting if the gadget does not require the additional page API features provided to trusted gadgets.
        **Note:** If locked domains are not configured, do not add external \(restricted\) gadgets to HCL Connections.

    2.  For **UI integration points** select where the gadget is to be inserted in the user interface: **Show in Share dialog** or **Show for Activity stream events** or both.

        **Note:** Your gadgets are displayed after the HCL Connections gadgets in the Share dialog.

    3.  Select the **Server access via proxy** preference:

        -   **Only outside the intranet** prevents the gadget from accessing your intranet servers. Unless configured, the system deems a server as part of the intranet if it is part of the WebSphere® SSO domain. If this scoping is too narrow, it can be expanded using more configuration settings.
        -   **All servers** allows the gadget to access URLs both in your intranet and outside it.
        -   **Custom rule defined for this gadget in the proxy-policy.dynamic file** enforces settings that are defined in the policy file. For more information, see the *Configuring per-host proxy access rules for OpenSocial gadgets* topic.
    4.  In the **Service Mappings** section, create a new mapping between an OAuth client, such as Facebook or Twitter, and its associated service. Also, you can edit or remove an existing mapping.

        **Note:** This setting manages the association of the clients with individual gadgets.OAuth clients must be pre-configured using wsadmin commands.

        1.  Click **Add Mapping** to create a new mapping between an OAuth service and an OAuth client. In the fields that display, select an **OAuth Client** name and enter the associated **Service Name**.
        2.  Select an existing mapping in the map list and then click **Edit Mapping** to update the mapping.
        3.  Select an existing mapping in the map list and then click **Delete Mapping** to remove that mapping from the list.
        For more information about OAuth tokens, see the *Configuring OAuth for custom gadgets*topic.

6.  Enter a name for the widget in the **Widget Title** field.

7.  Enter a short description of the widget in the **Description** field.

8.  Enter the web address for the XML widget descriptor in the **URL Address** field.

    This address must be prefixed with HTTPS and must be an absolute web address.

9.  Enter the widget location in the **Secure URL Address** field.

    This address must be prefixed with HTTPS and must be an absolute web address.

10. Enter the web address for an icon to associate with the widget in the **Icon URL** field. **Icon URL** represents the widget when it is docked in the widget palette.

11. Enter the location of an icon to display for the widget in the **Icon Secure URL** field.

    This icon is displayed when the widget is docked in the content palette.

12. Select **Use HCL Connections specific tags** to indicate if the widget deployment descriptor uses specific HCL Connections tags to represent the URLs of the HCL Connections applications.

13. To display the widget in the My Page view, select **Display in the My Page view**.

    You must display the widget in the My Page view or the Updates view, or both.

14. To display the widget in the Updates view, select **Display in the Updates view**.

    You must display the widget in the My Page view or the Updates view, or both.

15. To display the widget when users open the Home page for the first time, select **Opened by default**.

    The widget doesn't display for existing users, but it is available from the widget palette so that they can add it whenever they want.

16. To enable multiple instances of the widget to be used, select **Multiple widgets**.

    Each widget instance has its own properties. For example, if you are using a widget that displays bookmarks for a specific tag, you can enable multiple instances of the widget so that you can follow different tags in each widget.

    **Note:** This setting is applicable only for iWidgets. Only one instance of an OpenSocial gadget can be loaded at a time.

17. If there are specific HCL Connections applications that must be included in your deployment for the widget to function correctly, select the required applications in the **Prerequisites** area.

    **Note:** When an HCL Connections application is selected as a prerequisite but that application is not installed, the widget is not displayed on the Home page. For gadgets that declare dependencies this way, they act as though they are disabled for the purposes of whitelisting.

18. Click **Save**.


If you add widgets that are hosted on third-party servers, you might need to update your proxy configuration. For more information, see the *Configuring the AJAX proxy for a specific application* topic.

**Parent topic:**[Administering gadgets for HCL Connections and widgets for Home page](../admin/c_admin_homepage_add_custom_widgets_homepage.md)

**Related information**  


[Configuring the Home page administrator](../install/t_create_admin.md)

[Configuring per-host proxy access rules for OpenSocial gadgets](../admin/t_admin_common_cre11_conn_security_proxy.md)

[Configuring the AJAX proxy for a specific application](../secure/t_admin_config_ajax_proxy_feature.md)

[Enabling widgets](../admin/t_admin_homepage_enable_widgets_homepage.md)

