# Selecting an editor {#setup-editors-configure-select-editor .task}

This option is used to select the editor for HCL Connections™. If the [Tiny Editors Selector service](t_01-setup_01-selector_00-summary.md) is installed, you can choose to assign the editor based on user or security group.

1.  Using a plain text editor, open [customization\_path](t_determine-customization-path.md)/javascript/tiny/editors/connections/config.js.

    !!! note 
        
        Use a plain text editor to avoid inserting invalid formatting or symbols into config.js. Do not use a rich text editor such as Microsoft Word for editing configuration files.

2.  Locate the property [`editor`](r_config-js-sample.md#editor) such as `editor: 'TinyMCE',` and update the value to one of the following choices:

    |Value for `editor`|Effect|
    |------------------|------|
    |**`'TinyMCE'`**|All users will be shown the TinyMCE editor.|
    |**`'CKEditor'`**|All users will be shown the default editor.|
    |**`'role-based'`**|The editor shown to users is set by [Configuring the Tiny Editors Selector roles](t_configure_01b-assign-users-1.md).|

    ```sh
    `editor: 'role-based',`
    ```

3.  When you have finished making configuration changes, follow the [post-customization steps](https://help.hcltechsw.com/connections/v6/admin/customize/t_admin_common_customize_postreq.html) to ensure the server cache is updated.

    !!! note 
        
        If the configuration changes do not take affect, [restart the Common enterprise application](t_restart-common-app.md) to force a cache update.


**Parent topic:** [Modifying Tiny Editors for HCL Connections](t_02-modify_00-summary.md)

