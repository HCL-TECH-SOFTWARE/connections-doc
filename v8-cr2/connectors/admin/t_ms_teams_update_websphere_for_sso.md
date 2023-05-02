# Updating WebSphere to support single sign-on with Connections for Microsoft Teams {#t_ms_teams_update_websphere_for_sso .task}

Authentication between the Connections for Microsoft Teams app and the Connections server is handled using single sign-on \(SSO\). This way, as long as the user's email address in Microsoft Teams matches the email address of the Connections user, the user won't be prompted to log in to Connections.

Make sure you've completed [Enabling Connections to use the app registry service](t_ms_teams_enable_conn_use_appreg.md).

Single sign-on is accomplished by setting up a trust relationship between the Connections server and Microsoft Azure using the WebSphere OpenID Connect Relying Party Trust Association Interceptor \(OIDC Relying Party TAI\). When the Connections app in Microsoft teams connects to the Connections server, it obtains a JSON Web Token \(JWT\) from Microsoft Azure with the user's identity. This token is presented to the OIDC Relying Party TAI at the Connections server and verified. If valid, the user's identity is used to create tokens that are valid for accessing Connections resources.

**Important:** Like the chat integration for Teams, this SSO setup does require that the email address for the user's Teams identity matches the email address in Connections.

**Note:**

-   The OIDC Relying Party TAI is setup to intercept only a single endpoint in Connections \(/profiles/oidc/session\). This endpoint is not used by any other Connections services, so enabling the TAI will not interfere with existing authentication infrastructure.
-   The OIDC Replying Party TAI code is shipped as part of WebSphere Application Server. It is recommended that you are running WebSphere 8.5.5.18 which contains all required fixes. However, if you are running an earlier version of WebSphere, you must install at least version 1.3.0 of the OIDC jar. Find the latest version from [https://www.ibm.com/support/pages/node/290565](https://www.ibm.com/support/pages/node/290565) .


1.  As the WebSphere administrator, in the administrative console, click **Security** \> **Global security** \> **Web and SIP security ** \> **Trust association** .

2.  Click **Interceptors** \> **New** to add an interceptor.

3.  For the interceptor class name, enter com.ibm.ws.security.oidc.client.RelyingParty

4.  Add the following properties and values:

|Property|Value|
|--------|-----|
|provider\_1.useJwtFromRequest|required|
|provider\_1.identifier|cnx\_azure <br></br> This must be a unique name of an OIDC provider on this instance. Any name is usable as long as it does not conflict with other OIDC provider names.|
|provider\_1.issuerIdentifier|`https://login.microsoftonline.net/{teams_tenant_id}/v2.0` <br></br> This must match the "iss" claim from the JWT.​​​​​​​|
|provider\_1.jwkEndpointUrl|`https://login.microsoftonline.com/{teams_tenant_id}/discovery/v2.0/keys` <br></br> Find this value using the Microsoft OIDC configuration endpoint for your tenant: `https://login.microsoftonline.com/{teams_tenant_id}/v2.0/.well-known/openid-configuration`|
|provider\_1.interceptedPathFilter|/profiles/oidc/session|
|provider\_1.audiences|ALL\_AUDIENCES|
|provider\_1.setLtpaCookie|true|
|provider\_1.userIdentifier|email<br />This forces the connections server to use the email claim from the JWT as the identifier of the user.|
|provider\_1.useRealm|defaultWIMFileBasedRealm|

5.  Add the OpenID Connect Relying Party TAI class to com.ibm.websphere.security.InvokeTAIbeforeSSO:

    1.  Click Security \> Global security and then click Custom properties

    2.  Check the list for `com.ibm.websphere.security.InvokeTAIbeforeSSO`. At the end of the existing value, add `",com.ibm.ws.security.oidc.client.RelyingParty"`.

        **Note:** This begins with a comma.

    3.  Click **OK**.

6.  Disable `com.ibm.websphere.security.disableGetTokenFromMBean`,as when this is enabled, the LptaToken2 coming from /profiles/oidc/session cannot be used to access others' apps in different JVMs.

    1.  Click **Security** \> **Global security**.

    2.  Click **Custom Properties**.

    3.  Find the property called `com.ibm.websphere.security.disableGetTokenFromMBean`

    4.  Click and and change the value from true to `false`.

    5.  Save the configuration.

7.  Configure the trusted realms to include the JWT issuer:

    1.  Click **Security** \> **Global security** .

    2.  In the User account repository section, click **Configure**.

    3.  In the Related Items section, click **Trusted authentication realms - inbound** \> **Add External Realm**.

    4.  In the External realm name field, enter the issuer name that is used by the JWT (same as provider_1.issuerIdentifier above).

    5.  Click **OK**.

8.  Add the root signing certificate of the Microsoft Certificate endpoint to the Default Trust Store:

    1.  Click **Security** \> **SSL certificate and key management**.

    2.  Click **Key stores and certificates**.

    3.  Select **CellDefaultTrustStore** and click **Signer certificates**.

    4.  Click **Retrieve from port**.

    5.  For the Host field, enter login.microsoftonline.com.

    6.  For the Port field, enter 443.

    7.  For the Alias field, enter Azure.

    8.  Click Retrieve signer information

    9.  Click **OK** and save the changes.

9.  Synchronize all nodes.

10. Restart the WebSphere server.


[Configure an Azure app to support the Microsoft Teams app](t_ms_teams_config_azure_app.md)

