---
title: Configuring networking
tags:
    - CEC (WebEngine)
    - Kubernetes networking
    - WebEngine
    - Configuration
    - SSL
    - CSP
    - Host
    - Port
---
# Configuring networking

This section explains what must be configured from a networking perspective to get CEC (WebEngine) running in your Kubernetes cluster, and to provide accessibility to your deployment from outside the cluster.

The following snippet shows how you can configure networking for CEC (WebEngine):

```yaml
# Networking specific configuration
networking:
  # Networking configuration specific to webEngine
  webEngine:
    # Host of webEngine, must be specified as a FQDN
    host: ""
    # Port of webEngine
    port:
    # Setting if SSL is enabled for webEngine
    ssl: true
    # webEngine Context root, only alter if your deployment already uses a non default context route
    contextRoot: "wps"
    # webEngine personalized home, only alter if your deployment already uses a non default personalized home
    personalizedHome: "myportal"
    # webEngine home, only alter if your deployment already uses a non default home
    home: "portal"
    # None, Lax, Strict, or empty string
    # Setting this to an empty string would not add the SameSite attribute for WASReqURL cookie
    # Note: This should only be set in an HTTPS environment to prevent unwanted behaviours
    cookieSameSiteAttribute: ""
    # Enables/Disables CSP frame-ancestor header
    # Note: 'self' is always added when this is enabled to enable DX internal features
    # see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors
    cspFrameAncestorsEnabled: false
    # Add list of allowed source URLS to the the CSP frame-ancestor header this will only reflect if cspFrameAncestorsEnabled is set to true
    # Example:
    # cspFrameAncestorsAllowedSourceURLs:
    #   - 'https://example.com'
    # This would result to the following response header:
    # content-security-policy: frame-ancestors 'self' https://example.com
    cspFrameAncestorsAllowedSourceURLs: []
```

Once CEC (WebEngine) is deployed successfully and all the pods are healthy, you can access it at `https://<YOUR_HOST>/wps/portal`.
