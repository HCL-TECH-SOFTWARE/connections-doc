# The external plugins customization syntax {#plugins-syntax .reference}

The syntax for the external plugins option is written using [Extended Backus–Naur form](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form).

!!! note 
    
    For simplicity: White space has been omitted, single quoted strings have been used, and object properties have been given a strict ordering. These restrictions can be relaxed according to normal JavaScript syntax.

```sh
plugin_name = ? JavaScript string containing the name of the plugin as used in registration of the plugin with `tinymce.PluginManager.add` ? ;

plugin_url ? JavaScript string containing the URL to the plugin ? ;

plugin_settings ? JavaScript object containing settings that should be merged when the plugin is active ?

location = "'comments'" | "'editors'" | "'activities'" | "'activities-comments'" | "'blogs'" | "'blogs-comments'" | "'communities'" | "'forums'" | "'forums-comments'" | "'profiles'" | "'wikis'" | "'wikis-comments'" | "'richContent'" | "'unknown'" | "'unknown-commments'" ;

locations = "[" , location , { "," , location } , "]" ;

external_plugin = "{", "'name':", plugin_name , "," , "'url':" , plugin_url , [ "," , "'settings':" , plugin_settings ] , [ "," , "'on':" , locations ] , [ "," , "'off':" , locations ] , "}"

external_plugins = "[", [ external_plugin , { "," , external_plugin } ] , "]";
```

**Parent topic:** [Common tasks, concepts and reference information](r_appendix.md)

**Related information**  


[External Plugins for TinyMCE](c_external-plugins.md)

[Add External TinyMCE Plugins](t_configure_13-add-external-tinymce-plugins-2.md)

