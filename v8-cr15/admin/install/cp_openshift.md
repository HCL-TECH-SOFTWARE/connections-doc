# Installing Component Pack on OpenShift

This document outlines the steps for OpenShift deployment. For details on the overall Component Pack deployment, including the [installation and upgrade procedure](cp_install_upgrade_container.md), refer to [Installing or upgrading Component Pack for Connections](cp_install_config_intro.md).

## Prerequisites

Ensure that you have the following:

-   HCL Connections has been deployed and is accessible via HTTP.
-   OpenShift command line interface (oc) has been installed and you are logged in as the cluster admin.
-   Your OpenShift cluster should accept inbound TCP traffic from the Component Pack load balancer, for example HAProxy.
-   Your Connections server frontend should accept inbound TCP traffic from the OpenShift cluster.
-   Your OpenShift cluster should be able to mount to the persistent volume folders set up in the NFS master.
-   Helm is installed to run `helm upgrade` commands to deploy charts.
-   [kubectl](https://docs.openshift.com/container-platform/4.11/cli_reference/openshift_cli/usage-oc-kubectl.html#the-kubectl-binary) and python3 are installed on the master node to run [config_blue_metrics.py](https://github.com/HCL-TECH-SOFTWARE/connections-automation/blob/main/roles/hcl/component-pack-harbor/files/config_blue_metrics.py).

## Set up namespace and policies

Before deploying Component Pack, create a namespace (the default is "connections") and allow service accounts to run as a set user ID.

```
export ns=connections
oc create namespace $ns;
oc project $ns;
```
```
oc adm policy add-scc-to-user privileged system:serviceaccount:$ns:cnx-ingress-traefik;
oc adm policy add-scc-to-user anyuid -n $ns -z default;
oc adm policy add-scc-to-user anyuid system:serviceaccount:$ns:connections-outlook-desktop;
oc adm policy add-scc-to-user anyuid system:serviceaccount:$ns:mongodb7;
oc adm policy add-scc-to-user anyuid system:serviceaccount:$ns:onprems-bootstrap;

# For HCL API Gateway
oc adm policy add-scc-to-user anyuid system:serviceaccount:$ns:apisix
oc adm policy add-scc-to-user anyuid system:serviceaccount:$ns:apisix-etcd

# For collabora-online
oc adm policy add-scc-to-user anyuid     system:serviceaccount:$ns:collabora-online-cool-controller
oc adm policy add-scc-to-user privileged system:serviceaccount:$ns:collabora-online
```

## Pod Security restrictions

Component Pack recommends the `baseline` profile for namespace [Pod Security](cp_install_services_tasks.md#apply-pod-security-restrictions-at-the-namespace-level-psa_namespace-section). Depending on your environment needs, the OpenShift `privileged` default for the enforce label can be used.

## Build and deploy MongoDB

The  OpenShift installation process follows the same general workflow as the standard [MongoDB 7](installing_mongodb_7_for_component_pack_8.md) installation.  Use the OpenShift-specific build and Helm installation instructions provided in this topic instead.

OpenShift supports several build strategies. One way to build MongoDB is to use the [dockerStrategy](https://docs.redhat.com/en/documentation/openshift_container_platform/4.21/html/builds_using_buildconfig/build-strategies) with the Dockerfile from the [HCL MongoDB repository](https://github.com/HCL-TECH-SOFTWARE/connections-mongo7). The image is then pushed to an image stream, along with the MongoDB sidecar, for deployment as part of the infrastructure chart.

Create a MongoDB image stream for the project:

1.  In the OpenShift web console, ensure that the project is set to the Component Pack project:

     Go to **Build** then **ImageStreams**,  and create an image stream called `middleware-mongodb7`.

2.  Go to **Build** then **BuildConfig**, create a BuildConfig with dockerStrategy to build the MongoDB image and output it to the `middleware-mongodb7` image stream.

    The following is a sample yaml; substitute `<namespace>` with your namespace and `<mongo_image_tag>` with your desired version tag.

    ```
    apiVersion: build.openshift.io/v1
    kind: BuildConfig
    metadata:
        name: middleware-mongodb7
        namespace: <namespace>
    spec:
        source:
           type: Git
           git:
              uri: 'https://github.com/HCL-TECH-SOFTWARE/connections-mongo7.git'
              ref: main
        strategy:
           type: Docker
           dockerStrategy:
              dockerfilePath: Dockerfile
        output:
           to:
              kind: ImageStreamTag
              name: middleware-mongodb7:<mongo_image_tag>
    ```

3.  Click **Actions** and **Start build**. Wait for the build to complete and, in the build log, verify that there are no errors (for example, E: xxx).

    Next, we will create another image stream that points to the MongoDB sidecar image in the HCL Harbor Repository:

4.  Create a docker-registry secret with your HCL Harbor credentials if not already created.

    ```
    oc create secret docker-registry myregkey -n <namespace> --docker-server=hclcr.io/cnx --docker-username=<helm_repo_username> --docker-password <helm_repo_password>
    ```

    Where:

    `<helm_repo_username>` is the Harbor username

    `<helm_repo_password>` is the CLI secret (to access, log in to Harbor, then click on your name > User Profile > CLI Secret)

    `<namespace>` is your namespace (the default is "connections").

5.  Link the Secret to Service Accounts for image pulls and the `import-image` command to import the MongoDB sidecar.
    
    ```
    oc secrets link builder myregkey --for=pull -n <namespace>
    oc secrets link default myregkey --for=pull -n <namespace>
    ``` 

6.  Create an image stream for MongoDB sidecar by running the following command using the oc CLI:

    ```
    oc import-image middleware-mongodb7-sidecar --from=hclcr.io/cnx/middleware-mongodb7-sidecar:latest --confirm
    ```

    You should now have two image streams in the project: `middleware-mongodb7` and `middleware-mongodb7-sidecar`. In the web console, open each image stream and confirm that it has a tag with identifier. You can also find the image URI in the `Image repository` field.

7.  Prepare persistent volume:

    A persistent volume is needed for each MongoDB 7 pod. Refer to [Set up persistent volumes](installing_mongodb_7_for_component_pack_8.md#section_setup_pv) for instructions to setup the NFS volumes and mount points.

8.  Install MongoDB using the Infrastructure Helm chart:

    1. The default service account in the same namespace should already have pull access automatically via the `default-dockercfg-*` secret. Get the secret name by describing the service account.

    ```
    oc get sa default -n connections -o yaml
    ```

    2.  Download [infrastructure.yml.j2](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars). Rename the file to `infrastructure.yml` before opening it.

    3.  Replace the variables in curly braces with the appropriate values.  Refer to [Install MongoDB 7 using Helm charts](installing_mongodb_7_for_component_pack_8.html#install-mongodb-7-using-helm-charts) for example.

    4.  Add the following variables to the `mongo7` section to set the images to use their corresponding image stream.  For example:

    ```
    mongodb_custom_repo: image-registry.openshift-image-registry.svc:5000/<namespace>
    mongosidecar_custom_repo: image-registry.openshift-image-registry.svc:5000/<namespace>
    imagePullSecrets: 
        - name: <default-dockercfg-xxx>
    ```

    Where:
    
    `<namespace>` is your namespace (the default is "connections").

    `default-dockercfg-xxx` is the image pull secret obtained in the previous step.

8.  Retrieve the latest infrastructure chart version:

    ```
    helm show all oci://hclcr.io/cnx/infrastructure --devel | grep "^version:"
    ```

9.  Install or upgrade the infrastructure chart using the custom values file as follows:

    ```
    helm upgrade infrastructure oci://hclcr.io/cnx/infrastructure --version <chart version> -i -f  infrastructure.yml  --namespace <namespace> --set mongo7.image.tag=<mongo_image_tag>
    ```

    Where:
    
    `<chart version>` is the infrastructure chart version retrieved in the step above.

    `<mongo_image_tag>` is the image tag used in the previous step to build the image.

    `<namespace>` is your namespace (the default is "connections").

## Set up community ingress

!!! note
    Starting with v8 CR14, Traefik Proxy replaces the ingress-nginx controller. For the migration process, follow the  [Set up community ingress](cp_install_services_tasks.html#comm_ingress) workflow, except for the Traefik installation steps. Use the Traefik installation procedure for OpenShift is documented in this topic.


1. Add and Update the Traefik Helm Repository

    ```
    helm repo add traefik https://traefik.github.io/charts
    helm repo update
    ```

2. Download and upack the Traefik Helm chart

    ```
    helm pull traefik/traefik --version 41.0.2 --untar
    ```

    !!! note 
        
        This command extracts the chart into a local `traefik` directory. Ensure this folder does not already exist in your working environment before running the command.

3. Install Traefik Custom Resource Definitions (CRDs)

    Apply the Traefik CRDs to the cluster. The `--server-side` flag is required to accommodate large definitions; this prevents metadata overflow during the process.

    ```
    oc apply -f traefik/crds/ --server-side --force-conflicts
    ```

4. Configure Custom Values

    Download `cnx-ingress-traefik-values.j2` from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/).  **Always download the latest version of this template** to ensure compatibility with the current release.  Rename it to `cnx-ingress-traefik-values.yml`.

    Update the variables to match your environment and ensure `ingressClass.isDefaultClass` is set to false:

    ```
    ingressClass:
      enabled: true
      isDefaultClass: false
    ```

    Note: For OpenShift, `isDefaultClass` must be set to false to avoid conflicts with the default OpenShift Ingress Controller.

5. Install Traefik Proxy

    Using the prepared values file and the local chart directory, run the following command to install Traefik.

    ```
    helm upgrade cnx-ingress ./traefik -i -n <namespace> --skip-crds -f cnx-ingress-traefik-values.yml
    ```

    Where `<namespace>` is your namespace (the default is "connections").

6. Verify the Ingress Controller installation

    Follow the verification steps in [Set up community ingress](cp_install_services_tasks.html#comm_ingress) to verify the installation.


## Set up Activities Plus

Persistent Volume Claim needs to be added to the Persistent Volume definition.  

In the OpenShift web console, go to **Storage** then **PersistentVolume**, and check if huddo-boards-minio is bound. If not, edit the yaml to add the following section under "spec", and then save it.

The following is a sample yaml; substitute `<namespace>` with your namespace:

```
claimRef:
    kind: PersistentVolumeClaim
    namespace: <namespace>
    name: huddo-boards-minio-claim
```
## Set up HCL API Gateway with APISIX

When deploying APISIX as part of HCL API Gateway on OpenShift, follow the main installation steps in [Installing HCL API Gateway for Component Pack](./installing_hcl_api_gateway_for_component_pack.md). However, there are important OpenShift-specific requirements:

- **If APISIX CRDs are not installed**

    Manually download only the APISIX-specific CRDs from the [APISIX Ingress Controller CRD folder](https://github.com/apache/apisix-helm-chart/blob/master/charts/apisix-ingress-controller/crds/apisixic-crds.yaml) and apply them by executing:

    ```sh
    oc apply -f apisixic-crds.yaml
    ```

- **Do not install Gateway API CRDs**

    OpenShift manages Gateway API CRDs (such as `gatewayclasses.gateway.networking.k8s.io`, `httproutes.gateway.networking.k8s.io`, and others) using the OpenShift Ingress Operator. Do not attempt to install or overwrite these CRDs during APISIX deployment.

- **Use `--skip-crds`**

    Add `--skip-crds` to the Helm install command to prevent Helm from installing CRDs that OpenShift already manages.

- **Set token type to `simple`:**

    When installing APISIX using Helm, add `--set etcd.auth.token.type=simple` to the install command. This ensures compatibility with OpenShift, where the default JWT authentication for etcd may not be supported.


    **Example command**

    ```sh
    helm upgrade -i apisix apisix/apisix --version 2.12.0 --namespace <namespace> -f core-apisix-custom-values.yaml --set etcd.auth.token.type=simple --skip-crds
    ```

For the full procedure, see the main guide. For more details and OpenShift-specific instructions, refer to:

- [APISIX on Red Hat OpenShift Service on AWS (ROSA)](https://docs.api7.ai/apisix/install/kubernetes/rosa/)
- [APISIX Ingress Controller on OpenShift](https://apisix.apache.org/docs/ingress-controller/1.8.0/deployments/openshift/)

## Set up Collabora Online

When deploying Collabora Online on OpenShift, follow the main installation steps in [Installing Collabora Online](./t_inst_collabora_online.md). OpenShift enforces strict pod security through SCCs. Collabora Online publishes three supported options for the `coolwsd` pods; the `cool-controller` and reverse-proxy pods can always run under the built-in `restricted-v2` SCC. Pick the option that matches your security requirement. For more details and OpenShift-specific official guidance, refer to [Collabora Online on OpenShift](https://sdk.collaboraonline.com/docs/installation/OpenShift.html).



