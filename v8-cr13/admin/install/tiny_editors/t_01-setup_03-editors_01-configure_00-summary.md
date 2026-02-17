# Configuring the Tiny Editors integration {#setup-editors-configure-summary .task}

The editors can be customized prior to installation by modifying the config/config.js file in the extracted Tiny Editors for HCL Connections package.

1.  To reuse existing customizations to the Tiny Editors:

    1.  Navigate to [customization\_path](t_determine-customization-path.md)/javascript/tiny/editors/connections

    2.  Copy the `config.js` file and overwrite the `config.js` provided in the Tiny Editors for HCL Connections package.

2.  Then apply any of the following customizations.


    -   **[Selecting an editor](t_configure_01-select-editor.md)**  
    This option is used to select the editor for HCL Connections™. If the [Tiny Editors Selector service](t_01-setup_01-selector_00-summary.md) is installed, you can choose to assign the editor based on user or security group.
    -   **[Configuring the Tiny Editors Selector roles](t_configure_01b-assign-users.md)**  
    Assigning an editor to users or roles is performed by configuring the [Tiny Editors Selector service](t_01-setup_01-selector_00-summary.md). This step can also be done after installation of Tiny Editors for HCL Connections is complete.
    -   **[Configuring the Tiny Editors Selector editor priority](t_configure_01c-editor-priority.md)**  
    Assigning the editor priority is performed by configuring the [Tiny Editors Selector service](t_01-setup_01-selector_00-summary.md). This step can also be done after the installation of Tiny Editors for HCL Connections is complete.
    -   **[Modify the Editor CSS](t_configure_02-modify-editor-css.md)**  
    Customizing the look of HCL Connections™ using custom CSS.
    -   **[Change Spelling Service URL](t_configure_03-change-spelling-service-url.md)**  
    If the Tiny Editor Services are not running on the same server as HCL Connections™, the spelling service URL is required.
    -   **[Enable or Disable Spellchecking](t_configure_04-enable-or-disable-spellchecking.md)**  
    This section describes the process for enabling and disabling the use of the Tiny Editors Services spelling service.
    -   **[Change Link Service URL](t_configure_05-change-link-service-url.md)**  
    If the Tiny Editor Services are not running on the same server as HCL Connections™, the link service URL is required.
    -   **[Enable or Disable Link Validation](t_configure_06-enable-or-disable-link-validation.md)**  
    This section describes the process for enabling and disabling the Tiny Editors use of the Tiny Editors Services hyperlinking service for link validation.
    -   **[Enable or Disable Link Embedding](t_configure_07-enable-or-disable-link-embeding.md)**  
    This section describes the process for enabling and disabling automatic media embedding in the Tiny Editors.
    -   **[Customize the Toolbar](t_configure_08-customize-toolbar.md)**  
    The section covers customizing the Tiny Editors toolbar \(not including contextual items\).
    -   **[Set Fontpicker fonts list](t_configure_09-set-fontpicker-fonts.md)**  
    The section covers customizing the list of fonts provided for the font-picker in the Tiny Editors.
    -   **[Set Colorpicker colors](t_configure_10-set-colorpicker-colors.md)**  
    Customize the colors shown in the Tiny Editors colorpicker, and to keep or remove the custom color picker.
    -   **[Enable or Disable built-in macros](t_configure_11-enable-or-disable-built-in-macros.md)**  
    This section covers enabling or disabling the Tiny Editors built-in macros: useful text styling macros.
    -   **[Add custom macros](t_configure_12-add-custom-macros.md)**  
    Creating simple macros to provide useful work shortcuts.
    -   **[Add External TinyMCE Plugins](t_configure_13-add-external-tinymce-plugins.md)**  
    Where additional customization is required, custom plugins can be loaded into TinyMCE.
    -   **[Configure additional TinyMCE settings](t_configure_14-additional-tinymce-settings.md)**  
    TinyMCE has many options not configured by the integration and they can be set by providing them in the additional settings object.

**Parent topic:** [Installing the Tiny Editors integration](t_01-setup_03-editors_00-summary.md)

**Next topic:** [Installing Tiny Editors integration](t_01-setup_03-editors_02-install_00-summary.md)

