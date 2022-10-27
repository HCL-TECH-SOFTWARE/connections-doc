# Installing MongoDB 5 for Component Pack 8 {#installing_mongodb_5_for_component_pack_8 .concept}

Install MongoDB 5 for Component Pack 8.

## Before you begin {#section_zhd_414_y5b .section}

Ensure you have the following:

-   A Component Pack machine that is ready to deploy infrastructure chart
-   Docker installed on the system \(to build an image from the Dockerfile\)
-   Helm to install MongoDB using a Helm chart
-   Access to the [HCL Mongo repository](https://github.com/HCL-TECH-SOFTWARE/mongodb)

## Procedure {#section_cwf_p14_y5b .section}

1.  Download or git clone the [HCL Mongo repository](https://github.com/HCL-TECH-SOFTWARE/mongodb) and extract \(if needed\) it on the machine where Docker is installed.
2.  Go to the extracted folder \(from step 1\) and check if the Dockerfile exists there. Use this Dockerfile to build a new MongoDB 5 image:

    ``` {#codeblock_s3f_r14_y5b}
    docker build --no-cache --tag {{ **docker\_registry\_url  **
    }}/middleware-mongodb5:{{ **image\_tag** }} -f Dockerfile .
    ```

    Where:

    -   `docker_registry_url` is the registry URL for Harbor, that is `hclcr.io/cnx`.
    -   `image_tag` is the user-defined tag for the image, for example `current timestamp` .
3.  Save this image to a `tar` file:

    ``` {#codeblock_u3f_r14_y5b}
    docker save -o mongodb5.tar {{ **docker\_registry\_url**
    }}/middleware-mongodb5:{{ **image\_tag** }}
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
    sudo ctr -n=k8s.io image list | grep middleware-mongodb5:{{ **image\_tag** }} 
    ```

7.  With MongoDB 5, you need persistent volumes for all replicas of Mongo5 pod and you need to verify that they have been created. Refer to [Set up NFS](cp_install_services_tasks.md#section_e4p_jrp_tnb).
8.  Install Helm charts. When it comes to Helm charts, this documentation references to YAML files stored in the [HCL Helm repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack/templates/helmvars) as parameters.
9.  Before installing Mongo5, set up PV/PVC. Install the connections-volumes Helm chart to set up the persistence layer:
    1.  On your Component Pack node, download [connections-volumes.yml.j2](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack/templates/helmvars). Then, rename the downloaded file to connections-volumes.yml and open it.

        Replace variables in curly braces with the appropriate values.

    2.  Find out the connections-volumes chart version available on the harbor:

        ``` {#codeblock_ajf_r14_y5b}
        helm search repo v-connections-helm --devel | grep connections-persistent-st | awk {'print $2'}
        o/p 0.1.1-20220505-090030
        ```

    3.  Install connections-volumes chart:

        ``` {#codeblock_bjf_r14_y5b}
        helm upgrade connections-volumes v-connections-helm/connections-persistent-storage-nfs -i --version 0.1.1-20220505-090030 -f connections-volumes.yml --wait
        ```

    4.  Verify it by running `kubectl get pvc -n connections | grep mongo5`

        All PVCs are in BOUND state.

        **Note:** If `upgrade connections-volumes` fails, try to delete all PV, PVC first and then run upgrade command.

10. Install MongoDB 5 using Helm charts.
    1.  On your Component Pack node, download [infrastructure.yml.j2](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack/templates/helmvars). Then, rename the file to infrastructure.yml and open it.

        Replace variables in curly braces with the appropriate values.

    2.  Install or upgrade the infrastructure chart using the following steps. You'll use infrastructure charts as it contains MongoDB 5 charts. To install these charts:
        1.  Find infrastructure chart version:

            ``` {#codeblock_g52_1b4_y5b}
            helm search repo v-connections-helm --devel | grep
            infrastructure | awk {'print $2'}
            o/p: 0.1.0-20220617-050009
            ```

        2.  Install infrastructure charts:

            **Note:** You need only one --set option with a comma-separated list of properties.

            ``` {#codeblock_dv3_bwv_dvb}
            helm upgrade infrastructure v-connections-helm/infrastructure -i --version 0.1.0-20220617-050009 --namespace connections -f infrastructure.yml --set mongo5.global.image.repository={{ docker_registry_url  }}/middleware-mongodb5,mongo5.image.tag={{ image_tag }}
            ```

            Where:

            -   `0.1.0-20220617-050009` is the version number identified from step 10b.
            -   `docker_registry_url` is the registry URL for Harbor, that is `hclcr.io/cnx`.
            -   `image_tag` is the user-defined tag for the image defined in step 2.
            For example:

            ``` {#codeblock_grg_fwv_dvb}
            helm upgrade infrastructure v-connections-helm/infrastructure -i --version 0.1.0-20221006-050011 --namespace connections -f infrastructure.yml --set mongo5.global.image.repository=hclcr.io/cnx-staging/middleware-mongodb5,mongo5.image.tag=20221010-9977
            ```


**Parent topic:**[Steps to install or upgrade to Component Pack 8](../install/cp_install_services_tasks.md)

