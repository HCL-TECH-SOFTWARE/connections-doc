# Tiny Editor Services configuration {#tiny-editors .concept}

The Tiny Editor Services use a configuration file called application.conf, written in [Human-Optimized Config Object Notation](https://github.com/lightbend/config/blob/master/HOCON.md). These settings can be [overridden by JVM environment variables](https://github.com/lightbend/config/blob/master/HOCON.md#conventional-override-by-system-properties) named with the [path of the setting](https://github.com/lightbend/config/blob/master/HOCON.md#paths-as-keys).

The configuration file is used to adjust settings, including:

- **Enabled services**
:   The link-checking and media-embed services can be independently turned on or off.

- **Allowed origins**
:   URLs for the domains loading the Tiny Editors which require access to the Tiny Editor Services \(such as `https://www.example.com`\). This is needed to allow a browser security feature called CORS to work correctly.

- **Proxy settings**
:   The services can be configured to communicate with servers outside their network through a proxy server.

- **Security settings**
:   The services can be configured to use custom settings for validating certificates, or for the purpose of testing the certificate validation, can be switched off.

- **Rules for embedding links**
:   Endpoints can be specified for converting links using the OEmbed standard.

For a list of available settings, see: [List of valid application.conf settings](r_application-conf.md).

**Parent topic:** [Common tasks, concepts and reference information](r_appendix.md)

**Related information**  


[Configuring the application.conf for the Tiny Editors Services](t_01-setup_02-services_01-appconf_00-summary.md)

[Create an application.conf for the Tiny Editors Services](t_01-setup_02-services_01-appconf_01-create-an-application-conf.md)

[Disable SSL certificate validation for testing](t_disable-certificate-validation-for-testing.md)

[List of valid application.conf settings](r_application-conf.md)

[Sample application.conf](r_application-conf-samples.md)

