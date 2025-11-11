# Configuring Connections to support Keycloak OIDC Authentication {#t_keycloack_config_auth_oidc .concept}

Update HCL Connections configuration files to add the properties needed to support Keycloak OIDC authentication.

## Before you begin {#section_un1_5gg_v4b .section}

[Update WebSphere to support Keycloak OIDC Authentication for Connections](t_keycloak_oidc_websphere.md)

## Updating Connections configuration files {#section_l53_np5_t4b .section}

For background on how to edit the LotusConnections-config.xml file, see [Common configuration properties](../admin/r_admin_common_props.md) and [Changing common configuration property values](../admin/t_admin_common_changing_config.md).

We need to update the `LotusConnections-config.xml` the `service-location.xsd` and the `opensocial-config.xml` & `mobile-config.xml` (for Desktop Plugin & Mobile CClient)


1. **LotusConnections-config.xml Changes**
    
    In the `LotusConnections-config.xml` file, update the oidc_op service with the property below:
    
    ```bash
    <sloc:serviceReference bootstrapHost="admin_replace" bootstrapPort="admin_replace" clusterName="" enabled="true" serviceName="oidc_op" ssl_enabled="true">
        <sloc:href>
            <sloc:hrefPathPrefix>/auth/realms/{realm}/.well-known/openid-configuration</sloc:hrefPathPrefix>
            <sloc:static href="http://{keycloak_server}" ssl_href="https://<IDP_HOSTNAME>"/>
            <sloc:interService href="https://{keycloak_server}"/>
        </sloc:href>
    </sloc:serviceReference>
    ```

    In the `LotusConnections-config.xml` file, add or update these generic properties as follows:

    ```bash
    <genericProperty name="com.hcl.connections.rte.acceptIncomingOAuthTokens">true</genericProperty>
    <genericProperty name="com.hcl.connections.rte.acceptIncomingOAuthTokensFromSubject">true</genericProperty>
    <genericProperty name="com.hcl.connections.rte.azureEnabled">true</genericProperty>

    ```

2.  **opensocial-config.xml changes**
    In the `opensocial-config.xml` file, update the useSSO property to true:

    ```bash
    <connections-ee-settings useSSO="true" preloadJS="false" preloadJSSafari="true" />
    ```
    !!! note
        
        The useSSO property is similar to the properties discussed in [Security token properties](../admin/r_admin_oauth_security__token_props.md) 

3. **service-location.xsd changes**
    Add Service entry in service-location.xsd file (If not present)
    
    ```bash
    <xsd:enumeration value="oidc_op"/>
    ```

## Adding rewrite rules in web server/reverse proxy {#section_btx_np5_t4b .section}

Since some Connections login urls are not protected and intercepted by the OIDC Provider add Rewrite Rules in reverse proxy to redirect these requests to a protected url.

1.  Go to /http\_server\_root/HTTPServer/conf
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

3.  Add redirect for the OIDC discovery for the Keycloak server:

    ```
    Redirect "/auth/realms/{realm}/.well-known/openid-configuration"  
    "https://{keycloak_server}/auth/realms/{realm}/.well-known/openid-configuration" 
    ```

    !!! note 
        
        Use the value for {realm} from Step 1 of Configuring KeyCloak as an OIDC provider for Connections.


## Updating the SameSite cookie attribute {#section_fqy_np5_t4b .section}

Chrome and other browsers are changing to require the SameSite cookie attribute. This interferes with the CORs conversation between Keycloak and the WebSphere TAI. 

On the web server or load balancer, add a rule to add SameSite=None to cookie attributes. For example, in the httpd.conf file, add this line to set the cookie SameSite attributes to None through the Header directive.

    
    Header edit Set-Cookie ^(.*)$ "$1; SameSite=None;Secure"
    

## Updating mobile config file for Mobile Client

1. Find <SecuritySettings> tag in mobile config and make sure it is enabled
    
    <SecuritySettings enabled="true">

2. Update below mentioned security settings.
    
    Authentication Mechanism that is  <AuthType> should be oAuth
        
    `<AuthType>OAuth</AuthType>`

3. Update <OAuthAuthorizationURL/>
    
    `<OAuthAuthorizationURL>https://{keycloak_server}/auth/realms/{realm}/protocol/openid-connect/auth</OAuthAuthorizationURL>`

4. Update <OAuthTokenURL/>
    
    `<OAuthTokenURL>https://{keycloak_server}/auth/realms/{realm}/protocol/openid-connect/token</OAuthTokenURL>`

5. Update <OAuthClientId/>. Provide client id as configured in keycloak for mobile/desktop client.
        
    `<OAuthClientId>connections_social_mobile</OAuthClientId>`

6. Update <OAuthScopes>
    
    `<OAuthScopes>openid profile email</OAuthScopes>`

**Parent topic:** [Enabling Keycloak as an OIDC provider for Connections](../secure/c_keycloak_oidc.md)

