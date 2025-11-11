# Customize the Toolbar {#setup-editors-configure-customize-toolbar .task}

The section covers customizing the Tiny Editors toolbar \(not including contextual items\).

1.  Using a plain text editor, open [customization\_path](t_determine-customization-path.md)/javascript/tiny/editors/connections/config.js.

    !!! note 
        
        Use a plain text editor to avoid inserting invalid formatting or symbols into config.js. Do not use a rich text editor such as Microsoft Word for editing configuration files.

2.  Locate the property [`toolbar`](r_config-js-sample.md#toolbar) and modify the array to customize the toolbar configuration using the following resources:

    -   [Toolbar components and the toolbar definition](c_toolbar.md).
    -   [The default toolbar configuration](r_toolbar-default.md).
    -   [The Toolbar customization syntax](r_toolbar-syntax.md).
    -   [List of predefined Toolbar objects](r_toolbar-predefined-identifiers.md).

3.  When you have finished making configuration changes, follow the [post-customization steps](https://help.hcltechsw.com/connections/v6/admin/customize/t_admin_common_customize_postreq.html) to ensure the server cache is updated.

    !!! note 
        
        If the configuration changes do not take affect, [restart the Common enterprise application](t_restart-common-app.md) to force a cache update.


**Parent topic:** [Modifying Tiny Editors for HCL Connections](t_02-modify_00-summary.md)

