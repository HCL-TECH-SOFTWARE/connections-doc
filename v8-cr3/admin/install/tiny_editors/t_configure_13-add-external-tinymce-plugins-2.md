# Add External TinyMCE Plugins {#setup-editors-configure-add-external-tinymce-plugins .task}

Where additional customization is required, custom plugins can be loaded into TinyMCE.

1.  2.  Locate the property [`externalPlugins`](r_config-js-sample.md#externalPlugins) and modify the array to customize the external plugin configuration using the following resources:

    -   [External Plugins for TinyMCE](c_external-plugins.md).
    -   [Create a Plugin for TinyMCE](https://www.tiny.cloud/docs/advanced/creating-a-plugin/).
    -   [The external plugins customization syntax](r_plugins-syntax.md).
    -   [Connections locations for selectively loading plugins](r_plugins-locations.md).
    **Tip:** If the external plugin array is empty \(`externalPlugins: [],`\), no external plugins will be loaded.

    ```
    externalPlugins: [
      {
        name: 'demo',
        url: '/connections/resources/web/tiny.demo/plugins/demo/plugin.min.js',
        on: ['wikis']
      }
    ],
    ```

3.  
**Related information**  


[External Plugins for TinyMCE](c_external-plugins.md)

[Connections locations for selectively loading plugins](r_plugins-locations.md)

[The external plugins customization syntax](r_plugins-syntax.md)

