# Change Link Service URL {#setup-editors-configure-change-link-service-url .task}

If the Tiny Editor Services are not running on the same server as HCL Connections™, the link service URL is required.

**Before you begin:** The Tiny Editors Services must be installed.

1.  Using a plain text editor, open config/config.js in the extracted Tiny Editors for HCL Connections package.

    !!! note 
        
        Use a plain text editor to avoid inserting invalid formatting or symbols into config.js. Do not use a rich text editor such as Microsoft Word for editing configuration files.

2.  Locate the property [`linkServiceUrl`](r_config-js-sample.md#linkServiceUrl) such as `linkServiceUrl: '',` and change the string to the hyperlinking service URL.

    !!! tips 
        
        - If the Tiny Editors Services are running on the same server as HCL Connections, leave the `linkServiceUrl` as an empty string \(`''`\) to automatically generate the URL.

        - The default location of the `linkServiceUrl` is: https://host-and-port/tiny-hyperlinking/.

    ```
    linkServiceUrl: 'https://services.example.com/tiny-hyperlinking/',
    ```

3.  [Continue configuring the Tiny Editors integration](t_01-setup_03-editors_01-configure_00-summary.md) or [continue with the installation](t_01-setup_03-editors_02-install_00-summary.md).


**Parent topic:** [Configuring the Tiny Editors integration](t_01-setup_03-editors_01-configure_00-summary.md)

