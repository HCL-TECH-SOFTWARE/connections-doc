# Configuring Connections to support Azure OIDC single sign-on {#t_azure_config_conn_oidc .concept}

Update TCL Connections configuration files to add the properties needed to support Microsoft Azure Active Directory OIDC single sign-on.

## Before you begin {#section_un1_5gg_v4b .section}

[Update WebSphere to support Azure AD OIDC authentication for Connections](t_azure_oidc_websphere.md)

## Updating Connections configuration files {#section_l53_np5_t4b .section}

For background on how to edit the LotusConnections-config.xml file, see [Common configuration properties](../admin/r_admin_common_props.md) and [Changing common configuration property values](../admin/t_admin_common_changing_config.md).

The useSSO property is similar to the properties discussed in [Security token properties](../admin/r_admin_oauth_security__token_props.md).

1.  In the `LotusConnections-config.xml` file, add the generic property as follows:

    ```bash
    <genericProperty name="com.hcl.connections.rte.acceptIncomingOAuthTokens">true</genericProperty>
    ```

2.  In the `opensocial-config.xml` file, update the useSSO property to true:

    ```bash
    <connections-ee-settings useSSO="true" preloadJS="false" preloadJSSafari="true" />
    ```


## Adding rewrite rules in web server/reverse proxy {#section_btx_np5_t4b .section}

Since some Connections login urls are not protected and intercepted by the OIDC Provider add Rewrite Rules in reverse proxy to redirect these requests to a protected url.

1.  Go to `/http\_server\_root/HTTPServer/conf`
2.  Edit the `ihs-upload-rewrite.conf` file, adding the following rules:

    ```bash
    Redirect /communities/login /communities/service/html/login
    Redirect /homepage/login /homepage/	
    Redirect /homepage/auth/login.jsp /homepage/
    Redirect /activities/auth/login.jsp /activities
    Redirect /profiles/login /profiles/html/myProfileView.do
    RedirectMatch /profiles/profile.do(.*) /profiles/html/myprofile.do$1
    Redirect /forums/auth/login /forums/html/my
    Redirect /blogs/login /blogs/roller-ui/myblogs/edit
    Redirect /mobileAdmin/login /mobileAdmin/console
    ```

3.  OIDC discovery for the Azure server:

    ```bash
    Redirect "/.well-known/openid-configuration" 
    https://login.microsoftonline.com/{tenant}/v2.0/.well-known/openid-configuration 
    ```

    !!! note 
        
        Use the value for \{tenant\} from step 3 of [Adding an application in Azure AD for SSO with Connections](t_azure_add_app.md).


## Updating the SameSite cookie attribute {#section_fqy_np5_t4b .section}

Chrome and other browsers are changing to require the SameSite cookie attribute.

On the web server or load balancer, add a rule to add SameSite=None to cookie attributes. For example, in the httpd.conf file, add this line to set the cookie SameSite attributes to None through the Header directive.

```bash 
Header edit Set-Cookie ^(.*)$ "$1; SameSite=None;Secure"
```

**Parent topic:** [Enabling single sign-on with OIDC for Microsoft Azure AD](../secure/c_azure_oidc_container.md)

