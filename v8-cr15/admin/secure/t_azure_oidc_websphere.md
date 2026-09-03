# Updating WebSphere to support Azure AD OIDC authentication for Connections {#t_azure_oidc_websphere .task}

Single sign-on is accomplished by setting up a trust relationship between the Connections server and Microsoft Azure using the WebSphere OpenID Connect Relying Party Trust Association Interceptor (OIDC Relying Party TAI). This requires that the WebSphereOIDCRP application is installed on each cluster.

Complete the steps in [Adding an application in Azure AD for SSO with Connections](t_azure_add_app.md), which results in values that you'll need in step 7 of the following procedure.

1.  For every cluster, deploy WebSphereOIDCRP. In this example, the Connections applications are installed across the four clusters, AppsCluster, InfraCluster, PushCluster, and UtilCluster.

    ![WebSphere screen showing WebSphereOIDCRP associated with four cluster names](azure_websphere_example.jpg)

    !!! note 
        
        The OIDC Replying Party TAI code is shipped as part of WebSphere Application Server. It is recommended that you are running WebSphere 8.5.5.18 which contains all required fixes. However, if you are running an earlier version of WebSphere, you must install at least version 1.3.0 of the OIDC jar. Find the latest version from https://www.ibm.com/support/pages/node/290565.

2.  Apply a unique context root to each of the clusters. For example, for the Apps cluster, go to **Enterprise Applications** > **WebSphereOIDCRP_AppsCluster.ear** > **Context Root For Web Modules**.

    ![Applying context root to cluster](azure_websphere_context_root.jpg)

3.  Apply clusters to each module. For example, for the Apps cluster, go to **Enterprise Applications** > **WebSphereOIDCRP_AppsCluster.ear** > **Manage Modules**.

    ![](azure_websphere_modules.jpg)

4.  Configure Global Security Custom Properties by clicking **Security** > **Global security** > **Custom Properties** and setting these properties to the following values:

    |Property|Value|
    |--------|-----|
    |com.ibm.websphere.security.disableGetTokenFromMBean<br>**Note:** If this property doesn't exist, add it.|false|
    |com.ibm.ws.security.oauth20.tai.OAuthTAI Updates|com.ibm.ws.security.oidc.client.RelyingParty|

5.  Since we are using Azure AD clients for authentication, disable the `com.ibm.ws.security.oauth20.tai.OAuthTAI` filter.

    1. As the WebSphere administrator, in the administrative console, go to **Security** > **Global security** > **Web and SIP security** > **Trust association** > **Interceptors**.

    2. Select `com.ibm.ws.security.oauth20.tai.OAuthTAI`.

    3. Set the `provider_1.filter` name to a dummy value to prevent the interceptor from processing requests.

6.  As the WebSphere administrator, in the administrative console, click **Security** > **Global security** > **Web and SIP security** > **Trust association**.

7.  Click **Interceptors** > **New** to add an interceptor..

8.  For the interceptor class name, enter `com.ibm.ws.security.oidc.client.RelyingParty`.

9.  Add the following properties and values.

    !!! note 
        
        Use the values for `\{client\_id\}`, `\{client\_secret\}`, and `\{tenant\}` that you copied from steps 3 and 4 of the previous procedure.

    | Property | Value |
|----------|------|
| provider_1.identifier | azuread |
| provider_1.clientId | {client_id}<br>Find this value in Azure Connections application configuration |
| provider_1.clientSecret | {client_secret} |
| provider_1.signatureAlgorithm | RS256 |
| provider_1.scope | openid profile email api://{client_id}/default |
| provider_1.interceptedPathFilter | /activities/.*, /blogs/.*, /dogear/.*, /files/.*, /forums/.*, /metrics/.*, /metricssc/*, /mobile/.*, /connections/filesync/.*, /connections/filediff/.*, /mobileAdmin/.*, /storageproxy/.*, /wikis/.* |
| provider_1.excludedPathFilter | /activities/service/downloadExtended/.*, /survey/.*, /surveys/.*, /ibm/console, /ibm/console/.*, /profiles/dsx/.*, /communities/dsx/.*, /dm, /dm/atom/seedlist, /dm/atom/communities/feed, /activities/service/atom2/forms/communityEvent, /communities/recomm/handleEvent, /communities/calendar/handleEvent, /profiles/seedlist/myserver, /activities/service/atom2/forms/communityEvent, /news/web/statusUpdateEE.*, /dogear/seedlist/myserver, /news/seedlist/myserver, /communities/calendar/seedlist/myserver |
| provider_1.authorizeEndpointUrl | https://login.microsoftonline.com/{tenant}/oauth2/v2.0/authorize |
| provider_1.tokenEndpointUrl | https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token |
| provider_1.jwkEndpointUrl | https://login.microsoftonline.com/{tenant}/discovery/v2.0/keys |
| provider_1.signVerifyAlias | cnxoidccert |
| provider_1.issuerIdentifier | https://login.microsoftonline.com/{tenant}/v2.0 |
| provider_1.userIdentifier | email |
| provider_1.useJwtFromRequest | ifPresent |
| provider_1.createSession | true |
| provider_1.verifyIssuerInIat | true |
| provider_1.audiences | ALL_AUDIENCES |
| provider_1.setLtpaCookie | true |
| provider_1.callbackServletContext | /oidcclient_apps |
| provider_2.identifier | azuread |
| provider_2.clientId | {client_id} |
| provider_2.clientSecret | {client_secret} |
| provider_2.signatureAlgorithm | RS256 |
| provider_2.scope | openid profile email api://c270bc0a-0097-48d6-8e65-1728143c5c9e/default |
| provider_2.interceptedPathFilter | /connections/bookmarklet/.*, /connections/oauth/.*, /connections/resources/.*, /connections/config/.*, /communities/.*, /connections/proxy/.*, /help/.*, /xcc/.*, /selfservice/.*, /news/.*, /profiles/.*, /search/.*, /socialsidebar/.*, /touchpoint/.*, /connections/thumbnail/.*, /connections/opengraph/.*, /oauth2/.*, /connections/opensocial/.* |
| provider_2.excludedPathFilter | /activities/service/downloadExtended/.*, /survey/.*, /surveys/.*, /ibm/console, /ibm/console/.*, /profiles/dsx/.*, /communities/dsx/.*, /dm, /dm/atom/seedlist, /dm/atom/communities/feed, /activities/service/atom2/forms/communityEvent, /communities/recomm/handleEvent, /communities/calendar/handleEvent, /profiles/seedlist/myserver, /activities/service/atom2/forms/communityEvent, /news/web/statusUpdateEE.*, /dogear/seedlist/myserver, /news/seedlist/myserver, /communities/calendar/seedlist/myserver |
| provider_2.authorizeEndpointUrl | https://login.microsoftonline.com/{tenant}/oauth2/v2.0/authorize |
| provider_2.tokenEndpointUrl | https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token |
| provider_2.jwkEndpointUrl | https://login.microsoftonline.com/{tenant}/discovery/v2.0/keys |
| provider_2.signVerifyAlias | cnxoidccert |
| provider_2.issuerIdentifier | https://login.microsoftonline.com/{tenant}/v2.0 |
| provider_2.userIdentifier | email |
| provider_2.useJwtFromRequest | ifPresent |
| provider_2.createSession | true |
| provider_2.verifyIssuerInIat | true |
| provider_2.audiences | ALL_AUDIENCES |
| provider_2.setLtpaCookie | true |
| provider_2.callbackServletContext | /oidcclient_infra |
| provider_3.identifier | azuread |
| provider_3.clientId | {client_id} |
| provider_3.clientSecret | {client_secret} |
| provider_3.signatureAlgorithm | RS256 |
| provider_3.scope | openid profile email api://c270bc0a-0097-48d6-8e65-1728143c5c9e/default |
| provider_3.interceptedPathFilter | /push/.* |
| provider_3.excludedPathFilter | /activities/service/downloadExtended/.*, /survey/.*, /surveys/.*, /ibm/console, /ibm/console/.*, /profiles/dsx/.*, /communities/dsx/.*, /dm, /dm/atom/seedlist, /dm/atom/communities/feed, /activities/service/atom2/forms/communityEvent, /communities/recomm/handleEvent, /communities/calendar/handleEvent, /profiles/seedlist/myserver, /activities/service/atom2/forms/communityEvent, /news/web/statusUpdateEE.*, /dogear/seedlist/myserver, /news/seedlist/myserver, /communities/calendar/seedlist/myserver |
| provider_3.authorizeEndpointUrl | https://login.microsoftonline.com/{tenant}/oauth2/v2.0/authorize |
| provider_3.tokenEndpointUrl | https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token |
| provider_3.jwkEndpointUrl | https://login.microsoftonline.com/{tenant}/discovery/v2.0/keys |
| provider_3.signVerifyAlias | cnxoidccert |
| provider_3.issuerIdentifier | https://login.microsoftonline.com/{tenant}/v2.0 |
| provider_3.userIdentifier | email |
| provider_3.useJwtFromRequest | ifPresent |
| provider_3.createSession | true |
| provider_3.verifyIssuerInIat | true |
| provider_3.audiences | ALL_AUDIENCES |
| provider_3.setLtpaCookie | true |
| provider_3.callbackServletContext | /oidcclient_push |
| provider_4.identifier | azuread |
| provider_4.clientId | {client_id} |
| provider_4.clientSecret | {client_secret} |
| provider_4.signatureAlgorithm | RS256 |
| provider_4.scope | openid profile email api://c270bc0a-0097-48d6-8e65-1728143c5c9e/default |
| provider_4.interceptedPathFilter | /homepage/.*, /moderation/.*, /connections/rte/.*, /connections/webeditors/.* |
| provider_4.excludedPathFilter | /activities/service/downloadExtended/.*, /survey/.*, /surveys/.*, /ibm/console, /ibm/console/.*, /profiles/dsx/.*, /communities/dsx/.*, /dm, /dm/atom/seedlist, /dm/atom/communities/feed, /activities/service/atom2/forms/communityEvent, /communities/recomm/handleEvent, /communities/calendar/handleEvent, /profiles/seedlist/myserver, /activities/service/atom2/forms/communityEvent, /news/web/statusUpdateEE.*, /dogear/seedlist/myserver, /news/seedlist/myserver, /communities/calendar/seedlist/myserver |
| provider_4.authorizeEndpointUrl | https://login.microsoftonline.com/{tenant}/oauth2/v2.0/authorize |
| provider_4.tokenEndpointUrl | https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token |
| provider_4.jwkEndpointUrl | https://login.microsoftonline.com/{tenant}/discovery/v2.0/keys |
| provider_4.signVerifyAlias | cnxoidccert |
| provider_4.issuerIdentifier | https://login.microsoftonline.com/{tenant}/v2.0 |
| provider_4.userIdentifier | email |
| provider_4.useJwtFromRequest | ifPresent |
| provider_4.createSession | true |
| provider_4.verifyIssuerInIat | true |
| provider_4.audiences | ALL_AUDIENCES |
| provider_4.setLtpaCookie | true |
| provider_4.callbackServletContext | /oidcclient_util |
| provider_1.realmIdentifier | tid |
| provider_2.realmIdentifier | tid |
| provider_3.realmIdentifier | tid |
| provider_4.realmIdentifier | tid |
| provider_1.useRealm | defaultWIMFileBasedRealm <br> This is the default realm used by WebSphere. However, this value must match the realm name defined in the WAS console under **Global Security** > **Realm name**. |
| provider_2.useRealm | defaultWIMFileBasedRealm |
| provider_3.useRealm | defaultWIMFileBasedRealm |
| provider_4.useRealm | defaultWIMFileBasedRealm |
| JndiCacheName | services/cache/OpenidRpCache |

10.  Configure the Azure tenant as a trusted realm:

    1.  Click **Security** > **Global security** > **RMI/IIOP security** > **CSIv2 inbound communications** > **Trusted authentication realms - inbound**.

    2.  In the **Realms** section, click **Add External Realm**.

    3.  For the **External realm name** field, enter the value for `{tenant}`.

    4.  Click **OK**.

11. Create a new object cache instance with the JNDI name matching the one used in the last TAI property in the preceding table (**Resources** > **Cache Instances** > **Object cache instances**).

    ![screen for creating cache instance](azure_websphere_object_cache.png)

12. Go to **Application servers** > **cluster** > **Container Services** > **Dynamic cache service**, and for each cluster’s dynamic cache service make sure that cache replication is enabled and uses **ConnectionsReplicationDomain**.

    ![screen for enabling cache replication](azure_websphere_cache_replication.png)

13. Configure the trusted realm:

    1.  Click **Security** > **Global security**.

    2.  In the **User account repository** section, click **Configure**.

    3.  In the **Related Items** section, click **Trusted authentication realms - inbound** > **Add External Realm**.

    4.  In the **External realm name** field, enter the value for `provider_1.issuerIdentifier` from the Interceptor.

    5.  Click **OK**.

14. Add the root signing certificate of the Microsoft Certificate endpoint to the default trust store:

    1.  Click **Security** > **SSL certificate and key management**.

    2.  Click **Key stores and certificates**.

    3.  Select **CellDefaultTrustStore** and click **Signer certificates**.

    4.  Click **Retrieve from port**.

    5.  For the **Host** field, enter `login.microsoftonline.com`.

    6.  For the **Port** field, enter **443**.

    7.  For the **Alias** field, enter `cnxoidccert`. (You will need to use this name as a value for `property provider_1.signVerifyAlias`. )

    8.  Click **Retrieve signer information**.

    9.  Click **OK** and save the changes.

15. Change security role for user/group for applications:

    1.  Click **Applications** > **Application types** > **Enterprise Applications** > **Application name** > **Security role to user/group mapping**.

    2.  For each resource, change the permission for all roles that have "All Authenticated in Application's Realm" to "All Authenticated in Trusted Realm."

16. Synchronize all nodes.

7. Restart the WebSphere server.


Return to step 8 of [Adding an application in Azure AD for SSO with Connections](t_azure_add_app.md) and add a redirect URI.

Then [Configure Connections to support Azure OIDC](t_azure_config_conn_oidc.md).

**Parent topic:** [Enabling single sign-on with OIDC for Microsoft Azure AD](../secure/c_azure_oidc_container.md)
