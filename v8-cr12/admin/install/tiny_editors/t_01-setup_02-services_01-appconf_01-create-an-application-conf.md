# Create an application.conf for the Tiny Editors Services {#setup-services-appconf-create-an-application-conf .task}

Create a configuration file to define the settings for the Tiny Editors Services.

1.  Using a text editor, create a new file named application.conf under the following directory:

    |Path|Operating System|
    |----|----------------|
    |**/opt/ephox/application.conf**|On Unix or Linux|
    |**C:\\opt\\ephox\\application.conf**|On Windows: where C is the boot drive for your system.|

    !!! note 
      
        Use a plain text editor to avoid inserting invalid formatting or symbols into application.conf. Do not use a rich text editor such as Microsoft Word for editing configuration files.

2.  Add the [`ephox.allowed-origins.origins` setting](r_application-conf.md#).

    !!! attention 
      
        The `ephox.allowed-origins.origins` setting is required. It must list all in-use names \( `"protocol://host:port"` \) for the HCL Connections™ server to allow the Tiny Editors to access the services without returning [Cross-Origin Resource Sharing \(CORS\)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) errors.

    ```sh
    ephox {
      allowed-origins {
        origins = [
          "http://connections.example.com",
          "https://connections.example.com",
    
          "http://connections.example.com:9081",
          "https://connections.example.com:9444"
        ]
      }
    }
    ```

    See also [Sample application.conf](r_application-conf-samples.md)

3.  Add [application.conf settings](r_application-conf.md) required for Link-checking and Media-embed.

4.  Save the configuration to application.conf.

5.  If the services have been deployed, stop and restart TinyEditorsServices to apply the configuration changes.


**Parent topic:** [Configuring the application.conf for the Tiny Editors Services](t_01-setup_02-services_01-appconf_00-summary.md)

**Related information**  


[Tiny Editor Services configuration](c_application-conf.md)

[List of valid application.conf settings](r_application-conf.md)

[Sample application.conf](r_application-conf-samples.md)

