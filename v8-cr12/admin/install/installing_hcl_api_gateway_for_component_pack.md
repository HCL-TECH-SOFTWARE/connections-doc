
# Installing HCL API Gateway for Component Pack {#installing_hcl_api_gateway_for_component_pack .concept}

This guide provides step-by-step instructions for installing and configuring Apache APISIX Gateway and HCL API Gateway as part of HCL Connections Component Pack 8.

By following this guide, you can enable secure, scalable, and observable access to your Connections APIs and microservices through a modern API gateway solution.

The process includes preparing your Kubernetes environment, customizing deployment templates, and validating your setup to ensure a successful and supportable deployment.


## Prerequisites

Before you begin, ensure the following:

- You have a running HCL Connections Component Pack 8 environment, ready for API Gateway installation or upgrade. If upgrading, confirm your environment is at the required baseline version.
- Helm (v3.0+) and kubectl are installed on the deployment machine. Verify with `helm version` and `kubectl version`.
- You have access to the required Helm charts:
    - [Apache APISIX Helm chart](https://charts.apiseven.com)
    - HCL API Gateway Helm chart (provided by HCL)
- All prerequisites are complete, including:
    - Storage setup (NFS or other persistent storage)
    - Secret creation (TLS, API keys, and others)
- Sufficient cluster resources and persistent storage for APISIX and its dependencies.


## Overview

The API Gateway deployment consists of two main components:

1. **APISIX**: Provides the core API gateway feature, including routing, authentication, rate limiting, and observability. The Helm chart also deploys etcd (key/value store) and the APISIX Dashboard (web UI).
2. **HCL API Gateway**: Installs product-specific configurations, such as routes and upstreams, to integrate with HCL Connections services.

!!! note
    
    The APISIX chart will deploy etcd as a dependency by default. You may use an external etcd if required, but this is not typical for most deployments.


## Installation Procedure {#section_cwf_p14_y5b .section}

### Infrastructure Preparation

1. Set up Persistent Storage

    Before installing APISIX, ensure that your Kubernetes cluster has persistent storage configured. This is necessary for etcd and APISIX to store their data reliably. Check on the following:

    - Verify and Configure Persistent Volumes (PVs) and Storage class for APISIX and dependencies.
    - See [Set up NFS](cp_install_services_tasks.md#setup_nfs_apigw).
    - See [Set up storage class](cp_install_services_tasks.md#setup_sc_apigw).
    - See [Set up persistent volumes](cp_install_services_tasks.md#setup_pv_apigw).

2. Secrets and Certificate Management

    Secrets are required to secure APISIX admin access and enable TLS for the APISIX routes. These steps help protect the API Gateway and ensure encrypted traffic. 

    For more information, see the [Kubernetes Secrets documentation](https://kubernetes.io/docs/concepts/configuration/secret/).

    Follow these steps to create the required secrets and import the TLS certificate:

    1. Create APISIX Admin and Dashboard Secret

        Create a Kubernetes secret to store the admin and viewer passwords for the APISIX admin API and dashboard. 
    
        Use strong, unique passwords and store them securely. Rotate passwords regularly as part of your security policy.

        The secret name (`apisix-admin-secret`) must match the value referenced in your custom values file.

          ```sh
            kubectl create secret generic apisix-admin-secret \
              --from-literal=admin-password="<apisix-admin-password>" \
              --from-literal=viewer-password="<apisix-viewer-password>" \
              -n <<namespace>> \
              --dry-run=client -o yaml | kubectl apply -f -
          ```
    
    2. Create or Update TLS Secret for APISIX gateway

        - Use the default secret `ingress-nginx-tls-secret` from the bootstrap installation to enable TLS secret for HTTPS as required by the API Gateway chart.For more information, see [Set up bootstrap charts](./cp_install_services_tasks.md#bootstrap).

        - Verify that the secret name (`ingress-nginx-tls-secret`) matches the value referenced in your custom values file for APISIX and ingress.

    3. Import the Certificate into IBM HTTP Server (IHS)

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

      1. Download the j2 template `core-apisix-custom-values.yaml.j2` from the [HCL Connections deployment automation Git repository](https://git.cwp.pnp-hcl.com/conn-automation/deployment-ansible/blob/develop/ansible/roles/hcl/apisix/helm_charts/templates) and modify it according to your environment. ***link will be updated to public repo once available***
    
      2. Rename the file to core-apisix-custom-values.yml and open it.

      3. Replace all variables in curly braces "{{ }}" with values that are appropriate to your cluster configuration.

      4. See the [APISIX Helm chart documentation](https://github.com/apache/apisix-helm-chart/tree/master/charts/apisix) for all available options.

        For an idea on how to make the substitutions, take the following example. This is tailored to the Connections internal environment, so it is purely for reference and is not meant to prescribe which values to use and which variables are available to override. The values you set in the `core-apisix-custom-values.yml` file should fit to your own environment.

            ```
            global:
              imagePullSecrets: []
            extraVolumes:
              - name: cnx-custom-scripts
                emptyDir: {}
            extraVolumeMounts:
              - name: cnx-custom-scripts
                mountPath: /usr/local/apisix/hcl/cnx/scripts
            extraInitContainers:
              - name: copy-cnx-custom-scripts
                image: hcl-api-gateway-config:latest
                imagePullPolicy: IfNotPresent
                command: ["/bin/sh", "-c", "cp -r /app/hcl/cnx/* /usr/local/apisix/hcl/cnx/scripts"]
                securityContext:
                  runAsUser: 1001
                  runAsGroup: 1001
                  allowPrivilegeEscalation: false
                volumeMounts:
                  - name: cnx-custom-scripts
                    mountPath: /usr/local/apisix/hcl/cnx/scripts
            fullnameOverride: core-apisix
            service:
              type: NodePort
              http:
                nodePort: 31080
              tls:
                nodePort: 31443 
            ingress:
              enabled: true
              annotations:
                kubernetes.io/ingress.class: nginx
                nginx.ingress.kubernetes.io/rewrite-target: /$1
              tls:
                - hosts:
                    - "*.example.com"
                  secretName: ingress-nginx-tls-secret
              hosts:
                - host: "*.example.com"
                  paths:
                    - /connections/api/v2/(.*)?
            apisix:
              customPlugins:
                enabled: true
                luaPath: "/usr/local/apisix/hcl/cnx/scripts/?.lua;;"
                plugins: []
              ssl:
                enabled: true
              admin:
                enabled: true
                enable_admin_ui: true
                credentials:
                  secretName: apisix-admin-secret
                  secretAdminKey: admin-password
                  secretViewerKey: viewer-password
                ingress:
                  enabled: true
                  annotations:
                    kubernetes.io/ingress.class: nginx
                    nginx.ingress.kubernetes.io/rewrite-target: /$1$2
                  hosts:
                    - host: "*.example.com"
                      paths:
                        - /(ui|apisix)(/.*)?
                  tls:
                    - hosts:
                        - "*.example.com"
                      secretName: ingress-nginx-tls-secret
              nginx:
                workerProcesses: 4
            ingress-controller:
              enabled: true
              config:
                kubernetes:
                  ingressClass: <<namespace>>-apisix-ingress-class #e.g connections-apisix-ingress-class
              apisix:
                adminService:
                  name: core-apisix-admin
                  namespace: <<namespace>> #e.g. connections
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
                storageClass: "<<namespace>>-apisix-sc" #e.g. connections-apisix-sc
                selector:
                  matchLabels:
                    attachTo: <<namespace>>-apisix-etcd #e.g. connections-apisix-etcd
            ```

3. Install or upgrade the APISIX release

    1. Execute the following command to install or upgrade the APISIX Helm chart using your custom values file:

        ```sh
        helm upgrade -i core-apisix apisix/apisix --version 2.12.0 --namespace <<namespace>> -f core-apisix-custom-values > ${APISIX_INSTALL_RESULT_DIR}/apache-apisix-chart-install.log
        ```

        !!! note 

            If you are deploying on OpenShift, see [Installing Component Pack on OpenShift](cp_openshift.md#set-up-hcl-api-gateway-with-apisix) for important platform-specific instructions.

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

1. Get the hcl-api-gateway chart version that is available on Harbor OCI by executing the following command:

    ```sh
    helm show all <<oci_registry_url>>/hcl-api-gateway --devel | grep "^version:" 
    o/p version: 0.1.0-20251010-082629
    ```

    Where `<<oci_registry_url>>` is the Harbor OCI container registry uri, that is `oci://hclcr.io/cnx`. This applies to other instances of `<<oci_registry_url>>` in the component pack install steps.

2. Prepare hcl api gateway custom values.

  1. Download the j2 template `hcl-api-gateway-custom-values.yaml.j2` from the [HCL Connections deployment automation Git repository](https://git.cwp.pnp-hcl.com/conn-automation/deployment-ansible/tree/develop/ansible/roles/hcl/apisix/helm_charts/templates) and modify it according to your environment. ***link will be updated to public repo once available***

  2. Rename the file to hcl-api-gateway-custom-values.yml and open it.

  3. Replace all variables enclosed in double curly braces "{{  }}" with the values appropriate for your cluster configuration.

    For guidance on making substitutions, refer to the following example. This example is based on the Connections internal environment and is provided for reference only. It does not prescribe specific values or available override variables. The values you define in the `hcl-api-gateway-custom-values.yml` file should match your own environment.

    ```
    productUpstreams:
      hcl:
        defaultUpstream: hcl-backend
    upstreams:
      - name: hcl-backend
        scheme: https
        externalNodes:
          - name: "*.example.com"
            type: Domain
            port: 443
    swaggerUi:
      enabled: true
      imagePullSecrets: []
      serverUrl: https://*.example.com/connections/api/v2
      ingress:
        enabled: true
        ingressClass: nginx
        path: /connections/api/v2
        tls:
          enabled: true
          secretName: ingress-nginx-tls-secret
          hosts:
            - "*.example.com"
      specFiles:
        - name: "Blogs API"
          file: "blogs.yaml"
        - name: "Moderation API"
          file: "moderation.yaml"
    apisixTLS:
      enabled: true
      secretName: ingress-nginx-tls-secret
      hosts:
        - "*.example.com"
    ingressClassName: <<namespace>>-apisix-ingress-class #e.g. connections-apisix-ingress-class
    ```

3. Execute the following command to install or upgrade hcl-api-gateway chart using your custom values file:

    ```sh
    helm upgrade hcl-api-gateway <<oci_registry_url>>/hcl-api-gateway -i \
    --version 0.1.0-20251010-082629 --namespace <<namespace>> \
    -f hcl-api-gateway-custom-values.yml --wait
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
      core-apisix-57b48c7d87-4mzpg                              1/1     Running     0         1h
      core-apisix-etcd-0                                        1/1     Running     0         1h
      core-apisix-etcd-1                                        1/1     Running     0         1h
      core-apisix-etcd-2                                        1/1     Running     0         1h
      core-apisix-ingress-controller-6cb9cc68f7-rkwgd           2/2     Running     0         1h
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
