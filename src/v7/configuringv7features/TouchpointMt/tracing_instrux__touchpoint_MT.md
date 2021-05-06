# Tracing Instructions

## Log level in WebSphere
To enable trace logging, please set *com.ibm.social.apps-touchpoint.** to ALL

## HTTP response headers
When Touchpoint MT redirects from Touchpoint to Homepage, it uses an HTTP redirect but
adds a response header **X-REDIR-REASON** . The content of that header will hold more detail
about the reason for redirection.

## Requesting config
The App Registry config is being fetched using an inter-service request. You can check the
values being used by calling the following endpoint: 

```
/appregistry/api/v3/extensions?
type=com.ibm.social.apps.touchpoint.config
```
