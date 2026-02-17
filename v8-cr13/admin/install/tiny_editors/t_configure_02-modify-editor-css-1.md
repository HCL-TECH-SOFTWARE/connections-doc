# Modify the Editor CSS {#setup-editors-configure-modify-editor-css .task}

Customizing the look of HCL Connections™ using custom CSS.

1.  Using a plain text editor, open [customization\_path](t_determine-customization-path.md)/javascript/tiny/editors/connections/config.js.

    !!! note 
        
        Use a plain text editor to avoid inserting invalid formatting or symbols into config.js. Do not use a rich text editor such as Microsoft Word for editing configuration files.

2.  Locate the property [`cssUrl`](r_config-js-sample.md#cssUrl) such as `cssUrl: dojo.moduleUrl('tiny.editors.connections', 'tiny-editors.css'),` and change to the URL for the custom CSS.

    Valid values for `cssUrl` are either a JavaScript string with an absolute URL, or a Dojo API generated URL.

    ```sh
    cssUrl: dojo.moduleUrl('your-osgi-package', 'path-to-css-file-within-package'),
    ```

    ```sh
    cssUrl: 'https://example.com/path/to/css/file.css',
    ```

3.  Locate the property [`cssLite`](r_config-js-sample.md#cssLite) such as `cssLite: dojo.moduleUrl('tiny.editors.connections', 'tiny-editors-lite.css'),` and change to the URL for the custom CSS for the comment editor.

    Valid values for `cssLite` are either a JavaScript string with an absolute URL, or a Dojo API generated URL.

4.  When you have finished making configuration changes, follow the [post-customization steps](https://help.hcltechsw.com/connections/v6/admin/customize/t_admin_common_customize_postreq.html) to ensure the server cache is updated.

    !!! note 
        
        If the configuration changes do not take affect, [restart the Common enterprise application](t_restart-common-app.md) to force a cache update.


**Parent topic:** [Modifying Tiny Editors for HCL Connections](t_02-modify_00-summary.md)

