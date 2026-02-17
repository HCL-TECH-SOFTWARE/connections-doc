
# Installing HCL API Gateway for Component Pack {#installing_hcl_api_gateway_for_component_pack .concept}

This guide provides step-by-step instructions for installing and configuring Apache APISIX Gateway and HCL API Gateway as part of HCL Connections Component Pack 8.

By following this guide, you can enable secure, scalable, and observable access to your Connections APIs and microservices through a modern API gateway solution.

The process includes preparing your Kubernetes environment, customizing deployment templates, and validating your setup to ensure a successful and supportable deployment.


## Prerequisites

Before you begin, ensure the following:

!!! note 

    If you are upgrading from CR12 to CR13 and want to deploy HCL API Gateway in a dedicated namespace (such as `apisix`), you must first uninstall the existing HCL API Gateway installation from the `connections` namespace. See [Uninstalling HCL API Gateway](../install/cp_uninstall_hcl_api_gateway.md) for instructions. If you prefer to keep HCL API Gateway in the `connections` namespace, you can upgrade the existing installation without uninstalling it.

- You have a running HCL Connections Component Pack 8 environment, ready for API Gateway installation or upgrade.
- Helm (v3.0+) and kubectl are installed on the deployment machine. Verify with `helm version` and `kubectl version`.
- You have access to the required Helm charts:
    - [Apache APISIX Helm chart](https://charts.apiseven.com)
    - HCL API Gateway Helm chart (provided by HCL) from the [HCL Harbor repository](https://hclcr.io/harbor/projects/15/repositories)
- All prerequisites are complete, including:
    - Storage setup (NFS or other persistent storage)
    - Secret creation (TLS, API keys, and others)
- Sufficient cluster resources and persistent storage for APISIX and its dependencies. See the [Sizing the Kubernetes cluster](../install/cp_sizing_kubernetes_container.md) topic for guidance.


## Overview

The API Gateway deployment consists of two main components:

1. **APISIX**: Provides the core API gateway feature, including routing, authentication, rate limiting, and observability. The Helm chart also deploys etcd (key/value store) and the APISIX Dashboard (web UI).
2. **HCL API Gateway**: Installs product-specific configurations, such as routes and upstreams, to integrate with HCL Connections services.

!!! note
    
    The APISIX chart will deploy etcd as a dependency by default. You may use an external etcd if required, but this is not typical for most deployments.


## Installation Procedure {#section_cwf_p14_y5b .section}

### Infrastructure Preparation

1. Create namespace

    You have the flexibility to install HCL API Gateway in the same namespace as Connections or in a separate dedicated namespace:

    - **Option 1: Same namespace** - Use the existing `connections` namespace for APISIX deployment:

    - **Option 2: Dedicated namespace** - Create a separate namespace for APISIX to isolate its resources:

        ```bash
        kubectl create namespace apisix
        ```

    !!! note
        If you choose to use a dedicated namespace (e.g., `apisix`), ensure you update the `<<namespace>>` parameter with your chosen namespace name in all subsequent APISIX related configuration files, Helm commands, and storage configurations throughout the installation process.

2. Apply Pod Security Standards (Kubernetes 1.25.0 or higher)

    !!! important
        This step applies when installing on Kubernetes version 1.25.0 or higher.

    As PodSecurityPolicy was deprecated in Kubernetes v1.21 and removed in v1.25, apply Pod Security Admission standards to enforce security restrictions at the namespace level.

    - If using the `connections` namespace for APISIX, the Pod Security Standards should already be applied as part of the main Component Pack installation. You can skip this step.

    - If using a dedicated namespace for APISIX (e.g., `apisix`), apply the baseline Pod Security Standards:

        ```bash
        kubectl label --overwrite ns <<namespace>> \
        pod-security.kubernetes.io/enforce=baseline pod-security.kubernetes.io/enforce-version=latest \
        pod-security.kubernetes.io/warn=baseline pod-security.kubernetes.io/warn-version=latest \
        pod-security.kubernetes.io/audit=baseline pod-security.kubernetes.io/audit-version=latest
        ```

        Replace `<<namespace>>` with your APISIX namespace name (e.g., `apisix`).

    The baseline Pod Security Standards prevent known privilege escalations while allowing the default (minimally specified) Pod configuration.

    For more details, see [Pod Security Admission](https://kubernetes.io/docs/concepts/security/pod-security-admission/) and [Pod Security Standards](https://kubernetes.io/docs/concepts/security/pod-security-standards/) in the Kubernetes documentation.

3. Set up Persistent Storage

    Before installing APISIX, ensure that your Kubernetes cluster has persistent storage configured. This is necessary for etcd and APISIX to store their data reliably. Check on the following:

    - Verify and Configure Persistent Volumes (PVs) and Storage class for APISIX and dependencies.
    - See [Set up NFS](cp_install_services_tasks.md#setup_nfs_apigw).
    - See [Set up storage class](cp_install_services_tasks.md#setup_sc_apigw).
    - See [Set up persistent volumes](cp_install_services_tasks.md#setup_pv_apigw).

4. Secrets and Certificate Management

    Secrets are required to secure APISIX admin access and enable TLS for the APISIX routes. These steps help protect the API Gateway and ensure encrypted traffic. 

    For more information, see the [Kubernetes Secrets documentation](https://kubernetes.io/docs/concepts/configuration/secret/).

    Follow these steps to create the required secrets and import the TLS certificate:

    1. Copy Harbor Image Pull Secret to APISIX Namespace

        If you are deploying APISIX in a dedicated namespace (e.g., `apisix`), you need to copy the Harbor image pull secret from the `connections` namespace. This secret is required to pull APISIX-related images from the HCL Harbor repository.

        Execute the following command to copy the secret:

          ```sh
          kubectl get secret myregkey -n connections -o yaml | \
            sed 's/namespace: connections/namespace: <<namespace>>/' | \
            kubectl apply -f -
          ```

        !!! note
            - Replace `<<namespace>>` with your APISIX namespace name (e.g., `apisix`).
            - If the secret name in your `connections` namespace is different from `myregkey`, replace it with your actual Harbor secret name.
            - If you are using the same `connections` namespace for APISIX, you can skip this step.

    2. Copy TLS Secret to APISIX Namespace

        The TLS secret is required to enable HTTPS for the API Gateway. If you are deploying APISIX in a dedicated namespace, copy the `ingress-nginx-tls-secret` from the `connections` namespace to the APISIX namespace.

        Execute the following command to copy the TLS secret:

          ```sh
          kubectl get secret ingress-nginx-tls-secret -n connections -o yaml | \
            sed 's/namespace: connections/namespace: <<namespace>>/' | \
            kubectl apply -f -
          ```

        !!! note
            - Replace `<<namespace>>` with your APISIX namespace name (e.g., `apisix`).
            - Ensure this secret contains a valid TLS certificate and key for your domain.
            - If you are using the same `connections` namespace for APISIX, you can skip this step.

    3. Create APISIX Admin and Dashboard Secret

        Create a Kubernetes secret to store the admin and viewer passwords for the APISIX admin API and dashboard. 
    
        Use strong, unique passwords and store them securely. Rotate passwords regularly as part of your security policy.

        The secret name (`apisix-admin-secret`) must match the value referenced in your custom values file.

          ```sh
            kubectl create secret generic apisix-admin-secret \
              --from-literal=admin-password='<apisix-admin-password>' \
              --from-literal=viewer-password='<apisix-viewer-password>' \
              -n <<namespace>> \
              --dry-run=client -o yaml | kubectl apply -f -
          ```
    
    4. Verify TLS Secret for APISIX Gateway

        - Verify that the TLS secret (`ingress-nginx-tls-secret`) copied in step 2 (or existing in the `connections` namespace) is correctly configured and available in the APISIX namespace.

        - Confirm that the secret name (`ingress-nginx-tls-secret`) matches the value referenced in your custom values file `core-apisix-custom-values.yaml` used in the [Install APISIX and HCL API Gateway using Helm](#install-apisix-and-hcl-api-gateway-using-helm) section for APISIX and ingress.

    5. Import the Certificate into IBM HTTP Server (IHS)

        - Refer to [Import the Certificate into IBM HTTP Server (IHS)](./enable_ingress_tls.md#how-to-enable-tls-for-the-ingress-controller) for details.


### Install APISIX and HCL API Gateway using Helm

#### Phase 1: Install Apache APISIX Helm Chart

Complete the following steps to install the Apache APISIX Helm chart:

1. Add and update the APISIX Helm repository

    Execute the following commands to add the APISIX Helm repository and update your local Helm chart repository cache:

      ```sh
      helm repo add apisix https://charts.apiseven.com
      helm repo update apisix
      ```

2. Prepare apache apisix custom values

    Complete the following steps to prepare your custom values file for the APISIX Helm chart:

      1. Download the `core-apisix-custom-values.yaml.j2` template from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/blob/main/roles/hcl/apisix/helm_charts/templates) and update it to match your environment.
    
      2. Rename the file to core-apisix-custom-values.yaml and open it.

      3. Replace all variables in curly braces "{{ }}" with values that are appropriate to your cluster configuration.

      4. See the [APISIX Helm chart documentation](https://github.com/apache/apisix-helm-chart/tree/master/charts/apisix) for all available options.

        For an idea on how to make the substitutions, take the following example. This is tailored to the Connections internal environment, so it is purely for reference and is not meant to prescribe which values to use and which variables are available to override. The values you set in the `core-apisix-custom-values.yaml` file should match your own environment.

        !!! note

            Use imagePullSecrets created in step [Add Harbor credentials as Kubernetes secret](./cp_install_services_tasks.md#harbor_repo) to pull images from HCL Harbor repository.

            Get the `__hcl_api_gateway_config_image_tag` for hcl-api-gateway-config image that is available on Harbor OCI by executing the following command:

            ```sh
            helm show all <<oci_registry_url>>/hcl-api-gateway --devel | grep "^tag:" 
            output: 
              tag: 20251028-124319
            ```
            Where `<<oci_registry_url>>` is the Harbor OCI container registry uri, that is `oci://hclcr.io/cnx`. This applies to other instances of `<<oci_registry_url>>` in the component pack install steps.


          ```sh
          global:
            imagePullSecrets:
              - myregkey
          extraVolumes:
            - name: hcl-custom-libs
              emptyDir: {}
          extraVolumeMounts:
            - name: hcl-custom-libs
              # This path is required by HCL custom libraries. Do not override.
              mountPath: /usr/local/apisix/hcl
              readOnly: true
          # Required for HCL custom libraries. Do not override these environment variables.
          extraEnvVars:
            - name: LUA_CPATH
              value: "/usr/local/apisix/hcl/lib/lua/5.1/?.so;;"
            - name: LD_LIBRARY_PATH
              value: "/usr/local/apisix/hcl/lib:/usr/local/lib:/usr/lib"
          extraInitContainers:
            - name: setup-hcl-libs
              image: hclcr.io/cnx/hcl-api-gateway-config:20251028-124319
              imagePullPolicy: IfNotPresent
              securityContext:
                runAsNonRoot: true
                runAsUser: 1000
                runAsGroup: 1000
                allowPrivilegeEscalation: false
              volumeMounts:
                - name: hcl-custom-libs
                  # This path is required. Do not override.
                  mountPath: /usr/local/apisix/hcl
          service:
            type: NodePort
            http:
              nodePort: 31080
            tls:
              nodePort: 31443
          apisix:
            customPlugins:
              enabled: true
              # Lua path for custom libraries (do not override)
              luaPath: "/usr/local/apisix/hcl/share/lua/5.1/?.lua;/usr/local/apisix/hcl/share/lua/5.1/?/init.lua;;"
              plugins: []
            ssl:
              enabled: true
              fallbackSNI: "connections.example.com"
            admin:
              enabled: true
              enable_admin_ui: true
              credentials:
                secretName: apisix-admin-secret
                secretAdminKey: admin-password
                secretViewerKey: viewer-password
            nginx:
              workerProcesses: 4
          ingress-controller:
            enabled: true
            config:
              kubernetes:
                ingressClass: "<<namespace>>-ingress-class" #e.g. apisix-ingress-class
            apisix:
              adminService:
                name: apisix-admin
                namespace: "<<namespace>>" #e.g. apisix
                port: 9180
            gatewayProxy:
              createDefault: true
              provider:
                controlPlane:
                  auth:
                    adminKey:
                      value: password
          etcd:
            enabled: true
            replicaCount: 3
            persistence:
              enabled: true
              size: 10Gi
              storageClass: "<<namespace>>-storage-class" #e.g. apisix-storage-class
            selector:
              matchLabels:
                attachTo: "<<namespace>>-etcd" #e.g. apisix-etcd
          ```

3. Install or upgrade the APISIX release

    1. Execute the following command to install or upgrade the APISIX Helm chart using your custom values file:

        ```sh
        helm upgrade -i apisix apisix/apisix --version 2.12.0 --namespace <<namespace>> -f core-apisix-custom-values > ${APISIX_INSTALL_RESULT_DIR}/apache-apisix-chart-install.log
        ```

        !!! note 

            If you are deploying on OpenShift, see [Installing Component Pack on OpenShift](./cp_openshift.md#set-up-hcl-api-gateway-with-apisix) for important platform-specific instructions.


    2. Replace `${APISIX_INSTALL_RESULT_DIR}` with your desired log directory.

        If the installation fails, review the log for details:

          ```sh
          cat ${APISIX_INSTALL_RESULT_DIR}/apache-apisix-chart-install.log 
          ```

4. Wait for APISIX pods to become ready
    
    After installation, wait for all APISIX-related pods to be in the `Running` state:

      ```sh
      kubectl wait --for=condition=Ready pods --all -n <<namespace>> --timeout=300s  
      ```

    !!! note
        
        - All APISIX pods should show `STATUS=Running` and `READY=1/1` (or similar) in `kubectl get pods -n <<namespace>>`.
        - If pods are not ready, check pod logs:

          ```sh
          kubectl logs <pod-name> -n <<namespace>> 
          ```

#### Phase 2: Install the HCL API Gateway Helm Chart

Complete the following steps to install the HCL API Gateway Helm chart:

1. Get the hcl-api-gateway chart version and hcl-api-gateway-config image tag that is available on Harbor OCI by executing the following command:

    ```sh
    helm show all <<oci_registry_url>>/hcl-api-gateway --devel | grep "^version:" 
    output:
     version: 0.1.0-20251028-124319
    ```

    Get the `__hcl_api_gateway_config_image_tag` for hcl-api-gateway-config image that is available on Harbor OCI by executing the following command:

    ```sh
    helm show all <<oci_registry_url>>/hcl-api-gateway --devel | grep "^tag:" 
    output: 
      tag: 20251028-124319
    ```

    Where `<<oci_registry_url>>` is the Harbor OCI container registry uri, that is `oci://hclcr.io/cnx`. This applies to other instances of `<<oci_registry_url>>` in the component pack install steps.

2. Prepare hcl api gateway custom values.

    1. Download the `hcl-api-gateway-custom-values.yaml.j2` template from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/blob/main/roles/hcl/apisix/helm_charts/templates) and update it to match your environment.

    2. Rename the file to hcl-api-gateway-custom-values.yaml and open it.

    3. Replace all variables enclosed in double curly braces "{{  }}" with the values appropriate for your cluster configuration.

      For guidance on substitutions, refer to the following example. This example is based on the internal Connections environment and is provided for reference only. It does not define specific values or available override variables. The values you define in the `hcl-api-gateway-custom-values.yaml` file should match your own environment.

    !!! note

        Use imagePullSecrets created in step [Add Harbor credentials as Kubernetes secret](./cp_install_services_tasks.md#harbor_repo) to pull images from HCL Harbor repository.


      ```yaml
      productUpstreams:
        hcl:
          defaultUpstreamName: hcl-backend
      upstreams:
        - name: hcl-backend
          scheme: https
          externalNodes:
            - name: "connections.example.com"
              type: Domain
              port: 443
      swaggerUi:
        enabled: true
        image: hclcr.io/cnx/hcl-api-gateway-config:20251028-124319
        imagePullPolicy: IfNotPresent
        imagePullSecrets:
          - myregkey
      apisix:
        hosts:
          - "*.internal.example.com"
          - "*.example.com"
        ingressClassName: "<<namespace>>-ingress-class" #e.g. apisix-ingress-class
        basePath: /connections/api/v2
        # REQUIRED: APISIX Admin API service name and port
        adminApi:
          serviceName: apisix-admin
          servicePort: 9180
        # REQUIRED: APISIX Gateway proxy service name and port
        gatewayProxy:
          serviceName: apisix-gateway
          servicePort: 80
        tls:
          enabled: true
          secretName: ingress-nginx-tls-secret
      ```

3. Execute the following command to install or upgrade hcl-api-gateway chart using your custom values file:

    ```sh
    helm upgrade hcl-api-gateway <<oci_registry_url>>/hcl-api-gateway -i \
    --version <<version from step 1>> --namespace <<namespace>> \
    -f hcl-api-gateway-custom-values.yaml --wait
    ```

4. Configure the HTTP Server

    Once this is all set, add rules to httpd.conf for your IBM HTTP servers – see [Configuring the HTTP server](cp_config_proxy_rules.md#hcl_api_gw_https).

---

## Post-Installation Tasks

### Validation Checklist

After installation, verify the following:

- Run the following command to confirm that all pods are in `Running` or `Completed` status:

      ```sh
      kubectl get pods -n <<namespace>>
      ```
    
    Example output:
    
      ```sh
      NAME                                                      READY   STATUS    RESTARTS   AGE
      apisix-57b48c7d87-4mzpg                                   1/1     Running     0         1h
      apisix-etcd-0                                             1/1     Running     0         1h
      apisix-etcd-1                                             1/1     Running     0         1h
      apisix-etcd-2                                             1/1     Running     0         1h
      apisix-ingress-controller-6cb9cc68f7-rkwgd                2/2     Running     0         1h
      swagger-ui-76dfcf9f9f-pv6pm                               1/1     Running     0         1h
      ```

- Verify that the APISIX Dashboard is accessible at `https://<<your-domain>>/ui/` (default AdminKey: password)
- Verify that the Swagger UI is accessible at `https://<<your-domain>>/connections/api/v2/explorer/`
- Confirm API calls through the proxy return expected results (test with curl or browser)

### Test the API endpoints

Perform the following steps to test the API endpoints:

  1. Use the **"Authorize"** button to authenticate and test endpoints.
  2. Expand an endpoint, click **"Try it out"**, fill parameters, and click **"Execute"**.
  3. Review the response, status code, headers, and body.


## Troubleshooting

### Common Issues

- **Pods not starting:**
    - Check resource quotas, persistent volume claims, and image pull secrets.
    - Run: `kubectl get pods -n <<namespace>>` and `kubectl describe pod <<pod-name>> -n <<namespace>>`.
- **PVC not bound:**
    - Ensure your storage class is available and PVs are correctly defined.
    - Run: `kubectl get pvc -n <<namespace>>` and check for `Bound` status.
- **Proxy misconfiguration:**
    - Double-check your `httpd.conf` or IHS config for correct ProxyPass/ProxyPassReverse rules and SSL settings.

!!! note
    
    For general troubleshooting:

    - Check logs using the `kubectl logs <<pod-name>> -n <<namespace>>` command and review Kubernetes events using the `kubectl get events -n <namespace>` command.
    - For additional assistance, see [APISIX troubleshooting docs](https://apisix.apache.org/docs/apisix/faq/) or contact your platform administrator or HCL support.



**Parent topic:** [Steps to install or upgrade to Component Pack 8](../install/cp_install_services_tasks.md)
