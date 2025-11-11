# Common tasks, concepts and reference information {#appendix .reference}

The common tasks, concepts and reference information are discussed in the following sections.

-   **[Determine customization path](t_determine-customization-path.md)**  
The customization\_path is required when performing most customizations.
-   **[Restart Common application](t_restart-common-app.md)**  
Sometimes restarting the common application is needed to ensure all caches are cleared.
-   **[Tiny Editor Services configuration](c_application-conf.md)**  
The Tiny Editor Services use a configuration file called application.conf, written in [Human-Optimized Config Object Notation](https://github.com/lightbend/config/blob/master/HOCON.md). These settings can be [overridden by JVM environment variables](https://github.com/lightbend/config/blob/master/HOCON.md#conventional-override-by-system-properties) named with the [path of the setting](https://github.com/lightbend/config/blob/master/HOCON.md#paths-as-keys).
-   **[List of valid application.conf settings](r_application-conf.md)**  
A list of valid settings for the Tiny Editors `application.conf`.
-   **[Sample application.conf](r_application-conf-samples.md)**  
A sample configuration for the Tiny Editor Services.
-   **[Disable SSL certificate validation for testing](t_disable-certificate-validation-for-testing.md)**  
This task outlines the process for disabling certificate validation. Do not use these settings in a production environment.
-   **[Toolbar components and the toolbar definition](c_toolbar.md)**  
The toolbar is the main interface of the editor. This section covers how the components of the toolbar relate to the toolbar definition in the config.js.
-   **[The default toolbar configuration](r_toolbar-default.md)**  
The default toolbar used by the Tiny editors.
-   **[The Toolbar customization syntax](r_toolbar-syntax.md)**  
The syntax for the toolbar customization option is written using [Extended Backus–Naur form](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form).
-   **[List of predefined Toolbar objects](r_toolbar-predefined-identifiers.md)**  
Lists all available toolbar groups, menus, placeholders, and commands for Tiny Editors for HCL Connections.
-   **[Default fonts list](r_fonts-default.md)**  
The default list of fonts used by the Tiny editors' font picker.
-   **[The fonts customization syntax](r_fonts-syntax.md)**  
The syntax for the fonts customization option is written using [Extended Backus–Naur form](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form).
-   **[Default colors list](r_colors-default.md)**  
The default list of colors used by the Tiny editors' color picker.
-   **[Sample colors values](r_colors-samples.md)**  
Example colors using different formats.
-   **[The colors customization syntax](r_colors-syntax.md)**  
The syntax for the colors customization option is written using [Extended Backus–Naur form](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form).
-   **[External Plugins for TinyMCE](c_external-plugins.md)**  
TinyMCE is a modular editor where the majority of features are enabled by loading plugins. External plugins give a mechanism for extending TinyMCE as required.
-   **[Connections locations for selectively loading plugins](r_plugins-locations.md)**  
List of the locations for selectively loading plugins.
-   **[The external plugins customization syntax](r_plugins-syntax.md)**  
The syntax for the external plugins option is written using [Extended Backus–Naur form](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form).
-   **[Sample config.js](r_config-js-sample.md)**  
A sample configuration file for the integration.

**Parent topic:**[Tiny Editors for HCL Connections](c_tiny-editors.md)

