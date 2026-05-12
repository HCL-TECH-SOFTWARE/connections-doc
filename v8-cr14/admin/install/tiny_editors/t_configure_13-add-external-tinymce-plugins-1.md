# Add External TinyMCE Plugins {#setup-editors-configure-add-external-tinymce-plugins .task}

Where additional customization is required, custom plugins can be loaded into TinyMCE.

1.  Using a plain text editor, open [customization\_path](t_determine-customization-path.md)/javascript/tiny/editors/connections/config.js.

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

3.  When you have finished making configuration changes, follow the [post-customization steps](https://help.hcltechsw.com/connections/v6/admin/customize/t_admin_common_customize_postreq.html) to ensure the server cache is updated.

    !!! note
      
        If the configuration changes do not take affect, restart the [Common enterprise application](t_restart-common-app.md) to force a cache update.


**Parent topic:**[Modifying Tiny Editors for HCL Connections](t_02-modify_00-summary.md)

