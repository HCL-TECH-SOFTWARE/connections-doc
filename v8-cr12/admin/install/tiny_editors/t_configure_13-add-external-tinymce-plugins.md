# Add External TinyMCE Plugins {#setup-editors-configure-add-external-tinymce-plugins .task}

Where additional customization is required, custom plugins can be loaded into TinyMCE.

1.  Using a plain text editor, open `config/config.js` in the extracted Tiny Editors for HCL Connections package.

    !!! note
    
        Use a plain text editor to avoid inserting invalid formatting or symbols into `config.js`. Do not use a rich text editor such as Microsoft Word for editing configuration files.

2.  Locate the property [`externalPlugins`](r_config-js-sample.md#externalPlugins) and modify the array to customize the external plugin configuration using the following resources:

    -   [External Plugins for TinyMCE](c_external-plugins.md).
    -   [Create a Plugin for TinyMCE](https://www.tiny.cloud/docs/advanced/creating-a-plugin/).
    -   [The external plugins customization syntax](r_plugins-syntax.md).
    -   [Connections locations for selectively loading plugins](r_plugins-locations.md).

    !!! tip
        
        If the external plugin array is empty \(`externalPlugins: [],`\), no external plugins will be loaded.

    ```
    externalPlugins: [
      {
        name: 'demo',
        url: '/connections/resources/web/tiny.demo/plugins/demo/plugin.min.js',
        on: ['wikis']
      }
    ],
    ```

3.  [Continue configuring the Tiny Editors integration](t_01-setup_03-editors_01-configure_00-summary.md) or [continue with the installation](t_01-setup_03-editors_02-install_00-summary.md).


**Parent topic:** [Configuring the Tiny Editors integration](t_01-setup_03-editors_01-configure_00-summary.md)

