# Registering an OAuth client with a provider {#t_admin_registeroauthclientwprovider .task}

You need to register any OAuth clients with an OAuth provider.

To allow a seamless user experience while using the Activity Streams, HCL Connections supports automatic authorization of trusted gadget clients. Users will not be prompted to authorize a trusted gadget the first time that it tries to access their Connections data. The only trusted gadget client out of the box in HCL Connections is the Connections Embedded Experience gadget.

1.  To register an arbitrary client:

    1.  Start wsadmin.

        ```
        ./wsadmin.sh -lang jython -user wasadmin -password passw0rd
        
        ```

    2.  Load oauth admin commands

        ```
        execfile('oauthAdmin.py')
        ```

    3.  Register the client as follows:

        ```
        OAuthApplicationRegistrationService.addApplication(String appId, String appName, String redirectURI)
        ```

        Where:

        -   **`appId`** is an identifier for the application you are registering. It can be anything you like such as my-test-client.
        -   **`appName`** is a descriptive name for your client such as My Test Client.
        -   **`redirectURI`** is where to redirect to when the gadget has been granted authorization. When Connections is the client, the URL must be set to this templated value. The placeholder `opensocialSvcUrl` in the following URL will be replaced at runtime with the value of the URL of the opensocial service defined in LotusConnections-config.xml.
        ```
        wsadmin>OAuthApplicationRegistrationService.addApplication("my-test-client", "My Test Client", "{opensocialSvcUrl}/gadgets/oauth2callback")
        An application was added with the new id my-test-client.  
        ```

    4.  Obtain the client secret from the recently registered application \(copy it and save it in a text file\). This will be used to register the gadget on the consumer proxy.

        ```
        clientSecret = OAuthApplicationRegistrationService.getApplicationById(appId).get('client_secret')
        ```

        In order to see the secret, run the following commands:

        ```
        wsadmin>clientSecret = OAuthApplicationRegistrationService.getApplicationById('conn-ee').get('client_secret') 
        wsadmin>print clientSecret
        
        ```

        This gives a clientSecret output such as the one below:

        ```
        CdVFsLUyTGa9p8BaHZcNSir4i7sLcuk31XZMkhtXSHUcXGKI7HDeCONm89lf
        ```

2.  To enable auto-authorization for this gadget, the provider has to be configured to make it a privileged client. Modify the `connectionsProvider.xml` \(for example, located in /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/config/cells/nameCell01/oauth20/ \) that is used to configure the provider to add the appId previously used to the trusted auto-auth client list, for example:

    ```
    <parameter name="oauth20.autoauthorize.clients" type="ws" customizable="true">
            <value>my-test-client</value>
          </parameter>
    ```

3.  Recreate the provider using this wsadmin command, substituting the appropriate path for `connectionsProvider.xml` and wasadmin credentials:

    ```
    ./wsadmin.sh -lang jython -conntype SOAP -c "print AdminTask.createOAuthProvider('[-providerName connectionsProvider -fileName /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/bin/connectionsProvider.xml]')" -user wasadmin -password passw0rd
    ```

4.   Consider whether the default configuration settings for OAuth provider token lifetime are appropriate for your implementation. The defaults are as follows:

    -   access token=12 hours
    -   refresh token=6 months
    -   cleanup interval=1 hour

