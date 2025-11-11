# Configure additional TinyMCE settings {#setup-editors-configure-add-external-tinymce-plugins .task}

TinyMCE has many options not configured by the integration and they can be set by providing them in the additional settings object.

1.  Using a plain text editor, open [customization\_path](t_determine-customization-path.md)/javascript/tiny/editors/connections/config.js.

    !!! note 
        
        Use a plain text editor to avoid inserting invalid formatting or symbols into config.js. Do not use a rich text editor such as Microsoft Word for editing configuration files.

2.  Locate the property [`additionalSettings`](r_config-js-sample.md#additionalSettings) and modify the object to supply additional TinyMCE initialization settings that are not already used by the integration.

    ```sh
    additionalSettings: {
      fontsize_formats: "8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt"
    },
    ```
    
3.  To change the default styling values within TinyMCE, define a custom class within `config.js`.
    
    ```sh
    forced_root_block_attrs: { 'class': 'my-custom-class-name'}
    ```
    
4.  Apply your custom CSS with your defined class name to two places; the TinyMCE CSS file and your Connections custom.css file.

    1. Edit the file defined in [Modify the Editor CSS](t_configure_02-modify-editor-css.md)
    2. Apply the same CSS with your custom class names to the general purpose front-end custom CSS file.

     ```
      customizationDir/themes/hikariTheme/custom.css
     ```
    
5.  When you have finished making configuration changes, follow the [post-customization steps](https://help.hcltechsw.com/connections/v6/admin/customize/t_admin_common_customize_postreq.html) to ensure the server cache is updated.

    !!! note 
        
        If the configuration changes do not take affect, [restart the Common enterprise application](t_restart-common-app.md) to force a cache update.


**Parent topic:** [Modifying Tiny Editors for HCL Connections](t_02-modify_00-summary.md)

