# Selecting an editor {#setup-editors-configure-select-editor .task}

This option is used to select the editor for HCL Connections™. If the [Tiny Editors Selector service](t_01-setup_01-selector_00-summary.md) is installed, you can choose to assign the editor based on user or security group.

1.  Using a plain text editor, open config/config.js in the extracted Tiny Editors for HCL Connections package.

    !!! note 
        
        Use a plain text editor to avoid inserting invalid formatting or symbols into config.js. Do not use a rich text editor such as Microsoft Word for editing configuration files.

2.  Locate the property [`editor`](r_config-js-sample.md#editor) such as `editor: 'TinyMCE',` and update the value to one of the following choices:

    |Value for `editor`|Effect|
    |------------------|------|
    |**`'TinyMCE'`**|All users will be shown the TinyMCE editor.|
    |**`'CKEditor'`**|All users will be shown the default editor.|
    |**`'role-based'`**|The editor shown to users is set by [Configuring the Tiny Editors Selector roles](t_configure_01b-assign-users.md).|

    ```sh
    `editor: 'role-based',`
    ```

3.  [Continue configuring the Tiny Editors integration](t_01-setup_03-editors_01-configure_00-summary.md) or [continue with the installation](t_01-setup_03-editors_02-install_00-summary.md).


**Parent topic:** [Configuring the Tiny Editors integration](t_01-setup_03-editors_01-configure_00-summary.md)

