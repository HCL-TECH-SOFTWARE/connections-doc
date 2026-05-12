# Authorization Management Commands {#r_admin_common_oauth_mgnt_commands .reference}

Once client applications are registered with the OAuth provider in HCL Connections, they are allowed to request authorization from Connections users to access and interact with their data. Connections administrators can run wsadmin commands to manage authorizations issued to registered client applications, in order to revoke authorizations granted to malicious applications, or to remove a compromised access token.

## Launching the wsadmin shell { .section}

Administrators can launch the wsadmin shell by running oauthAdmin.py as follows:

```
wsadmin>execfile('oauthAdmin.py')

```

Once the OAuth Administration successfully starts, the admin object OAuthAuthorizationService becomes available:

```
Connecting to WebSphere:name=OAuthApplicationRegistrationService,type=LotusConnections,cell=guadalupeNode02Cell,node=guadalupeNode02,*
OAuth Administration initialized.

```

The following commands are available:

-   [Get an authorization](#GetAnAuthorization)
-   [Browse authorizations by granting user](#BrowseAuthorizationsByGrantingUser)
-   [Revoke an authorization](#RevokeAnAuthorization)
-   [Revoke authorizations by granting user](#RevokeAuthorizationsByGrantingUser)
-   [Revoke authorizations by granted application](#RevokeAuthorizationsByGrantedApplic)

## Get an authorization {#GetAnAuthorization .section}

OAuthAuthorizationService.getAuthorizationsById\(String authorizationId\)
:   Administrators can retrieve an authorization by id by running this command. The command takes the argument authorizationId The identifier of the authorization, for example:

    ```
    wsadmin>OAuthAuthorizationService.getAuthorizationsById('Cc4sBWo0p9PgDTjiFv0ddEMoCSkHViWFXMNlEpRr')
    
    
    ```

    This command prints details about the authorization.

    ```
    {token=Cc4sBWo0p9PgDTjiFv0ddEMoCSkHViWFXMNlEpRr, redirect_uri=https://renovations.ca.ibm.com:9445/oauthclient/redirect.jsp, id=Cc4sBWo0p9PgDTjiFv0ddEMoCSkHViWFXMNlEpRr, username=aalain, client_id=notes-ee}
    
    ```

## Browse authorizations by granting user {#BrowseAuthorizationsByGrantingUser .section}

OAuthAuthorizationService.browseAuthorizationsByUser\(String username\)
:   Takes the argument username. The username, such as the Java EE principal associated with the desired granting user.

:   ```
wsadmin>OAuthAuthorizationService.browseAuthorizationsByUser('aalain')

```

:   This command prints a list of authorization granted by the user.

    ```
    [{token=kDDjH5UaXKkXlEIiuXItfDHXDAyFPSSdiN63CU4w, redirect_uri=https://vicpcvm663.mul.ca.renovations.com:9445/oauthclient/redirect.jsp, id=kDDjH5UaXKkXlEIiuXItfDHXDAyFPSSdiN63CU4w, username=aalain, client_id=notes-ee}, {token=1injJ5JmpRWTxi9kPLe4vbdyjGoyIINAuWXxoykM45rZSMKivX, redirect_uri=https://vicpcvm663.mul.ca.renovations.com:9445/oauthclient/redirect.jsp, id=1injJ5JmpRWTxi9kPLe4vbdyjGoyIINAuWXxoykM45rZSMKivX, username=aalain, client_id=notes-ee}, {token=Cc4sBWo0p9PgDTjiFv0ddEMoCSkHViWFXMNlEpRr, redirect_uri=https://vicpcvm663.mul.ca.renovations.com:9445/oauthclient/redirect.jsp, id=Cc4sBWo0p9PgDTjiFv0ddEMoCSkHViWFXMNlEpRr, username=aalain, client_id=notes-ee}, {token=Pb2SsdmXkp99Sfo7Lau7N1JZVawPRUAMUSreTMcsOZazRBsw4U, redirect_uri=https://vicpcvm663.mul.ca.renovations.com:9445/oauthclient/redirect.jsp, id=Pb2SsdmXkp99Sfo7Lau7N1JZVawPRUAMUSreTMcsOZazRBsw4U, username=aalain, client_id=notes-ee}]
    
    ```

## Revoke an authorization {#RevokeAnAuthorization .section}

OAuthAuthorizationService.revokeAuthorization\(String authorizationId\)
:   An administrators can revoke a compromised authorization by id executing this command. It takes the argument:

:   authorizationId - The identifier of the authorization

:   ```
wsadmin>OAuthAuthorizationService.revokeAuthorizations('kDDjH5UaXKkXlEIiuXItfDHXDAyFPSSdiN63CU4w')

The authorization with the id kDDjH5UaXKkXlEIiuXItfDHXDAyFPSSdiN63CU4w was revoked successfully.

```

## Revoke authorizations by granting user {#RevokeAuthorizationsByGrantingUser .section}

OAuthAuthorizationService.revokeAuthorizationsByUser\(String username\)
:   An administrator can revoke all authorizations granted by a user by running this command. It takes the argument:

:   username - The Java EE principal associated with the desired granting user.

:   For example, running this command revoked authorizations that the user aalain had granted.

    ```
    wsadmin>OAuthAuthorizationService.revokeAuthorizationsByUser('aalain')
    All authorizations granted by user aalain were successfully revoked.
    ```

## Revoke authorizations by granted application {#RevokeAuthorizationsByGrantedApplic .section}

OAuthAuthorizationService.revokeAuthorizationsByApplication\(String username, String appId\)
:   An administrator can revoke all authorizations granted to an application by a user by running this command.

:   Arguments this command takes are as follows:

    -   username - The Java EE principal associated with the desired granting user.
    -   appId - The id of the granted application.

:   For example, running this command revoked authorizations granted to an application by the granting user aalain:

    ```
    wsadmin>OAuthAuthorizationService.revokeAuthorizationsByApplication('aalain', 'conn-ee')
    
    All authorizations granted by user aalain to application conn-ee were successfully revoked.
    
    ```

**Parent topic:**[Registering an OAuth client with a provider](../admin/t_admin_registeroauthclientwprovider.md)

