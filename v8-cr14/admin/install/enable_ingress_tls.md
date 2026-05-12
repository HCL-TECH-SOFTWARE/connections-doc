# Enabling secure traffic to the ingress controller

This guide describes the steps required to enable TLS (HTTPS) traffic to the ingress controller for the Component Pack. The process involves generating a TLS certificate, configuring the ingress controller to use it, and ensuring secure communication between the IBM HTTP Server (IHS) and the ingress controller.

## Prerequisites

- Access to your Kubernetes Traefik ingress controller
- Administrative access to the Component Pack load balancer (for example, HAProxy, if used)
- Administrative access to IBM HTTP Server (IHS)

## How to enable TLS for the ingress controller

Perform the following steps to enable TLS (HTTPS) traffic to the ingress controller for the Component Pack.

!!! note 
      The TLS secret has been renamed from `ingress-nginx-tls-secret` to `cnx-tls-secret`  in Connections v8 CR14. If you are upgrading from a previous release, the bootstrap process automatically detects and removes the legacy secret. If you manage certificates manually, you must delete `ingress-nginx-tls-secret` and recreate it as `cnx-tls-secret`.

!!! critical
     After creating or updating the `cnx-tls-secret`, you **must** import the new certificate into your IBM HTTP Server (IHS) keystore. For instructions, see [Import the Certificate into IBM HTTP Server (IHS)](enable_ingress_tls.md#how-to-enable-tls-for-the-ingress-controller). 
      
      **If you do not complete this step, communication between IHS and the Component Pack fails when TLS is enabled.**

   1. Verify or Generate a TLS Certificate

      1. Verify that an existing TLS certificate is available.
         
         As part of the [bootstrap installation process](cp_install_services_tasks.md#ingresscomm_ingress), a self-signed TLS certificate is automatically generated for the ingress controller. If you prefer to use a different certificate, update the `cnx-tls-secret` secret with your own certificate.  Otherwise, proceed to the next step.

         Verify the existing TLC Certificate with the following commands:
         ```
            kubectl -n <<namespace>> get secret cnx-tls-secret
         ```
         ```
            kubectl -n <<namespace>> get secret cnx-tls-secret -o jsonpath='{.data.tls\.crt}' | base64 --decode | openssl x509 -noout -text
         ```

         Where:

        `<namespace>` is your namespace (the default is "connections").

      2. Generate a new TLS Certificate
         
         The [Set up community ingress](cp_install_services_tasks.md#comm_ingress) step configures the ingress controller to use the `cnx-tls-secret` secret as the default SSL certificate.  If you want to use a different secret containing your preferred certificate, patch the TLSStore object as follows:

         ```
         kubectl patch tlsstores.traefik.io default -n <<namespace>> --type='merge' -p '{"spec":{"defaultCertificate":{"secretName":"<<name_secret_name>>"}}}'
         ```

         Where:

         `<namespace>` is your namespace (the default is "connections").

         `<name_secret_name>` is the secret name with your preferred certificate.

         Traefik will reload the certificate in memory without requiring a restart.
         
          For more information about TLS setup, refer to the [Traefik TLSStore documentation](https://doc.traefik.io/traefik/reference/routing-configuration/kubernetes/crd/tls/tlsstore/).

      3.  Verify the preferred certificate is used

         ```
         kubectl get tlsstore default -n <<namespace>> -o jsonpath='{.spec.defaultCertificate.secretName}'
         ```

         It should show your preferred secret.

         ```
         openssl s_client -servername <<INGRESS_HOST>> -connect <<INGRESS_HOST>>:32443 -showcerts < /dev/null 2>/dev/null | openssl x509 -noout -issuer -subject -dates
         ```

         Where `<<INGRESS_HOST>>` is the hostname used to access the ingress controller externally. This is typically the load balancer (for example, HAProxy, if applicable), or the Component Pack worker node hosting the ingress controller.

         It should show the details of your preferred certificate.


   2. Configure the Component Pack load balancer to use the TLS Port

      If applicable, configure the load balancer (for example, HAProxy) to listen on the TLS port and forward traffic in TCP mode to the backend ingress controller service.  The controller is configured to use port 32443 for HTTPS traffic as described in [Set up community ingress](cp_install_services_tasks.md#comm_ingress).

      1. Sample HAProxy configuration in `<<HAPROXY_DIR>>/haproxy.cfg`

         ```
         frontend cnx_ingress_https
            bind *:32443
            mode tcp
            option tcplog
            timeout client  10800s
            default_backend masters_cnx_ingress_https

         backend masters_cnx_ingress_https
            mode tcp
            option tcplog
            option tcp-check
            balance roundrobin
            default-server inter 10s downinter 5s rise 2 fall 2 slowstart 60s maxconn 1000 maxqueue 1024 weight 100
            server <<worker-1.example.com>> <<worker-1.example.com>>:32443 check
            ......
            server <<worker-n.example.com>> <<worker-n.example.com>>:32443 check
         ```

         Where `<<worker-1.example.com>>` to `<<worker-n.example.com>>` are the Component Pack workers.  

      2. Reload or restart the HAProxy process to apply the change.

         ```
         sudo systemctl restart haproxy
         ```

   3. Import the Certificate into IBM HTTP Server (IHS)

      To ensure secure communication between IBM HTTP Server (IHS) and the ingress controller, import the TLS certificate into the IHS keystore.

      1. Download the Certificate from the Ingress Controller

         On each IHS server, use `openssl` to retrieve the certificate from the ingress controller’s endpoint.  For example,

         ```               
         openssl s_client -servername <<INGRESS_HOST>> -connect <<INGRESS_HOST>>:32443 -showcerts < /dev/null 2>/dev/null | openssl x509 -outform PEM > cnx-tls-cert.pem
         ```

         Where `<<INGRESS_HOST>>` is the hostname used to access the ingress controller externally.  This is typically the load balancer (for example, HAProxy, if applicable), or the Component Pack worker node hosting the ingress controller.

      2. Import the Certificate into the IHS Keystore

          <div class="admonition note">
          <p class="admonition-title">Note</p>
          <p>If the certificate already exists, you can delete it before reimporting by running: <b></b><code>&lt;&lt;IHS_DIR&gt;&gt;/bin/gskcapicmd -cert -delete -db &lt;&lt;IHS_KDB_FILENAME&gt;&gt; -pw &lt;&lt;IHS_KDB_PASSWORD&gt;&gt; -label 'cnx-tls-cert'</code>.</p>
          </div>

         Use the `gskcapicmd` utility to import the downloaded certificate into the IHS keystore.  For example,

         ```
         <<IHS_DIR>>/bin/gskcapicmd -cert -add -db <<IHS_KDB_FILENAME>> -pw <<IHS_KDB_PASSWORD>> -label "cnx-tls-cert" -file cnx-tls-cert.pem
         ```

         Where:

          `<<IHS_DIR>>` is the IHS program directory.

          `<<IHS_KDB_FILENAME>>` is the IHS keystore file path.

          `<<IHS_KDB_PASSWORD>>` is the keystore password.

      3. Verify the Certificate is imported

         ```
         <<IHS_DIR>>/bin/gskcapicmd -cert -list -db <<IHS_KDB_FILENAME>> -pw <<IHS_KDB_PASSWORD>>
         ```

         It should show `cnx-tls-cert` listed as one of the certificates.


   4. Configure IBM HTTP Server (IHS) to Use HTTPS for Ingress Resources {#configure-ihs-https}

      Update the IHS configuration to enable SSL and listen on the TLS port.  

      1. Update Ingress Resources Endpoints to use HTTPS by executing the following:
   
         ```
         sed -i -E 's|http://([^:]+):32080|https://\1:32443|g' <<IHS_DIR>>/conf/httpd.conf
         ```

      2. Add or update IHS configuration to enable TLS support for proxying HTTPS connections
      
         This line can be placed below the SSLProtocolDisable setting in `<<IHS_DIR>>/conf/httpd.conf`:

         ```
         SSLProxyEngine On
         ```

      3. Run the following command to reload or restart the IHS to apply the change:
   
         ```
         cd <<IHS_DIR>>/bin
         ./apachectl -k graceful
         ```

**Parent topic:** [Configuring HTTPS Communication for the Component Pack](../install/cp_tls_intro.md)   
