# Configuring HCL Connection to Use TLS 1.3 

You can configure HCL Connections™ to force all traffic that passes between a Connections server and a user's web browser to be sent over TLS 1.3 to avoid security vulnerabilities in TLS 1.2 and earlier versions of SSL. 

This section explains the steps that are required to enable and configure HCL Connections to use TLS 1.3.

## Requirements 

The following are required for this configuration

-   IBM HTTP Server for WebSphere Application Server 9.0.5 and latest fixpack
-   IBM SDK, Java Technology Edition, Version 8
-   IBM Webserver Plug-in for WebSphere Application Server 9.0.5 and latest fixpack
-   IBM WebSphere Customization Toolbox 9.0.5 and latest fixpack
-   OpenSSL 1.1.1
-   NGINX compiled with OpenSSL 1.1.1
-   Python 3.7 or greater, refer to [Set up Metrics for OpenSearch](../install/cp_install_services_tasks.md) for details
-   Configure communication between Connections JVMs and the IBM WebSphere Application Server to use TLS 1.3 exclusively

## How to configure HCL Connection to use TLS 1.3 

Perform the instructions detailed in the following sections:

-   **[Installing or migrating to IBM HTTP Server 9.0.5 and latest fixpack](../secure/t_secure_tls_v13_install_migrate.md)**  
Install or upgrade from a previous version of IBM® HTTP Server.
-   **[Enabling TLS 1.3 on NGINX with SSL](../secure/t_secure_tls_v13_enable.md)**  
Complete the requirements for NGNIX to enable TLS 1.3
-   **[Forcing traffic to use TLS 1.3](../secure/t_secure_tls_v13_force_traffic.md)**  
Configure communication between Connections JVMs and the IBM WebSphere Application Server to use TLS 1.3 exclusively.

**Parent topic:** [Security](../secure/c_sec_overview.md)
