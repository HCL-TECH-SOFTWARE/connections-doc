# Installing Activities Plus services {#cp_3p_install_ap_services .task}

Activities Plus in Connections Component Pack uses the existing Component Pack infrastructure, assuming that you have a working Component Pack environment.

Prerequisites for installing Activities Plus are:

-   Download the [kudosboard.yml file](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars/kudosboards.yml.j2) and modify it according to your environment. The OAuth secret and license key can be copied from your previous YAML file.

-   Get a free license key from the ISW site.

-   Register it with Connections as described in [Registering an OAuth application with a provider](cp_3p_config_ap_oauth.md) in the Integrating Activities Plus section. Follow the Huddo documentation to generate the OAuth secret.


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

4.  Get chart and version:

    ``` {#codeblock_kdr_45r_bvb}
    helm search repo v-connections-helm --devel | grep kudos-boards | grep -vE activity | awk {'print $2'}
    ```

    ``` {#codeblock_ajz_4fh_dvb}
    o/p: 3.1.1-20221007-134453
    ```

5.  Install chart:

    ``` {#codeblock_ldr_45r_bvb}
    helm upgrade kudos-boards-cp v-connections-helm/kudos-boards-cp -i --version 3.1.1-20221007-134453 -f kudosboards.yml --namespace connections --wait
    ```

6.  Once this is all set, add the following rules to the httpd.conf on your IBM HTTP servers and restart the service:

    ``` {#codeblock_sbn_1np_fvb}
    # proxy rules for activities plus 
    RewriteRule ^/activities/service/html/(.*)$ /boards/activities/service/html/$1 [R] 
    ProxyPass "/boards" "http://cp1.internal.cnx-dev.net:32080/boards" 
    ProxyPassReverse "/boards" "http://cp1.internal.cnx-dev.net:32080/boards" 
    ProxyPass "/api-boards" "http://cp1.internal.cnx-dev.net:32080/api-boards" 
    ProxyPassReverse "/api-boards" http://cp1.internal.cnx-dev.net:32080/api-boards"
    ```


For more information, see [Deploying Huddo Boards into HCL Connections](https://docs.huddo.com/boards/cp/) in the Huddo Docs help.

Complete any applicable configuration tasks in [Configuring Activities Plus services](cp_3p_config_ap_intro.md).

**Parent topic:**[Integrating with Activities Plus](../install/cp_3p_integrate_intro.md)

