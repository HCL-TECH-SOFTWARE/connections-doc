# Securing Cache Service traffic to the Component Pack \(Linux\) {#cp_config_om_cache_service_secure_linux .task}

Follow these steps to secure the Cache Service traffic flowing between the HCL Connections™ applications and the Component Pack.

This is an optional but recommended setting. To encrypt Valkey traffic from Connections to the Component Pack, configure a Secure Shell \(SSH\) tunnel. An SSH tunnel creates an encrypted connection using the SSH protocol.  Native Valkey TLS support will be available in a future release.

!!! note
    
    -   These instructions are for securing Connections servers running on Linux that connect to the Component Pack.
    -   Valkey is designed for use within a trusted private network.
    -   This guide assumes an external load balancer is deployed outside the Kubernetes cluster to load balance Component Pack traffic.  We will use HAProxy in this instructions.


## Preparation: SSH User and Key Setup

Before creating the tunnels, prepare the following nodes/servers:

  - Each WebSphere Application Server node
  - External load balancer (for example, HAProxy)
  - Each Kubernetes worker node

Complete the following steps on each of these nodes/servers:

1. Set Up a Dedicated User for the SSH Tunnel Service

    For this example, we will use a user named `cache-service-tunnel`:

    ```
    sudo useradd -m -s /bin/bash cache-service-tunnel
    ```

2. Generate an SSH key pair for the user

    Switch to the new user and generate a new SSH key using a strong algorithm such as ed25519:

      ```
      sudo su - cache-service-tunnel
      mkdir -p ~/.ssh
      chmod 700 ~/.ssh
      ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519
      ```

3. Press **Enter** to accept the default file location and passphrase. You will use the public key (`~/.ssh/id_ed25519.pub`) in the next steps.


## Configure SSH Key Authorization

Authorize the public keys of the SSH clients on the appropriate SSH servers.

1. Create `authorized_keys` on the HAProxy server and Kubernetes workers

    ```
    sudo su - cache-service-tunnel
    touch /home/cache-service-tunnel/.ssh/authorized_keys
    chmod 600 /home/cache-service-tunnel/.ssh/authorized_keys
    ```

2. Copy the Public Key from WebSphere Nodes to HAProxy

    Use a tool such as `ssh-copy-id` or manually copy the contents of `/home/cache-service-tunnel/.ssh/id_ed25519.pub` from each WebSphere node to `/home/cache-service-tunnel/.ssh/authorized_keys` on the HAProxy server.

3. Confirm SSH Access to the HAProxy Server from Each WebSphere Node

    Accept the server's fingerprint when prompted:

    ```
    ssh cache-service-tunnel@<haproxy-node> -i /home/cache-service-tunnel/.ssh/id_ed25519
    ```

4. Repeat to Copy the Public Key from HAProxy to Each Kubernetes Workers

    Repeat the steps to copy the public key from the HAProxy server to each Kubernetes worker node.
    After completing the copies, verify that you can SSH from the HAProxy server to each Kubernetes worker by running the `ssh` command used in the previous step.



## Create SSH Tunnel System Services on WebSphere Nodes

Log in as a user with sudo access to your WebSphere Application Server node to perform the following:

1.  Create a SSH tunnel service

    1. At the root, execute the following command to create a systemd service unit file (adjust for your OS as needed):

        ```
        sudo touch /etc/systemd/system/cache-service-tunnel-websphere.service
        ```

    2. Edit `cache-service-tunnel-websphere.service` and add the following (replace `<HAProxy FQDN`> with the HAProxy host):

        ```
        [Unit]
        Description=SSH Tunnel from WebSphere to HAProxy
        After=network.target

        [Service]
        Type=simple
        ExecStart=/usr/bin/ssh -i /home/cache-service-tunnel/.ssh/id_ed25519 cache-service-tunnel@<HAProxy FQDN> -L 30379:127.0.0.1:30379 -N
        Restart=always
        RestartSec=30s
        User=cache-service-tunnel

        [Install]
        WantedBy=multi-user.target
        ```

2.  Start the System Service

      ```
      sudo systemctl daemon-reload
      sudo systemctl enable --now cache-service-tunnel-websphere
      ```

3.  Verify the SSH Tunnel Process 

    You should see a running `ssh` process:

      ```
      ps aux | grep ssh
      ```

4.  Repeat These Steps to Create System Services for All WebSphere Application Server Nodes


## Create SSH Tunnel System Services on HAProxy Server

Log in as a user with sudo access to your HAProxy Server to perform the following steps.

1.  Create SSH Tunnel Wrapper Script

    If your Kubernetes cluster has multiple workers, each worker will need a separate SSH tunnel using a unique local port.  A wrapper script can be used to simplify the systemd service unit file.  

    1. Create a script `/usr/local/bin/start-cache-service-tunnel.sh` and grant it execute permissions. 

        ```
        sudo touch /usr/local/bin/start-cache-service-tunnel.sh
        sudo chmod +x /usr/local/bin/start-cache-service-tunnel.sh
        ```

    2. Add the following content to the script.

        ```
        #!/bin/bash
        # $1 is the instance name (e.g. worker1.example.com-30378 / worker2.example.com-30380 / worker3.example.com-30381)

        # TARGET_PORT: Gets the part after the last hyphen (e.g., 30379)
        TARGET_PORT=$(echo "$1" | rev | cut -d- -f1 | rev)

        # KUBE_WORKER_FQDN: Gets everything before the last hyphen (e.g., worker1.example.com)
        KUBE_WORKER_FQDN=$(echo "$1" | rev | cut -d- -f2- | rev)

        NODE_PORT="30379" 

        SSH_KEY="/home/cache-service-tunnel/.ssh/id_ed25519"
        SSH_USER="cache-service-tunnel"

        # Tunnel traffic from the HAProxy's local port ($TARGET_PORT) to the Kube Worker on the HAProxy nodeport.
        /usr/bin/ssh -i "$SSH_KEY" "$SSH_USER"@"$KUBE_WORKER_FQDN" \
          -L "$TARGET_PORT":127.0.0.1:"$NODE_PORT" -N
        ```


2.  Create a SSH tunnel service template

    1. As root, create a systemd service unit file (adjust for your OS as needed):

        ```
        sudo touch /etc/systemd/system/cache-service-tunnel-k8s@.service
        ```

    2. Edit `cache-service-tunnel-k8s@.service` and add the following content:

      ```
      [Unit]
      Description=SSH Tunnel from HAProxy to Kubernetes
      After=network.target

      [Service]
      Type=simple
      ExecStart=/usr/local/bin/start-cache-service-tunnel.sh %i
      Restart=always
      RestartSec=30s
      User=cache-service-tunnel

      [Install]
      WantedBy=multi-user.target
      ```

3.  Start the System Service

    Run the following commands, replace `worker#.example.com` below with the actual Kubernetes workers hostnames and use a unique local port for each tunnel.

    ```
    sudo systemctl daemon-reload
    sudo systemctl enable --now cache-service-tunnel-k8s@worker1.example.com-30378.service
    sudo systemctl enable --now cache-service-tunnel-k8s@worker2.example.com-30380.service
    sudo systemctl enable --now cache-service-tunnel-k8s@worker3.example.com-30381.service
    ```

4.  Verify the SSH Tunnel Process 

    You should see a running `ssh` process for each tunnel:

    ```
    ps aux | grep ssh
    ```



## Update Connections Server to Connect Through the SSH Tunnel

This step can be performed in any environment with http access to the Connections deployment.

Use the `configureCacheService.sh` script described in [Running the configuration script](cp_config_om_cache_service_enable.html#running-the-configuration-script) to set the Valkey host (such as,`-m` parameter) to be `localhost`.

```
sudo bash configureCacheService.sh -m localhost -po 30379 -ic https://<connections url> -ic_u <admin user> -ic_p <admin password> -pw <cache service password>
```



## Update External HAProxy Configuration to Connect Through the SSH Tunnel

Edit the HAProxy configuration file, typically `haproxy.cfg`.

1. Update the HAProxy Frontend to Bind Only to 127.0.0.1

    Locate the `frontend` section for the HAProxy for Valkey (for example, `haproxy-valkey`) and update the `bind` directive so that HAProxy listens only on the local interface instead of all interfaces.  

    For example, update:
    ```
    frontend haproxy_cache_service
        bind 127.0.0.1:30379
        mode tcp
        option tcplog
        timeout client  10800s
        default_backend masters_cache_service
    ```

    This ensures that Valkey traffic is only accepted from local SSH tunnels and not exposed externally.

2. Update the HAProxy Backend to Connect via SSH Tunnel

    In the same file, update the `backend` section of the HAProxy for Valkey (for example, masters_cache_service) so that each backend server points to `127.0.0.1` and the corresponding local port for each SSH tunnel. This ensures that the external HAProxy forwards Valkey traffic through the secure SSH tunnels established to each Kubernetes worker node.

    For example, update:

    ```
    backend masters_cache_service
        mode tcp
        option tcplog
        option tcp-check
        balance roundrobin
        default-server inter 10s downinter 5s rise 2 fall 2 slowstart 60s maxconn 1000 maxqueue 1024 weight 100
            server worker1.example.com 127.0.0.1:30378 check
            server worker2.example.com 127.0.0.1:30380 check
            server worker3.example.com 127.0.0.1:30381 check
    ```

    !!! note
        
        - Ensure that the port numbers (`30379`, `30380`, `30381`, etc.) match the local ports specified in your SSH tunnel services.
        - Each `server` entry should use `127.0.0.1` and the unique local port for its corresponding SSH tunnel.

3. Restart HAProxy

    ```
    sudo systemctl restart haproxy
    ```

    This configuration ensures that all Valkey backend traffic is securely routed through the SSH tunnels to the appropriate Kubernetes worker nodes.

## Verify Cache Service Connections

Follow [Verifying Cache Service server traffic](cp_config_om_cache_service_verify.md) to validate that traffic is flowing through the SSL tunnels properly. 

**Parent topic:** [Enabling and securing Cache Service traffic to Homepage](../install/cp_config_om_cache_service_traffic.md)
