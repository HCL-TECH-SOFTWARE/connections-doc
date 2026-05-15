# Modify the Editor CSS {#setup-editors-configure-modify-editor-css .task}

Customizing the look of HCL Connections™ using custom CSS.

1.  Using a plain text editor, open config/config.js in the extracted Tiny Editors for HCL Connections package.

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

4.  [Continue configuring the Tiny Editors integration](t_01-setup_03-editors_01-configure_00-summary.md) or [continue with the installation](t_01-setup_03-editors_02-install_00-summary.md).


**Parent topic:** [Configuring the Tiny Editors integration](t_01-setup_03-editors_01-configure_00-summary.md)

