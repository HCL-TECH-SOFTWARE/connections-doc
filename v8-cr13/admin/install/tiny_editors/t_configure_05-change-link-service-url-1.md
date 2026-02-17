# Change Link Service URL {#setup-editors-configure-change-link-service-url .task}

If the Tiny Editor Services are not running on the same server as HCL Connections™, the link service URL is required.

**Before you begin:** The Tiny Editors Services must be installed.

1.  Using a plain text editor, open [customization\_path](t_determine-customization-path.md)/javascript/tiny/editors/connections/config.js.

    !!! note 
        
        Use a plain text editor to avoid inserting invalid formatting or symbols into config.js. Do not use a rich text editor such as Microsoft Word for editing configuration files.

2.  Locate the property [`linkServiceUrl`](r_config-js-sample.md#linkServiceUrl) such as `linkServiceUrl: '',` and change the string to the hyperlinking service URL.

    !!! tips 
        
        - If the Tiny Editors Services are running on the same server as HCL Connections, leave the `linkServiceUrl` as an empty string \(`''`\) to automatically generate the URL.

        - The default location of the `linkServiceUrl` is: https://host-and-port/tiny-hyperlinking/.

    ```
    linkServiceUrl: 'https://services.example.com/tiny-hyperlinking/',
    ```

3.  When you have finished making configuration changes, follow the [post-customization steps](https://help.hcltechsw.com/connections/v6/admin/customize/t_admin_common_customize_postreq.html) to ensure the server cache is updated.

    !!! note 
        
        If the configuration changes do not take affect, [restart the Common enterprise application](t_restart-common-app.md) to force a cache update.


**Parent topic:** [Modifying Tiny Editors for HCL Connections](t_02-modify_00-summary.md)

