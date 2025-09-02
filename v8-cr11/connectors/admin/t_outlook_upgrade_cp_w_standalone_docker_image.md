# Upgrading Component Pack Outlook Add-in with a Standalone docker image {#t_outlook_upgrade_cp_w_standalone_docker_image .task}

If you have already deployed the Outlook Add-in via Component Pack, you can update that installation with a newer standalone docker image. This is useful for deploying fixes or if new release of the standalone docker image is available before the corresponding Component Pack release.

Steps required:

-   Downloading the Outlook Add-in standalone docker image
-   Updating the docker image
    -   Using Helm charts
    -   Updating the deployed pod
-   Verifying the environment variables

**Downloading the Connections Add-in for Outlook**- [Download the HCL Connections Add-in for Microsoft Outlook standalone install from My HCLSoftware](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0085519&sys_kb_id=ecb956cedbb86014a45ad9fcd39619a8).

**Updating the Docker Image**

The deployed docker image can be updated using either the new Helm charts or by updating the deployed pod.

-   **Updating the docker image using the new Helm chart.**

    This will fetch the updated Outlook Add-in docker image and add it to your docker registry. The updated docker image will be used for deployment. Both the new and old docker images will present in your docker registry.

    ``` {#codeblock_eyn_m4r_jrb}
    helm upgrade -f <PATH_TO_OVERRIDE_YAML_FILE> -n <NAME_SPACE> connections-outlook-desktop <HELM_CHART_PATH>
    ```

    **Note:** There is a node port change in the Outlook Add-in 21.10 helm chart, if you are upgrading from an older version, you will need to update HTTPD configuration after upgrading. Update the rules below to your **httpd.conf**for your IHS servers and restart IHS. Substitute the appropriate values for the variables shown like <VARIABLE\>:

    ``` {#codeblock_gyn_m4r_jrb}
    #proxy rules for outlook add-in 
    Redirect "/<CONTEXT_ROOT>" "/<CONTEXT_ROOT>/"  
    ProxyPass "/<CONTEXT_ROOT>/" 
    "https://<SERVER_NAME>:<PORT_ON_WHICH_INGRESS_CONTROLLER_IS_RUNNING>/"  
    ProxyPassReverse "/<CONTEXT_ROOT>/” 
    "https://<SERVER_NAME>:<PORT_ON_WHICH_INGRESS_CONTROLLER_IS_RUNNING>/" 
    
    ```

    example:

    ``` {#codeblock_hyn_m4r_jrb}
    #proxy rules for outlook-addin	 
    Redirect "/outlook-addin" "/outlook-addin/"  
    ProxyPass "/outlook-addin/" "https://my.connections.server.com:32080/outlook-addin/“  
    ProxyPassReverse "/outlook-addin/” "https://my.connections.server.com:32080/outlook-addin/" 
    
    ```

-   **Updating a deployed pod**

    Alternatively, you can manually update the docker image by using the kubectl set image command or by editing the deployment using kubectl edit.

    -   To update using set image command from the <OLD\_IMAGE\_VERSION\> to the <NEW\_IMAGE\_VERSION\> use the command: `kubectl set image <OUTLOOK_DEPLOYMENT_NAME> <MY_CONTAINER>=<NEW_IMAGE_VERSION>`
    -   To update by editing the deployment: kubectl edit `<OUTLOOK_DEPLOYMENT_NAME>` and change**.spec.template.spec.containers\[0\].image** from <OLD\_IMAGE\_VERSION\> to <NEW\_IMAGE\_VERSION\>

**Verifying Environment Variables**

Verify that the environment variables are correct. If the update requires environment variable changes, make them. This is generally not required for upgrades.

-   Acquiring the deployments list: `kubectl -n connections get deployments`
-   Updating or adding environment variables if necessary: `kubectl -n connections set env deployment/<DEPLOYMENY_NAME> <KEY>=<VALUE>`
-   Example: `kubectl -n connections set env deployment/cnx-mso-desktop CONNECTIONS_CLIENT_ID=connections_social_mobile AUTH_DOMAIN=https://mt-orgc.my.connections.server.com AUTH_DISCOVERY_PATH=mobile/homepage/SecurityConfiguration?debug=true DISCOVERY_DOMAIN=connections MT_DOMAIN=my.connections.server.com`

**What's Next:**

The Connections Add-in for Outlook must be added to the users’ Outlook environments. This can be done by the Exchange administrator, or by the users directly

-   [Making the Connections Add-in for Outlook available to users](https://help.hcltechsw.com/connections/v7/admin/install/cp_3p_outlook_make_available_to_users.html) - The HCL Connections Add-in for Outlook must be added to the users’ Outlook environments. This can be done by the Exchange administrator, or by the users directly.
-   [Using the Outlook Add-in](https://help.hcltechsw.com/connections/v7/connectors/enduser/c_ms_plugins_add_in_outlook.html) - The power of Connections from your Outlook inbox. Use the Connections Add-in for Microsoft™ Outlook to work with Connections content from within your Outlook inbox.

**Parent topic:**[HCL Connections Add-in for Microsoft® Outlook](../../connectors/admin/c_outlook_connector.md)

