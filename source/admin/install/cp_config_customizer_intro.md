# Configuring the Customizer component {#cp_config_customizer_intro .task}

Configure the Customizer offering of the Component Pack for HCL Connections™ by setting up a reverse proxy server.

Connections™ Customizer is a proxy service that lets you modify the Connections user experience. Customizer intercepts and modifies requests from clients and responses from servers, so it can customize anything that flows through it, such as the behavior of APIs or the look-and-feel of the user interface.

Connections Customizer performs modifications by injecting JavaScript, CSS, or other web resources into the HTML pages returned by Connections in response to end-user requests. Requests are generated when the user navigates in standard Connections apps such as Communities, Profiles, Files, and Homepage. The customization details \(typically, which requests should be modified, and what code should be inserted\) are defined by apps stored in the Connections App Registry.

After you configure Connections Customizer, developers can create apps that customize your organization's interface. You can deploy the apps using the App Registry, as explained in [Managing Connections Customizer apps](../customize/customize_manage_customizer_apps.md).

The Customizer component uses the services listed in Table 1.

|Service Name|Description|
|------------|-----------|
|mw-proxy|The proxy service that inspects HTTP traffic. Note that this service does not function as the HTTP server \(you must configure a reverse proxy server for that purpose, as explained later in this section\).|
|appregistry-service|The set of REST APIs that store customization definitions in a Mongo database and leverage Redis as a cache for maximum performance.|
|appregistry-client|The user interface where you can define application registry customizations that will be implemented with Customizer.|
|mongo|The MongoDB database where application registry applications and extensions are stored.|
|redis|The Redis cache where application registry information is temporarily stored to provide maximum performance for Customizer applications and extensions.|

Any reverse proxy server can be used with Customizer. You can set one up with the appropriate mw-proxy rules just for this purpose, or you can reuse an existing reverse proxy server \(for example, the load balancer for Connections\) and add in the rules for mw-proxy. For an example showing how to configure NGINX as a reverse proxy for Customizer, see [Configuring the NGINX proxy server for Customizer](cp_config_customizer_setup_nginx.md).

For information on creating apps with Connections Customizer, see [Injecting customizations into Connections pages](../customize/customize_inject_customizations.md).

-   **[Configuring the NGINX proxy server for Customizer](../install/cp_config_customizer_setup_nginx.md)**  
A reverse proxy server is required to forward HTTP requests to mw-proxy for customizations to be applied with the HCL Connections Customizer component. Any reverse proxy application with the appropriate configuration rules can be used. The following sample guide provides steps on how to configure an NGINX proxy server to function as a reverse proxy server for the Connections Customizer component.
-   **[Configuring Orient Me to support a reverse-proxy server](../install/cp_config_om_reverse_proxy.md)**  
Configure the Orient Me service to support the reverse-proxy server used by the Customizer offering of the Component Pack for HCL Connections.
-   **[Configuring SPNEGO for Customizer](../install/cp_config_customizer_spnego.md)**  
Configure a service principal name and keytab using HCL Connections Customizer in a SPEGO environment.
-   **[Configuring the HTTP server for the App Registry](../install/cp_config_customizer_HTTP_server.md)**  
Configure the IBM® HTTP Server to redirect users to the App Registry, where they can add customizations.
-   **[Creating WebSEAL junctions for Customizer](../install/cp_config_customizer_webseal_junctions.md)**  
For environments that use IBM® Security Access Manager \(formerly Tivoli® Access Manager\), configure WebSEAL junctions for Connections Customizer.
-   **[Changing maximum allowed HTTP header size](../install/changing_maximum_allowed_http_header_size.md)**  
The Nodejs server code enforces a maximum HTTP header size on requests. In Nodejs v8 and v12, the maximum HTTP header size was 8 KB. For v14 and later versions, it was 16 KB. In Nodejs v11.6.0 and later versions, the command line parameter `*--max-http-header-size*` was introduced, allowing you to customize the maximum size.

**Parent topic:**[Configuring the Component Pack](../install/cp_config_intro.md)

