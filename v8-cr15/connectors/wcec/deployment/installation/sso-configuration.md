---
title: Configuring Single Sign-On
tags:
    - Single Sign-On
    - CEC (WebEngine)
    - LTPA
    - Helm
    - Kubernetes secrets
    - Configuration
    - Open Liberty
    - server.xml
---
# Configuring single sign-on

This section describes how to enable Single Sign-On (SSO) between Connections and CEC (WebEngine).

## Configuring LTPA with Helm `values.yaml`

As part of the [Preparation before installing CEC > Configuring Single Sign-On using LTPA](../prepare-installation/sso-ltpa-configuration.md) step, you should have already exported the LTPA keys and created a Kubernetes secret from them.

!!! note
    The `customLtpaSecret` value must reference the Kubernetes secret containing the exported LTPA keys and password.
To import the LTPA keys into CEC (WebEngine), add the following snippet to your `values.yaml` file:

```yaml
configuration:
  webEngine:
    ltpa:
      # Specify the name of the Kubernetes secret containing the LTPA configuration.
      # The secret must include the following keys:
      # - ltpa.keys
      # - password
      customLtpaSecret: "dx-web-engine-ltpa-secret"
```

## Enabling SSO configuration using overrides

You can further customize SSO for CEC (WebEngine) by using the `configuration.webEngine.configOverrideFiles` property in your `values.yaml`. This property allows you to provide additional configuration that will be merged into the Open Liberty `server.xml`.

!!! note
    Replace `<<domain_name>>` with your actual domain name. This configuration ensures that SSO is enabled and properly secured for your deployment. We use `.` as suffix to allow any sub-domain to use the LTPA cookie.
For example, to enable SSO and specify relevant settings, add the following to your `values.yaml`:

```yaml
configuration:
  webEngine:
    configOverrideFiles:
      sso-config.xml: |
        <server description="CEC (WebEngine) server">
          <webAppSecurity
            singleSignonEnabled="true"
            ssoDomainNames=".<<domain_name>>"
            ssoCookieName="LtpaToken2"
            ssoRequiresSSL="true"
            httpOnlyCookies="true"
            ssoSameSite="None" />
        </server>
```
