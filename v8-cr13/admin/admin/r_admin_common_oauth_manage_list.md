# Managing the client application list {#managingtheconsumerapplicationlist .reference}

Use commands to manage the list of client applications that are allowed to prompt users for access to their HCL Connections data, using the OAuth authentication protocol.

## Using OAuth commands { .section}

See the topic *Running administrative commands* for steps on executing oauthAdmin.py before running OAuth commands in HCL Connections.

Perform any of the following tasks using the appropriate command:

-   [Adding client applications to the consumer list](r_admin_common_oauth_manage_list.md#AddingApplicationsToTheConsumerList)
-   [Editing client application information](r_admin_common_oauth_manage_list.md#EditingConsumerApplicationInformati)
-   [Viewing all client applications](r_admin_common_oauth_manage_list.md#ViewingAllConsumerApplications)
-   [Viewing one client application](r_admin_common_oauth_manage_list.md#ViewingOneConsumerApplication)
-   [Counting client applications](r_admin_common_oauth_manage_list.md#CountingOneConsumerApplication)
-   [Deleting client applications](r_admin_common_oauth_manage_list.md#DeletingAConsumerApplication)

## Adding client applications to the consumer list {#AddingApplicationsToTheConsumerList .section}

OAuthApplicationRegistrationService.addApplication\(String appId, String appName, String redirectURI\)
:   Adds a new client application to the list, and prints a success message containing the client ID.

    appId
    :   The identifier of the client application.

    appName
    :   The display name of the client application.

    redirectURI
    :   A URL used to transmit authorization credential responses to the OAuth client.

    Example:

    ```
    wsadmin>OAuthApplicationRegistrationService.addApplication("sample_application", "Sample Application", "http://www.renovations.com/oauth/redirect")
    An application was added with the new id c2834676-c8b6-4748-9fdc-7c639979f326.
    ```

## Editing client application information {#EditingConsumerApplicationInformati .section}

OAuthApplicationRegistrationService.editApplication\(String appId, String appName, String redirectURI\)
:   Edits a client application in the list, and prints the client ID.

    appId
    :   The identifier of the client application.

    appName
    :   The display name of the client application.

    redirectURI
    :   A URL used to transmit authorization credential responses to the OAuth client.

    Example:

    ```
    wsadmin>OAuthApplicationRegistrationService.editApplication("c2834676-c8b6-4748-9fdc-7c639979f326", "Edited Application", "An edited client application", "http://www.renovations.com/oauth/edited/redirect")
    
    The application with the id c2834676-c8b6-4748-9fdc-7c639979f326 was updated successfully.
    ```

## Viewing all client applications {#ViewingAllConsumerApplications .section}

OAuthApplicationRegistrationService.browseApplications\(\)
:   Prints a list containing the information on all client applications, displaying the client ID, display name, and redirect URI of each item. There are no parameters.

    Example:

    ```
    wsadmin>OAuthApplicationRegistrationService.browseApplications()
    
    [{display_name=Sample Application, client_id=c2834676-c8b6-4748-9fdc-7c639979f326, client_secret=xxxxxxxxxxxxxxxxxxxxxxxx, redirect_uri=http://www.renovations.com/oauth/redirect}, {display_name=Yet Another Application, client_id=456, client_secret=xxxxxxxxxxxxxxxxxxxxxxxx, redirect_uri=http://www.yetanother.com/the/oauth/redirect}]
    ```

## Viewing one client application {#ViewingOneConsumerApplication .section}

OAuthApplicationRegistrationService.getApplicationById\(String appId\)
:   Prints the information on a single application, displaying the client ID, display name, and redirect URI.

    appId
    :   The identifier of the client application.

    Example:

    ```
    wsadmin>OAuthApplicationRegistrationService.getApplicationById("c2834676-c8b6-4748-9fdc-7c639979f326")
    
    {display_name=Sample Application, client_id=c2834676-c8b6-4748-9fdc-7c639979f326, client_secret=xxxxxxxxxxxxxxxxxxxxxxxx, redirect_uri=http://www.renovations.com/oauth/redirect}
    ```

## Counting client applications {#CountingOneConsumerApplication .section}

OAuthApplicationRegistrationService.getApplicationCount\(\)
:   Returns a count of known client applications. There are no parameters.

    Example:

    ```
    wsadmin>OAuthApplicationRegistrationService.getApplicationCount()
    
    2
    ```

## Deleting a client application {#DeletingAConsumerApplication .section}

OAuthApplicationRegistrationService.deleteApplication\(String appId\)
:   Deletes a single application from the list, and prints a success message containing the client ID.

    appId
    :   The identifier of the client application.

    Example:

    ```
    wsadmin>OAuthApplicationRegistrationService.deleteApplication("c2834676-c8b6-4748-9fdc-7c639979f326")
    
    The application with the id c2834676-c8b6-4748-9fdc-7c639979f326 was deleted successfully.
    ```

**Parent topic:**[Allowing third-party applications access to data via the OAuth2 protocol](../admin/c_admin_common_oauth.md)

**Related information**  


[Running administrative commands](../admin/t_admin_common_edit_admin_props.md)

