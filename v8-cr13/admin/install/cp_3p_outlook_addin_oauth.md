# Registering the Connections Add-in for Outlook OAuth application provider {#cp_3p_outlook_addin_oauth .concept}

The following steps provide information on registering the OAuth application provider for the HCL Connections Add-in for Microsoft Outlook when this add-in is deployed as part of Compoent Pack for Connections.

!!! note
    You need to registering the Connections Outlook Add-in OAuth application provider before you install or upgrade a Component Pack deployment that includes the Outlook Add-in.

For more on configuring OAuth applications providers for Connections, see the [Configuring the HCL Connections OAuth provider](https://help.hcltechsw.com/connections/v7/admin/install/cp_install_services_tasks.html) section of the admin guide.

1.  SSH to your Deployment Manager
2.  Navigate to

    ```
    ${WEBSPHERE_INSTALLATION_FOLDER}/Appserver/profiles/Dmgr01/bin/
    ```

3.  Create a file called register\_oauth\_for\_outlook\_addin and include the following content. 

    Substitute appropriate values for items in brackets. For example, <variable\> In the following command, for example, you would replace "https://<CONNECTIONS\_URL\>/<CONTEXT\_ROOT\>/auth/callback" with something like "https://nginx.example.com/outlook-addin/auth/callback".

    ```
    batchMode=1
    execfile('oauthAdmin.py')
     OAuthApplicationRegistrationService.addApplication("connections-outlook-desktop","HCL Connections Outlook Addin","https://<CONNECTIONS_URL>/<CONTEXT_ROOT>/auth/callback")
     clientSecret = OAuthApplicationRegistrationService.getApplicationById('connections-outlook-desktop').get('client_secret')
     print clientSecret
    
    ```

4.  Save the file, and execute with: `./wsadmin.sh -lang jython –port 8879 –username YOUR_WAS_ADMIN_USERNAME –password YOUR_WAS_ADMIN_PASSWORD -f register_oauth_for_outlook_addin`
5.  Save the secret that will be generated here, and update it in your value file that you will use with Helm install, for example

    ```
    component_pack_installation_folder/hybridcloud/examples/multi_domain_environment/outlook-addin.yml
    ```

6.  To allow a more seamless user experience, HCL Connections supports automatic authorization of trusted OAuth clients. Users will not be prompted to authorize a trusted OAuth client app the first time that it tries to access their Connections data.
    -   Edit the connectionsProvider.xml file which can be found in the oauth20 directory beneath the IBM WebSphere® Application Server \(WAS\) cell configuration. For example,

        ```
        /opt/IBM/WebSphere/AppServer/profiles/profileName/config/cells/cellName/oauth20/connectionsProvider.xml
        ```

    -   Locate the parameter named `oauth20.allow.public.clients` and add the app id of the Outlook add-in connections-outlook-desktop to the values list.
7.  Recreate the OAuth provider configuration `./wsadmin.sh -lang jython -conntype SOAP -c “print AdminTask.createOAuthProvider(’-providerName connectionsProvider -fileName /opt/IBM/WebSphere/AppServer/profiles/_profileName_/config/cells/_cellName_/oauth20/connectionsProvider.xml’)” -user <wasadmin> -password <pwd>`

**Parent topic:**[Integrating with Connections Outlook Add-in for Microsoft Outlook](../install/cp_3p_outlook_addin_container.md)

