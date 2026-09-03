---
title: Enabling and disabling applications
tags:
    - CEC (WebEngine)
    - applications
    - Helm
    - configuration
    - deployment
    - enable
    - disable
    - webEngine
    - YAML
---
# Enabling and disabling applications

You can control which CEC (WebEngine) applications are deployed by configuring the `applications` section in your Helm chart. The example below shows how to enable only the `webEngine` application and disable all others:

```yaml
# Specify which applications to deploy and configure
applications:
  contentComposer: false
  core: false
  damPluginGoogleVision: false
  damPluginKaltura: false
  digitalAssetManagement: false
  dxPicker: false
  haproxy: false
  imageProcessor: false
  licenseManager: false
  openLdap: false
  persistence: false
  remoteSearch: false
  ringApi: false
  runtimeController: false
  webEngine: true
```
