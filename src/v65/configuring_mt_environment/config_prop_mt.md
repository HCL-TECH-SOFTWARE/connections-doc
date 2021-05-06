<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE task PUBLIC "-//OASIS//DTD DITA Task//EN" "task.dtd">

# Configuration properties

This section describes the available/necessary configuration properties as well as what they refer to and their default values

**WebSphere and environment properties**

| **Name** | **Description** | **Default** |
| --- | --- | --- |
| DMGR\_PROFILE | The path to the DMGR profile | /opt/IBM/WebSphere/AppServer/profiles/Dmgr01 |
| DMGR\_NAME | The name of the DMGR profile | Dmgr01 |
| WAS\_HOME | The path to the WebSphere AppServer installation root | /opt/IBM/WebSphere/AppServer |
| APPSRV\_PROFILE | The Application Server profile path | /opt/IBM/WebSphere/AppServer/profiles/AppSrv01 |
| IHS\_HOME | The IBM HTTP Server path | /opt/IBM/HTTPServer |
| DMGR\_SOAP\_PORT | The SOAP port that is used to access the MBeans of the DMGR process. This value can be found in WAS console/ISC: System Administration WAS console/ISC: System Administration > Deployment manager > Additional Properties > Ports | 8879| |
| CELL\_NAME | The cell name of the Connections installation. This value can be retrieved by looking into the config directory:  ls -l $DMGR_PROFILE/config/cells | Cell01|
| WASADMIN\_USER | The username of the wasadmin user | wasadmin |
| WASADMIN\_PASSWORD | The password of the wasadmin user | password |
| CONNECTIONS\_PATH | The path to the Connections content folder | /opt/HCL/Connections |
| AUTODEPLOY\_HOME | The path to the AutoDeploy installation. If AutoDeploy is not installed on this machine, this path will be used as the installation directory | /opt/HCL/autodeploy|
| AUTODEPLOY\_AUTH\_METHOD | The method of authentication for AutoDeploy - supported methods are [password, pubkey] | password |
| AUTODEPLOY\_AUTH | The means of authentication - this can be either a password or the path to a RSA public key file. Sample: AUTODEPLOY\_AUTH=password, AUTODEPLOY\_AUTH=/home/user/.ssh/id\_rsa. Leaving this blank will mean that the according value (based on AUTODEPLOY\_AUTH\_METHOD) will be prompted for |NO VALUE SET BY DEFAULT |
| DB2\_USER | Specify the username of the DB2 user. This is the OS user that has access rights to the DB2 WIKIS and FILES database to initiate SQL scripts with | db2inst1 |
| DB2\_PASSWORD | Specify the password of the DB2 user | password |
|   


**HCL Connections configuration properties**

The following properties are required to update Connections configuration files (LotusConnections-config.xml, directory.services.xml, mobile-config.xml)

| **Name** | **Description** | **Default** |
| --- | --- | --- |
| mt.connections.url | The hostname/domain of the Connections MT installation. E.g. connmt.mycompany.com | NO VALUE SET BY DEFAULT |
| mt.connections.url.parent | The parent domain of the Connections MT installation. E.g. if your Connections MT domain is &quot;connmt.mycompany.com&quot;, the parent domain should be &quot;mycompany.com&quot; | NO VALUE SET BY DEFAULT |
| mt.ldap.url | The URL to the LDAP including protocol and port. E.g. ldap://connmt-ldap.mycompany.com:389 | NO VALUE SET BY DEFAULT |
| mt.ldap.security.authentication | The authentication type to be used. Available options are: 1) none = no authentication, 2) simple = authenticating via user credentials | none |
| mt.ldap.security.principal | The user principal to be used for LDAP authentication. E.g. cn=root,dc=mycompany,dc=com | NO VALUE SET BY DEFAULT |
| mt.ldap.baseDN | The base DN entities are added to in the user directory. E.g. ou=collab,dc=mycompany,dc=com | NO VALUE SET BY DEFAULT |
| mt.ldap.security.password | The password to be used for LDAP authentication | NO VALUE SET BY DEFAULT |
|

**OIDC configuration properties**

The following properties are required to configure WebSphere as an OIDC relying party for the Keycloak OIDC provider

| **Name** | **Description** | **Default** |
| --- | --- | --- |
| mt.oidc.enabled | If an OIDC provider is in place and should be configured for usage, please enable it with value &#39;true&#39;. Any property with prefix mt.oidc. is only used if OIDC provider should be configured for usage as well. | false |
| mt.oidc.realmName | OIDC realm name | connmt |
| mt.oidc.identifier | OIDC identifier - the identifier for OIDC provider (keycloak) | keycloak |
| mt.oidc.clientId | OIDC client\_id from OIDC provider | connmt |
| mt.oidc.clientSecret | OIDC client\_secret from OIDC provider when registering Connections server as a client | NO VALUE SET BY DEFAULT |
| mt.oidc.rte.clientId | OIDC client\_id for Rich Text Editor OAuth endpoint from OIDC provider | conn-rte |
| mt.oidc.rte.clientSecret | OIDC client\_secret for Rich Text Editor OAuth endpoint from OIDC provider | NO VALUE SET BY DEFAULT |
| mt.oidc.ee.clientId | OIDC client\_id for Embedded Experience OAuth endpoint from OIDC provider | conn-ee-kc |
| mt.oidc.ee.clientSecret | OIDC client\_secret for Embedded Experience OAuth endpoint from OIDC provider | NO VALUE SET BY DEFAULT |
| mt.oidc.scope | OIDC scope of the token | openid |
| mt.oidc.host | OIDC hostname (without protocol or port). E.g. oidc-provider.mycompany.com | NO VALUE SET BY DEFAULT |
| mt.oidc.port | OIDC server port | 443 |
| mt.oidc.discoveryEndpointUrl | Discovery URL for OIDC provider endpoints. E.g. https://oidc- provider.mycompany.com/auth/realms/connmt/.well-known/openid-configuration | NO VALUE SET BY DEFAULT |
| mt.oidc.authorizeEndpointUrl | Authorization URL for OIDC provider. E.g. https://oidc- provider.mycompany.com/auth/realms/connmt/protocol/openid-connect/auth | NO VALUE SET BY DEFAULT |
| mt.oidc.tokenEndpointUrl | Token URL for OIDC provider. E.g. https://oidc- provider.mycompany.com/auth/realms/connmt/protocol/openid-connect/token | NO VALUE SET BY DEFAULT |
| mt.oidc.logoutEndpointUrl | Logout URL for OIDC provider. E.g. https://oidc- provider.mycompany.com/auth/realms/connmt/protocol/openid-connect/logout | NO VALUE SET BY DEFAULT |
| mt.oidc.introspectEndpointUrl | Introspect URL for OIDC provider. E.g. https://oidc- provider.mycompany.com/auth/realms/connmt/protocol/openid-connect/token/introspection | NO VALUE SET BY DEFAULT |
| mt.oidc.jwkEndpointUrl | Certicate location URL on oidc provider. E.g. https://oidc- provider.mycompany.com/auth/realms/connmt/protocol/openid-connect/certs | NO VALUE SET BY DEFAULT |
| mt.oidc.issuerIdentifier | URL for issuing OIDC provider. E.g. https://oidc-provider.mycompany.com/auth/realms/connmt | NO VALUE SET BY DEFAULT |
| mt.oidc.signVerifyAlias | OIDC certificate name of server hosting keycloak. E.g. oidc-provider.mycompany.com | NO VALUE SET BY DEFAULT |
|

**MT provisioning configuration properties**

The following properties are used to entitle existing users and organizations for using Connections MT

| **Name** | **Description** | **Default** |
| --- | --- | --- |
| provision.mt.url | The base Connections URL.E.g.https://mymachine.mycompany.com:9443orhttps://mymachine.mycompany.com | NO VALUE SET BY DEFAULT |
| provision.mt.ldapurl | The LDAP URL. E.g. ldap://connmt-ldap.mycompany.com:389 | NO VALUE SET BY DEFAULT |
| provision.mt.ldapUserName | The LDAP user name / bind DN. | cn=root |
| provision.mt.ldapPassword | The LDAP password of the bind DN user | password |
| provision.mt.saasOrganizationsLdapDN | The Base DN of saasOrganizations,e.g. cn=Organizations,ou=saasOrganizations,dc=mycompany,DC=com | NO VALUE SET BY DEFAULT |
| provision.mt.defaultSubscriberLocale | Default language locale for users/subscribers | en\_US |
| provision.mt.bssAdminUsername | Username of admin user that should be used for provisioning entitlements | bssAdmin |
| provision.mt.bssAdminPassword | Password of admin user that should be used for provisioning entitlements | password |
| provision.mt.saasOrganizationId | LDAP identifier attribute for organizations | ibm- socialOrganizationId |
| provision.mt.saasSubscriptionsRDN | LDAP relative DN for users | cn=Users |
| provision.mt.saasSubscriptionId | LDAP identifier attribute for users | ibm-socialPersonId |
| provision.mt.defaultQuotaSiz | Default file library size for users | 524288000 |
| provision.mt.defaultTransferQuota | Default transfer size for users | 102410000 |
| provision.mt.defaultAllowDataOverage | Defines whether users can leverage data overage | true |
| provision.mt.ldapOrganizationFilter | Filter for search queries over all organizations | o=\* |
| provision.mt.ldapSubscriptionFilter | Filter for search queries over all subscriptions | cn=\* |
|
<?tm 1541016643182 1 HCL Connections ?>

