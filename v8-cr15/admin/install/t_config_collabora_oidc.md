# Central OIDC configuration



This section explains how to configure and deploy Collabora Online with HCL Connections Files by using Central OpenID Connect (OIDC) mode over the Web Application Open Platform Interface (WOPI) protocol.

Central OIDC mode relies directly on WebSphere Application Server container-managed security and its preconfigured OIDC Relying Party Trust Association Interceptor (TAI) to validate incoming identity tokens.



## Prerequisites
Before enabling Central OIDC mode for Collabora Online, a central OpenID Connect identity provider (such as Microsoft Entra ID, Okta, Ping Identity, or Keycloak) must be fully configured, active, and validated for HCL Connections in IBM WebSphere Application Server.

If WebSphere Application Server's central OIDC Trust Association Interceptor (TAI) is not configured or working correctly for standard HCL Connections authentication, Central OIDC mode for Collabora Online does not function.



## HCL Connections Configuration (files-config.xml)

To enable Central OIDC mode for Collabora Online, update the files-config.xml file located in the HCL Connections cell configuration directory.

### Configuration example
Add or update the `<officeEditing>` element inside the `<file>` section as shown below:

```xml
<file>

    <officeEditing>
        <editorProvider>collabora</editorProvider>
        <editorUrl>https://collabora.example.com</editorUrl>
        <!-- wopiAuthMode options: anonymous | oauth | oidc -->
        <wopiAuthMode>oidc</wopiAuthMode>
    </officeEditing>

</file>
```

### Configuration parameters

| Element | Allowed / Expected Value | Description |
| :--- | :--- | :--- |
| &lt;editorProvider&gt; | collabora | Specifies Collabora Online as the active office document editor provider. |
| &lt;editorUrl&gt; | https://&lt;collabora-host&gt; | The base public URL of your Collabora Online server. |
| &lt;wopiAuthMode&gt; | oidc | Instructs the WOPI application to use WebSphere container-managed OIDC security. |


## Benefits of Central OIDC mode

Central OIDC mode is intended for enterprise environments where HCL Connections is integrated with a central OIDC identity provider (IdP).

### Key benefits
- **Delegated Validation**: Token validation and cryptographic signature verification are delegated entirely to WebSphere Application Server.
- **No Application-Level Key Management**: The application does not need to parse IdP discovery metadata, download JSON Web Key Sets (JWKS), or maintain custom cryptographic secrets.
- **Unified Single Sign-On (SSO)**: Uses the enterprise OIDC token established during the user's SSO session, passing the access token seamlessly to Collabora Online.
- **Isolated File Security**: HCL Connections continues to independently evaluate file-level Access Control Lists (ACLs) and application roles (collabora-editor) for every file request.


## Infrastructure and header size requirements

OIDC tokens contain user claims, groups, and directory metadata, making them considerably larger than traditional session cookies. All reverse proxies and web servers in front of WebSphere must be configured to accept larger HTTP request headers to prevent requests from being blocked before reaching the application server.

### IBM HTTP Server configuration
In your `httpd.conf` file, increase the maximum request line and header field size limits:

```apache
# Allow large OIDC tokens in request headers
LimitRequestLine 65536
LimitRequestFieldSize 65536
```
Restart IBM HTTP Server after saving these changes.

### Reverse proxy configuration
If an additional reverse proxy (for example, NGINX) sits in front of IBM HTTP Server or WebSphere Application Server, update its buffer settings accordingly:

```nginx
# NGINX large header buffer configuration
large_client_header_buffers 4 64k;
http2_max_header_size 64k;
```

## Troubleshooting

| Symptom | Cause | Solution |
| :--- | :--- | :--- |
| HTTP 400 or 413 error on WOPI requests | OIDC token headers exceed the maximum allowed size of IHS or the fronting reverse proxy. | Increase LimitRequestFieldSize in IHS httpd.conf and restart IHS. |
| HTTP 401 Unauthorized from WebSphere | WebSphere OIDC TAI rejected or failed to validate the inbound token, or central OIDC is misconfigured. | Verify central WebSphere OIDC Relying Party TAI configuration, issuer URL, client ID settings, and ensure standard OIDC SSO is working. |
| HTTP 403 Forbidden in Files | The authenticated user lacks document access OR is missing the collabora-editor role. | Ensure that the required Files application roles are mapped  correctly within WebSphere Application Server, verify that the user is mapped to the standard authenticated collabora-editor role.


**Parent Topic**: [Installing and Configuring Collabora Online](../admin/t_admin_inst_config_collabora.md)