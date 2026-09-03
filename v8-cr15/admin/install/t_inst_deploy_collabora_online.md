# Installing and deploying Collabora Online {#t_inst_deploy_collabora_online .task}

This section provides step-by-step instructions for installing and deploying HCL Enterprise Edition Collabora Online with HCL Connections 8.0 CR15 or later.

The process includes preparing the Kubernetes namespace and secrets, customizing the Helm values file, installing the chart, configuring IBM HTTP Server and load balancer for WebSocket traffic, and enabling Collabora in the HCL Connections Files service.

The `collabora-online-umbrella` Helm chart deploys two components into your Kubernetes cluster:

1. **`collabora-online`** — the `coolwsd` document editor server that renders `.docx`, `.xlsx`, `.pptx`, and other files in the browser and handles the WebSocket collaboration channel.
2. **`cool-controller`** — the routing and metrics controller that assigns document sessions to `coolwsd` pods and exposes the `/controller/routeToken` indirection endpoint used by Files.

## Prerequisites {#section_prereq_collabora .section}

Before you begin, ensure the following:

- You have a running HCL Connections 8.0 CR15 and later environment, ready for Collabora Online installation or upgrade.
- Helm v3.0 or later and `kubectl` are installed on the deployment machine. Verify the versions with `helm version` and `kubectl version`.
- You have access to the required Helm chart:
    - `collabora-online-umbrella` Helm chart (provided by HCL) from the [HCL Harbor repository](https://hclcr.io/harbor/projects/116/repositories).
- Sufficient cluster resources are available. See the [Collabora Online Resource Allocation & Sizing Guide](./t_collabora_online_resource_requirements.md) and [Sizing the Kubernetes cluster](../install/cp_sizing_kubernetes_container.md) topic for guidance.
- Harbor pull credentials are configured as a Kubernetes secret. See [Log in to a Harbor OCI registry](../install/cp_install_services_tasks.md#harbor_repo).
- A Traefik ingress controller is installed and running in the target namespace. See [Set up community ingress](../install/cp_install_services_tasks.md#comm_ingress).
- If TLS is enabled on the ingress, the `cnx-tls-secret` TLS secret must exist in the target namespace. This is generated automatically by the [bootstrap installation](../install/cp_install_services_tasks.md#set-up-bootstrap-charts-bootstrap-section). See [Enabling secure traffic to the ingress controller](../install/enable_ingress_tls.md) for more information.

## Installation procedure {#section_cwf_p14_y5b .section}

### Infrastructure Preparation {#section_prepare_infra .section}

1. Create the namespace.

    You can install Collabora Online in the same namespace as HCL Connections or in a separate, dedicated namespace:

    - **Option 1: Same namespace** — Use the existing `connections` namespace for the Collabora Online deployment.

    - **Option 2: Dedicated namespace** — Create a separate namespace to isolate the Collabora Online resources:

        ```bash
        kubectl create namespace collabora
        ```

    !!! important
        If you choose a dedicated namespace (for example, `collabora`), ensure the following are in place before continuing:

        1. **Traefik ingress controller** — A Traefik ingress controller must be installed in the dedicated namespace. See [Set up community ingress](../install/cp_install_services_tasks.md#comm_ingress).

        2. **Pod Security Standards** — Must be applied to the dedicated namespace. Handled in step 2 of this procedure.

        3. **Image pull secret** — The `myregkey` image pull secret must exist in the dedicated namespace. Follow [Log in to a Harbor OCI registry](../install/cp_install_services_tasks.md#harbor_repo) and substitute your namespace name in place of `connections`.

        4. **(If TLS is enabled) TLS secret** — The `cnx-tls-secret` referenced in the Helm values must also exist in the dedicated namespace. Run the [bootstrap installation](../install/cp_install_services_tasks.md#bootstrap) to generate it automatically. For more information on manual certificate management, see [Enabling secure traffic to the ingress controller](../install/enable_ingress_tls.md).

2. Apply Pod Security Standards (Kubernetes 1.25.0 or higher).

    !!! important
        This step applies only when you are installing on Kubernetes 1.25.0 or higher.
        
    As PodSecurityPolicy was deprecated in Kubernetes v1.21 and removed in v1.25, apply Pod Security Admission standards to enforce security restrictions at the namespace level.

    - If you use the `connections` namespace for Collabora Online, the Pod Security Standards are already applied as part of the main Component Pack installation. You can skip this step.

    - If you use a dedicated namespace for Collabora Online (for example, `collabora`), apply the baseline Pod Security Standards:

        ```bash
          kubectl label --overwrite ns <<namespace>> \
            pod-security.kubernetes.io/enforce=baseline pod-security.kubernetes.io/enforce-version=latest \
            pod-security.kubernetes.io/warn=baseline pod-security.kubernetes.io/warn-version=latest \
            pod-security.kubernetes.io/audit=baseline pod-security.kubernetes.io/audit-version=latest
        ```

        Replace `<<namespace>>` with your Collabora namespace name (for example, `collabora`).

    The baseline Pod Security Standards prevent known privilege escalations while still allowing the default, minimally specified Pod configuration.

    For more details, see [Pod Security Admission](https://kubernetes.io/docs/concepts/security/pod-security-admission/) and [Pod Security Standards](https://kubernetes.io/docs/concepts/security/pod-security-standards/) in the Kubernetes documentation.

3. Secrets and Certificate Management 

    Secrets are required to secure Collabora Online admin access and enable TLS for the Collabora routes. These steps help protect the Collabora deployment and ensure encrypted traffic between clients and the document editor.

    For more information, see the [Kubernetes Secrets documentation](https://kubernetes.io/docs/concepts/configuration/secret/).

    Follow these steps to create the required secrets and import the TLS certificate:

    1. Create Collabora Online Administrator Secret

        Create a Kubernetes secret to store the admin credentials for the Collabora Online administrator console.

        Use strong, unique passwords and store them securely. Rotate passwords regularly as part of your security policy.

        The secret name (`collabora-admin-secret`) must match the value referenced in your custom values file.

        ```bash
        kubectl create secret generic collabora-admin-secret \
          --from-literal=admin-username='<<collabora-admin-username>>' \
          --from-literal=admin-password='<<collabora-admin-password>>' \
          -n <<namespace>>
        ```
        Where:

        - `<<collabora-admin-username>>` is the administrator user name (for example, `admin`).
        - `<<collabora-admin-password>>` is a strong, unique administrator password.
        - `<<namespace>>` is the namespace where Collabora Online is installed (for example, `connections` or `collabora`).

    2. Create or Update TLS Secret for Collabora Routes

        - Use the default secret `cnx-tls-secret` generated from the bootstrap chart installation to enable TLS for HTTPS as required by the Collabora Helm chart. If you are using a dedicated namespace for Collabora Online, ensure the `cnx-tls-secret` is present in that namespace. Run the [bootstrap installation](../install/cp_install_services_tasks.md#bootstrap) to generate it automatically and refer to [Enabling secure traffic to the ingress controller](../install/enable_ingress_tls.md) for manual certificate management.

        - Verify that the secret name (`cnx-tls-secret`) matches the value referenced in your custom values file `collabora-values.yaml` used in the [Install Collabora Online using Helm](#section_install_helm_collabora) section for both `collabora-online` and `cool-controller` ingress TLS configuration.

    3. Import the Certificate into IBM HTTP Server (IHS)

        - Refer to [Import the Certificate into IBM HTTP Server (IHS)](./enable_ingress_tls.md#how-to-enable-tls-for-the-ingress-controller) for details.

4. Create the IngressClass

    Create a file named `ingress-class.yaml` with the following content:

    ```yaml
    apiVersion: networking.k8s.io/v1
    kind: IngressClass
    metadata:
      name: nginx
    spec:
      controller: k8s.io/ingress-nginx
    ```

    Apply it:

    ```bash
    kubectl apply -f ingress-class.yaml
    ```

### Installing Collabora Online Enterprise Edition using Helm {#section_install_helm_collabora .section}

Complete the following steps to install the Collabora Online Helm chart:

1. Get the `collabora-online-umbrella` chart version and the Collabora Online image tag that are available on Harbor OCI by running the following commands.

    **Get the chart version:**

    ```bash
    helm show chart <<oci_registry_url>>/collabora-online-umbrella --devel | grep "^version:"

    Example Output: `version: "1.4.0"`
    ```
    
    Where `<<oci_registry_url>>` is the Harbor OCI container registry URI, that is, `oci://hclcr.io/cnx-collabora`. This applies to other instances of `<<oci_registry_url>>` in the Collabora Online install steps.

2. Prepare the Collabora Online custom values file.

    Complete the following steps to prepare the custom values file for the Collabora Online Helm chart:

    1. Download the `collabora-values.yaml.j2` template from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/blob/main/roles/hcl/collabora-online/helm_charts/templates) and update it to match your environment.

    2. Rename the file to `collabora-values.yaml` and open it.

    3. Replace all variables enclosed in double curly braces `{{ }}` with the values that are appropriate for your cluster configuration.

    For guidance on substitutions, refer to the following example. This example is based on the internal HCL Connections environment and is provided for reference only. It does not define specific values or available override variables. The values you define in `collabora-values.yaml` must match your own environment.

    !!! note
        
        Use the `imagePullSecrets` created in the [Add Harbor credentials as Kubernetes secret](../install/cp_install_services_tasks.md#harbor_repo) step to pull images from the HCL Harbor repository. The example below uses `myregkey` as the pull secret name.

        The `existingSecret` block under `collabora-online.collabora` must reference the secret name (`collabora-admin-secret`) and keys (`admin-username`, `admin-password`) that you created in step 3 under "Secrets and Certificate Management". Update these values if you used a different secret name.

    ```yaml

    collabora-online:
      image:
        repository: "hclcr.io/cnx-collabora/collabora-online"
      imagePullSecrets:
        - name: myregkey

      collabora:
        server_name: "connections.example.com"

        # --- TLS Termination at Ingress ---
        extra_params: >-
          --o:ssl.enable=false
          --o:ssl.termination=true
          --o:ssl.ssl_verification=false
          --o:indirection_endpoint.url=https://connections.example.com/controller/routeToken
          --o:monitors.monitor[0]=ws://collabora-online-cool-controller.<<namespace>>.svc.cluster.local:9000/controller/ws
          --o:monitors.monitor[0][@retryInterval]=5
          --o:num_prespawn_children=2
          --o:per_document.limit_load_secs=300
          --o:per_document.idle_timeout_secs=300

        # --- Uncomment for End-to-End TLS ---
        # extra_params: >-
        #   --o:ssl.enable=true
        #   --o:ssl.termination=false
        #   --o:ssl.cert_file_path=/etc/coolwsd/certs/tls.crt
        #   --o:ssl.key_file_path=/etc/coolwsd/certs/tls.key
        #   --o:ssl.ca_file_path=/etc/coolwsd/certs/tls.crt
        #   --o:ssl.ssl_verification=false
        #   --o:indirection_endpoint.url=https://connections.example.com/controller/routeToken
        #   --o:monitors.monitor[0]=ws://collabora-online-cool-controller.<<namespace>>.svc.cluster.local:9000/controller/ws
        #   --o:monitors.monitor[0][@retryInternal]=5
        #   --o:num_prespawn_children=2
        #   --o:per_document.limit_load_secs=300
        #   --o:per_document.idle_timeout_secs=300

        existingSecret:
          enabled: true
          secretName: "collabora-admin-secret"
          usernameKey: admin-username
          passwordKey: admin-password
        env:
          - name: POD_NAME
            valueFrom:
              fieldRef:
                fieldPath: metadata.name
      
      # --- Uncomment for End-to-End TLS ---
      # extraVolumes:
      #   - name: certs-volume
      #     secret:
      #       secretName: "cnx-tls-secret"
      # extraVolumeMounts:
      #   - name: certs-volume
      #    mountPath: /etc/coolwsd/certs
      #    readOnly: true

      # probes:
      #   scheme: HTTPS

      ingress:
        enabled: true
        className: nginx
        annotations:
          nginx.ingress.kubernetes.io/upstream-hash-by: "$arg_RouteToken"
          nginx.ingress.kubernetes.io/proxy-body-size: "0"
          nginx.ingress.kubernetes.io/proxy-read-timeout: "3600"
          nginx.ingress.kubernetes.io/proxy-send-timeout: "3600"
          nginx.ingress.kubernetes.io/ssl-redirect: "false"
          # --- Uncomment for End-to-End TLS ---
          # nginx.ingress.kubernetes.io/backend-protocol: "HTTPS"
          # nginx.ingress.kubernetes.io/proxy-ssl-verify: "off"
        hosts:
          - host: "*.internal.example.com"
            paths:
              - path: /cool/
                pathType: Prefix
              - path: /browser/
                pathType: Prefix
              - path: /hosting/
                pathType: Prefix
          - host: "*.example.com"
            paths:
              - path: /cool/
                pathType: Prefix
              - path: /browser/
                pathType: Prefix
              - path: /hosting/
                pathType: Prefix
        tls:
          - secretName: "cnx-tls-secret"
            hosts:
              - "*.internal.example.com"
              - "*.example.com"

      autoscaling:
        enabled: true
        targetMemoryUtilizationPercentage: 60
        targetCPUUtilizationPercentage: 80

      resources:
        limits:
          cpu: "8000m"
          memory: "8000M"
        requests:
          cpu: "4000m"
          memory: "6000M"

    cool-controller:
      replicaCount: 1

      image:
        repository: "hclcr.io/cnx-collabora/cool-controller"
      imagePullSecrets:
        - name: myregkey

      ingress:
        enabled: true
        className: nginx
        annotations:
          nginx.ingress.kubernetes.io/proxy-body-size: "0"
          nginx.ingress.kubernetes.io/proxy-read-timeout: "3600"
          nginx.ingress.kubernetes.io/proxy-send-timeout: "3600"
          nginx.ingress.kubernetes.io/ssl-redirect: "false"
        hosts:
          - host: "*.internal.example.com"
            paths:
              - path: "/controller"
                pathType: Prefix
          - host: "*.example.com"
            paths:
              - path: "/controller"
                pathType: Prefix
        tls:
          - secretName: "cnx-tls-secret"
            hosts:
              - "*.internal.example.com"
              - "*.example.com"

      controller:
        watchNamespace: <<namespace>> #e.g. connections or collabora
        resourceName: "collabora-online"
        ingressUrl: "https://connections.example.com"
        ingressHostname: "connections.example.com"
        skipTLSVerification: true
        expectedDocumentMemory: 115M
        statsInterval: 2000
        documentMigrator:
          enabled: true
          coolMemoryUtilization: 60
          coolMemoryLimit: "8000M"
    ```

3. Install or upgrade the `collabora-online-umbrella` chart using your custom values file by running the following command:

    ```bash
      helm upgrade collabora-online <<oci_registry_url>>/collabora-online-umbrella -i \
        --version <<version from step 1>> --namespace <<namespace>> \
        -f collabora-values.yaml --wait
    ```

    !!! note

        If you are deploying on OpenShift, see [Installing Component Pack on OpenShift](./cp_openshift.md#set-up-collabora-online) for important platform-specific instructions.

    Where:

    - `<<oci_registry_url>>` is the Harbor OCI container registry URI (`oci://hclcr.io/cnx-collabora`).
    - `<<version from step 1>>` is the chart version that you retrieved in step 1 (for example, `1.4.0`).
    - `<<namespace>>` is the namespace where Collabora Online is installed (for example, `connections` or `collabora`).

### Configuring the HTTP server {#section_config_http_collabora .section}

After Collabora Online is installed, add proxy rules to `httpd.conf` for your IBM HTTP Servers. For the proxy rules, see [Configuring the HTTP server](cp_config_proxy_rules.md#collabora_online_https).

!!! important "Configure local redirect for Files"
    
    Configure local redirect for the Files application so that the Files content directory can be streamed efficiently through IBM HTTP Server. This requires the `mod_ibm_local_redirect` module to be loaded.
    
    If the module is not already loaded, follow [Configuring web servers for downloading files](../install/t_install_post_files_downloads.md) before continuing with the configuration below.

Add the following Files local redirect configuration to `httpd.conf`. Replace `<FILES_CONTENT_DIR>` with the actual path of your Files content directory (the value of the `FILES_CONTENT_DIR` WebSphere variable, for example `/opt/IBM/SharedArea/files/upload`):

```apache
# BEGIN FILES LOCAL REDIRECT CONFIG
alias /files_content <FILES_CONTENT_DIR>

<Directory "<FILES_CONTENT_DIR>">
  Require env REDIRECT_FILES_CONTENT
</Directory>

<Location /files>
  IBMLocalRedirect On
  IBMLocalRedirectKeepHeaders X-LConn-Auth,Cache-Control,Content-Type,Content-Disposition,Last-Modified,ETag,Content-Language,Set-Cookie,Title,X-UA-Compatible
  SetEnv FILES_CONTENT true
</Location>
# END FILES LOCAL REDIRECT CONFIG
```

After you update `httpd.conf`, restart the IBM HTTP Server.

### Configuring NGINX as a WebSocket proxy {#section_config_nginx_collabora .section}

!!! Note
    This section is applicable only if you are using nginx as your load balancer.

Collabora Online uses WebSocket connections for real-time collaboration. The HTTP paths (`/browser`, `/hosting`, `/cool`) are served through IBM HTTP Server. NGINX only needs to proxy the WebSocket traffic (`/cool/...` and `/controller/...` upgrade paths) to the ingress controller.

In the snippet that follows, substitute the placeholders with values from your environment, using the same conventions as in [Configuring the HTTP server](cp_config_proxy_rules.md#proxy_rules):

SSH to the NGINX server and edit the Nginx configuration file, eg. `/etc/nginx/nginx.conf`. Make a backup of the file before you change it.

Add the following `location` block inside **both** the existing `listen 443 ssl` and `listen 80` server blocks:

```nginx
# BEGIN COLLABORA WEBSOCKET PROXY
location ~ ^/(cool|controller)/(adminws|ws|.+/ws)$ {
  proxy_pass http://cpmaster.internal.example.com:32080;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "Upgrade";
  proxy_set_header Host $host;
  proxy_http_version 1.1;
  proxy_read_timeout 600s;
}
# END COLLABORA WEBSOCKET PROXY
```

!!! note

    If TLS is enabled, change the `proxy_pass` upstream to `https://cpmaster.internal.example.com:32443`. For more details on the supported proxy patterns, see [Proxy settings](https://sdk.collaboraonline.com/docs/installation/Proxy_settings.html) in the Collabora Online SDK documentation.

Validate and reload NGINX:

  ```bash
  sudo nginx -t && sudo systemctl reload nginx
  ```

### Alternative load balancer configurations {#section_alt_lb_collabora .section}

If your deployment does not use NGINX as the WebSocket proxy, refer to the appropriate subsection below based on your load balancer type.

#### 1. Layer 7 load balancer (for example, AWS ALB) {#section_l7_lb_collabora .section}

A Layer 7 (Application) load balancer understands HTTP and natively supports the WebSocket upgrade handshake. WebSocket routing to Collabora is handled by dedicated target groups and listener rules instead of an NGINX `location` block — no additional workaround is needed.

- To set up a new ALB, see [Setting up an Application Load Balancer](cp_config_setup_alb.md).
- To migrate from an AWS CLB to an ALB, see [Migrating from Classic Load Balancer to Application Load Balancer](cp_config_migrate_clb_to_alb.md).

#### 2. Layer 4 load balancer (for example, CLB) {#section_network_lb_collabora .section}

A Layer 4 (Network) load balancer such as the AWS Classic Load Balancer (CLB) does not support the WebSocket upgrade handshake on its default HTTP or HTTPS listeners, which causes Collabora connections to be dropped. If migrating to a Layer 7 load balancer is not practical, you can work around this limitation by configuring a **dedicated TCP listener on a separate port**.

A TCP listener forwards raw byte streams without inspecting HTTP content, so the WebSocket upgrade handshake and all subsequent frames pass through transparently. The trade-off is that TCP listeners cannot perform path-based routing, which is why a separate port is needed — it ensures all traffic on that port goes to the Collabora backend only.

**Setting up the back-channel port:**

1. **Add a TCP listener on a dedicated port** (for example, `8443`) on the load balancer. Point it at the ingress controller endpoint (typically `32080` for HTTP or `32443` for HTTPS).

2. **Update the Collabora Helm values** so that the editor's WebSocket URLs use the dedicated port. Adjust the relevant parameters in `collabora.extra_params` and `collabora.server_name` within `collabora-values.yaml`.

3. **Open firewall and security group rules** for the dedicated port.

4. **Increase the idle timeout** for the dedicated listener to at least 300–600 seconds to avoid premature disconnects during editing sessions.

The resulting traffic flow:

```
Browser ──HTTPS :443──▶  Layer 4 LB ──TCP──▶ IHS ──▶ Connections / Collabora HTTP paths
Browser ──WSS :8443──▶   Layer 4 LB ──TCP──▶ K8s Ingress (Traefik) ──▶ Collabora pods
```

!!! note

    For details on configuring TCP and SSL listeners on a CLB, see [Listeners for your Classic Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/elb-listener-config.html){target=_blank} in the AWS documentation.

For additional load balancer configuration, see [Load balancing examples](https://sdk.collaboraonline.com/docs/installation/Proxy_settings.html#load-balancing) in the Collabora Online SDK documentation.

### Configuring Collabora in HCL Connections {#section_configure_collabora_in_hcl_connections .section}

The following topics provide the administrator procedures for enabling and securing the Collabora integration:

- **[Configuring Collabora](../install/t_config_collabora_docs.md)** — Enable Collabora Online as the document editor in HCL Connections Files. Configure HCL Docs and Collabora independently to define which component handles file viewing and editing. Covers `files-config.xml` settings, the `collabora-editor` role, user access and fallback behavior, deployment scenarios, and troubleshooting.

- **[Configuring OAuth-based WOPI authentication for Collabora Online](../install/t_config_collabora_oauth.md)** — Secure WOPI requests between Files and Collabora using OAuth 2.0. Covers registering the Collabora OAuth client, configuring the WebSphere OAuth provider and WOPI Trust Association Interceptor (TAI), adding the TAI JAR to the Files runtime classpath, updating `files-config.xml`, and verifying the configuration.

- **[Central OIDC configuration](../install/t_config_collabora_oidc.md)** — Authenticate Collabora WOPI requests through WebSphere Application Server container-managed security using Central OpenID Connect (OIDC). Explains `files-config.xml` settings, prerequisites for the OIDC Relying Party TAI, reverse-proxy and HTTP header requirements, and common authentication and header-size issues.

- **[Editing files with Collabora Online](../install/t_edit_collabora_files.md)** — Guide for end users on how to open, create, view, and edit supported office files (`.docx`, `.xlsx`, `.pptx`) in the browser using Collabora Online. Includes inline and full-screen editing, real-time co-authoring, comments, file permissions, Collabora access requirements, and automatic session cleanup.

## Post-installation tasks {#section_post_install_collabora .section}

### Validation checklist {#section_validation_collabora .section}

After installation, verify the following:

- Confirm that all pods are in `Running` or `Completed` status by running the following command:

    ```bash
    kubectl get pods -n <<namespace>> # e.g. connections or collabora
    ```

    Example output:

    ```
    NAME                                                READY   STATUS    RESTARTS   AGE
    cnx-ingress-traefik-5f47854cfd-cwmgr                1/1     Running   0          6h2m
    collabora-online-78dd5d6856-9fcfw                   1/1     Running   0          6h1m
    collabora-online-78dd5d6856-h589k                   1/1     Running   0          6h1m
    collabora-online-cool-controller-67ddb49bd8-kshrz   1/1     Running   0          6h1m
    ```

- Verify that the Collabora Online admin console is accessible at the configured domain:

    ```
    https://<<your-domain>>/browser/dist/admin/admin.html
    https://<<your-domain>>/browser/dist/admin/adminClusterOverview.html
    ```

    Log in with the credentials defined in the `collabora-admin-secret` (the values of `$COLLABORA_ADMIN_USERNAME` and `$COLLABORA_ADMIN_PASSWORD`).

- Verify that the WOPI discovery endpoint is accessible at `https://<<your-domain>>/hosting/discovery`.

- **End-to-end test** — Sign in to HCL Connections, open the Files application, and open a `.docx`, `.xlsx`, or `.pptx` file that you have edit access to. Confirm that:

    - The Collabora editor loads in the browser without a WebSocket error.
    - You can make a change and save it, and the change is visible when you reopen the file.

## Troubleshooting {#section_ts_collabora .section}

### Pods are not starting {#section_ts_pods_collabora .section}

Inspect the pod state and logs:

- Run: `kubectl get pods -n <<namespace>>` and `kubectl describe pod <<pod-name>> -n <<namespace>>`.
- Check logs using: `kubectl logs <<pod-name>> -n <<namespace>>`.

### Image pull failures {#section_ts_image_pull_collabora .section}

Verify that the image pull secret is present and correct:

```bash
kubectl get secrets -n <<namespace>>
kubectl describe secret myregkey -n <<namespace>>
```

### WebSocket connection issues {#section_ts_ws_collabora .section}

Check the load balancer logs. For nginx:

```bash
tail -f /var/log/nginx/error.log
```

### IBM HTTP Server configuration errors {#section_ts_ihs_collabora .section}

Validate the `httpd.conf` syntax and inspect the error log:

```bash
/opt/IBM/HTTPServer/bin/apachectl configtest
tail -f /opt/IBM/HTTPServer/logs/error_log
```

### Collabora editor fails to load from Files {#section_ts_editor_load_collabora .section}

If a document opens in HCL Connections Files but the Collabora editor shows a load error, the WOPI wiring between Files and Collabora is incorrect:

- Confirm that the WOPI discovery endpoint returns XML (not an HTML error page):

    ```bash
    curl -k https://<<your-domain>>/hosting/discovery
    ```

- In `collabora-values.yaml`, verify that `collabora.extra_params` sets `--o:indirection_endpoint.url` to the correct `https://<<your-domain>>/controller/routeToken` URL, and that `server_name` matches the browser-facing FQDN.
- Confirm that the Collabora configuration in HCL Connections (see [Configuring Collabora in HCL Connections](#configuring-collabora-in-hcl-connections-section_configure_collabora_in_hcl_connections-section)) has been completed and the Files service was restarted after the change.

### Editor loads but changes cannot be saved {#section_ts_save_fail_collabora .section}

If the editor opens but save fails or the document reverts on reload:

- Verify that the `mod_ibm_local_redirect` module is loaded in IBM HTTP Server and that the Files local redirect configuration in `httpd.conf` is present and points to the correct `FILES_CONTENT_DIR`. See [Configuring the HTTP server](#section_config_http_collabora).
- Check the Files service logs (`SystemOut.log` on the Files server) for `403` or `401` responses on the WOPI `PutFile` endpoint, which indicate a permissions or authentication issue on the Files side.

### Admin console returns 401 or 403 {#section_ts_admin_console_collabora .section}

If `https://<<your-domain>>/browser/dist/admin/admin.html` returns a `401` or `403` error:

- Confirm that the `collabora-admin-secret` exists in the Collabora namespace and that its `admin-username` and `admin-password` keys hold the credentials you are typing:

    ```bash
    kubectl get secret collabora-admin-secret -n <<namespace>> -o jsonpath='{.data.admin-username}' | base64 -d
    ```

- If you rotated the secret after the initial deployment, restart the `collabora-online` pods so that the new credentials are picked up:

    ```bash
    kubectl rollout restart deployment collabora-online -n <<namespace>>
    ```

**Parent Topic**: [Installing and Configuring Collabora Online](../admin/t_admin_inst_config_collabora.md)
