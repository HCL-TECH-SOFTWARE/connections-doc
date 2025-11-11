# Enable or Disable Link Validation {#setup-editors-configure-enable-or-disable-link-validation .task}

This section describes the process for enabling and disabling the Tiny Editors use of the Tiny Editors Services hyperlinking service for link validation.

**Before you begin:** The Tiny Editor Services must be installed and to use the hyperlinking service for link validation it [must not be disabled in the application.conf](r_application-conf.md#link-checking.enabled).

1.  Using a plain text editor, open [customization\_path](t_determine-customization-path.md)/javascript/tiny/editors/connections/config.js.

    !!! note 
        
        Use a plain text editor to avoid inserting invalid formatting or symbols into config.js. Do not use a rich text editor such as Microsoft Word for editing configuration files.

2.  Locate the property [`linkValidationEnabled`](r_config-js-sample.md#linkValidationEnabled) such as `linkValidationEnabled: true,` and set it to:

    -   `true` to allow the Tiny Editors to validate links using the hyperlinking service.
    -   `false` to stop the Tiny Editors from validating links using the hyperlinking service.
3.  When you have finished making configuration changes, follow the [post-customization steps](https://help.hcltechsw.com/connections/v6/admin/customize/t_admin_common_customize_postreq.html) to ensure the server cache is updated.

    !!! note 
        
        If the configuration changes do not take affect, [restart the Common enterprise application](t_restart-common-app.md) to force a cache update.


**Parent topic:** [Modifying Tiny Editors for HCL Connections](t_02-modify_00-summary.md)

