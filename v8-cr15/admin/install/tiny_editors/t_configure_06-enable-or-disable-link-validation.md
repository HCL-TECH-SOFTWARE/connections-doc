# Enable or Disable Link Validation {#setup-editors-configure-enable-or-disable-link-validation .task}

This section describes the process for enabling and disabling the Tiny Editors use of the Tiny Editors Services hyperlinking service for link validation.

**Before you begin:** The Tiny Editor Services must be installed and to use the hyperlinking service for link validation it [must not be disabled in the application.conf](r_application-conf.md#link-checking.enabled).

1.  Using a plain text editor, open config/config.js in the extracted Tiny Editors for HCL Connections package.

    !!! note 
        
        Use a plain text editor to avoid inserting invalid formatting or symbols into config.js. Do not use a rich text editor such as Microsoft Word for editing configuration files.

2.  Locate the property [`linkValidationEnabled`](r_config-js-sample.md#linkValidationEnabled) such as `linkValidationEnabled: true,` and set it to:

    -   `true` to allow the Tiny Editors to validate links using the hyperlinking service.
    -   `false` to stop the Tiny Editors from validating links using the hyperlinking service.
3.  [Continue configuring the Tiny Editors integration](t_01-setup_03-editors_01-configure_00-summary.md) or [continue with the installation](t_01-setup_03-editors_02-install_00-summary.md).


**Parent topic:** [Configuring the Tiny Editors integration](t_01-setup_03-editors_01-configure_00-summary.md)

