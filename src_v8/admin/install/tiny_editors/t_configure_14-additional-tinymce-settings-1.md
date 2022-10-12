# Configure additional TinyMCE settings {#setup-editors-configure-add-external-tinymce-plugins .task}

TinyMCE has many options not configured by the integration and they can be set by providing them in the additional settings object.

1.  Using a plain text editor, open [customization\_path](t_determine-customization-path.md)/javascript/tiny/editors/connections/config.js.

    **Note:** Use a plain text editor to avoid inserting invalid formatting or symbols into config.js. Do not use a rich text editor such as Microsoft Word for editing configuration files.

2.  Locate the property [`additionalSettings`](r_config-js-sample.md#additionalSettings) and modify the object to supply additional TinyMCE initialization settings that are not already used by the integration.

    ```
    additionalSettings: {
      fontsize_formats: "8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt"
    },
    ```

3.  When you have finished making configuration changes, follow the [post-customization steps](https://help.hcltechsw.com/connections/v6/admin/customize/t_admin_common_customize_postreq.html) to ensure the server cache is updated.

    **Note:** If the configuration changes do not take affect, [restart the Common enterprise application](t_restart-common-app.md) to force a cache update.


