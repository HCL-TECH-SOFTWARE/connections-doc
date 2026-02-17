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
oc adm policy add-scc-to-user privileged system:serviceaccount:$ns:cnx-ingress-ingress-nginx-admission
oc adm policy add-scc-to-user privileged system:serviceaccount:$ns:cnx-ingress-ingress-nginx-backend;
oc adm policy add-scc-to-user privileged system:serviceaccount:$ns:cnx-ingress-ingress-nginx;
oc adm policy add-scc-to-user anyuid -n $ns -z default;
oc adm policy add-scc-to-user anyuid system:serviceaccount:$ns:connections-outlook-desktop;
oc adm policy add-scc-to-user anyuid system:serviceaccount:$ns:mongodb7;
oc adm policy add-scc-to-user anyuid system:serviceaccount:$ns:onprems-bootstrap;

# For HCL API Gateway
oc adm policy add-scc-to-user anyuid system:serviceaccount:$ns:apisix
oc adm policy add-scc-to-user anyuid system:serviceaccount:$ns:apisix-etcd
```

## Pod Security restrictions

Component Pack recommends the `baseline` profile for namespace [Pod Security](cp_install_services_tasks.md#psa_namespace). Depending on your environment needs, the OpenShift `privileged` default can be used.

## Build and deploy MongoDB

OpenShift supports several build strategies. One way to build MongoDB is to use the [dockerStrategy](https://docs.openshift.com/container-platform/4.11/cicd/builds/build-strategies.html#builds-strategy-dockerfile-path_build-strategies) with the Dockerfile provided in the [HCL MongoDB repository](https://github.com/HCL-TECH-SOFTWARE/connections-mongo7). The image can then output to an image stream along with the MongoDB sidecar, so they can be deployed as part of the infrastructure chart.

Create a MongoDB image stream for the project:

1.  Using the OpenShift web console, make sure the project is set to the one for Component Pack: Go to **Build** then **ImageStreams**,  and create an image stream called `middleware-mongodb7`.

2.  Create a BuildConfig with dockerStrategy to build the MongoDB image and output it to the `middleware-mongodb7` image stream.

    The following is a sample yaml; substitute `<namespace>` with your namespace:

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
              name: middleware-mongodb7:01072025
    ```

3.  Click **Actions** and **Start build**. Wait for the build to complete and, in the build log, verify that there are no errors (for example, E: xxx).

    Next, we will create another image stream that points to the MongoDB sidecar image in the HCL Harbor Repository:

4.  Using the OpenShift web console, go to **Workloads** then **Secrets**, and look for "pull-secret" under **All Projects**. Edit it to add your HCL Harbor repository credentials for registry server `hclcr.io/cnx`.

5.  Create an image stream for MongoDB sidecar by running the following command using the oc CLI:

    ```
    oc import-image middleware-mongodb7-sidecar --from=hclcr.io/cnx/middleware-mongodb7-sidecar:latest --confirm
    ```

    You should now have two image streams for the project in the web console: middleware-mongodb7 and middleware-mongodb7-sidecar. Go to each of them to confirm that there is a tag with identifier. You can also find the URI of the image in the "Image repository" field.

    Now, download the infrastructure chart from the HCL Harbor repository and modify the mongo7 chart to use the image streams:

6.  Pull the latest [infrastructure chart](https://hclcr.io/harbor/projects/15/repositories/infrastructure/artifacts-tab) to the node where Helm is installed, then extract it.

7.  Edit *infrastructure/charts/mongo7/templates/statefulset.yaml* to set the images to use their corresponding image stream. For example:

    ```
    - name: mongo7
      image: image-registry.openshift-image-registry.svc:5000/myproject/middleware-mongodb7:02072023
    ```

    ```
    - name: mongo7-sidecar
      image: image-registry.openshift-image-registry.svc:5000/myproject/middleware-mongodb7-sidecar:latest
    ```

8.  Remove the imagePullSecrets:

    ```
    imagePullSecrets:
        - name: {{ .Values.imagePullSecrets.name }}
    ```

9.  Install MongoDB using Helm charts:

    1.  Download [infrastructure.yml.j2](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars). Then, rename the file to `infrastructure.yml` and open it.

    2.  Replace the variables in curly braces with the appropriate values.

    3.  From the location where the extracted chart resides, install or upgrade the infrastructure chart using the modified copy as follows:

        ```
        helm upgrade infrastructure infrastructure -i -f  infrastructure.yml  --namespace <namespace>
        ```

        Where `<namespace>` is your namespace (the default is "connections").

## Set up community ingress

1. If not already added, add the community Helm repository:

    ```
    helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
    ```

2. Install ingress-nginx using the following command:

    ```
    helm upgrade cnx-ingress -i ingress-nginx/ingress-nginx  --namespace <namespace> --set controller.image.allowPrivilegeEscalation=false --set controller.extraArgs.default-ssl-certificate=connections/ingress-nginx-tls-secret --set controller.service.type=NodePort,controller.service.nodePorts.http=32080,controller.service.nodePorts.https=32443,defaultBackend.enabled=true,controller.healthStatus=true,controller.healthCheckPath="/healthz",controller.livenessProbe.timeoutSeconds=60,controller.readinessProbe.timeoutSeconds=60,controller.opentelemetry.containerSecurityContext.runAsUser=null,controller.admissionWebhooks.createSecretJob.securityContext.runAsUser=null,controller.admissionWebhooks.patchWebhookJob.securityContext.runAsUser=null --wait
    ```

    Where `<namespace>` is your namespace (the default is "connections").

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
