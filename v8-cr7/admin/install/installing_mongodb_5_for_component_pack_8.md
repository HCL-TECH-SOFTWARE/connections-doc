# Installing MongoDB 5 for Component Pack 8 {#installing_mongodb_5_for_component_pack_8 .concept}

Install MongoDB 5 for the latest CR version of Component Pack 8.

!!! Note
  
    If you wish to enable the MongoDB Role-Based Access Control (RBAC), refer to [Enabling MongoDB Role-Based Access Control](../../admin/install/enable_mongo_rbac.md) after succesfully installing MongoDB 5 for Component Pack 8 with the steps detailed in this section.

## Before you begin {#section_zhd_414_y5b .section}

Ensure you have the following:

-   A Component Pack machine that is ready to deploy infrastructure chart.
-   The machine should have Helm to install MongoDB using a Helm chart.
-   Access to the [HCL MongoDB repository](https://github.com/HCL-TECH-SOFTWARE/connections-mongo5).
-   An internet-facing environment with Docker installed \(to build an image from the Dockerfile\). It does not need to be the Component Pack machine, but it should be internet-facing since building this MongoDB image requires access to external resources.

## Procedure {#section_cwf_p14_y5b .section}

1.  Download or git clone the [HCL Mongo repository](https://github.com/HCL-TECH-SOFTWARE/connections-mongo5) and extract \(if needed\) it on the machine where Docker is installed.

2.  Go to the extracted folder \(from step 1\) and check if the Dockerfile exists there. Use this Dockerfile to build a new MongoDB 5 image:

    ``` {#codeblock_s3f_r14_y5b}
    docker build --no-cache --tag {{ docker_registry_url }}/middleware-mongodb5:{{ image_tag }} -f Dockerfile .
    ```

    Where:

    -   `docker_registry_url` is the registry URL for Harbor, that is `hclcr.io/cnx`.
    -   `image_tag` is the user-defined tag for the image, for example `current timestamp` .
    
    Ensure you see following output after image is built:

    ```
    Successfully built <system generated docker image id>
    Successfully tagged hclcr.io/cnx/middleware-mongodb5:{{ image_tag }}
    ```

3.  Save this image to a `tar` file:

    ``` {#codeblock_u3f_r14_y5b}
    docker save -o mongodb5.tar {{ docker_registry_url
    }}/middleware-mongodb5:{{ image_tag }}
    ```

    Where:

    -   `docker_registry_url` is the registry URL for Harbor, that is `hclcr.io/cnx`.
    -   `image_tag` is the user-defined tag for the image defined in step 2.

4.  Copy mongodb5.tar on all the Kubernetes worker nodes used for Component Pack installation.

5.  Import MongoDB 5 image into containerd on all the Kubernetes worker nodes:

    ``` {#codeblock_v3f_r14_y5b}
    sudo ctr -n=k8s.io image import mongodb5.tar
    ```

6.  Verify if the image is imported successfully into containerd:

    ``` {#codeblock_w3f_r14_y5b}
    sudo ctr -n=k8s.io image list | grep middleware-mongodb5:{{ image_tag }} 
    ```

7.  With MongoDB 5, you need persistent volumes for all replicas of Mongo5 pod and you need to verify that they have been created. Refer to [Set up NFS](cp_install_services_tasks.md#section_e4p_jrp_tnb).

8.  Install Helm charts. When it comes to Helm charts, this documentation references to YAML files stored in the [HCL Helm repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars) as parameters.

9.  Before installing Mongo5, set up PV/PVC. Install the connections-volumes Helm chart to set up the persistence layer:
    1.  On your Component Pack node, download [connections-volumes.yml.j2](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars). Then, rename the downloaded file to connections-volumes.yml and open it.

        Replace variables in curly braces with the appropriate values.

    2.  Log in to a Harbor OCI registry using the following command:

        ``` {#codeblock_fqf_5hr_bvb}
        $ helm registry login -u <<helm_repo_username>> -p <<helm_repo_password>> <<helm repo path>>
        ```

        Where:

        - `<<helm_repo_username>>` is the Harbor username
        - `<<helm_repo_password>>` is the CLI secret (to access, log in to Harbor then click on your name > **User Profile** > CLI Secret)
        - `<<helm_repo_path>>` is the Harbor repository to log into, that is https://hclcr.io
        
    3.  Find out the connections-volumes chart version available on Harbor:

        ``` {#codeblock_ajf_r14_y5b}
        helm show all <<oci_registry_url>>/connections-persistent-storage-nfs --devel | grep "^version:"
        o/p version: 0.1.1-20220505-090030
        ```

        Where `<<oci_registry_url>>` is the Harbor OCI container registry uri, that is `oci://hclcr.io/cnx`.

    4.  Install connections-volumes chart:

        ``` {#codeblock_bjf_r14_y5b}
        helm upgrade connections-volumes <<oci_registry_url>>/connections-persistent-storage-nfs -i --version 0.1.1-20220505-090030 --namespace connections -f connections-volumes.yml --wait
        ```

        Where `<<oci_registry_url>>` is the Harbor OCI container registry uri, that is `oci://hclcr.io/cnx`.

    5.  Verify it by running `kubectl get pvc -n connections | grep mongo5`

        All PVCs are in BOUND state.

        **Note:** If `upgrade connections-volumes` fails, try to delete all PV, PVC first and then run upgrade command.

10. Install MongoDB 5 using Helm charts.
    1.  On your Component Pack node, download [infrastructure.yml.j2](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars). Then, rename the file to infrastructure.yml and open it.

        Replace all variables in curly braces "{ }" with values that are appropriate to your cluster configuration. For instance, if you deploy your cluster in a specific namespace named "connections", you need to replace the `{{ _default_namespace }}` variable with that namespace name, "connections". Another variable is `{{ replica_count }}` which depends on the number of end users accessing the application.
        
        Explanations of some of these variables are available in [HCL Connections and Component Pack using Ansible automation](https://github.com/HCL-TECH-SOFTWARE/connections-automation/blob/main/documentation/VARIABLES.md).

        For an idea on how to make the substitutions, take the following example. This is tailored to the Connections internal environment, so it is purely for reference and is not meant to prescribe which values to use and which variables are available to override. The values you set in the `infrastructure.yml` file should fit to your own environment.

        ```
        global:
          onPrem: true
          image:
            repository: hclcr.io/cnx
        haproxy:
          namespace: connections
          replicaCount: 1
        redis:
          namespace: connections
          replicaCount: 1
        redis-sentinel:
          namespace: connections
          replicaCount: 1
        mongodb:
          namespace: connections
          createSecret: false
          replicaCount: 1
        mongo5:
          clusterDomain: cluster.local
          namespace: connections
          createSecret: false
          replicaCount: 1
        appregistry-client:
          namespace: connections
          replicaCount: 1
          ingress:
            annotations:
            kubernetes.io/ingress.class: nginx
            nginx.ingress.kubernetes.io/rewrite-target: /$1
            enabled: true
            hosts:
            - host: "*.example.com"
            paths: []
            name: cnx-ingress-appreg
            tls: []
        appregistry-service:
          namespace: connections
          deploymentType: hybrid_cloud
          replicaCount: 1
        middleware-jsonapi:
          namespace: connections
          replicaCount: 1
          ingress:
            annotations:
              kubernetes.io/ingress.class: nginx
              nginx.ingress.kubernetes.io/rewrite-target: /
            enabled: true
            hosts:
            - host: "*.example.com"
              paths: []
            name: cnx-ingress-jsonapi
            tls: []
        replicaCount: 1
        ```

    2.  Install or upgrade the infrastructure chart using the following steps. You'll use infrastructure charts as it contains MongoDB 5 charts. To install these charts:
        1.  Find infrastructure chart version:

            ``` {#codeblock_g52_1b4_y5b}
            helm show all <<oci_registry_url>>/infrastructure --devel | grep "^version:"
            o/p: version: 0.1.0-20220617-050009
            ```

            Where `<<oci_registry_url>>` is the Harbor OCI container registry uri, that is `oci://hclcr.io/cnx`.

        2.  Install infrastructure charts:

            **Note:** You need only one --set option with a comma-separated list of properties.

            ``` {#codeblock_dv3_bwv_dvb}
            helm upgrade infrastructure <<oci_registry_url>>/infrastructure -i --version 0.1.0-20220617-050009 --namespace connections -f infrastructure.yml --set mongo5.image.tag={{ image_tag }}
            ```

            Where:

            - `<<oci_registry_url>>` is the Harbor OCI container registry uri, that is `oci://hclcr.io/cnx`
            - `0.1.0-20220617-050009` is the version number identified from step 10b
            - `image_tag` is the user-defined tag for the image defined in step 2
            
            For example:

            ``` {#codeblock_grg_fwv_dvb}
            helm upgrade infrastructure oci://hclcr.io/cnx/infrastructure -i --version 0.1.0-20221006-050011 --namespace connections -f infrastructure.yml --set mongo5.image.tag=20221010-9977
            ```


**Parent topic:** [Steps to install or upgrade to Component Pack 8](../install/cp_install_services_tasks.md)

