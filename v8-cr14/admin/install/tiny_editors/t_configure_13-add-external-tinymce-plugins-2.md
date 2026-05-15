# Add External TinyMCE Plugins

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

## HCL Connections supported TinyMCE - Plugins

When enabling external plugins for the TinyMCE Editor, not every plugin has been tested with HCL Connections. In addition, some of the plugins have known issues. While we are always working to improve compatibility with third party products, only the plugins listed in the below table have been successfully tested and are available for support from HCL. 


| Category       | Tiny MCE Plugin         | Notes                                      |
|----------------|-------------------------|--------------------------------------------|
| Plugin - core  | Advanced List           |                                            |
| Plugin - core  | Anchor                  |                                            |
| Plugin - core  | Autolink                |                                            |
| Plugin - core  | Autoresize              |                                            |
| Plugin - core  | Character Map           |                                            |
| Plugin - core  | Code Sample             |                                            |
| Plugin - core  | Directionality          |                                            |
| Plugin - core  | Emoticons               |                                            |
| Plugin - core  | Full Screen             |                                            |
| Plugin - core  | Help                    |                                            |
| Plugin - core  | Horizontal Rule         |                                            |
| Plugin - core  | Image                   |                                            |
| Plugin - core  | Insert Date/Time        | Only activatable by externalPlugins setting. |
| Plugin - core  | Link                    |                                            |
| Plugin - core  | Lists                   |                                            |
| Plugin - core  | Media                   |                                            |
| Plugin - core  | Nonbreaking Space       | Only activatable by externalPlugins setting. |
| Plugin - core  | Noneditable             | Only activatable by externalPlugins setting. |
| Plugin - core  | Preview                 | Only activatable by externalPlugins setting. |
| Plugin - core  | Print                   | Only activatable by externalPlugins setting. |
| Plugin - core  | Quick Toolbar           | Only activatable by externalPlugins setting. |
| Plugin - core  | Search and Replace      |                                            |
| Plugin - core  | Table                   |                                            |
| Plugin - core  | Template                | Only activatable by externalPlugins setting. |
| Plugin - core  | Text Pattern            |                                            |
| Plugin - core  | Visual Blocks           | Only activatable by externalPlugins setting. |
| Plugin - core  | Visual Characters       | Only activatable by externalPlugins setting. |
| Plugin - Premium | Accessibility Checker  |                                            |
| Plugin - Premium | Advanced Code Editor   |                                            |
| Plugin - Premium | Case Change            |                                            |
| Plugin - Premium | Enhanced Media Embed   |                                            |
| Plugin - Premium | Format Painter         |                                            |
| Plugin - Premium | Link Checker           |                                            |
| Plugin - Premium | Mentions               |                                            |
| Plugin - Premium | Page Embed             |                                            |
| Plugin - Premium | Permanent Pen          |                                            |
| Plugin - Premium | PowerPaste             |                                            |
| Plugin - Premium | Spell Checker Pro      |                                            |
| Plugin - Premium | AutoCorrect            |                                            |
| Plugin - Premium | Advanced Tables        |                                            |



**Related information**  


[External Plugins for TinyMCE](c_external-plugins.md)

[Connections locations for selectively loading plugins](r_plugins-locations.md)

[The external plugins customization syntax](r_plugins-syntax.md)

