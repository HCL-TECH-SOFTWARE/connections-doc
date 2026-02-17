# Installing MongoDB 7 for Component Pack 8 {#installing_mongodb_7_for_component_pack_8 .concept}

Install MongoDB 7 for the latest CR version of Component Pack 8.

## Before you begin {#section_zhd_414_y5b .section}

Ensure you have the following:

- A Component Pack deployment that is ready to deploy the infrastructure chart.  If this is an upgrade, MongoDB 5 should already be deployed. If your deployment is using MongoDB 3, please contact HCL Connections Customer Support before proceeding.
- The machine should have Helm installed to deploy MongoDB using a Helm chart.
- Access to the [HCL MongoDB repository](https://github.com/HCL-TECH-SOFTWARE/connections-mongo7).
- An internet-facing environment with Docker installed \(to build an image from the Dockerfile\). It does not need to be the Component Pack machine, but it should be internet-facing since building this MongoDB image requires access to external resources.  This machine can also be used to migrate data as outlined in the [MongoDB 5 to MongoDB 7 Migration Guide](mongo7-migration-script.md).  Please ensure you read both this documentation and the migration guide before proceeding.
- Please be aware that installing the Helm chart to upgrade MongoDB will cause a temporary outage. During this process, the MongoDB service will be unavailable. Please plan the system outage accordingly.   It is recommended to shut down the Connections server before the MongoDB upgrade to avoid unexpected usage.

## Procedure {#section_cwf_p14_y5b .section}

1. Download or git clone the [HCL Mongo repository](https://github.com/HCL-TECH-SOFTWARE/connections-mongo7) and extract \(if needed\) it on the machine where Docker is installed.

2. Build the MongoDB 7 image:

    1. Go to the extracted folder \(from step 1\) and ensure a Dockerfile exists there.

    2. Use this Dockerfile to build a new MongoDB 7 image.  Note that `--platform` is used to specify the target platform in case the target architecture is different from the machine where the command is run.

        ```docker buildx build --platform=linux/amd64 --no-cache --progress=plain --tag hclcr.io/cnx/middleware-mongodb7:{{ image_tag }} -f Dockerfile .```

        Where:

        - `image_tag` is the user-defined tag for the image, for example, the `current timestamp` .

    3. Analyze the build log for errors.  Inspect the log carefully for messages starting with `E:` or `Error`.
  
3. Save this image to a `tar` file:

    ```docker save -o mongodb7.tar hclcr.io/cnx/middleware-mongodb7:{{ image_tag }}```

      Where:

      - `image_tag` is the user-defined tag for the image defined in step 2.

4. Copy `mongodb7.tar` to all Kubernetes worker nodes used by the Component Pack.

5. Import the MongoDB 7 image into containerd on all the Kubernetes worker nodes:

    ``` sudo ctr -n=k8s.io image import mongodb7.tar```

6. Verify if the image is imported successfully into containerd by listing the image:

    ```sudo ctr -n=k8s.io image list | grep middleware-mongodb7:{{ image_tag }}```

7. If this is an upgrade, scale down MongoDB 5 to stop its pod(s). Verify that the pods have been successfully terminated.  Depending on the deployment, MongoDB 5 may take some time to completely shut down. Do   not proceed until all the pods have been terminated.

      ```kubectl -n connections scale sts mongo5 --replicas=0```

    After it is shut down, it is recommended to [check the replica set status](mongodb-repair.md) to ensure the MongoDB 5 replica set is in a healthy state. Doing so can help prevent complications during the upgrade process.

    You should also create a backup of your MongoDB 5 data on the NFS master node, as outlined in the [MongoDB 5 to MongoDB 7 Migration Guide](mongo7-migration-script.md).

8. A persistent volume is needed for each MongoDB 7 pod.  Refer to [Set up NFS](cp_install_services_tasks.md#section_e4p_jrp_tnb) for instructions to setup the NFS volumes and mount points.

9. Before installing MongoDB 7, install the connections-volumes Helm chart to set up the persistence layer if not already done so in [Set up persistent volumes and persistent volume claims on NFS](cp_install_services_tasks.md#pv_pvc):

    1. On the machine where Helm is installed, download [connections-volumes.yml.j2](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars). Then, rename the downloaded file to connections-volumes.yml and open it.

        Replace variables in curly braces with the appropriate values.

    2. Log in to a Harbor OCI registry using the following command:

        ```$ helm registry login -u <<helm_repo_username>> -p <<helm_repo_password>> <<helm repo path>>```

        Where:

        - `<<helm_repo_username>>` is the Harbor username
        - `<<helm_repo_password>>` is the CLI secret (to access, log in to Harbor then click on your name > **User Profile** > CLI Secret)
        - `<<helm_repo_path>>` is the Harbor repository to log into, that is https://hclcr.io

    3. Retrieve the latest connections-volumes chart version available on Harbor:

        ```helm show all <<oci_registry_url>>/connections-persistent-storage-nfs --devel | grep "^version:"```

        Where `<<oci_registry_url>>` is the Harbor OCI container registry uri, that is `oci://hclcr.io/cnx`.
      
        Sample output: `version: 0.1.1-20241004-094816`

    4. Install the connections-volumes chart:

        ```helm upgrade connections-volumes <<oci_registry_url>>/connections-persistent-storage-nfs -i --version 0.1.1-20241004-094816 --namespace connections -f connections-volumes.yml --wait```

        Where `<<oci_registry_url>>` is the Harbor OCI container registry uri, that is `oci://hclcr.io/cnx`.

    5. Verify it by running `kubectl get pvc -n connections | grep mongo7`

        All PVCs are in BOUND state.
    
        !!! note
            If `upgrade connections-volumes` fails, try to delete all PV, PVC first and then run upgrade command.

10. Install MongoDB 7 using Helm charts.

    1. On your Component Pack node, download [infrastructure.yml.j2](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars). Then, rename the file to infrastructure.yml and open it.

        Replace all variables in curly braces "{ }" with values that are appropriate to your cluster configuration. For instance, if you deploy your cluster in a specific namespace named "connections", you need to replace the `{{ _default_namespace }}` variable with that namespace name, "connections". Another variable is `{{ replica_count }}` which depends on the number of end users accessing the application.

        Explanations of some of these variables are available in [HCL Connections and Component Pack using Ansible automation](https://github.com/HCL-TECH-SOFTWARE/connections-automation/blob/main/documentation/VARIABLES.md).

        For an idea on how to make the substitutions, take the following example. This is tailored to the Connections internal environment, so it is purely for reference and is not meant to prescribe which values to use and which variables are available to override. The values you set in the `infrastructure.yml` file should fit to your own environment.  Note that the `mongodb` and `mongo5` sections can be omitted in this file.

        !!! note

            If you are deploying to a custom namespace (other than "connections"), ensure that you specify the `namespace` property for every section/component in the `infrastructure.yml` file (for example, haproxy, valkey, mongo7, appregistry-client, and others). This ensures all components are deployed to the correct namespace.


        ```bash {#codeblock_grg_fwv_dvb}
          global:
            onPrem: true
            image:
              repository: hclcr.io/cnx
          haproxy:
            namespace: connections
            replicaCount: 1
          valkey:
            namespace: connections
            replicaCount: 1                  
          mongo7:
            clusterDomain: cluster.local
            namespace: connections
            createSecret: false
            replicaCount: 1
            enabled: true
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

    2. Install or upgrade the infrastructure chart using the following steps. We will use the infrastructure charts as it contains the MongoDB 7 chart. To install these charts:

        1. Retrieve the latest infrastructure chart version:

            ```helm show all <<oci_registry_url>>/infrastructure --devel | grep "^version:"```

            Where `<<oci_registry_url>>` is the Harbor OCI container registry uri, that is `oci://hclcr.io/cnx`.
      
            Sample output: `version: 0.1.0-20241009-172005`

        2. Install infrastructure charts:

            !!! note
                You need only one --set option with a comma-separated list of properties.

            ```helm upgrade infrastructure <<oci_registry_url>>/infrastructure -i --version 0.1.0-20241009-172005 --namespace connections -f infrastructure.yml --set mongo7.image.tag={{ image_tag }}```

            Where:

            - `<<oci_registry_url>>` is the Harbor OCI container registry uri, that is `oci://hclcr.io/cnx`
            - `0.1.0-20241009-172005` is the version number identified from the step above.
            - `image_tag` is the user-defined tag for the image defined in step 2

            For example:

            ```helm upgrade infrastructure oci://hclcr.io/cnx/infrastructure -i --version 0.1.0-20241009-172005 --namespace connections -f infrastructure.yml --set mongo7.image.tag=0.1.0-20241008-123302```

11. Verify MongoDB 7 pod(s) is running.  It may take a few minutes:

    ``` kubectl -n connections get pods | grep mongo7```

    Sample output:

    ```{#codeblock_grg_fwv_dvb}
    Sample Output:
    check-and-update-mongo7-security-mzw9c      0/1   Completed   0     10m   
    mongo7-0                                    2/2   Running     0     5m
    ```

**Parent topic:** [Steps to install or upgrade to Component Pack 8](../install/cp_install_services_tasks.md)
