# Set Fontpicker fonts list {#setup-editors-configure-set-fontpicker-fonts .task}

The section covers customizing the list of fonts provided for the font-picker in the Tiny Editors.

1.  Using a plain text editor, open config/config.js in the extracted Tiny Editors for HCL Connections package.

    !!! note 
    
        Use a plain text editor to avoid inserting invalid formatting or symbols into config.js. Do not use a rich text editor such as Microsoft Word for editing configuration files.

2.  Locate the property [`fonts`](r_config-js-sample.md#fonts) and modify the array to customize the fonts list configuration using the following resources:

    -   [Default fonts list](r_fonts-default.md).
    -   [Sample fonts list configurations](r_fonts-samples.md).
    -   [The fonts customization syntax](r_fonts-syntax.md).
    
    If the font list array is empty \(`fonts: [],`\) [the default list](r_fonts-default.md) will be used.

3.  [Continue configuring the Tiny Editors integration](t_01-setup_03-editors_01-configure_00-summary.md) or [continue with the installation](t_01-setup_03-editors_02-install_00-summary.md).


**Parent topic:** [Configuring the Tiny Editors integration](t_01-setup_03-editors_01-configure_00-summary.md)

