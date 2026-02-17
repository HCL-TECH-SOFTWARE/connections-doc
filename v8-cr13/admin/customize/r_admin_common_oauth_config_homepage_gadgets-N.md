# Configuring OAuth for custom gadgets {#configuringgadgetsinhomepage .reference}

The HCL Connections™ supports an OAuth 2.0 consumer proxy that allows the Homepage component to surface gadgets in an OpenSocial container that can interact with an OAuth 2.0 protected service. In order for this proxy to function, there are a series of new administration commands that are exposed in the News service to define OAuth 2.0 providers, clients, and the associated gadget that will interact with the protected service.

## Commands for configuring custom gadgets { .section}

See the topic [Running administrative commands](../admin/t_admin_common_edit_admin_props.md) for steps on executing newsAdmin.py before running OAuth proxy configuration commands in HCL Connections.

Perform any of the following tasks using the appropriate command:

-   [Counting providers](r_admin_common_oauth_config_homepage_gadgets.md#CountingProviders)
-   [Returning a list of providers](r_admin_common_oauth_config_homepage_gadgets.md#ReturningAListOfProviders)
-   [Returning a single provider](r_admin_common_oauth_config_homepage_gadgets.md#ReturningASingleProvider)
-   [Registering or updating a provider](r_admin_common_oauth_config_homepage_gadgets.md#RegisteringOrUpatingAProvider)
-   [Deleting a provider](r_admin_common_oauth_config_homepage_gadgets.md#DeletingAProvider)
-   [Counting clients](r_admin_common_oauth_config_homepage_gadgets.md#CountingClients)
-   [Returning a single client](r_admin_common_oauth_config_homepage_gadgets.md#ReturningASingleClient)
-   [Returning a list of clients](#ReturningAListOfClients)
-   [Registering or updating a client](r_admin_common_oauth_config_homepage_gadgets.md#RegisteringOrUpdatingAClient)
-   [Deleting a client](r_admin_common_oauth_config_homepage_gadgets.md#DeletingAClient)
-   [Binding a gadget](r_admin_common_oauth_config_homepage_gadgets.md#BindingAGadget)
-   [Deleting a binding](r_admin_common_oauth_config_homepage_gadgets.md#DeletingABinding)
-   [Returning bindings](r_admin_common_oauth_config_homepage_gadgets.md#ReturningBindings)
-   [Counting bindings](r_admin_common_oauth_config_homepage_gadgets.md#CountingBindings)
-   [Returning a single binding by gadgetUri](r_admin_common_oauth_config_homepage_gadgets.md#ReturningASingleBinding)
-   [Returning a single binding by widgetId](#ReturningASingleBindingByWidgetId)
-   [Purging all tokens](#PurgingAllTokens)

## Counting providers {#CountingProviders .section}

NewsOAuth2ConsumerService.countProvider\(\)
:   Returns the total number of OAuth 2.0 providers registered with the consumer proxy. There are no parameters.

    Example:

    ```
    wsadmin>NewsOAuth2ConsumerService.countProvider()
    
    20
    ```

## Returning a list of providers {#ReturningAListOfProviders .section}

NewsOAuth2ConsumerService.browseProvider\(int pageSize, int pageNumber\)
:   Returns a list of Map objects that represent each OAuth 2.0 provider registered with the consumer proxy, in ascending ordered by provider name. The following information is returned for each map object in the returned list:

    -   authHeader: "true" or "false"
    -   authUrl: the authentication url endpoint for the provider
    -   clientAuth: the client authentication method in use
    -   name: the name of the provider
    -   tokenUrl: the token url endpoint for the provider
    -   urlParam: "true" or "false"

    pageSize
    :   The maximum number of providers to list per page. The default value is 20. This parameter is optional.

    pageNumber
    :   The number of the page to display. For example, if you specify in the pageSize parameter that each page will have 50 items, page 1 will contain items 1-50. The default value is 1. This parameter is optional.

    Example:

    ```
    wsadmin>NewsOAuth2ConsumerService.browseProvider(50, 1)
    
    ```

## Returning a single provider {#ReturningASingleProvider .section}

NewsOAuth2ConsumerService.findProvider\(string providerName\)
:   Returns a Map with information about the registered OAuth 2.0 provider with the specified name.

    providerName
    :   The unique provider name.

    Example:

    ```
    wsadmin>NewsOAuth2ConsumerService.findProvider("provider123")
    
    ```

## Registering or updating a provider {#RegisteringOrUpatingAProvider .section}

NewsOAuth2ConsumerService.registerProvider\(string providerName, string clientAuth, string authHeader, string urlParam, string authUrl, string tokenUrl\)
:   Registers or updates an existing OAuth 2.0 provider by name with the associated parameters.

    providerName
    :   The unique provider name.

    clientAuth
    :   The client authentication method for accessing this provider. Supported values out of the box are "standard" and "basic" per the specification.

    authHeader
    :   Value of "true" if credentials must be encoded in the authorization header, otherwise "false".

    urlParam
    :   Value of "true" if credentials must be specified as query parameters on the URI, otherwise "false".

    authUrl
    :   The authentication endpoint for the provider.

    tokenUrl
    :   The token endpoint for the provider.

    Example:

    ```
    wsadmin>NewsOAuth2ConsumerService.registerProvider("provider123", "standard", "true", "false", "???", "???")
    
    ```

## Deleting a provider {#DeletingAProvider .section}

NewsOAuth2ConsumerService.deleteProvider\(string providerName\)
:   Deletes a provider by name if it exists, and has no existing associated clients or gadget bindings.

    providerName
    :   The unique provider name.

    Example:

    ```
    wsadmin>NewsOAuth2ConsumerService.deleteProvider("provider123")
    
    ```

## Counting clients {#CountingClients .section}

NewsOAuth2ConsumerService.countClient\(string providerName\)
:   Returns the total number of OAuth 2.0 clients registered with the consumer proxy.

    providerName
    :   An optional filter to only count clients associated with the specified provider.

    Example:

    ```
    wsadmin>NewsOAuth2ConsumerService.countClient("provider123")
    
    ```

## Returning a single client {#ReturningASingleClient .section}

NewsOAuth2ConsumerService.findClient\(string clientName\)
:   Returns a Map with information about the registered OAuth 2.0 client with the specified name.

    providerName
    :   The client name.

    Example:

    ```
    wsadmin>NewsOAuth2ConsumerService.findClient("client123")
    
    ```

## Returning a list of clients {#ReturningAListOfClients .section}

NewsOAuth2ConsumerService.browseClient\(string providerName, int pageSize, int pageNumber\)
:   Returns a list of Map objects that represent each OAuth 2.0 clients registered with the consumer proxy, in ascending ordered by provider name. The following information is returned for each map object in the returned list:

    -   clientId: the identifier issued by the authorization server when registering your client
    -   clientSecret: the secret issued by the authorization server when registering your client
    -   ctype: the client type, "confidential" or "public" are the supported values per the [specification](http://tools.ietf.org/html/draft-ietf-oauth-v2-23#section-2.1)
    -   grantType: "code" per [specification](http://tools.ietf.org/html/draft-ietf-oauth-v2-23#section-4.1), or "client\_credentials" per [specification](http://tools.ietf.org/html/draft-ietf-oauth-v2-23#section-4.4)
    -   name: the name of the client
    -   providerName: the name of the associated provider that was previously registered
    -   redirectUri: the client redirection uri

    providerName
    :   An optional filter to only browse clients associated with the specified provider.

    pageSize
    :   The maximum number of clients to list per page. The default value is 20. This parameter is optional.

    pageNumber
    :   The number of the page to display. For example, if you specify in the pageSize parameter that each page will have 50 items, page 1 will contain items 1-50. The default value is 1. This parameter is optional.

    Example:

    ```
    wsadmin>NewsOAuth2ConsumerService.browseClient("provider123", 50, 1)
    
    ```

## Registering or updating a client {#RegisteringOrUpdatingAClient .section}

NewsOAuth2ConsumerService.registerClient\(string clientName, string providerName, string ctype, string grantType, string clientId, string clientSecret, string redirectUri\)
:   Registers or updates an existing OAuth 2.0 client by name with the associated parameters. For more information, see [Registering an OAuth client with a provider](../admin/t_admin_registeroauthclientwprovider.md).

    clientName
    :   The name to associate with the client that must be unique in a deployment.

    providerName
    :   The name of the registered provider to associate with this client.

    ctype
    :   The client type. Supported values are "confidential" or "public".

    grantType
    :   The authorization grant type. Supported values are "code" or "client\_credentials".

    clientID
    :   The identifier issued by the authorization server when registering your client.

    clientSecret
    :   The secret issued by the authorization server when registering your client.

    redirectUri
    :   The client redirection URI.

    Example:

    ```
    wsadmin>NewsOAuth2ConsumerService.registerClient("client123", "provider123", "confidential", "code", "my-client", "my-secret", "https://{opensocial}/gadgets/oauth2callback")
    ```

## Deleting a client {#DeletingAClient .section}

NewsOAuth2ConsumerService.deleteClient\(string clientName\)
:   Deletes a client by name if it exists, and has no existing associated gadget bindings that leverage this client.

    clientName
    :   The name of the client to remove.

    Example:

    ```
    wsadmin>NewsOAuth2ConsumerService.deleteClient("client123")
    
    ```

## Binding a gadget {#BindingAGadget .section}

NewsOAuth2ConsumerService.bindGadget\(string widgetId, string serviceName, string clientName, string allowModuleOverride\)
:   Binds a gadget to a client with the specified service name and client name.

    widgetId
    :   The id of the widget.

    serviceName
    :   The name to associate with the gadget. The widgetId and service name must create a unique composite key for the deployment.

    clientName
    :   The name of the client to associate with this gadget.

    allowModuleOverride
    :   Value is "true" if the gadget overrides the provider default endpoint urls, else "false".

    Example:

    ```
    wsadmin>NewsOAuth2ConsumerService.bindGadget("aad20aa1-c0fa-48ef-bd05-8abe630c0012", "connections_service", "client123", "false")
    
    ```

## Deleting a binding {#DeletingABinding .section}

NewsOAuth2ConsumerService.unbindGadget\(string widgetId, string serviceName\)
:   Deletes a gadget binding by widgetId and serviceName.

    widgetId
    :   The id of the widget.

    serviceName
    :   The name to associate with the gadget. The widgetId and service name must create a unique composite key for the deployment.

    Example:

    ```
    wsadmin>NewsOAuth2ConsumerService.unbindGadget("aad20aa1-c0fa-48ef-bd05-8abe630c0012", "connections_service")
    
    ```

## Returning bindings {#ReturningBindings .section}

NewsOAuth2ConsumerService.browseGadgetBinding\(string widgetId, string clientName, int pageSize, int pageNumber\)
:   Returns a list of Map objects that represent each OAuth 2.0 gadget bindings registered with the consumer proxy ordered by service name ascending. The following information is returned for each map entry in the returned list:

    -   clientName: the name of the associated client
    -   allowModuleOverride: "true" or "false"
    -   serviceName: the name of the associated service
    -   uri: the gadget uri

    widgetId
    :   An optional filter to browse bindings only associated with a specific widget.

    clientName
    :   An optional filter to browse gadgets only associated with the specified client.

    pageSize
    :   The maximum number of bindings to list per page. The default value is 20. This parameter is optional.

    pageNumber
    :   The number of the page to display. For example, if you specify in the pageSize parameter that each page will have 50 items, page 1 will contain items 1-50. The default value is 1. This parameter is optional.

    Example:

    ```
    wsadmin>NewsOAuth2ConsumerService.browseGadgetBinding("aad20aa1-c0fa-48ef-bd05-8abe630c0012", "client123", 50, 2)
    
    ```

## Counting bindings {#CountingBindings .section}

NewsOAuth2ConsumerService.countGadgetBinding\(string widgetId, string clientName\)
:   Returns the total number of OAuth 2.0 bindings registered with the consumer proxy.

    string widgetId, string clientName
    :   widgetId is an optional filter to count only bindings associated with a specific widget.

    Example:

    ```
    wsadmin>NewsOAuth2ConsumerService.countGadgetBinding("aad20aa1-c0fa-48ef-bd05-8abe630c0012", "connections_servicex")
    
    ```

## Returning a single binding by gadgetUri {#ReturningASingleBinding .section}

NewsOAuth2ConsumerService.findGadgetBindingByUri\(string gadgetUri, string serviceName\)
:   Returns a Map with information about the registered OAuth 2.0 gadget bindings with the specified gadgetUri and service name.

    gadgetUri
    :   The uri for the gadget.

    serviceName
    :   The name associated with the gadget. A gadgetUri and service name create a unique composite key for a gadget in the deployment.

    Example:

    ```
    wsadmin>NewsOAuth2ConsumerService.findGadgetBindingByUri("http://www.acme.com/mygadget", "connections_service")
    ```

## Returning a single binding by widgetId {#ReturningASingleBindingByWidgetId .section}

NewsOAuth2ConsumerService.findGadgetBindingByWidgetId\(string widgetId, string serviceName\)
:   Returns a Map with information about the registered OAuth 2.0 gadget bindings with the specified widget id and service name.

    widgetId
    :   The id of the widget.

    serviceName
    :   The name associated with the gadget. A widgetId and service name create a unique composite key for a gadget in the deployment.

    Example:

    ```
    wsadmin>NewsOAuth2ConsumerService.findGadgetBinding("aad20aa1-c0fa-48ef-bd05-8abe630c0012", "connections_service")
    
    ```

## Purging all tokens {#PurgingAllTokens .section}

NewsOAuth2ConsumerService.purgeAllTokens\(\)
:   Purges all tokens persisted in the repository. This operation should be executed if the underlying encryption method has been modified.

Example:

```
wsadmin>NewsOAuth2ConsumerService.purgeAllTokens()

```

**Parent topic:**[Allowing third-party applications access to data via the OAuth2 protocol](../admin/c_admin_common_oauth.md)

