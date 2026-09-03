# Configuring custom token URL single sign-on with Connections for Microsoft Teams {#t_ms_teams_configure_teams_sso_custom_token_url .task}

Authentication between Connections for the Microsoft Teams app and the Connections server is handled using single sign-on \(SSO\). This way, as long as the user's email address in Microsoft Teams matches the email address of the Connections user, the user won't be prompted to log in to Connections.

## Before you begin

Make sure you've completed [Enabling Connections to use the app registry service](t_ms_teams_enable_conn_use_appreg.md).

The custom token URL SSO authentication schema allows for a flexible approach to providing SSO for Connections with Microsoft Teams.

A custom token URL must be configured for this authentication schema. This URL will be responsible for exchanging the Azure JWT for a session cookie (or cookies) that can be used on subsequent Connections API requests. When authentication is required, the Connections plugin within Teams will invoke this endpoint with the Azure token in the Authentication header. Any redirects will be followed. The authentication will be considered complete when a successful response with cookies is received. Those cookies will be included on any subsequent Connections API calls.

You should configure the authentication endpoints and/or proxy (for example, ISAM/WebSeal) and Azure as needed to set up the trust relationship, and return suitable session cookie(s) on this request. If required, these cookies can be later be substituted at the proxy server for Connections session cookies.

There is an optional configuration parameter (reloginTimerMins) that controls a background token refresh. This parameter defines time in minutes, after which the Connections plugin within Teams will refresh the login tokens automatically in the background. This prevents edge cases where a user with expired tokens may end up acting as an anonymous user. If set to 0 or not configured, this behavior is disabled. The suggested practice is to configure this to a time shorter than the session cookie timeout.

## Procedure

To enable the custom token URL SSO authenticaton:

1. Confgure Azure and your proxy/authentication servers with necessary trust relationship for SSO.

2. When configuring the Teams microservices in [Set up Microsoft Teams integration](../../admin/install/cp_install_services_tasks.md#teams_integ), do the following:

  1. Set the authentication schema value to '4'.

  2. Set the custom token URL in the `msteams_auth_sso_url` parameter, including any required paramters. The Azure token will be included in the request in the authorization header. 

  3. (Optional) Set `reloginTimerMins` as a timeout value in minutes, after which the Connections plugin in Teams should refresh the authorization tokens. This should be set to a value less than the session timeout.

## What to do next

[Configure an Azure app to support the Microsoft Teams app](t_ms_teams_config_azure_app.md)