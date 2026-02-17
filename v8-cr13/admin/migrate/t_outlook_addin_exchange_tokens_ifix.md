# Installing Outlook Add-in Exchange Tokens iFix {#t_outlook_addin_exchange_tokens_ifix .task}

If you already deployed the Outlook add-in using Component Pack, update that installation with the newer standalone Docker image to deliver the Exchange token interim fix. This approach is useful for applying fixes or when a new standalone image is available before the corresponding Component Pack release.

This upgrade deprecates the use of legacy Exchange tokens and replaces them with Microsoft’s Nested App Authentication.

**Steps required**

-   Update the Microsoft Entra App Registration
-   Download the Outlook Add-in standalone docker image
-   Update the docker image
    -   Update the docker image using the new Helm chart
    -   Update the deployed pod
-   Update the environment variables

## Update the Microsoft Entra App Registration

The following steps describe how to manually update the Connections Add-in for Outlook as an OAuth application provider in your Microsoft Entra ID (formerly Azure Active Directory) tenant.

### Register the Microsoft Entra App

Ensure that there is an existing application registration for the Outlook Add-in in your Microsoft Entra ID tenant.

1. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com/).
2. Navigate to your application's **Overview** page by going to **Entra ID** > **App registrations** > **[Name of the App]**.

    !!! note

        If there are no existing app registration, proceed with the steps below to create a new app registration:

3. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com/).
4. Navigate to **Entra ID**  >  **App registrations**.
5. Click **+ New registration**.
6. Provide a meaningful **Name** for your application (for example, "HCL Connections Outlook Add-in").
7. Under **Supported account types**, select **Accounts in this organizational directory only**. This ensures that only users within your tenant can use the application.
8. Click **Register**.

Once the registration is complete, the application's Overview page will be displayed. You will need to copy and save the Application (client) ID (`ENTRA_CLIENT_ID`) and the Directory (tenant) ID (`ENTRA_TENANT_ID`) for later use in your HCL Connections configuration.

### Update the redirect URI

The redirect URI is the URL to which Microsoft Entra ID will send authentication responses. You must configure this correctly for the Outlook Add-in to work.

1. Navigate to your application's **Overview** page by going **to Entra ID** > **App registrations** > **[Name of the App]**.
2. On your application's **Overview** page, navigate to **Authentication** (under the "Manage" menu on the left).
3. Under **Platform configurations**, click **+ Add a platform**. A **Configure platforms** side panel will appear.
    1. On the side panel, select **Single-page application** as the application type.
    2. Complete the form with the following details:
        -   **Redirect URIs**: `https://<CONNECTIONS_URL>/<CONTEXT_ROOT>`
            
            -   Replace `<CONNECTIONS_URL>` with the full URL of your HCL Connections server.
            -   Replace `<CONTEXT_ROOT>` with the context root configured for the add-in (default is `outlook-addin`).
                
            Example:  `https://example-connections.com/outlook-addin`

        -   **Front-channel logout URL**: _leave blank_
        -   **Grant types**: _leave untouched_
        -   **Implicit grant and hybrid flows**: _leave options unchecked_

    3. Click **Configure** to save changes.

4. After adding an SPA platform, under **Platform configurations**, go to  **to Single-page application** > **Redirect URIs**, and click **Add URI**.
5. In the newly added input field, enter `brk-multihub://<CONNECTIONS_URL>`.
        
    Replace `<CONNECTIONS_URL>` with the full URL of your HCL Connections server.
        
    For example: `brk-multihub://example-connections.com`

6. Enter the following details for the other options under the **Platform Configurations**:
    -   **Front-channel logout URL**: _leave blank_
    -   **Implicit grant and hybrid flows**: _leave options unchecked_
    -   **Supported account types**: _leave as default — Accounts in this organizational directory only_
    -   **Advance Settings**: _leave as default — No_

7. At the bottom of the page, click **Save** to apply changes.

### Configure API permissions

The Outlook add-in needs specific permissions to access Outlook data and features. You must grant these permissions to the application.

1. On your application's **Overview** page, navigate to **API permissions** (under the "Manage" menu on the left).
2. Click **+ Add a permission**.
3. A side panel will be shown to add permissions:
    1. For **Microsoft APIs**, select **Microsoft Graph**.
    2. For the type of permission the application requires, select **Delegated permissions** and set the following permissions:
        -   Openid permissions: `openid`
        -   Openid permissions: `offline_access`
        -   Mail: `Mail.Read`
    3. Click **Add permissions**.
4. After adding the permissions, click on the **Grant admin consent for [your tenant name]** button and confirm. This grants the permissions to all users in your organization, so they do not need to consent individually.

Your app registration is now complete. You can use the `ENTRA_CLIENT_ID` (Application ID) and `ENTRA_TENANT_ID` (Directory ID) to configure your HCL Connections environment.

## Download the Connections add-in for Outlook

Download the HCL Connections Add-in for Microsoft Outlook standalone install from [My HCLSoftware](https://support.hcl-software.com/csm?id=kb_article&sysparm_article=KB0085519&sys_kb_id=ecb956cedbb86014a45ad9fcd39619a8).

## Update the Docker Image

The deployed docker image can be updated using either the new Helm charts or by updating the deployed pod.

### Update the docker image using the new Helm chart

This will fetch the updated Outlook Add-in docker image and add it to your docker registry. The updated docker image will be used for deployment. Both the new and old docker images will present in your docker registry.
    
```bash
helm upgrade -f <PATH_TO_OVERRIDE_YAML_FILE> -n <NAME_SPACE> connections-outlook-desktop <HELM_CHART_PATH>
```
    
!!! note
        
    There is a node port change in the Outlook Add-in 21.10 helm chart. If you are upgrading from an older version, you will need to update HTTPD configuration after upgrading. Add the rules below to the `httpd.conf ` file on each IHS server, then restart IHS. Replace placeholders like `<VARIABLE>` with appropriate values:

```bash
#proxy rules for outlook add-in 
Redirect "/<CONTEXT_ROOT>" "/<CONTEXT_ROOT>/"  
ProxyPass "/<CONTEXT_ROOT>/" 
"https://<SERVER_NAME>:<PORT_ON_WHICH_INGRESS_CONTROLLER_IS_RUNNING>/"  
ProxyPassReverse "/<CONTEXT_ROOT>/” 
"https://<SERVER_NAME>:<PORT_ON_WHICH_INGRESS_CONTROLLER_IS_RUNNING>/"
```

Example:

```bash
#proxy rules for outlook-addin   
Redirect "/outlook-addin" "/outlook-addin/"  
ProxyPass "/outlook-addin/" "https://my.connections.server.com:32080/outlook-addin/“  
ProxyPassReverse "/outlook-addin/” "https://my.connections.server.com:32080/outlook-addin/"
```

### Update a deployed pod

Alternatively, you can manually update the docker image by using the kubectl set image command or by editing the deployment using kubectl edit.

1. Move the provided image tar file to your component pack server.
2. Import the image into kubernetes.
3. To update using the set image command from the `<OLD_IMAGE_VERSION>` to the `<NEW_IMAGE_VERSION>` use the command: 

    ```kubectl set image <OUTLOOK_DEPLOYMENT_NAME> <MY_CONTAINER>=<NEW_IMAGE_VERSION>```

4. To update by editing the deployment, use: 

    ```kubectl edit <OUTLOOK_DEPLOYMENT_NAME>``` 
    
    Change `spec.template.spec.containers[0].image` from `<OLD_IMAGE_VERSION>` to `<NEW_IMAGE_VERSION>`.

## Update Environment Variables

For this upgrade, there are two environment variables that is needed to be added: `ENTRA_CLIENT_ID` and `ENTRA_TENANT_ID`. These variables can be found during the ***Update the Microsoft App Registration*** step. These can be updated within the helm chart or manually as described below:

-   To acquire the deployments list, execute: 

    ```kubectl -n connections get deployments```

-   To update or add environment variables if necessary, execute: 

    ```kubectl -n connections set env deployment/<DEPLOYMENT_NAME> <KEY>=<VALUE>```

    Where:
    
    -  `<DEPLOYMENT_NAME>` is the name of the deployment for the Outlook Add-in (for example, `cnx-mso-desktop`).
    -  `<KEY>` is either `ENTRA_CLIENT_ID` or `ENTRA_TENANT_ID`.
    -  `<VALUE>` is the corresponding value obtained from the Microsoft Entra App Registration step.

    Example:
    
    ```bash
    kubectl -n connections set env deployment/cnx-mso-desktop ENTRA_CLIENT_ID=61f5bccc-94d0-477f-b8da-d89a0e85ffc5 ENTRA_TENANT_ID=6265758f-c887-4021-90fc-9ad22eeeea0b
    ```

## What's Next

The Connections Add-in for Outlook must be added to the users’ Outlook environments. This can be done by the Exchange administrator, or by the users directly

-   [Making the Connections Add-in for Outlook available to users](../install/cp_3p_outlook_make_available_to_users.md) - The HCL Connections Add-in for Outlook must be added to the users’ Outlook environments. This can be done by the Exchange administrator, or by the users directly.
-   [Using the Outlook Add-in](../../connectors/enduser/c_ms_plugins_add_in_outlook.md) - The power of Connections from your Outlook inbox. Use the Connections Add-in for Microsoft™ Outlook to work with Connections content from within your Outlook inbox.

**Parent topic:** [HCL Connections Add-in for Microsoft® Outlook](../../connectors/admin/c_outlook_connector.md)
