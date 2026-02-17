# Optional: Installing Tiny Editors Services {#setup-services-summary .task}

The Tiny Editors Services provide the following functionality for the Tiny Editors: spellchecking, link checking, and automatic embedding linked media. This task can be skipped if the spellchecking, link checking, and embed media features are not required.

1.  [Configuring the application.conf for the Tiny Editors Services](t_01-setup_02-services_01-appconf_00-summary.md)  
The Tiny Editors Services require configuration to allow communicating between the Tiny Editors WebSphere Application and external websites.
2.  [Configuring the SSL certificates for the Tiny Editors Services](t_01-setup_02-services_02-certificates_00-summary.md)  
 This task provides procedures of configuring the trust store to include the certificates required for communicating with outside web servers. This is not required for spell-checking but is required for media embedding or link validation.
3.  [Installing the Tiny Editors Services](t_01-setup_02-services_03-install.md)  
Installing the Tiny Editors Services will provide the Tiny editors with spellchecking, link checking and media embedding functionality.
4.  [Starting the Tiny Editors Services application](t_01-setup_02-services_04-start.md)  
The Tiny Editors Services must be started before they can be used.
5.  [Regenerate the webserver plugin](t_regenerate-webserver-plugin.md)  
After installing new services, apply the new routing rules on the webserver by regenerating the plugin.

**Parent topic:** [Installing Tiny Editors for HCL Connections](t_01-setup_00-summary.md)

**Previous topic:** [Optional: Installing Tiny Editors Selector](t_01-setup_01-selector_00-summary.md)

**Next topic:** [Installing the Tiny Editors integration](t_01-setup_03-editors_00-summary.md)

