# External Plugins for TinyMCE {#external-plugins .concept}

TinyMCE is a modular editor where the majority of features are enabled by loading plugins. External plugins give a mechanism for extending TinyMCE as required.

[TinyMCE plugins](https://www.tiny.cloud/docs/advanced/creating-a-plugin/) are JavaScript files which register a name and a callback function with TinyMCE when they are loaded. When a TinyMCE instance is created, any plugins listed in the configuration will be loaded and the registered function will be called, passing it into the TinyMCE editor object.

Plugins are bundled with TinyMCE in a location relative to the main editor script file, but TinyMCE also allows loading the plugins from a specified URL via the `external_plugins` option.

The Tiny Editors integration also provides the ability to selectively load these external plugins based on the editor location. For example: Only loading a track-changes plugin on Wiki pages where multiple users can collaborate. The plugins can be selectively turned on in certain locations or simply loaded everywhere but certain locations.

!!! note 
  
    If multiple external plugins are provided their load order is browser dependent and may not be in the order listed.

The following example shows the properties of an external plugin which would be one entry in a list.

```
{
  name: '...',
  url: '...',
  settings: {
    ...
  },
  on: [...],
  off: [...]
}
```

Where:

name
:   is the name used to register the plugin to TinyMCE in the plugin code.

url
:   is the path to the JavaScript file containing the plugin.

settings
:   is an optional JavaScript object with settings specific to the plugin which will be merged into the TinyMCE settings. Any settings already set by the integration can not be overridden using this property.

on
:   is an optional list of strings containing [editor locations](r_plugins-locations.md) that the plugin will be loaded unless listed in `off`. If this setting is not provided then it will default to all locations.

off
:   is an optional list of strings containing [editor locations](r_plugins-locations.md) that the plugin won't be loaded. If this setting is not provided then it will default to no locations.

**Parent topic:**[Common tasks, concepts and reference information](r_appendix.md)

**Related information**  


[Add External TinyMCE Plugins](t_configure_13-add-external-tinymce-plugins-2.md)

[Connections locations for selectively loading plugins](r_plugins-locations.md)

[The external plugins customization syntax](r_plugins-syntax.md)

