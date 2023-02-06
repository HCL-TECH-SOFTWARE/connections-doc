# Add External TinyMCE Plugins {#setup-editors-configure-add-external-tinymce-plugins .concept}

Where additional customization is required, custom plugins can be loaded into TinyMCE.

## Adding External TinyMCE Plugins { .section}

1.  Using a plain text editor, open config/config.js in the extracted Tiny Editors for HCL Connections package.

    **Note:** Use a plain text editor to avoid inserting invalid formatting or symbols into config.js. Do not use a rich text editor such as Microsoft Word for editing configuration files.

2.  Locate the property [`externalPlugins`](r_config-js-sample.md#externalPlugins) and modify the array to customize the external plugin configuration using the following resources:

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

3.  [Continue configuring the Tiny Editors integration](https://help.hcltechsw.com/connections/v65/admin/install/tiny_editors/t_01-setup_03-editors_01-configure_00-summary.html) or [continue with the installation](https://help.hcltechsw.com/connections/v65/admin/install/tiny_editors/t_01-setup_03-editors_02-install_00-summary.html).

## HCL Connections supported TinyMCE - Plugins { .section}

When enabling external plugins for the TinyMCE Editor, not every plugin has been tested with HCL Connections. In addition, some of the plugins have known issues. While we are always working to improve compatibility with third party products, only the plugins listed in the below table have been successfully tested and are available for support from HCL.

|Category|Tiny MCE Plugin|Notes|
|--------|---------------|-----|
|Plugin - core|Advanced List| |
|Plugin - core|Anchor| |
|Plugin - core|Autolink| |
|Plugin - core|Autoresize| |
|Plugin - core|CharacterMap| |
|Plugin - core|Code Sample|Support added in Tiny Editors for HCL Connections Version: 4.2.0.29|
|Plugin - core|Directionality| |
|Plugin - core|Emoticons| |
|Plugin - core|Full Screen| |
|Plugin - core|Help| |
|Plugin - core|Horizontial Rule| |
|Plugin - core|Image| |
|Plugin - core|Insert Date/Time|Only activatable by externalPlugins setting. Setting added in 4.2.0

|
|Plugin - core|Link| |
|Plugin - core|Lists| |
|Plugin - core|Media| |
|Plugin - core|Nonbreaking Space|Only activatable by externalPlugins setting. Setting added in 4.2.0

|
|Plugin - core|Noneditable|Only activatable by externalPlugins setting. Setting added in 4.2.0

|
|Plugin - core|Preview|Only activatable by externalPlugins setting. Setting added in 4.2.0

|
|Plugin - core|Print|Only activatable by externalPlugins setting. Setting added in 4.2.0

|
|Plugin - core|Quick Tollbar|Only activatable by externalPlugins setting. Setting added in 4.2.0

|
|Plugin - core|Search and Replace| |
|Plugin - core|Table| |
|Plugin - core|Template|Only activatable by externalPlugins setting. Setting added in 4.2.0

|
|Plugin - core|Text Pattern| |
|Plugin - core|Visual Blocks|Only activatable by externalPlugins setting. Setting added in 4.2.0

|
|Plugin - core|Visual Characters|Only activatable by externalPlugins setting. Setting added in 4.2.0

|
|Plugin - core|Word Count| |
|Plugin - Premium|Accessibility Checker| |
|Plugin - Premium|Advanced Code Editor| |
|Plugin - Premium|Case Change| |
|Plugin - Premium|Enhanced Media Embed| |
|Plugin - Premium|Format Painter| |
|Plugin - Premium|Link Checker| |
|Plugin - Premium|Mentions| |
|Plugin - Premium|Page Embed| |
|Plugin - Premium|Permanent Pen| |
|Plugin - Premium|PowerPaste| |
|Plugin - Premium|Spell Checker Pro| |
|Plugin - Premium|AutoCorrect| |
|Plugin - Premium|Advanced Tables| |

**Parent topic:**[Configuring the Tiny Editors integration](../../install/tiny_editors/t_01-setup_03-editors_01-configure_00-summary.md)

**Parent topic:**[Modifying Tiny Editors for HCL Connections](../../install/tiny_editors/t_02-modify_00-summary.md)

**Related information**  


[External Plugins for TinyMCE](../../install/tiny_editors/c_external-plugins.md)

[Connections locations for selectively loading plugins](../../install/tiny_editors/r_plugins-locations.md)

[The external plugins customization syntax](../../install/tiny_editors/r_plugins-syntax.md)

