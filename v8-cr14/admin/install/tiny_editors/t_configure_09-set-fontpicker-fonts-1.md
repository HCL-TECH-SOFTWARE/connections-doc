# Set Fontpicker fonts list {#setup-editors-configure-set-fontpicker-fonts .task}

The section covers customizing the list of fonts provided for the font-picker in the Tiny Editors.

1.  Using a plain text editor, open [customization\_path](t_determine-customization-path.md)/javascript/tiny/editors/connections/config.js.

    !!! note 
        
        Use a plain text editor to avoid inserting invalid formatting or symbols into config.js. Do not use a rich text editor such as Microsoft Word for editing configuration files.

2.  Locate the property [`fonts`](r_config-js-sample.md#fonts) and modify the array to customize the fonts list configuration using the following resources:

    -   [Default fonts list](r_fonts-default.md).
    -   [Sample fonts list configurations](r_fonts-samples.md).
    -   [The fonts customization syntax](r_fonts-syntax.md).
    
    If the font list array is empty \(`fonts: [],`\) [the default list](r_fonts-default.md) will be used.

3.  When you have finished making configuration changes, follow the [post-customization steps](https://help.hcltechsw.com/connections/v6/admin/customize/t_admin_common_customize_postreq.html) to ensure the server cache is updated.

    !!! note 
        
        If the configuration changes do not take affect, [restart the Common enterprise application](t_restart-common-app.md) to force a cache update.


**Parent topic:** [Modifying Tiny Editors for HCL Connections](t_02-modify_00-summary.md)

