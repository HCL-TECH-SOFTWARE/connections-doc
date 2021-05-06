<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE task PUBLIC "-//OASIS//DTD DITA Task//EN" "task.dtd">

# Using Keycloak Identity Providers with Mobile and Plugins

When the Connections Mobile and Connections Plugin applications request OAuth tokens from Keycloak, they will first authenticate the user by calling the Keycloak authentication endpoint. By default, Keycloak will display a user login form and optionally will provide a list of Identity Providers for which this user could choose to authenticate. However, in a Multi-Tenant environment, the tenant provider should either customize the login form to make it specific for this particular tenant that is logging in, or possibly route the login request to a tenant specific Identity Provider, which would perform the authentication of the user. In either of the cases however, Keycloak will need some sort of hint from the login request to understand which "tenant" this login should apply.

By default, there is no tenant information such as the hostname of the tenant embedded within the auth request made from the client apps to Keycloak. The apps make a REST call directly to the Keycloak server and provide only the minimum required information needed by an OAuth provider. For example, the apps would make a call similar to the following:

```
https://login.example.com/auth/realms/connmt/protocol/openid-connect/auth? response_type=code&code_challenge_method=S256&scope=openid%20offline_access&code_challenge=9aE4DTOwWk66U8Hh2k1TpSBelWggFnroXEkRmIbAAVY&redirect_uri=com.ibm.ibmscp://com.ibm.mobile.connections/token&client_id=connections_social_mobile&state=Q5t9rXggFR7VB0HyYOL2b_- vFMLlHPiO9OGRUE6O5a0
```

**Note:**  Keycloak recognizes a Keycloak unique parameter called kc_idp_hint. If Keycloak detects this parameter, it checks the value against its list of Identity Provider aliases, and if a match is found, the login request will skip the Keycloak login form and be routed directly to that identity provider.

**Solution**

The Connections mobile server, mobile apps and plugins support additional custom parameters on the OAuth authentication URL. 

These parameters must be added to the mobile-config.xml file on the Connections server, and then will be discovered by each of the applications during their login process. This XML comment describes the OAuthAuthorizationURL_Parameter value:

```
<!-- OAuthAuthorizationURL_Parameters: Optional. If custom request parameters are required on the OAuthAuthorizationURL request, add the parameters here. The mobile and plugins apps will append these parameters when requesting app and user authorization.
Separate parameters using the "&amp;" string. This will be converted to a single "&" when used by the client apps.
```

Parameter values support the following substitution tokens. If these tokens are used as part of the value for a given parameter, they will be replaced with a dynamic value at runtime. Supported substitution tokens:

-  {MT_HOSTNAME} = The fully qualified tenant specific hostname for this instance. For example, "tenant.example.com".
-  {MT_ORGNAME} = The tenant org name for this instance. For example, if the MT_HOSTNAME is "tenant.example.com", the

For example:
<OAuthAuthorizationURL_Parameters>parameter1=value1&amp;parameter2={MT_ORGNAME}</OAuthAuthorizationURL_Parameters>

The parameter name that is added could be something generic like mt_hostname={MT_HOSTNAME} or mt_org={MT_ORGNAME}. Or, if you are already assigning an Identity provider alias in Keycloak that exactly matches the tenant org name, then you could directly add the parameter **kc_idp_hint=
{MT_ORGNAME}**. With this approach, there would not be a requirement for an NGINX or edge proxy rule to manipulate the tenant identity to the proper value required for kc_idp_hint.

To add tenant specific information to the authentication request, follow these steps:

1.  On the Connections server, edit the mobile-config.xml file located in the DMgr profile. Typically this file structure would be similar to /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/config/cells/mtdemo1Cell01/LotusConnections-config.  
2.  Find the key in the file called *OAuthLogoutURL*. Add a new line here and insert the following section. Note that the value is just an example and should be customized to your environment.  
    - *OAuthAuthorizationURL_Parameters mt_org={MT_ORGNAME}/OAuthAuthorizationURL_Parameters*  
3. Save the file
4. Perform a Full Synchronization for all nodes using the WebSphere admin console  
5. Restart the mobile application using the WebSphere admin console  
   
If you are using the parameter kc_idp_hint directly, then no further steps should be necessary on the Keycloak side. However, if your Keycloak alias naming convention does not match the customer org name and/or you are using a different parameter name, it may be necessary to add an NGINX or proxy rule to modify the incoming auth requests.

**Verifying the changes**
Once the changes have been made, do the following:
1. Using a desktop browser and the hostname of one of your tenants, open this URL: https://tenant_org_hostname/mobile/homepage/SecurityConfiguration?debug=true Verify that the returned JSON includes the correct key and value for OAuthAuthorizationURL_Parameters.
2. Once #1 is checked, login to this tenant using a Connections Mobile app or Connections desktop plugin application to verify login works properly.

**IMPORTANT**
The behavior described in this article requires the Connections Mobile app version 6.5.5 or later, or the Connections plugins from late June 2020.

<?tm 1541016643182 1 HCL Connections ?>

