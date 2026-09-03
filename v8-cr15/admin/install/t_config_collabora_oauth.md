# Configuring OAuth-based WOPI authentication for Collabora Online in HCL Connections Files


This section explains how to configure HCL Connections Files to use OAuth-based WOPI authentication with Collabora Online.

HCL Connections includes a WebSphere OAuth 2.0 provider, named connectionsProvider by default. The Web Application Open Platform Interface Protocol (WOPI) OAuth integration uses that existing provider. The integration registers a dedicated OAuth client for Collabora, configures HCL Connections Files for OAuth-based WOPI launch tokens, and enables a WOPI-specific Trust Association Interceptor (TAI) to validate OAuth tokens on Collabora WOPI requests.

The browser user authenticates to HCL Connections using the standard Lightweight Third-Party Authentication (LTPA) session. When the user opens a document in Collabora, Files initiates an OAuth authorization-code flow, stores the resulting OAuth token in the user session, and returns the WOPI launch response. Collabora sends that OAuth token on subsequent WOPI API calls, where the WOPI TAI validates it and establishes the WebSphere security context.

## Prerequisites 

Collect the following values for the target environment:

| Value | Example |
|-------|---------|
| WebSphere cell name | `ConnectionsCell` |
| Deployment Manager profile | `/opt/IBM/WebSphere/AppServer/profiles/Dmgr01` |
| Application server profile | `/opt/IBM/WebSphere/AppServer/profiles/AppSrv01` |
| Connections public URL | `https://connections.example.com` |
| Collabora public URL | `https://collabora.example.com` |
| OAuth provider name | `connectionsProvider` |
| OAuth client ID | `collabora-wopi-client` |
| OAuth redirect URI | `https://connections.example.com/files/wopi/oauth2callback` |
| Files application server name | for example, `Apps-node1` |
| Files application server node name | for example, `connections-node1` |
| Deployment Manager SOAP host and port | for example, `localhost:8879` |


!!! important 
    
    The OAuth redirect URI must match the target endpoint exactly. Do not use wildcard characters.


**Correct redirect URI:**
```
https://connections.example.com/files/wopi/oauth2callback
```

**Incorrect redirect URI:**
```
https://connections.example.com/files/wopi/*
```

## Confirming the WOPI TAI JAR location

For HCL Connections CR15 installations that include the updated installer, the WOPI TAI JAR file is installed automatically.

1. On each WebSphere Application Server node that runs Files, verify that the JAR file exists in the following directory:


    ```sh
        /opt/IBM/WebSphere/AppServer/profiles/AppSrv01/config/cells/ConnectionsCell/wopi/security/files.wopi.tai.jar
    ```

2. On the Deployment Manager, verify that the JAR file exists in the following directory:

    ```sh
        /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/config/cells/ConnectionsCell/wopi/security/files.wopi.tai.jar
    ```

3. Verify the installer source copy location:

    ```sh
        /opt/HCL/Connections/xkit/wopi/security/files.wopi.tai.jar
    ```

4. In a multi-node environment, run the following command to verify the JAR file on every run-time WebSphere Application Server node that hosts Files:

    **Example:**

    ```bash
    find /opt -type f -iname "*wopi*"
    ```

    **Expected output:**

    ```
    /opt/IBM/WebSphere/AppServer/profiles/AppSrv01/config/cells/ConnectionsCell/wopi/security/files.wopi.tai.jar
    /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/config/cells/ConnectionsCell/wopi/security/files.wopi.tai.jar
    /opt/HCL/Connections/xkit/wopi/security/files.wopi.tai.jar
    ```

    !!! note 
        
        The Deployment Manager copy ensures configuration consistency, but the run-time application server requires a local copy in its own AppSrv01 profile directory. Do not rely on node synchronization alone to create this custom directory or copy the JAR file to every node.

5. If the JAR file is missing from a run-time WebSphere Application Server node, copy it from the CR15 installer source location or from the Deployment Manager to the local `AppSrv01/config/cells/<cell-name>/wopi/security` directory on that node:

    **Example:**

    ```bash
    mkdir -p /opt/IBM/WebSphere/AppServer/profiles/AppSrv01/config/cells/ConnectionsCell/wopi/security
    cp /opt/HCL/Connections/xkit/wopi/security/files.wopi.tai.jar \
    /opt/IBM/WebSphere/AppServer/profiles/AppSrv01/config/cells/ConnectionsCell/wopi/security/files.wopi.tai.jar
    chmod 644 /opt/IBM/WebSphere/AppServer/profiles/AppSrv01/config/cells/ConnectionsCell/wopi/security/files.wopi.tai.jar
    ```

6. Repeat this step for every WebSphere Application Server node that hosts Files.

## Adding the WOPI security directory to the run-time classpath

Each WebSphere Application Server node that runs Files must include the local WOPI security directory in `ws.ext.dirs`.

**Required runtime directory:**

```
/opt/IBM/WebSphere/AppServer/profiles/AppSrv01/config/cells/ConnectionsCell/wopi/security/
```


!!! important 
    
    Do not reference the Deployment Manager copy of the JAR file from a run-time server. Each run-time server must use the JAR file in its local AppSrv01 profile directory.


### Adding the directory to the run-time classpath

1. In the WebSphere Integrated Solutions Console, go to **Servers** > **Server Types** > **WebSphere application servers** > **<Files server>** > **Java and Process Management** > **Process definition** > **Java Virtual Machine** > **Custom properties**.


2. Locate the custom `property ws.ext.dirs`. If it does not exist, click **New** to create it.

    ```
    ws.ext.dirs
    ```

3. If `ws.ext.dirs` exists, preserve the existing string and append the WOPI security directory path using the platform path separator. On Linux, append the path using a colon (`:`):

    On Linux, append using a colon:

    ```
    :<AppSrv01-profile>/config/cells/<cell-name>/wopi/security/
    ```

    **Example:**

    ```
    /opt/IBM/WebSphere/AppServer/java/lib:/opt/IBM/WebSphere/AppServer/profiles/AppSrv01/classes:/opt/IBM/WebSphere/AppServer/classes:/opt/IBM/WebSphere/AppServer/lib:/opt/IBM/WebSphere/AppServer/lib/ext:/opt/IBM/WebSphere/AppServer/profiles/AppSrv01/config/cells/ConnectionsCell/wopi/security/
    ```

4. Repeat Steps 1–2 for every application server that hosts Files.

5. Save the configuration, synchronize the nodes, and restart the affected application servers.

###  Verifying the runtime classpath after restart


After restarting the server, review the server trace or `SystemOut.log` file for `ws.ext.dirs` to verify the run-time classpath:

**Example:**

```bash
grep -n "ws.ext.dirs" \
/opt/IBM/WebSphere/AppServer/profiles/AppSrv01/logs/<server-name>/trace.log | tail -5
```

**Expected value**

```
/opt/IBM/WebSphere/AppServer/profiles/AppSrv01/config/cells/ConnectionsCell/wopi/security/
```

## Registering the OAuth client

Register a dedicated OAuth client for Collabora WOPI using the following values:

Use these values:

| Property | Value |
|----------|-------|
| Client ID | `collabora-wopi-client` |
| Display name | `Collabora WOPI Client` |
| Redirect URI | `https://connections.example.com/files/wopi/oauth2callback` |

Use wsadmin with `oauthAdmin.py` from the Deployment Manager profile.



1. Create the OAuth registration script. On the Deployment Manager server, create `/tmp/register-collabora-wopi-client.py`. 
2. Replace `https://connections.example.com` with the public Connections URL for your environment:

    ```python
    cat > /tmp/register-collabora-wopi-client.py <<'PY'
    execfile('oauthAdmin.py')
    clientId = 'collabora-wopi-client'
    displayName = 'Collabora WOPI Client'
    redirectUri = 'https://connections.example.com/files/wopi/oauth2callback'
    print '=' * 80
    print 'Registering OAuth client for Collabora WOPI'
    print 'Client ID:    ' + clientId
    print 'Display name: ' + displayName
    print 'Redirect URI: ' + redirectUri
    print '=' * 80
    existing = None
    try:
        existing = OAuthApplicationRegistrationService.getApplicationById(clientId)
    except:
        existing = None
    if existing is not None:
        print 'Existing OAuth client found. Deleting existing client: ' + clientId
        OAuthApplicationRegistrationService.deleteApplication(clientId)
    print 'Creating OAuth client: ' + clientId
    OAuthApplicationRegistrationService.addApplication(clientId, displayName, redirectUri)
    print ''
    print 'OAuth client registration result:'
    app = OAuthApplicationRegistrationService.getApplicationById(clientId)
    print app
    print ''
    print 'Record the generated client_secret value.'
    print 'You must add that value to files-config.xml as the wopiOAuth clientSecret.'
    PY
    ```

3. Run the OAuth registration script from the Deployment Manager profile directory using `wsadmin`:

    ```bash
    /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/bin/wsadmin.sh \
    -lang jython \
    -conntype SOAP \
    -host <dmgr-host> \
    -port <soap-port> \
    -username <was-admin-user> \
    -password '<was-admin-password>' \
    -f /tmp/register-collabora-wopi-client.py
    ```

    !!! important 
        
        Record the generated `client_secret`. This value is required in `files-config.xml`.**


4. Create the verification script to verify the OAuth registration  `/tmp/show-collabora-wopi-client.py`:

    ```python
    cat > /tmp/show-collabora-wopi-client.py <<'PY'
    execfile('oauthAdmin.py')
    app = OAuthApplicationRegistrationService.getApplicationById('collabora-wopi-client')
    print app
    PY
    ```

5. Run the verification script.

    ```bash
    /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/bin/wsadmin.sh \
    -lang jython \
    -conntype SOAP \
    -host <dmgr-host> \
    -port <soap-port> \
    -username <was-admin-user> \
    -password '<was-admin-password>' \
    -f /tmp/show-collabora-wopi-client.py
    ```

6. Verify that the output displays the client ID and the exact redirect URI:

    ```
    client_id=collabora-wopi-client
    redirect_uri=[https://connections.example.com/files/wopi/oauth2callback]
    ```

    !!! important 
        
        The redirect URI must not be registered as a wildcard.


## Updating the OAuth provider configuration

Update the `connectionsProvider` OAuth provider configuration so the Collabora WOPI client can auto-authorize and use token introspection.

1. Locate the provider configuration file. Example:


    ```
    /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/config/cells/ConnectionsCell/oauth20/connectionsProvider.xml
    ```

2. Add `collabora-wopi-client` to the existing auto-authorize clients list while preserving the existing values.

    ```xml
    <parameter name="oauth20.autoauthorize.clients" type="ws" customizable="true">
        <value>conn-ee</value>
        <value>conn-as</value>
        <value>conn-rte</value>
        <value>collabora-wopi-client</value>
    </parameter>
    ```

3. Verify that token introspection parameters are enabled:

    ```xml
    <parameter name="oauth20.token.introspect.enabled" type="cc" customizable="false">
        <value>true</value>
    </parameter>
    <parameter name="oauth20.introspect.tokens.enabled" type="cc" customizable="false">
        <value>true</value>
    </parameter>
    ```

4. Allow the Collabora WOPI client to perform token introspection:

    ```xml
    <parameter name="oauth20.introspect.clients" type="ws" customizable="true">
        <value>collabora-wopi-client</value>
    </parameter>
    ```


5. After changing `connectionsProvider.xml`, reload or recreate the OAuth provider according to standard administration procedures, save the WebSphere Application Server configuration, synchronize all nodes, and restart the application servers hosting Files.

## Configuring the WOPI Trust Association Interceptor

1. In the WebSphere Integrated Solutions Console, go to **Security** > **Global security** > **Web and SIP security** > **Trust association**.

2. Confirm that Enable trust association is selected.

3. Click **Interceptors** and add the following interceptor class:


    ```
    com.ibm.lconn.files.wopi.tai.WopiOAuthTAI
    ```


4. Define the following custom properties:

    | Property | Value |
    |----------|-------|
    | `wopi.pathPrefix` | `/files/wopi/files` |
    | `wopi.excludePrefix` | `/files/wopi/files/token` |
    | `wopi.providerName` | `connectionsProvider` |

5. Save the configuration.


!!! important 
    
    The `wopi.excludePrefix` value is required. The browser calls `/files/wopi/files/token/<fileId>` using the normal Connections LTPA session before an OAuth token exists. This endpoint must not be intercepted as a Collabora runtime WOPI request.

## Configuring Files for Collabora OAuth mode

1. Check out `files-config.xml` using the standard HCL Connections Files configuration administration procedure.

2. Update the `<officeEditing>` section under `<file>`.

    **Example:**

    ```xml
    <officeEditing>
        <viewerProvider>collabora</viewerProvider>
        <editorProvider>collabora</editorProvider>
        <editorUrl>https://collabora.example.com</editorUrl>
        <wopiAuthMode>oauth</wopiAuthMode>
        <wopiOAuth
            tokenEndpoint="https://connections.example.com/oauth2/endpoint/connectionsProvider/token"
            clientId="collabora-wopi-client"
            clientSecret="<client-secret-from-oauth-registration>"
            host="https://connections.example.com"/>
        <wopiTokenExpirySeconds>28800</wopiTokenExpirySeconds>
    </officeEditing>
    ```

    1. Use the OAuth client secret generated when registering `collabora-wopi-client`.

    2. Set `host` to the public HCL Connections URL. This value constructs WOPI URLs and the OAuth callback URL:

        The callback URL is:

        ```
        https://connections.example.com/files/wopi/oauth2callback
        ```


3. Check in the updated `files-config.xml`, save the WebSphere configuration, synchronize all nodes, and restart the Files application server.

4. After node synchronization, verify that the local `AppSrv01` copy has the updated value.


    **Example:**

    ```bash
    grep -RIn "wopiOAuth\|collabora-wopi-client" \
    /opt/IBM/WebSphere/AppServer/profiles/AppSrv01/config/cells/ConnectionsCell \
    2>/dev/null
    ```

## Synchronizing nodes and restarting application servers

After updating Deployment Manager configuration, synchronize the nodes.

1. Use the WebSphere console or run an online node sync through `wsadmin` to create `/tmp/sync-active-node.py`.


    ```python
    cat > /tmp/sync-active-node.py <<'PY'
    nodeName = '<node-name>'
    mbeans = AdminControl.queryNames('WebSphere:type=NodeSync,node=' + nodeName + ',*')
    if not mbeans or not mbeans.strip():
        raise Exception('No NodeSync MBean found for node ' + nodeName)
    for mbean in mbeans.splitlines():
        print AdminControl.invoke(mbean, 'sync')
    PY
    ```

2. Run the node sync script from the Deployment Manager profile.

    ```bash
    /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/bin/wsadmin.sh \
    -lang jython \
    -conntype SOAP \
    -host <dmgr-host> \
    -port <soap-port> \
    -username <was-admin-user> \
    -password '<was-admin-password>' \
    -f /tmp/sync-active-node.py
    ```

3. Restart each application server that hosts Files.

    ```bash
    /opt/IBM/WebSphere/AppServer/profiles/AppSrv01/bin/stopServer.sh <server-name>
    /opt/IBM/WebSphere/AppServer/profiles/AppSrv01/bin/startServer.sh <server-name>
    ```


## Configuring Java EE security role mappings

1. In the WebSphere Integrated Solutions Console, go to **Applications** > **WebSphere Enterprise Applications** > **Files** > **Security role to user/group mapping**.

2. Map the following security roles to **All Authenticated in Application's Realm**:


    - `reader`
    - `collabora-editor`


3. Save the configuration and restart the Files application server.

## Verifying the setup

1. After restart, verify that the WOPI TAI loaded successfully by searching and checking File server log:


    ```bash
    grep -i "WopiOAuthTAI loaded successfully\|Unable to load Trust Association class com.ibm.lconn.files.wopi.tai.WopiOAuthTAI" \
    /opt/IBM/WebSphere/AppServer/profiles/AppSrv01/logs/<server-name>/trace.log | tail -20
    ```

    **Expected result:**

    ```
    Trust Association Init class com.ibm.lconn.files.wopi.tai.WopiOAuthTAI loaded successfully
    ```

2. Verify that TAI properties were loaded correctly:

    ```bash
    grep -i "pathPrefix=/files/wopi/files" \
    /opt/IBM/WebSphere/AppServer/profiles/AppSrv01/logs/<server-name>/trace.log | tail -20
    ```

    **Expected result:**

    ```
    [WOPI][TAI] pathPrefix=/files/wopi/files excludePrefix=/files/wopi/files/token providerName=connectionsProvider
    ```

3. Open a supported file in HCL Connections Files and launch it in Collabora. The expected authentication sequence is

    1. Browser calls `/files/wopi/files/token/<fileId>`
    2. Files redirects to `/oauth2/endpoint/connectionsProvider/authorize`
    3. OAuth redirects back to `/files/wopi/oauth2callback`
    4. Files exchanges the authorization code for OAuth tokens
    5. Files returns the WOPI launch response
    6. Collabora calls WOPI APIs with `access_token`
    7. WopiOAuthTAI validates the token
    8. Files returns CheckFileInfo or file content

4. Review application trace logs. Enter the following for the **Useful log search:**

    ```bash
    grep -i "generateAccessToken\|OAuth2 callback\|OAuth2 token exchange successful\|Building Collabora response\|WopiOAuthTAI\|OAuth20InvalidRedirectUriException\|invalid_client\|OAUTH session expired or missing token" \
    /opt/IBM/WebSphere/AppServer/profiles/AppSrv01/logs/<server-name>/trace.log | tail -200
    ```

## Troubleshooting


| Symptom | Likely cause | Resolution |
|---------|--------------|------------|
| `ClassNotFoundException: com.ibm.lconn.files.wopi.tai.WopiOAuthTAI` | `files.wopi.tai.jar` is missing from the active application server runtime classpath. | Confirm the JAR exists under the AppSrv01 wopi/security directory on every Files node. Confirm `ws.ext.dirs` includes that directory. Restart the server. |
| WopiOAuthTAI does not load after restart | `ws.ext.dirs` does not include the WOPI security directory, or the server was not restarted. | Add the WOPI security directory to `ws.ext.dirs`, save, synchronize, and restart. |
| `/files/wopi/files/token/<fileId>` returns HTTP 401 before WOPI token-generation logs appear | A built-in `com.ibm.ws.security.oauth20.tai.OAuthTAI` filter was changed to include `/files/wopi`. | Remove `/files/wopi` from the built-in OAuthTAI filter. WOPI URLs must be handled by `com.ibm.lconn.files.wopi.tai.WopiOAuthTAI`. |
| `OAuth20InvalidRedirectUriException` | The OAuth client registration does not contain the exact callback URL. | Re-register `collabora-wopi-client` with `https://connections.example.com/files/wopi/oauth2callback`. Do not use a wildcard redirect URI. |
| Token exchange fails with `invalid_client` or HTTP 401 | The `clientSecret` in `files-config.xml` does not match the current OAuth client secret. | Verify the current OAuth client registration and update `files-config.xml`. Check in the config, sync nodes, and restart Files. |
| Dmgr config is updated, but runtime still uses old values | Node synchronization was not completed, or the Files application server has not been restarted. | Synchronize the node and verify the AppSrv01 local config. Restart the Files application server. |
| Browser loops back to OAuth authorize and Collabora reports missing OAuth session token | The authorize callback or token exchange did not complete. | Check the FFDC and trace for OAuth20EndpointServlet, invalid redirect URI, invalid client secret, or token endpoint errors. |
| Collabora WOPI runtime calls are rejected | WOPI TAI is not loading or cannot validate tokens. | Verify WopiOAuthTAI loaded successfully, confirm the TAI properties, and ensure token introspection is enabled for `collabora-wopi-client`. |
| User can open Files but Collabora launch is denied | Files application role mapping is incomplete. | Ensure required Files application roles, including the standard authenticated reader role, are mapped to authenticated users in the application realm. |

## Setup verification checklist

- [ ] CR15 or later WOPI TAI JAR exists on the Deployment Manager.
- [ ] CR15 or later WOPI TAI JAR exists on every Files application server node.
- [ ] Source copy exists under `/opt/HCL/Connections/xkit/wopi/security/files.wopi.tai.jar`.
- [ ] Each Files runtime server has `ws.ext.dirs` including the local AppSrv01 WOPI security directory.
- [ ] WopiOAuthTAI is configured as a Trust Association Interceptor.
- [ ] WopiOAuthTAI has `wopi.pathPrefix=/files/wopi/files`.
- [ ] WopiOAuthTAI has `wopi.excludePrefix=/files/wopi/files/token`.
- [ ] WopiOAuthTAI has `wopi.providerName=connectionsProvider`.
- [ ] No built-in OAuthTAI filter was modified to include `/files/wopi`.
- [ ] OAuth client `collabora-wopi-client` exists.
- [ ] OAuth client redirect URI is the exact `/files/wopi/oauth2callback` URL.
- [ ] `connectionsProvider` allows `collabora-wopi-client` for auto-authorize.
- [ ] Token introspection is enabled for `collabora-wopi-client`.
- [ ] `files-config.xml` has `wopiAuthMode=oauth`.
- [ ] `files-config.xml` has the current OAuth client secret.
- [ ] Nodes are synchronized.
- [ ] Files application servers are restarted.
- [ ] Logs show WopiOAuthTAI loaded successfully.
- [ ] Logs show the WOPI token endpoint reaching Files WOPI code.
- [ ] Collabora opens the document successfully.


**Parent Topic**: [Installing and Configuring Collabora Online](../admin/t_admin_inst_config_collabora.md)