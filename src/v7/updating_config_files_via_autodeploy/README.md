# HCL Connections MT Update

The MT Update project provides an automated way to enable the HCL Connections environment for multi tenancy. This is done via the following steps:
- Update configuration files via HCL AutoDeploy
    - [x] verify applied changes reflect expectations
        - changed files: [LotusConnections-config.xml, mobile-config.xml, forum-config.xml, profiles-config.xml, profiles-types.xml, communities-config.xml, files-config.xml]
    - [x] add directory.services.xml changes
- Run the "configEngine.py" script
    - [x] add file, add script/integrate to run it
- set cloud mode for wikis and files properties
    - [x] need to adjust properties in .properties file
- [x] create appserver script to apply appserver specific changes on nodes
- adjust read role to 'All authenticated users' for all Connections apps
    - [x] adjust reader role via wsadmin script
- [x] map role 'bss-provisioning-admin' for all Connections apps
- execute DB scripts for files and wikis
    - [x] add db scripts, prepare way of running them
    - [x] prepare script to execute on standalone DB2 environment
- [ ] Disable surveys widgets from Communities
- [x] Disable bookmarks in LotusConnections-config
- [x] Disable Community Handles in communities-config
- [x] Disable Feeds widget in widgets-config
- [x] Enable fileSync in files-config
- sync and restart environment
    - [x] should be done automatically if not using --restart in deployRelease
- modify config file ProvisioningConfig.properties
    - [x] add ProvisioningConfig.properties to project, make it configurable
- run entitleOrganizations.sh and entitleUsers.sh for apps
    - [x] add shell scripts to project
    - [x] execute scripts
- install/enable OIDC
    - [ ] [OPTIONAL] documentation/installation of Keycloak (https://www.keycloak.org/)
    - [x] installation and configuration of EAR and TAI related to OIDC
        - [x] map EAR to all existing Clusters
        - [x] Remove InvokeTAIbeforeSSO global security property for all Clusters
        - [x] Update DeferTAItoSSO global security property to use OIDC TAI for all Clusters
        - [ ] generate + propagate plugin?
    - configuration in LCC.xml
        - [x] add ServiceReference for OAuth (or adjust pinkIAM ServiceReference)
    - [x] Add new RTE OAuth J2C Alias to WAS
    - [x] Run NewsOAuth2ConsumerService command to reconfigure OAuth for Embedded Experiences
    - [x] configuration of realm (default trust settings)
    - [x] Add rewrite rules for OIDC provider to IHS
    - [x] Add OIDC Provider signer information to trust store
    - [x] Add ObjectCache for OIDC RP
        - [x] Configure Server dynamic cache service w/ replication domain
    - [x] Add proxy policy if keycloak on different host
    - [x] Invalidate existing OAuth TAI by adjusting the filter properties

## Changes made for 7.0 MT

The following updates are now automated as part of the deployment scripts.  These are either new changes that are required for 7.0 MT or some may have been manual steps that were documented and now are automated.  As a Managed Service Provider, please review this content and the automation files before deploying Connections 7.0 for MT in case you have your own automation which needs adjustments.

1. Update LotusConnections-config.xml, adding 2 more genericProperty elements for `mt_internalhostname` and `mt_externalhostname`. These are required for mail notifications.

2. Update LotusConnections-config.xml, adding 2 more genericProperty elements for `appreg_hostname` and `appreg_protocol`. These represent the hostname and protocol that the mail notification component (or others) inside the Connections server will use to contact the AppRegistry microservice to ask for multi-tenant based configuration.

3. Update LotusConnections-config.xml and enable the extensionRegistry service.  This is used by Chat and Meetings integration.

## Development and release

To build the project, just run
```
> mvn clean install -Dtimestamp=$(date "+%Y%m%d-%H%M")
```

The distribution will be available in directory `connections-mt-update.deployment/target/connections-mt-update-7.0.0.zip`

## How to use

### Dependencies

1. This installer requires an existing and functioning HCL Connections 7.0 installation.

2. The LDAP/user directory connected to the Connections installation should be prepared according to MT requirements (e.g. organization trees containing users)

3. The Keycloak OIDC provider should be installed and configured for the environment. The necessary configuration properties (clientId, clientSecret, etc.) should be noted as they are required as input for the installer.


### Preparing the installer

1. Copy the installation zip to the Deployment Manager server of your Connections environment at your preferred location

2. Extract the archive
```
> unzip connections-mt-update-7.0.0.zip
> ls
connections-mt-update-7.0.0.zip  deployment-units  install  META-INF  version.txt
```
- **Note**: Please leverage a user with appropriate access rights - i.e. one that has similar priviledges as the configured WebSphere user

3. Navigate into the /install directory and open the `config.properties` file with a text editor of your choice
```
> cd install/
> ls
autodeploy-install-cli.sh  config.properties  connections-mt-init-entitlements-cli.sh  connections-mt-update-cli.sh  connections-mt-webserver-update-cli.sh  resources
> vim config.properties
```

4. Fill in the environment-specific properties for each of the configuration parameters. Use the comments as guidance, e.g. by comparing the samples with your existing installation

5. Make shell scripts executable (if necessary)
```
> chmod +x *.sh
```
6. Some changes have been made as to how the shell scripts are to be invoked, and how the WASADMIN password is
   stored in the config.properties files.
   * The scripts __autodeploy-install-cli.sh and connections-mt-update-cli.sh__ now require that you provide WASADMIN
     user name and the WASADMIN password on the command line or that you indicate that those parameters are to be drawn
     from the config file.
       It is still required that a valid configuration file is referred on the command line. Also note if a clear text password is provided in the configuration file, it will be re-written to the config file
     in an encoded form.  This only applies to the WASADMIN password.

   * The scripts __connections-mt-appserver-update-cli.sh, connections-mt-appserver-update-cli.sh,
     connections-mt-webserver-update-cli.sh, connections-mt-db-update-cli.sh, and
     connections-mt-init-entitlements-cli.sh__ still only require that the properties file is passed in.
   * __connections-mt-update-cli.sh and autodeploy-install-cli.sh__ use the following arguments:

      -f (required) with a valid configuration file name.

      -u (optional) with a valid WASADMIN user name

      -p (optional) with a valid WASADMIN password

      -s (optional) used to indicate that WASADMIN
       credentials are taken from the configuration file.

      Note: -p and -u are optional __if and only if__ -s is specified. See the usage examples below.

      Note: Whatever way that the WASADMIN is provided it will be replaced in the properties file in an encoded form.

      Usage: connections-mt-update-cli.sh -f config.properties -u wasadmin -p wasadminpw

      Usage: connections-mt-update-cli.sh -s -f config.properties

  * The other four scripts use the following argument exclusively.

      -f (required) with a valid configuration file name. (see the below usage example)

      Usage: connections-mt-appserver-update-cli.sh -f connections-mt-update.properties

### Installing AutoDeploy v5.3.0+

The installation routine takes advantage of HCL AutoDeploy (https://help.hcltechsw.com/connections/api/assets/autodeploy-html/index.html#) capabilities, e.g. to update existing configuration files. For this, AutoDeploy in version 5.3.0 or higher has to be installed on the environment. If this is already the case the installation can be skipped. The AutoDeploy related configuration properties have to be properly prepared in either case.

To install AutoDeploy, please leverage the provided script `autodeploy-install-cli.sh`
```
> ./autodeploy-install-cli.sh config.properties 2>&1 | tee autodeploy_install.log
```
- **Note**: If you have a previous version of AutoDeploy installed, please install at a different location or back up your installation, as this will overwrite your existing configuration

AutoDeploy requires OS user credentials or a ssh key file (depending on your environment) in order to log in and execute tasks on behalf of the WebSphere administrative user. Please make sure the tool is appropriately prepared to execute the installation with. If there are any issues, the above installation script should already end in some error indicating what may need to be adjusted.
To ensure AutoDeploy will be working, run the command `[PATH_TO_AD_INSTALLATION]/app/console.sh --profilepath [PATH_TO_DMGR_PROFILE]` and check if AutoDeploy starts up without issues. If ssh keys are required, please add the parameters `--pubkey --keyfile=[PATH_TO_KEYFILE]` to the command.
- **Note**: In case of leveraging an SSH key, please make sure the key is added the the `authorized_keys` of the respective OS user. If the installation environment consists of multiple nodes, the key has to be authorized for all nodes.

### Running the installer

Run the updater via provided script `connections-mt-update-cli.sh`.  It is recommended to pipe all of the output to a log file for review.
```
> ./connections-mt-update-cli.sh config.properties 2>&1 | tee mtupdate.log
```

This script will run through various update tasks and will take the configuration file as guidance on where to find or how to update properties and files. Make sure the values reflect your environment.

For Connections MT 7.0.0 you will no longer be prompted for user input. There were two areas where the user could have been prompted in the prior version.
1. User/password prompts in AutoDeploy. Now autodeploy-install-cli.sh and connections-mt-update-cli.sh will check to ensure AUTODEPLOY_AUTH_METHOD and AUTODEPLOY_AUTH are provided in the _config.properties_ file. Also,  WASADMIN_USERNAME and WASADMIN_PASSWORD must also present in the _config.properties_ file as well. If any of those values are omitted, the scripts will terminate.

2. Whether WebSphere nodes should be resynchronized and servers restarted. The script now just resyncs the nodes and restarts the deployment manager and servers, the user is offered no choice because these steps are required anyway. This change was made in connections-mt-update-cli.sh


**Note**: The installer will adjust and extend various parts of the Connections installation related to WebSphere, config files, DB2, web servers and installed applications. As the Connections instance commonly is spread across various servers, the installer may be unable to apply certain changes. For this, the installer provides additional scripts that can be executed directly on the respective server:
- `connections-mt-webserver-update-cli.sh` - applies changes to the Webserver instance. Has to be executed on all servers hosting the IHS web server.
- `connections-mt-db-update-cli.sh` - applies changes to the DB2 schemas and config. Has to be executed on the server hosting DB2.
- `connections-mt-appserver-update-cli.sh` - applies changes to Connections components, and removes one component jar not used MT deployments.
   This script has to be executed on all servers hosting Connections nodes.

To apply the necessary changes, the suggested approach is to copy the installation directory from the Deployment Manager to the respective server, and executing the corresponding script. If any values in the configuration file may differ (e.g. different Application Server path/name), they have to be adjusted before running the script.

### Regenerate the IBM Http Server plugin

After the Connections server has restarted, regenerate and propagate the web server plugin using the WebSphere Administration console.  Follow these steps using the WebSphere Administration console:

- Navigate to Servers > Server Types > Web servers
- Select the webserver and click Generate Plug-in
- Select the webserver and click Propagate Plug-in
- Select the webserver and click Stop
- Select the webserver and click Start

### Restart the DB2 server

When running the MT upgrade scripts, the property DB2_SELECTIVITY will be globally enabled at the DB2 server. If this property was not previously set, a manual DB2 server restart is required prior to validating the Connections server.  Perform the following steps:

- Stop the Connections server applications
- Stop DB2 (force it down if necessary)
- Start DB2

This step must be run prior to provisioning users.

### Provision Connections Users

A sample script has been provided to provision an initial set of users that have been populated in LDAP under `provision.mt.saasOrganizationsLdapDN`.  Running the following script will add these users to Connections and entitle them for Connections services.

```
> ./connections-mt-init-entitlements-cli.sh config.properties 2>&1 | tee mtupdate_entitlements.log
```

## Configuration properties

This section describes the available/necessary configuration properties as well as what they refer to and their default values

### WebSphere and environment properties

| Name | Description | Default |
:------- | :---------------- | :----------
DMGR_PROFILE | The path to the DMGR profile | `/opt/IBM/WebSphere/AppServer/profiles/Dmgr01`
DMGR_NAME | The name of the DMGR profile | `Dmgr01`
WAS_HOME | The path to the WebSphere AppServer installation root | `/opt/IBM/WebSphere/AppServer`
APPSRV_PROFILE | The Application Server profile path | `/opt/IBM/WebSphere/AppServer/profiles/AppSrv01`
IHS_HOME | The IBM HTTP Server path | `/opt/IBM/HTTPServer`
DMGR_SOAP_PORT | The SOAP port that is used to access the MBeans of the DMGR process. This value can be found in WAS console/ISC: System Administration > Deployment manager > Additional Properties > Ports | `8879`
CELL_NAME | The cell name of the Connections installation. This value can be retrieved by looking into the config directory: `> ls -l $DMGR_PROFILE/config/cells` | `Cell01`
WASADMIN_USER | The username of the wasadmin user | `wasadmin`
WASADMIN_PASSWORD | The password of the wasadmin user | `password`
CONNECTIONS_PATH | The path to the Connections content folder | `/opt/HCL/Connections`
AUTODEPLOY_HOME | The path to the AutoDeploy installation. If AutoDeploy is not installed on this machine, this path will be used as the installation directory | `/opt/HCL/autodeploy`
AUTODEPLOY_AUTH_METHOD | The method of authentication for AutoDeploy - supported methods are [password, pubkey] | `password`
AUTODEPLOY_AUTH | The means of authentication. If the value of AUTODEPLOY_AUTH_METHOD is _password_, then this value should be the executing user's password. If the value AUTODEPLOY_AUTH_METHOD is _pubkey_, this value should be the path to the associated __private key__ file (e.g. /home/user/.ssh/id_rsa) | NO VALUE SET BY DEFAULT
DB2_USER | Specify the username of the DB2 user. This is the OS user that has access rights to the DB2 WIKIS and FILES database to initiate SQL scripts with | `db2inst1`
DB2_PASSWORD | Specify the password of the DB2 user | `password`


### HCL Connections configuration properties
The following properties are required to update Connections configuration files (LotusConnections-config.xml, directory.services.xml, mobile-config.xml)

| Name | Description | Default |
:------- | :---------------- | :----------
mt.connections.url | The hostname/domain of the Connections MT installation. E.g. `connmt.mycompany.com` . That is, the entry hostname of your IHS server| NO VALUE SET BY DEFAULT
mt.connections.url.parent | The parent domain of the Connections MT installation. E.g. if your Connections MT domain is "connmt.mycompany.com", the parent domain should be "mycompany.com" | NO VALUE SET BY DEFAULT
mt.ldap.url | The URL to the LDAP including protocol and port. E.g. `ldap://connmt-ldap.mycompany.com:389` | NO VALUE SET BY DEFAULT
mt.ldap.security.authentication | The authentication type to be used. Available options are: 1) none = no authentication, 2) simple = authenticating via user credentials | `none`
mt.ldap.security.principal | The user principal to be used for LDAP authentication. E.g. cn=root,dc=mycompany,dc=com | NO VALUE SET BY DEFAULT
mt.ldap.baseDN | The base DN entities are added to in the user directory. E.g. ou=collab,dc=mycompany,dc=com | NO VALUE SET BY DEFAULT
mt.ldap.security.password | The password to be used for LDAP authentication | NO VALUE SET BY DEFAULT


### OIDC configuration properties
The following properties are required to configure WebSphere as an OIDC relying party for the Keycloak OIDC provider

| Name | Description | Default |
:------- | :---------------- | :----------
mt.oidc.enabled | If an OIDC provider is in place and should be configured for usage, please enable it with value 'true'. Any property with prefix `mt.oidc.` is only used if OIDC provider should be configured for usage as well. | `false`
mt.oidc.realmName | OIDC realm name | `connmt`
mt.oidc.identifier | OIDC identifier - the identifier for OIDC provider (keycloak) | `keycloak`
mt.oidc.clientId | OIDC client_id from OIDC provider | `connmt`
mt.oidc.clientSecret | OIDC client_secret from OIDC provider when registering Connections server as a client | NO VALUE SET BY DEFAULT
mt.oidc.rte.clientId | OIDC client_id for Rich Text Editor OAuth endpoint from OIDC provider | `conn-rte`
mt.oidc.rte.clientSecret | OIDC client_secret for Rich Text Editor OAuth endpoint from OIDC provider | NO VALUE SET BY DEFAULT
mt.oidc.ee.clientId | OIDC client_id for Embedded Experience OAuth endpoint from OIDC provider | `conn-ee-kc`
mt.oidc.ee.clientSecret | OIDC client_secret for Embedded Experience OAuth endpoint from OIDC provider | NO VALUE SET BY DEFAULT
mt.oidc.scope | OIDC scope of the token | `openid`
mt.oidc.host | OIDC hostname (without protocol or port). E.g. `oidc-provider.mycompany.com` | NO VALUE SET BY DEFAULT
mt.oidc.port | OIDC server port | `443`
mt.oidc.discoveryEndpointUrl | Discovery URL for OIDC provider endpoints. E.g. `https://oidc-provider.mycompany.com/auth/realms/connmt/.well-known/openid-configuration` | NO VALUE SET BY DEFAULT
mt.oidc.authorizeEndpointUrl | Authorization URL for OIDC provider. E.g. `https://oidc-provider.mycompany.com/auth/realms/connmt/protocol/openid-connect/auth` | NO VALUE SET BY DEFAULT
mt.oidc.tokenEndpointUrl | Token URL for OIDC provider. E.g. `https://oidc-provider.mycompany.com/auth/realms/connmt/protocol/openid-connect/token` | NO VALUE SET BY DEFAULT
mt.oidc.logoutEndpointUrl | Logout URL for OIDC provider. E.g. `https://oidc-provider.mycompany.com/auth/realms/connmt/protocol/openid-connect/logout` | NO VALUE SET BY DEFAULT
mt.oidc.introspectEndpointUrl | Introspect URL for OIDC provider. E.g. `https://oidc-provider.mycompany.com/auth/realms/connmt/protocol/openid-connect/token/introspection` | NO VALUE SET BY DEFAULT
mt.oidc.jwkEndpointUrl | Certicate location URL on oidc provider. E.g. `https://oidc-provider.mycompany.com/auth/realms/connmt/protocol/openid-connect/certs` | NO VALUE SET BY DEFAULT
mt.oidc.issuerIdentifier | URL for issuing OIDC provider. E.g. `https://oidc-provider.mycompany.com/auth/realms/connmt` | NO VALUE SET BY DEFAULT
mt.oidc.signVerifyAlias | OIDC certificate name of server hosting keycloak. E.g. `oidc-provider.mycompany.com` | NO VALUE SET BY DEFAULT


### MT provisioning configuration properties
The following properties are used to entitle existing users and organizations for using Connections MT

| Name | Description | Default |
:------- | :---------------- | :----------
provision.mt.url | The base Connections URL. E.g. `https://mymachine.mycompany.com:9443` or `https://mymachine.mycompany.com` | NO VALUE SET BY DEFAULT
provision.mt.ldapurl | The LDAP URL. E.g. `ldap://connmt-ldap.mycompany.com:389` | NO VALUE SET BY DEFAULT
provision.mt.ldapUserName | The LDAP user name / bind DN. | `cn=root`
provision.mt.ldapPassword | The LDAP password of the bind DN user | `password`
provision.mt.saasOrganizationsLdapDN | The Base DN of saasOrganizations, e.g. `cn=Organizations,ou=saasOrganizations,dc=mycompany,DC=com` | NO VALUE SET BY DEFAULT
provision.mt.defaultSubscriberLocale | Default language locale for users/subscribers | `en_US`
provision.mt.bssAdminUsername | Username of admin user that should be used for provisioning entitlements | `bssAdmin`
provision.mt.bssAdminPassword | Password of admin user that should be used for provisioning entitlements | `password`
provision.mt.saasOrganizationId | LDAP identifier attribute for organizations | `ibm-socialOrganizationId`
provision.mt.saasSubscriptionsRDN | LDAP relative DN for users | `cn=Users`
provision.mt.saasSubscriptionId | LDAP identifier attribute for users | `ibm-socialPersonId`
provision.mt.defaultQuotaSiz | Default file library size for users | `524288000`
provision.mt.defaultTransferQuota | Default transfer size for users | `102410000`
provision.mt.defaultAllowDataOverage | Defines whether users can leverage data overage | `true`
provision.mt.ldapOrganizationFilter | Filter for search queries over all organizations | `o=*`
provision.mt.ldapSubscriptionFilter | Filter for search queries over all subscriptions | `cn=*`
