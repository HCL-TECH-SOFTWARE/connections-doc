# Customizing {#c_customize_overview .concept}

Customize HCL Connections™ to fit your environment.

This documentation helps you customize your deployment of Connections. **HCL Support can address questions about the customization process, but cannot address questions about the particulars of your customization.** If you customized an earlier version of Connections, there is no migration path provided for importing your changes into Connections 8.0 or later. Before upgrading, review and make a note of your existing customizations so that you can verify them post-migration and rework if necessary. In addition, customization work might no longer be valid if a customized file is updated with a subsequent fix pack or interim fix.

Additional information about the CSS and HTML markup structure used in Connections is available in the [Connections Developer Guide](https://ds_infolib.hcltechsw.com/ldd/lcwiki.nsf/xpViewCategories.xsp?lookupName=API%20Documentation).

Review these topics to help you customize Connections for your organization, or to help you build components that integrate with Connections.

-   **[Customization best practices](../customize/c_customize_best_practices.md)**  
Use the following guidelines to help you to implement and manage customizations in your deployment of HCL Connections.
-   **[Injecting customizations into Connections pages](../customize/customize_inject_customizations.md)**  
HCL Connections™ Customizer is a proxy service that lets you modify the HCL Connections™ user experience. Customizer intercepts and modifies requests from clients and responses from servers, so it can customize anything that flows through it, such as the behavior of APIs or the look-and-feel of the user interface.
-   **[Customizing the user interface](../customize/t_admin_common_customize_main.md)**  
The user interface has been redesigned in Connections 8.0, and with it, the way of applying customizations.
-   **[Customizing notifications](../customize/c_customize_notifications.md)**  
The content of the notifications sent by HCL Connections is defined in templates that are processed by the FreeMarker engine.
-   **[Adding new ways to share content](../customize/t_customize_sharebox_gadgets.md)**  
Create your own gadgets and add them to the Share dialog.
-   **[Customizing Profiles](../customize/c_admin_profiles_customizing.md)**  
Customize the Profiles application to define the core data model for people within your deployment and tailor the presentation of profile content to meet your organization’s requirements.
-   **[Using Profiles and Communities business cards](../customize/c_admin_profiles_biz_cards.md)**  
Extend your web application by integrating the Profiles and Communities business cards in to the application.
-   **[Customizing the Wikis welcome page](../admin/t_customize_wikis_welcome_page.md)**  
Customize the welcome page of the Wikis application.
-   **[Post-customization step](../customize/t_admin_common_customize_postreq.md)**  
Edit a configuration property so users see your changes the next time they log in, without having to clear their web browser cache.

**Parent topic:** [Administering Connections 8.0](../welcome/welcome_admin.md)

**Related information**  


[Saving your customizations](../migrate/c_configuration_changes_after_update.md)

