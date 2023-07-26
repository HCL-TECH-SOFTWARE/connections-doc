# Customizing the user interface {#t_admin_common_customize_main}

The user interface has been redesigned in Connections 8.0, and with it, the way of applying customizations.

Due to the nature of the 8.0 UI redesign, legacy approaches to UI customization in Connections 7.0 and earlier versions are now unsupported. Some of the methods, such as customization for product strings and the Connections footer, might still work. However others, such as using CSS to override existing themes, will likely fail. The same applies to customizations for components that have been replaced or updated in the 8.0 UI. A good example is the logo, which is now part of the header component. This means that the previous approach to customizing the logo no longer applies, as you would now need to do it using the header configuration. 

For a better understanding of how to apply UI customizations in Connections 8.0, refer to [Creating custom configuration extensions](creating-custom-config-extensions.md).

!!! note

    The issue of delayed display for style and header customizations has been fixed. The `cnx8-ui.js` now checks for any existing cached customizations before the React components load, that is at the time when the UI element wrappers are created. It immediately applies the customizations without showing the defaults first.

## Impact on legacy customizations

For a gauge of what can be expected to work and what may need to be upgraded or disregarded in [Customizing](https://help.hcltechsw.com/connections/v7/admin/customize/c_customize_overview.html) of the 7.0 documentation, we differentiate between the following categories of customization:

### Functional customizations

Most functional customizations are still valid and can be expected to work. This does not apply to areas that are not available or visible anymore within the UI, for example the previous header. 

JSP and JavaScript customizations may be subject to updates. If there are existing customizations in your system, you need to verify them against the respective files and code fragments in the core of the new 8.0 release. One area where changes can be expected is the Profiles application.

In general, JSPs and JavaScript (OSGi) modules are still heavily used and can be adjusted the same way as in previous versions.

### Cosmetic customizations

Most legacy cosmetic customizations are still valid, but they may appear differently now due to the worked UI and respective changes. This does not apply to areas that are not available or visible anymore within the UI, for example the previous header. 

CSS customizations in particular may be invalidated due to the nature of UI changes and consolidated styles. We outline the suggested way of applying style customizations in [Customizing the look and feel of HCL Connections](customizing-look-and-feel.md).

!!!note

    The UI update may result in breaking UI-based automation (for example, DOM-driven testing). Depending on the implementation and required elements, this might require changes to reflect the new UI makeup. 

### Globalization

When it comes to localization and customization of text, the legacy customizations are generally still valid. The 8.0 release introduces new strings and replaces old ones in various areas, for example the Home page and Profiles, so these may need to be merged into existing customization property files.

Many of the new UI components, such as the [side navigation bar](customizing-side-navigation.md), now also use a different foundation for managing translations. For the new components, you can apply new translations using the [custom config extensions](creating-custom-config-extensions.md).

## Main UI areas

The UI consists of the following main areas:

![Image](images/main-areas-overview.png)

- [Header](customizing-header.md) consists of three areas that house the logo, search box, share actions, the language selector, and theme switcher.
- [Search box](customizing-search.md) allows you to find content that you're looking for, for example the pages you recently visited (for Component Pack deployments only) or quick results via typeahead. 
- [Side navigation bar](customizing-side-navigation.md) contains menus that are specific to the available Connections apps and important user links.
- [Top navigation bar](customizing-navigation.md) contains top-level links that are connected to the application a user is currently viewing.
- [Third-level navigation](customizing-navigation.md) contains menus that are specific to the application a user is currently viewing.
- [Main content](customizing-main-content.md) contains content that is specific to each application.
- [Important To Me (ITM) bar](customizing-itm.md) contains shortcuts to your important colleagues and communities, as well as relevant suggestions for these.


**Parent topic:** [Customizing](../customize/c_customize_overview.md)