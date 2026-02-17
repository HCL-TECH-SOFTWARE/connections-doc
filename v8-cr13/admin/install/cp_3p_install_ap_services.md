# Installing Activities Plus services {#cp_3p_install_ap_services .task}

Activities Plus in Connections Component Pack uses the existing Component Pack infrastructure, assuming that you have a working Component Pack environment.

Prerequisites for installing Activities Plus are:

-   As of January 2023, image hosting for Activities Plus (kudosboard/huddoboards) has moved to Quay.io. Refer to [Using latest releases directly from Huddo](https://docs.huddo.com/boards/images/) to configure your Kubernetes with access to huddoboards images hosted in Quay.io. There are new [Huddo charts](https://docs.huddo.com/boards/helm-charts/) to utilize these images.

-   Download the [kudosboard.yml file](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars/kudosboards.yml.j2) and modify it according to your environment. The value for 'imagePullSecret' is the one  noted in step 3d of [Using latest releases directly from Huddo](https://docs.huddo.com/boards/images/) in the Huddo documentation.

-   Get a free license key from the ISW site.

-   Register it with Connections as described in [Registering an OAuth application with a provider](cp_3p_config_ap_oauth.md). Follow the Huddo documentation to generate the OAuth secret. In case of Activities Plus upgrade, the OAuth secret and license key can be copied from your previous YAML file in [Set up Helm charts](cp_install_services_tasks.md#setup_helm).

## Procedure

1.  Delete existing kudos-boards-cp chart:

    ``` {#codeblock_idr_45r_bvb}
    helm uninstall kudos-boards-cp -n connections
    ```

2.  Delete existing kudos-boards-cp-activity-migration chart:

    ``` {#codeblock_o5y_td4_hvb}
    helm uninstall kudos-boards-cp-activity-migration -n connections
    ```

3.  Delete existing kudosboard pods \(if any\):

    ``` {#codeblock_jdr_45r_bvb}
    kubectl -n connections delete po $(kubectl -n connections get po | grep kudos | awk '{print $1}')
    ```

4.  Install chart:

    Follow the instructions in [Deploy Boards Helm Chart](https://docs.huddo.com/boards/cp/#deploy-boards-helm-chart) of the Huddo documentation. Make sure to replace or override the file name of boards-cp.yaml with kudosboard.yml in the `helm upgrade` command.

5.  Once this is all set, add the following rules to the httpd.conf on your IBM HTTP servers and restart the service: 

    ``` {#codeblock_sbn_1np_fvb}
    # proxy rules for activities plus 
    RewriteRule ^/activities/service/html/(.*)$ /boards/activities/service/html/$1 [R] 
    ProxyPass "/boards" "http://cpmaster.internal.example.com:32080/boards" 
    ProxyPassReverse "/boards" "http://cpmaster.internal.example.com:32080/boards" 
    ProxyPass "/api-boards" "http://cpmaster.internal.example.com:32080/api-boards" 
    ProxyPassReverse "/api-boards" "http://cpmaster.internal.example.com:32080/api-boards"
    ```


For more information, see [Deploying Huddo Boards into HCL Connections](https://docs.huddo.com/boards/cp/) in the Huddo Docs help.

Complete any applicable configuration tasks in [Configuring Activities Plus services](cp_3p_config_ap_intro.md).

**Parent topic:** [Integrating with Activities Plus](../install/cp_3p_integrate_intro.md)

