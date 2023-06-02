# Changing the HCL Connections logo {#t_customize_change_logo .task}

To customize HCL Connections to reflect the look and feel of your organization, you can replace the default HCL Connections logo in the header with your company logo.

## Before you begin

With the redesigned Connections 8.0 user interface, you can generally apply customizations by providing custom configuration to the Connections system. In this configuration, you would specify key-value pairs that reflect your desired customizations, such as your own logo image in this case.

Create a custom configuration for the header area using the instructions in [Custom Config Extensions](https://github.com/HCL-TECH-SOFTWARE/connections-ui-docs/tree/master/custom-config-extensions) on the Connections UI Docs. 

## Procedure

To change the HCL Connections logo in the header, you need to define the `image` property in the header configuration by specifying the `src` tag. This tag points to the actual image displayed as the logo. You can reference any static image that is accessible to you and is in a supported format, such as .jpeg, .png, .svg, and so on.

For more information and examples, refer to [Custom configuration for the header area](https://github.com/HCL-TECH-SOFTWARE/connections-ui-docs/tree/master/main-areas/header-area#example) in the Connections UI docs.


**Parent topic:** [Customizing images](../customize/c_customize_images.md)

**Related information**  


[Enabling live user interface customization editing mode](../customize/t_customize_enable_custom_debugging.md)

[Determining where to save your customizations](../customize/t_customize_find_custom_directory.md)

[Post-customization step](../customize/t_admin_common_customize_postreq.md)

[Replacing images](../customize/t_customize_replace_logo.md)

[Customizing the login page](../customize/t_admin_common_customize_login_screen.md)

