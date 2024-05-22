# Change Spelling Service URL {#setup-editors-configure-change-spelling-service-url .task}

If the Tiny Editor Services are not running on the same server as HCL Connections™, the spelling service URL is required.

Before you begin: The Tiny Editors Services must be installed.

1.  Using a plain text editor, open [customization\_path](t_determine-customization-path.md)/javascript/tiny/editors/connections/config.js.

    **Note:** Use a plain text editor to avoid inserting invalid formatting or symbols into config.js. Do not use a rich text editor such as Microsoft Word for editing configuration files.

2.  Locate the property [`spellingServiceUrl`](r_config-js-sample.md#spellingServiceUrl) such as `spellingServiceUrl: '',` and change the string to the spelling service URL.

    **Tip:** If the Tiny Editors Services are running on the same server as HCL Connections, leave the `spellingServiceUrl` as an empty string \(`''`\) to automatically generate the URL.

    **Tip:** The default location of the `spellingServiceUrl` is https://host-and-port/tiny-spelling/.

    ```
    spellingServiceUrl: 'https://services.example.com/tiny-spelling/',
    ```

3.  When you have finished making configuration changes, follow the [post-customization steps](https://help.hcltechsw.com/connections/v6/admin/customize/t_admin_common_customize_postreq.html) to ensure the server cache is updated.

    **Note:** If the configuration changes do not take affect, [restart the Common enterprise application](t_restart-common-app.md) to force a cache update.


**Parent topic:**[Modifying Tiny Editors for HCL Connections](t_02-modify_00-summary.md)

