# Enable or Disable Spellchecking {#setup-editors-configure-enable-or-disable-spellchecking .task}

This section describes the process for enabling and disabling the use of the Tiny Editors Services spelling service.

**Before you begin:** The Tiny Editors Services must be installed.

1.  Using a plain text editor, open [customization\_path](t_determine-customization-path.md)/javascript/tiny/editors/connections/config.js.

    !!! note 
        
        Use a plain text editor to avoid inserting invalid formatting or symbols into config.js. Do not use a rich text editor such as Microsoft Word for editing configuration files.

2.  Locate the property [`spellingServiceEnabled`](r_config-js-sample.md#spellingServiceEnabled) such as `spellingServiceEnabled: true,` and set it to:

    -   `true` to allow the Tiny Editors to spellcheck using the spelling service.
    -   `false` to stop the Tiny Editors from spellchecking using the spelling service.
3.  When you have finished making configuration changes, follow the [post-customization steps](https://help.hcltechsw.com/connections/v6/admin/customize/t_admin_common_customize_postreq.html) to ensure the server cache is updated.

    !!! note 
        
        If the configuration changes do not take affect, [restart the Common enterprise application](t_restart-common-app.md) to force a cache update.


**Parent topic:** [Modifying Tiny Editors for HCL Connections](t_02-modify_00-summary.md)

