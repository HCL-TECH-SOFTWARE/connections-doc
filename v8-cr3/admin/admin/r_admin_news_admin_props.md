# News administrative commands {#r_admin_news_admin_props .reference}

Use the commands listed to administer the News repository.

## News repository commands { .section}

The following sections define the commands that you can use when you are working with the News repository. Each section describes the commands for a specific service. The commands are listed in alphabetical order.

-   [NewsActivityStreamService](r_admin_news_admin_props.md#NewsActivityStreamService)
-   [NewsCellConfig](r_admin_news_admin_props.md#NewsCellConfig)
-   [NewsEmailDigestService](r_admin_news_admin_props.md#NewsEmailDigestService)
-   [NewsMailinService](r_admin_news_admin_props.md#NewsMailinService)
-   [NewsMemberService](r_admin_news_admin_props.md#NewsMemberService)
-   [NewsMicrobloggingService](r_admin_news_admin_props.md#NewsMicrobloggingService)
-   [NewsOAuth2ConsumerService](r_admin_news_admin_props.md#NewsOAuth2ConsumerService)
-   [NewsScheduler](r_admin_news_admin_props.md#NewsScheduler)
-   [NewsWidgetCatalogService](r_admin_news_admin_props.md#NewsWidgetCatalogService)

## NewsActivityStreamService commands {#NewsActivityStreamService .section}

NewsActivityStreamService.getApplicationRegistration\("applicationId"\)
:   Returns a list of details about the specified application. This command takes a single argument, which is a string that specifies the application ID. Use the NewsActivityStreamService.listApplicationRegistrations\(\) command to retrieve this ID.

    Results are returned as key value pairs that are separated by commas.

    For example:

    ```
    wsadmin>NewsActivityStreamService.listApplicationRegistrations()
    {wikis=wikis, ecm_files=Libraries, communities=communities, profiles=profiles, 
    activities=activities, 3rd_party_id=A Third Party, homepage=homepage, 
    blogs=blogs, forums=forums, files=files, dogear=dogear}
    ```

    ```
    wsadmin>NewsActivityStreamService.getApplicationRegistration("communities")
    {imageUrl=http://example.com:9082/connections/resources/web/
       com.ibm.lconn.core.styles/images/iconCommunities16.png, summary=null, 
       isEnabled=true, secureUrl=https://example.com:9445/communities, 
       secureImageUrl=https://example.com:9445/connections/resources/web/
       com.ibm.lconn.core.styles/images/iconCommunities16.png, appId=communities,
       displayName=communities, url=http://example.com:9082/communities}
    ```

NewsActivityStreamService.listApplicationRegistrations\(\)
:   Returns a list of the applications that are registered with the News service. The applications are separated by commas and formatted as follows:

    ```
    application ID=Display name or description
    ```

NewsActivityStreamService.registerApplication\(appId, displayName, url, secureUrl, imageUrl, secureImageUrl, summary, isEnabled\)
:   Registers a new application.

    This command takes the following parameters:

    -   appId. The ID of the application that you want to register.
    -   displayName. The name of the application that you want to display in the product user interface.
    -   url. The web address for the application.
    -   secureUrl. The secure web address for the application.
    -   imageUrl. The web address for an image to associate with the application in the user interface.
    -   secureImageUrl. The secure web address for an image to display for the application.
    -   summary. A short description of the application.
    -   isEnabled. A Boolean string that specifies whether the registration is enabled or disabled.

    **Note:** You must include the appId and isEnabled parameters, but the remaining parameters are optional. After registering an application, you might also need to restart the Home page application for the application to display in the filter list.

    For example:

    ```
    NewsActivityStreamService.registerApplication
    ("testApp", "Test Application", "http://www.test.com/gadget.xml", 
    "https://www.test.com/gadget.xml", "http://www.test.com/image.jpg", 
    "https://www.test.com/image.jpg", "summary", "true")
    ```

NewsActivityStreamService.removeApplicationRegistration\(appId\)
:   Removes the specified application registration.

    This command takes a single parameter, which is the ID of the application that you want to remove.

    For example, the following command removes the registration of the testApp application.

    ```
    NewsActivityStreamService.removeApplicationRegistration("testApp")
    ```

NewsActivityStreamService.updateApplicationRegistration\(appId, field, value\)
:   Updates a particular field associated with an existing, registered application.

    This command takes the following parameters:

    -   appId. The ID of the application that you want to update.
    -   field. The registration field whose information you want to update. Set this parameter to one of the following values:
        -   displayName. The updated name of the application.
        -   url. The updated web address for the application.
        -   secureUrl. The updated secure web address for the application.
        -   imageUrl. The updated web address of the image to associate with the application in the user interface.
        -   secureImageUrl. The updated secure web address of the image to associate with the application in the user interface.
        -   summary. An updated short description of the application.
        -   isEnabled. A Boolean string that specifies whether the registration is enabled or disabled.
    -   value. The value of the field that you are updating. When you are updating the displayName field, summary, or one of the URL fields, specify the value as a string. When you are updating the isEnabled field, specify a Boolean string.

    For example, the following command disables the registration of the testApp application:

    ```
    NewsActivityStreamService.updateApplicationRegistration("testApp", "isEnabled", "false")
    ```

NewsActivityStreamService.updateApplicationRegistrationForEmailDigest\(appId, isEnabled, defaultFollowFrequency, isLocked\)
:   Updates a registered application so that it is enabled for email digest functionality. When you run this command, the updates occur immediately; you do not need to restart the system.

    Enabled applications are included on the Email Preferences page, and email notifications are sent to the intended recipients of activities. Users can select the frequency with which they want to be notified about updates, as with the standard HCL Connections applications. Depending on the user's choice, an email notification is sent either immediately or grouped in a daily or weekly newsletter.

    This command takes the following parameters:

    **Note:** You must run the command every time a parameter update is required.

    -   appId. The ID of the application that you want to update.
    -   isEnabled. A Boolean string that specifies whether the registration is enabled or disabled for email digest sending.
    -   defaultFollowFrequency. A value that specifies the default frequency with which application updates are notified. The following values are valid: NONE, INDIVIDUAL, DAILY, and WEEKLY.
    -   isLocked. A Boolean string that specifies whether email settings for the application are locked or unlocked.

        **Note:** Setting this parameter to true enforces the defaultFollowFrequency parameter for all users, and individual user settings for the application are overridden. When isLocked is set to true, a lock icon displays next to the application name on the Email Preferences page, and the radio buttons for selecting the notification frequency for the application are disabled. When isLocked is set to false, users can specify notification frequency settings for the application, and any settings that were previously specified are restored.


    For example:

    ```
    NewsActivityStreamService.updateApplicationRegistrationForEmailDigest("testApp", "true", "DAILY", "false")
    ```

## NewsCellConfig commands {#NewsCellConfig .section}

NewsCellConfig.checkOutConfig\("working\_directory", "cell\_name"\)
:   Checks out the News repository configuration files.

    This command takes the following parameters:

    <working\_directory\>
    :   Temporary working directory to which the configuration files are copied. The files are kept in this working directory while you change them.

    <cell\_name\>
    :   Name of the IBM® WebSphere® Application Server cell that hosts the HCL Connections application. If you do not know the cell name, type the following command while in the wsadmin command processor:

        ```
        print AdminControl.getCell()
        ```

    For example:

    -   Linux:

        ```
        NewsCellConfig.checkOutConfig("/opt/my_temp_dir", 
           "NewsServerNode01Cell")
        ```

    -   Microsoft® Windows™:

        ```
        NewsCellConfig.checkOutConfig("c:/temp","foo01Cell01")
        ```


NewsCellConfig.checkInConfig\(\)
:   Checks in the News repository configuration files. Run from the wsadmin command processor.

## NewsEmailDigestService commands {#NewsEmailDigestService .section}

NewsEmailDigestService.loadBalanceEmailDigest\(\)
:   Reallocates and load balances the users in the email address groups used by the email digest according to mail domain. This command does not take any parameters.

    The command returns the number of users who have been reallocated to different email address groups for load balancing purposes.

    For example:

    ```
    wsadmin> NewsEmailDigestService.loadBalanceEmailDigest()
    1603
    ```

## NewsMailinService commands {#NewsMailinService .section}

NewsMailinService.removeReplyToId\("replyto address ID"\)
:   Removes a single reply-to ID.

    This command takes a single parameter, which is a string that specifies the reply-to ID that you want to delete.

    For example:

    ```
    NewsMailinService.removeReplyToId("c0c7e9bf-32d9-48a7-933c-74794479ebf3")
    ```

NewsMailinService.removeReplyToIdsForUserEmail\("user email"\)
:   Removes all the reply-to IDs for the user with the specified email address.

    This command takes a single parameter, which is a string that specifies the email address for the user whose reply-to IDs you want to delete.

    For example:

    ```
    NewsMailinService.removeReplyToIdsForUserEmail("mary_smith@example.com")
    ```

NewsMailinService.removeReplyToIdsForUserExtId\("user extId"\)
:   Removes all the reply-to IDs for the user with the specified external ID.

    This command takes a single parameter, which is a string that specifies the external ID for the user whose reply-to IDs you want to delete.

    For example:

    ```
    NewsMailinService.removeReplyToIdsForUserExtId("91b3897d-b4f8-4d05-3621-50bcaa22d300")
    ```

## NewsMemberService commands {#NewsMemberService .section}

NewsMemberService.getMemberExtIdByEmail\("email"\)
:   See *Synchronizing user data using administrative commands* for details.

NewsMemberService.getMemberExtIdByLogin\("login"\)
:   See *Synchronizing user data using administrative commands* for details.

NewsMemberService.inactivateMemberByEmail\("email"\)
:   See *Synchronizing user data using administrative commands* for details.

NewsMemberService.inactivateMemberByExtId\("externalID"\)
:   See *Synchronizing user data using administrative commands* for details.

NewsMemberService.syncAllMembersByExtId\( \{"updateOnEmailLoginMatch": \["true" \| "false"\] \} \)
:   See *Synchronizing user data using administrative commands* for details.

NewsMemberService.syncBatchMemberExtIdsByEmail\("emailFile" \[, \{"allowInactivate" : \["true" \| "false"\] \} \] \)
:   See *Synchronizing user data using administrative commands* for details.

NewsMemberService.syncBatchMemberExtIdsByLogin\("loginFile" \[, \{"allowInactivate" : \["true" \| "false"\] \} \] \)
:   See *Synchronizing user data using administrative commands* for details.

NewsMemberService.syncMemberByExtId\("currentExternalId"\[, \{"newExtId" : "id-string" \[, "allowExtIdSwap" : \["true" \| "false"\] \] \} \] \)
:   See *Synchronizing user data using administrative commands* for details.

NewsMemberService.syncMemberExtIdByEmail\("email" \[, \{ "allowInactivate" : \["true" \| "false"\] \} \]\)
:   See *Synchronizing user data using administrative commands* for details.

NewsMemberService.syncMemberExtIdByLogin\("name" \[, \{"allowInactivate": \["true" \| "false"\] \} \]\)
:   See *Synchronizing user data using administrative commands* for details.

## NewsMicrobloggingService commands {#NewsMicrobloggingService .section}

NewsMicrobloggingService.deleteMicroblogs\("communityId"\)
:   Removes all microblog and associated data for a community from the News repository.

    When you run this command, the status messages are removed from the Status Updates widget in the community. The messages are also removed from the **Updates** views in Homepage. In addition, the Status Updates widget in the community is set so that no one can add status messages; the community owner can later change this setting by editing the community, selecting the Status Updates tab, and changing the Status Updates setting.

    This command takes a single parameter, which is a string that specifies the ID of the community whose microblog data you want to delete.

    For example:

    ```
    NewsMicrobloggingService.deleteMicroblogs("e952cf0c-a86c-4e26-b1e0-f8bf40a75804")
    ```

NewsMicrobloggingService.exportSyncedResourceInfo\(filePath, eventType\)
:   Returns an XML synchronization report of the community resources held in the News repository. The report contains information about the current state of microblog data in the community activity stream.

    This command takes the following parameters:

    filePath
    :   String that specifies the full directory path in which to store the file that is returned by the command. Include the file name in the file path and use forward slashes. For example: "C:/temp/activity\_output.xml"

    eventType
    :   Identifies the type of synchronization event to report about. The only supported value for this parameter is community. Specify this value as a singular community and in lowercase.

    For example:

    ```
    NewsMicrobloggingService.exportSyncedResourceInfo("C:/temp/news_output.xml","community")
    ```

## NewsOAuth2ConsumerService commands {#NewsOAuth2ConsumerService .section}

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

NewsOAuth2ConsumerService.countClient\(string providerName\)
:   Returns the total number of OAuth 2.0 clients registered with the consumer proxy.

    providerName
    :   An optional filter to only count clients associated with the specified provider.

    Example:

    ```
    wsadmin>NewsOAuth2ConsumerService.countClient("provider123")
    
    ```

NewsOAuth2ConsumerService.countGadgetBinding\(string widgetId, string clientName\)
:   Returns the total number of OAuth 2.0 bindings registered with the consumer proxy.

    string widgetId, string clientName
    :   widgetId is an optional filter to count only bindings associated with a specific widget.

    Example:

    ```
    wsadmin>NewsOAuth2ConsumerService.countGadgetBinding("aad20aa1-c0fa-48ef-bd05-8abe630c0012", "connections_servicex")
    
    ```

NewsOAuth2ConsumerService.deleteClient\(string clientName\)
:   Deletes a client by name if it exists, and has no existing associated gadget bindings that leverage this client.

    clientName
    :   The name of the client to remove.

    Example:

    ```
    wsadmin>NewsOAuth2ConsumerService.deleteClient("client123")
    
    ```

NewsOAuth2ConsumerService.findClient\(string clientName\)
:   Returns a Map with information about the registered OAuth 2.0 client with the specified name.

    providerName
    :   The client name.

    Example:

    ```
    wsadmin>NewsOAuth2ConsumerService.findClient("client123")
    
    ```

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

NewsOAuth2ConsumerService.countProvider\(\)
:   Returns the total number of OAuth 2.0 providers registered with the consumer proxy. There are no parameters.

    Example:

    ```
    wsadmin>NewsOAuth2ConsumerService.countProvider()
    
    20
    ```

NewsOAuth2ConsumerService.deleteProvider\(string providerName\)
:   Deletes a provider by name if it exists, and has no existing associated clients or gadget bindings.

    providerName
    :   The unique provider name.

    Example:

    ```
    wsadmin>NewsOAuth2ConsumerService.deleteProvider("provider123")
    
    ```

NewsOAuth2ConsumerService.findProvider\(string providerName\)
:   Returns a Map with information about the registered OAuth 2.0 provider with the specified name.

    providerName
    :   The unique provider name.

    Example:

    ```
    wsadmin>NewsOAuth2ConsumerService.findProvider("provider123")
    
    ```

NewsOAuth2ConsumerService.purgeAllTokens\(\)
:   Purges all tokens persisted in the repository. This operation should be executed if the underlying encryption method has been modified.

NewsOAuth2ConsumerService.registerClient\(string clientName, string providerName, string ctype, string grantType, string clientId, string clientSecret, string redirectUri\)
:   Registers or updates an existing OAuth 2.0 client by name with the associated parameters. For more information, see [Registering an OAuth client with a provider](../customize/../admin/t_admin_registeroauthclientwprovider.md).

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

## NewsScheduler commands {#NewsScheduler .section}

NewsScheduler.getTaskDetails\(java.lang.String taskName\)
:   Returns information about the scheduled task specified by taskName.

    The values returned are server time, next scheduled run time, status \(SCHEDULED, RUNNING, SUSPENDED\), and task name. When the task has been paused, then the status parameter shows as SUSPENDED instead of SCHEDULED. SUSPENDED means that the task is not scheduled to run.

    For example:

    ```
    NewsScheduler.getTaskDetails("NewsDataCleanup")
    ```

    The resulting output looks similar to the following:

    ```
    {taskName=NewsDataCleanup, currentServerTime=Fri Mar 12 
    14:42:25 GMT 2010, nextFireTime=Fri Mar 12 23:00:00 
    GMT 2010, status=SCHEDULED}
    ```

NewsScheduler.pauseSchedulingTask\(java.lang.String taskName\)
:   Temporarily pauses the specified task and stops it from running.

    When you pause a scheduled task, the task remains in the suspended state even after you stop and restart News or the WebSphere Application Server. You must run the NewsScheduler.resumeSchedulingTask\(String taskName\) command to get the task running again.

    If the task is currently running, it continues to run but is not scheduled to run again. If the task is already suspended, this command has no effect. When the task is paused successfully, a 1 is returned to the wsadmin client. When the task is not paused successfully, a 0 is returned.

    For example:

    ```
    NewsScheduler.pauseSchedulingTask("NewsDataCleanup")
    ```

NewsScheduler.resumeSchedulingTask\(java.lang.String taskName\)
:   If the task is suspended, puts the task in the scheduled state. If the task is not suspended, this command has no effect.

    When a task is resumed, it does not run immediately; it runs at the time when it is next scheduled to run.

    For example:

    ```
    NewsScheduler.resumeSchedulingTask("NewsDataCleanup")
    ```

    When the task is resumed successfully, a 1 is returned to the wsadmin client. When the task is not resumed successfully, a 0 is returned.

## NewsWidgetCatalogService commands {#NewsWidgetCatalogService .section}

NewsWidgetCatalogService.addWidget\(\*\*widget\)
:   Add a widget to the widget catalog.

:   \*\* widget indicates that this is a free form set of key=value properties. The keys/values map to the Settings available for widgets table previously described.

:   Returns the ID of the newly created widget.

:   The following example creates a sample EE gadget that has 'trusted' access policies. This gadget depends on the Profiles component.

    ```
    
    NewsWidgetCatalogService.addWidget(title="Sample gadget title", text="Sample gadget description.", url="http://www.to.my.gadget.com/gadget.xml", categoryName='sample' isGadget=TRUE,appContexts=[WidgetContexts.EMBEDXP], policyFlags=[GadgetPolicyFlags.TRUSTED], prereqs=["profiles"])
    
    ```

NewsWidgetCatalogService.browseWidgets\(enablement = Enablement.ALL, pageSize = PAGE\_SIZE\_UNBOUNDED, pageNumber = 1\)
:   Browse the widgets in the widget catalog.

:   Uses the parameter for enablement \(Refer to Enablement\).

:   Uses the parameter for pageSize.

:   Uses the parameter for pageNumber.

:   Returns a list of Widget objects.

:   ```
wsadmin>NewsWidgetCatalogService.browseWidgets(Enablement.ALL, 1, 1)
```

NewsWidgetCatalogService.countWidgets\(enablement = Enablement.ALL\)
:   Count the widgets in the widget catalog.

:   \* Uses the parameter for enablement \(Refer to Enablement\).

:   \* Returns a count of the number of widgets in the catalog.

NewsWidgetCatalogService.disableWidget\(widgetId\)
:   Returns the following output:

    ```
    CLFRQXXXXI: Widget {0} is now disabled.
    ```

NewsWidgetCatalogService.enableWidget\(widgetId\)
:   Returns the following output:

    ```
    CLFRQXXXXI: Widget {0} is now enabled.
    ```

NewsWidgetCatalogService.findWidgetById\(WidgetId\)
:   Find a widget by id.

:   Uses the parameter for widgetId.

:   Returns the matching widget or null if no matching widget is found.

:   For example:

    ```
    wsadmin>NewsWidgetCatalogService.findWidgetById("405a4f26-fa08-4cef-a995-7d90fbe2634f")
    
    ```

NewsWidgetCatalogService.findWidgetByUrl\(widgetUrl\)
:   Find a widget by Url.

:   Uses the parameter for url.

:   Returns the matching widget or null if no matching widget is found.

NewsWidgetCatalogService.listShareGadgets\(enablement = Enablement.ALL\)
:   List out the share gadgets. By design, paging is not supported.

:   Uses the parameter for enablement \(Refer to Enablement\).

:   Returns the share gadgets.

:   For example:

    ```
    wsadmin>NewsWidgetCatalogService.listShareGadgets(Enablement.ALL)
    ```

NewsWidgetCatalogService.ProxyPolicy
:   Specify the server proxy policy.

:   INTRANET\_ACCESS May access intranet sites.

:   EXTERNAL\_ONLY May access external \(non-intranet\) sites only.

:   CUSTOM Uses rules in the rule manager configuration.

NewsWidgetCatalogService.removeWidget\(widgetId\)
:   Remove a widget matching the widgetId entered.

:   For example:

    ```
    wsadmin>NewsWidgetCatalogService.removeWidget("405a4f26-fa08-4cef-a995-7d90fbe2634f") 
    ```

NewsWidgetCatalogService.updateWidget\(widgetId, \*\*widget\)
:   Update an existing widget in the widget catalog.

:   Uses the parameter for widgetId.

:   \*\* widget indicates that this is a free form set of key=value properties. The keys/values map to the Settings available for widgets table previously described.

:   ```
wsadmin>NewsWidgetCatalogService.updateWidget("1bf9ad75-a634-4301-88c6-ce493eb03cc9", title="test", text="test")
```

NewsWidgetCatalogService.updateWidgetShareOrder\(widgetId, orderAfterWidgetId\)
:   Place the widget marked in a widgetId after a second widget in widget ordering.

:   widgetId The id of the widget you wish to move.

:   orderAfterWidgetId The id of the widget you want to place the gadget after. If this is null, the widget will be placed first in the ordering.

**Parent topic:**[Administering the News repository](../admin/c_admin_news.md)

**Related information**  


[Managing scheduled tasks for the News repository](../admin/t_admin_news_manage_scheduler.md)

[Reallocating and load balancing users according to mail domain](../admin/t_admin_news_load_balance_users.md)

[Purging compromised reply-to IDs](../admin/t_admin_news_purge_replyto_ids.md)

[Registering third-party applications](../admin/t_admin_news_enable_third-party_apps.md)

[Deleting community microblogs from the News repository](../admin/t_admin_news_delete_community_microblogs.md)

[Running administrative commands](../admin/t_admin_common_edit_admin_props.md)

[Gadget registration commands](../admin/r_admin_gadget_reg_ws_commands.md)

[Configuring OAuth for custom gadgets](../customize/r_admin_common_oauth_config_homepage_gadgets.md)

