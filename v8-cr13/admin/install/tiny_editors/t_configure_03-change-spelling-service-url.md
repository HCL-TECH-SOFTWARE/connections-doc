# Change Spelling Service URL {#setup-editors-configure-change-spelling-service-url .task}

If the Tiny Editor Services are not running on the same server as HCL Connections™, the spelling service URL is required.

**Before you begin:** The Tiny Editors Services must be installed.

1.  Using a plain text editor, open config/config.js in the extracted Tiny Editors for HCL Connections package.

    !!! note 
        
        Use a plain text editor to avoid inserting invalid formatting or symbols into config.js. Do not use a rich text editor such as Microsoft Word for editing configuration files.

2.  Locate the property [`spellingServiceUrl`](r_config-js-sample.md#spellingServiceUrl) such as `spellingServiceUrl: '',` and change the string to the spelling service URL.

    !!! tips 
        
        - If the Tiny Editors Services are running on the same server as HCL Connections, leave the `spellingServiceUrl` as an empty string \(`''`\) to automatically generate the URL.

        - The default location of the `spellingServiceUrl` is https://host-and-port/tiny-spelling/.

    ```
    spellingServiceUrl: 'https://services.example.com/tiny-spelling/',
    ```

3.  [Continue configuring the Tiny Editors integration](t_01-setup_03-editors_01-configure_00-summary.md) or [continue with the installation](t_01-setup_03-editors_02-install_00-summary.md).


**Parent topic:** Configuring the Tiny Editors integration](t_01-setup_03-editors_01-configure_00-summary.md)

