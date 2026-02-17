# Allow Upload To Files Application {#allowuploadtofilesapplication .task}

Allow Upload To Files Application allows Image Upload functionality to be disabled when images would normally upload to the Files application. This setting affects image upload functionality for the Tiny Editors in all HCL Connections applications except for Blogs, Wikis and Activities. The default value is true.

1.  **Configuration Structure**. To disable image upload to the Files application, change the value to false:

    ```
    ephox.editlive.connections.config.onload = function(load) {
      var integrationConfig = {
        ...
        allowUploadToFilesApp: **false**
      };
      load(integrationConfig);
    };
    ```


**Parent topic:**[Configuring IBM HTTP Server](../install/c_add_ihs_over.md)

**Previous topic:**[Updating HCL Connections to use the HTTP server](../install/t_update_web_addresses_in_IHS.md)

**Next topic:**[Configuring file downloads through IBM HTTP Server](../install/t_install_post_files_downloads.md)

