<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE task PUBLIC "-//OASIS//DTD DITA Task//EN" "task.dtd">

# Configuring Desktop Plugins for the Multi-Tenant environment

Integrating plug-ins for HCL Connections allows you to access and update your Connections content from other applications. Use the plug-ins to share files and information between Microsoft™ Windows™ applications and HCL Connections 6.5 CR1a Multi-Tenant.
You must provide information about a Connections server before you can share files and information between Microsoft™ Windows™ and Connections.
Connecting to an HCL Multi-Tenant Connections. 

Follow the instructions under the section 
Connecting to a multi-tenant Connections solution" 
https://help.hcltechsw.com/connections/v65/connectors/enduser/t_ms_plugins_connect.html

Managing HCL Connections for Mac accounts
https://help.hcltechsw.com/connections/v65/connectors/enduser/t_mac_plugins_connect.html

Using the HCL Connections desktop plug-ins for Microsoft Windows
https://help.hcltechsw.com/connections/v65/connectors/enduser/c_ms_plugins_win_explorer.html

## Keycloak Setup

**Create client for Connections Mobile client**

Using the Keycloak admin console, you must create an entry for a new client ID named conn-dsk-plugin in the realm that is being used by Connections.

Navigate to Clients and select Create to create a new client. Fill out the following fields, the rest can remain blank or unset.

| **Key** | **Value** | 
| --- | --- |
| Client ID | conn-dsk-plugin |
| Enabled | ON |
| Consent Required | OFF |
| Client Protocol | openid-connect 
| Access Type | public |
| Standard Flow Enabled | ON |
| Implicit Flow Enabled | OFF |
| Direct Access Grants Enabled | OFF |
| Valid Redirect URIs | com.ibm.ibmscp://com.ibm.desktop.connections |
|

**Special considerations for Keycloak based identity providers**

If you are configuring customer specific Identity Providers via Keycloak, and looking to have mobile and plugin users automatically login with their customer specific IDP, see the topic Using Keycloak Identity Providers with Mobile and Plugins.

## Authentication and Tokens

With Connections MT, the Connections Desktop Plugins uses the Open ID Connect protocol with OAuth 2.0 to identify users. It has been tested with Keycloak as the token provider and Keycloak can be federated with a customer’s Identity provider to provide per-customer validation forms and inputs. The desktop plugin application uses the same user validation forms that are used on the web client.

As part of the OAuth and OIDC protocols, the desktop plugin app will receive and use access and refresh tokens. Access tokens are typically short-lived tokens which are revalidated multiple times a day. A refresh token is used to silently “refresh” the access token. The desktop plugin app uses a scope called “offline_access” which is used to ask the token provider for a refresh token that can be used for an extended time. Once the access token expires, the desktop plugin app silently uses the refresh token to ask Keycloak for an updated access token. Keycloak then validates this token, checks the expiration time on the refresh token and ensures that the user is still valid and has not had their access to the system revoked. If all of these checks pass, then Keycloak will issue a new access token valid for a short duration.

There are a couple of differences in the session timeouts that should be noted.
1. By default, the access token expiration will inherit the same value as Access Token Lifespan that is defined in Keycloak under Realm Settings > (realm) > Tokens. It is possible to define a client unique Access Token Lifespan but it is not recommended.
2. The refresh token expiration period is controlled by three settings in Keycloak under Realm Settings > (realm) > Tokens.
   -  **Offline Session Idle** – Time an offline session is allowed to be idle. The client must use the refresh token at least once during this period or the session will expire, and the user must login again. For example, setting this to 7 days will require that the desktop plugin user must use the Connections app at least once in 7 days and if not, they will be prompted to login again.
   -  **Offline Session Max Limited** – set this to on to force a maximum session lifetime limit.
   -  **Offline Session Max** – Maximum time that can pass before the session is expired, regardless of activity. For example, set this to 30 days to force all desktop plugin users to login again even if they are actively using the application.
3. The desktop plugin app shares the Offline session timeouts with the Connections mobile apps, since both use offline tokens.

**Validating OIDC Discovery URL**

As part of the MT update scripts, the script will add the following stanza to the IBM HTTP Server configuration (where keycloak_hostname is really the hostname of your keycloak instance in your environment):

OIDC discovery for the backend Keycloak OIDC server
Redirect "/.well-known/openid-configuration" "https://keycloak_hostname/auth/realms/connmt/.well- known/openid-configuration"

The desktop plugin clients will call the URL https://mt_org_hostname/.well-known/openid-configuration when an MT account is configured and will expect this URL to be unprotected. If your environment is using an edge proxy, make sure that this URL and the redirect URL are listed as unprotected.

If you are experiencing problems connecting a desktop plugin client, try the URL https://mt_org_hostname/.well- known/openid-configuration (using your organization hostname) in a private browser session and ensure that a json payload is returned containing links to Keycloaks auth and token endpoints. For example:

```
{
"issuer": "https://keycloak_hostname/auth/realms/connmt",
"authorization_endpoint": "https://keycloak_hostname/auth/realms/connmt/protocol/openid- connect/auth",
"token_endpoint": "https://keycloak_hostname/auth/realms/connmt/protocol/openid-connect/token", "token_introspection_endpoint": "https://keycloak_hostname/auth/realms/connmt/protocol/openid- connect/token/introspect",
"userinfo_endpoint": "https://keycloak_hostname/auth/realms/connmt/protocol/openid- connect/userinfo",
"end_session_endpoint": "https://keycloak_hostname/auth/realms/connmt/protocol/openid- connect/logout",
"jwks_uri": "https://keycloak_hostname/auth/realms/connmt/protocol/openid-connect/certs", "check_session_iframe": "https://keycloak_hostname/auth/realms/connmt/protocol/openid- connect/login-status-iframe.html",
}
```


<?tm 1541016643182 1 HCL Connections ?>

