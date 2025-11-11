# Configure additional TinyMCE settings {#setup-editors-configure-add-external-tinymce-plugins .task}

TinyMCE has many options not configured by the integration and they can be set by providing them in the additional settings object.

1.  Using a plain text editor, open config/config.js in the extracted Tiny Editors for HCL Connections package.

    !!! note 
      
        Use a plain text editor to avoid inserting invalid formatting or symbols into config.js. Do not use a rich text editor such as Microsoft Word for editing configuration files.

2.  Locate the property [`additionalSettings`](r_config-js-sample.md#additionalSettings) and modify the object to supply additional TinyMCE initialization settings that are not already used by the integration.

    ```sh
    additionalSettings: {
      fontsize_formats: "8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt"
    },
    ```

3.  [Continue configuring the Tiny Editors integration](t_01-setup_03-editors_01-configure_00-summary.md) or [continue with the installation](t_01-setup_03-editors_02-install_00-summary.md).


**Parent topic:** [Configuring the Tiny Editors integration](t_01-setup_03-editors_01-configure_00-summary.md)

