# Applying the Microsoft Teams domain change using the latest Component Pack {#t_ms_teams_domain_change_ifix .task}

Microsoft is migrating Teams and other Microsoft 365 applications from `teams.microsoft.com` to the unified `cloud.microsoft` domain. This change affects HCL Connections integrations that embed content inside the Microsoft Teams interface such as tab apps and messaging extensions. If you do not apply the updates described here, Connections content might fail to render in Teams when accessed from the `teams.cloud.microsoft` domain.

For more information about the Microsoft domain migration, see [Action required: ensure your Microsoft Teams apps are ready for upcoming domain changes](https://devblogs.microsoft.com/microsoft365dev/action-required-ensure-your-microsoft-teams-apps-are-ready-for-upcoming-domain-changes/).

This update addresses the following:

- [Install or upgrade Component Pack to the latest build](#update_component_pack)
- [Update Content Security Policy headers to include the `.cloud.microsoft` domain](#csp_headers)
- [Verify email permission in Microsoft Entra ID app registration](#entra_email_permission)
- [Verify Microsoft TLS CA certificate in WebSphere truststore](#websphere_truststore)

## Before you begin {#prereqs .section}

Ensure that the Microsoft Teams integration is configured for your HCL Connections environment. For more information, see [Integrating Connections and Microsoft Teams](c_ms_teams_integration_container.md) for the full setup procedure.

## Install or upgrade Component Pack to the latest build {#update_component_pack .section}

The Teams add-in includes a fix that adds support for the `cloud.microsoft` domain. This fix is included in the latest Component Pack build. For a new installation, no further action is required. For existing deployments, you must upgrade the Component Pack to use the updated Teams add-in.

For instructions, see [Installing or upgrading Component Pack for Connections](../../admin/install/cp_install_config_intro.md).

## Update CSP headers to include the cloud.microsoft domain {#csp_headers .section}

The `Content-Security-Policy` `frame-ancestors` directive on IBM HTTP Server controls which domains can embed Connections content in an iframe. The new `*.cloud.microsoft` domain must be added so that Connections content loads correctly when Teams uses the new domain.

1.  Open the `httpd.conf` file on your IBM HTTP Server.

2.  Locate the existing `Content-Security-Policy` header for the Microsoft Teams integration. It looks similar to the following:

    ```
    Header always set Content-Security-Policy "frame-ancestors 'self' teams.microsoft.com *.teams.microsoft.com *.skype.com"
    ```

3.  Add `*.cloud.microsoft` to the `frame-ancestors` directive:

    ```
    Header always set Content-Security-Policy "frame-ancestors 'self' teams.microsoft.com *.teams.microsoft.com *.skype.com *.cloud.microsoft"
    ```

4.  Restart IBM HTTP Server for the changes to take effect.

!!! note

    If you use the Microsoft Outlook add-in and have combined the CSP headers, ensure that the combined directive includes all required domains for both Teams and Outlook.

## Verify email delegated permission in Microsoft Entra ID {#entra_email_permission .section}

The OIDC Relying Party TAI on WebSphere employs `userIdentifier=email` to map JWT claims to LDAP users. If you do not grant the `email` delegated permission in the Microsoft Entra ID app registration, the JWT issued by Microsoft does not include the `email` claim. This missing claim might cause authentication to fail with a `401 invalid_token` error. Ensure that your app registration includes this permission.

1.  Sign in to the [Azure portal](https://portal.azure.com) with an administrator account that has sufficient rights to manage applications.

    !!! note

        For information about the permissions required by the administrator, see [Microsoft Entra built-in roles](https://learn.microsoft.com/en-us/azure/active-directory/roles/permissions-reference) in the Microsoft documentation.

2.  Select or find **App Registrations** and then click on the **Azure app** for HCL Connections Teams integration.

3.  Navigate to **Manage** > **API Permissions**.

4.  Verify that the following **Microsoft Graph** delegated permissions are present:

    - `email`
    - `offline_access`
    - `openid`
    - `profile`

    If the `email` permission is missing, click **Add a permission** > **Microsoft Graph** > **Delegated permissions**. Select the **email** checkbox, and then click **Add permissions**.

5.  Click **Grant admin consent** for your tenant name.

    !!! important

        Administrator consent is required. If you do not grant consent, Microsoft Entra ID does not include the `email` claim in the JWT, even if the permission is listed. In this case, users might receive `401 invalid_token` errors when they access Connections from Teams.

6.  Navigate to **Manage** > **Token configuration**.

7.  Verify that the `email` optional claim is configured for the **Access** token. If it is missing, click **Add optional claim**, select **Access** token, choose **email** from the list, and click **Add**.

## Verify Microsoft TLS CA certificate in WebSphere truststore {#websphere_truststore .section}

The OIDC Relying Party TAI fetches JWKS signing keys from `login.microsoftonline.com` to verify JWT signatures. If the WebSphere `CellDefaultTrustStore` does not include the Microsoft TLS CA certificate (for example, **Microsoft Azure RSA TLS Issuing CA 03**), WebSphere cannot establish a secure connection to retrieve the signing keys and can result in the following error:

```
CWTAI2047E: No key was found to verify the signature.
```

To verify or import the certificate:

1.  Log in to the WebSphere administrative console.

2.  Navigate to **Security** > **SSL certificate and key management**.

3.  Click **Manage endpoint security configurations**.

4.  In the **Outbound** section, select the appropriate configuration and click **Key stores and certificates**.

5.  Select **CellDefaultTrustStore** and click **Signer certificates**.

6.  Click **Retrieve from port**.

7.  Enter the following values:

    | Field  | Value                          |
    |--------|--------------------------------|
    | Host   | `login.microsoftonline.com`    |
    | Port   | `443`                          |
    | Alias  | `MicrosoftAzureTLS`            |

8.  Click **Retrieve signer information** and verify that the certificate chain includes the expected Microsoft TLS CA certificate (for example, Microsoft Azure RSA TLS Issuing CA 03).

9.  Click **OK** and save the changes.

10. Synchronize all nodes.

11. Restart the WebSphere server.

!!! note

    Microsoft might rotate its TLS certificates periodically. If you encounter `CWTAI2047E` errors in the future, repeat the previous steps to import the updated certificate. For information about this error, see [Azure TLS certificate changes](https://learn.microsoft.com/en-us/azure/security/fundamentals/tls-certificate-changes) in the Microsoft documentation.

**Parent topic:** [Integrating Connections and Microsoft Teams](c_ms_teams_integration_container.md)
