# Configuring Collabora Online

Use the following topics to configure Collabora Online in HCL Connections:

- **[Configuring Collabora and Docs provider](t_config_collabora_docs.md)**

    Explains how to configure HCL Docs and Collabora independently as the file viewer and editor. It also describes the `files-config.xml` settings, the `collabora-editor` role, user access and fallback behavior, deployment scenarios, and troubleshooting options.

- **[Configuring OAuth-based authentication](t_config_collabora_oauth.md)**

    Provides the administrator procedures for securing WOPI requests with OAuth 2.0. It covers registering the Collabora OAuth client, configuring the WebSphere OAuth provider and WOPI Trust Association Interceptor (TAI), adding the TAI JAR to the Files runtime classpath, updating `files-config.xml`, synchronizing nodes, restarting servers, and verifying the configuration.

- **[Central OIDC configuration](t_config_collabora_oidc.md)**

    Explains how to use Central OpenID Connect (OIDC) mode to authenticate Collabora WOPI requests through WebSphere Application Server container-managed security. The topic covers the `files-config.xml` settings, prerequisites for the OIDC Relying Party TAI, reverse-proxy and HTTP header requirements, and common authentication and header-size issues.

**Parent topic:** [Installing and configuring Collabora Online](../admin/t_admin_inst_config_collabora.md)