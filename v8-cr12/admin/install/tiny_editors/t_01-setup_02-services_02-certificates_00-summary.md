# Configuring the SSL certificates for the Tiny Editors Services {#setup-services-certificates-summary .task}

This task provides procedures of configuring the trust store to include the certificates required for communicating with outside web servers. This is not required for spell-checking but is required for media embedding or link validation.

To configure the SSL certificates for the Tiny Editors Services:

1.  Create a web-aware trust store for the Tiny Editors Services
2.  Update the configuration by either:
    -   Changing the default WebSphere trust store to the Tiny Editors Services trust store.
    -   Creating a Tiny Editors Services specific SSL configuration.

Then perform the steps detailed in the following sections:

-   **[Create a web-aware trust store for the Tiny Editors Services](t_01-setup_02-services_02-certificates_01-create-a-web-aware-truststore.md)**  
This task outlines the process for creating a web-aware trust store for the Tiny Editors Services.
-   **[Change the default trust store to the Tiny Editors Services trust store](t_01-setup_02-services_02-certificates_02-change-the-default-truststore.md)**  
This task outlines the process for changing the default SSL trust store to the web-aware trust store for the Tiny Editors Services.
-   **[Create a Tiny Editors Services specific SSL configuration](t_01-setup_02-services_02-certificates_03-create-a-services-specific-ssl-config.md)**  
This task outlines the process for creating a Tiny Editors Services specific SSL configuration from the web-aware trust store. This procedure includes updating the application.conf to add the SSL configuration attributes.

**Parent topic:** [Optional: Installing Tiny Editors Services](t_01-setup_02-services_00-summary.md)

**Previous topic:** [Configuring the application.conf for the Tiny Editors Services](t_01-setup_02-services_01-appconf_00-summary.md)

**Next topic:**[Installing the Tiny Editors Services](t_01-setup_02-services_03-install.md)

