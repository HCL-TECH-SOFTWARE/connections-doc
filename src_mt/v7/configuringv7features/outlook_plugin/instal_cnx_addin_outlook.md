# Installing and Configuring Connections Add-In for Microsoft Outlook in an MT Environment

With the Connections Add-in for Microsoft Outlook, users can work with Connections content from within their Outlook inbox.

Refer to the [Installing via Component pack or Standard Install](https://help.hcltechsw.com/connections/v7/connectors/admin/c_outlook_addin_installing.html) topic and decide which install you prefer, Component Pack or a Standard Install.  Follow the instructions there but note the changes below which are specific to MT environments.

## First Steps

In addition to [Registering the Connections Add-in for Outlook OAuth application provider](https://help.hcltechsw.com/connections/v7/admin/install/cp_3p_outlook_addin_oauth.html), you will need to [Enable single sign-on (SSO) using Keycloak Authentication](https://opensource.hcltechsw.com/connections-doc/v7/keycloak_authentication_sso/keycloak_auth_sso.html).  Follow the instructions for the Outlook Add-in.

## Using Ansible Scripts
The content in this section supplements the content in the Using Ansible Scripts topic - refer to [Ansible automation option provided by HCL](https://help.hcltechsw.com/connections/v7/admin/install/cp_install_upgrade_container.html#cp_install_upgrade_container__section_lly_2sn_tnb) for additional information. This section applies if you're planning to use the ansible scripts.

The ansible scripts will need to be updated with MT-specific values for MT environments.

- Update tenant information in group vars (located in `ansible/environments/<MT_ENVIRONMENT>/group_vars/all.yml`)

  - *outlook_tenant* – A comma delimited string of MT tenant (subdomains) names for which the Outlook Add-in will be made available. This variable is used when starting the docker container to generate the manifest.xml files for each tenant.  For example, `outlook_tenant: mtdemo-orga,mtdemo-orgb`
  - *outlook_mt_auth_url* - Path (relative to AUTH_DOMAIN) used by the addin to obtain OIDC auth configuration and endpoints. By default this should be the Mobile security configuration endpoint.  Do NOT start with `/`.   For example, `outlook_mt_auth_url: mobile/homepage/SecurityConfiguration?debug=true`


- Update helm variables for the Outlook Add-in in YAML file (located in `ansible/roles/hcl/component-pack/templates/helmvars/outlook-addin.yml.j2`). Refer to the Updating the Connections Add-In for Outlook Environment Variables section in this document for details on the environment variables.

## Updating the Connections Add-In for Outlook Docker Environment Variables

The content in this section replaces the variables referenced in the [Installing Outlook Add-in Standalone - Updating the Connections Add-in for Outlook Environment Variables](https://help.hcltechsw.com/connections/v7/connectors/admin/t_outlook_addin_standalone_install.html) topic.

The Connections Add-in for Outlook relies on environment variables for configuration. These will need to be modified to fit your environment before running the Connections Add-in for Outlook docker image. The environment variables and their default values are in the **override.yaml** file. Depending on your deployment, you can either modify the **override.yaml** file and pass that on the deployment step, or you can pass the updated individual variables on the command line.

### What must be overridden

- **CONNECTIONS_URL** – Leave blank (“”) for multi-tenant environment. The CONNECTIONS_URL is NOT required in a multitenant environment because it differs per tenant. This variable will be automatically generated for each tenant when the docker container is started, and is calculated as follows: `https://<TENANT>.<MT_DOMAIN>/`
- **CONNECTIONS_CLIENT_SECRET** - Leave blank (“”) for multi-tenant environment.
- **CONNECTIONS_CLIENT_ID** - Default “connections_social_mobile” for multi-tenant environment. Client ID used when registering OAuth app.
- **AUTH_DOMAIN** - URL of your Connections auth domain without a trailing slash and not including tenant subdomains. For example, `https://my.connections.myauthdomain`. Domain used for authentication. Do not end with a ‘/’
- **AUTH_DISCOVERY_PATH** - Keep “mobile/homepage/SecurityConfiguration?debug=true” for multi-tenant environment. A path to the Mobile security configuration endpoint used by the add-in to obtain OAuth configuration and endpoints.
- **MT_DOMAIN** - The top-level multitenant domain without protocol or tenant subdomains. This variable is used when starting the docker container to generate the manifest.xml files. For example, `connections.mydomain.com`
- **TENANTS** - For example, `<ORG-1_Name>,<ORG-2_Name>` A comma delimited string of multi-tenants (subdomains) This variable is used when starting the docker container to generate the manifest.xml files for each tenant. For example, `mtdemo-orga,mtdemo-orgb`
- **DISCOVERY_DOMAIN** – Tells the add-in what to use as the domain, or first part of, the AUTH_DISCOVERY_PATH. Possible values: "auth" (use the AUTH_DOMAIN variable) or "connections" (use the CONNECTIONS_URL as generated for the tenant). Default: "connections".
 
### What may be overridden

- **CONTEXT_ROOT** - The path to where the Connections Add-in for Outlook is being served, relative to the CONNECTIONS_URL. Do NOT start or end with `/`. Default: **outlook-addin**
- **SUPPORT_URL** - A URL that an end user can go to for information. Refer to the [Using the HCL Connections Add-in for Microsoft Outlook](https://help.hcltechsw.com/connections/v7/connectors/enduser/c_ms_plugins_add_in_outlook.html).
- **CONNECTIONS_NAME** – A custom display name for the add-in. (Default: 'HCL Connections')
- **EWS_HOSTNAME** – The hostname for Exchange Web Services. Default: 'outlook.office365.com' A custom display name for the add-in. (Default: 'HCL Connections')

**Note:**  Take care about ingresses listed there. You should point to both frontend domain and internal domains if both are used. Otherwise, only point to the one that is used in your case. 

