# Security token properties {#r_admin_oauth_security__token_props .reference}

You can configure security token properties in the LCC/opensocial-config.xml in the LotusConnections-config directory.

|Property|Default|Description|
|--------|-------|-----------|
|containerTokenTTLSec|1800|The number of seconds that a container token is considered valid before the application makes a hard check of the current users' authentication data. Smaller values result in more server load from users who leave windows opened to Connections.|
|transientErrorRetryIntervalSec|60|The interval to of seconds to wait before reattempting failed container token update requests.|
|authErrorRetryIntervalSec|300|The interval for users reattempting container token rechecks that fail due to authentication issues.|
|containerTokenCheckSec|5|The frequency by which the system polls the *auth-check* cookie to validate the current users' SSO data. This allows logouts to propagate between browser tabs.|
|scopeAuthCheckCookieToSSODomain|false|The scope to which the *auth-check* cookie is set. Only change this value if you have vanity URLs for Connections such as, profiles.renovations.com, blogs.renovations.com, bookmarks.renovations.com, and so on.|
|gadgetTokenTTLSec|2700|The number of seconds the gadget tokens are considered valid before the system issues a request to refresh the gadget tokens.|

**Parent topic:**[Administering the Widget container](../admin/t_admin_common_widget_container.md)

