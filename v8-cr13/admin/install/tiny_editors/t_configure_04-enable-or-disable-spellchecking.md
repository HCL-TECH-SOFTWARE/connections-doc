# Enable or Disable Spellchecking {#setup-editors-configure-enable-or-disable-spellchecking .task}

This section describes the process for enabling and disabling the use of the Tiny Editors Services spelling service.

**Before you begin:** The Tiny Editors Services must be installed.

1.  Using a plain text editor, open `config/config.js` in the extracted Tiny Editors for HCL Connections package.

    !!! note

        Use a plain text editor to avoid inserting invalid formatting or symbols into `config.js`. Do not use a rich text editor such as Microsoft Word for editing configuration files.

2.  Locate the property [`spellingServiceEnabled`](r_config-js-sample.md#spellingServiceEnabled) such as `spellingServiceEnabled: true,` and set it to:

    -   `true` to allow the Tiny Editors to spellcheck using the spelling service.
    -   `false` to stop the Tiny Editors from spellchecking using the spelling service.
3.  [Continue configuring the Tiny Editors integration](t_01-setup_03-editors_01-configure_00-summary.md) or [continue with the installation](t_01-setup_03-editors_02-install_00-summary.md).


**Parent topic:** [Configuring the Tiny Editors integration](t_01-setup_03-editors_01-configure_00-summary.md)

