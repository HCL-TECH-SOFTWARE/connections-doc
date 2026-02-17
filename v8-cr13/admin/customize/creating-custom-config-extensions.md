# Creating custom configuration extensions

Custom config extensions allow customization or theming of the Connections 8.0 UI and its components.

The UI and corresponding components have a variety of customization options and display according to the configuration that you provide. You can do this through extension points that apply to the Connections UI components and lift the baseline configuration.

If you have Component Pack installed, use the Connections app registry to define such extensions. This service offers the most flexibility and provides some enhanced features, like translation capabilities. Otherwise, if Component Pack is not included in your Connections deployment, use window-scoped JavaScript objects.

!!! Note

    The custom config extensions do not replace previous customization options, but instead provide a different angle of applying them. Due to the nature of implementation for some components in Connections 8.0, those existing customizations are no longer supported, though some might still function. For more information on areas to be aware of or to consider migrating, refer to [Customizing the user interface](t_admin_common_customize_main.md).

## Customizable components

Currently, the following components leverage extensible configuration for customization:

**Header**

For the header, you can reposition the logo, search bar, and actions contained within. Additionally, you can add custom logos or text to be displayed. For more information, refer to [Customizing the header](customizing-header.md).

**Side navigation bar**

For the side navigation bar, you can adjust the menu entries to be displayed. For more information, refer to [Customizing the side navigation bar](customizing-side-navigation.md).

**Administrative banner**

The administrative banner is an optional component that you can enable or disable. You can define a custom message to show to all users, and a message type that defines the appearance of the banner on the UI. For more information on customizing the banner, refer to [Administering the display of a site-wide banner](../admin/admin_banner_onprem.md).

**Custom styles**

Using custom styles, you can apply CSS properties to modify the style of UI components in a generic fashion. For more information, refer to [Customizing the look and feel of HCL Connections](customizing-look-and-feel.md).


**Parent topic**: [Customizing the user interface](t_admin_common_customize_main.md)