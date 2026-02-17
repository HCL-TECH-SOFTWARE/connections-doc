# Installing or migrating to IBM HTTP Server 9.0.5 and latest fixpack {#t_secure_tls_v13_install_migrate .concept}

Install or upgrade from a previous version of IBM® HTTP Server.

The IBM WebSphere Application Server versions 8.5.5.20 (and later) provides an option to select TLSv1.3 protocol when running on IBM Java version 8.0.6.26 (and later). The IBM HTTP Server for WebSphere Application Server 9.0.5 is required to force communication to use TLS 1.3. 

The following are the steps required to configure the IBM WebSphere environment to use IBM HTTP Server for WebSphere Application Server 9.0.5 with IBM WebSphere Application Server 8.5.5.

## Procedure {#section_yyb_25x_bpb .section}

1.  Install or upgrade to WebSphere Application Server and Server Supplement 8.5.5 and the latest fixpack.

2.   Follow the instructions detailed in [Migrating from previous versions of IBM HTTP Server](https://www.ibm.com/docs/en/ibm-http-server/9.0.5?topic=server-migrating-from-previous-versions-http) to upgrade to the following:
   
    !!! note
    
        Back up the existing installation directory to a new location to save custom settings and make sure to install IHS in the same directory when upgrading.

    -   IBM HTTP Server for WebSphere Application Server 9.0.5 and latest fixpack

    -   IBM SDK, Java Technology Edition, Version 8

    -   IBM Webserver Plug-in for WebSphere Application Server 9.0.5 and latest fixpack

    -   IBM WebSphere Customization Toolbox 9.0.5 and latest fixpack

3.  Apply the required updates to the configuration files. Refer to the [Upgrading to 2.4 from 2.2](https://publib.boulder.ibm.com/httpserv/manual24/upgrading.html) for details.

**Parent topic:** [Configuring HCL Connection to Use TLS 1.3 ](../secure/t_secure_tls_v13_overview.md)

